# Khi xảy ra lỗi lúc cài đặt
Tùy theo môi trường máy chủ và phiên bản, có thể xảy ra lỗi khi cài đặt, v.v.  
Trang này tổng hợp cách xử lý cho từng lỗi.  

## Khi xảy ra lỗi lúc chạy lệnh "php artisan exment:install"
Khi chạy lệnh "php artisan exment:install", có thể xảy ra lỗi như sau.

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- Nguyên nhân: xảy ra khi phiên bản MySQL thấp hơn 5.7.7.
- Cách xử lý: hãy nâng MySQL lên phiên bản 8.0 trở lên.

## Sau lần cài đặt đầu tiên, khi truy cập màn hình quản trị thì xảy ra lỗi "SQLSTATE[HY000][202] Permission denied"
Khi Apache truy cập MySQL, có thể cần thiết lập SELinux (chức năng bảo mật của Linux).  
Khi gặp lỗi này, hãy chạy lệnh sau.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## Trên máy chủ thuê, khi chạy các lệnh như "composer require" thì hiển thị "Killed"
Việc này thỉnh thoảng xảy ra khi bộ nhớ bị quá tải (không phải lúc nào cũng xảy ra).  
Khi thấy thông báo này, hãy thêm "nice -n 20" vào đầu lệnh rồi chạy composer. Lệnh sẽ được chạy với độ ưu tiên thấp hơn.

~~~
nice -n 20 composer .....
~~~

※Dù chạy theo cách này, "Killed" vẫn có thể hiển thị lại. Mong bạn thông cảm.
