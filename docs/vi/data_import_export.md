# Nhập / xuất dữ liệu
Trang này giải thích màn hình dùng để xuất dữ liệu của bảng ra tệp (export) và nhập dữ liệu từ tệp (import). Tệp là csv hoặc xlsx.

| Việc muốn làm | Nơi xem |
|---|---|
| Xuất dữ liệu ra tệp (tất cả các cột) | [Xuất dữ liệu](/vi/data_import_export?id=xuất-dữ-liệu) |
| Xuất ra tệp theo dạng của view đang xem | "Xuất dữ liệu (view)" |
| Nhập dữ liệu từ tệp | "Nhập dữ liệu" |
| Nhập và xuất bằng lệnh | [Nhập / xuất dữ liệu bằng lệnh](/vi/data_cmd_import_export) |
| Đưa lượng lớn dữ liệu vào cùng lúc bằng lệnh | [Nạp hàng loạt dữ liệu lớn](/vi/data_bulk_insert) |

## Các loại chức năng xuất và nhập dữ liệu
- Chức năng xuất và nhập hiện có các loại sau.
    - <span class="heading_smaller_than_h5">Xuất</span>  
    Xuất (export) dữ liệu của bảng đã lưu, với tất cả các cột.  

    - <span class="heading_smaller_than_h5">Xuất (view)</span>  
    Xuất (export) dữ liệu của bảng theo dạng của view đang hiển thị.  

    - <span class="heading_smaller_than_h5">Nhập</span>  
    Nhập (import) dữ liệu của bảng từ tệp csv hoặc xlsx.  

- Khi nhấp vào nút [Nhập/Xuất] trên màn hình danh sách dữ liệu của bảng, menu sau hiển thị.
![Màn hình dữ liệu](../img/data/data_export_import_button1.png)  

>Các mục không dùng có thể cho ẩn đi bằng [giá trị thiết lập](/vi/config).


## Xuất dữ liệu
Xuất (export) dữ liệu của bảng ra tệp.  
Định dạng tệp là csv hoặc xlsx (khuyến nghị).  

### Cách thao tác
- Hiển thị màn hình danh sách dữ liệu.
![Màn hình dữ liệu](../img/data/data_grid1.png)  

- Nút [Nhập/Xuất] hiển thị ở phía trên bên phải của trang, hãy nhấp vào.  
![Màn hình dữ liệu](../img/data/data_export1.png)  


- Menu hiển thị, hãy chọn mục muốn xuất.  
![Màn hình dữ liệu](../img/data/data_export2.png)  
    - <span class="heading_smaller_than_h5">Tất cả</span>  
    Xuất tất cả dữ liệu của bảng đó.  
    ※Tuy nhiên, **dữ liệu mà người dùng đăng nhập không có quyền sẽ không được xuất**.  
    
    - <span class="heading_smaller_than_h5">Trang hiện tại</span>  
    Xuất danh sách dữ liệu của trang đang mở.

    - <span class="heading_smaller_than_h5">Tất cả (kèm bình luận)</span>  
    Xuất tất cả dữ liệu của bảng đó và bình luận của từng dữ liệu.  
    Bình luận được xuất vào sheet "comment" với định dạng Excel, và vào tệp "comment" với định dạng CSV.  
    ※Chỉ hiển thị với bảng có "Sử dụng bình luận" là YES trong thiết lập bảng tùy chỉnh.  
    ※Bình luận được xuất ra là để xem. Khi nhập, sheet (tệp) "comment" không được đưa vào.

- Khi nhấp vào nút [CSV] hoặc [Excel], dữ liệu được tải xuống dưới dạng tệp.  
![Tệp xuất](../img/data/data_export3.png)

### Danh sách các mục xuất
##### ID  
Số nguyên dương, được tự động đánh số liên tiếp khi đăng ký dữ liệu.

##### ID hệ thống (20 ký tự)
Chuỗi 20 ký tự chữ và số, được tự động gán khi đăng ký dữ liệu. Ít khi hiển thị trên màn hình. Dùng khi chuyển dữ liệu, v.v.  

