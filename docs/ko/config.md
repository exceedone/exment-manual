# Exment 설정값 목록
Exment(및 관련 라이브러리)에서는 프로젝트 폴더 안의 ".env" 파일을 고쳐서 내부 설정을 바꿀 수 있습니다.  
이 페이지는 ".env" 파일에서 쓸 수 있는 설정값의 목록입니다. 항목마다 설정 키, 기본값, 역할을 적었습니다.  

## 설정 방법
프로젝트 폴더에 있는 ".env" 파일을 열고, 다음과 같이 "설정 키=값" 형식으로 추가해 주십시오.  
※이미 같은 이름의 키가 있으면 그 값을 고쳐 주십시오.

~~~
#예1
EXMENT_API=false

#예2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※"="의 앞뒤에는 공백을 넣지 마십시오.

## 설정값 목록

#### 애플리케이션 언어
- 설정 키 : APP_LOCALE
- 기본값 : en
- 역할 : 애플리케이션에 표시하는 언어입니다. 일본어의 경우 "ja"를 입력해 주십시오.


#### 시간대
- 설정 키 : APP_TIMEZONE
- 기본값 : UTC
- 역할 : 애플리케이션에서 사용하는 시간대입니다. 일본의 경우 "Asia/Tokyo"를 입력해 주십시오.


#### "/admin" URL 변경
- 설정 키 : ADMIN_ROUTE_PREFIX
- 기본값 : admin
- 역할 : Exment를 표시할 때의 경로 이름입니다. 자세한 내용은 [여기](/ko/additional_prefix)를 확인해 주십시오.


#### 공개 폼의 "/publicform" URI 변경

- 설정 키 : EXMENT_PUBLICFORM_ROUTE_PREFIX
- 기본값 : publicform
- 역할 : 공개 폼을 표시할 때의 경로 이름입니다. 자세한 내용은 [여기](/ko/publicform)의 "URL에 포함된 "publicform" 변경"을 확인해 주십시오.


#### 캐시를 사용하도록 설정
- 설정 키 : EXMENT_USE_CACHE
- 기본값 : false
- 역할 : true인 경우 캐시를 사용합니다. 사용자 정의 테이블, 열, 뷰, 워크플로 등의 마스터 데이터를 캐시합니다. 환경에 따라 빨라지는 경우가 있습니다.


#### 매뉴얼 URL
- 설정 키 : EXMENT_MANUAL_URL
- 기본값 : https://exment.net/docs/#/
- 역할 : Exment의 매뉴얼 URL을 설정합니다.


#### 업데이트 이력 기본값
- 설정 키 : EXMENT_REVISION_COUNT
- 기본값 : 100
- 역할 : 데이터를 저장할 때 보관하는 업데이트 이력의 기본값입니다. 테이블을 새로 만들 때 사용합니다.


#### Composer 경로
- 설정 키 : EXMENT_COMPOSER_PATH
- 기본값 : (없음)
- 역할 : composer 명령의 경로입니다. 따로 지정하지 않으면 환경 변수 PATH에 등록되어 있는 것으로 봅니다.


#### MySQL 경로
- 설정 키 : EXMENT_MYSQL_BIN_DIR
- 기본값 : (없음)
- 역할 : mysql 명령의 경로입니다. 따로 지정하지 않으면 환경 변수 PATH에 등록되어 있는 것으로 봅니다.


#### 검색 인덱스 건수
- 설정 키 : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- 기본값 : 20
- 역할 : 각 테이블에 설정하는 검색 인덱스 열 수의 상한값입니다.  
<span class="red">※설정값의 변경은 본인 책임으로 해 주십시오. 개발사에서는 21건 이상에서의 동작을 확인하지 않았습니다.</span>


#### 리버스 프록시를 허용하는 IP
- 설정 키 : ADMIN_TRUST_PROXY_IPS
- 기본값 : 없음
- 역할 : 자세한 내용은 [여기](/ko/additional_reverse_proxy)를 확인해 주십시오.


#### 리버스 프록시의 판별 헤더
- 설정 키 : ADMIN_TRUST_PROXY_HEADERS
- 기본값 : 없음
- 역할 : 자세한 내용은 [여기](/ko/additional_reverse_proxy)를 확인해 주십시오.


#### Exment 표준 오류 처리 비활성화
- 설정 키 : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- 기본값 : false
- 역할 : true로 하면 Exment 패키지가 추가한 오류 처리를 비활성화합니다.


### 로그인
#### 기본 로그인 공급자 표시
- 설정 키 : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- 기본값 : true
- 역할 : Exment의 ID와 비밀번호를 사용하는 로그인 폼을 표시할지 여부를 바꿉니다. 싱글 사인온을 사용하는 경우에 이 설정이 적용됩니다. 자세한 내용은 [여기](/ko/login_sso)를 확인해 주십시오.

#### SSO 로그인 공급자 문자열
- 설정 키 : EXMENT_LOGIN_PROVIDERS
- 기본값 : (없음)
- 역할 : SSO에서 사용하는 공급자 이름 목록을 쉼표로 구분하여 설정합니다. 자세한 내용은 [여기](/ko/login_sso)를 확인해 주십시오.


#### 로그인 실패 횟수 측정
- 설정 키 : EXMENT_THROTTLE
- 기본값 : true
- 역할 : true인 경우, 로그인 실패가 일정 횟수 이어지면 일정 시간이 지날 때까지 로그인할 수 없게 됩니다.  

#### 로그인 실패 횟수
- 설정 키 : EXMENT_MAX_ATTEMPTS
- 기본값 : 5
- 역할 : 일정 시간 동안 로그인할 수 없게 될 때까지의 로그인 실패 횟수입니다.  

#### 로그인 실패 회복 시간(분)
- 설정 키 : EXMENT_DECAY_MINUTES
- 기본값 : 60
- 역할 : 로그인할 수 없게 된 경우, 다시 로그인할 수 있게 될 때까지의 시간(분)입니다. 

#### 브라우저를 닫으면 자동으로 로그아웃
- 설정 키 : EXMENT_SESSION_EXPIRE_ON_CLOSE
- 기본값 : false
- 역할 : true인 경우, 브라우저를 닫으면 자동으로 로그아웃합니다.

#### 로그인 화면의 헤더 로고 미사용
- 설정 키 : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- 기본값 : false
- 역할 : true인 경우, Exment의 시스템 설정에서 로고를 설정했더라도 로그인 화면에서 헤더를 사용하지 않습니다.

#### 2단계 인증 사용
- 설정 키 : EXMENT_LOGIN_USE_2FACTOR
- 기본값 : false
- 역할 : true인 경우, 로그인 설정 화면에 "2단계 인증" 설정이 표시되어 2단계 인증을 사용할 수 있게 됩니다. 자세한 내용은 [여기](/ko/login_2factor_setting)를 확인해 주십시오.

#### 2단계 인증(메일)의 인증 코드 유효 시간(분)
- 설정 키 : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- 기본값 : 10
- 역할 : 메일을 사용한 2단계 인증에서, 메일로 보낸 인증 코드가 유효한 시간(분)입니다.

