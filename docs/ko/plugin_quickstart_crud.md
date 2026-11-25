## 플러그인(CRUD 페이지)
Exment에 독자적인 CRUD 페이지를 추가합니다.  
**※플러그인(CRUD)에는 많은 기능과 함수가 준비되어 있습니다. 자세한 내용은 [플러그인 레퍼런스](/ko/plugin_reference_crud)를 확인해 주십시오.**  
※관리 화면 라이브러리의 클래스는 Exment v7.0.0 이후의 네임스페이스("ExmentAdminCore\Admin")로 적혀 있습니다. v6.x 이전을 이용하는 경우에는 "Encore\Admin"으로 바꿔 읽어 주십시오. 자세한 내용은 [여기(영어)](/update/v7_0_0)를 확인해 주십시오.  

## CRUD란
CRUD는 Create(만들기), Read(표시), Update(업데이트), Delete(삭제)를 말합니다.
이 플러그인은 여기에 List(목록)를 더한 "CRUD + List" 화면 만들기에 특화되어 있습니다.

- 화면 구성은 Exment의 사용자 정의 데이터의 목록·상세·새로 만들기·업데이트·삭제와 거의 같습니다. 꼭 필요한 최소한의 개발만으로 만들 수 있습니다.
- 외부 데이터(예: 다른 데이터베이스 엔진, WordPress, SharePoint 리스트, 타사 웹 데이터베이스, 회계 시스템 등)를 Exment에 가져오지 않고, Exment의 화면에서 관리할 수 있습니다.
- 개발하는 것은 데이터의 취득·추가 같은 내부 처리뿐입니다. UI 부분의 개발은 기본적으로 필요 없으므로, [플러그인(페이지)](/ko/plugin_quickstart_page)의 개발에 비해 개발 공수가 크게 줄어듭니다.

![CRUD](../img/crud/crud1.png)  

## 주로 할 수 있는 것
- 외부 데이터(예: 다른 데이터베이스 엔진, WordPress, SharePoint 리스트, 타사 웹 데이터베이스, 회계 시스템 등)를 Exment에 데이터를 가져오지 않고, Exment의 화면에서 관리할 수 있게 한다
- Exment의 여러 테이블을 자유롭게 결합·좁히기·정렬하여 표시
- 데이터의 목록·표시·새로 만들기·편집·삭제를, 기능이나 권한에 따라 실행할 수 있는지 제어
- 데이터 목록은 외부 서비스에 맞추어, "모든 데이터를 목록으로 표시", "20건·50건·100건마다 건수를 나누어 페이지네이션으로 표시"의 양쪽에 대응
- 여러 엔드포인트에 대응. 플러그인 하나에 여러 엔드포인트를 설정하고, 각각의 엔드포인트에서 CRUD 표시
- 인증 설정 가능. "키", "ID·비밀번호" 또는 "OAuth 인증"에 대응. 이 설정값들이 있고 인증되어 있는 경우에만 CRUD 페이지에 접근할 수 있도록 제어 가능

## 만드는 방법(필요 최소한)
여기서는 "Exment와는 다른 MySQL 데이터베이스 'world'의 데이터를, Exment에서 목록·표시·만들기·업데이트·삭제하는" 화면을 예로, 만드는 순서를 설명합니다.

