# Ghi chú phát triển
Đây là các ghi chú dành cho nhà phát triển.  
Trang này tổng hợp các đặc tả, v.v. quá chi tiết để viết vào tài liệu hướng dẫn của từng màn hình, nhưng nên được chia sẻ giữa các nhà phát triển.

## Lý do không kết hợp được quyền "Tham chiếu tất cả dữ liệu" với "Chỉnh sửa dữ liệu phụ trách", v.v.
Hiện nay, với một bảng nhất định, không thể kết hợp quyền "Tham chiếu tất cả dữ liệu" với "Chỉnh sửa dữ liệu phụ trách" hoặc "Xem dữ liệu phụ trách".  
Lý do là đặc tả sau.

#### Tiền đề
Các quyền được gộp lại, và quyền mạnh hơn (quyền thuộc loại "cho phép") được ưu tiên.  
Ví dụ, khi kết hợp "cho phép lấy tất cả dữ liệu" với "chỉ lấy được dữ liệu được chia sẻ cho mình", thì "cho phép lấy tất cả dữ liệu" được ưu tiên.

#### Chi tiết của quyền "Tham chiếu tất cả dữ liệu"

- Khi chạy SQL, không thêm mệnh đề where theo chia sẻ dữ liệu, và cho phép lấy tất cả dữ liệu.
- Không hiển thị được màn hình danh sách. Ngoài ra, không hiển thị được mục trên menu.
- Không tạo mới và chỉnh sửa được dữ liệu.

#### Chi tiết của quyền "Chỉnh sửa dữ liệu phụ trách"

- Khi chạy SQL, mệnh đề where theo dữ liệu được áp dụng, và chỉ lấy được dữ liệu được chia sẻ cho mình.
- Hiển thị được màn hình danh sách. Ngoài ra, hiển thị được mục trên menu.
- Tạo mới được dữ liệu, và chỉnh sửa được dữ liệu được chia sẻ cho mình.


#### Kết quả
Khi kết hợp 2 quyền này, chi tiết trở thành như sau.

- Khi chạy SQL, không thêm mệnh đề where theo chia sẻ dữ liệu, và cho phép lấy tất cả dữ liệu.
- Hiển thị được màn hình danh sách. Ngoài ra, hiển thị được mục trên menu.
- Tạo mới được dữ liệu, và chỉnh sửa được dữ liệu được chia sẻ cho mình.

Tức là, tất cả dữ liệu được hiển thị ở màn hình danh sách, và người dùng tạo mới được dữ liệu, chỉnh sửa được dữ liệu được chia sẻ cho mình.  
  
Cũng có thể thêm vào từng màn hình xử lý "ở màn hình danh sách, không cho lấy tất cả dữ liệu mà chỉ cho lấy dữ liệu được chia sẻ cho mình". Nhưng khi đó phải thêm xử lý này vào tất cả plugin riêng và các màn hình khác, và việc này có thể trở thành lỗ hổng bảo mật.  
Ngoài ra, tình huống này hoàn toàn giống với việc kết hợp "Xem tất cả dữ liệu" với "Chỉnh sửa dữ liệu phụ trách".  
Vì vậy, hiện nay không thể thiết lập kết hợp "Tham chiếu tất cả dữ liệu" với "Chỉnh sửa dữ liệu phụ trách", v.v.  

#### Mục đích sử dụng của "Tham chiếu tất cả dữ liệu"
Về mục đích sử dụng, chủ yếu là các trường hợp như sau.  

- Thuế suất  
    →Cấp cho người phụ trách, v.v. quyền "Tham chiếu tất cả dữ liệu" và "Chỉnh sửa tất cả dữ liệu", để bảo trì như dữ liệu chủ.  
    →Người dùng thông thường chỉ được cấp "Tham chiếu tất cả dữ liệu", để lấy được dữ liệu làm lựa chọn.




## Đặc tả khi xóa dữ liệu tùy chỉnh
Đã được xem xét lại từ v4.0.7.

#### Khi xóa logic
※Vì có khả năng khôi phục, về cơ bản dữ liệu được giữ lại  

- Tệp của cột tùy chỉnh "Tệp", "Hình ảnh": không bị xóa
- Tệp đính kèm: không bị xóa
- Quan hệ (dữ liệu con khi xóa dữ liệu cha, với 1:n): bị xóa logic
- Quan hệ (ngoài trường hợp trên): không bị xóa
- Kiểm soát quyền: không bị xóa
- Phiên bản sửa đổi: không bị xóa, và lịch sử về ngày giờ xóa được thêm vào
- Thông báo: được thực hiện
- Lịch sử quy trình làm việc: không bị xóa

#### Khi xóa vĩnh viễn
Xóa vật lý

- Tệp của cột tùy chỉnh "Tệp", "Hình ảnh": bị xóa
- Tệp đính kèm: bị xóa
- Quan hệ: tất cả bị xóa vật lý
- Kiểm soát quyền: bị xóa
- Phiên bản sửa đổi: bị xóa
- Thông báo: không được thực hiện
- Lịch sử quy trình làm việc: bị xóa

#### Khi xóa vật lý ngay
※Nếu đặt giá trị thiết lập EXMENT_DELETE_FORCE_CUSTOM_VALUE là 1 thì dữ liệu bị xóa vật lý ngay

- Tệp của cột tùy chỉnh "Tệp", "Hình ảnh": bị xóa
- Tệp đính kèm: bị xóa
- Quan hệ: tất cả bị xóa vật lý
- Kiểm soát quyền: bị xóa
- Phiên bản sửa đổi: bị xóa
- Thông báo: được thực hiện
- Lịch sử quy trình làm việc: bị xóa



## Lý do kết quả của hàm getOrganizationIdsForQuery bị đảo ngược so với tổ chức thực tế
Với hàm \Exment::user()->getOrganizationIdsForQuery, kết quả lấy được bị đảo ngược so với tổ chức trực thuộc thực tế.  
Ví dụ, giả sử có cơ cấu tổ chức như sau.

```
 Ex. (O):Ogganization, (U):User
 
     (O)Company
         (O)develop-team
             (U) Manager
 
             (O) develop-team1
                  (U) User1
                  (U) User2
             (O) develop-team2
                  (U) User3
```

Ở đây, khi người dùng đăng nhập là Manager và $filterType là JoinedOrgFilterType::ONLY_UPPER, ta dễ hình dung là sẽ lấy được (O)develop-team và (O)Company, nhưng  
**thực tế lấy được (O)develop-team, (O) develop-team1 và (O) develop-team2.**
  
