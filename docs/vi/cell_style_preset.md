# Mẫu hiển thị

Đây là chức năng đặt tên và lưu hình thức của ô (màu, hình dạng, biểu tượng, v.v.) để dùng lại cho nhiều cột và nhiều view. Không chỉ danh sách dữ liệu, thẻ của view Kanban cũng áp dụng cùng hình thức.

## Mẫu hiển thị là gì

Trước đây, hình thức của ô được thiết lập **riêng cho từng cột**.  
Vì vậy, cùng một thiết lập như "hiển thị trạng thái bằng viên thuốc (bo góc)" phải tạo lại mỗi khi đổi bảng hoặc đổi cột.

Mẫu hiển thị là cách đặt tên cho thiết lập đó và chỉ lưu một lần.  
Cột và view chỉ ghi lại "dùng mẫu nào", nên:

- Cùng một hình thức có thể dùng cho cột khác, bảng khác chỉ bằng cách chọn từ danh sách
- Khi sửa một mẫu, hiển thị của tất cả các cột đang chọn mẫu đó thay đổi cùng lúc

![Danh sách dữ liệu đã áp dụng mẫu hiển thị](../img/cell_style_preset/preset_grid_result.png)

## Nơi dùng mẫu

Mẫu hiển thị được dùng ở 4 màn hình sau.

| Màn hình | Vai trò | Quyền cần có |
| --- | --- | --- |
| Mẫu hiển thị ô (màn hình thư viện) | Danh sách, tạo mới, chỉnh sửa, xóa mẫu | Quản trị viên hệ thống |
| Cài đặt cột tùy chỉnh > Hiển thị ô | Chọn mẫu làm hình thức mặc định của cột đó | Quyền cài đặt bảng của bảng đó |
| Cài đặt chế độ xem tùy chỉnh > Chọn cột hiển thị | Chọn mẫu làm hình thức chỉ của view đó | Quyền cài đặt bảng của bảng đó |
| Thiết lập view Kanban > Cột hiển thị trên thẻ > Kiểu hiển thị | Chọn mẫu làm hình thức trên thẻ | Quyền cài đặt bảng của bảng đó |

※Mẫu không thuộc về bảng nào. Tạo một mẫu là chọn được từ cột của bất kỳ bảng nào.  
※Mẫu chỉ định ở view được ưu tiên hơn thiết lập của cột.

## Màn hình thư viện (danh sách mẫu hiển thị)

### Hiển thị trang

Mở `(địa chỉ của Exment)/cell_style_preset` bằng trình duyệt.

> ※URL này là của thiết lập chuẩn không có "/admin" (site cài mới từ v7.2.1 trở đi). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (site cài từ phiên bản trước là "admin"), hãy thêm giá trị đó sau URL của site (ví dụ: `http(s)://(URL của Exment)/admin/cell_style_preset`). Chi tiết vui lòng xem [Thay đổi hoặc xóa "admin" trong URL](/vi/additional_prefix).

Để mở được bất cứ lúc nào, hãy thêm vào menu ở thiết lập [Menu](/vi/menu).

1. Mở "Cài đặt quản trị" > "Menu".
2. Nhấp vào [Mới] ở phía trên bên phải.
3. Chọn "Menu hệ thống" ở "Loại menu" và "Mẫu hiển thị thiết lập sẵn" ở "Tên menu".
4. Chọn menu cha để hiển thị (ví dụ "Cài đặt quản trị") rồi lưu.

![Danh sách mẫu hiển thị](../img/cell_style_preset/preset_grid.png)

Danh sách hiển thị các mục sau.

| Mục | Nội dung |
| --- | --- |
| Tên mẫu hiển thị | Tên hiển thị trong danh sách lựa chọn của màn hình thiết lập |
| Xem trước | Hình ảnh hiển thị trong danh sách dữ liệu thực tế |
| Loại cột áp dụng | Các loại cột mà mẫu này xuất hiện làm lựa chọn |
| Thứ tự hiển thị | Thứ tự trong danh sách lựa chọn (số nhỏ ở trên) |
| Ngày giờ cập nhật | Ngày giờ cập nhật cuối |

Khi cài Exment, 15 mẫu thường dùng đã được đăng ký sẵn.

| Tên mẫu hiển thị | Loại cột áp dụng chính |
| --- | --- |
| Trạng thái (viên thuốc) | Lựa chọn (giá trị cố định) |
| Trạng thái (huy hiệu) | Lựa chọn (giá trị cố định) |
| Nhãn (thẻ) | Lựa chọn (giá trị cố định) |
| Lựa chọn (chấm) | Lựa chọn (giá trị cố định) |
| Độ ưu tiên (chấm vuông) | Lựa chọn (giá trị cố định), Lựa chọn (lưu giá trị và nhãn) |
| Mức độ (chấm tròn) | Lựa chọn (giá trị cố định), Lựa chọn (lưu giá trị và nhãn) |
| YES/NO (huy hiệu) | YES/NO, Lựa chọn 2 giá trị |
| Người phụ trách (ảnh đại diện) | Người dùng, Tổ chức |
| Tiến độ (thanh) | Số nguyên, Số thập phân |
| Số (in đậm) | Số nguyên, Số thập phân, Tiền tệ |
| Ngày (không xuống dòng) | Ngày, Ngày và giờ, Giờ |
| Mã (phông đơn cách) | Văn bản một dòng, Đánh số tự động, URL, Email |
| Chỉ văn bản (không có tên mục) | Tất cả loại cột |
| Cảnh báo (đỏ, in đậm) | Tất cả loại cột |
| Tô màu toàn bộ ô | Tất cả loại cột |

