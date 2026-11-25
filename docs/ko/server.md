# 서버 설정
Exment를 설치하기 전에 준비하는 웹 서버와 데이터베이스의 설정을 정리한 페이지입니다.  
쓰시는 환경에 맞는 절차로 설정하십시오.

이 페이지에서 하는 일은 다음 4가지입니다.

1. 웹 서버를 준비한다(아래의 "웹 서버")
2. composer를 설치한다(아래의 "composer 도입")
3. 데이터베이스를 준비한다(아래의 "데이터베이스")
4. Exment 앱을 설치한다(아래의 "앱 설치")

필요한 PHP·데이터베이스의 버전은 아래의 "동작 환경"에 있습니다.

- <span class="red bold">※ 설치 절차나 서버 구축에 관한 개별 문의는 받지 않습니다. 개별 대응이 필요할 때는 유상 지원을 이용하십시오.</span>　　
- 아래 목록에 없는 환경의 매뉴얼은 준비되어 있지 않습니다. 양해해 주십시오.

## 웹 서버
다음 중 하나의 절차로 웹 서버를 준비하십시오.  
※ PHP·Apache·MySQL이 갖추어진 환경을 개발용으로 처음부터 만들 때는 XAMPP를 권장합니다.  

- [XAMPP 구축(개발·검증 환경) Windows](/ko/install_xampp)  
→ 먼저 가지고 있는 PC에 Exment를 설치해 보고 싶을 때(Windows 버전)

- [XAMPP 구축(개발·검증 환경) Mac](/ko/install_xampp_mac)  
→ 먼저 가지고 있는 PC에 Exment를 설치해 보고 싶을 때(Mac 버전)

- [임대 서버 구축](/ko/install_rental)  
→ Exment를 공개하여 다른 멤버나 스마트폰에서도 손쉽게 쓰고 싶을 때

- [Linux에 구축](/ko/install_centos_stream)  
→ Exment를 Linux(CentOS Stream)에 설치할 때의 절차  
 ※ CentOS8로 구축했던 분은 [여기](/ko/install_linux)

- [IIS에 구축](/ko/install_iis)  
→ Exment를 IIS에 설치할 때의 절차

- [AWS에 구축 - 단일 구성](/ko/install_aws_single)  
→ Exment를 AWS에 단일 구성으로 설치할 때의 절차

- [AWS에 구축 - 이중화](/ko/install_aws)  
→ Exment를 AWS에 이중화한 구성으로 설치할 때의 절차

- [Docker로 구축](/ko/install_docker)  
→ Exment를 Docker로 동작시킬 때의 절차



### 파일 권한 설정

Exment의 프로젝트 폴더 중 다음 폴더·파일에는 웹 서버를 실행하는 사용자(apache, www-data 등)의 쓰기 권한이 필요합니다.  

| 종류 | 파일·폴더 이름 | 필요한 기능 |
| ---- | ---- | ---- |
| 폴더 | storage | 모든 기능 |
| 폴더 | bootstrap/cache | 모든 기능 |
| 파일 | .env | 간편 설치, 복원 |
| 폴더 | config | 간편 설치, 복원 |
| 폴더 | app | 간편 설치 |
| 폴더 | public | 간편 설치 |
| 폴더 | resources | 간편 설치 |

- 간편 설치를 위한 권한은 설치할 때만 필요합니다. 권한을 더 엄격하게 하고 싶을 때는 간편 설치 뒤에 폴더의 쓰기 권한을 빼십시오.

#### 초기 폴더 자동 생성
- 처음에 필요한 폴더의 구성은 다음 명령으로 자동으로 만들 수도 있습니다.  
    - --user=(사용자 이름. 지정하지 않으면 실행한 뒤에 입력 화면이 나옵니다)
    - --group=(그룹 이름. 지정하지 않으면 실행한 뒤에 입력 화면이 나옵니다)
    - --easy=(간편 설치로 Exment를 설치할 때는 1. 기본값은 0)
    - --easy_clear=(간편 설치를 실행한 뒤에 폴더 권한을 알맞은 것으로 되돌리고 싶을 때는 1. 기본값은 0)

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}

