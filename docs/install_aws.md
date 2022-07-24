# (Advanced version, beta version) Environment construction with AWS
This page describes the procedure for building Exment on Amazon Linux2.
This is a completely new installation procedure, including installation of the web server.
In this procedure, **the web server is configured to be redundant.**

## environment
This page is constructed with the following configuration.  
- VPC
- Subnet
    - Public A
    - Public B
- Route table
- Internet gateway
- Security group
- Amazon S3
- Amazon RDS
    - MySQL 5.7.25
- Amazon ElastiCache
    - Redis 5.0.5
- Amazon Linux2-A
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 7.2.24
- Amazon Linux2-B
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 7.2.24
- Amazon Linux2-springboard
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## important point

- Depending on your environment and version, you may not be able to set up properly with this procedure. Please note.

- In this procedure, only the procedure for operating Exment on Linux is described.  
AWS does not describe general IT-related knowledge such as SSH, database creation, and Linux commands. Please note.  

- **In this procedure, it is assumed that you are running with an administrator account. If executed by a user other than the administrator account, add "sudo" to the beginning.**

- This procedure is based on this [AWS tutorial](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions-2).  

- For other inquiries, please feel free to [contact us for free](https://exment.net/inquiry).  

## procedure

### VPC
Create a VPC with the following settings.

- Name: any (ex: exment-vpc)
- IPv4 CIDR block: XXX.XXX.0.0 / 16 (Example: 172.32.0.0/16)
- IPv6 CIDR block: None
- Tenancy: Default
- If DNS resolution and DNS host name are disabled, change to "Valid" respectively

### Subnet
Create a subnet with the following settings.

#### Public subnet A
- Name: any (Example: exment-subnet-public1)
- VPC: VPC created above
- Availability Zone: ap-northeast-1a
- IPv4 CIDR block: XXX.XXX.1.0 / 24 (Example: 172.32.1.0/24)

#### Public subnet B
- Name: any (ex: exment-subnet-public2)
- VPC: VPC created above
- Availability Zone: ap-northeast-1c
- IPv4 CIDR block: XXX.XXX.2.0 / 24 (Example: 172.32.2.0/24)

### Internet gateway
- Name: any (ex: exment-igw)
- After creation, attach to the VPC created earlier

### Route table
- A route table is automatically created in the VPC created earlier.  
You can edit the Name. (Example: exment-rt)

- Select the route table and add the following from "Route" on the bottom tab of the page.  

    - Destination: 0.0.0.0/0
    - Target: Internet Gateway (Internet gateway created above)
- Add Public Subnet A and Public Subnet B from "Associate Subnet" on the tab at the bottom of the page.


### Security group
Create a security group with the following settings.  

#### Security Group-SSH
- Name: any (Example: exment-sg-ssh)
- Description: Optional (Example: exment-sg-ssh)
- VPC: VPC created above

■ After creation, add inbound rules
- Type: SSH
- Port: 22
- Source: IP address for SSH connection
- VPC: VPC created above

#### Security Group-SSH Private
- Name: any (Example: exment-sg-ssh-private)
- Description: Optional (Example: exment-sg-ssh-private)
- VPC: VPC created above

■After creation, add inbound rules

- Type: SSH
- Port: 22
- Source: (Group ID of "Security Group-SSH")
- VPC: VPC created above

#### Security Group-Web
- Name: any (Example: exment-sg-web)
- Description: Optional (Example: exment-sg-web)

■ After creation, add inbound rules
- Type: HTTP
- Port: 80
- Source: 0.0.0.0/0, :: / 0

#### Security Group-MySQL
- Name: any (Example: exment-sg-mysql)
- Description: Optional (Example: exment-sg-mysql)

■ After creation, add inbound rules
- Type: MYSQL / Aurora
- Port: 3306
- Source: (Group ID of "Security Group-Web")

#### Security Group-Redis
- Name: any (ex: exment-sg-redis)
- Description: Optional (Example: exment-sg-redis)

■ After creation, add inbound rules
- Type: Custom TCP rule
- Port: 6379
- Source: (Group ID of "Security Group-Web")


### AWS S3
- Create AWS S3 bucket and IAM.  
※Reference: [Super easy! Procedure for using S3 with Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)  
Please execute "Create IAM for S3" and "Create Bucket" of the above URL.  
※Bucket is for "attached file" "for backup file" "for plug-in" "for template" Please create four types of.


### MySQL
> This manual describes the settings for creating MySQL using Amazon RDS, but you can also create an instance individually, install MySQL, and access it from each web server.

- Engine: MySQL
- Version: 5.7.26
- Instance identifier: any (example: exment-db)
- DB instance class: Optional (Example: db.t2.micro)
- User name and password: Set for each person
- Virtual Private Cloud: VP created earlier
    - VPC Security Group: Security Group-MySQL
    - Availability Zone: Not specified


### Redis
> This manual describes how to create Redis using ElastiCache, but you can also create an instance individually, install Redis and access it from each web server.

- Cluster engine: Redis
- Name: any (ex: exment-redis)
- Engine version compatibility: 5.0.5
- Port: 6379
- Node type: any (example: cache.t2.micro)
- Subnet group: Create new
    - Name: any (ex: exment-redis-subnet)
    - VPC: VPC created earlier
    - Subnet: Enter all information
- Security Group: Security Group-Redis


### EC2
Create two types of EC2 instances. (Step platform server, one web server. The second web server will be replicated later.)

#### Springboard server
- AMI: Amazon Linux 2 AMI x86
- Instance size: any (Example: t2.nano)
- Number of instances: 1
- Network: VPC created earlier
- Subnet: any
- Automatically assigned public IP: Enabled
- Tag: Key-Name, Value-Any (Example: exment-step)
- Security Group: Security Group-SSH

#### Web server
- AMI: Amazon Linux 2 AMI x86
- Instance size: Optional (Example: t2.micro)
- Number of instances: 1
- Network: VPC created earlier
- Subnet: Public subnet A
- Automatically assigned public IP: Enabled
- Tag: Key-Name, Value-Any (Example: exment-web1)
- Security Group: Security Group-SSH Private, Security Group-Web


### Web server-A

#### Webサーバー-Aへ接続
- Connect to Web Server-A Connect to **the springboard server** with SSH .  
Transfer the key required to connect to the EC2 instance (here, "exment_key.pem") to the springboard server.  
Execute the following command to change the authority of the SSH key.  

~~~
chmod 700 exment_key.pem
~~~

- Execute the following command to execute SSH connection to Web server A.

~~~
ssh -i ~/exment_key.pem ec2-user@(Private IP address of Web server A)
~~~

#### Web server settings

- Execute the following command to update packages and install required software.  

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- Execute the following command to start Apache and configure automatic startup.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Create a swap area.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Through the path to php7.4. With the command, you can run php7.4.

~~~
sudo ln -s /usr/bin/php74 /usr/bin/php
~~~

- Install composer.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Modify httpd.conf.

~~~
sudo vi /etc/httpd/conf/httpd.conf

# Add the following to the end

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- Restart apache.
~~~
sudo systemctl restart httpd
~~~

- Place Exment on the server. Download the latest Exment file and extract it.  
~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set file permissions. Execute the following command.

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- Connect to MySQL and create a database.  

~~~
mysql -u (MySQL username) -p(Password name) -h (host name)
// Execute as MySQL command
create database exment;
~~~

- Execute the following command to make a Redis connection and an AWS S3 connection.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Edit the .env file.

~~~

# Change existing settings
CACHE_DRIVER=redis #When changing the cache storage location. rewrite to redis
SESSION_DRIVER=redis #When changing the cache storage location. rewrite to redis
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password, described only if set
REDIS_PORT=6379 #redis port number, described only if it is not 6379


# Add new setting
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID= (S3 access key)
AWS_SECRET_ACCESS_KEY=(S3 secret access key)
AWS_DEFAULT_REGION=(S3 region, eg ap-northeast-1)
AWS_BUCKET_EXMENT=(AWS S3 bucket used for attachment)
AWS_BUCKET_BACKUP=(AWS S3 bucket used for backup)
AWS_BUCKET_TEMPLATE=(AWS S3 bucket used in template)
AWS_BUCKET_PLUGIN= (AWS S3 bucket used by plugin)

# When using HTTPS for load balancer and HTTP for communication between ELB and EC2
ADMIN_HTTPS=true
~~~

- Enter the IP address of the created Web server in the browser on your PC to complete the initial installation of Exment.

#### When changing Web server settings
- After updating the Exment, updating the PHP file, or changing the settings, execute the following command.

~~~
sudo systemctl restart php-fpm
~~~


#### Web server AMI settings
Create an AMI for the web server for future web server redundancy.  
- In the EC2 menu of the AWS Console, click "Action" → "Image" → "Create Image".  
- Enter an image name (ex: exment-ami) and create an image.  
- A few minutes later, the image set earlier is created from "AMI" on the left menu.  

#### Create web server B from AMI
- Select the image created above from "AMI" on the left menu, and click the "Launch" button.
Create a Web server with the following settings.

Instance size: Optional (Example: t2.micro)
- Number of instances: 1
- Network: VPC created earlier
- Subnet: Public subnet B
- Automatically assigned public IP: Enabled
- Tag: Key-Name, Value-Arbitrary (Example: exment-web2)
- Security Group: Security Group-SSH Private, Security Group-Web


### Amazon Elastic Load Balancing
- Load balancer type: Application Load Balancer
- Name: any (ex: exment-alb)
- Listener: HTTP or HTTPS
- VPC: Created VPC
- Availability Zone: Select All
- Security Group: Security Group-Web
- Target group: any (ex: exment-alb-tg)
- Target group instance: Select two types of created web server and add to "Registered"  

After completing the settings, you can access the web server via the DNS of the load balancer.

## Correspondence at the time of PHP version upgrade
If you want to change the PHP version, please follow the steps below to upgrade.  
*You will not be able to access Exment during the version upgrade process.  
*The example below is the procedure for updating from PHP7.2 to PHP7.4.  
*It is assumed that PHP is installed using the Extras Library (amazon-linux-extras) of Amazon Linux 2.  
*The version upgrade method may differ depending on the environment, installation time, version and installation method.  

- Make sure you have the amazon-linux-extras package installed.  

~~~
which amazon-linux-extras
# If it is not installed, install it with the following command.
# sudo yum install -y amazon-linux-extras
~~~

- Check the PHP version and the Extras Library topic.  
*PHP version is 7.2.X. Make sure the PHP 7.2 topic is enabled and the PHP 7.4 topic exists.  

~~~
php -v
amazon-linux-extras | grep php
~~~

- Disable the PHP 7.2 topic.  

~~~
sudo amazon-linux-extras disable php7.2
~~~

- Install the PHP 7.4 topic.  

~~~
sudo amazon-linux-extras install php7.4
~~~

- Make sure the PHP version is 7.4.X, the PHP 7.2 topic is disabled, and the PHP 7.4 topic is enabled.  

~~~
php -v
amazon-linux-extras | grep php
~~~
