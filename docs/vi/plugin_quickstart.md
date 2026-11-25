# Cách tạo plugin
## Mở đầu
Đây là trang dành cho người phát triển plugin. Trang này tập hợp liên kết tới cách làm của từng loại plugin, cùng các quy ước và thiết lập đặc biệt chung cho mọi loại.  
Về chức năng của plugin và cách quản lý như tải lên, vui lòng xem [Plugin](/vi/plugin).  

Trình tự cơ bản như sau (chi tiết vui lòng xem trang của từng loại).

1. Tạo tệp thiết lập "config.json"
2. Tạo các tệp chương trình, như tệp PHP ("Plugin.php")
3. Nén thành zip rồi tải lên từ màn hình của Exment  

※Các class của thư viện màn hình quản trị được ghi bằng namespace của Exment v7.0.0 trở đi ("ExmentAdminCore\Admin").  
Nếu dùng v6.x trở về trước, hãy đọc thay thành "Encore\Admin". Chi tiết vui lòng xem [tại đây](/update/v7_0_0).

## Liên kết tới cách tạo
Hãy chọn loại plugin muốn làm.

- [Nút](/vi/plugin_quickstart_button)
- [Sự kiện](/vi/plugin_quickstart_event)
- [Trang](/vi/plugin_quickstart_page)
- [Bảng điều khiển](/vi/plugin_quickstart_dashboard)
- [Chế độ xem](/vi/plugin_quickstart_view)
- [Trang CRUD](/vi/plugin_quickstart_crud)
- [Batch](/vi/plugin_quickstart_batch)
- [API](/vi/plugin_quickstart_api)
- [Kiểm tra hợp lệ](/vi/plugin_quickstart_validate)
- [Script](/vi/plugin_quickstart_script)
- [Style](/vi/plugin_quickstart_style)
- [Nhập](/vi/plugin_quickstart_import)
- [Xuất](/vi/plugin_quickstart_export)
- [Tài liệu](/vi/plugin_quickstart_document)
- [Docurain (xuất PDF)](/vi/plugin_quickstart_docurain)
- [Trigger ※không khuyến nghị](/vi/plugin_quickstart_trigger)


## Namespace của tên plugin
Hãy đặt namespace của plugin theo quy tắc sau.
- Namespace là **App\Plugins\\(tên plugin viết theo PascalCase)**.
    - Ví dụ: tên plugin: testplugin → App\Plugins\\Testplugin
    - Ví dụ: tên plugin: customer_list → App\Plugins\\CustomerList
    - Ví dụ: tên plugin: get-user → App\Plugins\\GetUser


## Các cách thiết lập đặc biệt khác
Ngoài cách tạo cơ bản, đây là các thiết lập đặc biệt chỉ dùng khi cần.

- [Làm thiết lập riêng trên màn hình cài đặt plugin](/vi/plugin_quickstart?id=làm-thiết-lập-riêng-trên-màn-hình-cài-đặt-plugin)
- [Dùng một plugin cho nhiều loại plugin](/vi/plugin_quickstart?id=dùng-một-plugin-cho-nhiều-loại-plugin)
- [Kiểm tra thư viện bắt buộc khi cài](/vi/plugin_quickstart?id=kiểm-tra-thư-viện-bắt-buộc-khi-cài)
- [Cài mẫu (template) khi cài](/vi/plugin_quickstart?id=cài-mẫu-template-khi-cài)


### Làm thiết lập riêng trên màn hình cài đặt plugin

Dùng khi muốn thêm mục thiết lập riêng của plugin vào màn hình cài đặt của plugin.  
Ví dụ: thiết lập từ màn hình access key cần để chạy YouTube Data API    

![Trang](../img/plugin/plugin_page1.png)

- Viết tệp Plugin.php như sau.

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginXXXXBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) Tùy chọn thiết lập trên màn hình chỉnh sửa plugin
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'Access key')
            ->help('Hãy nhập access key của YouTube.');
    }
}
~~~

- (1) Thêm "protected $useCustomOption = true;".
- (2) Hàm "public function setCustomOptionForm(&$form)" là các mục hiển thị trên màn hình cài đặt của plugin.  
※Để dùng thiết lập tùy chỉnh, hãy thêm "protected $useCustomOption = true;".  
※Để lấy giá trị đã thiết lập, hãy dùng hàm "$this->plugin->getCustomOption('tên tham số')".

### Dùng một plugin cho nhiều loại plugin
Thông thường, một tệp plugin chỉ dùng được cho 1 loại plugin.  
Vì vậy, ví dụ khi muốn dùng cả loại "Trang" và "Bảng điều khiển", phải tạo 2 tệp plugin.  
Tuy nhiên, với cách viết sau, có thể gom nhiều loại plugin vào một tệp plugin.    

#### Sửa config.json
Sửa plugin_type trong config.json như sau.

~~~
// config.json (trích một phần)
"plugin_type": "dashboard,page"
~~~

Ghi nhiều giá trị plugin_type, cách nhau bằng dấu phẩy.


#### Sửa tệp php
※Nếu loại plugin là "Script" hoặc "Style" thì không cần xử lý này.  
  
- Tên tệp là "Plugin.php" khi có 1 loại, hãy đổi thành "Plugin(loại plugin, viết hoa chữ đầu).php".
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- Sửa một phần các tệp trên, cho tên class giống với tên tệp.

