# Ngôn ngữ và múi giờ của từng người dùng
Từ v7.2.4, mỗi người dùng có thể chọn ngôn ngữ của màn hình và múi giờ. Email và thông báo cũng dùng ngôn ngữ và múi giờ của người nhận.

## Chọn ngôn ngữ
Có thể chọn ngôn ngữ ở một trong các nơi sau:

- Menu người dùng ở góc trên bên phải
- "Ngôn ngữ" trong thiết lập người dùng đăng nhập (menu người dùng ở góc trên bên phải → thiết lập người dùng đăng nhập)
- Màn hình đăng nhập

Các ngôn ngữ: 日本語, English, Tiếng Việt, 简体中文, 한국어, Deutsch, Español.

- Màn hình tiếng Việt, tiếng Trung giản thể, tiếng Hàn, tiếng Đức và tiếng Tây Ban Nha được dịch máy. Nếu có chỗ cần sửa, hãy cho chúng tôi biết trên [GitHub](https://github.com/exceedone/exment/issues).
- Quản trị viên có thể giới hạn các ngôn ngữ mà người dùng được chọn (xem "Thiết lập của quản trị viên" bên dưới).

### Thứ tự chọn ngôn ngữ
Exment quyết định ngôn ngữ theo thứ tự sau:

1. Ngôn ngữ người dùng đã chọn trong thiết lập người dùng đăng nhập
1. Ngôn ngữ đã chọn ở màn hình đăng nhập
1. Ngôn ngữ của trình duyệt (khi thiết lập hệ thống "Dùng ngôn ngữ của trình duyệt khi người dùng chưa chọn" là YES; trong các ngôn ngữ người dùng được chọn)
1. Ngôn ngữ của trang

Nếu chọn "Tự động (ngôn ngữ của trình duyệt)" ở mục "Ngôn ngữ", thiết lập sẽ trở về trạng thái chưa chọn.

> [!WARNING]
> Sau khi cập nhật lên v7.2.4, người dùng chưa chọn ngôn ngữ và có trình duyệt khác ngôn ngữ của trang sẽ thấy Exment bằng ngôn ngữ của trình duyệt.  
> Để mọi người vẫn dùng ngôn ngữ của trang, hãy đặt Thiết lập hệ thống → [Thiết lập nâng cao] → "Dùng ngôn ngữ của trình duyệt khi người dùng chưa chọn" thành NO.

## Chọn múi giờ
Chọn múi giờ ở mục "Múi giờ" trong thiết lập người dùng đăng nhập. Mặc định là "Múi giờ của trang".

Ngày giờ được hiển thị và nhập theo múi giờ đó: danh sách, chi tiết, biểu mẫu, bộ lọc như "hôm nay", lịch, biểu đồ Gantt, Kanban, bình luận, lịch sử, thông báo và nhật ký thao tác.

### Những gì vẫn theo múi giờ của trang
- Cơ sở dữ liệu lưu theo múi giờ của trang.
- Cột chỉ có ngày (không có giờ) không bao giờ bị đổi.
- API vẫn theo múi giờ của trang.
- Biểu đồ gộp theo ngày giờ (view tổng hợp và dashboard) được gộp theo giờ của trang và hiện ra, ví dụ "(giờ của site: Asia/Tokyo)".
- Xuất dữ liệu mặc định theo múi giờ của trang. Chọn "xuất theo ngày giờ ở múi giờ của bạn" để xuất theo múi giờ của mình.
- Khi nhập dữ liệu, mục "múi giờ của ngày giờ trong tệp" cho biết ngày giờ trong tệp theo múi giờ của trang hay của bạn.

## Email và thông báo
Email và thông báo được gửi bằng ngôn ngữ và múi giờ của người nhận. Nếu người nhận chưa chọn ngôn ngữ, dùng ngôn ngữ của trang.

## Thiết lập của quản trị viên
Thiết lập ở Thiết lập hệ thống → [Thiết lập nâng cao] (xem [Thiết lập hệ thống](/vi/system_setting.md)).

| Mục | Nội dung | Mặc định |
| --- | --- | --- |
| Ngôn ngữ người dùng có thể chọn | Các ngôn ngữ người dùng có thể chọn ở menu góc trên bên phải, màn hình đăng nhập và thiết lập của họ. Để trống thì chọn được tất cả ngôn ngữ đã cài. Ngôn ngữ của trang luôn chọn được. | Trống (tất cả) |
| Dùng ngôn ngữ của trình duyệt khi người dùng chưa chọn | YES: người dùng chưa chọn ngôn ngữ sẽ thấy màn hình bằng ngôn ngữ của trình duyệt (trong các ngôn ngữ người dùng được chọn). NO: bằng ngôn ngữ của trang. | YES |

Ngôn ngữ và múi giờ của trang vẫn đặt như trước bằng `APP_LOCALE` và `APP_TIMEZONE` trong `.env`.
