# Danh sách biến tham số
Đây là danh sách các "biến tham số", được thay bằng giá trị thực tế khi chạy. Viết theo dạng "${tên biến}" ([ví dụ](/vi/params?id=ví-dụ)).
Có thể dùng ở các mục sau.

- Mẫu thông báo
    - Tạo mới, cập nhật dữ liệu, v.v.
    - Theo thời gian trôi qua
    - Nút
    - Quy trình làm việc
    - Tạo mới người dùng
    - Đặt lại mật khẩu của người dùng
    - Thông báo hoàn tất đăng ký (người dùng, quản trị viên) và thông báo lỗi của biểu mẫu công khai
- Xuất tài liệu
- Đánh số tự động của cột tùy chỉnh
- Tên hiển thị của người gửi khi gửi email

## Danh sách biến
### Ngày tháng
Các ví dụ dưới đây là khi ngày giờ chạy là "2018/02/17 11:20:32".

| Mục | Mô tả |
| ---- | ---- |
| ${y} or ${year} | Năm lúc chạy được đặt vào, với 4 chữ số. (Ví dụ: 2018) |
| ${m} or ${month} | Tháng lúc chạy được đặt vào. (Ví dụ: 2) |
| ${m:(số nguyên)} or ${month:(số nguyên)} | Tháng lúc chạy được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${m:2} thì là 02) |
| ${d} or ${day} | Ngày lúc chạy được đặt vào. (Ví dụ: 17) |
| ${d:(số nguyên)} or ${day:(số nguyên)} | Ngày lúc chạy được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${d:2} thì là 17) |
| ${h} or ${hour} | Giờ lúc chạy được đặt vào. (Ví dụ: 11) |
| ${h:(số nguyên)} or ${hour:(số nguyên)} | Giờ lúc chạy được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${hour:2} thì là 11) |
| ${i} or ${minute} | Phút lúc chạy được đặt vào. (Ví dụ: 20) |
| ${i:(số nguyên)} or ${minute:(số nguyên)} | Phút lúc chạy được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${minute:2} thì là 20) |
| ${s} or ${second} | Giây lúc chạy được đặt vào. (Ví dụ: 32) |
| ${s:(số nguyên)} or ${second:(số nguyên)} | Giây lúc chạy được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${second:2} thì là 32) |
| ${ymdhms} or ${ymdhis} | Chuỗi yyyymmddhhiiss (ví dụ: 20180217112032) |
| ${ymdhm} or ${ymdhi} | Chuỗi yyyymmddhhii (ví dụ: 201802171120) |
| ${ymdh} | Chuỗi yyyymmddHH (ví dụ: 2018021711) |
| ${ymd} | Chuỗi yyyymmdd (ví dụ: 20180217) |
| ${ym} | Chuỗi yyyyMM (ví dụ: 201802) |
| ${hms} or ${his} | Chuỗi hhiiss (ví dụ: 112032) |
| ${hm} or ${hi} | Chuỗi hhii (ví dụ: 1120) |
| ${now} | Ngày giờ chạy được xuất theo dạng yyyymmddhhiiss. (Ví dụ: 20180217112032) |
| ${now:(format)} | Ngày giờ chạy được xuất theo định dạng đã chỉ định. Về định dạng, vui lòng xem <a href="https://www.php.net/manual/ja/function.date.php" target="_blank">tại đây</a>.<br />(Ví dụ: nếu ghi ${now:y} thì là 18) |

### Giá trị hệ thống
| Mục | Mô tả |
| ---- | ---- |
| ${system:site_name} | Tên site của hệ thống |
| ${system:site_name_short} | Tên site của hệ thống (rút gọn) |
| ${system:system_mail_from} | Địa chỉ gửi của hệ thống |
| ${system:system_url} | URL trang chủ của hệ thống |
| ${system:login_url} | URL đăng nhập của hệ thống |

### Bảng
| Mục | Mô tả |
| ---- | ---- |
| ${table_name} | Tên bảng (chữ và số) của dữ liệu tương ứng được đặt vào. (Thêm từ v4.2.7) |
| ${table_view_name} | Tên hiển thị của bảng của dữ liệu tương ứng được đặt vào. (Thêm từ v4.2.7) |

