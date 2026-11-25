# (상급자용) 알림 처리의 지연 실행
알림을 보내는 처리를 화면의 조작과는 따로, 나중에 실행하기 위한 설정입니다.  
Exment는 보통 모든 처리를 그 자리에서 실행합니다(동기 실행). 이 설정을 하면 일부 처리를 나중에 실행할 수 있습니다(지연 실행·큐 실행). 화면의 대기 시간이 짧아집니다.

지금 나중에 실행할 수 있는 것은 다음 처리입니다.

- 메일 보내기
- Slack 보내기
- Microsoft Teams 보내기

## 주의점
- 지연 실행에서는 처리(작업)를 "큐"라는 순서 대기 장소에 쌓아 두고, 화면과는 다른 프로세스에서 실행합니다.
- 쌓인 작업을 실행하려면 명령으로 "큐 워커"(작업을 실행하는 프로그램)를 움직입니다. 워커는 계속 움직이고 있어야 합니다. **워커가 멈추면 처리는 실행되지 않습니다**.  
워커가 움직이고 있는지를 감시하는 등 충분히 주의하십시오.
- 화면에서 알림을 실행한 시점에는 알림이 성공했는지 실패했는지를 알 수 없습니다.  
그래서 실제로는 알림이 실패했더라도 "알림이 실행되었습니다!"라는 메시지가 나올 수 있습니다.
- 큐의 자세한 설명은 [Laravel 매뉴얼](https://laravel.com/docs/queues)(영어)을 보십시오.


## 설정 절차
큐 드라이버(작업을 쌓아 두는 장소)를 설정합니다. 여기서는 데이터베이스를 씁니다. (설정에 따라 Redis 등도 쓸 수 있습니다)

**(1) .env를 열고 다음 설정을 씁니다.**

```
#큐 드라이버. Exment의 설치 절차에서 설정하는 값은 sync(동기 처리)
QUEUE_CONNECTION=database
```

**(2) 다음 명령을 실행합니다.** 큐의 정보를 넣는 테이블을 만듭니다.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> "jobs" "failed_jobs" 테이블은 Laravel 프로젝트를 만들었을 때의 마이그레이션에서 이미 만들어져 있을 수 있습니다. "database/migrations" 폴더를 보고 다음과 같이 실행하십시오.
>
> | "database/migrations" 폴더 안 | 실행할 명령 |
> | ---- | ---- |
> | "create_jobs_table"을 포함하는 파일이 있다(Laravel 11 이후에 만든 프로젝트) | "php artisan exment:update"만(두 테이블 모두 표준 마이그레이션에서 만들어지므로 "queue:table" "queue:failed-table"은 실행하지 않습니다) |
> | "create_failed_jobs_table"을 포함하는 파일만 있다 | "queue:table"과 "php artisan exment:update" |
> | 둘 다 없다 | 위의 3가지 명령 모두 |
>
> "Migration already exists."라고 나왔을 때는 그 마이그레이션이 이미 있습니다. 오류는 신경 쓰지 말고 다음 명령으로 넘어가십시오.

**(3) 다음 명령을 실행합니다.** 워커가 움직이기 시작합니다.  
이 명령은 직접 멈추거나 터미널을 닫을 때까지 계속 움직입니다.

```
php artisan queue:listen
```

> queue:listen을 백그라운드에서 계속 움직이게 하려면 [Supervisor](https://laravel.com/docs/queues#supervisor-configuration)(영어)와 같은 프로세스 모니터(워커가 멈추지 않았는지 지켜보는 장치)가 필요합니다.

### 워커를 계속 움직일 수 없을 때(임대 서버 등)
임대 서버 등에서 워커를 계속 움직일 수 없을 때는 cron으로 매분, 쌓인 작업을 처리합니다(`--stop-when-empty`로 작업이 없어지면 끝나고, `--max-time=50`으로 다음 cron까지 끝납니다). php는 웹과 같은 버전을 전체 경로로 쓰십시오.

```
* * * * * cd /(Exment의 루트 디렉터리) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

그것도 할 수 없을 때는 `QUEUE_CONNECTION=sync`(설치했을 때의 값) 그대로 두십시오.

## 시스템을 업데이트할 때
큐 워커는 오랜 시간 계속 움직이는 프로세스입니다. 다시 시작하지 않는 한 새 코드는 쓰이지 않습니다.  
그래서 시스템을 업데이트할 때는 워커를 다시 시작하십시오. queue:restart 명령으로 모든 워커를 부드럽게 다시 시작할 수 있습니다.

```
php artisan queue:restart
```


## 실행 중인 작업 확인
지금 실행하고 있는 작업을 확인하는 방법입니다.

- 데이터베이스에 접속하고 다음 명령을 실행합니다.

```
select * from jobs;
```

- 지금 실행하고 있는 작업의 목록이 나옵니다.


## 실행에 실패한 작업 확인
실행에 실패한 작업을 확인하는 방법입니다.

- 데이터베이스에 접속하고 다음 명령을 실행합니다.

```
select * from failed_jobs;
```

- 실행에 실패한 작업의 목록이 나옵니다.
