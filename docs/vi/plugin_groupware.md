# Groupware (plugin chính thức)
"Groupware" là **plugin chính thức** cho phần groupware của Exment. Miễn phí. Hiện có 2 phần:

- **Web mail**: phần mềm email trên trình duyệt, như Outlook hay Gmail
- **Office**: mở và sửa tệp Word (.docx), Excel (.xlsx), PowerPoint (.pptx) bằng Office chạy trên trình duyệt ([ibisOffice](https://github.com/ibisjp/ibis-office) của ibis inc.)

- Mã nguồn và tài liệu: [exceedone/exment-plugins (groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- Giấy phép: GPL-3.0 (giống Exment). ibisOffice là AGPL-3.0-only.
- Tên trong danh sách plugin: Exment Plugin Groupware. Tên nội bộ `ExmentGroupware`, URL `/plugins/exment_groupware`.

<!-- Ảnh màn hình: web mail (img/plugin_groupware/gw_mail.png) và tệp mở bằng Office (img/plugin_groupware/gw_office.png) -->

## Web mail
Exment không có máy chủ email. Giống Outlook, nó kết nối với máy chủ email công ty đang dùng qua **IMAP** (nhận) và **SMTP** (gửi), nên dùng song song được với Outlook và điện thoại. Không sao chép email vào Exment.

- Thư mục, danh sách (mới nhất trước, 50 thư một trang), khung đọc, tìm kiếm (tiêu đề, người gửi, người nhận, nội dung), lọc chưa đọc / gắn cờ, gắn cờ, di chuyển (kéo vào thư mục cũng được), thư rác, xóa vào thùng rác, tạo thư mục.
- Soạn mới, trả lời, trả lời tất cả, chuyển tiếp (kèm tệp), Cc/Bcc, đính kèm (tối đa 25 MB một thư), định dạng đơn giản, chữ ký, nháp. `Ctrl+Enter` để gửi.
- Một người dùng được nhiều tài khoản. Số thư chưa đọc được kiểm tra mỗi phút.
- Đọc được email tiếng Nhật (ISO-2022-JP, Shift_JIS).

| Dịch vụ | Đăng nhập | Máy chủ |
| --- | --- | --- |
| Xserver | mật khẩu (tên người dùng = địa chỉ email) | `sv****.xserver.jp`, IMAP 993 / SMTP 465 (SSL) |
| KAGOYA | mật khẩu (tên người dùng = tên tài khoản email) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465 (SSL) |
| Microsoft 365 | đăng nhập bằng Microsoft (OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587 (STARTTLS) |
| Gmail / Google Workspace | đăng nhập bằng Google (OAuth 2.0), hoặc mật khẩu ứng dụng | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| Khác | mật khẩu | mọi máy chủ IMAP / SMTP |

### Microsoft 365 và Google
Quản trị viên hệ thống đăng ký ứng dụng một lần và nhập vào cài đặt của plugin ("Admin Setting" → "Plugin" → "Exment Plugin Groupware" → cài đặt). Màn hình cài đặt hiện redirect URI cần đăng ký (`…/plugins/exment_groupware/mail/oauth/callback`).

- Microsoft: tạo web app ở "App registrations" của Azure portal, với quyền ủy quyền `IMAP.AccessAsUser.All`, `SMTP.Send` của Office 365 Exchange Online và `offline_access openid email profile`. Quản trị viên tenant phải cho phép SMTP AUTH cho người dùng đó.
- Google: tạo OAuth client ID (web application) trên Google Cloud console, scope `https://mail.google.com/`.

### Cách dùng
1. Mở "メール" (email) trên menu bên trái (hoặc `/plugins/exment_groupware/mail`).
2. Bấm "アカウントを追加する" (thêm tài khoản) và chọn dịch vụ.
3. Với Xserver, KAGOYA và dịch vụ khác, nhập mật khẩu. Với Microsoft 365 và Google, bấm "サインイン" (đăng nhập) và đăng nhập ở trang của họ.

### An toàn
- Mật khẩu và token được mã hóa bằng khóa ứng dụng (`APP_KEY`).
- Email HTML được làm sạch trên máy chủ và hiển thị trong khung không chạy script. Ảnh bên ngoài chỉ tải khi bấm "画像を表示" (hiện ảnh).
- Chỉ kết nối được đến địa chỉ công khai trên cổng email. Với máy chủ email trong mạng nội bộ, quản trị viên bật "社内のネットワークのメールサーバーを許可する" trong cài đặt.

## Office
### Tệp của chia sẻ tệp
Trang của tệp Word, Excel, PowerPoint trong [chia sẻ tệp](/vi/file_server) có nút "Open in Office" (mở bằng Office).

- Mở trình soạn thảo ở tab mới. **Lưu** sẽ tạo phiên bản mới của tệp (bản cũ còn trong lịch sử phiên bản).
- Khi mở để sửa, tệp được **check out**, người khác không sửa được. Đóng trình soạn thảo thì check in. Người chỉ có quyền xem, hoặc tệp người khác đang check out, sẽ mở ở chế độ chỉ đọc.
- Nếu người khác đã lưu trong lúc đó thì việc lưu bị từ chối, không bị ghi đè.
- Khi máy chủ không có LibreOffice, trình soạn thảo được nhúng chỉ đọc trong phần xem trước.

### Tệp đính kèm của dữ liệu
Tệp Word, Excel, PowerPoint đính kèm vào dữ liệu cũng xem được bằng Office trên trình duyệt (như tệp của công việc, wiki, dự án trong Quản lý dự án). Phần này chạy được không cần chia sẻ tệp.

- Chỉ người tải xuống được tệp mới xem được.
- Người sửa được dữ liệu sẽ thấy "編集する" (sửa). Lưu sẽ thay nội dung tệp đính kèm, địa chỉ giữ nguyên. Dữ liệu có bình luận ghi ai đã sửa, kèm liên kết đến nội dung trước.
- Với Exment v7.2.1 trở đi, nội dung trước được giữ làm phiên bản cũ của tệp đính kèm ("Version n"): tối đa 10 (`EXMENT_DOCUMENT_VERSION_LIMIT`), cũ nhất bị xóa trước, và bị xóa cùng tệp đính kèm.
- Với Exment cũ hơn, nội dung trước được giữ thành tệp riêng, chỉ mở từ liên kết trong bình luận, và không bị xóa khi xóa tệp đính kèm.
- Chỉ sửa được tệp đính kèm (không phải giá trị của cột tệp). Lưu tối đa 50 MB.

## Quản lý tính năng (Exment v7.2.1 trở đi)
- Web mail hiện thành một dòng "メール" (`exment_groupware.mail`) trong "Admin Setting" → "[Feature Management](/vi/feature)". Quản trị viên hệ thống bật/tắt và chọn nhóm vai trò được dùng.
- Trang đã cài plugin từ trước vẫn bật sau khi cập nhật. **Trang cài mới bắt đầu ở trạng thái tắt**, hãy bật "メール" trong Feature Management (khi tắt, trang email trả về 404).
- Office theo tính năng chia sẻ tệp: khi chia sẻ tệp tắt, "Open in Office" của chia sẻ tệp không mở được.

## Yêu cầu
- Exment 7.1 trở lên (đã kiểm tra trên 7.1 và 7.2) và PHP 8.2 trở lên. Web mail và tệp đính kèm của dữ liệu chạy trên cả hai.
- Mở tệp của chia sẻ tệp cần Exment có chia sẻ tệp (v7.2.1 trở đi). Nếu không có, chỉ phần đó không chạy.
- Extension `zip` chỉ cần để cài ibisOffice.
- Office cần trình duyệt có WebGPU (Chrome, Edge, hoặc Safari 26 trở lên) và trang chạy HTTPS.

## Cài đặt
1. Cài plugin: từ Feature Management với Exment v7.2.1 trở đi, hoặc tải lên tệp zip với bản cũ hơn. Xem [Plugin chính thức](/vi/plugin_official).
2. Để dùng Office, mở trang plugin (`/plugins/exment_groupware`) bằng quản trị viên hệ thống và bấm "ibisOffice 0.8.9 をインストールする" (cài ibisOffice). Bản phát hành của ibisOffice (khoảng 40 MB, giải nén 125 MB) được tải về, kiểm tra SHA-256 cố định, rồi đặt vào `public/vendor/exment_groupware/ibisoffice/`.

Khi có nhiều máy chủ web, hoặc không ghi được vào `public/`, hãy công khai bản đã giải nén ở nơi khác và nhập URL của thư mục có `index.html` vào "ibisOffice の場所（URL）" trong cài đặt của plugin.

### Thiết lập máy chủ web
- Gửi `.wasm` với `application/wasm`.
- Nén `.wasm` và `.js` bằng gzip hoặc Brotli (wasm 92 MB, nén còn khoảng 1/4).
- Thư mục có số phiên bản nên cache lâu được (`Cache-Control: public, max-age=31536000, immutable`).
- Trang có Content-Security-Policy cần `script-src 'self' 'wasm-unsafe-eval'`.

## Mục liên quan
- [Plugin chính thức](/vi/plugin_official)
- [Chia sẻ tệp](/vi/file_server)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
