# Thiết lập máy chủ
- Để sử dụng Exment, trước tiên cần thiết lập máy chủ Web và thiết lập cơ sở dữ liệu.  
Tùy theo môi trường sử dụng, vui lòng thực hiện thiết lập theo các bước dưới đây.  

- <span class="red bold">※Rất tiếc, hiện tại chúng tôi không tiếp nhận các câu hỏi riêng lẻ về quy trình cài đặt hoặc xây dựng máy chủ. Nếu cần được hỗ trợ riêng, vui lòng sử dụng dịch vụ hỗ trợ có trả phí.</span>

- Hiện tại, chúng tôi chưa có tài liệu hướng dẫn cho các môi trường khác ngoài những môi trường dưới đây. Mong bạn thông cảm.

## Máy chủ Web
Đây là các bước xây dựng máy chủ Web. Vui lòng xây dựng máy chủ Web theo một trong các hướng dẫn dưới đây.  
※Nếu xây dựng từ đầu một môi trường có PHP, Apache và MySQL để làm môi trường phát triển, chúng tôi khuyến nghị sử dụng XAMPP.  

- [Xây dựng với XAMPP (môi trường phát triển / kiểm thử) Windows](/install_xampp)  
→Khi trước hết muốn cài đặt Exment trên máy tính cá nhân của mình (bản Windows)

- [Xây dựng với XAMPP (môi trường phát triển / kiểm thử) Mac](/install_xampp_mac)  
→Khi trước hết muốn cài đặt Exment trên máy tính cá nhân của mình (bản Mac)

- [Xây dựng trên máy chủ thuê](/install_rental)  
→Khi muốn công khai Exment và dễ dàng truy cập từ các thành viên khác hoặc từ điện thoại thông minh

- [Xây dựng trên Linux](/install_centos_stream)  
→Các bước cài đặt Exment trên Linux (CentOS Stream)  
 ※Nếu bạn đã xây dựng trên CentOS8, vui lòng xem [tại đây](/install_linux)

- [Xây dựng trên IIS](/install_iis)  
→Các bước xây dựng Exment trên IIS

- [Xây dựng trên AWS - cấu hình đơn](/install_aws_single)  
→Các bước xây dựng Exment trên AWS với cấu hình đơn (single)

- [Xây dựng trên AWS - cấu hình dự phòng](/install_aws)  
→Các bước xây dựng Exment trên AWS với cấu hình dự phòng (redundancy)

- [Xây dựng bằng Docker](/install_docker)  
→Các bước xây dựng Exment bằng Docker



### Thiết lập quyền truy cập tệp

Trong thư mục dự án của Exment, các thư mục và tệp dưới đây cần được cấp quyền ghi cho người dùng chạy máy chủ Web (apache, www-data, v.v.).  

| Loại | Tên tệp / thư mục | Chức năng cần đến |
| ---- | ---- | ---- |
| Thư mục | storage | Tất cả chức năng |
| Thư mục | bootstrap/cache | Tất cả chức năng |
| Tệp | .env | Cài đặt đơn giản, khôi phục |
| Thư mục | config | Cài đặt đơn giản, khôi phục |
| Thư mục | app | Cài đặt đơn giản |
| Thư mục | public | Cài đặt đơn giản |
| Thư mục | resources | Cài đặt đơn giản |

- Các quyền dành cho cài đặt đơn giản chỉ cần thiết tại thời điểm cài đặt. Nếu muốn thiết lập quyền chặt chẽ hơn, hãy xóa quyền ghi của các thư mục sau khi thực hiện cài đặt đơn giản.

#### Tự động tạo các thư mục ban đầu
- Cấu trúc thư mục ban đầu cũng có thể được tạo tự động bằng lệnh dưới đây.  
    - --user=(Tên người dùng. Nếu không chỉ định, màn hình nhập sẽ hiển thị sau khi chạy lệnh)
    - --group=(Tên nhóm. Nếu không chỉ định, màn hình nhập sẽ hiển thị sau khi chạy lệnh)
    - --easy=(Đặt là 1 nếu cài đặt Exment bằng cài đặt đơn giản. Mặc định là 0)
    - --easy_clear=(Đặt là 1 nếu muốn đưa quyền thư mục về mức phù hợp sau khi thực hiện cài đặt đơn giản. Mặc định là 0)

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}

