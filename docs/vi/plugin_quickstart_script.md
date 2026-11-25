# Plugin (script)
Đây là plugin chạy script riêng (javascript) trên màn hình của Exment.
Có 7 trigger (thời điểm kích hoạt) để chạy script như sau.

| Trigger | Thời điểm khởi động |
| ---- | ---- |
| **Khi tải màn hình** | Khi tải xong màn hình của Exment. Lưu ý: luôn được tải mỗi lần chuyển màn hình. |
| **Khi tải màn hình (lần đầu)** | Khi tải xong màn hình của Exment. Lưu ý: chỉ được tải 1 lần, khi đăng nhập lần đầu hoặc khi làm mới bằng F5. |
| **Khi hiển thị danh sách dữ liệu** | Khi tải xong màn hình danh sách dữ liệu |
| **Khi hiển thị chi tiết dữ liệu** | Khi tải xong màn hình chi tiết dữ liệu |
| **Khi hiển thị tạo mới / chỉnh sửa dữ liệu** | Khi tải xong màn hình tạo mới / chỉnh sửa dữ liệu |
| **Khi tải dashboard** | Khi tải xong box của dashboard |
| **Chế độ xem lịch: khi tải từng mục** | Khi tải từng mục trong chế độ xem lịch. Có thể đổi màu nền và màu chữ. |

## Cách tạo
Ở đây, chúng ta tạo script tự động điền địa chỉ làm ví dụ mẫu.
Trên màn hình chỉnh sửa của dữ liệu "Thông tin cơ bản", khi nhập "Mã bưu điện 1" và "Mã bưu điện 2", script tự động điền "Tỉnh/thành", "Địa chỉ", "Địa chỉ (từ tên tòa nhà trở đi)" từ mã bưu điện 7 chữ số.
![Script](../img/plugin/plugin_script1.png)  

### Tạo config.json
- Tạo tệp config.json như sau.  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "Điền địa chỉ",
    "description": "Điền địa chỉ trên màn hình thông tin cơ bản.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- plugin_name: hãy nhập bằng chữ và số nửa độ rộng (half-width).
- uuid là chuỗi dùng để phân biệt plugin. Gồm 32 ký tự và các dấu gạch nối, tổng cộng 36 ký tự. Không được trùng với plugin khác.  
Có thể tạo ở URL sau, v.v.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type: hãy nhập script.  
- (Tùy chọn) cdns: nhập khi tải thư viện liên quan bằng CDN. Hãy ghi đường dẫn đầy đủ http hoặc https, dưới dạng mảng.

### Tạo tệp js
- Tạo tệp js như sau. Tên đặt tùy ý, bằng chữ và số nửa độ rộng. Trong ví dụ mẫu này, tên là "script.js".

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(ev){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- Sự kiện được gọi theo kiểu jquery.  
- Phần "exment:form_loaded" là nơi định nghĩa sự kiện. Các tên sự kiện Exment đã định nghĩa hiện nay như sau.
    - **exment:loaded** ... Trigger khởi động khi tải xong màn hình của Exment. Lưu ý: luôn được tải mỗi lần chuyển màn hình.  
    - **exment:first_loaded** ... Trigger khởi động khi tải xong màn hình của Exment. Lưu ý: chỉ được tải 1 lần, khi đăng nhập lần đầu hoặc khi làm mới bằng F5.  
    - **exment:list_loaded** ... Sự kiện được chạy khi tải xong màn hình danh sách dữ liệu.  
    - **exment:show_loaded** ... Sự kiện được chạy khi tải xong màn hình chi tiết dữ liệu.  
    - **exment:form_loaded** ... Sự kiện được chạy khi tải xong màn hình tạo mới / chỉnh sửa dữ liệu.
    - **exment:dashboard_loaded** ... Sự kiện được chạy khi tải xong box của dashboard trên màn hình TOP. Lưu ý: được chạy vào lúc từng box của dashboard tải xong, số lần bằng số dashboard.  
    - **exment:calendar_bind** ... Trong chế độ xem lịch, trigger khởi động khi tải từng mục. Có thể đổi màu nền và màu chữ.  
- Hãy đặt script đã tạo trong thư mục "public".  
Có thể đặt nhiều script, miễn là phần mở rộng là "js". Nếu cần thư viện liên quan, hãy đặt tất cả trong thư mục này.  
Trong ví dụ mẫu này, tệp js tùy biến từ [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io) cũng được đặt vào.

### Nén thành zip
Nén thành zip.  
Tên tệp zip là "(plugin_name).zip".  
- SetAddress.zip
    - config.json
    - Thư mục public
        - script.js
        - ajaxzip3-source.js

### Tải plugin lên
Hãy tải tệp zip đã tạo lên ở trang [Plugin](/vi/plugin).

### Điểm cần lưu ý
- Các tệp js đã tải lên **đều được tải khi tải màn hình lần đầu.**
Thứ tự gọi script không cố định (về cơ bản theo thứ tự tên; tuy nhiên sau js của jquery và bootstrap).
Hãy viết theo cách không phụ thuộc vào thứ tự tải.

- Với dữ liệu của từng bảng, có định nghĩa class tên là "custom_value_(tên bảng)".
Khi chỉ muốn chạy script ở một bảng cụ thể, hãy lọc bằng tên class này.
Ví dụ: với màn hình "Người dùng" là "custom_value_user", với màn hình "Tổ chức" là "custom_value_organization"


## Cách viết script

### Màn hình danh sách dữ liệu, màn hình chi tiết dữ liệu, màn hình tạo mới / chỉnh sửa dữ liệu

Hãy viết như sau.

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // Xử lý riêng
    }
});
~~~


