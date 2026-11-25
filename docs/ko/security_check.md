# 보안 점검
이 사이트를 안전하게 운영하기 위한 설정을 확인합니다. "설정: 시스템" → "보안 점검"(URL은 `/security_check`)에서, 확인하고 싶은 설정과 지금의 상태가 목록으로 나옵니다.

※ 이 화면은 Exment v7.2.1 이후에서 쓸 수 있습니다.  
※ 이 화면을 볼 수 있는 것은 시스템 관리자뿐입니다.

![보안 점검](../ja/img/security_check/security_check1.png)

## 화면 보는 법
- 항목마다 문제가 없으면 ✓, 고쳐야 하는 것은 ✕, 이 서버에서는 확인할 수 없었던 것은 ⚠가 붙습니다.
- "수정이 필요합니다"인 항목은 그 아래에 나오는 "고치는 방법"대로 설정하십시오.
- 버튼이 있는 항목은 이 화면에서 고칠 수 있습니다. 고친 것은 작업 로그에 남습니다.
- "설정 방법 확인"을 누르면 그 항목의 설정 방법이 열립니다.
- 서버의 설정(웹 서버·php.ini·.env)은 서버 관리자에게 요청하십시오.

설치할 때도 "시스템 요구 사항 확인" 화면에, 서버의 항목 중 고치는 편이 좋은 것이 나옵니다(보기만 합니다. 설치는 멈추지 않습니다).

## 항목
| 항목 | 확인하는 것 |
|---|---|
| 중요 파일의 권한 | `.env`·설정 캐시에는 데이터베이스의 비밀번호 등 비밀이 들어 있습니다. 서버의 다른 사용자가 읽을 수 없게 합니다(640 등). storage도 누구나 읽고 쓸 수 있는 형태로 하지 않습니다 |
| 디버그 모드(APP_DEBUG) | 디버그 모드에서는 오류의 자세한 내용이 화면에 나옵니다. 운영 환경에서는 OFF로 합니다 |
| 애플리케이션 키(APP_KEY) | 암호화와 세션의 서명에 쓰는 키입니다. 사이트마다 만든 값이 필요합니다 |
| 실행 환경(APP_ENV) | 운영 사이트는 `production`으로 합니다 |
| https | 비밀번호나 데이터가 통신 도중에 읽히지 않도록 https로 씁니다. 웹 서버에 인증서를 넣고, `.env`의 `APP_URL`을 `https://`로 시작하는 URL로 합니다 |
| 보안 헤더 | 다른 사이트 안에 표시하지 않는다·파일의 종류를 추측하지 않는다·링크 출처를 지나치게 내보내지 않는다·https만 쓴다고 브라우저에 전하는 헤더(X-Frame-Options·X-Content-Type-Options·Referrer-Policy·Strict-Transport-Security)입니다. 웹 서버에서 설정합니다 |
| 외부에서 보이면 안 되는 항목 | `.env`·`.git`·`storage`·`vendor`를 브라우저에서 열 수 없게 합니다(403이나 404가 될 것) |
| 시스템 관리자의 비밀번호 | 처음에 넣은 그대로의 비밀번호나 사용자 코드와 같은 비밀번호는 쓰지 않습니다. 오른쪽 위 사용자 메뉴의 "설정"에서 바꿉니다 |
| 2단계 인증 | 비밀번호 외에 메일이나 인증 앱의 코드로 로그인을 확인합니다([로그인 설정](/ko/login_setting)) |

### 보안 헤더의 설정 예
웹 서버에 다음 행을 더합니다. 더했으면 웹 서버를 다시 읽어 들이고(Apache의 .htaccess는 그대로 반영됩니다), 이 화면에서 다시 확인하십시오.

~~~
# nginx(server { } 안)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
# https일 때만
add_header Strict-Transport-Security "max-age=31536000" always;
~~~

~~~
# Apache(Exment의 public/.htaccess의 맨 앞, 또는 Apache의 설정. mod_headers가 필요합니다)
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    # https일 때만
    Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>
~~~

- Strict-Transport-Security는 https로 쓰는 사이트에만 붙입니다. 붙이면 브라우저는 그 사이트를 1년 동안 https로만 엽니다.
- nginx에서 `location { }` 안에도 `add_header`가 있을 때는 그 `location` 안에도 같은 행을 씁니다(안에 쓰면 밖의 `add_header`는 쓰이지 않습니다).
- 임대 서버(Xserver 등)에서는 .htaccess에 씁니다.

### "확인할 수 없습니다"라고 나올 때
보안 헤더와 외부에서 보이면 안 되는 항목은 서버에서 자신의 사이트에 문의하여 확인합니다. 서버에서 자신의 사이트에 닿지 않는 환경(Docker 안·방화벽 안쪽 등)에서는 확인할 수 없습니다. 그때는 화면에 나오는 주소를 서버 밖에 있는 PC의 브라우저에서 열어 확인하십시오.

## 관련 항목
- [튜닝](/ko/tuning)
- [기능 관리](/ko/feature)
- [로그인 설정](/ko/login_setting)
