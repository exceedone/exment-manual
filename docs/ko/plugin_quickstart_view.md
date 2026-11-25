## 플러그인(뷰)
사용자 정의 데이터의 목록 화면에, 독자적인 디자인이나 기능을 가진 뷰를 추가하는 플러그인입니다.
표준 뷰(목록·집계·캘린더 뷰)와는 전혀 다른 기능을 쓰고 싶을 때 이용해 주십시오.

![뷰 구현 예](../img/plugin/plugin_view1.png)   

## 시작하기 전에
Exment의 플러그인 페이지는 다음 2가지를 사용하여 개발합니다.

- PHP 프레임워크 [Laravel](http://laravel.jp/)
- 관리 화면 라이브러리 [exment-admin-core](https://github.com/exceedone/exment-admin-core)(laravel-admin / open-admin을 기반으로 한 라이브러리, v6.x 이전은 laravel-admin)

특히 Laravel 지식이 있는 분이 개발하는 것을 권장합니다.


## 사용자 정의 뷰 주요 사양
- 사용자 정의 데이터의 목록 화면에, 독자적인 기능이나 화면을 표시할 수 있습니다.
- 뷰의 설정 항목은 플러그인 개발자가 자유롭게 추가할 수 있습니다. 추가한 항목은 표준 뷰와 마찬가지로, 뷰 설정 화면에서 뷰마다 설정할 수 있습니다.
- 표준 뷰와 마찬가지로, 뷰를 여러 개 만들 수 있습니다. 같은 플러그인의 뷰라도 "뷰 A에서는 모든 데이터를 표시한다", "뷰 B에서는 유효 플래그가 YES인 데이터만 표시한다"처럼, 뷰마다 설정을 바꿀 수 있습니다.


## 페이지와 뷰의 차이
독자적인 화면을 만드는 방법에는, 이 플러그인(뷰) 외에 [플러그인(페이지)](/ko/plugin_quickstart_page)가 있습니다.
둘의 주요 차이는 다음과 같습니다.

#### 플러그인(페이지)
- 기본적으로, 특정 테이블에 연결되지 않는, 완전히 독립된 페이지를 만듭니다.
- 플러그인을 설치하면, 그 시점에 플러그인의 독자적인 화면에 접근할 수 있게 됩니다.
- 특정 테이블에 연결되지 않으므로, 여러 테이블을 결합한 페이지나 Exment의 사용자 정의 데이터와 전혀 관계없는 페이지도 만들 수 있습니다.

#### 플러그인(뷰)
- 특정 테이블의 목록 화면에, 만든 플러그인의 화면이 표시됩니다.
- 표준 뷰(목록·집계·캘린더 뷰)와 마찬가지로, 관리자 또는 사용자가 뷰를 추가하면 플러그인의 독자적인 화면이 표시됩니다.
- 기본적으로는 선택한 테이블의 데이터와 관련된 화면을 표시합니다. 여러 테이블을 결합한 화면이나 Exment의 사용자 정의 데이터와 전혀 관계없는 화면을 만들 수도 있습니다.



## 만드는 방법

### 샘플
여기서는 샘플로 아래의 페이지를 만듭니다.
- 작업을 카테고리별로 나열하는, 간단한 칸반 뷰를 표시합니다.
- "카테고리"에 해당하는 열은 뷰 설정에서 고를 수 있게 합니다. 이렇게 하면 같은 플러그인을 여러 테이블에서 쓸 수 있습니다.


### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "칸반 뷰",
    "description": "칸반 뷰를 표시합니다.",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 view라고 적어 주십시오.  
- route에는 실행할 URL의 엔드포인트와 그 HTTP 메서드, Controller 안의 메서드를 목록으로 정의합니다.
※뷰는 기본적으로 목록 화면을 표시하기만 하므로, route 설정은 필요 없습니다. ajax로 비동기 요청·응답을 할 때만 정의해 주십시오.

    - uri: 페이지 표시를 위한 uri입니다. 실제 URL은 "http(s)://(Exment의 URL)/plugins/(플러그인의 URL)/(지정한 uri)"가 됩니다. "플러그인의 URL"은 plugin_name을 스네이크 케이스로 바꾼 것입니다(config.json에 "uri"를 적은 경우에는 그 값).  
    - method: HTTP 메서드입니다. get,post,put,delete로 적어 주십시오.
    - function: 실행할 Controller 안의 메서드
    - 예: plugin_name이 "KanbanView", config.json에서 지정한 uri가 "update", 지정한 method가 "post"인 경우, "http(s)://(Exment의 URL)/plugins/kanban_view/update(메서드: POST)".

> ※URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이후에 새로 설치한 사이트)의 경우입니다. `.env`의 `ADMIN_ROUTE_PREFIX`에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는, 사이트의 URL 뒤에 그 값을 더해 주십시오(예: `http(s)://(Exment의 URL)/admin/plugins/kanban_view/update`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 참조해 주십시오.


### Plugin 파일 만들기

#### 메인 로직 만들기
아래와 같은 PHP 파일을 만듭니다. 파일 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) 플러그인의 독자적인 설정을 추가하는 경우에는 주석을 해제
    // protected $useCustomOption = true;

    /**
     * (2) 목록을 표시할 때의 메서드. "grid"로 고정
     */
    public function grid()
    {
        $values = $this->values();
        // (6) 뷰를 호출
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) 이 플러그인의 독자적인 엔드포인트
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) 뷰 설정 화면에 표시하는 옵션
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        // 독자적인 설정을 추가하는 경우
        $form->embeds('custom_options', '상세 설정', function($form){
            $form->select('category', '카테고리 열')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('카테고리 열을 선택해 주십시오. 칸반의 보드에 해당합니다. 사용자 정의 열 종류 "선택 (고정 값)", "선택 (값과 표시명 저장)"이 후보로 표시됩니다.');
        });

        // 필터(좁히기)를 설정하는 경우
        static::setFilterFields($form, $this->custom_table);

        // 정렬을 설정하는 경우
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) 플러그인의 편집 화면에서 설정하는 옵션. 모든 뷰에 공통으로 설정한다
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // 필요한 경우 추가
        // $form->text('access_key', '액세스 키')
        //     ->help('YouTube의 액세스 키를 입력해 주십시오.');
    }

    
    // 아래는 칸반 뷰에 필요한 처리 ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // 데이터의 필터를 실행
        $this->custom_view->filterModel($query);

        // 데이터의 정렬을 실행
        $this->custom_view->sortModel($query);

        // 값을 가져오기
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)  
또한 클래스 이름은 "Plugin"으로 하고, PluginViewBase를 상속해 주십시오.

