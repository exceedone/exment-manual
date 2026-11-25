# Đăng nhập một lần (SSO)
Trong các thiết lập khi đăng nhập vào Exment, trang này nói về đăng nhập một lần (SSO).  
SSO là cách cho phép đăng nhập vào Exment bằng tài khoản của dịch vụ khác (Google, Office365, v.v.).

- Các phương thức đăng nhập dùng được có ở mục "Phương thức đăng nhập" dưới đây.
- Cách mở màn hình thiết lập có ở mục "Cách quản lý thiết lập đăng nhập" dưới đây.

## Phương thức đăng nhập
Ngoài đăng nhập tiêu chuẩn, Exment còn có một số phương thức đăng nhập khác.

| Phương thức | Đăng nhập như thế nào | Trang thiết lập |
|---|---|---|
| Tiêu chuẩn | Đăng nhập bằng người dùng và mật khẩu đã đăng ký trong Exment | - |
| OAuth | Đăng nhập trên màn hình của provider đã đăng ký trước (Google, v.v.) | [Đăng nhập một lần (OAuth)](/vi/login_oauth) |
| SAML | Đăng nhập trên màn hình của provider đã đăng ký trước (Keycloak, v.v.) | [Đăng nhập một lần (SAML)](/vi/login_saml) |
| LDAP | Nhập ID và mật khẩu của LDAP (Active Directory, v.v.) trên trang đăng nhập của Exment | [Thiết lập đăng nhập (LDAP)](/vi/login_ldap) |

### Tiêu chuẩn
Đây là phương thức đăng ký người dùng vào cơ sở dữ liệu của Exment, đặt mật khẩu, rồi đăng nhập bằng người dùng và mật khẩu đó.  


### OAuth
Đây là phương thức đăng nhập bằng đăng nhập một lần theo dạng OAuth.  
Khi bấm nút đăng nhập, màn hình chuyển sang màn hình đăng nhập của provider đã đăng ký trước, và bạn đăng nhập ở đó.  

- [Đăng nhập một lần (OAuth)](/vi/login_oauth)
  
※Ví dụ về provider:  

- Google
- Facebook
- Office365


### SAML
Đây là phương thức đăng nhập bằng đăng nhập một lần theo dạng SAML.  
Khi bấm nút đăng nhập, màn hình chuyển sang màn hình đăng nhập của provider đã đăng ký trước, và bạn đăng nhập ở đó.  
  
- [Đăng nhập một lần (SAML)](/vi/login_saml)
  
※Ví dụ về provider:  

- OpenAM
- Keycloak
- ADFS


### LDAP
Đây là phương thức đăng nhập theo dạng LDAP.  
Trên trang đăng nhập của Exment, khi nhập thông tin người dùng vào ô ID và mật khẩu rồi bấm nút đăng nhập, hệ thống xác thực bằng LDAP và lấy thông tin người dùng về.  
  
- [Thiết lập đăng nhập (LDAP)](/vi/login_ldap)
  
※Ví dụ về provider:  

- Active Directory


## Cách quản lý thiết lập đăng nhập

- Quản trị viên hệ thống mở URL sau.  
http(s)://(URL của Exment)/login_setting  
※Truy cập được sau khi làm việc "thay đổi thiết lập hệ thống" đã ghi ở trên.

> ※URL này là của thiết lập tiêu chuẩn không có "/admin" (trang cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (trang cài ở phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của trang (ví dụ: `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết vui lòng xem [Thay đổi hoặc xóa "admin" trong URL](/vi/additional_prefix).

- Từ v7.1.0 trở đi, cũng mở được từ "Cài đặt quản trị" → "Cài đặt đăng nhập" ở menu bên trái.
- Ở v7.0 trở về trước, hãy thêm "Cài đặt đăng nhập" vào menu.  
Mở trang "Cài đặt quản trị" > "Menu" rồi chọn loại menu "Menu hệ thống". "Cài đặt đăng nhập" sẽ hiện ở mục đối tượng, hãy chọn rồi lưu.  
※Ở v7.0 trở về trước, với thiết lập mặc định, "Cài đặt đăng nhập" không hiện trên menu.

![Danh sách thiết lập đăng nhập](../img/login/login_setting4.png)  

- Khi thêm provider SSO mới, bấm nút "+ Tạo mới" ở góc trên bên phải. Nội dung cần nhập vui lòng xem ở trang của từng phương thức.  
    - [Đăng nhập một lần (OAuth)](/vi/login_oauth)
    - [Đăng nhập một lần (SAML)](/vi/login_saml)
    - [Thiết lập đăng nhập (LDAP)](/vi/login_ldap)
  

### Thiết lập SSO
Đây là thiết lập chung của toàn bộ SSO.  
※Chỉ hiện khi có ít nhất 1 SSO đang được bật.

#### Hiển thị đăng nhập mặc định
Đặt thành YES thì form đăng nhập bằng ID và mật khẩu của Exment, cùng nút đăng nhập, hiện ra.  
※Khi chỉ muốn cho đăng nhập bằng SAML hoặc OAuth, hãy đặt NO. Form đăng nhập mặc định, nơi nhập ID người dùng và mật khẩu, sẽ không hiện nữa.

![Màn hình đăng nhập SSO](../img/quickstart/sso1.png)


#### Chuyển hướng đến đăng nhập SSO
Đặt thành YES thì khi người dùng mở màn hình đăng nhập, hệ thống không hiện trang đăng nhập của Exment mà chuyển thẳng sang trang đăng nhập SSO.  
※Có hiệu lực khi tổng số provider SAML và OAuth chỉ là 1.

#### Tên miền được phép đăng nhập
Nhập khi muốn đặt các tên miền được phép đăng nhập. Khi có nhiều tên miền, hãy nhập mỗi tên miền trên một dòng.  
Khi người dùng không thuộc các tên miền đã nhập đăng nhập, lỗi sẽ hiện ra.  



### Vô hiệu hóa thiết lập đăng nhập SSO
Nếu vì lý do nào đó muốn buộc tắt thiết lập đăng nhập SSO, hãy làm thiết lập sau.

- Mở tệp ".env" ở thư mục của dự án rồi thêm như sau.  
※Cách sửa tệp thiết lập vui lòng xem [Danh sách giá trị thiết lập](/vi/config).

~~~
EXMENT_CUSTOM_LOGIN_DISABLED=true
~~~

Khi làm thiết lập này, form đăng nhập thông thường bằng ID và mật khẩu hiện ra trên màn hình đăng nhập.


### Về việc kiểm tra dữ liệu (validation) khi đăng nhập SSO
Khi đăng nhập bằng SSO, thông tin người dùng nhận từ provider (sau đây gọi là "người dùng provider") được kiểm tra (validation) theo các quy tắc sau.  

- Khi thông tin của cột là "Bắt buộc" trong bảng người dùng không có trong người dùng provider, sẽ có lỗi.
- Khi trong thiết lập SSO, "Tạo người dùng mới" là YES và đây là lần đầu đăng nhập vào Exment, hệ thống kiểm tra theo thiết lập của bảng người dùng trong Exment (thiết lập ký tự được phép, độ dài chuỗi, v.v.).
- Khi trong thiết lập SSO, "Cập nhật thông tin người dùng" là YES và người đăng nhập là người dùng đã đăng ký trong Exment, hệ thống cũng kiểm tra theo thiết lập của bảng người dùng trong Exment (thiết lập ký tự được phép, độ dài chuỗi, v.v.).

Khi có lỗi, nguyên nhân được hiện trên màn hình. Nguyên nhân cũng được ghi ra tệp log.


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
