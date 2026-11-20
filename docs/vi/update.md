# Cập nhật phiên bản
Đây là các bước thực hiện khi Exment có phiên bản mới và cần cập nhật.  
Về lịch sử cập nhật, vui lòng xem [tại đây](/release_note).

## Trước tiên: các loại nâng cấp phiên bản và cách cập nhật
Số phiên bản Exment là "major . minor . patch" (ví dụ v7.1.0). Cách cập nhật khác nhau tùy số nào tăng.

| Loại | Ví dụ | Nội dung | Cách cập nhật |
|---|---|---|---|
| Patch | v7.0.2 → v7.0.3 | Chỉ sửa lỗi và lỗ hổng | Batch cập nhật và cập nhật tự động đều cập nhật được |
| Minor | v7.0.x → v7.1.0 | Có chức năng mới; màn hình có thể thay đổi một chút | Batch cập nhật và cập nhật tự động đều cập nhật được. Hãy đọc [release note](/release_note) trước |
| Major | v6.x → v7.0 | Yêu cầu Laravel / PHP và cấu trúc chương trình thay đổi lớn | **Batch cập nhật và cập nhật tự động không nâng lên được.** Hãy làm theo các bước cập nhật thủ công bên dưới |

### Khác nhau giữa batch cập nhật, cập nhật tự động và cập nhật thủ công
| Cách | Khi chạy | Làm gì | Nâng tới đâu |
|---|---|---|---|
| Batch cập nhật (khuyến nghị) | Khi chạy trên server | Backup (`exment:backup`) → `composer update` → `php artisan exment:update` | Bản mới nhất trong phạm vi ghi ở `composer.json` (ví dụ `"exceedone/exment": "^7.0"` → bản v7.x mới nhất, không lên v8) |
| Cập nhật tự động | Hằng ngày (cron / Task Scheduler) | Tra bản mới nhất trên Packagist; nếu mới hơn bản đang cài thì chạy batch cập nhật | Giống batch cập nhật (chỉ trong phạm vi `composer.json`) |
| Thủ công (lệnh) | Khi chạy lệnh | Tự chạy `composer update`... | Theo chỉ định |

- **Cập nhật tự động không bao giờ nâng lên phiên bản major mới**, vì `composer update` chỉ nâng trong phạm vi `composer.json`. Ví dụ đang dùng v6 với `"exceedone/exment": "^6.2"` thì dù đã có v7 cũng chỉ lên bản v6.x mới nhất.
- Khi đó cập nhật tự động thấy "có bản mới hơn (v7)" nên chạy batch cập nhật mỗi ngày (vẫn ở v6.x mới nhất). Hãy nâng phiên bản major, hoặc tạm dừng cập nhật tự động.
- Có thể xem phiên bản đang dùng ở màn hình "Cài đặt hệ thống" hoặc `version` của `exceedone/exment` trong `composer.lock`.

- Việc cập nhật từ v3.X.X trở xuống lên v4.0.X cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v4_0) trước khi tiến hành cập nhật.

- Việc cập nhật từ v4.3.X trở xuống lên v4.4.X trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v4_4) trước khi tiến hành cập nhật. 

- <span class="red bold">Việc cập nhật từ v4.4.X trở xuống lên v5.0.0 trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v5_0_php8) trước khi tiến hành cập nhật.</span>

- <span class="red bold">Việc cập nhật từ v5.0.X trở xuống lên v6.0.0 trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v6_0_php8) trước khi tiến hành cập nhật.</span>

- <span class="red bold">Việc cập nhật từ v6.X.X trở xuống lên v7.0.0 trở lên cần được thực hiện thủ công. Phiên bản Laravel và namespace của thư viện màn hình quản trị sẽ thay đổi. Vui lòng xem nội dung [tại đây](/update/v7_0_0) trước khi tiến hành cập nhật.</span>

- Nếu xảy ra lỗi khi cập nhật, vui lòng tham khảo [Xử lý sự cố](/troubleshooting).


## Phương pháp cập nhật
Hiện tại, Exment cung cấp một số phương pháp cập nhật.

- ##### Cập nhật bằng batch cập nhật (khuyến nghị)
→Khi cập nhật, hãy đăng nhập vào máy chủ và thực hiện cập nhật bằng cách chạy batch.

- ##### Cập nhật tự động
→Có thể thực hiện cập nhật bằng cron. Hệ thống kiểm tra hằng ngày xem có bản cập nhật hay không và có thể tự động cập nhật.  
Chi tiết vui lòng xem [tại đây](/ja/update_auto) (tiếng Nhật).

