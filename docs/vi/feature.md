# Quản lý tính năng
Quyết định có dùng các tính năng mới và plugin hay không, ai được dùng, và có hiện trên menu hay không.  
Exment được dùng ở rất nhiều trang, nên tính năng mới ban đầu ở trạng thái "không dùng". Cho đến khi quản trị viên hệ thống chuyển sang "dùng", tính năng đó không hiện trên menu và không dùng được kể cả khi mở bằng URL. Chỉ cập nhật Exment thì màn hình và menu của trang sẽ không thay đổi.

※Màn hình này dùng được từ Exment v7.2.1 trở đi.

## Màn hình thiết lập
Đăng nhập bằng quản trị viên hệ thống và mở "Admin Setting" (cài đặt quản trị) → "Feature Management" (quản lý tính năng) (URL là `/feature`).  
Chỉ quản trị viên hệ thống mới mở được màn hình này.

<!-- Ảnh màn hình: toàn bộ màn hình Feature Management (img/feature/feature_index.png). Chụp sau khi exment PR #1861 được merge -->

Màn hình gồm 2 phần: "Features of Exment" (tính năng của Exment) ở trên và "Plugins" (plugin) ở dưới.

## Tính năng của Exment
Các tính năng mới của bản thân Exment. Hiện có 2 tính năng.

| Tên | Nội dung |
| --- | --- |
| File server (chia sẻ tệp) | Workspace, thư mục, quản lý phiên bản, liên kết chia sẻ… Tắt đi thì tệp cũng không bị xóa. (Chỉ hiện ở các phiên bản có chia sẻ tệp) |
| Studio | Danh sách màn hình, tạo màn hình và ứng dụng điện thoại (/app). Dành cho người có quyền thiết lập bảng. |

Với mỗi tính năng, quyết định 3 mục sau.

| Mục | Nội dung |
| --- | --- |
| Use (dùng) | Có dùng tính năng này trên trang hay không. Ban đầu là "không dùng". |
| Who may use it (người được dùng) | "All users" (tất cả người dùng) hoặc "Users of the chosen role groups" (người dùng thuộc các nhóm vai trò đã chọn). Nếu không chọn nhóm nào thì chỉ quản trị viên hệ thống được dùng. Quản trị viên hệ thống luôn dùng được. |
| Menu | Có "Show" (hiện) trên menu hay không. Chỉ hiện với người được dùng. Khi chưa có dòng menu, sẽ hiện "There is no menu row. Saving makes it." (chưa có dòng menu, lưu lại sẽ tạo). |

Cột "Status" (trạng thái) hiển thị như sau.

| Trạng thái | Ý nghĩa |
| --- | --- |
| New (mới) | Chưa ai quyết định về tính năng này (được xem là "không dùng"). |
| In use (đang dùng) | Đang ở "dùng" và dùng được. |
| Not available in this environment (không dùng được trong môi trường này) | Máy chủ đang khóa tính năng ([Khóa tính năng bằng thiết lập máy chủ](/vi/feature?id=khóa-tính-năng-bằng-thiết-lập-máy-chủ)). Không thể chuyển sang "dùng" từ màn hình này. |
| It cannot be used because a feature it needs is off. (tính năng cần thiết đang tắt nên không dùng được) | Tính năng chỉ chạy khi có một tính năng khác (hiện "Only while "..." is used."), và tính năng đó đang tắt. |

※Với Studio, trong số người được chọn ở đây, chỉ người có quyền thiết lập bảng mới dùng được.  
※Việc có dùng API, biểu mẫu công khai… hay không vẫn nằm ở [Thiết lập hệ thống](/vi/system_setting) như trước.

<!-- Ảnh màn hình: một dòng tính năng của Exment (Use, Who may use it, Menu) (img/feature/feature_core.png). Sau khi #1861 được merge -->

## Plugin
Các plugin đã cài cũng hiện trên cùng màn hình.  
Màn hình không giữ thêm một bản thiết lập thứ hai, mà hiển thị đúng thiết lập plugin đang có.

| Mục | Nội dung |
| --- | --- |
| Use (dùng) | Giống với trạng thái bật/tắt (active) của plugin. Khi đang tắt sẽ hiện "The plugin is inactive" (plugin đang tắt). Muốn đổi thì dùng "Change it in the plugin settings" và đổi ở màn hình [Plugin (English)](/plugin). |
| Who may use it (người được dùng) | Giống với quyền "access" (sử dụng) của plugin trong nhóm vai trò. Đổi ở màn hình [Nhóm vai trò](/vi/role_group). |
| Menu | Có hiện trên menu hay không. Chỉ mục này được quyết định ở màn hình này. |

