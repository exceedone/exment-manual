# (Dành cho người dùng nâng cao, bản beta) Dựng môi trường bằng Azure Web Apps
<span class="red bold">※Trang này là các bước cũ, dựa trên phiên bản trước Exment v7.0.0 (Laravel6, PHP7.4). Với Exment v7.0.0 (PHP8.2 trở lên, Laravel12), không thể cài đặt nếu làm nguyên theo các bước này. Các bước cài đặt vui lòng xem [Cài đặt thủ công](/vi/quickstart_manual).</span>  
Trang này ghi các bước dựng Exment bằng Azure Web Apps.  
Đây là các bước tạo Azure Web Apps và MySQL rồi chạy.

## Lưu ý

- Tùy theo môi trường và phiên bản bạn dùng, có thể không thiết lập được bình thường theo các bước này. Mong bạn thông cảm.

- Các bước này chỉ ghi các bước để chạy Exment trên Azure Web Apps.  
Các kiến thức IT chung về Azure Web Apps không được ghi ở đây. Mong bạn thông cảm.  

## Các bước

### Tạo MySQL
- Tạo MySQL trên Azure Portal.



### Azure Web Apps
- Tạo Azure Web Apps trên Azure Portal.  
Sau đó, truy cập vào resource của Azure.
(cần hình ảnh)


- Từ menu bên trái, chọn "Extensions" → "Composer" và cài composer.

- Từ menu bên trái, chọn "Advanced Tools" rồi chọn "Go".

- Trong GUI của Kudu, chuyển đến đường dẫn sau.
D:\home\site

- Chạy các lệnh sau.

```
composer create-project laravel/laravel  --prefer-dist . "6.*" 
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
```



### VPC
Tạo VPC với thiết lập sau.

- Tên : tùy ý (ví dụ : exment-vpc)
- IPv4 CIDR block : XXX.XXX.0.0/16 (ví dụ : 172.32.0.0/16)
- IPv6 CIDR block : không có
- Tenancy : Default
- Nếu DNS resolution và DNS hostnames đang tắt, hãy đổi từng mục thành "Enabled"

### Subnet
Tạo subnet với thiết lập sau.

#### Public subnet A
- Tên : tùy ý (ví dụ : exment-subnet-public1)
- VPC : VPC đã tạo ở trên
- Availability Zone : ap-northeast-1a
- IPv4 CIDR block : XXX.XXX.1.0/24 (ví dụ : 172.32.1.0/24)

#### Public subnet B
- Tên : tùy ý (ví dụ : exment-subnet-public2)
- VPC : VPC đã tạo ở trên
- Availability Zone : ap-northeast-1c
- IPv4 CIDR block : XXX.XXX.2.0/24 (ví dụ : 172.32.2.0/24)


### Internet gateway
- Tên : tùy ý (ví dụ : exment-igw)
- Sau khi tạo, attach vào VPC vừa tạo

### Route table
- Trong VPC vừa tạo, route table đã được tạo tự động.  
Có thể sửa Name. (ví dụ : exment-rt)

- Chọn route table đó, từ tab "Routes" phía dưới trang, thêm nội dung sau.
    - Destination : 0.0.0.0/0
    - Target : Internet Gateway (Internet gateway đã tạo ở trên)

- Từ tab "Subnet associations" phía dưới trang, thêm public subnet A và public subnet B.


### Security group
Tạo các security group với thiết lập sau.

#### Security group-SSH
- Tên : tùy ý (ví dụ : exment-sg-ssh)
- Mô tả : tùy ý (ví dụ : exment-sg-ssh)
- VPC : VPC đã tạo ở trên

■Sau khi tạo, thêm inbound rule
- Type : SSH
- Port : 22
- Source : địa chỉ IP thực hiện kết nối SSH
- VPC : VPC đã tạo ở trên

#### Security group-SSH private
- Tên : tùy ý (ví dụ : exment-sg-ssh-private)
- Mô tả : tùy ý (ví dụ : exment-sg-ssh-private)
- VPC : VPC đã tạo ở trên

■Sau khi tạo, thêm inbound rule
- Type : SSH
- Port : 22
- Source :  (group ID của "Security group-SSH")
- VPC : VPC đã tạo ở trên

#### Security group-Web
- Tên : tùy ý (ví dụ : exment-sg-web)
- Mô tả : tùy ý (ví dụ : exment-sg-web)

