# Thiết lập quan hệ (relation)
Giữa dữ liệu của bảng này và bảng khác có khi có mối liên quan (quan hệ).  
Ví dụ:
- Báo giá và thông tin chi tiết của báo giá đó  
- Tổ chức của công ty và những người dùng thuộc tổ chức đó  

Trang này giải thích cách thiết lập mối liên quan giữa các bảng.

- Trước tiên, quyết định "liên kết bằng cách nào" (mục "Khái niệm quan hệ (relation) trong Exment" ở dưới).
- Khi chỉ muốn biết thao tác trên màn hình, vui lòng xem "Cách thao tác thiết lập quan hệ" ở dưới.

## Khái niệm quan hệ (relation) trong Exment
Cách nghĩ về việc liên kết các bảng trong Exment hơi phức tạp.  
Bạn cần biết 2 điều: "1. Loại quan hệ" và "2. Cách thiết lập".  
Trước khi thiết lập trên màn hình, vui lòng đọc nội dung sau.

### 1. Loại quan hệ
Mối liên quan giữa các dữ liệu thông thường có 2 loại sau.  
#### Một-nhiều (1:n)
Nhiều dữ liệu của bảng con gắn, dưới dạng chi tiết, với 1 dữ liệu của bảng cha   

- Ví dụ: báo giá và chi tiết của báo giá đó  
Bảng "Báo giá" đăng ký "Ngày báo giá", "Thông tin khách hàng", "Tiêu đề". "Chi tiết báo giá" đăng ký tên hàng, số lượng, số tiền của báo giá đó thành nhiều dòng chi tiết  
![Màn hình bảng liên quan](../img/relation/relation_1_n_1.png)

- Ví dụ: hợp đồng và người phụ trách chính của hợp đồng đó  
1 người dùng có thể là người phụ trách chính của nhiều hợp đồng, nên người dùng và hợp đồng có quan hệ một-nhiều  
![Màn hình bảng liên quan](../ja/img/relation/agreement1.png)


#### Nhiều-nhiều (n:n)
Nhiều dữ liệu của bảng con gắn với dữ liệu của nhiều bảng (bảng cha)  

- Ví dụ: tổ chức và những người dùng thuộc tổ chức đó  
Người dùng có thể thuộc nhiều tổ chức (kiêm nhiệm, v.v.), nên đây là quan hệ nhiều-nhiều  
  
![Màn hình bảng liên quan](../ja/img/relation/nn.png)

Trước tiên, hãy nghĩ xem dữ liệu muốn liên kết thuộc loại nào trong hai loại trên.  

### 2. "(1) Thiết lập bảng liên quan" và "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)"
Trong Exment có 2 cách liên kết dữ liệu: "(1) Bảng liên quan" và "(2) Lựa chọn (từ bảng khác)".  

##### (1) Thiết lập bảng liên quan
Đây là cách được giải thích trong trang này.
Từ trang "Bảng tùy chỉnh", bấm nút [Cài đặt quan hệ] để đăng ký.    

##### (2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)
Đây là cách thiết lập trên màn hình [cột tùy chỉnh](/vi/column).  
Trong các loại cột của cột tùy chỉnh có loại "Lựa chọn (từ bảng khác)". Bạn tạo cột thuộc loại này.  
![Màn hình bảng liên quan](../img/relation/relation_select_table1.png)
![Màn hình bảng liên quan](../img/relation/relation_select_table2.png)

Khi thiết lập như vậy, trên [màn hình form dữ liệu](/vi/data_form), bạn chọn được giá trị từ bảng khác.  
Ví dụ (khách hàng là dữ liệu thử):
![Màn hình bảng liên quan](../img/relation/relation_select_table3.png)
![Màn hình bảng liên quan](../img/relation/relation_select_table4.png)

>Câu chữ hiện trong danh sách làm lựa chọn đổi được ở [Thiết lập cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề).

### Quyết định cách thiết lập quan hệ
Dùng (1) hay (2) là chỗ dễ phân vân.
Hãy quyết định theo các tiêu chí sau.

| Loại quan hệ | Khi nào | Cách dùng |
|---|---|---|
| Một-nhiều | Cha và con luôn là một bộ. Khi xóa cha thì xóa cả con mới đúng (ví dụ: báo giá và chi tiết báo giá) | (1) Thiết lập quan hệ |
| Một-nhiều | Không phải lúc nào cũng là một bộ. Dù xóa dữ liệu được tham chiếu, việc xóa cả dữ liệu đang tham chiếu là có vấn đề (ví dụ: báo giá và người phụ trách chính) | (2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác) |
| Nhiều-nhiều | Về cơ bản là cách này | (1) Thiết lập quan hệ |

