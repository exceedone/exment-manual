# Thiết lập máy chủ
Trang này tóm tắt các thiết lập máy chủ Web và cơ sở dữ liệu cần chuẩn bị trước khi cài Exment.  
Hãy thiết lập theo các bước hợp với môi trường của bạn.

Trên trang này có 4 việc cần làm.

1. Chuẩn bị máy chủ Web (mục "Máy chủ Web" ở dưới)
2. Cài composer (mục "Cài đặt composer" ở dưới)
3. Chuẩn bị cơ sở dữ liệu (mục "Cơ sở dữ liệu" ở dưới)
4. Cài đặt ứng dụng Exment (mục "Cài đặt ứng dụng" ở dưới)

Phiên bản PHP và cơ sở dữ liệu cần có được ghi ở mục "Môi trường hoạt động" ở dưới.

- <span class="red bold">※Chúng tôi không nhận các câu hỏi riêng về các bước cài đặt và xây dựng máy chủ. Nếu cần hỗ trợ riêng, vui lòng dùng dịch vụ hỗ trợ có trả phí.</span>
- Chúng tôi không có tài liệu hướng dẫn cho các môi trường không có trong danh sách dưới đây. Mong bạn thông cảm.

## Máy chủ Web
Hãy chuẩn bị máy chủ Web theo một trong các hướng dẫn dưới đây.  
※Nếu xây dựng từ đầu một môi trường có PHP, Apache và MySQL để làm môi trường phát triển, chúng tôi khuyến nghị sử dụng XAMPP.  

- [Xây dựng với XAMPP (môi trường phát triển / kiểm thử) Windows](/vi/install_xampp)  
→Khi trước hết muốn cài đặt Exment trên máy tính cá nhân của mình (bản Windows)

- [Xây dựng với XAMPP (môi trường phát triển / kiểm thử) Mac](/vi/install_xampp_mac)  
→Khi trước hết muốn cài đặt Exment trên máy tính cá nhân của mình (bản Mac)

- [Xây dựng trên máy chủ thuê](/vi/install_rental)  
→Khi muốn công khai Exment và dễ dàng truy cập từ các thành viên khác hoặc từ điện thoại thông minh

- [Xây dựng trên Linux](/vi/install_centos_stream)  
→Các bước cài đặt Exment trên Linux (CentOS Stream)  
 ※Nếu bạn đã xây dựng trên CentOS8, vui lòng xem [tại đây](/vi/install_linux)

- [Xây dựng trên IIS](/vi/install_iis)  
→Các bước xây dựng Exment trên IIS

- [Xây dựng trên AWS - cấu hình đơn](/vi/install_aws_single)  
→Các bước xây dựng Exment trên AWS với cấu hình đơn (single)

- [Xây dựng trên AWS - cấu hình dự phòng](/vi/install_aws)  
→Các bước xây dựng Exment trên AWS với cấu hình dự phòng (redundancy)

- [Xây dựng bằng Docker](/vi/install_docker)  
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

    - [MySQL](/vi/install_mysql)
    - [SQL Server](/vi/install_sqlserver)

### Tạo cơ sở dữ liệu

- Hãy tạo cơ sở dữ liệu dành cho Exment trên hệ quản trị cơ sở dữ liệu bạn sử dụng.  


## Cài đặt ứng dụng
Sau khi xây dựng môi trường xong, hãy cài đặt ứng dụng Exment theo một trong các phương pháp dưới đây.

1. **Cài đặt đơn giản**  
→Cách cài đặt theo hướng dẫn hiện trên màn hình Web. Các bước vui lòng xem [Cài đặt đơn giản](/vi/quickstart_easy).

1. **Cài đặt thủ công**  
→Cách cài đặt bằng tay, dùng lệnh. Các bước vui lòng xem [Cài đặt thủ công](/vi/quickstart_manual).


## Môi trường hoạt động
### Máy chủ
- PHP 8.2 trở lên (`^8.2.0`. Exment7.0.0 yêu cầu PHP8.2 trở lên, theo yêu cầu của Laravel12 mà Exment đang sử dụng)
- Laravel12.X (từ Exment7.0.0, phiên bản Laravel đã được đổi thành 12.X)
- ※Với Exment v6.x: PHP 8.2, Laravel10.X.
- Cơ sở dữ liệu: một trong các loại sau
    - MySQL 8.0 trở lên
    - MariaDB 10.11 trở lên
    - SQL Server 13.0.0 trở lên