Lý do là hàm này chỉ nhằm mục đích lấy dữ liệu được chia sẻ và dữ liệu có quyền, chứ không nhằm mục đích lấy tổ chức thực tế.  
Ví dụ, với thiết lập "dữ liệu A được chia sẻ cho (O)develop-team1" và "việc chia sẻ dữ liệu bao gồm tổ chức ở cấp cha (JoinedOrgFilterType::ONLY_UPPER)", Manager sẽ lấy được dữ liệu được chia sẻ cho (O)develop-team, (O) develop-team1 và (O) develop-team2.  
Trong trường hợp này, khi xử lý truy vấn, Manager được coi là thuộc (O)develop-team, (O) develop-team1 và (O) develop-team2, rồi SQL được chạy.  

Vì vậy, khác với hình dung từ giá trị của Enum, kết quả thực tế lấy được bị đảo ngược.


## Xử lý tải plugin
Thông thường, autoload được dùng để tải các tệp PHP.  
Autoload được tạo bởi composer, và nhà phát triển chương trình cũng như người dùng hầu như không cần để ý đến.  
  
Tuy nhiên, các tệp PHP được cài đặt bằng plugin không dùng được autoload.  
Lý do là tệp plugin của Exment có thể được đặt ở dịch vụ bên ngoài như AWS S3 hoặc FTP, nên tệp plugin thực tế có thể không tồn tại trên máy chủ.  
※Chi tiết về chức năng này, vui lòng xem [tại đây](/vi/additional_file_saveplace)  
  
Vì vậy, việc tải plugin được xử lý theo cách đặc biệt.  
Dưới đây là chi tiết.  

### Tải xuống tệp plugin (khi tệp plugin được đặt ở dịch vụ bên ngoài)
Khi tệp plugin được đặt ở dịch vụ bên ngoài, tệp được tải xuống.  
Exment xét các điểm sau và chỉ tải xuống khi cần.

- Kiểm tra xem trong thư mục plugin tương ứng trên máy chủ "/storage/app/plugins/(tên plugin)" có tệp "updated_at.txt" hay không  
→Nếu không có thì cần tải xuống

- Mở tệp "updated_at.txt" và kiểm tra timestamp ghi trong đó

- So sánh với ngày giờ cập nhật của bảng "plugin" trong cơ sở dữ liệu, và kiểm tra xem ngày giờ có khác nhau không  
→Nếu khác nhau thì cần tải xuống

Khi cần tải xuống, tệp plugin được tải xuống từ dịch vụ bên ngoài.  
Sau đó, tệp "updated_at.txt" được tạo trong thư mục plugin tương ứng và timestamp được ghi vào.

### Thêm thư mục vào ClassLoader riêng
Lặp qua từng tệp plugin, rồi thêm thư mục plugin tương ứng và namespace khớp với plugin đó vào \Exceedone\Exment\Services\ClassLoader riêng.

### Thực hiện xử lý tải
Khi class của plugin được gọi, ClassLoader riêng được gọi bởi spl_autoload_register.  
Nhờ đó, tệp PHP khớp được require_once, với khóa là namespace của class được gọi và thư mục plugin tương ứng.  
Nhờ xử lý này, kể cả class chưa được tải cũng được đọc động và require_once được thực hiện.




## Thiết lập lọc của loại cột "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức"
Ở màn hình nhập dữ liệu tùy chỉnh, các lựa chọn được hiển thị ở loại cột "Lựa chọn (từ bảng khác)", "Người dùng", "Tổ chức" không phải lúc nào cũng hiển thị toàn bộ.  
Dưới đây là các kiểu lọc lựa chọn.  
  
※Để giải thích, giả sử có các bảng như sau làm ví dụ.  

- Bảng đang hiển thị: Hợp đồng
- Bảng 1 được tham chiếu bằng loại cột "Lựa chọn (từ bảng khác)": Khách hàng
- Bảng 2 được tham chiếu bằng loại cột "Lựa chọn (từ bảng khác)": Người phụ trách  
※Bảng Khách hàng và bảng Người phụ trách được thiết lập quan hệ cha-con 1:n


### Các trường hợp lọc của loại cột "Lựa chọn (từ bảng khác)"

#### Quyền của người dùng đăng nhập
Ở bảng được tham chiếu (Khách hàng), chỉ những dữ liệu mà người dùng đăng nhập có quyền truy cập mới được hiển thị.  
Dữ liệu không có quyền không được hiển thị trong các lựa chọn.  

##### Cách xử lý với thiết lập này
Khi lựa chọn mong muốn không được hiển thị, hãy làm một trong các việc sau để thêm quyền.  

- Hãy chia sẻ dữ liệu của bảng được tham chiếu (Khách hàng) mà bạn muốn hiển thị trong các lựa chọn cho người dùng đăng nhập.  
Chi tiết: [Chia sẻ dữ liệu](/vi/data_details?id=chia-sẻ-dữ-liệu)

- Hãy thêm quyền "Chỉnh sửa tất cả dữ liệu / Xem tất cả dữ liệu" của "bảng được tham chiếu (Khách hàng)" vào nhóm vai trò mà người dùng đăng nhập thuộc về.  
Chi tiết: [Nhóm vai trò](/vi/role_group)


#### Thiết lập cột "Chế độ xem điều kiện"
Khi thiết lập cột "Chế độ xem điều kiện" đã được thực hiện, các lựa chọn hiển thị được lọc theo điều kiện lọc của chế độ xem điều kiện đó.  
※Chế độ xem điều kiện là chế độ xem để lọc dữ liệu của bảng được tham chiếu (Khách hàng).

##### Cách xử lý với thiết lập này
Khi lựa chọn mong muốn không được hiển thị, hãy làm một trong các việc sau.  

- Hãy xem lại điều kiện của chế độ xem điều kiện của bảng được tham chiếu (Khách hàng) mà bạn muốn hiển thị trong các lựa chọn.  
Chi tiết: [Chế độ xem điều kiện](/vi/view?id=view-điều-kiện)

- Hãy xóa thiết lập của thiết lập cột "Chế độ xem điều kiện".


#### Có từ 100 dữ liệu trở lên
Khi bảng được tham chiếu (Khách hàng) có từ 100 dữ liệu trở lên, các lựa chọn không được hiển thị lúc ban đầu.  
Khi nhập từ tìm kiếm, chỉ những dữ liệu khớp với từ tìm kiếm đó được hiển thị làm lựa chọn.   
Ngoài ra, khi thiết lập "Tìm kiếm lựa chọn mỗi lần nhập" của cột tùy chỉnh là YES, các lựa chọn được hiển thị theo cách này bất kể số dữ liệu.  


#### Thiết lập lọc theo quan hệ
Ở màn hình thiết lập biểu mẫu tùy chỉnh có thiết lập "Lọc theo quan hệ".  
Đây là chức năng: khi các lựa chọn có quan hệ cha-con nằm trong cùng một biểu mẫu, việc chọn lựa chọn cha (Khách hàng) sẽ tự động lọc các lựa chọn con (Người phụ trách).  
Chi tiết: [Cài đặt biểu mẫu](/vi/form?id=thiết-lập-lọc-liên-quan)  
 
