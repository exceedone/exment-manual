# Tinh chỉnh hiệu năng
Kiểm tra các thiết lập giúp trang này chạy nhanh hơn. Ở "Cài đặt: Hệ thống" → "Tinh chỉnh hiệu năng" (URL là `/tuning`), các mục mà khi thiết lập thì Exment nhanh hơn, cùng trạng thái hiện tại, hiện ra thành danh sách.

※Màn hình này dùng được từ Exment v7.2.1 trở đi.  
※Chỉ quản trị viên hệ thống xem được màn hình này.

![Tinh chỉnh hiệu năng](../ja/img/tuning/tuning1.png)

## Cách xem màn hình
- Với mỗi mục, màn hình hiện "Đã cài đặt" hoặc "Chưa cài đặt (khuyến nghị cài đặt)". Với mục "Chưa cài đặt", hãy thiết lập theo nội dung hiện bên dưới.
- Mục có nút thì đổi được ngay trên màn hình này.
- Thiết lập của máy chủ (php.ini, .env) thì hãy nhờ quản trị viên máy chủ.
- Cùng nội dung này cũng hiện ở "Để chạy nhanh hơn (tùy chọn)" trên màn hình cài đặt và ở "== Tinh chỉnh hiệu năng (tùy chọn) ==" của `php artisan exment:checkrequire`. Kết quả chỉ là "Đã cài đặt" hoặc "Chưa cài đặt", và không làm dừng việc cài đặt.

## Các cài đặt Exment có thể tự thực hiện (thiết lập khuyến nghị)
Các thiết lập mà Exment đổi được một cách an toàn thì bạn đánh dấu rồi áp dụng từ màn hình này. Chỉ những thiết lập máy chủ này cần mới hiện ra.

| Thiết lập | Nội dung |
|---|---|
| Bộ nhớ đệm Exment | `EXMENT_USE_CACHE=true` trong `.env` |
| Tệp giao diện | Khi JS và CSS không đủ, đặt lại bằng `exment:publish` |
| Nơi lưu bộ nhớ đệm | Chỉ khi dùng được Redis (khi PHP kết nối được tới Redis), lưu bộ nhớ đệm trên Redis |
| Nơi lưu phiên | Tương tự, lưu trên Redis (chỉ ở màn hình này; không hiện khi thiết lập ban đầu) |
| Xóa bộ nhớ đệm route | Nếu có bộ nhớ đệm route thì xóa (vì nó làm màn hình của plugin không mở được) |
| Tạo bộ nhớ đệm cấu hình | `config:cache` (quyền 640). Được tạo sau các thiết lập ghi vào `.env` |
| Quyền của các tệp bí mật | Đặt `.env` và bộ nhớ đệm cấu hình thành 640 (chỉ khi người dùng của PHP là chủ sở hữu) |

- Khi bấm "Áp dụng các cài đặt đã đánh dấu", bạn xem lại danh sách các thiết lập sẽ áp dụng rồi mới áp dụng. Việc áp dụng được ghi vào log thao tác, và kết quả lần trước (đã áp dụng, đã có sẵn, thất bại và lý do) hiện ở bên dưới.
- **Cũng chọn được khi thiết lập ban đầu**: trên màn hình thiết lập ban đầu sau khi cài đặt, cùng các thiết lập này hiện ra ở trạng thái đã được đánh dấu. Mục nào bỏ đánh dấu thì không được áp dụng.

  ![Thiết lập khuyến nghị khi thiết lập ban đầu](../ja/img/tuning/tuning_setup.png)

- php.ini, PHP-FPM, OPcache, cron và hàng đợi thì không bị thay đổi. Quản trị viên máy chủ hãy xem các mục dưới đây rồi thiết lập.
- Nếu trong `.env` có `EXMENT_TUNING_SERVER_ACTIONS=false`, mục này và các thiết lập khi thiết lập ban đầu đều không hiện ra.

## Các mục
### OPcache
Giữ trong bộ nhớ kết quả biên dịch chương trình PHP. Exment có nhiều tệp, nên giới hạn bộ nhớ và số tệp cũng cần đặt lớn (bộ nhớ từ 128MB trở lên và số tệp từ 20.000 trở lên thì là "Đã cài đặt").

Hãy thiết lập php.ini như sau rồi khởi động lại PHP (PHP-FPM, máy chủ Web).

~~~ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
~~~

### Phiên bản PHP
PHP càng mới thì chạy càng nhanh. PHP 8.2 được hỗ trợ bảo mật đến ngày 2026-12-31. Chúng tôi khuyên nâng lên PHP 8.3 trở lên.

### Chế độ gỡ lỗi (APP_DEBUG)
Ở chế độ gỡ lỗi, mỗi request đều thu thập thông tin chi tiết và hiện chi tiết lỗi trên màn hình. Ở môi trường production, hãy tắt.

~~~
# .env
APP_DEBUG=false
~~~

### Bộ nhớ đệm cấu hình (config:cache)
Gộp các tệp cấu hình thành một tệp để giảm việc đọc ở mỗi request. Bạn tạo được bằng nút "Tạo bộ nhớ đệm cấu hình", "Xóa bộ nhớ đệm cấu hình" trên màn hình, hoặc bằng lệnh sau.

~~~
php artisan config:cache
~~~

- Khi sửa `.env` bằng tay, hãy tạo lại (cho đến khi tạo lại, phần đã sửa chưa có hiệu lực).
- Khi Exment ghi lại `.env` (cài đặt, khôi phục, v.v.), bộ nhớ đệm tự động bị xóa.
- Trong `bootstrap/cache/config.php` có các bí mật của `.env` (mật khẩu cơ sở dữ liệu, `APP_KEY`, v.v.). Khi trên một máy chủ, mỗi trang chạy bằng một người dùng OS khác nhau (multi-tenant), hãy đặt quyền thành 640 sau khi tạo để các trang khác không đọc được (chạy với umask 027).
- Không dùng bộ nhớ đệm route (`route:cache`). Vì route của plugin được tạo từ cơ sở dữ liệu, màn hình của plugin sẽ không mở được.

### Tối ưu hóa việc nạp lớp (composer)
Khi tạo sẵn danh sách lớp bằng composer, thời gian PHP tìm tệp của lớp giảm đi.

~~~
composer install --optimize-autoloader --no-dev
~~~

### Bộ nhớ đệm Exment (EXMENT_USE_CACHE)
Đưa các định nghĩa như bảng, cột, thiết lập vào bộ nhớ đệm để không phải đọc từ cơ sở dữ liệu ở mỗi request.

~~~
# .env
EXMENT_USE_CACHE=true
~~~

### Nơi lưu bộ nhớ đệm và phiên
Đặt bộ nhớ đệm và phiên trên Redis hoặc tương tự thì nhanh hơn dùng tệp. Khi có nhiều máy chủ Web thì đây là việc cần làm. Khi dùng được Redis, thiết lập như sau (tùy chọn).

~~~
# .env (Redis)
CACHE_STORE=redis
SESSION_DRIVER=redis
~~~

### Hàng đợi (email và các xử lý nền khác)
Khi hàng đợi là `sync`, việc gửi email, v.v. được làm ngay trong xử lý của màn hình, nên màn hình phải chờ đến khi xong. Hãy thiết lập như sau và cho worker của hàng đợi chạy (supervisor, systemd, v.v.).

~~~
# .env
QUEUE_CONNECTION=database
# Giữ cho worker luôn chạy
php artisan queue:work --tries=3
~~~

### Bộ nhớ đệm tổng hợp của bảng điều khiển (EXMENT_DASHBOARD_CACHE_SECONDS)
Biểu đồ của view tổng hợp sẽ tổng hợp bảng mỗi lần mở dashboard. Thiết lập này giữ kết quả, cho từng người xem, trong số giây đã định, và trong thời gian đó không tổng hợp lại. Giá trị ban đầu là `0` (không dùng).

~~~
# .env (giây)
EXMENT_DASHBOARD_CACHE_SECONDS=60
~~~

- Khi lưu hoặc xóa dữ liệu, hệ thống tổng hợp lại.
- Các thay đổi về chia sẻ, tổ chức trực thuộc, v.v. sẽ hiện ra sau khi hết thời gian giữ.

### Nhật ký phục vụ điều tra
Nhật ký hiệu năng hệ thống và các chế độ gỡ lỗi trong `.env` (`EXMENT_DEBUG_MODE_REQUEST`, `EXMENT_DEBUG_MODE_SQL`, `EXMENT_DEBUG_MODE_SQLFUNCTION`, `EXMENT_DEBUG_MODE_SQLFUNCTION1`, `EXMENT_DEBUG_MODE_SCHEDULE`) ghi log ở mỗi request. Khi điều tra xong, hãy tắt. Nhật ký hiệu năng hệ thống thì dừng được bằng nút "Tắt nhật ký hiệu năng hệ thống".

### Chỉ mục tìm kiếm
Với bảng có hơn 10.000 dữ liệu, khi thêm "Chỉ mục tìm kiếm" cho các cột hay dùng để lọc và sắp xếp, danh sách, tìm kiếm và tổng hợp sẽ nhanh hơn. Trong thiết lập của [cột tùy chỉnh](/vi/column), hãy thêm "Chỉ mục tìm kiếm" cho các cột hay dùng.

