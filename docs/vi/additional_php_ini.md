# Thay đổi giá trị thiết lập PHP

Đây là các bước thay đổi giá trị thiết lập của PHP. Bạn có thể thay đổi 4 mục sau.

| Thiết lập | Khi thay đổi thì sao |
| ---- | ---- |
| Thay đổi dung lượng tải tệp lên tối đa | Dung lượng tệp có thể tải lên từ màn hình sẽ thay đổi |
| Thay đổi lượng bộ nhớ | Lượng bộ nhớ mà Exment (PHP) sử dụng sẽ thay đổi |
| Thay đổi thời gian timeout | Các xử lý tốn thời gian sẽ khó bị dừng giữa chừng hơn |
| Số mục tối đa có thể POST một lần | Màn hình có nhiều mục cũng lưu được |

Cách thay đổi vui lòng xem "[Cách thiết lập](/vi/additional_php_ini?id=cách-thiết-lập)" ở dưới.


#### Thay đổi dung lượng tải tệp lên tối đa
Exment có chức năng tải tệp lên từ màn hình.  
Dung lượng tệp có thể tải lên có giới hạn tùy theo từng máy chủ.  
(Giới hạn ban đầu khác nhau tùy theo máy chủ đã cài đặt)  

#### Thay đổi lượng bộ nhớ
Thay đổi lượng bộ nhớ mà Exment (PHP) sử dụng.  
Lượng bộ nhớ càng lớn thì xử lý càng nhanh, và nội dung có thể chạy trong một lần cũng thay đổi. Tuy nhiên, nếu quá lớn thì có thể ảnh hưởng đến hoạt động của máy chủ.

#### Thay đổi thời gian timeout
Thay đổi thời gian timeout của PHP (thời gian cho đến khi xử lý bị ngắt).  
Khi kéo dài thời gian, các chức năng tốn thời gian như nhập, xuất, sao lưu sẽ chạy chắc chắn hơn.  
※Với các chức năng tốn thời gian, mã nguồn của Exment vốn đã có sẵn xử lý kéo dài thời gian timeout. Tuy nhiên, tùy theo môi trường, xử lý này có thể không có tác dụng. Hãy thực hiện thiết lập này khi timeout xảy ra thường xuyên.

#### Số mục tối đa có thể POST một lần
Quyết định số mục tối đa có thể POST (gửi từ màn hình) trong một lần.  
Ở màn hình nhập dữ liệu, nếu số mục vượt quá giới hạn thì có thể hoạt động không đúng.  
※Chủ yếu ở các màn hình sau, có thể xảy ra lỗi do giới hạn không đủ.  

- Ở "Cài đặt sử dụng" của quy trình làm việc, khi số bảng và số quy trình làm việc nhiều
- Ở màn hình thiết lập biểu mẫu tùy chỉnh, khi số mục cột đăng ký rất nhiều
- Ở màn hình nhập dữ liệu tùy chỉnh, khi số mục rất nhiều




## Cách thiết lập
Hãy thiết lập theo một trong hai cách 1 hoặc 2.


### Cách 1: sửa php.ini

1. Mở tệp "php.ini" trong thư mục đã cài PHP. ※Vị trí của tệp php.ini khác nhau tùy theo môi trường.

2. Sửa các giá trị sau trong tệp php.ini. ※Thường đã có sẵn con số, vì vậy hãy sửa lại con số đó.

~~~
### Thay đổi dung lượng tải tệp lên tối đa
#Dung lượng tối đa cho phép của dữ liệu POST
post_max_size=20M
#Dung lượng tối đa cho phép khi tải lên một tệp
upload_max_filesize=20M


### Thay đổi lượng bộ nhớ
# Khi đổi thành 512M
memory_limit=512M
# Khi đổi thành không giới hạn
memory_limit=-1


### Thay đổi thời gian timeout
#Khi đổi thành 240 giây
max_execution_time=240
#Khi đổi thành không giới hạn
max_execution_time=0


### Thay đổi số mục tối đa có thể POST một lần
#Khi đổi thành 3000 mục
max_input_vars=3000
~~~

3. Khởi động lại máy chủ.


### Cách 2: sửa tệp .htaccess
1. Mở tệp "public/.htaccess" trong thư mục đã cài Exment.

2. Thêm các giá trị sau.

~~~
### Thay đổi dung lượng tải tệp lên tối đa
#Dung lượng tối đa cho phép của dữ liệu POST
php_value post_max_size 20M
#Dung lượng tối đa cho phép khi tải lên một tệp
php_value upload_max_filesize 20M


### Thay đổi lượng bộ nhớ
# Khi đổi thành 512M
php_value memory_limit 512M
# Khi đổi thành không giới hạn
php_value memory_limit -1


### Thay đổi thời gian timeout
#Khi đổi thành 240 giây
php_value max_execution_time 240
#Khi đổi thành không giới hạn
php_value max_execution_time 0


### Thay đổi số mục tối đa có thể POST một lần
#Khi đổi thành 3000 mục
php_value max_input_vars 3000
~~~

3. Khởi động lại máy chủ.

[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
