# Dựng môi trường bằng Linux
Đây là các bước cài Exment trên máy chủ Linux.  
Bắt đầu từ việc cài máy chủ Web, dựng từ chỗ chưa có gì.

Trình tự chung như sau.

1. (Nếu cần) Chuẩn bị MySQL và Redis
2. Cài PHP, Apache và composer lên máy chủ Web
3. Đặt các tệp của Exment và thiết lập quyền
4. Thực hiện cài đặt ban đầu của Exment trên trình duyệt

## Môi trường
Các bước ở trang này được dựng với môi trường sau.  
- Red Hat Enterprise Linux release 8.6
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

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
- Trước tiên, cập nhật các package hiện có và cài các thư viện cần thiết.  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Cài package cấu hình của repository Remi và EPEL cần để dùng nó.

~~~
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm  
dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm
~~~

- Chuyển repository dùng cho package php.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- Kiểm tra package PHP đang dùng và danh sách các package PHP dùng được.  
Nếu remi-8.2 có [e] thì OK.

~~~
dnf module list php
~~~

- Cài php và các thư viện liên quan.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- Kiểm tra rằng phiên bản PHP là 8.2.  

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
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el8-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Chạy lệnh này để kiểm tra xem có mysql-community-client không
dnf search mysql-community-client
# Nếu lệnh trên hiện thông báo không tồn tại như "Error: Unable to find a match: mysql-community-client", hãy chạy lệnh dưới đây trước
dnf -y module disable mysql

# Cài mysql-community-client
dnf -y install mysql-community-client
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
