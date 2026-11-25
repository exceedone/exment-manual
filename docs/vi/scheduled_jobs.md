# Tác vụ theo lịch
Đây là danh sách các tác vụ mà cron của máy chủ (`php artisan schedule:run`) chạy vào giờ đã định. Mở ở "Cài đặt: Hệ thống" → "Tác vụ theo lịch" (URL là `/scheduled_jobs`).

※Màn hình này dùng được từ Exment v7.2.6 trở đi.  
※Chỉ quản trị viên hệ thống xem được màn hình này.

## Bắt đầu dùng
Ở [Quản lý tính năng](/vi/feature), chuyển "Tác vụ theo lịch" sang "Sử dụng". Lúc đầu là "không sử dụng". Khi không sử dụng, màn hình này không mở được (thành 404).

Các lần chạy chỉ được ghi lại trong thời gian tính năng đang được sử dụng.

## Trạng thái của cron
Màn hình hiện thời điểm `schedule:run` chạy lần cuối. Khi đã không chạy từ 10 phút trở lên, màn hình hiện cảnh báo. Khi đó, thông báo, sao lưu tự động, batch của plugin, v.v. đang dừng. Hãy thêm 1 dòng sau vào cron của máy chủ (cũng kiểm tra được ở [Tinh chỉnh hiệu năng](/vi/tuning)).

~~~
* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1
~~~

## Danh sách tác vụ
| Mục | Nội dung hiện |
|---|---|
| Tác vụ | Tên tác vụ của Exment và lệnh (batch của plugin là "Batch của plugin: tên") |
| Thời gian chạy | Hiện bằng lời, như "Mỗi 5 phút", "Mỗi giờ", "Hằng ngày lúc 3:30" |
| Lần chạy tiếp theo | Hiện theo múi giờ của bạn |
| Trạng thái | Với tác vụ không chạy, lý do cũng hiện ra (ví dụ: "Xác nhận an toàn" không được dùng) |
| Lần chạy cuối và các lần chạy gần đây | Bắt đầu, kết thúc, thời lượng, kết quả, mã thoát, người chạy, 4KB cuối của đầu ra |

Với mỗi tác vụ, 20 lần chạy gần nhất được giữ lại. Số lần này đổi được bằng `EXMENT_SCHEDULED_JOBS_KEEP_RUNS` trong `.env`.

## Khi thất bại liên tiếp
Tác vụ thất bại 3 lần liên tiếp hiện bằng màu đỏ. Quản trị viên hệ thống được báo chỉ 1 lần, bằng thông báo ở phía trên màn hình và bằng email. Khi tác vụ thành công thì trở lại bình thường, và khi lại thất bại liên tiếp thì hệ thống lại báo. Số lần này đổi được bằng `EXMENT_SCHEDULED_JOBS_ALERT_FAILURES` trong `.env`.

## Chạy ngay
Khi bấm "Chạy ngay", tác vụ đó chạy ngay ở chế độ nền. Tác vụ đang chạy thì không chạy chồng lên được.

Tuy nhiên, với tác vụ không có thiết lập chặn chạy chồng (`exment:schedule` mỗi giờ, và batch của plugin), lần chạy theo giờ đã định không chờ "Chạy ngay". Nếu bấm ngay trước giờ chạy (đúng đầu mỗi giờ, v.v.), hai lần chạy có thể diễn ra cùng lúc. Đừng bấm khi gần đến giờ chạy.

Trong các trường hợp sau, không bấm được nút (lý do được hiện ra). Khi đó cron của máy chủ vẫn chạy các tác vụ.
- Máy chủ mà PHP không chạy được lệnh bên ngoài (máy chủ thuê không dùng được `proc_open`, v.v.)
- Môi trường demo

## Lệnh
~~~
php artisan exment:schedule-status          # Hiện danh sách dạng bảng
php artisan exment:schedule-status --json   # Hiện lần chạy cuối và số lần thất bại liên tiếp của từng tác vụ dạng JSON
~~~

Với SaaS, mỗi tenant chỉ thấy các tác vụ và các lần chạy của tenant đó.
