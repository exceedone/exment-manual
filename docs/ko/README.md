# Exment 매뉴얼
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

## Exment란
### Excel과 흩어진 파일에서 벗어납시다.
Exment(엑스멘트)는 **노코드로 우리 회사의 업무 앱을 만들 수 있는 무료 오픈 소스 웹 데이터베이스**입니다. 고객·안건·신청·작업을 한곳에 모아 팀이 함께 쓸 수 있습니다.

- **노코드로 바로 만듭니다**: 테이블·폼·목록·칸반·간트 차트·집계를 화면 설정만으로 만들 수 있습니다.
- **신청부터 승인까지 팀으로 진행합니다**: 워크플로·알림·공개 폼·API가 갖추어져 있습니다.
- **무료입니다. 사람이 늘어도 요금은 같습니다**: 오픈 소스(GPL)이므로 사용자 수에 따라 요금이 늘지 않습니다.
- **자체 서버에서도, 클라우드에서도**: 자체 서버·임대 서버·AWS·Azure 등에서 동작하고, 데이터를 직접 보유할 수 있습니다.

## 먼저 써 보기
- **데모를 써 봅니다**: 프로젝트 관리·상담·워크플로·공개 폼을 로그인해서 바로 써 볼 수 있습니다. 로그인 정보는 <a href="https://exment.net/ko/demo-env/" target="_blank">데모 사이트 목록</a>에 있습니다.
- **무료로 시작합니다**: 설치 절차는 [시작하기](/ko/quickstart)부터 보십시오.
- **할 수 있는 일을 봅니다**: <a href="https://exment.net/ko/functions/" target="_blank">기능·스크린샷</a> / <a href="https://exment.net/ko/whats-new/" target="_blank">What's new</a>(버전별 새 기능) / [릴리스 노트](/release_note)(영어)
- **상담합니다**: <a href="https://exment.net/assets/exment-flyer-en.pdf" target="_blank">자료(PDF)</a> / <a href="https://exment.net/ko/inquiry/" target="_blank">문의</a>(도입·전환 상담)

<a href="https://exment.net/en/" target="_blank">Exment 공식 사이트</a>

## 이 매뉴얼에 대하여
이 매뉴얼은 항상 최신 버전의 Exment에 맞추어 씁니다.
나중 버전에서 추가된 기능이나 명령이라도, 어느 버전부터 쓸 수 있는지 적지 않은 경우가 있습니다. 미리 양해해 주십시오.


