# Danh sách giá trị thiết lập của Exment
Với Exment (và các thư viện liên quan), bạn có thể thay đổi các thiết lập bên trong bằng cách sửa tệp ".env" trong thư mục của dự án.  
Trang này là danh sách các giá trị thiết lập dùng được trong tệp ".env". Mỗi mục ghi khóa thiết lập, giá trị mặc định và vai trò.  

## Cách thiết lập
Mở tệp ".env" trong thư mục của dự án và thêm vào theo dạng "khóa thiết lập=giá trị" như sau.  
※Nếu đã có khóa cùng tên, hãy sửa giá trị của khóa đó.

~~~
#Ví dụ 1
EXMENT_API=false

#Ví dụ 2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※Không để khoảng trắng trước và sau dấu "=".

## Danh sách giá trị thiết lập

#### Ngôn ngữ của ứng dụng
- Khóa thiết lập : APP_LOCALE
- Giá trị mặc định : en
- Vai trò : Ngôn ngữ hiển thị của ứng dụng. Với tiếng Nhật, hãy ghi "ja".


#### Múi giờ
- Khóa thiết lập : APP_TIMEZONE
- Giá trị mặc định : UTC
- Vai trò : Múi giờ mà ứng dụng sử dụng. Với Nhật Bản, hãy ghi "Asia/Tokyo".


#### Thay đổi URL "/admin"
- Khóa thiết lập : ADMIN_ROUTE_PREFIX
- Giá trị mặc định : admin
- Vai trò : Tên đường dẫn khi hiển thị Exment. Chi tiết vui lòng xem [tại đây](/vi/additional_prefix).


#### Thay đổi URI "/publicform" của biểu mẫu công khai

- Khóa thiết lập : EXMENT_PUBLICFORM_ROUTE_PREFIX
- Giá trị mặc định : publicform
- Vai trò : Tên đường dẫn khi hiển thị biểu mẫu công khai. Chi tiết vui lòng xem phần thay đổi "publicform" trong URL ở [trang này](/vi/publicform).


#### Bật cache
- Khóa thiết lập : EXMENT_USE_CACHE
- Giá trị mặc định : false
- Vai trò : Khi là true, cache được bật. Dữ liệu chủ như bảng tùy chỉnh, cột, chế độ xem, quy trình làm việc được đưa vào cache. Tùy môi trường mà có thể nhanh hơn.


#### URL của tài liệu hướng dẫn
- Khóa thiết lập : EXMENT_MANUAL_URL
- Giá trị mặc định : https://exment.net/docs/#/
- Vai trò : Thiết lập URL của tài liệu hướng dẫn Exment.


#### Giá trị mặc định của lịch sử cập nhật
- Khóa thiết lập : EXMENT_REVISION_COUNT
- Giá trị mặc định : 100
- Vai trò : Giá trị mặc định của số lịch sử cập nhật được giữ lại khi lưu dữ liệu. Được dùng khi tạo bảng mới.


#### Đường dẫn Composer
- Khóa thiết lập : EXMENT_COMPOSER_PATH
- Giá trị mặc định : (không có)
- Vai trò : Đường dẫn của lệnh composer. Nếu không chỉ định, Exment coi như lệnh đã nằm trong biến môi trường PATH.


#### Đường dẫn MySQL
- Khóa thiết lập : EXMENT_MYSQL_BIN_DIR
- Giá trị mặc định : (không có)
- Vai trò : Đường dẫn của lệnh mysql. Nếu không chỉ định, Exment coi như lệnh đã nằm trong biến môi trường PATH.


#### Số lượng chỉ mục tìm kiếm
- Khóa thiết lập : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- Giá trị mặc định : 20
- Vai trò : Giới hạn số cột chỉ mục tìm kiếm thiết lập được ở mỗi bảng.  
<span class="red">※Việc thay đổi giá trị này do bạn tự chịu trách nhiệm. Nhà phát triển chưa kiểm tra hoạt động với 21 cột trở lên.</span>


#### IP được phép làm reverse proxy
- Khóa thiết lập : ADMIN_TRUST_PROXY_IPS
- Giá trị mặc định : không có
- Vai trò : Chi tiết vui lòng xem [tại đây](/vi/additional_reverse_proxy).


#### Header để nhận biết reverse proxy
- Khóa thiết lập : ADMIN_TRUST_PROXY_HEADERS
- Giá trị mặc định : không có
- Vai trò : Chi tiết vui lòng xem [tại đây](/vi/additional_reverse_proxy).


#### Tắt xử lý lỗi chuẩn của Exment
- Khóa thiết lập : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, phần xử lý lỗi do package Exment thêm vào sẽ bị tắt.


### Đăng nhập
#### Hiển thị nhà cung cấp đăng nhập mặc định
- Khóa thiết lập : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Giá trị mặc định : true
- Vai trò : Chuyển đổi việc có hiển thị biểu mẫu đăng nhập bằng ID và mật khẩu của Exment hay không. Thiết lập này có hiệu lực khi dùng đăng nhập một lần (SSO). Chi tiết vui lòng xem [tại đây](/vi/login_sso).

#### Chuỗi nhà cung cấp đăng nhập SSO
- Khóa thiết lập : EXMENT_LOGIN_PROVIDERS
- Giá trị mặc định : (không có)
- Vai trò : Thiết lập danh sách tên nhà cung cấp dùng cho SSO, cách nhau bằng dấu phẩy. Chi tiết vui lòng xem [tại đây](/vi/login_sso).


#### Đếm số lần đăng nhập thất bại
- Khóa thiết lập : EXMENT_THROTTLE
- Giá trị mặc định : true
- Vai trò : Khi là true, nếu đăng nhập thất bại liên tiếp một số lần nhất định thì không đăng nhập được cho đến khi hết một khoảng thời gian nhất định.  

#### Số lần đăng nhập thất bại
- Khóa thiết lập : EXMENT_MAX_ATTEMPTS
- Giá trị mặc định : 5
- Vai trò : Số lần đăng nhập thất bại cho đến khi không đăng nhập được trong một khoảng thời gian.  

#### Thời gian phục hồi sau khi đăng nhập thất bại (phút)
- Khóa thiết lập : EXMENT_DECAY_MINUTES
- Giá trị mặc định : 60
- Vai trò : Khi không đăng nhập được, đây là thời gian (phút) cho đến khi đăng nhập lại được. 

#### Tự động đăng xuất khi đóng trình duyệt
- Khóa thiết lập : EXMENT_SESSION_EXPIRE_ON_CLOSE
- Giá trị mặc định : false
- Vai trò : Khi là true, hệ thống tự động đăng xuất khi đóng trình duyệt.

#### Không dùng logo ở header của màn hình đăng nhập
- Khóa thiết lập : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- Giá trị mặc định : false
- Vai trò : Khi là true, dù đã thiết lập logo trong cài đặt hệ thống của Exment, màn hình đăng nhập vẫn không dùng header.

#### Sử dụng xác thực hai yếu tố
- Khóa thiết lập : EXMENT_LOGIN_USE_2FACTOR
- Giá trị mặc định : false
- Vai trò : Khi là true, thiết lập "Xác thực hai yếu tố" được hiển thị trên màn hình cài đặt đăng nhập và bạn có thể dùng xác thực hai yếu tố. Chi tiết vui lòng xem [tại đây](/vi/login_2factor_setting).

#### Thời gian hiệu lực của mã xác thực trong xác thực hai yếu tố bằng email (phút)
- Khóa thiết lập : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- Giá trị mặc định : 10
- Vai trò : Với xác thực hai yếu tố bằng email, đây là thời gian (phút) mà mã xác thực gửi qua email còn hiệu lực.