Với thiết lập này, hành vi như sau.

- Các lựa chọn con (Người phụ trách) khi chưa chọn cha (Khách hàng)  
→Không có lựa chọn nào được hiển thị.

- Các lựa chọn con (Người phụ trách) khi đã chọn cha (Khách hàng)  
→Trong dữ liệu con (Người phụ trách), những dữ liệu có giá trị cha (Khách hàng) là giá trị đã chọn ở lựa chọn cha được hiển thị thành danh sách.  




### Các trường hợp lọc của loại cột "Người dùng", "Tổ chức"

#### Quyền của người dùng và tổ chức ở bảng đang hiển thị
Chỉ những người dùng và tổ chức có thể truy cập bảng đang hiển thị (Hợp đồng) mới được hiển thị trong các lựa chọn.  
<span class="red">※Quyền của người dùng đang đăng nhập không ảnh hưởng.</span> Tiêu chí xét là "người dùng hoặc tổ chức hiển thị trong các lựa chọn có quyền với bảng đang hiển thị hay không".  

##### Cách xử lý với thiết lập này
Khi lựa chọn mong muốn không được hiển thị, hãy làm một trong các việc sau.  

- Ở thiết lập nhóm vai trò, hãy thêm "người dùng hoặc tổ chức muốn hiển thị trong các lựa chọn" vào nhóm vai trò có quyền với "bảng đang hiển thị (Hợp đồng)".  
Chi tiết: [Nhóm vai trò](/vi/role_group)

- Ở thiết lập cột tùy chỉnh, hãy đặt "Hiển thị cả người dùng / tổ chức không có quyền" là YES.  
Khi đặt thiết lập này là YES, việc kiểm tra "người dùng hoặc tổ chức có quyền ở bảng đang hiển thị (Hợp đồng) hay không" không còn được thực hiện.


#### Thiết lập cho trang cổng thông tin bên ngoài (khi xây dựng hệ thống mà người dùng của nhiều tổ chức đăng nhập)
Ở màn hình danh sách dữ liệu và màn hình chỉnh sửa, khi hiển thị người dùng và tổ chức, có trường hợp thiết lập **"chỉ hiển thị tổ chức mà người dùng đăng nhập thuộc về và những người dùng thuộc tổ chức đó"**.  
Khi thiết lập này đã được thực hiện, lúc người dùng đăng nhập hiển thị các lựa chọn tổ chức và người dùng, chỉ những người dùng và tổ chức có quan hệ cha-con với người dùng đăng nhập mới được hiển thị.  
Chi tiết: [Thiết lập cho trang cổng thông tin bên ngoài](/vi/multiuser)


#### Thiết lập cột "Chế độ xem điều kiện"
Khi thiết lập cột "Chế độ xem điều kiện" đã được thực hiện, các lựa chọn hiển thị được lọc theo điều kiện lọc của chế độ xem điều kiện đó.  
※Chế độ xem điều kiện là chế độ xem để lọc dữ liệu của bảng được tham chiếu (Người dùng).

##### Cách xử lý với thiết lập này
Khi lựa chọn mong muốn không được hiển thị, hãy làm một trong các việc sau.  

- Hãy xem lại điều kiện của chế độ xem điều kiện của bảng được tham chiếu (Người dùng) mà bạn muốn hiển thị trong các lựa chọn.  
Chi tiết: [Chế độ xem điều kiện](/vi/view?id=view-điều-kiện)

- Hãy xóa thiết lập của thiết lập cột "Chế độ xem điều kiện".


#### Có từ 100 dữ liệu trở lên
Khi bảng được tham chiếu (Người dùng) có từ 100 dữ liệu trở lên, các lựa chọn không được hiển thị lúc ban đầu.  
Khi nhập từ tìm kiếm, chỉ những dữ liệu khớp với từ tìm kiếm đó được hiển thị làm lựa chọn.   
Ngoài ra, khi thiết lập "Tìm kiếm lựa chọn mỗi lần nhập" của cột tùy chỉnh là YES, các lựa chọn được hiển thị theo cách này bất kể số dữ liệu.  


#### Thiết lập lọc theo quan hệ
Ở màn hình thiết lập biểu mẫu tùy chỉnh có thiết lập "Lọc theo quan hệ".  
Đây là chức năng: khi các lựa chọn có quan hệ cha-con nằm trong cùng một biểu mẫu, việc chọn lựa chọn cha (Tổ chức) sẽ tự động lọc các lựa chọn con (Người dùng).  
Chi tiết: [Cài đặt biểu mẫu](/vi/form?id=thiết-lập-lọc-liên-quan)  
 
Với thiết lập này, hành vi như sau.

- Các lựa chọn con (Người dùng) khi chưa chọn cha (Tổ chức)  
→Không có lựa chọn nào được hiển thị.

- Các lựa chọn con (Người dùng) khi đã chọn cha (Tổ chức)  
→Trong dữ liệu con (Người dùng), những dữ liệu thuộc cha (Tổ chức) được hiển thị thành danh sách.  


## Bảng danh sách màn hình và chức năng

### Bảng điều khiển
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị bảng điều khiển</td>
            <td>Hiển thị toàn bộ các mục đã thiết lập trên bảng điều khiển.</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Tạo mới bảng điều khiển</td>
            <td>Tạo mới bảng điều khiển.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Chỉnh sửa bảng điều khiển</td>
            <td>Sửa thông tin của bảng điều khiển đã tạo.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Xóa bảng điều khiển</td>
            <td>Xóa bảng điều khiển đã tạo.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Chỉnh sửa mục của bảng điều khiển</td>
            <td>Sửa nội dung của 1 mục trên bảng điều khiển.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Xóa mục của bảng điều khiển</td>
            <td>Xóa nội dung của 1 mục trên bảng điều khiển.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Loại biểu đồ</td>
            <td>Hiển thị dữ liệu đã lưu của chế độ xem tổng hợp bằng loại biểu đồ đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Loại lịch</td>
            <td>Hiển thị dữ liệu đã lưu của chế độ xem lịch theo dạng của loại đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
</table>

