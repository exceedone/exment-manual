# 설치의 흐름
Exment를 자신의 서버에 설치하고 쓰기 시작하기까지의 흐름입니다. 전체는 4가지 절차입니다.

![Exment를 쓰기 시작하기까지](../ja/img/quickstart/quickstart_first1.png)

> **서버를 준비하지 않고 쓰고 싶을 때**  
> 설치 없이 쓸 수 있는 **Exment SaaS**도 있습니다(위의 01·02가 필요 없습니다). 먼저 써 보고 싶을 때는 [데모](https://exment.net/ko/demo-env/)를 이용하십시오. 자세한 내용은 [요금·지원](https://exment.net/en/plan/)을 보십시오.

## 1. 서버를 준비한다
Exment는 PHP가 동작하는 웹 서버와 데이터베이스가 있으면 동작합니다.

| 필요한 것 | 내용 |
|---|---|
| 웹 서버 | Apache·nginx·IIS 등 |
| PHP | 8.2 이상 |
| 데이터베이스 | MySQL 8.0 이상·MariaDB 10.11 이상·SQL Server 13.0 이상 중 하나 |

자세한 동작 환경과 설정은 [서버 설정](/ko/server)을 보십시오. 환경별 절차도 있습니다.

| 쓰는 환경 | 절차 |
|---|---|
| 시험 삼아 자신의 PC에서 | [XAMPP(Windows)](/ko/install_xampp)·[XAMPP(Mac)](/ko/install_xampp_mac) |
| 임대 서버(Xserver 등) | [임대 서버](/ko/install_rental) |
| Linux 서버 | [Linux](/ko/install_linux) |
| 클라우드 | [AWS](/ko/install_aws)·[AWS(1대)](/ko/install_aws_single)·[Azure Web Apps](/ko/install_azure_web_apps) |
| Docker | [Docker](/ko/install_docker) |
| Windows 서버 | [IIS](/ko/install_iis) |

## 2. Exment를 설치한다
다음 중 하나로 설치합니다. 망설여지면 "간편 설치"를 권장합니다.

| 방법 | 이럴 때 | 절차 |
|---|---|---|
| **간편 설치(권장)** | zip을 두고 화면의 안내대로 진행한다 | [간편 설치](/ko/quickstart_easy) |
| 수동 설치 | composer와 명령으로 설치한다 | [수동 설치](/ko/quickstart_manual) |
| Docker | 컨테이너로 동작시킨다 | [Docker](/ko/install_docker) |

- 최신 버전의 zip과 과거 버전·SHA-256은 [다운로드](https://exment.net/ko/download/)에 있습니다.
- v7.2.1 이후의 새 설치에서는 URL에 "/admin"이 붙지 않습니다(예: `http://localhost`). 붙이고 싶을 때는 설치 화면의 "URL 앞에 붙는 값"에서 정할 수 있습니다([URL에 포함되는 admin](/ko/additional_prefix)).

## 3. 초기 설정을 한다
설치가 끝나면 초기 설정 화면이 나옵니다.

![초기 설정 화면](../img/install/install1.png)

- 회사 이름·시스템 관리자의 계정을 정합니다.
- **권장 설정**(Exment의 캐시·설정의 캐시·파일의 권한 등)이 체크된 상태로 나옵니다. 빠르고 안전하게 쓰려면 그대로 넣는 것을 권장합니다([튜닝](/ko/tuning)).
- 쓰고 싶은 템플릿(고객 관리·신청 팩 등)을 고르면 테이블과 메뉴가 한꺼번에 들어갑니다.

자세한 내용은 [초기 설정](/ko/first_setting)을 보십시오.

## 4. 쓰기 시작한다
- **먼저 정해 둘 것(어느 사이트에서나 필요)**: [작업 스케줄](/ko/additional_task_schedule)(cron)을 설정하십시오. 알림·스케줄·자동 백업 등이 동작합니다.
- 업무에 맞추어 [테이블](/ko/table)·[폼](/ko/form)·[뷰](/ko/view)를 만듭니다.
- [기능 관리](/ko/feature)에서 쓸 기능과 무료 공식 플러그인(프로젝트 관리·IT 지원·Groupware)을 고릅니다.
- [보안 점검](/ko/security_check)과 [튜닝](/ko/tuning)으로 안전과 속도의 설정을 확인합니다.
- 그 밖의 설정(메일·파일을 두는 곳·큐 등)은 [추가 설정](/ko/quickstart_more)에 있습니다.

## 잘 되지 않을 때
- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 보십시오.
- 설치나 서버 구축에 관한 개별 문의는 무료로는 받지 않습니다. 개별 대응이 필요할 때는 [유상 지원](https://exment.net/en/plan/)을 이용하십시오.
