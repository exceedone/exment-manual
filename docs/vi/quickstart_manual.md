# Các bước cài đặt (cài đặt thủ công)
Đây là các bước cài Exment thủ công, chạy từng lệnh một.  
※ Trang này là các bước cài đặt cho Exment v7.0.0 trở đi. Với Exment v6.x trở về trước (Laravel10.X, thư viện màn hình quản trị là laravel-admin), phiên bản Laravel, các package cần cài, v.v. khác với trang này. Về khác biệt giữa v6.x và v7.0.0, vui lòng xem [Các bước cập nhật v7.0.0](/update/v7_0_0).  

## Trình tự cài đặt
1. **Chuẩn bị máy chủ** (máy chủ Web và cơ sở dữ liệu)
2. **Tạo dự án Laravel**
3. **Sửa `.env`** (cơ sở dữ liệu, ngôn ngữ, múi giờ, v.v.)
4. **Cài Exment**
5. **Chạy lệnh**
6. **Thiết lập ban đầu**

<span class="red bold">Việc sửa `.env` ở mục 3 nhất định phải làm trước mục 4.</span>

## Lưu ý
- Nếu xảy ra lỗi khi cài đặt, vui lòng tham khảo [Xử lý sự cố](/vi/troubleshooting).
- ※ Rất xin lỗi, hiện tại chúng tôi không nhận các câu hỏi riêng về các bước cài đặt và việc xây dựng máy chủ. Nếu muốn được hỗ trợ riêng, vui lòng dùng dịch vụ hỗ trợ có phí.

## Xây dựng máy chủ
Nếu chưa tạo máy chủ, hãy chuẩn bị máy chủ Web và máy chủ cơ sở dữ liệu.  
Cách tạo vui lòng xem [tại đây](/vi/server).


## Thiết lập ứng dụng Exment
Khi máy chủ đã sẵn sàng, hãy thiết lập ứng dụng Exment.

### Cài đặt Laravel (tạo dự án)
- Chạy lệnh sau trên dòng lệnh.  
※ Thư mục của dự án vừa tạo được gọi là "thư mục gốc" trong tài liệu này.  
※ Hiện tại Exment chỉ hỗ trợ Laravel phiên bản 12.X. Vui lòng không cài đặt bằng phiên bản khác.  

~~~
composer create-project "laravel/laravel=12.*" (tên dự án)
cd (tên dự án)
~~~


### Sửa .env

Mở ".env" rồi thêm, sửa các nội dung dưới đây.

- <span class="red bold">Hãy sửa .env trước bước "Cài đặt Exment" tiếp theo.</span> Trong thiết lập ban đầu của Laravel12, cơ sở dữ liệu là "sqlite". Nếu cài Exment trước khi sửa, lỗi sẽ hiển thị.
- <span class="red bold">Đặc biệt, hãy kiểm tra các giá trị sau.</span>

| Mục | Giải thích |
|---|---|
| DB_CONNECTION | Giá trị khác nhau tùy theo cơ sở dữ liệu bạn dùng là MySQL, MariaDB hay SQL Server |
| APP_TIMEZONE, APP_LOCALE | Ngôn ngữ và múi giờ. Hãy nhập giá trị trước khi cài đặt |
| SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION | Thiết lập session, cache và hàng đợi. Hãy đổi thành các giá trị ở dưới (lý do xem ngay bên dưới) |

- Trong Laravel12, giá trị ban đầu của session, cache và hàng đợi là "database". Nếu để nguyên, lỗi sẽ xuất hiện khi mở màn hình trước lúc cài đặt. Ngoài ra, các thông báo như gửi email sẽ nằm lại trong hàng đợi và không được thực hiện.
- Để hoạt động giống v6.x trở về trước (Laravel10), hãy đổi thành các giá trị ở dưới. Nếu dùng hàng đợi, vui lòng tham khảo [Thực thi trễ xử lý thông báo](/vi/additional_queue).

~~~
# Dưới đây là các mục thiết lập bắt buộc --------------------
#Thiết lập cơ bản
APP_URL=http://XXXX.com #URL để truy cập site đó. Không cần "admin"

# Đổi giá trị thiết lập cơ sở dữ liệu
# Với MySQL, dùng giá trị sau (giá trị mặc định)
DB_CONNECTION=mysql
# Với MariaDB, sửa thành giá trị sau
DB_CONNECTION=mariadb
# Với SQL Server, sửa thành giá trị sau
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #Tên máy chủ của cơ sở dữ liệu
DB_PORT=3306 #Số cổng của cơ sở dữ liệu
DB_DATABASE=homestead #Tên cơ sở dữ liệu dùng cho Exment
DB_USERNAME=homestead #Tên người dùng của cơ sở dữ liệu dùng cho Exment
DB_PASSWORD=secret #Mật khẩu của cơ sở dữ liệu dùng cho Exment

# Thiết lập tiếng Nhật và giờ Nhật Bản. Sao chép và dán để thiết lập
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# Thiết lập session, cache và hàng đợi. Đổi từ giá trị ban đầu của Laravel12 (database)
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# Dưới đây là các mục thiết lập tùy chọn --------------------

# Thêm khi dùng kết nối https
ADMIN_HTTPS=true

# Chi phí tính toán (số vòng) của việc băm mật khẩu (bcrypt). Là thiết lập tùy chọn, giá trị mặc định là 12.
# OWASP khuyến nghị từ 10 trở lên. Chỉ thiết lập khi muốn đổi giá trị mặc định.
# Mật khẩu đã băm với chi phí khác sẽ được tự động băm lại khi người dùng đăng nhập lần tới.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Cài đặt Exment
- Chạy lệnh sau trong thư mục gốc.  
※ Thư viện màn hình quản trị "exceedone/exment-admin-core" được cài tự động như một thư viện phụ thuộc của Exment. Không cần cài riêng.

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# Nếu muốn chỉ định phiên bản Exment, hãy chạy lệnh sau thay thế. Ví dụ: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### Chạy lệnh
- Chạy các lệnh sau.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## Hoàn tất thiết lập
Khi cài đặt xong, hãy tiếp tục làm [thiết lập ban đầu](/vi/first_setting).  


## Các thiết lập bổ sung khác
Với các việc đã làm đến đây, bạn có thể bắt đầu dùng Exment. Tuy nhiên, để dùng một số chức năng, có thể cần thiết lập bổ sung.  
Vui lòng xem liên kết sau.  
- [Thiết lập bổ sung](/vi/quickstart_more)



[←Quay lại Cài đặt - Tổng quan](/vi/quickstart)
