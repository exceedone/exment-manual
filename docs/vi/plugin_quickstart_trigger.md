# Plugin (trigger)

> Từ v3.2.0, "Plugin (trigger)" không còn được khuyến nghị.  
Khi tạo mới từ bây giờ, hãy tạo bằng [Plugin (nút)](/vi/plugin_quickstart_button) hoặc [Plugin (sự kiện)](/vi/plugin_quickstart_event).  


Plugin (trigger) là plugin chạy khi thực hiện một thao tác nhất định trên màn hình Exment. Plugin này có thể làm các xử lý như cập nhật giá trị.  
Ngoài ra, cũng có thể thêm nút vào màn hình danh sách hoặc màn hình biểu mẫu và thực hiện xử lý khi bấm nút.  
Trang này giải thích các loại trigger và cách tạo (tạo config.json và Plugin.php, rồi gom thành zip).  


## Các loại trigger

| Tên | Loại | Giải thích |
| ---- | ---- | ---- |
| saving | Ngay trước khi lưu | Xử lý được khởi động ngay trước khi lưu dữ liệu. |
| saved | Sau khi lưu | Xử lý được khởi động sau khi lưu dữ liệu. |
| grid_menubutton | Nút menu trên màn hình danh sách | Thêm nút ở phía trên màn hình danh sách dữ liệu và phát sinh sự kiện khi bấm. |
| form_menubutton_show | Nút menu trên màn hình chi tiết dữ liệu | Thêm nút ở phía trên màn hình chi tiết dữ liệu và phát sinh sự kiện khi bấm. |
| form_menubutton_create | Nút menu trên màn hình tạo mới dữ liệu | Thêm nút ở phía trên màn hình tạo mới dữ liệu và phát sinh sự kiện khi bấm. |
| form_menubutton_edit | Nút menu trên màn hình cập nhật dữ liệu | Thêm nút ở phía trên màn hình cập nhật dữ liệu và phát sinh sự kiện khi bấm. |
| workflow_action_executing | Ngay trước khi thực hiện quy trình làm việc | Xử lý được khởi động ngay trước khi thực hiện quy trình làm việc. |
| workflow_action_executed | Sau khi thực hiện quy trình làm việc | Xử lý được khởi động sau khi thực hiện quy trình làm việc. |
| notify_executing | Ngay trước khi thực hiện thông báo | Xử lý được khởi động ngay trước khi thực hiện thông báo. |
| notify_executed | Sau khi thực hiện thông báo | Xử lý được khởi động sau khi thực hiện thông báo. |

## Cách tạo

### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "Đây là bài thử tải plugin lên.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- plugin_name hãy ghi bằng chữ và số nửa cỡ (half-width).
- uuid là chuỗi gồm 32 ký tự + dấu gạch nối, tổng cộng 36 ký tự. Chuỗi này dùng để phân biệt duy nhất plugin.  
Hãy tạo bằng URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type hãy ghi là trigger.  
- Nếu muốn chỉ định event_triggers ngay từ đầu, hãy ghi các "Tên" ở "Các loại trigger" ở trên, cách nhau bằng dấu phẩy.
- Nếu muốn chỉ định target_tables ngay từ đầu, hãy ghi tên bảng của các bảng tùy chỉnh, cách nhau bằng dấu phẩy.


### Tạo tệp PHP
- Tạo tệp PHP như sau. Hãy đặt tên là "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- namespace hãy đặt là **App\Plugins\\(tên plugin viết theo Pascal case)** . [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Khi khớp với điều kiện của trigger đã đăng ký ở màn hình quản lý plugin, plugin được gọi và hàm execute trong Plugin.php được thực thi.  

- Class Plugin kế thừa class PluginTriggerBase.  
PluginTriggerBase có các thuộc tính như bảng tùy chỉnh gọi tới $custom_table, giá trị của bảng $custom_value.  
Tại thời điểm hàm execute được gọi, các thuộc tính này đã có giá trị.  
Nội dung chi tiết của các thuộc tính, vui lòng tham khảo [Tài liệu tham chiếu plugin](/vi/plugin_reference).  

### Nén thành zip
Lấy 2 tệp trên làm cấu trúc tối thiểu và nén thành zip.  
Tên tệp zip hãy đặt là "(plugin_name).zip".  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (Các tệp PHP, tệp ảnh cần thiết khác, v.v.)


### Plugin mẫu
Đang chuẩn bị...
