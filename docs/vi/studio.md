# Studio
Studio là chức năng để tạo, sửa và xem tổng quan các màn hình. Giống như ứng dụng của kintone, chỉ cần đặt các thành phần là tạo được nơi chứa dữ liệu (bảng), màn hình nhập và danh sách. Màn hình đã tạo cũng dùng được trên ứng dụng điện thoại (Exment app).

※Các chức năng ở đây có đầy đủ từ Exment v7.2.1.

## Bắt đầu sử dụng
- Studio ban đầu ở trạng thái "không dùng". Khi quản trị viên hệ thống bật "Studio" trong "Admin Setting" (cài đặt quản trị) → "[Feature Management](/vi/feature)" (quản lý tính năng), menu "Studio" sẽ hiện dưới "Admin Setting" (URL là `/admin/studio`).
- Trong số người được chọn ở Feature Management, Studio mở được cho người có quyền thiết lập bảng, form hoặc view của một bảng bất kỳ, và cho quản trị viên hệ thống.

| Việc | Quyền cần có |
| --- | --- |
| Tạo ứng dụng (bảng) mới | Quyền hệ thống "Table" |
| Thêm màn hình vào bảng, sửa bằng Studio | Quyền thiết lập form của bảng đó |
| Tạo nút, thêm mục (cột) mới khi sửa | Quyền thiết lập bảng đó |

<!-- Ảnh màn hình: danh sách màn hình của Studio (img/studio/studio_index.png) -->

## Danh sách màn hình
Mở Studio sẽ thấy các màn hình của trang trên một màn hình.

| Mục | Nội dung |
| --- | --- |
| Screens of the tables (màn hình của bảng) | Theo từng bảng: màn hình nhập (form) và danh sách (view), với "Open" (mở), "Edit" (sửa), "Copy" (sao chép), cùng liên kết đến thiết lập cột và thiết lập bảng. Lọc theo tên bảng/màn hình ở phía trên. |
| Dashboards | Dashboard của hệ thống và của người dùng. |
| Plugin pages (trang plugin) | Các plugin dạng trang. |
| Table relation diagram (sơ đồ quan hệ bảng) | Quan hệ 1-nhiều, nhiều-nhiều và các cột chọn từ bảng khác, dưới dạng sơ đồ. |

- Nhấn tên màn hình nhập (hoặc biểu tượng bút chì) để mở ở [Sửa bằng Studio](/vi/studio?id=sửa-bằng-studio). Màn hình thiết lập form như trước mở bằng biểu tượng bánh răng ("Open in the form settings").
- Chỉ hiện các bảng bạn thiết lập được và các màn hình bạn thiết lập được trong đó.

## Tạo ứng dụng / màn hình mới
Nhấn "New app or screen" (ứng dụng / màn hình mới) trên danh sách. Có 3 cách.

| Cách | Nội dung |
| --- | --- |
| Make a new app (tạo ứng dụng mới) | Đặt các thành phần sẽ tạo bảng và cột, màn hình nhập và danh sách. Nếu chọn, tạo luôn kanban, lịch, biểu đồ và dashboard ([Tạo thành ứng dụng một lần](/vi/studio?id=tạo-thành-ứng-dụng-một-lần)). |
| Add a screen to a table (thêm màn hình vào bảng) | Không tạo bảng. Đặt các cột có sẵn để chỉ tạo màn hình nhập (form). |
| Make from Excel or CSV (tạo từ Excel/CSV) | Đọc tệp Excel (.xlsx) hoặc CSV: dòng 1 là tên mục, từ dòng 2 là dữ liệu; hệ thống đoán loại thành phần và đặt sẵn. Sửa chỗ sai rồi lưu. Chọn "Take the data in too" (nhập cả dữ liệu) để nhập luôn dữ liệu (tối đa 1.000 dòng, tệp tối đa 10 MB). |