- (2) 목록 화면을 표시할 때의 public 메서드 이름은 "grid"로 고정입니다.

- (3) 그 밖에 엔드포인트를 추가로 만드는 경우, 클래스 안의 public 메서드 이름은 config.json의 function에 적은 이름으로 해 주십시오.

- (4) 함수 "public function setViewOptionForm($form)"에서, 뷰의 설정 화면에 표시할 항목을 정의합니다.
이 설정은 뷰마다 할 수 있으므로, 같은 플러그인의 뷰라도 "뷰 A에서는 모든 데이터를 표시한다", "뷰 B에서는 유효 플래그가 YES인 데이터만 표시한다"처럼 설정을 바꿀 수 있습니다.
  
    항목에는 플러그인의 독자적인 설정과, Exment 표준 기능으로 준비되어 있는 "필터 조건", "정렬 설정"의 2종류가 있습니다.
    ※설정한 값은 함수 "$this->custom_view->getCustomOption('매개변수 이름')"으로 가져옵니다.
    ※또한 Exment의 표준 기능인 뷰에서 사용하는 열 설정을 사용하는 경우에는 아래와 같이 적어 주십시오.

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) 함수 "public function setCustomOptionForm(&$form)"에서, 플러그인의 설정 화면에 표시할 항목을 정의합니다.
모든 뷰에 공통인 설정입니다.

    ※사용자 정의 설정을 쓰려면 "protected $useCustomOption = true;"를 추가해 주십시오.
    ※설정한 값은 함수 "$this->plugin->getCustomOption('매개변수 이름')"으로 가져옵니다.

- (6) 뷰(blade 파일)를 쓰는 경우에는 함수 "$this->pluginView"를 사용해 주십시오.

- (7) 플러그인의 엔드포인트를 가져오려면 함수 "$this->getRouteUri('엔드포인트 이름')"을 사용해 주십시오.
※URL의 전체 경로를 가져오려면 admin_url($this->getRouteUri('엔드포인트 이름'))을 사용해 주십시오.


#### (선택)뷰에 대하여
화면의 표시 부분(뷰)을 다른 파일로 나누는 경우, blade 파일은 폴더 "resources/views" 아래에 저장해 주십시오.

#### (선택)css, js, 그 밖의 정적 파일에 대하여
- css 파일은 폴더 "public/css"에 배치해 주십시오.  
- js 파일은 폴더 "public/js"에 배치해 주십시오.  
- 그 밖의 파일(이미지 파일 등)은 폴더 "public/assets"에 배치해 주십시오.  
※이 샘플에서는 칸반 뷰를 만들기 위한 js·css를 만들고 있습니다.  


### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (그 밖에 필요한 PHP 파일, 이미지 파일 등)
