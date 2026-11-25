# 명령 목록
Exment에서 쓸 수 있는 명령의 목록입니다.  
시스템 안에서 쓰는 명령이나 개발용 명령도 포함합니다.  
자세한 설명으로 가는 링크가 있는 항목은 링크된 페이지도 확인하십시오.

## 설치·업데이트

### 설치

Exment를 수동으로 설치하기 위한 명령입니다.  
자세한 내용은 [여기](/ko/quickstart_manual)를 확인하십시오.  
※ 설치에는 이 명령 외에도 필요한 작업이 있습니다. 설치할 때는 기본적으로 위의 링크된 페이지의 절차를 따르십시오.

```
php artisan exment:install
```

### 업데이트
Exment를 수동으로 업데이트하기 위한 명령입니다.  
자세한 내용은 [여기](/ko/update)를 확인하십시오.  
※ 업데이트에는 이 명령 외에도 필요한 작업이 있습니다. 업데이트할 때는 기본적으로 위의 링크된 페이지의 절차를 따르십시오.

```
php artisan exment:update
```

운영 사이트(`APP_ENV=production`)에서는 데이터베이스를 바꾸기 전에 확인하는 질문이 나옵니다. 터미널이 없을 때(스크립트·cron·CI)는 `php artisan exment:update --force`로 실행하십시오.

```
php artisan exment:update --force
```

### css·js 파일 등 발행
패키지 안의 css, js, 이미지 파일이나 설정 파일 등 전체를 laravel의 기본 경로로 발행합니다.

```
php artisan exment:publish
```

### 서버 설정 시의 초기 파일·폴더 설정
주로 Linux 환경에서, Exment 실행에 필요한 파일·폴더의 소유자·퍼미션을 설정합니다.  
자세한 내용은 [여기](/ko/server)를 확인하십시오.  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### 시스템 요구 사항 확인
PHP 버전이나 확장 기능, 폴더의 쓰기 권한 등, Exment 실행에 필요한 시스템 요구 사항을 충족하는지 확인하고 결과를 표시합니다.  
자세한 내용은 [여기](/ko/server)의 "시스템 요구 사항 확인"을 확인하십시오.

```
php artisan exment:checkrequire
```



## 데이터 가져오기·내보내기·데이터 삭제

### 데이터 내보내기
데이터 내보내기를 명령으로 실행합니다.  
자세한 내용은 [여기](/ko/data_cmd_import_export)를 확인하십시오.

```
php artisan exment:export (테이블 이름)
```

### 데이터 내보내기(chunk 모드)
데이터 내보내기(chunk 모드, 분할 출력)를 명령으로 실행합니다.  
자세한 내용은 [여기](/ko/data_cmd_import_export)를 확인하십시오.

```
php artisan exment:chunkexport (테이블 이름)
```


### 데이터 가져오기
데이터 가져오기를 명령으로 실행합니다.  
자세한 내용은 [여기](/ko/data_cmd_import_export)를 확인하십시오.

```
php artisan exment:import {폴더 이름}
```


### 데이터 가져오기 - 이미지·파일 열의 첨부 파일 가져오기
Exment의 사용자 정의 열 종류 "이미지" "파일" 열에 첨부 파일을 한꺼번에 등록할 수 있습니다.  
자세한 내용은 [여기](/ko/data_cmd_import_export)를 확인하십시오.

```
php artisan exment:file-import {폴더 이름}
```


### 데이터 가져오기 - 문서(첨부 파일) 목록
지정한 사용자 정의 데이터의 문서(첨부 파일)에 파일을 한꺼번에 등록할 수 있습니다.  
자세한 내용은 [여기](/ko/data_cmd_import_export)를 확인하십시오.

```
php artisan exment:document-import {폴더 이름}
```


### 대량 데이터 일괄 투입
대량 데이터 일괄 투입을 명령으로 실행합니다.  
자세한 내용은 [여기](/ko/data_bulk_insert)를 확인하십시오.

```
php artisan exment:bulkinsert {폴더 이름}
```


### 사용자 정의 데이터의 리프레시
Exment에 등록된 사용자 정의 데이터를 리프레시(일괄 삭제)합니다.  
테이블 정의만 남기고 테스트 데이터를 삭제하는 경우 등에 사용하십시오.  
자세한 내용은 [여기](/ko/refresh_data)를 확인하십시오.

