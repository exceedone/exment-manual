# 플러그인(가져오기)
사용자 정의 데이터로의 가져오기 처리를 독자적으로 구현하는 플러그인입니다.
기존 시스템에서 출력한 파일 등을 Exment에 가져오는 경우에 권장합니다.

![가져오기 구현 예](../img/plugin/plugin_import2.png)   


## 만드는 방법
"견적서(Excel)를 계약 테이블과 계약 명세 테이블에 가져오는" 플러그인을 예로, 만드는 순서를 설명합니다.

- 견적서의 헤더 부분에는 계약 테이블의 정보, 명세 부분에는 계약 명세 테이블의 정보가 적혀 있는 것으로 합니다.
- 전제로, PHP, 프레임워크 [Laravel](http://laravel.jp/), PHP에서 Excel을 다루기 위한 라이브러리 [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)의 지식이 필요합니다.

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "계약 데이터 가져오기",
    "description": "계약 데이터를 독자적인 로직으로 가져옵니다.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "계약 가져오기",
    "icon": "fa-files-o"
}
~~~

- plugin_name : 플러그인 이름입니다. 반각 영숫자로 적어 주십시오.
- uuid : 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : import라고 적어 주십시오.  
- target_tables : 가져오기 대상의 테이블 이름을 적어 주십시오.  

※target_tables는 나중에 화면에서 변경할 수 있습니다. 여러 개 지정한 경우에는 각각의 테이블의 가져오기 대화 상자에 플러그인 선택란이 표시됩니다.  


### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\Pluginimportcontract;

use Exceedone\Exment\Services\Plugin\PluginImportBase;
use PhpOffice\PhpSpreadsheet\IOFactory;

class Plugin extends PluginImportBase{
    /**
     * execute
     */
    public function execute() {
        $path = $this->file->getRealPath();

        $reader = $this->createReader();
        $spreadsheet = $reader->load($path);

        // Sheet1의 B4 셀의 내용으로 계약 테이블을 읽어 들입니다
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Sheet1의 헤더 부분에 적힌 정보로 계약 데이터를 편집합니다
        // status에는 고정값: 1을 설정합니다
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // 계약 테이블에 레코드를 추가합니다
        $record = getModelName('contract')::create($contract);

        // Sheet1의 7행~15행에 적힌 명세 정보를 바탕으로 계약 명세 데이터를 출력합니다
        for ($i = 7; $i <= 15; $i++) {
            // A열에서 제품 버전 코드를 가져옵니다
            $product_version_code = getCellValue("A$i", $sheet, true);
            // 제품 버전 코드가 설정되어 있지 않을 때는 다음 행으로 건너뜁니다
            if (!isset($product_version_code)) break;
            // 제품 버전 코드로 제품 버전 테이블을 읽어 들입니다
            $product_version = getModelName('product_version')
                ::where('value->product_version_code', $product_version_code)->first();
            // 제품 버전 테이블을 가져오지 못한 경우에는 다음 행으로 건너뜁니다
            if (!isset($product_version)) continue;
            // 명세 행과 제품 버전 테이블에서 계약 명세 데이터를 편집합니다
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // 계약 명세 테이블에 레코드를 추가합니다
            getModelName('contract_detail')::create($contract_detail);
        }

        return true;
    }

    /**
     * create reader
     */
    protected function createReader()
    {
        return IOFactory::createReader('Xlsx');
    }
    
}
~~~
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- Plugin 클래스는 클래스 PluginImportBase를 상속해야 합니다.  

### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### 업로드
플러그인을 업로드합니다.  
※업로드 방법은 [플러그인](/ko/plugin)을 참조해 주십시오.  


### 가져오기를 실행하는 방법
1. 플러그인 관리 화면에서 등록한 target_tables의 화면에서, 가져오기 대화 상자를 엽니다. 가져오기 플러그인의 선택란이 표시됩니다.
2. 등록한 플러그인을 선택하고, "전송" 버튼을 누릅니다. Plugin.php의 execute 함수의 내용으로 가져오기 처리가 실행됩니다.
![가져오기 대화 상자](../img/plugin/plugin_import1.png)  


### 샘플 플러그인
※이 샘플 플러그인을 쓰려면, 템플릿 설정에서 "제품 판매 회사용 템플릿"을 추가해 주십시오.
[계약 데이터 가져오기 플러그인](https://github.com/exment-git/plugin-sample/tree/main/import/PluginImportContract)  
[계약 데이터의 가져오기 파일](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  