##### ID dữ liệu cha  
Là id của bảng cha, khi bảng đó được đăng ký là n của "1:n" trong cài đặt quan hệ. Khi không có cài đặt quan hệ thì để trống.  

##### Tên bảng của dữ liệu cha  
Là tên bảng cha (chữ và số), khi bảng đó được đăng ký là n của "1:n" trong cài đặt quan hệ. Khi không có cài đặt quan hệ thì để trống.  

##### Danh sách cột tùy chỉnh  
Các giá trị đăng ký làm cột tùy chỉnh được xuất theo từng cột.  

##### Ngày giờ tạo, Ngày giờ cập nhật, Ngày giờ xóa  
Ngày giờ tạo, ngày giờ cập nhật và ngày giờ xóa dữ liệu được xuất tương ứng.  

### Xuất quan hệ 1:n
- Khi xuất dữ liệu ở bảng được đăng ký là "1" của "1:n" trong cài đặt quan hệ, **danh sách dữ liệu của "n" có quan hệ cũng được xuất cùng lúc**.  

Ví dụ: khi đã lưu cài đặt quan hệ với "Thông tin hợp đồng" là 1 và "Thông tin chi tiết hợp đồng" là n  
![Quan hệ 1:n](../img/data/data_export4.png)  
- Khi thực hiện xuất dữ liệu ở màn hình "Thông tin hợp đồng" (※"Khách hàng" trong hình là dữ liệu thử)  
![Quan hệ 1:n](../img/data/data_export5.png)  
- Cả dữ liệu của "Thông tin hợp đồng" và "Thông tin chi tiết hợp đồng" đều được xuất.
![Quan hệ 1:n](../img/data/data_export6.png)  
![Quan hệ 1:n](../img/data/data_export7.png)  
- Ở "ID dữ liệu cha" và "Tên bảng của dữ liệu cha" của danh sách dữ liệu "n", ID và tên bảng của bảng cha có quan hệ được xuất.

### Xuất quan hệ n:n
- Khi xuất dữ liệu ở bảng được đăng ký là n gốc của "n:n" trong cài đặt quan hệ, **thông tin liên kết với "n" có quan hệ cũng được xuất cùng lúc**.  

Ví dụ: khi đã lưu cài đặt quan hệ n:n giữa "Thông tin tổ chức" và "Thông tin người dùng"  
![Quan hệ n:n](../img/data/data_export8.png)  
- Khi thực hiện xuất dữ liệu ở màn hình "Thông tin tổ chức",  
![Quan hệ n:n](../img/data/data_export9.png)  
- Dữ liệu của "Thông tin tổ chức" được xuất. Ngoài ra, dữ liệu liên kết "Thông tin người dùng" với "Thông tin tổ chức" cũng được xuất.
![Quan hệ n:n](../img/data/data_export10.png)  
![Quan hệ n:n](../img/data/data_export11.png)  
- "parent_id" là ID của thông tin tổ chức làm cha, "child_id" là ID của thông tin người dùng làm con.  


### Các lưu ý khác
- Với cả định dạng CSV và Excel, dòng 1 là tên cột (chữ và số), dòng 2 là tên hiển thị của cột (tiếng Nhật). Với định dạng CSV, tiêu đề cũng gồm 2 dòng. Mong bạn thông cảm.  
- Tệp xuất với định dạng CSV có mã ký tự UTF-8, mã xuống dòng LF, không có BOM.  
- Khi nhiều dữ liệu được xuất do cài đặt quan hệ, định dạng Excel sẽ có nhiều sheet, còn định dạng CSV sẽ gom nhiều tệp csv vào một tệp zip.  


### Thay đổi giá trị xuất khi xuất dữ liệu
Khi xuất, ở các cột "ID dữ liệu cha", "Lựa chọn (từ bảng khác)", "Người dùng" và "Tổ chức", thông thường ID của dữ liệu ở bảng tham chiếu được xuất. Có thể đổi thành **giá trị của cột tùy chỉnh ở bảng tham chiếu**.  
Các bước được ghi ở dưới.  