~~~ php
<?php

// Đổi tên class (với loại Sự kiện)
class PluginEvent extends PluginEventBase
{
~~~


#### (Tùy chọn) Tạo tệp php để thiết lập
- Nếu muốn làm thiết lập riêng đã ghi ở "[Làm thiết lập riêng trên màn hình cài đặt plugin](/vi/plugin_quickstart?id=làm-thiết-lập-riêng-trên-màn-hình-cài-đặt-plugin)", hãy tạo tệp "PluginSetting.php".  

~~~ php
// Tên tệp: PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// Tên class: PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', 'Văn bản')
            ->help('Hiển thị văn bản.');
    }
}
~~~


#### Nén thành zip
Lấy các tệp này làm cấu hình tối thiểu và nén thành zip.  
Tên tệp zip hãy đặt là "(plugin_name).zip".  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php (tùy chọn)
    - (các tệp PHP, tệp ảnh cần thiết khác, v.v.)

### Plugin mẫu
[Hiển thị cả trang và bảng điều khiển](https://exment.net/downloads/sample/plugin/PageMulti.zip)  



### Kiểm tra thư viện bắt buộc khi cài
Khi cài plugin, có thể kiểm tra xem các thư viện cần thiết đã có trên máy chủ chưa.  
Với plugin dựa trên thư viện cài bằng composer, v.v., kiểm tra trước sẽ tránh được lỗi khi chạy plugin.    

#### Đặc tả
- Ghi tên class của thư viện muốn kiểm tra (thứ cài bằng composer) vào config.json.  
Tên composer muốn người dùng cài khi class không tồn tại cũng ghi vào config.json.  

- Khi cài plugin, nếu class đó không tồn tại thì việc cài plugin bị lỗi.  
Khi đó, màn hình hiển thị tên composer muốn người dùng cài.


#### Sửa config.json
Thêm "requirement" vào config.json, và thêm các tùy chọn như sau.

~~~
// config.json (trích một phần)
"requirement": [
    {
        "class": "(tên class cần kiểm tra)",
        "composer": "(tên composer muốn người dùng cài khi class không tồn tại)"
    },
    {
        "class": "(tên class cần kiểm tra)",
        "composer": "(tên composer muốn người dùng cài khi class không tồn tại)"
    }
]
~~~

#### Ví dụ
Ở đây giả sử plugin dùng thư viện "[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)", thư viện lấy toàn bộ ngày lễ của Nhật Bản.

~~~
// config.json (trích một phần)
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

Với thiết lập này, nếu máy chủ không có class "\Yasumi\Yasumi" thì lỗi được hiển thị khi cài plugin.
![Trang](../ja/img/plugin/plugin_requirement.png)



### Cài mẫu (template) khi cài
Khi cài plugin, có thể cài luôn cả [mẫu](/vi/template).  
Không chỉ chức năng của plugin, mà cả các thiết lập bảng cần thiết cũng đưa vào được cùng lúc.    

#### Sửa config.json
Thêm "templates": true vào config.json.

~~~
// config.json (trích một phần)
"templates": true
~~~

#### Đặt tệp mẫu
1. Tạo thư mục "templates" trong thư mục plugin.

2. Xuất [mẫu](/vi/template).  

3. Giải nén tệp zip đã xuất và chuyển vào thư mục "templates" trong thư mục plugin đã tạo.

Như vậy, khi cài plugin, các tệp mẫu được cài tự động.

#### Bổ sung khác
- Dù xóa plugin đó, mẫu đã cài bằng chức năng này cũng không bị xóa.


### (Không khuyến nghị) Dùng tệp PHP không thuộc class
Thông thường, xử lý PHP được viết trong class, nhưng cũng có trường hợp chỉ viết hàm mà không dùng class.  
Ví dụ như nội dung sau.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

function testPluginGlobalFunction(){
    return true;
}
```

Từ phiên bản v4.1.0, việc nạp plugin dùng [spl_autoload_register](https://www.php.net/manual/ja/function.spl-autoload-register.php) (tiếng Nhật).  
Hàm này hỗ trợ class, trait, interface, nhưng có vẻ không hỗ trợ hàm không thuộc class.  
Vì vậy, cần cách viết khác với thông thường. Hãy làm như sau.  

#### Gọi require_once
Hãy chạy require_once trong constructor, hàm execute, v.v. của class gọi.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // require_once function.php ở cùng thư mục và function.php ở thư mục Dir1
        require_once dirname(__FILE__).'/function.php';
        require_once dirname(__FILE__).'/Dir1/function.php';

        // Chạy
        testPluginGlobalFunction();
        Dir1\testPluginGlobalFunctionDir1();
    }
}

```


#### Khuyến nghị: cài đặt hàm static để hàm thuộc về class
Ngoài ra, khi muốn gọi dạng static một hàm định nghĩa ở class khác, hãy cố gắng cài đặt nó thành hàm static của class.


``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

// Nơi định nghĩa hàm
class StaticFunction
{
    // Định nghĩa trong class dưới dạng hàm static
    public static function testPluginStaticFunction(){
        return true;
    }
}

```

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

// Nơi gọi hàm
class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // Gọi dưới dạng hàm static
        StaticFunction::testPluginStaticFunction();
        Dir1\StaticFunction::testPluginStaticFunctionDir1();
    }
}

```

