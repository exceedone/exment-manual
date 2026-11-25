## 플러그인(대시보드)
Exment의 대시보드에 새 화면을 만들 수 있습니다.  
대시보드의 아이템으로 독자적인 페이지를 사용하고 싶은 경우에 이용해 주십시오.  
이 페이지에서는 출퇴근 기록 버튼을 예로, 플러그인(대시보드)을 만드는 방법을 설명합니다.  

## 시작하기 전에
Exment의 플러그인 페이지는 PHP 프레임워크 [Laravel](http://laravel.jp/)(일본어)과 관리 화면 라이브러리 [exment-admin-core](https://github.com/exceedone/exment-admin-core)(laravel-admin / open-admin을 바탕으로 한 라이브러리, v6.x 이전은 laravel-admin)를 사용하여 개발합니다.  
페이지를 개발하는 경우에는 특히 Laravel의 지식이 있는 분이 개발할 것을 권장합니다.

## 만드는 방법

### 샘플
여기서는 샘플로 아래의 페이지를 만듭니다.
- 사용자의 출퇴근을 관리하기 위한 테이블을 만든다.    
- 대시보드에 출근·퇴근, 휴식 시작, 휴식 종료 버튼을 표시한다.   
- 버튼을 클릭하면 클릭한 시각을 데이터에 넣는다.
  
![대시보드](../img/plugin/plugin_dashboard1.png)   

※미리 [여기](https://exment.net/downloads/sample/template/dakoku.zip)의 템플릿을 가져와 주십시오.

- 샘플 플러그인 [여기](https://github.com/exment-git/plugin-sample/tree/main/dashboard/Dakoku)  


### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json

{
    "plugin_name": "Dakoku",
    "plugin_view_name" : "출퇴근 기록",
    "description": "대시보드에서 출퇴근을 기록하기 위한 플러그인입니다.",
    "uuid":  "691a24f2-2c7a-42c5-8cff-23c5277f6f22",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "dashboard",
    "route": [
        {
            "uri": "post",
            "method": [
                "post"
            ],
            "function": "post"
        }
    ]
}

~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 32문자+하이픈의, 합계 36자의 문자열입니다. 플러그인을 고유하게 하는 데 사용합니다.  
아래 URL 등에서 만들어 주십시오.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 dashboard라고 적어 주십시오.  
- route는 실행할 URL의 엔드포인트와 그 HTTP 메서드, Controller 안의 메서드를 목록으로 정의합니다.
    - uri: 페이지 표시를 위한 uri입니다. 실제 URL은 "http(s)://(Exment의 URL)/dashboardbox/plugin/(플러그인 관리 화면에서 설정한 URL)/(대시보드 항목의 ID)/(지정한 uri)"가 됩니다.  
    - method: HTTP 메서드입니다. get,post,put,delete로 적어 주십시오.
    - function: 실행할 Controller 안의 메서드
- route에는 반드시 uri가 빈 것("")을 포함해 주십시오. 메뉴에서 플러그인의 페이지로 이동할 때 이 엔드포인트에 접속합니다.

> ※URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이상에서 새로 설치한 사이트)의 경우입니다. `.env` 의 `ADMIN_ROUTE_PREFIX` 에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는 사이트 URL 뒤에 그 값을 붙여 주십시오(예: `http(s)://(Exment의 URL)/admin/dashboardbox/plugin/(플러그인 관리 화면에서 설정한 URL)/(대시보드 항목의 ID)/(지정한 uri)`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 참조하십시오.

### Plugin 파일 만들기

#### 메인 로직 만들기
아래와 같은 PHP 파일을 만듭니다. 파일 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php

//(1)
namespace App\Plugins\Dakoku;

use Exceedone\Exment\Services\Plugin\PluginDashboardBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginDashboardBase
{
    /**
     *
     * @return Content|\Illuminate\Http\Response
     */
    public function body()
    {
        if(is_null(CustomTable::getEloquent('dakoku'))){
            return '출퇴근 기록 테이블이 설치되어 있지 않습니다.';
        }
        
        $dakoku = $this->getDakoku();
        $status = $this->getStatus($dakoku);
        $params = $this->getStatusParams($status);

        // (3)
        return view('exment_dakoku::dakoku', [
            'dakoku' => $dakoku,
            'params' => $params,
            'action' => $this->getDashboardUri('post'),
        ]);
    }

    /**
     * 전송
     *
     * @return void
     */
    public function post()
    {
        $dakoku = $this->getDakoku();
        
        $now = \Carbon\Carbon::now();

        if(!isset($dakoku)){
            $dakoku = CustomTable::getEloquent('dakoku')->getValueModel();
            $dakoku->setValue('target_date', $now->toDateString());
        }

        $status = null;
        switch(request()->get('action')){
            // 출근
            case 'syukkin':
                $dakoku->setValue('syukkin_time', $now);
                $status = 1;
                break;
            // 휴식 시작
            case 'kyuukei_start':
                $dakoku->setValue('kyuukei_start_time', $now);
                $status = 11;
                break;
            // 휴식 종료
            case 'kyuukei_end':
                $dakoku->setValue('kyuukei_end_time', $now);
                $status = 21;
                break;
            // 퇴근
            case 'taikin':
                $dakoku->setValue('taikin_time', $now);
                $status = 99;
                break;
        }
        if(isset($status)){
            $dakoku->setValue('status', $status);
        }
        $dakoku->save();

        admin_toastr(trans('admin.save_succeeded'));
        return back();
    }

    /**
     * 현재의 근태 상황을 가져오기
     *
     * @return void
     */
    protected function getDakoku(){
        $table = CustomTable::getEloquent('dakoku');
        if(!isset($table)){
            return null;
        }
        
        
        // 현재 시각을 가져온다
        $now = \Carbon\Carbon::now();

        // 기준 시간보다 앞이면 전날로 다룬다
        if($now->hour <= 4){
            $now = $now->addDay(-1);
        }

        // 해당하는 출퇴근 기록을 가져온다
        $query = getModelName('dakoku')::query();
        $query->where('value->target_date', $now->toDateString())
            ->where('created_user_id', \Exment::user()->base_user_id);

        $dakoku = $query->first();

        return $dakoku;
    }

    /**
     * 상태를 가져오기
     *
     * @param [type] $dakoku
     * @return int
     */
    protected function getStatus($dakoku){
        if(!isset($dakoku) || is_null($dakoku->getValue('syukkin_time'))){
            return 0;
        }

        return $dakoku->getValue('status');
    }

    protected function getStatusParams($status){
        switch($status){
            case 0:
                return 
                [
                    'status_text' => '미출근',
                    'buttons' => [
                        [
                        'button_text' => '출근',
                        'action_name' => 'syukkin',
                        ]
                    ]
                ];
            // 출근
            case 1:
                return  
                [
                    'status_text' => '근무 중',
                    'buttons' => [
                        [
                            'button_text' => '휴식',
                            'action_name' => 'kyuukei_start',
                        ], 
                        [
                            'button_text' => '퇴근',
                            'action_name' => 'taikin',
                        ], 
                    ]
                ];
        
            case 11:
                return 
                [
                    'status_text' => '휴식 중',
                    'buttons' => [
                        [
                            'button_text' => '휴식 종료',
                            'action_name' => 'kyuukei_end',
                        ], 
                    ]
                ];
            case 21:
                return 
                [
                    'status_text' => '근무 중',
                    'buttons' => [
                        [
                            'button_text' => '휴식 종료',
                            'action_name' => 'kyuukei_syuryo',
                        ], 
                    ]
                ]; 
                
            case 99:
                return 
                [
                    'status_text' => '퇴근',
                    'buttons' => [
                    ]
                ];
        }
    }
}
~~~
- (1) namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)  
또한 클래스 이름은 "Plugin"으로 하고, PluginDashboardBase를 상속해 주십시오.

- (2) 클래스 안의 public 메서드 이름은 config.json의 function에 적은 이름이 됩니다.  

- (3) 뷰를 사용하는 경우, 뷰 이름의 접두사로 "exment_(플러그인 이름의 스네이크 케이스)::"를 추가해 주십시오.  

- (4) 플러그인의 엔드포인트를 가져오고 싶은 경우, 함수 "$this->getDashboardUri('엔드포인트 이름')"을 사용해 주십시오.  
※URL 전체 경로를 가져오고 싶은 경우, admin_url($this->getDashboardUri('엔드포인트 이름'))을 사용해 주십시오.

#### (선택)뷰에 대하여
뷰를 분리하는 경우, blade 파일은 폴더 "resources/views" 아래에 저장해 주십시오.  

#### (선택)css, js, 그 밖의 정적 파일에 대하여
- css 파일은 폴더 "public/css"에 배치해 주십시오.  
- js 파일은 폴더 "public/js"에 배치해 주십시오.  
- 그 밖의 파일(이미지 파일 등)은 폴더 "public/assets"에 배치해 주십시오.  

### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- Dakoku.zip
    - config.json
    - Plugin.php
    - (기타, 필요한 PHP 파일, 이미지 파일 등)


### 기타
- 특정 ID 값의 데이터 상세를 표시하고 싶은 경우, config.json의 route에 아래와 같은 기술을 추가해 주십시오.  
"{id}"와 같이 uri를 지정할 수 있습니다.  

~~~ json

{
    "route": [
        {
            "uri": "show_details/{id}",
            "method": [
                "get"
            ],
            "function": "show_details"
        }
    ]
}

~~~

## 대시보드에 반영
업로드한 플러그인을 대시보드에 표시하려면 아래의 순서를 따릅니다.  

1. 대시보드의 "새로 만들기"를 클릭합니다.  
종류가 "대시보드"인 플러그인을 업로드한 경우, 선택 항목에 "플러그인"이 표시됩니다.    
![대시보드](../img/plugin/plugin_dashboard2.png)   

2. 표시 이름과 대상 플러그인을 입력하고 전송합니다.
![대시보드](../img/plugin/plugin_dashboard3.png)   

3. 대시보드에 선택한 아이템이 표시됩니다.  
![대시보드](../img/plugin/plugin_dashboard4.png)   


### 샘플 플러그인
[출퇴근 기록 관리](https://github.com/exment-git/plugin-sample/tree/main/dashboard/Dakoku)  
※[여기의 템플릿](https://exment.net/downloads/sample/template/dakoku.zip)을 가져와 주십시오.
