# Plugin (nhập)
Đây là plugin tự viết xử lý nhập vào dữ liệu tùy chỉnh.
Nên dùng khi nhập vào Exment các tệp xuất từ hệ thống có sẵn, v.v.

![Ví dụ về plugin nhập](../img/plugin/plugin_import2.png)   


## Cách tạo
Chúng tôi giải thích các bước tạo, lấy ví dụ là plugin "nhập báo giá (Excel) vào bảng hợp đồng và bảng chi tiết hợp đồng".

- Giả sử phần đầu (header) của báo giá ghi thông tin của bảng hợp đồng, phần chi tiết ghi thông tin của bảng chi tiết hợp đồng.
- Điều kiện tiên quyết: cần có kiến thức về PHP, framework [Laravel](http://laravel.jp/) và thư viện thao tác Excel bằng PHP [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet).

### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "Nhập dữ liệu hợp đồng",
    "description": "Nhập dữ liệu hợp đồng bằng logic riêng.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "Nhập hợp đồng",
    "icon": "fa-files-o"
}
~~~

- plugin_name : tên plugin. Hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid : chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : hãy nhập import.  
- target_tables : hãy nhập tên bảng là đối tượng nhập.  

Lưu ý: target_tables có thể đổi sau trên màn hình. Nếu chỉ định nhiều bảng, ô chọn plugin được hiển thị trong hộp thoại nhập của từng bảng.  


### Tạo tệp PHP
- Tạo tệp PHP như sau. Hãy đặt tên là "Plugin.php".

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

        // Đọc bảng hợp đồng theo nội dung ô B4 của Sheet1
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Soạn dữ liệu hợp đồng từ thông tin ghi ở phần đầu của Sheet1
        // Đặt giá trị cố định 1 cho status
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // Thêm bản ghi vào bảng hợp đồng
        $record = getModelName('contract')::create($contract);

        // Xuất dữ liệu chi tiết hợp đồng dựa trên thông tin chi tiết ghi từ dòng 7 đến dòng 15 của Sheet1
        for ($i = 7; $i <= 15; $i++) {
            // Lấy mã phiên bản sản phẩm từ cột A
            $product_version_code = getCellValue("A$i", $sheet, true);
            // Khi chưa đặt mã phiên bản sản phẩm thì bỏ qua, sang dòng tiếp theo
            if (!isset($product_version_code)) break;
            // Đọc bảng phiên bản sản phẩm theo mã phiên bản sản phẩm
            $product_version = getModelName('product_version')
                ::where('value->product_version_code', $product_version_code)->first();
            // Khi không lấy được bảng phiên bản sản phẩm thì bỏ qua, sang dòng tiếp theo
            if (!isset($product_version)) continue;
            // Soạn dữ liệu chi tiết hợp đồng từ dòng chi tiết và bảng phiên bản sản phẩm
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // Thêm bản ghi vào bảng chi tiết hợp đồng
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
- namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Class Plugin cần kế thừa class PluginImportBase.  

### Nén thành zip
Nén thành zip với cấu hình tối thiểu là 2 tệp trên.  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### Tải lên
Tải plugin lên.  
Lưu ý: cách tải lên vui lòng xem [Plugin](/vi/plugin).  


### Cách chạy nhập
1. Trên màn hình của target_tables đã đăng ký ở màn hình quản lý plugin, mở hộp thoại nhập. Ô chọn plugin nhập được hiển thị.
2. Chọn plugin đã đăng ký rồi bấm nút gửi. Xử lý nhập được chạy theo nội dung của hàm execute trong Plugin.php.
![Hộp thoại nhập](../img/plugin/plugin_import1.png)  


### Plugin mẫu
Lưu ý: để dùng plugin mẫu này, hãy thêm "mẫu dành cho công ty bán sản phẩm" trong cài đặt mẫu (template).
[Plugin nhập dữ liệu hợp đồng](https://github.com/exment-git/plugin-sample/tree/main/import/PluginImportContract)  
[Tệp nhập của dữ liệu hợp đồng](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  