#### SSO 로그인 설정 비활성화
- 설정 키 : EXMENT_CUSTOM_LOGIN_DISABLED
- 기본값 : false
- 역할 : true인 경우, SSO 등의 로그인 설정을 강제로 비활성화하고 Exment의 ID와 비밀번호를 사용하는 로그인 폼만 표시합니다. 자세한 내용은 [여기](/ko/login_sso)의 "SSO 로그인 설정 비활성화"를 확인해 주십시오.

#### IP 제한 비활성화
- 설정 키 : EXMENT_DISABLE_IP_FILTER
- 기본값 : false
- 역할 : true인 경우, 시스템 설정의 IP 주소 제한을 강제로 비활성화합니다. IP 주소 제한을 잘못 설정하여 접속할 수 없게 된 경우 등에 사용합니다. 자세한 내용은 [여기](/ko/additional_ip_filter)를 확인해 주십시오.


### 검색
#### 검색 시 전체 일치
> 시스템 설정 화면에서 변경하도록 바뀌었습니다.


#### 검색 화면에서 목록 화면으로 이동할 때의 필터 유무
- 설정 키 : EXMENT_SEARCH_LIST_LINK_FILTER
- 기본값 : true
- 역할 : true로 하면, 전체 데이터 검색 화면/관련 데이터 검색 화면에서 데이터 목록 화면으로 이동할 때, 입력한 검색 조건을 필터로 유지한 채 목록을 표시할 수 있습니다.


#### 검색 바에서 검색할 때, 사용자 정의 데이터의 "첨부 파일"의 파일 이름을 검색 대상으로 하기
- 설정 키 : EXMENT_SEARCH_DOCUMENT
- 기본값 : false
- 역할 : true로 하면, 검색 바에서 검색할 때 사용자 정의 데이터의 "첨부 파일"의 파일 이름을 검색 대상으로 할 수 있습니다.
<span class="red">※true인 경우, 검색 화면에서는 전문 검색 엔진(Meilisearch)이 사용되지 않습니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인해 주십시오.</span>


#### 키워드 검색 최대 건수
- 설정 키 : EXMENT_KEYWORD_SEARCH_COUNT
- 기본값 : 1000
- 역할 : 키워드 검색 시, 테이블 하나당 가져오는 최대 건수입니다.


#### 관련 데이터 검색 최대 건수
- 설정 키 : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- 기본값 : 5000
- 역할 : 관련 데이터 검색 시, 테이블 하나당 가져오는 최대 건수입니다.


#### 프리워드 검색 시 뷰 유지
- 설정 키 : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- 기본값 : false
- 역할 : true인 경우, 테이블 단위의 프리워드 검색 시 그때 선택한 뷰가 유지됩니다.
(false인 경우, 전체 데이터 뷰로 프리워드 검색을 합니다.)



#### 전문 검색 엔진(Meilisearch)의 설정에 대하여
아래의 "MEILISEARCH_"로 시작하는 설정값은 전문 검색 엔진 "Meilisearch"를 사용하는 경우의 설정입니다. 자세한 내용은 [여기](/ko/additional_meilisearch)를 확인해 주십시오.
<span class="red">※이 가운데 "MEILISEARCH_HOST" "MEILISEARCH_KEY" "MEILISEARCH_INDEX" "MEILISEARCH_GLOBAL_SEARCH" "MEILISEARCH_REALTIME_SYNC" "MEILISEARCH_BATCH_SIZE" "MEILISEARCH_REPAIR_ENABLED" "MEILISEARCH_REPAIR_AT" "MEILISEARCH_FILTER_MODE"는 메뉴 "관리자 설정 > 시스템 설정(상세 설정)"에서 설정하는 것을 권장합니다. 이 화면을 저장하면, 이 항목들은 화면의 값이 ".env"보다 우선되고, ".env"의 변경은 반영되지 않게 됩니다. ".env"로 설정하는 경우의 주의점은 [여기](/ko/additional_meilisearch)의 "화면의 항목을 .env로 설정하기"에 관한 설명을 확인해 주십시오.</span>
※위 이외의 설정값은 ".env"에서만 설정할 수 있습니다.


#### Meilisearch 서버의 접속 대상
- 설정 키 : MEILISEARCH_HOST
- 기본값 : http://127.0.0.1:7700
- 역할 : Meilisearch 서버의 접속 대상입니다.


#### Meilisearch의 마스터 키
- 설정 키 : MEILISEARCH_KEY
- 기본값 : (없음)
- 역할 : Meilisearch에 접속하기 위한 마스터 키입니다. Meilisearch를 설치할 때 만든 키를 입력합니다.


#### 검색 시 Meilisearch 사용
- 설정 키 : MEILISEARCH_GLOBAL_SEARCH
- 기본값 : false
- 역할 : true인 경우, 프리워드 검색 시 데이터베이스가 아니라 Meilisearch를 사용하여 검색합니다.


#### 변경 내용을 실시간으로 Meilisearch에 반영
- 설정 키 : MEILISEARCH_REALTIME_SYNC
- 기본값 : false
- 역할 : true인 경우, 사용자 정의 데이터를 새로 만들거나 수정하거나 삭제할 때 그 내용을 Meilisearch의 인덱스에 반영합니다.
※이 설정을 사용하려면 큐 설정과 큐 워커의 실행이 필요합니다.


#### Meilisearch의 인덱스 자동 복구
- 설정 키 : MEILISEARCH_REPAIR_ENABLED
- 기본값 : false
- 역할 : true인 경우, 데이터베이스와 Meilisearch 인덱스의 차이를 하루에 한 번 자동으로 복구합니다.
※이 설정을 사용하려면 작업 스케줄 설정이 필요합니다.


#### Meilisearch의 인덱스 자동 복구 실행 시각
- 설정 키 : MEILISEARCH_REPAIR_AT
- 기본값 : 03:00
- 역할 : 인덱스 자동 복구를 실행하는 시각입니다. "HH:MM" 형식으로 입력합니다.
※"HH:MM" 이외의 형식을 설정한 경우, 자동 복구는 실행되지 않고 로그에 경고가 출력됩니다.


#### Meilisearch의 인덱스 이름
- 설정 키 : MEILISEARCH_INDEX
- 기본값 : exment_global
- 역할 : Meilisearch에 만드는 인덱스의 이름입니다.  
※변경한 경우, "php artisan exment:meili-index"를 실행하여 인덱스를 다시 만들어 주십시오.  
※하나의 Meilisearch 서버를 여러 Exment에서 사용하는 경우, 인덱스 이름은 Exment마다 다른 이름으로 해 주십시오. 다른 Exment가 사용하고 있는 인덱스는 사용할 수 없습니다.  
(인덱스를 사용하고 있는 Exment는 "(인덱스 이름)__owner"라는 인덱스에, "APP_KEY"에서 만든 식별자로 기록됩니다. 그래서 "APP_KEY"를 변경한 경우에도 다른 Exment로 취급됩니다.)


#### Meilisearch의 인덱스 작성 단위
- 설정 키 : MEILISEARCH_BATCH_SIZE
- 기본값 : 1000
- 역할 : 인덱스를 만들 때, 요청 한 번으로 보내는 문서의 건수입니다.


