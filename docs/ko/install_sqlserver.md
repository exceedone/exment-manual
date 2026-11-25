# SQL Server 설치 절차
Exment의 데이터베이스로 SQL Server를 사용하기 위한 절차입니다.

- <span class="red bold">※ 현재 백업·복원 기능은 지원하지 않습니다.</span>
- 절차는 OS, 버전, 설치한 시기 등에 따라 다른 경우가 있습니다.

## 절차의 흐름
1. **SQL Server를 준비한다**(설치, 데이터베이스와 사용자 생성) … "SQL Server 설정"
2. **연결되는지 확인한다** … "연결 확인"
3. **Exment에서 연결한다**(PHP 드라이버를 설치하고 Exment를 설치한다) … "Exment 설정"

## SQL Server 설정

### SQL Server 설치
1. 다음 사이트에서 SQL Server를 내려받습니다.  
※ 에디션은 용도나 사업 규모 등에 맞게 선택하십시오.  
[SQL Server 다운로드](https://www.microsoft.com/ko-kr/sql-server/sql-server-downloads)  

2. 내려받은 파일을 실행하여 설치를 진행합니다.  
![SQL Server 설치](../img/database/sqlserver1.png)  

3. 설치가 끝납니다.

### SQL Server Management Studio(GUI 도구) 설치
SQL Server Management Studio는 SQL Server를 화면에서 조작하기 위한 도구입니다.

- 다음 사이트를 엽니다.  
"사용 가능한 언어"에서 "한국어"를 클릭하여 도구를 내려받고 설치하십시오.  
https://docs.microsoft.com/ko-kr/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15#available-languages



### 추가 설정(Windows)
※ 현재 Windows에 SQL Server를 설치한 경우에 아래 설정이 필요한 것을 확인했습니다.

1. Windows 시작 메뉴에서 "SQL Server 구성 관리자"를 엽니다.  
![SQL Server 설치](../img/database/sqlserver5.png)  

2. 왼쪽 메뉴에서 "SQL Server 네트워크 구성" → "(에디션 이름)에 대한 프로토콜"을 클릭합니다. 그런 다음 "TCP/IP"를 마우스 오른쪽 버튼으로 클릭하고 "사용"을 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver6.png)  
![SQL Server 설치](../img/database/sqlserver7.png)  
![SQL Server 설치](../img/database/sqlserver8.png)  

3. 시작 메뉴 버튼을 클릭하고 "서비스"라고 입력하여, 표시된 "서비스" 앱을 실행합니다.  
![SQL Server 설치](../img/database/sqlserver11.png)  

4. 서비스 목록에서 "SQL Server (에디션 이름)"을 선택하고 "서비스 다시 시작"을 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver12.png)  


### 데이터베이스 생성, 사용자 추가
1. "SQL Server Management Studio"를 실행합니다.  
![SQL Server 설치](../img/database/sqlserver13.png)  

2. 로그인합니다.  
![SQL Server 설치](../img/database/sqlserver14.png)  

#### 데이터베이스 생성
1. 왼쪽 메뉴에서 "데이터베이스" 폴더를 마우스 오른쪽 버튼으로 클릭하고 "새 데이터베이스"를 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver15.png)  

2. 원하는 데이터베이스 이름을 입력하고 확인을 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver16.png)  

#### 사용자 추가
1. 왼쪽 메뉴에서 "보안" → "로그인"을 마우스 오른쪽 버튼으로 클릭하고 "새 로그인"을 선택합니다.  
![SQL Server 설치](../img/database/sqlserver17.png)  

2. 로그인 이름과 암호를 입력하고 "SQL Server 인증"을 선택합니다. "암호 정책"은 체크를 해제하는 것을 권장합니다. (소속된 회사·조직 등의 정책에 따르십시오.)  
![SQL Server 설치](../img/database/sqlserver18.png)    

3. 왼쪽 위의 "사용자 매핑"을 선택합니다.  
"이 로그인으로 매핑된 사용자"의 데이터베이스 목록에서 방금 만든 데이터베이스를 선택합니다.  
"데이터베이스 역할 멤버 자격"에서 다음 항목을 선택합니다.
   - db_backupoperator
   - db_ddladmin
   - db_datawriter
   - db_datareader
   - public
   - dbcreator(※ 수동으로 데이터를 백업·복원할 때 사용합니다. 수동으로 데이터를 백업·복원하는 경우에 체크하십시오.)

   ![SQL Server 설치](../img/database/sqlserver19.png)    

4. 모두 끝나면 확인을 클릭합니다.

#### 서버 로그인 설정
1. 왼쪽 메뉴에서 왼쪽 위의 서버를 마우스 오른쪽 버튼으로 클릭하고 "속성"을 선택합니다.  
![SQL Server 설치](../img/database/sqlserver20.png) 

