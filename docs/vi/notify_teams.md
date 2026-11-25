# Gửi thông báo vào chat cá nhân trên Teams

Bạn có thể gửi thông báo thẳng vào **chat cá nhân trên Teams** của từng người (từ Exment 7.2.6).
Exment gửi nội dung thông báo tới **quy trình** (Workflows, Power Automate) của Teams, và quy trình đăng vào chat của người đó với tư cách bot (Flow bot).

- Nội dung được gửi gồm tiêu đề, nội dung và liên kết tới dữ liệu. Trên Teams, thông báo đến dưới dạng thẻ (Adaptive Card): tiêu đề là dòng đầu đề in đậm, nội dung giữ nguyên đoạn văn và danh sách đánh số, kèm nút "Mở"
- Tiêu đề và nội dung của mẫu thông báo được dùng theo ngôn ngữ của người nhận ([ngôn ngữ của người dùng](/vi/user_locale))
- Tài khoản Teams nhận thông báo là **địa chỉ email** của người dùng Exment

> Cách gửi vào kênh hiện nay (Microsoft Teams của [Webhook](/vi/notify_webhook)) dùng Office 365 connector, thứ mà Microsoft đang hướng tới việc ngừng cung cấp. Cùng một quy trình này cũng gửi được vào kênh ("Khi gửi vào kênh" ở dưới).

## 1. Tạo quy trình trên Teams

Một người trong tổ chức Teams tạo quy trình (quy trình chạy bằng tài khoản của người tạo).

1. Mở **Quy trình** (Workflows) từ "Ứng dụng" ở bên trái Teams, chọn "Tạo" → "Tạo từ đầu"
2. Chọn trigger **"Khi nhận được yêu cầu webhook Teams"** (When a Teams webhook request is received)
   - Đặt "Người có thể kích hoạt flow" là **"Bất kỳ ai"** (Anyone). Với yêu cầu từ Exment, quy trình chỉ dựa vào việc có biết địa chỉ hay không để tiếp nhận. **Hãy giữ bí mật địa chỉ này**
3. Ở "Bước mới", thêm **"Đăng thẻ vào cuộc trò chuyện hoặc kênh"** (Post card in a chat or channel)
   - Người đăng: **Flow bot**
   - Nơi đăng: **Chat với Flow bot**
   - Người nhận: nhập `triggerBody()?['to_email']` vào "Biểu thức"
   - Adaptive Card: nhập `triggerBody()?['card']` vào "Biểu thức"
4. Khi lưu, trigger sẽ có **URL HTTP POST**. Hãy sao chép URL này

### JSON mà Exment gửi

Quy trình nhận JSON có dạng sau. Thẻ (`card`) do Exment tạo, nên quy trình chỉ cần đăng nguyên như vậy.

```json
{
  "to_email": "user1@example.com",
  "title": "Công việc đã được cập nhật (ISS00423)",
  "body": "**Không đăng nhập được**\n\n1. Đã đổi trạng thái thành \"Đang xử lý\"",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "Seiji Noro",
  "locale": "vi",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

Khi dùng "JSON schema của nội dung yêu cầu" (Request Body JSON Schema) của trigger, hãy nhập nội dung sau.

```json
{
  "type": "object",
  "properties": {
    "to_email": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "url": { "type": ["string", "null"] },
    "sender": { "type": ["string", "null"] },
    "locale": { "type": "string" },
    "card": { "type": "object" }
  }
}
```

## 2. Thiết lập trên Exment

1. Ở "Cài đặt quản trị" → "Quản lý tính năng", chuyển **"Thông báo Teams (chat cá nhân)"** sang "Sử dụng" (ban đầu là "Không sử dụng")
2. Ở "Cài đặt hệ thống" (cài đặt chi tiết), nhập URL đã sao chép vào "Địa chỉ mới" của **"Teams (quy trình)"** rồi lưu
   - Địa chỉ là giá trị bí mật, nên sau khi lưu sẽ không hiện trên màn hình (chỉ hiện "Đã thiết lập"). Nếu để trống rồi lưu, địa chỉ hiện tại tiếp tục được dùng. Để xóa, bật "Xóa địa chỉ" rồi lưu
   - Địa chỉ cũng không xuất hiện trong nhật ký thao tác
3. Trong thiết lập thông báo ([Thông báo](/vi/notify)), chọn **"Teams (cá nhân)"** ở "hành động thông báo", rồi chọn người nhận (cột người dùng/tổ chức, người tạo, v.v.)

## Khi gửi vào kênh

Đặt "Nơi đăng" của quy trình là **kênh**, rồi chọn nhóm (team) và kênh (không cần biểu thức người nhận). Phía Exment, hãy đặt người nhận của thông báo đó là 1 người (mỗi người được gửi 1 lần, nên nếu có nhiều người nhận thì cùng một thẻ sẽ được đăng nhiều lần).

## Khi thông báo không đến

- Nếu log của Exment (storage/logs) có dòng "the Teams workflow answered …", hãy xem lý do ở lịch sử chạy của quy trình (Quy trình của Teams → flow đó → lịch sử chạy)
- Nếu không tìm thấy người nhận, hãy kiểm tra địa chỉ email của người dùng Exment có trùng với tài khoản Teams (địa chỉ email của tổ chức) không
- Nếu không có gì xảy ra, hãy kiểm tra "Thông báo Teams (chat cá nhân)" trong Quản lý tính năng đã là "Sử dụng" chưa, và trong Cài đặt hệ thống đã nhập địa chỉ chưa
