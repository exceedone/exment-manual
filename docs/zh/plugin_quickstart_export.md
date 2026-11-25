# 插件(导出)
这种插件可以自行实现自定义数据列表的导出。
要导出自己格式的文件，或者进行特殊的转换处理时，请使用这一种。

> 此功能从 v3.2.0 起添加。

## 关于输出格式
除了 Excel 以外，也可以用其他格式输出。
※Excel 格式时，处理做了进一步的优化。


## 创建方法(普通)
这里作为例子，创建把通知信息以没有表头的 csv 格式输出为列表的插件。  
※作为前提，需要具备 PHP 和框架 [Laravel](http://laravel.jp/) 的知识。

### 创建 config.json
- 创建以下的 config.json 文件。  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "导出的 CSV 测试。",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "通知信息输出",
    "icon": "fa-question",
    "export_description": "把通知信息以自己的 csv 格式输出为列表。"
}
~~~

- plugin_name : 插件名。请用半角英文数字填写。
- uuid : 用来区分插件的字符串。32 个字符加连字符，共 36 个字符。请不要和其他插件的值相同。  
可以通过以下 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : 请填写 export。  
- target_tables : 请填写导出对象的表名。有多个时，请用逗号分隔输入。  
- label : 显示在导出对话框中的标题。
- icon : 显示在导出对话框中的图标。    
- export_description : 显示在导出对话框中的说明文字。

※target_tables、label、icon、export_description 以后可以在页面中更改。


### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

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
        // ※用方法“$this->getTmpFullPath()”获取临时 tmp 文件
        // ※执行后，临时 tmp 文件会自动删除。
        $tmp = $this->getTmpFullPath();


        ///// 自己的实现处理---从这里开始
        // 打开 csv 文件
        $fp = fopen($tmp, 'w');

        // 以所有系统列、自定义列获取数据列表（数组）
        $data = $this->getData();

        // 以视图形式获取数据列表（数组）
        // $data = $this->getViewData();

        // 以 CustomValue 的 Collection 获取数据列表
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// 自己的实现处理---到这里结束


        // 返回 $tmp 的 string 字符串
        return $tmp;
    }

    /**
     * Get download file name.
     * 获取文件名
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- namespace 请设为 **App\Plugins\\(插件名的帕斯卡命名)** 。[详情请参阅这里](/zh/plugin_quickstart)

- Plugin 类需要继承类 PluginExportBase。  

### 压缩为 zip
以上述 2 个文件为最小结构，压缩为 zip。  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### 上传
上传插件。  
※上传方法请参阅[插件](/zh/plugin)。  


### 导出的执行方法
- 在插件管理页面中登记的 target_tables 的页面中，点击“导入/导出”按钮后，会显示已上传的插件的选择栏。  

![导出对话框](../img/plugin/plugin_export1.png)  

- 点击已登记的插件的“导出”按钮后，按 Plugin.php 的 execute 函数的内容执行导出处理。  




## 创建方法(Excel)
以 Excel 格式输出时，基本的步骤也相同。只有 PHP 文件的创建，可以更方便地实现。
※“创建 PHP 文件”以外的步骤，和“创建方法(普通)”相同。
※使用了用 PHP 操作 Excel 的库 [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)。 
  
这里作为例子，记载按照以下的示例模板文件导出通知信息的步骤。  

![导出对话框](../img/plugin/plugin_export2.png)  



### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// 改为 PluginExportExcel
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// 把 extends 改为 PluginExportExcel
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // 读取模板文件，初始化 PhpSpreadsheet
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // ※不使用模板文件，而新建文件时
        // $spreadsheet = $this->initializeExcel();

        // 以所有系统列、自定义列获取数据列表（数组）
        // $data = $this->getData();

        // 以视图形式获取数据列表（数组）
        // $data = $this->getViewData();

        // 以 CustomValue 的 Collection 获取数据列表
        $data = $this->getRecords();


        ///// 自己的实现处理---从这里开始
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // 循环数据并设置
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // 标题
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // 优先级
            $sheet->setCellValue("D{$column}", $record->updated_at); // 更新时间

            $column++;
        }
    
        // 边框的设置
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
        
        // 打印范围的设置
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// 自己的实现处理---到这里结束


        // 把创建的文件保存到 tmp 文件，并返回该文件路径
        // (作为和模板不同的文件保存)
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

### 压缩为 zip
以文件为最小结构，压缩为 zip。  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx(包含模板文件时)

### 其他限制
- PhpSpreadSheet 的最新版（截至 2022/02/25）1.22.0 不支持以下内容。请不要包含在模板中。  
    - 插入的图形
    - 图表
    - 进行了“套用表格格式”的表

- 输出的文件中不包含图像时，请确认[故障排除](/zh/troubleshooting)的“以 Excel 为模板输出文档时，图片输出失败”。

## 示例插件
- [CSV 输出的导出](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestCsv)
- [Excel 输出的导出](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestExcel)
