# (Dành cho người dùng nâng cao) Dự phòng
Có khi người ta dùng từ 2 máy chủ Web trở lên, để 1 máy dừng thì vẫn dùng được (dự phòng).  
Trang này là các bước khi chạy Exment với cấu hình dự phòng.

Có 2 việc cần làm.

1. Chuẩn bị từng máy chủ Web và cài thêm thư viện
2. Trong tệp `.env`, đổi nơi đặt tệp và cách quản lý phiên

## Mở đầu
Trang này xây dựng cấu hình như sau.  


### Những điều cần tính đến khi làm dự phòng
Khác với khi có 1 máy chủ Web (cấu hình đơn), bạn cần tính đến 2 điều sau.

- **Đặt tệp tải lên ở nơi khác ngoài máy chủ Web**  
Nếu đặt tệp tải lên từ màn hình vào một máy chủ Web, máy chủ Web còn lại sẽ không mở được tệp đó.  
Vì vậy, tệp được tải lên một nơi khác với máy chủ Web.  
Trang này tải lên S3 của AWS.  

- **Đổi cách quản lý phiên**  
Theo mặc định của Laravel, phiên (trạng thái đăng nhập, v.v.) được quản lý bằng tệp đặt trên máy chủ Web.  
Khi làm dự phòng, lúc truy cập vào máy chủ Web còn lại thì không có phiên, nên trạng thái đăng nhập bị mất.  
Vì vậy, cần đổi cách quản lý phiên.  
Trang này dùng Redis.


## Cách xây dựng
### Xây dựng máy chủ Web
Chuẩn bị từng máy chủ Web.  
Bạn cài đặt theo [cách cài đặt thông thường](/vi/quickstart) là được, nhưng hãy làm thêm 2 việc sau.

#### Cài đặt thư viện bổ sung
Hãy dùng composer để cài các thư viện sau vào máy chủ Web.

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### Sửa tệp .env
- Mở tệp .env rồi thêm hoặc đổi các giá trị thiết lập sau.  

~~~
###Quản lý tệp tải lên
EXMENT_DRIVER_EXMENT=s3 #Nơi Exment tải tệp lên. Đặt là s3
AWS_ACCESS_KEY_ID=XXXXXX #Access key của AWS S3
AWS_SECRET_ACCESS_KEY=XXXXXX #Secret key của AWS S3
AWS_DEFAULT_REGION=ap-northeast-1 #Region của AWS S3
AWS_BUCKET=XXXXXX #Tên bucket của AWS S3

###Quản lý phiên
SESSION_DRIVER=redis #Đổi thành redis
REDIS_HOST=127.0.0.1 #Tên máy chủ của redis
REDIS_PASSWORD=XXXXXX #Mật khẩu của redis
REDIS_PORT=6379 #Số cổng của redis
~~~
