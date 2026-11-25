# Plugin (Sự kiện)
Được chạy khi làm một thao tác nhất định trên màn hình Exment (lưu dữ liệu, thực hiện quy trình làm việc, v.v.), và làm được các xử lý như cập nhật giá trị.  
Trang này giải thích cách làm plugin (Sự kiện). Bạn tạo config.json và Plugin.php, nén thành zip rồi tải lên.  

> Chức năng này được thêm từ v3.2.0.

## Các loại sự kiện

| Tên | Loại | Mô tả |
| ---- | ---- | ---- |
| loading | Trước khi tải màn hình | Xử lý được khởi động ở đầu quá trình tải trang. |
| loaded | Sau khi tải màn hình | Xử lý được khởi động ở cuối quá trình tải trang. |
| saving | Ngay trước khi lưu | Xử lý được khởi động ngay trước khi lưu dữ liệu. |
| saved | Sau khi lưu | Xử lý được khởi động sau khi lưu dữ liệu. |
| deleted | Sau khi xóa | Xử lý được khởi động sau khi xóa dữ liệu. |
| workflow_action_executing | Trước khi thực hiện quy trình làm việc | Xử lý được khởi động ngay trước khi thực hiện quy trình làm việc. |
| workflow_action_executed | Sau khi thực hiện quy trình làm việc | Xử lý được khởi động sau khi thực hiện quy trình làm việc. |
| notify_executing | Trước khi thông báo | Xử lý được khởi động ngay trước khi chạy thông báo. |
| notify_executed | Sau khi thông báo | Xử lý được khởi động sau khi chạy thông báo. |

## Cách tạo

### Tạo config.json
- Tạo tệp config.json sau.  

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "Thử chạy sự kiện plugin.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- plugin_name hãy ghi bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi 32 ký tự cộng dấu gạch nối, tổng cộng 36 ký tự. Dùng để plugin là duy nhất.  
Hãy tạo từ URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type hãy ghi là event.  
- Nếu chỉ định event_triggers ngay từ đầu, hãy nhập các tên ở "Các loại sự kiện", cách nhau bằng dấu phẩy.
- Nếu chỉ định target_tables ngay từ đầu, hãy nhập tên bảng của bảng tùy chỉnh, cách nhau bằng dấu phẩy.


### Tạo tệp PHP
- Tạo tệp PHP như sau. Tên tệp là "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- Namespace là **App\Plugins\\(tên plugin viết theo PascalCase)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Khi khớp điều kiện trigger đã đăng ký trên màn hình quản lý plugin, plugin được gọi và hàm execute trong Plugin.php được chạy.  

- Class Plugin kế thừa class PluginEventBase.  
PluginEventBase có các thuộc tính như bảng tùy chỉnh gọi tới $custom_table, giá trị của bảng $custom_value,  
và tại thời điểm hàm execute được gọi, các thuộc tính đó đã được gán giá trị.  
Chi tiết về các thuộc tính, vui lòng xem [Plugin reference](/vi/plugin_reference).  

### Nén thành zip
Lấy 2 tệp trên làm cấu hình tối thiểu và nén thành zip.  
Tên tệp zip hãy đặt là "(plugin_name).zip".  
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (các tệp PHP, tệp ảnh cần thiết khác, v.v.)


### Plugin mẫu
[Liên kết với cơ sở dữ liệu bên ngoài](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- Đây là mẫu liên kết với cơ sở dữ liệu bên ngoài khi lưu dữ liệu tùy chỉnh.  
- Khi thêm, cập nhật, xóa ở bảng thành phố của Exment, thay đổi được phản ánh vào bảng city của cơ sở dữ liệu bên ngoài.  
- Để chuẩn bị trước, hãy làm lần lượt các việc sau.
    1. Nhập [mẫu](https://exment.net/downloads/sample/template/city_template.zip) từ "Cài đặt quản trị" → "Mẫu" của Exment.  
    2. Tạo cơ sở dữ liệu bên ngoài. Plugin này dùng cơ sở dữ liệu mẫu "world" của MySQL. Hãy tải zip từ [trang chính thức](https://dev.mysql.com/doc/index-other.html), giải nén rồi chạy SQL đó trên môi trường MySQL (hoặc MariaDB) của bạn.
![Màn hình tải xuống của MySQL](../img/plugin/plugin_event1.png)  
    3. Tải [plugin](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity) lên từ "Cài đặt quản trị" → "Plugin" của Exment.  
    4. Mở màn hình cài đặt của plugin, nhập thông tin kết nối của cơ sở dữ liệu bên ngoài đã thiết lập ở bước 2 rồi lưu.    
![Màn hình cài đặt plugin](../img/plugin/plugin_event2.png)  
