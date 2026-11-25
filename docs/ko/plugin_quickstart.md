# 플러그인 만드는 방법
## 시작하기 전에
플러그인을 개발하는 분을 위한 페이지입니다. 플러그인의 종류별 만드는 방법으로 가는 링크와, 어느 종류에나 공통되는 규칙·특별한 설정을 모았습니다.  
플러그인의 기능과 업로드 등의 관리 방법은 [플러그인](/ko/plugin)을 참조해 주십시오.  

기본 흐름은 다음과 같습니다(자세한 내용은 종류별 페이지를 참조하십시오).

1. 설정 파일 "config.json"을 만든다
2. PHP 파일("Plugin.php") 등의 프로그램 파일을 만든다
3. zip으로 압축하여 Exment의 화면에서 업로드한다  

※관리 화면 라이브러리의 클래스는 Exment v7.0.0 이상의 네임스페이스("ExmentAdminCore\Admin")로 적었습니다.  
v6.x 이전을 사용하는 경우에는 "Encore\Admin"으로 바꿔 읽어 주십시오. 자세한 내용은 [여기](/update/v7_0_0)(영어)를 확인해 주십시오.

## 만드는 방법 링크
만들고 싶은 플러그인의 종류를 골라 주십시오.

- [버튼](/ko/plugin_quickstart_button)
- [이벤트](/ko/plugin_quickstart_event)
- [페이지](/ko/plugin_quickstart_page)
- [대시보드](/ko/plugin_quickstart_dashboard)
- [뷰](/ko/plugin_quickstart_view)
- [CRUD 페이지](/ko/plugin_quickstart_crud)
- [배치](/ko/plugin_quickstart_batch)
- [API](/ko/plugin_quickstart_api)
- [유효성 검사](/ko/plugin_quickstart_validate)
- [스크립트](/ko/plugin_quickstart_script)
- [스타일](/ko/plugin_quickstart_style)
- [가져오기](/ko/plugin_quickstart_import)
- [내보내기](/ko/plugin_quickstart_export)
- [문서](/ko/plugin_quickstart_document)
- [Docurain(PDF 출력)](/ko/plugin_quickstart_docurain)
- [트리거 ※권장하지 않음](/ko/plugin_quickstart_trigger)


## 플러그인 이름의 namespace
플러그인의 namespace는 아래 규칙으로 붙여 주십시오.
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오.
    - 예: 플러그인 이름: testplugin → App\Plugins\\Testplugin
    - 예: 플러그인 이름: customer_list → App\Plugins\\CustomerList
    - 예: 플러그인 이름: get-user → App\Plugins\\GetUser


## 기타, 특별한 설정 방법
기본적인 만드는 방법 외에, 필요할 때만 쓰는 특별한 설정입니다.

- [플러그인 설정 화면에서 독자적인 설정 하기](/ko/plugin_quickstart?id=플러그인-설정-화면에서-독자적인-설정-하기)
- [여러 플러그인 종류를 플러그인 하나로 대응하기](/ko/plugin_quickstart?id=여러-플러그인-종류를-플러그인-하나로-대응하기)
- [설치할 때 필수 라이브러리 체크하기](/ko/plugin_quickstart?id=설치할-때-필수-라이브러리-체크하기)
- [설치할 때 템플릿 설치하기](/ko/plugin_quickstart?id=설치할-때-템플릿-설치하기)


### 플러그인 설정 화면에서 독자적인 설정 하기

플러그인 독자적인 설정 항목을 플러그인의 설정 화면에 추가하고 싶은 경우에 사용합니다.  
예: YouTube Data API를 실행하는 데 필요한 액세스 키를 화면에서 설정    

![페이지](../img/plugin/plugin_page1.png)

- Plugin.php 파일을 아래와 같이 적습니다.

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginXXXXBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) 플러그인의 편집 화면에서 설정하는 옵션
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', '액세스 키')
            ->help('YouTube의 액세스 키를 입력해 주십시오.');
    }
}
~~~

- (1) "protected $useCustomOption = true;"를 추가합니다.
- (2) 함수 "public function setCustomOptionForm(&$form)"은 플러그인의 설정 화면에 표시되는 항목입니다.  
※사용자 정의 설정을 사용하려면 "protected $useCustomOption = true;"를 추가해 주십시오.  
※설정한 값을 가져오려면 함수 "$this->plugin->getCustomOption('매개변수 이름')"을 사용해 주십시오.

### 여러 플러그인 종류를 플러그인 하나로 대응하기
보통 플러그인 파일 하나로 대응할 수 있는 플러그인의 종류는 1종류입니다.  
그래서 예를 들어 종류 "페이지"와 "대시보드"를 모두 쓰고 싶은 경우에는 플러그인 파일을 2개 만들어야 합니다.  
하지만 다음과 같이 쓰면 여러 플러그인 종류를 플러그인 파일 하나로 모을 수 있습니다.    

#### config.json 수정
config.json 안의 plugin_type을 아래와 같이 수정합니다.

~~~
// config.json 일부 발췌
"plugin_type": "dashboard,page"
~~~

plugin_type의 값을 쉼표로 구분하여 여러 개 적습니다.


#### php 파일 수정
※플러그인 종류가 "스크립트", "스타일"인 경우에는 이 처리가 필요 없습니다.  
  
- 1종류인 경우에는 "Plugin.php"로 했던 파일 이름을 "Plugin(플러그인 종류의 첫 글자를 대문자로).php"로 바꿉니다.
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- 위 파일을 일부 수정하여 클래스 이름을 파일 이름과 같게 합니다.

~~~ php
<?php

