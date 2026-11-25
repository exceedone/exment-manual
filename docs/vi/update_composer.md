# Cập nhật composer
Đây là các bước cập nhật composer từ phiên bản 1 lên phiên bản 2.  
composer là thư viện được dùng khi cài đặt và cập nhật Exment.

> Nếu sau lần cập nhật này mà xảy ra lỗi khi cập nhật Exment, chúng tôi rất mong bạn báo cho chúng tôi [tại đây](https://github.com/exceedone/exment/issues/849).  

## Trình tự cập nhật
1. Kiểm tra phiên bản composer hiện tại (nếu đã là 2.X.X thì không cần làm các bước sau)
2. Kiểm tra phiên bản của laravel/framework (nếu cũ thì cập nhật trước)
3. Cập nhật composer

## Về composer 2
Tháng 10/2020, composer ver2 đã được phát hành.  
Ở ver2, các điểm sau đã được cải thiện.

- Cải thiện đáng kể về cả tốc độ lẫn lượng bộ nhớ sử dụng
- require/remove và cập nhật một phần nhanh hơn nhiều

![composer2](../ja/img/update/composer2.png)

Trích dẫn:  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

Với Exment, chúng tôi cũng đã kiểm thử việc cài đặt và cập nhật bằng composer2 và xác nhận rằng thực hiện được mà không có vấn đề.  
Tùy môi trường, nhưng có thể kỳ vọng tình trạng dùng quá nhiều bộ nhớ, vốn hay xảy ra với composer1, sẽ được cải thiện. Vì vậy, chúng tôi khuyến nghị cập nhật lên composer2.


## Các bước cập nhật
Để cập nhật lên composer2, cần một số bước.  
<span class="red">※ Nếu có thể, hãy thử cùng các bước này ở môi trường phát triển, v.v. rồi mới làm ở môi trường production.</span>

### Kiểm tra phiên bản composer hiện tại

- Kiểm tra phiên bản composer hiện tại bằng lệnh sau. (Chạy ở thư mục nào cũng được)

```
composer --version
```

| Kết quả | Việc cần làm |
|---|---|
| Là composer2.X.X, và việc cập nhật Exment cũng kết thúc không có vấn đề | composer đã được cập nhật. Không cần làm các bước sau |
| composer1.X.X | Hãy làm các bước sau |

### Kiểm tra và cập nhật phiên bản laravel/framework hiện tại

Kiểm tra phiên bản của laravel/framework mà Exment đang dùng.  
※ Nếu cài nhiều Exment trên cùng một máy chủ, hãy làm các bước sau với tất cả các Exment.  

- Chạy lệnh sau trong thư mục gốc của Exment.

```
php artisan --version
# Kết quả như sau sẽ hiển thị
# Laravel Framework 5.6.39
```

- Nếu kết quả là version5.6.40 trở lên thì không cần làm gì.

- Nếu kết quả thấp hơn version5.6.40, hãy cập nhật toàn bộ dự án bằng lệnh sau.  

```
composer update
```

### Cập nhật composer

- Cập nhật phiên bản composer lên 2.X.X.

```
# Hãy chạy một trong các lệnh sau
composer self-update --2
composer selfupdate --2
```

- Nếu sau khi cập nhật mà xảy ra sự cố, có thể quay về version1.X.X bằng lệnh sau.  
Tuy nhiên, hãy chạy lệnh này ở **đường dẫn ngoài thư mục của Exment**. Nếu chạy trong thư mục của Exment thì có vẻ sẽ bị lỗi.

```
composer self-update --1
composer selfupdate --1
```