### Dữ liệu
| Mục | Mô tả |
| ---- | ---- |
| ${id} | ID của dữ liệu đã đăng ký được đặt vào. (Ví dụ: 123) |
| ${id:(số nguyên)} | ID của dữ liệu đã đăng ký được đặt vào, với số chữ số là số nguyên đã chỉ định. (Ví dụ: nếu ghi ${id:5} thì là 00123) |
| ${suuid} | suuid của dữ liệu đã đăng ký (Short UUID, chuỗi ngẫu nhiên 20 ký tự) được đặt vào. |
| ${created_user} | Tên người dùng đã đăng ký dữ liệu được đặt vào. (Ví dụ: Quản trị viên) |
| ${updated_user} | Tên người dùng đã cập nhật dữ liệu được đặt vào. (Ví dụ: Người dùng A) |
| ${created_at} | Ngày giờ đăng ký dữ liệu được đặt vào. (Ví dụ: 2020/08/06 10:00:00) |
| ${updated_at} | Ngày giờ cập nhật dữ liệu được đặt vào. (Ví dụ: 2020/08/06 14:00:00) |
| ${value_url} | Liên kết hiển thị dữ liệu đã đăng ký được đặt vào. |
| ${value:(tên cột)} | Giá trị cột của dữ liệu đã đăng ký được đặt vào.<br />(Ví dụ: với dữ liệu người dùng, nếu ghi ${value:user_code} thì mã người dùng được đặt vào) |

#### Dữ liệu (tùy chọn)
Khi ghi theo kiểu "${value:(tên cột)/(khóa tùy chọn 1)=(giá trị tùy chọn 1)}", có thể thêm tùy chọn cho tham số. Nếu có nhiều tùy chọn, hãy ngăn cách bằng dấu phẩy.
Ví dụ:
- ${value:mitsumori_date/format="Y"}
- ${value:mitsumori_price/disable_number_format=1,disable_currency_symbol=1}

| Khóa tùy chọn | Mô tả |
| ---- | ---- |
| ${value:(tên cột)/format="(định dạng ngày)"} | Khi loại cột là "Ngày" hoặc "Ngày và giờ", giá trị cột của dữ liệu đã đăng ký được chuyển định dạng rồi hiển thị.<br />(Ví dụ 1: khi bảng "Thông tin hợp đồng (contract)" có cột "Ngày hợp đồng (contract_date)" và muốn hiển thị năm hợp đồng, ghi ${value:contract_date/format="Y"})<br />(Ví dụ 2: khi bảng "Thông tin hợp đồng (contract)" có cột "Ngày hợp đồng (contract_date)" và muốn hiển thị theo dạng "yyyy/mm/dd", ghi ${value:contract_date/format="Y/m/d"})|
| ${value:(tên cột)/disable_number_format=1} | Khi loại cột là "Số nguyên", "Số thập phân" hoặc "Tiền tệ", tắt cài đặt hiển thị số có dấu phân cách hàng nghìn.|
| ${value:(tên cột)/disable_currency_symbol=1} | Khi loại cột là "Tiền tệ", tắt cài đặt định dạng tiền tệ (ký hiệu yên, $, v.v.).|


### Quan hệ, dữ liệu liên quan
| Mục | Mô tả |
| ---- | ---- |
| ${select_table:(tên cột).(tên cột của bảng được tham chiếu)} | Khi cột ứng với "tên cột" là "Lựa chọn (từ bảng khác)", "Người dùng" hoặc "Tổ chức", giá trị cột của bảng được tham chiếu được đặt vào.<br />   (Ví dụ: khi bảng "Thông tin hợp đồng (contract)" có cột "Khách hàng (client)" tham chiếu đến bảng "Thông tin khách hàng (client)", nếu đặt ${select_table:client.client_code} thì hiển thị được mã khách hàng (client_code) của bảng "Thông tin khách hàng (client)") |
| ${parent:(tên cột của bảng được tham chiếu)} | Giá trị cột của bảng cha được đặt vào.<br />(Ví dụ: khi từ bảng "Thông tin chi tiết hợp đồng (contract_detail)" tham chiếu mã hợp đồng (contract_code) của bảng cha "Thông tin hợp đồng (contract)", nếu ghi ${parent:contract_code} thì mã hợp đồng được đặt vào) |


### Riêng theo chức năng
Tùy chức năng, có những biến tham số chỉ dùng được ở chức năng đó.
Dưới đây là danh sách từng chức năng, màn hình và các tham số dùng được ở chức năng đó.

#### Thông báo
Dùng được khi gửi thông báo cho người dùng bằng email hoặc cảnh báo trong hệ thống.