## 매뉴얼 메뉴
"<span style="color:red;">*</span>"가 붙은 메뉴는 특히 중요한 내용입니다.

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. 시작하기</h4>
        <div class="row">
            <div class="col-sm-6 tile tile">
                <a href="#/ko/concept">
                    <div class="tile-inner">
                        <h5>Exment의 콘셉트</h5>
                        <p>Exment의 사고방식과 콘셉트를 정리했습니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/start_flow">
                    <div class="tile-inner">
                        <h5>업무 시작까지의 흐름</h5>
                        <p>Exment로 업무를 시작하기까지의 표준 단계를 정리했습니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. 설치·초기 설정</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>시작하기</h5>
                        <p>Exment를 쓰기 시작할 때 먼저 확인해야 하는 절차의 개요를 정리했습니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/server">
                    <div class="tile-inner important-topic">
                        <h5>서버 설정</h5>
                        <p>Exment를 설치하기 위한 웹 서버·데이터베이스를 설정합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/quickstart_easy">
                    <div class="tile-inner important-topic">
                        <h5>Exment 애플리케이션 설치 절차</h5>
                        <p>Exment를 시작하는 데 필요한 설치 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>초기 설정</h5>
                        <p>설치한 뒤 첫 관리자 로그인 ID 설정 등 초기 설정의 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/update">
                    <div class="tile-inner important-topic">
                        <h5>업데이트</h5>
                        <p>Exment의 업데이트 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/quickstart_more">
                    <div class="tile-inner">
                        <h5>추가 설정</h5>
                        <p>"/admin" 경로 변경, 작업 스케줄 설정 등 Exment의 추가 설정을 할 때의 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/mailsend_setting">
                    <div class="tile-inner">
                        <h5>메일 전송 설정</h5>
                        <p>사용자에게 메일을 보낼 때의 절차입니다. 테스트 메일을 보내는 절차도 적었습니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. 로그인 설정</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/login_setting">
                    <div class="tile-inner">
                        <h5>로그인 설정</h5>
                        <p>Exment에 로그인할 때의 여러 로그인 설정을 합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/login_sso">
                    <div class="tile-inner">
                        <h5>SSO 인증 설정</h5>
                        <p>SSO 인증의 관리자 쪽 설정 방법입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>2단계 인증 설정</h5>
                        <p>2단계 인증의 관리자 쪽 설정 방법입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/login_2factor">
                    <div class="tile-inner">
                        <h5>로그인(2단계 인증)</h5>
                        <p>2단계 인증을 써서 로그인하는 절차를 적었습니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. 테이블 설정</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/table">
                    <div class="tile-inner important-topic">
                        <h5>테이블 설정</h5>
                        <p>Exment의 가장 기본이 되는 설정입니다. 데이터를 저장하기 위한 사용자 정의 테이블의 설정 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/column">
                    <div class="tile-inner important-topic">
                        <h5>사용자 정의 열 설정</h5>
                        <p>사용자 정의 테이블에 속하는 사용자 정의 열의 설정입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/relation">
                    <div class="tile-inner">
                        <h5>관계 설정</h5>
                        <p>테이블과 테이블을 관계 짓는 관계(릴레이션)의 설정입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/form">
                    <div class="tile-inner">
                        <h5>사용자 정의 폼 설정</h5>
                        <p>데이터 등록 화면에서 쓰는 폼 항목을 관리합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/view">
                    <div class="tile-inner important-topic">
                        <h5>사용자 정의 뷰 설정</h5>
                        <p>데이터 목록 화면에서 쓰는 뷰 항목을 관리합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/operation">
                    <div class="tile-inner">
                        <h5>데이터 업데이트 이벤트 설정</h5>
                        <p>데이터를 새로 만들 때나 업데이트할 때, 버튼을 클릭할 때 등에 열의 값을 업데이트합니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. 데이터 관리</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/data">
                    <div class="tile-inner important-topic">
                        <h5>데이터</h5>
                        <p>만든 테이블에서 데이터를 목록으로 보고, 새로 추가·편집·표시·삭제하는 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>데이터 목록</h5>
                        <p>등록한 데이터를 목록으로 표시합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/data_form">
                    <div class="tile-inner important-topic">
                        <h5>데이터 폼(데이터 상세)</h5>
                        <p>대상 테이블에 데이터를 등록·편집합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/data_import_export">
                    <div class="tile-inner">
                        <h5>데이터 가져오기·내보내기</h5>
                        <p>대상 테이블에 CSV·Excel 파일에서 데이터를 한꺼번에 등록·업데이트·삭제합니다. 또 대상 테이블의 데이터를 CSV·Excel 파일로 출력합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/data_cmd_import_export">
                    <div class="tile-inner">
                        <h5>데이터 가져오기·내보내기(명령)</h5>
                        <p>데이터 가져오기·내보내기를 명령으로 실행합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/data_bulk_insert">
                    <div class="tile-inner">
                        <h5>데이터 가져오기(대량 데이터)</h5>
                        <p>대상 테이블에 CSV 데이터를 한꺼번에 등록합니다. 대량 데이터에 대응합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/search">
                    <div class="tile-inner">
                        <h5>데이터 검색</h5>
                        <p>등록한 데이터를 검색하는 절차입니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. 사용자·조직·역할 권한</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/permission">
                    <div class="tile-inner important-topic">
                        <h5>역할·권한의 개요</h5>
                        <p>Exment의 역할·권한의 개요를 설명합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/user">
                    <div class="tile-inner important-topic">
                        <h5>사용자·로그인 사용자 관리</h5>
                        <p>사용자 정보를 관리하고, 시스템에 로그인하기 위한 설정을 하는 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/organization">
                    <div class="tile-inner important-topic">
                        <h5>조직 관리</h5>
                        <p>사용자가 소속하는 조직을 설정하는 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/role_group">
                    <div class="tile-inner">
                        <h5>역할 그룹·권한</h5>
                        <p>특정 데이터나 페이지를 특정 사용자만 관리할 수 있게 하기 위한 설정입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/multiuser">
                    <div class="tile-inner">
                        <h5>외부 포털 사이트용 설정</h5>
                        <p>데이터 목록 화면이나 편집 화면에서 사용자·조직을 표시할 때 "로그인 사용자가 소속한 조직과 그 소속 사용자만 표시한다"는 설정을 하고 싶을 때 권장하는 내용입니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. 워크플로</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>워크플로 설정 예</h5>
                        <p>워크플로의 설정 예를 적었습니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/workflow_example">
                    <div class="tile-inner">
                        <h5>워크플로 설정</h5>
                        <p>관리자가 워크플로를 설정합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/workflow_execution">
                    <div class="tile-inner">
                        <h5>워크플로 실행</h5>
                        <p>각 사용자가 워크플로를 실행하는 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/workflow_task">
                    <div class="tile-inner">
                        <h5>미처리 작업</h5>
                        <p>자신이 액션을 실행해야 하는 워크플로의 데이터를 모든 테이블에서 모아 확인합니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>8. 공개 폼</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/publicform">
                    <div class="tile-inner">
                        <h5>공개 폼</h5>
                        <p>일반 사용자(로그인하지 않은 사용자)가 데이터를 입력할 수 있는 공개 폼을 설정합니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. 기타 표준 기능</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/template">
                    <div class="tile-inner">
                        <h5>템플릿</h5>
                        <p>사용자 정의 테이블, 열 등의 정보를 가져오거나 내보냅니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/backup">
                    <div class="tile-inner">
                        <h5>백업·복원</h5>
                        <p>저장한 데이터와 데이터베이스 정보를 백업·복원합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/menu">
                    <div class="tile-inner">
                        <h5>메뉴</h5>
                        <p>왼쪽 메뉴에 표시되는 항목을 관리합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/dashboard">
                    <div class="tile-inner">
                        <h5>대시보드</h5>
                        <p>로그인하면 처음 표시되는 TOP 페이지의 내용을 관리합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/mail">
                    <div class="tile-inner">
                        <h5>알림 템플릿</h5>
                        <p>사용자에게 메일을 보낼 때의 제목과 본문을 설정합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/notify">
                    <div class="tile-inner">
                        <h5>알림</h5>
                        <p>데이터를 업데이트할 때나 버튼을 클릭했을 때 메일을 보내기 위한 설정 절차입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/line">
                    <div class="tile-inner">
                        <h5>LINE 연동</h5>
                        <p>LINE 공식 계정과 연동하여, 알림을 받거나 워크플로의 액션을 실행하는 일을 LINE에서 합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/safety_check">
                    <div class="tile-inner">
                        <h5>안부 확인</h5>
                        <p>지진 등 긴급할 때 직원의 안부를 LINE과 메일로 확인합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/logs">
                    <div class="tile-inner">
                        <h5>로그</h5>
                        <p>Exment의 여러 로그에 대해 적었습니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>10. 기능 확장</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/api">
                    <div class="tile-inner">
                        <h5>API</h5>
                        <p>다른 시스템과 연동하기 위한 API의 사용 방법입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/plugin">
                    <div class="tile-inner">
                        <h5>플러그인</h5>
                        <p>직접 개발한 플러그인의 관리 방법입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/plugin_quickstart">
                    <div class="tile-inner">
                        <h5>플러그인 작성 방법</h5>
                        <p>플러그인의 작성 방법을 종류별로 적었습니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>11. 레퍼런스</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/ko/params">
                    <div class="tile-inner">
                        <h5>매개변수 변수</h5>
                        <p>자동 채번이나 문서 출력 등에서 매개변수를 값으로 바꿀 때 쓰는 변수 목록입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="https://exment.net/reference/webapi.html">
                    <div class="tile-inner">
                        <h5>API 레퍼런스</h5>
                        <p>WebAPI의 레퍼런스입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/func_reference">
                    <div class="tile-inner">
                        <h5>함수 레퍼런스</h5>
                        <p>사용자 정의 테이블·사용자 정의 열·사용자 정의 데이터 등의 클래스·함수 레퍼런스입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/column_reference">
                    <div class="tile-inner">
                        <h5>사용자 정의 열 레퍼런스</h5>
                        <p>사용자 정의 열의 사양 상세와, 플러그인에서 열의 값을 가져오거나 설정할 때의 레퍼런스입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/plugin_reference">
                    <div class="tile-inner">
                        <h5>플러그인 레퍼런스</h5>
                        <p>자체 플러그인을 개발할 때 쓰는 클래스·함수의 레퍼런스입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/config">
                    <div class="tile-inner">
                        <h5>설정값 목록</h5>
                        <p>Exment에서 설정할 수 있는 설정값 목록입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/command">
                    <div class="tile-inner">
                        <h5>명령 목록</h5>
                        <p>Exment에서 실행할 수 있는 명령 목록입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/release_note">
                    <div class="tile-inner">
                        <h5>릴리스 노트(영어)</h5>
                        <p>지금까지의 릴리스 이력입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/patch_weakness">
                    <div class="tile-inner">
                        <h5>패치·취약점 목록</h5>
                        <p>수동 대응이 필요한 과거의 결함과, 과거에 발생한 취약점의 목록입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/troubleshooting">
                    <div class="tile-inner">
                        <h5>문제 해결</h5>
                        <p>Exment의 문제 해결 방법과, Exment의 기술적인 자주 묻는 질문에 답합니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/license">
                    <div class="tile-inner">
                        <h5>라이선스</h5>
                        <p>Exment에서 쓰는 오픈 소스 라이브러리입니다.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/ko/develop_memo">
                    <div class="tile-inner">
                        <h5>개발 메모</h5>
                        <p>세세한 사양 등을 이것저것 모은 내용입니다.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
