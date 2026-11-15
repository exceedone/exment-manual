# Thiết lập quan hệ (relation)
Giữa các bảng với nhau có thể tồn tại mối liên quan về dữ liệu.  
Ví dụ:
- Báo giá và thông tin chi tiết của báo giá đó  
- Tổ chức của công ty và những người dùng thuộc tổ chức đó  

Phần này trình bày cách thiết lập mối liên quan giữa các bảng như vậy.

## Khái niệm quan hệ (relation) trong Exment
Khái niệm liên kết giữa các bảng trong Exment hơi phức tạp.  
Bạn cần hiểu được 2 nội dung là "1. Loại quan hệ" và "2. Cách thiết lập".  
Vui lòng đọc nội dung dưới đây trước khi thiết lập trên màn hình Exment.

### 1. Loại quan hệ
Nhìn chung, quan hệ giữa các dữ liệu có 2 loại sau đây.  
#### Một-nhiều (1:n)
Nhiều dữ liệu của bảng con được gắn, dưới dạng chi tiết, với 1 dữ liệu của bảng cha   

- Ví dụ: Báo giá và chi tiết của báo giá đó  
Bảng "Báo giá" lưu "Ngày báo giá", "Thông tin khách hàng", "Tiêu đề"; còn "Chi tiết báo giá" lưu thông tin tên hàng, số lượng, số tiền thuộc báo giá đó, được đăng ký thành nhiều dòng chi tiết  
![Màn hình bảng liên quan](../img/relation/relation_1_n_1.png)

- Ví dụ: Hợp đồng và người phụ trách chính của hợp đồng đó  
Một người dùng có thể là người phụ trách chính của nhiều hợp đồng, nên giữa người dùng và hợp đồng là quan hệ một-nhiều  
![Màn hình bảng liên quan](../ja/img/relation/agreement1.png)


#### Nhiều-nhiều (n:n)
Nhiều dữ liệu của bảng con được gắn với nhiều dữ liệu của bảng (bảng cha)  

- Ví dụ: Tổ chức và những người dùng thuộc tổ chức đó  
Một người dùng có thể thuộc nhiều tổ chức (kiêm nhiệm, v.v.), nên đây là mối liên quan nhiều-nhiều  
  
![Màn hình bảng liên quan](../ja/img/relation/nn.png)

Trước tiên, bạn cần xác định dữ liệu muốn liên kết lần này thuộc trường hợp nào trong hai trường hợp trên.  

### 2. "(1) Thiết lập bảng liên quan" và "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)"
Trong Exment có 2 cách liên kết dữ liệu là "(1) Bảng liên quan" và "(2) Lựa chọn (chọn từ danh sách giá trị của bảng khác)".  
Sau đây là giải thích về từng cách thiết lập.

##### (1) Thiết lập bảng liên quan
Đây là cách được giới thiệu trong trang này.
Từ trang "Custom Table", nhấp vào nút "Relation Setting" rồi thao tác để đăng ký.    

##### (2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)
Đây là cách thiết lập trên màn hình [cột tùy chỉnh](/vi/column).  
Trong số các loại cột có thể thiết lập cho cột tùy chỉnh, có loại cột "Choice (select from a list of values in another table)" (lựa chọn - chọn từ danh sách giá trị của bảng khác).  
![Màn hình bảng liên quan](../img/relation/relation_select_table1.png)
![Màn hình bảng liên quan](../img/relation/relation_select_table2.png)

Khi thực hiện thiết lập này, trên [màn hình form dữ liệu](/vi/data_form), bạn có thể chọn giá trị từ bảng khác.  
Ví dụ (khách hàng là dữ liệu thử nghiệm):
![Màn hình bảng liên quan](../img/relation/relation_select_table3.png)
![Màn hình bảng liên quan](../img/relation/relation_select_table4.png)

>Nội dung văn bản hiển thị trong danh sách lựa chọn có thể được thay đổi bằng [Thiết lập cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề).

### Quyết định cách thiết lập quan hệ
Nên dùng cách nào trong hai cách thiết lập quan hệ nêu trên là một vấn đề rất khó quyết định và khó hiểu.
Hãy quyết định cách thiết lập quan hệ dựa trên các tiêu chí dưới đây.

