# Thiết lập đăng nhập
Trang này hướng dẫn các thiết lập liên quan đến việc đăng nhập vào Exment.

> Về thiết lập và giải thích liên quan đến SSO, vui lòng xem [tại đây](/vi/login_sso).


## Xác thực hai yếu tố
Exment hỗ trợ xác thực hai yếu tố.  
Sau khi nhập thông tin người dùng và đăng nhập, người dùng nhập mã được gửi qua email hoặc mã do Google Authenticator cấp để có thể truy cập Exment.  
※ Xác thực hai yếu tố có thể sử dụng khi phương thức đăng nhập là "Standard" (tiêu chuẩn) hoặc "LDAP".

- [Xác thực hai yếu tố - Thiết lập hệ thống](/vi/login_2factor_setting)
- [Đăng nhập (xác thực hai yếu tố)](/vi/login_2factor)


## Cách quản lý thiết lập đăng nhập

- Quản trị viên hệ thống nhập URL sau.  
http(s)://(URL của Exment)/admin/login_setting  
※ Có thể truy cập sau khi thực hiện "thay đổi thiết lập hệ thống" đã nêu ở trên.

- Hoặc thêm "Login Setting" (thiết lập đăng nhập) vào menu.  
Mở trang "Admin Settings" > "Menu", chọn loại menu "System Menu", khi đó mục "Login Setting" sẽ được hiển thị; hãy chọn mục này rồi lưu lại.  
※ Theo thiết lập mặc định, "Login Setting" không được hiển thị trên menu.

![Danh sách thiết lập đăng nhập](../img/login/login_setting4.png)  

- Để quản lý xác thực hai yếu tố, hãy thiết lập theo quy trình ở trang dưới đây.

    - [Xác thực hai yếu tố - Thiết lập hệ thống](/vi/login_2factor_setting)


### Thiết lập chính sách mật khẩu
Thiết lập các quy tắc liên quan đến mật khẩu đăng nhập.   

![Màn hình thiết lập chính sách mật khẩu](../img/system_setting/system_setting_password.png)  

#### Mật khẩu phức tạp
- Khi thiết lập là YES, cần đặt mật khẩu từ 12 ký tự trở lên và bao gồm ít nhất 3 loại ký tự (chữ hoa, chữ thường, chữ số, ký hiệu; tất cả đều là ký tự nửa chiều rộng (half-width)).
- Giá trị ban đầu là "NO".

#### Số ngày hiệu lực
- Khi người dùng đăng nhập lần đầu sau khi đã quá số ngày chỉ định, hệ thống sẽ chuyển đến màn hình đổi mật khẩu. Hãy đổi mật khẩu rồi đăng nhập lại.
- Nếu đặt số ngày hiệu lực là "0", mật khẩu sẽ không có thời hạn.
- Giá trị ban đầu là "0".

#### Yêu cầu đổi mật khẩu khi đăng nhập lần đầu
- Khi đặt là YES, màn hình yêu cầu đổi mật khẩu sẽ được hiển thị khi người dùng đăng nhập lần đầu tiên.
- Thiết lập này có hiệu lực đối với những người dùng được đăng ký mới hoặc được đặt lại mật khẩu sau khi thiết lập này được đặt là YES.
- Thiết lập này không được áp dụng cho những người dùng đã được đăng ký mới, v.v. trước khi thiết lập được đặt là YES.
- Giá trị ban đầu là "NO".

#### Số lượng mật khẩu lưu trong lịch sử
- Hạn chế việc dùng lại các mật khẩu đã sử dụng gần đây. Hệ thống so sánh mật khẩu mới với các mật khẩu gần nhất, theo số lượng lưu trong lịch sử; nếu trùng thì báo lỗi.
- Nếu đặt số lượng là "0", hệ thống sẽ không so sánh.
- Giá trị ban đầu là "0".

#### Lưu ý

- <span class="small">"Mật khẩu phức tạp" và "Số lượng mật khẩu lưu trong lịch sử" được áp dụng khi người dùng tự đặt mật khẩu của mình, chẳng hạn trên màn hình thiết lập người dùng hoặc màn hình đặt lại mật khẩu. Trường hợp quản trị viên hệ thống đặt mật khẩu thì không áp dụng.</span>


