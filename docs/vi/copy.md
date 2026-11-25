# Cài đặt sao chép dữ liệu
Đây là thiết lập để sao chép dữ liệu của một bảng sang bảng khác (hoặc cùng bảng).  
Ví dụ, có thể dùng như sau.

- Hiển thị nút "Chuyển thành đơn hàng" trên màn hình chi tiết của dữ liệu "Báo giá". Khi bấm, dữ liệu "Đơn hàng" được tạo với nội dung của báo giá.
- Bạn tạo bảng có cùng các mục cho từng năm ("Dữ liệu ○○ năm 2025", "Dữ liệu ○○ năm 2026"). Khi nhập cho năm 2026, bạn tìm dữ liệu của năm 2025, sao chép nội dung rồi mới nhập.

Có 2 cách sao chép. Cả hai đều dùng "cột nào được chép sang cột nào" đã quyết định ở thiết lập này.

| Cách | Nơi hiển thị nút | Hoạt động |
|---|---|---|
| [Nút sao chép trên màn hình chi tiết](/vi/copy?id=nút-sao-chép-trên-màn-hình-chi-tiết) | Màn hình chi tiết của dữ liệu nguồn | Khi bấm, dữ liệu **được tạo** ở bảng đích. |
| [Nút sao chép dữ liệu trên màn hình tạo mới](/vi/copy?id=nút-sao-chép-dữ-liệu-trên-màn-hình-tạo-mới) | Màn hình tạo mới của bảng đích | Khi tìm và chọn dữ liệu nguồn, nội dung của nó được đưa vào các ô nhập. **Dữ liệu chưa được tạo cho đến khi lưu**. |

※Nút "Sao chép dữ liệu" dùng được từ Exment v7.2.2 trở đi.  
※Người tạo được thiết lập này là người dùng có quyền "Cài đặt bảng" của bảng nguồn (gồm cả quản trị viên hệ thống).

## Cách mở màn hình thiết lập
Cài đặt sao chép dữ liệu được tạo như một thiết lập của **bảng nguồn**.

- Mở danh sách dữ liệu của bảng nguồn, rồi bấm "Cài đặt sao chép dữ liệu" từ "Cài đặt chi tiết bảng" ở phía trên bên phải.  
※Cần cho bảng đó hiển thị trên menu từ trước.
- Hoặc, ở "Cài đặt: Dữ liệu và màn hình" → "Bảng tùy chỉnh" của menu, đánh dấu chọn 1 dòng của bảng nguồn, rồi bấm "Cài đặt sao chép dữ liệu" từ "Cài đặt chi tiết bảng" ở phía trên bên phải.

## Thêm mới
1. Trên màn hình "Cài đặt sao chép dữ liệu", bấm [Mới] ở phía trên bên phải.
1. Trong hộp thoại, chọn "Bảng đích".
1. "Ghép các cột cùng tên" lúc đầu là bật. Nếu để bật và tiếp tục, các cột có cùng tên cột ở bảng nguồn và bảng đích sẽ có sẵn trong "Cài đặt cột sao chép" ([Cài đặt cột sao chép](/vi/copy?id=cài-đặt-cột-sao-chép)).
1. Trên màn hình thiết lập, nhập các thông tin cần thiết rồi bấm [Gửi].

## Chỉnh sửa và xóa
Thực hiện từ [Chỉnh sửa] và [Xóa] ở dòng tương ứng trong danh sách.

## Chi tiết các mục nhập

### Thiết lập cơ bản
- ##### Bảng nguồn và Bảng đích
Bảng nguồn và bảng đích của việc sao chép. Không đổi được ở đây.

- ##### Nhãn nút
Chữ hiển thị trên nút "Sao chép" của màn hình chi tiết. Lúc đầu là "Sao chép". Ví dụ: "Chuyển thành đơn hàng", "Sao chép sang năm 2026"

- ##### Biểu tượng nút và HTML class của nút
Biểu tượng và HTML class của nút "Sao chép" trên màn hình chi tiết.

- ##### Nút trên biểu mẫu tạo mới
Khi bật, nút "Sao chép dữ liệu" hiển thị trên màn hình tạo mới của bảng đích ([Nút sao chép dữ liệu trên màn hình tạo mới](/vi/copy?id=nút-sao-chép-dữ-liệu-trên-màn-hình-tạo-mới)). Lúc đầu là tắt.  
※Từ v7.2.2 trở đi.

- ##### Nội dung trong ngoặc của nút trên biểu mẫu tạo mới
Chọn nội dung hiển thị trong ngoặc của nút "Sao chép dữ liệu". Chỉ hiển thị khi "Nút trên biểu mẫu tạo mới" là bật.

| Lựa chọn | Tên của nút |
|---|---|
| Tự động (lúc đầu) | "Sao chép dữ liệu". Khi có từ 2 thiết lập trở lên hiển thị nút này cho cùng một bảng thì là "Sao chép dữ liệu (tên bảng nguồn)" |
| Tên bảng nguồn | Luôn là "Sao chép dữ liệu (tên bảng nguồn)" |
| Nhãn | "Sao chép dữ liệu (nhãn của nút trên biểu mẫu tạo mới)" |

- ##### Nhãn của nút trên biểu mẫu tạo mới
Chữ hiển thị trong ngoặc. Ví dụ: nhập "Năm trước" thì thành "Sao chép dữ liệu (Năm trước)". Chỉ hiển thị khi chọn "Nhãn" cho nội dung trong ngoặc.

※2 mục này có từ v7.2.2 trở đi.

