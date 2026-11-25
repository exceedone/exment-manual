# (상급자용) 전문 검색 엔진(Meilisearch)의 이용
전문 검색 엔진 "[Meilisearch](https://www.meilisearch.com/)"를 써서 Exment의 검색을 빠르게 하기 위한 설정입니다.  
Exment는 보통 데이터베이스를 검색합니다. Meilisearch를 쓰면 데이터가 아주 많은 환경에서도 빠르게 검색할 수 있습니다.  
※이 기능은 Exment v7.0.0 이후에서 쓸 수 있습니다.

설치하는 방법은 2가지입니다.

| 설치 방법 | 알맞은 경우 |
|---|---|
| [쉬운 설치 방법](/ko/additional_meilisearch?id=쉬운-설치-방법) | Exment v7.2.2 이후. 스크립트를 한 번 실행하는 것만으로 설치하고 싶다 |
| [수동으로 설치하는 경우](/ko/additional_meilisearch?id=수동으로-설치하는-경우) | 스크립트를 쓰지 않고 설정하고 싶다. 설정의 내용을 확인하고 싶다 |

다음 기능을 쓸 수 있습니다.

- 자유어 검색의 고속화
- 검색 결과 좁히기(필터·패싯)
- 검색 키워드의 강조 표시
- 검색 결과의 정렬(관련도순·최신순·오래된순)
- 검색 조건의 저장·공유
- 검색 결과의 내보내기(CSV·XLSX)
- 유의어(동의어)·불용어의 설정

![Meilisearch를 쓴 검색 결과 화면](../img/meilisearch/meilisearch_search1.png)  

> Exment의 보통 검색의 구조는 [검색](/ko/search)을 보십시오.


## 동작 조건
Meilisearch를 쓰려면 다음 조건을 채워야 합니다.

|항목|내용|
|---|---|
|Meilisearch 서버|v1.10 이후|
|PHP 라이브러리|"meilisearch/meilisearch-php"(v1.10 이후)를 설치해야 합니다. 간편 설치의 zip에는 들어 있습니다. **이 라이브러리는 Exment의 필수 라이브러리가 아닙니다.** 설치되어 있지 않은 경우 Meilisearch 관련 명령은 오류가 되고, 실시간 동기화도 꺼집니다.<br />또한 이 라이브러리는 "guzzlehttp/guzzle"과 호환되는 HTTP 클라이언트가 필요합니다.|
|큐|"QUEUE_CONNECTION"에 database(또는 redis)를 설정하고, 마이그레이션을 실행해 둔 상태여야 합니다.<br />실시간 동기화는 큐에서 실행되므로, 초깃값인 sync 그대로이면 화면의 처리가 막힙니다. 자세한 내용은 [알림 처리의 지연 실행](/ko/additional_queue)을 확인하십시오.|
|사용자 정의 테이블|사용자 정의 테이블 설정에서 "검색 가능"이 YES이고, 또한 "자유어 검색 대상"이 YES인 사용자 정의 열을 가진 테이블만 인덱스를 만드는 대상이 됩니다.|


## 주의점
- <span class="red">※Meilisearch는 인터넷에 공개하지 마십시오.</span> Exment와 같은 서버, 또는 내부 네트워크에서만 접속할 수 있도록 설정하십시오. 마스터 키는 다른 사람이 알지 못하도록 엄중하게 관리하십시오.
- **Meilisearch와 큐 워커는 항상 움직이고 있어야 합니다**. 절차 1과 절차 3에서 둘 다 자동으로 다시 시작하는 서비스로 등록합니다. 멈췄을 때는 다음과 같이 됩니다.

|멈춘 것|어떻게 되는가|
|---|---|
|Meilisearch|검색 화면은 데이터베이스를 쓰는 보통 검색으로 바뀝니다(좁히기 조건을 적용하고 있는 경우에는 검색 결과가 표시되지 않고, 정렬 순서는 적용되지 않습니다).|
|큐 워커|업데이트한 내용이 인덱스에 반영되지 않습니다.|

