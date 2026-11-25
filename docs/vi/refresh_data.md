# Làm mới dữ liệu tùy chỉnh
Đây là các bước để xóa hàng loạt (làm mới, refresh) dữ liệu tùy chỉnh đã đăng ký bằng lệnh.  
Các thiết lập (định nghĩa bảng, cài đặt hệ thống, v.v.) được giữ nguyên, chỉ dữ liệu bị xóa. Dùng trong những trường hợp như sau.

- Sau khi kiểm thử môi trường, muốn xóa toàn bộ dữ liệu đã đăng ký để kiểm thử lại.
- Sau khi chuyển từ môi trường thử nghiệm sang môi trường production, muốn xóa toàn bộ dữ liệu của môi trường production rồi bắt đầu vận hành.

Có 2 lệnh.

| Việc muốn làm | Lệnh | Phần cần xem |
|---|---|---|
| Xóa hàng loạt dữ liệu của tất cả bảng tùy chỉnh | `php artisan exment:refreshdata` | "Dữ liệu của tất cả các bảng" |
| Chỉ xóa dữ liệu của các bảng được chỉ định | `php artisan exment:refreshtable` | "Dữ liệu của bảng tùy chỉnh được chỉ định" |

Với cả hai lệnh, khuyến nghị sao lưu dữ liệu trước khi chạy.

## Dữ liệu của tất cả các bảng
Đối tượng là tất cả các bảng.  
Khi chạy lệnh, toàn bộ "Dữ liệu bị xóa" ở dưới sẽ bị xóa. Số thứ tự id cũng bắt đầu lại từ 1.


### Dữ liệu bị xóa (bao gồm cả bảng nội bộ)
- Nhật ký truy cập
- Bảng xác thực địa chỉ email
- Dữ liệu của thanh thông báo
- Lịch sử cập nhật
- Đối tượng người dùng xử lý của quy trình làm việc
- Trạng thái thực hiện của quy trình làm việc
- Chia sẻ dữ liệu tùy chỉnh
- Dữ liệu quan hệ n:n (trừ tổ chức - người dùng)
- Dữ liệu tùy chỉnh (trừ người dùng, tổ chức, mẫu thông báo)
- Tệp đính kèm của dữ liệu tùy chỉnh (trừ người dùng, tổ chức, mẫu thông báo)

### Dữ liệu không bị xóa
- Cài đặt hệ thống
- Giá trị thiết lập của bảng tùy chỉnh
- Cài đặt quy trình làm việc
- Các giá trị thiết lập khác liên quan đến hệ thống
- Thông tin đăng nhập
- Thông tin người dùng, thông tin tổ chức, dữ liệu mẫu thông báo
- Thông tin trực thuộc tổ chức - người dùng

### Cách chạy
- <span class="red bold">※ Khuyến nghị sao lưu dữ liệu trước khi chạy lệnh này.</span>
- Hãy chạy lệnh sau.

~~~
php artisan exment:refreshdata
~~~


## Dữ liệu của bảng tùy chỉnh được chỉ định
Đối tượng là các bảng tùy chỉnh được chỉ định.  
Không xóa hàng loạt tất cả; cách xóa thay đổi tùy theo loại dữ liệu (3 loại ở dưới).  
※ Không thể làm mới dữ liệu người dùng, tổ chức, mẫu thông báo.

### Dữ liệu bị xóa toàn bộ và số thứ tự id trở về 1
- Dữ liệu trong bảng tùy chỉnh được chỉ định
- Nếu bảng tùy chỉnh được chỉ định là phía cha của quan hệ 1:n: dữ liệu trong bảng tùy chỉnh phía con
- Nếu bảng tùy chỉnh được chỉ định là phía cha hoặc phía con của quan hệ n:n: thông tin dữ liệu quan hệ n:n. ※ Bản thân dữ liệu trong bảng tùy chỉnh ở đầu kia của quan hệ thì không bị xóa.

### Chỉ xóa dữ liệu liên quan đến bảng bị xóa (bao gồm cả bảng nội bộ)
- Dữ liệu của thanh thông báo
- Lịch sử cập nhật
- Đối tượng người dùng xử lý của quy trình làm việc
- Trạng thái thực hiện của quy trình làm việc
- Chia sẻ dữ liệu tùy chỉnh
- Tệp đính kèm, bình luận của dữ liệu tùy chỉnh

### Cập nhật để giá trị thành trống
- Nếu bảng bị xóa đang được dùng trong cột tùy chỉnh "Lựa chọn (từ bảng khác)" của bảng tùy chỉnh khác, dữ liệu trong bảng tùy chỉnh đó sẽ được cập nhật hàng loạt để giá trị tham chiếu thành trống.


### Cách chạy

- <span class="red bold">※ Khuyến nghị sao lưu dữ liệu trước khi chạy lệnh này.</span>
- Hãy chạy lệnh sau.

~~~
php artisan exment:refreshtable {tên bảng. Nếu nhiều bảng thì đặt trong "" và cách nhau bằng dấu phẩy}

# Ví dụ: chạy với 1 bảng
php artisan exment:refreshtable information

# Ví dụ: chạy với nhiều bảng
php artisan exment:refreshtable "table1,table2,table3"
~~~