※Plugin thuộc loại ai cũng dùng được, hoặc plugin đã đặt "all users can use it" (tất cả người dùng đều dùng được), sẽ có ghi chú như vậy.  
※Khi plugin có đăng ký tính năng riêng (ví dụ: web mail), mỗi tính năng có một dòng bên dưới plugin. Tính năng trong plugin ban đầu cũng là "không dùng". Trong số người được dùng plugin, người được chọn ở đây sẽ dùng được.

<!-- Ảnh màn hình: dòng plugin và các dòng tính năng bên trong (img/feature/feature_plugin.png). Sau khi #1861 được merge -->

## Plugin chính thức miễn phí (đi kèm Exment)
Exment đi kèm các plugin chính thức miễn phí (Quản lý dự án, IT Support và Groupware). Cài từ mục "Free official plugins (bundled with Exment)" trên màn hình Feature Management. Xem [Plugin chính thức](/vi/plugin_official).

- Cho đến khi bấm "Use (install)" (dùng / cài đặt), không cài và không nạp gì (không tạo bảng).
- Khi bấm, hệ thống kiểm tra rồi cài và bật plugin. Các tính năng chính của plugin cũng được bật. Sau đó plugin cũng hiện ở mục "Plugins" phía trên, nơi chọn người được dùng và menu.
- Khi có phiên bản mới, sẽ hiện "Version ... is available." (có phiên bản mới). Không tự cài: bấm "Update to this version" (cập nhật lên phiên bản này) để cập nhật (thiết lập, menu và quyền được giữ).
- Phiên bản trước khi cập nhật được giữ lại: "Back to the previous version (...)" (quay lại phiên bản trước) để trở lại.
- Plugin đã cài tay từ trước vẫn giữ nguyên (không cài lại). Chỉ khi bản đi kèm mới hơn thì mới thông báo. Sau khi thay bằng bản đi kèm thì không quay lại bản cài tay được.
- Plugin đi kèm chỉ được cài sau khi kiểm tra chữ ký của Exceed One. Plugin có chữ ký không khớp sẽ không hiện.
- Ở trang mà nhà cung cấp đổi phiên bản (như SaaS), sẽ hiện "The versions are changed by the provider of this site." và không có nút (`EXMENT_BUNDLED_PLUGINS_UPDATES=false` trong `.env`).

#### Thông báo bản sửa lỗi bảo mật
Khi phiên bản mới của plugin chính thức đã cài có bản sửa lỗi bảo mật, quản trị viên hệ thống sẽ được báo.

- Trên trang chủ của quản trị viên hệ thống hiện "Update available for an official plugin (...)" (có bản cập nhật). Dòng trong Feature Management có dấu "Security fix" (sửa lỗi bảo mật) và dòng "This version includes a security fix. Press "Update to this version"."
- Thông báo chuông, và email nếu trang gửi được email, cùng tiêu đề và nội dung, một lần.
- Người dùng khác không thấy gì. Chỉ cập nhật khi quản trị viên hệ thống bấm "Update to this version".
- Khi quay lại phiên bản không có bản sửa lỗi bảo mật, hệ thống hỏi lại một lần nữa.

#### Thông báo tính năng mới
Sau khi cập nhật Exment, nếu có tính năng mới chưa ai quyết định, quản trị viên hệ thống nhận thông báo trên trang chủ và chuông, một lần ("There are new features (...). They are off at first. ..."). Không gửi email. Trang cài mới không hiện thông báo này.

<!-- Ảnh màn hình: mục plugin chính thức miễn phí (img/feature/feature_bundled.png). Sau khi #1867 được merge -->

## Khi chuyển sang "không dùng"
- Tính năng không còn trên menu (dòng menu chỉ bị ẩn, không bị xóa).
- Các trang và API của tính năng không dùng được, kể cả khi mở trực tiếp bằng URL.
- Dữ liệu (workspace, tệp, màn hình…) vẫn còn. Chuyển lại sang "dùng" thì mọi thứ trở lại như cũ.
- Khi lưu một thay đổi làm một số người không dùng được nữa (tắt tính năng, hoặc bớt nhóm vai trò), màn hình sẽ hỏi "Some users will no longer be able to use the following. Save?" (có người sẽ không dùng được nữa, lưu không?).

## Thông báo khi không dùng được
Khi mở URL của tính năng không dùng được, một trong các thông báo sau sẽ hiện ra.

