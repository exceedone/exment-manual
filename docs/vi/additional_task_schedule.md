# Task schedule
Đây là thiết lập để tự động chạy các xử lý của Exment vào giờ đã định (task schedule).  
Cần thiết lập thêm ở phía máy chủ. Các bước khác nhau giữa Linux và Windows.

Task schedule được dùng cho các việc sau.

- Sao lưu cơ sở dữ liệu và tệp mỗi ngày vào giờ đã định.  
- Gửi email vào giờ đã định cho những người liên quan đến dữ liệu khớp điều kiện, theo thiết lập thông báo.
- Kiểm tra thông tin động đất mỗi phút, nếu có động đất khớp điều kiện thì tự động gửi [xác nhận an toàn](/vi/safety_check) (lệnh "exment:safetywatch").
- Khi dùng công cụ tìm kiếm toàn văn (Meilisearch), tự động sửa sự khác biệt giữa cơ sở dữ liệu và chỉ mục mỗi ngày 1 lần (lệnh "exment:meili-reconcile").  
※Chỉ khi "MEILISEARCH_REPAIR_ENABLED" là true thì mới được chạy vào giờ của "MEILISEARCH_REPAIR_AT". Chi tiết vui lòng xem [trang công cụ tìm kiếm toàn văn (Meilisearch)](/vi/additional_meilisearch).

### Các bước thiết lập (Linux)
**(1) Chạy lệnh sau.**

~~~
crontab -e
~~~

**(2) Màn hình thiết lập Cron hiện ra, hãy ghi nội dung sau.**

Nhờ đó, lệnh artisan schedule được chạy mỗi phút. Sau đó, Exment sẽ chạy các task vào giờ đã định.  
※Dưới đây là một ví dụ. Cách ghi và thiết lập có thể khác nhau tùy theo hệ điều hành và dịch vụ.

~~~
# Linux thông thường
* * * * * cd /(thư mục gốc của Exment) && php artisan schedule:run >> /dev/null 2>&1

# Xserver (ghi bằng đường dẫn đầy đủ, cùng phiên bản với PHP đã chọn trên màn hình quản lý. Dưới đây là trường hợp PHP 8.3)
* * * * * cd /(thư mục gốc của Exment) && nice -n 15 /usr/bin/php8.3 artisan schedule:run >> /dev/null 2>&1

# Sakura Internet
* * * * * cd /(thư mục gốc của Exment); php artisan schedule:run >> /dev/null 2>&1
~~~

> **Trên máy chủ thuê (Xserver, v.v.)**: `php` của cron có thể là PHP mặc định của máy chủ, khác với PHP đã chọn trên màn hình quản lý. Hãy ghi PHP cùng phiên bản với màn hình quản lý bằng đường dẫn đầy đủ ([máy chủ thuê](/vi/install_rental)).

### Các bước thiết lập (Windows)
- Chạy lệnh sau và sao chép vị trí (đường dẫn) của tệp php.exe.  

~~~
where php
// C:\xampp\php\php.exe
~~~

- Trong menu Windows, nhập "task" và khởi động Task Scheduler.  
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows2.png)

- Trong Task Scheduler, bấm "Create Task".
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows6.png)

- Ở tab "General", thiết lập như sau. ("Name" có thể đặt tên tùy ý)
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows1.png)

- Bấm tab "Triggers". Tạo 2 trigger.  
    (1) Bấm nút "New".  
    Sau đó nhập như sau.  
    - Begin the task: At startup
    - Repeat task every: 1 minute
    - For a duration of: Indefinitely
    - Đánh dấu "Enabled"  
    Xong thì bấm "OK".  
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows3_1.png)

    (2) Bấm nút "New" một lần nữa.  
    Sau đó nhập như sau.  
    - Begin the task: At task creation/modification
    - Repeat task every: 1 minute
    - For a duration of: Indefinitely
    - Đánh dấu "Enabled"  
    Xong thì bấm "OK".  
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows3_2.png)

- Ở tab "Actions", bấm nút "New".  
Sau đó nhập như sau.
    - Action: Start a program
    - Program/script: đường dẫn đến php đã sao chép lúc nãy
    - Add arguments: (thư mục gốc của Exment)/artisan schedule:run
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows4.png)

- Ở tab "Settings", đánh dấu "Run task as soon as possible after a scheduled start is missed".
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows5.png)