### Box của dashboard trên màn hình TOP

- Hãy viết như sau.

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // Xử lý riêng
    }
});
~~~

- Sự kiện này được chạy mỗi khi tải xong 1 box của dashboard (chạy số lần bằng số dashboard). Lý do là từng box của dashboard được gọi không đồng bộ.

- Class div ".box-dashboard" của box dashboard có các thuộc tính data tương ứng với nội dung cài đặt của dashboard.

- Để biết đang tải box dashboard nào, hãy xem thuộc tính data đặt ở target của sự kiện ev.

~~~ js
// Ví dụ
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### Các thuộc tính data đặt cho box của dashboard

##### Chung

| Tên | Mô tả |
| ---- | ---- |
| row_no | Số hàng nơi đặt box của dashboard |
| column_no | Số cột nơi đặt box của dashboard |
| dashboard_box_view_name | Tên hiển thị của box dashboard |
| dashboard_box_type | Loại của box dashboard.<br />system, list, chart, calendar, plugin |


##### Hệ thống

| Tên | Mô tả |
| ---- | ---- |
| target_system_name | Loại mục hệ thống của box dashboard. <br />guideline, news, editor, html |


##### Danh sách dữ liệu, biểu đồ, lịch

| Tên | Mô tả |
| ---- | ---- |
| target_table_id | ID của bảng được hiển thị |
| target_table_name | Tên tiếng Anh của bảng được hiển thị |
| target_view_view_name | Tên hiển thị của chế độ xem được hiển thị |


##### Plugin

| Tên | Mô tả |
| ---- | ---- |
| plugin_id | ID của plugin được hiển thị |
| plugin_uuid | UUID của plugin được hiển thị |
| plugin_name | Tên tiếng Anh của plugin được hiển thị |
| plugin_view_name | Tên hiển thị của plugin được hiển thị |



### Chế độ xem lịch

- **Khi muốn dùng giá trị của từng dữ liệu trong script, trước tiên hãy làm cài đặt sau ở [Thay đổi giá trị cài đặt](/vi/config).**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- Hãy viết như sau.

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // Nếu không phải bảng "Thông báo" thì kết thúc
        // Nửa đầu: kiểm tra chế độ xem của bảng, nửa sau: kiểm tra dashboard
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // Khi "mức độ quan trọng" từ cao (4) trở lên thì buộc đổi thành nền đỏ
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- Sự kiện này khởi động trước khi hiển thị chế độ xem lịch.

- Tham số thứ 2 là event chứa các giá trị sau.

| Khóa | Kiểu | Mô tả |
| ---- | ---- | ---- |
| allDayBetween | true/false | Có phải cả ngày hay không |
| start | string | Ngày giờ bắt đầu |
| end | string | Ngày giờ kết thúc |
| title | string | Tên hiển thị |
| color | string | Màu nền |
| textColor | string | Màu chữ |
| url | string | Nơi chuyển đến khi bấm |
| id | int | ID của dữ liệu tương ứng (chỉ lấy được khi đã cài đặt lấy ID ở phần thay đổi giá trị cài đặt) |
| value | array | Giá trị đã đăng ký của dữ liệu tương ứng (chỉ lấy được khi đã cài đặt lấy ID ở phần thay đổi giá trị cài đặt) |

- Khi muốn đổi giá trị theo điều kiện, hãy ghi đè giá trị của event rồi return event.

### Điểm cần lưu ý
Giống với "Điểm cần lưu ý" trong "Cách tạo" ở trên. Hãy chú ý thời điểm và thứ tự tải tệp js, và tên class theo từng bảng "custom_value_(tên bảng)".


## Plugin mẫu
- [Script điền địa chỉ](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [Script chuyển chữ và số toàn độ rộng → nửa độ rộng](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
Script chuyển chữ và số toàn độ rộng (full-width) thành chữ và số nửa độ rộng (half-width).  

- [Script chuyển kana nửa độ rộng → kana toàn độ rộng](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
Script chuyển kana nửa độ rộng thành kana toàn độ rộng.  
