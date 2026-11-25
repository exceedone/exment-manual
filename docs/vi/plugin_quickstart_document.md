# Plugin (xuất tài liệu)
Đây là plugin xuất các tài liệu riêng như báo giá, biểu mẫu chứng từ, v.v.
Template gốc được tạo ở định dạng Excel. Tệp xuất ra cũng ở định dạng Excel.

![Ví dụ xuất tài liệu](../img/plugin/plugin_document1.png)   

> Về xuất ở định dạng PDF, vui lòng xem [Xuất tài liệu (Docurain)](/vi/plugin_quickstart_docurain).

## Cách tạo

### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json
{
    "plugin_name": "PluginDemoDocument",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a66",
    "plugin_view_name": "Plugin Document",
    "description": "Thử xuất tài liệu.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "document",
    "filename": "Báo giá_${ymdhms}",
    "target_tables": "estimate",
    "label": "Xuất báo giá",
    "icon": "fa-files-o",
    "button_class": "btn-success"
}
~~~

- plugin_name: hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type: hãy nhập document.  
- file_name là tên tệp khi xuất. Có thể dùng [biến tham số](/vi/params).
- target_tables là bảng đối tượng xuất. Nếu có nhiều bảng, hãy nhập cách nhau bằng dấu phẩy.
- label là nhãn của nút dùng để xuất tài liệu.
- icon là biểu tượng của nút dùng để xuất tài liệu.
- button_class là class của nút dùng để xuất tài liệu.

Lưu ý: target_tables, label, icon, button_class có thể đổi sau trên màn hình cài đặt plugin.


### Tạo tệp Excel template
Tạo tệp template làm gốc cho tài liệu.  
Tệp template ở định dạng Excel (xlsx). Tệp xuất ra cũng ở định dạng Excel (xlsx).  
Lưu ý: hãy đặt tên tệp Excel template là "document.xlsx".  
Lưu ý: về các tham số viết trong tệp template, vui lòng xem "Tham số" ở dưới.

#### Tham số
Đây là các tham số đặt trong tệp Excel template.
Khi nhập biến theo dạng quy định vào ô của Excel, lúc xuất tài liệu, giá trị đã đăng ký trong hệ thống sẽ được xuất ra.
##### Quy tắc cơ bản
- Nhập vào ô của Excel theo quy tắc "**${tên biến}**".  
Ví dụ: "${year}", "${month}", "${value:estimate_code}"  
![Tham số](../img/plugin/plugin_document_params.png)  

- Có thể đặt nhiều tham số trong cùng một ô.  

- Có thể đặt sẵn hàm trong Excel. Lưu ý: một số hàm có thể không hoạt động đúng. Nhất định phải kiểm tra hoạt động.  

- Các biến tham số có thể đặt, vui lòng xem ở trang sau.  
[Biến tham số](/vi/params)


##### Cách xuất danh sách dữ liệu của bảng con
Tùy loại tài liệu, có khi cần xuất dữ liệu bảng con của dữ liệu đối tượng thành bảng danh sách.
Ví dụ: "Báo giá" đăng ký ngày báo giá và thông tin khách hàng, và "Chi tiết báo giá" đăng ký danh sách các sản phẩm được báo giá  
![Bảng con](../img/plugin/plugin_document_children.png)  
Các bước xuất danh sách dữ liệu vào bảng này như sau.

1. Đặt tham số sau ở cột 1 của dòng 1 trong bảng sẽ xuất.
**"${loop:(tên bảng của bảng con):start}"**  
Ví dụ: ${loop:estimate_detail:start}  
![Bảng con - tham số 1](../img/plugin/plugin_document_loop1.png)  

2. Ở dòng 2 của bảng sẽ xuất, đặt tham số sau vào từng cột của mục muốn xuất.
**"${loop-item:(tên bảng của bảng con):(tên cột của bảng con)}"**  
Ví dụ: ${loop-item:estimate_detail:product_detail_name}  
![Bảng con - tham số 2](../img/plugin/plugin_document_loop2.png)  

3. Đặt tham số sau ở cột 1 của dòng cuối trong bảng sẽ xuất.
**"${loop:(tên bảng của bảng con):end}"**  
Ví dụ: ${loop:estimate_detail:end}  
![Bảng con - tham số 3](../img/plugin/plugin_document_loop3.png)  


##### Các hạn chế khác
- PhpSpreadSheet 1.22.0, bản mới nhất (tính đến 25/02/2022), không hỗ trợ các nội dung sau. Vui lòng không đưa vào template.  
    - Hình vẽ được chèn vào
    - Biểu đồ
    - Bảng đã được "định dạng dưới dạng bảng" (Format as Table)

- Nếu tệp xuất ra không có hình ảnh, vui lòng xem mục "Xuất tài liệu dùng Excel làm template bị lỗi khi xuất hình ảnh" trong [Xử lý sự cố](/vi/troubleshooting).

