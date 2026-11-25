# Thiết lập bổ sung
Làm xong [các bước cài đặt](/vi/quickstart.md) là Exment chạy được.  
Tuy nhiên, để dùng một số chức năng thì cần thiết lập thêm.  
Từ danh sách dưới đây, hãy mở trang của chức năng muốn dùng rồi thiết lập theo các bước.  

### Danh sách nội dung thiết lập

- [Thay đổi / xóa "admin" trong URL](/vi/additional_prefix)  
Thay đổi hoặc bỏ giá trị như "/admin" đặt ở đầu URL (với cài đặt mới từ v7.2.1 trở đi, mặc định không có).

- [Lịch chạy tác vụ (task schedule)](/vi/additional_task_schedule)  
Thiết lập để tự động chạy xử lý vào giờ đã định, như tự động tạo bản sao lưu hay thông báo thời hạn.

- [Tắt giao tiếp từ máy chủ ra bên ngoài](/vi/additional_disable_outside_api)  
Thiết lập để dừng việc giao tiếp từ máy chủ đến máy chủ bên ngoài, như việc lấy thông tin cập nhật của Exment.

- [Bật cache](/vi/additional_cache)  
Lưu vào cache các dữ liệu master như bảng tùy chỉnh, cột, view, workflow. Tùy theo môi trường, tốc độ có thể nhanh hơn.

- [Thay đổi nơi lưu tệp](/vi/additional_file_saveplace)  
Các bước đổi nơi lưu tệp từ máy chủ cục bộ sang FTP, AWS S3, v.v.

- [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini)  
Các bước đổi kích thước tải lên của tệp đính kèm, lượng bộ nhớ PHP dùng và thời gian timeout.

- [Bộ lọc IP](/vi/additional_ip_filter)  
Giới hạn được, theo địa chỉ IP, các request đến trang Web và việc chạy API.

- [Khi xảy ra lỗi 429 với API](/vi/additional_429_too_many)  
Cách xử lý khi hiện 429 Too Many Requests lúc chạy API.

- [Thêm cột label trong API lấy dữ liệu](/vi/additional_api_label)  
Thêm được cột "label" vào kết quả khi lấy danh sách dữ liệu, hoặc khi tạo mới, cập nhật dữ liệu.

- [Thêm tùy chọn riêng cho thiết lập "Ký tự được phép" của loại cột "Văn bản một dòng"](/vi/additional_available_characters)  
Thêm được các tùy chọn dùng được trong thiết lập "Ký tự được phép" của loại cột tùy chỉnh "Văn bản một dòng".

- [Thực thi trễ xử lý thông báo](/vi/additional_queue)  
Cho một số xử lý, như thông báo, chạy sau (chạy qua queue).

- [Thiết lập reverse proxy](/vi/additional_reverse_proxy)  
Thiết lập thêm cần có ở môi trường dùng reverse proxy.

- [Sử dụng công cụ tìm kiếm toàn văn (Meilisearch)](/vi/additional_meilisearch)  
Thiết lập để tìm kiếm nhanh bằng công cụ tìm kiếm toàn văn "Meilisearch" ở môi trường có nhiều dữ liệu.

- [Chế độ chuyên gia (expert mode)](/vi/additional_expert)  
Các bước để hiện các mục thiết lập chi tiết hơn trên màn hình.
