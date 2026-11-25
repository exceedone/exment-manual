# (面向高级用户、测试版)用 Azure Web Apps 搭建环境
<span class="red bold">※本页是以 Exment v7.0.0 之前的版本(Laravel6、PHP7.4)为前提的旧步骤。在 Exment v7.0.0(PHP8.2 以上、Laravel12)中，按本步骤原样操作无法安装。安装步骤请确认[手动安装](/zh/quickstart_manual)。</span>  
本页说明用 Azure Web Apps 搭建 Exment 的步骤。  
这是创建并运行 Azure Web Apps 和 MySQL 的步骤。

## 注意事项

- 根据您使用的环境和版本等，有时不能按本步骤正常设置。敬请谅解。

- 本步骤只写了让 Exment 在 Azure Web Apps 上运行的步骤。  
没有写 Azure Web Apps 的一般 IT 知识。敬请谅解。  

## 步骤

### 创建 MySQL
- 在 Azure 门户中创建 MySQL。



### Azure Web Apps
- 在 Azure 门户中创建 Azure Web Apps。  
然后，访问 Azure 的资源。
(需要图片)


- 从左侧菜单选择“扩展”→“Composer”，安装 composer。

- 从左侧菜单选择“高级工具”，再选择“转到”。

- 在 Kudu 的 GUI 中，移动到下面的路径。
D:\home\site

- 执行下面的命令。

```
composer create-project laravel/laravel  --prefer-dist . "6.*" 
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
```



### VPC
按下面的设置创建 VPC。

- 名称 : 任意 (例 : exment-vpc)
- IPv4 CIDR 块 : XXX.XXX.0.0/16 (例 : 172.32.0.0/16)
- IPv6 CIDR 块 : 无
- 租期 : 默认
- DNS 解析、DNS 主机名处于禁用状态时，分别改为“启用”

### 子网
按下面的设置创建子网。

#### 公有子网 A
- 名称 : 任意 (例 : exment-subnet-public1)
- VPC : 上面创建的 VPC
- 可用区 : ap-northeast-1a
- IPv4 CIDR 块 : XXX.XXX.1.0/24 (例 : 172.32.1.0/24)

#### 公有子网 B
- 名称 : 任意 (例 : exment-subnet-public2)
- VPC : 上面创建的 VPC
- 可用区 : ap-northeast-1c
- IPv4 CIDR 块 : XXX.XXX.2.0/24 (例 : 172.32.2.0/24)


### 互联网网关
- 名称 : 任意 (例 : exment-igw)
- 创建后，挂载到刚才创建的 VPC

### 路由表
- 刚才创建的 VPC 中已经自动创建了路由表。  
Name 可以编辑。(例 : exment-rt)

- 选择这个路由表，在页面下方选项卡的“路由”中添加下面的内容。
    - 目标 : 0.0.0.0/0
    - 目标对象 : Internet Gateway(上面创建的互联网网关)

- 在页面下方选项卡的“子网关联”中，添加公有子网 A、公有子网 B。


### 安全组
按下面的设置创建安全组。

#### 安全组-SSH
- 名称 : 任意 (例 : exment-sg-ssh)
- 描述 : 任意 (例 : exment-sg-ssh)
- VPC : 上面创建的 VPC

■创建后，添加入站规则
- 类型 : SSH
- 端口 : 22
- 源 : 进行 SSH 连接的 IP 地址
- VPC : 上面创建的 VPC

#### 安全组-SSH 私有
- 名称 : 任意 (例 : exment-sg-ssh-private)
- 描述 : 任意 (例 : exment-sg-ssh-private)
- VPC : 上面创建的 VPC

■创建后，添加入站规则
- 类型 : SSH
- 端口 : 22
- 源 :  (“安全组-SSH”的组 ID)
- VPC : 上面创建的 VPC

#### 安全组-Web
- 名称 : 任意 (例 : exment-sg-web)
- 描述 : 任意 (例 : exment-sg-web)