### Khác
- Trường hợp cập nhật từ phiên bản thấp hơn v3.3.0 lên v3.3.0 trở lên, khi đăng nhập bằng provider có mã người dùng (user code) chứa "dấu chấm (.)", có thể xảy ra lỗi.  
Khi đó, hãy xử lý như sau.
    - Tại "Custom Column Settings" (thiết lập cột tùy chỉnh) của bảng "User", chuyển đến màn hình chỉnh sửa cột "User Code".
    - Tại tùy chọn "Available characters" (ký tự được phép sử dụng), đánh dấu chọn "Dot" (dấu chấm) rồi lưu.


- Theo mặc định, ngay cả khi đóng trình duyệt trong trạng thái đang đăng nhập, trạng thái đăng nhập vẫn được duy trì cho đến khi hết một khoảng thời gian nhất định (120 phút).  
Từ v3.6.0 trở đi, nếu muốn tự động đăng xuất khi đóng trình duyệt trong trạng thái đang đăng nhập, hãy mở tệp ".env" và thêm dòng sau.  
※ Về cách chỉnh sửa tệp thiết lập, vui lòng xem chi tiết [tại đây](/config).

~~~
EXMENT_SESSION_EXPIRE_ON_CLOSE=true
~~~




## Lệnh đặt lại mật khẩu
Có thể đặt lại mật khẩu bằng lệnh.

- Quản trị viên hệ thống chạy lệnh sau trên console.

~~~
php artisan exment:resetpassword --email=foobar@test.com --password=P@ssw0rd!
~~~

- Khi chạy lệnh trên, mật khẩu "P@ssw0rd!" sẽ được đặt cho người dùng có địa chỉ email "foobar@test.com".


### Tham số của lệnh

```
exment:resetpassword {--id=} {--email=} {--user_code=} {--password=} {--random=0} {--send=0} {--reset_first_login=0}
```

#### Tham số: chỉ định người dùng
※ Bắt buộc phải có một trong các tham số dưới đây. Nếu chỉ định nhiều tham số trong số này, hệ thống sẽ tìm kiếm theo thứ tự ưu tiên id > email > user_code.

- ##### id
ID đăng nhập của người dùng cần đặt lại mật khẩu.

- ##### email
Địa chỉ email của người dùng cần đặt lại mật khẩu.

- ##### user_code
Mã người dùng (user code) của người dùng cần đặt lại mật khẩu.


#### Tham số: mật khẩu
※ Hãy chỉ định "password" hoặc "random=1". Nếu nhập cả hai, tham số "password" sẽ được ưu tiên.

- ##### password  
Chỉ định chuỗi mật khẩu mới.

- ##### random  
Chỉ định 1 nếu muốn tạo chuỗi mật khẩu ngẫu nhiên. Nếu không chỉ định, giá trị là 0.

#### Tham số: tùy chọn

- ##### send  
Chỉ định 1 nếu muốn gửi mật khẩu sau khi thay đổi cho người dùng đó qua email. Nếu không chỉ định, giá trị là 0.

- ##### reset_first_login  
Sau khi đổi mật khẩu, màn hình yêu cầu đổi mật khẩu sẽ được hiển thị khi người dùng đăng nhập lần đầu tiên. Nếu không chỉ định, giá trị là 0.  
※ Bất kể tùy chọn này được chỉ định thế nào, nếu trong thiết lập đăng nhập, mục "Yêu cầu đổi mật khẩu khi đăng nhập lần đầu" được đặt là YES thì màn hình yêu cầu đổi mật khẩu vẫn được hiển thị khi người dùng đăng nhập lần đầu tiên.

### Ghi chú đặc biệt
- Nếu chỉ định "random=1" trong tham số mà không chỉ định "send=1", mật khẩu sau khi thay đổi sẽ được hiển thị trên console sau khi đặt lại mật khẩu.


### Ví dụ chạy lệnh

~~~
# Ví dụ: đặt lại mật khẩu cho người dùng có id 1 bằng mật khẩu được chỉ định
php artisan exment:resetpassword --id=1 --password=P@ssw0rd!

# Ví dụ: đặt mật khẩu ngẫu nhiên cho người dùng có mã người dùng "user1" và gửi email
php artisan exment:resetpassword --user_code=user1 --random=1 --send=1

# Ví dụ: đặt mật khẩu ngẫu nhiên cho người dùng có địa chỉ email "foobar@test.com"
php artisan exment:resetpassword --email=foobar@test.com --random=1
パスワードをリセットしました。新しいパスワード：XXXXXXXXXX # Mật khẩu sau khi thay đổi được xuất ra console (thông báo: "Đã đặt lại mật khẩu. Mật khẩu mới: ...")
~~~