### Cài đặt hệ thống
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Sử dụng API</td>
            <td>Thiết lập có cho dùng API hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Giao tiếp với máy chủ bên ngoài</td>
            <td>Thiết lập có cho giao tiếp với máy chủ bên ngoài hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Quản lý quyền</td>
            <td>Thiết lập có cho thiết lập quyền với toàn hệ thống và bảng tùy chỉnh hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Quản lý tổ chức</td>
            <td>Khi dùng quản lý quyền, thiết lập có cho cấp quyền bằng cách chỉ định tổ chức hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Sử dụng quản trị hệ thống</td>
            <td>Thiết lập người dùng làm người giám sát hệ thống.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Số dòng hiển thị của danh sách dữ liệu</td>
            <td>Hiển thị dữ liệu ở trang danh sách với số dòng hiển thị mặc định.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Định dạng hiển thị ngày giờ</td>
            <td> Ngày và giờ được hiển thị theo định dạng đã chọn.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Phương thức tìm kiếm dữ liệu</td>
            <td>Dữ liệu đã lưu được tìm kiếm theo phương thức đã chọn.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Ẩn bộ lọc danh sách dữ liệu</td>
            <td>Ẩn các mục lọc nhất định ở màn hình danh sách dữ liệu.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Trang chuyển đến mặc định sau khi lưu dữ liệu</td>
            <td>Sau khi lưu dữ liệu tùy chỉnh, hệ thống chuyển đến màn hình đã chọn.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Sử dụng biểu mẫu công khai</td>
            <td>Thiết lập có cho dùng biểu mẫu công khai hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Google reCAPTCHA</td>
            <td>Thiết lập phiên bản của Google reCAPTCHA.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt phân cấp tổ chức</td>
            <td>Phạm vi thiết lập vai trò và phạm vi chia sẻ dữ liệu sẽ bao gồm các tổ chức ở cấp cha-con đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt chia sẻ dữ liệu</td>
            <td>Khi tạo mới dữ liệu tùy chỉnh, dữ liệu được tự động chia sẻ cho phạm vi đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Bộ lọc người dùng/tổ chức</td>
            <td>Người dùng và tổ chức được hiển thị trong phạm vi đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt chế độ xem/bảng điều khiển</td>
            <td>Thiết lập có cho người dùng đăng nhập tạo bảng điều khiển và chế độ xem hay không.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt email hệ thống</td>
            <td>Hệ thống gửi được email dựa trên thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt Slack</td>
            <td>Khi thông báo qua Slack, có thể thêm mention đến ID người dùng.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt bộ lọc IP</td>
            <td>Cho phép giao tiếp từ các địa chỉ IP đã thiết lập.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Gửi email thử</td>
            <td>Gửi email thử.</td>
            <td>Quản trị hệ thống</td>
        </tr>
</table>


### Thiết lập bảng tùy chỉnh
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị bảng tùy chỉnh</td>
            <td>Hiển thị danh sách các bảng tùy chỉnh đã lưu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Tạo mới bảng tùy chỉnh</td>
            <td>Tạo mới bảng tùy chỉnh.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉnh sửa bảng tùy chỉnh</td>
            <td>Sửa thiết lập của bảng tùy chỉnh đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Danh sách dữ liệu của bảng tùy chỉnh</td>
            <td>Hiển thị danh sách dữ liệu của bảng tùy chỉnh.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Thiết lập mở rộng của bảng tùy chỉnh</td>
            <td>Thực hiện thiết lập mở rộng của bảng tùy chỉnh.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Xóa bảng tùy chỉnh</td>
            <td>Xóa bảng tùy chỉnh đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cho phép tìm kiếm</td>
            <td>Cho phép tìm kiếm từ màn hình tìm kiếm.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Dùng ID làm nhãn</td>
            <td>Hiển thị giá trị id của dữ liệu làm mục tiêu đề.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉ cho phép lưu một bản ghi</td>
            <td>Chỉ cho lưu 1 dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Sử dụng tệp đính kèm</td>
            <td>Có thể đính kèm tệp vào từng dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Sử dụng bình luận</td>
            <td>Có thể thêm bình luận vào từng dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Sử dụng lịch sử thay đổi dữ liệu</td>
            <td>Lưu lịch sử thay đổi của dữ liệu khi lưu dữ liệu</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Số phiên bản lịch sử thay đổi</td>
            <td>Lưu lịch sử thay đổi của dữ liệu đến số lượng tối đa đã thiết lập</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt quyền</td>
            <td>Tất cả người dùng có thể chỉnh sửa, xem và tham chiếu bảng.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt cột hiển thị tiêu đề</td>
            <td>Thiết lập cột của chuỗi hiển thị trên màn hình khi chọn dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt khóa duy nhất kết hợp</td>
            <td>Không cho lưu dữ liệu khi giá trị của tất cả các cột đã thiết lập trùng với giá trị đã lưu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>So sánh 2 cột</td>
            <td>So sánh 2 cột đã thiết lập, và chỉ cho lưu dữ liệu khi khớp với điều kiện.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt tự động chia sẻ dữ liệu</td>
            <td>Khi lưu dữ liệu, dữ liệu được tự động chia sẻ cho người dùng và tổ chức được thiết lập trong dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Đồng bộ cài đặt tự động chia sẻ dữ liệu khi cập nhật</td>
            <td>Khi tự động chia sẻ dữ liệu, những người dùng và tổ chức không được thiết lập ở cột bị xóa khỏi thiết lập chia sẻ.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Không cho thay đổi từ màn hình</td>
            <td>Không cho thực hiện các thao tác đã thiết lập từ màn hình.</td>
            <td>Quản lý bảng</td>
        </tr>
</table>

