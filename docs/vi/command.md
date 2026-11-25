# Danh sách lệnh
Đây là danh sách các lệnh dùng được trong Exment.  
Danh sách gồm cả các lệnh dùng bên trong hệ thống và các lệnh dùng cho phát triển.  
Với mục có liên kết đến phần giải thích chi tiết, vui lòng xem cả trang được liên kết.

## Cài đặt và cập nhật

### Cài đặt

Lệnh để cài đặt Exment thủ công.  
Chi tiết vui lòng xem [tại đây](/vi/quickstart_manual).   
※Để cài đặt, ngoài lệnh này còn cần các việc khác. Khi cài đặt, về cơ bản hãy làm theo các bước ở trang được liên kết ở trên.

```
php artisan exment:install
```

### Cập nhật
Lệnh để cập nhật Exment thủ công.  
Chi tiết vui lòng xem [tại đây](/vi/update).  
※Để cập nhật, ngoài lệnh này còn cần các việc khác. Khi cập nhật, về cơ bản hãy làm theo các bước ở trang được liên kết ở trên.

```
php artisan exment:update
```

Trên site production (`APP_ENV=production`), sẽ có câu hỏi xác nhận trước khi thay đổi cơ sở dữ liệu. Ở nơi không có terminal (script, cron, CI), hãy chạy bằng `php artisan exment:update --force`.

```
php artisan exment:update --force
```

### Phát hành các tệp css, js, v.v.
Phát hành toàn bộ các tệp css, js, hình ảnh, tệp cấu hình, v.v. trong package đến đường dẫn mặc định của laravel.

```
php artisan exment:publish
```

### Thiết lập tệp và thư mục ban đầu khi thiết lập máy chủ
Chủ yếu ở môi trường Linux, lệnh này thiết lập chủ sở hữu và quyền (permission) của các tệp và thư mục cần để chạy Exment.  
Chi tiết vui lòng xem [tại đây](/vi/server?id=tự-động-tạo-các-thư-mục-ban-đầu).  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### Kiểm tra yêu cầu hệ thống
Kiểm tra xem các yêu cầu hệ thống cần để chạy Exment, như phiên bản PHP, extension, quyền ghi của thư mục, có được đáp ứng hay không, rồi hiển thị kết quả.  
Chi tiết vui lòng xem phần "Kiểm tra yêu cầu hệ thống" ở [trang này](/vi/server).

```
php artisan exment:checkrequire
```



## Nhập, xuất và xóa dữ liệu

### Xuất dữ liệu
Chạy việc xuất dữ liệu bằng lệnh.  
Chi tiết vui lòng xem [tại đây](/vi/data_cmd_import_export?id=xuất-dữ-liệu).

```
php artisan exment:export (tên bảng)
```

### Xuất dữ liệu (chế độ chunk)
Chạy việc xuất dữ liệu (chế độ chunk, xuất chia nhỏ) bằng lệnh.  
Chi tiết vui lòng xem [tại đây](/vi/data_cmd_import_export?id=export_chunk).

```
php artisan exment:chunkexport (tên bảng)
```


### Nhập dữ liệu
Chạy việc nhập dữ liệu bằng lệnh.  
Chi tiết vui lòng xem [tại đây](/vi/data_cmd_import_export?id=nhập-dữ-liệu).

```
php artisan exment:import {tên thư mục}
```


### Nhập dữ liệu - nhập tệp đính kèm của cột hình ảnh và cột tệp
Có thể lưu hàng loạt tệp đính kèm vào các cột có loại cột tùy chỉnh "Hình ảnh", "Tệp" của Exment.  
Chi tiết vui lòng xem [tại đây](/vi/data_cmd_import_export?id=import_file).

```
php artisan exment:file-import {tên thư mục}
```


### Nhập dữ liệu - danh sách tài liệu (tệp đính kèm)
Có thể lưu hàng loạt tệp vào phần tài liệu (tệp đính kèm) của dữ liệu tùy chỉnh được chỉ định.  
Chi tiết vui lòng xem [tại đây](/vi/data_cmd_import_export?id=import_document).

```
php artisan exment:document-import {tên thư mục}
```


### Nạp hàng loạt dữ liệu số lượng lớn
Nạp hàng loạt dữ liệu số lượng lớn bằng lệnh.  
Chi tiết vui lòng xem [tại đây](/vi/data_bulk_insert).

```
php artisan exment:bulkinsert {tên thư mục}
```


### Làm mới dữ liệu tùy chỉnh
Làm mới (xóa hàng loạt) dữ liệu tùy chỉnh đã lưu trong Exment.  
Hãy dùng khi muốn chỉ giữ lại định nghĩa bảng và xóa dữ liệu thử nghiệm, v.v.  
Chi tiết vui lòng xem [tại đây](/vi/refresh_data).

```
php artisan exment:refreshdata
```


