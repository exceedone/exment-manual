# View biểu đồ Gantt

Đây là view hiển thị dữ liệu theo trục thời gian. Mỗi dữ liệu là một thanh ngang kéo dài từ ngày bắt đầu đến ngày hết hạn (ngày kết thúc).

## View biểu đồ Gantt là gì

Biểu đồ Gantt là hình biểu diễn khoảng thời gian của từng công việc bằng thanh ngang, xếp trên thang ngày tháng.  
Nhìn qua là biết công việc nào dự kiến từ khi nào đến khi nào, và tại thời điểm hôm nay công việc nào đã quá hạn.

Với view biểu đồ Gantt của Exment, bạn có thể làm những việc sau.

- Hiển thị 1 dữ liệu bằng 1 thanh, từ cột ngày bắt đầu đến cột ngày hết hạn (ngày kết thúc)
- Tô màu thanh theo từng giá trị của cột lựa chọn
- Hiển thị tỷ lệ tiến độ chồng lên bên trong thanh, và làm nổi bật bằng khung đỏ những dữ liệu đã quá hạn mà chưa hoàn thành
- Nhóm các dòng theo lựa chọn hoặc theo mốc (milestone, chọn từ danh sách giá trị của bảng khác), và hiển thị hạn của mốc bằng dấu ◆
- Hiển thị dữ liệu có quan hệ cha-con: dữ liệu con thụt vào dưới dữ liệu cha
- Hiển thị người phụ trách bằng biểu tượng

※Biểu đồ Gantt chỉ để hiển thị. Không thể kéo thanh trên biểu đồ để đổi ngày. Khi cần đổi ngày, v.v., hãy đổi từ màn hình chỉnh sửa dữ liệu.

## Thêm mới view

1. Mở màn hình cài đặt chế độ xem tùy chỉnh (xem [View tùy chỉnh](/vi/view)).
2. Nhấp vào nút [Mới] ở phía trên bên phải.
3. Trong hộp thoại hiển thị, chọn "Tạo chế độ xem biểu đồ Gantt mới".

Cũng có thể chọn "Tạo chế độ xem biểu đồ Gantt mới" từ menu của nút [Chế độ xem] trên màn hình danh sách dữ liệu. Khi đó, sau khi lưu, danh sách dữ liệu sẽ hiển thị bằng view đó.

※Nếu bảng không có cột "Ngày" hoặc "Ngày và giờ" nào, "Tạo chế độ xem biểu đồ Gantt mới" sẽ không hiển thị.

#### Tên hiển thị của chế độ xem, Quyền chế độ xem, Mặc định, Sử dụng hộp thông tin của chế độ xem
Đây là các mục thiết lập giống với [Các mục thiết lập của view](/vi/view?id=các-mục-thiết-lập-của-view).

## Thiết lập cơ bản

#### Cột ngày bắt đầu
Cột ngày làm vị trí bắt đầu của thanh. (Bắt buộc)  
※Chỉ có thể chỉ định cột "Ngày" hoặc "Ngày và giờ". Với cột "Ngày và giờ", chỉ phần ngày được dùng.

#### Cột ngày hết hạn (ngày kết thúc)
Cột ngày làm vị trí kết thúc của thanh. (Bắt buộc)  
Thanh được hiển thị từ ngày bắt đầu đến ngày hết hạn (gồm cả hai ngày).  
※Chỉ có thể chỉ định cột "Ngày" hoặc "Ngày và giờ".  
※Dữ liệu có ngày hết hạn trước hôm nay và tỷ lệ tiến độ dưới 100 được coi là "quá hạn": thanh có khung đỏ, và ngày hết hạn ở bên trái dòng có chữ đỏ. Khi chưa thiết lập "Cột tiến độ" hoặc tỷ lệ tiến độ chưa nhập, dữ liệu cũng được coi là quá hạn.

#### Màu thanh (cột lựa chọn)
Tô màu thanh theo từng giá trị của cột này. Chú giải giá trị và màu được hiển thị ở phía trên biểu đồ.  
※Chỉ có thể chỉ định cột "Lựa chọn (giá trị cố định)" hoặc "Lựa chọn (lưu giá trị và nhãn)". Với cột chọn nhiều, màu được tô theo giá trị đầu tiên.  
※Màu được lấy nguyên từ "Màu theo từng giá trị" của cột đó (gồm cả [mẫu hiển thị](/vi/cell_style_preset) đã thiết lập cho cột). Giá trị chưa chỉ định màu sẽ được tự động gán màu theo thứ tự của các lựa chọn.  
※Nếu không thiết lập, tất cả các thanh hiển thị màu xanh dương.

#### Cột tiến độ (0-100)
Hiển thị màu đậm chồng lên bên trong thanh, tương ứng với tỷ lệ tiến độ (%).  
※Chỉ có thể chỉ định cột "Số nguyên", "Số thập phân" hoặc "Tiền tệ".  
※Giá trị được xử lý trong khoảng 0–100. Dưới 0 hiển thị là 0, trên 100 hiển thị là 100.