#### Vô hiệu hóa thiết lập đăng nhập SSO
- Khóa thiết lập : EXMENT_CUSTOM_LOGIN_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi là true, các thiết lập đăng nhập như SSO bị buộc vô hiệu hóa, và chỉ hiển thị biểu mẫu đăng nhập bằng ID và mật khẩu của Exment. Chi tiết vui lòng xem phần vô hiệu hóa thiết lập đăng nhập SSO ở [trang này](/vi/login_sso).

#### Vô hiệu hóa giới hạn IP
- Khóa thiết lập : EXMENT_DISABLE_IP_FILTER
- Giá trị mặc định : false
- Vai trò : Khi là true, giới hạn địa chỉ IP trong cài đặt hệ thống bị buộc vô hiệu hóa. Dùng khi bạn thiết lập sai giới hạn địa chỉ IP và không truy cập được nữa, v.v. Chi tiết vui lòng xem [tại đây](/vi/additional_ip_filter).


### Tìm kiếm
#### Khớp toàn bộ khi tìm kiếm
> Đã đổi sang thay đổi từ màn hình cài đặt hệ thống.


#### Có giữ bộ lọc hay không khi chuyển từ màn hình tìm kiếm sang màn hình danh sách
- Khóa thiết lập : EXMENT_SEARCH_LIST_LINK_FILTER
- Giá trị mặc định : true
- Vai trò : Khi đặt là true, lúc chuyển từ màn hình tìm kiếm tất cả dữ liệu / màn hình tìm kiếm dữ liệu liên quan sang màn hình danh sách dữ liệu, danh sách được hiển thị trong khi vẫn giữ điều kiện tìm kiếm đã nhập làm bộ lọc.


#### Khi tìm từ thanh tìm kiếm, đưa tên tệp của "Tệp đính kèm" của dữ liệu tùy chỉnh vào phạm vi tìm kiếm
- Khóa thiết lập : EXMENT_SEARCH_DOCUMENT
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc tìm từ thanh tìm kiếm, tên tệp của "Tệp đính kèm" của dữ liệu tùy chỉnh được đưa vào phạm vi tìm kiếm.
<span class="red">※Khi là true, màn hình tìm kiếm không dùng công cụ tìm kiếm toàn văn (Meilisearch). Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch).</span>


#### Số kết quả tối đa khi tìm theo từ khóa
- Khóa thiết lập : EXMENT_KEYWORD_SEARCH_COUNT
- Giá trị mặc định : 1000
- Vai trò : Số dữ liệu tối đa lấy được ở mỗi bảng khi tìm theo từ khóa.


#### Số kết quả tối đa khi tìm dữ liệu liên quan
- Khóa thiết lập : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Giá trị mặc định : 5000
- Vai trò : Số dữ liệu tối đa lấy được ở mỗi bảng khi tìm dữ liệu liên quan.


#### Giữ chế độ xem khi tìm kiếm tự do
- Khóa thiết lập : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- Giá trị mặc định : false
- Vai trò : Khi là true, lúc tìm kiếm tự do theo từng bảng, chế độ xem đang chọn lúc đó được giữ nguyên.
(Khi là false, việc tìm kiếm tự do được thực hiện với chế độ xem toàn bộ dữ liệu.)



#### Về thiết lập của công cụ tìm kiếm toàn văn (Meilisearch)
Các giá trị thiết lập bắt đầu bằng "MEILISEARCH_" dưới đây là thiết lập khi dùng công cụ tìm kiếm toàn văn "Meilisearch". Chi tiết vui lòng xem [tại đây](/vi/additional_meilisearch).
<span class="red">※Trong số này, khuyến nghị thiết lập "MEILISEARCH_HOST", "MEILISEARCH_KEY", "MEILISEARCH_INDEX", "MEILISEARCH_GLOBAL_SEARCH", "MEILISEARCH_REALTIME_SYNC", "MEILISEARCH_BATCH_SIZE", "MEILISEARCH_REPAIR_ENABLED", "MEILISEARCH_REPAIR_AT", "MEILISEARCH_FILTER_MODE" từ menu "Cài đặt quản trị > Cài đặt hệ thống (cài đặt chi tiết)". Sau khi lưu màn hình này, với các mục đó giá trị trên màn hình được ưu tiên hơn ".env", và thay đổi trong ".env" không còn được áp dụng. Lưu ý khi thiết lập bằng ".env", vui lòng xem [tại đây](/vi/additional_meilisearch?id=thiết-lập-các-mục-của-màn-hình-bằng-env).</span>
※Các giá trị thiết lập khác ngoài những mục trên chỉ thiết lập được bằng ".env".


#### Địa chỉ kết nối của máy chủ Meilisearch
- Khóa thiết lập : MEILISEARCH_HOST
- Giá trị mặc định : http://127.0.0.1:7700
- Vai trò : Địa chỉ kết nối của máy chủ Meilisearch.


#### Master key của Meilisearch
- Khóa thiết lập : MEILISEARCH_KEY
- Giá trị mặc định : (không có)
- Vai trò : Master key để kết nối đến Meilisearch. Ghi key đã tạo khi cài đặt Meilisearch.


#### Dùng Meilisearch khi tìm kiếm
- Khóa thiết lập : MEILISEARCH_GLOBAL_SEARCH
- Giá trị mặc định : false
- Vai trò : Khi là true, lúc tìm kiếm tự do, việc tìm kiếm dùng Meilisearch thay cho cơ sở dữ liệu.


#### Phản ánh nội dung cập nhật vào Meilisearch theo thời gian thực
- Khóa thiết lập : MEILISEARCH_REALTIME_SYNC
- Giá trị mặc định : false
- Vai trò : Khi là true, lúc tạo mới, cập nhật hoặc xóa dữ liệu tùy chỉnh, nội dung đó được phản ánh vào index của Meilisearch.
※Khi dùng thiết lập này, cần thiết lập queue và chạy queue worker.


#### Tự động sửa index của Meilisearch
- Khóa thiết lập : MEILISEARCH_REPAIR_ENABLED
- Giá trị mặc định : false
- Vai trò : Khi là true, sự khác biệt giữa cơ sở dữ liệu và index của Meilisearch được tự động sửa mỗi ngày 1 lần.
※Khi dùng thiết lập này, cần thiết lập lịch tác vụ (task schedule).


#### Giờ chạy tự động sửa index của Meilisearch
- Khóa thiết lập : MEILISEARCH_REPAIR_AT
- Giá trị mặc định : 03:00
- Vai trò : Giờ chạy việc tự động sửa index. Ghi theo dạng "HH:MM".
※Nếu thiết lập dạng khác "HH:MM", việc tự động sửa không chạy và cảnh báo được ghi vào log.


#### Tên index của Meilisearch
- Khóa thiết lập : MEILISEARCH_INDEX
- Giá trị mặc định : exment_global
- Vai trò : Tên của index được tạo trong Meilisearch.  
※Khi thay đổi, hãy chạy "php artisan exment:meili-index" để tạo lại index.  
※Khi nhiều Exment dùng chung 1 máy chủ Meilisearch, hãy đặt tên index khác nhau cho từng Exment. Không dùng được index mà Exment khác đang dùng.  
(Exment đang dùng index được ghi lại trong index có tên "(tên index)__owner", bằng mã nhận dạng tạo từ "APP_KEY". Vì vậy, khi thay đổi "APP_KEY" thì cũng bị coi là một Exment khác.)


#### Đơn vị tạo index của Meilisearch
- Khóa thiết lập : MEILISEARCH_BATCH_SIZE
- Giá trị mặc định : 1000
- Vai trò : Số document gửi trong 1 request khi tạo index.