Trước khi lưu, màn hình cho biết sẽ tạo gì. Sau khi lưu, có thể nhập dữ liệu ngay trên màn hình mới.

<!-- Ảnh màn hình: tạo ứng dụng mới (img/studio/studio_create.png) -->

### Thành phần
| Thành phần | Nội dung |
| --- | --- |
| One-Line Text, Multiple-Line Text, URL, Email | Chữ. |
| Integer, Decimal, Currency | Số. |
| Calculation (tính toán) | Tính từ các mục số khác (xem "Tính toán" bên dưới). |
| Date, Date and Time, Time | Ngày và giờ. |
| Select (From Static Value), YES/NO | Chọn từ giá trị cố định. Mỗi lựa chọn viết một dòng. |
| Select (From Table) | Chọn dữ liệu của bảng khác. Đặt "Table to select from" (bảng để chọn). |
| User, Organization | Chọn người dùng hoặc tổ chức của Exment. |
| Auto Number (đánh số tự động) | Khi lưu, tự gán số kèm ngày (ví dụ 20261121-0001). |
| File, Image | Đính kèm tệp hoặc ảnh. |

- Nhấn thành phần để thêm vào cuối, hoặc kéo đến chỗ muốn đặt. Tối đa 100 mục.
- Với mỗi mục, đặt tên mục, tên cột (chữ và số) và có bắt buộc hay không.

### Hàng và cột
Chọn cho mỗi hàng 1 cột, 2 cột, 2 cột (trái rộng hơn), 2 cột (phải rộng hơn), 3 cột hoặc 4 cột để đặt các mục cạnh nhau. Trên điện thoại, các mục xếp dọc. Tối đa 50 hàng.

### Điều kiện hiển thị
Mỗi mục có thể hiện hoặc ẩn theo giá trị của mục khác ("is" bằng, "is not" khác, "is empty" trống, "is not empty" không trống; "Always shown" là luôn hiện). Ví dụ, chỉ hiện "Lý do" khi trạng thái là "Tạm dừng". Mục bắt buộc không đặt được điều kiện.

### Chi tiết (bảng con)
Tạo phần chi tiết nhập nhiều dòng cho một dữ liệu, như các sản phẩm trong một đơn hàng. Mỗi phần chi tiết tạo một bảng con, hiển thị dạng bảng dưới màn hình nhập. Tối đa 5 phần chi tiết. Trong chi tiết cũng dùng được tính toán và chọn từ bảng khác.

### Tính toán
Trong thành phần tính toán, viết các mục số khác (Integer, Decimal, Currency, Calculation) trong `[ ]`.

- Ví dụ: `[Số lượng] * [Đơn giá]`
- Tổng của chi tiết: `合計[tên chi tiết.mục]`
- Chỉ dùng được mục, số và `+ - * / ( )`.

### Nút
Tạo nút hiện trên trang của dữ liệu. Nút đổi giá trị của một mục (ví dụ "Hoàn thành" đổi trạng thái thành "hoàn thành").

- Tối đa 5 nút cho một màn hình. Mục có thể là lựa chọn, YES/NO, chữ một dòng hoặc số nguyên.
- Dữ liệu đã có giá trị đó thì không hiện nút.
- Nút được tạo thành một thiết lập cập nhật dữ liệu (data operation) của bảng, có thể sửa hoặc xóa sau ở đó.
- Chỉ người có quyền thiết lập bảng mới tạo được nút.

### Thiết lập chi tiết
- **Tên bảng (chữ và số)**: dùng trong URL của dữ liệu… Để trống sẽ tự đặt. Không đổi được về sau.
- **Nơi thêm vào menu**: chọn vị trí trên menu bên trái (hoặc không thêm).

## Tạo thành ứng dụng một lần
Ở "Make a new app", có thể tạo luôn các màn hình để xem dữ liệu trong mục "Made with the app" (tạo cùng ứng dụng).

