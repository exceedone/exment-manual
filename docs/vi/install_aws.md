# (Dành cho người dùng nâng cao, bản beta) Dựng môi trường bằng AWS - Cấu hình dự phòng
Đây là các bước cài Exment trên Amazon Linux2 của AWS.  
Bắt đầu từ việc cài máy chủ Web, dựng từ chỗ chưa có gì.  
Các bước này dành cho **cấu hình máy chủ Web dự phòng (nhiều máy)**.  
※Với cấu hình đơn giản 1 máy, vui lòng xem [Dựng môi trường bằng AWS - Cấu hình đơn](/vi/install_aws_single).

Trình tự chung như sau.

1. Tạo mạng (VPC, subnet, Internet gateway, route table, security group)
2. Tạo nơi lưu (AWS S3, MySQL, Redis)
3. Tạo EC2 và cài Exment vào máy chủ Web A
4. Tạo máy chủ Web B từ AMI của máy chủ Web A
5. Tạo load balancer (Amazon Elastic Load Balancing)

## Môi trường
Các bước ở trang này được dựng với cấu hình sau.
- VPC
- Subnet
    - Public A
    - Public B
- Route table
- Internet gateway
- Security group
- Amazon S3
- Amazon RDS
    - MySQL 8.4.x
- Amazon ElastiCache
    - Redis 5.0.5
- Amazon Linux2-A
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-B
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-máy chủ trung gian (bastion)
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## Lưu ý

- Tùy theo môi trường và phiên bản bạn dùng, có thể không thiết lập được đúng theo các bước này. Mong bạn thông cảm.

- Trang này chỉ ghi các bước để chạy Exment trên Linux.  
Các kiến thức IT chung như AWS, SSH, tạo cơ sở dữ liệu, lệnh Linux không được ghi ở đây. Mong bạn thông cảm.

- **Các bước này giả định được thực hiện bằng tài khoản quản trị. Khi người dùng không phải tài khoản quản trị thực hiện, hãy thêm "sudo" vào đầu lệnh**.

- Khi có lỗi trong lúc cài đặt, vui lòng xem [Xử lý sự cố](/vi/troubleshooting).

- Các bước này được soạn dựa trên [hướng dẫn của AWS](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions-2).

## Các bước

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

- Chọn route table đó, ở tab "Routes" phía dưới trang, thêm nội dung sau.
    - Destination : 0.0.0.0/0
    - Target : Internet Gateway (Internet gateway đã tạo ở trên)

- Ở tab "Subnet associations" phía dưới trang, thêm public subnet A và public subnet B.


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
- Tạo bucket của AWS S3 và IAM.  
※Tham khảo: [超簡単！LaravelでS3を利用する手順](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f) (tiếng Nhật)  
Hãy làm phần "S3用のIAMを作成" (tạo IAM cho S3) và "Bucketの作成" (tạo bucket) ở URL trên.  
※Hãy tạo 4 loại bucket: "dùng cho tệp đính kèm", "dùng cho tệp sao lưu", "dùng cho plugin", "dùng cho template".


### MySQL
> Ở đây ghi thiết lập khi tạo MySQL bằng Amazon RDS. Cũng có thể dựng bằng cách tạo riêng một instance, cài MySQL và kết nối từ từng máy chủ Web.  
Cách cài MySQL lên máy chủ vui lòng xem [Các bước cài đặt MySQL](/vi/install_mysql).

- Engine : MySQL
- Version : 8.0.x
- DB instance identifier : tùy ý (ví dụ : exment-db)
- DB instance class : tùy ý (ví dụ : db.t2.micro)
- Tên người dùng, mật khẩu : tự đặt
- Virtual Private Cloud : VPC vừa tạo
- Thiết lập kết nối bổ sung
    - VPC security group : Security group-MySQL
    - Availability Zone : không chỉ định


### Redis
> Ở đây ghi thiết lập khi tạo Redis bằng ElastiCache. Cũng có thể dựng bằng cách tạo riêng một instance, cài Redis và kết nối từ từng máy chủ Web.  
※Cách cài Redis lên máy chủ đã được chuyển sang trang [Thay đổi driver của session và cache](/vi/additional_session_cache_driver).

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
Máy chủ trung gian (bastion) là máy chủ được kết nối trước khi kết nối SSH đến máy chủ Web.

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

- Gửi key cần để kết nối đến EC2 instance (ở đây gọi là "exment_key.pem") lên máy chủ trung gian.

- Chạy lệnh sau để đổi quyền của SSH key.

~~~
chmod 700 exment_key.pem
~~~

- Chạy lệnh sau để kết nối SSH đến máy chủ Web A.

~~~
ssh -i ~/exment_key.pem ec2-user@(địa chỉ IP private của máy chủ Web A)
~~~

#### Thiết lập máy chủ Web

- Chạy các lệnh sau để cập nhật package và cài các phần mềm cần thiết.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php8.2
sudo yum install -y httpd mysql
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

# Chạy lệnh sau để cấp quyền cho thư mục. Thực hiện 1 hoặc 2
# 1. Với cài đặt đơn giản
sudo php artisan exment:setup-dir --easy=1
# 2. Với cài đặt thủ công
sudo php artisan exment:setup-dir
~~~

- Để kết nối đến Redis và AWS S3, chạy các lệnh sau.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Sửa tệp .env.

~~~

# Thay đổi các giá trị thiết lập đã có
CACHE_STORE=redis #Khi đổi nơi lưu cache. Sửa thành redis
SESSION_DRIVER=redis #Khi đổi nơi lưu session. Sửa thành redis
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

- Trên trình duyệt của máy tính của bạn, mở địa chỉ IP của máy chủ Web đã tạo và hoàn tất cài đặt ban đầu của Exment.

- ※Khi cài bằng cách cài đặt đơn giản, sau khi cài đặt ban đầu xong, hãy chạy lệnh sau. Lệnh này trả lại các quyền chỉ cần khi cài đặt.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

#### Khi đổi thiết lập máy chủ Web
- Khi đã cập nhật Exment, cập nhật tệp PHP hoặc đổi giá trị thiết lập, hãy chạy lệnh sau.

~~~
sudo systemctl restart php-fpm
~~~


#### Thiết lập AMI của máy chủ Web

Tạo AMI (image của máy chủ) của máy chủ Web, dùng khi làm dự phòng máy chủ Web, v.v.

- Ở menu EC2 của AWS Console, bấm "Actions" → "Image" → "Create Image".

- Nhập tên image, v.v. (ví dụ : exment-ami) và tạo image.

- Sau vài phút, image vừa tạo sẽ có ở "AMIs" trong menu bên trái.


#### Tạo máy chủ Web B từ AMI
- Ở "AMIs" trong menu bên trái, chọn image đã tạo ở trên và bấm nút "Launch".

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

Khi thiết lập xong, có thể truy cập máy chủ Web thông qua DNS của load balancer.


### Khác
Khi Amazon Elastic Load Balancing được thiết lập làm reverse proxy, hãy xem các bước ở trang sau để thiết lập.  
[Thiết lập khi dùng reverse proxy](/vi/additional_reverse_proxy)


## Xử lý khi nâng phiên bản PHP
Đã chuyển sang ["Xử lý khi nâng phiên bản PHP" của trang Dựng môi trường bằng AWS - Cấu hình đơn](/vi/install_aws_single?id=xử-lý-khi-nâng-phiên-bản-php).
