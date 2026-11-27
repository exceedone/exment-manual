# Support Desk (plugin chính thức)
"Exment Support Desk" là **plugin chính thức** của Exment dành cho hỗ trợ IT và help desk. Yêu cầu từ khách hàng (email, biểu mẫu tiếp nhận, điện thoại) và sự cố phát hiện qua giám sát hay nhật ký lỗi được quản lý bằng "ticket", và **tiến độ được chia sẻ với khách hàng không cần đăng nhập**. Miễn phí.

- Mã nguồn và tài liệu: [exceedone/exment-plugins (support-desk)](https://github.com/exceedone/exment-plugins/tree/main/support-desk)
- Giấy phép: GPL-3.0 (giống Exment)
- Tên trong danh sách plugin: Exment Plugin Support Desk（サポートデスク）. Tên nội bộ `ExmentSupportDesk`, URL `/plugins/exment_support_desk`.

<!-- Ảnh màn hình: hộp tiếp nhận của nhân viên (img/plugin_support_desk/sd_desk.png). Chụp sau khi 2b xác nhận -->

## Chức năng
| Lĩnh vực | Nội dung |
| --- | --- |
| Màn hình nhân viên | **Hộp tiếp nhận** riêng (3 cột: loại hộp tiếp nhận và số lượng, danh sách ticket, hội thoại và các mục). Chuyển ticket không tải lại trang. Phím tắt (`J`/`K` lên/xuống, `R` trả lời, `N` ghi chú nội bộ, `Ctrl+Enter` gửi, `A` nhận việc, `E` giải quyết, `?` danh sách), tự lưu nháp, chế độ tối, giao diện điện thoại |
| Tiếp nhận | **Email** (IMAP mỗi 5 phút; hỗ trợ ISO-2022-JP, Shift_JIS, tệp đính kèm), **biểu mẫu tiếp nhận** (không đăng nhập, gợi ý FAQ trước), **điện thoại / đến trực tiếp** (nhân viên nhập), **giám sát / nhật ký lỗi** (API; lỗi giống nhau gộp thành 1 ticket và đếm số lần), **hạn của tài sản IT** (tự tạo ticket khi bảo trì, giấy phép, tên miền, chứng chỉ sắp hết hạn) |
| Trao đổi | Trả lời đến khách qua email; khách trả lời lại thì vào cùng ticket. Phần trích dẫn được tự bỏ. **Ghi chú nội bộ** khách không thấy. **Mẫu trả lời** và **gợi ý kiến thức** bên cạnh ô trả lời |
| Tránh xử lý trùng | Hiển thị khi nhân viên khác đang viết trả lời cho cùng ticket |
| Chia sẻ với khách hàng | **Liên kết không cần đăng nhập** (chỉ thấy 1 ticket, có hạn, thu hồi được, có nhật ký mở). Ticket quan trọng dùng **mã xác nhận** (6 chữ số qua email). Khách đăng nhập dùng **cổng khách hàng** (quản trị viên của công ty thấy mọi ticket của công ty) |
| SLA | Mục tiêu trả lời đầu tiên và giải quyết theo khách hàng và mức ưu tiên, **tính theo giờ làm việc và ngày lễ**, **dừng khi chờ khách trả lời**. Báo cho nhân viên khi sắp hoặc đã quá hạn |
| Tự động | Tự phân công theo loại hoặc cho người đang ít việc. Nhắc khi chờ → tự giải quyết → tự đóng. Hỏi mức hài lòng (5 mức) khi giải quyết |
| Kiến thức (FAQ) | Bài viết đã công khai hiện trên trang FAQ của khách và biểu mẫu tiếp nhận. Tạo nháp từ ticket bằng một cú nhấp |
| Tài sản IT | Đăng ký PC, máy chủ, giấy phép… của khách và liên kết với ticket |
| Báo cáo | Tiếp nhận, giải quyết, tỷ lệ đạt SLA, thời gian đến lần trả lời đầu, mức hài lòng… **So sánh thời gian làm việc với thời gian hợp đồng theo khách hàng** (dùng cho báo cáo tháng), CSV |
| Tìm kiếm | Khớp một phần theo tiêu đề, nội dung, trao đổi, email, số. Dấu cách là AND; thẻ chọn AND/OR |
| Tùy biến | Tất cả là bảng của Exment, nên mục, màn hình, danh sách, workflow, API đều đổi được trên màn hình Exment. Có kèm bảng kanban cho ticket |

## Yêu cầu
- Exment 7.0 trở lên (PHP 8.2 trở lên). Không cần thêm extension PHP.
- Nhận email cần hộp thư tiếp nhận (IMAP). Gửi email dùng [thiết lập gửi email](/vi/mailsend_setting) của Exment.
- Xử lý tự động (nhận email, SLA, chờ, đóng, hạn tài sản) chạy mỗi 5 phút. Hãy thiết lập [task schedule](/vi/additional_task_schedule).
- Màn hình chỉ có tiếng Nhật.

## Cài đặt
1. Cài plugin: từ "Quản lý tính năng" với Exment v7.2.1 trở đi, hoặc tải lên tệp zip với bản cũ hơn. Vui lòng xem [Plugin chính thức](/vi/plugin_official).
2. Với Exment v7.2.1 trở đi, bật "Bộ phận hỗ trợ: hộp tiếp nhận" ở "Cài đặt quản trị" → "[Quản lý tính năng](/vi/feature)" (khi tắt thì cũng không mở được màn hình thiết lập). Với hộp tiếp nhận, có thể chọn nhóm vai trò được dùng. Nếu dùng cổng khách hàng (`/support`), nhận email và tạo ticket từ giám sát, bật thêm "Bộ phận hỗ trợ: cổng khách hàng" (chỉ chạy khi hộp tiếp nhận đang bật).
   - Trang cài mới thì cả hai ban đầu tắt. Trang đã dùng Support Desk từ trước khi có Quản lý tính năng thì cả hai vẫn bật.
   - Khi đặt hộp tiếp nhận thành "Không sử dụng", mục menu "サポートデスク" cũng biến mất. Các bảng (ticket v.v.) vẫn còn là dữ liệu và vẫn mở được như bảng Exment thông thường bằng URL (ví dụ `/data/sd_ticket`) hoặc từ "Cài đặt quản trị" → "Bảng tùy chỉnh". Muốn hiện trên menu thì thêm bảng ở "Cài đặt quản trị" → "Menu". Nếu không muốn hiển thị, hãy bỏ quyền bảng trong nhóm vai trò.
3. Mở "サポートデスク" trên menu (hoặc `/plugins/exment_support_desk`) và bấm "セットアップする" (thiết lập). Bảng, menu, quyền, SLA, loại, mẫu trả lời và FAQ mẫu được tạo.
   - Menu bên trái chỉ có 1 mục "サポートデスク" (mở hộp tiếp nhận). Bảng ticket, kiến thức, khách hàng, liên hệ, tài sản IT, mẫu trả lời mở từ menu phía trên của hộp tiếp nhận; tất cả các bảng (cả loại và SLA) mở từ "テーブル・権限" (bảng và quyền) trong "設定".
   - Thư mục "ITサポート" của 1.0.6 trở về trước (hộp tiếp nhận và 8 bảng) được gộp thành 1 mục khi mở hộp tiếp nhận lần đầu sau khi lên 1.0.7. Menu do quản trị viên tự thêm vẫn giữ nguyên.
4. Ở "設定" (cài đặt), nhập hộp thư tiếp nhận (IMAP) và địa chỉ của bộ phận hỗ trợ, lưu lại, rồi bấm "IMAP につながるか試す" (thử kết nối IMAP). Nếu nhận email, nhập thêm "差出人の確認" (kiểm tra người gửi) và "受信サーバーの名前" (tên máy chủ nhận: tên ở đầu Authentication-Results của email đã nhận). Trước khi nhập, ticket từ email sẽ bị đánh dấu "nghi giả mạo".
5. Đưa nhân viên vào nhóm vai trò "サポートデスク 担当者" (nhân viên Support Desk). Khách đăng nhập thì đưa vào "サポートデスク お客様" (khách hàng Support Desk), và liên kết qua "Exment のユーザー" (người dùng Exment) của "お客様の担当者" (người liên hệ của khách hàng).
6. Báo cho khách URL của bộ phận hỗ trợ (`https://exment-của-bạn/support`).

## Cách sử dụng

### Hộp tiếp nhận
Mở "サポートデスク" trên menu thì hộp tiếp nhận (受付箱) hiện ra. Màn hình có 3 cột.

| Cột | Nội dung |
| --- | --- |
| Trái | Các loại hộp tiếp nhận và số lượng: 対応が必要 (cần xử lý), 自分の担当 (của tôi), 担当者なし (chưa có người phụ trách), お客様から返事 (khách đã trả lời), SLA 注意・超過 (SLA sắp hoặc đã quá hạn), お客様の返事待ち (chờ khách trả lời), 保留 (tạm hoãn), 監視・エラー (giám sát và lỗi), 解決 (đã giải quyết), 完了 (đã đóng), すべて (tất cả). Bên dưới hiện nhận email đang bật hay tắt, và thời điểm xử lý tự động chạy lần cuối |
| Giữa | Danh sách ticket. Tìm được theo tiêu đề, nội dung, trao đổi, email, số. Chọn được bộ lọc (trạng thái, mức ưu tiên, người phụ trách, khách hàng, loại, thẻ) và thứ tự (hạn gần nhất, mức ưu tiên, mới nhất, cũ nhất, cập nhật). Chọn nhiều ticket thì đổi được trạng thái, mức ưu tiên, người phụ trách cùng lúc |
| Phải | Hội thoại của ticket đã chọn và ô trả lời. Bên phải đó là các mục (trạng thái, mức ưu tiên, người phụ trách, loại, khách hàng, thẻ, 「お客様に見せる」 cho khách thấy, 「開くときに確認のコード」 mã xác nhận khi mở), SLA, khách hàng, liên kết cho khách, kiến thức, tệp, ticket khác của cùng khách hàng, gộp ticket |

| Phím | Việc |
| --- | --- |
| `J` / `K` | Ticket sau / trước |
| `/` | Tìm |
| `R` | Trả lời khách |
| `N` | Ghi chú nội bộ |
| `Ctrl` + `Enter` | Gửi |
| `A` | Nhận việc (đặt mình làm người phụ trách) |
| `E` | Giải quyết |
| `\` | Mở / đóng cột phải |
| `?` | Danh sách phím tắt |
| `Esc` | Đóng, hoặc thoát khỏi ô nhập |

Điện thoại, khách đến trực tiếp và việc phát hiện trong nội bộ được nhập từ 「チケット」 (ticket) trên menu phía trên (chọn 「受付のメール」 thì gửi số và liên kết cho khách).

### Luồng của ticket
Có 6 trạng thái:

新規 (mới) → 対応中 (đang xử lý) → お客様の返事待ち (chờ khách trả lời) / 保留（社内） (tạm hoãn, nội bộ) → 解決 (đã giải quyết) → 完了 (đã đóng)

- Ticket đến từ email và biểu mẫu tiếp nhận ở trạng thái 「新規」. Khi nhân viên trả lời khách thì thành 「対応中」. Ticket do nhân viên nhập thì từ đầu là 「対応中」.
- Với 「送ったあとの状態」 (trạng thái sau khi gửi) trong ô trả lời, trạng thái đổi cùng lúc khi gửi (ví dụ: hỏi khách thì chọn 「お客様の返事待ち」).
- Khi khách viết vào ticket 「お客様の返事待ち」, 「解決」 hoặc 「完了」, ticket trở về 「対応中」. Nếu khách viết sau hơn 14 ngày kể từ khi đóng, một ticket mới được tạo và trỏ đến ticket cũ.
- Nếu ticket ở 「お客様の返事待ち」 mà khách không trả lời, email nhắc được gửi sau 3 ngày kể từ lần trả lời cuối, và ticket được giải quyết sau 7 ngày.
- Cũng giải quyết được bằng phím `E`, trạng thái ở cột phải, hoặc 「解決しました」 (đã giải quyết) trên trang liên kết của khách. Khi giải quyết, khách được hỏi mức hài lòng (5 mức).
- Sau 7 ngày ở 「解決」, ticket thành 「完了」.
- Số ngày đổi được ở 「自動で進める」 (tự động) trong 「設定」 (cài đặt) (0 thì không làm bước đó).

### Trả lời và ghi chú nội bộ
- 「お客様へ返信」 (trả lời khách) đến khách qua email. Đầu tiêu đề có số ticket (ví dụ `[SUP-00012]`) và có liên kết xem tiến độ. Thêm được CC.
- 「社内メモ」 (ghi chú nội bộ) khách không thấy. Cũng không gửi email.
- Mỗi lần trả lời có thể nhập thời gian làm việc (phút). Thời gian được cộng theo khách hàng và so với thời gian hợp đồng.
- Khi khách trả lời email như bình thường, trả lời vào cùng ticket, dựa vào số trong tiêu đề hoặc email được trả lời (Message-ID). Phần trích dẫn được bỏ. Nếu không phải người yêu cầu, CC hoặc người cùng công ty thì không vào cùng ticket.
- Khi nhân viên khác đang viết trả lời cho cùng ticket, màn hình sẽ hiện.

### Phụ trách
- Chọn ở 「担当者」 (người phụ trách) trong cột phải. Phím `A` đặt mình làm người phụ trách. Khi gửi trả lời hoặc ghi chú nội bộ trên ticket chưa có người phụ trách, người gửi thành người phụ trách.
- Để tự phân công, chọn ở 「担当者の決め方」 (cách chọn người phụ trách) trong 「設定」:
    - 種類ごとの「最初の担当者」 (người phụ trách đầu tiên theo loại; mặc định): người đã đặt cho loại của ticket.
    - 種類で決まらなければ、対応中が少ない人 (nếu loại không quyết định thì chọn người ít việc): trong nhóm vai trò 「サポートデスク 担当者」, người có ít ticket chưa xong nhất.
    - 自動では決めない (không tự phân công)

### Hạn (SLA)
- Mỗi ticket có 「最初の返事の期限」 (hạn trả lời đầu tiên) và 「解決の期限」 (hạn giải quyết). Mục tiêu đặt ở bảng 「SLA」, theo mức ưu tiên (緊急 khẩn cấp, 高 cao, 中 bình thường, 低 thấp): trả lời đầu tiên tính bằng phút, giải quyết tính bằng giờ.
- Khi khách hàng chưa có SLA, dùng SLA có 「標準にする」 (đặt làm mặc định). Thiết lập tạo sẵn 「標準」 (tiêu chuẩn, chỉ tính giờ làm việc) và 「プレミアム（24 時間）」 (premium, 24 giờ).
- SLA có 「営業時間だけで数える」 (chỉ tính giờ làm việc) chỉ tính ngày làm việc, giờ làm việc và ngày nghỉ của 「営業時間（SLA の時計）」 (giờ làm việc, đồng hồ SLA) trong 「設定」. Ngày lễ của Nhật năm nay và năm sau được thêm khi thiết lập. Nghỉ cuối năm và đầu năm… thì tự thêm.
- Trong lúc 「お客様の返事待ち」, đồng hồ dừng, và hạn giải quyết được lùi lại đúng bằng thời gian đã dừng.
- Khi còn ít thời gian (còn dưới 1/4 tổng thời gian, hoặc dưới 30 phút) và khi đã quá hạn, người phụ trách được báo bằng chuông và email. Khi chưa có người phụ trách thì báo cho mọi nhân viên.

### Mẫu trả lời và kiến thức
- Chọn từ 「定型文…」 (mẫu trả lời) trong ô trả lời thì nội dung được đưa vào. `{name}` (tên khách), `{ticket_no}`, `{subject}`, `{link}` được thay bằng giá trị của ticket. Nếu mẫu trả lời có đặt trạng thái thì 「送ったあとの状態」 cũng đổi. Thêm mẫu trả lời ở 「定型文」 trên menu phía trên.
- 「ナレッジ」 (kiến thức) ở cột phải hiện bài viết hợp với tiêu đề. Tìm kiếm cũng được. Bấm vào thì bài đã công khai đưa tiêu đề và liên kết vào trả lời, bài khác đưa nội dung vào.
- 「このチケットからナレッジを作る」 (tạo kiến thức từ ticket này) tạo nháp bài viết.

### Phía khách hàng
Cổng khách hàng là `https://exment-của-bạn/support` (khi cả "Bộ phận hỗ trợ: cổng khách hàng" và 「使う」 (sử dụng) của 「お客様の窓口（ログインなし）」 (cổng khách hàng, không đăng nhập) trong 「設定」 đều bật).

| URL | Nội dung |
| --- | --- |
| `/support` | Trang đầu của cổng. Tìm FAQ, gửi yêu cầu, xem yêu cầu của mình |
| `/support/request` | Biểu mẫu tiếp nhận (không đăng nhập). Bắt buộc tên, địa chỉ email, tiêu đề, nội dung; tối đa 5 tệp (mỗi tệp đến 10MB) |
| `/support/faq` | Kiến thức đã công khai (FAQ) |
| `/support/mine` | Xem yêu cầu của mình. Nhập địa chỉ email thì nhận được liên kết đến danh sách yêu cầu qua email (dùng được 7 ngày) |
| `/support/t/…` | Trang của 1 ticket. Mở từ liên kết trong email |

- Trang ticket cho thấy ticket đã đến bước nào (受付 tiếp nhận, 対応中, 解決, 完了) và trao đổi (không hiện ghi chú nội bộ). Khách gửi được trả lời và tệp, và bấm được 「解決しました」.
- Liên kết không mở được sau 30 ngày kể từ khi ticket đóng (「リンクの期限」 hạn liên kết trong 「設定」).
- Ticket đã bật 「開くときに確認のコード」 ở cột phải chỉ mở được bằng mã 6 chữ số gửi đến email đã đăng ký.
- Khi khách đăng nhập (nhóm vai trò 「サポートデスク お客様」) mở "サポートデスク", danh sách yêu cầu của mình (`/plugins/exment_support_desk/my`) hiện ra. Người liên hệ có 「お客様の管理者」 (quản trị viên của khách hàng) thấy mọi yêu cầu của công ty.

### Tiếp nhận email
- Ở 「メールで受け付ける（IMAP）」 (tiếp nhận qua email) trong 「設定」, bật 「受信する」 (nhận), rồi nhập máy chủ IMAP, cổng và mã hóa (SSL/TLS, STARTTLS), tên người dùng, mật khẩu, thư mục. Mật khẩu được mã hóa khi lưu.
- Nhận mỗi 5 phút (mỗi lần tối đa 50 email). Cũng nhận ngay được bằng 「いますぐ受信する」 (nhận ngay). Email chưa đọc được đọc và đánh dấu đã đọc.
- Nhận được email ISO-2022-JP, Shift_JIS và tệp đính kèm (mỗi email tối đa 20 tệp).
- Email mới thành ticket 「新規」, và khách nhận email xác nhận tiếp nhận (số và liên kết). "Re:"… trong tiêu đề được bỏ. Nếu nội dung có từ như 「至急」「緊急」「止まって」 (gấp, khẩn cấp, bị dừng) thì mức ưu tiên thành 「高」 (cao).
- Nếu địa chỉ người gửi có trong người liên hệ đã đăng ký, ticket thuộc khách hàng đó. Nếu không, ticket thuộc khách hàng có 「メールのドメイン」 (tên miền email) khớp với tên miền của địa chỉ, và người liên hệ được tạo. Với người gửi lạ, chọn ở 「知らない差出人」 (người gửi lạ) giữa tạo ticket (không có khách hàng) và không nhận.
- Về cách xử lý email trả lời và email nghi giả mạo, xem "Trả lời và ghi chú nội bộ" ở trên và "An toàn" ở dưới.

## Tạo ticket từ giám sát / nhật ký lỗi
Hệ thống giám sát có thể tạo ticket qua API. Khóa có trên màn hình cài đặt.

~~~sh
curl -X POST https://exment-của-bạn/support/intake/alert \
  -H "X-SD-Key: (khóa trên màn hình cài đặt)" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| Trường | Ý nghĩa |
| --- | --- |
| `title` (bắt buộc) | Tiêu đề (`message` cũng được) |
| `source` | Nơi phát sinh (`host` cũng được). Nếu tên miền khớp "tên miền email" của khách thì ticket thuộc khách đó |
| `severity` | Trở thành mức ưu tiên (`level` cũng được): critical, emergency, alert, fatal → khẩn cấp; error, high → cao; còn lại → bình thường |
| `fingerprint` | Dấu để gộp lỗi giống nhau (không có thì tạo từ nơi phát sinh và tiêu đề) |
| `detail` | Nội dung |
| `customer` | Mã khách hàng |

Hệ thống chuyển được nguyên email gốc (như pipe của Postfix) có thể POST đến `/support/intake/mail` (cùng khóa).

- Ticket tạo từ giám sát ban đầu không cho khách thấy.
- Khi "Bộ phận hỗ trợ: cổng khách hàng" tắt trong Quản lý tính năng, `/support/intake/alert` và `/support/intake/mail` trả về 404.

## An toàn
- Liên kết cho khách là chuỗi dài không đoán được, cơ sở dữ liệu chỉ lưu hash. Liên kết chỉ cho thấy đúng 1 ticket đó (không hiện ghi chú nội bộ, khách hàng khác, địa chỉ email của nhân viên).
- Mã xác nhận: 10 phút, tối đa 5 lần, dùng 1 lần. Theo từng liên kết: gửi mã tối đa 5 lần mỗi giờ, nhập sai tối đa 10 lần mỗi ngày (quá thì mã của liên kết đó không dùng được đến hôm sau).
- Ghi số ticket trong tiêu đề chỉ vào ticket đó nếu là người yêu cầu, CC hoặc cùng công ty.
- Mặc định (khuyến nghị), chỉ tin email đã qua kiểm tra của máy chủ nhận (DMARC, hoặc DKIM/SPF khớp tên miền From). Email không kiểm tra được sẽ được nhận ở trạng thái "nghi giả mạo": không thêm Cc, không tạo liên hệ; trả lời vào ticket có sẵn thì thành ghi chú nội bộ mà khách không thấy (thẻ "要確認"). Có thể đổi cài đặt thành "chỉ nghi email trượt kiểm tra".
- Biểu mẫu tiếp nhận không hiện liên kết sau khi gửi mà gửi liên kết qua email đến địa chỉ đã nhập. Đến khi mở liên kết đó, ticket có thẻ "メール未確認" (chưa xác nhận email) và không tạo liên hệ.
- Không nhận email trả lời tự động, email bị trả về, email từ chính địa chỉ của mình.
- Chỉ mở liên kết khảo sát thì chưa lưu đánh giá.
- Chỉ người "sửa tất cả" được bảng ticket (như nhóm vai trò "サポートデスク 担当者") mới dùng được màn hình nhân viên. "Chỉ sửa dữ liệu của mình" thì không dùng được.

### Về các trang không cần đăng nhập
Vì an toàn, Exment không cho tạo trang không cần đăng nhập từ `config.json` của plugin. Help desk cần lối vào cho khách hàng không có tài khoản, nên plugin này tự đăng ký các trang `/support/...` khi Exment khởi động. Cách nghĩ giống biểu mẫu công khai của Exment: chỉ hiển thị những gì mà bí mật trong URL mở được.

## Mục liên quan
- [Plugin chính thức](/vi/plugin_official)
- [Plugin](/vi/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/support-desk/README.md)
