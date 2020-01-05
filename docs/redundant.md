# (For advanced users) Redundancy
When building a Web system, there are many cases where the Web server is made redundant.  
This section describes the procedure for performing a redundant configuration with Exment.

## Introduction
On this page, the following configuration is constructed.


### Things to consider when making redundancy
In general, the following points need to be considered when compared to a single-configuration Web system.

- **Placing the uploaded file on a screen other than the Web server If you upload the file to the Web server,**  you will not be able to access the file from the other Web server.  
Therefore, it must be uploaded to a different location than the web server.  
This time, upload the file to AWS S3.  

- **Change the session management method**  
When using Laravel's standard functions, session management is performed using files placed on the web server.  
However, with redundancy, if the other Web server is accessed, the session will not exist, and the login status will be lost.  
Therefore, change the session management method.  
This time, I will use Redis.

## How to build
### Web server construction
Build each Web server.  
Basically, there is no problem if you [install using the normal installation method](/quick_start), but you need to additionally perform only the following contents.  

#### Installing additional libraries
Execute composer and install the following library on the web server.  

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### Modify .env file
- Open the .env file and add or change the following settings.

~~~
###File upload management
EXMENT_DRIVER_DEFAULT=s3 #s3 Destination to upload files with Exment. Set to s3
AWS_ACCESS_KEY_ID=XXXXXX #AWS S3 secret key
AWS_SECRET_ACCESS_KEY=XXXXXX #AWS S3 region
AWS_DEFAULT_REGION=ap-northeast-1 #AWS S3 region
AWS_BUCKET=XXXXXX #AWS S3 bucket name

###Session management
SESSION_DRIVER=redis #Rewrite to redis
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password
REDIS_PORT=6379 #redis port number
~~~