#### Meilisearch의 접속 타임아웃 시간
- 설정 키 : MEILISEARCH_CONNECT_TIMEOUT
- 기본값 : 1.0
- 역할 : Meilisearch 서버에 접속할 때의 타임아웃 시간(초)입니다.


#### Meilisearch의 타임아웃 시간
- 설정 키 : MEILISEARCH_TIMEOUT
- 기본값 : 5.0
- 역할 : Meilisearch 서버에 보내는 요청의 타임아웃 시간(초)입니다.


#### Meilisearch의 접속 실패 시 대기 시간
- 설정 키 : MEILISEARCH_UNREACHABLE_BACKOFF
- 기본값 : 10
- 역할 : Meilisearch 서버에 접속할 수 없었던 경우, 다시 접속을 시도할 때까지의 시간(초)입니다. 이 시간 안에는 Meilisearch에 접속을 시도하지 않고 바로 오류로 처리합니다(검색 시에는 데이터베이스 검색으로 바뀝니다). Meilisearch가 멈춰 있는 동안, 처리할 때마다 접속 타임아웃까지 기다리게 되는 것을 막습니다.  
※0을 설정한 경우, 기다리지 않고 매번 접속을 시도합니다.


#### Meilisearch의 검색 일치 조건
- 설정 키 : MEILISEARCH_MATCHING_STRATEGY
- 기본값 : all
- 역할 : 여러 단어로 검색한 경우의 일치 조건입니다. all인 경우, 모든 단어를 포함하는 데이터를 검색합니다. last인 경우, 일치하는 건수가 적으면 끝 단어부터 차례로 조건에서 빼고 검색합니다.


#### Meilisearch의 권한 필터 취득 건수
- 설정 키 : MEILISEARCH_PERMISSION_SCAN_CAP
- 기본값 : 1000
- 역할 : 검색 결과를 사용자의 권한으로 좁히기 위해, 미리 넉넉하게 가져오는 건수의 상한입니다.


#### Meilisearch의 패싯 최댓값
- 설정 키 : MEILISEARCH_MAX_FACET_VALUES
- 기본값 : 1000
- 역할 : 검색 결과 좁히기(패싯)에서, 항목 하나당 가져오는 값의 상한입니다.
※1000 미만의 값을 설정한 경우, 1000으로 처리됩니다.


#### Meilisearch의 필터 동작
- 설정 키 : MEILISEARCH_FILTER_MODE
- 기본값 : override
- 역할 : 검색 결과 화면의 좁히기(패싯)에서, 대상으로 할 열을 정하는 방법입니다.
override인 경우, 열의 종류에 따라 자동으로 대상을 정한 다음, "검색 필터 설정" 화면에서 추가한 열을 더하고 제외한 열을 뺍니다.(화면에서는 "자동 + 사용자 정의")
manual인 경우, "검색 필터 설정" 화면에서 추가한 열만 대상으로 합니다.(화면에서는 "사용자 정의만")  
※변경한 경우, 인덱스를 다시 만들어야 합니다. "php artisan exment:meili-index"를 실행해 주십시오.


#### 선택(테이블에서)에서 Meilisearch 사용
- 설정 키 : MEILISEARCH_SELECT_TABLE
- 기본값 : false
- 역할 : true인 경우, 사용자 정의 열 "선택 (테이블에서)"의 입력 자동 완성(폼, API)에서 Meilisearch를 사용합니다. "MEILISEARCH_GLOBAL_SEARCH"와는 독립된 설정입니다.
※true로 한 경우, 후보를 검색하는 방법이, 저장된 값에 대한 부분 일치에서 단어 단위의 전방 일치로 바뀝니다.


#### Meilisearch의 인덱스 재작성 단위
- 설정 키 : MEILISEARCH_REINDEX_CHUNK_SIZE
- 기본값 : 500
- 역할 : 사용자 정의 테이블, 사용자 정의 열의 설정 변경에 따른 인덱스 재작성에서, 처리 한 번당 등록하는 문서의 건수입니다.


#### Meilisearch의 저장된 검색 조건 상한
- 설정 키 : MEILISEARCH_SAVED_SEARCH_LIMIT
- 기본값 : 50
- 역할 : 사용자 한 명이 저장할 수 있는 검색 조건의 최대 건수입니다.


#### Meilisearch의 동기화 큐 이름
- 설정 키 : MEILISEARCH_SYNC_QUEUE
- 기본값 : default
- 역할 : 사용자 정의 데이터 1건 단위의 동기화 처리를 실행하는 큐의 이름입니다.


#### Meilisearch의 재작성 큐 이름
- 설정 키 : MEILISEARCH_REINDEX_QUEUE
- 기본값 : (MEILISEARCH_SYNC_QUEUE와 같은 값. 초기 상태에서는 default)
- 역할 : 테이블 단위로 인덱스를 다시 만드는 처리를 실행하는 큐의 이름입니다.  
이 처리는 무겁습니다. 사용자 정의 데이터 1건 단위의 동기화 처리와 나누어 실행하려면, "meili-reindex" 등 MEILISEARCH_SYNC_QUEUE와 다른 이름을 설정해 주십시오. 그 경우, 큐 워커의 "--queue="에도 그 이름을 추가해야 합니다.


#### Meilisearch의 검색 대상 언어
- 설정 키 : MEILISEARCH_LOCALES
- 기본값 : jpn
- 역할 : Meilisearch가 문장을 단어로 나눌 때(분절) 사용하는 언어 설정입니다. ISO-639-3 언어 코드를 쉼표로 구분하여 입력합니다.(예: "jpn" "jpn,eng") 비워 둔 경우, 이 설정은 인덱스에서 삭제되고 Meilisearch가 자동으로 언어를 판정합니다.
※이 설정을 사용하려면 Meilisearch v1.10 이상이 필요합니다. 변경한 경우, "php artisan exment:meili-settings"를 실행해 주십시오.


### 메일·알림 설정
#### 페이지 오른쪽 위의 알림 바 표시·숨김
- 설정 키 : EXMENT_NOTIFY_NAVBAR
- 기본값 : true
- 역할 : false인 경우, 헤더 오른쪽 위의 알림 아이콘이 표시되지 않습니다.

#### 메일 설정값을 env 파일에서 사용
- 설정 키 : EXMENT_MAIL_SETTING_ENV_FORCE
- 기본값 : false
- 역할 : true로 하면, 메일 설정을 .env 파일의 설정에서 사용합니다.  
(false인 경우, 시스템 설정 화면에서 입력한 설정값을 사용합니다. 시스템 설정 화면에서 "호스트 이름"을 설정했으면, .env의 "MAIL_MAILER"가 "log"인 채로도 SMTP로 보냅니다.)  
자세한 내용은 [여기](/ko/mailsend_setting)를 확인해 주십시오.

#### 메일 연속 알림 무시 시간(분)
- 설정 키 : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- 기본값 : 5
- 역할 : 데이터를 새로 만들거나 수정할 때의 메일 알림에서, 같은 데이터가 연속으로 수정되면 2건째 이후의 메일은 건너뜁니다. 그 연속된 알림의 건수를 판정하기 위한 시간(분)입니다.

#### 메일 첨부 파일 암호화
- 설정 키 : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- 기본값 : false
- 역할 : true로 하면, 화면에서 메일로 첨부 파일을 보낼 때 첨부 파일을 zip으로 암호화하여 보냅니다.  
복호화 비밀번호는 따로 보냅니다.

