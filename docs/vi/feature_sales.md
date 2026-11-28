# Bán hàng (CRM / SFA)
Tính năng thêm cùng lúc các bảng, view, dashboard, menu và các thứ khác để quản lý khách hàng, cơ hội bán hàng, báo giá, hợp đồng và hoạt động. Đây là một dòng của [Quản lý tính năng](/vi/feature).

※Tính năng này dùng được từ Exment v7.3.0 trở đi.  
※Lúc đầu là "không dùng". Khi chuyển sang "dùng", những gì ở mục "Những gì được thêm" sẽ được tạo trên trang.

## Chuyển sang "dùng"
Làm theo một trong hai cách sau.

- **Từ Quản lý tính năng**: đăng nhập bằng quản trị viên hệ thống rồi mở "Cài đặt quản trị" → "[Quản lý tính năng](/vi/feature)". Chuyển "Bán hàng (CRM / SFA)" trong "Tính năng của Exment" sang "dùng" rồi lưu.
- **Từ màn hình thiết lập ban đầu**: ở mục "Tính năng" của [màn hình thiết lập ban đầu](/vi/first_setting) khi mới cài đặt, đánh dấu "Sử dụng Bán hàng (CRM / SFA)?" trong "Dùng ngay từ đầu". Nó được thêm sau khi lưu thiết lập ban đầu. Bạn cũng có thể chuyển sang "dùng" sau ở Quản lý tính năng.

Khi xong, sẽ có thông báo rằng các bảng, view, dashboard, menu, v.v. đã được thêm.  
Sau đó, hãy thêm người dùng vào nhóm vai trò "Bán hàng" ở màn hình [Nhóm vai trò](/vi/role_group).

※Ai được dùng không quyết định ở Quản lý tính năng mà bằng nhóm vai trò "Bán hàng" (quyền của các bảng).  
※Menu được thêm có thể di chuyển hoặc gỡ ra ở màn hình menu.

## Những gì được thêm

### Bảng
| Bảng | Tên bảng | Các cột chính |
| --- | --- | --- |
| Khách hàng | `sales_customer` | Tên khách hàng, phân loại (tiềm năng, đang giao dịch, đã ngừng giao dịch), địa chỉ, điện thoại, email, website, người phụ trách |
| Người liên hệ của khách hàng | `sales_customer_contact` | Họ tên, phòng ban, chức vụ, điện thoại, email (các dòng của một khách hàng) |
| Cơ hội bán hàng | `sales_deal` | Tên cơ hội, khách hàng, giai đoạn, số tiền dự kiến, ngày dự kiến chốt, khả năng, người phụ trách |
| Báo giá | `sales_quote` | Tiêu đề, khách hàng, cơ hội, ngày báo giá, hạn hiệu lực, tổng |
| Chi tiết báo giá | `sales_quote_detail` | Tên hàng, số lượng, đơn vị, đơn giá, thành tiền (các dòng của một báo giá) |
| Hợp đồng | `sales_contract` | Tên hợp đồng, khách hàng, cơ hội, ngày ký, ngày bắt đầu, ngày kết thúc, tự động gia hạn, số tiền, văn bản hợp đồng |
| Hoạt động | `sales_activity` | Loại (thăm, gọi điện, email, việc tiếp theo), tiêu đề, ngày giờ, khách hàng, cơ hội, người phụ trách (lúc đầu là người đang đăng nhập), nội dung |

### View
- **Kanban theo giai đoạn** (cơ hội bán hàng): [View Kanban](/vi/view_kanban) xếp các cơ hội theo giai đoạn, có tổng số tiền dự kiến của từng giai đoạn. Kéo thẻ sẽ đổi giai đoạn.
- Các view mà dashboard dùng (5 ô của dashboard, ở dưới)

### Bảng điều khiển bán hàng
"Bảng điều khiển bán hàng" được thêm làm mục đầu tiên của menu "Bán hàng & khách hàng". Gồm 5 ô:

- Đơn hàng dự kiến theo tháng (biểu đồ cột)
- Cơ hội đang mở theo người phụ trách: số lượng và số tiền dự kiến
- Hoạt động tháng này
- Báo giá sắp hết hạn (14 ngày)
- Hợp đồng sắp kết thúc (30 ngày)