### Cột tùy chỉnh
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị cột tùy chỉnh</td>
            <td>Hiển thị danh sách các cột tùy chỉnh đã lưu.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Tạo mới cột tùy chỉnh</td>
            <td>Tạo mới cột tùy chỉnh.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉnh sửa cột tùy chỉnh</td>
            <td>Sửa cột tùy chỉnh đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Xóa cột tùy chỉnh</td>
            <td>Xóa cột tùy chỉnh đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉ mục tìm kiếm</td>
            <td>Thêm chỉ mục tìm kiếm.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Đối tượng tìm kiếm tự do</td>
            <td>Đưa vào phạm vi tìm kiếm khi nhập chuỗi vào thanh tìm kiếm để tìm.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Duy nhất</td>
            <td>Không cho lưu cùng giá trị ở dữ liệu khác.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉ nhập một lần</td>
            <td>Chỉ cho nhập giá trị 1 lần.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Văn bản gợi ý</td>
            <td>Hiển thị chuỗi hướng dẫn ở trường trước khi nhập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Trợ giúp</td>
            <td>Hiển thị chuỗi trợ giúp bên dưới trường.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Độ rộng tối thiểu / tối đa của cột</td>
            <td>Chỉ định độ rộng của cột khi hiển thị danh sách.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Gợi ý nhập liệu</td>
            <td>Từ các giá trị của dữ liệu đã lưu ở cùng cột tùy chỉnh, hiển thị những giá trị khớp với nội dung nhập làm gợi ý nhập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Biểu thức chính quy</td>
            <td>Kiểm tra dữ liệu nhập bằng biểu thức chính quy.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Giá trị tối thiểu</td>
            <td>Báo lỗi khi gửi giá trị nhỏ hơn giá trị này.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Giá trị tối đa</td>
            <td>Báo lỗi khi gửi giá trị lớn hơn giá trị này.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Công thức tính</td>
            <td>Tính toán bằng các toán tử thông thường và biến.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Lựa chọn</td>
            <td>Hiển thị các lựa chọn đã lưu làm gợi ý.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Nút radio / hộp kiểm</td>
            <td>Nhập vào biểu mẫu theo dạng nút radio hoặc hộp kiểm.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cho phép nhập tự do</td>
            <td>Nhập tự do và lưu lựa chọn chưa được lưu trong thiết lập cột.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Loại giá trị ban đầu</td>
            <td>Thiết lập loại giá trị ban đầu khi tạo mới.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Bảng đích</td>
            <td>Bảng đã chỉ định được hiển thị làm các lựa chọn.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Tìm kiếm lựa chọn mỗi lần nhập</td>
            <td>Tìm dữ liệu bằng giá trị người dùng nhập và lọc các gợi ý.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Loại đánh số tự động</td>
            <td>Đánh số khi lưu dữ liệu theo loại đã chọn.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Hiển thị cả người dùng / tổ chức không có quyền</td>
            <td>Hiển thị cả người dùng và tổ chức không có quyền truy cập bảng.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cho phép chọn nhiều</td>
            <td>Có thể chọn nhiều ở các mục hình ảnh, tệp và lựa chọn.</td>
            <td>Quản lý bảng</td>
        </tr>
</table>


### Cài đặt biểu mẫu tùy chỉnh
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị biểu mẫu tùy chỉnh</td>
            <td>Hiển thị toàn bộ các biểu mẫu đã lưu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Tạo mới biểu mẫu tùy chỉnh</td>
            <td>Tạo mới biểu mẫu tùy chỉnh.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Chỉnh sửa biểu mẫu tùy chỉnh</td>
            <td>Sửa thông tin của biểu mẫu tùy chỉnh đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Xóa biểu mẫu tùy chỉnh</td>
            <td>Xóa biểu mẫu tùy chỉnh đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Xem trước biểu mẫu tùy chỉnh</td>
            <td>Hiển thị xem trước biểu mẫu tùy chỉnh.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Nhân bản biểu mẫu tùy chỉnh</td>
            <td>Nhân bản biểu mẫu đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Tạo mới thứ tự ưu tiên biểu mẫu</td>
            <td>Tạo mới thiết lập thứ tự ưu tiên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Chỉnh sửa thứ tự ưu tiên biểu mẫu</td>
            <td>Sửa thiết lập thứ tự ưu tiên biểu mẫu đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Xóa thứ tự ưu tiên biểu mẫu</td>
            <td>Xóa thiết lập thứ tự ưu tiên biểu mẫu đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Biểu mẫu mặc định</td>
            <td>Đặt làm biểu mẫu mặc định được hiển thị khi lưu dữ liệu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Cách hiển thị màn hình chi tiết</td>
            <td>Màn hình chi tiết dữ liệu được bố trí theo cách đã thiết lập.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Cách hiển thị nhãn</td>
            <td>Tiêu đề của từng mục được hiển thị theo cách đã thiết lập.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Thiết lập khối biểu mẫu</td>
            <td>Thiết lập các khung để bố trí mục của biểu mẫu, mỗi dòng từ 1 đến 4 cột.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Thêm khung</td>
            <td>Tạo khung mới ở dòng tiếp theo hoặc cột tiếp theo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Đổi kích thước khung</td>
            <td>Thay đổi kích thước của khung đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Xóa khung</td>
            <td>Xóa khung đã tạo.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Tiêu đề</td>
            <td>Hiển thị chuỗi dạng tiêu đề trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Văn bản giải thích</td>
            <td>Hiển thị chuỗi làm văn bản giải thích trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>HTML</td>
            <td>Hiển thị nội dung HTML đã thiết lập trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>HTML mở rộng</td>
            <td>Hiển thị HTML và nội dung đã thiết lập làm tham số trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Hình ảnh</td>
            <td>Hiển thị hình ảnh trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Đường phân cách</td>
            <td>Hiển thị đường phân cách trên biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Thiết lập mục của biểu mẫu</td>
            <td>Mở hộp thoại thiết lập và thực hiện thiết lập chi tiết cho mục của biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Dạng hiển thị tiêu đề</td>
            <td>Mục của biểu mẫu được hiển thị theo cách đã thiết lập.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Loại trường</td>
            <td>Ở màn hình biểu mẫu, mục được hiển thị theo dạng hiển thị đã thiết lập (Chỉ đọc, Chỉ hiển thị, Trường ẩn, Ẩn).</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Cài đặt liên kết dữ liệu</td>
            <td>Khi chọn dữ liệu của bảng khác trong biểu mẫu, nội dung của dữ liệu đã chọn được sao chép sang mục khác có liên quan.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Cài đặt lọc theo quan hệ</td>
            <td>Lọc các lựa chọn theo lựa chọn ở mục khác trong biểu mẫu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
        <tr>
            <td>Cài đặt thứ tự ưu tiên biểu mẫu tùy chỉnh</td>
            <td>Bằng cách thiết lập điều kiện và độ ưu tiên, chuyển đổi màn hình biểu mẫu dùng khi tạo dữ liệu và ở màn hình chi tiết dữ liệu.</td>
            <td>Quản lý biểu mẫu</td>
        </tr>
</table>


### Tạo và chỉnh sửa dữ liệu
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị biểu mẫu tạo dữ liệu</td>
            <td>Hiển thị biểu mẫu để lưu dữ liệu.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hiển thị danh sách dữ liệu</td>
            <td>Hiển thị danh sách dữ liệu của bảng.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hiển thị chi tiết dữ liệu</td>
            <td>Hiển thị chi tiết dữ liệu đang mở ở màn hình chỉnh sửa.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa dữ liệu</td>
            <td>Xóa dữ liệu đang mở ở màn hình chỉnh sửa.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Tìm</td>
            <td>Mở bảng là đối tượng của lựa chọn và chọn dữ liệu.</td>
            <td>Chỉnh sửa dữ liệu, Tham chiếu dữ liệu của bảng đích</td>
        </tr>
        <tr>
            <td>Tải lên tệp và hình ảnh</td>
            <td>Có thể tải lên bằng cách chọn tệp hoặc kéo thả.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Tạo mới dữ liệu của bảng con</td>
            <td>Tạo mới dữ liệu của bảng con có quan hệ 1:n.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa dữ liệu của bảng con</td>
            <td>Xóa dữ liệu được chỉ định của bảng con có quan hệ 1:n.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hộp kiểm: Danh sách</td>
            <td>Sau khi lưu dữ liệu, hiển thị màn hình danh sách dữ liệu.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hộp kiểm: Xem</td>
            <td>Sau khi lưu dữ liệu, hiển thị màn hình chi tiết dữ liệu.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hộp kiểm: Tiếp tục tạo mới</td>
            <td>Sau khi lưu dữ liệu, hiển thị màn hình tạo mới dữ liệu khác.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Hộp kiểm: Tiếp tục chỉnh sửa</td>
            <td>Sau khi lưu dữ liệu, hiển thị màn hình chỉnh sửa dữ liệu hiện tại.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
