# Thiết lập xác thực hai yếu tố
Exment hỗ trợ xác thực hai yếu tố (cách đăng nhập mà sau mật khẩu, bạn nhập thêm 1 mã nữa).  
Trang này là các bước thiết lập để quản trị viên của hệ thống cho dùng xác thực hai yếu tố.

Các bước như sau.

1. (Chỉ khi dùng Google Authenticator) Cài thư viện
2. Thêm thiết lập vào tệp ".env"
3. Trên màn hình thiết lập đăng nhập, thiết lập email rồi lưu
4. Đặt "Sử dụng xác thực hai yếu tố" thành YES và chọn phương thức
5. Nhận mã xác thực, nhập vào rồi lưu

## Các phương thức xác thực hai yếu tố
Hiện có 2 phương thức xác thực hai yếu tố dùng được.  

##### Email
Sau khi đăng nhập bằng ID/mật khẩu, email có mã xác thực được gửi đến địa chỉ email đã đăng ký.  
Nhập mã xác thực đó vào màn hình là đăng nhập xong.

##### Google Authenticator
Sau khi đăng nhập bằng ID/mật khẩu, xác thực hai yếu tố được thực hiện bằng Google Authenticator.

## Điều kiện tiên quyết
- Xác thực hai yếu tố của Exment được thiết lập cho toàn bộ hệ thống, không phải cho từng người dùng.  

- Để dùng xác thực hai yếu tố, hệ thống phải gửi được email. Khi chọn phương thức "Google Authenticator" cũng vậy.

- Khi phương thức là "Google Authenticator", lúc người dùng đăng nhập lần đầu, hệ thống gửi email để đăng ký Google Authenticator đến địa chỉ email đã đăng ký.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor5.png)  
Khi bấm vào liên kết trong email nhận được, người dùng tự thiết lập được xác thực hai yếu tố.  
Thiết lập 1 lần rồi thì từ lần thứ 2, chỉ cần nhập mã xác thực hiện trên Google Authenticator.  

## Cách thiết lập
Đây là các bước thiết lập xác thực hai yếu tố.

- Khi phương thức sẽ dùng là "Google Authenticator", hãy chạy lệnh sau ở thư mục gốc của dự án.

~~~
composer require pragmarx/google2fa
~~~

> Từ v7.0.0 trở đi, simplesoftwareio/simple-qrcode được cài đặt tự động như một thư viện phụ thuộc của Exment, nên không cần thêm.

- Mở tệp ".env" ở thư mục gốc của dự án rồi thêm như sau.  
※Cách sửa tệp thiết lập vui lòng xem [Danh sách giá trị thiết lập](/vi/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=true
~~~

- Dùng tài khoản quản trị viên mở màn hình thiết lập đăng nhập.

- Trước tiên, thiết lập email. Hãy nhập các giá trị thiết lập gửi email. Chi tiết vui lòng xem [Thiết lập email hệ thống](/vi/system_setting?id=thiết-lập-email-hệ-thống).  
Nhập xong thì bấm [Gửi] một lần để lưu.  

- Sau đó, cho hiện phần "Xác thực hai yếu tố" ở phía dưới màn hình thiết lập đăng nhập.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor1.png)  

- Đặt "Sử dụng xác thực hai yếu tố" thành "YES".  
Khi đặt YES, các mục thiết lập còn lại hiện ra.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor2.png)  

- Ở "Phương thức xác thực mặc định", chọn phương thức dùng cho xác thực hai yếu tố ("Email" hoặc "Google Authenticator").  

- Khi bấm nút [Gửi mã xác thực], mã xác thực được gửi đến tài khoản đang đăng nhập.  
Hãy nhập mã xác thực ghi trong email nhận được vào mục "Mã xác thực".
![Màn hình thiết lập hệ thống](../img/login/login_2factor3.png)  
![Màn hình thiết lập hệ thống](../img/login/login_2factor4.png)  

※Khi bấm nút [Gửi mã xác thực], có thể hiện lỗi như hình dưới đây.  
Lỗi này hiện khi đã cập nhật từ phiên bản thấp hơn v1.4.0.  
Khi đó, hãy nhập mẫu thông báo theo [các bước này](/update/v1_4).  
![Màn hình thiết lập hệ thống](../img/login/login_2factor_error.png)  

※Cũng có thể hiện lỗi gửi email.  
Lỗi này hiện khi thiết lập gửi email không đúng.
Khi đó, hãy xem [Thiết lập email hệ thống](/vi/system_setting?id=thiết-lập-email-hệ-thống) rồi sửa thiết lập.
![Màn hình thiết lập hệ thống](../img/login/login_2factor_error2.png)  

- Cuối cùng, bấm [Gửi] để lưu thiết lập.


## Vô hiệu hóa thiết lập
Nếu vì lý do nào đó muốn buộc tắt xác thực hai yếu tố, hãy làm thiết lập sau.

- Mở tệp ".env" ở thư mục của dự án rồi thêm như sau.  
※Cách sửa tệp thiết lập vui lòng xem [Danh sách giá trị thiết lập](/vi/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=false
~~~

Khi làm thiết lập này, dù trên màn hình đã đặt "Sử dụng xác thực hai yếu tố", xác thực hai yếu tố vẫn bị tắt.
  
  
[←Quay lại Thiết lập đăng nhập](/vi/login_setting)