- Phần mở rộng gd của PHP (có FreeType, dùng được `imagettftext`): dùng cho PDF nhãn mã vạch 2 chiều. Nếu không có, việc tạo PDF nhãn sẽ báo lỗi. Cách kiểm tra và cách cài vui lòng xem [Thiết lập mã vạch 2 chiều](/vi/2d_barcode).

### Trình duyệt đã kiểm tra hoạt động
- Google Chrome
- Microsoft Edge


### Thiết lập khuyến nghị

- Dung lượng bộ nhớ tối đa cho phép của PHP: 512MB
- Dung lượng tải tệp lên tối đa: 10MB
- Thời gian chờ (timeout): 180 giây


## Kiểm tra yêu cầu hệ thống

Bạn kiểm tra được, trên màn hình hoặc bằng lệnh, xem máy chủ có đáp ứng yêu cầu của Exment không và các giá trị thiết lập có đủ không.  

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_windows4.png)  


### Cách kiểm tra
Kiểm tra được bằng một trong các cách sau.

- Màn hình cài đặt của [cài đặt đơn giản](/vi/quickstart_easy)
- Sau khi cài đặt, [màn hình thiết lập hệ thống](/vi/system_setting)
- Bằng lệnh (mục "Thực hiện bằng lệnh" ở dưới)

### Chi tiết các mục kiểm tra

#### Giới hạn dung lượng bộ nhớ sử dụng
Đây là giới hạn trên của dung lượng bộ nhớ dùng được để chạy PHP.    
Cách thay đổi vui lòng xem [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini).

#### Số lượng tối đa có thể POST trong một lần
Đây là giới hạn trên của số tham số POST mà PHP nhận được trong một lần. Ở một số màn hình, khi lưu cần gửi rất nhiều mục, vì vậy chúng tôi khuyên bạn thay đổi giới hạn này.  
Cách thay đổi vui lòng xem [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini).

#### Giới hạn dung lượng tệp tải lên
Đây là giới hạn trên của dung lượng tệp khi tải tệp lên. Dung lượng cần thiết khác nhau tùy theo yêu cầu đối với các tệp bạn muốn quản lý.  
Cách thay đổi vui lòng xem [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini).

#### Thời gian chờ (timeout)
Đây là số giây chờ xử lý trước khi bị coi là hết thời gian. Nếu thời gian này ngắn, các xử lý tốn thời gian như sao lưu, nhập (import) có thể vượt quá thời gian này.  
Cách thay đổi vui lòng xem [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini).

#### Quyền truy cập tệp
Kiểm tra các quyền truy cập tệp cần thiết để chạy Exment.  
Chi tiết vui lòng xem mục [Thiết lập quyền truy cập tệp](/vi/server?id=thiết-lập-quyền-truy-cập-tệp) ở trên.


#### Cài đặt Composer
Kiểm tra xem Composer, được dùng để cập nhật Exment, đã được cài đặt trên máy chủ Web hay chưa.  
※Có trường hợp cảnh báo vẫn hiển thị dù composer thực tế đã được cài đặt. Nguyên nhân có thể là người dùng chạy máy chủ Web chưa được thiết lập đường dẫn (PATH) đến composer, hoặc không đủ quyền.  
Nếu composer đã được cài đặt bình thường và người dùng thực tế thực hiện cập nhật có thể chạy được composer, hãy bỏ qua cảnh báo này.  
※Để thiết lập đường dẫn đến composer, vui lòng thử theo mục về cách thiết lập đường dẫn của composer trong [Xử lý sự cố](/vi/troubleshooting).



#### Sao lưu và khôi phục
Kiểm tra xem các thiết lập máy chủ để thực hiện sao lưu và khôi phục đã hoàn tất hay chưa.  
※Nếu xảy ra lỗi, vui lòng xem mục về việc sao lưu và khôi phục thất bại trong [Xử lý sự cố](/vi/troubleshooting).  
※Nếu sử dụng SQL Server, mục này luôn hiển thị cảnh báo. Cần sao lưu và khôi phục thủ công. Các bước vui lòng xem [Sao lưu và khôi phục SQL Server](/vi/backup_sqlserver).


### Hiển thị kết quả
#### Bình thường
Được hiển thị bằng dấu kiểm màu xanh lá.

![Màn hình cài đặt_Thiết lập](../img/quickstart/setting_require1.png)  

Bấm vào một dòng thì nội dung chi tiết hiện ra.

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