#### Thời gian timeout khi kết nối Meilisearch
- Khóa thiết lập : MEILISEARCH_CONNECT_TIMEOUT
- Giá trị mặc định : 1.0
- Vai trò : Thời gian timeout (giây) khi kết nối đến máy chủ Meilisearch.


#### Thời gian timeout của Meilisearch
- Khóa thiết lập : MEILISEARCH_TIMEOUT
- Giá trị mặc định : 5.0
- Vai trò : Thời gian timeout (giây) của request đến máy chủ Meilisearch.


#### Thời gian chờ khi kết nối Meilisearch thất bại
- Khóa thiết lập : MEILISEARCH_UNREACHABLE_BACKOFF
- Giá trị mặc định : 10
- Vai trò : Khi không kết nối được đến máy chủ Meilisearch, đây là thời gian (giây) cho đến khi thử kết nối lại. Trong thời gian này, Exment không thử kết nối đến Meilisearch mà xử lý ngay như một lỗi (khi tìm kiếm thì chuyển sang tìm bằng cơ sở dữ liệu). Nhờ đó, khi Meilisearch đang dừng, mỗi lần xử lý không phải chờ đến hết timeout kết nối.  
※Khi đặt là 0, Exment không chờ mà thử kết nối mỗi lần.


#### Điều kiện khớp khi tìm kiếm của Meilisearch
- Khóa thiết lập : MEILISEARCH_MATCHING_STRATEGY
- Giá trị mặc định : all
- Vai trò : Điều kiện khớp khi tìm bằng nhiều từ. Với all, tìm dữ liệu chứa tất cả các từ. Với last, khi số kết quả khớp ít thì lần lượt bỏ điều kiện từ từ cuối cùng rồi tìm.


#### Số lượng lấy cho bộ lọc quyền của Meilisearch
- Khóa thiết lập : MEILISEARCH_PERMISSION_SCAN_CAP
- Giá trị mặc định : 1000
- Vai trò : Để lọc kết quả tìm kiếm theo quyền của người dùng, Exment lấy trước nhiều kết quả hơn. Đây là giới hạn của số lượng đó.


#### Giá trị tối đa của facet trong Meilisearch
- Khóa thiết lập : MEILISEARCH_MAX_FACET_VALUES
- Giá trị mặc định : 1000
- Vai trò : Với việc lọc kết quả tìm kiếm (facet), đây là giới hạn số giá trị lấy được cho mỗi mục.
※Nếu đặt giá trị nhỏ hơn 1000 thì được coi là 1000.


#### Cách hoạt động của bộ lọc Meilisearch
- Khóa thiết lập : MEILISEARCH_FILTER_MODE
- Giá trị mặc định : override
- Vai trò : Cách quyết định các cột được dùng cho việc lọc (facet) trên màn hình kết quả tìm kiếm.
Với override, các cột được tự động quyết định theo loại cột, sau đó thêm các cột đã thêm và bỏ các cột đã loại trừ trên màn hình "Cài đặt bộ lọc tìm kiếm". (Trên màn hình là "Tự động + Tùy chỉnh")
Với manual, chỉ dùng các cột đã thêm trên màn hình "Cài đặt bộ lọc tìm kiếm". (Trên màn hình là "Chỉ tùy chỉnh")  
※Khi thay đổi, cần tạo lại index. Hãy chạy "php artisan exment:meili-index".


#### Dùng Meilisearch cho Lựa chọn (từ bảng khác)
- Khóa thiết lập : MEILISEARCH_SELECT_TABLE
- Giá trị mặc định : false
- Vai trò : Khi là true, Meilisearch được dùng cho việc gợi ý khi nhập (biểu mẫu và API) của cột tùy chỉnh "Lựa chọn (từ bảng khác)". Thiết lập này độc lập với "MEILISEARCH_GLOBAL_SEARCH".
※Khi đặt là true, cách tìm các gợi ý đổi từ khớp một phần với giá trị đã lưu sang khớp phần đầu theo từng từ.


#### Đơn vị tạo lại index của Meilisearch
- Khóa thiết lập : MEILISEARCH_REINDEX_CHUNK_SIZE
- Giá trị mặc định : 500
- Vai trò : Khi tạo lại index do thay đổi thiết lập của bảng tùy chỉnh hoặc cột tùy chỉnh, đây là số document được lưu trong mỗi lần xử lý.


#### Giới hạn số điều kiện tìm kiếm đã lưu của Meilisearch
- Khóa thiết lập : MEILISEARCH_SAVED_SEARCH_LIMIT
- Giá trị mặc định : 50
- Vai trò : Số điều kiện tìm kiếm tối đa mà 1 người dùng lưu được.


#### Tên queue đồng bộ của Meilisearch
- Khóa thiết lập : MEILISEARCH_SYNC_QUEUE
- Giá trị mặc định : default
- Vai trò : Tên của queue chạy việc đồng bộ theo từng dữ liệu tùy chỉnh.


#### Tên queue tạo lại của Meilisearch
- Khóa thiết lập : MEILISEARCH_REINDEX_QUEUE
- Giá trị mặc định : (cùng giá trị với MEILISEARCH_SYNC_QUEUE. Ở trạng thái ban đầu là default)
- Vai trò : Tên của queue chạy việc tạo lại index theo từng bảng.  
Việc này nặng, nên nếu muốn chạy tách khỏi việc đồng bộ theo từng dữ liệu tùy chỉnh, hãy đặt tên khác với MEILISEARCH_SYNC_QUEUE, ví dụ "meili-reindex". Khi đó, cũng cần thêm tên đó vào "--queue=" của queue worker.


#### Ngôn ngữ tìm kiếm của Meilisearch
- Khóa thiết lập : MEILISEARCH_LOCALES
- Giá trị mặc định : jpn
- Vai trò : Thiết lập ngôn ngữ mà Meilisearch dùng khi tách câu thành các từ. Ghi mã ngôn ngữ ISO-639-3, cách nhau bằng dấu phẩy. (Ví dụ: "jpn", "jpn,eng") Khi để trống, thiết lập này bị xóa khỏi index và Meilisearch tự động xác định ngôn ngữ.
※Để dùng thiết lập này cần Meilisearch v1.10 trở lên. Khi thay đổi, hãy chạy "php artisan exment:meili-settings".


### Thiết lập email và thông báo
#### Hiện / ẩn thanh thông báo ở góc trên bên phải trang
- Khóa thiết lập : EXMENT_NOTIFY_NAVBAR
- Giá trị mặc định : true
- Vai trò : Khi là false, biểu tượng thông báo ở góc trên bên phải của header bị ẩn.

#### Dùng giá trị thiết lập email từ tệp env
- Khóa thiết lập : EXMENT_MAIL_SETTING_ENV_FORCE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, thiết lập email được lấy từ thiết lập của tệp .env.  
(Khi là false, dùng giá trị đã nhập trên màn hình cài đặt hệ thống. Nếu đã thiết lập "Tên máy chủ" trên màn hình cài đặt hệ thống, thì dù "MAIL_MAILER" trong .env vẫn là "log", email vẫn được gửi bằng SMTP.)  
Chi tiết vui lòng xem [tại đây](/vi/mailsend_setting).

#### Thời gian bỏ qua thông báo email liên tiếp (phút)
- Khóa thiết lập : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Giá trị mặc định : 5
- Vai trò : Với thông báo email khi tạo mới hoặc cập nhật dữ liệu, nếu cùng một dữ liệu được cập nhật liên tiếp thì email từ lần thứ 2 trở đi bị bỏ qua. Đây là thời gian (phút) để xác định các thông báo liên tiếp đó.