#### Trường hợp parent_id (ID dữ liệu cha)
1. Mở màn hình cài đặt quan hệ.

2. Ở "Cột khóa khi xuất", thiết lập cột tùy chỉnh muốn xuất khi xuất dữ liệu, rồi lưu.  
![Màn hình dữ liệu](../img/data/data_import_column1.png)

3. Sau đó, khi xuất dữ liệu, giá trị xuất là giá trị của cột tùy chỉnh đã chọn, thay cho id. 

※Thông thường
![Màn hình dữ liệu](../img/data/data_import_column2.png)  
  
※Khi chỉ định "Cột khóa khi xuất"
![Màn hình dữ liệu](../img/data/data_import_column3.png)  

#### Trường hợp "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức"
1. Mở màn hình cài đặt cột tùy chỉnh của cột đó.

2. Ở "Cột khóa khi xuất", thiết lập cột tùy chỉnh muốn xuất khi xuất dữ liệu, rồi lưu.  
![Màn hình dữ liệu](../img/data/data_export_column1.png)

3. Sau đó, khi xuất dữ liệu ở bảng nguồn tham chiếu, giá trị xuất là giá trị của cột tùy chỉnh đã chọn, thay cho id. 

※Thông thường
![Màn hình dữ liệu](../img/data/data_export_column2.png)  
  
※Khi chỉ định "Cột khóa khi xuất"
![Màn hình dữ liệu](../img/data/data_export_column3.png)  







## Xuất dữ liệu (view)
Xuất (export) dữ liệu của bảng ra tệp, theo dạng của view đang hiển thị.  
Định dạng tệp là csv hoặc xlsx (khuyến nghị).  

### Cách thao tác
- Hiển thị màn hình danh sách dữ liệu.
![Màn hình dữ liệu](../img/data/data_grid1.png)  

- Nút [Nhập/Xuất] hiển thị ở phía trên bên phải của trang, hãy nhấp vào.  
![Màn hình dữ liệu](../img/data/data_export1.png)  


- Menu hiển thị, hãy chọn mục muốn xuất.
![Màn hình dữ liệu](../img/data/data_viewexport1.png)  
    - <span class="heading_smaller_than_h5">Tất cả</span>  
    Xuất tất cả dữ liệu của bảng đó.  
    ※Tuy nhiên, **dữ liệu mà người dùng đăng nhập không có quyền sẽ không được xuất**.  

    - <span class="heading_smaller_than_h5">Trang hiện tại</span>  
    Xuất danh sách dữ liệu của trang đang mở.

- Khi nhấp vào nút [CSV] hoặc [Excel], dữ liệu được tải xuống dưới dạng tệp. Các mục của view đang hiển thị được xuất nguyên như vậy.  
![Tệp xuất](../img/data/data_viewexport2.png)






## Nhập dữ liệu
Nhập (import) dữ liệu của bảng từ tệp.  
Định dạng tệp là csv hoặc xlsx (khuyến nghị). Dữ liệu cần được tạo trước, theo định dạng do Exment quy định.

Các bước như sau.

1. Xuất mẫu ("Xuất mẫu")  
2. Ghi dữ liệu muốn nhập vào mẫu ("Danh sách các mục nhập")  
3. Thực hiện nhập ("Thực hiện nhập dữ liệu")

> Hiện tại, vì lý do hiệu năng, số lượng nhập được trong 1 lần là tối đa 5000 dữ liệu.  
Khi cần đăng ký hơn 5000 dữ liệu trong 1 lần, hãy cân nhắc [nạp dữ liệu lớn](/vi/data_bulk_insert).

### Cách thao tác

#### Xuất mẫu
Xuất tệp mẫu dùng để nhập dữ liệu.

- Hiển thị màn hình danh sách dữ liệu.
![Màn hình dữ liệu](../img/data/data_grid1.png)  

