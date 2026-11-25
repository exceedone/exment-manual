# Nạp hàng loạt dữ liệu lớn
Đây là chức năng đưa cùng lúc lượng lớn dữ liệu đã chuẩn bị bằng tệp csv vào bảng tùy chỉnh, bằng lệnh trên máy chủ (bulk insert, có thể từ 1000 dữ liệu trở lên).  
Vì ưu tiên tốc độ, chức năng này không kiểm tra lỗi chi tiết.

Các bước như sau.

1. Tạo tệp csv ("Chuẩn bị dữ liệu")
2. Đặt tệp vào thư mục trên máy chủ rồi chạy lệnh ("Cách thao tác")

## Lưu ý
Bulk insert ưu tiên tốc độ. Vì vậy, vui lòng lưu ý các điểm sau.

- **Dù tệp csv đã tạo hoặc nội dung dữ liệu có sai sót, chức năng này không kiểm tra lỗi chi tiết**. Hãy kiểm tra kỹ tệp khi tạo. Khi xảy ra vấn đề, hãy kiểm tra bằng cách thử nhập một phần dữ liệu bằng chức năng nhập từ màn hình, v.v.

- Chức năng "[Thay đổi cách chỉ định dữ liệu của bảng khác](/vi/data_import_export?id=thay-đổi-cách-chỉ-định-dữ-liệu-của-bảng-khác)" làm được với [nhập thông thường](/vi/data_import_export) thì không làm được với chức năng này. Hãy ghi id vào cột rồi nhập.


## Chuẩn bị dữ liệu
Trước tiên, tạo tệp csv dùng để nhập.

| Quy định | Nội dung |
| ---- | ---- |
| Dòng 1 | Tên cột của bảng tùy chỉnh |
| Từ dòng 2 trở đi | Dữ liệu cần nạp |
| Tên tệp | **"(tên của bảng tùy chỉnh).csv"** (ví dụ: client.csv). Khi dữ liệu đưa vào 1 bảng được chia thành nhiều tệp, hãy thêm số thứ tự như **"(tên của bảng tùy chỉnh).số thứ tự.csv"** (ví dụ: client.01.csv) |
| Mã ký tự | <strong>UTF-8</strong> (không có BOM) |

**Khi tạo tệp bằng EXCEL, mã ký tự lúc đầu là Shift JIS. Nhất định phải chuyển mã ký tự trước, bằng trình soạn thảo văn bản, v.v.**  

### Các giá trị dùng được làm tên cột của bảng tùy chỉnh
| Mục | Giải thích |
| ---- | ---- |
| id | Khóa chính (số) ※Chỉ nhập khi muốn chỉ định |
| parent_type | Tên của bảng cha ※Chỉ nhập với dữ liệu của bảng con |
| parent_id | ID của dữ liệu cha được liên kết ※Chỉ nhập với dữ liệu của bảng con |
| deleted_at | Ngày giờ xóa dữ liệu ※Chỉ nhập khi muốn chỉ định |
| deleted_user_id | ID của người dùng đã xóa dữ liệu ※Chỉ nhập khi muốn chỉ định |
| value.(tên cột của cột tùy chỉnh) | Tên cột đã đăng ký ở cài đặt cột tùy chỉnh. Nhất định phải thêm value. ở đầu |

- Nếu không có lý do đặc biệt, chỉ ghi cột tùy chỉnh vào tệp csv (các mục khác được tự động đặt).  
- **Khác với nhập thông thường, dù chỉ định id giống với dữ liệu đang có, việc cập nhật không được thực hiện**.  

#### Tệp mẫu (client.csv)
- Đây là mẫu đưa dữ liệu vào bảng khách hàng (client). Mã khách hàng (client_code) và tên khách hàng (client_name) được nhập, và chỉ dữ liệu thứ 3 có ngày giờ xóa (deleted_at) và ID người dùng xóa (deleted_user_id).  

~~~
value.client_code,value.client_name,deleted_at,deleted_user_id
CUST001,Tên khách hàng thử 001,,
CUST002,Tên khách hàng thử 002,,
CUST003,Tên khách hàng thử 003,2019/3/20,2
CUST004,Tên khách hàng thử 004,,
CUST005,Tên khách hàng thử 005,,
CUST006,Tên khách hàng thử 006,,
CUST007,Tên khách hàng thử 007,,
CUST008,Tên khách hàng thử 008,,
CUST009,Tên khách hàng thử 009,,
~~~

## Cách thao tác

1. Tạo thư mục làm việc ở vị trí sau trên máy chủ. Tên thư mục nên là tên cho biết nội dung công việc lần này, hoặc ngày tháng, v.v.  

~~~
(thư mục gốc của dự án)/storage/app/bulkinsert/(tên thư mục)
~~~

2. Đặt các tệp csv đã tạo (có thể nhiều tệp) vào thư mục đó.

#### Ví dụ bố trí thư mục
![Thư mục làm việc dùng để nạp hàng loạt](../img/bulkinsert/folder1.png)  

3. Chạy lệnh sau ở dòng lệnh.
~~~
php artisan exment:bulkinsert {tên thư mục}
~~~

#### Ví dụ chạy lệnh
![Màn hình sao lưu](../img/bulkinsert/cmd1.png)