</table>

### Danh sách dữ liệu
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị danh sách dữ liệu</td>
            <td>Hiển thị danh sách dữ liệu của bảng.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Tạo mới</td>
            <td>Tạo mới dữ liệu của bảng.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Chế độ xem dữ liệu</td>
            <td>Chọn từ các chế độ xem đã tạo và hiển thị danh sách dữ liệu. Ngoài ra, tạo mới, chỉnh sửa chế độ xem, v.v.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Tìm kiếm tự do</td>
            <td>Tìm kiếm trong danh sách dữ liệu bằng từ nhập vào thanh tìm kiếm.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Bộ lọc</td>
            <td>Lọc nội dung của danh sách dữ liệu.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Nhập</td>
            <td>Nhập dữ liệu của bảng đang hiển thị.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xuất</td>
            <td>Xuất dữ liệu của bảng đang hiển thị.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Hiển thị dữ liệu đã xóa</td>
            <td>Hiển thị danh sách dữ liệu đã xóa.</td>
            <td>Hiển thị dữ liệu đã xóa</td>
        </tr>
        <tr>
            <td>Khôi phục</td>
            <td>Khôi phục dữ liệu đã xóa.</td>
            <td>Hiển thị dữ liệu đã xóa</td>
        </tr>
        <tr>
            <td>Xóa vĩnh viễn</td>
            <td>Xóa vĩnh viễn (xóa vật lý) dữ liệu đã xóa.</td>
            <td>Hiển thị dữ liệu đã xóa</td>
        </tr>
        <tr>
            <td>Cập nhật dữ liệu hàng loạt</td>
            <td>Chọn nhiều dữ liệu đã lưu và cập nhật nội dung hàng loạt.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa dữ liệu hàng loạt</td>
            <td>Chọn nhiều dữ liệu đã lưu và xóa hàng loạt.</td>
            <td>Xem dữ liệu</td>
        </tr>
</table>


### Chi tiết dữ liệu
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị chi tiết dữ liệu</td>
            <td>Hiển thị chi tiết dữ liệu.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa dữ liệu</td>
            <td>Xóa dữ liệu đã tạo.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Tìm kiếm dữ liệu liên quan</td>
            <td>Hiển thị danh sách dữ liệu liên quan được gắn với dữ liệu.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Thông báo</td>
            <td>Thực hiện thông báo dưới dạng hành động của nút.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Thực hiện quy trình làm việc</td>
            <td>Bấm nút hành động và chạy quy trình làm việc.</td>
            <td>Người xử lý hiện tại</td>
        </tr>
        <tr>
            <td>Tải lên tệp đính kèm</td>
            <td>Có thể tải tệp lên và đính kèm vào dữ liệu.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa tệp đính kèm</td>
            <td>Xóa tệp đính kèm đã tải lên.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Bình luận</td>
            <td>Có thể bình luận về dữ liệu.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa bình luận</td>
            <td>Có thể xóa bình luận do chính mình viết về dữ liệu.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Lịch sử cập nhật</td>
            <td>Ngày cập nhật nội dung dữ liệu và tên người dùng cập nhật được hiển thị làm lịch sử cập nhật.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Phiên bản sửa đổi</td>
            <td>So sánh và khôi phục dữ liệu của lịch sử cập nhật.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Chia sẻ dữ liệu</td>
            <td>Chia sẻ dữ liệu đã lưu cho người dùng và tổ chức khác.</td>
            <td>Chia sẻ dữ liệu</td>
        </tr>
</table>


### Chế độ xem tùy chỉnh
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị chế độ xem tùy chỉnh</td>
            <td>Hiển thị toàn bộ các chế độ xem đã tạo.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Tạo mới chế độ xem tùy chỉnh</td>
            <td>Tạo mới chế độ xem tùy chỉnh.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chỉnh sửa chế độ xem tùy chỉnh</td>
            <td>Sửa thông tin của chế độ xem đã tạo.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Xóa chế độ xem tùy chỉnh</td>
            <td>Xóa chế độ xem đã tạo.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Hiển thị danh sách dữ liệu bằng chế độ xem này</td>
            <td>Hiển thị danh sách dữ liệu bằng chế độ xem đã tạo hoặc đang chỉnh sửa.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Nhân bản chế độ xem</td>
            <td>Nhân bản chế độ xem có cùng nội dung thiết lập với chế độ xem đã tạo.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chế độ xem tổng hợp</td>
            <td>Nhóm các dữ liệu đã lưu và hiển thị các giá trị tổng hợp như tổng, số lượng, giá trị lớn nhất.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chế độ xem lịch</td>
            <td>Hiển thị dữ liệu đã lưu theo dạng lịch.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chế độ xem điều kiện</td>
            <td>Dùng được làm điều kiện lọc khi tham chiếu như dữ liệu của bảng.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chế độ xem mặc định</td>
            <td>Được hiển thị ở màn hình danh sách của bảng làm chế độ xem mặc định.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Sử dụng hộp thông tin của chế độ xem</td>
            <td>Bố trí hộp thông tin ở phía trên chế độ xem và hiển thị nội dung tùy ý.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chọn cột hiển thị</td>
            <td>Ở danh sách dữ liệu, các cột được hiển thị theo đúng thứ tự đã thiết lập.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Điều kiện hiển thị dữ liệu</td>
            <td>Dữ liệu được lọc theo điều kiện đã thiết lập rồi hiển thị ở danh sách dữ liệu.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Kết hợp điều kiện</td>
            <td>Khi thiết lập nhiều điều kiện hiển thị dữ liệu, thiết lập việc xét theo tất cả điều kiện hay theo một trong các điều kiện.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Sắp xếp dữ liệu</td>
            <td>Sắp xếp dữ liệu dựa trên cột tùy chỉnh được chỉ định.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Cài đặt mục bộ lọc của chế độ xem</td>
            <td>Hiển thị cột đã chỉ định làm lựa chọn của "Bộ lọc" ở phía trên chế độ xem.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chọn cột nhóm của chế độ xem tổng hợp</td>
            <td>Nhóm dữ liệu khi tổng hợp, dựa trên cột đã chọn.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
        <tr>
            <td>Chọn cột tổng hợp của chế độ xem tổng hợp</td>
            <td>Tổng hợp theo giá trị của cột đã chọn.</td>
            <td>Chế độ xem hệ thống</td>
        </tr>
