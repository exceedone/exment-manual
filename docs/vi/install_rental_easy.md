# Cài đặt dễ dàng (máy chủ thuê)
Cách cài Exment lên máy chủ thuê (Xserver, Sakura Internet, v.v.) chỉ bằng cách **tải lên một tệp và mở bằng trình duyệt**. Không dùng SSH hay composer.

Để tự cài bằng SSH, xem [Máy chủ thuê](/vi/install_rental).

## Cần có
- PHP 8.2 trở lên (chọn trong trang quản lý máy chủ)
- Một cơ sở dữ liệu **trống**: MySQL 8.0 trở lên, hoặc MariaDB 10.11 trở lên
- FTP, hoặc trình quản lý tệp của máy chủ (để tải lên và mở tệp)
- Khoảng 400 MB dung lượng trống

## Các bước
1. Tải [exment-installer.zip](https://exment.net/downloads/installer/exment-installer.zip), giải nén và lấy tệp `exment-installer.php`.
    SHA-256 của tệp zip được ghi trong [exment-installer.zip.sha256](https://exment.net/downloads/installer/exment-installer.zip.sha256) (hiện tại là `9954da9ff53685451ac2b9376063fd92fc6b5559bc9e010048ddde72b884e5f1`).
2. Tải `exment-installer.php` lên thư mục muốn đặt Exment.
    - Dùng ở gốc tên miền: `public_html` (Sakura là `www`)
    - Dùng trong một thư mục: `public_html/exment`, v.v. Hãy dùng **thư mục trống**.
3. Mở bằng trình duyệt (ví dụ `https://example.com/exment-installer.php`).
4. **Nhập khóa.** Trình cài đặt tạo tệp `exment-installer-key.php` trong cùng thư mục. Mở tệp này bằng FTP hoặc trình quản lý tệp và nhập phần sau `KEY:`.  
   Tệp này không hiện gì khi mở bằng trình duyệt: chỉ người xem được tệp (chủ máy chủ) mới tiếp tục được.
5. Xem phần **kiểm tra máy chủ**. Nếu có ✗, hãy sửa theo hướng dẫn và nhấn "Kiểm tra lại" (phiên bản PHP, memory_limit, v.v.). ⚠ không chặn việc cài đặt.
6. Nhấn "Tải xuống". Trình cài đặt tải Exment từ exment.net, kiểm tra nội dung (sha256), giải nén và đặt tệp. Mất vài phút. Nếu bị dừng giữa chừng, hãy mở lại trang và nhấn "Tiếp tục": nó sẽ tiếp tục từ chỗ đã dừng.
7. **Cơ sở dữ liệu**: tạo cơ sở dữ liệu theo hướng dẫn trên trang và nhấn "Kiểm tra kết nối". Các giá trị không được lưu.
8. Nhấn "Đến trình cài đặt của Exment". Trình cài đặt tự xóa (cả khóa và tệp làm việc) rồi mở trình cài đặt của Exment. Sau đó làm theo [các bước cài đặt](/vi/quickstart_easy).

## Nơi đặt Exment
- Bản thân Exment được đặt trong thư mục **không công khai trên web** (ví dụ `exment` cạnh `public_html`; với `public_html/t721` là `exment_t721`).
- Thư mục công khai chỉ chứa nội dung của `public` của Exment.
- Với máy chủ chỉ cho ghi trong thư mục công khai, Exment được đặt trong `exment-app` bên trong đó, chặn truy cập web bằng `.htaccess`.
- Tệp `.env` có khóa riêng (APP_KEY), `APP_ENV=production` và `APP_DEBUG=false`.

## Lưu ý theo máy chủ
### Xserver
- Phiên bản PHP: bảng điều khiển → "PHP Ver.切替"
- Cơ sở dữ liệu: trong bảng điều khiển → "MySQL設定", tạo cơ sở dữ liệu và người dùng, rồi cấp cho người dùng quyền truy cập cơ sở dữ liệu. Host là tên hiển thị trong "MySQL設定".
- <span class="red bold">Trong trình cài đặt của Exment, hãy chọn "MariaDB" làm cơ sở dữ liệu.</span> Cơ sở dữ liệu của Xserver là MariaDB; chọn "MySQL" sẽ dừng với thông báo "Cơ sở dữ liệu của bạn là MariaDB nhưng bạn đã chọn MySQL...".

### Sakura Internet
- Phiên bản PHP: bảng điều khiển → cài đặt script
- Cơ sở dữ liệu: bảng điều khiển → cơ sở dữ liệu → thêm mới (bộ ký tự utf8mb4). Người dùng là tên tài khoản; host là `mysqlNNN.db.sakura.ne.jp` hiển thị trong danh sách.

## Những việc trình cài đặt không bao giờ làm
- Không ghi đè lên Exment có sẵn hoặc trang khác (dừng lại khi thư mục có tệp hoặc Exment đã có). Để cập nhật, xem [Cập nhật](/vi/update).
- Không dùng cơ sở dữ liệu đã có bảng (bước kiểm tra kết nối sẽ từ chối).
- Chỉ lấy tệp từ exment.net. Tệp có nội dung (sha256) không đúng bản phát hành sẽ bị xóa, không bao giờ được dùng.
- Không lưu hay hiển thị mật khẩu cơ sở dữ liệu.
- Không để lại gì sau khi xong (nếu không tự xóa được, hãy xóa bằng FTP theo hướng dẫn trên trang).

## Khi không thành công
- **"Bản phát hành này cần PHP 8.x trở lên"**: nâng phiên bản PHP trong trang quản lý, mở lại trang và nhấn "Tiếp tục".
- **Nhập sai khóa quá nhiều lần**: đợi khoảng 10 phút rồi nhập lại.
- **Muốn làm lại từ đầu**: nhấn "Làm lại từ đầu" ở cuối trang (các tệp Exment đã đặt cũng bị xóa).
- Với lỗi khác, xem [Lỗi khi cài đặt](/vi/install_error).
