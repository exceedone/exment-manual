# Dựng môi trường bằng Linux (CentOS7)
Đây là các bước cài Exment trên máy chủ Linux.  
Bắt đầu từ việc cài máy chủ Web, dựng từ chỗ chưa có gì.

Trình tự chung như sau.

1. (Nếu cần) Chuẩn bị MySQL và Redis
2. Cài PHP, Apache và composer lên máy chủ Web
3. Đặt các tệp của Exment và thiết lập quyền
4. Thực hiện cài đặt ban đầu của Exment trên trình duyệt

## Môi trường
Các bước ở trang này được dựng với môi trường sau.  
- CentOS 7.9.2009 64bit (**Hiện tại, chúng tôi đã xác nhận rằng các bước dưới đây gây lỗi trên dòng 8**. Khi cài theo các bước dưới đây, hãy cài trên dòng 7.)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

## Lưu ý

- Tùy theo môi trường và phiên bản bạn dùng, có thể không thiết lập được đúng theo các bước này. Mong bạn thông cảm.

- Trang này chỉ ghi các bước để chạy Exment trên Linux.  
Các kiến thức IT chung như SSH, tạo cơ sở dữ liệu, lệnh Linux không được ghi ở đây. Mong bạn thông cảm.  

- **Các bước này giả định được thực hiện bằng tài khoản quản trị. Khi người dùng không phải tài khoản quản trị thực hiện, hãy thêm "sudo" vào đầu lệnh**.

- Khi có lỗi trong lúc cài đặt, vui lòng xem [Xử lý sự cố](/vi/troubleshooting).


## Các bước cài đặt trên Linux

### MySQL (tùy chọn)
Chỉ làm khi cần. Đây là các bước cài MySQL khi dựng riêng máy chủ MySQL.  
※Khi dùng dịch vụ bên ngoài như AWS RDS, không cần các bước phía máy chủ MySQL.  
※Các bước đã được chuyển sang trang [Các bước cài đặt MySQL](/vi/install_mysql).

### Redis (tùy chọn)
※Các bước đã được chuyển sang trang [Thay đổi driver của session và cache](/vi/additional_session_cache_driver).

### Máy chủ Web
- Cập nhật yum và cài các thư viện cần thiết.  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- Cập nhật epel và cài package cấu hình của repository Remi.  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- Cài package yum-utils.

~~~
yum install -y yum-utils
~~~

- Chỉ bật các package của PHP8.0.

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Kiểm tra các repository dùng được. Nếu "remi-php80" hiện ra thì OK.

~~~
yum repolist
~~~

- Cài PHP8.0 và các extension.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Kiểm tra rằng phiên bản PHP là 8.0.  

~~~
php -v
~~~

- Thiết lập để Apache khởi động.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Thiết lập tường lửa.  
※Hãy đổi nội dung thiết lập cho phù hợp với mức bảo mật cần thiết.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- Nếu cần, hãy tắt SELinux.  
※Hãy đổi nội dung thiết lập cho phù hợp với mức bảo mật cần thiết.

~~~
vi /etc/selinux/config
# Sửa thành SELINUX=disabled

setenforce 0
service httpd restart
~~~

- Cài composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Sửa php.ini khi cần.  
Đặc biệt, khi thay đổi lượng bộ nhớ sử dụng, thời gian timeout, v.v. nêu ở [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini), hãy sửa tệp này.

~~~
vi /etc/php.ini
~~~

- Sửa httpd.conf.

~~~
vi /etc/httpd/conf/httpd.conf

# Thêm nội dung sau vào cuối tệp

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- Khởi động lại apache.

~~~
service httpd restart
~~~

- (Khuyến nghị) Thêm người dùng đăng nhập vào nhóm apache. Như vậy, người dùng đăng nhập có thể tự do sửa các tệp trong thư mục exment. Nhóm được áp dụng sau khi kết nối lại SSH.  
※Dưới đây là trường hợp người dùng đăng nhập là "ec2-user".

~~~
usermod -aG apache ec2-user
~~~

- **(Chỉ khi không cài MySQL trên cùng máy chủ)**  
Dù không cài MySQL trên cùng máy chủ, vẫn cần cài mysql client để chạy được lệnh mysql.  
※Khi cài MySQL trên cùng máy chủ, hãy bỏ qua bước này.

~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Chạy lệnh này để kiểm tra xem có mysql-community-client không
yum search mysql-community-client
# Nếu lệnh trên hiện thông báo không tồn tại như "Error: Unable to find a match: mysql-community-client", hãy chạy lệnh dưới đây trước
yum -y module disable mysql

# Cài mysql-community-client
yum -y install mysql-community-client
~~~

- Đặt Exment lên máy chủ. Tải tệp Exment mới nhất và giải nén.  
※Đây là các bước của cách cài đặt đơn giản. Với cài đặt thủ công, hãy xem trang [Cài đặt thủ công](/vi/quickstart_manual) để đặt.

~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Thiết lập quyền cho tệp. Chạy các lệnh sau.

~~~
# Thêm quyền tối thiểu
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Chạy lệnh sau để cấp quyền người dùng và nhóm cho thư mục. Thực hiện 1 hoặc 2
# ※Khi thiếu quyền, hãy chạy với quyền mạnh hơn, ví dụ thêm sudo
# 1. Với cài đặt đơn giản
php artisan exment:setup-dir --easy=1
# 2. Với cài đặt thủ công
php artisan exment:setup-dir
~~~

- Trên trình duyệt của máy tính của bạn, mở địa chỉ IP của máy chủ Web đã tạo và hoàn tất cài đặt ban đầu của Exment.

- ※Khi cài bằng cách cài đặt đơn giản, sau khi cài đặt ban đầu xong, hãy chạy lệnh sau. Lệnh này trả lại các quyền chỉ cần khi cài đặt.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~


## Xử lý khi nâng phiên bản PHP
Khi đổi phiên bản PHP, hãy nâng phiên bản theo các bước sau.  
※Trong lúc nâng phiên bản, không truy cập được Exment.  
※Ví dụ dưới đây là các bước nâng từ PHP7.4 lên PHP8.0.  
※Giả định rằng PHP được cài bằng repository epel và remi.  
※Cách nâng phiên bản có thể khác nhau tùy theo môi trường, thời điểm đưa vào, phiên bản và cách cài đặt.  

- Trước tiên, hãy sao lưu. Các lệnh dưới đây là ví dụ tối thiểu, chỉ lưu php.ini và ghi lại các package, module mở rộng đã cài. Hãy thêm hoặc bớt cho phù hợp với môi trường của bạn.  

~~~
# Tạo thư mục sao lưu
cd ~
mkdir php-backup && cd php-backup
# Xuất thông tin các package đã cài
yum list installed |grep php > php74-installed.txt
# Xuất thông tin các module mở rộng
php -m > php74-modules.txt
# Sao chép tệp php.ini (nếu vị trí khác bên dưới, hãy kiểm tra trước bằng "php -i | grep php.ini") 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- Xóa các package liên quan đến PHP.  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- Cài repository epel và remi, cùng với tiện ích yum.  
※Nếu đã cài sẵn thì "Nothing to do" hiện ra, nhưng không sao.   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- Chỉ bật các package của PHP8.0.  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Kiểm tra các repository dùng được. Nếu "remi-php80" hiện ra thì OK.  

~~~
yum repolist
~~~

- Cài PHP8.0 và các extension.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Kiểm tra rằng phiên bản PHP là 8.0.  

~~~
php -v
~~~
