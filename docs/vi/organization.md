# Tổ chức
Quản lý thông tin tổ chức của Exment.

> Trước khi thiết lập tổ chức, chúng tôi khuyến nghị bạn xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

## Quản lý tổ chức
Phần này trình bày cách quản lý thông tin tổ chức.  

### Hiển thị màn hình danh sách
Nhấp vào "Organization" ở menu bên trái.  
Hoặc truy cập URL dưới đây.  
Khi đó, màn hình thiết lập người dùng sẽ được hiển thị.  
http(s)://(URL của Exment)/data/organization  
Danh sách các tổ chức hiện đang được đăng ký trong hệ thống sẽ được hiển thị.
![Màn hình quản lý tổ chức](../img/organization/organization2.png)  

> Lưu ý: URL là theo thiết lập mặc định không có "/admin" (trang cài mới từ v7.2.1). Nếu `ADMIN_ROUTE_PREFIX` trong `.env` có giá trị (trang cũ là "admin"), hãy thêm giá trị đó sau URL của trang (ví dụ `http(s)://(URL của Exment)/admin/oauth/token`). Chi tiết xem [Change / delete "admin" included in URL](/additional_prefix).
  
※ Nếu đặt "EXMENT_SHOW_ORGANIZATION_TREE=true" trong [giá trị thiết lập](/config?id=perform-hierarchical-display-on-the-department-list-page), cấu trúc phân cấp sẽ được hiển thị.

![Màn hình quản lý tổ chức](../img/organization/organization3.png)

### Thêm mới tổ chức
- Trên màn hình danh sách "Organization", nhấp vào nút "New" ở phía trên bên phải trang.

- Màn hình thêm mới sẽ được hiển thị, hãy nhập các mục cần thiết.  
※ Ở mục "Parent organization" (tổ chức cha), hãy chọn cấp cha của tổ chức đó.
![Màn hình tổ chức](../img/organization/organization4.png)

### Lưu
Sau khi nhập xong các thiết lập, hãy nhấp vào "Submit".

### Chỉnh sửa
Nếu muốn chỉnh sửa tổ chức, hãy nhấp vào liên kết "Edit" ở dòng tương ứng.  

### Xóa
Nếu muốn xóa tổ chức, hãy nhấp vào liên kết "Delete" ở dòng tương ứng.  

## Những nơi sử dụng tổ chức
Tổ chức đã thiết lập được sử dụng ở nhiều nơi.
Dưới đây là danh sách các nơi thiết lập đó.


#### Nhóm vai trò 
Có thể thiết lập tổ chức cho nhóm vai trò.
![Phân cấp tổ chức](../img/organization/organization8.png)

- Thiết lập này kiểm soát việc người dùng thuộc tổ chức có thể hay không thể truy cập trang.  
Trong hình dưới đây, phía trên là trường hợp người dùng có thể truy cập, phía dưới là trường hợp người dùng không thể truy cập.
![Phân cấp tổ chức](../img/organization/organization16.png)
![Phân cấp tổ chức](../img/organization/organization17.png)


#### Chuyển đổi giữa nhiều form 
Có thể thiết lập tổ chức làm điều kiện chuyển đổi giữa nhiều form.  
Nếu người dùng đăng nhập thuộc tổ chức đó, form sẽ được sử dụng.
![Phân cấp tổ chức](../img/organization/organization9.png)


#### Workflow 
Có thể thiết lập tổ chức trong thiết lập người dùng thực hiện của workflow.  
Nếu người dùng đăng nhập thuộc tổ chức đó, họ có thể thực hiện hành động (action) của workflow.
![Phân cấp tổ chức](../img/organization/organization10.png)


#### Chia sẻ dữ liệu tùy chỉnh 
Có thể thiết lập tổ chức làm đối tượng được chia sẻ dữ liệu tùy chỉnh.  
Nếu người dùng đăng nhập thuộc tổ chức đó, quyền đối với dữ liệu tùy chỉnh sẽ được gán và họ có thể chỉnh sửa hoặc xem dữ liệu.
![Phân cấp tổ chức](../img/organization/organization6.png)


## Về phân cấp tổ chức
Trong Exment, có thể thiết lập phân cấp tổ chức như dưới đây.

![Phân cấp tổ chức](../img/organization/organization1.png)


### (Dành cho người dùng nâng cao) Các loại phân cấp
Khi tổ chức có nhiều cấp, có các khái niệm "Tổ chức mà người dùng trực thuộc", "Bao gồm tổ chức cấp cha", "Bao gồm tổ chức cấp con" và "Bao gồm tổ chức cấp cha và cấp con".  
Tùy theo từng khái niệm, phạm vi của "người dùng thuộc tổ chức đó" sẽ khác nhau.  
Ở đây, để làm ví dụ, chúng tôi giải thích phạm vi nhiều cấp khi lấy "**Phòng Kinh doanh**" làm chuẩn.

#### Tổ chức mà người dùng trực thuộc
![Phân cấp tổ chức](../img/organization/organization12.png)
Chỉ gồm những người dùng trực thuộc chính tổ chức đối tượng.  
Trong ví dụ, người trực thuộc Phòng Kinh doanh chỉ có "Trưởng phòng Kinh doanh".