</table>


### Cài đặt cập nhật hàng loạt
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Tạo mới cài đặt cập nhật hàng loạt</td>
            <td>Tạo mới cài đặt cập nhật hàng loạt.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉnh sửa cài đặt cập nhật hàng loạt</td>
            <td>Sửa cài đặt cập nhật hàng loạt đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Xóa cài đặt cập nhật hàng loạt</td>
            <td>Xóa cài đặt cập nhật hàng loạt đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Thời điểm cập nhật</td>
            <td>Cập nhật dữ liệu vào thời điểm đã thiết lập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt cột cập nhật</td>
            <td>Cập nhật dữ liệu theo cột đích và giá trị cập nhật đã thiết lập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Điều kiện cập nhật</td>
            <td>Thiết lập điều kiện để cập nhật dữ liệu.</td>
            <td>Quản lý bảng</td>
        </tr>
</table>


### Quy trình làm việc
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị cài đặt quy trình làm việc</td>
            <td>Hiển thị toàn bộ các cài đặt quy trình làm việc.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Tạo mới cài đặt quy trình làm việc</td>
            <td>Tạo mới cài đặt của quy trình làm việc.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Chỉnh sửa cài đặt quy trình làm việc</td>
            <td>Sửa cài đặt quy trình làm việc đã tạo.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Xóa cài đặt quy trình làm việc</td>
            <td>Xóa cài đặt quy trình làm việc đã tạo.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Cài đặt trạng thái</td>
            <td>Loại và tên trạng thái đã thiết lập được dùng trong quy trình làm việc.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Không cho chỉnh sửa dữ liệu</td>
            <td>Khi ở trạng thái tương ứng, không cho chỉnh sửa dữ liệu đích.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Cài đặt hành động</td>
            <td>Hành động đã thiết lập được chạy trong quy trình làm việc.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Loại quy trình làm việc: Dùng chung</td>
            <td>Cho dùng quy trình làm việc ở nhiều bảng.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Loại quy trình làm việc: Chỉ dùng cho bảng</td>
            <td>Có thể thay đổi nơi thực hiện hành động bằng cách dùng cột tùy chỉnh của bảng đã chọn khi tạo mới.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Người dùng có thể thực thi</td>
            <td>Người dùng và tổ chức đã thiết lập có thể chạy hành động.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Thiết lập tùy chọn: Điều kiện chuyển sang trạng thái tiếp theo</td>
            <td>Khi số người đã thiết lập chạy hành động này, quy trình chuyển sang trạng thái tiếp theo.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Thiết lập tùy chọn: Bình luận</td>
            <td>Có thể nhập bình luận khi chạy hành động.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Thiết lập tùy chọn: Hành động đặc biệt</td>
            <td>Loại "Người dùng có thể thực thi" được thiết lập ở hành động khỏi người xử lý hiện tại.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Đã hoàn tất cài đặt</td>
            <td>Hoàn tất cài đặt của quy trình làm việc. Sau đó không thay đổi và xóa được một phần nội dung.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
        <tr>
            <td>Cài đặt sử dụng</td>
            <td>Thiết lập quy trình làm việc dùng cho từng bảng.</td>
            <td>Cài đặt quy trình làm việc</td>
        </tr>
</table>

### Cài đặt biểu mẫu công khai
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị cài đặt biểu mẫu công khai</td>
            <td>Hiển thị toàn bộ danh sách các biểu mẫu công khai đã thiết lập.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Tạo mới cài đặt biểu mẫu công khai</td>
            <td>Tạo mới biểu mẫu công khai.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Chỉnh sửa cài đặt biểu mẫu công khai</td>
            <td>Sửa cài đặt biểu mẫu công khai đã tạo.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Xóa cài đặt biểu mẫu công khai</td>
            <td>Xóa cài đặt biểu mẫu công khai đã tạo.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Tạo từ mẫu</td>
            <td>Cài đặt tệp zip của mẫu và tạo mới biểu mẫu công khai.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Thời hạn công khai</td>
            <td>Có thể thiết lập thời hạn công khai biểu mẫu bằng cách nhập ngày giờ bắt đầu và ngày giờ kết thúc.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cài đặt đầu trang</td>
            <td>Có thể thiết lập màu nền, logo, chuỗi ký tự, v.v. của phần đầu trang.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cài đặt biểu mẫu</td>
            <td>Có thể thiết lập màu nền của phần biểu mẫu và phần khung ngoài.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cài đặt chân trang</td>
            <td>Có thể thiết lập nền và màu chữ của phần chân trang.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cài đặt xác nhận trả lời</td>
            <td>Hiển thị màn hình xác nhận nội dung nhập trước khi gửi dữ liệu.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cài đặt hoàn tất</td>
            <td>Sau khi gửi dữ liệu, hiển thị màn hình với văn bản, URL, v.v. đã thiết lập.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Thông báo hoàn tất (người dùng thông thường)</td>
            <td>Gửi email cho người dùng thông thường đã nhập dữ liệu, sau khi lưu xong.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
         <tr>
            <td>Thông báo hoàn tất (quản trị viên)</td>
            <td>Gửi thông báo cho quản trị viên sau khi người dùng thông thường gửi dữ liệu.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
         <tr>
            <td>Cài đặt lỗi</td>
            <td>Khi xảy ra lỗi lúc gửi dữ liệu, hiển thị màn hình đã thiết lập.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
         <tr>
            <td>Thông báo lỗi (quản trị viên)</td>
            <td>Khi xảy ra lỗi lúc gửi dữ liệu, gửi thông báo cho quản trị viên.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
         <tr>
            <td>CSS và Javascript</td>
            <td>Có thể thiết lập CSS và Javascript.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Cho phép đặt giá trị mặc định từ URL</td>
            <td>Có thể đặt giá trị của query string trong URL làm giá trị ban đầu của biểu mẫu.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
         <tr>
            <td>Google Analytics</td>
            <td>Có thể thiết lập Google Analytics.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Sử dụng Google reCAPTCHA</td>
            <td>Có thể thiết lập Google reCAPTCHA.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Xem trước</td>
            <td>Hiển thị xem trước biểu mẫu công khai đang mở.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Kích hoạt</td>
            <td>Biểu mẫu công khai đang mở được kích hoạt và dùng được.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
        <tr>
            <td>Xuất mẫu</td>
            <td>Xuất biểu mẫu công khai đang mở làm mẫu.</td>
            <td>Quản lý biểu mẫu công khai</td>
        </tr>
