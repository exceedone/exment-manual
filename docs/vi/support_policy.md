# Thời hạn hỗ trợ (các phiên bản đang được bảo trì)
Thông thường hãy dùng bản mới nhất. Bảng dưới cho biết mỗi dòng phiên bản được sửa lỗi đến khi nào. Chỉ dùng dòng đang bảo trì khi chưa thể lên bản mới nhất.

## Thời hạn sửa lỗi theo dòng phiên bản

| Dòng | Mới nhất | PHP | Laravel | Cơ sở dữ liệu | Nội dung sửa | Đến |
|---|---|---|---|---|---|---|
| 7.2 (mới nhất) | 7.2.4 | 8.2 – 8.4 | 12 | MySQL 8.0+, MariaDB 10.11+, SQL Server 13.0+ | Lỗi, tính năng nhỏ, bảo mật | Đến khi phát hành 7.3, sau đó 6 tháng chỉ sửa bảo mật |
| 7.1 | 7.1.3 | 8.2 – 8.4 | 12 | như trên | Chỉ bảo mật | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 – 8.4 | 12 | như trên | Chỉ bảo mật | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | như trên | Chỉ bảo mật | 2027-03-31 |
| Bản cuối chạy trên PHP 7.4 | 4.4.3 | 7.3 – 7.4 | — | — | Không sửa | Đã kết thúc |

- Dải PHP lấy từ `composer.json` của từng phiên bản (`^8.2.0`) và dải mà màn hình cài đặt kiểm tra (v7: từ 8.2 đến dưới 8.5; 6.2: từ 8.2 đến dưới 8.3).
- Phiên bản cơ sở dữ liệu: xem [Yêu cầu máy chủ](/vi/server).

## Hướng dẫn cập nhật và ghi chú phát hành

| Dòng | Hướng dẫn cập nhật | Ghi chú phát hành |
|---|---|---|
| 7.2 | [Cập nhật](/vi/update) | [Release notes (English)](/release_note) |
| 7.1, 7.0 | [Cập nhật](/vi/update) (cập nhật thông thường sẽ lên 7.2) | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3), [v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [Update to v7.0.0 (English)](/update/v7_0_0) (cần cập nhật thủ công) | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## Hỗ trợ của framework và PHP
- <span class="red bold">Laravel 10 đã ngừng sửa lỗi bảo mật từ ngày 4/2/2025.</span> 6.2 chạy trên framework không còn được hỗ trợ. Hãy nâng cấp lên v7 sớm nhất có thể.
- PHP 8.2 được sửa lỗi bảo mật đến ngày 31/12/2026. Hãy cân nhắc chuyển sang PHP 8.3 hoặc 8.4 (6.2 chỉ chạy trên PHP 8.2).
- Laravel 12 (v7) dự kiến được sửa lỗi bảo mật đến ngày 24/2/2027.

Nguồn: [PHP Supported Versions](https://www.php.net/supported-versions.php), [Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## Cách xem phiên bản hiện tại
Ở cuối trang "[Cài đặt hệ thống](/vi/system_setting)" trong màn hình quản trị: "Thông tin phiên bản hệ thống" → "Phiên bản hiện tại".

## Thông báo
Các bản sửa bảo mật được thông báo ở [Tin mới trên exment.net](https://exment.net/vi/whats-new/) và trên GitHub [Security Advisories](https://github.com/exceedone/exment/security/advisories).

## Tệp zip cài đặt
- Zip của bản mới nhất và các dòng đang bảo trì có ở [trang Tải về](https://exment.net/vi/download/).
- Zip của các bản trước nằm ở [GitHub Releases](https://github.com/exceedone/exment/releases), mục "Assets" của từng phiên bản (`…_ja.zip` là tiếng Nhật, `…_en.zip` là tiếng Anh). Bản cũ không có các bản sửa lỗi và bảo mật về sau.
