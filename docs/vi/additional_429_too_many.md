# Khi xảy ra lỗi 429 với API
Khi gọi API của Exment, có thể xảy ra lỗi 429 (429 Too Many Requests).  
Trang này giải thích lý do và cách thay đổi giới hạn số lần truy cập.

- Exment giới hạn số lần truy cập API ở mức tối đa 60 lần mỗi phút cho mỗi người dùng (nếu chưa xác thực thì theo từng địa chỉ IP).
- Khi vượt quá giới hạn, sẽ xảy ra lỗi 429 Too Many Requests.
- Lý do là framework mà Exment sử dụng (Laravel) giới hạn số lượng lớn request.

### Các bước thiết lập 
**(1)** Mở tệp ".env" trong thư mục của dự án.

**(2)** Ghi giới hạn số lần truy cập mỗi phút vào "EXMENT_API_MAX_RATE_LIMIT". Giá trị mặc định là 60.  
※Nếu đã có khóa cùng tên, hãy sửa giá trị của khóa đó.

Ví dụ: cho phép tối đa 120 lần mỗi phút

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** Nếu đang dùng cache của cấu hình, hãy chạy lại "php artisan config:cache".

> Chi tiết về giá trị thiết lập, vui lòng xem [Danh sách giá trị thiết lập của Exment](/vi/config?id=giới-hạn-số-lần-truy-cập-api).

### Lưu ý
- **Khi bạn đã viết throttle riêng**: nếu trong "app/Http/Kernel.php" hoặc "bootstrap/app.php" bạn đã đặt throttle riêng có ghi trực tiếp số lần (như "throttle:60,1") cho nhóm middleware api, thì throttle đó được ưu tiên và "EXMENT_API_MAX_RATE_LIMIT" không được dùng. Nếu muốn thiết lập bằng "EXMENT_API_MAX_RATE_LIMIT", hãy xóa phần throttle riêng đó.
- **Từ v7.0.0 trở lên**: nếu nhóm middleware api không có thiết lập throttle, Exment sẽ tự động thêm "throttle:api". Vì vậy, dù comment out phần throttle trong "app/Http/Kernel.php" thì cũng không bỏ được giới hạn. Nếu muốn nới lỏng giới hạn, hãy đặt giá trị lớn cho "EXMENT_API_MAX_RATE_LIMIT".
- **v6.x trở về trước**: giới hạn được thực hiện bởi dòng "\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'" (cách viết mặc định của Laravel 10) trong nhóm middleware api của "app/Http/Kernel.php". Exment không tự động thêm "throttle:api", nên khi comment out dòng này thì có thể bỏ giới hạn.
- "EXMENT_API_MAX_RATE_LIMIT" dùng được từ Exment v6.2.4 trở lên.

[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