# Trường hợp cài đặt thủ công
php artisan exment:setup-dir
# Trường hợp cài đặt đơn giản
php artisan exment:setup-dir --easy=1
# Trường hợp đưa quyền thư mục về như ban đầu sau khi hoàn tất cài đặt đơn giản
php artisan exment:setup-dir --easy_clear=1
```



## Cài đặt composer
Exment yêu cầu máy chủ Web phải được cài đặt composer. composer được dùng để cài đặt các gói cần thiết cho Exment và để cập nhật Exment.  
Về cách cài đặt, vui lòng tham khảo các URL dưới đây.  
- [Trang chính thức](https://getcomposer.org/download/)
- [Trang hướng dẫn cho Windows](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Trang hướng dẫn cho Linux](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Trang hướng dẫn cho Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


## Cơ sở dữ liệu
Exment yêu cầu một trong các hệ quản trị cơ sở dữ liệu sau.

- MySQL 8.0 trở lên
- MariaDB 10.11 trở lên
- SQL Server 13.0.0 trở lên (hiện chưa hỗ trợ sao lưu và khôi phục tự động)

### Xây dựng môi trường cơ sở dữ liệu
- Nếu chưa thiết lập máy chủ cơ sở dữ liệu, hãy xây dựng máy chủ cơ sở dữ liệu.  
Về cách xây dựng, vui lòng xem các liên kết dưới đây.  
※Không cần thực hiện nếu đã cài đặt sẵn.  

    - [MySQL](/install_mysql)
    - [SQL Server](/install_sqlserver)

### Tạo cơ sở dữ liệu

- Hãy tạo cơ sở dữ liệu dành cho Exment trên hệ quản trị cơ sở dữ liệu bạn sử dụng.  


## Cài đặt ứng dụng
Sau khi xây dựng môi trường xong, hãy cài đặt ứng dụng Exment theo một trong các phương pháp dưới đây.

1. **Cài đặt đơn giản**  
→Cài đặt ứng dụng theo các bước được hiển thị trên màn hình Web. Về cách cài đặt, vui lòng xem [tại đây](/ja/quickstart_easy) (tiếng Nhật).

1. **Cài đặt thủ công**  
→Cài đặt ứng dụng Exment một cách thủ công bằng lệnh. Về cách cài đặt, vui lòng xem [tại đây](/quickstart_manual).


## Môi trường hoạt động
### Máy chủ
- PHP 8.2 trở lên (`^8.2.0`. Exment7.0.0 yêu cầu PHP8.2 trở lên, theo yêu cầu của Laravel12 mà Exment đang sử dụng)
- Laravel12.X (từ Exment7.0.0, phiên bản Laravel đã được đổi thành 12.X)
- ※Với Exment v6.x: PHP 8.2, Laravel10.X.
- Cơ sở dữ liệu: một trong các loại sau
    - MySQL 8.0 trở lên
    - MariaDB 10.11 trở lên
    - SQL Server 13.0.0 trở lên
- Phần mở rộng gd của PHP có FreeType (dùng được `imagettftext`): dùng để tạo PDF nhãn mã vạch 2 chiều. Nếu không có, việc tạo PDF nhãn sẽ báo lỗi.
    - docker-exment: cập nhật docker-exment (từ PR #23, 2026-11-23) và build lại image php (`docker compose build php`, sau đó `docker compose up -d`).
    - Máy chủ khác: cài gd có FreeType (gói php-gd của bản phân phối thường đã có). Kiểm tra bằng `php -r 'var_dump(function_exists("imagettftext"));'`; nếu hiện `bool(true)` là dùng được.

### Trình duyệt đã kiểm tra hoạt động
- Google Chrome
- Microsoft Edge


### Thiết lập khuyến nghị

- Dung lượng bộ nhớ tối đa cho phép của PHP: 512MB
- Dung lượng tải tệp lên tối đa: 10MB
- Thời gian chờ (timeout): 180 giây


## Kiểm tra yêu cầu hệ thống

Bạn có thể kiểm tra các yêu cầu hệ thống và giá trị thiết lập của máy chủ từ màn hình hoặc bằng lệnh.  

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_windows4.png)  


### Cách kiểm tra
Có thể kiểm tra các yêu cầu hệ thống, v.v. bằng những cách sau.

- Màn hình cài đặt của [cài đặt đơn giản](/ja/quickstart_easy) (tiếng Nhật)
- Sau khi cài đặt, [màn hình thiết lập hệ thống](/vi/system_setting)
- Bằng lệnh. Chi tiết xem bên dưới

### Chi tiết các mục kiểm tra

#### Giới hạn dung lượng bộ nhớ sử dụng
Đây là giới hạn trên của dung lượng bộ nhớ được cấp phát để chạy PHP.    
Về cách thay đổi thiết lập, vui lòng xem [tại đây](/additional_php_ini).

#### Số lượng tối đa có thể POST trong một lần
Đây là giới hạn trên của số tham số POST được cấp phát để chạy PHP. Ở một số màn hình, khi lưu dữ liệu cần gửi một lượng lớn các mục, vì vậy chúng tôi khuyến nghị thay đổi giới hạn số tham số POST.  
Về cách thay đổi thiết lập, vui lòng xem [tại đây](/additional_php_ini).

#### Giới hạn dung lượng tệp tải lên
Đây là giới hạn trên của dung lượng tệp khi tải tệp lên. Dung lượng cần thiết khác nhau tùy theo yêu cầu đối với các tệp bạn muốn quản lý.  
Về cách thay đổi thiết lập, vui lòng xem [tại đây](/additional_php_ini).

#### Thời gian chờ (timeout)
Đây là số giây chờ xử lý trước khi bị coi là hết thời gian. Nếu thời gian này ngắn, các xử lý tốn thời gian như sao lưu, nhập (import) có thể vượt quá thời gian này.  
Về cách thay đổi thiết lập, vui lòng xem [tại đây](/additional_php_ini).

#### Quyền truy cập tệp
Kiểm tra các quyền truy cập tệp cần thiết để chạy Exment.  
Chi tiết vui lòng xem [tại đây](/vi/server?id=thiết-lập-quyền-truy-cập-tệp).


#### Cài đặt Composer
Kiểm tra xem Composer, được dùng để cập nhật Exment, đã được cài đặt trên máy chủ Web hay chưa.  
※Có trường hợp cảnh báo vẫn hiển thị dù composer thực tế đã được cài đặt. Nguyên nhân có thể là người dùng chạy máy chủ Web chưa được thiết lập đường dẫn (PATH) đến composer, hoặc không đủ quyền.  
Nếu composer đã được cài đặt bình thường và người dùng thực tế thực hiện cập nhật có thể chạy được composer, hãy bỏ qua cảnh báo này.  
※Để thiết lập đường dẫn đến composer, vui lòng thử kiểm tra theo mục "To pass the composer path" [tại đây](/troubleshooting?id=to-pass-the-composer-path).



#### Sao lưu và khôi phục
Kiểm tra xem các thiết lập máy chủ để thực hiện sao lưu và khôi phục đã hoàn tất hay chưa.  
※Nếu xảy ra lỗi, vui lòng xem mục về lỗi sao lưu và khôi phục thất bại [tại đây](/troubleshooting).  
※Nếu sử dụng SQL Server, mục này luôn hiển thị cảnh báo. Cần sao lưu và khôi phục thủ công. Về các bước thực hiện, vui lòng xem [tại đây](/backup_sqlserver).


### Hiển thị kết quả
#### Bình thường
Được hiển thị bằng dấu kiểm màu xanh lá.

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_require1.png)  

Ngoài ra, nhấp vào một dòng để hiển thị chi tiết.

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_require2.png)  

#### Cảnh báo
Biểu tượng cảnh báo màu vàng được hiển thị. Đây là nội dung được khuyến nghị thay đổi thiết lập, hoặc có một số điểm cần lưu ý khi vận hành.

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_require3.png)  

#### Lỗi
Dấu X màu đỏ được hiển thị. Cần thay đổi thiết lập.

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_require4.png)  


### Thực hiện bằng lệnh

Cũng có thể kiểm tra yêu cầu hệ thống bằng lệnh dưới đây.

```
php artisan exment:checkrequire
```

[←Quay lại Quy trình cài đặt](/vi/quickstart)
