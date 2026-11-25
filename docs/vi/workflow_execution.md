# Thực hiện workflow
Đây là các bước để người dùng thực hiện hành động của workflow (gửi yêu cầu, phê duyệt, v.v.).  
Quản trị viên cần thực hiện [thiết lập workflow](/vi/workflow_setting) từ trước.

## Tiến hành workflow
1. Khi mở dữ liệu, trạng thái hiện tại cùng người dùng / tổ chức xử lý sẽ thực hiện hành động tiếp theo được hiển thị.
![Màn hình workflow](../img/workflow/workflow_data2.png)  


2. Nếu người dùng đăng nhập có quyền thực hiện hành động tiếp theo, nút hành động sẽ được hiển thị ở phía trên bên phải của trang.  
![Màn hình workflow](../img/workflow/workflow_data1.png)  


3. Nhấp vào nút để hiển thị hộp thoại xác nhận thực hiện hành động.  
![Màn hình workflow](../img/workflow/workflow_data3.png)  

   - <span class="heading_smaller_than_h5">Tên hành động</span>  
   Hiển thị tên của hành động sẽ được thực hiện lần này.  

   - <span class="heading_smaller_than_h5">Trạng thái</span>  
   Hiển thị trạng thái trước và sau khi thực hiện hành động này.  

   - <span class="heading_smaller_than_h5">Người xử lý tiếp theo</span>  
   Hiển thị người dùng / tổ chức xử lý sau khi hành động này được thực hiện.  

   - <span class="heading_smaller_than_h5">Bình luận</span>  
   Vui lòng nhập bình luận khi thực hiện hành động.  

4. Nếu nội dung không có vấn đề gì, nhấp vào [Gửi]. Hành động sẽ được thực hiện.

5. Khi hành động được thực hiện, "Trạng thái hiện tại" và "Người xử lý hiện tại" sẽ thay đổi.  
※ Tùy theo thiết lập workflow, biểu tượng ổ khóa có thể được hiển thị ở "Trạng thái hiện tại". Khi đó, dữ liệu bị khóa và không thể chỉnh sửa hay xóa.

![Màn hình workflow](../img/workflow/workflow_data4.png)  

※ Từ v7.1.0 trở đi, cũng có thể thực hiện gộp một lần hành động của nhiều dữ liệu đã đánh dấu trong danh sách dữ liệu. Chi tiết vui lòng xem [Công cụ thao tác của danh sách dữ liệu](/vi/data_grid_tools).

## Kiểm tra các tác vụ chưa xử lý
Những dữ liệu mà bạn cần thực hiện hành động có thể được kiểm tra gộp từ tất cả các bảng, ở biểu tượng tác vụ chưa xử lý phía trên bên phải của trang hoặc tại màn hình danh sách tác vụ chưa xử lý.  
Chi tiết vui lòng xem [Công việc chờ xử lý](/vi/workflow_task).

## Đặt lại dữ liệu của workflow

Có thể đặt lại (reset) dữ liệu của workflow đang trong quá trình xử lý. Hãy thực hiện khi workflow không thể tiếp tục vì một lý do nào đó.  
Việc đặt lại được làm bằng lệnh. Vui lòng chạy lệnh dưới đây tại thư mục gốc của dự án.

~~~
php artisan exment:workflow-clear (tên bảng) (ID)

# Ví dụ: đặt lại tiến trình workflow của dữ liệu có tên bảng "estimate", ID "6"
php artisan exment:workflow-clear estimate 6

# Ví dụ: đặt lại tiến trình workflow của dữ liệu có tên bảng "syusseki", ID "600"
php artisan exment:workflow-clear syusseki 600
~~~