■创建后，添加入站规则
- 类型 : HTTP
- 端口 : 80
- 源 : 0.0.0.0/0, ::/0

#### 安全组-MySQL
- 名称 : 任意 (例 : exment-sg-mysql)
- 描述 : 任意 (例 : exment-sg-mysql)

■创建后，添加入站规则
- 类型 : MYSQL/Aurora
- 端口 : 3306
- 源 : (“安全组-Web”的组 ID)

#### 安全组-Redis
- 名称 : 任意 (例 : exment-sg-redis)
- 描述 : 任意 (例 : exment-sg-redis)

■创建后，添加入站规则
- 类型 : 自定义 TCP 规则
- 端口 : 6379
- 源 : (“安全组-Web”的组 ID)


### AWS S3
- 创建 AWS S3 的存储桶和 IAM。  
※参考：[超简单！在 Laravel 中使用 S3 的步骤](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)（日语）  
请进行上面 URL 中的“创建 S3 用的 IAM”“创建 Bucket”。  
※存储桶请创建“附件用”“备份文件用”“插件用”“模板用”4 种。


### MySQL
> 本手册写的是用 Amazon RDS 创建 MySQL 的设置，但也可以另外创建实例并安装 MySQL，再从各台 Web 服务器访问。

- 引擎 : MySQL
- 版本 : 5.7.26
- 实例标识符 : 任意 (例 : exment-db)
- 数据库实例类 : 任意 (例 : db.t2.micro)
- 用户名、密码 : 各自设置
- Virtual Private Cloud : 刚才创建的 VPC
- 其他连接设置
    - VPC 安全组 : 安全组-MySQL
    - 可用区 : 不指定


### Redis
> 本手册写的是用 ElastiCache 创建 Redis 的设置，但也可以另外创建实例并安装 Redis，再从各台 Web 服务器访问。

- 集群引擎 : Redis
- 名称 : 任意 (例 : exment-redis)
- 引擎版本兼容性 : 5.0.5
- 端口 : 6379
- 节点类型 : 任意 (例 : cache.t2.micro)
- 子网组 : 新建
    - 名称 : 任意 (例 : exment-redis-subnet)
    - VPC : 刚才创建的 VPC
    - 子网 : 输入所有信息
- 安全组 : 安全组-Redis


### EC2
创建 2 种 EC2 实例。(跳板机和 1 台 Web 服务器。第 2 台 Web 服务器稍后复制)

#### 跳板机
- AMI : Amazon Linux 2 AMI x86
- 实例大小 : 任意 (例 : t2.nano)
- 实例数 : 1
- 网络 : 刚才创建的 VPC
- 子网 : 任意
- 自动分配公有 IP : 启用
- 标签 : 键-Name、值-任意 (例 : exment-step)
- 安全组 : 安全组-SSH

#### Web 服务器
- AMI : Amazon Linux 2 AMI x86
- 实例大小 : 任意 (例 : t2.micro)
- 实例数 : 1
- 网络 : 刚才创建的 VPC
- 子网 : 公有子网 A
- 自动分配公有 IP : 启用
- 标签 : 键-Name、值-任意 (例 : exment-web1)
- 安全组 : 安全组-SSH 私有、安全组-Web


### Web 服务器-A

#### 连接 Web 服务器-A
- 用 SSH 连接**跳板机**。

- 把连接 EC2 实例所需要的 key(这里设为“exment_key.pem”)发送到跳板机。

- 执行下面的命令，更改 SSH 密钥的权限。

~~~
chmod 700 exment_key.pem
~~~

- 执行下面的命令，用 SSH 连接 Web 服务器 A。

~~~
ssh -i ~/exment_key.pem ec2-user@(Web 服务器 A 的私有 IP 地址)
~~~

#### Web 服务器设置

- 执行下面的命令，进行软件包的更新、所需软件的安装等。

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- 执行下面的命令，启动 Apache，并设置为自动启动。

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- 创建 swap 区域。

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- 设置 php7.4 的路径。这样就可以用命令执行 php7.4。

