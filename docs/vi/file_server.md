# Chia sẻ tệp (File sharing)
Chia sẻ thư mục và tệp trong workspace của từng nhóm, có phân quyền theo thư mục, quản lý phiên bản, xem trước và thùng rác. Dùng giống như thư viện tài liệu của Box hay SharePoint.  
Tệp được lưu ở nơi Exment đang lưu tệp (máy cục bộ, S3, Azure, FTP…, theo thiết lập hiện tại).

※Tính năng này dùng được từ Exment v7.2.0 trở đi. <!-- TODO: phiên bản có chia sẻ tệp -->

## Bắt đầu sử dụng
Chia sẻ tệp ban đầu ở trạng thái "không dùng". Khi quản trị viên hệ thống bật "File Server" trong "Admin Setting" (cài đặt quản trị) → "[Feature Management](/vi/feature)" (quản lý tính năng), mục "File Server" sẽ hiện trên menu bên trái. Người được dùng (nhóm vai trò) cũng được chọn trong Feature Management.

<!-- Ảnh màn hình: trang đầu của chia sẻ tệp (img/file_server/file_server_top.png) -->

## Workspace
Workspace là nơi một nhóm lưu tệp (tương đương một site trong SharePoint).

- Tạo bằng "New workspace" (workspace mới). Người tạo trở thành quản lý của workspace. Ai được tạo workspace thì quyết định bằng `EXMENT_FILE_SERVER_WORKSPACE_CREATE` trong `.env` (`admin`: chỉ quản trị viên hệ thống, `all`: tất cả).
- Trong "Workspace settings" (cài đặt workspace), quyết định các mục sau.

| Mục | Nội dung |
| --- | --- |
| Tên, mô tả | Tên và mô tả của workspace. |
| Members (thành viên) | Người dùng, tổ chức và quyền của họ (View, Upload, Edit, Manage). Cần ít nhất 1 người quản lý. |
| Space limit (GB) (giới hạn dung lượng) | Để trống là không giới hạn. Phiên bản cũ và thùng rác cũng được tính. |
| Days in the trash (số ngày trong thùng rác) | Quá số ngày này thì xóa hẳn. 0 là giữ cho đến khi xóa bằng tay. |
| Versions kept (số phiên bản giữ lại) | Số phiên bản cũ giữ lại cho mỗi tệp. |
| Columns (metadata) (cột) | Các cột gắn cho tệp trong workspace này. Xem mục "Cột (metadata)" bên dưới. |

Trang đầu hiển thị các workspace bạn mở được, cùng "Favorites" (yêu thích), "Files changed lately" (tệp mới thay đổi) và "Shared with me" (được chia sẻ với tôi).

## Thư mục và tệp
- Dùng "New folder" (thư mục mới), "Upload files" (tải tệp lên), "Upload a folder" (tải thư mục lên), hoặc kéo và thả. Tệp lớn được gửi theo từng phần, nên nếu bị ngắt giữa chừng vẫn gửi tiếp được.
- Có thể đổi tên, di chuyển, sao chép, tải xuống (nhiều tệp thành ZIP), xóa và thêm vào yêu thích.
- Mục đã xóa vào "Trash" (thùng rác), từ đó có thể "Restore" (khôi phục) hoặc "Delete for good" (xóa hẳn).

<!-- Ảnh màn hình: bên trong thư mục (img/file_server/file_server_folder.png) -->

## Quyền
Có 4 quyền. Quyền cao hơn làm được mọi việc của quyền thấp hơn.

| Quyền | Làm được gì |
| --- | --- |
| View (xem) | Xem và tải xuống |
| Upload (tải lên) | Thêm tệp |
| Edit (sửa) | Đổi tên, di chuyển, xóa, tải phiên bản mới, tạo liên kết chia sẻ |
| Manage (quản lý) | Đổi quyền, hủy check out, phê duyệt |

