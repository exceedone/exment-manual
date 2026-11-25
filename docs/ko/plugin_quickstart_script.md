# 플러그인(스크립트)
Exment의 화면에서 독자적인 스크립트(javascript)를 실행하는 플러그인입니다.
스크립트를 실행하는 계기(트리거)는 다음 7가지입니다.

| 트리거 | 시작되는 시점 |
| ---- | ---- |
| **화면을 읽어 들일 때** | Exment 화면의 읽어 들이기가 끝났을 때. ※화면을 이동할 때마다 항상 읽어 들입니다. |
| **화면을 읽어 들일 때(처음)** | Exment 화면의 읽어 들이기가 끝났을 때. ※처음 로그인할 때나 F5로 새로 고침을 한 1번만 읽어 들입니다. |
| **데이터 목록을 표시할 때** | 데이터 목록 화면의 읽어 들이기가 끝났을 때 |
| **데이터 상세를 표시할 때** | 데이터 상세 화면의 읽어 들이기가 끝났을 때 |
| **데이터 새로 만들기·편집을 표시할 때** | 데이터 새로 만들기·편집 화면의 읽어 들이기가 끝났을 때 |
| **대시보드를 읽어 들일 때** | 대시보드 BOX의 읽어 들이기가 끝났을 때 |
| **캘린더 뷰 항목을 읽어 들일 때** | 캘린더 뷰에서 각 항목을 읽어 들일 때. 배경색이나 글자색을 변경할 수 있습니다. |

## 만드는 방법
여기서는 샘플로, 주소를 자동으로 넣는 스크립트를 만듭니다.
"기본 정보" 데이터의 편집 화면에서 "우편번호1", "우편번호2"를 입력하면, 우편번호 7자리에서 자동으로 "도도부현", "주소", "주소(건물명 이하)"를 넣습니다.
![스크립트](../img/plugin/plugin_script1.png)  

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "주소 넣기",
    "description": "기본 정보 화면에서 주소를 넣습니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 script라고 적어 주십시오.  
- (선택)cdns는 관련 라이브러리를 CDN으로 읽어 들이는 경우에 적습니다. http 또는 https의 전체 경로로, 배열로 적어 주십시오.

### js 파일 만들기
- 아래와 같은 js 파일을 만듭니다. 이름은 반각 영숫자로 자유롭게 붙여도 됩니다. 이 샘플에서는 "script.js"로 하고 있습니다.

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(ev){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- 이벤트는 jquery로 호출합니다.  
- "exment:form_loaded" 부분에서 이벤트를 정의합니다. 현재 Exment에 정의되어 있는 이벤트 이름은 아래와 같습니다.
    - **exment:loaded** : Exment 화면의 읽어 들이기가 끝났을 때 트리거가 시작됩니다. ※화면을 이동할 때마다 항상 읽어 들입니다.  
    - **exment:first_loaded** : Exment 화면의 읽어 들이기가 끝났을 때 트리거가 시작됩니다. ※처음 로그인할 때나 F5로 새로 고침을 한 1번만 읽어 들입니다.  
    - **exment:list_loaded** : 데이터 목록 화면의 읽어 들이기가 끝났을 때 이벤트가 실행됩니다.  
    - **exment:show_loaded** : 데이터 상세 화면의 읽어 들이기가 끝났을 때 이벤트가 실행됩니다.  
    - **exment:form_loaded** : 데이터 새로 만들기·편집 화면의 읽어 들이기가 끝났을 때 이벤트가 실행됩니다.
    - **exment:dashboard_loaded** : TOP 화면의 대시보드 BOX의 읽어 들이기가 끝났을 때 이벤트가 실행됩니다. ※각각의 대시보드 BOX의 읽어 들이기가 끝난 시점에, 대시보드의 수만큼 실행됩니다.  
    - **exment:calendar_bind** : 캘린더 뷰에서 각 항목을 읽어 들일 때 트리거가 시작됩니다. 배경색이나 글자색을 변경할 수 있습니다.  
- 만든 스크립트는 "public" 폴더 안에 배치해 주십시오.  
배치하는 스크립트는 확장자가 "js"이면 여러 개 배치할 수 있습니다. 관련 라이브러리가 필요한 경우에는 모두 폴더 안에 배치해 주십시오.  
이 샘플에서는 [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io)를 수정한 js 파일도 배치하고 있습니다.

### zip으로 압축
zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- SetAddress.zip
    - config.json
    - public 폴더
        - script.js
        - ajaxzip3-source.js

### 플러그인 업로드
만든 zip 파일을 [플러그인](/ko/plugin) 페이지에서 업로드해 주십시오.

### 주의점
- 업로드한 js 파일은 **화면을 처음 읽어 들일 때 모두 읽어 들입니다.**
스크립트가 호출되는 순서는 정해져 있지 않습니다(기본적으로 이름순. 다만 jquery, bootstrap의 js보다는 뒤).
읽어 들이는 순서에 의존하지 않는 방식으로 구현해 주십시오.

- 각 테이블의 데이터에는 "custom_value_(테이블 이름)"이라는 이름의 클래스가 정의되어 있습니다.
특정 테이블에서만 스크립트를 실행하고 싶은 경우에는 이 클래스 이름으로 좁혀 주십시오.
※예: "사용자" 화면의 경우: "custom_value_user", "조직" 화면의 경우: "custom_value_organization"


## 스크립트를 적는 방법

### 데이터 목록 화면, 데이터 상세 화면, 데이터 새로 만들기·편집 화면

아래와 같이 적어 주십시오.

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // 독자적인 처리
    }
});
~~~