#### Mã hóa tệp đính kèm của email
- Khóa thiết lập : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc gửi tệp đính kèm bằng email từ màn hình, tệp đính kèm được nén zip có mã hóa rồi gửi.  
Mật khẩu giải mã được gửi riêng.

#### Bỏ qua thông báo khi đối tượng nhận thông báo là người dùng đang đăng nhập
- Khóa thiết lập : EXMENT_NOTIFY_SKIP_SELF_TARGET
- Giá trị mặc định : true
- Vai trò : Khi là true, lúc thông báo, nếu đối tượng nhận thông báo là chính người dùng đang đăng nhập thì thông báo bị bỏ qua. Khi là false, thông báo cũng được gửi cho chính người dùng đang đăng nhập.

### Quy trình làm việc

#### Hiện / ẩn biểu tượng công việc chờ xử lý
- Khóa thiết lập : EXMENT_WORKFLOW_TASK_NAVBAR
- Giá trị mặc định : true
- Vai trò : Khi là false, biểu tượng [công việc chờ xử lý](/vi/workflow_task) ở góc trên bên phải của header bị ẩn.  
Màn hình danh sách công việc chờ xử lý vẫn mở được từ URL "/workflow_task".

#### Khoảng thời gian cập nhật biểu tượng công việc chờ xử lý (giây)
- Khóa thiết lập : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- Giá trị mặc định : 300
- Vai trò : Khoảng thời gian (giây) tự động cập nhật số lượng ở biểu tượng công việc chờ xử lý ở góc trên bên phải của header. Nếu đặt giá trị nhỏ hơn 30 thì thành 30 giây.  
※Mỗi lần cập nhật, dữ liệu của tất cả quy trình làm việc đều được kiểm tra. Khoảng thời gian càng ngắn thì tải của máy chủ càng cao.

#### Thông báo cho thành viên cùng tổ chức
- Khóa thiết lập : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- Giá trị mặc định : true
- Vai trò : Khi một thành viên của tổ chức thực hiện hành động của quy trình làm việc được giao cho tổ chức, các thành viên khác của cùng tổ chức được thông báo bằng cảnh báo trong hệ thống. Khi là false thì không thông báo.  
Chi tiết vui lòng xem [công việc chờ xử lý](/vi/workflow_task?id=thông-báo-đến-thành-viên-cùng-tổ-chức).

#### Hiển thị ID của quy trình làm việc
- Khóa thiết lập : EXMENT_SHOW_WORKFLOW_ID
- Giá trị mặc định : false
- Vai trò : Khi là true, ID của quy trình làm việc và ID của hành động được hiển thị trên màn hình cài đặt quy trình làm việc. Dùng khi muốn kiểm tra ID cho plugin, API, v.v.

### Liên kết LINE

#### Channel access token
- Khóa thiết lập : LINE_CHANNEL_ACCESS_TOKEN
- Giá trị mặc định : (không có)
- Vai trò : Channel access token của LINE, dùng cho [Liên kết LINE](/vi/line). Giá trị đã lưu ở "Cài đặt LINE" trên màn hình cài đặt hệ thống được ưu tiên.

#### Channel secret
- Khóa thiết lập : LINE_CHANNEL_SECRET
- Giá trị mặc định : (không có)
- Vai trò : Channel secret của LINE. Giá trị đã lưu ở "Cài đặt LINE" trên màn hình cài đặt hệ thống được ưu tiên.

#### Basic ID của tài khoản chính thức LINE
- Khóa thiết lập : LINE_OA_BASIC_ID
- Giá trị mặc định : (không có)
- Vai trò : Basic ID của tài khoản chính thức LINE (ID bắt đầu bằng "@"). Giá trị đã lưu ở "Cài đặt LINE" trên màn hình cài đặt hệ thống được ưu tiên.

#### Thời gian ngăn gửi trùng thông báo LINE (theo thời gian trôi qua) (phút)
- Khóa thiết lập : LINE_DEDUPE_MINUTES
- Giá trị mặc định : 0
- Vai trò : Với thông báo LINE có thời điểm kích hoạt "Theo thời gian trôi qua", sau khi gửi tin nhắn LINE về cùng một dữ liệu cho cùng một người dùng, trong khoảng thời gian (phút) này tin nhắn không được gửi lại. Tin nhắn đã gửi bằng thiết lập thông báo khác và tin nhắn gửi thất bại cũng được tính. Khi là 0, chức năng này bị tắt.

#### Thời hạn hiệu lực của mã liên kết LINE (phút)
- Khóa thiết lập : LINE_LINK_CODE_TTL_MINUTES
- Giá trị mặc định : 10
- Vai trò : Thời hạn hiệu lực (phút) của mã liên kết dùng khi [liên kết tài khoản LINE](/vi/line?id=liên-kết-tài-khoản-line).

#### Số lần gửi sai mã liên kết LINE
- Khóa thiết lập : LINE_LINK_MAX_ATTEMPTS
- Giá trị mặc định : 5
- Vai trò : Số lần được gửi mã liên kết sai. Khi vượt quá số lần này, không liên kết được trong một khoảng thời gian.

#### Thời gian đếm số lần gửi sai mã liên kết LINE (phút)
- Khóa thiết lập : LINE_LINK_ATTEMPT_DECAY_MINUTES
- Giá trị mặc định : 10
- Vai trò : Thời gian (phút) để đếm số lần gửi mã liên kết sai. Nếu trong khoảng thời gian này kể từ lần gửi mã sai đầu tiên mà sai đủ số lần của "LINE_LINK_MAX_ATTEMPTS", thì không liên kết được cho đến khi hết khoảng thời gian này.

#### Timeout khi giao tiếp với LINE (giây)
- Khóa thiết lập : LINE_HTTP_TIMEOUT
- Giá trị mặc định : 10
- Vai trò : Thời gian timeout (giây) khi giao tiếp với máy chủ của LINE.

#### URL của LINE Messaging API
- Khóa thiết lập : LINE_API_BASE
- Giá trị mặc định : https://api.line.me
- Vai trò : URL của LINE Messaging API. Thông thường xin đừng thay đổi.

### Xác nhận an toàn

#### URL lấy thông tin động đất
- Khóa thiết lập : EXMENT_SAFETY_CHECK_FEED_URL
- Giá trị mặc định : https://api.p2pquake.net/v2/history
- Vai trò : URL của API lấy thông tin động đất, dùng cho việc tự động gửi khi có động đất của [Xác nhận an toàn](/vi/safety_check). Thông thường xin đừng thay đổi.

#### Số thông tin động đất lấy về
- Khóa thiết lập : EXMENT_SAFETY_CHECK_FEED_LIMIT
- Giá trị mặc định : 10
- Vai trò : Số thông tin động đất mới nhất lấy về trong 1 lần kiểm tra (mỗi phút). Thiết lập trong khoảng 1～100.

### API

#### Bật / tắt API
> Đã đổi sang thay đổi từ màn hình cài đặt hệ thống.

#### Số dữ liệu lấy mặc định của API
- Khóa thiết lập : EXMENT_API_DEFAULT_DATA_COUNT
- Giá trị mặc định : 20
- Vai trò : Số dữ liệu lấy về khi không dùng count trong API lấy danh sách dữ liệu.

#### Giới hạn số dữ liệu lấy danh sách của API
- Khóa thiết lập : EXMENT_API_MAX_DATA_COUNT
- Giá trị mặc định : 100
- Vai trò : Số dữ liệu tối đa lấy được cùng lúc trong API lấy danh sách dữ liệu.