### Tác vụ định kỳ (schedule:run, cron)
Thông báo, lịch chạy, batch, v.v. được thực hiện bằng `schedule:run` mà cron chạy mỗi phút. Vì mỗi phút PHP và Exment đều được khởi động, nếu có xử lý nặng thì CPU dành cho xử lý của màn hình giảm đi. Màn hình hiện thời điểm chạy gần nhất và thời gian dài nhất trong 1 phút. Nó báo cho bạn khi cron không chạy hoặc khi có tác vụ nặng.

### Tiến trình PHP-FPM
Với `pm = ondemand` và thời gian chờ (`pm.process_idle_timeout`) ngắn, lần đầu tiên sau một lúc không được dùng sẽ chậm đi đúng bằng thời gian khởi động tiến trình. `pm.max_children` thì đặt cho hợp với bộ nhớ của máy chủ.

### Bộ nhớ đệm route (route:cache)
Ở mỗi request, Exment thêm route của màn hình plugin từ cơ sở dữ liệu. Nếu có bộ nhớ đệm route, màn hình của plugin cài sau sẽ không mở được. **Không có mới là trạng thái đúng**.

### Quyền của các tệp bí mật (.env, bộ nhớ đệm cấu hình)
`.env` và bộ nhớ đệm cấu hình (`bootstrap/cache/config.php`) có chứa mật khẩu và APP_KEY. Hãy đặt 640 hoặc tương tự để những người dùng khác của máy chủ không đọc được (cũng sửa được ở mục "Các cài đặt Exment có thể tự thực hiện" phía trên).

### Tệp giao diện (JS, CSS)
Kiểm tra xem JS và CSS mà màn hình đăng nhập, v.v. tải về có đủ không, và thiết lập có cho trình duyệt nhớ chúng không (Cache-Control, Expires). URL có kèm phiên bản (`?v=`), nên cho nhớ lâu cũng không sao.

### Nhật ký truy vấn chậm (cơ sở dữ liệu)
Khi bật slow query log của MySQL / MariaDB, các truy vấn tốn thời gian được ghi lại, và bạn tìm được nguyên nhân gây chậm.

### Chỉ mục của các cột chỉ mục tìm kiếm (cơ sở dữ liệu)
Cột được đặt "Chỉ mục tìm kiếm" có một cột riêng và một chỉ mục trong bảng dữ liệu. Nếu không có chỉ mục do khôi phục hoặc thay đổi thất bại, mỗi lần lọc và sắp xếp đều phải đọc toàn bộ dữ liệu. Mục này kiểm tra xem chỉ mục có đủ không.

## Các thiết lập khác liên quan đến tốc độ
### Biểu đồ của view danh sách (EXMENT_CHART_LIST_MAX_ROWS)
Biểu đồ của view danh sách vẽ 1 điểm cho mỗi dòng. Với giá trị ban đầu (`0`), tất cả các dòng được đọc. Khi bảng lớn và không đủ bộ nhớ hoặc thời gian, bạn đặt được giới hạn trong `.env` (ví dụ: 1000). Khi vượt giới hạn, sẽ hiện thông báo yêu cầu dùng biểu đồ của view tổng hợp. Với bảng lớn, hãy tạo biểu đồ bằng view tổng hợp.

~~~
# .env (khi đặt giới hạn)
EXMENT_CHART_LIST_MAX_ROWS=1000
~~~

## Không hiện các nút trên màn hình (EXMENT_TUNING_SERVER_ACTIONS)
Khi nhiều trang dùng chung mã nguồn trên một máy chủ (multi-tenant, v.v.), nếu ghi như sau vào `.env` thì các nút làm thay đổi toàn bộ máy chủ (tạo, xóa bộ nhớ đệm cấu hình) không hiện ra. Màn hình sẽ hiện "Trên máy chủ này không thể thay đổi từ màn hình (quản trị viên máy chủ sẽ cài đặt)."

~~~
# .env
EXMENT_TUNING_SERVER_ACTIONS=false
~~~

## Ẩn màn hình
- Tinh chỉnh hiệu năng là một trong các tính năng của "[Quản lý tính năng](/vi/feature)", và ngay từ đầu là "Sử dụng". Quản trị viên hệ thống của trang chuyển được nó sang "không sử dụng" ở Quản lý tính năng.
- Khi muốn ẩn từ phía máy chủ (SaaS, v.v.), hãy ghi `EXMENT_FEATURES_LOCKED=tuning` vào `.env` (khi chặn cùng với tính năng khác thì cách nhau bằng dấu phẩy). Màn hình sẽ thành 404 và cũng không hiện trên menu.

## Mục liên quan
- [Kiểm tra bảo mật](/vi/security_check)
- [Quản lý tính năng](/vi/feature)
- [Thiết lập hệ thống](/vi/system_setting)
- [Thiết lập máy chủ](/vi/server)
- [(Dành cho người dùng nâng cao) Dự phòng](/vi/redundant)