### Tạo tệp PHP (tùy chọn)
- Với việc xuất tài liệu thông thường, chỉ cần chuẩn bị document.xlsx đã đặt biến tham số là đủ.
Chỉ tạo tệp PHP khi muốn xử lý dữ liệu đặc biệt, hoặc muốn xuất dữ liệu ngoài Exment. Tên tệp là "Plugin.php".
**Lưu ý: nếu không cần xử lý đặc biệt thì không cần tệp Plugin.php này.**

~~~ php
<?php
namespace App\Plugins\PluginDemoDocument; // (PluginDemoDocument: tên plugin)

use Exceedone\Exment\Model\Define;
use Exceedone\Exment\Model\System;
use Exceedone\Exment\Services\Plugin\PluginDocumentBase;

class Plugin extends PluginDocumentBase
{
    /**
     * Hàm được gọi trước khi thay thế các biến của tài liệu
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function called($spreadsheet)
    {
        // Viết ở đây khi muốn chạy xử lý riêng trước khi thay thế các biến của tài liệu
    }

    /**
     * Hàm được gọi sau khi thay thế các biến của tài liệu
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function saving($spreadsheet)
    {
        // Chọn sheet thứ 1
        $sheet = $spreadsheet->getSheet(0);
        // Đặt tên site vào ô B1
        $sheet->setCellValue('B1', System::site_name());

        // Lấy tin mới của Exment
        $items = $this->getItems();

        foreach ($items as $idx => $item) {
            // Xuất từ dòng 4
            $row = $idx + 4;
            // Xuất ngày vào ô A?
            $date = \Carbon\Carbon::parse(array_get($item, 'date'))->format(config('admin.date_format'));
            $sheet->setCellValue("A$row", $date);
            // Xuất liên kết vào ô B?
            $link = array_get($item, 'link');
            $sheet->setCellValue("B$row", $link);
            // Xuất tiêu đề vào ô C?
            $title = array_get($item, 'title.rendered');
            $sheet->setCellValue("C$row", $title);
        }
    }

    /**
     * Lấy tin mới của Exment từ API
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
     * Điều kiện query truyền cho API
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
    * (Hỗ trợ từ v3.4.3) Xác định có hiển thị nút trên màn hình hay không. Mặc định là true
    * 
    * @return bool true: hiển thị, false: không hiển thị
    */
    public function enableRender(){
        // Hiển thị nút khi giá trị "view_flg" của cột tùy chỉnh là "1"
        return $this->custom_value->getValue('view_flg')  == 1;
    }
}

~~~

- namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Nơi đưa xử lý riêng vào là 2 hàm sau. Các hàm này được truyền spreadsheet qua tham số. Có thể truy cập spreadsheet này và đặt giá trị vào ô.  
Lưu ý: về cách dùng chi tiết spreadsheet, vui lòng xem [tài liệu của PhpSpreadsheet](https://phpspreadsheet.readthedocs.io/en/latest/).
    - Khi xử lý trước khi thay thế biến tham số: viết method "called".
    - Khi xử lý sau khi thay thế biến tham số: viết method "saving".

- Class Plugin kế thừa class PluginDocumentBase.  
PluginDocumentBase có các thuộc tính như bảng tùy chỉnh đã gọi plugin $custom_table, giá trị của bảng $custom_value, v.v.,  
và vào lúc hàm execute được gọi, giá trị được gán vào các thuộc tính đó.  
Chi tiết về các thuộc tính vui lòng xem [Tài liệu tham khảo plugin](/vi/plugin_reference).  

- (Hỗ trợ từ v3.4.3) Khi muốn dùng dữ liệu đã đăng ký để điều khiển việc hiển thị / ẩn nút, hãy viết method "enableRender".  
Trả về true khi hiển thị nút, trả về false khi muốn ẩn. (Mặc định là true.)


### Nén thành zip
Nén thành zip với cấu hình tối thiểu là các tệp trên.  
Tên tệp zip là "(plugin_name).zip".  
- PluginDemoDocument.zip
    - config.json
    - document.xlsx
    - Plugin.php (tùy chọn)
    - (các tệp PHP, tệp ảnh cần thiết khác, v.v.)


### Tải lên
Tải plugin lên.  
Lưu ý: cách tải lên vui lòng xem [Plugin](/vi/plugin).  


### Chạy xuất tài liệu
Khi mọi cài đặt đã hoàn tất đúng, nút được hiển thị trên màn hình hiển thị dữ liệu.
![Xuất tài liệu - nút](../img/plugin/plugin_document_button.png)  
  
Khi bấm nút, danh sách được hiển thị ở "Tệp đính kèm".
![Xuất tài liệu - tệp đính kèm](../img/plugin/plugin_document_list.png) 

### Plugin mẫu
[Xuất thông tin người dùng](https://github.com/exment-git/plugin-sample/tree/main/document/document_demo_user)  
Lưu ý: nút "Xuất thông tin người dùng" được hiển thị trên màn hình thông tin người dùng.  

### Plugin sản phẩm
[Xuất hóa đơn ra PDF](https://github.com/exment-git/plugin-product/tree/main/document/PluginInvoiceDocument)  
Lưu ý: xuất hóa đơn ở định dạng EXCEL bằng template. Đồng thời chuyển tệp EXCEL sang PDF.