- Nút [Nhập/Xuất] hiển thị ở phía trên bên phải của trang, hãy nhấp vào.  
![Màn hình dữ liệu](../img/data/data_export1.png)  

- Trong phần xuất mẫu của nhập dữ liệu, nhấp vào [CSV] hoặc [Excel].
![Màn hình dữ liệu](../img/data/data_import1.png)  

- Tệp CSV hoặc Excel dùng để nhập dữ liệu được tải xuống.  
![Màn hình dữ liệu](../img/data/data_import2.png)  
※Định dạng tệp giống với khi xuất bằng "Xuất".  
Mẫu được xuất với 0 dữ liệu.

- Hãy ghi dữ liệu muốn nhập vào mẫu đã xuất.

### Danh sách các mục nhập
##### ID  
Số nguyên dương, được tự động đánh số liên tiếp khi đăng ký dữ liệu.  
Chỉ ghi khi muốn tự quyết định ID này lúc nhập.  
Khi không cần quyết định, hãy để trống. Khi nhập, hệ thống tự động đặt giá trị.  

##### ID hệ thống (20 ký tự)  
Chuỗi 20 ký tự chữ và số, được tự động gán khi đăng ký dữ liệu. Ít khi hiển thị trên màn hình.  
Chỉ ghi khi muốn tự quyết định ID hệ thống này lúc nhập.  
Khi không cần quyết định, hãy để trống. Hệ thống tự động đặt giá trị.  

##### ID dữ liệu cha  
Thông thường để trống.  
Khi bảng cần nhập được đăng ký là n của "1:n" trong cài đặt quan hệ, hãy nhập id của bảng cha.  
![Màn hình dữ liệu](../img/data/data_import11.png)  
※Với thiết lập ban đầu, ID của dữ liệu ở bảng cha được chỉ định, nhưng **cũng có thể chỉ định cột tùy chỉnh để nhập**. Chi tiết vui lòng xem "[Thay đổi cách chỉ định dữ liệu của bảng khác](/vi/data_import_export?id=thay-đổi-cách-chỉ-định-dữ-liệu-của-bảng-khác)".  

##### Tên bảng của dữ liệu cha  
Thông thường để trống.  
Khi bảng đó được đăng ký là n của "1:n" trong cài đặt quan hệ, hãy nhập tên bảng cha (chữ và số).  
![Màn hình dữ liệu](../img/data/data_import12.png)  

##### Danh sách cột tùy chỉnh  
Hãy ghi các giá trị cần đăng ký làm cột tùy chỉnh.  
※Cách ghi giá trị khác nhau tùy theo loại cột. Vui lòng xem "[Cách nhập cột tùy chỉnh khi nhập dữ liệu](/vi/data_import_export?id=cách-nhập-cột-tùy-chỉnh-khi-nhập-dữ-liệu)" ở dưới.

##### Ngày giờ tạo, Ngày giờ cập nhật, Ngày giờ xóa  
Thông thường để trống.  
Chỉ ghi khi muốn tự quyết định ngày giờ tạo, ngày giờ cập nhật, ngày giờ xóa dữ liệu.  
Khi để trống, hệ thống tự động đặt giá trị lúc nhập.


### Thực hiện nhập dữ liệu
Thực hiện nhập từ màn hình.

- Hiển thị màn hình danh sách dữ liệu.
![Màn hình dữ liệu](../img/data/data_grid1.png)  

- Nút [Nhập/Xuất] hiển thị ở phía trên bên phải của trang, hãy nhấp vào.  
![Màn hình dữ liệu](../img/data/data_export1.png)  

- Trong "Nhập (CSV)" hoặc "Nhập (Excel)", nhấp vào "Nhập".
![Màn hình dữ liệu](../img/data/data_import6.png)  

- Hộp thoại nhập hiển thị.  
![Màn hình dữ liệu](../img/data/data_import7.png)  

- Ở "Tệp nhập", chọn tệp mẫu đã ghi dữ liệu.  

- Ở "Khóa chính", chọn khóa chính dùng để phân biệt tạo mới hay cập nhật khi nhập.  
Chi tiết vui lòng xem "Các loại khóa chính" ở dưới.