#### 알림 대상이 로그인 사용자인 경우 알림 건너뛰기
- 설정 키 : EXMENT_NOTIFY_SKIP_SELF_TARGET
- 기본값 : true
- 역할 : true인 경우, 알림 시 알림 대상이 로그인 사용자 자신이면 알림을 건너뜁니다. false인 경우, 로그인 사용자 자신에게도 알립니다.

### 워크플로

#### 미처리 작업 아이콘의 표시·숨김
- 설정 키 : EXMENT_WORKFLOW_TASK_NAVBAR
- 기본값 : true
- 역할 : false인 경우, 헤더 오른쪽 위의 [미처리 작업](/ko/workflow_task) 아이콘이 표시되지 않습니다.  
미처리 작업 목록 화면은 URL "/workflow_task"에서 표시할 수 있습니다.

#### 미처리 작업 아이콘의 갱신 간격(초)
- 설정 키 : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- 기본값 : 300
- 역할 : 헤더 오른쪽 위의 미처리 작업 아이콘에서, 건수를 자동으로 갱신하는 간격(초)입니다. 30 미만의 값을 설정한 경우에는 30초가 됩니다.  
※갱신할 때마다 모든 워크플로의 데이터를 확인합니다. 간격을 짧게 할수록 서버의 부하가 커집니다.

#### 같은 조직의 구성원에게 알림
- 설정 키 : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- 기본값 : true
- 역할 : 조직 앞으로 된 워크플로의 액션을 조직의 구성원이 실행한 경우, 같은 조직의 다른 구성원에게 시스템 내 알림으로 알립니다. false인 경우, 알리지 않습니다.  
자세한 내용은 [미처리 작업](/ko/workflow_task)을 확인해 주십시오.

#### 워크플로의 ID 표시
- 설정 키 : EXMENT_SHOW_WORKFLOW_ID
- 기본값 : false
- 역할 : true인 경우, 워크플로 설정 화면에 워크플로의 ID와 액션의 ID를 표시합니다. 플러그인이나 API 등에서 ID를 확인하고 싶은 경우에 사용합니다.

### LINE 연동

#### 채널 액세스 토큰
- 설정 키 : LINE_CHANNEL_ACCESS_TOKEN
- 기본값 : (없음)
- 역할 : [LINE 연동](/ko/line)에서 사용하는 LINE의 채널 액세스 토큰입니다. 시스템 설정 화면의 "LINE 설정"에서 저장한 값이 우선됩니다.

#### 채널 시크릿
- 설정 키 : LINE_CHANNEL_SECRET
- 기본값 : (없음)
- 역할 : LINE의 채널 시크릿입니다. 시스템 설정 화면의 "LINE 설정"에서 저장한 값이 우선됩니다.

#### LINE 공식 계정의 베이직 ID
- 설정 키 : LINE_OA_BASIC_ID
- 기본값 : (없음)
- 역할 : LINE 공식 계정의 베이직 ID("@"로 시작하는 ID)입니다. 시스템 설정 화면의 "LINE 설정"에서 저장한 값이 우선됩니다.

#### LINE 알림(시간 경과)의 중복 전송을 막는 시간(분)
- 설정 키 : LINE_DEDUPE_MINUTES
- 기본값 : 0
- 역할 : 실행 트리거 "시간 경과"의 LINE 알림에서, 같은 사용자에게 같은 데이터에 대한 LINE 메시지를 보낸 뒤, 이 시간(분) 동안은 다시 보내지 않습니다. 다른 알림 설정으로 보낸 메시지와 전송에 실패한 메시지도 대상입니다. 0인 경우, 이 기능은 꺼집니다.

#### LINE 연동 코드의 유효 기간(분)
- 설정 키 : LINE_LINK_CODE_TTL_MINUTES
- 기본값 : 10
- 역할 : [LINE 계정 연동](/ko/line)에서 사용하는 연동 코드의 유효 기간(분)입니다.

#### LINE 연동 코드의 전송 실패 횟수
- 설정 키 : LINE_LINK_MAX_ATTEMPTS
- 기본값 : 5
- 역할 : 잘못된 연동 코드를 보낼 수 있는 횟수입니다. 이 횟수를 넘으면 일정 시간 동안 연동할 수 없게 됩니다.

#### LINE 연동 코드의 전송 실패를 세는 시간(분)
- 설정 키 : LINE_LINK_ATTEMPT_DECAY_MINUTES
- 기본값 : 10
- 역할 : 잘못된 연동 코드의 전송 횟수를 세는 시간(분)입니다. 처음 잘못된 코드를 보낸 뒤 이 시간 안에 "LINE_LINK_MAX_ATTEMPTS"의 횟수만큼 틀리면, 이 시간이 지날 때까지 연동할 수 없습니다.

#### LINE 통신의 타임아웃(초)
- 설정 키 : LINE_HTTP_TIMEOUT
- 기본값 : 10
- 역할 : LINE 서버와 통신할 때의 타임아웃 시간(초)입니다.

#### LINE Messaging API의 URL
- 설정 키 : LINE_API_BASE
- 기본값 : https://api.line.me
- 역할 : LINE Messaging API의 URL입니다. 보통은 변경하지 마십시오.

### 안부 확인

#### 지진 정보를 가져오는 URL
- 설정 키 : EXMENT_SAFETY_CHECK_FEED_URL
- 기본값 : https://api.p2pquake.net/v2/history
- 역할 : [안부 확인](/ko/safety_check)의 지진 발생 시 자동 전송에서, 지진 정보를 가져오는 API의 URL입니다. 보통은 변경하지 마십시오.

#### 지진 정보의 취득 건수
- 설정 키 : EXMENT_SAFETY_CHECK_FEED_LIMIT
- 기본값 : 10
- 역할 : 확인 한 번(매분)에 가져오는 최신 지진 정보의 건수입니다. 1~100의 범위에서 설정합니다.

### API

#### API 사용·사용 안 함
> 시스템 설정 화면에서 변경하도록 바뀌었습니다.

#### API의 표준 취득 건수
- 설정 키 : EXMENT_API_DEFAULT_DATA_COUNT
- 기본값 : 20
- 역할 : API의 데이터 목록 가져오기에서, count를 사용하지 않을 때의 데이터 취득 건수입니다.

#### API의 목록 취득 건수 상한
- 설정 키 : EXMENT_API_MAX_DATA_COUNT
- 기본값 : 100
- 역할 : API의 데이터 목록 가져오기에서, 한 번에 가져올 수 있는 최대 건수입니다.

#### API의 일괄 새로 만들기 건수 상한
- 설정 키 : EXMENT_API_MAX_CREATE_COUNT
- 기본값 : 100
- 역할 : API의 일괄 새로 만들기에서, 한 번에 새로 만들 수 있는 최대 건수입니다.

#### API의 일괄 삭제 건수 상한
- 설정 키 : EXMENT_API_MAX_DELETE_COUNT
- 기본값 : 100
- 역할 : API의 일괄 삭제에서, 한 번에 삭제할 수 있는 최대 건수입니다.

#### API의 접속 횟수 상한
※v6.2.4부터 사용할 수 있습니다.

