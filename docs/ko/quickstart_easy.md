# 설치 절차(간편 설치)
zip 파일을 두고 화면의 안내에 따라 Exment를 설치하는 절차입니다.  

절차는 다음 3가지입니다.

1. 서버를 준비한다
2. zip 파일을 다운로드하여 서버에 푼다
3. 브라우저에서 Exment를 열고 화면의 안내에 따라 설치한다

> ※ 수동 설치나 버전을 지정한 설치를 할 때는 [수동 설치](/ko/quickstart_manual)를 보십시오.

## 주의할 점
- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 보십시오.
- <span class="red bold">※ 설치 절차나 서버 구축에 관한 개별 문의는 받지 않습니다. 개별 대응이 필요할 때는 유상 지원을 이용하십시오.</span>　　

## 서버 구축
웹 서버나 데이터베이스 서버를 아직 준비하지 않았을 때는 먼저 준비하십시오.  
절차는 [서버 설정](/ko/server)을 보십시오.


## Exment 앱 설정
서버가 준비되면 Exment 앱을 둡니다.

### zip 다운로드·압축 풀기
<script>
        //화면을 열었을 때 실행
        window.addEventListener('load', (event) => {
        var link = document.getElementById('link');
        //a 요소의 href 속성 값을 가져온다
        var oldHref = link.getAttribute('href');
        //현재 시각을 설정(yyyyMMddHHmmss)
        function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        return format;
        };
        var date = new Date
        //replace로 oldHref를 새 값으로 바꾼다
        var newHref = oldHref.replace(oldHref, 'https://exment.net/downloads/en/exment.zip?ver='+ formatDate(date,'yyyyMMddHHmmss'));
        //바꾼 값을 a 요소의 href 속성에 설정한다
        link.setAttribute('href', newHref);
      });
</script>

- 다음 링크에서 zip 파일을 다운로드합니다.  
<a id="link" href="https://exment.net/downloads/en/exment.zip" target="_blank">[Exment zip 파일(최신 버전)]</a>  
지금의 최신 버전은 **v7.2.4**(2026/11/24 공개·PHP 8.2 이상)입니다. 버전별 zip·공개일·SHA-256·대응하는 PHP는 [다운로드 페이지](https://exment.net/ko/download/)에 있습니다(다운로드한 파일이 손상되지 않았는지도 거기에서 확인할 수 있습니다).            
  
- 꼭 PHP7.4를 써야 할 때는 다음 링크에서 다운로드하십시오. 이 버전은 지원·문의·Github issue 등의 대상이 아닙니다. 또 예고 없이 삭제할 수 있습니다.  
<a href="https://exment.net/downloads/en/exment_v4_4_2.zip" target="_blank">[Exment zip 파일(PHP 7.4에서 동작하는 마지막 버전: v4.4.2)]</a>


- zip 파일을 PHP가 동작하는 곳에 풉니다.  
예 1(XAMPP Windows): C:\xampp\local\exment  
예 2(XAMPP Mac): /Applications/XAMPP/local/exment  
예 3(XServer): $HOME/domain.com.foobar/exment/  
  
- <span class="red bold">서버의 공개 폴더(예: linux의 경우 /var/www/html) 바로 아래에 zip 파일을 그대로 넣지 마십시오. 데이터베이스의 설정이나 메일의 비밀번호 등이 적힌 설정 파일이 밖에서 보이게 되어, 중대한 정보 유출로 이어집니다.</span>  


## 초기 데이터 설치
화면의 안내에 따라 Exment를 설치합니다.  
※ 각 설정 화면의 "초기화"를 누르면 언어와 시간대 설정부터 설치를 다시 합니다.

### 설치 화면에 접속
먼저 브라우저에서 Exment의 페이지를 엽니다.  
예: http(s)://(귀하의 사이트 URL)  


### 언어와 시간대 설정
언어와 시간대를 정합니다.  
필요할 때는 초기값에서 바꾸십시오.  
![설치 화면_설정](../img/quickstart/setting_windows1.png)  


### 데이터베이스 설정
데이터베이스의 설정을 입력합니다.  
쓰시는 환경에 맞추어 다음 내용을 입력하십시오.   
※ 값을 모를 때는 [서버 설정](/ko/server)의 각 환경의 절차에 적혀 있으니 다시 확인하십시오.
~~~
데이터베이스의 종류
데이터베이스의 호스트 이름
데이터베이스의 포트 번호
Exment용 데이터베이스 이름
Exment용 데이터베이스의 사용자 이름
Exment용 데이터베이스의 비밀번호
~~~  

![설치 화면_설정](../img/quickstart/setting_windows2.png)  
  

### 시스템 요구 사항 확인
Exment를 실행하는 데 필요한 서버의 설정을 확인하는 화면입니다.  
웹 서버 등의 설정값을 조사하여, 권장하지 않는 설정이나 문제가 있는 설정이 있으면 경고나 오류를 냅니다.  
※ 오류가 있으면 다음 화면으로 나아갈 수 없습니다.  
※ 이 화면의 자세한 설명은 [서버 설정](/ko/server)의 "시스템 요구 사항 확인"을 보십시오.

![설치 화면_설정](../img/quickstart/setting_windows4.png)  


### 설치 실행
"설치 실행"을 누르십시오.  
![설치 화면_설정](../img/quickstart/setting_windows3.png)  

> **선택 사항: 비밀번호의 해시 비용**  
> 비밀번호는 bcrypt로 해시되며, 계산 비용(라운드 수)의 기본값은 12입니다. 바꾸고 싶을 때는 ".env"에 `BCRYPT_ROUNDS`를 추가하십시오. 설정 예는 [수동 설치](/ko/quickstart_manual)를 참조하십시오.

### 설정 완료
설치가 끝나면 이어서 [초기 설정](/ko/first_setting)을 하십시오.  

## 그 밖의 추가 설정
여기까지의 작업으로 Exment를 쓰기 시작할 수 있습니다. 다만 일부 기능을 쓰려면 추가 설정이 필요합니다.  
다음 페이지를 확인하십시오.  
- [추가 설정](/ko/quickstart_more)


[← 설치 - 개요로 돌아가기](/ko/quickstart)
