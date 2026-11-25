# (For advanced users, beta version) Environment construction with Azure Web Apps
<span class="red bold">Note: this page is an old procedure for versions before Exment v7.0.0 (Laravel6, PHP7.4). Exment v7.0.0 (PHP8.2 or later, Laravel12) cannot be installed by these steps as they are. For the installation steps, see [manual installation](/quickstart_manual).</span>  
This page describes the steps to build Exment with Azure Web Apps.  
These are the steps to create and run Azure Web Apps and MySQL.

## Important point

- Depending on your environment and versions, you may not be able to set up correctly by these steps. Please understand.

- This page only describes the steps to run Exment on Azure Web Apps.  
General IT knowledge about Azure Web Apps is not written. Please understand.  

## Procedure

### Create MySQL
- Create MySQL in the Azure portal.



### Azure Web Apps
- Create Azure Web Apps in the Azure portal.  
After that, access the Azure resource.
(image needed)


- From the left menu, select "Extensions" → "Composer" and install composer.

- From the left menu, select "Advanced Tools" and select "Go".

- In the Kudu GUI, move to the following path.
D:\home\site

- Run the following commands.

```
composer create-project laravel/laravel  --prefer-dist . "6.*" 
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
```



### VPC
Create a VPC with the following settings.

- Name : any (example : exment-vpc)
- IPv4 CIDR block : XXX.XXX.0.0/16 (example : 172.32.0.0/16)
- IPv6 CIDR block : none
- Tenancy : default
- If DNS resolution and DNS hostnames are disabled, change each to "Enabled"

### Subnet
Create the subnets with the following settings.

#### Public subnet A
- Name : any (example : exment-subnet-public1)
- VPC : the VPC created above
- Availability Zone : ap-northeast-1a
- IPv4 CIDR block : XXX.XXX.1.0/24 (example : 172.32.1.0/24)

#### Public subnet B
- Name : any (example : exment-subnet-public2)
- VPC : the VPC created above
- Availability Zone : ap-northeast-1c
- IPv4 CIDR block : XXX.XXX.2.0/24 (example : 172.32.2.0/24)


### Internet Gateway
- Name : any (example : exment-igw)
- After creating it, attach it to the VPC created earlier

### Route table
- A route table has been created automatically in the VPC you made earlier.  
You can edit its Name. (example : exment-rt)

- Select that route table and, from "Routes" of the tabs at the bottom of the page, add the following.
    - Destination : 0.0.0.0/0
    - Target : Internet Gateway (the internet gateway created above)

- From "Subnet associations" of the tabs at the bottom of the page, add public subnet A and public subnet B.


### Security Group
Create the security groups with the following settings.

#### Security Group - SSH
- Name : any (example : exment-sg-ssh)
- Description : any (example : exment-sg-ssh)
- VPC : the VPC created above

After creating it, add an inbound rule
- Type : SSH
- Port : 22
- Source : the IP address that connects by SSH
- VPC : the VPC created above

#### Security Group - SSH Private
- Name : any (example : exment-sg-ssh-private)
- Description : any (example : exment-sg-ssh-private)
- VPC : the VPC created above

After creating it, add an inbound rule
- Type : SSH
- Port : 22
- Source :  (the group ID of "Security Group - SSH")
- VPC : the VPC created above

#### Security Group-Web
- Name : any (example : exment-sg-web)
- Description : any (example : exment-sg-web)

After creating it, add an inbound rule
- Type : HTTP
- Port : 80
- Source : 0.0.0.0/0, ::/0

#### Security Group - MySQL
- Name : any (example : exment-sg-mysql)
- Description : any (example : exment-sg-mysql)

After creating it, add an inbound rule
- Type : MYSQL/Aurora
- Port : 3306
- Source : (the group ID of "Security Group-Web")

#### Security Group - Redis
- Name : any (example : exment-sg-redis)
- Description : any (example : exment-sg-redis)

After creating it, add an inbound rule
- Type : Custom TCP Rule
- Port : 6379
- Source : (the group ID of "Security Group-Web")


### AWS S3
- Create the AWS S3 buckets and the IAM.  
Note: reference: [Super easy! Steps to use S3 with Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f) (Japanese)  
Do "Create the IAM for S3" and "Create the bucket" of the URL above  
Note: create four kinds of buckets: "for attachments", "for backup files", "for plugins" and "for templates"


### MySQL
> This manual describes the settings for creating MySQL with Amazon RDS, but you can also build it by creating a separate instance, installing MySQL on it and accessing it from each web server.

- Engine : MySQL
- Version : 5.7.26
- Instance identifier : any (example : exment-db)
- DB instance class : any (example : db.t2.micro)
- User name, password : set your own
- Virtual Private Cloud : the VPC created earlier
- Additional connectivity configuration
    - VPC security group : Security Group - MySQL
    - Availability Zone : no preference


