# Bảo trì dữ liệu
Đây là màn hình để quản trị viên của bảng sắp xếp dữ liệu của bảng cùng lúc. Mở "Bảo trì dữ liệu" từ "Cài đặt chi tiết bảng" ở phía trên bên phải màn hình của bảng (URL là `/data_maintenance/(tên bảng)`).

※Màn hình này dùng được từ Exment v7.3.0 trở đi.  
※Hãy đặt "Bảo trì dữ liệu" thành dùng ở "Quản lý tính năng". Lúc đầu là "không dùng".  
※Người dùng được màn hình này là người dùng có quyền "Cài đặt bảng" của bảng đó (gồm cả quản trị viên hệ thống).

Hiện có công cụ sau.
- [Xóa hàng loạt tệp đính kèm](/vi/data_maintenance?id=xóa-hàng-loạt-tệp-đính-kèm)

## Xóa hàng loạt tệp đính kèm
Xóa cùng lúc các tệp đính kèm của bảng này. Dùng khi muốn giải phóng dung lượng máy chủ.

- **Dữ liệu không bị mất**. Chỉ các tệp bị xóa.
- Tệp đã xóa **không thể khôi phục**. Hãy [sao lưu](/vi/backup) trước các tệp cần thiết.

### Nội dung cần xóa
| Mục | Nội dung |
|---|---|
| Tệp đính kèm của dữ liệu | Là "Tệp đính kèm" trên màn hình chi tiết dữ liệu. **Các phiên bản cũ** được giữ lại khi thay thế tệp đính kèm **cũng bị xóa cùng**. |
| Tệp của các cột tệp và hình ảnh | Là tệp của các cột kiểu tệp và kiểu hình ảnh. Giá trị của cột trong dữ liệu đó thành trống. Khi đó, thông báo và quy trình làm việc không chạy, "Ngày giờ cập nhật" và "người dùng cập nhật" của dữ liệu cũng không thay đổi. |

Lúc đầu chỉ có "Tệp đính kèm của dữ liệu" được chọn.

### Trước ngày
Khi nhập ngày, **chỉ các tệp được thêm trước ngày đó** bị xóa. Khi để trống, tất cả các tệp đều là đối tượng.

- Nếu tệp hiện tại của tệp đính kèm được thêm từ ngày đó trở đi, tệp đính kèm được giữ lại và **chỉ các phiên bản cũ** trước ngày đó bị xóa.

### Những gì không xóa và những gì là đối tượng
- **Tệp của dữ liệu đã xóa (thùng rác) cũng là đối tượng**. Dù khôi phục dữ liệu đã xóa, tệp đã xóa cũng không quay lại.
- **Lịch sử thay đổi của dữ liệu được giữ lại**. Trong lịch sử thay đổi chỉ có các ghi chép như tên tệp, không có nội dung tệp. Khi xem lịch sử cũ sau khi xóa, tệp đó hiển thị là "(đã xóa)".
- Hình ảnh trong editor (văn bản định dạng) và bình luận không bị xóa.

### Cách dùng
1. Chọn "Nội dung cần xóa", nhập ngày vào "Trước ngày" nếu cần, rồi bấm "Đếm số lượng".
1. "Sẽ xóa" hiển thị số lượng tệp đính kèm, phiên bản cũ, tệp của cột, số lượng dữ liệu là đối tượng và tổng dung lượng. Khi có hơn 5.000 tệp, tổng dung lượng là của 5.000 tệp đầu tiên.
1. Để xác nhận, nhập tên bảng rồi bấm "Xóa ○ tệp". Màn hình xác nhận hiển thị thêm một lần nữa.
1. Khi xong, thông báo "Đã xóa ○ tệp (○MB) của ○ dữ liệu." hiển thị.

Nội dung đã xóa (bảng, nội dung đã xóa, ngày, số lượng, dung lượng) được ghi lại trong [nhật ký thao tác](/vi/logs) dưới dạng `data_maintenance/(tên bảng)/attachments`.

## Khi xóa toàn bộ dữ liệu
Khi có thể xóa cả dữ liệu, tệp đính kèm của dữ liệu đó cũng bị xóa bằng "Xóa vĩnh viễn" từ [Dữ liệu đã xóa](/vi/deleted_data).

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [Dữ liệu đã xóa](/vi/deleted_data)
- [Sao lưu](/vi/backup)
