# Thiết lập đăng nhập
Đây là trang đặt các quy tắc khi đăng nhập vào Exment. Bạn thiết lập được quy tắc của mật khẩu (chính sách mật khẩu) và xác thực hai yếu tố.  
Cách đặt lại mật khẩu bằng lệnh cũng có ở trang này.

> Thiết lập và giải thích về SSO vui lòng xem [tại đây](/vi/login_sso).


## Xác thực hai yếu tố
Exment hỗ trợ xác thực hai yếu tố.  
Sau khi nhập thông tin người dùng và đăng nhập, bạn nhập mã nhận qua email hoặc mã hiện trên Google Authenticator thì dùng được Exment.  
※Xác thực hai yếu tố dùng được khi phương thức đăng nhập là "tiêu chuẩn" hoặc "LDAP".

- [Xác thực hai yếu tố - Thiết lập hệ thống](/vi/login_2factor_setting)
- [Đăng nhập (xác thực hai yếu tố)](/vi/login_2factor)


## Cách quản lý thiết lập đăng nhập

- Quản trị viên hệ thống mở URL sau.  
http(s)://(URL của Exment)/login_setting  
※Truy cập được sau khi làm việc "thay đổi thiết lập hệ thống" đã ghi ở trên.

> ※URL này là của thiết lập tiêu chuẩn không có "/admin" (trang cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (trang cài ở phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của trang (ví dụ: `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết vui lòng xem [Thay đổi hoặc xóa "admin" trong URL](/vi/additional_prefix).

- Từ v7.1.0 trở đi, cũng mở được từ "Cài đặt quản trị" → "Cài đặt đăng nhập" ở menu bên trái.
- Ở v7.0 trở về trước, lúc đầu "Cài đặt đăng nhập" không hiện trên menu. Để thêm vào menu, mở trang "Cài đặt quản trị" > "Menu" rồi chọn loại menu "Menu hệ thống". "Cài đặt đăng nhập" sẽ hiện ở mục đối tượng, hãy chọn rồi lưu.

![Danh sách thiết lập đăng nhập](../img/login/login_setting4.png)  

- Thiết lập xác thực hai yếu tố được làm theo các bước ở trang sau.

    - [Xác thực hai yếu tố - Thiết lập hệ thống](/vi/login_2factor_setting)


### Thiết lập chính sách mật khẩu
Đặt các quy tắc về mật khẩu đăng nhập.   

![Màn hình thiết lập chính sách mật khẩu](../img/system_setting/system_setting_password.png)  

#### Mật khẩu phức tạp
- Đặt thành YES thì mật khẩu phải có từ 12 ký tự trở lên và gồm ít nhất 3 loại ký tự (chữ hoa, chữ thường, chữ số, ký hiệu; đều là ký tự half-width).
- Giá trị ban đầu là "NO".

#### Số ngày hiệu lực
- Khi đăng nhập lần đầu sau khi đã qua số ngày đã đặt, màn hình đổi mật khẩu hiện ra. Hãy đổi mật khẩu rồi đăng nhập lại.
- Nếu đặt số ngày hiệu lực là "0", mật khẩu không có thời hạn.
- Giá trị ban đầu là "0".

#### Yêu cầu đổi mật khẩu khi đăng nhập lần đầu
- Đặt thành YES thì khi người dùng đăng nhập lần đầu, màn hình đổi mật khẩu hiện ra.
- Đối tượng là người dùng được đăng ký mới và người dùng được đặt lại mật khẩu sau khi thiết lập này thành YES.
- Người dùng đã được đăng ký mới, v.v. trước khi đặt thành YES thì không thuộc đối tượng.
- Giá trị ban đầu là "NO".

#### Số lượng mật khẩu lưu trong lịch sử
- Không cho dùng lại mật khẩu đã dùng gần đây. Khi mật khẩu mới trùng với một trong các mật khẩu gần nhất, theo số lượng lưu trong lịch sử, thì báo lỗi.
- Nếu đặt số lượng là "0", hệ thống không so sánh.
- Giá trị ban đầu là "0".

#### Lưu ý

- <span class="small">"Mật khẩu phức tạp" và "Số lượng lịch sử mật khẩu" được dùng khi người dùng tự đặt mật khẩu của mình, như trên màn hình thiết lập người dùng hay màn hình đặt lại mật khẩu. Khi quản trị viên hệ thống đặt thì không áp dụng.</span>


### Khác
- Khi đã cập nhật từ phiên bản thấp hơn v3.3.0 lên v3.3.0 trở lên, nếu đăng nhập bằng provider có mã người dùng chứa "dấu chấm (.)" thì có thể bị lỗi.  
Khi đó, hãy sửa như sau.
    - Ở "Cài đặt cột tùy chỉnh" của bảng "Người dùng", mở màn hình chỉnh sửa cột "Mã người dùng".
    - Ở tùy chọn "Ký tự được phép", đánh dấu ""." (dấu chấm)" rồi lưu.


- Với thiết lập lúc đầu, dù đóng trình duyệt khi đang đăng nhập, trạng thái đăng nhập vẫn tiếp tục cho đến khi qua một khoảng thời gian nhất định (120 phút).  
Từ v3.6.0 trở đi, bạn đặt được để tự động đăng xuất khi đóng trình duyệt. Hãy mở tệp ".env" rồi thêm như sau.  
※Cách sửa tệp thiết lập vui lòng xem [Danh sách giá trị thiết lập](/vi/config).

~~~
EXMENT_SESSION_EXPIRE_ON_CLOSE=true
~~~




## Lệnh đặt lại mật khẩu
Bạn đặt lại được mật khẩu của người dùng bằng lệnh.

- Quản trị viên hệ thống chạy lệnh sau trên console.

~~~
php artisan exment:resetpassword --email=foobar@test.com --password=P@ssw0rd!
~~~

- Lệnh này đặt mật khẩu "P@ssw0rd!" cho người dùng có địa chỉ email "foobar@test.com".


### Tham số của lệnh

```
exment:resetpassword {--id=} {--email=} {--user_code=} {--password=} {--random=0} {--send=0} {--reset_first_login=0}
```

#### Tham số: chỉ định người dùng
※Bắt buộc có một trong các tham số sau. Khi chỉ định nhiều tham số, hệ thống tìm theo thứ tự ưu tiên id > email > user_code.

- ##### id
ID đăng nhập của người dùng đối tượng.

- ##### email
Địa chỉ email của người dùng đối tượng.

- ##### user_code
Mã người dùng của người dùng đối tượng.


#### Tham số: mật khẩu
※Hãy chỉ định "password" hoặc "random=1". Khi chỉ định cả hai, "password" được ưu tiên.

- ##### password  
Chỉ định chuỗi mật khẩu mới.

- ##### random  
Chỉ định 1 khi muốn tạo mật khẩu ngẫu nhiên. Nếu không chỉ định, giá trị là 0.

#### Tham số: tùy chọn

- ##### send  
Chỉ định 1 khi muốn gửi mật khẩu mới cho người dùng đối tượng bằng email. Nếu không chỉ định, giá trị là 0.

- ##### reset_first_login  
Sau khi đổi mật khẩu, khi người dùng đăng nhập lần đầu, màn hình đổi mật khẩu hiện ra. Nếu không chỉ định, giá trị là 0.  
※Dù không chỉ định tùy chọn này, nếu trong thiết lập đăng nhập, "Yêu cầu đổi mật khẩu khi đăng nhập lần đầu" là YES thì khi người dùng đăng nhập lần đầu, màn hình đổi mật khẩu vẫn hiện ra.

### Ghi chú đặc biệt
- Khi chỉ định "random=1" mà không chỉ định "send=1", sau khi đặt lại, mật khẩu mới được hiện trên console.


### Ví dụ chạy lệnh

~~~
# Ví dụ: đặt lại mật khẩu cho người dùng có id 1 bằng mật khẩu được chỉ định
php artisan exment:resetpassword --id=1 --password=P@ssw0rd!

# Ví dụ: đặt mật khẩu ngẫu nhiên cho người dùng có mã người dùng "user1" và gửi email
php artisan exment:resetpassword --user_code=user1 --random=1 --send=1

# Ví dụ: đặt mật khẩu ngẫu nhiên cho người dùng có địa chỉ email "foobar@test.com"
php artisan exment:resetpassword --email=foobar@test.com --random=1
Đã đặt lại mật khẩu. Mật khẩu mới: XXXXXXXXXX #Mật khẩu sau khi đổi được xuất ra console
~~~