### Redis
> This manual describes the settings for creating Redis with ElastiCache, but you can also build it by creating a separate instance, installing Redis on it and accessing it from each web server.

- Cluster engine : Redis
- Name : any (example : exment-redis)
- Engine version compatibility : 5.0.5
- Port : 6379
- Node type : any (example : cache.t2.micro)
- Subnet group : create new
    - Name : any (example : exment-redis-subnet)
    - VPC : the VPC created earlier
    - Subnets : enter all the information
- Security group : Security Group - Redis


### EC2
Create two kinds of EC2 instances. (A springboard server and one web server. The second web server is copied later)

#### Springboard server
- AMI : Amazon Linux 2 AMI x86
- Instance size : any (example : t2.nano)
- Number of instances : 1
- Network : the VPC created earlier
- Subnet : any
- Auto-assign public IP : Enable
- Tag : key - Name, value - any (example : exment-step)
- Security group : Security Group - SSH

#### Web server
- AMI : Amazon Linux 2 AMI x86
- Instance size : any (example : t2.micro)
- Number of instances : 1
- Network : the VPC created earlier
- Subnet : public subnet A
- Auto-assign public IP : Enable
- Tag : key - Name, value - any (example : exment-web1)
- Security group : Security Group - SSH Private, Security Group-Web


### Web server-A

#### Connect to web server-A
- Connect to the **springboard server** by SSH.

- Transfer the key needed to connect to the EC2 instance (here, "exment_key.pem") to the springboard server.

- Run the following command to change the permissions of the SSH key.

~~~
chmod 700 exment_key.pem
~~~

- Run the following command to connect to web server A by SSH.

~~~
ssh -i ~/exment_key.pem ec2-user@(private IP address of web server A)
~~~

#### Web server settings

- Run the following commands to update the packages, install the required software and so on.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- Run the following commands to start Apache and set it to start automatically.

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

- Set the path to php7.4. Then php7.4 can be run by the command.

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

- Edit httpd.conf.

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
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set the file permissions. Run the following commands.

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- Connect to MySQL and create the database.

~~~
mysql -u (MySQL user name) -p(password) -h (host name)
// Run as a MySQL command
create database exment;
~~~

- Run the following commands to connect to Redis and AWS S3.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Edit the .env file.

~~~

# Change the existing setting values
CACHE_STORE=redis #To change where the cache is saved. Rewrite to redis
SESSION_DRIVER=redis #To change where the cache is saved. Rewrite to redis
REDIS_CLIENT=predis #Connect to Redis with "predis" installed above
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password, write it only if one is set
REDIS_PORT=6379 #redis port number, write it only if it is not 6379


# Add new setting values
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3 access key)
AWS_SECRET_ACCESS_KEY=(S3 secret access key)
AWS_DEFAULT_REGION=(S3 region. Example: ap-northeast-1)
AWS_BUCKET_EXMENT=(AWS S3 bucket used for attachments)
AWS_BUCKET_BACKUP=(AWS S3 bucket used for backups)
AWS_BUCKET_TEMPLATE=(AWS S3 bucket used for templates)
AWS_BUCKET_PLUGIN=(AWS S3 bucket used for plugins)

# When the load balancer uses HTTPS and the communication between ELB and EC2 uses HTTP
ADMIN_HTTPS=true
~~~

- In the browser of your own PC, enter the IP address of the web server you made and finish the initial installation of Exment.

#### When changing web server settings
- After updating Exment, or when you have updated PHP files or changed setting values, run the following command.

~~~
sudo systemctl restart php-fpm
~~~


#### Web server AMI settings

Create an AMI of the web server, for making the web servers redundant later and so on.

- In the EC2 menu of the AWS Console, click "Actions" → "Image" → "Create image".

- Enter the image name and so on (example : exment-ami) and create the image.

- After a few minutes, the image you just set is created in "AMIs" of the left menu.


#### Create web server B from AMI
- From "AMIs" of the left menu, select the image made above and click the "Launch" button.

Create a web server with the following settings.
  - Instance size : any (example : t2.micro)
  - Number of instances : 1
  - Network : the VPC created earlier
  - Subnet : public subnet B
  - Auto-assign public IP : Enable
  - Tag : key - Name, value - any (example : exment-web2)
  - Security group : Security Group - SSH Private, Security Group-Web


### Amazon Elastic Load Balancing
- Load balancer type : Application Load Balancer
- Name : any (example : exment-alb)
- Listener : HTTP or HTTPS
- VPC : the VPC you created
- Availability Zones : select all
- Security group : Security Group-Web
- Target group : any (example : exment-alb-tg)
- Target group instances : select the two web servers you created and add them to "Registered"

When the settings are done, the web servers can be accessed through the DNS of the load balancer.