// 클래스 이름 변경(이벤트의 경우)
class PluginEvent extends PluginEventBase
{
~~~


#### (선택)설정용 php 파일 만들기
- "[플러그인 설정 화면에서 독자적인 설정 하기](/ko/plugin_quickstart?id=플러그인-설정-화면에서-독자적인-설정-하기)"에서 적은 독자적인 설정을 하고 싶은 경우, "PluginSetting.php" 파일을 만듭니다.  

~~~ php
// 파일 이름: PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// 클래스 이름: PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', '텍스트')
            ->help('텍스트를 표시합니다.');
    }
}
~~~


#### zip으로 압축
이 파일들을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php(선택)
    - (기타, 필요한 PHP 파일, 이미지 파일 등)

### 샘플 플러그인
[페이지, 대시보드 양쪽 표시](https://exment.net/downloads/sample/plugin/PageMulti.zip)  



### 설치할 때 필수 라이브러리 체크하기
플러그인을 설치할 때, 필요한 라이브러리가 서버에 들어 있는지를 체크할 수 있습니다.  
composer 등으로 설치하는 라이브러리를 전제로 한 플러그인의 경우, 먼저 체크해 두면 플러그인을 실행할 때의 오류를 막을 수 있습니다.    

#### 사양
- 체크하고 싶은 라이브러리(composer로 설치하는 것)의 클래스 이름을 config.json에 적습니다.  
클래스가 존재하지 않은 경우에 사용자가 설치해 주었으면 하는 composer 이름도 마찬가지로 config.json에 적습니다.  

- 플러그인을 설치할 때 그 클래스가 존재하지 않은 경우, 플러그인의 설치는 오류가 됩니다.  
그때 화면에는 설치해 주었으면 하는 composer 이름이 표시됩니다.


#### config.json 수정
config.json에 "requirement"를 추가하고, 아래와 같은 옵션을 추가합니다.

~~~
// config.json 일부 발췌
"requirement": [
    {
        "class": "(체크할 클래스 이름)",
        "composer": "(클래스가 존재하지 않은 경우에 사용자가 설치해 주었으면 하는 composer 이름)"
    },
    {
        "class": "(체크할 클래스 이름)",
        "composer": "(클래스가 존재하지 않은 경우에 사용자가 설치해 주었으면 하는 composer 이름)"
    }
]
~~~

#### 기입 예
여기서는 일본의 공휴일을 한꺼번에 가져오는 라이브러리 "[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)"를 플러그인에서 사용하는 것을 가정합니다.

~~~
// config.json 일부 발췌
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

이 설정을 하면, 서버에 클래스 "\Yasumi\Yasumi"가 없는 경우 플러그인을 설치할 때 오류가 표시됩니다.
![페이지](../ja/img/plugin/plugin_requirement.png)



### 설치할 때 템플릿 설치하기
플러그인을 설치할 때 [템플릿](/ko/template)도 함께 설치할 수 있습니다.  
플러그인의 기능뿐 아니라 필요한 테이블 설정 등도 동시에 넣을 수 있습니다.    

#### config.json 수정
config.json에 "templates": true를 추가합니다.

~~~
// config.json 일부 발췌
"templates": true
~~~

#### 템플릿 파일 배치
1. 플러그인 폴더에 "templates" 폴더를 만듭니다.

2. [템플릿](/ko/template)의 내보내기를 합니다.  

3. 내보낸 zip 파일의 압축을 풀고, 만든 플러그인 폴더 안의 "templates" 폴더로 옮깁니다.

이것으로 플러그인을 설치할 때 템플릿 파일이 자동으로 설치됩니다.

#### 기타 보충
- 해당 플러그인을 삭제해도 이 기능으로 설치한 템플릿은 삭제되지 않습니다.


### (권장하지 않음)클래스에 속하지 않는 PHP 파일 사용하기
보통 PHP의 처리는 클래스 안에 쓰지만, 클래스를 쓰지 않고 함수만 쓰는 경우가 있습니다.  
예를 들어 아래와 같은 내용입니다.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

function testPluginGlobalFunction(){
    return true;
}
```

버전 v4.1.0 이상에서는 플러그인을 읽어 들이는 데 [spl_autoload_register](https://www.php.net/manual/en/function.spl-autoload-register.php)를 사용하고 있습니다.  
이 함수는 class, trait, interface는 지원하지만, 클래스에 속하지 않는 함수는 지원하지 않는 것 같습니다.  
그래서 보통과는 다르게 적어야 합니다. 아래의 대응을 해 주십시오.  

#### require_once 호출하기
호출하는 쪽 클래스의 생성자나 execute 함수 등에서 require_once를 실행해 주십시오.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // 같은 폴더의 function.php, Dir1 폴더의 function.php를 require_once한다
        require_once dirname(__FILE__).'/function.php';
        require_once dirname(__FILE__).'/Dir1/function.php';

        // 실행한다
        testPluginGlobalFunction();
        Dir1\testPluginGlobalFunctionDir1();
    }
}

```


#### 권장: 클래스에 속하도록 static 함수 구현하기
또한 다른 클래스에서 정의한 함수를 static으로 호출하고 싶은 경우, 가능한 한 클래스에 static 함수로 구현해 주십시오.


``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

// 함수를 정의하는 쪽
class StaticFunction
{
    // static 함수로 클래스에 정의한다
    public static function testPluginStaticFunction(){
        return true;
    }
}

```

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

// 함수를 호출하는 쪽
class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // static 함수로 호출한다
        StaticFunction::testPluginStaticFunction();
        Dir1\StaticFunction::testPluginStaticFunctionDir1();
    }
}

```