#### Bao gồm tổ chức cấp cha
![Phân cấp tổ chức](../img/organization/organization13.png)
Gồm tổ chức đối tượng và các tổ chức cấp cha của nó.  
Trong ví dụ, đó là "Trưởng phòng Kinh doanh" trực thuộc Phòng Kinh doanh và "Giám đốc công ty A" trực thuộc "Công ty A" ở cấp cha.


#### Bao gồm tổ chức cấp con
![Phân cấp tổ chức](../img/organization/organization14.png)
Gồm tổ chức đối tượng và các tổ chức cấp con của nó.  
Trong ví dụ, đó là "Trưởng phòng Kinh doanh" trực thuộc Phòng Kinh doanh, cùng "Người dùng A Phòng Kinh doanh 1" và "Người dùng B Phòng Kinh doanh 2" trực thuộc "Phòng Kinh doanh 1" và "Phòng Kinh doanh 2" ở cấp con.


#### Bao gồm tổ chức cấp cha và cấp con
![Phân cấp tổ chức](../img/organization/organization15.png)
Gồm tổ chức đối tượng và các tổ chức cấp cha, cấp con của nó.  
Trong ví dụ, đó là "Trưởng phòng Kinh doanh" trực thuộc Phòng Kinh doanh, "Giám đốc công ty A" trực thuộc "Công ty A" ở cấp cha, cùng "Người dùng A Phòng Kinh doanh 1" và "Người dùng B Phòng Kinh doanh 2" trực thuộc "Phòng Kinh doanh 1" và "Phòng Kinh doanh 2" ở cấp con.


<h4 id="kaisou_syurui">(Dành cho người dùng nâng cao) Thiết lập loại phân cấp</h4>

Khi thiết lập tổ chức, việc bao gồm các tổ chức nhiều cấp đến mức nào có thể được thiết lập tại "System Settings" > "Organization Settings".  
※ Thiết lập nhiều cấp chỉ áp dụng được cho "nhóm vai trò" và "chia sẻ dữ liệu tùy chỉnh". Đối với "thiết lập độ ưu tiên của form" và "workflow", chỉ hỗ trợ tổ chức mà người dùng trực thuộc.

![Phân cấp tổ chức](../img/organization/organization18.png)


### Thiết lập chia sẻ dữ liệu
Trong Exment, bằng [thiết lập chia sẻ dữ liệu của dữ liệu tùy chỉnh](/vi/data_details), các tổ chức khác có thể truy cập vào dữ liệu đối tượng.

![Phân cấp tổ chức](../img/organization/organization5.png)
![Phân cấp tổ chức](../img/organization/organization6.png)


#### Phạm vi có hiệu lực khi chia sẻ dữ liệu tùy chỉnh
- Khi chia sẻ dữ liệu cho một tổ chức, những người dùng thuộc tổ chức đó có thể truy cập.
- Ngoài ra, việc người dùng thuộc tổ chức cha, tổ chức con có thể truy cập hay không được quyết định bởi mục "Thiết lập loại phân cấp > Organization hierarchy setting (data)" (thiết lập phân cấp tổ chức - dữ liệu) nêu trên.
- Các tổ chức thuộc nhánh khác không thể truy cập.


<h4 id="kyouyu_jidou">(Dành cho người dùng nâng cao) Tự động chia sẻ khi lưu dữ liệu</h4>

Khi tạo mới dữ liệu tùy chỉnh, thiết lập chia sẻ sẽ tự động được gán cho dữ liệu vừa tạo.  
Theo tiêu chuẩn, thiết lập chia sẻ chỉ được gán cho "người dùng đăng nhập", nhưng tùy theo thiết lập, thiết lập chia sẻ cũng được thêm cho tổ chức mà người dùng đăng nhập trực thuộc.  
Thiết lập này có thể thực hiện tại "System Settings" > "Organization Settings".

![Thiết lập tự động chia sẻ dữ liệu tùy chỉnh](../img/organization/custom_table_organization1.png)

Phần này trình bày nội dung của từng thiết lập.

##### (1) Chỉ người dùng đăng nhập
Khi tạo mới dữ liệu tùy chỉnh, dữ liệu chỉ được chia sẻ cho người dùng đăng nhập.  
- **Ví dụ**: Khi "Người dùng A Phòng Kinh doanh 1" tạo mới dữ liệu, chỉ người dùng "Người dùng A Phòng Kinh doanh 1" có thể truy cập.  
![Phân cấp tổ chức](../img/organization/organization19.png)


##### (2) Người dùng đăng nhập và tổ chức trực thuộc
Khi tạo mới dữ liệu tùy chỉnh, dữ liệu được chia sẻ cho người dùng đăng nhập và **tổ chức trực thuộc**.  
- **Ví dụ**: Khi "Người dùng A Phòng Kinh doanh 1" tạo mới dữ liệu, dữ liệu được chia sẻ cho người dùng "Người dùng A Phòng Kinh doanh 1" và tổ chức "Phòng Kinh doanh 1".  
→ Kết quả là người dùng "Người dùng B Phòng Kinh doanh 1" thuộc tổ chức "Phòng Kinh doanh 1" cũng có thể truy cập

![Phân cấp tổ chức](../img/organization/organization20.png)
