# Cập nhật phiên bản
Đây là các bước thực hiện khi Exment có phiên bản mới và cần cập nhật.  
Về lịch sử cập nhật, vui lòng xem [tại đây](/release_note).

- Việc cập nhật từ v3.X.X trở xuống lên v4.0.X cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v4_0) trước khi tiến hành cập nhật.

- Việc cập nhật từ v4.3.X trở xuống lên v4.4.X trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v4_4) trước khi tiến hành cập nhật. 

- <span class="red bold">Việc cập nhật từ v4.4.X trở xuống lên v5.0.0 trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v5_0_php8) trước khi tiến hành cập nhật.</span>

- <span class="red bold">Việc cập nhật từ v5.0.X trở xuống lên v6.0.0 trở lên cần được thực hiện thủ công. Vui lòng xem nội dung [tại đây](/update/v6_0_php8) trước khi tiến hành cập nhật.</span>

- <span class="red bold">Việc cập nhật từ v6.X.X trở xuống lên v7.0.0 trở lên cần được thực hiện thủ công. Phiên bản Laravel và namespace của thư viện màn hình quản trị sẽ thay đổi. Vui lòng xem nội dung [tại đây](/update/v7_0_0) trước khi tiến hành cập nhật.</span>

- Việc cập nhật từ v7.0.X lên v7.1.0 được thực hiện theo các bước cập nhật thông thường. <span class="red bold">Sau khi cập nhật, thiết kế màn hình sẽ chuyển thành "Modern".</span> Để quay lại giao diện cũ, hãy chọn "Classic" ở [Screen design](/vi/system_setting?id=screen-design-thiết-kế-màn-hình) trong thiết lập hệ thống. Sau khi cập nhật, hãy nhấn Ctrl+F5 trên trình duyệt.

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