Người có thể chỉnh sửa và xóa mẫu như sau.

- Chỉ quản trị viên hệ thống mới mở được màn hình thư viện (người dùng được cấp quyền hệ thống bằng nhóm vai trò không mở được). Ở màn hình thư viện, có thể chỉnh sửa và xóa tất cả các mẫu, gồm cả các mẫu đăng ký sẵn, bất kể ai là người tạo.
- Ở màn hình "Tạo và chỉnh sửa mẫu tại chỗ (nút bút chì)", quản trị viên hệ thống có thể chỉnh sửa và xóa tất cả các mẫu. Người dùng khác chỉ chỉnh sửa và xóa được mẫu do chính mình tạo. Các mẫu khác là chỉ đọc: [Xóa] không hiển thị và không bấm được [Cập nhật mẫu hiển thị này]. Màn hình chỉnh sửa hiển thị "Không thể chỉnh sửa mẫu hiển thị này. Để dùng với nội dung đã thay đổi, vui lòng lưu thành mẫu hiển thị mới.". Khi muốn đổi nội dung để dùng, hãy dùng [Lưu thành mẫu hiển thị mới].

※Khi "Sử dụng quản lý quyền" trong thiết lập hệ thống là NO, tất cả người dùng đều dùng được màn hình thư viện.

### Tạo mới và chỉnh sửa mẫu

Nhấp vào nút [Mới] ở phía trên bên phải danh sách, hoặc biểu tượng chỉnh sửa ở mỗi dòng.

![Màn hình tạo mẫu hiển thị](../img/cell_style_preset/preset_form.png)

#### Tên mẫu hiển thị
Tên hiển thị trong danh sách lựa chọn của màn hình thiết lập. Đây là mục bắt buộc.

#### Kiểu hiển thị ô
Chọn giá trị được hiển thị theo hình dạng nào.

| Lựa chọn | Nội dung hiển thị |
| --- | --- |
| Mặc định | Hiển thị như trước đây (không trang trí) |
| Chỉ màu chữ | Chỉ thêm màu cho chữ |
| Thẻ (bo góc nhỏ) | Thẻ có khung, góc bo nhẹ |
| Viên thuốc (bo góc lớn) | Thẻ có góc bo nhiều |
| Huy hiệu (tô màu đặc) | Huy hiệu màu đậm, nền tô kín |
| Dấu vuông + chữ | Thêm dấu màu hình vuông trước giá trị |
| Dấu tròn + chữ | Thêm dấu màu hình tròn trước giá trị |
| Phông chữ đơn cách | Hiển thị với độ rộng ký tự đều nhau (mã, ID, v.v.) |
| Ảnh đại diện (chữ cái đầu trong hình tròn) | Hiển thị chữ cái đầu thành biểu tượng tròn (người phụ trách, v.v.) |
| Thanh tiến độ (0-100) | Hiển thị giá trị dưới dạng biểu đồ thanh ngang |
| Tô màu toàn bộ ô | Tô màu toàn bộ nền của ô |

#### Màu chữ
Màu chữ của giá trị.  
※Với cột lựa chọn, nếu cũng không chỉ định "Màu theo từng giá trị", màu sẽ được tự động gán theo thứ tự của các lựa chọn.

#### Màu nền
Màu nền của thẻ, viên thuốc hoặc toàn bộ ô. Nếu không chỉ định, màu được tạo tự động từ màu chữ.

#### Màu viền
Màu viền của thẻ, viên thuốc hoặc toàn bộ ô. Nếu không chỉ định, màu được tạo tự động từ màu chữ.

#### Độ đậm chữ
Chọn "Bình thường", "Hơi đậm" hoặc "Đậm".

#### Biểu tượng
Biểu tượng hiển thị trước giá trị. Có thể chọn từ nút.  
※Không hiển thị với "Ảnh đại diện", "Thanh tiến độ" và "Tô màu toàn bộ ô".

#### Không xuống dòng
Khi đặt là YES, chữ trong ô của danh sách sẽ không xuống dòng. Dùng cho các cột khó đọc khi bị ngắt dòng giữa chừng, như ngày tháng hoặc số.

#### Loại cột áp dụng
Mẫu này xuất hiện làm lựa chọn ở các cột thuộc loại được đánh dấu.  
※Nếu không đánh dấu loại nào, mẫu hiển thị cho tất cả các loại.

#### Thứ tự hiển thị
Thứ tự hiển thị trong danh sách lựa chọn của màn hình thiết lập. Số nhỏ hơn hiển thị ở trên.

## Gán mẫu cho cột tùy chỉnh

1. Chọn bảng từ menu, rồi mở [Cài đặt chi tiết bảng] > [Cài đặt cột tùy chỉnh].
2. Mở màn hình chỉnh sửa của cột muốn thiết lập, cuộn đến phần "Hiển thị ô".

![Hiển thị ô của cài đặt cột tùy chỉnh](../img/cell_style_preset/preset_column.png)

3. Chọn mẫu muốn dùng từ danh sách lựa chọn "Mẫu hiển thị có sẵn".  
Các lựa chọn được hiển thị đúng với hình thức thực tế.

![Danh sách lựa chọn mẫu](../img/cell_style_preset/preset_select.png)

4. Khi chọn, phần "Xem trước" ở dưới đổi ngay. Có thể kiểm tra mà không cần lưu.

![Xem trước](../img/cell_style_preset/preset_preview.png)

5. Lưu bằng nút [Gửi] ở phía dưới màn hình.

### Màu theo từng giá trị

Với cột lựa chọn, có thể chỉ định màu cho từng lựa chọn ở "Màu theo từng giá trị".  
Giá trị không chỉ định màu sẽ được tự động gán màu theo thứ tự của các lựa chọn.

※Với thanh tiến độ, giá trị này được xử lý là "ngưỡng": khi giá trị từ ngưỡng trở lên thì có màu đó.

## Tạo và chỉnh sửa mẫu tại chỗ (nút bút chì)

Khi nhấp vào nút bút chì ở bên phải "Mẫu hiển thị có sẵn", bạn có thể chỉnh sửa mẫu mà không rời màn hình thiết lập.

![Hộp thoại chỉnh sửa mẫu hiển thị](../img/cell_style_preset/preset_modal.png)

Khi đổi thiết lập ở bên trái, phần "Xem trước" ở bên phải được cập nhật ngay.

Phía dưới hộp thoại có các nút sau.

![Các nút của hộp thoại](../img/cell_style_preset/preset_modal_buttons.png)

| Nút | Hoạt động |
| --- | --- |
| Lưu thành mẫu hiển thị mới | Thêm nội dung hiện tại thành **một mẫu khác**. Mẫu gốc không thay đổi. |
| Cập nhật mẫu hiển thị này | Ghi đè mẫu đang mở. **Hiển thị của các cột khác đang chọn mẫu này cũng thay đổi**. |
| Xóa | Xóa mẫu. Để tránh thao tác nhầm, bấm thêm một lần nữa thì mới xóa. |
| Đóng | Đóng mà không lưu. |

> Khi muốn đổi một chút mẫu có sẵn để dùng, hãy dùng **"Lưu thành mẫu hiển thị mới"**, không dùng "Cập nhật mẫu hiển thị này".  
> Khi cập nhật, hình thức của các cột khác đang dùng cùng mẫu cũng thay đổi.

## Gán mẫu cho cột của view

Có khi cùng một bảng nhưng muốn đổi cách hiển thị theo từng view.  
Khi đó, hãy chỉ định mẫu ở "Chọn cột hiển thị" của cài đặt chế độ xem tùy chỉnh.

![Chọn cột hiển thị của view](../img/cell_style_preset/preset_view_column.png)

Ở cột "Mẫu hiển thị ô", chọn mẫu cho từng cột.  
Từ nút bút chì ở bên phải, có thể mở cùng hộp thoại như ở thiết lập cột.

※Mẫu chỉ định ở đây **được ưu tiên hơn nội dung của cài đặt cột tùy chỉnh**.  
※Nếu không chọn gì, nội dung của cài đặt cột tùy chỉnh được dùng.

## Câu hỏi thường gặp và lưu ý

#### Khi xóa mẫu, các cột đang dùng sẽ ra sao
Các cột đã chọn mẫu đó quay về hiển thị "Mặc định" không trang trí. Dữ liệu không thay đổi.

#### Mẫu không xuất hiện trong danh sách lựa chọn
Có thể "Loại cột áp dụng" của mẫu không gồm loại của cột đó.  
Hãy mở mẫu ở màn hình thư viện và kiểm tra "Loại cột áp dụng". Nếu muốn hiển thị cho tất cả các loại, đừng đánh dấu loại nào.

#### Khi đổi hình thức, hiển thị của bảng khác cũng thay đổi
Mẫu không thuộc về bảng nào và được dùng chung trong toàn bộ Exment.  
Nếu chỉ muốn đổi hình thức của một bảng, hãy tạo mẫu khác bằng "Lưu thành mẫu hiển thị mới".

## Mục liên quan

- [Cột tùy chỉnh](/vi/column)
- [View tùy chỉnh](/vi/view)
- [Danh sách dữ liệu](/vi/data_grid)
- [View Kanban](/vi/view_kanban)
