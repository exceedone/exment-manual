# Dữ liệu
Đây là chức năng dùng để xem danh sách, thêm mới, chỉnh sửa, hiển thị và xóa dữ liệu của từng bảng được lưu trong Exment.  
Người dùng nhập và lưu các giá trị dựa trên các bảng do quản trị viên hệ thống tạo.  
Dữ liệu chủ yếu có các chức năng sau đây.  

## Danh sách dữ liệu
Đây là danh sách dữ liệu được lưu trong bảng đó.  
Danh sách chỉ hiển thị những dữ liệu do chính bạn tạo hoặc những dữ liệu mà bạn được gán quyền.  

※ Khi đăng ký cho người dùng hoặc tổ chức quyền chỉnh sửa / xem toàn bộ dữ liệu, toàn bộ dữ liệu sẽ được hiển thị bất kể điều kiện nêu trên.  
![Màn hình dữ liệu](../img/data/data_grid1.png)  
  
Để biết chi tiết về màn hình danh sách, vui lòng xem [Danh sách dữ liệu](/vi/data_grid.md).  


## Thêm mới dữ liệu
- Nếu muốn thêm dữ liệu, nhấp vào liên kết [New] ở góc trên bên phải của trang.  

※ Nếu người dùng đăng nhập không có quyền "Edit" (chỉnh sửa) đối với bảng đó, nút này sẽ không được hiển thị.  
Về cách gán quyền, vui lòng xem [Nhóm vai trò / Thiết lập quyền](/vi/role_group.md) ở menu bên trái.  
![Màn hình dữ liệu](../img/data/data_new1.png)

- Màn hình tạo mới dữ liệu được hiển thị.  

![Màn hình dữ liệu](../img/data/data_new2.png)
  
- Khi nhấp vào nút [Preview] (xem trước) ở góc trên bên phải của màn hình tạo mới, bạn có thể kiểm tra nội dung hiển thị trong một cửa sổ khác mà không lưu nội dung đang nhập.  
Nội dung được hiển thị dưới dạng danh sách tên mục và giá trị, theo từng khối (block) của form.  
※ Nút [Preview] chỉ được hiển thị trên màn hình tạo mới dữ liệu, không được hiển thị trên màn hình chỉnh sửa.  
※ Dữ liệu không được lưu khi xem trước. Nếu muốn cập nhật nội dung hiển thị sau khi thay đổi nội dung nhập, hãy nhấp lại vào nút [Preview] trên màn hình ban đầu.  
※ Các khối của bảng con không được hiển thị trong bản xem trước.

- Để biết chi tiết về màn hình thêm mới, vui lòng xem [Form dữ liệu](/vi/data_form.md).  


## Chỉnh sửa dữ liệu
- Nếu muốn chỉnh sửa dữ liệu, hãy nhấp vào liên kết [Edit] ở dòng tương ứng.  

※ Nếu người dùng đăng nhập không có quyền "Edit" (chỉnh sửa) đối với bảng đó, liên kết này sẽ không được hiển thị.  
 Về cách gán quyền, vui lòng xem [Nhóm vai trò / Thiết lập quyền](/vi/role_group.md) ở menu bên trái.  
![Màn hình dữ liệu](../img/data/data_edit1.png)

- Màn hình chỉnh sửa dữ liệu được hiển thị.  

![Màn hình dữ liệu](../img/data/data_edit2.png)
  
- Để biết chi tiết về màn hình chỉnh sửa, vui lòng xem [Form dữ liệu](/vi/data_form.md).  

> Khi cập nhật dữ liệu, nếu một người dùng khác đã cập nhật dữ liệu đó trước, thông báo lỗi dưới đây sẽ được hiển thị.
![Màn hình dữ liệu](../img/data/data_edit_error.png)

## Hiển thị dữ liệu
- Nếu muốn hiển thị dữ liệu, hãy nhấp vào liên kết [Display] (hiển thị) ở dòng tương ứng.  

![Màn hình dữ liệu](../img/data/data_show1.png)

- Màn hình hiển thị dữ liệu xuất hiện.  

![Màn hình dữ liệu](../img/data/data_show2.png)
  
- Để biết chi tiết về màn hình hiển thị, vui lòng xem [Chi tiết dữ liệu](/vi/data_details.md).  


## Xóa dữ liệu
- Nếu muốn xóa dữ liệu, hãy nhấp vào liên kết [Delete] ở dòng tương ứng.  
![Màn hình cột tùy chỉnh](../img/data/data_delete1.png)


## Sao chép dữ liệu
- Nếu muốn sao chép dữ liệu, hãy nhấp vào liên kết [Copy] ở dòng tương ứng.  
※ Để hiển thị liên kết sao chép, cần thay đổi giá trị thiết lập. Vui lòng xem [tại đây](/config?id=display-custom-data-copy-link).  
![Màn hình danh sách dữ liệu](../img/data/data_copy1.png)

- Màn hình chỉnh sửa được hiển thị với nội dung của dữ liệu đã chọn được điền sẵn làm giá trị ban đầu.  
※ Chỉ những mục có trên form mới được sao chép.  
※ Các mục như số tự động (auto number), tệp, hình ảnh, v.v. không thuộc đối tượng sao chép.  
![Màn hình dữ liệu](../img/data/data_copy2.png)

- Hãy chỉnh sửa nội dung nếu cần rồi lưu lại.  
