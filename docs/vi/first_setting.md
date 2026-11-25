# Thiết lập ban đầu
Đây là các bước thiết lập làm đầu tiên sau khi cài đặt. Bạn đặt thông tin của trang và ID đăng nhập của quản trị viên đầu tiên, v.v.

Có 4 bước sau.

1. Truy cập trang Exment
2. Nhập các thông tin cần thiết trên màn hình thiết lập ban đầu
3. Chọn template muốn dùng
4. Bấm nút "Gửi"

## Truy cập URL
Truy cập vào trang Exment.  
http(s)://(URL trang của bạn)  

> ※URL này là của thiết lập tiêu chuẩn không có "/admin" (trang cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (trang cài ở phiên bản trước là "admin"), hãy thêm giá trị đó vào sau URL của trang (ví dụ: `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết vui lòng xem [Thay đổi hoặc xóa "admin" trong URL](/vi/additional_prefix).

## Màn hình thiết lập ban đầu
Nếu việc cài đặt đã xong đúng cách, màn hình thiết lập ban đầu của Exment sẽ hiện ra.

![Màn hình thiết lập ban đầu](../img/install/install1.png)
Hãy nhập các thông tin cần thiết để thiết lập hệ thống.  
※Giải thích chi tiết về các mục vui lòng xem [Thiết lập hệ thống](/vi/system_setting).

## Thiết lập template
Exment có sẵn các template.  
Khi bạn chọn template, các bảng, cột, form, menu và quyền có trong template đó được cài đặt cùng lúc.  
Bạn cũng tải lên được, từ màn hình này, template đã xuất từ một Exment khác.  
Chi tiết vui lòng xem [Template](/vi/template.md).

![Màn hình cài đặt_Template](../img/install/install_template.png)

Danh sách hiện các template có sẵn trong hệ thống và các template đã nhập trước đây.  
Hãy chọn template muốn cài đặt.  

## Hoàn tất thiết lập ban đầu
Khi bạn nhập các mục cần thiết rồi bấm nút "Gửi", thiết lập được lưu và bạn dùng được Exment.

## Các thiết lập bổ sung khác
Với các việc đã làm đến đây, bạn bắt đầu dùng được Exment. Tuy nhiên, để dùng một số chức năng thì cần thiết lập thêm.  
Vui lòng xem trang sau.  
- [Thiết lập bổ sung](/vi/quickstart_more)