- 설정 키 : EXMENT_API_MAX_RATE_LIMIT
- 기본값 : 60
- 역할 : API의, 사용자별(인증하지 않은 경우에는 IP 주소별) 1분당 접속 횟수의 상한입니다. 상한을 넘으면 429 오류(Too Many Requests)가 됩니다. 자세한 내용은 [여기](/ko/additional_429_too_many)를 확인해 주십시오.

#### 데이터의 label（）
- 설정 키 : EXMENT_API_APPEND_LABEL
- 기본값 : false
- 역할 : true로 하면, 데이터 목록 가져오기 또는 데이터 새로 만들기·수정을 실행할 때 label 열을 포함할 수 있습니다.


### 목록(그리드)

#### 행 클릭 시 화면 이동 비활성화
- 설정 키 : EXMENT_GRIDROW_SELECT_DISABLED
- 기본값 : false
- 역할 : true로 하면, 목록 화면의 행을 클릭했을 때의 화면 이동이 꺼집니다.

#### 행 클릭 시 편집 화면으로 이동
- 설정 키 : EXMENT_GRIDROW_SELECT_EDIT
- 기본값 : false
- 역할 : true로 하면, 목록 화면의 행을 클릭했을 때 데이터 편집 화면으로 이동합니다.(기본은 데이터 상세 화면입니다.)

#### 사용자 정의 데이터 목록 화면의 표시 건수 선택지 설정
- 설정 키 : EXMENT_GRID_PER_PAGES
- 기본값 : 없음
- 역할 : 사용자 정의 데이터 목록 화면의 표시 건수 선택지의 설정값을 입력해 주십시오. 여러 개인 경우 쉼표로 구분해 주십시오. 예: 100,200,500,1000

#### 사용자 정의 데이터의 복사 링크 표시
- 설정 키 : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- 기본값 : false
- 역할 : true로 하면, 목록 화면의 조작 칸에 복사 링크를 표시합니다.

#### 화면 디자인
- 설정 키 : EXMENT_UI_DESIGN
- 기본값 : 없음
- 역할 : 로그인 화면과 관리 화면의 디자인을 서버 쪽에서 고정합니다. "modern"(모던) 또는 "classic"(클래식)을 입력해 주십시오. 설정한 경우, [시스템 설정](/ko/system_setting)의 "화면 디자인"보다 이 값이 우선되고, 시스템 설정 화면에서는 변경할 수 없게 됩니다. 설정하지 않은 경우에는 시스템 설정의 "화면 디자인"(초기값은 "모던")을 따릅니다.

※v7.1.0부터 사용할 수 있습니다.

#### 목록 화면 열의 최소 너비(px)
- 설정 키 : EXMENT_GRID_MIN_WIDTH
- 기본값 : 100
- 역할 : 목록 화면 열의 최소 너비(px)의 기본값입니다.

#### 목록 화면 열의 최대 너비(px)
- 설정 키 : EXMENT_GRID_MAX_WIDTH
- 기본값 : 300
- 역할 : 목록 화면 열의 최대 너비(px)의 기본값입니다.

#### 목록 화면에 표시하는 최대 글자 수
- 설정 키 : EXMENT_GRID_MAX_LENGTH
- 기본값 : 50
- 역할 : 목록 화면에서, 항목 하나에 표시하는 최대 글자 수입니다. 이 글자 수를 넘는 값은 넘는 부분을 생략하고 끝에 "..."을 붙여 표시합니다.


### 사용자 정의 데이터

#### 사용자 정의 데이터 화면의 "테이블 상세 설정" 버튼 숨김
- 설정 키 : EXMENT_TABLE_BUTTON_DISABLED
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 화면의 "테이블 상세 설정" 버튼이 표시되지 않습니다.

#### 사용자 정의 데이터 화면의 "테이블 상세 설정" 버튼 숨김(사용자만)
- 설정 키 : EXMENT_TABLE_BUTTON_DISABLED_USER
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 화면의 "테이블 상세 설정" 버튼이 표시되지 않습니다. ※일반 사용자만 해당합니다. 시스템 관리자와 그 테이블의 관리자에게는 표시됩니다.

#### 사용자 정의 데이터 화면의 "뷰 변경" 버튼 숨김
- 설정 키 : EXMENT_VIEW_BUTTON_DISABLED
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 화면의 "뷰 변경" 버튼이 표시되지 않습니다.

#### 사용자 정의 데이터 화면의 "뷰 변경" 버튼 숨김(사용자만)
- 설정 키 : EXMENT_VIEW_BUTTON_DISABLED_USER
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 화면의 "뷰 변경" 버튼이 표시되지 않습니다. ※일반 사용자만 해당합니다. 시스템 관리자와 그 테이블의 관리자에게는 표시됩니다.

#### "선택(다른 테이블 참조)" "사용자" "조직"의 데이터 검색 대화 상자 기능 비활성화
- 설정 키 : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 입력 화면에서 "선택(다른 테이블 참조)" "사용자" "조직"의 데이터 검색 대화 상자 기능이 꺼집니다.

#### "선택(다른 테이블 참조)" "사용자" "조직"을 "선택지를 매번 검색" 형식으로 바꾸는 건수
- 설정 키 : EXMENT_SELECT_TABLE_LIMIT_COUNT
- 기본값 : 100
- 역할 : 사용자 정의 데이터 새로 만들기·편집 화면에서, 선택 항목을 "선택지를 매번 검색" 형식으로 바꾸는 건수를 설정합니다.  

#### 사용자 정의 열 "텍스트 편집기"의 이미지 업로드 기능을 끄기
- 설정 키 : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터 편집 화면에서 사용자 정의 열 "텍스트 편집기"의 이미지 업로드 기능을 끕니다.

#### 사용자 정의 데이터의 첨부 파일에서, 한 번에 업로드할 수 있는 파일 수
- 설정 키 : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- 기본값 : 5
- 역할 : 사용자 정의 데이터의 첨부 파일 폼에서, 한 번에 업로드할 수 있는 건수입니다.

#### 댓글에 붙여 넣을 수 있는 이미지의 최대 크기
- 설정 키 : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- 기본값 : 10240
- 역할 : 데이터의 댓글 칸에 붙여 넣거나 끌어다 놓을 수 있는 이미지(PNG, JPEG, GIF, WebP)의 최대 크기(KB)입니다. ※v7.1.0부터 사용할 수 있습니다.

#### 사용자 정의 데이터의 상세 화면에서 "읽기 전용" 필드를 표시하지 않기
- 설정 키 : EXMENT_DISABLE_SHOW_FIELD_READONLY
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터의 상세 화면에서 "읽기 전용"으로 설정된 항목을 표시하지 않습니다.

#### 사용자 정의 데이터의 상세 화면에서 "표시 전용" 필드를 표시하지 않기
- 설정 키 : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터의 상세 화면에서 "표시 전용"으로 설정된 항목을 표시하지 않습니다.

#### 사용자 정의 열 "여러 줄 텍스트" "텍스트 편집기"의 최대 글자 수
- 설정 키 : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- 기본값 : 63999
- 역할 : 시스템으로서 설정할 수 있는, 사용자 정의 열 "여러 줄 텍스트" "텍스트 편집기"의 최대 글자 수

