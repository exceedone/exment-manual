# 지원 기간(유지 보수 중인 버전)
평소에는 최신 버전을 사용해 주십시오. 아래 표는 버전별로 수정을 내는 기간입니다. 바로 최신 버전으로 올릴 수 없는 경우에만 유지 보수 중인 버전을 사용해 주십시오.

## 버전별 수정 기간

| 버전 | 최신 | PHP | Laravel | 데이터베이스 | 수정 내용 | 기한 |
|---|---|---|---|---|---|---|
| 7.2(최신 버전) | 7.2.4 | 8.2 ~ 8.4 | 12 | MySQL 8.0 이상·MariaDB 10.11 이상·SQL Server 13.0 이상 | 버그·작은 기능·보안 | 7.3이 나올 때까지. 그 뒤 6개월은 보안만 |
| 7.1 | 7.1.3 | 8.2 ~ 8.4 | 12 | 위와 같음 | 보안만 | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 ~ 8.4 | 12 | 위와 같음 | 보안만 | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | 위와 같음 | 보안만 | 2027-03-31 |
| PHP 7.4에서 동작하는 마지막 버전 | 4.4.3 | 7.3 ~ 7.4 | — | — | 수정 없음 | 종료 |

- PHP의 범위는 각 버전의 `composer.json`(`^8.2.0`)과, 설치 화면에서 확인하는 범위입니다(v7은 8.2 이상 8.5 미만, 6.2는 8.2 이상 8.3 미만).
- 데이터베이스의 버전은 [서버 요구 사항](/ko/server)을 참조해 주십시오.

## 업데이트 순서·릴리스 노트

| 버전 | 업데이트 순서 | 릴리스 노트 |
|---|---|---|
| 7.2 | [업데이트](/ko/update) | [릴리스 노트(영어)](/release_note) |
| 7.1·7.0 | [업데이트](/ko/update)(7.2로는 보통의 순서로 올릴 수 있습니다) | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3)·[v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [v7.0.0으로의 업데이트(영어)](/update/v7_0_0)(수동 업데이트가 필요합니다) | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## 프레임워크와 PHP의 지원
- <span class="red bold">Laravel 10의 보안 수정은 2025년 2월 4일에 끝났습니다.</span> 6.2는 지원이 끝난 프레임워크 위에서 동작하고 있습니다. 가능한 한 빨리 v7로 올려 주십시오.
- PHP 8.2의 보안 수정은 2026년 12월 31일까지입니다. PHP 8.3·8.4로의 전환을 검토해 주십시오(6.2는 PHP 8.2에서만 동작합니다).
- Laravel 12(v7)의 보안 수정은 2027년 2월 24일까지로 예정되어 있습니다.

출처: [PHP Supported Versions](https://www.php.net/supported-versions.php)·[Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## 지금 버전을 보는 방법
관리 화면의 "[시스템 설정](/ko/system_setting)"의 맨 아래, "시스템 버전 정보"의 "현재 버전"에서 볼 수 있습니다.

## 안내
보안 수정을 냈을 때는 [exment.net의 새 소식](https://exment.net/ko/whats-new/)과 GitHub의 [Security Advisories](https://github.com/exceedone/exment/security/advisories)로 알려 드립니다.

## 설치용 zip
- 최신 버전과 유지 보수 중인 버전의 zip은 [다운로드 페이지](https://exment.net/ko/download/)에 있습니다.
- 지금까지의 버전의 zip은 [GitHub의 릴리스](https://github.com/exceedone/exment/releases)의 각 버전의 "Assets"에 있습니다(일본어판 `…_ja.zip`·영어판 `…_en.zip`). 오래된 버전에는 그 뒤의 버그나 취약점의 수정이 들어 있지 않습니다.