#### 1. Trường hợp loại quan hệ là "một-nhiều"
Hãy quyết định theo 2 tiêu chí sau.
1. **Dữ liệu cha và dữ liệu con có luôn đi thành một bộ và gắn kết chặt chẽ với nhau hay không**  
Ví dụ, với bảng "Báo giá" và bảng "Chi tiết báo giá", dữ liệu chi tiết báo giá lúc nào cũng có dữ liệu báo giá, và chúng là một bộ.  
Khi như vậy, hãy liên kết bằng "(1) Thiết lập quan hệ".  
Mặt khác, bảng "Báo giá" và "Người phụ trách chính" của báo giá đó có liên kết về mặt tham chiếu dữ liệu, nhưng không phải lúc nào cũng là một bộ.  
Khi như vậy, hãy liên kết bằng "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)".  

2. **Khi xóa dữ liệu cha, việc xóa dữ liệu con có luôn là đúng hay không**  
Ví dụ, với bảng "Báo giá" và bảng "Chi tiết báo giá", khi xóa dữ liệu cha "Báo giá" thì xóa toàn bộ dữ liệu con "Chi tiết báo giá" là cách hoạt động đúng.  
Khi như vậy, hãy liên kết bằng "(1) Thiết lập quan hệ".  
![Màn hình bảng liên quan](../ja/img/relation/relation.explain.png)

Mặt khác, với bảng "Báo giá" và "Người phụ trách chính" của báo giá đó, chỉ vì xóa dữ liệu "Người phụ trách chính" mà xóa toàn bộ dữ liệu "Báo giá" người đó phụ trách chính là có vấn đề.  
Khi như vậy, hãy liên kết bằng "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)".  
![Màn hình bảng liên quan](../ja/img/relation/relation.explain2.png)


#### 2. Trường hợp loại quan hệ là "nhiều-nhiều"
Về cơ bản, hãy liên kết bằng "(1) Thiết lập quan hệ".  
Cũng làm được bằng cách "cho phép chọn nhiều" ở "(2) Lựa chọn của cột tùy chỉnh (chọn từ danh sách giá trị của bảng khác)", nhưng có những vấn đề như yếu về tìm kiếm dữ liệu.  

<br />  
Đến đây là bạn quyết định được liên kết các bảng bằng cách nào.  
Dưới đây là các bước khi làm "(1) Thiết lập bảng liên quan".  

## Cách thao tác thiết lập quan hệ

### Hiển thị trang
- Ở danh sách bảng tùy chỉnh, đánh dấu chỉ 1 bảng muốn thiết lập rồi bấm "Cài đặt chi tiết bảng" ở góc trên bên phải.  
![Màn hình bảng liên quan](../ja/img/relation/relation_grid3.png)
- Hoặc, sau khi chọn bảng muốn thiết lập từ menu, cũng bấm "Cài đặt chi tiết bảng" ở góc trên bên phải.  
※Trước đó, cần thiết lập để bảng đó hiện trên menu.  
![Màn hình bảng liên quan](../ja/img/relation/relation_grid4.png)
- Trên màn hình cài đặt chi tiết bảng hiện ra, bấm biểu tượng cài đặt quan hệ.
![Màn hình bảng liên quan](../ja/img/relation/relation_grid5.png)

- Vậy là danh sách cài đặt quan hệ của bảng tùy chỉnh đó hiện ra.  


### Thêm mới
- Trên màn hình "Cài đặt quan hệ", bấm nút [Tạo mới] ở góc trên bên phải của trang.

- Chọn bảng con sẽ liên kết và loại quan hệ, rồi bấm "Gửi".
![Màn hình bảng liên quan](../img/relation/relation_new2.png)  

### Chỉnh sửa
Khi muốn chỉnh sửa quan hệ, hãy bấm liên kết [Chỉnh sửa] ở dòng tương ứng.  
![Màn hình bảng liên quan](../img/relation/relation_edit.png)  

### Xóa
Khi muốn xóa quan hệ, hãy bấm liên kết [Xóa] ở dòng tương ứng.  
![Màn hình bảng liên quan](../img/relation/relation_delete.png)
