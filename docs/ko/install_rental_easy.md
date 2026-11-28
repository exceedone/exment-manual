# 간편 설치(임대 서버)
임대 서버(Xserver, Sakura Internet 등)에 **파일 하나를 올리고 브라우저로 열기만 하면** Exment를 설치하는 방법입니다. SSH나 composer는 사용하지 않습니다.

SSH로 직접 설치할 때는 [임대 서버](/ko/install_rental)를 보십시오.

## 필요한 것
- PHP 8.2 이상(서버 관리 화면에서 선택할 수 있습니다)
- MySQL 8.0 이상 또는 MariaDB 10.11 이상의 **빈** 데이터베이스
- FTP 또는 서버의 파일 관리자(파일을 올리고 열기 위해)
- 여유 공간 약 400MB

## 절차
1. [exment-installer.zip](https://exment.net/downloads/installer/exment-installer.zip)을 다운로드해서 압축을 풀고, 안의 `exment-installer.php`를 꺼냅니다.
    zip의 SHA-256은 [exment-installer.zip.sha256](https://exment.net/downloads/installer/exment-installer.zip.sha256)에 적혀 있습니다(현재 `9954da9ff53685451ac2b9376063fd92fc6b5559bc9e010048ddde72b884e5f1`).
2. Exment를 둘 폴더에 `exment-installer.php`를 올립니다.
    - 도메인의 최상위에서 사용: `public_html`(Sakura는 `www`)
    - 일부 폴더에서 사용: `public_html/exment` 등. **빈 폴더**로 하십시오.
3. 브라우저로 엽니다(예: `https://example.com/exment-installer.php`).
4. **키를 입력합니다.** 설치 프로그램은 같은 폴더에 `exment-installer-key.php`를 만듭니다. FTP나 파일 관리자로 이 파일을 열어 `KEY:` 뒤의 문자를 입력합니다.  
   이 파일은 브라우저로 열어도 아무것도 표시되지 않습니다. 파일을 볼 수 있는 사람(서버의 소유자)만 진행할 수 있도록 하기 위해서입니다.
5. **서버 확인**을 봅니다. ✗가 있으면 표시된 방법대로 바꾸고 "다시 확인"을 누릅니다(PHP 버전, memory_limit 등). ⚠는 그대로도 설치할 수 있습니다.
6. "다운로드"를 누릅니다. exment.net에서 Exment를 다운로드하고, 내용(sha256)을 확인한 후 압축을 풀어 배치합니다. 몇 분 걸립니다. 도중에 멈추면 페이지를 다시 열고 "계속"을 누르면 이어서 진행합니다.
7. **데이터베이스**: 화면 안내대로 데이터베이스를 만들고 "연결 확인"을 누릅니다. 여기서 입력한 값은 저장하지 않습니다.
8. "Exment 설치 화면으로 이동"을 누릅니다. 설치 프로그램은 자신(키·작업 파일 포함)을 삭제하고 Exment 설치 화면을 엽니다. 이후는 [설치 절차](/ko/quickstart_easy)대로 진행합니다.

## 배치되는 위치
- Exment 본체는 **웹에 공개되지 않는 폴더**에 둡니다(예: `public_html` 옆의 `exment`, `public_html/t721`이면 `exment_t721`).
- 공개 폴더에는 Exment의 `public` 내용만 둡니다.
- 공개 폴더 밖에 쓸 수 없는 서버에서는 공개 폴더 안의 `exment-app`에 두고, `.htaccess`로 웹에서 보이지 않게 합니다.
- `.env`에는 그 사이트만의 키(APP_KEY)를 만들고 `APP_ENV=production`, `APP_DEBUG=false`로 합니다.

## 서버별 주의 사항
### Xserver
- PHP 버전: 서버 패널 → "PHP Ver.切替"
- 데이터베이스: 서버 패널 → "MySQL設定"에서 데이터베이스와 사용자를 만들고, 사용자에게 데이터베이스 접근 권한을 줍니다. 호스트 이름은 "MySQL設定"에 표시된 이름입니다.
- <span class="red bold">Exment 설치 화면에서는 데이터베이스 종류로 "MariaDB"를 선택하십시오.</span> Xserver의 데이터베이스는 MariaDB입니다. "MySQL"을 선택하면 "사용 중인 데이터베이스는 MariaDB인데 MySQL을 선택했습니다…"라고 표시되며 멈춥니다.

### Sakura Internet
- PHP 버전: 컨트롤 패널 → 스크립트 설정
- 데이터베이스: 컨트롤 패널 → 데이터베이스 → 신규 추가(문자 코드 utf8mb4). 사용자 이름은 계정 이름, 호스트 이름은 목록에 표시된 `mysqlNNN.db.sakura.ne.jp`입니다.

## 설치 프로그램이 하지 않는 일
- 이미 있는 Exment나 다른 사이트 위에 쓰지 않습니다(폴더에 파일이 있거나 Exment가 이미 있으면 멈춥니다). 업데이트는 [업데이트](/ko/update)를 보십시오.
- 테이블이 들어 있는 데이터베이스는 사용하지 않습니다(연결 확인에서 거부합니다).
- exment.net 이외에서 파일을 가져오지 않습니다. 내용(sha256)이 다른 파일은 사용하지 않고 삭제합니다.
- 데이터베이스 비밀번호를 저장하거나 표시하지 않습니다.
- 끝난 후에는 남지 않습니다(삭제할 수 없을 때는 화면 안내대로 FTP로 삭제하십시오).

## 잘 되지 않을 때
- **"이 릴리스에는 PHP 8.x 이상이 필요합니다"**: 서버 관리 화면에서 PHP 버전을 올리고, 페이지를 다시 열어 "계속"을 누릅니다.
- **키를 여러 번 잘못 입력함**: 약 10분 기다린 후 다시 입력합니다.
- **처음부터 다시 하고 싶음**: 화면 아래의 "처음부터 다시"를 누릅니다(배치한 Exment 파일도 삭제합니다).
- 그 밖에는 [설치 시 오류](/ko/install_error)를 보십시오.