## Cài đặt nâng cao

#### Nhóm hàng theo
Các dòng được nhóm và hiển thị theo từng giá trị của cột này. Nếu không chỉ định, các dòng hiển thị không nhóm.  
※Chỉ có thể chỉ định cột "Lựa chọn (giá trị cố định)", "Lựa chọn (lưu giá trị và nhãn)" hoặc "Lựa chọn (từ bảng khác)" (không phải loại chọn nhiều).

Thứ tự của các nhóm như sau.

| Loại cột | Thứ tự |
| --- | --- |
| Lựa chọn (giá trị cố định), Lựa chọn (lưu giá trị và nhãn) | Thứ tự của các lựa chọn |
| Lựa chọn (từ bảng khác) | Dữ liệu tham chiếu có hạn gần trước. Dữ liệu không có hạn ở cuối |

- Khi chỉ định cột "Lựa chọn (từ bảng khác)" (ví dụ cột tham chiếu bảng mốc), hạn của dữ liệu tham chiếu được hiển thị ở dòng tiêu đề của nhóm và bằng dấu ◆ trên biểu đồ.
- Dữ liệu chưa nhập giá trị được hiển thị ở cuối, trong nhóm "Chưa phân nhóm".
- Nhóm của giá trị không có dữ liệu nào sẽ không hiển thị.

※Hạn của dữ liệu tham chiếu được lấy từ cột đầu tiên có tên cột chứa một trong các từ "due", "end", "limit", "deadline", "期限", trong số các cột ngày ("Ngày", "Ngày và giờ") của bảng tham chiếu. Nếu không có cột nào như vậy, cột ngày cuối cùng được dùng. Nếu không có cột ngày, dấu ◆ không hiển thị.

#### Cột cha (tham chiếu chính bảng)
Khi chọn cột tham chiếu chính bảng này, dữ liệu con được hiển thị ngay dưới dữ liệu cha, thụt vào và có dấu "└".  
※Chỉ có thể chỉ định cột "Lựa chọn (từ bảng khác)" có bảng tham chiếu là chính bảng này.  
※Chỉ thụt vào 1 cấp. Dữ liệu từ cấp cháu trở đi được hiển thị ở cuối nhóm, không thụt vào.  
※Nếu dữ liệu cha không hiển thị trong cùng nhóm, dữ liệu con được hiển thị như dòng thông thường.

#### Cột người phụ trách
Khi chọn cột người dùng, mỗi dòng hiển thị biểu tượng của người phụ trách (ký tự đầu của tên người dùng). Khi đưa chuột lên biểu tượng, tên người dùng sẽ hiển thị.  
※Chỉ có thể chỉ định cột "Người dùng", hoặc cột "Lựa chọn (từ bảng khác)" có bảng tham chiếu là bảng người dùng. Với cột chọn nhiều, người đầu tiên được hiển thị.

#### Số bản ghi tối đa
Số dữ liệu tối đa hiển thị trên biểu đồ (10–2000, giá trị ban đầu 500).  
※Nếu không nhập hoặc giá trị nằm ngoài phạm vi, số này được xử lý là 500.  
※Khi dữ liệu khớp điều kiện hiển thị vượt quá số này, thông báo "Số bản ghi vượt quá giới hạn (○). Vui lòng thu hẹp bằng điều kiện hiển thị." sẽ hiển thị, và phần dữ liệu vượt quá không được hiển thị.

## Sắp xếp dữ liệu và Điều kiện hiển thị dữ liệu

Đây là các mục thiết lập giống với "Sắp xếp dữ liệu" và "Điều kiện hiển thị dữ liệu" trong [Các mục thiết lập của view](/vi/view?id=các-mục-thiết-lập-của-view).  
Dùng "Điều kiện hiển thị dữ liệu" để lọc dữ liệu hiển thị trên biểu đồ.

※Các dòng trên biểu đồ được hiển thị theo ngày bắt đầu sớm trước trong từng nhóm, bất kể thiết lập "Sắp xếp dữ liệu" (dữ liệu chưa nhập ngày bắt đầu ở cuối). "Sắp xếp dữ liệu" được dùng làm thứ tự để quyết định hiển thị dữ liệu nào khi dữ liệu vượt quá "Số bản ghi tối đa".

## Cách dùng biểu đồ

### Cách xem màn hình

#### Thanh công cụ

| Vị trí | Nội dung |
| --- | --- |
| Bên trái | Chú giải. Hiển thị giá trị và màu của "Màu thanh", "│ Hôm nay" cho biết hôm nay, và "◆ Hạn" nếu có hạn của mốc. |
| Bên phải | Hiển thị nút [Chế độ xem], menu của bảng và nút [Mới], giống như màn hình danh sách dữ liệu (hiển thị tùy theo quyền). |

#### Bên trái của dòng

Bên trái mỗi dòng hiển thị màu của thanh, tiêu đề của dữ liệu, biểu tượng người phụ trách và ngày hết hạn (tháng/ngày).