#### 논리 삭제를 쓰지 않고 항상 물리 삭제하기
- 설정 키 : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 데이터의 논리 삭제를 쓰지 않고 항상 물리 삭제를 합니다.

#### 사용자 정의 열 "여러 줄 텍스트"의 반각 공백 표시
- 설정 키 : EXMENT_TEXTAREA_SPACE_TAG
- 기본값 : true
- 역할 : true인 경우, 사용자 정의 열 "여러 줄 텍스트"의 값을 목록 화면이나 상세 화면에 표시할 때, 반각 공백을 너비가 있는 태그로 바꿉니다. 이어진 반각 공백도 입력한 그대로의 너비로 표시됩니다. false인 경우, 바꾸지 않습니다.

#### 관계 필터 비활성화
- 설정 키 : SELECT_RELATION_LINKAGE_DISABLED
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 폼의 "관계 필터"(어떤 항목을 선택했을 때 다른 항목의 선택지를 좁히는 기능)를 모든 폼에서 끕니다.

#### 특정 테이블에서 사용자 뷰를 쓸 수 없게 하기
- 설정 키 : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- 기본값 : (없음)
- 역할 : 사용자 뷰를 쓸 수 없게 할 테이블의 이름(영숫자)을 쉼표로 구분하여 입력합니다.(예: information,contract) 입력한 테이블에서는, 시스템 설정에서 사용자 뷰를 쓸 수 있게 했더라도, 뷰를 만들고 편집할 수 있는 것은 테이블의 관리자 등 시스템 뷰의 권한을 가진 사용자뿐입니다.

#### 캘린더 뷰를 표시할 때 ID와 각 항목의 데이터도 가져오기
- 설정 키 : EXMENT_CALENDAR_DATA_GET_VALUE
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 뷰를 표시할 때 ID와 각 항목의 데이터도 가져옵니다.  
※[플러그인(스크립트)](/ko/plugin_quickstart_script)에서 사용자 정의 뷰의 표시를 고쳐 쓸 때, 각 데이터의 값을 사용하고 싶으면 true로 해 주십시오.

#### 캘린더 뷰의 최대 취득 건수
- 설정 키 : EXMENT_CALENDAR_MAX_SIZE_COUNT
- 기본값 : 300
- 역할 : 캘린더 뷰에서, 표시하고 있는 기간의 데이터를 가져올 때의 최대 건수입니다.

#### 칸반 뷰의 최대 표시 건수
- 설정 키 : EXMENT_KANBAN_MAX_SIZE_COUNT
- 기본값 : 300
- 역할 : [칸반 뷰](/ko/view_kanban)에 표시하는 데이터의 최대 건수의 기본값입니다. 칸반 뷰를 새로 만들 때 "최대 표시 건수"의 초기값이 됩니다.  
※뷰의 "최대 표시 건수"가 설정되어 있으면 뷰의 설정이 우선됩니다. 건수가 많으면 표시가 느려집니다.

#### "custom_value_(테이블 이름)" 클래스의 위치
- 설정 키 : EXMENT_SHOW_PAGE_CLASS_TYPE
- 기본값 : 1
- 역할 : "custom_value_(테이블 이름)" 클래스를 넣는 위치를 설정합니다. 다음 중에서 선택해 주십시오.
    - 1 OR 설정 없음: 첨부 파일, 댓글 등 옵션 정보의 부모 컨테이너에 클래스가 설정됨
    - 2 : 사용자 정의 열의 항목을 표시하는 컨테이너에 클래스가 설정됨
    - 3 : 위의 1과 2 모두에 클래스가 설정됨

### 조직 설정

#### 조직 목록 페이지에서 계층 표시하기
- 설정 키 : EXMENT_SHOW_ORGANIZATION_TREE
- 기본값 : false
- 역할 : true로 하면, 조직 목록 페이지에서 조직을 계층으로 표시할 수 있게 됩니다.

#### 조직의 계층 수
- 설정 키 : EXMENT_ORGANIZATION_DEEPS
- 기본값 : 4
- 역할 : 상위 조직·하위 조직을 따라가는 계층 수의 상한입니다. 권한 판정 등에서, 이 계층 수까지 상위 조직·하위 조직을 가져옵니다.

### 정렬 순서 설정

#### 사용자 편집 화면의 소속 조직 설정의 정렬 순서
- 설정 키 : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- 기본값 : false
- 역할 : true로 하면, 사용자 편집 화면의 소속 조직 설정에서 조직의 정렬 순서를 (조직의) 기본 뷰의 정렬 순서에 맞춥니다. false인 경우에는 id 순서가 됩니다.

#### 역할 그룹 설정의 정렬 순서
- 설정 키 : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- 기본값 : false
- 역할 : true로 하면, 사용자 편집 화면과 조직 편집 화면의 역할 그룹 설정의 정렬 순서, 그리고 역할 그룹 목록 화면의 정렬 순서를 (역할 그룹의) 표시 순서에 맞춥니다. false인 경우에는 id 순서가 됩니다.

#### 사용자 정의 뷰의 정렬 순서
- 설정 키 : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- 기본값 : 0
- 역할 : 사용자 정의 뷰 메뉴 버튼에 표시되는 뷰의 정렬 순서를 설정합니다. 다음 중에서 선택해 주십시오.  
0 : 제1키: 시스템 뷰/사용자 뷰, 제2키: 뷰의 종류, 제3키: id  
1 : 제1키: 시스템 뷰/사용자 뷰, 제2키: 뷰의 종류, 제3키: order   
2 : 제1키: 시스템 뷰/사용자 뷰, 제2키: order

### 가져오기·내보내기

#### 가져오기 비활성화
- 설정 키 : EXMENT_IMPORT_DISABLED
- 기본값 : false
- 역할 : true로 하면, 모든 테이블의 목록 화면에서 데이터 가져오기 기능을 표시하지 않습니다.

#### 내보내기 비활성화
- 설정 키 : EXMENT_EXPORT_DISABLED
- 기본값 : false
- 역할 : true로 하면, 모든 테이블의 목록 화면에서 데이터 내보내기 기능을 표시하지 않습니다.

#### 내보내기(뷰) 비활성화
- 설정 키 : EXMENT_EXPORT_VIEW_DISABLED
- 기본값 : false
- 역할 : true로 하면, 모든 테이블의 목록 화면에서 데이터 내보내기(뷰) 기능을 표시하지 않습니다.

#### csv 형식의 가져오기·내보내기 비활성화
- 설정 키 : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- 기본값 : false
- 역할 : true로 하면, 모든 테이블의 목록 화면에서 데이터 가져오기·내보내기 버튼에 csv 형식이 표시되지 않게 됩니다.

#### xlsx 형식의 가져오기·내보내기 비활성화
- 설정 키 : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- 기본값 : false
- 역할 : true로 하면, 모든 테이블의 목록 화면에서 데이터 가져오기·내보내기 버튼에 xlsx 형식이 표시되지 않게 됩니다.

#### csv 형식으로 내보낼 때 BOM 추가
- 설정 키 : EXMENT_EXPORT_APPEND_CSV_BOM
- 기본값 : false
- 역할 : true로 하면, CSV 데이터를 내보낼 때 BOM을 추가합니다.(Excel에서 열어도 글자가 깨지지 않습니다.)

