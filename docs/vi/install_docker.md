# Dựng môi trường bằng Docker
Đây là các bước chạy Exment bằng Docker (cơ chế chạy ứng dụng trong một vật chứa gọi là "container").  
※Thông tin chi tiết hơn vui lòng xem [GitHub](https://github.com/exceedone/docker-exment).

Trình tự chung như sau.

1. (Chỉ với máy tính Windows) Cài WSL2 và Docker
2. Lấy các tệp định nghĩa
3. Dựng và thiết lập môi trường bằng lệnh phù hợp với cơ sở dữ liệu
4. Thực hiện thiết lập ban đầu của Exment trên trình duyệt


## Special thanks!
Docker image được tạo dựa trên [repository docker của oreno4649](https://github.com/oreno4649/docker-exment). Xin chân thành cảm ơn!

## Môi trường
Các bước ở trang này được dựng với môi trường sau.  
- nginx bản mới nhất
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## Lưu ý

- Tùy theo môi trường và phiên bản bạn dùng, có thể không thiết lập được đúng theo các bước này. Mong bạn thông cảm.

- Trang này chỉ ghi các bước để chạy Exment bằng Docker.  
Các kiến thức IT chung như SSH, tạo cơ sở dữ liệu, lệnh Docker không được ghi ở đây. Mong bạn thông cảm.  

## Khi dùng trên máy tính Windows (WSL2)
Trên Windows, hãy cài Docker bên trong Ubuntu của WSL2 (cơ chế chạy Linux bên trong Windows) rồi chạy. Đây là các bước dành cho phát triển và kiểm thử.

### 1. Cài WSL2 và Ubuntu
- Mở PowerShell bằng "Run as administrator", chạy lệnh sau rồi khởi động lại máy tính.

```
wsl --install -d Ubuntu
```

- Sau khi khởi động lại, mở "Ubuntu" từ menu Start, rồi đặt tên người dùng và mật khẩu của Linux.
- Chạy `wsl -l -v` trong PowerShell và kiểm tra rằng "VERSION" của Ubuntu là "2".

> Nếu gặp lỗi cho biết ảo hóa đang tắt, hãy kiểm tra xem thiết lập ảo hóa (Intel VT-x, AMD-V) trong BIOS (UEFI) đã được bật chưa.

### 2. Cài Docker bên trong Ubuntu
- Trên màn hình Ubuntu, chạy các lệnh sau.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- Chạy `wsl --shutdown` trong PowerShell, rồi mở lại Ubuntu.
- Chạy `docker run --rm hello-world`, nếu hiện "Hello from Docker!" là xong.

> Nếu Docker không khởi động, hãy ghi nội dung sau vào `/etc/wsl.conf`, chạy `wsl --shutdown` rồi mở lại Ubuntu, sau đó chạy `sudo systemctl enable --now docker`.
> ```
> [boot]
> systemd=true
> ```

> Docker Desktop for Windows cũng chạy được. Docker Desktop tính phí khi dùng trong doanh nghiệp từ một quy mô nhất định trở lên (vui lòng xem điều khoản sử dụng của công ty Docker).

### 3. Chạy Exment
- Đặt các tệp bên trong Ubuntu (ví dụ: `~/exment`), rồi thực hiện phần "Các bước cài đặt bằng Docker" ở dưới trên màn hình Ubuntu. Nếu đặt ở ổ C (`/mnt/c/...`), hoạt động sẽ rất chậm.
- Mở http://localhost trên trình duyệt của Windows.

### Chú ý
- WSL2 tự động dừng khi không dùng một lúc, và các container của Docker cũng dừng theo. Khi dùng, hãy mở Ubuntu và chạy `make mysql-up` (tùy theo cơ sở dữ liệu bạn dùng).
- Nếu cổng 80 của Windows đang được phần mềm khác dùng, hãy đổi `EXMENT_DOCKER_HTTP_PORTS` trong `.env` của docker-exment thành `8080`, v.v. Khi đó hãy mở bằng http://localhost:8080.

## Các bước cài đặt bằng Docker

> ※Ở đây ghi các bước cho cấu hình cơ bản nhất gồm "máy chủ Web" và "MySQL".  
Ngoài ra còn có thể chỉ định chi tiết hơn, như "thêm cấu hình dự phòng và load balancer", "thêm https".  
Chi tiết vui lòng xem Readme của [docker-exment](https://github.com/exceedone/docker-exment).


### Lấy tệp định nghĩa
- Lấy [docker-exment](https://github.com/exceedone/docker-exment), rồi lấy [exment-boilerplate](https://github.com/exceedone/exment-boilerplate) vào bên trong đó. Hãy giữ nguyên tên thư mục là "exment-boilerplate".

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- Nếu không dùng git, hãy tải cả hai dưới dạng zip và giải nén, đổi tên thư mục của exment-boilerplate thành "exment-boilerplate" (khi giải nén sẽ là "exment-boilerplate-master"), rồi đặt vào trong thư mục docker-exment.
- Các lệnh dưới đây được chạy trong thư mục docker-exment. Hãy chạy lệnh của cơ sở dữ liệu bạn dùng.



### Dựng môi trường MySQL

````bash
$ make mysql-init
````

### Thiết lập môi trường MySQL

````bash
$ make mysql-up
````

### Dựng môi trường MariaDB

````bash
$ make mariadb-init
````

### Thiết lập môi trường MariaDB

````bash
$ make mariadb-up
````

### Dựng môi trường SQL Server

````bash
$ make sqlsrv-init
````

### Thiết lập môi trường SQL Server

````bash
$ make sqlsrv-up
````

### Thiết lập ban đầu của Exment
- Mở URL sau và thực hiện thiết lập ban đầu của Exment. (※Nếu đã đổi cổng của máy chủ Web, hãy mở bằng cổng đó)  
http://localhost


- Thông tin cơ sở dữ liệu như sau. (※Cổng là số cổng bên trong container. Dù đã đổi cổng bằng env thì vẫn là 3306)

| Mục | Giá trị thiết lập |
| ---- | ---- |
| Loại cơ sở dữ liệu | MySQL |
| Tên máy chủ | mysql |
| Cổng | 3306 |
| Cơ sở dữ liệu | exment_database |
| Tên người dùng | exment_user |
| Mật khẩu | secret |


## Các bước kết nối vào máy chủ
- Dùng lệnh sau để hiện danh sách container.

```
docker ps
# Ví dụ kết quả
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- Trong kết quả, sao chép giá trị "CONTAINER ID" của image có tên "docker-exment-php". Trong ví dụ trên là "123412341234".  

- Chạy lệnh sau.

```
docker exec -it (CONTAINER ID) /bin/bash
#Ví dụ
docker exec -it 123412341234 /bin/bash
```

- Như vậy là kết nối được vào máy chủ Web đang chạy Exment.


## Khác
Docker image này hiện vẫn đang được tiếp tục kiểm thử và thêm chức năng.  
GitHub vui lòng xem tại [docker-exment](https://github.com/exceedone/docker-exment).