- ##### Cập nhật thủ công  
→Trường hợp thực hiện cập nhật thủ công bằng lệnh.

- ##### Cài đặt bản phát triển hoặc phiên bản cũ, tạm thời thay thế mã nguồn  
→Nếu thực hiện các công việc như cài đặt bản phát triển, cài đặt phiên bản cũ, hoặc tạm thời thay thế mã nguồn, vui lòng xem [tại đây](/ja/update_tmp) (tiếng Nhật).  


## Cập nhật bằng batch cập nhật
<span class="red bold">※Ngày 13/04/2021, batch cập nhật đã được cập nhật. Vui lòng tải xuống và thay thế bằng bản mới nhất.</span>

### (Chỉ lần đầu) Tải xuống batch cập nhật

#### Trường hợp Windows
- Tải xuống tệp dưới đây.  
[ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat)

- Đặt tệp đã tải xuống vào thư mục gốc của dự án.

#### Trường hợp Sakura Internet
- Chạy các lệnh dưới đây tại thư mục gốc của dự án để tải xuống.

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

#### Trường hợp Xserver
- Chạy các lệnh dưới đây tại thư mục gốc của dự án để tải xuống.

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh
~~~

#### Trường hợp Linux
- Chạy các lệnh dưới đây tại thư mục gốc của dự án để tải xuống.

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh
~~~


#### Trường hợp Mac
- Tải xuống tệp dưới đây.  
https://exment.net/downloads/cmd/ExmentUpdateLinux.sh

- Đặt tệp đã tải xuống vào thư mục gốc của dự án.

- Chạy lệnh dưới đây.

~~~
chmod 775 ExmentUpdateLinux.sh
~~~

### Chạy batch cập nhật
Hãy chạy batch cập nhật.

#### Trường hợp Linux / Mac
- Chạy lệnh dưới đây tại thư mục gốc của dự án.

~~~
sh ExmentUpdateLinux.sh
# Trường hợp Sakura Internet
# sh ExmentUpdateLinuxSakura.sh
# Trường hợp Xserver
# sh ExmentUpdateLinuxXserver.sh
~~~

#### Trường hợp Windows
- Chạy tệp batch dưới đây.  

~~~
ExmentUpdateWindows.bat
~~~

### Nội dung batch cập nhật thực hiện
Batch cập nhật thực hiện các nội dung sau.  
 - Sao lưu dữ liệu
 - Lấy mã nguồn mới nhất và áp dụng
 - Cập nhật cơ sở dữ liệu


## Phương pháp cập nhật thủ công
Nếu thực hiện cập nhật thủ công bằng lệnh, hãy làm theo phần này.

### (Khuyến nghị) Sao lưu dữ liệu
Thực hiện sao lưu dữ liệu. Chi tiết vui lòng xem [Sao lưu](/backup).  
- Đăng nhập vào Exment bằng tài khoản quản trị viên, từ menu bên trái chọn "Administrator Settings" → "Backup".
- Nhấp vào nút [Backup] ở phía trên bên phải của trang "Backup".
- Bản sao lưu của dữ liệu mới nhất cùng các tệp đính kèm, v.v. sẽ được tạo.
- Sau đó, nhấp vào tệp sao lưu có thời điểm vừa thực hiện để tải xuống.


### Lấy mã nguồn mới nhất, áp dụng và cập nhật cơ sở dữ liệu

- Hiện tại, XServer không hỗ trợ cài đặt mặc định phần mở rộng Sodium của PHP.  
※Nếu thực sự cần cài đặt, bạn phải liên hệ với bộ phận hỗ trợ của XServer.  

- Nếu muốn cập nhật Composer trên XServer, cần sử dụng lệnh khác với lệnh cập nhật thông thường.  
Thông thường: `composer update` <span style="color: red;">✖</span>  
Thực tế: `composer update --ignore-platform-reqs`  
→ Lệnh này bỏ qua việc kiểm tra Sodium và thực hiện trực tiếp việc cập nhật Composer.  

- Chạy các lệnh dưới đây trên dòng lệnh.  
※Ngay sau khi phát hành, có trường hợp phiên bản mới nhất chưa được nhận diện. Khi đó, hãy chờ khoảng 10–20 phút rồi chạy lại các lệnh dưới đây.  

~~~
cd (thư mục gốc của dự án)
composer update
# Với XServer, hãy chạy lệnh dưới đây thay cho "composer update"
# composer update --ignore-platform-reqs
php artisan exment:update
~~~