- Thư mục và tệp kế thừa quyền của thư mục cha (hoặc workspace).
- "Stop inheriting permissions" (ngừng kế thừa quyền) để thư mục/tệp có quyền riêng; "Inherit permissions" (kế thừa quyền) để trở lại như cũ.
- Quản trị viên hệ thống quản lý được mọi workspace.

## Phiên bản và check out
- Tải lên tệp cùng tên, hoặc "Upload a new version" (tải phiên bản mới), sẽ tạo phiên bản mới. Trong "Version history" (lịch sử phiên bản), có thể tải phiên bản cũ, hoặc "Restore this version" (khôi phục phiên bản này) để lưu nội dung đó thành phiên bản mới.
- "Check out" ngăn người khác sửa hoặc xóa tệp cho đến khi bạn "Check in". Người có quyền Manage có thể "Discard check out" (hủy check out).

## Xem trước
Ảnh, video, âm thanh, PDF và văn bản xem được ngay trên màn hình. Tệp Office (docx, xlsx, pptx) hiển thị tùy theo máy chủ.

| Trên máy chủ | Tệp Office |
| --- | --- |
| Có LibreOffice (`EXMENT_FILE_SERVER_SOFFICE_PATH`) | Hiển thị dưới dạng PDF. |
| Có plugin chính thức "Groupware" | "Open in Office" (mở bằng Office) mở chỉ đọc bằng Office trên trình duyệt (ibisOffice). Nếu có cả LibreOffice thì chuyển bằng tab. |
| Không có cả hai | Chỉ hiển thị chữ trong tệp. Hãy tải xuống để xem đúng bố cục. |

※Các tệp html, svg… không hiển thị trên màn hình vì lý do an toàn, chỉ tải xuống được.

※Tệp nhận qua request link thì khi mở không tạo xem trước và không trích chữ. Chỉ tạo khi người có quyền Manage bấm "Make the preview" (tạo xem trước).

<!-- Ảnh màn hình: trang của một tệp (img/file_server/file_server_file.png) -->

## Liên kết chia sẻ cho người bên ngoài
Đưa tệp, thư mục cho người bên ngoài không đăng nhập, hoặc nhận tệp từ họ. Tạo liên kết ở mục "Share links for people outside" (liên kết chia sẻ cho người bên ngoài) trên trang của tệp.

| Loại | Nội dung | Ai tạo được |
| --- | --- | --- |
| Share link (người bên ngoài xem và tải xuống) | Với thư mục, hiển thị cả nội dung bên trong. Bỏ "Allow the download" (cho phép tải xuống) thì chỉ xem trước. | Người có quyền Edit |
| Request link (người bên ngoài tải lên) | Người bên ngoài đưa tệp vào thư mục. Họ không thấy tệp của người khác. Tệp cùng tên không bị ghi đè mà thành "tên (2)". | Người có quyền Edit (từ 7.2.1; liên kết do người chỉ có quyền Upload tạo trước đây sẽ không mở được) |

- Có thể đặt ngày hết hạn, mật khẩu và số lần được mở. Mật khẩu từ 8 ký tự trở lên (`EXMENT_FILE_SERVER_SHARE_PASSWORD_MIN`). "Take back" (thu hồi) để vô hiệu bất cứ lúc nào.
- Liên kết không hợp lệ (hết hạn, đã thu hồi, quá số lần…) luôn hiện "The link cannot be opened" (không mở được liên kết).
- Với người trong công ty, dùng "Copy the internal link" (sao chép liên kết nội bộ): chỉ người có quyền xem tệp mới mở được.
- Muốn tắt liên kết chia sẻ, ghi `EXMENT_FILE_SERVER_EXTERNAL_SHARE=false` vào `.env`. Muốn bắt buộc có ngày hết hạn, ghi số ngày vào `EXMENT_FILE_SERVER_SHARE_MAX_DAYS`.
- Liên kết chia sẻ (`/share/...`) dành cho người bên ngoài nên mặc định không áp dụng bộ lọc IP web của cài đặt hệ thống. Muốn chỉ mở được từ trong công ty, ghi `EXMENT_FILE_SERVER_SHARE_WEB_IP_FILTER=true` vào `.env`. Thiết lập này được đọc khi tạo route: trang dùng `php artisan route:cache` hãy chạy lại sau khi đổi.

