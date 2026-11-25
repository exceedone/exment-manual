# Plugin (Nút)
Thêm nút vào màn hình danh sách hoặc màn hình biểu mẫu của Exment, và xử lý khi nút được bấm.  
Trang này giải thích cách làm plugin (Nút) bằng 3 ví dụ (nút thông thường, nút riêng, tải tệp xuống).  

![Ví dụ cài đặt nút](../img/plugin/plugin_button1.png)   

## Các loại nút

- ##### Nút thông thường
Nút được tạo theo nhãn, màu, biểu tượng, v.v. đã lưu trong cài đặt plugin, rồi được đặt lên màn hình.  
Bạn cài đặt xử lý sau khi nút được bấm.

- ##### Nút riêng (từ v3.4.1)
Hiển thị được nút theo dạng riêng.  
Bạn cài đặt xử lý khi hiển thị nút.


## Điều kiện hiển thị nút

| Tên | Loại | Mô tả |
| ---- | ---- | ---- |
| grid_menubutton | Nút menu trên màn hình danh sách | Thêm nút ở phía trên màn hình danh sách dữ liệu, và phát sinh sự kiện khi bấm. |
| form_menubutton_show | Nút menu trên màn hình chi tiết dữ liệu | Thêm nút ở phía trên màn hình chi tiết dữ liệu, và phát sinh sự kiện khi bấm. |
| form_menubutton_create | Nút menu trên biểu mẫu (khi tạo mới) | Thêm nút ở phía trên màn hình tạo mới dữ liệu, và phát sinh sự kiện khi bấm. |
| form_menubutton_edit | Nút menu trên biểu mẫu (khi cập nhật) | Thêm nút ở phía trên màn hình cập nhật dữ liệu, và phát sinh sự kiện khi bấm. |

## Cách tạo

### Tạo config.json
- Tạo tệp config.json sau.  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "Thử chạy nút plugin.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- plugin_name hãy ghi bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi 32 ký tự cộng dấu gạch nối, tổng cộng 36 ký tự. Dùng để plugin là duy nhất.  
Hãy tạo từ URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type hãy ghi là button.  
- Nếu chỉ định event_triggers (điều kiện hiển thị nút) ngay từ đầu, hãy nhập các tên ở "Điều kiện hiển thị nút", cách nhau bằng dấu phẩy.
- Nếu chỉ định target_tables ngay từ đầu, hãy nhập tên bảng của bảng tùy chỉnh, cách nhau bằng dấu phẩy.


