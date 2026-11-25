# 플러그인(문서 출력)
견적서나 장표 등, 독자적인 문서 자료를 출력하는 플러그인입니다.
바탕이 되는 템플릿은 Excel 형식으로 만듭니다. 출력되는 파일도 Excel 형식입니다.

![문서 출력 예](../img/plugin/plugin_document1.png)   

> PDF 형식으로의 출력은 [문서 출력(Docurain)](/ko/plugin_quickstart_docurain)을 참조해 주십시오.

## 만드는 방법

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "PluginDemoDocument",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a66",
    "plugin_view_name": "Plugin Document",
    "description": "문서 출력을 하는 테스트입니다.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "document",
    "filename": "견적서_${ymdhms}",
    "target_tables": "estimate",
    "label": "견적서 출력",
    "icon": "fa-files-o",
    "button_class": "btn-success"
}
~~~

- plugin_name은 반각 영숫자로 적어 주십시오.
- uuid는 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type은 document라고 적어 주십시오.  
- file_name은 출력할 때의 파일 이름입니다. [매개변수 변수](/ko/params)를 사용할 수 있습니다.
- target_tables는 출력 대상이 되는 테이블입니다. 여러 개 있는 경우에는 쉼표로 구분하여 입력해 주십시오.
- label은 문서 출력을 위한 버튼의 레이블입니다.
- icon은 문서 출력을 위한 버튼의 아이콘입니다.
- button_class는 문서 출력을 위한 버튼의 클래스입니다.

※target_tables, label, icon, button_class는 플러그인의 설정 화면에서 나중에 변경할 수 있습니다.


### 템플릿 Excel 파일 만들기
문서의 바탕이 되는 템플릿 파일을 만듭니다.  
템플릿 파일은 Excel 형식(xlsx)입니다. 출력되는 파일도 마찬가지로 Excel 형식(xlsx)입니다.  
※템플릿 Excel 파일의 파일 이름은 "document.xlsx"로 해 주십시오.  
※템플릿 파일에 적는 매개변수는 아래의 "매개변수"를 참조해 주십시오.

#### 매개변수
템플릿의 Excel 파일에 설정하는 매개변수입니다.
Excel의 셀에 정해진 형식의 변수를 입력해 두면, 문서를 출력할 때 시스템에 등록되어 있는 값이 출력됩니다.
##### 기본 규칙
- "**${변수 이름}**"의 규칙으로 Excel의 셀에 입력합니다.  
예: "${year}", "${month}", "${value:estimate_code}"  
![매개변수](../img/plugin/plugin_document_params.png)  

- 같은 셀에 여러 매개변수를 설정할 수 있습니다.  

- Excel에는 함수를 설정해 둘 수 있습니다. ※일부 함수는 정상적으로 동작하지 않을 수 있습니다. 반드시 동작을 확인해 주십시오.  

- 설정할 수 있는 매개변수 변수는 아래 페이지를 확인해 주십시오.  
[매개변수 변수](/ko/params)


##### 하위 테이블 데이터를 목록으로 출력하는 방법
문서의 종류에 따라서는, 대상 데이터의 하위 테이블의 데이터를 목록 표에 출력해야 합니다.
예: 견적일이나 고객 정보를 등록하는 "견적"과, 견적하는 제품의 목록을 등록하는 "견적 명세"  
![하위 테이블](../img/plugin/plugin_document_children.png)  
이 표에 데이터의 목록을 출력하는 순서는 다음과 같습니다.

1. 출력할 표의 1행째의 1열째에 아래의 매개변수를 설정합니다.
**"${loop:(하위 테이블의 테이블 이름):start}"**  
예: ${loop:estimate_detail:start}  
![하위 테이블_매개변수 1](../img/plugin/plugin_document_loop1.png)  

2. 출력할 표의 2행째의, 출력하고 싶은 항목의 각 열에 아래의 매개변수를 설정합니다.
**"${loop-item:(하위 테이블의 테이블 이름):(하위 테이블의 열 이름)}"**  
예: ${loop-item:estimate_detail:product_detail_name}  
![하위 테이블_매개변수 2](../img/plugin/plugin_document_loop2.png)  

3. 출력할 표의 마지막 행의 1열째에 아래의 매개변수를 설정합니다.
**"${loop:(하위 테이블의 테이블 이름):end}"**  
예: ${loop:estimate_detail:end}  
![하위 테이블_매개변수 3](../img/plugin/plugin_document_loop3.png)  


##### 그 밖의 제약
- PhpSpreadSheet의 최신 버전(2022/02/25 현재)인 1.22.0에서는 아래의 내용에 대응하지 않습니다. 템플릿에는 포함하지 않도록 부탁드립니다.  
    - 삽입하는 도형
    - 그래프
    - "표 서식"을 지정한 표

- 출력된 파일에 이미지가 포함되지 않는 경우, [문제 해결](/ko/troubleshooting)의 "Excel을 템플릿으로 한 문서 출력에서 이미지 출력에 실패한다"를 확인해 주십시오.

### PHP 파일 만들기(선택)
- 보통의 문서 출력은 매개변수 변수를 설정한 document.xlsx를 준비하기만 하면 충분합니다.
특수한 데이터 가공을 하고 싶은 경우나, Exment 이외의 데이터를 출력하고 싶은 경우에만 PHP 파일을 만들어 주십시오. 이름은 "Plugin.php"입니다.
**※특수한 처리가 필요 없는 경우, 이 Plugin.php 파일은 필요 없습니다.**

~~~ php
<?php
namespace App\Plugins\PluginDemoDocument; // (PluginDemoDocument: 플러그인 이름)