## Cột (metadata)
Trong cài đặt workspace, tạo các cột cho tệp (như "Khách hàng", "Loại").

- Kiểu: văn bản, nhiều dòng, số, ngày, lựa chọn, nhiều lựa chọn, có/không. Có thể đặt bắt buộc, giá trị mặc định và có hiện trong danh sách hay không.
- Danh sách có thể lọc theo cột (cả "chưa nhập"), sắp xếp và nhóm.

## Gắn với dữ liệu
Ở "Related data" (dữ liệu liên quan) trên trang của tệp, gắn tệp với dữ liệu của bảng Exment (như khách hàng). Trang chi tiết của dữ liệu đó sẽ có mục "tệp của chia sẻ tệp". Cả hai chỉ hiện những gì người dùng có quyền xem.

## Tìm kiếm
"Search" (tìm kiếm) tìm tệp theo tên, giá trị cột và chữ trong tệp. Chỉ hiện tệp người dùng có quyền xem.

- Chữ được lấy từ tệp văn bản, HTML, Office (docx, xlsx, pptx) và OpenDocument. PDF cần pdftotext (`EXMENT_FILE_SERVER_PDFTOTEXT_PATH`); ảnh và PDF quét cần tesseract (`EXMENT_FILE_SERVER_OCR_PATH`).
- Mặc định tìm trong cơ sở dữ liệu. Với `EXMENT_FILE_SERVER_MEILI=true` sẽ dùng [Meilisearch (English)](/additional_meilisearch) (chỉ mục riêng `exment_files`, tách khỏi chỉ mục của dữ liệu).