| Thông báo | Khi nào |
| --- | --- |
| This feature is not used on this site. (tính năng này không được dùng trên trang này) | Tính năng đang "không dùng" (hoặc máy chủ đang khóa). Quản trị viên hệ thống còn thấy liên kết đến Feature Management. |
| You do not have permission to use this feature. Please ask your administrator. (bạn không có quyền dùng tính năng này, hãy hỏi quản trị viên) | Tính năng đang "dùng", nhưng người đăng nhập không thuộc người được dùng. |

Cả hai đều có liên kết "Back to home" (về trang chủ). Khi gọi từ API, cùng thông báo đó được trả về dạng JSON (404 khi không dùng, 403 khi không có quyền).

<!-- Ảnh màn hình: trang "This feature is not used on this site." (img/feature/feature_not_used.png). Sau khi #1861 được merge -->

## Với trang đã cập nhật
Cập nhật Exment không làm mất những gì trang đang dùng.

- Các tính năng trang đã dùng trước khi cập nhật sẽ ở "dùng", hiển thị như trước.
  - File server: trang có ít nhất 1 workspace
  - Studio: đã có người mở màn hình Studio hoặc ứng dụng điện thoại (kiểm tra bằng nhật ký thao tác)
- Tính năng chỉ có menu mà chưa từng dùng sẽ ở "không dùng".
- Trạng thái bật/tắt của plugin và quyền của nhóm vai trò không thay đổi.
- Các tính năng plugin đã có từ trước vẫn ở "dùng" trên các trang đã cài plugin đó từ trước.
- Trang cài mới thì tất cả bắt đầu từ "không dùng".
- Menu "Feature Management" được thêm vào dưới "Admin Setting".

## Khóa tính năng bằng thiết lập máy chủ
Ghi `EXMENT_FEATURES_LOCKED` vào `.env` của máy chủ thì tính năng sẽ luôn ở "không dùng", dù quản trị viên hệ thống của trang chọn gì.  
Dùng cho các dịch vụ không cung cấp tính năng đó (như SaaS). Ghi các khóa, cách nhau bằng dấu phẩy.

~~~
EXMENT_FEATURES_LOCKED=file_server,studio
~~~

| Khóa | Tính năng |
| --- | --- |
| `file_server` | File server (chia sẻ tệp) |
| `studio` | Studio (gồm cả ứng dụng điện thoại) |

Tính năng bị khóa sẽ hiện "Not available in this environment" trên màn hình này.

※Sau khi đổi `.env` trên máy chủ có dùng cache cấu hình, hãy chạy `php artisan config:clear` (hoặc `php artisan config:cache`).

## Thứ tự quyết định
Việc có dùng được hay không được quyết định từ trên xuống. Thiết lập ở dưới không bao giờ mở rộng hơn thiết lập ở trên.

1. **Máy chủ**: tính năng ghi trong `EXMENT_FEATURES_LOCKED` không dùng được.
2. **"Dùng" / "không dùng" của trang**: tính năng "không dùng" thì không ai dùng được.
3. **Người được dùng**: tất cả người dùng, hoặc người dùng thuộc các nhóm vai trò đã chọn (quản trị viên hệ thống luôn dùng được).
4. **Thiết lập bên trong tính năng**: quyền của bảng với Studio, quyền của workspace với chia sẻ tệp…

## Dành cho người viết plugin
Plugin có thể đăng ký tính năng riêng và có một dòng trên màn hình này. Tính năng đã đăng ký ban đầu là "không dùng".

~~~php
use Exceedone\Exment\Services\Features;

// Đăng ký, ví dụ trong constructor của lớp plugin. Khóa bắt đầu bằng uri của plugin
Features::register('exment_groupware.mail', [
    'label' => 'Web mail',
    'endpoints' => ['plugins/exment_groupware/mail'],
]);

// Kiểm tra trong các trang của plugin
if (!Features::allowed('exment_groupware.mail')) {
    return Features::deny('exment_groupware.mail');
}
~~~

- Các trang ghi trong `endpoints` sẽ hiện các thông báo ở trên khi không dùng được.
- Với `existing => true`, tính năng vẫn ở "dùng" trên các trang đã cài plugin từ trước (cho tính năng plugin đã có sẵn).
- Ghi khóa của tính năng khác vào `requires` thì tính năng sẽ không dùng được khi tính năng kia đang tắt.

## Mục liên quan
- [Thiết lập hệ thống](/vi/system_setting)
- [Plugin (English)](/plugin)
- [Nhóm vai trò / Thiết lập quyền](/vi/role_group)
- [Menu (English)](/menu)