#### 화면에서 가져오기의 최대 행 수
- 설정 키 : EXMENT_IMPORT_MAX_ROW_COUNT
- 기본값 : 5000
- 역할 : 화면에서 데이터를 가져올 때, 한 번에 가져올 수 있는 최대 행 수입니다. 이 행 수를 넘는 파일은 오류가 됩니다.  
※행 수를 늘리면 타임아웃이나 메모리 부족이 생기는 경우가 있습니다. 대량의 데이터를 가져오는 경우에는 [대량 데이터 투입](/ko/data_bulk_insert)을 검토해 주십시오.

#### 역할 그룹의 가져오기·내보내기 활성화
- 설정 키 : ROLE_GROUP_IMPORT_EXPORT
- 기본값 : false
- 역할 : true로 하면, 역할 그룹 설정 화면에 데이터 가져오기·내보내기 버튼이 표시됩니다.  
※Exment의 권한 관리를 충분히 아는 분을 위한 확장 기능입니다. 반드시 미리 백업을 하는 등 신중하게 작업해 주십시오.

### 대시보드

#### 대시보드 행 수
- 설정 키 : EXMENT_DASHBOARD_ROWS
- 기본값 : 4
- 역할 : 대시보드에 배치할 수 있는 행 수를 변경합니다.  


#### 대시보드의 최신 버전 알림 비활성화
- 설정 키 : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- 기본값 : false
- 역할 : true로 하면, 대시보드에 표시되는 최신 버전 알림 기능을 끕니다.

#### 대시보드의 그래프 표시 색 변경
- 설정 키 : EXMENT_CHART_BG_COLOR
- 기본값 : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- 역할 : 대시보드에 표시하는 그래프의 색 종류를 쉼표로 구분하여 변경할 수 있습니다. 지정한 색 수를 넘는 건수의 그래프를 표시하는 경우에는 색을 돌아가며 지정합니다.

※이 설정은 v3.4.3부터 추가되었습니다. v3.4.2 이하에서 Exment를 설치한 사용자는 위의 설정값이 고정값으로 되어 있습니다.  
변경하는 경우, "config/exment.php" 파일을 열고 아래 내용을 변경해 주십시오.  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### 파일

#### 첨부 파일을 업로드한 사람 이외에는 삭제할 수 없게 하기
- 설정 키 : EXMENT_FILE_DELETE_USERONLY
- 기본값 : false
- 역할 : true로 하면, 데이터 상세 화면에 업로드된 파일은 업로드한 사람 이외에는 삭제할 수 없게 됩니다.

#### 파일 끌어다 놓기 비활성화
- 설정 키 : EXMENT_FILE_DRAG_DROP_DISABLED
- 기본값 : false
- 역할 : true로 하면, 사용자 정의 열의 파일·이미지 열 등의 끌어다 놓기 표시 항목을 끕니다.

#### "화면에서 변경 불가"로 삭제를 금지한 테이블에서도 첨부 파일을 삭제할 수 있게 하기
- 설정 키 : EXMENT_ALLOW_DELETE_ATTACHMENT
- 기본값 : false
- 역할 : 사용자 정의 테이블 설정의 "화면에서 변경 불가"에서 "삭제"에 체크한 테이블에서는, 보통 데이터 상세 화면의 첨부 파일도 삭제할 수 없습니다. true로 하면, 이러한 테이블에서도 데이터를 편집할 수 있는 사용자는 첨부 파일을 삭제할 수 있게 됩니다.

#### 파일의 저장 위치
- 설정 키 : EXMENT_DRIVER_EXMENT, EXMENT_DRIVER_BACKUP, EXMENT_DRIVER_TEMPLATE, EXMENT_DRIVER_PLUGIN
- 기본값 : local
- 역할 : 첨부 파일, 백업, 템플릿, 플러그인의 저장 위치(로컬, FTP, SFTP, Amazon S3, Azure Blob 등)를 각각 변경합니다. 저장 위치마다 필요한 설정값(AWS_BUCKET_EXMENT 등)을 포함하여, 자세한 내용은 [여기](/ko/additional_file_saveplace)를 확인해 주십시오.

#### 7-Zip의 폴더(Windows)
- 설정 키 : EXMENT_7ZIP_DIR
- 기본값 : C:\Program Files\7-Zip
- 역할 : Windows 서버에서 "메일 첨부 파일 암호화"(EXMENT_ARCHIVE_MAIL_ATTACHMENT)를 사용하는 경우, 비밀번호가 걸린 zip을 만드는 데 사용하는 7-Zip의 설치 폴더입니다. "7z.exe"가 있는 폴더를 입력합니다.

#### 첨부 파일을 클릭했을 때 브라우저에서 표시하는 확장자 변경
- 설정 키 : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- 기본값 : 없음
- 역할 : 첨부 파일을 클릭했을 때 브라우저에서 표시하는 확장자를, 점 없이, 쉼표로 구분하여 적습니다.(예: png,jpg,gif)  
- 그 밖의 특기 사항 : 파일을 클릭했을 때의 동작은, 예전에는 모든 파일을 브라우저에서 표시했지만, [취약점 지적](/weakness/20200819_2)(영어)을 받아 첨부 파일은 다운로드하는 형식으로 바꾸었습니다.  
이러한 배경이 있으므로, <span class="red">이 설정은 본인 책임으로 해 주십시오.</span>

#### 파일 다운로드 시 임시 URL의 유효 기간
- 설정 키 : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- 기본값 : 15
- 역할 : [파일의 저장 위치](/ko/additional_file_saveplace)를 Amazon S3 등 임시 URL(서명된 URL)을 발행할 수 있는 스토리지로 한 경우의, 임시 URL의 유효 기간(분)입니다.  
이러한 스토리지의 경우, 파일을 다운로드할 때 스토리지의 임시 URL로 리디렉션되고, 브라우저가 스토리지에서 직접 파일을 다운로드합니다.  
※유효 기간은 다운로드를 시작할 때 확인하므로, 다운로드 도중에 유효 기간이 지나도 다운로드는 중단되지 않습니다. 다만 통신 오류 등으로 중단된 다운로드를 다시 시작하는 경우, 유효 기간이 지났으면 실패합니다.



### 공개 폼(Google reCAPTCHA)

#### Google reCAPTCHA v3의 점수 임계값
- 설정 키 : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- 기본값 : 0.5
- 역할 : [공개 폼](/ko/publicform)에서 Google reCAPTCHA v3를 사용하는 경우의 점수 임계값입니다. reCAPTCHA v3는 0.0(봇일 가능성이 높음)~1.0(사람일 가능성이 높음)의 점수를 돌려주며, 점수가 이 값 미만이면 전송은 오류가 됩니다. 스팸 전송이 이어지면 값을 크게, 정상적인 이용자가 오류가 되면 값을 작게 해 주십시오.  
※시스템 설정 화면에서 Google reCAPTCHA에 "V3"를 선택한 경우에만 사용됩니다.  
※0~1의 범위를 벗어난 값을 설정한 경우, 0.5로 처리됩니다.