## Phê duyệt, lưu giữ pháp lý, thời hạn lưu giữ
<!-- TODO: kiểm tra khi P5 (exment PR #1859) được đưa vào -->
| Tính năng | Nội dung |
| --- | --- |
| Phê duyệt | Đặt "cần phê duyệt" trong "Rules" (quy tắc) của thư mục thì tệp đưa vào sẽ ở "Waiting for approval" (chờ phê duyệt). Đến khi được duyệt, chỉ người tải lên và người quản lý thấy được. Người có quyền Manage chọn "Approve" (duyệt) hoặc "Send back" (trả lại). |
| Legal hold (lưu giữ pháp lý) | Gắn cho workspace, thư mục hoặc tệp thì không xóa được, phiên bản cũ cũng được giữ. |
| Thời hạn lưu giữ | Đặt số ngày trong cài đặt workspace thì tệp không xóa được trong số ngày đó. |
| Người được tải xuống | Người có quyền thấp hơn mức đã chọn chỉ xem trước được. |
| Watermark | Hiển thị tên người xem và thời gian lên bản xem trước. |
| Audit log (nhật ký thao tác) | Ghi lại xem, tải xuống, tải lên, xóa, đổi quyền, liên kết chia sẻ…; xuất được CSV. |
| Follow (theo dõi), bình luận | Khi workspace, thư mục hoặc tệp đang theo dõi thay đổi, sẽ có thông báo chuông và email. `@mã người dùng` trong bình luận sẽ báo cho người đó. |

## Máy chủ
- **Việc hằng ngày**: tệp trong thùng rác quá số ngày được xóa bằng `php artisan exment:file-server-purge` (3:30 mỗi ngày). Hãy thiết lập [lịch tác vụ (English)](/additional_task_schedule).
- **Queue**: ảnh thu nhỏ, xem trước và trích chữ chạy trên queue.
- **Trích chữ lại**: `php artisan exment:file-server-index` trích chữ của các tệp chưa làm và dựng lại chỉ mục Meilisearch.
- **Phần mềm khác** (đều không bắt buộc): LibreOffice (xem trước Office), pdftotext (chữ trong PDF), tesseract (OCR), Meilisearch (tìm nhanh).
- **Chạy LibreOffice không có mạng**: tệp Office có thể đọc URL bên ngoài. Ghi lệnh đặt trước LibreOffice vào `EXMENT_FILE_SERVER_SOFFICE_PREFIX` để chuyển đổi không có mạng (ví dụ `unshare -rn`, `firejail --net=none --quiet`). Hãy kiểm tra trước lệnh đó chạy được trên máy chủ.
- **Giới hạn tải lên**: tệp lớn được gửi theo từng phần. Mỗi tệp tối đa 2 GB (`EXMENT_FILE_SERVER_MAX_FILE_SIZE`), mỗi người tối đa 20 lượt tải chưa xong (`EXMENT_FILE_SERVER_MAX_UPLOADS`), tổng cộng tối đa 10 GB (`EXMENT_FILE_SERVER_MAX_UPLOAD_BYTES`). Lượt tải chưa xong cũng được tính vào dung lượng của workspace. Lượt nào 60 phút không có gì gửi đến thì không tính, và bị xóa khi người đó bắt đầu lượt mới.

## Thiết lập chính (.env)
| Thiết lập | Mặc định | Nội dung |
| --- | --- | --- |
| `EXMENT_FILE_SERVER_WORKSPACE_CREATE` | `admin` | Ai được tạo workspace (`admin`, `all`) |
| `EXMENT_FILE_SERVER_MAX_FILE_SIZE` | `2147483648` (2 GB) | Kích thước tối đa của một tệp (byte; 0 = không giới hạn; 2 GB từ 7.2.1) |
| `EXMENT_FILE_SERVER_MAX_UPLOADS` | `20` | Số lượt tải chưa xong của một người |
| `EXMENT_FILE_SERVER_MAX_UPLOAD_BYTES` | `10737418240` (10 GB) | Tổng byte các lượt tải chưa xong của một người (0 = không giới hạn) |
| `EXMENT_FILE_SERVER_EXTERNAL_SHARE` | `true` | Có dùng liên kết chia sẻ không |
| `EXMENT_FILE_SERVER_SHARE_MAX_DAYS` | `0` | Số ngày tối đa của liên kết chia sẻ (0 = cho phép không hết hạn) |
| `EXMENT_FILE_SERVER_SHARE_PATH` | `share` | Phần đầu URL của liên kết chia sẻ |
| `EXMENT_FILE_SERVER_SHARE_PASSWORD_MIN` | `8` | Số ký tự ngắn nhất của mật khẩu liên kết chia sẻ |
| `EXMENT_FILE_SERVER_SHARE_WEB_IP_FILTER` | `false` | Có áp dụng bộ lọc IP web cho liên kết chia sẻ không |
| `EXMENT_FILE_SERVER_SOFFICE_PATH` | không có | Vị trí của LibreOffice (soffice) |
| `EXMENT_FILE_SERVER_SOFFICE_PREFIX` | không có | Lệnh đặt trước LibreOffice (để chạy không có mạng) |
| `EXMENT_FILE_SERVER_PDFTOTEXT_PATH` | không có | Vị trí của pdftotext |
| `EXMENT_FILE_SERVER_OCR_PATH` | không có | Vị trí của tesseract |
| `EXMENT_FILE_SERVER_MEILI` | `false` | Có dùng Meilisearch không |
| `EXMENT_FILE_SERVER_AUDIT` | `true` | Có ghi nhật ký thao tác không |
| `EXMENT_FILE_SERVER_NOTIFY` | `true` | Có gửi thông báo theo dõi không |

## Mục liên quan
- [Quản lý tính năng](/vi/feature)
- [File save place (English)](/additional_file_saveplace)
- [Task schedule (English)](/additional_task_schedule)
- [Nhóm vai trò / Thiết lập quyền](/vi/role_group)
