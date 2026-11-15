# Thiết lập bổ sung
Sau khi thực hiện [quy trình cài đặt](/vi/quickstart.md), bạn đã có thể chạy Exment.  
Tuy nhiên, để sử dụng một số chức năng, có thể cần thực hiện thêm các thiết lập bổ sung.  
Nếu sử dụng các chức năng dưới đây, vui lòng thiết lập theo hướng dẫn tương ứng.  

### Danh sách nội dung thiết lập

- [Thay đổi / xóa "admin" trong URL](/additional_prefix)  
Thay đổi hoặc xóa phần "/admin" vốn có trong URL theo mặc định.

- [Lịch chạy tác vụ (task schedule)](/additional_task_schedule)  
Cách thiết lập khi muốn xử lý tự động vào một thời điểm nhất định, chẳng hạn như tự động tạo bản sao lưu hoặc thông báo thời hạn.

- [Tắt giao tiếp từ máy chủ ra bên ngoài](/additional_disable_outside_api)  
Cách thiết lập khi muốn dừng việc giao tiếp từ máy chủ đến máy chủ bên ngoài, chẳng hạn như việc lấy thông tin cập nhật của Exment.

- [Bật cache](/additional_cache)  
Lưu vào cache các dữ liệu master như bảng tùy chỉnh, cột, view, workflow. Tùy theo môi trường, tốc độ xử lý có thể được cải thiện.

- [Thay đổi nơi lưu tệp](/additional_file_saveplace)  
Quy trình thay đổi nơi lưu tệp từ máy chủ cục bộ sang FTP, AWS S3, v.v.

- [Thay đổi giá trị thiết lập PHP](/additional_php_ini)  
Quy trình thay đổi kích thước tải lên của tệp đính kèm, dung lượng bộ nhớ PHP được sử dụng và thời gian timeout.

- [Bộ lọc IP](/additional_ip_filter)  
Có thể giới hạn các request đến trang web cũng như việc thực thi API theo địa chỉ IP.

- [Khi xảy ra lỗi 429 với API](/additional_429_too_many)  
Cách xử lý khi xảy ra lỗi 429 Too Many Requests lúc thực thi API.

- [Thêm cột label trong API lấy dữ liệu](/additional_api_label)  
Có thể thêm cột "label" khi lấy danh sách dữ liệu, hoặc khi tạo mới / cập nhật dữ liệu.

- [Thêm tùy chọn riêng cho thiết lập "Available characters" của loại cột "One-line text"](/additional_available_characters)  
Có thể thêm các tùy chọn sử dụng được trong thiết lập "Available characters" (ký tự được phép sử dụng) của loại cột tùy chỉnh "One-line text" (văn bản một dòng).

- [Thực thi trễ xử lý thông báo](/additional_queue)  
Có thể thực thi trễ (thực thi qua hàng đợi - queue) một số xử lý như thông báo.

- [Thiết lập reverse proxy](/additional_reverse_proxy)  
Thiết lập bổ sung khi xây dựng môi trường với reverse proxy.

- [Sử dụng công cụ tìm kiếm toàn văn (Meilisearch)](/additional_meilisearch)  
Cách thiết lập để sử dụng công cụ tìm kiếm toàn văn "Meilisearch" nhằm tìm kiếm với tốc độ cao trong môi trường lưu giữ lượng dữ liệu lớn.

- [Chế độ chuyên gia (expert mode)](/additional_expert)  
Quy trình để hiển thị các mục thiết lập linh hoạt hơn.