- Sau khi thiết lập, nhấp vào [Gửi] của hộp thoại.

- Khi dữ liệu nhập có vấn đề, "Thông báo lỗi" hiển thị số dòng tính từ sau tiêu đề và nội dung lỗi.
![Lỗi nhập](../img/data/data_import8.png)
※ Nếu mục được đặt là "[Bắt buộc](/vi/column?id=chi-tiết-các-mục-nhập-chung)" trong thiết lập cột tùy chỉnh không có giá trị, việc nhập sẽ không thành công. Hãy kiểm tra xem tệp mẫu có thiếu nội dung nhập không.
- Khi nhập xong bình thường, hộp thoại đóng lại và dữ liệu được tải lại.


### Cách xác định dữ liệu thêm mới và dữ liệu cập nhật
Khi nhập, với từng dòng, hệ thống phân biệt đó là dữ liệu thêm mới hay dữ liệu cập nhật cho dữ liệu đang có.  
Cách phân biệt như sau.

- Trên màn hình khi nhập, chỉ định cột "Khóa chính" dùng để phân biệt. (Ở đây lấy là "ID")  
※Khóa chính được chọn khi nhập. Vui lòng xem "Các loại khóa chính" ở dưới

- Khi nhập, hệ thống xem giá trị của cột ID trong dữ liệu nhập.
![Màn hình dữ liệu](../img/data/data_import3.png)  

    - Khi ID của dữ liệu nhập để trống, dữ liệu được xử lý là dữ liệu thêm mới.
![Màn hình dữ liệu](../img/data/data_import4.png)  

    - Khi ID của dữ liệu nhập có giá trị, hệ thống tìm xem trong các dữ liệu đã đăng ký có dữ liệu cùng ID không.  
![Màn hình dữ liệu](../img/data/data_import5.png)  
    Nếu có dữ liệu cùng ID, dữ liệu đó được cập nhật bằng nội dung của dữ liệu nhập.  
    Nếu không có, dữ liệu nhập được thêm mới. Khi đó, ID là ID của dữ liệu nhập.  


### Các loại khóa chính

- ##### ID (khuyến nghị)  
Số nguyên do hệ thống tự động gán. Cũng được dùng cho quan hệ với bảng khác, v.v.  
Đây là mục tiện lợi và dễ nhập trước giá trị. Tuy nhiên, vì là mục tự động đánh số liên tiếp, khi chuyển từ môi trường này sang môi trường khác có thể xảy ra lệch ngoài ý muốn.

- ##### ID hệ thống (20 ký tự)  
Chuỗi 20 ký tự chữ và số do hệ thống tự động gán khi lưu dữ liệu.  
Khi chuyển từ môi trường này sang môi trường khác, nên dùng ID hệ thống này để xác định rõ dữ liệu cần cập nhật.  

- ##### Cột duy nhất  
Cột được đặt là "Duy nhất" trong thiết lập cột tùy chỉnh có thể chọn làm khóa chính. (Ví dụ: địa chỉ email, mã người dùng)    

### Cách nhập cột tùy chỉnh khi nhập dữ liệu
Cách ghi giá trị khi nhập khác nhau tùy theo loại cột tùy chỉnh.  
Vui lòng xem nội dung dưới đây.

##### Lựa chọn (lưu giá trị và nhãn)  
Hãy nhập "giá trị" đăng ký trong cơ sở dữ liệu, hoặc "nhãn" hiển thị trên màn hình.  

##### Lựa chọn (từ bảng khác), Người dùng, Tổ chức  
Hãy nhập **ID của bảng tham chiếu**.  
![Màn hình dữ liệu](../img/data/data_import10.png)  
※Với thiết lập ban đầu, ID của dữ liệu ở bảng tham chiếu được chỉ định, nhưng **cũng có thể chỉ định cột tùy chỉnh để nhập**. Chi tiết vui lòng xem "[Thay đổi cách chỉ định dữ liệu của bảng khác](/vi/data_import_export?id=thay-đổi-cách-chỉ-định-dữ-liệu-của-bảng-khác)".  

