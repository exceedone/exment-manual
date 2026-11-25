# Cập nhật
Cách đưa Exment lên phiên bản mới hơn.  
Về những thay đổi của từng phiên bản, vui lòng xem [release note](/release_note).

## Các bước
1. **Kiểm tra phiên bản hiện tại**
2. **Sao lưu**
3. **Cập nhật** (cách làm tùy theo phiên bản hiện tại)
4. **Kiểm tra sau khi cập nhật**

## 1. Kiểm tra phiên bản hiện tại
- Trên màn hình: "System Setting" → "System version information" → "Current version"
- Trong tệp: `version` của `exceedone/exment` trong `composer.lock`

## 2. Sao lưu
Hãy sao lưu dữ liệu trước khi cập nhật. Chi tiết vui lòng xem [Sao lưu](/vi/backup).

- Đăng nhập Exment bằng tài khoản quản trị, mở "Admin Setting" → "Backup" ở menu bên trái.
- Bấm nút [Backup] ở góc trên bên phải. Bản sao lưu dữ liệu và tệp đính kèm sẽ được tạo.
- Bấm vào tệp sao lưu và tải về.

Lưu ý: batch cập nhật ở dưới sẽ tự sao lưu.

## 3. Cập nhật
### Dùng cách nào
Tùy theo phiên bản hiện tại và phiên bản muốn nâng lên.

| Phiên bản hiện tại | Việc cần làm |
|---|---|
| **v7.x** (lên bản v7 mới hơn) | "[Cập nhật thông thường](/vi/update?id=Cập-nhật-thông-thường)" ở dưới |
| **v6.x trở xuống** | Trước tiên làm theo "[Nâng từ phiên bản cũ](/vi/update?id=Nâng-từ-phiên-bản-cũ)" ở dưới |

- Khi nâng từ v7.0.x lên v7.1.0 trở lên, <span class="red bold">thiết kế màn hình sẽ chuyển thành "Modern".</span> Để quay lại giao diện cũ, hãy chọn "Classic" ở [Screen design](/vi/system_setting?id=screen-design-thiết-kế-màn-hình) trong thiết lập hệ thống.

### Cập nhật thông thường
Có 3 cách. Cả 3 đều làm cùng các việc (sao lưu → lấy chương trình mới → cập nhật cơ sở dữ liệu).

| Cách | Phù hợp với |
|---|---|
| **A. Batch cập nhật (khuyến nghị)** | Muốn chỉ chạy một tệp trên máy chủ |
| **B. Bằng lệnh** | Muốn tự chạy từng bước |
| **C. Cập nhật tự động** | Muốn tự động lên bản mới mỗi ngày ([cập nhật tự động](/vi/update_auto)) |

#### A. Batch cập nhật (khuyến nghị)
**(1) Tải batch (chỉ lần đầu)**

Đặt vào thư mục đã cài Exment (thư mục gốc của dự án).

