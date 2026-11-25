# Đăng ký dữ liệu
- Hiển thị form dùng để tạo và chỉnh sửa dữ liệu trong Exment.  
- Các mục hiển thị trên màn hình form được quyết định bởi [thiết lập cột tùy chỉnh](/vi/column.md), form tùy chỉnh và thiết lập [bảng liên quan](/vi/relation.md).  
- Nếu nội dung hiển thị không như mong muốn, cần thiết lập tại các trang nêu trên.  

## Danh sách chức năng
![Màn hình dữ liệu](../img/data/data_form1.png)  

##### Nút [Move to page]  
Chuyển sang màn hình thay đổi thiết lập của bảng tùy chỉnh đang hiển thị.

##### Nút [List]  
Chuyển sang màn hình danh sách dữ liệu.

##### Nút [Display]  
Chuyển sang màn hình xem dữ liệu.

##### Nút [Delete]
Xóa dữ liệu đang hiển thị.  
※ Dữ liệu đã xóa có thể khôi phục từ [Deleted data (English)](/deleted_data).

##### Các mục của form  
Thay đổi giá trị của dữ liệu.  
Các mục hiển thị trên màn hình form được quyết định bởi [thiết lập cột tùy chỉnh](/vi/column.md), form tùy chỉnh và thiết lập [bảng liên quan](/vi/relation.md).  
Nếu nội dung hiển thị không như mong muốn, cần thiết lập tại các trang nêu trên.  

##### Bảng con  
Nếu đã thiết lập quan hệ 1:n hoặc n:n tại [bảng liên quan](/vi/relation.md), bạn cũng có thể thêm / thay đổi dữ liệu của bảng được thiết lập làm bảng liên quan.


## Chi tiết chức năng  

### Bảng con
Nếu đã thiết lập quan hệ 1:n hoặc n:n tại [bảng liên quan](/vi/relation.md), bạn cũng có thể thêm / thay đổi dữ liệu của bảng được thiết lập làm bảng liên quan.  
Ví dụ: nếu bảng đang hiển thị là "Hợp đồng" và bảng con là "Chi tiết hợp đồng", bạn có thể đăng ký các nội dung như ngày thanh toán, thông tin khách hàng, đồng thời thêm / thay đổi dữ liệu chi tiết của hợp đồng đó.  
![Màn hình bảng con](../img/data/data_form2.png)  
  
※ Có 2 cách hiển thị dữ liệu của bảng con: "dạng form thông thường" và "dạng bảng".  
Việc chuyển đổi dạng hiển thị được thực hiện trên màn hình form tùy chỉnh.  
  
##### Nút [New]  
Thêm 1 dữ liệu của bảng con.  
  
##### Nút [Delete]  
Xóa dữ liệu của bảng con đã chọn.  


### Màn hình chuyển đến sau khi lưu dữ liệu
![Màn hình bảng con](../img/data/data_submit_redirect1.png)  
Các ô đánh dấu (checkbox) được hiển thị ở bên trái nút lưu.  
Khi đánh dấu chọn các ô này, màn hình được chuyển đến sau khi lưu dữ liệu sẽ thay đổi.

- List : Chuyển đến màn hình danh sách của dữ liệu đó. ※ Nếu không đánh dấu chọn ô nào, hệ thống cũng chuyển đến màn hình danh sách.
- View : Chuyển đến màn hình chi tiết của dữ liệu đó. 
- Continue creating : Chuyển đến màn hình tạo mới dữ liệu của bảng đó. 
- Continue editing : Hiển thị lại màn hình chỉnh sửa của dữ liệu đó. 

※ Sau khi lưu với "Continue creating" hoặc "Continue editing" đang được đánh dấu chọn, khi form được hiển thị lại, "Continue creating" hoặc "Continue editing" sẽ ở trạng thái được đánh dấu chọn sẵn theo mặc định.  
※ Từ v3.9.1, có thể chỉ định giá trị mặc định của các ô đánh dấu này. Vui lòng xem chi tiết [tại đây](/vi/system_setting).


