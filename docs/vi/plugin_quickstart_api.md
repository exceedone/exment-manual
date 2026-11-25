## Plugin (API)
Đây là plugin thêm API mới vào Exment.
Hãy dùng khi muốn thêm chức năng không có trong [tài liệu tham khảo API](https://exment.net/reference/ja/webapi.html).

## Mở đầu
Plugin API của Exment được phát triển bằng framework PHP [Laravel](http://laravel.jp/).  
Khi phát triển API, chúng tôi đặc biệt khuyên người phát triển nên có kiến thức về Laravel.

## Cách tạo

### Ví dụ mẫu
Ở đây, chúng ta tạo API "lấy thông tin cột tùy chỉnh từ tên của cột tùy chỉnh" làm ví dụ mẫu.

- Plugin mẫu có [tại đây](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "API mẫu lấy thông tin cột tùy chỉnh từ tên cột.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- plugin_name: hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type: hãy nhập api.  
- uri: hãy nhập endpoint chung của plugin này. Sau đó có thể đặt lại trên màn hình quản lý plugin.
- Trong route, định nghĩa danh sách endpoint của từng xử lý, HTTP method và tên method trong Controller.
    - uri: uri để hiển thị trang. URL thực tế là "http(s)://(URL của Exment)/api/plugins/(endpoint chung của plugin)/(uri đã chỉ định)".  
    - method: HTTP method. Hãy nhập get, post, put hoặc delete.
    - function: tên method trong Controller sẽ được chạy.
    - Ví dụ: khi endpoint chung của plugin là "sampleapi", uri của từng xử lý là "column" và method là "get" thì là "http(s)://(URL của Exment)/api/plugins/sampleapi/column (method: GET)".

> Lưu ý: URL trên là của cài đặt chuẩn không có "/admin" (site cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài từ phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/api/plugins/sampleapi/column`). Chi tiết vui lòng xem [Thay đổi hoặc bỏ "admin" trong URL](/vi/additional_prefix).

### Tạo tệp Plugin

#### Tạo logic chính
Tạo tệp PHP như sau. Hãy đặt tên tệp là "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * Ví dụ mẫu lấy thông tin cột tùy chỉnh từ tên cột
     *
     * @return mixed
     */
    public function column()
    {
        // Kiểm tra các tham số của request (table và column đều bắt buộc)
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // Lấy tên bảng và tên cột từ tham số của request
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // Lấy thông tin bảng tùy chỉnh
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) Kiểm tra xem có quyền không
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // Lấy thông tin cột tùy chỉnh
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)

Ngoài ra, tên class là "Plugin" và kế thừa PluginApiBase.

- (2) Tên public method trong class là tên đã ghi ở function trong config.json.  

- (3) Khi gọi method hasPermission của thông tin bảng tùy chỉnh, có thể kiểm tra xem người dùng hiện tại có quyền với bảng đó không. Các quyền kiểm tra được như sau.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: quyền truy cập
    - AVAILABLE_VIEW_CUSTOM_VALUE: quyền xem
    - AVAILABLE_EDIT_CUSTOM_VALUE: quyền chỉnh sửa
    - AVAILABLE_ALL_CUSTOM_VALUE: quyền truy cập tất cả dữ liệu
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: quyền chỉnh sửa tất cả dữ liệu


### Nén thành zip
Nén thành zip với cấu hình tối thiểu là 2 tệp trên.  
Tên tệp zip là "(plugin_name).zip".  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (các tệp PHP cần thiết khác, v.v.)


### Truy cập
Truy cập API bằng URL sau.
http(s)://(URL của Exment)/api/plugins/(endpoint chung của plugin)/(uri của route)  

Ví dụ: khi endpoint chung của plugin là "sampleapi" và uri của route là "column"  
http(s)://(URL của Exment)/api/plugins/sampleapi/column


### Khác
- Để truy cập API tạo bằng plugin, cần đặt API scope là "plugin". (Hãy chỉ định khi lấy token.)

- Khi muốn chỉ định tham số trong URL, ví dụ để lấy dữ liệu có giá trị ID cụ thể, hãy thêm cách viết như dưới đây vào route → uri của config.json. Có thể chỉ định như "{id}" hoặc "{table}".

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * Ví dụ mẫu lấy thông tin cột tùy chỉnh từ tên cột
    * Lưu ý: tên bảng và tên cột được chỉ định trong URL
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // Lấy thông tin bảng tùy chỉnh
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // Kiểm tra xem có quyền không
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // Lấy thông tin cột tùy chỉnh
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### Plugin mẫu
[API mẫu](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  