### 사전 준비
먼저 다음 2가지를 해 주십시오.
- 외부 데이터베이스를 만듭니다. 이 플러그인에서는 MySQL의 샘플 데이터베이스 "world"를 씁니다. [공식 사이트](https://dev.mysql.com/doc/index-other.html)에서 zip을 다운로드하여 압축을 풀고, 안의 SQL을 사용 중인 MySQL(또는 MariaDB) 환경에서 실행해 주십시오.
![MySQL 다운로드 화면](../img/plugin/plugin_event1.png)  

- config/database.php를 열고, connections에 아래를 추가합니다.

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "MySQL World 연계",
    "description": "MySQL의 샘플 데이터베이스 \"World\"와 Exment를 연계합니다.",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- uri에는 이 플러그인에 접근하기 위한 URI를 적어 주십시오.
(지정하지 않은 경우에는 plugin_name에서 만들어집니다)
- plugin_type은 crud라고 적어 주십시오.  

### Plugin 파일 만들기
아래와 같은 PHP 파일을 만듭니다. 파일 이름은 "Plugin.php"로 해 주십시오.  
**※아래의 예는 최소한의 것입니다. 플러그인(CRUD)에는 아래 외에도 많은 기능과 함수가 준비되어 있습니다. 자세한 내용은 [플러그인 레퍼런스](/ko/plugin_reference_crud)를 확인해 주십시오.**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2) 제목
     * content title
     *
     * @var string
     */
    protected $title = '세계의 도시';

    /**
     * (3) 설명문
     * content description
     *
     * @var string
     */
    protected $description = '세계의 도시를 목록으로 표시합니다.';

    /**
     * (4) 아이콘
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) 열 정의를 가져오기
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => '도시 이름', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => '국가 코드', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => '인구', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) 데이터 목록(Paginate)을 가져오기
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // 자유 단어 검색이 있는 경우
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) 데이터 상세(1건의 데이터)를 가져오기
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) 새로 만들 때와 편집할 때의 폼을 설정
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // 국가 목록 가져오기
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) 새로 만들기 실행
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // 독자적인 데이터베이스에 저장한다.
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) 편집 실행
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // 독자적인 데이터베이스에 저장한다.
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) 데이터 삭제
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)  
또한 클래스 이름은 "Plugin"으로 하고, PluginCrudBase를 상속해 주십시오.

- (2) 프로퍼티 title은 각 페이지에 표시하는 제목입니다.

- (3) 프로퍼티 description은 각 페이지에 표시하는 설명문입니다.

- (4) 프로퍼티 icon은 각 페이지에 표시하는 아이콘입니다.

- (5) 함수 getFieldDefinitions는 열 정의를 연관 배열로 가져오는 함수입니다.  
    - 반드시 "primary" => true가 되는 키를 1개 추가해 주십시오. (현재 복합 키에는 대응하지 않습니다)  
    - "key"는 데이터 취득이나 HTML 각 요소의 name 등에 쓰는 항목 이름입니다. 영숫자로 입력해 주십시오.
    - "label"은 목록 화면 등의 항목 이름에 사용합니다.
    - "grid"는 목록 화면에 표시할 항목에 설정합니다. 표시 순서를 정수로 적어 주십시오.
    - "show"는 상세 화면에 표시할 항목에 설정합니다. 표시 순서를 정수로 적어 주십시오.
    - "create"는 새로 만들기 화면에 표시할 항목에 설정합니다. 표시 순서를 정수로 적어 주십시오.
    - "edit"는 편집 화면에 표시할 항목에 설정합니다. 표시 순서를 정수로 적어 주십시오.

- (6) 함수 getPaginate는 데이터 목록을 페이지네이션 형식으로 가져오는 함수입니다.  
가져온 데이터를 LengthAwarePaginator 형식으로 반환해 주십시오.
목록의 각 요소는 연관 배열로 하고, 그 키는 getFieldDefinitions에서 설정한 키와 같게 해 주십시오.
※화면에서 검색을 한 경우, 인수 $options에 값이 설정됩니다. 자세한 내용은 [플러그인 레퍼런스](/ko/plugin_reference_crud)를 확인해 주십시오.

- (7) 함수 getData는 데이터 상세(1건의 데이터)를 가져옵니다.  
데이터는 연관 배열로 하고, 그 키는 getFieldDefinitions에서 설정한 키와 같게 해 주십시오.

- (8) 함수 setForm은 새로 만들 때와 편집할 때의 폼을 설정합니다.  
폼을 자유로운 형태로 하고 싶은 경우에 이 함수를 구현해 주십시오.
※이 함수를 구현하지 않는 경우, 함수 getFieldDefinitions에서 "create" 또는 "edit"를 설정한 항목이 화면에 표시됩니다.

- (9) 함수 postCreate는 새로 만들기 화면에서 저장했을 때 호출됩니다. 여기서 새 데이터를 등록해 주십시오.

- (10) 함수 putEdit는 편집 화면에서 저장했을 때 호출됩니다. 여기서 데이터를 업데이트해 주십시오.

- (11) 함수 delete는 화면에서 삭제했을 때 호출됩니다. 여기서 데이터를 삭제해 주십시오.
※화면에 따라서는 인수 $id에 배열이 설정됩니다.


### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## 샘플 플러그인
※아래의 샘플 플러그인은 Exment v7.0.0 이후에 대응하며, 네임스페이스 "ExmentAdminCore\Admin"을 사용합니다.  
v6.x 이전을 이용하는 경우에는 "Plugin.php" 안의 "ExmentAdminCore\Admin"을 "Encore\Admin"으로 바꾸어 이용해 주십시오. 자세한 내용은 [여기(영어)](/update/v7_0_0)를 확인해 주십시오.

아래의 샘플을 준비해 두었습니다.

| 이름 | 개요 | 인증 | 샘플 링크 |
| ---- | ---- | ---- | ---- |
| MySQLWorld | Exment와는 다른 데이터베이스에 접속하여, 데이터의 취득·추가·편집·삭제를 합니다. | - | [다른 MySQL 연계](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | 독자적인 SQL을 사용하여, 3계층의 항목을 동시에 목록·참조할 수 있게 하는 샘플입니다. | - | [독자적인 SQL로 Exment 데이터 표시](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | REST API를 사용하여, 지정한 Wordpress 사이트의 게시물을 목록 표시·상세 표시합니다. | - | [WordPress 연계](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | REST API를 사용하여, 여러 Wordpress 사이트의 게시물을 목록 표시·상세 표시합니다. 여러 엔드포인트에 대응하며, 화면에서 버튼으로 대상 사이트를 전환합니다. | - | [여러 사이트의 WordPress 연계](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | REST API를 사용하여, 지정한 Wordpress 사이트의 게시물을 목록 표시·상세 표시합니다. 또한 미리 설정한 액세스 키를 사용하여, 게시물의 추가·편집·삭제도 합니다. | ID·비밀번호 | [WordPress 게시](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | 다른 서버의 Exment와 Rest API로 연계하여, 데이터를 가져옵니다. | OAuth | [다른 Exment와 REST API 연계](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |
