# Studio
Studio là chức năng để tạo, sửa và xem gộp các màn hình. Giống như ứng dụng của kintone, chỉ cần xếp các thành phần là bạn tạo được nơi chứa dữ liệu (bảng), màn hình nhập liệu và danh sách. Màn hình đã tạo cũng dùng được trên ứng dụng điện thoại (ứng dụng Exment).

※Các chức năng ghi ở đây có đủ ở Exment v7.2.1.

## Bắt đầu sử dụng
- Studio lúc đầu là "không sử dụng". Khi quản trị viên hệ thống chuyển "Studio" sang "Sử dụng" ở "Cài đặt quản trị" → "[Quản lý tính năng](/vi/feature)", menu "Studio" hiện ra dưới "Cài đặt quản trị" (URL là `/studio`).
- Người mở được Studio là, trong số những người được chọn ở Quản lý tính năng, người có quyền thiết lập bảng, form hoặc view ở một bảng nào đó, và quản trị viên hệ thống.

| Việc làm được | Quyền cần có |
| --- | --- |
| Tạo ứng dụng (bảng) mới | Quyền "Bảng" của hệ thống |
| Thêm màn hình vào bảng đang có, sửa bằng Studio | Quyền thiết lập form của bảng đó |
| Tạo nút, thêm mục (cột) mới ở màn hình sửa | Quyền thiết lập của bảng đó |

<!-- Ảnh màn hình: danh sách màn hình của Studio (img/studio/studio_index.png). Chụp sau khi aa kiểm tra -->

## Danh sách màn hình
Khi mở Studio, bạn xem gộp được các màn hình của trang trên 1 màn hình.

| Mục | Nội dung |
| --- | --- |
| Màn hình của các bảng | Với từng bảng, màn hình nhập liệu (form) và danh sách (view) được xếp ra. Có "Mở", "Chỉnh sửa", "Sao chép" và liên kết đến "Cài đặt cột", "Cài đặt bảng". Ở ô phía trên, bạn lọc được theo tên bảng và tên màn hình. |
| Bảng điều khiển (màn hình tổng hợp) | Dashboard của hệ thống và dashboard của người dùng. |
| Trang plugin | Các plugin dạng trang. |
| Sơ đồ quan hệ bảng | Bạn xem được bằng sơ đồ các quan hệ cha - con (1:n), n:n và các cột chọn từ bảng khác. |

- Khi bấm tên của màn hình nhập liệu (và biểu tượng bút chì), màn hình [Sửa bằng Studio](/vi/studio?id=sửa-bằng-studio) mở ra. Màn hình thiết lập form như trước nay mở được từ biểu tượng bánh răng ("Mở trong cài đặt biểu mẫu").
- Danh sách chỉ hiện các bảng bạn thiết lập được và các màn hình thiết lập được trong đó.

## Tạo ứng dụng / màn hình mới
Bấm "Ứng dụng hoặc màn hình mới" trên danh sách. Có 3 cách tạo.

| Cách tạo | Nội dung |
| --- | --- |
| Tạo ứng dụng mới | Khi xếp các thành phần, bảng và cột, màn hình nhập liệu và danh sách được tạo. Nếu chọn, kanban, lịch, biểu đồ và dashboard cũng được tạo cùng lúc ([Tạo thành ứng dụng một lần](/vi/studio?id=tạo-thành-ứng-dụng-một-lần)). |
| Thêm màn hình vào bảng | Không tạo bảng. Xếp các cột đang có để chỉ tạo màn hình nhập liệu (form). |
| Tạo từ Excel hoặc CSV | Khi đọc tệp Excel (.xlsx) hoặc CSV, hệ thống coi dòng 1 là tên mục, từ dòng 2 là dữ liệu, rồi đoán thành phần và xếp sẵn. Chỗ nào khác thì sửa rồi mới lưu. Khi chọn "Nhập cả dữ liệu", dữ liệu cũng được đưa vào cùng (tối đa 1.000 dòng, tệp tối đa 10MB). |

Trước khi lưu, màn hình cho biết cái gì sẽ được tạo (ví dụ "Khi lưu, ứng dụng "..." (bảng, màn hình nhập liệu và danh sách) sẽ được tạo."). Khi lưu xong, bạn nhập được dữ liệu trên màn hình đã tạo.

<!-- Ảnh màn hình: màn hình tạo ứng dụng mới (thành phần, màn hình nhập liệu, xem trước) (img/studio/studio_create.png) -->

### Thành phần
| Thành phần | Nội dung |
| --- | --- |
| Văn bản một dòng, Văn bản nhiều dòng, URL, Email | Nhập chữ. |
| Số nguyên, Số thập phân, Tiền tệ | Nhập số. |
| Tính toán | Tính từ các mục số khác (mục "Tính toán" ở dưới). |
| Ngày, Ngày và giờ, Giờ | Nhập ngày và giờ. |
| Lựa chọn, YES/NO | Chọn trong các giá trị đã định. Các lựa chọn được viết mỗi dòng một cái. |
| Lựa chọn (từ bảng khác) | Chọn dữ liệu của bảng khác. Bạn đặt "Bảng để chọn dữ liệu". |
| Người dùng, Tổ chức | Chọn người dùng hoặc tổ chức của Exment. |
| Đánh số tự động | Khi lưu, ngày và số (ví dụ: 20261121-0001) được gắn tự động. |
| Tệp, Hình ảnh | Đính kèm tệp hoặc hình ảnh. |

- Bấm vào thành phần thì nó được thêm vào cuối, kéo thì đặt được vào chỗ bạn muốn. Đặt được tối đa 100 mục.
- Với từng mục, bạn đặt tên mục, tên cột (chữ và số) và có bắt buộc hay không.

### Hàng và cột
Với từng hàng, khi chọn "1 cột", "2 cột", "2 cột (bên trái rộng)", "2 cột (bên phải rộng)", "3 cột", "4 cột", bạn xếp được các mục nằm ngang. Trên điện thoại, các mục xếp dọc. Tạo được tối đa 50 hàng.

### Điều kiện hiển thị
Với từng mục, bạn chuyển được việc hiển thị theo giá trị của mục khác ("bằng", "khác", "trống", "không trống"). Ví dụ, chỉ hiện "Lý do" khi trạng thái là "Tạm hoãn". Mục bắt buộc thì không gắn được điều kiện.

### Chi tiết (bảng con)
Bạn tạo được phần chi tiết, nơi nhập nhiều dòng cho 1 dữ liệu, như các sản phẩm trong một đơn hàng. Mỗi phần chi tiết tạo ra một bảng con, và hiện dưới màn hình nhập liệu ở dạng bảng. Tạo được tối đa 5 phần chi tiết. Trong phần chi tiết cũng dùng được thành phần tính toán và thành phần chọn từ bảng khác.

### Tính toán
Ở thành phần tính toán, bạn viết các mục số khác (số nguyên, số thập phân, tiền tệ, tính toán) trong `[ ]`.

- Ví dụ: `[Số lượng] * [Đơn giá]`
- Tổng của phần chi tiết: `SUM[tên chi tiết.mục]` (ví dụ: `SUM[Chi tiết đơn hàng.Thành tiền]`)
- Chỉ dùng được mục, số và `+ - * / ( )`.

### Nút
Bạn tạo được nút hiện trên màn hình của dữ liệu. Khi bấm, nút đổi giá trị của mục (ví dụ: bấm "Hoàn thành" thì trạng thái thành "Đã hoàn thành").

- Trên 1 màn hình tạo được tối đa 5 nút. Mục đổi được là lựa chọn, YES/NO, văn bản một dòng và số nguyên.
- Với dữ liệu đã có giá trị đó rồi, nút không hiện.
- Nút được tạo thành "[Cài đặt cập nhật hàng loạt](/vi/operation)" của bảng. Về sau bạn sửa hoặc xóa được ở đó.
- Chỉ người có quyền thiết lập của bảng đó mới tạo được nút.

### Thiết lập chi tiết
- **Tên bảng (chữ và số)**: tên dùng cho URL của dữ liệu, v.v. Khi để trống, tên được đặt tự động. Về sau không đổi được.
- **Vị trí thêm vào menu**: chọn thêm vào đâu trên menu bên trái (cũng chọn được "Không thêm").

## Tạo thành ứng dụng một lần
Ở "Tạo ứng dụng mới", tại mục "Tạo cùng ứng dụng", bạn tạo cùng lúc được cả các màn hình để xem dữ liệu.

| Thứ được tạo | Mục dùng |
| --- | --- |
| Kanban | Mục để chia làn (lựa chọn) |
| Lịch | Mục ngày (để tìm được trên lịch, chỉ mục tìm kiếm của mục đó được bật) |
| Biểu đồ (số lượng) | Số lượng theo từng mục dùng để phân loại (lựa chọn, YES/NO) |
| Bảng điều khiển | Xếp danh sách, biểu đồ và lịch. Quản trị viên hệ thống tạo thì mọi người thấy, người khác tạo thì chỉ người đó thấy. |

- Khi đặt mục dùng được, các thứ này tự được bật. Bạn cũng bỏ được.
- Tất cả đều giống với thứ được tạo ở màn hình thiết lập view và dashboard. Về sau bạn sửa được ở các màn hình đó.

<!-- Ảnh màn hình: Tạo cùng ứng dụng (img/studio/studio_bundle.png) -->

## Sửa bằng Studio
Màn hình nhập liệu đã tạo bằng Studio (và form của bảng đang có) sửa được trên cùng màn hình như lúc tạo. Trên danh sách màn hình, bấm tên của màn hình nhập liệu. Người sửa được là người có quyền thiết lập form của bảng đó.

- Bạn di chuyển hoặc bỏ mục, gắn hoặc bỏ điều kiện hiển thị, đổi tên màn hình, thêm nút.
- Mục đã bỏ khỏi màn hình thì cột của bảng và dữ liệu vẫn còn nguyên.
- Khi thêm thành phần từ "Mục mới (cột cũng sẽ được tạo trong bảng)", lúc lưu, cột được tạo trong bảng và cũng hiện trong danh sách. Chỉ người có quyền thiết lập của bảng mới làm được việc này. Thành phần tính toán không thêm được ở đây (thêm ở thiết lập cột).
- Các mục Studio chưa có, như tiêu đề, câu giải thích, HTML, hình ảnh, đường kẻ, mục hệ thống, được giữ lại chứ không bị xóa. Bạn di chuyển hoặc bỏ được, còn nội dung thì sửa ở thiết lập form.
- Phần chi tiết (nhập liệu của bảng con) được giữ nguyên. Khi muốn sửa phần chi tiết, hãy mở trong thiết lập form.
- Trước khi lưu, màn hình cho biết cái gì sẽ thay đổi (ví dụ "Bảng "..." cũng sẽ có thêm các cột "...".").

<!-- Ảnh màn hình: màn hình sửa bằng Studio (img/studio/studio_edit.png) -->

## Ứng dụng điện thoại (Exment app)
Khi mở `/app` bằng trình duyệt của điện thoại, bạn dùng được các màn hình của Studio như một ứng dụng điện thoại. Khi "Thêm vào màn hình chính", bạn mở được nó như một ứng dụng.

- **Màn hình**: các màn hình nhập liệu của những bảng bạn dùng được xếp ra. Mở ra thì danh sách hiện lên, và bạn đăng ký mới được bằng "+" ở góc dưới bên phải.
- **Ảnh và tệp**: ở mục tệp và hình ảnh, bạn chụp ảnh ngay tại chỗ rồi đính kèm được. Ảnh được thu nhỏ trong điện thoại rồi mới gửi.
- **Quét mã**: từ nút phía trên, bạn quét được mã QR và mã vạch bằng camera. Nếu là mã vạch 2 chiều của Exment ([Cài đặt mã vạch 2D](/vi/2d_barcode)) hoặc mã QR của URL dữ liệu, dữ liệu đó mở ra. Khi quét từ màn hình danh sách, hệ thống tìm dữ liệu có cùng giá trị ở các cột chữ, số nguyên và đánh số tự động của bảng đó. Mã JAN cũng tìm được.
- **Khi không có sóng**: lúc lưu mà không có sóng, nội dung đã nhập (cả phần chi tiết và ảnh) được giữ trong điện thoại làm bản nháp, và tự động gửi khi mở ứng dụng hoặc khi có sóng lại. Màn hình đã mở một lần thì không có sóng vẫn mở được, nên bạn cũng nhập mới được. Từ danh sách "Bản nháp chưa gửi", bạn mở để sửa, gửi ngay hoặc xóa. Bản nháp mà máy chủ không nhận được giữ lại kèm lý do. Bản nháp là của từng người dùng.
- Với "Bản PC", bạn trở về màn hình thường dùng.

<!-- Ảnh màn hình: danh sách và màn hình nhập liệu của ứng dụng điện thoại (img/studio/studio_app.png) -->

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [Form tùy chỉnh](/vi/form)
- [View tùy chỉnh](/vi/view)
- [Dashboard](/vi/dashboard)
- [Cài đặt cập nhật hàng loạt](/vi/operation)
- [Cài đặt mã vạch 2D](/vi/2d_barcode)