# 수동 설치의 경우
php artisan exment:setup-dir
# 간편 설치의 경우
php artisan exment:setup-dir --easy=1
# 간편 설치가 끝난 뒤 폴더 권한을 원래의 것으로 되돌리는 경우
php artisan exment:setup-dir --easy_clear=1
```



## composer 도입
Exment를 쓰려면 웹 서버에 composer를 설치해야 합니다. composer는 Exment에 필요한 패키지의 설치와 Exment의 업데이트에 씁니다.  
설치 방법은 다음 페이지를 보십시오.  
- [공식 사이트](https://getcomposer.org/download/)
- [Windows 버전 해설 사이트](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux 버전 해설 사이트](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac 버전 해설 사이트](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


## 데이터베이스
Exment의 데이터베이스에는 다음 중 하나가 필요합니다.

- MySQL 8.0 이상
- MariaDB 10.11 이상
- SQL Server 13.0.0 이상(현재 자동 백업·복원은 지원하지 않습니다)

### 데이터베이스 환경 구축
- 데이터베이스 서버를 아직 준비하지 않았을 때는 먼저 준비하십시오.  
절차는 다음 페이지를 보십시오.  
※ 이미 준비되어 있을 때는 필요 없습니다.  

    - [MySQL](/ko/install_mysql)
    - [SQL Server](/ko/install_sqlserver)

### 데이터베이스 작성

- 쓰시는 데이터베이스에서 Exment용 데이터베이스를 만드십시오.  


## 앱 설치
환경이 준비되면 다음 중 한 가지 절차로 Exment 앱을 설치하십시오.

1. **간편 설치**  
→ 웹 화면에 나오는 안내에 따라 설치하는 방법입니다. 절차는 [간편 설치](/ko/quickstart_easy)를 보십시오.

1. **수동 설치**  
→ 명령을 써서 손으로 설치하는 방법입니다. 절차는 [수동 설치](/ko/quickstart_manual)를 보십시오.


## 동작 환경
### 서버
- PHP 8.2 이상(`^8.2.0`. Exment7.0.0에서는 쓰고 있는 Laravel12의 요건에 맞추어 PHP8.2 이상이 필요합니다)
- Laravel12.X(Exment7.0.0부터 Laravel 버전이 12.X로 바뀌었습니다)
- ※ Exment v6.x의 경우는 PHP 8.2, Laravel10.X입니다.
- 데이터베이스: 다음 중 하나
    - MySQL 8.0 이상
    - MariaDB 10.11 이상
    - SQL Server 13.0.0 이상
- PHP의 gd 확장(FreeType 포함. `imagettftext`를 쓸 수 있을 것): 2차원 바코드 라벨의 PDF에 씁니다. 없으면 라벨의 PDF를 만들 때 오류가 납니다. 확인 방법과 설치 방법은 [2차원 바코드 설정](/ko/2d_barcode)을 보십시오.

### 동작 확인 브라우저
- Google Chrome
- Microsoft Edge


### 권장 설정

- PHP 메모리 최대 허용값: 512MB
- 파일 업로드 최댓값: 10MB
- 타임아웃 시간: 180초


## 시스템 요구 사항 확인

서버가 Exment의 요건을 충족하는지, 설정값이 충분한지를 화면이나 명령으로 확인할 수 있습니다.  

![설치 화면_설정](../img/quickstart/setting_windows4.png)  


### 확인 방법
다음 중 하나로 확인할 수 있습니다.

- [간편 설치](/ko/quickstart_easy)의 설치 화면
- 설치한 뒤의 [시스템 설정 화면](/ko/system_setting)
- 명령(아래의 "명령으로 실행")

### 확인 항목 상세

#### 메모리 사용량 상한
PHP를 실행하는 데 쓸 수 있는 메모리의 상한입니다.    
바꾸는 방법은 [PHP 설정값 변경](/ko/additional_php_ini)을 보십시오.

#### 한 번에 POST할 수 있는 최대 수
PHP가 한 번에 받을 수 있는 POST 매개변수 수의 상한입니다. 일부 화면에서는 저장할 때 많은 항목을 보내므로, 이 상한을 바꾸는 것을 권장합니다.  
바꾸는 방법은 [PHP 설정값 변경](/ko/additional_php_ini)을 보십시오.

#### 파일 업로드 크기 상한
업로드할 수 있는 파일 크기의 상한입니다. 필요한 크기는 관리하고 싶은 파일에 따라 달라집니다.  
바꾸는 방법은 [PHP 설정값 변경](/ko/additional_php_ini)을 보십시오.

#### 타임아웃 시간
처리를 기다리다가 시간 초과로 처리하기까지의 초 수입니다. 짧으면 백업·가져오기 등 시간이 걸리는 처리가 이 시간을 넘을 수 있습니다.  
바꾸는 방법은 [PHP 설정값 변경](/ko/additional_php_ini)을 보십시오.

#### 파일 권한
Exment를 실행하는 데 필요한 파일의 권한이 있는지 확인합니다.  
자세한 내용은 위의 [파일 권한 설정](/ko/server?id=파일-권한-설정)을 보십시오.


#### Composer 설치
Exment의 업데이트에 쓰는 Composer가 웹 서버에 설치되어 있는지 확인합니다.  
※ composer가 설치되어 있는데도 경고가 나올 수 있습니다. 웹 서버를 실행하는 사용자에게 composer의 경로가 잡혀 있지 않거나 권한이 모자라는 것 등이 이유입니다.  
composer가 올바르게 설치되어 있고 실제로 업데이트를 하는 사용자가 실행할 수 있을 때는 이 경고를 무시하십시오.  
※ composer의 경로를 잡으려면 [문제 해결](/ko/troubleshooting)의 "composer의 경로를 잡으려면"을 시도해 보십시오.



#### 백업/복원
백업·복원을 하기 위한 서버의 설정이 되어 있는지 확인합니다.  
※ 오류가 날 때는 [문제 해결](/ko/troubleshooting)의 "백업·복원에 실패한다"를 보십시오.  
※ SQL Server를 쓰실 때는 항상 경고가 됩니다. 손으로 백업·복원을 해야 합니다. 절차는 [SQL Server의 백업·복원](/ko/backup_sqlserver)을 보십시오.


### 결과 표시
#### 정상
녹색 체크가 나옵니다.

![설치 화면_설정](../img/quickstart/setting_require1.png)  

행을 누르면 자세한 내용이 나옵니다.

![설치 화면_설정](../img/quickstart/setting_require2.png)  

#### 경고
노란색 경고 마크가 나옵니다. 설정을 권장하는 항목이거나, 쓸 때 주의할 점이 있는 항목입니다.

![설치 화면_설정](../img/quickstart/setting_require3.png)  

#### 오류
빨간색 X 마크가 나옵니다. 설정을 바꾸어야 합니다.

![설치 화면_설정](../img/quickstart/setting_require4.png)  


### 명령으로 실행

다음 명령으로도 시스템 요구 사항을 확인할 수 있습니다.

```
php artisan exment:checkrequire
```

[← 설치 - 개요로 돌아가기](/ko/quickstart)
