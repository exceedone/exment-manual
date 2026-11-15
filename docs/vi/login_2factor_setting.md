# Thiết lập xác thực hai yếu tố
Exment hỗ trợ xác thực hai yếu tố.  
Trang này trình bày cách thiết lập ở phía quản trị hệ thống của Exment.

## Các phương thức xác thực hai yếu tố
Hiện tại, Exment hỗ trợ 2 phương thức xác thực hai yếu tố sau đây.  

##### Email
Sau khi đăng nhập bằng ID/mật khẩu, một email chứa mã xác thực sẽ được gửi đến địa chỉ email đã đăng ký.  
Nhập mã xác thực đó vào form để hoàn tất đăng nhập.

##### Google Authenticator
Sau khi đăng nhập bằng ID/mật khẩu, thực hiện xác thực hai yếu tố bằng Google Authenticator.

## Điều kiện tiên quyết
- Xác thực hai yếu tố trong Exment không được thiết lập riêng cho từng người dùng đăng nhập mà được thiết lập cho toàn bộ hệ thống.  

- Để thực hiện xác thực hai yếu tố trong Exment, hệ thống bắt buộc phải gửi được email. Điều này cũng áp dụng cả khi loại xác thực hai yếu tố được chọn là "Google Authenticator".

- Nếu đã thiết lập xác thực hai yếu tố với phương thức xác thực là "Google Authenticator", khi người dùng đăng nhập lần đầu tiên, hệ thống sẽ gửi email dùng để đăng ký Google Authenticator đến địa chỉ email đã đăng ký.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor5.png)  
Bằng cách nhấp vào liên kết trong email được gửi đến, từng người dùng có thể tự thiết lập xác thực hai yếu tố.  
Sau khi đã thiết lập một lần, từ lần thứ hai trở đi không cần thiết lập ban đầu nữa mà chỉ cần nhập mã xác thực lấy từ Google Authenticator.  

## Cách thiết lập
Dưới đây là cách thiết lập xác thực hai yếu tố.

- Nếu phương thức xác thực sử dụng là "Google Authenticator", hãy chạy lệnh sau tại thư mục gốc của dự án.

~~~
composer require pragmarx/google2fa
~~~

> Từ v7.0.0 trở đi, simplesoftwareio/simple-qrcode được tự động cài đặt như một thư viện phụ thuộc của Exment nên không cần thêm thủ công.

- Tại thư mục gốc của dự án, mở tệp ".env" và thêm dòng sau.  
※ Về cách chỉnh sửa tệp thiết lập, vui lòng xem chi tiết [tại đây](/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=true
~~~

- Dùng tài khoản quản trị viên để chuyển đến màn hình thiết lập đăng nhập.

- Trước tiên, hãy thiết lập email. Nhập các giá trị thiết lập gửi email. Vui lòng xem chi tiết tại [Thiết lập email hệ thống](/vi/system_setting).  
Sau khi thiết lập xong, nhấp vào [Submit] một lần để lưu.  

- Sau đó, hiển thị phần "2-factor authentication" (xác thực hai yếu tố) ở phía dưới màn hình thiết lập đăng nhập.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor1.png)  

- Đặt mục "Use two-factor authentication" (sử dụng xác thực hai yếu tố) thành "YES".  
Khi đặt là YES, các mục thiết lập còn lại sẽ được hiển thị.  
![Màn hình thiết lập hệ thống](../img/login/login_2factor2.png)  

- Tại mục "Default authentication method" (phương thức xác thực mặc định), chọn phương thức dùng cho xác thực hai yếu tố: "Email" hoặc "Google Authenticator".  

- Nhấp vào nút [Send Authentication Code] (gửi mã xác thực) để gửi mã xác thực dùng cho việc bật xác thực hai yếu tố đến tài khoản hiện đang đăng nhập.  
Hãy nhập mã xác thực ghi trong email được gửi đến vào mục "Authentication code" (mã xác thực).
![Màn hình thiết lập hệ thống](../img/login/login_2factor3.png)  
![Màn hình thiết lập hệ thống](../img/login/login_2factor4.png)  

※ Khi nhấp vào nút [Send Authentication Code], có thể xảy ra lỗi như hình dưới đây.  
Lỗi này xảy ra khi cập nhật từ phiên bản thấp hơn v1.4.0.  
Khi đó, hãy nhập (import) mẫu thông báo theo [quy trình tại đây](/update/v1_4).  
![Màn hình thiết lập hệ thống](../img/login/login_2factor_error.png)  

※ Ngoài ra, có thể xảy ra lỗi gửi email.  
Lỗi này xảy ra khi thiết lập gửi email chưa được thực hiện đúng.
Khi đó, hãy thiết lập lại cho đúng theo hướng dẫn tại [Thiết lập email hệ thống](/vi/system_setting).
![Màn hình thiết lập hệ thống](../img/login/login_2factor_error2.png)  

- Sau đó, nhấp vào [Submit] để lưu các giá trị thiết lập.


## Vô hiệu hóa thiết lập
Nếu vì lý do nào đó muốn buộc vô hiệu hóa xác thực hai yếu tố, hãy thực hiện thiết lập sau.

- Tại thư mục của dự án, mở tệp ".env" và thêm dòng sau.  
※ Về cách chỉnh sửa tệp thiết lập, vui lòng xem chi tiết [tại đây](/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=false
~~~

Khi thực hiện thiết lập này, xác thực hai yếu tố sẽ bị vô hiệu hóa ngay cả khi trên màn hình đã đặt "Use two-factor authentication".
  
  
[← Quay lại Thiết lập đăng nhập](/vi/login_setting)
