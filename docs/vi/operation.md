# Cài đặt cập nhật dữ liệu
Đây là thiết lập để ghi lại giá trị của dữ liệu cùng lúc theo một thời điểm kích hoạt (trigger) đã định, ví dụ "khi nhấp vào nút" hoặc "khi tạo dữ liệu mới".  
Ví dụ, có thể dùng như sau.  

- Hiển thị nút "Hoàn thành" trên màn hình chi tiết dữ liệu của bảng "Thông tin công việc". Khi nhấp vào, giá trị của cột tùy chỉnh "Trạng thái" thành hoàn thành.
- Khi cập nhật dữ liệu, giá trị của cột tùy chỉnh "Người phụ trách" tự động thành người dùng đăng nhập.

Các bước thiết lập như sau.

1. Mở màn hình cài đặt cập nhật dữ liệu ("Màn hình thiết lập")
2. Từ [Mới], quyết định khi nào (thời điểm cập nhật), cột nào và giá trị nào, rồi lưu ("Thêm mới", "Chi tiết các mục nhập")
3. Việc cập nhật được thực hiện vào thời điểm đã định ("Thực hiện cập nhật")

> Trước v3.5.0, chức năng này có tên là "Cập nhật dữ liệu hàng loạt". Từ v3.5.0, chức năng đã được mở rộng.  
Khi muốn cập nhật với điều kiện hoặc nội dung phức tạp hơn, hãy tạo [plugin (nút)](/vi/plugin_quickstart_button) hoặc [plugin (sự kiện)](/vi/plugin_quickstart_event).


## Các loại thời điểm cập nhật

- ##### Khi nhấn nút trên trang danh sách

![Màn hình dữ liệu](../img/operation/operation1.png)  

Một nút được thêm vào màn hình danh sách dữ liệu.  
Khi đánh dấu các ô chọn trên màn hình danh sách rồi nhấp vào nút, các dữ liệu đã đánh dấu được cập nhật theo nội dung đã thiết lập.

- ##### Khi nhấn nút trên trang chi tiết dữ liệu

![Màn hình dữ liệu](../img/operation/operation2.png)  

Một nút hiển thị trên màn hình chi tiết dữ liệu.  
Khi nhấp vào nút, dữ liệu được cập nhật theo nội dung đã thiết lập.

- ##### Khi tạo mới dữ liệu
Khi người dùng tạo dữ liệu mới bằng màn hình, API, nhập dữ liệu (import), v.v., dữ liệu được cập nhật theo nội dung đã thiết lập.

- ##### Khi cập nhật dữ liệu
Khi người dùng cập nhật dữ liệu bằng màn hình, API, nhập dữ liệu (import), v.v., dữ liệu được cập nhật thêm theo nội dung đã thiết lập.



## Màn hình thiết lập
1. Trên danh sách bảng tùy chỉnh, đánh dấu chọn một bảng muốn thiết lập, rồi nhấp vào "Cài đặt chi tiết bảng" ở phía trên bên phải.  

![Màn hình dữ liệu](../img/operation/operation3.png)  


- Hoặc, sau khi chọn bảng muốn thiết lập từ menu, nhấp vào "Cài đặt chi tiết bảng" ở phía trên bên phải theo cách tương tự.  
※Cần cho bảng đó hiển thị trên menu từ trước.  

![Màn hình dữ liệu](../img/operation/operation4.png)  


2. Sau đó, mở "Cài đặt cập nhật hàng loạt" của bảng tùy chỉnh đó.

![Màn hình dữ liệu](../img/operation/operation5.png)  


3. Màn hình cài đặt cập nhật dữ liệu hiển thị.

![Màn hình dữ liệu](../img/operation/operation6.png)  



## Thêm mới
1. Trên màn hình "Cài đặt cập nhật hàng loạt", nhấp vào nút [Mới] ở phía trên bên phải của trang.

2. Màn hình thêm mới cài đặt cập nhật dữ liệu hiển thị. Nhập các thông tin cần thiết.

![Màn hình dữ liệu](../img/operation/operation7.png)  


## Lưu
Sau khi nhập các thiết lập, vui lòng nhấp vào [Gửi].

## Chỉnh sửa
Để chỉnh sửa cài đặt cập nhật dữ liệu, vui lòng nhấp vào liên kết [Chỉnh sửa] ở dòng tương ứng.  

## Xóa
Để xóa cài đặt cập nhật dữ liệu, vui lòng nhấp vào liên kết [Xóa] ở dòng tương ứng.  


## Chi tiết các mục nhập


### Thiết lập cơ bản

![Màn hình dữ liệu](../img/operation/operation8.png)  

- ##### Tên thao tác
Tên của cài đặt cập nhật dữ liệu này.

- ##### Thời điểm cập nhật
Chọn khi nào cập nhật dữ liệu.  
Hãy xem "Các loại thời điểm cập nhật" ở phần trên của trang này rồi chọn.

- ##### Nhãn nút
Chữ hiển thị trên nút của màn hình.  
※Chỉ hiển thị khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang danh sách" hoặc "Khi nhấn nút trên trang chi tiết dữ liệu".

- ##### Biểu tượng nút
Biểu tượng hiển thị trên nút của màn hình.  
※Chỉ hiển thị khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang chi tiết dữ liệu".

- ##### HTML class của nút
HTML class gắn cho nút của màn hình.  
※Chỉ hiển thị khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang chi tiết dữ liệu".

- ##### Hiển thị nút cho cả dữ liệu bị khóa bởi quy trình làm việc
Thông thường, với dữ liệu có trạng thái quy trình làm việc là "Không cho chỉnh sửa dữ liệu", nút không hiển thị trên màn hình chi tiết dữ liệu.  
Khi đặt là YES, nút hiển thị cả với những dữ liệu như vậy. Giá trị mặc định là NO.  
Nút chỉ hiển thị với người dùng có quyền chỉnh sửa dữ liệu đó.  
※Chỉ hiển thị khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang chi tiết dữ liệu".

- ##### Cờ kích hoạt
Khi muốn tạm dừng cài đặt cập nhật dữ liệu, hoặc muốn lưu tạm thiết lập đang làm dở, hãy đặt "Cờ kích hoạt" là NO.  


### Cài đặt cột cập nhật

![Màn hình dữ liệu](../img/operation/operation9.png)  


Thiết lập cột cần cập nhật và giá trị cập nhật.  

- ##### Cột đích
Chọn cột cần cập nhật.  

- ##### Loại cập nhật
Khi loại cột tùy chỉnh của cột đích là "Ngày", "Giờ", "Ngày và giờ", "Người dùng" hoặc "Tổ chức", có thể chọn "Giá trị cố định" hoặc "Giá trị hệ thống".  
Các trường hợp khác chỉ có "Giá trị cố định".

- ##### Giá trị cập nhật
    - Khi loại cập nhật là "Giá trị cố định", hãy nhập giá trị muốn cập nhật.
    - Khi loại cập nhật là "Giá trị hệ thống", các lựa chọn sau hiển thị tùy theo loại cột tùy chỉnh của cột đích.

| Loại cột tùy chỉnh của cột đích | Lựa chọn |
|---|---|
| "Ngày", "Giờ", "Ngày và giờ" | "Ngày giờ thực hiện" |
| "Người dùng" | "Người dùng đăng nhập", "Người tạo" |
| "Tổ chức" | "Tổ chức trực thuộc" |


### Điều kiện cập nhật

![Màn hình dữ liệu](../img/operation/operation10.png)  

Chỉ định điều kiện của dữ liệu có thể thực hiện cài đặt cập nhật này. Chỉ khi thỏa điều kiện mới thực hiện được việc cập nhật.  
※Khi không thiết lập điều kiện nào, có thể thực hiện cập nhật với mọi dữ liệu.  


### Cài đặt hộp thoại nhập

![Màn hình dữ liệu](../img/operation/operation11.png)  

Khi thực hiện cập nhật, một hộp thoại hiển thị để có thể nhập tay giá trị cập nhật của cột đích.  
※Chỉ chọn được khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang danh sách" hoặc "Khi nhấn nút trên trang chi tiết dữ liệu".


## Thực hiện cập nhật
Sau khi thiết lập xong, việc cập nhật được thực hiện vào thời điểm đã định ở mục thiết lập "Thời điểm cập nhật".  

### Nội dung cập nhật
- Giá trị của dữ liệu thành giá trị đã định ở mục thiết lập "Cài đặt cột cập nhật".  
Tuy nhiên, khi loại cập nhật là "Giá trị hệ thống", giá trị sẽ như sau.  

    - Khi giá trị cập nhật là "Ngày giờ thực hiện": đặt ngày giờ đã thực hiện xử lý cập nhật đó
    - Khi giá trị cập nhật là "Người dùng đăng nhập": đặt ID của người dùng đăng nhập đã thực hiện xử lý cập nhật đó
    - Khi giá trị cập nhật là "Người tạo": đặt ID của người dùng đã tạo dữ liệu đó
    - Khi giá trị cập nhật là "Tổ chức trực thuộc": đặt ID của tổ chức mà người dùng đăng nhập đã thực hiện xử lý cập nhật đó trực thuộc  
    ※Khi người dùng đăng nhập thuộc nhiều tổ chức và cột cần cập nhật không có thiết lập "Cho phép chọn nhiều", tổ chức đầu tiên được lưu vào dữ liệu đó.

- Khi đã chọn cột của bảng đích ở mục thiết lập "Cài đặt hộp thoại nhập", hộp thoại nhập giá trị cập nhật sẽ hiển thị.  

![Màn hình dữ liệu](../img/operation/operation12.png)  

    
### Điều kiện cập nhật
- Dữ liệu không thỏa điều kiện đã thiết lập ở "Điều kiện cập nhật" thì không thực hiện được việc cập nhật.  
- Khi "Thời điểm cập nhật" là "Khi nhấn nút trên trang danh sách", nếu đánh dấu dữ liệu không thỏa điều kiện rồi nhấp vào nút cập nhật, lỗi sẽ hiển thị. Khi đó, các dữ liệu khác đã thỏa điều kiện cũng không được cập nhật.
