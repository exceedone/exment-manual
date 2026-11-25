# Khóa API
Người dùng tự tạo khóa API, và chương trình hoặc AI có thể gọi API của Exment bằng quyền của chính người đó. Khóa được gửi dưới dạng `Authorization: Bearer exk_...`, thay cho access token của OAuth.

※Tính năng này dùng được từ Exment v7.2.1.  
※Ban đầu là "Không sử dụng". Quản trị viên hệ thống hãy vào "Cài đặt: Hệ thống" → "[Quản lý tính năng](/vi/feature)", đặt "Khóa API của người dùng" thành sử dụng và chọn các nhóm vai trò được dùng.  
※Access token của OAuth ([Cài đặt API](/vi/api)) vẫn dùng được như trước.

## Tạo khóa của mình
Mở từ "Khóa API" trên màn hình "Cài đặt" của menu người dùng ở góc trên bên phải (URL là `/auth/api_keys`). Quản trị viên hệ thống cũng mở được từ danh sách của "Cài đặt ứng dụng API".

![Khóa API](../ja/img/api_key/api_key_mine.png)

| Mục | Nội dung |
|---|---|
| Tên | Tên cho biết khóa dùng vào việc gì |
| Phạm vi thao tác | "Chỉ đọc" (me, table_read, view_read, value_read, workflow_read, notify_read), hoặc tự chọn phạm vi |
| Bảng | Tất cả bảng bạn có thể xem, hoặc chỉ các bảng đã chọn. Khi chọn bảng, khóa chỉ gọi được API của các bảng đó và thông tin của chính bạn (me) |
| Địa chỉ IP được phép | Mỗi dòng một địa chỉ (có thể ghi dải địa chỉ). Để trống thì từ đâu cũng được (giới hạn IP của API cho toàn site vẫn có hiệu lực) |
| Ngày hết hạn | 7, 30, 90 (mặc định), 180 hoặc 365 ngày |
| Chứng chỉ máy khách | Khi nhập dấu vân tay SHA-256 của chứng chỉ, khóa chỉ dùng được khi có kèm chứng chỉ đó (chứng chỉ do máy chủ web phía trước kiểm tra) |
| Mật khẩu hiện tại | Khi tạo khóa, hãy nhập mật khẩu hiện tại |

- **Khóa chỉ được hiển thị 1 lần lúc tạo**. Hãy ghi lại và đừng đưa cho người khác. Sau đó không xem lại được.
- Khóa chỉ làm được **những việc người dùng đó làm được trên màn hình, trong phạm vi đã chọn cho khóa**.
- Mỗi người có tối đa 10 khóa dùng được.
- Danh sách hiển thị ngày giờ, IP và số lần sử dụng gần nhất. Khóa không còn cần thì hãy dừng từ danh sách.

## Dùng khóa
~~~
curl -H "Authorization: Bearer exk_xxxxxxxx" https://(URL của Exment)/api/data/(tên bảng)
~~~

※Với site có "/admin" trong URL, địa chỉ là `https://(URL của Exment)/admin/api/...` (["admin" trong URL](/vi/additional_prefix)).

Khóa không dùng được nữa khi: hết hạn, bị dừng, người dùng hoặc thông tin đăng nhập bị xóa, người dùng ra khỏi nhóm vai trò được dùng, không khớp với địa chỉ IP được phép hoặc chứng chỉ, hoặc gọi ra ngoài các bảng đã chọn (lý do không được trả về).

## Quản trị viên hệ thống: tất cả các khóa
Ở màn hình quản lý "Khóa API" (URL là `/api_keys`), bạn xem được các khóa API do người dùng của site này tạo, và có thể dừng ngay 1 khóa hoặc toàn bộ khóa của một người dùng.

![Quản lý khóa API](../ja/img/api_key/api_key_admin.png)

- Với người dùng SSO, dù đã bị dừng ở IdP, khóa vẫn dùng được cho đến khi hết hạn hoặc bị dừng ở đây. Khi có người nghỉ việc, hãy dùng "Dừng tất cả khóa của người dùng này".
- Với `ADMIN_API_KEY_REQUIRE_CLIENT_CERT=true` trong `.env`, có thể yêu cầu chứng chỉ máy khách cho mọi khóa. Khi đặt sau load balancer, v.v., hãy thiết lập `ADMIN_TRUST_PROXY_IPS` để so sánh bằng IP thật.

## Mục liên quan
- [Máy chủ MCP (dùng từ AI)](/vi/mcp)
- [Cài đặt API](/vi/api)
- [Quản lý tính năng](/vi/feature)