#### 공개 폼 푸터의 "Powered by Exment"를 표시하지 않기
- 설정 키 : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- 기본값 : false
- 역할 : true로 하면, 공개 폼의 푸터에 표시되는 "Powered by Exment"를 표시하지 않습니다.

#### 공개 폼 API의 "/publicformapi" URI 변경
- 설정 키 : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- 기본값 : publicformapi
- 역할 : 공개 폼이 내부에서 사용하는 API(선택지 가져오기 등)의 URL 경로 이름입니다.

#### Google reCAPTCHA 확인을 하지 않는 IP 주소
- 설정 키 : 없음("config/exment.php"의 "recaptcha_skip_ips"로 설정)
- 기본값 : [] (없음)
- 역할 : Google reCAPTCHA 확인을 하지 않는 IP 주소의 목록입니다. 사내에서 공개 폼의 동작을 확인하는 경우 등에 사용합니다.  
<span class="red">※여기에 입력한 IP 주소에서 보낸 전송은 reCAPTCHA 확인을 전혀 하지 않습니다. 운영 환경에서는 설정하지 않는 것을 권장합니다.</span>  
※이 설정은 ".env"에서는 설정할 수 없습니다. "config/exment.php" 파일을 열고 다음과 같이 적어 주십시오.  
※Exment v6.x 이전에서 "config/no-captcha.php"의 "skip-ips"를 설정했던 경우, v7.0.0 이후에는 이 설정에 다시 적어 주십시오.

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### 기타

#### 공개 폼에서, 사용자 정의 열 "선택(다른 테이블에서 선택)" "사용자" "조직"에 suuid(20자리 무작위 문자열)로만 초기값을 설정할 수 있게 하기

- 설정 키 : EXMENT_PUBLICFORM_URLPARAM_SUUID
- 기본값 : false
- 역할 : 자세한 내용은 [여기](/ko/publicform)의 "사용자 정의 열 "선택(다른 테이블에서 선택)" "사용자" "조직"에 suuid(20자리 무작위 문자열)로만 초기값을 설정할 수 있게 하고 싶은 경우"를 확인해 주십시오.


#### HTTP 응답 안의 줄 바꿈 코드 삭제
- 설정 키 : EXMENT_REMOVE_RESPONSE_SPACE
- 기본값 : false
- 역할 : true로 하면, 응답 안의 줄 바꿈 코드를 삭제합니다.

#### 사용자 뷰 비활성화

> v3.5.0부터 시스템 설정 화면에서 변경하도록 바뀌었습니다.

#### 사용자 대시보드 비활성화

> v3.5.0부터 시스템 설정 화면에서 변경하도록 바뀌었습니다.

#### 데이터 상세 화면에서 "숨김 필드"를 표시하지 않기
- 설정 키 : EXMENT_HIDE_HIDDENFIELD
- 기본값 : true
- 역할 : true로 하면, 데이터 상세 화면에서 폼 설정에서 "숨김 필드"로 되어 있는 데이터를 표시하지 않습니다.

#### 데모 모드
- 설정 키 : EXMENT_DEMO_MODE
- 기본값 : false
- 역할 : 관리자 로그인을 공개하는 데모 사이트를 위한 설정입니다. true로 하면, 시스템 관리자라도 서버에서 코드를 실행하는 조작, 서버나 다른 사이트를 바꾸는 조작, 밖으로 무언가를 보내는 조작, 비밀 값이 보이는 조작을 막습니다(플러그인 업로드와 코드 편집, 백업, 템플릿 가져오기, 메일·로그인·API 설정, 비밀번호 변경 등). 메일은 로그에 적기만 하고, Slack·Teams·LINE 메시지는 보내지 않습니다. 화면 위에 "데모 사이트입니다"라고 표시합니다. 콘솔 명령(cron을 사용한 야간 복원 등)은 막지 않습니다. 평소 운영하는 환경에서는 설정하지 마십시오.

※v7.1.0부터 사용할 수 있습니다.



### 디버그·개발자용

#### 전문가 모드
- 설정 키 : EXMENT_EXPART_MODE
- 기본값 : false
- 역할 : true로 하면, 더 유연하고 시스템을 잘 아는 분을 위한 설정을 할 수 있게 됩니다.


#### 디버그 모드(요청 값 출력)
- 설정 키 : EXMENT_DEBUG_MODE_REQUEST
- 기본값 : false
- 역할 : true로 하면, Exment의 웹 서비스에 대한 요청 값을 로그로 출력합니다.  


#### 디버그 모드(SQL 로그 출력)
- 설정 키 : EXMENT_DEBUG_MODE_SQL
- 기본값 : false
- 역할 : true로 하면, Exment에서 SQL을 실행할 때 SQL 문을 로그로 출력할 수 있습니다. ※개발용입니다.


#### 디버그 모드(SQL 로그 출력 - 함수 표시)
- 설정 키 : EXMENT_DEBUG_MODE_SQLFUNCTION
- 기본값 : false
- 역할 : Exment에서 SQL을 실행할 때, "EXMENT_DEBUG_MODE_SQL"이 true인 상태에서 true로 하면, SQL 문과 함께 호출한 쪽의 함수 목록을 로그로 출력할 수 있습니다. ※개발용입니다.


#### 디버그 모드(스케줄링 로그 출력)
- 설정 키 : EXMENT_DEBUG_MODE_SCHEDULE
- 기본값 : false
- 역할 : 스케줄링을 실행할 때, true로 하면 스케줄링 정의와 실행 도중의 경과를 확인할 수 있습니다. 자세한 내용은 [여기](/ko/additional_task_schedule)의 "잘 동작하지 않을 때의 검증"을 확인해 주십시오. ※검증용입니다.

### 2차원 바코드
#### 버튼 표시 이름(일본어)
- 설정 키 : EXMENT_TEXT_QR_BUTTON_JA
- 기본값 : (없음)
- 역할 : 2차원 바코드 새로 만들기, 2차원 바코드 다운로드의 "2차원 바코드"의 일본어 표시 이름을 설정합니다. 따로 지정하지 않으면 "二次元バーコード"가 됩니다.

#### 버튼 표시 이름(영어)
- 설정 키 : EXMENT_TEXT_QR_BUTTON_EN
- 기본값 : (없음)
- 역할 : 2차원 바코드 새로 만들기, 2차원 바코드 다운로드의 "2차원 바코드"의 영어 표시 이름을 설정합니다. 따로 지정하지 않으면 "2D barcode"가 됩니다.

### 2차원/JAN 바코드
#### 버튼 표시 이름(일본어)
- 설정 키 : EXMENT_TEXT_SCAN_BUTTON_JA
- 기본값 : (없음)
- 역할 : 2차원/JAN 바코드 읽기 버튼의 "2차원/JAN 바코드"의 일본어 표시 이름을 설정합니다. 따로 지정하지 않으면 "二次元／JANバーコード"가 됩니다.

#### 버튼 표시 이름(영어)
- 설정 키 : EXMENT_TEXT_SCAN_BUTTON_EN
- 기본값 : (없음)
- 역할 : 2차원/JAN 바코드 읽기 버튼의 "2차원/JAN 바코드"의 영어 표시 이름을 설정합니다. 따로 지정하지 않으면 "2D barcode／JANcode"가 됩니다.