2. "보안" 메뉴에서 "서버 인증"에 "SQL Server 및 Windows 인증 모드"를 선택하고 확인을 클릭합니다.

3. 시작 메뉴 버튼을 클릭하고 "서비스"라고 입력하여, 표시된 "서비스" 앱을 실행합니다.  
![SQL Server 설치](../img/database/sqlserver11.png)  

4. "서비스" 앱에서 다시 "SQL Server (에디션 이름)"을 선택하고 "서비스 다시 시작"을 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver12.png)  

#### 포트 확인
- "SQL Server 구성 관리자"에서 "TCP/IP"를 마우스 오른쪽 버튼으로 클릭하고 "속성"을 클릭합니다.  
그런 다음 "IP 주소" 탭을 열고 맨 아래의 "TCP 동적 포트" 값을 확인합니다. (나중에 Exment의 데이터베이스 설정에서 사용합니다.)  
![SQL Server 설치](../img/database/sqlserver9.png)  
![SQL Server 설치](../img/database/sqlserver10.png)  


## 연결 확인
SQL Server에 연결되는지 확인합니다.

1. "SQL Server Management Studio"를 실행합니다.  
![SQL Server 설치](../img/database/sqlserver13.png)  

2. 다음 내용으로 로그인합니다.
    - 서버 이름: 기본 서버 이름
    - 인증: SQL Server 인증
    - 사용자 이름: 만든 사용자의 사용자 이름
    - 암호: 만든 사용자의 암호

    ![SQL Server 설치](../img/database/sqlserver22.png)  

3. 정상적으로 로그인되는지 확인합니다.  
설정이 올바르게 끝나지 않았으면 오류가 나옵니다.


## Exment 설정
Exment에서 SQL Server에 연결하기 위한 환경 구성과 설정을 합니다.

### 드라이버 설치
드라이버(PHP에서 SQL Server에 연결하기 위한 부품)를 설치합니다. Exment를 설치한 서버의 OS에 따라 절차가 다릅니다.

#### Windows
1. 다음 명령을 실행합니다.  
결과에 파일 경로가 나오므로 메모합니다.

```
php -i | find "extension_dir"
# 결과 예
extension_dir => C:\xampp\php\ext => C:\xampp\php\ext
```


2. 다음 사이트에서 PHP에서 Microsoft SQL Server에 연결하기 위한 드라이버를 내려받습니다.  
https://docs.microsoft.com/ko-kr/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver15

3. 내려받은 EXE 파일을 실행합니다. 다음과 같은 대화 상자가 나옵니다.  
![SQL Server 설치](../img/database/sqlserver2.png)

4. 절차 1에서 메모한 파일 경로를 붙여 넣고 "OK"를 클릭합니다.  
![SQL Server 설치](../img/database/sqlserver3.png)

5. SQL Server에 연결하기 위한 dll 파일이 PHP 확장 라이브러리 폴더에 놓입니다.  
![SQL Server 설치](../img/database/sqlserver4.png)

6. php.ini 파일을 열고 파일 끝에 다음 내용을 적습니다.  
※ 파일 이름은 주석의 내용에 맞게 바꾸십시오.

```
extension=php_pdo_sqlsrv_82_ts_x64.dll
# "82" 부분: 사용하는 PHP 버전. PHP8.3을 사용하면 83
# "ts" 부분: 명령 "php -i | find "Thread Safety""를 실행했을 때 "enabled"라고 나오면 "ts"를, "disabled"라고 나오면 "nts"를 적는다
# "x64" 부분: 명령 "php -v"를 실행했을 때 첫 줄에 "x64"가 들어 있으면 "x64"를, 그렇지 않으면 "x86"을 적는다
```

7. PHP를 다시 시작합니다. 이것으로 Windows에서의 설정은 끝입니다.


#### Linux

[여기](https://docs.microsoft.com/ko-kr/sql/connect/php/installation-tutorial-linux-mac?view=sql-server-ver15)의 절차대로 각 OS에 ODBC 드라이버와 PHP 드라이버를 설치하십시오.


### Exment 설정
- 이후에는 [설치 절차](/ko/quickstart)대로 설치를 진행하십시오.

- 데이터베이스 설정 화면에서는 다음 값을 입력하십시오.
    - 데이터베이스 유형 : SQL Server
    - 호스트 이름 : 서버 이름
    - 포트 : TCP/IP 화면에서 확인한 포트 번호
    - 데이터베이스 : 만든 데이터베이스 이름
    - 사용자 이름 : 만든 사용자 이름
    - 비밀번호 : 만든 사용자의 비밀번호