### Làm mới dữ liệu tùy chỉnh (bảng được chỉ định)
Trong dữ liệu tùy chỉnh đã lưu trong Exment, làm mới (xóa hàng loạt) dữ liệu của bảng được chỉ định.  
Hãy dùng khi muốn chỉ giữ lại định nghĩa bảng và xóa dữ liệu thử nghiệm, v.v.  
Chi tiết vui lòng xem [tại đây](/vi/refresh_data).

```
php artisan exment:refreshtable (tên bảng)
```


### Xóa nhật ký thao tác
Xóa dữ liệu của [nhật ký thao tác](/vi/logs). Có thể chỉ định các tùy chọn sau.

- --keep-days=(số ngày. Xóa nhật ký thao tác cũ hơn số ngày đã chỉ định. Chỉ định số nguyên từ 1 trở lên. Nếu không chỉ định, toàn bộ nhật ký thao tác bị xóa)
- --force (khi chỉ định, lệnh chạy mà không hiển thị thông báo xác nhận trước khi xóa)

<span class="red">※Xin lưu ý: nếu không chỉ định "--keep-days", toàn bộ nhật ký thao tác sẽ bị xóa.</span>  
※Ở môi trường không hiển thị được thông báo xác nhận (cron, v.v.), nếu không chỉ định "--force" thì việc xóa không được thực hiện.

```
php artisan exment:log-clear {--keep-days=} {--force}

# Khi xóa nhật ký thao tác cũ hơn 180 ngày mà không hiển thị thông báo xác nhận
php artisan exment:log-clear --keep-days=180 --force
```







## Sao lưu và khôi phục

### Sao lưu
Chạy việc sao lưu của Exment. Chức năng này tương đương với chức năng sao lưu chạy từ màn hình.  
Chi tiết vui lòng xem [tại đây](/vi/backup?id=backup_command).  

```
php artisan exment:backup
```

### Khôi phục
Chạy việc khôi phục của Exment. Chức năng này tương đương với chức năng khôi phục chạy từ màn hình.  
Chi tiết vui lòng xem [tại đây](/vi/backup?id=restore_command).  

```
php artisan exment:restore (tên tệp zip)
```


## Batch và lịch
### Chạy batch của plugin
Chạy batch đã đăng ký trong Exment.  
Plugin cần chạy được chỉ định bằng một trong các cách: ID của plugin ("1" trong ví dụ dưới), "--name=(tên plugin)", hoặc "--uuid=(uuid của plugin)".  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_batch).

```
php artisan exment:batch 1
```


### Chạy theo lịch
Chạy các job theo bộ lập lịch đã đăng ký trong Exment.  
Chi tiết vui lòng xem [tại đây](/vi/additional_task_schedule).

```
php artisan exment:schedule
```


