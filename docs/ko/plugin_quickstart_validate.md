# 플러그인(유효성 검사)
사용자 정의 데이터를 저장할 때와 사용자 정의 데이터를 삭제할 때, 독자적인 유효성 검사(입력 내용의 체크)를 실행하는 플러그인입니다.
문자 종류나 자릿수의 체크는 사용자 정의 열의 설정으로 할 수 있습니다. 더 복잡한 체크나 항목 사이의 관련 체크를 하고 싶은 경우에 이 플러그인을 권장합니다.

![유효성 검사 구현 예](../img/plugin/plugin_validate1.png)   

> 2개의 값을 단순히 비교하는 유효성 검사라면, [화면에서의 설정](/ko/table)도 써 보십시오.

![두 열 비교](../img/table/compare1.png)    

## 만드는 방법

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "사용자 정의 테이블의 유효성 검사를 합니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : 반각 영숫자로 적어 주십시오.
- uuid : 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : validator라고 적어 주십시오.  
- (선택)target_tables : 유효성 검사 대상의 테이블 이름을 적어 주십시오.  


### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // 입력값을 가져온다
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // 오류 메시지를 설정한다(키: 열 이름, 값: 메시지)
                $this->messages['ypos'] = 'Y에는 X보다 큰 값을 입력해 주십시오.';
                // 반환값으로 false(오류 발생)를 반환한다
                return false;
            }
        }

        // 반환값으로 true(정상)를 반환한다
        return true;

        
        ///// (v3.7.5부터 추가)유효성 검사를 호출한 실행원의 종류를 가져오는 경우. 특정 호출 방법일 때만 유효성 검사를 하는 경우 등에 이용해 주십시오
        \Log::debug($this->called_type);
        ///// $this->called_type의 종류
        // form : 화면
        // api : API
        // import : 데이터 가져오기
        // null : 그 밖(다른 플러그인 등)
    }

    public function validateDestroy($custom_value)
    {
        // (v6.0.2부터 추가)false를 반환한 경우, 데이터를 삭제하지 않고 'message'에 설정한 오류 메시지를 화면에 표시합니다.
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  '우선순위가 높은 데이터는 삭제할 수 없습니다.',
            ];
        } else {
            // true를 반환한 경우, 데이터를 삭제합니다.
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- **저장할 때**: 플러그인 관리 화면에서 설정한 "대상 테이블"의 데이터를 저장하기 직전에 플러그인이 호출되어, Plugin.php 안의 validate 함수를 실행합니다.
    - validate 함수에서 true를 반환한 경우, 처리는 그대로 계속됩니다.
    - false를 반환한 경우, 처리를 중단하고 프로퍼티 $messages에 설정한 오류 메시지를 화면에 표시합니다.

- **삭제할 때**: "대상 테이블"의 데이터를 삭제하기 직전에 플러그인이 호출되어, Plugin.php 안의 validateDestroy 함수를 실행합니다.
    - validateDestroy 함수에서 'status'가 true인 배열을 반환한 경우, 데이터를 삭제합니다.
    - 'status'가 false인 배열을 반환한 경우, 처리를 중단하고 'message'에 설정한 오류 메시지를 화면에 표시합니다.

- Plugin 클래스는 클래스 PluginValidatorBase를 상속하고 있습니다.
PluginValidatorBase는 다음 프로퍼티 등을 가지고 있습니다. validate 함수 안에서 이 프로퍼티들을 참조할 수 있습니다.
프로퍼티의 상세에 대해서는 [플러그인 레퍼런스](/ko/plugin_reference)를 참조해 주십시오.
    - $custom_table: 호출한 쪽의 사용자 정의 테이블
    - $original_value: 변경 전의 사용자 정의 데이터 값
    - $input_value: 화면의 입력값

### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### 샘플 플러그인
[공지사항 표시 순서 체크](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- 공지사항 테이블의 표시 순서가 100을 넘는 경우에는 오류로 하는 샘플입니다.  

