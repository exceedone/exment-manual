# 알림 시 첨부 파일의 암호화
메일 알림에는 첨부 파일을 붙일 수 있습니다.  
여기의 설정을 하면 그 첨부 파일을 시스템이 자동으로 암호화한 뒤에 보냅니다(암호화한 zip 파일이 됩니다).

설정은 다음 2가지입니다.

1. `.env`에 1줄을 추가한다(Windows·Linux 공통)
2. 서버에 zip을 만드는 소프트웨어를 설치한다(Windows와 Linux에서 다릅니다)

## Windows, Linux 공통

- 다음 내용을 `.env`에 추가합니다.

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- 암호화한 zip 파일을 만들기 위해 7-zip을 설치합니다.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- yum 등 OS의 패키지 명령으로 zip을 설치합니다.

~~~
// CentOS의 경우
yum install zip
~~~

이것으로 설정은 끝입니다.
