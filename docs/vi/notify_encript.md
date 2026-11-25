# Mã hóa tệp đính kèm khi thông báo
Thông báo qua email có thể kèm tệp đính kèm.  
Khi thiết lập ở đây, hệ thống sẽ tự động mã hóa tệp đính kèm đó rồi mới gửi (tệp trở thành tệp zip đã mã hóa).

Có 2 việc cần thiết lập.

1. Thêm 1 dòng vào `.env` (chung cho Windows và Linux)
2. Cài phần mềm tạo zip trên máy chủ (Windows và Linux khác nhau)

## Chung cho Windows và Linux

- Thêm nội dung sau vào `.env`.

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- Để tạo tệp zip đã mã hóa, hãy cài 7-zip.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- Cài zip bằng lệnh quản lý package của hệ điều hành, như yum.

~~~
// Trường hợp CentOS
yum install zip
~~~

Đến đây, thiết lập đã xong.
