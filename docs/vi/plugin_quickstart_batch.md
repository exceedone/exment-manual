# Plugin (batch)
Đây là plugin chạy xử lý riêng theo chu kỳ cố định, hoặc vào thời điểm quản trị viên chỉ định.
Nên dùng khi muốn thêm xử lý phải chạy mỗi ngày, v.v.


## Cách tạo
Chúng tôi giải thích các bước tạo, lấy ví dụ là batch "xóa vật lý các dữ liệu đang bị xóa logic".
Lưu ý: theo chuẩn của Exment, dữ liệu bị xóa trên màn hình là "xóa logic" và vẫn còn trong cơ sở dữ liệu.
Đây là batch xóa hoàn toàn (xóa vật lý) các dữ liệu đó.

### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "Xóa vật lý dữ liệu",
    "description": "Xóa hoàn toàn tất cả dữ liệu đang bị xóa logic.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : tên plugin. Hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid : chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : hãy nhập batch.  
- batch_hour (tùy chọn) : giờ chạy plugin mỗi ngày. Hãy nhập số nguyên từ 0 đến 23.
- batch_cron (tùy chọn) : dành cho người dùng nâng cao. Nhập thời điểm chạy plugin theo cú pháp cron. Có thể chỉ định linh hoạt thời điểm khởi động batch.

Lưu ý: batch_hour và batch_cron có thể đổi sau trên màn hình. Giá trị ghi trong config.json là giá trị ban đầu sau khi tải lên.


### Tạo tệp PHP
- Tạo tệp PHP như sau. Hãy đặt tên là "Plugin.php".

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
- namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Khi khớp với điều kiện của trigger đã đăng ký trên màn hình quản lý plugin, plugin được gọi và hàm execute trong Plugin.php được chạy.

- Class Plugin kế thừa class PluginBatchBase.  

### Nén thành zip
Nén thành zip với cấu hình tối thiểu là 2 tệp trên.  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### Tải lên
Tải plugin lên. Cách tải lên vui lòng xem [Plugin](/vi/plugin).

- Ngay sau khi tải lên, xử lý batch có cờ "Kích hoạt" ở trạng thái tắt và không tự động chạy. Để chạy, hãy chuyển cờ "Kích hoạt" ở [Plugin](/vi/plugin).
- **Ngoài cài đặt này, cần cài đặt lịch tác vụ**. Chi tiết vui lòng xem [Lịch tác vụ](/vi/additional_task_schedule).


### Cách khởi động batch
Có 3 cách khởi động batch đã tải lên như sau.

| Cách | Thời điểm chạy |
| ---- | ---- |
| Chỉ định "Thời gian chạy batch (giờ)" | Mỗi ngày, vào giờ đã chỉ định |
| Chỉ định "Cron chạy batch" | Thời điểm chỉ định theo cú pháp cron |
| Chạy bằng lệnh | Khi chạy lệnh (thủ công) |

#### Chỉ định "Thời gian chạy batch (giờ)"
Trên màn hình cài đặt plugin, nhập số từ 0 đến 23.
Mỗi ngày, plugin được chạy vào giờ đó. (Ví dụ: nếu đặt "5" thì plugin chạy lúc 5:00 mỗi ngày)
![Màn hình plugin](../img/plugin/plugin_batch1.png)  

#### Chỉ định "Cron chạy batch"
Dành cho người dùng nâng cao. Có thể nhập thời điểm chạy plugin theo cú pháp cron.
Lưu ý: nếu nhập cài đặt này, "Thời gian chạy batch (giờ)" ở trên sẽ không có hiệu lực.
![Màn hình plugin](../img/plugin/plugin_batch2.png)  

#### Chạy bằng lệnh
Cũng có thể chạy batch thủ công từ dòng lệnh vào lúc bạn muốn.
Hãy chạy một trong các lệnh sau.

~~~
# Chỉ định ID của plugin
php artisan exment:batch 1

# Chỉ định plugin_name (tên plugin)
php artisan exment:batch --name=harddelete_data

# Chỉ định uuid
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~


### Plugin mẫu
[Plugin xóa vật lý dữ liệu](https://github.com/exment-git/plugin-sample/tree/main/batch/HarddeleteBatch)  
- Batch xóa vật lý các dữ liệu đã bị xóa logic.  
  
[Liên kết cơ sở dữ liệu bên ngoài](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)  
- Batch nhập hàng loạt thông tin lưu trong cơ sở dữ liệu bên ngoài vào bảng của Exment.  
- Để chuẩn bị trước, hãy thực hiện các việc sau.
    1. Từ "Cài đặt quản trị" → "Mẫu" của Exment, nhập [mẫu](https://exment.net/downloads/sample/template/city_template.zip).  
    2. Tạo cơ sở dữ liệu bên ngoài. Plugin này dùng cơ sở dữ liệu mẫu "world" của MySQL. Hãy tải zip từ [trang chính thức](https://dev.mysql.com/doc/index-other.html), rồi chạy SQL đã giải nén trên môi trường MySQL (hoặc MariaDB) của bạn.
![Màn hình tải MySQL](../img/plugin/plugin_event1.png)  
    3. Từ "Cài đặt quản trị" → "Plugin" của Exment, tải [plugin](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch) lên.  
    4. Mở màn hình cài đặt plugin, nhập thông tin kết nối của cơ sở dữ liệu bên ngoài đã tạo ở bước 2 rồi lưu.  
![Màn hình cài đặt plugin](../img/plugin/plugin_event2.png)  
