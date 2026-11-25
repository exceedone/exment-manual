# Các bước cài đặt SQL Server
Đây là các bước để dùng SQL Server làm cơ sở dữ liệu của Exment.

- <span class="red bold">※ Hiện tại chưa hỗ trợ chức năng sao lưu và khôi phục.</span>
- Các bước có thể khác tùy theo hệ điều hành, phiên bản, thời điểm cài đặt, v.v.

## Trình tự các bước
1. **Chuẩn bị SQL Server** (cài đặt, tạo cơ sở dữ liệu và người dùng) … "Thiết lập SQL Server"
2. **Kiểm tra có kết nối được không** … "Kiểm tra kết nối"
3. **Kết nối từ Exment** (cài driver của PHP rồi cài Exment) … "Thiết lập Exment"

## Thiết lập SQL Server

### Cài đặt SQL Server
1. Tải SQL Server từ trang sau.  
※ Hãy chọn edition phù hợp với mục đích sử dụng, quy mô kinh doanh, v.v.  
[Tải SQL Server](https://www.microsoft.com/ja-jp/sql-server/sql-server-downloads)  

2. Chạy tệp đã tải và tiến hành cài đặt.  
![Cài đặt SQL Server](../img/database/sqlserver1.png)  

3. Việc cài đặt kết thúc.

### Cài đặt SQL Server Management Studio (công cụ GUI)
SQL Server Management Studio là công cụ để thao tác SQL Server trên màn hình.

- Mở trang sau.  
Ở "Available languages" (ngôn ngữ có thể dùng), bấm vào ngôn ngữ bạn muốn dùng để tải công cụ, rồi cài đặt.  
https://docs.microsoft.com/ja-jp/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15#available-languages



### Thiết lập bổ sung (Windows)
※ Hiện tại đã xác nhận rằng khi cài SQL Server trên Windows thì cần các thiết lập dưới đây.

1. Từ menu Start của Windows, mở "SQL Server Configuration Manager".  
![Cài đặt SQL Server](../img/database/sqlserver5.png)  

2. Ở menu bên trái, bấm "SQL Server Network Configuration" → "Protocols for (tên edition)". Sau đó bấm chuột phải vào "TCP/IP" và bấm "Enable".  
![Cài đặt SQL Server](../img/database/sqlserver6.png)  
![Cài đặt SQL Server](../img/database/sqlserver7.png)  
![Cài đặt SQL Server](../img/database/sqlserver8.png)  

3. Bấm nút menu Start, nhập "Services" và chạy ứng dụng "Services" được hiển thị.  
![Cài đặt SQL Server](../img/database/sqlserver11.png)  

4. Trong danh sách dịch vụ, chọn "SQL Server (tên edition)" và bấm "Restart the service".  
![Cài đặt SQL Server](../img/database/sqlserver12.png)  


### Tạo cơ sở dữ liệu, thêm người dùng
1. Chạy "SQL Server Management Studio".  
![Cài đặt SQL Server](../img/database/sqlserver13.png)  

2. Đăng nhập.  
![Cài đặt SQL Server](../img/database/sqlserver14.png)  

#### Tạo cơ sở dữ liệu
1. Ở menu bên trái, bấm chuột phải vào thư mục "Databases" và bấm "New Database".  
![Cài đặt SQL Server](../img/database/sqlserver15.png)  

2. Nhập tên cơ sở dữ liệu tùy ý và bấm OK.  
![Cài đặt SQL Server](../img/database/sqlserver16.png)  

#### Thêm người dùng
1. Ở menu bên trái, bấm chuột phải vào "Security" → "Logins" và chọn "New Login".  
![Cài đặt SQL Server](../img/database/sqlserver17.png)  

2. Nhập tên đăng nhập và mật khẩu, rồi chọn "SQL Server authentication". Với "Enforce password policy", khuyến nghị bỏ dấu chọn. (Hãy làm theo chính sách của công ty, tổ chức của bạn.)  
![Cài đặt SQL Server](../img/database/sqlserver18.png)    

3. Chọn "User Mapping" ở phía trên bên trái.  
Trong danh sách cơ sở dữ liệu ở "Users mapped to this login", chọn cơ sở dữ liệu vừa tạo.  
Ở "Database role membership", chọn các mục sau.
   - db_backupoperator
   - db_ddladmin
   - db_datawriter
   - db_datareader
   - public
   - dbcreator (※ Dùng cho việc sao lưu và khôi phục dữ liệu bằng tay. Nếu bạn sao lưu và khôi phục dữ liệu bằng tay thì hãy chọn mục này.)

   ![Cài đặt SQL Server](../img/database/sqlserver19.png)    

4. Khi xong tất cả, bấm OK.

#### Thiết lập đăng nhập máy chủ
1. Ở menu bên trái, bấm chuột phải vào máy chủ ở phía trên bên trái và chọn "Properties".  
![Cài đặt SQL Server](../img/database/sqlserver20.png) 

2. Ở menu "Security", chọn "SQL Server and Windows Authentication mode" cho "Server authentication" và bấm OK.

3. Bấm nút menu Start, nhập "Services" và chạy ứng dụng "Services" được hiển thị.  
![Cài đặt SQL Server](../img/database/sqlserver11.png)  

4. Trong ứng dụng "Services", chọn lại "SQL Server (tên edition)" và bấm "Restart the service".  
![Cài đặt SQL Server](../img/database/sqlserver12.png)  

#### Kiểm tra cổng
- Trong "SQL Server Configuration Manager", bấm chuột phải vào "TCP/IP" và bấm "Properties".  
Sau đó mở tab "IP Addresses" và kiểm tra giá trị "TCP Dynamic Ports" ở dưới cùng. (Giá trị này sẽ dùng sau, ở phần thiết lập cơ sở dữ liệu của Exment.)  
![Cài đặt SQL Server](../img/database/sqlserver9.png)  
![Cài đặt SQL Server](../img/database/sqlserver10.png)  


## Kiểm tra kết nối
Kiểm tra xem có kết nối được tới SQL Server không.

1. Chạy "SQL Server Management Studio".  
![Cài đặt SQL Server](../img/database/sqlserver13.png)  

2. Đăng nhập với nội dung sau.
    - Server name (tên máy chủ): tên máy chủ mặc định
    - Authentication (xác thực): SQL Server Authentication
    - Tên người dùng: tên của người dùng đã tạo
    - Mật khẩu: mật khẩu của người dùng đã tạo

    ![Cài đặt SQL Server](../img/database/sqlserver22.png)  

3. Kiểm tra rằng đăng nhập được bình thường.  
Nếu thiết lập chưa hoàn tất đúng, lỗi sẽ xuất hiện.


## Thiết lập Exment
Xây dựng môi trường và thiết lập để kết nối từ Exment tới SQL Server.

### Cài đặt driver
Cài driver (thành phần để PHP kết nối tới SQL Server). Các bước khác nhau tùy hệ điều hành của máy chủ đang cài Exment.

#### Windows
1. Chạy lệnh sau.  
Kết quả sẽ hiện đường dẫn tệp, hãy ghi lại.

```
php -i | find "extension_dir"
# Ví dụ kết quả
extension_dir => C:\xampp\php\ext => C:\xampp\php\ext
```


2. Tải driver để PHP kết nối tới Microsoft SQL Server từ trang sau.  
https://docs.microsoft.com/ja-jp/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver15

3. Chạy tệp EXE đã tải. Hộp thoại như sau sẽ xuất hiện.  
![Cài đặt SQL Server](../img/database/sqlserver2.png)

4. Dán đường dẫn tệp đã ghi lại ở bước 1 và bấm "OK".  
![Cài đặt SQL Server](../img/database/sqlserver3.png)

5. Các tệp dll để kết nối tới SQL Server được đặt vào thư mục thư viện mở rộng của PHP.  
![Cài đặt SQL Server](../img/database/sqlserver4.png)

6. Mở tệp php.ini và ghi nội dung sau vào cuối tệp.  
※ Hãy đổi tên tệp theo nội dung của các chú thích.

```
extension=php_pdo_sqlsrv_82_ts_x64.dll
# Phần "82": phiên bản PHP đang dùng. Nếu dùng PHP8.3 thì là 83
# Phần "ts": khi chạy lệnh "php -i | find "Thread Safety"", nếu hiện "enabled" thì ghi "ts", nếu hiện "disabled" thì ghi "nts"
# Phần "x64": khi chạy lệnh "php -v", nếu dòng đầu tiên có "x64" thì ghi "x64", nếu không thì ghi "x86"
```

7. Khởi động lại PHP. Đến đây, thiết lập trên Windows đã xong.


#### Linux

Hãy cài driver ODBC và driver PHP cho từng hệ điều hành theo các bước ở [trang này](https://docs.microsoft.com/ja-jp/sql/connect/php/installation-tutorial-linux-mac?view=sql-server-ver15).


### Thiết lập Exment
- Sau đó, hãy tiến hành cài đặt theo [các bước cài đặt](/vi/quickstart).

- Ở màn hình "Cài đặt cơ sở dữ liệu", hãy nhập các giá trị sau.
    - Loại cơ sở dữ liệu : SQL Server
    - Tên máy chủ của cơ sở dữ liệu : tên máy chủ
    - Số cổng của cơ sở dữ liệu : số cổng đã kiểm tra ở màn hình TCP/IP
    - Tên cơ sở dữ liệu dùng cho Exment : tên cơ sở dữ liệu đã tạo
    - Tên người dùng của cơ sở dữ liệu dùng cho Exment : tên người dùng đã tạo
    - Mật khẩu của cơ sở dữ liệu dùng cho Exment : mật khẩu của người dùng đã tạo
