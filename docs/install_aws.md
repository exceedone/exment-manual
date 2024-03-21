# (For advanced users, beta version) Environment construction with AWS - Redundant configuration
This page describes the steps to build Exment on Amazon Linux2.   
This is a completely new installation procedure, including the installation of the web server.   
Additionally, **this procedure uses a redundant web server configuration**  
※For information on how to build a simple one-machine environment, please check [here](/install_aws_single).

## Environment
This page is constructed with the following configuration.
- VPC
- Subnet
    - Public A
    - Public B
- Loot table
- Internet gateway
- security group
- Amazon S3
- Amazon RDS
    - MySQL 8.0.x
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
- Amazon Linux2-Springboard
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## Important point

- Depending on your environment and version, you may not be able to set up correctly using this procedure. note that.

- This procedure only describes the steps to run Exment on Linux.   
Regarding AWS, general IT knowledge such as SSH, database creation, Linux commands, etc. is not described. note that.   

- **This procedure assumes that you are running with an administrator account. If executed by a user who is not an administrator account, add "sudo" to the beginning**

- If an error occurs during installation, please refer to [Troubleshooting](/en/troubleshooting).

- This procedure can be found in [AWS Tutorial](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions- It is created based on 2).

## Procedure

### VPC
Create a VPC with the following settings.

- Name: Any (example: exment-vpc)
- IPv4 CIDR block: XXX.XXX.0.0/16 (Example: 172.32.0.0/16)
- IPv6 CIDR block: None
- Tenancy: Default
- If DNS resolution and DNS hostname are disabled, enable them respectively.

### Subnet
Create a subnet with the following settings.

#### Public subnet A
- Name: Any (example: exment-subnet-public1)
- VPC: VPC created above
- Availability zone: ap-northeast-1a
- IPv4 CIDR block: XXX.XXX.1.0/24 (Example: 172.32.1.0/24)

#### Public subnet B
- Name: Any (example: exment-subnet-public2)
- VPC: VPC created above
- Availability zone: ap-northeast-1c
- IPv4 CIDR block: XXX.XXX.2.0/24 (Example: 172.32.2.0/24)


### Internet Gateway
- Name: Any (example: exment-igw)
- After creation, attach to the VPC created earlier

### Loot table
- A route table is automatically created in the VPC you created earlier.   
You can edit the Name. (Example: exment-rt)

- Select the route table and add the following from the route tab at the bottom of the page.
    - Destination: 0.0.0.0/0
    - Target: Internet Gateway (Internet gateway created above)

- Add public subnet A and public subnet B from the subnet association tab at the bottom of the page.


### Security Group
Create a security group with the following settings.

#### Security Group - SSH
- Name: Any (example: exment-sg-ssh)
- Description: Any (example: exment-sg-ssh)
- VPC: VPC created above

■Add inbound rules after creation
- Type: SSH
- Port: 22
- Source: IP address for SSH connection
- VPC: VPC created above

#### Security Group - SSH Private
- Name: Any (example: exment-sg-ssh-private)
- Description: Optional (e.g. exment-sg-ssh-private)
- VPC: VPC created above

■Add inbound rules after creation
- Type: SSH
- Port: 22
- Source:  (Security group - SSH group ID)
- VPC: VPC created above

#### Security Group-Web
- Name: Any (example: exment-sg-web)
- Description: Optional (Example: exment-sg-web)

■Add inbound rules after creation
- Type: HTTP
- Port: 80
- Source: 0.0.0.0/0, ::/0

#### Security Group - MySQL
- Name: Any (example: exment-sg-mysql)
- Description: Any (example: exment-sg-mysql)

■Add inbound rules after creation
- Type: MYSQL/Aurora
- Port: 3306
- Source: (Security Group-Web Group ID)

#### Security Group - Redis
- Name: Any (example: exment-sg-redis)
- Description: Any (example: exment-sg-redis)

■Add inbound rules after creation
- Type: Custom TCP Rule
- Port: 6379
- Source: (Security Group-Web Group ID)


### AWS S3
- Create AWS S3 bucket and IAM.   
※Reference: [Super easy! Steps to use S3 with Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)  
Please create IAM for S3 at the above URL and create a bucket  
※Create four types of buckets: attachments, backup files, plugin templates.


### MySQL
> This manual describes the MySQL creation settings using Amazon RDS, but you can also create instances individually, install MySQL, and access it from each web server.   
For information on how to install MySQL on a server, please check [here](/install_mysql).

- Engine: MySQL
- Version: 8.0.x
- Instance identifier: any (example: exment-db)
- DB instance class: any (e.g. db.t2.micro)
- Username and password: set individually
- Virtual Private Cloud: VP created earlier
- Additional connection settings
    - VPC Security Group: Security Group-MySQL
    - Availability Zone: Not specified


### Redis
> This manual describes Redis creation settings using ElastiCache, but it can also be constructed by creating instances individually, installing Redis, and accessing from each web server.   
※How to install Redis on the server has been moved to [here](/additional_session_cache_driver).

