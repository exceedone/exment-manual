# IT Support (plugin chính thức)
"IT Support" là **plugin chính thức** của Exment dành cho hỗ trợ IT và help desk. Yêu cầu từ khách hàng (email, biểu mẫu tiếp nhận, điện thoại) và sự cố phát hiện qua giám sát hay nhật ký lỗi được quản lý bằng "ticket", và **tiến độ được chia sẻ với khách hàng không cần đăng nhập**. Miễn phí.

- Mã nguồn và tài liệu: [exceedone/exment-plugins (it-support)](https://github.com/exceedone/exment-plugins/tree/main/it-support)
- Giấy phép: GPL-3.0 (giống Exment)
- Tên trong danh sách plugin: Exment Plugin IT Support（ITサポート）. Tên nội bộ `ExmentITSupport`, URL `/admin/plugins/exment_it_support`.

<!-- Ảnh màn hình: màn hình xử lý của nhân viên (img/plugin_it_support/its_desk.png) -->

## Chức năng
| Lĩnh vực | Nội dung |
| --- | --- |
| Màn hình nhân viên | Màn hình 3 cột riêng (hàng đợi và số lượng, danh sách ticket, hội thoại và thuộc tính), chuyển ticket không tải lại trang. Phím tắt (`J`/`K`, `R` trả lời, `N` ghi chú nội bộ, `Ctrl+Enter` gửi, `A` nhận việc, `E` giải quyết, `?` danh sách), tự lưu nháp, chế độ tối, giao diện điện thoại |
| Tiếp nhận | **Email** (IMAP mỗi 5 phút; hỗ trợ ISO-2022-JP, Shift_JIS, tệp đính kèm), **biểu mẫu tiếp nhận** (không đăng nhập, gợi ý FAQ trước), **điện thoại / đến trực tiếp** (nhân viên nhập), **giám sát / nhật ký lỗi** (API; lỗi giống nhau gộp thành 1 ticket và đếm số lần), **hạn của tài sản IT** (tự tạo ticket khi bảo trì, giấy phép, tên miền, chứng chỉ sắp hết hạn) |
| Trao đổi | Trả lời đến khách qua email; khách trả lời lại thì vào cùng ticket. Phần trích dẫn được tự bỏ. **Ghi chú nội bộ** khách không thấy. **Mẫu trả lời** và **gợi ý kiến thức** bên cạnh ô trả lời |
| Tránh xử lý trùng | Hiển thị khi nhân viên khác đang viết trả lời cho cùng ticket |
| Chia sẻ với khách hàng | **Liên kết không cần đăng nhập** (chỉ thấy 1 ticket, có hạn, thu hồi được, có nhật ký mở). Ticket quan trọng dùng **mã xác nhận** (6 chữ số qua email). Khách đăng nhập dùng **cổng khách hàng** |
| SLA | Mục tiêu trả lời đầu tiên và giải quyết theo khách hàng và mức ưu tiên, **tính theo giờ làm việc và ngày lễ**, **dừng khi chờ khách trả lời**. Báo cho nhân viên khi sắp hoặc đã quá hạn |
| Tự động | Tự phân công theo loại hoặc cho người đang ít việc. Nhắc khi chờ → tự giải quyết → tự đóng. Hỏi mức hài lòng (5 mức) khi giải quyết |
| Kiến thức (FAQ) | Bài viết đã công khai hiện trên trang FAQ của khách và biểu mẫu tiếp nhận. Tạo nháp từ ticket bằng một cú nhấp |
| Tài sản IT | Đăng ký PC, máy chủ, giấy phép… của khách và liên kết với ticket |
| Báo cáo | Tiếp nhận, giải quyết, tỷ lệ đạt SLA, thời gian đến lần trả lời đầu, mức hài lòng… **So sánh thời gian làm việc với hợp đồng theo khách hàng**, CSV |
| Tìm kiếm | Khớp một phần theo tiêu đề, nội dung, trao đổi, email, số. Dấu cách là AND; thẻ chọn AND/OR |
| Tùy biến | Tất cả là bảng của Exment, nên mục, màn hình, danh sách, workflow, API đều đổi được trên màn hình Exment. Có kèm bảng kanban cho ticket |

## Yêu cầu
- Exment 7.0 trở lên (PHP 8.2 trở lên). Không cần thêm extension PHP.
- Nhận email cần hộp thư tiếp nhận (IMAP). Gửi email dùng [thiết lập gửi email](/vi/mailsend_setting) của Exment.
- Xử lý tự động (nhận email, SLA, chờ, đóng, hạn tài sản) chạy mỗi 5 phút. Hãy thiết lập [lịch tác vụ (English)](/additional_task_schedule).
- Màn hình chỉ có tiếng Nhật.

## Cài đặt
1. Cài plugin: từ Feature Management với Exment v7.2.1 trở đi, hoặc tải lên tệp zip với bản cũ hơn. Xem [Plugin chính thức](/vi/plugin_official).
2. Với Exment v7.2.1 trở đi, bật "ITサポート：受付箱" (IT Support: hộp tiếp nhận) ở "Admin Setting" → "[Feature Management](/vi/feature)" (khi tắt thì không mở được màn hình thiết lập). Có thể chọn nhóm vai trò được dùng. Nếu dùng cổng khách hàng (`/support`), nhận email và tạo ticket từ giám sát, bật thêm "ITサポート：お客様の窓口" (IT Support: cổng khách hàng) (chỉ chạy khi hộp tiếp nhận đang bật).
   - Trang cài mới thì cả hai ban đầu tắt. Trang đã dùng IT Support từ trước khi có Feature Management thì cả hai vẫn bật.
   - Khi tắt "Hộp tiếp nhận", mục menu "ITサポート" cũng biến mất. Các bảng (ticket v.v.) vẫn còn là dữ liệu và vẫn mở được như bảng Exment thông thường bằng URL (ví dụ `/admin/data/its_ticket`) hoặc từ "Admin Setting" → "Custom Table". Muốn hiện trên menu thì thêm bảng ở "Admin Setting" → "Menu". Nếu không muốn hiển thị, hãy bỏ quyền bảng trong nhóm vai trò.
3. Mở "ITサポート" trên menu (hoặc `/admin/plugins/exment_it_support`) và bấm "セットアップする" (thiết lập). Bảng, menu, quyền, SLA, loại, mẫu trả lời và FAQ mẫu được tạo.
   - Menu bên trái chỉ có 1 mục "ITサポート" (mở hộp tiếp nhận). Bảng ticket, kiến thức, khách hàng, liên hệ, tài sản IT, mẫu trả lời mở từ thanh trên cùng của hộp tiếp nhận; tất cả các bảng (cả loại và SLA) mở từ "テーブル・権限" (bảng và quyền) trong "設定".
   - Thư mục "ITサポート" của 1.0.6 trở về trước (hộp tiếp nhận và 8 bảng) được gộp thành 1 mục khi mở hộp tiếp nhận lần đầu sau khi lên 1.0.7. Menu do quản trị viên tự thêm vẫn giữ nguyên.
4. Ở "設定" (cài đặt), nhập hộp thư tiếp nhận (IMAP) và địa chỉ của bộ phận hỗ trợ, lưu lại, rồi bấm "IMAP につながるか試す" (thử kết nối IMAP). Nếu nhận email, nhập thêm "差出人の確認" (kiểm tra người gửi) và "受信サーバーの名前" (tên máy chủ nhận: tên đầu tiên trong Authentication-Results). Trước khi nhập, ticket từ email sẽ bị đánh dấu "nghi giả mạo".
5. Đưa nhân viên vào nhóm vai trò "ITサポート 担当者". Khách đăng nhập vào "ITサポート お客様", liên kết qua "Exment のユーザー" của "お客様の担当者".
6. Báo cho khách URL của bộ phận hỗ trợ (`https://exment-của-bạn/support`).

## Tạo ticket từ giám sát / nhật ký lỗi
Hệ thống giám sát có thể tạo ticket qua API. Khóa có trên màn hình cài đặt.

~~~sh
curl -X POST https://exment-của-bạn/support/intake/alert \
  -H "X-ITS-Key: (khóa trên màn hình cài đặt)" \
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
- Khi "ITサポート：お客様の窓口" tắt trong Feature Management, `/support/intake/alert` và `/support/intake/mail` trả về 404.

## An toàn
- Liên kết cho khách là chuỗi dài không đoán được, cơ sở dữ liệu chỉ lưu hash. Liên kết chỉ cho thấy đúng 1 ticket.
- Mã xác nhận: 10 phút, tối đa 5 lần, dùng 1 lần. Theo từng liên kết: gửi mã tối đa 5 lần mỗi giờ, nhập sai tối đa 10 lần mỗi ngày (quá thì mã của liên kết đó không dùng được đến hôm sau).
- Ghi số ticket trong tiêu đề chỉ vào ticket đó nếu là người yêu cầu, CC hoặc cùng công ty.
- Mặc định (khuyến nghị), chỉ tin email đã qua kiểm tra của máy chủ nhận (DMARC, hoặc DKIM/SPF khớp tên miền From). Email không kiểm tra được sẽ được nhận ở trạng thái "nghi giả mạo": không thêm Cc, không tạo liên hệ; trả lời vào ticket có sẵn thì thành ghi chú nội bộ (thẻ "要確認"). Có thể đổi cài đặt thành "chỉ nghi email trượt kiểm tra".
- Biểu mẫu tiếp nhận không hiện liên kết sau khi gửi mà gửi liên kết qua email đến địa chỉ đã nhập. Đến khi mở liên kết đó, ticket có thẻ "メール未確認" và không tạo liên hệ.
- Không nhận email trả lời tự động, email bị trả về, email từ chính địa chỉ của mình.
- Chỉ mở liên kết khảo sát thì chưa lưu đánh giá.
- Chỉ người "sửa tất cả" được bảng ticket (như nhóm vai trò "ITサポート 担当者") mới dùng được màn hình nhân viên. "Chỉ sửa dữ liệu của mình" thì không đủ.

## Mục liên quan
- [Plugin chính thức](/vi/plugin_official)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