| Máy chủ | Việc cần làm |
|---|---|
| Windows | Tải [ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) và đặt vào thư mục |
| Linux | Các lệnh ở dưới (`ExmentUpdateLinux.sh`) |
| Xserver | Các lệnh ở dưới (`ExmentUpdateLinuxXserver.sh`) |
| Sakura Internet | Các lệnh ở dưới (`ExmentUpdateLinuxSakura.sh`) |
| Mac | Tải [ExmentUpdateLinux.sh](https://exment.net/downloads/cmd/ExmentUpdateLinux.sh), đặt vào thư mục rồi chạy `chmod 775 ExmentUpdateLinux.sh` |

Với Linux, Xserver và Sakura Internet, chạy các lệnh sau trong thư mục (chỉ 2 dòng của máy chủ bạn dùng).

~~~
# Linux
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh

# Xserver
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh

# Sakura Internet
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

Lưu ý: nếu batch của bạn được tải trước ngày 13/04/2021, hãy thay bằng bản mới.

**(2) Chạy batch**

Chạy trong thư mục.

~~~
# Linux / Mac
sh ExmentUpdateLinux.sh

# Xserver
sh ExmentUpdateLinuxXserver.sh

# Sakura Internet
sh ExmentUpdateLinuxSakura.sh

# Windows
ExmentUpdateWindows.bat
~~~

Batch lần lượt làm các việc sau.

- Sao lưu dữ liệu
- Lấy chương trình mới và thay vào
- Cập nhật cơ sở dữ liệu

#### B. Bằng lệnh
Trước tiên hãy làm "2. Sao lưu" ở trên.  
Sau đó chạy các lệnh sau trong thư mục.

~~~
cd (thư mục gốc của dự án)
composer update
php artisan exment:update
~~~

- Ngay sau khi phát hành, có thể chưa tìm thấy phiên bản mới nhất. Hãy chờ 10–20 phút rồi chạy lại.
- Trên site production (`APP_ENV=production`), sẽ có câu hỏi xác nhận trước khi thay đổi cơ sở dữ liệu. Ở nơi không có terminal (script, cron, CI), hãy dùng `php artisan exment:update --force`.

**Với máy chủ thuê (Xserver, v.v.)**

- Trên Xserver, hãy chạy `composer update --ignore-platform-reqs` thay cho `composer update`, vì Xserver mặc định không có extension Sodium của PHP (nếu thật sự cần cài, hãy liên hệ bộ phận hỗ trợ của Xserver).
- `php` khi dùng SSH có thể khác phiên bản với PHP đã chọn trên màn hình quản lý máy chủ. Hãy kiểm tra bằng `php --version`. Nếu khác, hãy liên kết `~/bin/php` tới phiên bản đó, hoặc chạy bằng đường dẫn đầy đủ như `/usr/bin/php8.3 artisan exment:update` ([máy chủ thuê](/vi/install_rental)).

#### C. Cập nhật tự động
Mỗi ngày kiểm tra xem có phiên bản mới không, nếu có thì chạy batch cập nhật. Cách cài đặt vui lòng xem [cập nhật tự động](/vi/update_auto).

- Cập nhật tự động chỉ lên được trong phạm vi của cập nhật thông thường. **Không vượt qua phiên bản major, ví dụ từ v6 lên v7**. Xem "[Số phiên bản và phạm vi cập nhật](/vi/update?id=Số-phiên-bản-và-phạm-vi-cập-nhật)" ở dưới.

### Nâng từ phiên bản cũ
Ở các mốc phiên bản sau có các bước làm thủ công. Batch cập nhật và cập nhật tự động không vượt qua được.  
Vui lòng xem trang của mọi mốc nằm giữa phiên bản hiện tại và phiên bản mới nhất.

| Mốc phiên bản | Trang hướng dẫn |
|---|---|
| v3.x trở xuống → v4.0.x | [Cập nhật lên v4.0](/update/v4_0) |
| v4.3.x trở xuống → v4.4.x trở lên | [Cập nhật lên v4.4](/update/v4_4) |
| v4.4.x trở xuống → v5.0.0 trở lên | [Cập nhật lên v5.0](/update/v5_0_php8) |
| v5.0.x trở xuống → v6.0.0 trở lên | [Cập nhật lên v6.0](/update/v6_0_php8) |
| <span class="red bold">v6.x trở xuống → v7.0.0 trở lên</span> | <span class="red bold">[Cập nhật lên v7.0](/update/v7_0_0)</span> (phiên bản Laravel và namespace của thư viện màn hình quản trị thay đổi) |

- Mỗi phiên bản được sửa lỗi đến khi nào, vui lòng xem [thời hạn hỗ trợ](/vi/support_policy).

## 4. Kiểm tra sau khi cập nhật
- Nhấn **Ctrl+F5** trên trình duyệt để tải lại màn hình.
- Kiểm tra ở "System Setting" → "System version information" xem đã là phiên bản mới chưa.
- Nếu xảy ra lỗi, vui lòng xem [Xử lý sự cố](/vi/troubleshooting).

## Số phiên bản và phạm vi cập nhật
Số phiên bản của Exment là "major . minor . patch" (ví dụ v7.1.0). Số nào tăng sẽ quyết định cách cập nhật.

| Loại | Ví dụ | Nội dung | Cách cập nhật |
|---|---|---|---|
| Patch | v7.0.2 → v7.0.3 | Chỉ sửa lỗi và lỗ hổng bảo mật | Cập nhật thông thường |
| Minor | v7.0.x → v7.1.0 | Có chức năng mới; màn hình có thể thay đổi một chút | Cập nhật thông thường. Hãy đọc [release note](/release_note) trước |
| Major | v6.x → v7.0 | Yêu cầu về Laravel, PHP và cấu trúc chương trình thay đổi lớn | **Không lên được bằng cập nhật thông thường**. Hãy làm theo "Nâng từ phiên bản cũ" |

### Vì sao phiên bản major không tự động lên
- Batch cập nhật và cập nhật tự động dùng `composer update`. Lệnh này cài phiên bản mới nhất trong phạm vi ghi ở `composer.json`.
- Ví dụ, với `"exceedone/exment": "^7.0"` thì là bản v7.x mới nhất, không lên v8. Với `"^6.2"` thì là bản v6.x mới nhất, dù v7 đã ra.
- Nếu vẫn dùng v6 và để cập nhật tự động chạy, nó sẽ thấy "có phiên bản mới hơn (v7)" và chạy batch cập nhật mỗi ngày (phiên bản vẫn là v6.x mới nhất). Hãy nâng lên v7, hoặc tắt cập nhật tự động cho đến khi nâng.

## Khác
- Cài bản phát triển, quay về phiên bản cũ, hoặc tạm thời thay chương trình: [bản phát triển và phiên bản cũ](/vi/update_tmp)