- Cluster engine: Redis
- Name: Any (Example: exment-redis)
- Engine version compatibility: 5.0.5
- Port: 6379
- Node type: Any (e.g. cache.t2.micro)
- Subnet group: Create new
    - Name: Any (example: exment-redis-subnet)
    - VPC: The VPC you created earlier
    - Subnet: enter all information
- Security Group: Security Group-Redis


### EC2
Create two types of EC2 instances. (One springboard server, one web server. The second web server will be cloned later)

#### Springboard server
- AMI: Amazon Linux 2 AMI x86
- Instance size: Any (Example: t2.nano)
- Number of instances: 1
- Network: VPC created earlier
- Subnet: Any
- Auto-assign public IP: Enabled
- Tag: Key-Name, Value-Optional (Example: exment-step)
- Security Group: Security Group-SSH

#### Web server
- AMI: Amazon Linux 2 AMI x86
- Instance size: Any (e.g. t2.micro)
- Number of instances: 1
- Network: VPC created earlier
- Subnet: Public subnet A
- Auto-assign public IP: Enabled
- Tag: Key-Name, Value-Optional (Example: exment-web1)
- Security Group: Security Group-SSH Private, Security Group-Web


### Web server-A

#### Connect to web server-A
- Connect to the **Basement Server** via SSH.

- Transfer the key required to connect to the EC2 instance (here named exment_key.pem) to the bastion server.

- Run the following command to change the SSH key permissions.

~~~
chmod 700 exment_key.pem
~~~

- Execute the following command to establish an SSH connection to Web server A.

~~~
ssh -i ~/exment_key.pem ec2-user@(web server A's private IP address)
~~~

#### Web server settings

- Execute the following command to update the package, install the required software, etc.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php8.2
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Execute the following command to start Apache and configure automatic startup settings.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Create swap space.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Install composer.
~~~
cd~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Fix httpd.conf.

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

- Set file permissions. Run the following command:

~~~
# Add ec2-user user to apache group
sudo usermod -a -G apache ec2-user
~~~

- Place the Exment on the server. Download the latest Exment file and extract it.   
※This is an easy installation procedure. For manual installation, please refer to [here](/quickstart_manual) for location.

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set file permissions. Run the following command:

~~~
# add minimum privileges
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment

# Execute the following command to grant folder permissions. Perform 1 or 2
# 1. For easy installation
sudo php artisan exment:setup-dir --easy=1
# 2. For manual installation
sudo php artisan exment:setup-dir
~~~

- Execute the following command to connect to Redis and AWS S3.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Edit the .env file.

~~~

# Change existing settings
CACHE_DRIVER=redis #When changing the cache storage location. Rewrite to redis
SESSION_DRIVER=redis #When changing the cache storage location. Rewrite to redis
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password, enter only if set
REDIS_PORT=6379 #redis port number, write only if it is not 6379


# Add new setting value
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3 access key)
AWS_SECRET_ACCESS_KEY=(S3 secret access key)
AWS_DEFAULT_REGION=(S3 region. Example: ap-northeast-1)
AWS_BUCKET_EXMENT=(AWS S3 bucket used for attachment)
AWS_BUCKET_BACKUP=(AWS S3 bucket used for backup)
AWS_BUCKET_TEMPLATE=(AWS S3 bucket used in template)
AWS_BUCKET_PLUGIN=(AWS S3 bucket used by plugin)

# When using HTTPS for the load balancer and HTTP for communication between ELB and EC2
ADMIN_HTTPS=true
~~~

- Enter the IP address of the web server you created in your PC's browser to complete the initial installation of Exment.

- ※If you installed using the easy installation, once the initial installation is complete, run the following command to restore the permissions required only during installation.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

#### When changing web server settings
- After updating Exment, updating the PHP file, or changing the setting value, execute the following command.

~~~
sudo systemctl restart php-fpm
~~~


#### Web server AMI settings

Create a web server AMI for future web server redundancy.

- In the EC2 menu of the AWS Console, click Actions → Images → Create Image.

- Enter the image name etc. (e.g. exment-ami) and create the image.

- After a few minutes, the image you set earlier will be created from AMI on the left menu.


#### Create web server B from AMI
- Select the image created above from AMI on the left menu and click the launch button.

Create a web server with the following settings.
  - Instance size: Any (Example: t2.micro)
  - Number of instances: 1
  - Network: VPC created earlier
  - Subnet: Public subnet B
  - Auto-assign public IP: Enabled
  - tag: key-Name, value-any (example: exment-web2)
  - Security Group: Security Group-SSH Private, Security Group-Web


### Amazon Elastic Load Balancing
- Load balancer type: Application Load Balancer
- Name: Any (Example: exment-alb)
- Listener: HTTP or HTTPS
- VPC: Created VPC
- Availability Zone: Select all
- Security Group: Security Group-Web
- Target group: any (example: exment-alb-tg)
- Target group instance: Select the two types of web servers you created and add them to registered.

After completing the settings, you will be able to access the web server via the load balancer's DNS.


### Others
If reverse proxy settings have been configured using Amazon Elastic Load Balancing, please check the following steps and configure them.   
[Settings when using a reverse proxy](/additional_reverse_proxy)


## Correspondence when upgrading PHP version
Moved to [here](/install_aws_single).
