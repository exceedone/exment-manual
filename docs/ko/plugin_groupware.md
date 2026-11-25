# Groupware(공식 플러그인)
"Groupware"는 Exment의 그룹웨어 **공식 플러그인**입니다. 무료로 사용할 수 있습니다. 지금 있는 것은 다음 2가지입니다.

- **웹 메일**: Outlook·Gmail과 같은, 브라우저의 메일 소프트웨어
- **Office**: Word(.docx)·Excel(.xlsx)·PowerPoint(.pptx) 파일을 브라우저에서 동작하는 Office(주식회사 ibis의 [ibisOffice](https://github.com/ibisjp/ibis-office))로 열기·편집하기

- 소스 코드·설명: [exceedone/exment-plugins(groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- 라이선스: GPL-3.0(Exment와 같음). ibisOffice는 AGPL-3.0-only입니다([ibisOffice의 라이선스](/ko/plugin_groupware?id=ibisOffice의-라이선스)).
- 플러그인 목록에 나오는 이름: Exment Plugin Groupware. 내부 이름은 `ExmentGroupware`, URL은 `/plugins/exment_groupware` 입니다.

<!-- 화면 사진: 웹 메일(img/plugin_groupware/gw_mail.png)과 Office로 연 파일(img/plugin_groupware/gw_office.png). d9가 확인한 뒤에 찍는다 -->

## 웹 메일
Exment는 메일 서버를 가지고 있지 않습니다. Outlook과 마찬가지로, 회사가 지금 쓰고 있는 메일 서버에 **IMAP**(수신)과 **SMTP**(전송)로 연결합니다. 메일은 서버에 남으므로 Outlook이나 스마트폰의 메일과 나란히 쓸 수 있습니다. Exment에 메일을 복사하지 않습니다.

- 폴더·목록(최신순, 한 페이지 50건)·읽기 창·검색(제목·보낸 사람·받는 사람·본문. 일본어도 가능)·안 읽음/플래그 지정으로 좁히기·플래그·이동(폴더로 끌어다 놓기도 가능)·스팸 메일·휴지통으로 삭제·폴더 만들기
- 새 메일·답장·전체 답장·전달(첨부까지)·Cc/Bcc·첨부(한 통에 25MB까지)·간단한 서식·서명·초안. `Ctrl+Enter` 로 전송
- 한 사람이 여러 계정을 사용할 수 있습니다. 받은 편지함의 안 읽은 수를 1분마다 확인합니다.
- 일본어 메일(ISO-2022-JP·Shift_JIS)을 그대로 읽을 수 있습니다.

| 서비스 | 로그인 | 서버 |
| --- | --- | --- |
| Xserver | 비밀번호(사용자 이름은 메일 주소) | `sv****.xserver.jp`, IMAP 993/SMTP 465(SSL) |
| KAGOYA | 비밀번호(사용자 이름은 메일 계정 이름) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465(SSL) |
| Microsoft 365 | Microsoft로 로그인(OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587(STARTTLS) |
| Gmail·Google Workspace | Google로 로그인(OAuth 2.0), 또는 앱 비밀번호 | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| 그 밖 | 비밀번호 | 어느 IMAP·SMTP 서버든 |

### Microsoft 365·Google을 사용할 때
시스템 관리자가 앱을 한 번 등록하고, 플러그인의 설정("관리자 설정" → "플러그인" → "Exment Plugin Groupware" → 「設定」(설정))에 넣습니다. 설정 화면에 등록할 리디렉션 URI(`…/plugins/exment_groupware/mail/oauth/callback`)가 나옵니다.

- Microsoft: Azure portal의 "앱 등록"에서 웹 앱을 만듭니다. Office 365 Exchange Online의 위임된 권한 `IMAP.AccessAsUser.All`·`SMTP.Send` 와 `offline_access openid email profile` 이 필요합니다. 테넌트의 관리자가 그 사용자의 SMTP 인증(SMTP AUTH)을 허용해야 합니다.
- Google: Google Cloud console에서 OAuth 클라이언트 ID(웹 애플리케이션)를 만들고, 스코프는 `https://mail.google.com/` 입니다. 사내에서 쓰는 Google Workspace라면 "내부" 앱으로 하면 Google의 심사는 필요 없습니다.

### 사용 방법
1. 왼쪽 메뉴의 「メール」(메일. 또는 `/plugins/exment_groupware/mail`)을 엽니다.
2. 「アカウントを追加する」(계정 추가)를 누르고 서비스를 선택합니다.
3. Xserver·KAGOYA·그 밖은 비밀번호를 넣습니다. Microsoft 365·Google은 「サインイン」(로그인)을 눌러 각각의 화면에서 로그인합니다.

### 보안
- 비밀번호·토큰은 앱의 키(`APP_KEY`)로 암호화하여 저장합니다.
- HTML 메일은 서버에서 위험한 부분을 없애고, 스크립트가 동작하지 않는 틀에서 표시합니다. 외부의 이미지는 「画像を表示」(이미지 표시)를 누를 때까지 읽어 들이지 않습니다.
- 연결할 수 있는 것은 인터넷 주소의 메일 포트뿐입니다. 사내 네트워크의 메일 서버에 연결할 때는 관리자가 설정의 「社内のネットワークのメールサーバーを許可する」(사내 네트워크의 메일 서버 허용)을 켭니다.

## Office
### 파일 공유의 파일
[파일 공유](/ko/file_server)의 Word·Excel·PowerPoint 파일의 화면에 "Office에서 열기" 버튼이 나옵니다.

- 누르면 새 탭에서 편집기가 열립니다. **저장**하면 파일의 새 버전이 됩니다(이전 버전은 버전 기록에 남습니다).
- 편집하려고 열어 둔 동안은 **체크아웃**이 되어 다른 사람은 변경할 수 없습니다. 편집기를 닫으면 체크인합니다. 보기만 하는 권한의 사람이나, 다른 사람이 체크아웃한 파일은 읽기 전용으로 엽니다.
- 그 사이에 다른 사람이 저장했을 때는 저장을 거부하므로, 덮어써서 사라지는 일은 없습니다.
- 서버에 LibreOffice가 없을 때는 파일 화면의 미리 보기 칸에 편집기를 읽기 전용으로 끼워 넣습니다. **LibreOffice는 필요 없습니다**(ibisOffice는 브라우저 안에서 동작합니다).
- 오른쪽 위의 닫기(×)를 누르면 체크인하고 편집기를 떠납니다. "Office에서 열기"로 연 탭은 닫고, 그렇지 않으면 파일 화면으로 돌아갑니다(0.4.4부터). 미리 보기에는 닫기를 내지 않습니다.
- **내용이 빈 파일**(0바이트. Windows의 "새로 만들기 → Word 문서"로 만든 것 등)은 이름의 확장자(docx·xlsx·pptx) 종류의 새 문서로 엽니다. 저장하면 그 이름의 진짜 문서가 됩니다(0.4.4부터. 그보다 이전에는 스프레드시트로 열었습니다).

### 데이터의 첨부 파일
데이터에 첨부한 Word·Excel·PowerPoint도 브라우저의 Office로 볼 수 있습니다(프로젝트 관리의 과제·Wiki·프로젝트의 파일 등). 파일 공유가 없어도 동작합니다.

- 볼 수 있는 것은 그 파일을 다운로드할 수 있는 사람뿐입니다.
- 그 데이터를 편집할 수 있는 사람에게는 「編集する」(편집하기)가 나옵니다. 저장하면 첨부의 내용이 새로워지고, 주소는 바뀌지 않습니다. 데이터에는 누가 편집했는지와 이전 내용으로 가는 링크가 댓글로 남습니다.
- Exment v7.2.1 이상에서는 이전 내용이 첨부의 "이전 버전"("버전 n")으로 남습니다([교체와 이전 버전](/ko/data_details)). 첨부 파일 하나에 10개까지(`EXMENT_DOCUMENT_VERSION_LIMIT`)이며, 넘으면 오래된 것부터 사라지고, 첨부를 지우면 함께 사라집니다.
- 그보다 이전의 Exment에서는 이전 내용이 다른 파일로 남고, 댓글의 링크에서만 열 수 있습니다. 첨부를 지워도 이 파일은 사라지지 않습니다.
- 편집할 수 있는 것은 첨부뿐입니다(파일 열의 값은 대상이 아님). `EXMENT_FILE_DELETE_USERONLY` 가 `true` 인 사이트에서는 파일을 올린 사람뿐입니다. 저장할 수 있는 크기는 50MB까지(Exment의 업로드 상한이 더 작으면 그쪽)입니다.

## 기능 관리(Exment v7.2.1 이상)
- 웹 메일은 "관리자 설정" → "[기능 관리](/ko/feature)"에 「メール」(메일. `exment_groupware.mail`)의 한 줄로 나옵니다. 시스템 관리자가 사용·사용 안 함과 사용할 수 있는 역할 그룹을 선택합니다.
- 전부터 이 플러그인을 설치해 둔 사이트에서는 업데이트해도 "사용"인 채입니다. **새로 설치한 사이트에서는 "사용 안 함"에서 시작하므로**, 기능 관리에서 「メール」(메일)을 "사용"으로 해 주십시오(사용 안 함인 동안은 메일 화면이 404가 됩니다).
- Office는 파일 공유 기능을 따릅니다. 파일 공유가 "사용 안 함"일 때는 파일 공유의 "Office에서 열기"는 열리지 않습니다.

## 동작 요건
- Exment 7.1 이상(7.1·7.2에서 확인했습니다)과 PHP 8.2 이상. 웹 메일과 데이터의 첨부는 어느 쪽에서도 동작합니다.
- 파일 공유의 파일을 열려면 파일 공유가 있는 Exment(v7.2.1 이상)가 필요합니다. 없을 때는 그 부분만 동작하지 않습니다.
- ibisOffice의 설치에는 PHP의 `zip` 확장과, 쓸 수 있는 사이트의 `public/`(약 125MB)이 필요합니다.
- Office를 사용하려면 WebGPU가 있는 브라우저(Chrome·Edge, 또는 Safari 26 이상)와 HTTPS 사이트가 필요합니다.
- LibreOffice나 Docker는 필요 없습니다. XServer 등의 임대 서버에서도 동작합니다(서버는 파일을 건네줄 뿐이고, Office는 브라우저 안에서 동작합니다).

## 설치
1. 플러그인을 설치합니다. Exment v7.2.1 이상은 "기능 관리"에서, 그보다 이전은 zip 업로드입니다. [공식 플러그인](/ko/plugin_official)을 참조하십시오.
2. Office를 사용할 때는 시스템 관리자로 플러그인 화면(`/plugins/exment_groupware`)을 열고 「ibisOffice 0.8.9 をインストールする」(ibisOffice 0.8.9 설치)를 누릅니다. ibisOffice의 릴리스(약 40MB, 풀면 125MB)를 다운로드하고, 정해진 SHA-256과 맞는지 확인한 뒤에 사이트의 `public/vendor/exment_groupware/ibisoffice/` 에 둡니다.

웹 서버가 여러 대일 때나 `public/` 에 쓸 수 없을 때는, 압축을 푼 릴리스를 다른 곳에서 공개하고, 플러그인 설정의 「ibisOffice の場所（URL）」(ibisOffice의 위치(URL))에 `index.html` 이 있는 폴더의 URL을 넣습니다.

### 웹 서버의 설정
편집기는 크기 때문에(`.wasm` 이 92MB, gzip으로 약 24MB), 압축하여 보내고 브라우저에 남겨 두게 하면 다운로드는 처음 한 번뿐이 됩니다. 그렇게 하지 않으면 열 때마다 10초쯤 기다릴 수 있습니다.

**Apache(XServer 등의 임대 서버도)**
- 0.4.4부터, 설치할 때 큰 파일의 `.gz` 복제본과 `public/vendor/exment_groupware/ibisoffice/.htaccess` 를 씁니다. `.wasm` 의 종류·1년의 캐시·gzip을 받을 수 있는 브라우저로의 `.gz` 복제본(복제본이 없을 때는 `mod_deflate` 로 압축)입니다.
- 어느 설정이나 `IfModule` 안에 있으므로, 없는 모듈은 건너뜁니다. 그러므로 `.htaccess` 를 쓸 수 있는지(`AllowOverride All`. Exment 자체의 `.htaccess` 에도 필요합니다)만 확인해 주십시오.
- 0.4.3 이전에 설치한 ibisOffice는 0.4.4로 업데이트한 뒤 플러그인 화면에서 다시 한 번 설치하면 복제본과 `.htaccess` 가 만들어집니다.

**nginx**
nginx는 `.htaccess` 를 읽지 않습니다. 사이트의 설정에 다음을 추가하고 설정을 다시 읽어 들입니다.

```nginx
# 사이트의 server { } 안, location / 보다 앞에
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # 설치할 때 쓴 .gz 복제본을 보낸다
    gzip on;                   # 복제본이 없는 것은 그 자리에서 압축
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # location 안에서 add_header를 쓰면 server { } 의 것이 사라지므로 다시 한 번 쓴다
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**어느 웹 서버에서나**
- **X-Frame-Options는 `DENY` 가 아니라 `SAMEORIGIN` 으로 합니다.** 편집기는 같은 사이트의 `iframe` 이므로, `DENY` 이면 브라우저가 표시를 거부합니다(화면이 빈 채로 있습니다). Content-Security-Policy의 `frame-ancestors` 도 `'self'` 로 합니다.
- Content-Security-Policy를 붙인 사이트는 `script-src 'self' 'wasm-unsafe-eval'` 이 필요합니다.
- COOP·COEP 헤더는 필요 없습니다.

## ibisOffice의 라이선스
ibisOffice는 주식회사 ibis의 소프트웨어이며, AGPL-3.0-only와 상용 라이선스의 듀얼 라이선스입니다. 이 플러그인은 ibisOffice를 릴리스 그대로(수정하지 않고) 다른 틀에서 동작시키고, 플러그인에는 포함하지 않습니다(ibis의 릴리스에서 다운로드합니다). 편집기 화면과 플러그인 화면에 "Powered by ibisOffice"를 냅니다.

## 관련 항목
- [공식 플러그인](/ko/plugin_official)
- [파일 공유](/ko/file_server)
- [README(GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
