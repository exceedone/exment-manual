## Plugin (trang CRUD)
Thêm trang CRUD riêng vào Exment.  
**Lưu ý: plugin (CRUD) có sẵn rất nhiều chức năng và hàm. Chi tiết vui lòng xem [Tài liệu tham khảo plugin](/vi/plugin_reference_crud).**  
Lưu ý: các class của thư viện màn hình quản trị được ghi theo namespace từ Exment v7.0.0 trở đi ("ExmentAdminCore\Admin"). Nếu bạn dùng v6.x trở về trước, hãy đọc thay bằng "Encore\Admin". Chi tiết vui lòng xem [tại đây](/update/v7_0_0).  

## CRUD là gì
CRUD là Create (tạo), Read (hiển thị), Update (cập nhật), Delete (xóa).
Plugin này chuyên dùng để làm màn hình "CRUD + List", tức là CRUD cộng thêm List (danh sách).

- Cấu trúc màn hình gần giống với danh sách, chi tiết, tạo mới, cập nhật, xóa của dữ liệu tùy chỉnh trong Exment. Chỉ cần phát triển ở mức tối thiểu.
- Có thể quản lý dữ liệu bên ngoài (ví dụ: hệ quản trị cơ sở dữ liệu khác, WordPress, danh sách SharePoint, cơ sở dữ liệu web của hãng khác, hệ thống kế toán, v.v.) trên màn hình của Exment mà không cần nhập vào Exment.
- Chỉ cần phát triển phần xử lý bên trong như lấy và thêm dữ liệu. Về cơ bản không cần phát triển phần UI, nên so với phát triển [plugin (trang)](/vi/plugin_quickstart_page), công sức phát triển giảm đi rất nhiều.

![CRUD](../img/crud/crud1.png)  

## Những việc chính làm được
- Quản lý dữ liệu bên ngoài (ví dụ: hệ quản trị cơ sở dữ liệu khác, WordPress, danh sách SharePoint, cơ sở dữ liệu web của hãng khác, hệ thống kế toán, v.v.) trên màn hình của Exment mà không cần nhập dữ liệu vào Exment
- Tự do kết hợp, lọc, sắp xếp nhiều bảng của Exment để hiển thị
- Kiểm soát việc có được chạy danh sách, hiển thị, tạo mới, chỉnh sửa, xóa dữ liệu hay không, tùy theo chức năng và quyền
- Danh sách dữ liệu hỗ trợ cả hai kiểu, tùy theo dịch vụ bên ngoài: "hiển thị tất cả dữ liệu trong một danh sách" và "phân trang theo 20, 50, 100 dòng"
- Hỗ trợ nhiều endpoint. Trong 1 plugin, có thể cài đặt nhiều endpoint và hiển thị CRUD ở từng endpoint
- Có thể cài đặt xác thực. Hỗ trợ "khóa", "ID và mật khẩu" hoặc "xác thực OAuth". Có thể kiểm soát để chỉ khi có các giá trị cài đặt này và đã được xác thực thì mới truy cập được trang CRUD

## Cách tạo (mức tối thiểu)
Ở đây, chúng tôi giải thích các bước tạo, lấy ví dụ là màn hình "xem danh sách, hiển thị, tạo, cập nhật, xóa trên Exment đối với dữ liệu của cơ sở dữ liệu MySQL 'world', khác với cơ sở dữ liệu của Exment".