#### Giới hạn số dữ liệu tạo mới hàng loạt của API
- Khóa thiết lập : EXMENT_API_MAX_CREATE_COUNT
- Giá trị mặc định : 100
- Vai trò : Số dữ liệu tối đa tạo mới được cùng lúc trong API tạo mới hàng loạt.

#### Giới hạn số dữ liệu xóa hàng loạt của API
- Khóa thiết lập : EXMENT_API_MAX_DELETE_COUNT
- Giá trị mặc định : 100
- Vai trò : Số dữ liệu tối đa xóa được cùng lúc trong API xóa hàng loạt.

#### Giới hạn số lần truy cập API
※Dùng được từ v6.2.4.

- Khóa thiết lập : EXMENT_API_MAX_RATE_LIMIT
- Giá trị mặc định : 60
- Vai trò : Giới hạn số lần truy cập API mỗi phút cho mỗi người dùng (nếu chưa xác thực thì theo từng địa chỉ IP). Khi vượt quá giới hạn, sẽ xảy ra lỗi 429 (Too Many Requests). Chi tiết vui lòng xem [tại đây](/vi/additional_429_too_many).

#### label của dữ liệu
- Khóa thiết lập : EXMENT_API_APPEND_LABEL
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, cột label được đưa vào kết quả khi lấy danh sách dữ liệu, hoặc khi tạo mới hay cập nhật dữ liệu.


### Danh sách (grid)

#### Tắt chuyển màn hình khi bấm vào dòng
- Khóa thiết lập : EXMENT_GRIDROW_SELECT_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, việc chuyển màn hình khi bấm vào dòng của màn hình danh sách bị tắt.

#### Chuyển sang màn hình chỉnh sửa khi bấm vào dòng
- Khóa thiết lập : EXMENT_GRIDROW_SELECT_EDIT
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc bấm vào dòng của màn hình danh sách thì chuyển sang màn hình chỉnh sửa dữ liệu. (Mặc định là màn hình chi tiết dữ liệu.)

#### Thiết lập các lựa chọn số dòng hiển thị ở màn hình danh sách dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_GRID_PER_PAGES
- Giá trị mặc định : không có
- Vai trò : Nhập các giá trị cho lựa chọn số dòng hiển thị ở màn hình danh sách dữ liệu tùy chỉnh. Nếu có nhiều giá trị, hãy cách nhau bằng dấu phẩy. Ví dụ: 100,200,500,1000

#### Hiển thị liên kết sao chép của dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, liên kết sao chép được hiển thị ở cột thao tác của màn hình danh sách.

#### Thiết kế màn hình
- Khóa thiết lập : EXMENT_UI_DESIGN
- Giá trị mặc định : không có
- Vai trò : Cố định thiết kế của màn hình đăng nhập và màn hình quản trị ở phía máy chủ. Hãy nhập "modern" (Hiện đại) hoặc "classic" (Cổ điển). Khi đã thiết lập, giá trị này được ưu tiên hơn "Thiết kế màn hình" của [cài đặt hệ thống](/vi/system_setting?id=screen-design-thiết-kế-màn-hình), và không thay đổi được trên màn hình cài đặt hệ thống. Khi chưa thiết lập, hệ thống theo "Thiết kế màn hình" của cài đặt hệ thống (giá trị ban đầu là "Hiện đại").

※Dùng được từ v7.1.0.

#### Độ rộng tối thiểu của cột ở màn hình danh sách (px)
- Khóa thiết lập : EXMENT_GRID_MIN_WIDTH
- Giá trị mặc định : 100
- Vai trò : Giá trị mặc định của độ rộng tối thiểu (px) của cột ở màn hình danh sách.

#### Độ rộng tối đa của cột ở màn hình danh sách (px)
- Khóa thiết lập : EXMENT_GRID_MAX_WIDTH
- Giá trị mặc định : 300
- Vai trò : Giá trị mặc định của độ rộng tối đa (px) của cột ở màn hình danh sách.

#### Số ký tự tối đa hiển thị ở màn hình danh sách
- Khóa thiết lập : EXMENT_GRID_MAX_LENGTH
- Giá trị mặc định : 50
- Vai trò : Số ký tự tối đa hiển thị cho 1 mục ở màn hình danh sách. Giá trị dài hơn số ký tự này được lược bỏ phần vượt quá và hiển thị với "..." ở cuối.


### Dữ liệu tùy chỉnh

#### Ẩn nút "Chi tiết bảng" ở màn hình dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_TABLE_BUTTON_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, nút "Chi tiết bảng" ở màn hình dữ liệu tùy chỉnh bị ẩn.

#### Ẩn nút "Chi tiết bảng" ở màn hình dữ liệu tùy chỉnh (chỉ với người dùng)
- Khóa thiết lập : EXMENT_TABLE_BUTTON_DISABLED_USER
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, nút "Chi tiết bảng" ở màn hình dữ liệu tùy chỉnh bị ẩn. ※Chỉ với người dùng thông thường. Quản trị viên hệ thống và người quản trị của bảng đó vẫn thấy nút.

#### Ẩn nút "Đổi chế độ xem" ở màn hình dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_VIEW_BUTTON_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, nút "Đổi chế độ xem" ở màn hình dữ liệu tùy chỉnh bị ẩn.

#### Ẩn nút "Đổi chế độ xem" ở màn hình dữ liệu tùy chỉnh (chỉ với người dùng)
- Khóa thiết lập : EXMENT_VIEW_BUTTON_DISABLED_USER
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, nút "Đổi chế độ xem" ở màn hình dữ liệu tùy chỉnh bị ẩn. ※Chỉ với người dùng thông thường. Quản trị viên hệ thống và người quản trị của bảng đó vẫn thấy nút.

#### Tắt chức năng hộp thoại tìm dữ liệu của "Lựa chọn (tham chiếu bảng khác)", "Người dùng", "Tổ chức"
- Khóa thiết lập : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng hộp thoại tìm dữ liệu của "Lựa chọn (tham chiếu bảng khác)", "Người dùng", "Tổ chức" ở màn hình nhập dữ liệu tùy chỉnh bị tắt.

#### Số dữ liệu để chuyển "Lựa chọn (tham chiếu bảng khác)", "Người dùng", "Tổ chức" sang dạng "Tìm kiếm lựa chọn mỗi lần nhập"
- Khóa thiết lập : EXMENT_SELECT_TABLE_LIMIT_COUNT
- Giá trị mặc định : 100
- Vai trò : Thiết lập số dữ liệu để chuyển mục lựa chọn sang dạng "Tìm kiếm lựa chọn mỗi lần nhập" ở màn hình tạo mới và chỉnh sửa dữ liệu tùy chỉnh.  

#### Tắt chức năng tải ảnh lên của cột tùy chỉnh "Trình soạn thảo"
- Khóa thiết lập : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng tải ảnh lên của cột tùy chỉnh "Trình soạn thảo" ở màn hình chỉnh sửa dữ liệu tùy chỉnh bị tắt.

#### Số tệp tải lên được trong 1 lần với tệp đính kèm của dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- Giá trị mặc định : 5
- Vai trò : Số tệp tải lên được trong 1 lần ở biểu mẫu tệp đính kèm của dữ liệu tùy chỉnh.

#### Kích thước tối đa của ảnh dán vào bình luận
- Khóa thiết lập : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- Giá trị mặc định : 10240
- Vai trò : Kích thước tối đa (KB) của ảnh (PNG, JPEG, GIF, WebP) có thể dán hoặc kéo thả vào ô bình luận của dữ liệu. ※Dùng được từ v7.1.0.