use Exceedone\Exment\Model\Define;
use Exceedone\Exment\Model\System;
use Exceedone\Exment\Services\Plugin\PluginDocumentBase;

class Plugin extends PluginDocumentBase
{
    /**
     * 문서의 변수 치환을 실행하기 전에 호출되는 함수
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function called($spreadsheet)
    {
        // 문서의 변수 치환을 실행하기 전에 독자적인 처리를 실행하고 싶은 경우에는 여기
    }

    /**
     * 문서의 변수 치환을 실행한 후에 호출되는 함수
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function saving($spreadsheet)
    {
        // 첫 번째 시트를 선택
        $sheet = $spreadsheet->getSheet(0);
        // B1 셀에 사이트 이름을 설정
        $sheet->setCellValue('B1', System::site_name());

        // Exment의 새 소식을 가져온다
        $items = $this->getItems();

        foreach ($items as $idx => $item) {
            // 4행째~ 출력
            $row = $idx + 4;
            // 날짜를 A? 셀에 출력
            $date = \Carbon\Carbon::parse(array_get($item, 'date'))->format(config('admin.date_format'));
            $sheet->setCellValue("A$row", $date);
            // 링크를 B? 셀에 출력
            $link = array_get($item, 'link');
            $sheet->setCellValue("B$row", $link);
            // 제목을 C? 셀에 출력
            $title = array_get($item, 'title.rendered');
            $sheet->setCellValue("C$row", $title);
        }
    }

    /**
     * Exment의 새 소식을 API에서 가져온다
     *
     * @return array exment news items array
     */
    protected function getItems()
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', Define::EXMENT_NEWS_API_URL, [
            'http_errors' => false,
            'query' => $this->getQuery(),
            'timeout' => 3, // Response timeout
            'connect_timeout' => 3, // Connection timeout
        ]);

        $contents = $response->getBody()->getContents();
        if ($response->getStatusCode() != 200) {
            return [];
        }
        return json_decode_ex($contents, true);
    }

    /**
     * API에 넘기는 쿼리 조건
     *
     * @return array query string array
     */
    protected function getQuery()
    {
        $request = request();

        // get querystring
        $query = [
            'categories' => 6,
            'per_page' => System::datalist_pager_count() ?? 5,
            'page' => $request->get('page') ?? 1,
        ];

        return $query;
    }

    /**
    * (v3.4.3 지원)화면에 버튼을 표시할지의 판정. 기본값은 true
    * 
    * @return bool true: 그린다 false: 그리지 않는다
    */
    public function enableRender(){
        // 사용자 정의 열의 값 "view_flg"가 "1"인 경우에 버튼을 표시한다
        return $this->custom_value->getValue('view_flg')  == 1;
    }
}

~~~

- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- 독자적인 처리를 넣는 곳은 다음 2개의 함수입니다. 이 함수들에는 인수로 스프레드시트가 넘겨집니다. 이 스프레드시트에 접근하여 셀에 값을 설정할 수 있습니다.  
※스프레드시트의 자세한 이용 방법에 대해서는 [PhpSpreadsheet의 문서](https://phpspreadsheet.readthedocs.io/en/latest/)를 참조해 주십시오.
    - 매개변수 변수를 치환하기 전에 처리를 하는 경우: "called" 메서드를 구현합니다.
    - 매개변수 변수를 치환한 뒤에 처리를 하는 경우: "saving" 메서드를 구현합니다.

- Plugin 클래스는 클래스 PluginDocumentBase를 상속하고 있습니다.  
PluginDocumentBase는 호출한 쪽의 사용자 정의 테이블 $custom_table, 테이블 값 $custom_value 등의 프로퍼티를 가지고 있으며,  
execute 함수가 호출된 시점에 그 프로퍼티에 값이 대입됩니다.  
프로퍼티의 상세에 대해서는 [플러그인 레퍼런스](/ko/plugin_reference)를 참조해 주십시오.  

- (v3.4.3 지원) 등록된 데이터를 사용하여 버튼의 표시·숨김을 제어하고 싶은 경우, 메서드 "enableRender"를 구현합니다.  
버튼을 표시하는 경우에는 true를, 숨기고 싶은 경우에는 false를 반환해 주십시오. (기본값은 true입니다.)


### zip으로 압축
위의 파일을 최소 구성으로 하여 zip으로 압축합니다.  
zip 파일 이름은 "(plugin_name).zip"으로 해 주십시오.  
- PluginDemoDocument.zip
    - config.json
    - document.xlsx
    - Plugin.php(선택)
    - (그 밖에 필요한 PHP 파일, 이미지 파일 등)


### 업로드
플러그인을 업로드합니다.  
※업로드 방법은 [플러그인](/ko/plugin)을 참조해 주십시오.  


### 문서 출력 실행
모든 설정이 올바르게 끝나면, 데이터의 표시 화면에 버튼이 표시됩니다.
![문서 출력_버튼](../img/plugin/plugin_document_button.png)  
  
버튼을 클릭하면 "첨부 파일"에 목록이 표시됩니다.
![문서 출력_첨부 파일](../img/plugin/plugin_document_list.png) 

### 샘플 플러그인
[사용자 정보 출력](https://github.com/exment-git/plugin-sample/tree/main/document/document_demo_user)  
※사용자 정보 화면에 "사용자 정보 출력" 버튼이 표시됩니다.  

### 제품 플러그인
[청구서의 PDF 출력](https://github.com/exment-git/plugin-product/tree/main/document/PluginInvoiceDocument)  
※템플릿으로 청구서를 EXCEL 형식으로 출력합니다. 아울러 EXCEL 파일을 PDF로 변환합니다.
