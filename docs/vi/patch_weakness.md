# Danh sách bản vá và lỗ hổng bảo mật

## Bản vá
Đây là danh sách các lỗi cần xử lý thủ công và cách xử lý.  
Nếu phiên bản bạn đang dùng thuộc "Phiên bản bị ảnh hưởng", vui lòng xem cách xử lý ở trang được liên kết.

| Nội dung | Phiên bản bị ảnh hưởng | Chi tiết |
| ---- | ---- | ---- |
| [Loại bỏ chuỗi có dấu phẩy](/patch/comma) | ～v1.2.6 | Xử lý lỗi chuỗi có dấu phẩy bị lưu vào cơ sở dữ liệu. |
| [Chỉ mục tìm kiếm có dấu gạch nối](/patch/index_hyphen) | ～v1.3.0 | Xử lý lỗi xảy ra với chỉ mục tìm kiếm có dấu gạch nối. |
| [Màn hình thông báo không mở được](/patch/remove_deleted_table_notify) | ～v2.1.1 | Xử lý lỗi màn hình thông báo không mở được khi xóa bảng đã thêm thông báo. |
| [Menu chỉ nhập được tối đa 50 ký tự](/patch/menu_uri_length) | ～v3.0.2 | Xử lý vấn đề không lưu được URL của menu từ 51 ký tự trở lên. |
| [Phiên bản sửa đổi khi chạy API](/patch/api_revision) | ～v3.0.9 | Xử lý lỗi không hiển thị phiên bản sửa đổi khi tạo mới hoặc cập nhật dữ liệu qua API. |
| [Không SSO được bằng tài khoản Google](/patch/sso_google) | ～v3.0.16 | Xử lý vấn đề không SSO được bằng tài khoản Google do dịch vụ Google+ đã ngừng. |
| [Khi xóa quan hệ, biểu mẫu cha-con vẫn còn](/patch/remove_deleted_relation) | ～v3.0.16 | Xử lý lỗi khi xóa quan hệ trong trường hợp đã thiết lập biểu mẫu cha-con. |
| [Thiết lập lọc và xóa các trường có quan hệ cha-con của biểu mẫu](/patch/relation_filter) | ～v3.3.1 | Mô tả thiết lập lọc của quan hệ trong trường hợp đã thiết lập biểu mẫu cha-con. |
| [Tệp sao lưu bằng v3.6.7 không khôi phục được bằng v3.6.7](/patch/resotre_ignore_view) | v3.6.7 | Mô tả cách xử lý vấn đề tệp sao lưu bằng v3.6.7 không khôi phục được bằng v3.6.7. |
| [Hiển thị sai người thực hiện trong thông báo khi bình luận hoặc đính kèm tệp vào dữ liệu](/patch/mail_template_comment_attachment) | ～v3.7.5 | Mô tả cách sửa phần hiển thị người thực hiện trong thông báo khi bình luận hoặc đính kèm tệp vào dữ liệu. |
| [Xóa các tệp gắn với dữ liệu đã bị xóa vật lý](/patch/file_deleting) | ～v4.0.6 | Mô tả cách xóa các tệp không còn gắn với dữ liệu nào vì dữ liệu đã bị xóa vật lý. |
| [Trường hợp đã nhập bằng Excel với cột tùy chỉnh "Lựa chọn (từ bảng khác)" có bảng đích là "Người dùng" hoặc "Tổ chức"](/ja/patch/select_table_user_org) (tiếng Nhật) | Tất cả | Cách xử lý cho trường hợp đã nhập bằng Excel với cột tùy chỉnh "Lựa chọn (từ bảng khác)" có bảng đích là "Người dùng" hoặc "Tổ chức". |
| [Với cột tùy chỉnh "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức", giá trị lưu trong cơ sở dữ liệu có thể thành kiểu số](/ja/patch/select_table_integer) (tiếng Nhật) | ～v4.1.0 | Với cột tùy chỉnh "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức", nếu dữ liệu được lưu không qua màn hình thì có thể bị lưu thành kiểu số. Đây là cách chuyển các dữ liệu đó sang kiểu chuỗi. |


## Danh sách lỗ hổng bảo mật
Đây là danh sách các lỗ hổng bảo mật (điểm yếu về bảo mật có thể bị lợi dụng) đã được tìm thấy cho đến nay.  
Vui lòng xem nội dung và cách xử lý qua liên kết ở ngày công bố.

| Ngày công bố | Phiên bản bị ảnh hưởng | Chi tiết |
| ---- | ---- | ---- |
| [2020/08/19](/weakness/20200819) | ～v3.5.4 | Cross-site scripting, và chính sách về việc chạy script từ nội dung nhập trên màn hình |
| [2020/08/19](/weakness/20200819_2) | ～v3.5.4 | Chạy script khi bấm vào tệp đính kèm |
| [2020/03/25](/weakness/20200325) | ～v3.1.6 | Cross-site scripting ở màn hình danh sách |
| [2021/04/13](/weakness/20210413) | facade/ignition < 1.16.15 | Xử lý lỗ hổng cho phép chạy mã tùy ý trong Laravel |
| [2022/08/17](/weakness/20220817) | ～v5.0.2 | Cross-site scripting và SQL injection |
| [2024/10/10](/weakness/20241010) | ～v6.1.4 | Cross-site scripting |
| [2024/10/10](/weakness/20241010_2) | ～v6.1.4 | Thay đổi thiết lập của bảng tùy chỉnh mà không có quyền |