#### Không hiển thị trường "Chỉ đọc" ở màn hình chi tiết dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_DISABLE_SHOW_FIELD_READONLY
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, các mục được thiết lập là "Chỉ đọc" bị ẩn ở màn hình chi tiết dữ liệu tùy chỉnh.

#### Không hiển thị trường "Chỉ hiển thị" ở màn hình chi tiết dữ liệu tùy chỉnh
- Khóa thiết lập : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, các mục được thiết lập là "Chỉ hiển thị" bị ẩn ở màn hình chi tiết dữ liệu tùy chỉnh.

#### Số ký tự tối đa của cột tùy chỉnh "Văn bản nhiều dòng", "Trình soạn thảo"
- Khóa thiết lập : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- Giá trị mặc định : 63999
- Vai trò : Số ký tự tối đa mà hệ thống cho phép thiết lập với cột tùy chỉnh "Văn bản nhiều dòng", "Trình soạn thảo"

#### Không dùng xóa logic, luôn xóa vật lý
- Khóa thiết lập : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, không dùng xóa logic với dữ liệu tùy chỉnh mà luôn xóa vật lý.

#### Hiển thị khoảng trắng nửa độ rộng của cột tùy chỉnh "Văn bản nhiều dòng"
- Khóa thiết lập : EXMENT_TEXTAREA_SPACE_TAG
- Giá trị mặc định : true
- Vai trò : Khi là true, lúc hiển thị giá trị của cột tùy chỉnh "Văn bản nhiều dòng" ở màn hình danh sách hoặc màn hình chi tiết, khoảng trắng nửa độ rộng được thay bằng thẻ có độ rộng. Các khoảng trắng liên tiếp cũng được hiển thị với độ rộng đúng như đã nhập. Khi là false, không thay thế.

#### Vô hiệu hóa lọc theo quan hệ
- Khóa thiết lập : SELECT_RELATION_LINKAGE_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, "Lọc theo quan hệ" của biểu mẫu tùy chỉnh (chức năng lọc các lựa chọn của mục khác khi chọn một mục nào đó) bị tắt ở tất cả biểu mẫu.

#### Không cho dùng chế độ xem người dùng ở các bảng nhất định
- Khóa thiết lập : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- Giá trị mặc định : (không có)
- Vai trò : Ghi tên (chữ và số) của các bảng không cho dùng chế độ xem người dùng, cách nhau bằng dấu phẩy. (Ví dụ: information,contract) Ở các bảng đã ghi, dù cài đặt hệ thống cho phép dùng chế độ xem người dùng, chỉ những người dùng có quyền chế độ xem hệ thống, như người quản trị của bảng, mới tạo và chỉnh sửa được chế độ xem.

#### Khi hiển thị chế độ xem lịch, lấy cả ID và dữ liệu của từng mục
- Khóa thiết lập : EXMENT_CALENDAR_DATA_GET_VALUE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc hiển thị chế độ xem tùy chỉnh, ID và dữ liệu của từng mục cũng được lấy.  
※Hãy đặt là true nếu muốn dùng giá trị của từng dữ liệu khi viết lại phần hiển thị của chế độ xem tùy chỉnh bằng [plugin (script)](/vi/plugin_quickstart_script).

#### Số dữ liệu lấy tối đa của chế độ xem lịch
- Khóa thiết lập : EXMENT_CALENDAR_MAX_SIZE_COUNT
- Giá trị mặc định : 300
- Vai trò : Số dữ liệu tối đa khi lấy dữ liệu của khoảng thời gian đang hiển thị ở chế độ xem lịch.

#### Số lượng hiển thị tối đa của chế độ xem Kanban
- Khóa thiết lập : EXMENT_KANBAN_MAX_SIZE_COUNT
- Giá trị mặc định : 300
- Vai trò : Giá trị mặc định của số dữ liệu tối đa hiển thị ở [chế độ xem Kanban](/vi/view_kanban). Đây là giá trị ban đầu của "Số lượng hiển thị tối đa" khi tạo chế độ xem Kanban mới.  
※Nếu "Số lượng hiển thị tối đa" của chế độ xem đã được thiết lập thì thiết lập của chế độ xem được ưu tiên. Số lượng nhiều thì hiển thị chậm.

#### Vị trí của class "custom_value_(tên bảng)"
- Khóa thiết lập : EXMENT_SHOW_PAGE_CLASS_TYPE
- Giá trị mặc định : 1
- Vai trò : Thiết lập vị trí chèn class "custom_value_(tên bảng)". Hãy chọn một trong các giá trị sau.
    - 1 hoặc không thiết lập: class được đặt ở container cha của các thông tin tùy chọn như tệp đính kèm, bình luận
    - 2 : class được đặt ở container hiển thị các mục của cột tùy chỉnh
    - 3 : class được đặt ở cả 1 và 2 ở trên

### Thiết lập tổ chức

#### Hiển thị phân cấp ở trang danh sách tổ chức
- Khóa thiết lập : EXMENT_SHOW_ORGANIZATION_TREE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, trang danh sách tổ chức hiển thị được phân cấp của tổ chức.

#### Số cấp của tổ chức
- Khóa thiết lập : EXMENT_ORGANIZATION_DEEPS
- Giá trị mặc định : 4
- Vai trò : Giới hạn số cấp khi lần theo tổ chức cha và tổ chức con. Khi xét quyền, v.v., tổ chức cha và tổ chức con được lấy đến số cấp này.

### Thiết lập thứ tự sắp xếp

#### Thứ tự sắp xếp của thiết lập tổ chức trực thuộc ở màn hình chỉnh sửa người dùng
- Khóa thiết lập : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, ở thiết lập tổ chức trực thuộc của màn hình chỉnh sửa người dùng, thứ tự các tổ chức theo thứ tự của chế độ xem mặc định (của tổ chức). Khi là false thì theo thứ tự id.

#### Thứ tự sắp xếp của thiết lập nhóm vai trò
- Khóa thiết lập : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, thứ tự ở thiết lập nhóm vai trò của màn hình chỉnh sửa người dùng và màn hình chỉnh sửa tổ chức, cũng như thứ tự ở màn hình danh sách nhóm vai trò, theo thứ tự hiển thị (của nhóm vai trò). Khi là false thì theo thứ tự id.

#### Thứ tự sắp xếp của chế độ xem tùy chỉnh
- Khóa thiết lập : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- Giá trị mặc định : 0
- Vai trò : Thiết lập thứ tự các chế độ xem hiển thị ở nút menu chế độ xem tùy chỉnh. Hãy chọn một trong các giá trị sau.  
0 : khóa thứ 1: chế độ xem hệ thống / chế độ xem người dùng, khóa thứ 2: loại chế độ xem, khóa thứ 3: id  
1 : khóa thứ 1: chế độ xem hệ thống / chế độ xem người dùng, khóa thứ 2: loại chế độ xem, khóa thứ 3: order   
2 : khóa thứ 1: chế độ xem hệ thống / chế độ xem người dùng, khóa thứ 2: order

### Nhập và xuất

#### Tắt nhập
- Khóa thiết lập : EXMENT_IMPORT_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng nhập dữ liệu bị ẩn ở màn hình danh sách của tất cả bảng.

#### Tắt xuất
- Khóa thiết lập : EXMENT_EXPORT_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng xuất dữ liệu bị ẩn ở màn hình danh sách của tất cả bảng.

#### Tắt xuất (chế độ xem)
- Khóa thiết lập : EXMENT_EXPORT_VIEW_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng xuất dữ liệu (chế độ xem) bị ẩn ở màn hình danh sách của tất cả bảng.