| Tạo | Mục dùng |
| --- | --- |
| Kanban | Mục chia cột (lựa chọn) |
| Lịch | Mục ngày (bật chỉ mục tìm kiếm của mục đó vì lịch cần) |
| Biểu đồ (số lượng) | Số lượng theo mục (lựa chọn hoặc YES/NO) |
| Dashboard | Đặt danh sách, biểu đồ và lịch cạnh nhau. Quản trị viên hệ thống tạo thì mọi người thấy; người khác tạo thì chỉ người đó thấy. |

- Đặt mục dùng được thì tự bật. Có thể tắt.
- Mỗi thứ được tạo giống như khi tạo ở màn hình thiết lập view/dashboard, và sửa được ở đó về sau.

<!-- Ảnh màn hình: "Made with the app" (img/studio/studio_bundle.png) -->

## Sửa bằng Studio
Màn hình nhập tạo bằng Studio được sửa trên chính màn hình đã dùng để tạo. Nhấn tên màn hình nhập trên danh sách.

- Di chuyển hoặc bỏ mục, thêm hoặc bỏ điều kiện, đổi tên màn hình, thêm nút.
- Mục bỏ khỏi màn hình vẫn còn trong bảng cùng dữ liệu.
- Thêm thành phần từ "New items (the table gets their columns)" (mục mới, bảng có thêm cột) thì khi lưu bảng có thêm cột và cột hiện trong danh sách. Chỉ người có quyền thiết lập bảng mới làm được. Thành phần tính toán không thêm được ở đây (thêm ở thiết lập cột).
- Các mục Studio chưa tạo được (tiêu đề, giải thích, HTML, ảnh, đường kẻ, mục hệ thống) được giữ nguyên; di chuyển hoặc bỏ được, nội dung sửa ở thiết lập form.
- Chi tiết (nhập bảng con) giữ nguyên. Muốn sửa thì mở thiết lập form.
- Trước khi lưu, màn hình cho biết sẽ thay đổi gì.

<!-- Ảnh màn hình: sửa bằng Studio (img/studio/studio_edit.png) -->

## Ứng dụng điện thoại (Exment app)
Mở `/admin/app` bằng trình duyệt trên điện thoại để dùng màn hình của Studio như một ứng dụng. "Thêm vào màn hình chính" để mở như ứng dụng.

- **Màn hình**: hiện các màn hình nhập của những bảng bạn dùng được. Mở ra là danh sách; nút "+" ở góc dưới bên phải để thêm dữ liệu.
- **Ảnh, tệp**: ở mục tệp hoặc ảnh, chụp ảnh ngay tại chỗ. Ảnh được thu nhỏ trên điện thoại trước khi gửi.
- **"Scan a code" (quét mã)**: nút ở phía trên quét mã QR và mã vạch bằng camera. Mã vạch 2D của Exment ([2D barcode setting (English)](/2d_barcode)) hoặc mã QR của URL dữ liệu sẽ mở dữ liệu đó. Quét từ danh sách của một bảng thì tìm theo các cột chữ, số nguyên và đánh số tự động của bảng đó. Cũng tìm được mã JAN.
- **Khi không có sóng**: Khi lưu mà không có mạng, dữ liệu nhập (cả chi tiết và ảnh) được giữ trên điện thoại làm bản nháp và tự gửi khi mở ứng dụng hoặc khi có mạng lại. Màn hình đã mở một lần thì mở được cả khi không có mạng, nên nhập mới được. Trong "Drafts not sent" (bản nháp chưa gửi), có thể mở để sửa, gửi ngay hoặc xóa. Bản nháp máy chủ không nhận sẽ được giữ lại kèm lý do. Bản nháp theo từng người dùng.
- "PC" để trở về màn hình thường.

<!-- Ảnh màn hình: danh sách và màn hình nhập trên ứng dụng (img/studio/studio_app.png) -->

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [Form](/vi/form)
- [View](/vi/view)
- [Dashboard](/vi/dashboard)
- [Data operation (English)](/operation)