### Chuẩn bị trước
Trước tiên, hãy làm 2 việc sau.
- Tạo cơ sở dữ liệu bên ngoài. Plugin này dùng cơ sở dữ liệu mẫu "world" của MySQL. Hãy tải zip từ [trang chính thức](https://dev.mysql.com/doc/index-other.html), giải nén, rồi chạy SQL bên trong trên môi trường MySQL (hoặc MariaDB) của bạn.
![Màn hình tải MySQL](../img/plugin/plugin_event1.png)  

- Mở config/database.php và thêm đoạn sau vào connections.

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "Liên kết MySQL World",
    "description": "Liên kết cơ sở dữ liệu mẫu \"World\" của MySQL với Exment.",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- plugin_name: hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- uri: hãy nhập URI dùng để truy cập plugin này.
(nếu không chỉ định thì được tạo từ plugin_name)
- plugin_type: hãy nhập crud.  

### Tạo tệp Plugin
Tạo tệp PHP như sau. Hãy đặt tên tệp là "Plugin.php".  
**Lưu ý: ví dụ dưới đây là mức tối thiểu. Ngoài những gì ở dưới, plugin (CRUD) còn có sẵn rất nhiều chức năng và hàm. Chi tiết vui lòng xem [Tài liệu tham khảo plugin](/vi/plugin_reference_crud).**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2) Tiêu đề
     * content title
     *
     * @var string
     */
    protected $title = 'Các thành phố trên thế giới';

    /**
     * (3) Mô tả
     * content description
     *
     * @var string
     */
    protected $description = 'Hiển thị danh sách các thành phố trên thế giới.';

    /**
     * (4) Biểu tượng
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) Lấy định nghĩa cột
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Tên thành phố', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Mã quốc gia', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Dân số', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) Lấy danh sách dữ liệu (Paginate)
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // Khi có tìm kiếm theo từ khóa tự do
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) Lấy chi tiết dữ liệu (1 dòng dữ liệu)
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) Cài đặt form khi tạo mới và khi chỉnh sửa
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // Lấy danh sách quốc gia
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) Thực hiện tạo mới
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // Lưu vào cơ sở dữ liệu riêng.
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) Thực hiện chỉnh sửa
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // Lưu vào cơ sở dữ liệu riêng.
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) Xóa dữ liệu
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) namespace hãy đặt là **App\Plugins\\(tên plugin viết theo kiểu Pascal case)**. [Chi tiết xem tại đây](/vi/plugin_quickstart?id=namespace-của-tên-plugin)  
Ngoài ra, tên class là "Plugin" và kế thừa PluginCrudBase.

- (2) Thuộc tính title là tiêu đề hiển thị trên từng trang.

- (3) Thuộc tính description là mô tả hiển thị trên từng trang.

- (4) Thuộc tính icon là biểu tượng hiển thị trên từng trang.

- (5) Hàm getFieldDefinitions là hàm lấy định nghĩa cột dưới dạng mảng kết hợp.  
    - Nhất định phải thêm 1 khóa có "primary" => true. (Hiện chưa hỗ trợ khóa kết hợp)  
    - "key" là tên mục dùng cho việc lấy dữ liệu, name của từng phần tử HTML, v.v. Hãy nhập bằng chữ và số.
    - "label" dùng làm tên mục trên màn hình danh sách, v.v.
    - "grid" đặt cho mục hiển thị trên màn hình danh sách. Hãy nhập thứ tự hiển thị bằng số nguyên.
    - "show" đặt cho mục hiển thị trên màn hình chi tiết. Hãy nhập thứ tự hiển thị bằng số nguyên.
    - "create" đặt cho mục hiển thị trên màn hình tạo mới. Hãy nhập thứ tự hiển thị bằng số nguyên.
    - "edit" đặt cho mục hiển thị trên màn hình chỉnh sửa. Hãy nhập thứ tự hiển thị bằng số nguyên.

- (6) Hàm getPaginate là hàm lấy danh sách dữ liệu theo dạng phân trang.  
Hãy trả về dữ liệu đã lấy theo dạng LengthAwarePaginator.
Mỗi phần tử của danh sách là một mảng kết hợp, có khóa giống với khóa đã đặt trong getFieldDefinitions.
Lưu ý: khi tìm kiếm trên màn hình, giá trị được đặt vào tham số $options. Chi tiết vui lòng xem [Tài liệu tham khảo plugin](/vi/plugin_reference_crud).

- (7) Hàm getData lấy chi tiết dữ liệu (1 dòng dữ liệu).  
Dữ liệu là một mảng kết hợp, có khóa giống với khóa đã đặt trong getFieldDefinitions.

- (8) Hàm setForm cài đặt form khi tạo mới và khi chỉnh sửa.  
Hãy viết hàm này khi muốn form có hình dạng tùy ý.
Lưu ý: nếu không viết hàm này, các mục đã đặt "create" hoặc "edit" trong hàm getFieldDefinitions được hiển thị trên màn hình.

- (9) Hàm postCreate được gọi khi lưu trên màn hình tạo mới. Hãy đăng ký dữ liệu mới ở đây.

- (10) Hàm putEdit được gọi khi lưu trên màn hình chỉnh sửa. Hãy cập nhật dữ liệu ở đây.

- (11) Hàm delete được gọi khi xóa trên màn hình. Hãy xóa dữ liệu ở đây.
Lưu ý: tùy màn hình, tham số $id có thể là một mảng.


### Nén thành zip
Nén thành zip với cấu hình tối thiểu là 2 tệp trên.  
Tên tệp zip là "(plugin_name).zip".  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## Plugin mẫu
Lưu ý: các plugin mẫu dưới đây hỗ trợ Exment v7.0.0 trở đi và dùng namespace "ExmentAdminCore\Admin".  
Nếu bạn dùng v6.x trở về trước, hãy thay "ExmentAdminCore\Admin" trong "Plugin.php" bằng "Encore\Admin" rồi dùng. Chi tiết vui lòng xem [tại đây](/update/v7_0_0).

Có sẵn các ví dụ mẫu sau.

| Tên | Tóm tắt | Xác thực | Liên kết mẫu |
| ---- | ---- | ---- | ---- |
| MySQLWorld | Kết nối với cơ sở dữ liệu khác với Exment và thực hiện lấy, thêm, chỉnh sửa, xóa dữ liệu. | - | [Liên kết với MySQL khác](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | Ví dụ mẫu dùng SQL riêng để xem danh sách và tham chiếu cùng lúc các mục của 3 tầng. | - | [Hiển thị dữ liệu Exment bằng SQL riêng](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | Dùng REST API để hiển thị danh sách và chi tiết các bài viết của site Wordpress đã chỉ định. | - | [Liên kết WordPress](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | Dùng REST API để hiển thị danh sách và chi tiết các bài viết của nhiều site Wordpress. Hỗ trợ nhiều endpoint, chuyển site đích bằng nút trên màn hình. | - | [Liên kết WordPress nhiều site](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | Dùng REST API để hiển thị danh sách và chi tiết các bài viết của site Wordpress đã chỉ định. Ngoài ra, dùng access key đã cài đặt trước để thêm, chỉnh sửa, xóa bài viết. | ID và mật khẩu | [Bài viết WordPress](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | Liên kết bằng REST API với Exment trên máy chủ khác và lấy dữ liệu. | OAuth | [Liên kết REST API với Exment khác](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |