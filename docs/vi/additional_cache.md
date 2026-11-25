# Bật cache
Đưa dữ liệu chủ như các thiết lập vào cache (cơ chế lưu tạm, từ lần sau sẽ dùng lại dữ liệu đã lưu).  
Số lần truy cập cơ sở dữ liệu giảm đi, nên tùy môi trường mà có thể nhanh hơn.

Chủ yếu các dữ liệu sau được đưa vào cache.

- Cài đặt hệ thống
- Bảng tùy chỉnh
- Cột tùy chỉnh
- Cài đặt biểu mẫu
- Cài đặt chế độ xem
- Cài đặt quy trình làm việc
- Có kết nối được với cơ sở dữ liệu hay không
- Các thông tin dữ liệu chủ khác

### Các bước thiết lập 
- Thêm nội dung sau vào tệp .env rồi lưu.

~~~
EXMENT_USE_CACHE=true
~~~

### Khi muốn xóa cache 
- Cache được cập nhật định kỳ. Nếu muốn xóa ngay, hãy chạy lệnh sau.

~~~
php artisan cache:clear
~~~


[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
