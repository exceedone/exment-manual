# Docker로 환경 구축
Docker(앱을 "컨테이너"라는 상자에서 움직이는 장치)로 Exment를 움직이는 절차입니다.  
※더 자세한 정보는 [GitHub](https://github.com/exceedone/docker-exment)를 참조하십시오.

큰 흐름은 다음과 같습니다.

1. (Windows PC만) WSL2와 Docker를 설치한다
2. 정의 파일을 받는다
3. 데이터베이스에 맞는 명령으로 환경의 구축과 설정을 한다
4. 브라우저에서 Exment의 초기 설정을 한다


## Special thanks!
Docker 이미지는 [oreno4649 님의 docker 리포지토리](https://github.com/oreno4649/docker-exment)를 바탕으로 만들었습니다. 정말 감사합니다!

## 환경
이 페이지의 절차는 다음 환경에서 만들었습니다.  
- nginx 최신 버전
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## 주의점

- 사용하는 환경이나 버전에 따라서는 이 절차대로 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 페이지에는 Exment를 Docker에서 움직이기 위한 절차만 적었습니다.  
SSH·데이터베이스 만들기·Docker 명령 등 일반적인 IT 지식은 적지 않았습니다. 양해해 주십시오.  

## Windows PC에서 쓰는 경우(WSL2)
Windows에서는 WSL2(Windows 안에서 Linux를 움직이는 장치)의 Ubuntu 안에 Docker를 설치해서 움직입니다. 개발·검증용 절차입니다.

### 1. WSL2와 Ubuntu를 설치한다
- PowerShell을 "관리자 권한으로 실행"으로 열고 아래를 실행한 다음 PC를 다시 시작합니다.

```
wsl --install -d Ubuntu
```

- 다시 시작한 뒤 시작 메뉴에서 "Ubuntu"를 열고 Linux의 사용자 이름과 비밀번호를 정합니다.
- PowerShell에서 `wsl -l -v`를 실행해서 Ubuntu의 "VERSION"이 "2"로 되어 있는지 확인합니다.

> 가상화가 꺼져 있다는 오류가 나는 경우에는 BIOS(UEFI)의 가상화 설정(Intel VT-x·AMD-V)이 켜져 있는지 확인하십시오.

### 2. Ubuntu 안에 Docker를 설치한다
- Ubuntu 화면에서 아래를 실행합니다.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- PowerShell에서 `wsl --shutdown`을 실행한 다음 Ubuntu를 다시 엽니다.
- `docker run --rm hello-world`를 실행해서 "Hello from Docker!"라고 표시되면 끝입니다.

> Docker가 시작되지 않는 경우에는 `/etc/wsl.conf`에 아래를 적고, `wsl --shutdown` 뒤에 Ubuntu를 다시 연 다음 `sudo systemctl enable --now docker`를 실행하십시오.
> ```
> [boot]
> systemd=true
> ```

> Docker Desktop for Windows에서도 동작합니다. Docker Desktop은 일정 규모 이상의 기업에서 쓰는 경우 유료입니다(Docker 사의 이용 약관을 확인하십시오).

### 3. Exment를 움직인다
- 파일은 Ubuntu 안(예: `~/exment`)에 두고, 아래의 "Docker로 설치하는 절차"를 Ubuntu 화면에서 실행합니다. C 드라이브(`/mnt/c/...`)에 두면 동작이 매우 느려집니다.
- Windows의 브라우저에서 http://localhost 를 엽니다.

### 주의
- WSL2는 한동안 쓰지 않으면 자동으로 멈추고, Docker의 컨테이너도 멈춥니다. 쓸 때는 Ubuntu를 열고 `make mysql-up`(사용하는 데이터베이스에 맞추어)을 실행하십시오.
- Windows의 80번 포트를 다른 소프트웨어가 쓰고 있는 경우에는 docker-exment의 `.env`의 `EXMENT_DOCKER_HTTP_PORTS`를 `8080` 등으로 바꾸십시오. 그때는 http://localhost:8080 으로 엽니다.

## Docker로 설치하는 절차

> ※여기서는 가장 기본인 "Web 서버" "MySQL" 구성으로 하는 절차를 적습니다.  
그 밖에도 "이중화 구성·로드 밸런서를 추가한다" "https를 추가한다" 등 세세한 지정도 할 수 있습니다.  
자세한 내용은 [docker-exment](https://github.com/exceedone/docker-exment)의 Readme를 참조하십시오.


### 정의 파일 받기
- [docker-exment](https://github.com/exceedone/docker-exment)를 받고, 그 안에 [exment-boilerplate](https://github.com/exceedone/exment-boilerplate)를 받습니다. 폴더 이름은 "exment-boilerplate" 그대로 두십시오.

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- git을 쓰지 않는 경우에는 둘 다 zip으로 다운로드해서 압축을 풀고, exment-boilerplate 폴더의 이름을 "exment-boilerplate"로 바꾸어(압축을 풀면 "exment-boilerplate-master"가 됩니다) docker-exment 폴더 안에 둡니다.
- 아래 명령은 docker-exment 폴더에서 실행합니다. 사용하는 데이터베이스의 것을 실행하십시오.



### MySQL 환경의 구축

````bash
$ make mysql-init
````

### MySQL 환경의 설정

````bash
$ make mysql-up
````

### MariaDB 환경의 구축

````bash
$ make mariadb-init
````

### MariaDB 환경의 설정

````bash
$ make mariadb-up
````

### SQL Server 환경의 구축

````bash
$ make sqlsrv-init
````

### SQL Server 환경의 설정

````bash
$ make sqlsrv-up
````

### Exment 초기 설정
- 다음 URL을 열어서 Exment의 초기 설정을 하십시오. (※Web 서버의 포트를 바꿨을 때는 그 포트로 여십시오)  
http://localhost


- 데이터베이스의 정보는 다음과 같습니다. (※포트는 컨테이너 안의 포트 번호를 씁니다. env에서 포트를 바꿨어도 3306 그대로입니다)

| 항목 | 설정값 |
| ---- | ---- |
| 데이터베이스 유형 | MySQL |
| 호스트 이름 | mysql |
| 포트 | 3306 |
| 데이터베이스 이름 | exment_database |
| 사용자 이름 | exment_user |
| 비밀번호 | secret |


## 서버에 접속하는 절차
- 다음 명령으로 컨테이너의 목록을 냅니다.

```
docker ps
# 결과 예
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- 결과 중에서 "docker-exment-php"로 되어 있는 이미지의 "CONTAINER ID" 값을 복사합니다. 위의 예에서는 "123412341234"입니다.  

- 다음 명령을 실행합니다.

```
docker exec -it (CONTAINER ID) /bin/bash
#예
docker exec -it 123412341234 /bin/bash
```

- 이것으로 Exment가 움직이고 있는 Web 서버에 접속할 수 있습니다.


## 기타
이 Docker 이미지는 지금도 검증과 기능 추가를 계속하고 있습니다.  
GitHub는 [docker-exment](https://github.com/exceedone/docker-exment)를 참조하십시오.