~~~
sudo ln -s /usr/bin/php74 /usr/bin/php
~~~

- 安装 composer。
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- 修改 httpd.conf。

~~~
sudo vi /etc/httpd/conf/httpd.conf

# 把下面的内容添加到末尾

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- 重新启动 apache。
~~~
sudo systemctl restart httpd
~~~

- 把 Exment 放到服务器上。下载最新的 Exment 文件并解压。  
~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- 进行文件的许可设置。执行下面的命令。

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- 连接 MySQL，创建数据库。

~~~
mysql -u (MySQL 的用户名) -p(密码) -h (主机名)
// 作为 MySQL 命令执行
create database exment;
~~~

- 为了连接 Redis 和 AWS S3，执行下面的命令。

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- 修改 .env 文件。

~~~

# 更改已有的设置值
CACHE_STORE=redis #更改缓存的保存位置时。改写为 redis
SESSION_DRIVER=redis #更改缓存的保存位置时。改写为 redis
REDIS_CLIENT=predis #使用上面安装的“predis”连接 Redis
REDIS_HOST=127.0.0.1 #redis 的主机名
REDIS_PASSWORD=XXXXXX #redis 的密码，只在设置了密码时写
REDIS_PORT=6379 #redis 的端口号，只在不是 6379 时写


# 新添加设置值
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3 访问密钥)
AWS_SECRET_ACCESS_KEY=(S3 秘密访问密钥)
AWS_DEFAULT_REGION=(S3 区域。例：ap-northeast-1)
AWS_BUCKET_EXMENT=(附件使用的 AWS S3 存储桶)
AWS_BUCKET_BACKUP=(备份使用的 AWS S3 存储桶)
AWS_BUCKET_TEMPLATE=(模板使用的 AWS S3 存储桶)
AWS_BUCKET_PLUGIN=(插件使用的 AWS S3 存储桶)

# 负载均衡器用 HTTPS、ELB 与 EC2 之间的通信用 HTTP 时
ADMIN_HTTPS=true
~~~

- 在手边电脑的浏览器中输入创建的 Web 服务器的 IP 地址，完成 Exment 的初始安装。

#### Web 服务器 更改设置时
- 更新了 Exment、更新了 PHP 文件或更改了设置值时，请执行下面的命令。

~~~
sudo systemctl restart php-fpm
~~~


#### Web 服务器的 AMI 设置

为了今后的 Web 服务器冗余化等，创建 Web 服务器的 AMI。

- 在 AWS Console 的 EC2 菜单中，单击“操作”→“映像”→“创建映像”。

- 输入映像名称等(例 : exment-ami)，创建映像。

- 过几分钟后，左侧菜单的“AMI”中就有了刚才创建的映像。


#### 用 AMI 创建 Web 服务器 B
- 在左侧菜单的“AMI”中选择上面创建的映像，单击“启动”按钮。

按下面的设置创建 Web 服务器。
  - 实例大小 : 任意 (例 : t2.micro)
  - 实例数 : 1
  - 网络 : 刚才创建的 VPC
  - 子网 : 公有子网 B
  - 自动分配公有 IP : 启用
  - 标签 : 键-Name、值-任意 (例 : exment-web2)
  - 安全组 : 安全组-SSH 私有、安全组-Web


### Amazon Elastic Load Balancing
- 负载均衡器的类型 : Application Load Balancer
- 名称 : 任意 (例 : exment-alb)
- 侦听器 : HTTP 或 HTTPS
- VPC : 创建的 VPC
- 可用区 : 全部选择
- 安全组 : 安全组-Web
- 目标组 : 任意 (例 : exment-alb-tg)
- 目标组实例 : 选择创建的 2 种 Web 服务器，添加到“已注册”

设置完成后，就可以通过负载均衡器的 DNS 访问 Web 服务器。