### Tạo tệp PHP
- Tạo tệp PHP như sau. Tên tệp là "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // Chi tiết chuyển màn hình theo giá trị trả về ----------------------------------------------------
        // true : hiển thị thông báo đã chạy xong ở góc trên bên phải màn hình, rồi tải lại màn hình đó
        return true;

        // true : hiển thị thông báo riêng, như "○○ đã hoàn tất bình thường! Sau đây hãy làm xử lý ××"
        // return [
        //     'result' => true,
        //     'swaltext' => '○○ đã hoàn tất bình thường! Sau đây hãy làm xử lý ××',
        // ];

        // true : hiển thị thông báo đã chạy xong, rồi chuyển hướng sang trang khác
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : hiển thị thông báo lỗi riêng, như "Đã xảy ra lỗi ○○"
        // return [
        //     'result' => false,
        //     'swaltext' => 'Đã xảy ra lỗi ○○',
        // ];


        // (từ v3.4.1) Khi được gọi từ "Nút menu trên màn hình danh sách" ---------
        // Danh sách đối tượng CustomValue của các dữ liệu đã đánh dấu trên màn hình danh sách. Kiểu \Illuminate\Support\Collection
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (từ v3.4.3) Xét có hiển thị nút trên màn hình hay không. Mặc định là true
    * 
    * @return bool true: hiển thị, false: không hiển thị
    */
    public function enableRender(){
        // Ví dụ 1: hiển thị nút khi id của dữ liệu đang chọn là 2
        //return $this->custom_value->id % 2 === 0;

        // Hiển thị nút khi giá trị "status" của cột tùy chỉnh là "active"
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- Namespace là **App\Plugins\\(tên plugin viết theo PascalCase)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

- Khi khớp điều kiện trigger đã đăng ký trên màn hình quản lý plugin, plugin được gọi và hàm execute trong Plugin.php được chạy.  

- Class Plugin kế thừa class PluginButtonBase.  
PluginButtonBase có các thuộc tính như bảng tùy chỉnh gọi tới $custom_table, giá trị của bảng $custom_value,  
và tại thời điểm hàm execute được gọi, các thuộc tính đó đã được gán giá trị.  
Chi tiết về các thuộc tính, vui lòng xem [Plugin reference](/vi/plugin_reference).  

- (từ v3.4.3) Nếu muốn dùng dữ liệu đã đăng ký để điều khiển việc hiện/ẩn nút, hãy cài đặt phương thức "enableRender".  
Trả về true khi hiển thị nút, false khi muốn ẩn. (Mặc định là true.)


### Nén thành zip
Lấy 2 tệp trên làm cấu hình tối thiểu và nén thành zip.  
Tên tệp zip hãy đặt là "(plugin_name).zip".  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (các tệp PHP, tệp ảnh cần thiết khác, v.v.)



## Cách tạo (hiển thị nút riêng)

> Chức năng này được hỗ trợ từ v3.4.1.

Hiển thị được nút theo dạng riêng. Hãy dùng cho các mục đích sau.  

- Hiển thị nhiều nút cạnh nhau.
- Hiển thị nút dạng dropdown.
- Chỉ hiển thị nút khi thỏa mãn điều kiện nhất định. Việc xét điều kiện dùng logic riêng.

Ở đây, ta phát triển mẫu "hiển thị nút 'Trước' và 'Sau' của dữ liệu trên màn hình chi tiết dữ liệu".


### Tạo config.json
Giống cách tạo thông thường.

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "Thử thêm nút plugin riêng.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### Tạo tệp PHP
- Tạo tệp PHP như sau. Tên tệp là "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * Xử lý thêm nút riêng, thay cho cách hiển thị nút mặc định
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: "sau", false: "trước"
        $keys = [true, false];
        foreach($keys as $key){
            // Lấy giá trị trước/sau
            $value = $this->getNextOrPrevId($key);
            
            // Nếu có giá trị thì thêm nút
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // Vẽ nút bằng button.blade.php
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * Lấy dữ liệu sau hoặc trước
     *
     * @param boolean $isNext true: dữ liệu sau, false: dữ liệu trước
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- Các quy tắc cơ bản như tên namespace, việc kế thừa của class Plugin, cách đặt tên giống như khi tạo nút thông thường.

- Khi khớp điều kiện trigger đã đăng ký trên màn hình quản lý plugin, plugin được gọi và phương thức "render()" trong Plugin.php được gọi.

- Trong phương thức render(), hiển thị view nằm trong resources/views.

### Tạo tệp PHP (blade)

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### Nén thành zip
Giống nút thông thường, nén thành zip rồi tải lên.


### Plugin mẫu
[Hiển thị nút "Sau" và "Trước" (nút riêng)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)  





## Cách tạo (tải tệp xuống)

> Chức năng này được hỗ trợ từ v4.3.3.

Đây là mẫu tải tệp xuống bằng plugin.  

Ở đây, ta tải xuống ảnh người dùng được hiển thị khi người dùng không dùng avatar.


### Tạo config.json
Giống cách tạo thông thường.

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "Thử tải tệp xuống bằng plugin.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### Tạo tệp PHP
- Tạo tệp PHP như sau. Tên tệp là "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // Trả về chuỗi base64, Content-Type và tên tệp bằng mảng
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // Tùy chọn: hiển thị thông báo "Đã tải xuống xong"
            'swaltext' => 'Đã tải xuống xong',
        ];
    }
}
~~~

- Các quy tắc cơ bản như tên namespace, việc kế thừa của class Plugin, cách đặt tên giống như khi tạo nút thông thường.

- Ở giá trị trả về của hàm execute, trả về các giá trị sau bằng mảng.
    - fileBase64 : chuỗi base64 của tệp
    - fileContentType : Content-Type của tệp
    - fileName : tên tệp khi tải xuống

### Nén thành zip
Giống nút thông thường, nén thành zip rồi tải lên.


### Plugin mẫu
[Tải xuống ảnh người dùng ẩn danh](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)  

