## Plugin (chế độ xem)
Đây là plugin thêm vào màn hình danh sách dữ liệu tùy chỉnh một chế độ xem có thiết kế và chức năng riêng.
Hãy dùng khi bạn muốn có chức năng khác hẳn với các chế độ xem chuẩn (danh sách, tổng hợp, lịch).

![Ví dụ về plugin chế độ xem](../img/plugin/plugin_view1.png)   

## Mở đầu
Trang plugin của Exment được phát triển bằng 2 thứ sau.

- Framework PHP [Laravel](http://laravel.jp/)
- Thư viện màn hình quản trị [exment-admin-core](https://github.com/exceedone/exment-admin-core) (thư viện dựa trên laravel-admin / open-admin; từ v6.x trở về trước là laravel-admin)

Đặc biệt, chúng tôi khuyên người phát triển nên có kiến thức về Laravel.


## Chế độ xem tùy chỉnh: các đặc điểm chính
- Có thể hiển thị chức năng và màn hình riêng trên màn hình danh sách dữ liệu tùy chỉnh.
- Người phát triển plugin có thể tự do thêm các mục cài đặt của chế độ xem. Các mục đã thêm có thể đặt cho từng chế độ xem trên màn hình cài đặt chế độ xem, giống như chế độ xem chuẩn.
- Có thể tạo nhiều chế độ xem, giống như chế độ xem chuẩn. Cùng một plugin nhưng mỗi chế độ xem có thể cài đặt khác nhau, ví dụ "chế độ xem A hiển thị tất cả dữ liệu", "chế độ xem B chỉ hiển thị dữ liệu có cờ hiệu lực là YES".


## Khác nhau giữa trang và chế độ xem
Để tạo màn hình riêng, ngoài plugin (chế độ xem) này còn có [plugin (trang)](/vi/plugin_quickstart_page).
Hai loại khác nhau chủ yếu ở các điểm sau.

#### Plugin (trang)
- Về cơ bản, tạo một trang hoàn toàn độc lập, không gắn với bảng cụ thể nào.
- Sau khi cài plugin, có thể truy cập ngay màn hình riêng của plugin.
- Vì không gắn với bảng cụ thể, nên cũng có thể tạo trang kết hợp nhiều bảng, hoặc trang hoàn toàn không liên quan đến dữ liệu tùy chỉnh của Exment.

#### Plugin (chế độ xem)
- Màn hình của plugin đã tạo được hiển thị trên màn hình danh sách của một bảng cụ thể.
- Giống như chế độ xem chuẩn (danh sách, tổng hợp, lịch), khi quản trị viên hoặc người dùng thêm chế độ xem thì màn hình riêng của plugin được hiển thị.
- Về cơ bản, hiển thị màn hình liên quan đến dữ liệu của bảng đã chọn. Cũng có thể tạo màn hình kết hợp nhiều bảng, hoặc màn hình hoàn toàn không liên quan đến dữ liệu tùy chỉnh của Exment.



## Cách tạo

### Ví dụ mẫu
Ở đây, chúng ta tạo trang sau làm ví dụ mẫu.
- Hiển thị một chế độ xem Kanban đơn giản, xếp các công việc theo từng danh mục.
- Cột ứng với "danh mục" có thể chọn trong cài đặt chế độ xem. Nhờ vậy, cùng một plugin dùng được cho nhiều bảng.


### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "Chế độ xem Kanban",
    "description": "Hiển thị chế độ xem Kanban.",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- plugin_name: hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type: hãy nhập view.  
- Trong route, định nghĩa danh sách các endpoint của URL sẽ chạy, HTTP method của chúng và method trong Controller.
Lưu ý: chế độ xem về cơ bản chỉ hiển thị màn hình danh sách, nên không cần cài đặt route. Chỉ định nghĩa khi gửi và nhận request không đồng bộ bằng ajax.

    - uri: uri để hiển thị trang. URL thực tế là "http(s)://(URL của Exment)/plugins/(URL của plugin)/(uri đã chỉ định)". "URL của plugin" là plugin_name viết theo kiểu snake case (nếu config.json có ghi "uri" thì là giá trị đó).  
    - method: HTTP method. Hãy nhập get, post, put hoặc delete.
    - function: method trong Controller sẽ được chạy
    - Ví dụ: khi plugin_name là "KanbanView", uri chỉ định trong config.json là "update" và method chỉ định là "post" thì là "http(s)://(URL của Exment)/plugins/kanban_view/update (method: POST)".

> Lưu ý: URL trên là của cài đặt chuẩn không có "/admin" (site cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài từ phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/plugins/kanban_view/update`). Chi tiết vui lòng xem [Thay đổi hoặc bỏ "admin" trong URL](/vi/additional_prefix).


### Tạo tệp Plugin

#### Tạo logic chính
Tạo tệp PHP như sau. Hãy đặt tên tệp là "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) Bỏ comment khi muốn thêm cài đặt riêng của plugin
    // protected $useCustomOption = true;

    /**
     * (2) Method khi hiển thị danh sách. Cố định là "grid"
     */
    public function grid()
    {
        $values = $this->values();
        // (6) Gọi view
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) Endpoint riêng của plugin này
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) Các tùy chọn hiển thị trên màn hình cài đặt chế độ xem
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        // Khi thêm cài đặt riêng
        $form->embeds('custom_options', 'Cài đặt chi tiết', function($form){
            $form->select('category', 'Cột danh mục')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('Hãy chọn cột danh mục. Cột này ứng với các bảng (board) của Kanban. Các cột tùy chỉnh có kiểu "Lựa chọn (giá trị cố định)" và "Lựa chọn (lưu giá trị và nhãn)" được hiển thị làm ứng viên.');
        });

        // Khi cài đặt bộ lọc (thu hẹp dữ liệu)
        static::setFilterFields($form, $this->custom_table);

        // Khi cài đặt sắp xếp
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) Các tùy chọn đặt trên màn hình chỉnh sửa plugin. Dùng chung cho mọi chế độ xem
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // Thêm vào nếu cần
        // $form->text('access_key', 'Access key')
        //     ->help('Hãy nhập access key của YouTube.');
    }

    
    // Từ đây là các xử lý cần cho chế độ xem Kanban ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // Lọc dữ liệu
        $this->custom_view->filterModel($query);

        // Sắp xếp dữ liệu
        $this->custom_view->sortModel($query);

        // Lấy giá trị
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)  
Ngoài ra, tên class là "Plugin" và kế thừa PluginViewBase.

- (2) Tên public method khi hiển thị màn hình danh sách cố định là "grid".

- (3) Khi tạo thêm endpoint khác, tên public method trong class phải là tên đã ghi ở function trong config.json.

- (4) Trong hàm "public function setViewOptionForm($form)", định nghĩa các mục hiển thị trên màn hình cài đặt chế độ xem.
Cài đặt này làm được cho từng chế độ xem, nên cùng một plugin nhưng mỗi chế độ xem có thể cài đặt khác nhau, ví dụ "chế độ xem A hiển thị tất cả dữ liệu", "chế độ xem B chỉ hiển thị dữ liệu có cờ hiệu lực là YES".
  
    Các mục gồm 2 loại: cài đặt riêng của plugin, và "điều kiện lọc", "cài đặt sắp xếp" có sẵn trong chức năng chuẩn của Exment.
    Lưu ý: giá trị đã đặt được lấy bằng hàm "$this->custom_view->getCustomOption('tên tham số')".
    Lưu ý: nếu muốn dùng cài đặt cột mà chế độ xem chuẩn của Exment đang dùng, hãy viết như sau.

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) Trong hàm "public function setCustomOptionForm(&$form)", định nghĩa các mục hiển thị trên màn hình cài đặt plugin.
Đây là cài đặt dùng chung cho mọi chế độ xem.

    Lưu ý: để dùng cài đặt tùy chỉnh, hãy thêm "protected $useCustomOption = true;".
    Lưu ý: giá trị đã đặt được lấy bằng hàm "$this->plugin->getCustomOption('tên tham số')".

- (6) Khi dùng view (tệp blade), hãy dùng hàm "$this->pluginView".

- (7) Để lấy endpoint của plugin, hãy dùng hàm "$this->getRouteUri('tên endpoint')".
Lưu ý: để lấy đường dẫn đầy đủ của URL, hãy dùng admin_url($this->getRouteUri('tên endpoint')).


#### (Tùy chọn) Về view
Khi tách phần hiển thị của màn hình (view) ra tệp khác, hãy lưu tệp blade trong thư mục "resources/views".

#### (Tùy chọn) Về css, js và các tệp tĩnh khác
- Tệp css đặt trong thư mục "public/css".  
- Tệp js đặt trong thư mục "public/js".  
- Các tệp khác (tệp ảnh, v.v.) đặt trong thư mục "public/assets".  
Lưu ý: trong ví dụ mẫu này, js và css để tạo chế độ xem Kanban đã được tạo sẵn.  


### Nén thành zip
Nén thành zip với cấu hình tối thiểu là 2 tệp trên.  
Tên tệp zip là "(plugin_name).zip".  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (các tệp PHP, tệp ảnh cần thiết khác, v.v.)