■Sau khi tạo, thêm inbound rule
- Type : HTTP
- Port : 80
- Source : 0.0.0.0/0, ::/0

#### Security group-MySQL
- Tên : tùy ý (ví dụ : exment-sg-mysql)
- Mô tả : tùy ý (ví dụ : exment-sg-mysql)

■Sau khi tạo, thêm inbound rule
- Type : MYSQL/Aurora
- Port : 3306
- Source : (group ID của "Security group-Web")

#### Security group-Redis
- Tên : tùy ý (ví dụ : exment-sg-redis)
- Mô tả : tùy ý (ví dụ : exment-sg-redis)

■Sau khi tạo, thêm inbound rule
- Type : Custom TCP Rule
- Port : 6379
- Source : (group ID của "Security group-Web")


### AWS S3
- Tạo bucket của AWS S3 và tạo IAM.  
※Tham khảo: [超簡単！LaravelでS3を利用する手順](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f) (tiếng Nhật)  
Hãy làm phần "S3用のIAMを作成" (tạo IAM cho S3) và "Bucketの作成" (tạo bucket) ở URL trên  
※Hãy tạo 4 loại bucket: "dùng cho tệp đính kèm", "dùng cho tệp sao lưu", "dùng cho plugin", "dùng cho template"


### MySQL
> Tài liệu này ghi thiết lập tạo MySQL bằng Amazon RDS, nhưng cũng có thể dựng bằng cách tạo riêng một instance, cài MySQL và truy cập từ từng máy chủ Web.

- Engine : MySQL
- Version : 5.7.26
- DB instance identifier : tùy ý (ví dụ : exment-db)
- DB instance class : tùy ý (ví dụ : db.t2.micro)
- Tên người dùng, mật khẩu : tự đặt
- Virtual Private Cloud : VPC vừa tạo
- Thiết lập kết nối bổ sung
    - VPC security group : Security group-MySQL
    - Availability Zone : không chỉ định


### Redis
> Tài liệu này ghi thiết lập tạo Redis bằng ElastiCache, nhưng cũng có thể dựng bằng cách tạo riêng một instance, cài Redis và truy cập từ từng máy chủ Web.

- Cluster engine : Redis
- Tên : tùy ý (ví dụ : exment-redis)
- Engine version compatibility : 5.0.5
- Port : 6379
- Node type : tùy ý (ví dụ : cache.t2.micro)
- Subnet group : tạo mới
    - Tên : tùy ý (ví dụ : exment-redis-subnet)
    - VPC : VPC vừa tạo
    - Subnet : nhập tất cả thông tin
- Security group : Security group-Redis


### EC2
Tạo 2 loại EC2 instance. (Máy chủ trung gian và 1 máy chủ Web. Máy chủ Web thứ 2 sẽ được nhân bản sau)

#### Máy chủ trung gian
- AMI : Amazon Linux 2 AMI x86
- Instance size : tùy ý (ví dụ : t2.nano)
- Số instance : 1
- Network : VPC vừa tạo
- Subnet : tùy ý
- Auto-assign Public IP : Enable
- Tag : key-Name, value-tùy ý (ví dụ : exment-step)
- Security group : Security group-SSH

#### Máy chủ Web
- AMI : Amazon Linux 2 AMI x86
- Instance size : tùy ý (ví dụ : t2.micro)
- Số instance : 1
- Network : VPC vừa tạo
- Subnet : Public subnet A
- Auto-assign Public IP : Enable
- Tag : key-Name, value-tùy ý (ví dụ : exment-web1)
- Security group : Security group-SSH private, Security group-Web


### Máy chủ Web-A

#### Kết nối đến máy chủ Web-A
- Kết nối đến **máy chủ trung gian** bằng SSH.

- Chuyển key cần để kết nối đến EC2 instance (ở đây gọi là "exment_key.pem") lên máy chủ trung gian.

- Chạy lệnh sau để đổi quyền của SSH key.

~~~
chmod 700 exment_key.pem
~~~

- Chạy lệnh sau để kết nối SSH đến máy chủ Web A.

~~~
ssh -i ~/exment_key.pem ec2-user@(địa chỉ IP private của máy chủ Web A)
~~~

#### Thiết lập máy chủ Web

