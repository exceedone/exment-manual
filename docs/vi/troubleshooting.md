# Câu hỏi thường gặp và xử lý sự cố
Trang này tổng hợp các câu hỏi thường gặp và cách xử lý khi gặp khó khăn lúc cài đặt, cập nhật và thao tác với Exment.  
Khi xảy ra lỗi, trước tiên hãy kiểm tra nội dung lỗi ở "Tệp log" bên dưới, rồi xem mục phù hợp.  
Nội dung sẽ được cập nhật thường xuyên.  

## Tệp log
Khi xảy ra lỗi, v.v., nội dung được ghi vào tệp log.  
Tệp log nằm ở vị trí sau, tính từ thư mục gốc của dự án Exment.  
/storage/logs/laravel.log


## Cài đặt và cập nhật

### Xảy ra Permission Denied với tệp và thư mục
Khi cài đặt đơn giản hoặc khi ghi vào tệp log, có thể xảy ra lỗi quyền.  
Ngoài ra, ở phần kiểm tra yêu cầu hệ thống, có thể hiển thị lỗi sau.  

![Màn hình cài đặt_Thiết lập](../ja/img/troubleshooting/file_permission1.png)  

Có thể người dùng chạy web server (apache, www-data, v.v.) không đủ quyền.  
Trong thư mục dự án của Exment, hãy thêm quyền ghi của người dùng này cho các thư mục sau.  

- storage
- bootstrap/cache

Với "[cài đặt đơn giản](/vi/quickstart)" cài từ màn hình web, ngoài các thư mục trên, các mục sau cũng cần quyền ghi của cùng người dùng đó.  
※Chỉ cần khi cài đặt. Nếu muốn thiết lập quyền chặt chẽ hơn, hãy xóa quyền ghi của thư mục sau khi cài đặt đơn giản.

- .env
- app
- config
- public

### composer require hoặc batch cập nhật kết thúc giữa chừng
Khi cài đặt trên Linux, lúc chạy lệnh composer require hoặc batch cập nhật, có thể hiển thị như sau.  

```
# Kiểu 1
Killed

# Kiểu 2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82

# Kiểu 3
Fatal error: Allowed memory size of XXXXXXXX bytes exhausted
```

Đây là lỗi do thiếu bộ nhớ.  
Làm một trong hai việc sau có thể giải quyết được.

#### Tạo swap
Hãy tạo swap (vùng dùng đĩa thay cho bộ nhớ khi thiếu bộ nhớ) bằng các lệnh sau, rồi cài đặt hoặc cập nhật lại.  
※Tùy môi trường, hãy thêm "sudo" vào đầu lệnh.

~~~
dd if=/dev/zero of=/swapfile bs=2M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
~~~

#### Thay đổi giới hạn bộ nhớ
Hãy thực hiện các nội dung sau.

- Sửa memory_limit trong tệp php.ini.

```
memory_limit=000M #Tăng kích thước lớn hơn hiện tại cho phù hợp
memory_limit=-1 #Hoặc chỉ định như thế này. Có thể dùng bộ nhớ không giới hạn, nên bạn tự chịu trách nhiệm khi thiết lập
```

- Thiết lập biến môi trường của composer (nếu vấn đề xảy ra khi cập nhật, hãy thêm vào batch)

```
COMPOSER_MEMORY_LIMIT=-1 composer update
```


### Xảy ra lỗi composer khi cài đặt thủ công hoặc cập nhật

Khi cài đặt thủ công hoặc cập nhật, có thể xảy ra lỗi như sau.

```
Installation failed, reverting ./composer.json to its original content.

  [RuntimeException]
  Could not load package XXX/XXX in http://repo.packagist.org: [UnexpectedValueException] Could not parse version constraint ~4.*: Invalid version string "~4.*"
```

Trong trường hợp này, nâng phiên bản composer có thể giải quyết được. Hãy cập nhật composer lên bản mới nhất.  
**※Cách cập nhật có vẻ khác nhau tùy môi trường. Hãy thử cập nhật composer bằng một trong các cách (1) đến (3) dưới đây.**


