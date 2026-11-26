# Thông báo tới LINE WORKS

Thông báo có thể được bot **LINE WORKS** gửi tới kênh hoặc tới từng người (Exment 7.3.0 trở lên).
Dùng bot của LINE WORKS API 2.0.

- **LINE WORKS (kênh)**: gửi tới kênh (phòng trò chuyện) có bot
- **LINE WORKS (cá nhân)**: gửi tới từng người dùng của thông báo, tới ID LINE WORKS của người đó (mặc định là email), bằng ngôn ngữ của người nhận ([ngôn ngữ người dùng](/vi/user_locale))
- Gửi tiêu đề, nội dung (chỉ văn bản) và liên kết tới dữ liệu (tối đa 2000 ký tự)

## 1. Chuẩn bị trong LINE WORKS Developers Console

Quản trị viên LINE WORKS thực hiện.

1. Tạo **ứng dụng** trong [LINE WORKS Developers Console](https://dev.worksmobile.com/). Ghi lại **Client ID** và **Client Secret**
2. Thêm `bot` vào **OAuth Scopes** của ứng dụng
3. Tạo **Service Account** của ứng dụng và tải **Private Key**. Ghi lại Service Account (`xxxx.serviceaccount@...`)
4. Tạo **Bot** và ghi lại **Bot ID**
5. Trong trang quản trị LINE WORKS, thêm bot vào tenant và công khai cho người dùng
6. Để gửi tới kênh, mời bot vào phòng trò chuyện và ghi lại **ID kênh**

> Client Secret và Private Key là bí mật: ai có chúng có thể gửi với tư cách bot.

## 2. Cài đặt trong Exment

Quản trị viên hệ thống thực hiện.

1. Bật **"Thông báo tới LINE WORKS"** trong [Quản lý chức năng](/vi/feature) (mặc định tắt)
2. Trong "Cài đặt hệ thống" → "Nâng cao", nhập Client ID, Client Secret, Service Account, Private Key và Bot ID vào **"LINE WORKS (bot)"** rồi lưu
    - Với Private Key, dán nguyên nội dung tệp khóa đã tải về
    - Client Secret và Private Key được lưu mã hóa và không hiện lại. Để đổi, nhập giá trị mới; để xóa, bật "Xóa"
3. Khi gửi cá nhân tới ID LINE WORKS không phải email, chọn cột người dùng chứa ID đó trong **"Cột chứa ID LINE WORKS"**

## 3. Tạo thông báo

Chọn trong "Hành động thông báo" của [cài đặt thông báo](/vi/notify).

- **LINE WORKS (kênh)**: nhập ID kênh vào "ID kênh LINE WORKS"
- **LINE WORKS (cá nhân)**: chọn "Đích thông báo", giống như email

## Khi không gửi được

- Hệ thống thử gửi lại vài lần (nếu có queue worker: sau 1 phút và 5 phút)
- Nếu vẫn không gửi được, người tạo thông báo (hoặc quản trị viên hệ thống) nhận thông báo trên màn hình kèm người nhận và lý do
- Địa chỉ được kiểm tra như [Webhook](/vi/notify_webhook). Máy chủ cần kết nối tới `auth.worksmobile.com` và `www.worksapis.com` qua https