- Chạy các lệnh sau để cập nhật package, cài các phần mềm cần thiết, v.v.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- Chạy các lệnh sau để khởi động Apache và thiết lập tự khởi động.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Tạo vùng swap.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Tạo đường dẫn đến php7.4. Nhờ đó có thể chạy php7.4 bằng lệnh.

~~~
sudo ln -s /usr/bin/php74 /usr/bin/php
~~~

- Cài composer.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
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

- Đặt Exment lên máy chủ. Tải tệp Exment mới nhất và giải nén.  
~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Thiết lập quyền cho tệp. Chạy các lệnh sau.

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- Kết nối MySQL và tạo cơ sở dữ liệu.

~~~
mysql -u (tên người dùng MySQL) -p(mật khẩu) -h (tên host)
// Chạy như lệnh MySQL
create database exment;
~~~

- Để kết nối Redis và AWS S3, chạy các lệnh sau.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Sửa tệp .env.

~~~

# Thay đổi các giá trị thiết lập đã có
CACHE_STORE=redis #Khi đổi nơi lưu cache. Sửa thành redis
SESSION_DRIVER=redis #Khi đổi nơi lưu cache. Sửa thành redis
REDIS_CLIENT=predis #Dùng "predis" đã cài ở trên để kết nối Redis
REDIS_HOST=127.0.0.1 #Tên host của redis
REDIS_PASSWORD=XXXXXX #Mật khẩu của redis, chỉ ghi khi đã đặt
REDIS_PORT=6379 #Số cổng của redis, chỉ ghi khi không phải 6379


# Thêm mới các giá trị thiết lập
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(access key của S3)
AWS_SECRET_ACCESS_KEY=(secret access key của S3)
AWS_DEFAULT_REGION=(region của S3. Ví dụ: ap-northeast-1)
AWS_BUCKET_EXMENT=(bucket AWS S3 dùng cho tệp đính kèm)
AWS_BUCKET_BACKUP=(bucket AWS S3 dùng cho sao lưu)
AWS_BUCKET_TEMPLATE=(bucket AWS S3 dùng cho template)
AWS_BUCKET_PLUGIN=(bucket AWS S3 dùng cho plugin)

# Khi load balancer là HTTPS, kết nối giữa ELB và EC2 là HTTP
ADMIN_HTTPS=true
~~~

- Trên trình duyệt của máy tính của bạn, nhập địa chỉ IP của máy chủ Web đã tạo và hoàn tất cài đặt ban đầu của Exment.

#### Khi đổi thiết lập máy chủ Web
- Sau khi cập nhật Exment, khi đã cập nhật tệp PHP hoặc đổi giá trị thiết lập, hãy chạy lệnh sau.

~~~
sudo systemctl restart php-fpm
~~~


#### Thiết lập AMI của máy chủ Web

Tạo AMI của máy chủ Web, dùng cho việc làm dự phòng máy chủ Web sau này, v.v.

- Ở menu EC2 của AWS Console, bấm "Actions" → "Image" → "Create Image".

- Nhập tên image, v.v. (ví dụ : exment-ami) và tạo image.

- Sau vài phút, image vừa thiết lập sẽ được tạo ở "AMIs" trong menu bên trái.


#### Tạo máy chủ Web B từ AMI
- Từ "AMIs" trong menu bên trái, chọn image đã tạo ở trên và bấm nút "Launch".

Tạo máy chủ Web với thiết lập sau.
  - Instance size : tùy ý (ví dụ : t2.micro)
  - Số instance : 1
  - Network : VPC vừa tạo
  - Subnet : Public subnet B
  - Auto-assign Public IP : Enable
  - Tag : key-Name, value-tùy ý (ví dụ : exment-web2)
  - Security group : Security group-SSH private, Security group-Web


### Amazon Elastic Load Balancing
- Loại load balancer : Application Load Balancer
- Tên : tùy ý (ví dụ : exment-alb)
- Listener : HTTP hoặc HTTPS
- VPC : VPC đã tạo
- Availability Zone : chọn tất cả
- Security group : Security group-Web
- Target group : tùy ý (ví dụ : exment-alb-tg)
- Instance của target group : chọn 2 máy chủ Web đã tạo và thêm vào "Registered"

Sau khi thiết lập xong, có thể truy cập máy chủ Web thông qua DNS của load balancer.