| Mục | Mô tả |
| ---- | ---- |
| ${user:user_name} | Tên người dùng của người dùng nhận email |
| ${user:user_code} | Mã người dùng của người dùng nhận email |
| ${user:email} | Địa chỉ email của người dùng nhận email |

#### Thông báo (tệp đính kèm)
Khi đặt tham số theo quy tắc sau vào cột "Tệp đính kèm tùy chỉnh" của mẫu thông báo, lúc thông báo bằng email, tệp đính kèm đã đăng ký ở cột tùy chỉnh đó sẽ được gửi cho người dùng.
Chi tiết vui lòng xem [Tệp đính kèm và tệp đính kèm tùy chỉnh](/vi/mail?id=tệp-đính-kèm-tệp-đính-kèm-tùy-chỉnh).
Lưu ý: hiện chỉ có hiệu lực với thông báo bằng email.

| Mục | Mô tả |
| ---- | ---- |
| ${file:(tên cột tùy chỉnh)} | Tệp đính kèm đã đăng ký ở cột tùy chỉnh có loại "Tệp" hoặc "Hình ảnh" |
| ${file:select_table:(tên cột tùy chỉnh kiểu lựa chọn).(tên cột tệp của bảng được tham chiếu)} | Tệp đính kèm đã đăng ký ở cột "Tệp" hoặc "Hình ảnh" của dữ liệu đang được chọn trong cột tùy chỉnh "Lựa chọn (từ bảng khác)".<br/>Ví dụ: ${file:select_table:customer.contract_file} |
| ${documents} | Tệp đính kèm đã đăng ký cho màn hình chi tiết dữ liệu (vị trí ứng với hình ảnh ở trang liên kết phía trên) |

#### Người dùng đăng nhập
Chỉ dùng được khi đang đăng nhập. Không dùng được khi thông báo bằng batch, v.v.

| Mục | Mô tả |
| ---- | ---- |
| ${login_user:user_name} | Tên người dùng của người dùng đăng nhập |
| ${login_user:user_code} | Mã người dùng của người dùng đăng nhập |
| ${login_user:email} | Địa chỉ email của người dùng đăng nhập |
| ${login_user:(tên cột)} | Giá trị của cột đã chỉ định của người dùng đăng nhập được đặt vào |

#### Đặt lại mật khẩu
Chỉ dùng được khi gửi email đặt lại mật khẩu.

| Mục | Mô tả |
| ---- | ---- |
| ${system:password_reset_url} | URL đặt lại mật khẩu của hệ thống |
| ${user:password} | Mật khẩu đăng nhập của người dùng nhận email |

#### Biểu mẫu công khai
Chỉ dùng được với thông báo của biểu mẫu công khai.

| Mục | Mô tả |
| ---- | ---- |
| ${publicform:public_form_view_name} | Tên hiển thị biểu mẫu công khai |
| ${publicform:inputs} | Biểu mẫu công khai: giá trị người dùng đã nhập |

#### Biểu mẫu công khai (khi có lỗi)
Chỉ dùng được với thông báo khi có lỗi của biểu mẫu công khai.

| Mục | Mô tả |
| ---- | ---- |
| ${error:message} | Biểu mẫu công khai: tóm tắt lỗi |
| ${error:stacktrace} | Biểu mẫu công khai: chi tiết lỗi |


#### Plugin (xuất tài liệu)

| Mục | Mô tả |
| ---- | ---- |
| ${value_image:(tên cột)} | Khi loại của cột ứng với "tên cột" là "Hình ảnh", hình ảnh được xuất vào Excel. |
| ${value_image:(tên cột)/width=(số nguyên kích thước),height=(số nguyên kích thước)} | Khi chỉ định chiều rộng (width) và chiều cao (height) của hình ảnh xuất ra, hãy nhập tùy chọn. Cũng có thể chỉ định một trong hai, width hoặc height. |


## Ví dụ
Lưu ý: khi ngày chạy là 2018/8/9, ID của dữ liệu đối tượng là 100, user_code (mã người dùng) của dữ liệu đối tượng là "U12345"
- U-${id:4} → U-0100
- ${y}-${m:2}-${d:2}-${id} → 2018-08-09-100
- ${y}${m:2}${d:2}-${id:5} → 20180809-00100
- ${now:y}${m:2}${d:2}-${id:4} → 180809-0100
- ${y}${m:2}${d:2}-${value:user_code} → 20180809-U12345
