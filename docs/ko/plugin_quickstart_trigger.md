# 플러그인(트리거)

> v3.2.0부터 "플러그인(트리거)"는 권장하지 않게 되었습니다.  
앞으로 만들 때는 [플러그인(버튼)](/ko/plugin_quickstart_button) 또는 [플러그인(이벤트)](/ko/plugin_quickstart_event)로 만드십시오.  


플러그인(트리거)는 Exment의 화면에서 특정 조작을 했을 때 움직이는 플러그인입니다. 값의 업데이트 등의 처리를 할 수 있습니다.  
또한 목록 화면이나 폼 화면에 버튼을 추가하고, 클릭했을 때 처리를 하게 할 수도 있습니다.  
이 페이지에서는 트리거의 종류와 만드는 방법(config.json과 Plugin.php를 만들고 zip으로 묶는다)을 설명합니다.  


## 트리거의 종류

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| saving | 저장 직전 | 데이터를 저장하기 직전에 처리가 시작됩니다. |
| saved | 저장 후 | 데이터를 저장한 뒤에 처리가 시작됩니다. |
| grid_menubutton | 목록 화면의 메뉴 버튼 | 데이터 목록 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 일으킵니다. |
| form_menubutton_show | 데이터 상세의 메뉴 버튼 | 데이터 상세 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 일으킵니다. |
| form_menubutton_create | 폼의 메뉴 버튼(새로 만들 때) | 데이터를 새로 만드는 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 일으킵니다. |
| form_menubutton_edit | 폼의 메뉴 버튼(수정할 때) | 데이터를 수정하는 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 일으킵니다. |
| workflow_action_executing | 워크플로 실행 전 | 워크플로를 실행하기 직전에 처리가 시작됩니다. |
| workflow_action_executed | 워크플로 실행 후 | 워크플로를 실행한 뒤에 처리가 시작됩니다. |
| notify_executing | 알림 전 | 알림을 실행하기 직전에 처리가 시작됩니다. |
| notify_executed | 알림 후 | 알림을 실행한 뒤에 처리가 시작됩니다. |

## 만드는 방법

### config.json 만들기
- 다음 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "플러그인을 업로드하는 테스트입니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- plugin_name은 반각 영숫자로 적으십시오.
- uuid는 32자 + 하이픈으로 모두 36자인 문자열입니다. 플러그인을 하나로 구별하기 위해 씁니다.  
다음 URL 등에서 만드십시오.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 trigger라고 적으십시오.  
- event_triggers를 처음부터 지정하는 경우는 위의 "트리거의 종류"의 "이름"을 쉼표로 구분하여 적으십시오.
- target_tables를 처음부터 지정하는 경우는 사용자 정의 테이블의 테이블 이름을 쉼표로 구분하여 적으십시오.


### PHP 파일 만들기
- 다음과 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 하십시오.

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 하십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- 플러그인 관리 화면에서 등록한 트리거의 조건에 맞았을 때 플러그인이 호출되고, Plugin.php의 execute 함수가 실행됩니다.  

- Plugin 클래스는 클래스 PluginTriggerBase를 상속하고 있습니다.  
PluginTriggerBase는 호출한 쪽의 사용자 정의 테이블 $custom_table, 테이블 값 $custom_value 등의 프로퍼티를 가지고 있습니다.  
execute 함수가 호출된 시점에 이들 프로퍼티에 값이 들어 있습니다.  
프로퍼티의 자세한 내용은 [플러그인 레퍼런스](/ko/plugin_reference)를 참조하십시오.  

### zip으로 압축
위의 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 하십시오.  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (그 밖에 필요한 PHP 파일, 이미지 파일 등)


### 샘플 플러그인
준비 중...