### Chạy thông báo (theo thời gian trôi qua)
Chạy ngay các thông báo được thiết lập với thời điểm kích hoạt "Theo thời gian trôi qua", không phụ thuộc vào thiết lập "Giờ thông báo".  
Thông báo cần chạy được chỉ định bằng một trong các cách: ID của thông báo, "--name=(tên thông báo (chữ và số))", hoặc "--suuid=(suuid của thông báo)".  
※Thông báo có cờ kích hoạt là NO cũng được chạy.  
Chi tiết vui lòng xem [tại đây](/vi/notify).

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# Ví dụ: chạy thông báo có ID là 3
php artisan exment:notify 3
```


### Chạy thông báo (theo thời gian trôi qua) theo giờ thông báo
Trong các thông báo có thời điểm kích hoạt là "Theo thời gian trôi qua" và cờ kích hoạt là YES, lệnh này chạy những thông báo có "Giờ thông báo" trùng với giờ hiện tại.  
※Thông thường, cùng xử lý này được chạy bên trong "Chạy theo lịch" (exment:schedule), nên không cần chạy riêng lệnh này.

```
php artisan exment:notifyschedule
```


### Xác nhận an toàn (kiểm tra thông tin động đất)
Lấy thông tin động đất, và nếu có trận động đất khớp với điều kiện tự động gửi của [Xác nhận an toàn](/vi/safety_check) thì gửi xác nhận an toàn.  
Lệnh được chạy mỗi phút bởi [lịch tác vụ](/vi/additional_task_schedule).  
※Nếu "Tự động gửi khi có động đất" trong cài đặt hệ thống là NO thì lệnh không làm gì.

```
php artisan exment:safetywatch
```



## Công cụ tìm kiếm toàn văn (Meilisearch)
Đây là các lệnh khi dùng công cụ tìm kiếm toàn văn "Meilisearch".  
Chi tiết của từng lệnh vui lòng xem [tại đây](/vi/additional_meilisearch).

|Lệnh|Nội dung|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|Tạo index từ nội dung của cơ sở dữ liệu. Khi chỉ định "--fresh", toàn bộ index được tạo lại. Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch?id=tạo-lại-chỉ-mục).|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|Sửa sự khác biệt giữa cơ sở dữ liệu và index. Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch?id=sửa-khác-biệt).|
|php artisan exment:meili-settings {--show}|Áp dụng các thiết lập của index (ngôn ngữ, từ đồng nghĩa, stop word, v.v.). Khi chỉ định "--show", nội dung thiết lập hiện tại được hiển thị. Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch?id=chỉ-phản-ánh-thiết-lập).|
|php artisan exment:meili-health {--failed}|Hiển thị trạng thái kết nối với Meilisearch và số document đã lưu. Khi chỉ định "--failed", số job đang chờ đồng bộ và số job đồng bộ thất bại cũng được hiển thị.|
|php artisan exment:meili-search (từ khóa) {--limit=10} {--table=} {--highlight} {--facets}|Tìm kiếm bằng Meilisearch, rồi hiển thị kết quả tìm kiếm và thời gian xử lý. Đây là lệnh để kiểm tra hoạt động. Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch?id=kiểm-tra-hoạt-động).|



## Khác, dùng cho phát triển

### Phiên bản Exment
Hiển thị phiên bản Exment đang được cài đặt.

```
php artisan exment:version
```


### Đặt lại mật khẩu
Chạy việc đặt lại mật khẩu đăng nhập Exment bằng lệnh.  
Chi tiết vui lòng xem [tại đây](/vi/login_setting?id=lệnh-đặt-lại-mật-khẩu).

```
php artisan exment:resetpassword --email=(địa chỉ email của người dùng cần đổi) --password=(mật khẩu sau khi đổi)
```

### Hiển thị danh sách API client
Hiển thị danh sách các client đã đăng ký ở [thiết lập API](/vi/api). Với mỗi client, lệnh hiển thị tên, loại, ID người dùng, Client ID, Client Secret và URL chuyển hướng.  
<span class="red">※Client Secret sẽ được hiển thị. Xin cẩn thận khi xử lý kết quả chạy lệnh.</span>

```
php artisan passport:clientlist
```

### Đặt lại dữ liệu của quy trình làm việc 
Có thể đặt lại dữ liệu của quy trình làm việc đang tiến hành. Hãy chạy khi quy trình làm việc không thể tiến hành được nữa vì lý do nào đó.  
Chi tiết vui lòng xem [tại đây](/vi/workflow_execution?id=đặt-lại-dữ-liệu-của-workflow).

```
php artisan exment:workflow-clear (tên bảng) (ID)
```


### Phát hành mã liên kết LINE
Phát hành mã liên kết và URL liên kết (deep link) để liên kết tài khoản LINE cho người dùng được chỉ định.  
Mở URL liên kết trên điện thoại thông minh đã thêm bạn với tài khoản chính thức LINE, rồi gửi tin nhắn được hiển thị, là hoàn tất liên kết.  
※Thông thường, hãy để từng người dùng tự liên kết từ màn hình [Liên kết LINE](/vi/line?id=liên-kết-tài-khoản-line).  
※Ở "ID của người dùng", hãy chỉ định ID (số) của dữ liệu người dùng. Đây không phải là mã người dùng.  
<span class="red">※Nếu chạy cho người dùng đã liên kết tài khoản LINE, liên kết hiện tại sẽ bị hủy.</span>

```
php artisan exment:line-linkcode (ID của người dùng)
```



### Tạo dữ liệu thử nghiệm
Tạo một bộ dữ liệu thử nghiệm của Exment.  
<span class="red">※Xin lưu ý: toàn bộ dữ liệu đã lưu sẽ bị xóa.</span>

```
php artisan exment:inittest
```


### Thử gửi email
Thử gửi email theo thiết lập email đã thiết lập trong Exment.  
Chi tiết vui lòng xem [tại đây](/vi/mailsend_setting?id=thực-hiện-bằng-lệnh).

```
php artisan exment:notifytest --to=(địa chỉ nhận email)
```

### Kiểm tra thiếu sót của tệp ngôn ngữ
Kiểm tra các ngôn ngữ và từ của tệp ngôn ngữ Laravel chưa được đưa vào package.

```
php artisan exment:checklang
```


### Vá dữ liệu
Lệnh chạy khi cần chỉnh sửa dữ liệu đã lưu trong cơ sở dữ liệu.  
※Về cơ bản, lệnh được chạy tự động khi cập nhật dữ liệu.  
※Về hành động thực hiện, vui lòng xem trực tiếp mã nguồn "src/Console/PatchDataCommand.php".

```
php artisan exment:patchdata {hành động thực hiện}
```



### Kiểm tra kết nối cơ sở dữ liệu
Kiểm tra xem có đang kết nối với cơ sở dữ liệu hay không.  
Lệnh trả về 1 nếu đang kết nối, và 0 nếu chưa kết nối.

```
php artisan exment:check-connection
```