```
php artisan exment:refreshdata
```


### 사용자 정의 데이터의 리프레시(지정한 테이블)
Exment에 등록된 사용자 정의 데이터 가운데, 지정한 테이블의 데이터를 리프레시(일괄 삭제)합니다.  
테이블 정의만 남기고 테스트 데이터를 삭제하는 경우 등에 사용하십시오.  
자세한 내용은 [여기](/ko/refresh_data)를 확인하십시오.

```
php artisan exment:refreshtable (테이블 이름)
```


### 작업 로그 삭제
[작업 로그](/ko/logs)의 데이터를 삭제합니다. 다음 옵션을 지정할 수 있습니다.

- --keep-days=(일수. 지정한 일수보다 이전의 작업 로그를 삭제합니다. 1 이상의 정수를 지정합니다. 지정하지 않으면 모든 작업 로그를 삭제합니다)
- --force(지정하면 삭제 전의 확인 메시지를 표시하지 않고 실행합니다)

<span class="red">※ "--keep-days"를 지정하지 않으면 모든 작업 로그가 삭제되므로 주의하십시오.</span>  
※ 확인 메시지를 표시할 수 없는 환경(cron 등)에서는 "--force"를 지정하지 않으면 삭제되지 않습니다.

```
php artisan exment:log-clear {--keep-days=} {--force}

# 180일보다 이전의 작업 로그를 확인 메시지 없이 삭제하는 경우
php artisan exment:log-clear --keep-days=180 --force
```







## 백업·복원

### 백업
Exment의 백업을 실행합니다. 화면에서 실행하는 백업 기능과 같은 기능입니다.  
자세한 내용은 [여기](/ko/backup)를 확인하십시오.  

```
php artisan exment:backup
```

### 복원
Exment의 복원을 실행합니다. 화면에서 실행하는 복원 기능과 같은 기능입니다.  
자세한 내용은 [여기](/ko/backup)를 확인하십시오.  

```
php artisan exment:restore (zip 파일 이름)
```


## 배치·스케줄
### 플러그인 배치 실행
Exment에 등록된 배치를 실행합니다.  
실행할 플러그인은 플러그인의 ID(아래 예의 "1"), "--name=(플러그인 이름)", "--uuid=(플러그인의 uuid)" 가운데 하나로 지정합니다.  
자세한 내용은 [여기](/ko/plugin_quickstart_batch)를 확인하십시오.

```
php artisan exment:batch 1
```


### 스케줄 실행
Exment에 등록된 스케줄러에 따라 작업을 실행합니다.  
자세한 내용은 [여기](/ko/additional_task_schedule)를 확인하십시오.

```
php artisan exment:schedule
```


