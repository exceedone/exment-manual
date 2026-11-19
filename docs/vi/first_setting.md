# Thiết lập ban đầu
Đây là các bước thiết lập ban đầu sau khi cài đặt, chẳng hạn như thiết lập ID đăng nhập của quản trị viên đầu tiên.

## Truy cập URL
Truy cập vào trang Exment.  
http(s)://(URL trang của bạn)/admin  

> Lưu ý: "admin" trong URL là thiết lập mặc định. Nếu đã đổi hoặc xóa bằng `ADMIN_ROUTE_PREFIX` trong `.env`, hãy thay "admin" bằng giá trị đó (nếu đã xóa thì bỏ "/admin", ví dụ `http(s)://(URL của Exment)/oauth/token`). Chi tiết xem [Change / delete "admin" included in URL](/additional_prefix).

## Màn hình thiết lập ban đầu
Nếu việc cài đặt đã hoàn tất bình thường, màn hình thiết lập ban đầu của Exment sẽ được hiển thị.

![Màn hình thiết lập ban đầu](../img/install/install1.png)
Vui lòng nhập các thông tin cần thiết để thiết lập hệ thống.  
※Chi tiết vui lòng tham khảo [tại đây](/vi/system_setting).

## Thiết lập template
Exment có sẵn các template được chuẩn bị từ trước.  
Khi chọn template, các thông tin về bảng, cột, form, menu và quyền được thiết lập trong template đã chọn sẽ được cài đặt.  
Ngoài ra, bạn cũng có thể tải lên từ màn hình này một template đã được xuất (export) từ một Exment khác.  
Chi tiết vui lòng xem [Template](/template).

![Màn hình cài đặt_Template](../img/install/install_template.png)

Danh sách các template đã được cài đặt sẵn trong hệ thống hoặc các template đã từng được nhập (import) trước đây sẽ được hiển thị.  
Nếu muốn cài đặt, hãy chọn template muốn thêm.  

## Hoàn tất thiết lập ban đầu
Sau khi nhập các mục cần thiết, nhấp vào nút "Submit" (Gửi) để lưu thiết lập; Exment sẽ ở trạng thái sẵn sàng sử dụng.

## Các thiết lập bổ sung khác
Với các thao tác trên, bạn đã có thể bắt đầu sử dụng Exment, tuy nhiên để dùng một số chức năng, có thể cần thiết lập bổ sung.  
Vui lòng xem liên kết dưới đây.  
- [Thiết lập bổ sung](/vi/quickstart_more)