- Meilisearch의 인덱스(검색용 데이터)는 Exment의 데이터베이스와는 따로 가집니다. 그래서 둘 사이에 차이가 생길 수 있습니다. 절차 4에서 하루에 한 번의 자동 복구를 설정합니다.
- <span class="red">※"EXMENT_SEARCH_DOCUMENT"를 true로 한 경우, 검색 화면에서는 Meilisearch가 쓰이지 않습니다.</span> 첨부 파일의 파일 이름은 인덱스에 들어가지 않으므로, "MEILISEARCH_GLOBAL_SEARCH"가 true여도 검색 화면은 데이터베이스를 쓰는 검색이 됩니다. 사용자 정의 열 "선택 (테이블에서)"의 입력 자동 완성은 영향을 받지 않습니다.
- Meilisearch 자체의 자세한 설명은 [Meilisearch 공식 문서](https://www.meilisearch.com/docs)를 보십시오.


## 쉬운 설치 방법
Exment v7.2.2 이후에서는 스크립트를 한 번 실행하는 것만으로 아래 [수동으로 설치하는 경우](/ko/additional_meilisearch?id=수동으로-설치하는-경우)의 절차 1~4를 한꺼번에 할 수 있습니다. 스크립트는 몇 번 실행해도 문제없습니다(이미 있는 마스터 키나 설정은 그대로 씁니다).

쓰고 있는 환경에 맞는 곳을 보십시오.

|환경|볼 곳|
|---|---|
|Linux 서버(AWS의 EC2 등도 포함합니다)|아래의 "Linux의 경우"|
|Windows 서버|아래의 "Windows의 경우"|
|docker-exment|아래의 "Docker의 경우"|
|Meilisearch가 이미 움직이고 있다(다른 서버에 준비한 경우 등)|[Exment 설정만 하는 경우](/ko/additional_meilisearch?id=exment-설정만-하는-경우)|
|AWS·Azure·임대 서버|아래의 "AWS·임대 서버의 경우"|

### Linux의 경우
systemd를 쓰는 서버(Ubuntu·Debian·RHEL·Amazon Linux 등. AWS의 EC2도 포함합니다)에서 Exment의 폴더로 이동하고 아래 명령을 실행합니다.

```
cd /var/www/exment
sudo sh vendor/exceedone/exment/resources/meilisearch/install-meilisearch.sh
```

스크립트는 다음 일을 합니다.

1. Meilisearch의 설치("/usr/local/bin/meilisearch"), 실행용 사용자, 새 마스터 키를 적은 "/etc/meilisearch.conf"(root만 읽을 수 있음), 서비스 "meilisearch"의 등록(127.0.0.1:7700에서만 요청을 기다립니다)
1. Exment의 설정("php artisan exment:meili-setup". 내용은 [Exment 설정만 하는 경우](/ko/additional_meilisearch?id=exment-설정만-하는-경우)를 확인하십시오)
1. 큐 워커의 서비스 "exment-meili-worker"의 등록
1. 웹 서버 사용자의 crontab에 스케줄러(php artisan schedule:run)를 추가

필요에 따라 아래 옵션을 지정합니다.

|옵션|내용|
|---|---|
|--exment-dir=폴더|Exment의 폴더입니다. 기본값은 현재 폴더입니다.|
|--user=사용자|웹 서버가 PHP를 실행하는 사용자입니다(www-data·apache·nginx 등). 기본값은 "storage" 폴더의 소유자입니다.|
|--php=경로|php 명령의 경로입니다. 웹 서버와 같은 버전의 php를 지정하십시오(예: --php=/usr/bin/php8.3). 기본값은 PATH에 있는 php입니다.|
|--version=버전|Meilisearch의 버전입니다. 기본값은 "v1.10.3"입니다.|
|--index=이름|인덱스 이름입니다. 기본값은 "exment_global"입니다.|
|--no-cron|스케줄러를 crontab에 추가하지 않습니다. 이미 다른 방법으로 스케줄러를 실행하고 있는 경우에 지정합니다.|

### Windows의 경우
PowerShell을 "관리자 권한으로 실행"으로 열고, Exment의 폴더에서 아래 명령을 실행합니다.
※"C:\php\php.exe"는 IIS에서 쓰고 있는 php의 경로로 변경하십시오.

```
cd C:\inetpub\exment
powershell -ExecutionPolicy Bypass -File vendor\exceedone\exment\resources\meilisearch\install-meilisearch.ps1 -Php C:\php\php.exe
```

스크립트는 다음 일을 합니다.

1. Meilisearch의 설치("C:\meilisearch"), 새 마스터 키("C:\meilisearch\master-key.txt". Administrators와 SYSTEM만 읽을 수 있음), NSSM에 의한 서비스 "Meilisearch"의 등록, 인덱스 저장 위치를 Windows Defender의 검사 대상에서 제외
1. Exment의 설정("php artisan exment:meili-setup")
1. 큐 워커의 서비스 "ExmentMeiliWorker"의 등록
1. 작업 스케줄러에 작업 "ExmentScheduler"(1분마다 php artisan schedule:run)를 등록

> NSSM은 "-Nssm"으로 경로를 지정하거나, PATH 또는 "C:\nssm\nssm.exe"에 두십시오. 둘 다 없는 경우, winget이 있으면 자동으로 설치합니다.
> 그 밖의 옵션: "-ExmentDir"(Exment의 폴더), "-Version"(Meilisearch의 버전), "-InstallDir"(Meilisearch의 폴더), "-Index"(인덱스 이름), "-NoScheduler"(작업을 등록하지 않음), "-NoDefenderExclusion"(Windows Defender의 설정을 바꾸지 않음)

### Docker의 경우
[docker-exment](https://github.com/exceedone/docker-exment)를 쓰고 있는 경우에는 "docker-compose.meilisearch.yml"을 추가하기만 하면 Meilisearch·큐 워커·스케줄러의 컨테이너가 시작됩니다.

- docker-exment 폴더의 ".env"에 16자 이상의 마스터 키를 적습니다(예: "openssl rand -hex 16"으로 만든 값).

```
EXMENT_DOCKER_MEILISEARCH_MASTER_KEY=(마스터 키)
```

- 아래 명령을 실행해서 컨테이너를 시작한 다음, Exment의 설정을 합니다.

```
docker compose -f docker-compose.yml -f docker-compose.mysql.yml -f docker-compose.meilisearch.yml up -d
docker compose -f docker-compose.yml -f docker-compose.mysql.yml -f docker-compose.meilisearch.yml exec -u www-data php php artisan exment:meili-setup
```

### Exment 설정만 하는 경우
Meilisearch가 이미 움직이고 있는 경우(다른 서버에 준비한 경우 등)에는 Exment의 폴더에서 아래 명령을 실행합니다. 수동으로 설치하는 경우의 "[2. Exment 설정](/ko/additional_meilisearch?id=_2-exment-설정)"을 한꺼번에 합니다.

```
php artisan exment:meili-setup --host=http://127.0.0.1:7700 --key-file=/etc/meilisearch.conf
```

이 명령은 아래 순서로 실행합니다. 도중에 오류가 난 경우에는 오류의 내용을 표시하고 멈춥니다. 고친 다음 다시 한 번 실행하십시오.

1. Meilisearch에 접속할 수 있는지, 마스터 키가 올바른지, 버전이 v1.10 이후인지 확인
1. ".env"의 설정: "QUEUE_CONNECTION"이 sync인 경우에는 database로 변경하고, "MEILISEARCH_REINDEX_QUEUE=meili-reindex"를 추가합니다
1. 큐의 테이블(jobs·failed_jobs)이 없는 경우의 작성과 "php artisan migrate"
1. 시스템 설정의 저장: 호스트·마스터 키·인덱스 이름·실시간 동기화(YES)·인덱스 정기 복구(YES)·복구 실행 시각
1. 인덱스의 작성. 끝나면 전역 검색을 YES로 합니다
1. 접속 상태의 확인("php artisan exment:meili-health --failed")과, 움직이고 있는 큐 워커를 다시 시작하라는 안내("php artisan queue:restart")

|옵션|내용|
|---|---|
|--host=URL|Meilisearch의 접속 대상입니다. 기본값은 현재 설정값("http://127.0.0.1:7700")입니다.|
|--key-file=파일|마스터 키를 적은 파일입니다. "MEILI_MASTER_KEY=" 줄이 있는 파일("/etc/meilisearch.conf" 등)이나, 키만 적은 파일을 지정합니다.|
|--key=키|마스터 키입니다. 명령줄에 적은 키는 다른 사용자에게도 보일 수 있으므로 "--key-file"이나 환경 변수 "MEILI_MASTER_KEY"를 쓰기를 권장합니다.|
|--index=이름|인덱스 이름입니다. 기본값은 현재 설정값("exment_global")입니다.|
|--repair-at=HH:MM|인덱스 정기 복구의 시각입니다. 기본값은 현재 설정값("03:00")입니다.|
|--skip-env|".env"를 변경하지 않습니다. 표시된 내용을 직접 적으십시오.|
|--skip-index|설정의 저장만 하고 인덱스를 만들지 않습니다. 전역 검색은 NO 그대로입니다.|

> 마스터 키는 "--key-file"·환경 변수 "MEILI_MASTER_KEY"·"--key"·시스템 설정에 저장된 값의 순서로 찾고, 어느 것도 없는 경우에는 입력을 요구합니다.
> 이 명령은 큐 워커와 스케줄러를 등록하지 않습니다. 수동으로 설치하는 경우의 "[3. 큐 워커 등록](/ko/additional_meilisearch?id=_3-큐-워커-등록)" "[4. 스케줄러 설정](/ko/additional_meilisearch?id=_4-스케줄러-설정)"을 하십시오.

### AWS·임대 서버의 경우
- **AWS(EC2)·Azure의 가상 머신 등**: Linux·Windows 서버와 마찬가지로 위의 스크립트를 쓸 수 있습니다. 보안 그룹 등에서 포트 7700을 외부에 공개하지 마십시오.
- **임대 서버(Xserver 등)**: 항상 실행하는 프로그램을 움직일 수 없으므로 Meilisearch를 임대 서버 안에서 움직일 수는 없습니다. Meilisearch는 항상 실행할 수 있는 다른 서버(AWS의 EC2 등)에 두고, Exment 서버에서만 접속할 수 있도록 설정합니다. 그런 다음 Exment의 폴더에서 "php artisan exment:meili-setup --host=(Meilisearch의 접속 대상)"을 실행하십시오. 큐 워커는 항상 실행할 수 없으므로 cron으로 1분마다 실행합니다. 자세한 내용은 [알림 처리의 지연 실행](/ko/additional_queue)을 확인하십시오.


## 수동으로 설치하는 경우
스크립트를 쓰지 않고 설정할 때나 설정의 내용을 확인하고 싶을 때의 절차입니다. 다음 순서로 설정합니다.

1. Meilisearch 서버 설치
1. Exment 설정
1. 큐 워커 등록
1. 스케줄러 설정


## 1. Meilisearch 서버 설치

### Linux의 경우
Ubuntu 및 systemd를 쓰는 환경에서의 절차입니다.  
※쓰고 있는 환경에 맞춰 경로나 사용자 이름을 변경하십시오.

- 아래 명령을 실행해서 Meilisearch의 바이너리 파일을 둡니다.  
Meilisearch는 파일 하나로 동작하므로 다른 라이브러리를 설치할 필요가 없습니다.

```
curl -L -o /tmp/meilisearch \
  https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-linux-amd64

chmod +x /tmp/meilisearch && sudo mv /tmp/meilisearch /usr/local/bin/meilisearch
```

- 아래 명령을 실행해서 버전이 표시되는지 확인합니다.

```
meilisearch --version
```

- 아래 명령을 실행해서 Meilisearch 실행용 사용자와 데이터 저장 위치의 폴더를 만듭니다.

```
sudo useradd -r -s /usr/sbin/nologin meilisearch
sudo mkdir -p /var/lib/meilisearch
sudo chown meilisearch:meilisearch /var/lib/meilisearch
```

- 아래 명령을 실행해서 Meilisearch의 설정 파일을 만듭니다.  
마스터 키는 무작위 문자열로 자동 생성됩니다.

```
sudo tee /etc/meilisearch.conf > /dev/null << EOF
MEILI_DB_PATH=/var/lib/meilisearch/data.ms
MEILI_HTTP_ADDR=127.0.0.1:7700
MEILI_ENV=production
MEILI_MASTER_KEY=$(openssl rand -hex 16)
MEILI_NO_ANALYTICS=true
EOF

sudo chmod 600 /etc/meilisearch.conf
```

> "MEILI_ENV=production"인 경우, 마스터 키는 16바이트 이상이어야 합니다.  
"openssl rand -hex 16"은 32자의 문자열을 만들므로 이 조건을 채웁니다.

- 아래 명령을 실행해서 생성된 마스터 키를 확인합니다.  
**이 키는 나중에 Exment의 "시스템 설정"에 입력하므로 반드시 적어 두십시오.**

```
sudo grep MASTER_KEY /etc/meilisearch.conf
```

- 아래 명령을 실행해서 Meilisearch를 서비스로 등록합니다.

```
sudo tee /etc/systemd/system/meilisearch.service > /dev/null << 'EOF'
[Unit]
Description=Meilisearch search engine
After=network.target

[Service]
Type=simple
User=meilisearch
Group=meilisearch
EnvironmentFile=/etc/meilisearch.conf
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/local/bin/meilisearch
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/lib/meilisearch

[Install]
WantedBy=multi-user.target
EOF
```

> "WorkingDirectory=/var/lib/meilisearch"는 반드시 적어야 합니다.  
Meilisearch는 현재 디렉터리에 임시 폴더를 만들므로, 이 내용이 없으면 "Permission denied"가 발생하고 서비스의 시작과 정지를 되풀이합니다.

- 아래 명령을 실행해서 서비스의 자동 시작을 켠 다음 Meilisearch를 시작합니다.

```
sudo systemctl daemon-reload
sudo systemctl enable --now meilisearch
```

- 아래 명령을 실행해서 "{"status":"available"}"이 표시되는지 확인합니다.

```
curl -s http://127.0.0.1:7700/health
```

### Windows의 경우
NSSM(Non-Sucking Service Manager)과 작업 스케줄러를 쓰는 환경에서의 절차입니다.  
PowerShell을 "관리자 권한으로 실행"으로 열고 아래 명령을 실행하십시오.  
※쓰고 있는 환경에 맞춰 경로를 변경하십시오.

- 아래 명령을 실행해서 폴더를 만들고 Meilisearch의 바이너리 파일을 내려받습니다.

```
New-Item -ItemType Directory -Force C:\meilisearch
Invoke-WebRequest -Uri "https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-windows-amd64.exe" `
  -OutFile C:\meilisearch\meilisearch.exe
```

- 아래 명령을 실행해서 버전이 표시되는지 확인합니다.

```
C:\meilisearch\meilisearch.exe --version
```

- 아래 명령을 실행해서 32자의 마스터 키를 만듭니다.  
**이 키는 나중에 Exment의 "시스템 설정"에 입력하므로 반드시 적어 두십시오.**

```
$key = -join (1..32 | ForEach-Object { '0123456789abcdef'[(Get-Random -Maximum 16)] })
$key
```

> "Get-Random -Count 32"는 같은 값을 중복해서 가져오지 않으므로, 16가지밖에 없는 16진수 문자로는 16자의 키밖에 만들 수 없습니다. 쓰지 마십시오.

- [NSSM 공식 사이트](https://nssm.cc/download)에서 NSSM을 내려받아 "C:\nssm\" 폴더에 "nssm.exe"를 둡니다.  
※"winget install nssm" 명령으로 설치할 수도 있습니다.

- 아래 명령을 실행해서 Meilisearch를 Windows 서비스로 등록합니다.

```
C:\nssm\nssm.exe install Meilisearch C:\meilisearch\meilisearch.exe
C:\nssm\nssm.exe set Meilisearch AppParameters "--db-path C:\meilisearch\data.ms --http-addr 127.0.0.1:7700 --env production --master-key $key --no-analytics"
C:\nssm\nssm.exe set Meilisearch AppDirectory C:\meilisearch
C:\nssm\nssm.exe set Meilisearch AppExit Default Restart
C:\nssm\nssm.exe set Meilisearch Start SERVICE_AUTO_START
C:\nssm\nssm.exe start Meilisearch
```

> "$key"는 바로 앞 절차에서 만든 마스터 키입니다.  
PowerShell을 다시 연 경우에는 변수의 내용이 사라져 있으므로, 만든 키의 문자열을 직접 적으십시오.

- 아래 명령을 실행해서 "status : available"이 표시되는지 확인합니다.

```
Invoke-RestMethod http://127.0.0.1:7700/health
```

- 아래 명령을 실행해서 인덱스의 저장 위치 폴더를 Windows Defender의 검사 대상에서 제외합니다.  
※검사 대상에 들어 있는 경우, 인덱스의 작성·업데이트가 느려질 수 있습니다.

```
Add-MpPreference -ExclusionPath "C:\meilisearch\data.ms"
```


## 2. Exment 설정
Meilisearch 서버의 준비가 끝나면 Exment 쪽 설정을 합니다.  
※이 절차는 "php artisan exment:meili-setup"으로 한꺼번에 할 수도 있습니다. 자세한 내용은 [Exment 설정만 하는 경우](/ko/additional_meilisearch?id=exment-설정만-하는-경우)를 확인하십시오.  
아래 절차는 Linux·Windows에서 공통입니다.

### 라이브러리 설치
- Exment의 폴더에서 아래 명령을 실행합니다.

```
composer require meilisearch/meilisearch-php
```

### .env 설정
- Exment의 폴더에서 ".env" 파일을 열고 아래 설정을 적습니다.  
Meilisearch 서버의 접속 정보나 주요 설정은 ".env"가 아니라, 뒤의 절차에서 시스템 설정 화면에서 설정합니다.

```
#큐 드라이버. 초깃값인 sync(동기 처리) 그대로이면 화면의 처리가 막힙니다
QUEUE_CONNECTION=database

#테이블 단위로 인덱스를 다시 만드는 처리(무거운 처리)를 사용자 정의 데이터 1건 단위의 동기화 처리와는 다른 큐에서 실행합니다
MEILISEARCH_REINDEX_QUEUE=meili-reindex
```

- 위 이외의 설정값은 [설정값 목록](/ko/config)의 "검색"을 확인하십시오. 기본값에서 변경하는 경우에만 적으십시오.

> Meilisearch의 설정 파일은 Exment의 패키지 안에서 읽어 들입니다. 그래서 "php artisan vendor:publish"를 실행할 필요가 없습니다.

### 테이블 만들기
- 아래 명령을 실행해서 큐의 정보를 보관하기 위한 테이블과 Meilisearch에서 쓰는 테이블을 만듭니다.

```
php artisan queue:table
php artisan queue:failed-table
php artisan migrate
```

> "jobs" "failed_jobs" 테이블은 Laravel 프로젝트를 만들 때 포함되는 마이그레이션에서 만들어지는 경우가 있습니다. "database/migrations" 폴더를 확인하고 다음과 같이 실행하십시오.
> - "create_jobs_table"을 포함하는 파일이 있는 경우(Laravel 11 이후에 만든 프로젝트): 두 테이블은 표준 마이그레이션에서 만들어지므로 "queue:table" "queue:failed-table"은 실행하지 않고 "php artisan migrate"만 실행합니다.
> - "create_failed_jobs_table"을 포함하는 파일만 있는 경우: "queue:table"과 "php artisan migrate"를 실행합니다.
> - 둘 다 없는 경우: 위의 3가지 명령을 모두 실행합니다.
>
> "Migration already exists."라고 표시된 경우에는 그 마이그레이션이 이미 있으므로, 오류를 무시하고 다음 명령으로 넘어가십시오.

- 아래 명령을 실행해서 설정 내용의 캐시를 삭제합니다.  
※설정의 캐시를 쓰고 있는 경우, "php artisan config:cache"를 다시 실행하십시오.

```
php artisan config:clear
```

### 시스템 설정
- 시스템 관리자로 Exment에 로그인하고, 메뉴 "관리자 설정 > 시스템 설정"을 열어 "상세 설정"으로 바꿉니다.
- "Meilisearch(전문 검색) 설정"에서 아래 항목을 설정하고 저장합니다.  
![시스템 설정의 Meilisearch(전문 검색) 설정](../img/meilisearch/meilisearch_system1.png)  

|항목|설정할 값|
|---|---|
|Meilisearch 호스트|Meilisearch 서버의 접속 대상입니다. Exment와 Meilisearch가 같은 서버인 경우에는 "http://127.0.0.1:7700" 그대로 둡니다.|
|마스터 API 키|Meilisearch 서버를 설치할 때 만든 마스터 키입니다.|
|인덱스 이름|"exment_global" 그대로 둡니다. 여러 Exment에서 같은 Meilisearch 서버를 쓰는 경우에는 Exment마다 다른 이름을 설정하십시오.|
|Meilisearch로 전역 검색 사용|YES로 합니다. 검색 쪽의 설정이므로, 인덱스의 작성이 끝난 다음에 YES로 변경할 수도 있습니다.|
|인덱스 실시간 동기화|YES로 합니다. 업데이트 쪽의 설정이므로, 절차 3에서 등록하는 큐 워커가 필요합니다.|
|배치 크기(인덱싱 시)|"1000" 그대로 둡니다.|
|인덱스 정기 복구|YES로 합니다. 절차 4에서 설정하는 스케줄러가 필요합니다.|
|복구 실행 시각(HH:MM)|"03:00" 등 부하가 낮은 시각을 설정합니다.|
|검색 필터 열 선택|"자동 + 사용자 정의" 그대로 둡니다.|

> 이 화면에서 저장한 값은 데이터베이스에 보관되고, ".env"의 설정값보다 우선합니다. 마스터 API 키는 암호화해서 저장됩니다.  
> 이 항목들은 화면 대신 ".env"로 설정할 수도 있습니다. 자세한 내용은 [화면의 항목을 .env로 설정하기](/ko/additional_meilisearch?id=화면의-항목을-env로-설정하기)를 확인하십시오.

> 인덱스 하나는 Exment 하나에서만 쓸 수 있습니다. 인덱스를 처음 쓴 Exment가 "(인덱스 이름)__owner"라는 인덱스에 소유자로 기록됩니다. (기록되는 값은 ".env"의 "APP_KEY"에서 만든 식별값입니다)  
> 같은 Meilisearch 서버를 여러 Exment에서 쓰는 경우에는 Exment마다 다른 "인덱스 이름"을 설정하십시오. 다른 Exment가 소유자로 기록되어 있는 인덱스는 쓸 수 없습니다. 자세한 내용은 [잘 동작하지 않는 경우](/ko/additional_meilisearch?id=잘-동작하지-않는-경우)를 확인하십시오.

### 인덱스 만들기
- 아래 명령을 실행해서 데이터베이스의 내용으로 인덱스를 만듭니다.  
※데이터 건수에 따라서는 처리에 시간이 걸릴 수 있습니다.

```
php artisan exment:meili-index
```

- 아래 명령을 실행해서 Meilisearch와의 접속 상태와 등록되어 있는 문서 건수를 확인합니다.

```
php artisan exment:meili-health
```


## 3. 큐 워커 등록
사용자 정의 데이터의 업데이트 내용을 인덱스에 반영하기 위해 큐 워커를 서비스로 등록합니다.  

큐 워커는 아래 2개의 큐를 대상으로 해야 합니다.

- default : 사용자 정의 데이터 1건 단위의 동기화, 설정의 반영 등을 하는, 처리가 가벼운 큐입니다. ("MEILISEARCH_SYNC_QUEUE"의 기본값)
- meili-reindex : 테이블 단위로 인덱스를 다시 만드는, 처리가 무거운 큐입니다. (".env 설정"에서 "MEILISEARCH_REINDEX_QUEUE"에 설정한 값)

※"MEILISEARCH_REINDEX_QUEUE"를 설정하지 않은 경우, 테이블 단위의 처리도 "MEILISEARCH_SYNC_QUEUE"와 같은 큐(기본값: default)에서 실행됩니다. 그 경우 무거운 처리가 끝날 때까지 사용자 정의 데이터 1건 단위의 동기화가 기다리게 됩니다.  
※"MEILISEARCH_SYNC_QUEUE" "MEILISEARCH_REINDEX_QUEUE"의 설정을 변경한 경우, "--queue="의 내용도 함께 변경하십시오.

### Linux의 경우
- 아래 명령을 실행합니다.  
※"/var/www/exment"는 Exment를 설치한 폴더, "/usr/bin/php"는 php 명령의 경로입니다. 쓰고 있는 환경에 맞춰 변경하십시오.

```
sudo tee /etc/systemd/system/exment-meili-worker.service > /dev/null << 'EOF'
[Unit]
Description=Exment queue worker (Meilisearch sync)
After=network.target mysql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/exment
ExecStart=/usr/bin/php artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

- 아래 명령을 실행해서 서비스의 자동 시작을 켠 다음 큐 워커를 시작합니다.

```
sudo systemctl daemon-reload
sudo systemctl enable --now exment-meili-worker
```

- 아래 명령을 실행해서 서비스가 시작되어 있는지 확인합니다.

```
systemctl status exment-meili-worker --no-pager
```

### Windows의 경우
- 아래 명령을 실행합니다.  
※"C:\inetpub\exment"는 Exment를 설치한 폴더, "C:\php\php.exe"는 php 명령의 경로입니다. 쓰고 있는 환경에 맞춰 변경하십시오.

```
C:\nssm\nssm.exe install ExmentMeiliWorker C:\php\php.exe
C:\nssm\nssm.exe set ExmentMeiliWorker AppParameters "artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3"
C:\nssm\nssm.exe set ExmentMeiliWorker AppDirectory C:\inetpub\exment
C:\nssm\nssm.exe set ExmentMeiliWorker AppExit Default Restart
C:\nssm\nssm.exe set ExmentMeiliWorker Start SERVICE_AUTO_START
C:\nssm\nssm.exe start ExmentMeiliWorker
```


## 4. 스케줄러 설정
"MEILISEARCH_REPAIR_ENABLED"를 true로 한 경우, "MEILISEARCH_REPAIR_AT"에서 설정한 시각에 인덱스의 자동 복구가 실행됩니다.  
이 처리를 실행하려면 스케줄러의 설정이 필요합니다. **설정을 하지 않으면 자동 복구는 실행되지 않습니다.**  
※이미 [작업 스케줄](/ko/additional_task_schedule)의 설정을 한 경우, 이 절차는 필요 없습니다.

### Linux의 경우
- 아래 명령을 실행합니다.

```
sudo crontab -u www-data -l 2>/dev/null | { cat; echo "* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1"; } | sudo crontab -u www-data -
```

### Windows의 경우
- 아래 명령을 실행합니다.

```
schtasks /create /tn "ExmentScheduler" /sc minute /mo 1 /ru SYSTEM /f /tr "C:\php\php.exe C:\inetpub\exment\artisan schedule:run"
```

> "/f"는 같은 이름의 작업이 이미 등록되어 있는 경우에, 확인 메시지를 표시하지 않고 덮어쓰는 옵션입니다.


## 화면의 항목을 .env로 설정하기
"Meilisearch(전문 검색) 설정"의 항목은 설정을 자동으로 배포하는 경우 등, 시스템 설정 화면 대신 ".env"로 설정할 수도 있습니다. 설정 키는 아래와 같습니다.

|항목|".env"의 설정 키|
|---|---|
|Meilisearch 호스트|MEILISEARCH_HOST|
|마스터 API 키|MEILISEARCH_KEY|
|인덱스 이름|MEILISEARCH_INDEX|
|Meilisearch로 전역 검색 사용|MEILISEARCH_GLOBAL_SEARCH|
|인덱스 실시간 동기화|MEILISEARCH_REALTIME_SYNC|
|배치 크기(인덱싱 시)|MEILISEARCH_BATCH_SIZE|
|인덱스 정기 복구|MEILISEARCH_REPAIR_ENABLED|
|복구 실행 시각(HH:MM)|MEILISEARCH_REPAIR_AT|
|검색 필터 열 선택|MEILISEARCH_FILTER_MODE ("자동 + 사용자 정의"가 override, "사용자 정의만"이 manual)|

<span class="red">※시스템 설정의 "상세 설정" 화면은 저장할 때마다, 변경하지 않은 항목도 포함해서 위의 모든 항목을 데이터베이스에 씁니다. 그 뒤로 이 항목들은 화면에서 저장한 값이 우선하고, ".env"의 값은 무시됩니다.</span>  
이 항목들을 ".env"로 관리하는 경우에는 아래 사항에 주의하십시오.

- "Meilisearch로 전역 검색 사용" "인덱스 실시간 동기화" "인덱스 정기 복구" "검색 필터 열 선택"은 빈 상태로 저장할 수 없습니다. 한 번이라도 화면을 저장하면 이 4개 항목은 항상 화면의 값이 쓰이므로, 변경은 화면에서 하십시오.
- "Meilisearch 호스트" "마스터 API 키" "인덱스 이름" "배치 크기(인덱싱 시)" "복구 실행 시각(HH:MM)"은 화면에서 비우고 저장하면 다시 ".env"의 값이 쓰입니다.
- ".env"를 변경했는데도 반영되지 않는 경우에는 화면에 값이 저장되어 있지 않은지 확인하십시오.
- 위 이외의 설정값은 ".env"에서만 설정할 수 있습니다.


## 일본어 검색의 정확도에 대하여
Meilisearch에서는 검색을 하기 전에 문장을 단어로 나누는 처리(단어 분리)를 합니다.  
일본어 데이터를 다루는 경우, 이 처리를 올바르게 하기 위해 "MEILISEARCH_LOCALES" 설정이 쓰입니다.

- 기본값은 "jpn"입니다. 일본어만 다루는 경우에는 적을 필요가 없습니다.
- 값은 ISO-639-3의 언어 코드를 쉼표로 구분해서 적습니다. (예: "jpn" "jpn,eng")
- "MEILISEARCH_LOCALES="와 같이 비운 경우, 이 설정은 인덱스에서 삭제되고 Meilisearch가 자동으로 언어를 판정합니다.
- 이 설정을 쓰려면 Meilisearch v1.10 이후가 필요합니다.
- 설정을 변경한 경우, "php artisan exment:meili-settings"를 실행하십시오. Meilisearch가 자동으로 다시 나누므로 인덱스를 다시 만들 필요가 없습니다.

"MEILISEARCH_LOCALES"와 사전 설정(유의어·불용어)은 처리를 하는 단계가 다릅니다. 둘을 함께 쓰십시오.

|설정|단계|처리 내용|
|---|---|---|
|MEILISEARCH_LOCALES|앞|문장을 단어로 나눕니다.|
|유의어·불용어|뒤|나누어진 단어에 대해 동의어의 전개나 제외 처리를 합니다.|


## 관리 화면
Meilisearch와 관련된 화면은 아래와 같습니다.  
※URL 앞에 붙는 값("admin" 등)은 "ADMIN_ROUTE_PREFIX"의 설정에 따라 다릅니다. 자세한 내용은 [URL에 포함되는 "admin"의 변경·삭제](/ko/additional_prefix)를 확인하십시오.

|화면|URL|내용|
|---|---|---|
|시스템 설정|/system|"상세 설정"의 "Meilisearch(전문 검색) 설정"에서 접속 대상이나 마스터 키, 각종 플래그를 설정합니다.|
|검색 필터 설정|/meili-filter|검색 결과 화면의 사이드바에 표시할 좁히기 조건을 설정합니다.|
|검색 사전 설정|/meili-dictionary|유의어(동의어), 불용어를 설정합니다.|

※"검색 필터 설정" "검색 사전 설정"은 처음 상태에서는 메뉴에 표시되지 않습니다. 위의 URL로 직접 접속하거나, [메뉴 설정](/ko/menu)에서 시스템 메뉴로 추가하십시오. 이 2개는 "MEILISEARCH_GLOBAL_SEARCH"가 true인 경우에만 메뉴 설정의 선택지에 표시됩니다.

- "검색 필터 설정"에서는 테이블과 열을 고르고, 필터 유형(일치·범위), 추가/제외, 별칭 등을 설정합니다.  
![검색 필터 설정](../img/meilisearch/meilisearch_filter1.png)  

- "검색 사전 설정"에서는 유형(유의어·불용어)과 단어를 등록합니다.  
![검색 사전 설정](../img/meilisearch/meilisearch_dictionary1.png)  


## 동작 확인
- Exment에 로그인하고 페이지 위쪽의 검색 바에 단어를 입력해서 검색합니다.
- 검색 결과가 표시되는지 확인합니다.
- 사용자 정의 데이터를 새로 만들거나 업데이트한 다음 다시 검색해서, 업데이트한 내용이 검색 결과에 반영되는지 확인합니다.  
※반영되지 않는 경우, 큐 워커가 실행되고 있는지 확인하십시오.

- 명령줄에서 검색을 실행할 수도 있습니다. 화면처럼 사용자 권한에 따른 좁히기를 하지 않고, Meilisearch에 직접 물어서 응답 시간을 표시하므로, 문제가 Meilisearch 자체에 있는지 화면 쪽에 있는지를 가려낼 수 있습니다.

```
php artisan exment:meili-search "키워드" --limit=5 --highlight --facets
```

※특정 테이블만 대상으로 하는 경우, "--table=(테이블 이름)"을 지정합니다.


## 검색 화면의 기능
"MEILISEARCH_GLOBAL_SEARCH"가 true인 경우, 검색 결과 화면에서 아래 기능을 쓸 수 있습니다.

- 좁히기 : 사이드바에서 테이블, 열의 값, 날짜·숫자의 범위 등으로 검색 결과를 좁힙니다. 대상으로 하는 열은 "검색 필터 설정" 화면에서 변경할 수 있습니다.
- 정렬 : "관련도순" "최신순" "오래된순"으로 정렬합니다.
- 검색 조건의 저장 : "현재 조건 저장"에서 좁히기 조건(원하면 검색 키워드도)을 저장하고, 다음부터는 "저장한 검색"에서 불러올 수 있습니다.  
    - 공유 범위는 "나만" "역할 그룹" "조직" "모든 사용자" 중에서 고릅니다. "모든 사용자"로의 공유는 시스템 관리자만 할 수 있습니다.
    - 사용자 한 명이 저장할 수 있는 건수는 "MEILISEARCH_SAVED_SEARCH_LIMIT"(기본값 50)까지입니다.

    ![현재 조건 저장](../img/meilisearch/meilisearch_saved1.png)  

- 내보내기 : 테이블마다 검색 결과를 CSV 또는 XLSX로 출력합니다. 출력 대상의 건수가 상한("MEILISEARCH_PERMISSION_SCAN_CAP"(기본값 1000)과 인덱스의 "maxTotalHits" 설정 중 작은 쪽의 값) 이상인 경우에는 오류가 되므로, 검색 조건을 좁히십시오.  
※건수는 열람 권한에 따른 좁히기를 하기 전의, 모든 검색 결과(히트)의 건수로 판정합니다. 그래서 열람할 수 있는 데이터가 상한보다 적은 경우에도 오류가 될 수 있습니다.


## 인덱스의 재작성·복구
데이터베이스와 인덱스 사이에 차이가 생긴 경우나, 많은 데이터를 가져오기·삭제한 경우 등 인덱스를 복구할 때의 절차입니다.

### 차이의 복구
"exment:meili-reconcile" 명령은 아래 2가지 처리를 합니다.

1. 인덱스의 대상인 테이블에 대해, 모자라는 문서를 추가하고 필요 없는 문서(데이터베이스에서 삭제된 데이터)를 삭제합니다.
1. 인덱스의 대상이 아니게 된 테이블("검색 가능"을 NO로 변경했다, 자유어 검색 대상인 열이 없어졌다, 테이블 자체를 삭제했다 등)의 문서를 인덱스에서 모두 삭제합니다.  
※"--table"을 지정해서 실행한 경우, 이 처리는 하지 않습니다.

<span class="red">※이 명령에서는 인덱스에서 문서의 삭제가 이루어집니다.</span>  
삭제될 내용을 미리 확인하려면 "--dry-run"을 지정해서 실행하십시오.

- 아래 명령을 실행해서 데이터베이스와 인덱스의 차이를 확인합니다. "--dry-run"을 지정한 경우, 확인만 하고 복구는 하지 않습니다.

```
php artisan exment:meili-reconcile --dry-run
```

- 아래 명령을 실행해서 차이를 복구합니다.

```
php artisan exment:meili-reconcile
```

- 특정 테이블만 복구하는 경우, "--table"을 지정합니다.

```
php artisan exment:meili-reconcile --table=(테이블 이름)
```

### 인덱스의 재작성
- 인덱스를 모두 다시 만드는 경우, 아래 명령을 실행합니다.  
"--fresh"를 지정한 경우, 모든 문서를 다시 만들므로 실행할 때 확인 메시지가 표시됩니다.  
※다시 만드는 동안에도 기존 인덱스로 검색할 수 있습니다. 작성이 끝난 시점에 새 인덱스로 바뀝니다.

```
php artisan exment:meili-index --fresh
```

> 배치 처리 등에서 확인 메시지를 표시하지 않고 실행하는 경우, "--force"를 함께 지정하십시오.  
> 확인 메시지를 표시할 수 없는 환경(cron 등)에서 "--force"를 지정하지 않은 경우, 명령은 오류가 됩니다.
>
> ```
> php artisan exment:meili-index --fresh --force
> ```

- 다시 만드는 동안에 업데이트된 사용자 정의 데이터는 새 인덱스에 들어 있지 않습니다. 끝난 다음 아래 명령을 실행해서 차이를 복구하십시오.

```
php artisan exment:meili-reconcile
```

### 설정만 반영
- "검색 사전 설정" 화면에서 유의어·불용어를 저장한 경우, 설정은 큐를 거쳐 자동으로 인덱스에 반영됩니다. 명령을 실행할 필요가 없습니다.  
※큐 워커가 멈춰 있는 경우에는 반영되지 않습니다. 그 경우에는 아래 명령을 실행하십시오.
- ".env"에서 "MEILISEARCH_LOCALES" "MEILISEARCH_PERMISSION_SCAN_CAP" "MEILISEARCH_MAX_FACET_VALUES"를 변경한 경우에는 아래 명령을 실행하십시오. 인덱스를 다시 만들지 않고 설정을 반영할 수 있습니다.  
※"--show"를 지정한 경우, 현재 설정 내용을 표시합니다.

```
php artisan exment:meili-settings
php artisan exment:meili-settings --show
```


## 시스템을 업데이트할 때·설정을 변경할 때
큐 워커는 오랜 시간 움직이는 프로세스이므로, 다시 시작하지 않는 한 코드나 설정의 변경을 반영하지 않습니다.  
Exment를 업데이트한 경우 및 Meilisearch의 설정(".env"의 "MEILISEARCH_"로 시작하는 설정값, 또는 "시스템 설정(상세 설정)"의 "Meilisearch(전문 검색) 설정")을 변경한 경우, 아래 명령을 실행해서 큐 워커를 다시 시작하십시오.

- Linux의 경우

```
sudo systemctl restart exment-meili-worker
```

- Windows의 경우

```
C:\nssm\nssm.exe restart ExmentMeiliWorker
```


## 잘 동작하지 않는 경우
|증상|생각할 수 있는 원인|
|---|---|
|".env"를 고쳐도 반영되지 않는다|"관리자 설정 > 시스템 설정(상세 설정)"에서 저장한 값이 우선하고 있습니다. 화면의 설정을 확인하십시오.|
|큐 워커가 시작되지 않는다|큐용 테이블(jobs·failed_jobs)이 만들어져 있지 않습니다. "2. Exment 설정"의 "테이블 만들기"를 참조해서 테이블을 만드십시오.|
|데이터를 업데이트해도 검색 결과가 바뀌지 않는다|"MEILISEARCH_REALTIME_SYNC"가 false로 되어 있거나, 큐 워커가 멈춰 있습니다. 서비스의 상태와, "php artisan exment:meili-health --failed"로 실패한 작업을 확인하십시오.|
|열의 설정을 변경해도 검색 결과가 바뀌지 않는다|인덱스를 다시 만드는 처리가 끝나지 않았습니다. 로그에 "gave up after 3 attempts"가 출력되어 있지 않은지 확인하고, "php artisan exment:meili-index"를 실행하십시오.|
|로그에 "reindex ... skipped: the queue connection is 'sync'"라고 출력된다|"QUEUE_CONNECTION"이 sync이므로 처리가 중지되었습니다. "php artisan exment:meili-index"를 실행하거나, 큐를 database·redis로 변경하고 큐 워커를 실행하십시오.|
|내보낼 때 "내보낼 결과가 너무 많습니다(상한 N건)"라고 표시된다|검색 결과의 건수가 상한("MEILISEARCH_PERMISSION_SCAN_CAP"(기본값 1000)과 인덱스의 "maxTotalHits" 설정 중 작은 쪽의 값) 이상입니다. 건수는 열람 권한으로 좁히기 전의 히트 건수로 판정합니다. 건수를 줄이지 않고 오류로 하고 있으므로, 검색 조건을 좁히거나 설정값을 크게 한 다음 "php artisan exment:meili-settings"를 실행하십시오.|
|일본어 검색에서 검색 결과가 표시되지 않는 경우가 있다(한자와 가타카나가 이어져 있는 경우 등)|단어 분리의 설정이 적용되어 있지 않습니다. "php artisan exment:meili-settings --show"로 설정 내용을 확인하고, "MEILISEARCH_LOCALES"가 비어 있지 않은지, Meilisearch가 v1.10 이후인지 확인하십시오.|
|가져오기·일괄 삭제 뒤에 데이터에 차이가 있다, 또는 "검색 가능"을 NO로 변경한 테이블이 검색 결과에 표시된다|인덱스의 문서가 모자라거나 남아 있습니다. "--table"을 지정하지 않고 "php artisan exment:meili-reconcile"을 실행하십시오.|
|자동 복구가 실행되지 않는다|스케줄러의 설정이 되어 있지 않거나, "MEILISEARCH_REPAIR_ENABLED"가 false로 되어 있습니다.|
|Meilisearch의 서비스가 시작과 정지를 되풀이한다(Linux)|서비스의 설정 파일에 "WorkingDirectory=/var/lib/meilisearch"가 적혀 있지 않습니다.|
|명령의 실행 결과나 로그에 "Meilisearch index '(인덱스 이름)' belongs to another Exment installation"이라고 출력된다|설정되어 있는 인덱스를 다른 Exment가 소유자로 쓰고 있습니다. 같은 Meilisearch 서버에서 다른 Exment가 같은 인덱스 이름을 쓰고 있는 경우나, ".env"의 "APP_KEY"를 변경한 경우에 발생합니다. 이 상태에서는 "exment:meili-index" "exment:meili-reconcile" 명령은 오류가 되고, 데이터의 업데이트 내용도 인덱스에 반영되지 않습니다. 또한 검색은 데이터베이스를 써서 이루어집니다.<br />"시스템 설정(상세 설정)"의 "인덱스 이름"을 다른 Exment와 겹치지 않는 이름으로 변경해서 저장한 다음, "php artisan exment:meili-index"를 실행하고 큐 워커를 다시 시작하십시오. "APP_KEY"를 변경한 것이 원인인 경우에는 "APP_KEY"를 원래 값으로 되돌려도 해결됩니다.|

- Linux의 경우, 아래 명령으로 Meilisearch의 오류 내용을 확인할 수 있습니다.

```
sudo journalctl -u meilisearch -n 50 --no-pager
```

- 아래 명령으로 동기화에 실패한 작업의 건수를 확인할 수 있습니다.

```
php artisan exment:meili-health --failed
```


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
