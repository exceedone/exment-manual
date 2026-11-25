# Log
Trang này giải thích cách xem và cách thiết lập các bản ghi (log) mà Exment lưu lại.  
Khi muốn tra "ai, lúc nào, đã làm gì" thì xem nhật ký thao tác. Khi muốn tìm nguyên nhân của lỗi thì xem tệp log.

## Các loại log
Exment có 2 loại log.

| Loại | Nội dung | Nơi xem |
| --- | --- | --- |
| **Nhật ký thao tác** | Nội dung từng người dùng đã thao tác trên màn hình. | Màn hình của Exment (quản trị viên hệ thống) |
| **Xuất tệp log** | Chủ yếu là bản ghi khi xảy ra lỗi. | Tệp trên máy chủ |


## Nhật ký thao tác
Nội dung từng người dùng đã thao tác trên màn hình được hiển thị thành danh sách trên màn hình của Exment.  
Các thao tác được ghi chủ yếu như sau.

- Hiển thị màn hình, thêm mới/cập nhật/xóa dữ liệu, v.v.
- Xác thực và thực thi API


### Cách xem
Màn hình nhật ký thao tác do quản trị viên hệ thống mở. Có 2 cách mở.

- Nhập URL sau.  
http(s)://(URL của Exment)/auth/logs    

