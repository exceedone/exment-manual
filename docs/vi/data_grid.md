# Danh sách dữ liệu
Trang này giải thích màn hình xem dữ liệu đã lưu trong bảng dưới dạng danh sách.

- Danh sách hiển thị những dữ liệu do chính bạn tạo và những dữ liệu mà bạn được gán quyền.  
- Khi đăng ký cho người dùng hoặc tổ chức "quyền chỉnh sửa / xem tất cả dữ liệu", tất cả dữ liệu sẽ hiển thị, bất kể điều kiện nêu trên. Về chi tiết của quyền, vui lòng xem [Vai trò / Quyền](/vi/permission).

## Danh sách chức năng
![Màn hình dữ liệu](../img/data/data_grid1.png)  

※Trên danh sách dữ liệu, bạn cũng có thể chuyển đổi cột hiển thị, cố định cột, nhóm dòng, chỉnh sửa tại chỗ, v.v. Chi tiết vui lòng xem [Công cụ thao tác trên danh sách dữ liệu](/vi/data_grid_tools).

##### Tự động làm mới  
Đây là biểu tượng ngoài cùng bên phải trong 5 biểu tượng thao tác ở phía trên bên phải. Danh sách được tải lại theo khoảng thời gian đã chọn (tắt, 30 giây, 1 phút, 5 phút). Chi tiết vui lòng xem [Công cụ thao tác trên danh sách dữ liệu](/vi/data_grid_tools).

##### Bộ lọc  
Lọc danh sách dữ liệu đang hiển thị. Chi tiết vui lòng xem "Bộ lọc" ở dưới.

##### View  
Đây là nút view của bảng tùy chỉnh đang hiển thị. Chi tiết vui lòng xem "View" ở dưới.  

##### Nhập (import) / Xuất (export)  
Đây là nút dùng để xuất (export) dữ liệu của bảng tùy chỉnh đang hiển thị, hoặc nhập (import) dữ liệu. Chi tiết vui lòng xem [Nhập / xuất dữ liệu](/vi/data_import_export).

##### Danh sách  
Đây là danh sách dữ liệu.  
Các dòng hiển thị được lọc theo quyền của người dùng, thiết lập lọc của view và thiết lập bộ lọc trên màn hình danh sách.  
Các cột hiển thị thay đổi theo thiết lập cột của view.  

##### Cập nhật hàng loạt  
Cập nhật cùng lúc dữ liệu của nhiều dòng đã chọn.  
Cần thiết lập trước cột cần cập nhật hàng loạt và giá trị cập nhật ở [Cài đặt cập nhật hàng loạt](/vi/mass_update).


## Chi tiết chức năng  

### Bộ lọc
Lọc danh sách dữ liệu đang hiển thị.  
![Màn hình dữ liệu](../img/data/data_grid_filter1.png)  
Khi nhấp vào nút [Bộ lọc], các mục lọc sẽ hiển thị.  

- Các mục dùng được để lọc được quyết định như sau.  
  - Nếu view có chỉ định các mục "Bộ lọc" ("Chỉ định các mục "Filter" của view" trong [View tùy chỉnh](/vi/view)) thì chỉ gồm các mục đó.  
  - Nếu không chỉ định thì gồm: các mục hệ thống (ID, ngày giờ tạo, ngày giờ cập nhật, v.v.; trừ các mục đã đánh dấu ở "Ẩn bộ lọc danh sách dữ liệu" của [Thiết lập hệ thống](/vi/system_setting)), bảng cha của bảng con, trạng thái quy trình làm việc của bảng có thiết lập quy trình làm việc, bình luận nếu đang dùng bình luận, và các cột đã bật "Chỉ mục tìm kiếm" trong cài đặt cột tùy chỉnh.
[Hướng dẫn về cài đặt cột tùy chỉnh ở đây](/vi/column)

- Nhập từ khóa vào từng mục rồi nhấp vào nút [Tìm kiếm], chỉ những dòng phù hợp sẽ hiển thị.  

- Để đưa bộ lọc về như cũ, hãy nhấp vào nút [Đặt lại].

- Khi người dùng không phải quản trị viên lọc, việc lọc được thực hiện trong số dữ liệu mà người dùng đó có quyền. Dữ liệu không có quyền không thuộc đối tượng lọc.  

- Bộ lọc được áp dụng thêm vào điều kiện lọc của view đang hiển thị.

- Với các cột kiểu văn bản, từ khóa đã nhập khớp với phần đầu của giá trị (khớp tiền tố) hay khớp với một phần của giá trị (khớp một phần) là theo "Phương thức tìm kiếm dữ liệu" của [Thiết lập hệ thống](/vi/system_setting?id=data-search-method-phương-pháp-tìm-kiếm-dữ-liệu). Giá trị ban đầu là khớp tiền tố.

>Trong các mục hiển thị dưới dạng lựa chọn, với mục có thiết lập quan hệ (relation), có thể đổi chữ hiển thị ở [thiết lập cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề).

### View
Đây là nút view của bảng tùy chỉnh đang hiển thị.  
Nút hiển thị tên của view đang hiển thị.  
Khi nhấp vào, menu của view sẽ hiển thị.
![Màn hình dữ liệu](../img/data/data_grid_view1.png ':size=284')  

##### View hệ thống  
Hiển thị danh sách các view đã đăng ký trong hệ thống.  
Khi nhấp vào một mục, màn hình chuyển sang view đó.

##### Thiết lập - Thay đổi thiết lập của view hiện tại  
Thay đổi thiết lập của view đang hiển thị.  
Khi nhấp vào mục này, màn hình chuyển sang màn hình thay đổi thiết lập của view đó.  
※Mục này chỉ hiển thị với người dùng có quyền quản trị viên của bảng.  

##### Thiết lập - Tạo mới view  
Tạo một view mới.  
Khi nhấp vào mục này, màn hình chuyển sang màn hình tạo mới view.  
※Mục này chỉ hiển thị với người dùng có quyền quản trị viên của bảng.  

### Cập nhật hàng loạt
Cập nhật cùng lúc nhiều dữ liệu đã chọn.  
Khi chọn dòng bằng ô đánh dấu ở bên trái mỗi dòng, số dòng đang chọn và biểu tượng ▼ hiển thị ở phía trên bên trái.
![Màn hình dữ liệu](../img/data/data_grid_mass_update1.png)  

- Khi nhấp vào biểu tượng ▼, chức năng xóa hàng loạt và các cài đặt cập nhật hàng loạt đã tạo hiển thị dưới dạng lựa chọn.  

- Khi nhấp vào lựa chọn của nội dung muốn cập nhật, thông báo xác nhận có cập nhật hàng loạt hay không sẽ hiển thị. Hãy nhấp vào nút xác nhận. Các cột đã chỉ định ở [Cài đặt cập nhật hàng loạt](/vi/mass_update) sẽ đổi thành giá trị cập nhật.
![Màn hình dữ liệu](../img/data/data_grid_mass_update2.png)  
