# 플러그인(내보내기)
사용자 정의 데이터 목록의 내보내기를 독자적으로 구현하는 플러그인입니다.
독자적인 형식의 파일을 내보내는 경우나, 특수한 변환 처리를 하는 경우에 이용해 주십시오.

> 이 기능은 v3.2.0부터 추가되었습니다.

## 출력 형식에 대하여
Excel 외에, 그 밖의 형식으로도 출력할 수 있습니다.
※Excel 형식의 경우에는 처리를 더 최적화하고 있습니다.


## 만드는 방법(보통)
여기서는 예로, 공지사항 정보를 헤더 없는 csv 형식으로 목록 출력하는 플러그인을 만듭니다.  
※전제로, PHP 및 프레임워크 [Laravel](http://laravel.jp/)의 지식이 필요합니다.

### config.json 만들기
- 아래의 config.json 파일을 만듭니다.  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "내보내기의 CSV 테스트입니다.",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "공지사항 정보 출력",
    "icon": "fa-question",
    "export_description": "공지사항 정보를 독자적인 csv 형식으로 목록 출력합니다."
}
~~~

- plugin_name : 플러그인 이름입니다. 반각 영숫자로 적어 주십시오.
- uuid : 플러그인을 구별하기 위한 문자열입니다. 32문자와 하이픈으로, 합계 36자입니다. 다른 플러그인과 같은 값이 되지 않게 합니다.  
다음 URL 등에서 만들 수 있습니다.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : export라고 적어 주십시오.  
- target_tables : 내보내기 대상의 테이블 이름을 적어 주십시오. 여러 개 있는 경우에는 쉼표로 구분하여 입력해 주십시오.  
- label : 내보내기 대화 상자에 표시하는 제목입니다.
- icon : 내보내기 대화 상자에 표시하는 아이콘입니다.    
- export_description : 내보내기 대화 상자에 표시하는 설명문입니다.

※target_tables, label, icon, export_description은 나중에 화면에서 변경할 수 있습니다.


### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\ExportTestCsv;

use Exceedone\Exment\Services\Plugin\PluginExportBase;

class Plugin extends PluginExportBase
{
    /**
     * execute
     */
    public function execute() 
    {
        // ※메서드 "$this->getTmpFullPath()"로 임시 tmp 파일을 가져온다
        // ※실행 후, 임시 tmp 파일은 자동으로 삭제됩니다.
        $tmp = $this->getTmpFullPath();


        ///// 독자적인 구현 처리---여기부터
        // csv 파일을 연다
        $fp = fopen($tmp, 'w');

        // 모든 시스템 열·사용자 정의 열로 데이터 목록 가져오기(배열)
        $data = $this->getData();

        // 뷰 형식으로 데이터 목록 가져오기(배열)
        // $data = $this->getViewData();

        // CustomValue의 Collection으로 데이터 목록 가져오기
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// 독자적인 구현 처리---여기까지


        // $tmp의 string 문자열을 반환한다
        return $tmp;
    }

    /**
     * Get download file name.
     * 파일 이름을 가져온다
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- namespace는 **App\Plugins\\(플러그인 이름의 파스칼 케이스)** 로 해 주십시오. [자세한 내용은 여기](/ko/plugin_quickstart)

- Plugin 클래스는 클래스 PluginExportBase를 상속해야 합니다.  

### zip으로 압축
위 2개 파일을 최소 구성으로 하여 zip으로 압축합니다.  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### 업로드
플러그인을 업로드합니다.  
※업로드 방법은 [플러그인](/ko/plugin)을 참조해 주십시오.  


### 내보내기를 실행하는 방법
- 플러그인 관리 화면에서 등록한 target_tables의 화면에서 "가져오기/내보내기" 버튼을 클릭하면, 업로드한 플러그인의 선택란이 표시됩니다.  

![내보내기 대화 상자](../img/plugin/plugin_export1.png)  

- 등록한 플러그인의 "내보내기" 버튼을 클릭하면, Plugin.php의 execute 함수의 내용으로 내보내기 처리가 실행됩니다.  




## 만드는 방법(Excel)
Excel 형식으로 출력하는 경우에도 기본적인 순서는 같습니다. PHP 파일 만들기만, 더 편리하게 구현할 수 있습니다.
※"PHP 파일 만들기" 이외의 순서는 "만드는 방법(보통)"과 같습니다.
※PHP에서 Excel을 다루기 위한 라이브러리 [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)를 사용하고 있습니다. 
  
여기서는 예로, 아래의 샘플 템플릿 파일에 맞추어 공지사항 정보를 내보내는 순서를 적습니다.  

![내보내기 대화 상자](../img/plugin/plugin_export2.png)  



### PHP 파일 만들기
- 아래와 같은 PHP 파일을 만듭니다. 이름은 "Plugin.php"로 해 주십시오.

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// PluginExportExcel로 변경
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// extends를 PluginExportExcel로 변경
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // 템플릿 파일을 읽어 들여 PhpSpreadsheet를 초기화
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // ※템플릿 파일을 사용하지 않고, 새로 파일을 만드는 경우
        // $spreadsheet = $this->initializeExcel();

        // 모든 시스템 열·사용자 정의 열로 데이터 목록 가져오기(배열)
        // $data = $this->getData();

        // 뷰 형식으로 데이터 목록 가져오기(배열)
        // $data = $this->getViewData();

        // CustomValue의 Collection으로 데이터 목록 가져오기
        $data = $this->getRecords();


        ///// 독자적인 구현 처리---여기부터
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // 데이터를 반복하여 넣기
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // 제목
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // 우선순위
            $sheet->setCellValue("D{$column}", $record->updated_at); // 업데이트 일시

            $column++;
        }
    
        // 테두리 설정
        $laseRow = $column - 1;
        $sheet->getStyle("A2:D{$laseRow}")->applyFromArray([
            'borders' => [
                'outside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                ],
                'inside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_HAIR
                ],
            ],
        ]);
        
        // 인쇄 범위 설정
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// 독자적인 구현 처리---여기까지


        // tmp 파일에 만든 파일을 저장하고, 그 파일 경로를 반환
        // (템플릿과는 다른 파일로 저장)
        return $this->getExcelResult($spreadsheet);
    }

    /**
     * Get download file name.
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.xlsx";
    }
}

~~~

### zip으로 압축
파일을 최소 구성으로 하여 zip으로 압축합니다.  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx(템플릿 파일을 포함하는 경우)

### 그 밖의 제약
- PhpSpreadSheet의 최신 버전(2022/02/25 현재)인 1.22.0에서는 아래의 내용에 대응하지 않습니다. 템플릿에는 포함하지 않도록 부탁드립니다.  
    - 삽입하는 도형
    - 그래프
    - "표 서식"을 지정한 표

- 출력된 파일에 이미지가 포함되지 않는 경우, [문제 해결](/ko/troubleshooting)의 "Excel을 템플릿으로 한 문서 출력에서 이미지 출력에 실패한다"를 확인해 주십시오.

## 샘플 플러그인
- [CSV 출력의 내보내기](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestCsv)
- [Excel 출력의 내보내기](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestExcel)