#### Tắt nhập và xuất bằng định dạng csv
- Khóa thiết lập : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, định dạng csv không còn hiển thị ở nút nhập và xuất dữ liệu của màn hình danh sách của tất cả bảng.

#### Tắt nhập và xuất bằng định dạng xlsx
- Khóa thiết lập : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, định dạng xlsx không còn hiển thị ở nút nhập và xuất dữ liệu của màn hình danh sách của tất cả bảng.

#### Thêm BOM khi xuất định dạng csv
- Khóa thiết lập : EXMENT_EXPORT_APPEND_CSV_BOM
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, BOM được thêm khi xuất dữ liệu CSV. (Mở bằng Excel cũng không bị lỗi hiển thị ký tự.)

#### Số dòng tối đa khi nhập từ màn hình
- Khóa thiết lập : EXMENT_IMPORT_MAX_ROW_COUNT
- Giá trị mặc định : 5000
- Vai trò : Số dòng tối đa nhập được trong 1 lần khi nhập dữ liệu từ màn hình. Tệp vượt quá số dòng này sẽ bị lỗi.  
※Khi tăng số dòng, có thể xảy ra timeout hoặc thiếu bộ nhớ. Khi nhập lượng lớn dữ liệu, hãy cân nhắc dùng [nạp dữ liệu số lượng lớn](/vi/data_bulk_insert).

#### Bật nhập và xuất nhóm vai trò
- Khóa thiết lập : ROLE_GROUP_IMPORT_EXPORT
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, nút nhập và xuất dữ liệu được hiển thị ở màn hình thiết lập nhóm vai trò.  
※Đây là chức năng mở rộng dành cho người hiểu rõ về quản lý quyền của Exment. Hãy thao tác cẩn thận, ví dụ luôn sao lưu trước.

### Bảng điều khiển

#### Số dòng của bảng điều khiển
- Khóa thiết lập : EXMENT_DASHBOARD_ROWS
- Giá trị mặc định : 4
- Vai trò : Thay đổi số dòng có thể bố trí trên bảng điều khiển.  


#### Tắt thông báo phiên bản mới nhất trên bảng điều khiển
- Khóa thiết lập : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, chức năng thông báo phiên bản mới nhất hiển thị trên bảng điều khiển bị tắt.

#### Thay đổi màu của biểu đồ trên bảng điều khiển
- Khóa thiết lập : EXMENT_CHART_BG_COLOR
- Giá trị mặc định : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- Vai trò : Có thể thay đổi các màu của biểu đồ hiển thị trên bảng điều khiển, cách nhau bằng dấu phẩy. Khi hiển thị biểu đồ có số mục nhiều hơn số màu đã chỉ định, các màu được dùng xoay vòng.

※Thiết lập này được thêm từ v3.4.3. Với người dùng đã cài Exment ở v3.4.2 trở xuống, giá trị thiết lập trên là giá trị cố định.  
Khi muốn thay đổi, hãy mở tệp "config/exment.php" và sửa nội dung như sau.  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### Tệp

#### Không cho người khác ngoài người tải lên xóa tệp đính kèm
- Khóa thiết lập : EXMENT_FILE_DELETE_USERONLY
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, tệp đã tải lên ở màn hình chi tiết dữ liệu chỉ người tải lên mới xóa được.

#### Tắt kéo thả tệp
- Khóa thiết lập : EXMENT_FILE_DRAG_DROP_DISABLED
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, phần hiển thị kéo thả của các cột tùy chỉnh như cột tệp, cột hình ảnh bị tắt.

#### Cho phép xóa tệp đính kèm cả ở bảng đã cấm xóa bằng "Không cho thay đổi từ màn hình"
- Khóa thiết lập : EXMENT_ALLOW_DELETE_ATTACHMENT
- Giá trị mặc định : false
- Vai trò : Ở bảng đã đánh dấu "Xóa" trong "Không cho thay đổi từ màn hình" của thiết lập bảng tùy chỉnh, thông thường tệp đính kèm ở màn hình chi tiết dữ liệu cũng không xóa được. Khi đặt là true, ở những bảng như vậy, người dùng chỉnh sửa được dữ liệu cũng xóa được tệp đính kèm.

#### Nơi lưu tệp
- Khóa thiết lập : EXMENT_DRIVER_EXMENT, EXMENT_DRIVER_BACKUP, EXMENT_DRIVER_TEMPLATE, EXMENT_DRIVER_PLUGIN
- Giá trị mặc định : local
- Vai trò : Thay đổi riêng từng nơi lưu (local, FTP, SFTP, Amazon S3, Azure Blob, v.v.) của tệp đính kèm, bản sao lưu, mẫu và plugin. Chi tiết, bao gồm các giá trị thiết lập cần cho từng nơi lưu (như AWS_BUCKET_EXMENT), vui lòng xem [tại đây](/vi/additional_file_saveplace).

#### Thư mục của 7-Zip (Windows)
- Khóa thiết lập : EXMENT_7ZIP_DIR
- Giá trị mặc định : C:\Program Files\7-Zip
- Vai trò : Thư mục cài đặt 7-Zip, dùng để tạo tệp zip có mật khẩu khi dùng "Mã hóa tệp đính kèm của email" (EXMENT_ARCHIVE_MAIL_ATTACHMENT) trên máy chủ Windows. Ghi thư mục có "7z.exe".

#### Thay đổi các phần mở rộng được hiển thị trên trình duyệt khi bấm vào tệp đính kèm
- Khóa thiết lập : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- Giá trị mặc định : không có
- Vai trò : Ghi các phần mở rộng được hiển thị trên trình duyệt khi bấm vào tệp đính kèm, không có dấu chấm, cách nhau bằng dấu phẩy. (Ví dụ: png,jpg,gif)  
- Ghi chú khác : Về hành vi khi bấm vào tệp, trước đây mọi tệp đều được hiển thị trên trình duyệt. Sau khi nhận [báo cáo về lỗ hổng bảo mật](/weakness/20200819_2), tệp đính kèm được chuyển sang dạng tải xuống.  
Vì có bối cảnh như trên, <span class="red">thiết lập này do bạn tự chịu trách nhiệm.</span>

#### Thời hạn của URL tạm thời khi tải tệp
- Khóa thiết lập : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- Giá trị mặc định : 15
- Vai trò : Thời hạn hiệu lực (phút) của URL tạm thời, khi [nơi lưu tệp](/vi/additional_file_saveplace) là storage có thể phát hành URL tạm thời (URL có chữ ký) như Amazon S3.  
Với storage như vậy, khi tải tệp, người dùng được chuyển hướng đến URL tạm thời của storage và trình duyệt tải tệp trực tiếp từ storage.  
※Thời hạn hiệu lực được kiểm tra lúc bắt đầu tải, nên dù hết thời hạn trong khi đang tải thì việc tải cũng không bị ngắt. Tuy nhiên, khi tiếp tục lại một lần tải bị ngắt do lỗi mạng, v.v., nếu đã hết thời hạn thì sẽ thất bại.



### Biểu mẫu công khai (Google reCAPTCHA)

#### Ngưỡng điểm của Google reCAPTCHA v3
- Khóa thiết lập : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- Giá trị mặc định : 0.5
- Vai trò : Ngưỡng điểm khi dùng Google reCAPTCHA v3 ở [biểu mẫu công khai](/vi/publicform). reCAPTCHA v3 trả về điểm từ 0.0 (khả năng cao là bot) đến 1.0 (khả năng cao là người). Khi điểm thấp hơn giá trị này, việc gửi bị lỗi. Nếu spam tiếp tục được gửi, hãy tăng giá trị. Nếu người dùng hợp lệ bị lỗi, hãy giảm giá trị.  
※Chỉ được dùng khi đã chọn "V3" cho Google reCAPTCHA trên màn hình cài đặt hệ thống.  
※Nếu đặt giá trị ngoài khoảng 0～1 thì được coi là 0.5.

