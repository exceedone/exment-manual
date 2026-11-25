# (Dành cho người dùng nâng cao) Thay đổi driver của session và cache
Đây là thiết lập thay đổi nơi lưu session (trạng thái đăng nhập, v.v.) và cache (dữ liệu giữ tạm thời).  
Mặc định, chúng được lưu vào tệp trên máy chủ Web. Hãy đổi nơi lưu trong các trường hợp như sau.

- Muốn dùng Redis hoặc memcached để nhanh hơn
- Muốn lưu ở nơi khác máy chủ Web để dự phòng (dùng nhiều máy chủ)

## Cách thiết lập

### Redis
Đây là các bước khi quản lý session bằng Redis.  
Có các bước phía máy chủ Redis và các bước phía máy chủ Web.  
※Khi dùng dịch vụ bên ngoài như AWS Redis, không cần các bước phía máy chủ Redis. Chỉ thiết lập phía máy chủ Web.

#### Phía máy chủ Redis
> Đây là các bước khi thiết lập trên CentOS.

**(1) Chạy các lệnh sau.**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) Chạy lệnh sau và thay đổi thiết lập của Redis.**

~~~
vi /etc/redis.conf

####Sửa dòng bind như sau
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) Trong thiết lập tường lửa, chỉ cho phép truy cập Redis từ địa chỉ IP của nơi kết nối.**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) Khởi động dịch vụ.**

~~~
systemctl start redis.service
~~~

#### Phía máy chủ Web
**(1) Chạy lệnh sau trong thư mục gốc của dự án.**

~~~
composer require predis/predis
~~~

**(2) Mở tệp .env, thêm hoặc sửa các giá trị thiết lập sau.**

~~~
CACHE_STORE=redis #Khi đổi nơi lưu cache. Sửa thành redis (khi cài mới bằng Exment v7.0.0 trở lên)
CACHE_DRIVER=redis #Khi đổi nơi lưu cache. Sửa thành redis (khi cập nhật từ Exment v6.x trở xuống)
SESSION_DRIVER=redis #Khi đổi nơi lưu session. Sửa thành redis
REDIS_CLIENT=predis #Dùng "predis" đã cài ở trên để kết nối Redis
REDIS_HOST=127.0.0.1 #Tên host của redis
REDIS_PASSWORD=XXXXXX #Mật khẩu của redis, chỉ ghi khi đã đặt
REDIS_PORT=6379 #Số cổng của redis, chỉ ghi khi không phải 6379
~~~

- Tên thiết lập của nơi lưu cache là tên được ghi ở "default" trong "config/cache.php".

| Site | Tên thiết lập |
| ---- | ---- |
| Khi cài mới bằng Exment v7.0.0 trở lên | "CACHE_STORE" |
| Khi cập nhật từ v6.x trở xuống ("config/cache.php" vẫn là của v6.x) | "CACHE_DRIVER" |

- Nếu không ghi "REDIS_CLIENT=predis", hệ thống sẽ thử kết nối bằng extension "phpredis" của PHP, nên xảy ra lỗi "Class "Redis" not found".


[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
