# Khi tạm thời thay chương trình
Đây là các bước để tạm thời thay chương trình của Exment, khác với cập nhật thông thường.  
Dùng trong những trường hợp như sau.

| Việc muốn làm | Phần cần xem |
|---|---|
| Cài bản phát triển đi trước (phiên bản đang phát triển) | "Phát hành bản phát triển" |
| Cài phiên bản cũ | "Phát hành bản phát triển" (cùng các bước, chỉ định phiên bản cũ) |
| Tạm thời thay một phần mã nguồn có lỗi trước khi phát hành chính thức | "Thay mã nguồn" |

**Vui lòng đọc trước**

- Sau khi cài bản phát triển, mã nguồn có thể được cập nhật. Nếu sau đó quay lại như cũ, có trường hợp hệ thống không hoạt động bình thường.  
Đặc biệt, nếu định nghĩa cơ sở dữ liệu có thay đổi thì có thể xảy ra không nhất quán. Mong bạn thông cảm.
- Khi cài phiên bản cũ, phiên bản của các thư viện liên quan thay đổi và có trường hợp hệ thống không hoạt động bình thường.


### Phát hành bản phát triển
Bản phát triển và phiên bản cũ được cài theo các bước sau.

1. Sao lưu toàn bộ mã nguồn trong thư mục "vendor/exceedone/exment".
2. Chạy các lệnh sau trên dòng lệnh. Trước tiên sao lưu, sau đó chạy 2 dòng phù hợp với phiên bản muốn cài (bản phát triển hoặc phiên bản cũ).

~~~
# Thực hiện sao lưu (phạm vi chủ yếu là cơ sở dữ liệu, mã nguồn không được sao lưu)
php artisan exment:backup

# Chỉ định phiên bản phát triển của Exment. Ví dụ: khi cài phiên bản "release_foobar", làm các bước sau
composer require exceedone/exment=dev-release_foobar
php artisan exment:update

# Chỉ định phiên bản cũ của Exment. Ví dụ: khi cài phiên bản "4.3.1", làm các bước sau
composer require exceedone/exment=v4.3.1
php artisan exment:update
~~~

#### Khi quay từ bản phát triển về phiên bản mới nhất
Làm một trong hai việc sau thì chương trình sẽ được thay bằng phiên bản mới nhất.

- Thực hiện [Cập nhật](/vi/update).
- Chạy các lệnh sau.

~~~
composer require exceedone/exment
php artisan exment:update
~~~



### Thay mã nguồn
Khi thay một phần mã nguồn, hãy làm theo các bước sau.

1. Sao lưu toàn bộ mã nguồn trong thư mục "vendor/exceedone/exment".  
Hoặc chỉ sao chép phần mã nguồn sắp thay và đổi tên để giữ lại.
2. Đặt mã nguồn thay thế vào vị trí tương ứng trong "vendor/exceedone/exment".

#### Khi quay từ bản phát triển về phiên bản mới nhất
Làm một trong hai việc sau thì chương trình sẽ được thay bằng phiên bản mới nhất.  
<span class="red">※ Trong lúc chạy, có thể xuất hiện thông báo hỏi có ghi đè tệp hay không.</span> Khi đó, hãy đồng ý và tiếp tục việc thay.

- Thực hiện [Cập nhật](/vi/update).
- Chạy các lệnh sau.

~~~
composer require exceedone/exment
php artisan exment:update
~~~
