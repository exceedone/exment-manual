# 플러그인(버튼)
Exment의 목록 화면 또는 폼 화면에 버튼을 추가하고, 클릭했을 때 처리를 할 수 있습니다.  
이 페이지에서는 플러그인(버튼)을 만드는 방법을 3가지 예(보통의 버튼·독자적인 버튼·파일 다운로드)로 설명합니다.  

![버튼 구현 예](../img/plugin/plugin_button1.png)   

## 버튼의 종류

- ##### 보통의 버튼
플러그인 설정에서 저장한 버튼의 레이블·색·아이콘 등으로 버튼을 만들어 화면에 배치합니다.  
버튼을 클릭한 뒤의 처리를 구현합니다.

- ##### 독자적인 버튼(v3.4.1부터 지원)
독자적인 형식으로 버튼을 표시할 수 있습니다.  
버튼을 표시할 때의 처리를 구현합니다.


## 버튼의 표시 조건

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| grid_menubutton | 목록 화면의 메뉴 버튼 | 데이터 목록 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 발생시킵니다. |
| form_menubutton_show | 데이터 상세 화면의 메뉴 버튼 | 데이터 상세 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 발생시킵니다. |
| form_menubutton_create | 데이터 새로 만들기 화면의 메뉴 버튼 | 데이터의 새로 만들기 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 발생시킵니다. |
| form_menubutton_edit | 데이터 업데이트 화면의 메뉴 버튼 | 데이터의 업데이트 화면의 위쪽에 버튼을 추가하고, 클릭했을 때 이벤트를 발생시킵니다. |

## 만드는 방법

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "플러그인 버튼을 실행하는 테스트입니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 32문자+하이픈의, 합계 36자의 문자열입니다. 플러그인을 고유하게 하는 데 사용합니다.  
아래 URL 등에서 만들어 주십시오.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 button이라고 적어 주십시오.  
- event_triggers(버튼의 표시 조건)를 처음부터 지정하는 경우, "버튼의 표시 조건"의 이름을 쉼표로 구분하여 입력해 주십시오.
- target_tables를 처음부터 지정하는 경우, 사용자 정의 테이블의 테이블 이름을 쉼표로 구분하여 입력해 주십시오.


### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // 반환값에 따른 화면 이동의 상세 ----------------------------------------------------
        // true : "실행을 완료했습니다!"라고 화면 오른쪽 위에 표시하고, 그 화면에서 다시 읽어 들인다
        return true;

        // true : "○○이 정상적으로 완료되었습니다! 이 뒤에는 ××의 처리를 해 주십시오"라고 독자적인 메시지를 표시한다
        // return [
        //     'result' => true,
        //     'swaltext' => '○○이 정상적으로 완료되었습니다! 이 뒤에는 ××의 처리를 해 주십시오',
        // ];

        // true : "실행을 완료했습니다!"라고 표시하고, 다른 페이지로 리디렉션한다
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : "○○의 오류가 발생했습니다"라고 독자적인 오류 메시지를 표시한다
        // return [
        //     'result' => false,
        //     'swaltext' => '○○의 오류가 발생했습니다',
        // ];


        // (v3.4.1 지원)"목록 화면의 메뉴 버튼"에서 호출한 경우 ---------
        // 목록 화면에서 체크한 데이터의 CustomValue 오브젝트 목록. \Illuminate\Support\Collection 형
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (v3.4.3 지원)화면에 버튼을 표시할지 여부의 판정. 기본값은 true
    * 
    * @return bool true: 그린다 false: 그리지 않는다
    */
    public function enableRender(){
        // 예 1: 선택한 데이터의 id가 2인 경우 버튼을 표시한다
        //return $this->custom_value->id % 2 === 0;

        // 사용자 정의 열의 값 "status"가 "active"인 경우에 버튼을 표시한다
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- 플러그인 관리 화면에서 등록한 트리거의 조건에 맞은 경우에 플러그인이 호출되어, Plugin.php 안의 execute 함수가 실행됩니다.  

- Plugin 클래스는 클래스 PluginButtonBase를 상속하고 있습니다.  
PluginButtonBase는 호출한 쪽의 사용자 정의 테이블 $custom_table, 테이블 값 $custom_value 등의 프로퍼티를 가지고 있으며,  
execute 함수가 호출된 시점에 그 프로퍼티에 값이 대입됩니다.  
프로퍼티의 상세에 대해서는 [플러그인 레퍼런스](/ko/plugin_reference)를 참조해 주십시오.  

- (v3.4.3 지원) 등록된 데이터를 사용하여 버튼의 표시·숨김을 제어하고 싶은 경우, 메서드 "enableRender"를 구현합니다.  
버튼을 표시하는 경우에는 true를, 숨기고 싶은 경우에는 false를 반환해 주십시오. (기본값은 true입니다.)


### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (기타, 필요한 PHP 파일, 이미지 파일 등)



## 만드는 방법(독자적인 버튼 표시)

> 이 기능은 v3.4.1부터 지원합니다.

독자적인 형식으로 버튼을 표시할 수 있습니다. 아래의 용도로 이용해 주십시오.  

- 여러 버튼을 나란히 표시한다.
- 드롭다운 형식의 버튼을 표시한다.
- 특정 조건을 만족한 경우에만 버튼을 표시한다. 조건의 판정에는 독자적인 로직을 사용한다.

여기서는 "데이터 상세 화면에서 그 데이터의 '이전', '다음' 버튼을 표시하는" 샘플을 개발합니다.


### config.json 만들기
보통의 만드는 방법과 같습니다.

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "독자적인 플러그인 버튼을 추가하는 테스트입니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * 기본 버튼 표시 대신 독자적인 버튼을 추가하는 처리
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: "다음", false: "이전"
        $keys = [true, false];
        foreach($keys as $key){
            // 앞뒤의 값을 가져온다
            $value = $this->getNextOrPrevId($key);
            
            // 값이 존재하면 버튼을 추가한다
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // button.blade.php로 버튼을 그린다
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * 다음 또는 이전의 데이터를 가져온다
     *
     * @param boolean $isNext true: 다음 데이터, false: 이전 데이터
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- namespace 이름, Plugin 클래스의 상속, 이름 짓기 같은 기본적인 규칙은 보통의 버튼을 만들 때와 같습니다.

- 플러그인 관리 화면에서 등록한 트리거의 조건에 맞은 경우에 플러그인이 호출되어, Plugin.php 안의 "render()" 메서드가 호출됩니다.

- render() 메서드 안에서 resources/views 안의 view를 표시합니다.

### PHP 파일(blade) 만들기

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### zip으로 압축
보통의 버튼과 마찬가지로 zip으로 만들어 업로드합니다.


### 샘플 플러그인
["다음", "이전" 버튼 표시(독자적인 버튼)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)  





## 만드는 방법(파일 다운로드)

> 이 기능은 v4.3.3부터 지원합니다.

플러그인으로 파일을 다운로드하는 샘플입니다.  

여기서는 사용자가 아바타를 사용하지 않은 경우에 표시되는 사용자 이미지를 다운로드합니다.


### config.json 만들기
보통의 만드는 방법과 같습니다.

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "플러그인으로 파일을 다운로드하는 테스트입니다.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // base64 문자열, Content-Type, 파일 이름을 배열로 반환한다
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // 선택: "다운로드가 완료되었습니다" 메시지를 표시한다
            'swaltext' => '다운로드가 완료되었습니다',
        ];
    }
}
~~~

- namespace 이름, Plugin 클래스의 상속, 이름 짓기 같은 기본적인 규칙은 보통의 버튼을 만들 때와 같습니다.

- execute 함수의 반환값으로 아래 값을 배열로 반환합니다.
    - fileBase64 : 파일의 base64 문자열
    - fileContentType : 파일의 Content-Type
    - fileName : 다운로드했을 때의 파일 이름

### zip으로 압축
보통의 버튼과 마찬가지로 zip으로 만들어 업로드합니다.


### 샘플 플러그인
[익명 사용자 이미지 다운로드](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)  

