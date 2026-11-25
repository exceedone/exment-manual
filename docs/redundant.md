# (For advanced users) Redundancy
A site can have two or more web servers, so that it can still be used when one of them stops (redundancy).  
This page gives the steps to run Exment in a redundant configuration.

There are two things to do.

1. Prepare each web server and install the additional libraries
2. In the `.env` file, change where files are kept and how sessions are managed

## Introduction
On this page, the following configuration is built.  


### Things to consider when making redundancy
Unlike with one web server (a single configuration), you need to think about the following two points.

- **Put the uploaded files in a place other than the web server**  
If a file uploaded from the screen is put on a web server, the other web server cannot open that file.  
Therefore, upload to a place separate from the web servers.  
On this page, files are uploaded to AWS S3.  

- **Change the session management method**  
By the Laravel default, sessions (the login state and so on) are managed with files put on the web server.  
With redundancy, the session does not exist when the other web server is accessed, so the login state is lost.  
Therefore, change how sessions are managed.  
On this page, Redis is used.


## How to build
### Web server construction
Prepare each web server.  
You can install by the [normal installation method](/quickstart), but do the following two things in addition.

#### Installing additional libraries
With composer, install the following libraries on the web server.

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### Modify .env file
- Open the .env file and add or change the following setting values.  

~~~
###File upload management
EXMENT_DRIVER_EXMENT=s3 #Where Exment uploads files. Set to s3
AWS_ACCESS_KEY_ID=XXXXXX #AWS S3 access key
AWS_SECRET_ACCESS_KEY=XXXXXX #AWS S3 secret key
AWS_DEFAULT_REGION=ap-northeast-1 #AWS S3 region
AWS_BUCKET=XXXXXX #AWS S3 bucket name

###Session management
SESSION_DRIVER=redis #Rewrite to redis
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password
REDIS_PORT=6379 #redis port number
~~~