### TOP 화면의 대시보드 BOX

- 아래와 같이 적어 주십시오.

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // 독자적인 처리
    }
});
~~~

- 이 이벤트는 대시보드 BOX를 1개 다 읽어 들일 때마다 실행됩니다(대시보드의 수만큼 실행됩니다). 각각의 대시보드 BOX를 비동기로 호출하기 때문입니다.

- 대시보드 BOX의 div 클래스 ".box-dashboard"에는 대시보드의 설정 내용에 따른 data 속성이 설정되어 있습니다.

- 어느 대시보드 BOX를 읽어 들이고 있는지는, 이벤트 ev의 target에 설정되어 있는 data 속성으로 판별해 주십시오.

~~~ js
// 예
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### 대시보드 BOX에 설정되어 있는 data 속성

##### 공통

| 이름 | 설명 |
| ---- | ---- |
| row_no | 대시보드 BOX가 설정되어 있는 행 번호 |
| column_no | 대시보드 BOX가 설정되어 있는 열 번호 |
| dashboard_box_view_name | 대시보드 BOX의 표시 이름 |
| dashboard_box_type | 대시보드 BOX의 종류.<br />system, list, chart, calendar, plugin |


##### 시스템

| 이름 | 설명 |
| ---- | ---- |
| target_system_name | 대시보드 BOX의 시스템 항목 종류. <br />guideline, news, editor, html |


##### 데이터 목록, 차트, 캘린더

| 이름 | 설명 |
| ---- | ---- |
| target_table_id | 표시 대상의 테이블 ID |
| target_table_name | 표시 대상의 테이블 영문 이름 |
| target_view_view_name | 표시 대상의 뷰 표시 이름 |


##### 플러그인

| 이름 | 설명 |
| ---- | ---- |
| plugin_id | 표시 대상의 플러그인 ID |
| plugin_uuid | 표시 대상의 플러그인의 UUID |
| plugin_name | 표시 대상의 플러그인 영문 이름 |
| plugin_view_name | 표시 대상의 플러그인 표시 이름 |



### 캘린더 뷰

- **각 데이터의 값을 스크립트에서 사용하고 싶은 경우, 미리 [설정값 변경](/ko/config)에서 아래의 설정을 해 주십시오.**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- 아래와 같이 적어 주십시오.

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // "공지사항" 테이블이 아니면 종료
        // 앞부분: 테이블 뷰의 체크, 뒷부분: 대시보드의 체크
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // "우선순위"가 높음(4) 이상인 경우에는 강제로 빨간 배경으로 변경
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- 이 이벤트는 캘린더 뷰를 표시하기 전에 시작됩니다.

- 두 번째 인수인 event에는 아래의 값이 들어갑니다.

| 키 값 | 형 | 설명 |
| ---- | ---- | ---- |
| allDayBetween | true/false | 종일인지 여부 |
| start | string | 시작 일시 |
| end | string | 종료 일시 |
| title | string | 표시 이름 |
| color | string | 배경색 |
| textColor | string | 글자색 |
| url | string | 클릭했을 때 이동할 곳 |
| id | int | 해당 데이터 ID(설정값 변경에서 ID를 가져오도록 한 경우에만 가져올 수 있음) |
| value | array | 해당 데이터의 등록값(설정값 변경에서 ID를 가져오도록 한 경우에만 가져올 수 있음) |

- 조건에 따라 값을 바꾸고 싶은 경우에는 event의 값을 고쳐 쓰고, event를 return해 주십시오.

### 주의점
위의 "만드는 방법"의 "주의점"과 같습니다. js 파일을 읽어 들이는 시점과 순서, 테이블별 클래스 이름 "custom_value_(테이블 이름)"에 주의해 주십시오.


## 샘플 플러그인
- [주소 넣기 스크립트](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [전각 영숫자 → 반각 영숫자 변환 스크립트](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
전각 영숫자를 반각 영숫자로 변환하는 스크립트입니다.  

- [반각 가나 → 전각 가나 변환 스크립트](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
반각 가나를 전각 가나로 변환하는 스크립트입니다.  