##### YES/NO  
Hãy nhập "YES" hoặc "NO", hoặc "1" hoặc "0".  

##### Lựa chọn 2 giá trị  
Hãy nhập chữ hiển thị hoặc giá trị của "Lựa chọn 2 giá trị" đã nhập ở màn hình cột tùy chỉnh.  
![Màn hình dữ liệu](../img/data/data_import9.png)  

##### Các loại khác  
Hãy nhập nguyên giá trị cần đăng ký.  

### Thay đổi cách chỉ định dữ liệu của bảng khác
Khi nhập, ở các cột "ID dữ liệu cha", "Lựa chọn (từ bảng khác)", "Người dùng" và "Tổ chức", thông thường ghi ID của dữ liệu ở bảng tham chiếu. Có thể **chỉ định bằng giá trị của cột tùy chỉnh để nhập**.  
Các bước được ghi ở dưới.  


#### Trường hợp parent_id (ID dữ liệu cha)
1. Mở màn hình cài đặt quan hệ.

2. Ở "Cột khóa khi nhập", thiết lập cột tùy chỉnh dùng để tìm giá trị khi nhập, rồi lưu.  
※Chỉ chỉ định được cột đã đặt "Chỉ mục tìm kiếm" trong cài đặt cột tùy chỉnh.  
![Màn hình dữ liệu](../img/data/data_import13.png)

3. Sau đó, tải xuống tệp Excel dùng để nhập ở bảng con. Sheet "##setting##" có sẵn tên bảng con, "parent_id" và tên cột tùy chỉnh đã chỉ định của bảng cha.  
![Màn hình dữ liệu](../img/data/data_import14.png)  

4. Không đổi nội dung của sheet này, hãy ghi dữ liệu nhập vào sheet của bảng con.  
Khi đó, ở cột "parent_id", ghi giá trị của cột tùy chỉnh đã đăng ký ở **Cột khóa khi nhập**.  
Trong ví dụ dưới đây, nhập giá trị "Mã hợp đồng" của bảng cha "Thông tin hợp đồng".
![Màn hình dữ liệu](../img/data/data_import15.png)  
![Màn hình dữ liệu](../img/data/data_import16.png)  

5. Sau đó, thực hiện nhập.

#### Trường hợp "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức"
1. Mở màn hình cài đặt cột tùy chỉnh của cột đó.

2. Ở "Cột khóa khi nhập", thiết lập cột tùy chỉnh dùng để tìm giá trị khi nhập, rồi lưu.  
※Chỉ chỉ định được cột đã đặt "Chỉ mục tìm kiếm" trong cài đặt cột tùy chỉnh.  
![Màn hình dữ liệu](../img/data/data_import17.png)

3. Sau đó, tải xuống tệp Excel dùng để nhập ở bảng nguồn tham chiếu. Sheet "##setting##" có sẵn tên bảng nguồn tham chiếu, "value." + tên cột tùy chỉnh của bảng nguồn tham chiếu, và tên cột tùy chỉnh của bảng tham chiếu.  
![Màn hình dữ liệu](../img/data/data_import18.png)  

4. Không đổi nội dung của sheet này, hãy ghi dữ liệu nhập vào sheet của bảng nguồn tham chiếu.  
Khi đó, ở cột tùy chỉnh của bảng nguồn tham chiếu, ghi giá trị của cột tùy chỉnh ở bảng tham chiếu đã đăng ký ở **Cột khóa khi nhập**.  
Trong ví dụ dưới đây, nhập giá trị "Mã khách hàng" của bảng tham chiếu "Master khách hàng".
![Màn hình dữ liệu](../img/data/data_import19.png)  
![Màn hình dữ liệu](../img/data/data_import20.png)  

5. Sau đó, thực hiện nhập.

#### Lưu ý
- Chỉ hỗ trợ nhập với định dạng Excel. Hiện chưa hỗ trợ định dạng CSV.
