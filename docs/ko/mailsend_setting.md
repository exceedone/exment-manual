# 메일 전송 설정
Exment에서 메일을 보내기 위한 설정과, 설정한 뒤에 테스트 메일을 보내는 절차입니다.  

절차는 다음 2가지입니다.

1. 메일을 보내는 방법을 설정한다(보통은 시스템 설정 화면에 SMTP의 설정을 입력합니다)
2. 테스트 메일을 보내서 도착하는지 확인한다

> ※ "메일이 도착하지 않는다", "메일이 스팸 메일로 분류된다"와 같은 메일 전송 기능에 대해서는 각 서버나 환경에 따른 부분이 크기 때문에, 문의 대상에서 제외합니다.  

## 개요
- Exment는 시스템에서 메일을 보내는 일이 있습니다.  
예:
    - 데이터 업데이트 알림
    - 2단계 인증

- 메일을 보내려면 SMTP 등의 설정이 필요합니다.

- 설정 방법은 2가지가 있습니다.
    - [화면에서 설정(기본)](/ko/mailsend_setting?id=설정-방법-화면에서-설정) :   
    시스템 설정 화면에 SMTP의 설정을 입력합니다. 보통의 SMTP로 메일을 보낼 때는 이쪽을 씁니다.
    
    - [config 파일이나 env 파일로 설정](/ko/mailsend_setting?id=설정-방법-config-파일이나-env-파일로-설정):  
    Amazon SES 등 SMTP가 아닌 방법으로 메일을 보낼 때 씁니다. 서버에서 설정 파일을 고치거나 composer를 쓰거나 합니다. ※ 상급자용입니다.

### 설정 방법-화면에서 설정
- 시스템 관리자가 시스템 설정 화면을 엽니다.

- 다음 설정을 입력합니다.
![시스템 설정 화면](../img/system_setting/system_setting_mail.png)  

- "호스트 이름"을 입력하고 저장하면 Exment는 화면의 설정을 써서 SMTP로 메일을 보냅니다.  
".env"의 "MAIL_MAILER"가 Laravel의 초기값인 "log"(메일을 보내지 않고 로그에 출력하는 설정) 그대로여도 SMTP로 보냅니다.  
※ ".env"의 "MAIL_MAILER"에 "log" 이외(sendmail, ses 등)를 설정했을 때는 그 전송 방법을 씁니다.  
※ ".env"에 "EXMENT_MAIL_SETTING_ENV_FORCE=true"를 설정했을 때는 화면의 설정은 쓰지 않습니다. 자세한 내용은 [config 파일이나 env 파일로 설정](/ko/mailsend_setting?id=설정-방법-config-파일이나-env-파일로-설정)을 보십시오.

※ SMTP 설정 예(Xserver의 경우): [여기](https://www.xserver.ne.jp/manual/man_mail_setting.php)  

※ SMTP 설정 예(사쿠라 인터넷의 경우): [여기](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)  


### 설정 방법-config 파일이나 env 파일로 설정
Exment는 보통 화면의 "시스템 설정"에 등록한 값으로 메일을 보냅니다.  
Amazon SES 등 SMTP가 아닌 방법으로 메일을 보내고 싶을 때는 Laravel의 표준 방법(".env" 파일에 설정을 쓰는 방법)을 쓸 수 있습니다.  
이 방법을 쓸 때는 다음 설정을 하십시오. ※ 상급자용입니다.


- .env 파일을 열고 다음 설정값을 입력합니다.

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- 그런 뒤에 Laravel의 메일 전송 드라이버를 설정하십시오.

- 아울러 다음 설정도 .env에 입력하는 것을 권장합니다.

~~~
MAIL_FROM_ADDRESS=(보낸 사람 주소)
MAIL_FROM_NAME=(보낸 사람으로 표시되는 이름)
~~~

## SPF 레코드 설정
- 보낸 메일이 스팸 메일이 될 때는 대부분 도메인의 "SPF 레코드" 설정이 모자랍니다. 도메인의 설정에서 SPF 레코드를 등록하십시오.  
[참고 1](https://sendgrid.kke.co.jp/blog/?p=3509)  
[참고 2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/)  


## 테스트 메일 전송
- 위의 설정으로 테스트 메일을 보낼 수 있습니다.  
화면에서도 명령으로도 보낼 수 있습니다.

### 화면에서 실행
- 시스템 관리자가 시스템 설정 화면을 엽니다.

- "테스트 메일 전송" 항목에 받는 사람을 입력하고 [테스트 메일 전송]을 누릅니다.

![시스템 설정 화면](../img/system_setting/system_setting_mail_testmail.png)  

※ 먼저 페이지 위쪽에 있는 "시스템 메일 설정"을 저장해야 합니다. 한 번 저장한 뒤에 테스트 메일을 보내십시오.


### 명령으로 실행
- 프로젝트의 루트 폴더에서 다음 명령을 실행하십시오.

~~~
php artisan exment:notifytest --to=(메일 받는 사람)
~~~

### 전송 오류가 났을 때
- "storage/logs/laravel.log"에 오류 로그가 나오니 확인하십시오.