#### Ẩn "Powered by Exment" ở footer của biểu mẫu công khai
- Khóa thiết lập : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, "Powered by Exment" hiển thị ở footer của biểu mẫu công khai bị ẩn.

#### Thay đổi URI "/publicformapi" của API biểu mẫu công khai
- Khóa thiết lập : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- Giá trị mặc định : publicformapi
- Vai trò : Tên đường dẫn trong URL của API mà biểu mẫu công khai dùng bên trong (lấy các lựa chọn, v.v.).

#### Địa chỉ IP không kiểm tra Google reCAPTCHA
- Khóa thiết lập : không có (thiết lập bằng "recaptcha_skip_ips" trong "config/exment.php")
- Giá trị mặc định : [] (không có)
- Vai trò : Danh sách địa chỉ IP không kiểm tra Google reCAPTCHA. Dùng khi kiểm tra hoạt động của biểu mẫu công khai từ trong công ty, v.v.  
<span class="red">※Với việc gửi từ các địa chỉ IP ghi ở đây, hoàn toàn không kiểm tra reCAPTCHA. Khuyến nghị không thiết lập ở môi trường production.</span>  
※Thiết lập này không thiết lập được bằng ".env". Hãy mở tệp "config/exment.php" và ghi như sau.  
※Nếu ở Exment v6.x trở về trước bạn đã thiết lập "skip-ips" trong "config/no-captcha.php", thì từ v7.0.0 trở lên hãy ghi lại vào thiết lập này.

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### Khác

#### Ở biểu mẫu công khai, chỉ cho đặt giá trị ban đầu bằng suuid (chuỗi ngẫu nhiên 20 ký tự) với cột tùy chỉnh "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức"

- Khóa thiết lập : EXMENT_PUBLICFORM_URLPARAM_SUUID
- Giá trị mặc định : false
- Vai trò : Chi tiết vui lòng xem phần nói về việc chỉ cho đặt giá trị ban đầu bằng suuid (chuỗi ngẫu nhiên 20 ký tự) với cột tùy chỉnh "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức" ở [trang này](/vi/publicform).


#### Xóa ký tự xuống dòng trong HTTP response
- Khóa thiết lập : EXMENT_REMOVE_RESPONSE_SPACE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, các ký tự xuống dòng trong response bị xóa.

#### Tắt chế độ xem người dùng

> Từ v3.5.0, đã đổi sang thay đổi từ màn hình cài đặt hệ thống.

#### Tắt bảng điều khiển của người dùng

> Từ v3.5.0, đã đổi sang thay đổi từ màn hình cài đặt hệ thống.

#### Ẩn "Trường ẩn" ở màn hình chi tiết dữ liệu
- Khóa thiết lập : EXMENT_HIDE_HIDDENFIELD
- Giá trị mặc định : true
- Vai trò : Khi đặt là true, dữ liệu được đặt là "Trường ẩn" trong cài đặt biểu mẫu bị ẩn ở màn hình chi tiết dữ liệu.

#### Chế độ demo
- Khóa thiết lập : EXMENT_DEMO_MODE
- Giá trị mặc định : false
- Vai trò : Thiết lập dành cho trang demo công khai tài khoản đăng nhập của quản trị viên. Khi đặt là true, kể cả với quản trị viên hệ thống, các thao tác chạy mã trên máy chủ, thao tác thay đổi máy chủ hoặc trang khác, thao tác gửi gì đó ra ngoài, và thao tác làm lộ giá trị bí mật đều bị chặn (tải lên và sửa mã plugin, sao lưu, nhập mẫu, thiết lập email, đăng nhập và API, đổi mật khẩu, v.v.). Email chỉ được ghi vào log, và tin nhắn Slack, Teams, LINE không được gửi. Phía trên màn hình hiển thị "Đây là trang demo". Các lệnh console (như khôi phục ban đêm bằng cron) không bị chặn. Xin đừng thiết lập ở môi trường vận hành thông thường.

※Dùng được từ v7.1.0.



### Debug và dành cho nhà phát triển

#### Chế độ chuyên gia
- Khóa thiết lập : EXMENT_EXPART_MODE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, bạn có thể dùng các thiết lập linh hoạt hơn, dành cho người am hiểu hệ thống.


#### Chế độ debug (ghi giá trị request)
- Khóa thiết lập : EXMENT_DEBUG_MODE_REQUEST
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, giá trị request gửi đến web service của Exment được ghi vào log.  


#### Chế độ debug (ghi log SQL)
- Khóa thiết lập : EXMENT_DEBUG_MODE_SQL
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc Exment chạy SQL, câu SQL được ghi vào log. ※Dùng cho phát triển.


#### Chế độ debug (ghi log SQL - hiển thị hàm)
- Khóa thiết lập : EXMENT_DEBUG_MODE_SQLFUNCTION
- Giá trị mặc định : false
- Vai trò : Lúc Exment chạy SQL và "EXMENT_DEBUG_MODE_SQL" là true, khi đặt giá trị này là true thì danh sách các hàm gọi cũng được ghi vào log cùng với câu SQL. ※Dùng cho phát triển.


#### Chế độ debug (ghi log lập lịch)
- Khóa thiết lập : EXMENT_DEBUG_MODE_SCHEDULE
- Giá trị mặc định : false
- Vai trò : Khi đặt là true, lúc chạy lập lịch, bạn có thể kiểm tra định nghĩa lập lịch và diễn biến trong quá trình chạy. Chi tiết vui lòng xem phần kiểm tra khi không hoạt động tốt ở [trang này](/vi/additional_task_schedule). ※Dùng cho kiểm tra.

### Mã vạch 2D
#### Tên hiển thị của nút (tiếng Nhật)
- Khóa thiết lập : EXMENT_TEXT_QR_BUTTON_JA
- Giá trị mặc định : (không có)
- Vai trò : Thiết lập tên hiển thị tiếng Nhật của "二次元バーコード" ở phần tạo mới mã vạch 2D và tải xuống mã vạch 2D. Nếu không chỉ định thì là "二次元バーコード".

#### Tên hiển thị của nút (tiếng Anh)
- Khóa thiết lập : EXMENT_TEXT_QR_BUTTON_EN
- Giá trị mặc định : (không có)
- Vai trò : Thiết lập tên hiển thị tiếng Anh của "二次元バーコード" ở phần tạo mới mã vạch 2D và tải xuống mã vạch 2D. Nếu không chỉ định thì là "2D barcode".

### Mã vạch 2D/JAN
#### Tên hiển thị của nút (tiếng Nhật)
- Khóa thiết lập : EXMENT_TEXT_SCAN_BUTTON_JA
- Giá trị mặc định : (không có)
- Vai trò : Thiết lập tên hiển thị tiếng Nhật của "二次元／JANバーコード" ở nút quét mã vạch 2D/JAN. Nếu không chỉ định thì là "二次元／JANバーコード".

#### Tên hiển thị của nút (tiếng Anh)
- Khóa thiết lập : EXMENT_TEXT_SCAN_BUTTON_EN
- Giá trị mặc định : (không có)
- Vai trò : Thiết lập tên hiển thị tiếng Anh của "二次元／JANバーコード" ở nút quét mã vạch 2D/JAN. Nếu không chỉ định thì là "2D barcode／JANcode".