#### 1. Trường hợp loại quan hệ là "một-nhiều"
Trong trường hợp này, hãy quyết định theo 2 tiêu chí sau.
1. **Dữ liệu cha và dữ liệu con có luôn đi thành một bộ và gắn kết chặt chẽ với nhau hay không**  
Ví dụ, với bảng "Báo giá" và bảng "Chi tiết báo giá", dữ liệu chi tiết báo giá luôn đi kèm dữ liệu báo giá và tạo thành một bộ.  
Trong trường hợp như vậy, hãy thiết lập liên kết bằng "(1) Thiết lập quan hệ".  
Mặt khác, bảng "Báo giá" và "Người phụ trách chính" của báo giá đó có liên quan với nhau về mặt tham chiếu dữ liệu, nhưng báo giá và người phụ trách chính không phải lúc nào cũng là một bộ.  
Trong trường hợp như vậy, hãy thiết lập liên kết bằng "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)".  

2. **Khi xóa dữ liệu cha, việc xóa dữ liệu con có luôn là đúng hay không**  
Ví dụ, với bảng "Báo giá" và bảng "Chi tiết báo giá", khi xóa dữ liệu "Báo giá" là dữ liệu cha thì việc xóa toàn bộ dữ liệu "Chi tiết báo giá" là dữ liệu con là điều bình thường.  
Trong trường hợp như vậy, hãy thiết lập liên kết bằng "(1) Thiết lập quan hệ".  
![Màn hình bảng liên quan](../ja/img/relation/relation.explain.png)

Mặt khác, với bảng "Báo giá" và "Người phụ trách chính" của báo giá đó, sẽ có vấn đề nếu chỉ vì xóa dữ liệu "Người phụ trách chính" mà xóa toàn bộ dữ liệu "Báo giá" do người đó phụ trách chính.  
Trong trường hợp như vậy, hãy thiết lập liên kết bằng "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)".  
![Màn hình bảng liên quan](../ja/img/relation/relation.explain2.png)


#### 2. Trường hợp loại quan hệ là "nhiều-nhiều"
Trong trường hợp này, về cơ bản hãy thiết lập bằng "(1) Thiết lập quan hệ".  
Cũng có thể đáp ứng bằng cách "cho phép chọn nhiều" trong "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)", nhưng cách này có những hạn chế như yếu về tìm kiếm dữ liệu.  
Vì vậy, về cơ bản hãy thiết lập bằng "(1) Thiết lập quan hệ".  

<br />  
Qua các bước trên, bạn sẽ xác định được phương án thiết lập liên kết giữa các bảng.  
Dưới đây là giải thích về trình tự thao tác khi thực hiện "(1) Thiết lập bảng liên quan".  

## Cách thao tác thiết lập quan hệ

### Hiển thị trang
- Trong danh sách bảng tùy chỉnh, đánh dấu chọn 1 bảng muốn thiết lập, rồi nhấp vào "Table Detail Setting" (thiết lập chi tiết bảng) ở phía trên bên phải.  
![Màn hình bảng liên quan](../ja/img/relation/relation_grid3.png)
- Hoặc, sau khi chọn bảng muốn thiết lập từ menu, cũng nhấp vào "Table Detail Setting" ở phía trên bên phải.  
※ Cần thiết lập trước để bảng tương ứng được hiển thị trong menu.  
![Màn hình bảng liên quan](../ja/img/relation/relation_grid4.png)
- Trên màn hình thiết lập chi tiết bảng được hiển thị, nhấp vào biểu tượng thiết lập quan hệ.
![Màn hình bảng liên quan](../ja/img/relation/relation_grid5.png)

- Khi đó, danh sách các thiết lập quan hệ của bảng tùy chỉnh đã chọn sẽ được hiển thị.  


### Thêm mới
- Trên màn hình "Relation Setting", nhấp vào nút "New" ở phía trên bên phải trang.

- Chọn bảng con cần liên kết và loại quan hệ, rồi nhấp "Submit".
![Màn hình bảng liên quan](../img/relation/relation_new2.png)  

### Chỉnh sửa
Nếu muốn chỉnh sửa cột, hãy nhấp vào liên kết "Edit" ở dòng tương ứng.  
![Màn hình bảng liên quan](../img/relation/relation_edit.png)  

### Xóa
Nếu muốn xóa cột, hãy nhấp vào liên kết "Delete" ở dòng tương ứng.  
![Màn hình bảng liên quan](../img/relation/relation_delete.png)  