</table>

### Mẫu
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Mẫu - Xuất</td>
            <td>Xuất thông tin bảng, cột và biểu mẫu đã lưu trong hệ thống.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Mẫu - Nhập</td>
            <td>Nhập thông tin mẫu Exment đã xuất vào hệ thống này.</td>
            <td>Quản trị hệ thống</td>
        </tr>
</table>


### Sao lưu và khôi phục
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Sao lưu</td>
            <td>Sao lưu cơ sở dữ liệu và các loại tệp.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Sao lưu thủ công</td>
            <td>Sao lưu thủ công bằng cách bấm nút.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Sao lưu tự động</td>
            <td>Tự động sao lưu vào giờ đã định.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Khôi phục</td>
            <td>Khôi phục dữ liệu.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Khôi phục: chọn từ danh sách sao lưu</td>
            <td>Chọn tệp từ danh sách các bản sao lưu đã thực hiện trước đây và chạy khôi phục.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Khôi phục: tải lên</td>
            <td>Tải lên tệp sao lưu đang lưu ở máy cục bộ và chạy khôi phục.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Xóa</td>
            <td>Xóa tệp sao lưu đã tạo.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Sửa tên tệp</td>
            <td>Đổi tên tệp của tệp sao lưu đã tạo.</td>
            <td>Quản trị hệ thống</td>
        </tr>
        <tr>
            <td>Tải xuống</td>
            <td>Tải tệp sao lưu đã tạo xuống máy cục bộ.</td>
            <td>Quản trị hệ thống</td>
        </tr>
</table>

### Người dùng
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị người dùng</td>
            <td>Hiển thị danh sách người dùng đã tạo.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Tạo mới người dùng</td>
            <td>Tạo mới người dùng.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Chỉnh sửa người dùng</td>
            <td>Sửa thông tin của người dùng đã tạo.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa người dùng</td>
            <td>Xóa người dùng đã tạo.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Cấp quyền đăng nhập</td>
            <td>Người dùng có thể đăng nhập vào hệ thống.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Tự động tạo mật khẩu</td>
            <td>Tự động tạo mật khẩu và gửi email cho người dùng tương ứng.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Yêu cầu đổi mật khẩu khi đăng nhập lần đầu</td>
            <td>Khi người dùng đăng nhập lần đầu, hiển thị màn hình đổi mật khẩu.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Gửi thông tin người dùng qua email</td>
            <td>Gửi email thông tin người dùng cho người dùng tương ứng.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
</table>

### Tổ chức
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị tổ chức</td>
            <td>Hiển thị danh sách tổ chức đã tạo.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Tạo mới tổ chức</td>
            <td>Tạo mới tổ chức.</td>
            <td>Xem dữ liệu</td>
        </tr>
        <tr>
            <td>Chỉnh sửa tổ chức</td>
            <td>Sửa thông tin của tổ chức đã tạo.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Xóa tổ chức</td>
            <td>Xóa tổ chức đã tạo.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Tổ chức cha</td>
            <td>Tổ chức đã thiết lập trở thành tổ chức cha.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
        <tr>
            <td>Người dùng</td>
            <td>Người dùng đã chọn trở thành thành viên của tổ chức.</td>
            <td>Chỉnh sửa dữ liệu</td>
        </tr>
</table>


### Nhóm vai trò
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị nhóm vai trò</td>
            <td>Hiển thị danh sách nhóm vai trò đã tạo.</td>
            <td>Thay đổi cài đặt quyền, Quản lý người dùng/tổ chức</td>
        </tr>
        <tr>
            <td>Tạo nhóm vai trò</td>
            <td>Tạo mới nhóm vai trò.</td>
            <td>Quản lý toàn bộ nhóm vai trò</td>
        </tr>
        <tr>
            <td>Cài đặt quyền</td>
            <td>Thiết lập quyền cấp cho nhóm vai trò.</td>
            <td>Thay đổi cài đặt quyền</td>
        </tr>
        <tr>
            <td>Cài đặt người dùng/tổ chức</td>
            <td>Thiết lập người dùng và tổ chức được cấp quyền.</td>
            <td>Quản lý người dùng/tổ chức</td>
        </tr>
        <tr>
            <td>Xóa nhóm vai trò</td>
            <td>Xóa bảng điều khiển đã tạo.</td>
            <td>Quản lý toàn bộ nhóm vai trò</td>
        </tr>
</table>


### Cài đặt thông báo
<table class="Funclist">
        <tr>
            <th style="width:30%">Tên chức năng</th>
            <th style="width:45%">Tóm tắt chức năng</th>
            <th style="width:25%">Quyền</th>
        </tr>
        <tr>
            <td>Hiển thị cài đặt thông báo</td>
            <td>Hiển thị danh sách cài đặt thông báo đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Tạo mới cài đặt thông báo</td>
            <td>Tạo mới cài đặt thông báo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chỉnh sửa cài đặt thông báo</td>
            <td>Sửa thông tin của cài đặt thông báo đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Xóa cài đặt thông báo</td>
            <td>Xóa cài đặt thông báo đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Nhân bản cài đặt thông báo</td>
            <td>Nhân bản cài đặt thông báo đã tạo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cờ kích hoạt</td>
            <td>Thay đổi trạng thái của thông báo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Điều kiện kích hoạt</td>
            <td>Thiết lập điều kiện để thông báo.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Chế độ xem đối tượng</td>
            <td>Chỉ định chế độ xem điều kiện để lọc dữ liệu của bảng đối tượng.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cột ngày đối tượng</td>
            <td>Xét việc có thông báo hay không bằng trường ngày hoặc ngày giờ đã chọn.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Ngày thông báo</td>
            <td>Thông báo vào ngày đã nhập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Trước/sau khi thông báo</td>
            <td>Thông báo trước hoặc sau số ngày của trường.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Giờ thông báo</td>
            <td>Thông báo vào giờ đã thiết lập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Cài đặt điều kiện thông báo</td>
            <td>Thông báo theo nội dung đã đặt làm điều kiện.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Thông báo cả cho người thực hiện</td>
            <td>Thông báo cả cho người dùng đăng nhập là người thực hiện công việc.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Hành động thực hiện</td>
            <td>Thông báo được thực hiện theo cách đã thiết lập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Đối tượng nhận thông báo</td>
            <td>Thông báo cho đối tượng đã thiết lập.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Địa chỉ email nhận</td>
            <td>Thông báo được gửi đến địa chỉ email được chỉ định.</td>
            <td>Quản lý bảng</td>
        </tr>
        <tr>
            <td>Mẫu thông báo</td>
            <td>Thông báo được gửi bằng mẫu đã chọn.</td>
            <td>Quản lý bảng</td>
        </tr>
</table>

