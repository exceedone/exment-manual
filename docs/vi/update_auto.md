# (Dành cho người dùng nâng cao) Cập nhật tự động
Đây là thiết lập để tự động cập nhật khi Exment có phiên bản mới.  
Bạn đăng ký trên máy chủ một xử lý chạy vào giờ cố định mỗi ngày (xử lý cập nhật định kỳ).

- Cách cập nhật thông thường và phạm vi phiên bản có thể lên tới, vui lòng xem [Cập nhật](/vi/update).

## Đặc tả của cập nhật tự động
Mỗi lần chạy, xử lý đã đăng ký làm các việc sau.

- Gọi Web API để lấy thông tin phiên bản mới nhất của Exment (1)
- Lấy phiên bản Exment đang được cài (2)
- Nếu (1) mới hơn (2) thì chạy batch cập nhật
- Tuy nhiên, nếu (2) là phiên bản bắt đầu bằng "dev" thì không cập nhật

## Cách thiết lập
Các bước khác nhau giữa Linux và Windows.

| Máy chủ | Phần cần xem | Thứ cần dùng |
|---|---|---|
| Linux (bao gồm Sakura Internet, XServer) | Các bước thiết lập (Linux) | Batch cập nhật, ExmentAutoUpdate.bash, jq, cron |
| Windows | Các bước thiết lập (Windows) | Batch cập nhật, ExmentAutoUpdate.exe, Task Scheduler |

### Các bước thiết lập (Linux)
**(1) Đặt batch cập nhật**

Tải [batch cập nhật](/vi/update) và đặt vào thư mục dự án của Exment.  
Hãy tải tệp sau tùy theo môi trường.

- Trường hợp Sakura Internet : ExmentUpdateLinuxSakura.sh
- Trường hợp XServer : ExmentUpdateLinuxXserver.sh
- Các trường hợp khác : ExmentUpdateLinux.sh

> Shell thực hiện cập nhật đã được cập nhật, vui lòng xem [Cập nhật](/vi/update) và thay bằng tệp mới.  
Hãy kiểm tra rằng dòng thứ 2 của tệp shell có ghi phiên bản "v1.1.0" trở lên.

**(2) Tải batch kiểm tra cập nhật**

Chạy lệnh sau trong thư mục gốc của dự án Exment.

~~~
wget https://exment.net/downloads/cmd/ExmentAutoUpdate.bash
chmod 775 ExmentAutoUpdate.bash
~~~

**(3) Cài "jq"**

Xử lý này dùng thư viện tên "jq". Dùng lệnh sau để kiểm tra xem lệnh "jq" đã được cài chưa.

```
jq --help
```

