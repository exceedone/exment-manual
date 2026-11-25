## 플러그인(API)
Exment에 새 API를 추가하는 플러그인입니다.
[API 레퍼런스](https://exment.net/reference/webapi.html)에 없는 기능을 추가하고 싶을 때 이용해 주십시오.

## 시작하기 전에
Exment의 API 플러그인은 PHP 프레임워크 [Laravel](http://laravel.jp/)을 사용하여 개발합니다.  
API를 개발하는 경우에는, 특히 Laravel 지식이 있는 분이 개발하는 것을 권장합니다.

## 만드는 방법

### 샘플
여기서는 샘플로 "사용자 정의 열의 이름으로 사용자 정의 열 정보를 가져오는" API를 만듭니다.

- 샘플 플러그인은 [여기](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "열 이름으로 사용자 정의 열 정보를 가져오는 샘플 API입니다.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 api라고 적어 주십시오.  
- uri에는 이 플러그인 공통의 엔드포인트를 적어 주십시오. 나중에 플러그인 관리 화면에서 다시 설정할 수 있습니다.
- route에는 처리별 엔드포인트와 HTTP 메서드, Controller 안의 메서드 이름을 목록으로 정의합니다.
    - uri: 페이지 표시를 위한 uri입니다. 실제 URL은 "http(s)://(Exment의 URL)/api/plugins/(플러그인 공통의 엔드포인트)/(지정한 uri)"가 됩니다.  
    - method: HTTP 메서드입니다. get,post,put,delete로 적어 주십시오.
    - function: 실행할 Controller 안의 메서드 이름입니다.
    - 예: 플러그인 공통의 엔드포인트가 "sampleapi", 처리별 uri가 "column", method가 "get"인 경우, "http(s)://(Exment의 URL)/api/plugins/sampleapi/column(메서드: GET)".

> ※URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이후에 새로 설치한 사이트)의 경우입니다. `.env`의 `ADMIN_ROUTE_PREFIX`에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는, 사이트의 URL 뒤에 그 값을 더해 주십시오(예: `http(s)://(Exment의 URL)/admin/api/plugins/sampleapi/column`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 참조해 주십시오.

### Plugin 파일 만들기

#### 메인 로직 만들기
아래와 같은 PHP 파일을 만듭니다. 파일 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * 열 이름으로 사용자 정의 열 정보를 가져오는 샘플입니다
     *
     * @return mixed
     */
    public function column()
    {
        // 요청 매개변수를 체크합니다(table과 column은 각각 필수)
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // 요청 매개변수에서 테이블 이름과 열 이름을 가져옵니다
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // 사용자 정의 테이블 정보를 가져옵니다
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) 권한이 있는지 체크합니다
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // 사용자 정의 열 정보를 가져옵니다
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

또한 클래스 이름은 "Plugin"으로 하고, PluginApiBase를 상속해 주십시오.

- (2) 클래스 안의 public 메서드 이름은 config.json의 function에 적은 이름이 됩니다.  

- (3) 사용자 정의 테이블 정보의 메서드 hasPermission을 호출하면, 현재 사용자가 그 테이블의 권한을 가지고 있는지 체크할 수 있습니다. 체크할 수 있는 권한은 다음과 같습니다.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: 접근 권한
    - AVAILABLE_VIEW_CUSTOM_VALUE: 참조 권한
    - AVAILABLE_EDIT_CUSTOM_VALUE: 편집 권한
    - AVAILABLE_ALL_CUSTOM_VALUE: 모든 데이터 접근 권한
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: 모든 데이터 편집 권한


### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (그 밖에 필요한 PHP 파일 등)


### 접근
다음 URL로 API에 접근합니다.
http(s)://(Exment의 URL)/api/plugins/(플러그인 공통의 엔드포인트)/(route의 uri)  

예: 플러그인 공통의 엔드포인트가 "sampleapi", route의 uri가 "column"인 경우  
http(s)://(Exment의 URL)/api/plugins/sampleapi/column


### 기타
- 플러그인으로 만든 API에 접근하려면, API 스코프를 "plugin"으로 해야 합니다. (토큰을 가져올 때 지정해 주십시오.)

- 특정 ID 값의 데이터를 가져오는 경우 등, URL에서 매개변수를 지정하고 싶을 때는 config.json의 route → uri에 아래와 같은 기술을 추가해 주십시오. "{id}"나 "{table}"처럼 지정할 수 있습니다.

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * 열 이름으로 사용자 정의 열 정보를 가져오는 샘플입니다
    * ※URL에서 테이블 이름과 열 이름을 지정하고 있습니다
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // 사용자 정의 테이블 정보를 가져옵니다
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // 권한이 있는지 체크합니다
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // 사용자 정의 열 정보를 가져옵니다
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### 샘플 플러그인
[API 샘플](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)