> ※URL trên là của thiết lập chuẩn không có "/admin" (site mới cài từ v7.2.1). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài bằng phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/auth/logs`). Chi tiết vui lòng xem [Đổi hoặc bỏ "admin" trong URL](/vi/additional_prefix).

- Hoặc thêm "Nhật ký thao tác" vào menu rồi mở từ đó.  
Với thiết lập mặc định, "Nhật ký thao tác" không hiển thị trong menu. Để thêm, hãy mở trang "Cài đặt quản trị" > "Menu" và chọn loại menu "Menu hệ thống". "Nhật ký thao tác" sẽ hiển thị ở mục đối tượng, hãy chọn rồi lưu.

Màn hình danh sách nhật ký thao tác được hiển thị.

![Màn hình dữ liệu](../img/logs/auth_logs1.png)  

Bấm vào một dòng thì chi tiết của thao tác đó được hiển thị.  

![Màn hình dữ liệu](../img/logs/auth_logs2.png)  

### Về từng mục

- ##### Tên người dùng  
Người dùng đã thao tác. ※Với thao tác khi chưa đăng nhập, mục này để trống.

- ##### Phương thức
Loại phương thức của HTTP request.

- ##### Đường dẫn
URI đích của HTTP request.  
※Query string của phương thức GET (phần sau dấu "?" của URL) không xuất hiện ở mục này. Nó xuất hiện ở "Dữ liệu nhập/Truy vấn".

- ##### Địa chỉ IP
Địa chỉ IP của thiết bị đã thao tác.

- ##### Dữ liệu nhập/Truy vấn
Query string của HTTP request, hoặc giá trị POST.  

- ##### Ngày giờ tạo
Ngày giờ đã thao tác.


### Khác
- Trong "Dữ liệu nhập/Truy vấn", giá trị của các mục sau là thông tin mật, nên được thay bằng chuỗi "***" (che) rồi mới lưu.
    - password
    - password_confirmation
    - current_password
    - _token
    - verify_code
    - access_token
    - refresh_token
    - system_line_channel_token
    - system_line_channel_secret

※Các mục trên luôn được che, không phụ thuộc thiết lập trong `config/exment.php` ở phần "Che thông tin mật" bên dưới.  
※"system_line_channel_token" và "system_line_channel_secret" được che từ v7.0.0.


### Che thông tin mật
※Thiết lập này dùng được từ Exment v7.0.0. Ở v6.x, chỉ các mục ghi ở phần "Khác" bên trên (trừ 2 mục của LINE) được che.

Nhật ký thao tác có thể ghi lại giá trị người dùng đã nhập, giá trị gửi từ API và giá trị nằm trong đường dẫn của URL.

Để thông tin mật như thông tin xác thực không bị lưu nguyên, khi ghi nhật ký thao tác Exment che (thay bằng "***") giá trị của các mục đã thiết lập và của đường dẫn URL.

Thiết lập che đổi được trong section `operation_log` của tệp sau.

`config/exment.php`

Dưới đây là giá trị mặc định của `operation_log` ghi trong `config/exment.php`. (Một phần comment đã được lược bỏ)

```php
'operation_log' => [
    // Tên các mục được che trên mọi màn hình
    'mask_columns' => [
        // SSO (OAuth / SAML)
        'oauth_client_id',
        'oauth_client_secret',
        'saml_sp_privatekey',
        // Cài đặt hệ thống (secret key của reCAPTCHA, mật khẩu SMTP)
        'recaptcha_secret_key',
        'system_mail_password',
        // API key của Meilisearch
        'meili_key',
        // Thông tin channel của LINE Messaging API
        'system_line_channel_token',
        'system_line_channel_secret',
        // Mật khẩu kết nối cơ sở dữ liệu của plugin
        'custom_password',
        // Thông tin xác thực của plugin (trang CRUD)
        'crud_auth_key',
        'crud_auth_password',
    ],

    // Tên các mục chỉ được che trên màn hình/API cụ thể
    'mask_columns_by_uri' => [
        // Màn hình cài đặt API
        'api_setting*' => ['id', 'secret', 'client_api_key'],
        // API lấy token của OAuth
        'oauth/*' => ['client_id', 'api_key', 'client_secret'],
        // Màn hình đặt lại mật khẩu
        'auth/reset*' => ['token'],
    ],

    // Các tiền tố URI mà path segment ngay sau đó được che
    'mask_path_prefixes' => [
        'api_setting' => true,
        'oauth/clients' => true,
        // Token đặt lại mật khẩu. Đừng xóa hoặc đổi thành true
        'auth/reset' => false,
    ],
],
```

<span class="red">※Nếu ghi `operation_log` trong `config/exment.php`, nội dung đó không được gộp với giá trị mặc định của Exment, mà thay thế toàn bộ giá trị mặc định.</span>  
Khi thêm hoặc đổi đối tượng che, hãy ghi đầy đủ các giá trị mặc định ở trên rồi mới thêm hoặc đổi mục.  
Đặc biệt, đừng xóa `'auth/reset' => false` của `mask_path_prefixes`. Nếu xóa, token đặt lại mật khẩu sẽ được ghi mà không che.

#### mask_columns

- Chỉ định tên các mục luôn được che, ở bất kỳ màn hình hay API nào.
- Hãy dùng cho các giá trị luôn được coi là thông tin mật, như API key, client secret.
- Nếu tên mục chỉ định ở đây cũng đang được dùng làm mục dữ liệu nghiệp vụ thông thường của bảng tùy chỉnh, giá trị đó cũng bị che.

#### mask_columns_by_uri

- Chỉ định tên các mục chỉ được che ở màn hình hoặc API cụ thể.
- Key của mảng là mẫu URI tương đối tính từ tiền tố `admin`. Dùng được ký tự đại diện `*`.
- Hãy dùng cho các tên mục mà ở màn hình khác có thể được dùng làm dữ liệu nghiệp vụ thông thường, như `id`, `secret`, `client_id`, `api_key`, `token`.
- Mục khớp sẽ được che toàn bộ, kể cả bên trong các giá trị lồng nhau.

#### mask_path_prefixes

- Dùng khi thông tin mật nằm trong đường dẫn của URL. Khi chỉ định tiền tố URI tương đối tính từ tiền tố `admin`, path segment ngay sau đó (phần tiếp theo, phân cách bằng "/") được che.
- Giá trị của mảng chỉ định cách che.
    - `true`: nếu giá trị dài từ 13 ký tự trở lên, chỉ giữ 8 ký tự đầu, phần sau được thay bằng `***`. Nếu từ 12 ký tự trở xuống, toàn bộ giá trị được thay bằng `***`. Dùng cho ID bản ghi cần theo dõi, v.v.
    - `false`: toàn bộ giá trị được thay bằng `***`. Dùng cho các giá trị cần giấu hoàn toàn, như token đặt lại mật khẩu.
- Ví dụ, khi đặt `auth/reset` là `false`, toàn bộ token đặt lại mật khẩu nằm trong URL được thay bằng `***`.

#### Lưu ý

- Việc che được áp dụng cho nhật ký thao tác được tạo mới.
- <span class="red">Nhật ký thao tác đã có không được tự động che khi nâng cấp Exment.</span> Để áp dụng thiết lập hiện tại cho cả nhật ký thao tác đã có, hãy sao lưu cơ sở dữ liệu rồi chạy lệnh sau. Giá trị đã che không khôi phục lại được.

```
php artisan exment:patchdata patch_log_opelation
```

※"opelation" trong tên lệnh không phải là viết nhầm. Hãy nhập đúng như trên.
- `config/exment.php` không bị ghi đè khi nâng cấp Exment (`php artisan exment:update`). Vì vậy, dù phiên bản mới có thêm đối tượng che mặc định, môi trường đã ghi `operation_log` sẽ không được phản ánh. Khi nâng cấp, hãy so thiết lập `operation_log` với giá trị mặc định ở trên và tự thêm các đối tượng che còn thiếu.
- Với giá trị luôn là thông tin mật, hãy dùng `mask_columns`. Với giá trị chỉ là thông tin mật ở màn hình hoặc API cụ thể, hãy dùng `mask_columns_by_uri` hoặc `mask_path_prefixes` (để không che nhầm dữ liệu nghiệp vụ thông thường).


### Tự động xóa nhật ký thao tác
Ở phần dưới của màn hình nhật ký thao tác, bạn thiết lập được việc tự động xóa nhật ký thao tác cũ.

![Thiết lập tự động xóa nhật ký thao tác](../img/logs/auth_logs3.png)  

#### Bật tự động xóa
- Bật hoặc tắt việc tự động xóa nhật ký thao tác.
- Khi bật, log cũ hơn thời gian lưu được tự động xóa.
- Khi tắt, log không được tự động xóa.
- Giá trị mặc định là "NO".


#### Thời gian lưu nhật ký (ngày)
- Chỉ định số ngày lưu nhật ký thao tác.
- Log cũ hơn số ngày đã chỉ định được tự động xóa.
- Hãy nhập giá trị từ 1 trở lên.
- Thiết lập này chỉ hiển thị khi "Tự động xóa nhật ký thao tác" là YES.
- Giá trị mặc định là "180".


#### Thứ thực hiện
- Chỉ định thứ trong tuần để chạy tự động xóa.
- Nếu không chọn, chạy bất kể thứ nào.
- Placeholder là "Tất cả".


#### Tháng thực hiện
- Chỉ định tháng để chạy tự động xóa.
- Nếu không chọn, chạy bất kể tháng nào.
- Placeholder là "Tất cả".


#### Ngày thực hiện
- Chỉ định ngày để chạy tự động xóa.
- Nếu không chọn, chạy bất kể ngày nào.
- Nếu chỉ định cả thứ thực hiện và ngày thực hiện, chạy vào ngày giờ thỏa mãn cả hai điều kiện.
- Placeholder là "Tất cả".


#### Giờ thực hiện
- Chỉ định giờ để chạy tự động xóa.
- Nếu không chọn, chạy bất kể giờ nào.
- Placeholder là "Tất cả".


#### Phút thực hiện
- Chỉ định phút để chạy tự động xóa.
- Nếu không chọn, chạy bất kể phút nào.
- Placeholder là "Tất cả".


#### Để tắt tự động xóa
1. Đặt "Tự động xóa nhật ký thao tác" thành "NO".
2. Bấm "Lưu".

Sau khi lưu, tự động xóa bị tắt.


### Xóa dữ liệu cũ của nhật ký thao tác
Cũng có thể xóa nhật ký thao tác đã cũ bằng plugin (batch).  
Plugin xóa vật lý các nhật ký thao tác cũ hơn một số ngày nhất định (mặc định là 14 ngày), không khôi phục lại được.  
Hãy cài plugin (batch) từ liên kết sau.  
[Plugin - Nhật ký thao tác: xóa log cũ](https://github.com/exment-git/plugin-sample/tree/main/batch/OperationLogDelete)




## Xuất tệp log  
Chủ yếu khi xảy ra lỗi, Exment ghi vào tệp log trên máy chủ.  
※Nếu làm các thiết lập ở "Thêm giá trị thiết lập" bên dưới, cũng xuất được nội dung ngoài lỗi.

### Cách xem
1. Trên máy chủ đã cài Exment, mở thư mục sau.  
(thư mục gốc của Exment)/storage/logs  

2. Xem tệp laravel.log.

### Thêm giá trị thiết lập
- Khi đổi [giá trị thiết lập](/vi/config), các nội dung sau cũng xuất được ra tệp log. Các bước thiết lập, vui lòng xem [giá trị thiết lập](/vi/config).

- ##### Xuất giá trị request
    - Khóa thiết lập : EXMENT_DEBUG_MODE_REQUEST
    - Mặc định : false
    - Vai trò : khi đặt true, giá trị request gửi tới Exment được ghi ra log.  

- ##### Xuất log SQL
    - Khóa thiết lập : EXMENT_DEBUG_MODE_SQL
    - Mặc định : false
    - Vai trò : khi đặt true, các câu SQL mà Exment đã chạy được ghi ra log.

- ##### Xuất log SQL - hiển thị hàm
    - Khóa thiết lập : EXMENT_DEBUG_MODE_SQLFUNCTION
    - Mặc định : false
    - Vai trò : khi "EXMENT_DEBUG_MODE_SQL" là true, nếu đặt cả mục này là true thì danh sách các hàm gọi được ghi ra log cùng với câu SQL.

### Khác
- Laravel (framework mà Exment dùng), ngoài việc xuất ra tệp log, còn có các chức năng như sau.
    - Xuất log ra nơi khác như Slack
    - Đổi định dạng của log
    - Đổi tệp xuất log mỗi ngày

- Hãy làm các thiết lập này theo [tài liệu về log của Laravel](https://readouble.com/laravel/12.x/ja/logging.html) (tiếng Nhật).
