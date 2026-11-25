# Kiểm tra bảo mật
Kiểm tra các thiết lập giúp trang này chạy an toàn. Ở "Cài đặt: Hệ thống" → "Kiểm tra bảo mật" (URL là `/security_check`), các thiết lập cần kiểm tra, cùng trạng thái hiện tại, hiện ra thành danh sách.

※Màn hình này dùng được từ Exment v7.2.1 trở đi.  
※Chỉ quản trị viên hệ thống xem được màn hình này.

![Kiểm tra bảo mật](../ja/img/security_check/security_check1.png)

## Cách xem màn hình
- Với mỗi mục, nếu không có vấn đề thì có dấu ✓, mục cần sửa thì có dấu ✕, mục không kiểm tra được từ máy chủ này thì có dấu ⚠.
- Với mục "Cần khắc phục", hãy thiết lập theo cách sửa hiện bên dưới mục đó.
- Mục có nút thì sửa được ngay trên màn hình này. Việc sửa được ghi vào log thao tác.
- Khi bấm "Xem cách cài đặt", cách thiết lập của mục đó mở ra.
- Thiết lập của máy chủ (máy chủ Web, php.ini, .env) thì hãy nhờ quản trị viên máy chủ.

Khi cài đặt, trên màn hình "Kiểm tra yêu cầu hệ thống" cũng hiện những mục của máy chủ nên sửa (chỉ để xem. Không làm dừng việc cài đặt).

## Các mục
| Mục | Điều cần kiểm tra |
|---|---|
| Quyền của các tệp quan trọng | `.env` và bộ nhớ đệm cấu hình có chứa các bí mật như mật khẩu cơ sở dữ liệu. Đặt để những người dùng khác của máy chủ không đọc được (640, v.v.). storage cũng không để ở dạng ai cũng đọc ghi được |
| Chế độ gỡ lỗi (APP_DEBUG) | Ở chế độ gỡ lỗi, nội dung chi tiết của lỗi hiện trên màn hình. Ở môi trường production, hãy tắt |
| Khóa ứng dụng (APP_KEY) | Khóa dùng để mã hóa và ký phiên. Cần giá trị được tạo riêng cho từng trang |
| Môi trường (APP_ENV) | Trang production thì đặt là `production` |
| https | Dùng https để mật khẩu và dữ liệu không bị đọc trên đường truyền. Cài chứng chỉ vào máy chủ Web và đặt `APP_URL` trong `.env` thành URL bắt đầu bằng `https://` |
| Header bảo mật | Các header báo cho trình duyệt: không hiển thị trong trang khác, không đoán loại tệp, không để lộ quá nhiều thông tin nơi liên kết đến, chỉ dùng https (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security). Thiết lập trên máy chủ Web |
| Những thứ không được để lộ ra bên ngoài | Đặt để `.env`, `.git`, `storage`, `vendor` không mở được từ trình duyệt (phải là 403 hoặc 404) |
| Mật khẩu của quản trị viên hệ thống | Không dùng mật khẩu để nguyên như lúc đầu, hoặc mật khẩu giống mã người dùng. Đổi ở "Cài đặt" của menu người dùng ở góc trên bên phải |
| Xác thực hai yếu tố | Ngoài mật khẩu, xác nhận đăng nhập bằng mã của email hoặc ứng dụng xác thực ([Thiết lập đăng nhập](/vi/login_setting)) |

### Ví dụ thiết lập header bảo mật
Thêm các dòng sau vào máy chủ Web. Thêm xong thì nạp lại máy chủ Web (.htaccess của Apache có hiệu lực ngay), rồi kiểm tra lại trên màn hình này.

~~~
# nginx (trong server { })
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
# chỉ khi dùng https
add_header Strict-Transport-Security "max-age=31536000" always;
~~~

~~~
# Apache (đầu tệp public/.htaccess của Exment, hoặc thiết lập của Apache. Cần mod_headers)
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    # chỉ khi dùng https
    Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>
~~~

- Strict-Transport-Security chỉ thêm cho trang dùng https. Khi thêm, trình duyệt chỉ mở trang đó bằng https trong 1 năm.
- Với nginx, khi trong `location { }` cũng có `add_header`, hãy ghi cùng các dòng đó vào trong `location` ấy (khi ghi ở trong, `add_header` ở ngoài không được dùng).
- Với máy chủ thuê (Xserver, v.v.), ghi vào .htaccess.

### Khi hiện "Không thể kiểm tra"
Header bảo mật và những thứ không được để lộ ra bên ngoài được kiểm tra bằng cách máy chủ gửi yêu cầu đến chính trang của mình. Ở môi trường mà máy chủ không truy cập được trang của mình (trong Docker, phía trong tường lửa, v.v.) thì không kiểm tra được. Khi đó, hãy mở địa chỉ hiện trên màn hình bằng trình duyệt của một máy tính ở ngoài máy chủ để kiểm tra.

## Mục liên quan
- [Tinh chỉnh hiệu năng](/vi/tuning)
- [Quản lý tính năng](/vi/feature)
- [Thiết lập đăng nhập](/vi/login_setting)
