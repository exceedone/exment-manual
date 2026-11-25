# （面向高级用户）冗余化
有时会把 Web 服务器增加到 2 台以上，让其中 1 台停止时也能使用（冗余化）。  
本页是以冗余化的结构运行 Exment 时的步骤。

要做的事有下面 2 件。

1. 分别准备 Web 服务器，并安装追加的库
2. 在 `.env` 文件中更改文件的存放位置和会话的管理方法

## 开始之前
本页搭建如下的结构。  


### 冗余化时要考虑的事
与 Web 服务器只有 1 台（单机结构）时不同，需要考虑下面 2 点。

- **把上传的文件放在 Web 服务器以外的地方**  
把从页面上传的文件放在 Web 服务器上的话，从另 1 台 Web 服务器就打不开这个文件。  
所以要上传到 Web 服务器以外的地方。  
本页上传到 AWS 的 S3。  

- **更改会话的管理方法**  
Laravel 默认用放在 Web 服务器上的文件管理会话（登录状态等）。  
冗余化后，访问另 1 台 Web 服务器时没有会话，登录状态就会消失。  
所以要更改会话的管理方法。  
本页使用 Redis。


## 搭建方法
### 搭建 Web 服务器
分别准备 Web 服务器。  
按[通常的安装方法](/zh/quickstart)安装即可，但请另外做下面 2 件事。

#### 安装追加的库
请用 composer 在 Web 服务器上安装下面的库。

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### 修改 .env 文件
- 打开 .env 文件，追加、更改下面的设置值。  

~~~
###文件上传管理
EXMENT_DRIVER_EXMENT=s3 #Exment 上传文件的目标。设为 s3
AWS_ACCESS_KEY_ID=XXXXXX #AWS 的 S3 的访问密钥
AWS_SECRET_ACCESS_KEY=XXXXXX #AWS 的 S3 的私密密钥
AWS_DEFAULT_REGION=ap-northeast-1 #AWS 的 S3 的区域
AWS_BUCKET=XXXXXX #AWS 的 S3 的存储桶名

###会话管理
SESSION_DRIVER=redis #改写为 redis
REDIS_HOST=127.0.0.1 #redis 的主机名
REDIS_PASSWORD=XXXXXX #redis 的密码
REDIS_PORT=6379 #redis 的端口号
~~~
