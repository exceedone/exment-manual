# Bộ lọc IP
Đây là thiết lập quyết định những địa chỉ IP nào được truy cập trang web và API của Exment.

- Chỉ đăng ký các địa chỉ IP được cho phép (kiểu danh sách trắng).
- Đăng ký riêng cho trang web và cho API. Ví dụ, bạn có thể "chỉ giới hạn địa chỉ IP được thực hiện API".


### Các bước thiết lập
1. Chuyển Exment sang chế độ chuyên gia. Nếu chưa ở chế độ chuyên gia, hãy mở tệp ".env" và thêm giá trị sau.

~~~
EXMENT_EXPART_MODE=true
~~~

2. Mở màn hình "Cài đặt hệ thống". Mục bộ lọc IP đã được thêm vào.

![Thiết lập bộ lọc IP](../img/quickstart/ip_filter.png)

#### Chi tiết nội dung thiết lập

| Việc muốn làm | Cách nhập | Ví dụ |
| ---- | ---- | ---- |
| Cho phép một địa chỉ IP cụ thể | Nhập nguyên địa chỉ IP | 123.4.5.6 |
| Cho phép một dải địa chỉ IP | Nhập theo dạng subnet mask | Ví dụ 1: 123.4.0.0/16 → cho phép truy cập từ 123.4.0.0 đến 123.4.255.255<br>Ví dụ 2: 123.4.10.0/24 → cho phép truy cập từ 123.4.10.0 đến 123.4.10.255 |
| Cho phép truy cập từ localhost trên máy chủ dựng ở localhost | Nhập "::1" | ::1 |
| Cho phép nhiều địa chỉ IP | Nhập mỗi địa chỉ trên một dòng. Chỉ cần khớp một trong số đó là truy cập được | |


#### IPv6 (7.3.0)
Từ Exment 7.3.0, có thể nhập cả địa chỉ và dải IPv6, cùng với IPv4.

| Điều bạn muốn | Cách nhập | Ví dụ |
| ---- | ---- | ---- |
| Cho phép một địa chỉ IPv6 | Nhập địa chỉ như nó là (chữ hoa hay chữ thường, dạng rút gọn hay đầy đủ đều được) | 2001:db8::10 |
| Cho phép mạng của một gia đình hay văn phòng | Nhập dải /64 nhà cung cấp cấp cho | 2001:db8:1:2::/64 |
| Cho phép một dải IPv6 rộng hơn | Nhập kèm độ dài tiền tố | 2001:db8::/32 |

- Một máy khách IPv4 mà máy chủ dual-stack thấy là `::ffff:192.0.2.7` được so sánh như `192.0.2.7`: một dòng IPv4 như `192.0.2.0/24` sẽ khớp.
- Các dòng được phân cách bằng xuống dòng hoặc dấu phẩy. Dòng không phải địa chỉ hay dải không lưu được.
- Giới hạn số lần thử (khóa đăng nhập, giới hạn API) đếm một địa chỉ IPv6 theo /64 của nó: đổi địa chỉ trong cùng /64 không có thêm lượt thử.
- Khi chọn «Rút gọn» trong cài đặt IP của Quản lý log, địa chỉ IPv6 được giữ đến /64 (`2001:db8:1:2::/64`).

#### Buộc tắt giới hạn IP
Đây là các bước dừng giới hạn IP, dùng khi bạn thiết lập sai địa chỉ IP của trang web và không truy cập được nữa.

- Mở tệp ".env" và thêm giá trị sau.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