- ##### Cài đặt bảng con
Với nút "Sao chép" trên màn hình chi tiết, dữ liệu của bảng con của dữ liệu đó cũng được sao chép cùng. Hãy tạo trước cài đặt sao chép dữ liệu giữa các bảng con (loại không có cài đặt hộp thoại nhập).  
※Nút "Sao chép dữ liệu" trên màn hình tạo mới không chép bảng con.

### Cài đặt cột sao chép
Đây là các cặp cột của bảng nguồn và cột của bảng đích. Mỗi dòng chọn 1 cặp "Cột của bảng nguồn ▶ Cột của bảng đích".

| Cột của bảng nguồn | | Cột của bảng đích |
|---|---|---|
| Tên khách hàng | ▶ | Tên đối tác |
| Số tiền | ▶ | Số tiền báo giá |
| Người phụ trách | ▶ | Người phụ trách |

- Dù tên cột khác nhau, chỉ cần ghép cặp là chép được.
- Cột không có ở đây thì không được chép. Ở bảng đích, cột đó sẽ trống (hoặc là giá trị ban đầu).
- **Hãy đưa tất cả các cột bắt buộc của bảng đích vào các cặp**. Nếu thiếu thì không lưu được.
- Không chọn được cột tệp và cột hình ảnh.

#### Ghép các cột cùng tên
Với các bảng có cùng các mục, ghép từng cột một thì mất công. Khi bật "Ghép các cột cùng tên" lúc thêm mới, **các cột có cùng tên cột ("tên cột" của cột tùy chỉnh)** sẽ có sẵn trong các cặp. Cũng có thể đưa vào lại bằng nút "Ghép các cột cùng tên" ở phía trên bên phải màn hình thêm mới (nội dung đang nhập sẽ mất).

- Cột đánh số tự động không được ghép.
- Cột có tên cột khác nhau không được đưa vào, nên nếu cần hãy thêm bằng tay. Các cặp đã đưa vào có thể sửa hoặc xóa.
- Màn hình chỉnh sửa của thiết lập đã có không có nút này.

※Từ v7.2.2 trở đi.

#### Khi loại cột khác nhau
Cũng chọn được cặp có loại cột khác nhau (ví dụ: văn bản → số nguyên), nhưng giá trị được chép nguyên như cũ. Giá trị không phù hợp sẽ báo lỗi ở bước kiểm tra nhập khi lưu. Với cột lựa chọn, giá trị không có lựa chọn giống ở bảng đích sẽ thành trạng thái chưa chọn.

### Cài đặt hộp thoại nhập
Đây là các cột cần nhập lại trong hộp thoại khi bấm nút "Sao chép" trên màn hình chi tiết. Với cột đưa vào đây, dữ liệu được tạo bằng giá trị đã nhập trong hộp thoại.  
※Không dùng cho nút "Sao chép dữ liệu" trên màn hình tạo mới (vì có thể sửa ngay ở các ô nhập).

## Nút sao chép trên màn hình chi tiết
Nút có "Nhãn nút" hiển thị trên màn hình chi tiết của dữ liệu nguồn.

1. Bấm nút.
    - Khi không có cài đặt hộp thoại nhập, thông báo xác nhận hiển thị.
    - Khi có cài đặt hộp thoại nhập, hộp thoại nhập của các cột đó hiển thị.
1. Dữ liệu được tạo ở bảng đích, và màn hình chuyển đến dữ liệu vừa tạo.

※Người bấm được nút là người dùng xem được dữ liệu nguồn và tạo được dữ liệu ở bảng đích.

## Nút sao chép dữ liệu trên màn hình tạo mới
Khi bật "Nút trên biểu mẫu tạo mới", nút "Sao chép dữ liệu" hiển thị ở phía trên bên phải màn hình tạo mới của **bảng đích**.

1. Trên màn hình tạo mới của bảng đích (ví dụ: Dữ liệu ○○ năm 2026), bấm "Sao chép dữ liệu".
1. Danh sách dữ liệu của bảng nguồn (ví dụ: Dữ liệu ○○ năm 2025) mở ra trong hộp thoại. Đây là cùng hộp thoại với "Tìm kiếm" của cột chọn dữ liệu, có thể tìm kiếm, lọc và sắp xếp.
1. Bấm "Chọn" ở dữ liệu muốn chép, rồi bấm [Thiết lập].
1. Màn hình tạo mới có sẵn nội dung của dữ liệu đã chọn mở ra. Phía trên hiển thị "Đã sao chép các giá trị của "○○" trong ○○.".
1. Sửa những chỗ cần thiết rồi lưu. **Dữ liệu chưa được tạo cho đến khi lưu**.

- Cột tệp, cột hình ảnh và cột đánh số tự động không được chép (giống "Nhân bản thành bản ghi mới").
- Tên của nút chọn được ở "Nội dung trong ngoặc của nút trên biểu mẫu tạo mới" (Tự động, Tên bảng nguồn, Nhãn).
- Nút chỉ hiển thị với người dùng xem được dữ liệu của bảng nguồn. Hộp thoại cũng chỉ hiển thị những dữ liệu xem được.

※Từ v7.2.2 trở đi.

## Khi sao chép trong cùng một bảng
Cũng có thể chọn cùng bảng làm bảng đích. Nếu chỉ cần chép dữ liệu của cùng bảng mà không thiết lập, có thể nhấp chuột phải vào dòng của danh sách dữ liệu rồi chọn "Nhân bản thành bản ghi mới" ([Danh sách dữ liệu](/vi/data_grid)).

## Mục liên quan
- [Chi tiết dữ liệu](/vi/data_details)
- [Danh sách dữ liệu](/vi/data_grid)
- [Đăng ký dữ liệu](/vi/data_form)
- [Cài đặt cập nhật dữ liệu](/vi/operation)
- [Cài đặt quan hệ](/vi/relation)
