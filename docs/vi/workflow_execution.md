# Thực hiện workflow
Đây là các bước để mỗi người dùng thực hiện workflow do quản trị viên thiết lập.
Quản trị viên cần thực hiện [thiết lập workflow](/workflow_example) từ trước.

## Tiến hành workflow
- Khi người dùng xem dữ liệu, trạng thái hiện tại cùng người dùng / tổ chức xử lý sẽ thực hiện hành động (action) tiếp theo được hiển thị.
![Màn hình workflow](../img/workflow/workflow_data2.png)  


- Nếu người dùng đăng nhập có quyền thực hiện hành động tiếp theo, nút hành động sẽ được hiển thị ở phía trên bên phải của trang.  
![Màn hình workflow](../img/workflow/workflow_data1.png)  


- Nhấp vào nút để hiển thị hộp thoại xác nhận thực hiện hành động.  
![Màn hình workflow](../img/workflow/workflow_data3.png)  

   - <span class="heading_smaller_than_h5">Action name (Tên hành động)</span>  
   Hiển thị tên của hành động sẽ được thực hiện lần này.  

   - <span class="heading_smaller_than_h5">Status (Trạng thái)</span>  
   Hiển thị trạng thái trước và sau khi thực hiện hành động này.  

   - <span class="heading_smaller_than_h5">Next work user (Người dùng xử lý tiếp theo)</span>  
   Hiển thị người dùng / tổ chức xử lý sau khi hành động này được thực hiện.  

   - <span class="heading_smaller_than_h5">Comment (Bình luận)</span>  
   Vui lòng nhập bình luận khi thực hiện hành động.  

- Nếu nội dung không có vấn đề gì, nhấp vào [Submit] để thực hiện hành động.

- Khi hành động được thực hiện, "Current status" (trạng thái hiện tại) và "Current working user" (người dùng xử lý hiện tại) sẽ thay đổi.  
※Lúc này, tùy theo thiết lập workflow, biểu tượng ổ khóa có thể được hiển thị ở "Current status". Khi đó, dữ liệu bị khóa và không thể chỉnh sửa hay xóa.

![Màn hình workflow](../img/workflow/workflow_data4.png)  

## Kiểm tra các tác vụ chưa xử lý
Những dữ liệu mà bạn cần thực hiện hành động có thể được kiểm tra tập trung trên tất cả các bảng, từ biểu tượng tác vụ chưa xử lý ở phía trên bên phải của trang hoặc tại màn hình danh sách tác vụ chưa xử lý.  
Chi tiết vui lòng xem [Tác vụ chưa xử lý](/workflow_task).

## Đặt lại dữ liệu của workflow

Có thể đặt lại (reset) dữ liệu của workflow đang trong quá trình xử lý. Hãy thực hiện khi workflow không thể tiếp tục vì một lý do nào đó.  
Cần chạy lệnh. Vui lòng chạy lệnh dưới đây tại thư mục gốc của dự án.

~~~
php artisan exment:workflow-clear (tên bảng) (ID)

# Ví dụ: đặt lại tiến trình workflow của dữ liệu có tên bảng "estimate", ID "6"
php artisan exment:workflow-clear estimate 6

# Ví dụ: đặt lại tiến trình workflow của dữ liệu có tên bảng "syusseki", ID "600"
php artisan exment:workflow-clear syusseki 600
~~~
