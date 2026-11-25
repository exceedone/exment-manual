# Thiết lập gửi email
Đây là thiết lập để gửi email từ Exment, và các bước gửi email thử sau khi thiết lập.  

Có 2 bước sau.

1. Thiết lập cách gửi email (thông thường, bạn nhập thiết lập SMTP trên màn hình thiết lập hệ thống)
2. Gửi email thử để kiểm tra xem email có đến không

> ※Các vấn đề về chức năng gửi email như "email không đến" hay "email bị xếp vào thư rác" phụ thuộc phần lớn vào từng máy chủ và môi trường, nên chúng tôi xin phép không nhận các câu hỏi về những vấn đề này.  

## Tổng quan
- Exment có khi gửi email từ hệ thống.  
Ví dụ:
    - Thông báo cập nhật dữ liệu
    - Xác thực hai yếu tố

- Để gửi email, cần các thiết lập như SMTP.

- Có 2 cách thiết lập.
    - [Thiết lập từ màn hình (mặc định)](/vi/mailsend_setting?id=cách-thiết-lập-thiết-lập-từ-màn-hình) :   
    Nhập thiết lập SMTP trên màn hình thiết lập hệ thống. Khi gửi email bằng SMTP thông thường thì dùng cách này.
    
    - [Thiết lập bằng tệp config hoặc tệp env](/vi/mailsend_setting?id=cách-thiết-lập-thiết-lập-bằng-tệp-config-hoặc-tệp-env):  
    Dùng khi gửi email bằng cách không phải SMTP, như Amazon SES. Bạn sửa tệp thiết lập trên máy chủ hoặc dùng composer. ※Dành cho người dùng nâng cao.

### Cách thiết lập-Thiết lập từ màn hình
- Quản trị viên hệ thống mở màn hình thiết lập hệ thống.

- Nhập các thiết lập dưới đây.
![Màn hình thiết lập hệ thống](../img/system_setting/system_setting_mail.png)  

- Khi nhập "Tên máy chủ" rồi lưu, Exment dùng thiết lập trên màn hình để gửi email bằng SMTP.  
Dù "MAIL_MAILER" trong ".env" vẫn là giá trị ban đầu của Laravel, "log" (thiết lập không gửi email mà ghi ra log), Exment vẫn gửi bằng SMTP.  
※Khi "MAIL_MAILER" trong ".env" được đặt khác "log" (sendmail, ses, v.v.), cách gửi đó được dùng.  
※Khi trong ".env" có đặt "EXMENT_MAIL_SETTING_ENV_FORCE=true", thiết lập trên màn hình không được dùng. Chi tiết vui lòng xem [Thiết lập bằng tệp config hoặc tệp env](/vi/mailsend_setting?id=cách-thiết-lập-thiết-lập-bằng-tệp-config-hoặc-tệp-env).

※Ví dụ thiết lập SMTP (với Xserver): [tại đây](https://www.xserver.ne.jp/manual/man_mail_setting.php)  

※Ví dụ thiết lập SMTP (với Sakura Internet): [tại đây](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)  


### Cách thiết lập-Thiết lập bằng tệp config hoặc tệp env
Thông thường, Exment gửi email bằng các giá trị đã đăng ký ở "Cài đặt hệ thống" trên màn hình.  
Khi muốn gửi email bằng cách không phải SMTP, như Amazon SES, bạn dùng được cách tiêu chuẩn của Laravel (ghi thiết lập vào tệp ".env").  
Khi dùng cách này, hãy làm các thiết lập sau. ※Dành cho người dùng nâng cao.


- Mở tệp .env rồi nhập giá trị thiết lập sau.

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- Sau đó, hãy thiết lập driver gửi email của Laravel.

- Chúng tôi khuyên bạn nhập thêm các thiết lập sau vào .env.

~~~
MAIL_FROM_ADDRESS=(địa chỉ người gửi)
MAIL_FROM_NAME=(tên hiển thị của người gửi)
~~~

## Thiết lập bản ghi SPF
- Khi email đã gửi bị coi là thư rác, phần lớn là do thiết lập "bản ghi SPF" của tên miền chưa đủ. Hãy đăng ký bản ghi SPF trong thiết lập của tên miền.  
[Tham khảo 1](https://sendgrid.kke.co.jp/blog/?p=3509)  
[Tham khảo 2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/)  


## Gửi email thử nghiệm
- Với thiết lập ở trên, bạn gửi được email thử.  
Gửi được từ màn hình hoặc bằng lệnh.

### Thực hiện từ màn hình
- Quản trị viên hệ thống mở màn hình thiết lập hệ thống.

- Nhập địa chỉ nhận vào mục "Gửi email thử" rồi bấm [Gửi email thử].

![Màn hình thiết lập hệ thống](../img/system_setting/system_setting_mail_testmail.png)  

※Trước đó, cần lưu "Cài đặt email hệ thống" ở phía trên của trang. Hãy lưu một lần rồi mới gửi email thử.


### Thực hiện bằng lệnh
- Ở thư mục gốc của dự án, hãy chạy lệnh sau.

~~~
php artisan exment:notifytest --to=(địa chỉ nhận email)
~~~

### Khi gửi bị lỗi
- Log lỗi được ghi ra "storage/logs/laravel.log", vui lòng kiểm tra.
