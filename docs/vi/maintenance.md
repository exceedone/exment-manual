# Chế độ bảo trì
Trong lúc di chuyển dữ liệu hoặc cài đặt plugin, chế độ này chỉ cho quản trị viên hệ thống vào trang. Bật tắt ở "Cài đặt: Hệ thống" → "Chế độ bảo trì" (URL là `/maintenance`).

※Màn hình này dùng được từ Exment v7.2.1 trở đi.  
※Chỉ quản trị viên hệ thống dùng được màn hình này. Hãy đặt "Chế độ bảo trì" thành sử dụng ở "Quản lý tính năng".

![Chế độ bảo trì](../ja/img/maintenance/maintenance1.png)

## Trong lúc bảo trì
- Chỉ **quản trị viên hệ thống, người đã bắt đầu bảo trì và "Địa chỉ IP được phép truy cập"** mới vào được.
- Những người khác sẽ thấy màn hình bảo trì, có thông điệp và thời điểm dự kiến kết thúc (HTTP 503). Người đang đăng nhập sẽ bị đăng xuất.
- Thời điểm bắt đầu, kết thúc và những gì đã đổi được ghi vào log thao tác.

## Thiết lập
| Mục | Nội dung |
|---|---|
| Bắt đầu | Để trống thì không có lịch (khi bắt đầu ngay thì dùng "Bắt đầu bảo trì ngay"). Khi đã đặt, cho đến lúc bắt đầu, người đang đăng nhập được báo ở phía trên màn hình |
| Kết thúc | Qua thời điểm này thì bảo trì tự động kết thúc (tránh việc quên tắt). Để trống thì tiếp tục cho đến khi bấm nút kết thúc |
| Thông điệp (ja, en) | Câu hiện trên màn hình bảo trì |
| Địa chỉ IP được phép truy cập | Mỗi dòng một địa chỉ. Cũng ghi được dải địa chỉ (như `192.168.0.0/24`). Màn hình hiện địa chỉ IP của bạn mà máy chủ nhìn thấy |
| API (OAuth, khóa API) | Chọn từ "Chỉ quản trị viên hệ thống", "Dừng", "Không dừng" |
| Dừng các màn hình truy cập từ bên ngoài | Dừng biểu mẫu công khai, liên kết chia sẻ, trả lời xác nhận an toàn, phê duyệt và trả lời qua LINE |
| Dừng các tác vụ theo lịch | Dừng lịch chạy và batch của plugin. Sau khi kết thúc, chúng chạy chỉ 1 lần (tác vụ có giờ cố định, như sao lưu tự động, thì chờ đến giờ đó lần sau) |
| Dừng hàng đợi | Dừng các xử lý nền như email. Khi kết thúc, chúng chạy tiếp từ chỗ dừng |

## Lệnh
Khi không mở được màn hình, hoặc khi bật tắt trong lúc làm việc trên máy chủ, bạn cũng dùng được lệnh.

~~~
php artisan exment:maintenance status
php artisan exment:maintenance on --until="2026-12-01 09:00" --message="Đang bảo trì" --allow-ip=192.168.0.0/24
php artisan exment:maintenance off
~~~

`php artisan down` (dùng khi cập nhật từ màn hình và khi khôi phục) là thứ khác, và vẫn hoạt động như cũ.

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [Sao lưu](/vi/backup)