- Tiêu đề của dữ liệu là liên kết đến màn hình chi tiết của dữ liệu.
- Biểu tượng người phụ trách chỉ hiển thị khi đã thiết lập "Cột người phụ trách".
- Dữ liệu chưa nhập ngày hết hạn hiển thị là "—". Dữ liệu quá hạn hiển thị bằng chữ đỏ.
- Tiêu đề ở góc trên bên trái hiển thị tên của cột ở "Nhóm hàng theo".

#### Thang ngày tháng

- Hàng trên hiển thị năm tháng (ví dụ: 2026/10), hàng dưới hiển thị ngày thứ Hai của mỗi tuần (ví dụ: 10/19). Khi độ rộng hẹp, ngày của tuần được hiển thị cách 1 tuần.
- Thứ Bảy và Chủ nhật có nền màu xám nhạt.
- Ở vị trí hôm nay có đường dọc màu đỏ và chữ "Hôm nay".
- Khoảng thời gian hiển thị được tự động quyết định sao cho bao gồm ngày bắt đầu và ngày hết hạn của dữ liệu hiển thị, hạn của mốc và hôm nay. Trước và sau có thêm vài ngày trống, và được căn theo đơn vị từ thứ Hai đến Chủ nhật.
- Độ rộng của mỗi ngày được tự động điều chỉnh theo độ rộng màn hình (không có chức năng phóng to/thu nhỏ). Khi khoảng thời gian dài, hãy cuộn ngang để xem.
- Khi mở màn hình, màn hình tự động cuộn đến vị trí thấy được ngày hôm nay.

※Ngày cách hôm nay khoảng 3 năm trở lên không làm mở rộng khoảng thời gian hiển thị. Khi đó, thanh bị cắt ở mép của khoảng thời gian hiển thị.

#### Thanh

- Thanh được hiển thị từ ngày bắt đầu đến ngày hết hạn.
- Khi đã thiết lập "Cột tiến độ", màu đậm được hiển thị chồng lên bên trong thanh, tương ứng với tỷ lệ tiến độ.
- Dữ liệu quá hạn có khung đỏ quanh thanh.
- Khi đưa chuột lên thanh, tiêu đề của dữ liệu, khoảng thời gian (ngày bắt đầu ~ ngày hết hạn), tỷ lệ tiến độ và tên người phụ trách sẽ hiển thị.

※Dữ liệu chưa nhập ngày bắt đầu hoặc ngày hết hạn sẽ không có thanh, chỉ hiển thị phần bên trái của dòng.

#### Dòng tiêu đề của nhóm

Khi đã thiết lập "Nhóm hàng theo", mỗi nhóm có một dòng tiêu đề.

- Dòng tiêu đề hiển thị tên nhóm, số lượng và ngày hết hạn (với mốc).
- Nhấp vào dòng tiêu đề để thu gọn/mở rộng các dòng của nhóm đó.

### Mở dữ liệu

Khi nhấp vào thanh, hoặc vào tiêu đề của dữ liệu ở bên trái dòng, bạn sẽ chuyển đến màn hình chi tiết của dữ liệu đó.

### Các thông báo được hiển thị

| Thông báo | Nội dung |
| --- | --- |
| Để hiển thị biểu đồ Gantt, cần thiết lập cả "Cột ngày bắt đầu" và "Cột ngày đến hạn (ngày kết thúc)". Vui lòng chọn các cột ngày trên màn hình cài đặt chế độ xem. | Hiển thị khi chưa thiết lập "Cột ngày bắt đầu" hoặc "Cột ngày hết hạn (ngày kết thúc)", hoặc khi cột đã chỉ định không còn là cột ngày (đã bị xóa). |
| Số bản ghi vượt quá giới hạn (○). Vui lòng thu hẹp bằng điều kiện hiển thị. | Hiển thị khi dữ liệu khớp điều kiện hiển thị vượt quá "Số bản ghi tối đa". |
| Không có dữ liệu để hiển thị. | Hiển thị khi không có dữ liệu nào để hiển thị. |

## Lưu ý

- Biểu đồ Gantt chỉ để hiển thị. Không thể kéo thanh hoặc chỉnh sửa trên biểu đồ.
- Chỉ những dữ liệu mà người dùng đăng nhập xem được mới hiển thị.
- Có thể kiểm tra nội dung hiển thị trước khi lưu bằng nút [Xem trước] trên màn hình thiết lập view (xem [View tùy chỉnh](/vi/view?id=xem-trước)).
- Không thể chọn view biểu đồ Gantt ở "Danh sách dữ liệu" và "Biểu đồ" của dashboard (xem [Dashboard](/vi/dashboard)).

## Mục liên quan

- [View tùy chỉnh](/vi/view)
- [View Kanban](/vi/view_kanban)
- [Mẫu hiển thị](/vi/cell_style_preset)
- [Danh sách dữ liệu](/vi/data_grid)