- Với máy tính xách tay, ở tab "Conditions", bỏ đánh dấu "Start the task only if the computer is on AC power". 
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows9.png)

- Khi đã xong các thiết lập trên, bấm OK.  
Màn hình nhập thông tin xác thực của người dùng hiện ra, hãy nhập mật khẩu.  
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows7.png)

- Cuối cùng, ở "Task Scheduler Library", chọn task đã tạo và bấm "Run". 
![Thiết lập Task Scheduler của Windows](../img/quickstart/task_windows8.png)

Như vậy là thiết lập xong.


## Kiểm tra khi không hoạt động tốt (từ v4.0.6 trở đi)
Khi không hoạt động tốt, hãy dùng 2 cách sau để xác định nguyên nhân nằm ở đâu.

| Cách | Biết được gì |
| ---- | ---- |
| Xuất log | Schedule có được gọi từ cron hoặc Task Scheduler hay không |
| Chạy lệnh trực tiếp | Bản thân thiết lập thông báo và sao lưu có đúng hay không |

### Xuất log
Nên vừa xuất log vừa kiểm tra.  
Từ v4.0.6, đã thêm log debug cho việc chạy schedule. Hãy kiểm tra theo các bước sau.

#### Các bước thiết lập 
- Thêm nội dung sau vào tệp .env rồi lưu.

~~~
EXMENT_DEBUG_MODE_SCHEDULE=true
~~~

- Nhờ đó, khi định nghĩa schedule và khi chạy schedule, log sẽ được ghi vào /storage/logs/laravel.log.  
Nếu thiết lập task schedule đúng, log sẽ được ghi mỗi phút.


#### Nội dung log được xuất

- Exment schedule debug defined.  
→Là log được ghi khi đã thiết lập xong việc xuất các log bên dưới và schedule.  
→Khi log này không được ghi, có thể việc định nghĩa hoặc gọi schedule chưa kết thúc đúng. Hãy xem lại thiết lập cron hoặc thiết lập Task Scheduler.

- Exment schedule debug everyMinute called.  
→Là log được ghi mỗi phút. Nếu việc định nghĩa schedule kết thúc đúng thì log được ghi mỗi phút.  
→Khi log này không được ghi, có thể việc định nghĩa hoặc gọi schedule chưa kết thúc đúng. Hãy xem lại thiết lập cron hoặc thiết lập Task Scheduler.

- Exment schedule debug hourly called.  
→Là log được ghi vào phút 0 của mỗi giờ. Nếu việc định nghĩa schedule kết thúc đúng thì log được ghi mỗi giờ.  
Có cùng định nghĩa với lệnh schedule thật của Exment. Trước tiên, hãy kiểm tra xem log này có được ghi không.

- Exment schedule command called.  
→Là log được ghi khi lệnh schedule của Exment bắt đầu chạy. Nếu log này được ghi thì ít nhất lệnh schedule đã được chạy đúng.  
Khi log này được ghi mà thông báo hoặc sao lưu không chạy như mong muốn, hãy xem lại các giá trị thiết lập.


#### Lưu ý
Log này không phân biệt được "chạy từ schedule hay chạy lệnh thông thường". Khi chạy lệnh thông thường, log cũng được ghi.  
Ngoài lúc kiểm tra schedule, hãy xóa giá trị thiết lập EXMENT_DEBUG_MODE_SCHEDULE.


### Chạy lệnh trực tiếp
Khi thông báo hoặc sao lưu không hoạt động đúng, cũng có cách tự chạy lệnh schedule của Exment để kiểm tra.  
Hãy chạy lệnh sau.

```
php artisan exment:schedule
```

Lệnh này làm các việc sau. Cả hai vốn chỉ chạy vào phút 00, nhưng khi chạy lệnh trực tiếp thì được chạy ngay.

- Chạy các thông báo (theo thời gian trôi qua) có "Giờ thông báo" trùng khớp.
- Chạy sao lưu tự động có "Giờ bắt đầu sao lưu tự động (giờ)" trùng khớp.

Khi lệnh này chạy như mong muốn, có khả năng phía schedule (cron hoặc Task Scheduler) vì lý do nào đó không hoạt động đúng.  
Hãy dùng làm tham khảo khi tìm nguyên nhân.



[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