#### (1) Chạy lệnh sau

```
composer selfupdate
```

#### (2) Chạy lệnh sau

```
composer self-update
```

#### (3) Nếu cả hai cách trên đều không cập nhật được, hãy làm theo các bước sau

- ##### Xóa composer
Trước tiên, xóa composer đã được cài đặt.

```
# Với Linux và Mac
which composer
# Với Windows
where composer
#Ví dụ kết quả : /usr/bin/composer
###Chạy lệnh sau
rm /usr/bin/composer
```

- ##### Cài lại composer
Hãy cài lại composer theo các hướng dẫn sau.
    - [Trang chính thức](https://getcomposer.org/download/)
    - [Trang hướng dẫn cho Windows](https://weblabo.oscasierra.net/php-composer-windows-install/)
    - [Trang hướng dẫn cho Linux](https://weblabo.oscasierra.net/php-composer-centos-install/)
    - [Trang hướng dẫn cho Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

### Xảy ra lỗi "LogicException Invalid key supplied " khi chạy lệnh composer update  
Khi chạy lệnh composer update, có thể xảy ra lỗi như sau.

```
   LogicException	
	
  Invalid key supplied	
	
  at vendor/league/oauth2-server/src/CryptKey.php:67	
     63▕             if (!$this->isValidKey($this->keyContents, $this->passPhrase ?? '')) {	
     64▕                 throw new LogicException('Unable to read key from file ' . $keyPath);	
     65▕             }	
     66▕         } else {	
  ➜  67▕             throw new LogicException('Invalid key supplied');	
     68▕         }	
     69▕	
     70▕         if ($keyPermissionsCheck === true) {	
     71▕             // Verify the permissions of the key	
	
      +17 vendor frames	
	
  18  [internal]:0	
      Illuminate\Foundation\Application::Illuminate\Foundation\{closure}()	
      +5 vendor frames	
	
  24  artisan:35	
      Illuminate\Foundation\Console\Kernel::handle()	
```

#### Trong trường hợp này, hãy tắt việc dùng API bằng các lệnh sau rồi tạo key của Laravel.

```
# Tắt việc dùng API.
UPDATE `systems` SET `system_value` = '0' WHERE `systems`.`system_name` = 'api_available';

# Tạo key của Laravel
php artisan passport:keys	

# Bật việc dùng API.
UPDATE `systems` SET `system_value` = '1' WHERE `systems`.`system_name` = 'api_available';
```

### Xảy ra lỗi "require ext-gd ", "require ext-sodium ", "require ext-zip " khi chạy batch cập nhật hoặc lệnh composer require
Khi chạy batch cập nhật hoặc lệnh composer require, có thể hiển thị như sau.
```
  Problem 1
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-gd * -> it is missing from your system. Install or enable PHP's gd extension.
```
```
  Problem 1
    - lcobucci/jwt[5.0.0, ..., 5.3.0] require ext-sodium * -> it is missing from your system. Install or enable PHP's sodium extension.
```
```
  Problem 1
    - exceedone/exment[v5.0.0, ..., v5.0.11] require phpoffice/phpspreadsheet ^1.23.0 -> satisfiable by phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0].
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-zip * -> it is missing from your system. Install or enable PHP's zip extension.
    - Root composer.json requires exceedone/exment ^5.0 -> satisfiable by exceedone/exment[v5.0.0, ..., v5.0.11].
```
Trong trường hợp này, hãy bật extension của PHP (php extension) được hiển thị.
#### Với Linux
~~~
# Ubuntu server
sudo apt-get install php8.2-gd php8.2-zip

# Centos server
sudo yum install gd gd-devel php-gd php-pecl-zip.x86_64
~~~

#### Với Mac / Windows

##### (1) Lấy đường dẫn của tệp php.ini

~~~
# Chạy lệnh sau. Đường dẫn của tệp php.ini được hiển thị ở dòng "Loaded Configuration File".

php --ini
~~~

##### (2) Sửa tệp php.ini

~~~
# Bỏ comment dòng dưới
extension=gd

# Bỏ comment dòng dưới
extension=sodium

# Bỏ comment dòng dưới
extension=zip
~~~



### Sau lần cài đặt đầu tiên, khi truy cập màn hình quản trị thì xảy ra lỗi "SQLSTATE[HY000][202] Permission denied"
Khi Apache truy cập MySQL, có thể cần thiết lập SELinux (chức năng bảo mật của Linux).  
Khi gặp lỗi này, hãy chạy lệnh sau.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### Khi cập nhật, xảy ra lỗi ở "Migrating: 2019_08_19_000000_create_failed_jobs_table"
Giữa chừng xử lý thay đổi cơ sở dữ liệu khi cập nhật, có thể xuất hiện thông báo như sau.  
~~~
Migrating: 2019_08_19_000000_create_failed_jobs_table  
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists。  
~~~

Trong trường hợp này, hãy xử lý theo thứ tự sau.

1. Xóa tệp "2019_08_19_000000_create_failed_jobs_table" trong "thư mục cài đặt\database\migrations".
2. Chạy cập nhật lại.


### Trên máy chủ thuê, khi chạy các lệnh như "composer require" thì hiển thị "Killed"
Việc này thỉnh thoảng xảy ra khi bộ nhớ bị quá tải (không phải lúc nào cũng xảy ra).  
Khi thấy thông báo này, hãy thêm "nice -n 20" vào đầu lệnh rồi chạy composer. Lệnh sẽ được chạy với độ ưu tiên thấp hơn.

~~~
nice -n 20 composer .....
~~~

※Dù chạy theo cách này, "Killed" vẫn có thể hiển thị lại. Mong bạn thông cảm.


### Cách thiết lập đường dẫn cho composer
Đây là các bước thiết lập đường dẫn cho composer (thiết lập vị trí của composer).  

#### Thêm giá trị thiết lập
- Thiết lập đường dẫn đến composer ở mục "Đường dẫn Composer" trong [hướng dẫn này](/vi/config).

```
# Ví dụ: chạy lệnh sau
which composer
#Ví dụ kết quả: /usr/local/bin/composer

# Ghi giá trị sau vào .env
EXMENT_COMPOSER_PATH=/usr/local/bin/composer
```

- Nhờ đó, đường dẫn đến composer được thiết lập.


### Thoát chế độ bảo trì
Khi khôi phục cơ sở dữ liệu, hệ thống ở chế độ bảo trì trong suốt thời gian khôi phục.  
Khi khôi phục xong, chế độ bảo trì tự động được thoát. Nếu vì lý do nào đó mà không thoát được, hãy thoát thủ công theo các bước sau.

- Chạy lệnh sau ở thư mục gốc của dự án.  

```
php artisan up
```



## Sao lưu và khôi phục

### Sao lưu hoặc khôi phục thất bại
Trên màn hình sao lưu hoặc khi chạy lệnh, có thể hiển thị thông báo như sau.

![Màn hình sao lưu](../img/backup/backup_error.png)  

Hoặc trên màn hình cài đặt có thể hiển thị như sau.
![Màn hình sao lưu](../ja/img/backup/backup_error2.png)  

Khi lỗi này hiển thị, có thể các thiết lập cần cho việc sao lưu và khôi phục chưa được thực hiện.  
Vui lòng kiểm tra 2 điểm dưới đây.

#### mysql-client chưa được cài trên web server, hoặc chưa thiết lập đường dẫn  
Khi sao lưu và khôi phục, Exment chạy các lệnh sau trên web server.  

- Lệnh mysql
- Lệnh mysqldump  

**Nếu lệnh chưa được cài đặt**, hãy cài lệnh mysql và lệnh mysqldump.  
Cách cài đặt khác nhau tùy môi trường.  
Ví dụ: [Amazon Linux 2](http://tech-wiki.pomme-verte.net/?p=793)  

**Nếu chưa thiết lập đường dẫn** (người dùng chạy web server không tìm thấy vị trí của lệnh mysql và lệnh mysqldump), hãy làm theo cách sau để chạy được lệnh bằng đường dẫn đầy đủ.  
※Chi tiết về việc thay đổi thiết lập, vui lòng xem [tại đây](/vi/config).  

- Mở tệp env.  
- Thêm nội dung sau.  

```
EXMENT_MYSQL_BIN_DIR=(đường dẫn đến thư mục có tệp thực thi "mysql")
#Ví dụ
EXMENT_MYSQL_BIN_DIR=/usr/bin
```
※Nếu đặt đường dẫn trong dấu ngoặc kép như "EXMENT_MYSQL_BIN_DIR="C:\MySQL\bin"", ở một số môi trường có thể không được nhận đúng. Khuyến nghị ghi nguyên như "EXMENT_MYSQL_BIN_DIR=C:\MySQL\bin".

#### Thêm "safe_mode=Off" vào php.ini
※safe_mode là thiết lập đã bị bỏ ở PHP 5.4. Với Exment hiện tại (PHP 8.2 trở lên), không cần bước này. Chỉ kiểm tra nếu bạn đang dùng môi trường cũ.  

Để chạy lệnh mysql và lệnh mysqldump từ máy chủ, cần đặt safe_mode thành Off.  
Hãy thực hiện nội dung sau.

- Mở tệp php.ini.
- Thêm nội dung sau.

```
safe_mode=Off
```

## Khác
### Gửi lượng lớn mục nhập thất bại
Hiện nay, ở một số màn hình thiết lập, nếu 1 màn hình có rất nhiều mục nhập thì có thể không hoạt động bình thường.

- Nguyên nhân: xảy ra khi số giá trị POST thực tế vượt quá giá trị thiết lập "max_input_vars (số lượng tối đa POST được trong một lần)" của PHP.
- Cách xử lý: hãy [thay đổi giá trị thiết lập PHP](/vi/additional_php_ini) và thay đổi giá trị tham số.
  
Hiện đã xác nhận việc này dễ xảy ra ở các chức năng sau.

- Ở cài đặt sử dụng quy trình làm việc, khi số bảng và số quy trình làm việc nhiều
- Ở màn hình cài đặt biểu mẫu tùy chỉnh, khi số mục cột cần lưu rất nhiều
- Ở màn hình nhập dữ liệu tùy chỉnh, khi số mục rất nhiều

### Xuất hình ảnh thất bại khi xuất tài liệu dùng Excel làm mẫu
Với chức năng plugin của Exment (xuất tài liệu hoặc xuất), khi xuất tài liệu bằng mẫu Excel có chứa hình ảnh, tệp được tạo có thể không có hình ảnh.  
Việc này có thể xảy ra tùy theo phiên bản của thư viện "PhpSpreadSheet" đang dùng. Hãy thực hiện các bước sau.  

※Dưới đây là các bước khi dùng Exment v4.x trở về trước (PHP7.X). Với Exment v7.0.0, PhpSpreadSheet 1.29 trở lên được cài tự động, nên không cần các bước dưới đây.

#### Khi phiên bản PHP là 7.3, 7.4
Với 1.22.0, bản mới nhất của PhpSpreadSheet hiện tại (2022/02/25), hiện tượng này không còn xảy ra.  
Hãy đổi PhpSpreadSheet sang 1.22.0 theo bước sau.  

```
composer require phpoffice/phpspreadsheet=~1.22.0
```

#### Khi phiên bản PHP là 7.2
PhpSpreadSheet1.22.0 không hỗ trợ PHP7.2.  
Vì vậy, phiền bạn nâng phiên bản PHP lên 7.3 trở lên.

