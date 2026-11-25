# Dựng môi trường bằng AWS - Cấu hình đơn
Đây là các bước cài Exment trên Amazon Linux2 của AWS.  
Bắt đầu từ việc cài máy chủ Web, dựng từ chỗ chưa có gì.  
Các bước này dành cho **cấu hình đơn giản với 1 máy chủ Web**.  
※Với cấu hình AWS dự phòng (nhiều máy chủ Web), vui lòng xem [Dựng môi trường bằng AWS - Cấu hình dự phòng](/vi/install_aws).

## Môi trường
Các bước ở trang này được dựng với môi trường sau.
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## Lưu ý

- Tùy theo môi trường và phiên bản bạn dùng, có thể không thiết lập được đúng theo các bước này. Mong bạn thông cảm.

- Trang này chỉ ghi các bước để chạy Exment trên Linux.  
Các kiến thức IT chung như SSH, tạo cơ sở dữ liệu, lệnh Linux không được ghi ở đây. Mong bạn thông cảm.

- Khi có lỗi trong lúc cài đặt, vui lòng xem [Xử lý sự cố](/vi/troubleshooting).


## Các bước cài đặt trên Linux

### MySQL (tùy chọn)
Chỉ làm khi cần. Đây là các bước cài MySQL khi dựng riêng máy chủ MySQL.  
※Khi dùng dịch vụ bên ngoài như AWS RDS, không cần các bước phía máy chủ MySQL.  
※Các bước đã được chuyển sang trang [Các bước cài đặt MySQL](/vi/install_mysql).

### Redis (tùy chọn)
※Các bước đã được chuyển sang trang [Thay đổi driver của session và cache](/vi/additional_session_cache_driver).


### Máy chủ Web

- Trước tiên, cập nhật package.

~~~
sudo yum -y update
~~~

- Kiểm tra các phiên bản PHP có thể cài.  
※Nếu phiên bản khác PHP8.2 đang được bật (enabled), hãy tắt đi.

~~~
sudo amazon-linux-extras | grep php
~~~

- Sau khi kiểm tra rằng có "php8.2", hãy cài đặt.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- Cài các thư viện cần thiết khác.

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Chạy các lệnh sau để khởi động Apache và thiết lập tự khởi động.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Tạo vùng swap (vùng đĩa được dùng khi thiếu bộ nhớ).

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Cài composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Sửa php.ini khi cần.  
Đặc biệt, khi thay đổi lượng bộ nhớ sử dụng, thời gian timeout, v.v. nêu ở [Thay đổi giá trị thiết lập PHP](/vi/additional_php_ini), hãy sửa tệp này.

~~~
sudo vi /etc/php.ini
~~~

- Sửa httpd.conf.

~~~
sudo vi /etc/httpd/conf/httpd.conf

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
sudo systemctl restart httpd
~~~

- Thiết lập quyền cho tệp. Chạy lệnh sau.

~~~
# Thêm người dùng ec2-user vào nhóm apache
sudo usermod -a -G apache ec2-user
~~~

- **(Chỉ khi không cài MySQL trên cùng máy chủ)**  
Dù không cài MySQL trên cùng máy chủ, vẫn cần cài mysql client để chạy được lệnh mysql.  
※Khi cài MySQL trên cùng máy chủ, hãy bỏ qua bước này.

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Chạy lệnh này để kiểm tra xem có mysql-community-client không
sudo yum search mysql-community-client
# Nếu lệnh trên hiện thông báo không tồn tại như "Error: Unable to find a match: mysql-community-client", hãy chạy lệnh dưới đây trước
sudo yum -y module disable mysql

# Cài mysql-community-client
sudo yum -y install mysql-community-client
~~~

- Đặt Exment lên máy chủ. Tải tệp Exment mới nhất và giải nén.  
※Đây là các bước của cách cài đặt đơn giản. Với cài đặt thủ công, hãy xem trang [Cài đặt thủ công](/vi/quickstart_manual) để đặt.

~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Thiết lập quyền cho tệp. Chạy các lệnh sau.

~~~
# Thêm quyền tối thiểu
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment
sudo setfacl -m u:apache:rwx -R /var/www/exment

# Chạy lệnh sau để cấp quyền cho thư mục. Thực hiện 1 hoặc 2
# 1. Với cài đặt đơn giản
sudo php artisan exment:setup-dir --easy=1
# 2. Với cài đặt thủ công
sudo php artisan exment:setup-dir
~~~


#### Khi đổi thiết lập máy chủ Web
- Khi đã cập nhật Exment, cập nhật tệp PHP hoặc đổi giá trị thiết lập, hãy chạy lệnh sau.

~~~
sudo systemctl restart php-fpm
~~~



## Xử lý khi nâng phiên bản PHP
Khi đổi phiên bản PHP, hãy nâng phiên bản theo các bước sau.  
※Trong lúc nâng phiên bản, không truy cập được Exment.  
※Ví dụ dưới đây là các bước nâng từ PHP8.0 lên PHP8.2.  
※Giả định rằng PHP được cài bằng Extras Library (amazon-linux-extras) của Amazon Linux 2.  
※Cách nâng phiên bản có thể khác nhau tùy theo môi trường, thời điểm đưa vào, phiên bản và cách cài đặt.  

- Kiểm tra rằng package amazon-linux-extras đã được cài.

~~~
which amazon-linux-extras
# Nếu chưa được cài, hãy cài bằng lệnh dưới đây.
# sudo yum install -y amazon-linux-extras
~~~

- Kiểm tra phiên bản PHP và các topic của Extras Library.  
※Hãy kiểm tra 3 điều sau. Phiên bản PHP là 8.0.X. Topic PHP8.0 là enabled. Có topic PHP8.2.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Tắt topic PHP8.0.  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- Làm trống thư mục PHP.  

~~~
sudo yum -y remove php\*
~~~

- Bật topic PHP8.2 rồi cài đặt.

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- Cài các extension của PHP.  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Kiểm tra rằng phiên bản PHP là 8.2.X, topic PHP8.0 là disabled và topic PHP8.2 là enabled.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Chạy các lệnh sau.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
