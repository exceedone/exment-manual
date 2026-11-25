# Groupware (plugin chính thức)
"Groupware" là **plugin chính thức** cho phần groupware của Exment. Miễn phí. Hiện có 2 phần sau.

- **Web mail**: phần mềm email trên trình duyệt, như Outlook hay Gmail
- **Office**: mở và sửa tệp Word (.docx), Excel (.xlsx), PowerPoint (.pptx) bằng Office chạy trên trình duyệt ([ibisOffice](https://github.com/ibisjp/ibis-office) của ibis inc.)

- Mã nguồn và tài liệu: [exceedone/exment-plugins (groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- Giấy phép: GPL-3.0 (giống Exment). ibisOffice là AGPL-3.0-only ([Giấy phép của ibisOffice](/vi/plugin_groupware?id=giấy-phép-của-ibisoffice)).
- Tên trong danh sách plugin: Exment Plugin Groupware. Tên nội bộ là `ExmentGroupware`, URL là `/plugins/exment_groupware`.

<!-- Ảnh màn hình: web mail (img/plugin_groupware/gw_mail.png) và tệp mở bằng Office (img/plugin_groupware/gw_office.png). Chụp sau khi d9 xác nhận -->

## Web mail
Exment không có máy chủ email. Giống Outlook, nó kết nối với máy chủ email công ty đang dùng qua **IMAP** (nhận) và **SMTP** (gửi). Email vẫn nằm trên máy chủ, nên dùng song song được với Outlook và email trên điện thoại. Email không được sao chép vào Exment.

- Thư mục, danh sách (mới nhất trước, 50 thư một trang), khung đọc, tìm kiếm (tiêu đề, người gửi, người nhận, nội dung; tiếng Nhật cũng được), lọc chưa đọc / gắn cờ, gắn cờ, di chuyển (kéo vào thư mục cũng được), thư rác, xóa vào thùng rác, tạo thư mục
- Soạn mới, trả lời, trả lời tất cả, chuyển tiếp (kèm tệp đính kèm), Cc/Bcc, đính kèm (tối đa 25MB một thư), định dạng đơn giản, chữ ký, nháp. `Ctrl+Enter` để gửi
- Một người dùng được nhiều tài khoản. Số thư chưa đọc của hộp thư đến được kiểm tra mỗi phút.
- Đọc được nguyên email tiếng Nhật (ISO-2022-JP, Shift_JIS).

| Dịch vụ | Đăng nhập | Máy chủ |
| --- | --- | --- |
| Xserver | Mật khẩu (tên người dùng là địa chỉ email) | `sv****.xserver.jp`, IMAP 993 / SMTP 465 (SSL) |
| KAGOYA | Mật khẩu (tên người dùng là tên tài khoản email) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465 (SSL) |
| Microsoft 365 | Đăng nhập bằng Microsoft (OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587 (STARTTLS) |
| Gmail / Google Workspace | Đăng nhập bằng Google (OAuth 2.0), hoặc mật khẩu ứng dụng | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| Khác | Mật khẩu | Máy chủ IMAP / SMTP nào cũng được |

### Microsoft 365 và Google
Quản trị viên hệ thống đăng ký ứng dụng một lần và nhập vào cài đặt của plugin ("Cài đặt quản trị" → "Plugin" → "Exment Plugin Groupware" → "設定" (cài đặt)). Màn hình cài đặt hiện redirect URI cần đăng ký (`…/plugins/exment_groupware/mail/oauth/callback`).

- Microsoft: tạo web app ở "App registrations" của Azure portal. Cần các quyền ủy quyền `IMAP.AccessAsUser.All`, `SMTP.Send` của Office 365 Exchange Online, và `offline_access openid email profile`. Quản trị viên tenant phải cho phép xác thực SMTP (SMTP AUTH) cho người dùng đó.
- Google: tạo OAuth client ID (web application) trên Google Cloud console, scope là `https://mail.google.com/`. Với Google Workspace dùng trong nội bộ công ty, đặt ứng dụng là "Internal" (nội bộ) thì không cần Google thẩm định.

### Cách dùng
1. Mở "メール" (email) trên menu bên trái (hoặc `/plugins/exment_groupware/mail`).
2. Bấm "アカウントを追加する" (thêm tài khoản) và chọn dịch vụ.
3. Với Xserver, KAGOYA và dịch vụ khác, nhập mật khẩu. Với Microsoft 365 và Google, bấm "サインイン" (đăng nhập) rồi đăng nhập ở màn hình của từng dịch vụ.

### An toàn
- Mật khẩu và token được mã hóa bằng khóa ứng dụng (`APP_KEY`) rồi mới lưu.
- Với email HTML, các phần nguy hiểm được loại bỏ trên máy chủ, và email được hiển thị trong khung không chạy script. Ảnh bên ngoài không được tải cho đến khi bấm "画像を表示" (hiện ảnh).
- Chỉ kết nối được tới cổng email của địa chỉ trên Internet. Khi kết nối với máy chủ email trong mạng nội bộ, quản trị viên bật "社内のネットワークのメールサーバーを許可する" (cho phép máy chủ email trong mạng nội bộ) trong cài đặt.

## Office
### Tệp của chia sẻ tệp
Màn hình của tệp Word, Excel, PowerPoint trong [chia sẻ tệp](/vi/file_server) có nút "Mở bằng Office".

- Bấm thì trình soạn thảo mở ở tab mới. **Lưu** sẽ tạo phiên bản mới của tệp (phiên bản trước còn trong lịch sử phiên bản).
- Trong lúc mở để sửa, tệp ở trạng thái **check out**, người khác không sửa được. Đóng trình soạn thảo thì check in. Với người chỉ có quyền xem, hoặc với tệp người khác đang check out, tệp mở ở chế độ chỉ đọc.
- Nếu trong lúc đó người khác đã lưu thì việc lưu bị từ chối, nên không bị ghi đè làm mất.
- Khi máy chủ không có LibreOffice, trình soạn thảo được nhúng ở chế độ chỉ đọc vào phần xem trước trên màn hình của tệp. **Không cần LibreOffice** (ibisOffice chạy trong trình duyệt).
- Bấm nút đóng (×) ở góc trên bên phải thì check in và rời trình soạn thảo. Tab đã mở bằng "Mở bằng Office" được đóng; nếu không thì quay về màn hình của tệp (từ 0.4.4). Phần xem trước không có nút đóng.
- **Tệp không có nội dung** (0 byte, ví dụ tệp tạo bằng "New → Word document" của Windows) được mở như một tài liệu mới thuộc loại theo phần mở rộng của tên (docx, xlsx, pptx). Khi lưu, nó thành tài liệu thật mang tên đó (từ 0.4.4; trước đó được mở như bảng tính).

### Tệp đính kèm của dữ liệu
Tệp Word, Excel, PowerPoint đính kèm vào dữ liệu cũng xem được bằng Office trên trình duyệt (như tệp của công việc, wiki, dự án trong Quản lý dự án). Phần này chạy được cả khi không có chia sẻ tệp.

- Chỉ người tải xuống được tệp đó mới xem được.
- Người sửa được dữ liệu đó sẽ thấy "編集する" (sửa). Lưu thì nội dung tệp đính kèm được thay mới, địa chỉ không đổi. Trên dữ liệu có bình luận ghi ai đã sửa, kèm liên kết đến nội dung trước.
- Với Exment v7.2.1 trở đi, nội dung trước được giữ làm "Các phiên bản cũ" của tệp đính kèm ("Phiên bản n") ([thay thế và phiên bản cũ](/vi/data_details)). Mỗi tệp đính kèm giữ tối đa 10 bản (`EXMENT_DOCUMENT_VERSION_LIMIT`); vượt quá thì bản cũ nhất bị xóa trước, và khi xóa tệp đính kèm thì các bản này cũng bị xóa theo.
- Với Exment cũ hơn, nội dung trước được giữ thành tệp riêng, chỉ mở được từ liên kết trong bình luận. Xóa tệp đính kèm thì tệp này cũng không bị xóa.
- Chỉ sửa được tệp đính kèm (giá trị của cột tệp không thuộc đối tượng). Với site có `EXMENT_FILE_DELETE_USERONLY` là `true`, chỉ người đã tải tệp lên mới sửa được. Dung lượng lưu được tối đa 50MB (nếu giới hạn tải lên của Exment nhỏ hơn thì theo giới hạn đó).

## Quản lý tính năng (Exment v7.2.1 trở đi)
- Web mail hiện thành 1 dòng "メール" (`exment_groupware.mail`) trong "Cài đặt quản trị" → "[Quản lý tính năng](/vi/feature)". Quản trị viên hệ thống chọn sử dụng / không sử dụng và các nhóm vai trò được dùng.
- Với site đã cài plugin này từ trước, sau khi cập nhật vẫn là "Sử dụng". **Site cài mới bắt đầu từ "Không sử dụng"**, nên hãy đặt "メール" thành "Sử dụng" trong Quản lý tính năng (trong lúc không sử dụng, màn hình email trả về 404).
- Office theo tính năng chia sẻ tệp. Khi chia sẻ tệp là "Không sử dụng", "Mở bằng Office" của chia sẻ tệp không mở được.

## Yêu cầu
- Exment 7.1 trở lên (đã kiểm tra trên 7.1 và 7.2) và PHP 8.2 trở lên. Web mail và tệp đính kèm của dữ liệu chạy được trên cả hai.
- Để mở tệp của chia sẻ tệp, cần Exment có chia sẻ tệp (v7.2.1 trở đi). Nếu không có, chỉ riêng phần đó không chạy.
- Để cài ibisOffice, cần extension `zip` của PHP và thư mục `public/` của site ghi được (khoảng 125MB).
- Để dùng Office, cần trình duyệt có WebGPU (Chrome, Edge, hoặc Safari 26 trở lên) và site chạy HTTPS.
- Không cần LibreOffice hay Docker. Chạy được cả trên máy chủ thuê như XServer (máy chủ chỉ trao tệp, còn Office chạy trong trình duyệt).

## Cài đặt
1. Cài plugin: từ "Quản lý tính năng" với Exment v7.2.1 trở đi, hoặc tải lên tệp zip với bản cũ hơn. Vui lòng xem [Plugin chính thức](/vi/plugin_official).
2. Để dùng Office, mở màn hình của plugin (`/plugins/exment_groupware`) bằng quản trị viên hệ thống và bấm "ibisOffice 0.8.9 をインストールする" (cài ibisOffice 0.8.9). Bản phát hành của ibisOffice (khoảng 40MB, giải nén thành 125MB) được tải về, được kiểm tra có khớp SHA-256 đã định không, rồi được đặt vào `public/vendor/exment_groupware/ibisoffice/` của site.

Khi có nhiều máy chủ web, hoặc không ghi được vào `public/`, hãy công khai bản phát hành đã giải nén ở nơi khác, rồi nhập URL của thư mục có `index.html` vào "ibisOffice の場所（URL）" (vị trí của ibisOffice) trong cài đặt của plugin.

### Thiết lập máy chủ web
Trình soạn thảo có dung lượng lớn (`.wasm` là 92MB, nén gzip còn khoảng 24MB). Nếu gửi ở dạng nén và để trình duyệt lưu lại, việc tải về chỉ diễn ra 1 lần đầu. Nếu không, mỗi lần mở có thể phải chờ khoảng 10 giây.

**Apache (cả máy chủ thuê như XServer)**
- Từ 0.4.4, khi cài, plugin ghi các bản sao `.gz` của các tệp lớn và tệp `public/vendor/exment_groupware/ibisoffice/.htaccess`. Nội dung gồm: kiểu của `.wasm`, cache 1 năm, và gửi bản sao `.gz` cho trình duyệt nhận được gzip (khi không có bản sao thì nén bằng `mod_deflate`).
- Mọi thiết lập đều nằm trong `IfModule`, nên module không có sẽ được bỏ qua. Vì vậy, chỉ cần kiểm tra `.htaccess` dùng được ở đó (`AllowOverride All`; `.htaccess` của chính Exment cũng cần điều này).
- Với ibisOffice đã cài bằng 0.4.3 trở về trước, sau khi cập nhật lên 0.4.4, hãy cài lại lần nữa trên màn hình của plugin thì các bản sao và `.htaccess` sẽ được tạo.

**nginx**
nginx không đọc `.htaccess`. Hãy thêm nội dung sau vào thiết lập của site rồi nạp lại thiết lập.

```nginx
# Trong server { } của site, trước location /
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # gửi bản sao .gz đã ghi khi cài
    gzip on;                   # tệp không có bản sao thì nén tại chỗ
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # viết add_header trong location thì các add_header của server { } bị mất, nên viết lại
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**Với mọi máy chủ web**
- **Đặt X-Frame-Options là `SAMEORIGIN`, không phải `DENY`.** Trình soạn thảo là một `iframe` của cùng site, nên với `DENY` trình duyệt từ chối hiển thị (màn hình vẫn trống). `frame-ancestors` của Content-Security-Policy cũng đặt là `'self'`.
- Site có đặt Content-Security-Policy cần `script-src 'self' 'wasm-unsafe-eval'`.
- Không cần header COOP và COEP.

## Giấy phép của ibisOffice
ibisOffice là phần mềm của ibis inc., có giấy phép kép: AGPL-3.0-only và giấy phép thương mại. Plugin này chạy ibisOffice nguyên bản phát hành (không sửa đổi) trong một khung riêng, và không chứa ibisOffice trong plugin (tải về từ bản phát hành của ibis). Màn hình của trình soạn thảo và màn hình của plugin có hiển thị "Powered by ibisOffice".

## Mục liên quan
- [Plugin chính thức](/vi/plugin_official)
- [Chia sẻ tệp](/vi/file_server)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
