# (Dành cho người dùng nâng cao) Thực hiện trễ xử lý thông báo
Đây là thiết lập để chạy xử lý gửi thông báo sau, tách khỏi thao tác trên màn hình.  
Thông thường Exment chạy mọi xử lý ngay tại chỗ (thực hiện đồng bộ). Khi thiết lập như sau, một phần xử lý có thể được chạy sau (thực hiện trễ, thực hiện bằng queue). Thời gian chờ trên màn hình sẽ ngắn hơn.

Hiện tại, các xử lý sau có thể được chạy sau.

- Gửi email
- Gửi Slack
- Gửi Microsoft Teams

## Lưu ý
- Với thực hiện trễ, các xử lý (job) được dồn vào một nơi xếp hàng gọi là "queue", rồi được chạy bằng một process khác với màn hình.
- Để chạy các job đã dồn lại, hãy chạy "queue worker" (chương trình thực hiện job) bằng lệnh. Worker cần được chạy liên tục. **Khi worker dừng thì xử lý không được thực hiện**.  
Hãy hết sức chú ý, ví dụ như giám sát xem worker có đang chạy không.
- Tại thời điểm thực hiện thông báo từ màn hình, chưa biết được thông báo thành công hay thất bại.  
Vì vậy, dù thực tế thông báo thất bại, thông điệp "Đã thực hiện thông báo!" vẫn có thể hiện ra.
- Giải thích chi tiết về queue vui lòng xem [tài liệu Laravel](https://readouble.com/laravel/12.x/ja/queues.html).


## Các bước thiết lập
Thiết lập queue driver (nơi dồn job). Ở đây dùng cơ sở dữ liệu. (Tùy theo thiết lập, cũng có thể dùng Redis, v.v.)

**(1) Mở .env và ghi thiết lập sau.**

```
#Queue driver. Giá trị được thiết lập trong các bước cài đặt Exment là sync (xử lý đồng bộ)
QUEUE_CONNECTION=database
```

**(2) Chạy các lệnh sau.** Các lệnh này tạo bảng chứa thông tin của queue.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> Bảng "jobs" và "failed_jobs" có thể đã được tạo bởi migration khi tạo dự án Laravel. Hãy xem thư mục "database/migrations" và chạy như sau.
>
> | Trong thư mục "database/migrations" | Lệnh cần chạy |
> | ---- | ---- |
> | Có tệp chứa "create_jobs_table" (dự án tạo bằng Laravel 11 trở lên) | Chỉ "php artisan exment:update" (cả hai bảng được tạo bởi migration mặc định, nên không chạy "queue:table" và "queue:failed-table") |
> | Chỉ có tệp chứa "create_failed_jobs_table" | "queue:table" và "php artisan exment:update" |
> | Không có tệp nào | Cả 3 lệnh ở trên |
>
> Khi hiện "Migration already exists." thì migration đó đã có sẵn. Hãy bỏ qua lỗi và chuyển sang lệnh tiếp theo.

**(3) Chạy lệnh sau.** Worker bắt đầu chạy.  
Lệnh này tiếp tục chạy cho đến khi bạn tự dừng hoặc đóng terminal.

```
php artisan queue:listen
```

> Để queue:listen chạy liên tục ở chế độ nền, cần có một process monitor (cơ chế canh xem worker có bị dừng không) như [Supervisor](https://readouble.com/laravel/12.x/ja/queues.html#supervisor-configuration).

### Khi không thể để worker chạy liên tục (máy chủ thuê, v.v.)
Khi không thể để worker chạy liên tục, ví dụ trên máy chủ thuê, hãy dùng cron để mỗi phút xử lý các job đã dồn lại (`--stop-when-empty` kết thúc khi hết job, `--max-time=50` kết thúc trước lần cron tiếp theo). Hãy ghi php bằng đường dẫn đầy đủ, cùng phiên bản với Web.

```
* * * * * cd /(thư mục gốc của Exment) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

Nếu cách đó cũng không làm được, hãy giữ nguyên `QUEUE_CONNECTION=sync` (giá trị khi cài đặt).

## Khi cập nhật hệ thống
Queue worker là process chạy trong thời gian dài. Nếu không khởi động lại thì mã nguồn mới không được dùng.  
Vì vậy, khi cập nhật hệ thống, hãy khởi động lại worker. Lệnh queue:restart khởi động lại nhẹ nhàng tất cả các worker.

```
php artisan queue:restart
```


## Kiểm tra job đang thực hiện
Cách kiểm tra các job đang được thực hiện.

- Kết nối vào cơ sở dữ liệu và chạy lệnh sau.

```
select * from jobs;
```

- Danh sách các job đang được thực hiện sẽ hiện ra.


## Kiểm tra job thực hiện thất bại
Cách kiểm tra các job đã thực hiện thất bại.

- Kết nối vào cơ sở dữ liệu và chạy lệnh sau.

```
select * from failed_jobs;
```

- Danh sách các job đã thực hiện thất bại sẽ hiện ra.