### 알림(시간 경과) 실행
알림의 실행 트리거 "시간 경과"로 설정한 알림을, "알림 시간" 설정과 관계없이 바로 실행합니다.  
대상 알림은 알림의 ID, "--name=(알림 이름(영숫자))", "--suuid=(알림의 suuid)" 가운데 하나로 지정합니다.  
※ 사용 여부가 NO인 알림도 실행됩니다.  
자세한 내용은 [여기](/ko/notify)를 확인하십시오.

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# 예: ID가 3인 알림을 실행하는 경우
php artisan exment:notify 3
```


### 알림(시간 경과)을 알림 시간에 따라 실행
실행 트리거가 "시간 경과"이고 사용 여부가 YES인 알림 가운데, "알림 시간"이 현재 시각(시)과 일치하는 알림을 실행합니다.  
※ 보통은 "스케줄 실행"(exment:schedule) 안에서 같은 처리가 실행되므로, 이 명령을 따로 실행할 필요는 없습니다.

```
php artisan exment:notifyschedule
```


### 안부 확인(지진 정보 확인)
지진 정보를 가져와서, [안부 확인](/ko/safety_check)의 자동 전송 조건에 맞는 지진이 있으면 안부 확인을 보냅니다.  
[작업 스케줄](/ko/additional_task_schedule)에 의해 매분 실행됩니다.  
※ 시스템 설정의 "지진 발생 시 자동 전송"이 NO인 경우에는 아무것도 실행하지 않습니다.

```
php artisan exment:safetywatch
```



## 전문 검색 엔진(Meilisearch)
전문 검색 엔진 "Meilisearch"를 사용하는 경우의 명령입니다.  
각 명령의 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인하십시오.

|명령|내용|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|데이터베이스의 내용으로 인덱스를 만듭니다. "--fresh"를 지정하면 인덱스를 모두 다시 만듭니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인하십시오.|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|데이터베이스와 인덱스의 차이를 복구합니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인하십시오.|
|php artisan exment:meili-settings {--show}|인덱스의 설정(언어·동의어·불용어 등)을 반영합니다. "--show"를 지정하면 현재 설정 내용을 표시합니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인하십시오.|
|php artisan exment:meili-health {--failed}|Meilisearch와의 연결 상태와 등록된 문서 건수를 표시합니다. "--failed"를 지정하면 동기화 대기 중인 작업과 동기화에 실패한 작업의 건수도 함께 표시합니다.|
|php artisan exment:meili-search (키워드) {--limit=10} {--table=} {--highlight} {--facets}|Meilisearch로 검색하고, 검색 결과와 처리 시간을 표시합니다. 동작 확인용 명령입니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인하십시오.|



## 기타, 개발용

### Exment 버전
현재 설치되어 있는 Exment의 버전을 표시합니다.

```
php artisan exment:version
```


### 비밀번호 재설정
Exment의 로그인 비밀번호 재설정을 명령으로 실행합니다.  
자세한 내용은 [여기](/ko/login_setting)를 확인하십시오.

```
php artisan exment:resetpassword --email=(대상 사용자의 메일 주소) --password=(변경 후 비밀번호)
```

### API 클라이언트 목록 표시
[API 설정](/ko/api)에서 등록한 클라이언트의 목록을 표시합니다. 클라이언트별로 이름, 종류, 사용자 ID, Client ID, Client Secret, 리디렉션 URL을 표시합니다.  
<span class="red">※ Client Secret이 표시됩니다. 실행 결과의 취급에 주의하십시오.</span>

```
php artisan passport:clientlist
```

### 워크플로 데이터의 리셋
진행 중인 워크플로의 데이터를 리셋할 수 있습니다. 어떤 이유로 워크플로를 더 진행할 수 없게 된 경우에 실행하십시오.  
자세한 내용은 [여기](/ko/workflow_execution)를 확인하십시오.

```
php artisan exment:workflow-clear (테이블 이름) (ID)
```


### LINE 연동 코드 발행
지정한 사용자의 LINE 계정 연동용 연동 코드와 연동용 URL(딥 링크)을 발행합니다.  
연동용 URL을 LINE 공식 계정을 친구로 추가한 스마트폰에서 열고, 표시된 메시지를 보내면 연동이 완료됩니다.  
※ 보통은 [LINE 연동](/ko/line) 화면에서 각 사용자가 연동하십시오.  
※ "사용자의 ID"에는 사용자 데이터의 ID(숫자)를 지정합니다. 사용자 코드가 아닙니다.  
<span class="red">※ 이미 LINE 계정을 연동한 사용자에게 실행하면 현재의 연동이 해제됩니다.</span>

```
php artisan exment:line-linkcode (사용자의 ID)
```



### 테스트 데이터 만들기
Exment의 테스트 데이터 전체를 만듭니다.  
<span class="red">※ 등록된 모든 데이터가 삭제되므로 주의하십시오.</span>

```
php artisan exment:inittest
```


### 메일 전송 테스트
Exment에 설정된 메일 설정에 따라 메일 전송 테스트를 합니다.  
자세한 내용은 [여기](/ko/mailsend_setting)를 확인하십시오.

```
php artisan exment:notifytest --to=(메일 받는 곳)
```

### 언어 파일 반영 누락 확인
Laravel의 언어 파일에서, 패키지에 반영이 빠진 언어·단어를 확인합니다.

```
php artisan exment:checklang
```


### 데이터 패치
데이터베이스에 등록된 데이터의 보정이 필요해진 경우에 실행하는 명령입니다.  
※ 기본적으로는 데이터 업데이트를 실행할 때 자동으로 실행됩니다.  
※ 실행 액션은 소스 "src/Console/PatchDataCommand.php"를 직접 확인하십시오.

```
php artisan exment:patchdata {실행 액션}
```



### 데이터베이스 연결 확인
데이터베이스에 연결되어 있는지 확인합니다.  
연결되어 있으면 1을, 연결되어 있지 않으면 0을 반환합니다.

```
php artisan exment:check-connection
```
