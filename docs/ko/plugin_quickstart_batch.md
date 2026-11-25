# 플러그인(배치)
정해진 주기로, 또는 관리자가 지정한 시점에, 독자적인 처리를 실행하는 플러그인입니다.
매일 반드시 실행하는 처리 등을 추가하고 싶은 경우에 권장합니다.


## 만드는 방법
"논리 삭제한 데이터를 물리 삭제하는" 배치를 예로, 만드는 순서를 설명합니다.
※Exment의 표준에서는, 화면에서 삭제한 데이터는 "논리 삭제"가 되어 데이터베이스에는 그대로 남습니다.
이 데이터를 완전히 삭제하는(물리 삭제하는) 배치입니다.

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "데이터의 물리 삭제",
    "description": "논리 삭제한 모든 데이터를 완전히 삭제합니다.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : 플러그인 이름입니다. 반각 영숫자로 적어 주십시오.
- uuid : 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : batch라고 적어 주십시오.  
- batch_hour(선택) : 플러그인을 매일 실행하는 시각(시)입니다. 0~23의 정수로 적어 주십시오.
- batch_cron(선택) : 고급 사용자용입니다. 플러그인을 실행하는 시점을 cron 표기법으로 적습니다. 배치를 시작하는 시점을 유연하게 지정할 수 있습니다.

※batch_hour와 batch_cron은 나중에 화면에서 변경할 수 있습니다. config.json에 적은 값은 업로드한 뒤의 초깃값이 됩니다.


### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\HarddeleteData;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginBatchBase{
    /**
     * execute
     */
    public function execute() {
        $tables = CustomTable::all();

        foreach($tables as $table){
            $modelname = getModelName($table);
            if(!isset($modelname)){
                continue;
            }

            $modelname::onlyTrashed()
                ->forceDelete();
        }
    }
    
}
~~~
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- 플러그인 관리 화면에서 등록한 트리거의 조건에 맞았을 때 플러그인이 호출되어, Plugin.php 안의 execute 함수가 실행됩니다.

- Plugin 클래스는 클래스 PluginBatchBase를 상속하고 있습니다.  

### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### 업로드
플러그인을 업로드합니다. 업로드 방법은 [플러그인](/ko/plugin)을 참조해 주십시오.

- 배치 처리는 업로드한 직후에는 "사용 여부"가 "사용 안 함"이며, 자동으로는 실행되지 않습니다. 실행하려면 [플러그인](/ko/plugin)에서 "사용 여부"를 전환해 주십시오.
- **이 설정 외에 작업 스케줄 설정이 필요합니다**. 자세한 내용은 [작업 스케줄](/ko/additional_task_schedule)을 확인해 주십시오.


### 배치를 시작하는 방법
업로드한 배치를 시작하는 방법은 다음 3가지입니다.

| 방법 | 실행되는 시점 |
| ---- | ---- |
| 배치 실행 시간(시) 지정 | 매일, 지정한 시각 |
| 배치 실행 cron 지정 | cron 표기법으로 지정한 시점 |
| 명령 실행 | 명령을 실행했을 때(수동) |

#### 배치 실행 시간(시) 지정
플러그인 설정 화면에서 0~23을 입력합니다.
매일 그 시각에 플러그인이 실행됩니다. (예: "5"로 설정한 경우, 매일 5:00에 플러그인 실행)
![플러그인 화면](../img/plugin/plugin_batch1.png)  

#### 배치 실행 cron 지정
고급 사용자용입니다. 플러그인을 실행하는 시점을 cron 표기법으로 입력할 수 있습니다.
※이 설정을 적은 경우, 위의 "배치 실행 시간(시)"은 무효가 됩니다.
![플러그인 화면](../img/plugin/plugin_batch2.png)  

#### 명령 실행
명령줄에서, 원하는 시점에 수동으로 배치를 실행할 수도 있습니다.
아래 명령 중 하나를 실행해 주십시오.

~~~
# 플러그인 ID 지정
php artisan exment:batch 1

# plugin_name(플러그인 이름) 지정
php artisan exment:batch --name=harddelete_data

# uuid 지정
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~


### 샘플 플러그인
[데이터의 물리 삭제 플러그인](https://github.com/exment-git/plugin-sample/tree/main/batch/HarddeleteBatch)  
- 논리 삭제된 데이터를 물리 삭제하는 배치입니다.  
  
[외부 데이터베이스 연계](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)  
- 외부 데이터베이스에 저장된 정보를 Exment의 테이블에 한꺼번에 가져오는 배치입니다.  
- 사전 준비로 아래의 처리를 실행해 주십시오.
    1. Exment의 "관리자 설정" → "템플릿"에서 [템플릿](https://exment.net/downloads/sample/template/city_template.zip)을 가져옵니다.  
    2. 외부 데이터베이스를 만듭니다. 이 플러그인에서는 MySQL의 샘플 데이터베이스 "world"를 이용합니다. [공식 사이트](https://dev.mysql.com/doc/index-other.html)에서 zip을 다운로드한 다음, 사용 중인 MySQL(또는 MariaDB) 환경에서 압축을 푼 SQL을 실행해 주십시오.
![MySQL 다운로드 화면](../img/plugin/plugin_event1.png)  
    3. Exment의 "관리자 설정" → "플러그인"에서 [플러그인](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)을 업로드합니다.  
    4. 플러그인의 설정 화면을 열고, 2.에서 만든 외부 데이터베이스의 접속 정보를 입력 → 저장해 주십시오.  
![플러그인 설정 화면](../img/plugin/plugin_event2.png)  