- Nếu hiện thông báo kiểu "không có lệnh" thì lệnh jq chưa được cài.  
Hãy cài lệnh jq theo [cách trong tài liệu chính thức](https://stedolan.github.io/jq/download/).

**(4) Ghi vị trí của composer vào batch cập nhật**

Tìm đường dẫn của composer. Chạy lệnh sau ở đường dẫn bất kỳ và sao chép kết quả.

```
which composer
# Ví dụ kết quả
# /home/xxx/usr/local/bin/composer
```

Sửa tệp ExmentUpdateLinux.sh đã tải (hoặc ExmentUpdateLinuxSakura.sh, ExmentUpdateLinuxXserver.sh).  
Đổi giá trị composer_path trong tệp thành kết quả của "which composer".

```
# composer_path=''
# Sửa thành như dưới đây
composer_path='/home/xxx/usr/local/bin/composer'
```

**(5) Đăng ký vào cron**

Chạy lệnh sau.

~~~
crontab -e
~~~

Màn hình thiết lập Cron xuất hiện, hãy ghi nội dung sau.

~~~

###Thêm nội dung dưới đây
(phút chạy) (giờ chạy) * * * cd /(thư mục gốc của Exment); bash ExmentAutoUpdate.bash
# Ví dụ: chạy Exment nằm trong đường dẫn /var/www/exment vào 3:00 mỗi ngày
0 3 * * * cd /var/www/exment; bash ExmentAutoUpdate.bash >> storage/logs/ExmentAutoUpdate.log  2>&1
~~~


#### Với XServer, làm thêm các việc dưới đây

- Chạy lệnh sau để tìm đường dẫn HOME.

```
echo $HOME
# Ví dụ kết quả
# /home/xxx
```

- Sau đó, sửa tệp ExmentUpdateLinuxXserver.sh đã tải.  
Đổi giá trị home_path thành kết quả của "echo $HOME".

```
# home_path=''
# Sửa thành như dưới đây. Không thêm "/" ở cuối
home_path='/home/xxx'
```


#### Hoàn tất thiết lập
- Đến đây, ExmentAutoUpdate.bash sẽ chạy vào giờ cố định mỗi ngày. Nếu có phiên bản mới nhất, hệ thống tự động nâng phiên bản.
- Log chạy của cập nhật tự động được lưu ở storage/logs/ExmentAutoUpdate.log.




### Các bước thiết lập (Windows)
**(1) Đặt batch cập nhật và chương trình cập nhật tự động**

1. Tải [batch cập nhật ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) và đặt vào thư mục dự án của Exment.

2. Tải tệp zip của chương trình cập nhật tự động [tại đây](https://exment.net/downloads/cmd/ExmentAutoUpdateWindows.zip).

3. Giải nén tệp zip đã tải và đặt nguyên thư mục "ExmentAutoUpdateWindows" vào thư mục dự án của Exment.

```
# Cấu trúc thư mục (một phần)
- app
- bootstrap
- config
- ExmentUpdateWindows.bat
- ExmentAutoUpdateWindows
    - ExmentAutoUpdate.exe
    - ExmentAutoUpdate.exe.config
    - Newtonsoft.Json.dll
```

**(2) Đăng ký vào Task Scheduler**

1. Nhập "task" ở menu của Windows và khởi động Task Scheduler.  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows2.png)

2. Trong Task Scheduler, bấm "Create Task" (tạo tác vụ).  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows6.png)

3. Ở tab "General", thiết lập như sau. ("Name" là tên tùy ý)  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows1.png)

4. Bấm tab "Triggers". Tạo trigger.  
    (1) Bấm nút "New".  
    Sau đó nhập như sau.  
    - Begin the task (bắt đầu tác vụ): On a schedule (theo lịch)
    - Start (bắt đầu): giờ chạy của ngày bắt đầu
    - Recur every (khoảng cách): 1 ngày
    - Đánh dấu chọn "Enabled" (bật)  
    Khi xong, bấm "OK".  
![Thiết lập Windows Task Scheduler](../ja/img/quickstart/task_update_windows1.png)

5. Ở tab "Actions", bấm nút "New".  
Sau đó nhập như sau.
    - Action (thao tác): Start a program (khởi động chương trình)
    - Program/script: đường dẫn tới "ExmentAutoUpdate.exe" đã đặt

    ![Thiết lập Windows Task Scheduler](../ja/img/quickstart/task_update_windows2.png)

6. Với máy tính xách tay, ở tab "Conditions", bỏ dấu chọn "Start the task only if the computer is on AC power".  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows9.png)

7. Khi đã thiết lập đến đây, bấm OK.  
Sau đó màn hình nhập thông tin xác thực của người dùng xuất hiện, hãy nhập mật khẩu.  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows7.png)

8. Khi thiết lập xong, ở "Task Scheduler Library", hãy chọn tác vụ vừa tạo và bấm "Run".  
![Thiết lập Windows Task Scheduler](../img/quickstart/task_windows8.png)

Đến đây là hoàn tất thiết lập.





#### Hoàn tất thiết lập
- Đến đây, ExmentAutoUpdate.exe sẽ chạy vào giờ cố định mỗi ngày. Nếu có phiên bản mới nhất, hệ thống tự động nâng phiên bản.