### Menu
Menu "Bán hàng & khách hàng" gồm bảng điều khiển bán hàng, khách hàng, cơ hội bán hàng, báo giá, hợp đồng và hoạt động. Bảng điều khiển bán hàng đứng đầu. Có thể di chuyển hoặc gỡ ra ở màn hình [Menu](/vi/menu).  
※Tên nội bộ của dashboard là `exment_sales_dashboard`, nên được tạo riêng với dashboard tên `sales_dashboard` mà trang tự tạo.  
※Nếu trang đã trỏ mục menu "Bảng điều khiển bán hàng" sang dashboard khác, khi cài lại nó sẽ trỏ về bảng điều khiển bán hàng (liên kết đã đổi sang thứ không phải dashboard thì giữ nguyên).

### Thông báo
"Hợp đồng sắp hết hạn (trước 30 ngày)": lúc 9 giờ, 30 ngày trước ngày kết thúc của hợp đồng, người tạo hợp đồng và những người xem được hợp đồng sẽ nhận thông báo trong Exment. Số ngày và các thứ khác đổi ở màn hình [Thông báo](/vi/notify).

### Nhóm vai trò "Bán hàng"
Nhóm vai trò được xem, tạo và sửa tất cả dữ liệu của 7 bảng ở trên. Hãy thêm người dùng vào đây.

## Lưu ý
- **Khi thất bại giữa chừng**: những gì đã tạo được vẫn giữ nguyên. Sẽ có thông báo và dòng trở lại "không dùng". Chuyển lại sang "dùng" rồi lưu thì chỉ tạo những gì còn thiếu (cả phần còn thiếu của view hoặc dashboard đã tạo dở). Nếu thất bại ở màn hình thiết lập ban đầu, thiết lập ban đầu vẫn hoàn tất; hãy chuyển sang "dùng" sau ở Quản lý tính năng.
- **Khi dừng giữa chừng trong lúc đang "dùng"** (ví dụ hết thời gian): trong khi còn thiếu bảng hoặc dashboard, dòng trong Quản lý tính năng hiện "Thiếu một phần những gì được thêm (một bảng hoặc bảng điều khiển). Khi lưu, phần còn thiếu sẽ được thêm." Lưu thì phần còn thiếu được thêm. Nếu thất bại, dòng vẫn ở "dùng"; lần lưu sau sẽ thử lại.
- **Dù chuyển sang "dùng" bao nhiêu lần**, cũng không tạo trùng. Những gì trang đã đổi (tên bảng và view, nhãn, số ngày của thông báo, nhóm vai trò, menu) vẫn giữ nguyên.
- **Những gì đã xóa không quay lại chỉ bằng việc lưu**: sau khi cài xong hoàn toàn, các bảng, view, dashboard và menu mà trang cố ý xóa sẽ không được tạo lại khi lưu Quản lý tính năng. Chuyển dòng sang "không dùng" (lưu) rồi lại "dùng" (lưu) thì những gì còn thiếu được tạo lại, kể cả thứ đã xóa.
- **"Không dùng" không xóa và không ẩn gì cả**: bảng, dữ liệu, view, dashboard, menu, thông báo và nhóm vai trò vẫn còn, và menu vẫn hiện. Khi không dùng nữa, hãy gỡ khỏi [Menu](/vi/menu) hoặc gỡ người dùng khỏi nhóm vai trò.
- **Khi trang có bảng trùng tên**: nếu trang đã có bảng riêng trùng tên với các bảng bán hàng (`sales_customer`, `sales_deal` và các bảng khác bắt đầu bằng `sales_`), sẽ không tạo bảng mới mà thêm các cột còn thiếu vào các bảng đó. Cột và dữ liệu hiện có vẫn giữ nguyên.
- **Trang đã cài template bán hàng cũ**: ở trang đã cài [Mẫu](/vi/template) cũ "Sales pack" (営業パック), chỉ thêm những gì còn thiếu như trên. Cột giai đoạn của cơ hội bán hàng giữ tên cũ (tiếng Nhật là 「状態」; trang mới cài là 「段階」). Muốn đổi, hãy đổi ở màn hình [Cột tùy chỉnh](/vi/column).

## Khóa bằng thiết lập máy chủ
Ghi `sales` vào `EXMENT_FEATURES_LOCKED` trong `.env` của máy chủ thì tính năng này bị cố định ở "không dùng" và cũng không hiện ở màn hình thiết lập ban đầu. Xem [Khóa tính năng bằng thiết lập máy chủ](/vi/feature?id=khóa-tính-năng-bằng-thiết-lập-máy-chủ).

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [Nhóm vai trò / Thiết lập quyền](/vi/role_group)
- [View Kanban](/vi/view_kanban)
- [Dashboard](/vi/dashboard)
- [Menu](/vi/menu)
- [Thông báo](/vi/notify)
