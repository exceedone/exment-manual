# Bảng tùy chỉnh
Exment sử dụng "bảng tùy chỉnh" (Custom Table) để quản lý thông tin.  
Tại đây, bạn thực hiện các thiết lập cần thiết, chẳng hạn như các chức năng và quyền được phép đối với dữ liệu đã đăng ký.

## Danh sách
Nhấp vào "Custom Table" trong menu.  
Màn hình danh sách các thiết lập bảng tùy chỉnh đã tạo sẽ được hiển thị.  

![Màn hình bảng tùy chỉnh](../img/table/table_grid.png)

※ "Basic information" (thông tin cơ bản), "User" (người dùng), "Organization" (tổ chức), "Notification template" (mẫu thông báo), "Email sending history" (lịch sử gửi email), "Notice" (thông tin thông báo chung)  
Các bảng này được thiết lập sẵn khi cài đặt Exment.  
Ngoài ra, các bảng được nhập (import) dưới dạng template cũng được hiển thị trên màn hình danh sách.  

## Tạo mới

- Nhấp vào nút "New" ở phía trên bên phải màn hình danh sách.
![Màn hình bảng tùy chỉnh](../img/table/table_new1.png)  
  
- Màn hình tạo bảng sẽ được hiển thị, hãy nhập các mục cần thiết.
![Màn hình bảng tùy chỉnh](../img/table/table_new2.png)

## Chi tiết các mục thiết lập

#### Table name (alphanumeric) (Tên bảng - chữ và số) ※Bắt buộc
- Là tên của bảng. (Ví dụ: user , information , estimate )  
- Chuỗi chữ và số đã thiết lập sẽ được dùng trong URL khi mở bảng, v.v. (Ví dụ: http(s)://(URL của Exment)/admin/data/user)  
- Chỉ có thể sử dụng chữ cái và chữ số nửa chiều rộng (half-width) cùng các ký hiệu "-" và "_".
- Không thể sử dụng tên bảng đã được dùng cho bảng khác.  
- Tên bảng không được dài quá 30 ký tự và phải bắt đầu bằng một chữ cái.  
- Chỉ có thể thiết lập khi tạo mới bảng. Sau khi lưu thì không thể thay đổi.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail1.png)

#### Table display name (Tên hiển thị của bảng) ※Bắt buộc
- Là tên được hiển thị trên màn hình. Có thể sử dụng cả tiếng Nhật. (Ví dụ: Người dùng, Thông báo, Báo giá)  

![Màn hình bảng tùy chỉnh](../img/table/table_detail2.png)  

#### Description (Mô tả)
- Là phần mô tả về bảng.

![Màn hình bảng tùy chỉnh](../img/table/table_detail3.png)
- Như trong hình dưới đây, trên màn hình dữ liệu, phần mô tả đã nhập sẽ được hiển thị ở bên phải tên hiển thị của bảng.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail3_sample.png)

#### Display order (Thứ tự hiển thị)
- Là thứ tự hiển thị trên màn hình danh sách thiết lập bảng tùy chỉnh.  
- Hãy nhập số bằng ký tự nửa chiều rộng, hoặc chỉ định số bằng các nút "-" "+" ở hai bên.

![Màn hình bảng tùy chỉnh](../img/table/table_detail4.png)

#### Color (Màu)
- Thiết lập màu của bảng. Màu thiết lập tại đây được dùng cho các gợi ý khi tìm kiếm, v.v.

![Màn hình bảng tùy chỉnh](../img/table/table_detail5.png)

- Khi nhấp vào màu đang được chỉ định, màn hình chọn màu sẽ được hiển thị.

![Màn hình bảng tùy chỉnh](../img/table/table_detail5_choice.png)

#### Icon (Biểu tượng)
- Thiết lập biểu tượng của bảng. Biểu tượng đã thiết lập được hiển thị làm biểu tượng của menu và biểu tượng trong kết quả tìm kiếm.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail6.png)

- Khi nhấp vào biểu tượng đang được chỉ định, màn hình chọn biểu tượng sẽ được hiển thị.

![Màn hình bảng tùy chỉnh](../img/table/table_detail6_choice.png)

#### Searchable (Cho phép tìm kiếm)
- Thiết lập có đưa bảng này vào phạm vi tìm kiếm hay không khi thực hiện [tìm kiếm](/search.md) từ thanh tìm kiếm. Giá trị mặc định là YES.  
Nếu muốn loại bảng khỏi kết quả tìm kiếm, chẳng hạn khi muốn dùng bảng làm bảng ẩn, hãy thiết lập là NO.


![Màn hình bảng tùy chỉnh](../img/table/table_detail7.png)

#### Use ID for labels (Sử dụng ID trong nhãn)
- Trong các đề xuất tìm kiếm được hiển thị khi dùng thanh tìm kiếm, bạn có thể thêm ID của dữ liệu vào đầu nhãn. Để biết chi tiết, vui lòng tham khảo [Thiết lập cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề). Giá trị mặc định là NO.  


![Màn hình bảng tùy chỉnh](../img/table/table_detail8.png)

#### Only one can be registered (Chỉ cho phép đăng ký 1 dữ liệu)
- Đối với bảng chỉ cho phép đăng ký 1 dữ liệu thay vì nhiều dữ liệu, hãy thiết lập là YES. Giá trị mặc định là NO.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail9.png)

#### Use attachments (Sử dụng tệp đính kèm)
- Nếu muốn cho phép tải lên [tệp đính kèm](/vi/data_details) cho dữ liệu của bảng, hãy thiết lập là YES. Giá trị mặc định là YES.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail10.png)

#### Use comments (Sử dụng bình luận)
- Nếu muốn cho phép [bình luận](/vi/data_details) trên dữ liệu của bảng, hãy thiết lập là YES. Giá trị mặc định là YES.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail11.png)

#### Use data change history (Sử dụng lịch sử thay đổi dữ liệu)
- Nếu muốn quản lý dưới dạng bản sửa đổi (lịch sử) việc ai đã cập nhật dữ liệu của bảng với nội dung như thế nào, hãy thiết lập là YES. Giá trị mặc định là YES.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail12.png)

#### Change history version number (Số phiên bản lịch sử thay đổi)
- Khi "Use data change history" là YES, hãy nhập bằng số nguyên số phiên bản lịch sử thay đổi cần lưu giữ.  
Nếu nhập "200", thì ở lần cập nhật thứ 201, thông tin lịch sử thay đổi của lần thứ 1 sẽ bị xóa. Giá trị mặc định là 100.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail13.png)

#### Editable by all users (Tất cả người dùng đều có thể chỉnh sửa)

> Về tổng quan quyền của bảng, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

- Nếu thiết lập là YES, tất cả người dùng đều có thể chỉnh sửa toàn bộ dữ liệu trong bảng đó. Không cần phải gán quyền riêng lẻ nữa. Giá trị mặc định là NO.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail14.png)

#### Visible to all users (Tất cả người dùng đều có thể xem)

> Về tổng quan quyền của bảng, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

- Nếu thiết lập là YES, tất cả người dùng đều có thể xem toàn bộ dữ liệu trong bảng đó. Không cần phải gán quyền riêng lẻ nữa. Giá trị mặc định là NO.  

※ Khi cài đặt Exment, chỉ riêng bảng "Notice" được thiết lập sẵn "Visible to all users" là YES. Mục đích là để tất cả người dùng đều có thể xem thông tin thông báo chung.  
Mặt khác, chỉ quản trị viên mới có thể chỉnh sửa thông tin thông báo chung.

![Màn hình bảng tùy chỉnh](../img/table/table_detail15.png)

#### Available to all users (Tất cả người dùng đều có thể tham chiếu)

> Về tổng quan quyền của bảng, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

- Nếu thiết lập là YES, tất cả người dùng đều có thể tham chiếu toàn bộ dữ liệu trong bảng đó. Không cần phải gán quyền riêng lẻ nữa. Giá trị mặc định là NO.  

※ Nếu chỉ thiết lập "Available to all users" là YES, bảng đó sẽ không thể hiển thị trong menu hay màn hình danh sách, nhưng có thể được tham chiếu từ các bảng khác.  

Ví dụ: Bảng "Thuế tiêu dùng" không cần hiển thị trên màn hình danh sách đối với người dùng thông thường, nhưng họ vẫn cần chọn "Thuế tiêu dùng" như một lựa chọn. Với những bảng như vậy, hãy thiết lập "Available to all users" là YES.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail16.png)

#### Viewable with permissions of parent data (Có thể xem bằng quyền của dữ liệu cha)

> Về tổng quan quyền của bảng, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

- Nếu thiết lập là YES, có thể xem dữ liệu bằng quyền của dữ liệu cha (một-nhiều). Tuy nhiên, người dùng vẫn phải có quyền đối với chính bảng này, chẳng hạn quyền xem của người phụ trách. Giá trị mặc định là NO.  

※ Đây là tùy chọn chỉ hiển thị ở bảng con của quan hệ một-nhiều (1:n).  

※ Ngay cả khi có quyền chỉnh sửa dữ liệu cha, bạn cũng không thể chỉnh sửa dữ liệu con. Chỉ có thể xem.  

![Màn hình bảng tùy chỉnh](../img/table/table_detail19.png)

#### Need Edit permission for parent data (Cần có quyền chỉnh sửa dữ liệu cha)

> Về tổng quan quyền của bảng, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

- Nếu thiết lập là YES, để chỉnh sửa dữ liệu của bảng này cần có quyền chỉnh sửa dữ liệu cha (một-nhiều). Giá trị mặc định là YES.  

※ Đây là tùy chọn chỉ hiển thị ở bảng con của quan hệ một-nhiều (1:n).  

![Màn hình bảng tùy chỉnh](../img/table/table_detail20.png)

#### Add to menu (Thêm vào menu)
- Nếu thiết lập là YES, bảng sẽ được thêm vào menu cùng lúc với việc lưu bảng. Giá trị mặc định là NO.  

※ Đây là mục chỉ hiển thị khi tạo mới bảng. Sau khi đã thêm vào menu, nếu muốn thay đổi thiết lập của menu, hãy thực hiện trên màn hình [Menu](/menu.md).  

![Màn hình bảng tùy chỉnh](../img/table/table_detail17.png)

#### Parent menu to add to (Menu cha để thêm vào)
- Đây là mục được hiển thị khi "Add to menu" là YES. Hãy chọn tên menu sẽ làm menu cha khi thêm vào menu.  

Ví dụ: Khi tạo mới bảng "Hướng dẫn sử dụng", nếu chọn "Thiết lập quản trị viên" làm menu cha, thì như trong hình, menu của bảng "Hướng dẫn sử dụng" vừa tạo sẽ được tạo ở vị trí dưới cùng bên trong "Thiết lập quản trị viên".

![Màn hình bảng tùy chỉnh](../img/table/table_detail17_sample.png)
![Màn hình bảng tùy chỉnh](../img/table/table_detail17_sample2.png)

#### Add to notification (Thêm vào thông báo)
- Nếu thiết lập là YES, cùng lúc với việc lưu bảng, hệ thống sẽ thêm một thiết lập thông báo để gửi thông báo trong hệ thống đến những người dùng có quyền khi dữ liệu được tạo mới, cập nhật, chia sẻ hoặc khi có bình luận.  

※ Đây là mục chỉ hiển thị khi tạo mới bảng. Sau khi đã thêm vào thông báo, nếu muốn thay đổi thiết lập của thông báo, hãy thực hiện trên màn hình [Thông báo](/notify.md).  ![Màn hình bảng tùy chỉnh](../img/table/table_detail18.png)

## Lưu
- Để lưu nội dung đã thiết lập, hãy nhấp vào nút "Submit". Bảng sẽ được tạo theo nội dung thiết lập.

- Trường hợp tạo mới bảng, sau khi lưu, hệ thống sẽ chuyển sang [màn hình danh sách cột tùy chỉnh](/vi/column).  
Hãy tiếp tục đăng ký các cột tùy chỉnh.

## Chỉnh sửa
- Nhấp vào nút "Edit" của bảng tương ứng được hiển thị trong danh sách bảng tùy chỉnh.  
Hệ thống sẽ chuyển sang màn hình chỉnh sửa, tại đó bạn có thể thay đổi thiết lập.  

![Màn hình bảng tùy chỉnh](../img/table/table_edit.png)


## Xóa
- Nếu muốn xóa bảng, trước tiên hãy chuyển sang màn hình chỉnh sửa theo cùng thao tác như phần chỉnh sửa ở trên.

- Tiếp theo, nhấp vào nút "Delete" ở phía trên bên phải màn hình chỉnh sửa.  

![Màn hình bảng tùy chỉnh](../img/table/table_delete.png)  

- Màn hình xác nhận sẽ được hiển thị như trong hình dưới đây; hãy nhập delete me vào ô văn bản rồi nhấp vào nút "Confirm". Bảng sẽ bị xóa.  
**<span style="color: red; ">※ Tuy nhiên, không thể xóa các loại bảng sau đây.<br />・Bảng được hệ thống cài đặt sẵn<br />・Bảng đang được thiết lập làm bảng con trong quan hệ (relation)</span>**

![Màn hình bảng tùy chỉnh](../img/table/table_delete2.png)


## Thiết lập mở rộng
Bạn có thể thực hiện các thiết lập mở rộng sử dụng nhiều cột trong bảng.

- Nhấp vào nút "Extended setting" của bảng tương ứng được hiển thị trong danh sách bảng tùy chỉnh.  

- Hệ thống sẽ chuyển sang màn hình thiết lập.

![Màn hình bảng tùy chỉnh](../img/table/table_extended_setting1.png)  



### Thiết lập khóa duy nhất kết hợp
Bằng cách thiết lập nhiều cột làm khóa duy nhất (unique key), bạn có thể ngăn việc đăng ký trùng lặp theo một tổ hợp giá trị nhất định khi đăng ký mới dữ liệu.  

- Hãy chọn 2 đến 3 cột mà bạn muốn ngăn đăng ký trùng lặp theo tổ hợp.
- Khi đăng ký mới dữ liệu, nếu giá trị định đăng ký trùng với giá trị đã đăng ký ở tất cả các cột đã thiết lập thì sẽ xảy ra lỗi.  

Ví dụ: Với thiết lập như trong hình dưới đây, bằng cách đặt "Ngày dự kiến tiếp theo" và "Tên" làm khóa duy nhất, bạn có thể ngăn việc cùng một tên được đăng ký nhiều lần cho cùng một ngày dự kiến tiếp theo.  
![Màn hình bảng tùy chỉnh](../img/table/table_extended_setting2.png)

※ Nếu muốn kiểm tra trùng lặp chỉ với 1 cột để ngăn đăng ký trùng lặp, hãy thiết lập mục duy nhất (unique) của cột tương ứng là YES trong [thiết lập cột tùy chỉnh](/vi/column).

※ Trường hợp quan hệ 1:N ([tham khảo phần thiết lập quan hệ của Exment](/vi/relation)), khi thiết lập khóa duy nhất kết hợp cho bảng con, bạn cũng có thể chọn bảng cha làm một thành phần của khóa duy nhất.  
Nhờ đó, có thể kiểm tra trùng lặp trong phạm vi cùng một bản ghi cha.

### So sánh 2 cột
Khi tạo mới và khi cập nhật dữ liệu, hệ thống sẽ so sánh 2 cột. Chỉ khi giá trị của các cột thỏa mãn điều kiện đã thiết lập thì mới có thể lưu. Nếu không thỏa mãn, thông báo lỗi sẽ được hiển thị.  
Hãy sử dụng cho các trường hợp như sau.  

- Chỉ có thể lưu khi "Ngày bắt đầu" bằng hoặc trước "Ngày kết thúc".
-  Chỉ có thể lưu khi giá trị của "X" lớn hơn hoặc bằng giá trị của "Y".
- Chỉ có thể lưu khi "Người phụ trách" và "Người xác nhận" khác nhau.

![So sánh 2 cột](../img/table/compare1.png)    

#### Cách xử lý khi chưa nhập
Khi một hoặc cả hai mục chưa được nhập, kết quả sẽ khác nhau tùy theo điều kiện đã chọn.  
Ở đây, trường hợp có thể lưu bình thường được ghi là "true", trường hợp xảy ra lỗi được ghi là "false".

- **A và B khớp nhau** : true nếu cả hai giá trị đều chưa nhập. false nếu chỉ một trong hai chưa nhập.
- **A và B không khớp nhau** : true nếu chỉ một trong hai giá trị chưa nhập. false nếu cả hai đều chưa nhập.
- **Các điều kiện khác** : <span class="red">Luôn là true.</span> Lý do là vì với ngày tháng và số, thông thường không thể so sánh khi giá trị bị trống.  
Nếu không muốn cho phép để trống, hãy thiết lập bắt buộc trong thiết lập cột tùy chỉnh hoặc thiết lập form tùy chỉnh.

#### Cách xử lý theo từng loại cột
- Việc so sánh lớn nhỏ (A lớn hơn B, A nhỏ hơn B, A lớn hơn hoặc bằng B, A nhỏ hơn hoặc bằng B) chỉ thực hiện được với các loại cột sau đây.
    - Số nguyên
    - Số thập phân
    - Tiền tệ
    - Ngày
    - Giờ
    - Ngày giờ

- Nếu so sánh với các loại cột khác, kết quả luôn là true.

- Ngoài ra, nói một cách chặt chẽ thì khi lưu thiết lập này, nếu loại của hai cột không giống nhau thì cần phải báo lỗi. (Vì không thể so sánh lớn nhỏ giữa "Số nguyên" và "Ngày giờ")  
Hiện tại hệ thống không thực hiện việc kiểm tra này. Hãy chọn loại của 2 cột cho phù hợp.

#### Khác
- Nếu muốn so sánh giá trị của từ 3 cột trở lên, so sánh theo điều kiện đặc biệt, so sánh có liên kết với giá trị của bảng khác, v.v., hãy tạo [plugin validation](/plugin_quickstart_validate).



### Thiết lập cột hiển thị tiêu đề
Với thiết lập này, bạn có thể kiểm soát nội dung văn bản được hiển thị khi hiển thị đề xuất của thanh tìm kiếm hoặc khi hiển thị danh sách các lựa chọn.  
  
Ví dụ, giả sử có một bảng tên là "Thông tin khách hàng" như dưới đây.  
Giả sử bảng thông tin khách hàng có các thông tin như "Mã khách hàng", "Tên khách hàng", "Số điện thoại", "Địa chỉ email".  
![Thiết lập cột hiển thị tiêu đề](../img/table/label1.png)    

Khi nhập từ khóa vào thanh tìm kiếm, các đề xuất tìm kiếm sẽ được hiển thị,  
và giả sử lúc đó bạn muốn hiển thị như sau.  
"(Mã khách hàng) (Tên khách hàng)"  
![Thiết lập cột hiển thị tiêu đề](../img/table/label2.png)    
  
Trong trường hợp đó, trên màn hình thiết lập mở rộng của bảng tùy chỉnh, hãy thiết lập như sau cho các cột muốn hiển thị làm tiêu đề.  
![Thiết lập cột hiển thị tiêu đề](../img/table/label3.png)  
  
Khi đăng ký như vậy, lúc nhập ký tự vào thanh tìm kiếm ở phía trên trang, đề xuất sẽ được hiển thị như sau.  
Khi đăng ký các cột theo thứ tự từ trên xuống trên màn hình thiết lập mở rộng, chuỗi đề xuất sẽ được hiển thị theo đúng thứ tự các cột đó.  
![Thiết lập cột hiển thị tiêu đề](../img/table/label5.png)  
  
Ngoài ra, nếu muốn hiển thị cả "Địa chỉ email", hãy thêm cột "Địa chỉ email".  
![Thiết lập cột hiển thị tiêu đề](../img/table/label4.png)  
![Thiết lập cột hiển thị tiêu đề](../img/table/label6.png)  
  
Ngoài ra, trong thiết lập bảng tùy chỉnh có mục "Display ID on label" (hiển thị ID trong nhãn).
![Thiết lập cột hiển thị tiêu đề](../img/table/label7.png)  
Nếu thiết lập mục này là YES, chuỗi "#(id)" sẽ được thêm vào đầu nhãn.  
![Thiết lập cột hiển thị tiêu đề](../img/table/label8.png)  

#### Khác
- Nếu chưa đăng ký thiết lập cột hiển thị tiêu đề này, giá trị của cột đầu tiên trong thiết lập cột tùy chỉnh sẽ được hiển thị.
- Nếu giá trị của cột đầu tiên trong thiết lập cột tùy chỉnh bị trống, ID sẽ được hiển thị.
- ID chỉ có thể được thêm cố định ở đầu nhãn. Không thể thêm vào vị trí khác.  



### Thiết lập tự động chia sẻ dữ liệu

> Về thiết lập chia sẻ dữ liệu, trước tiên vui lòng xem trang [Tổng quan về vai trò và quyền trong Exment](/permission).

Khi lưu dữ liệu, có thể tự động chia sẻ dữ liệu cho tổ chức hoặc người dùng được thiết lập làm giá trị của cột.  
Hãy sử dụng cho các mục đích như sau.  

- Khi tạo mới dữ liệu "Thông tin hợp đồng", tự động thêm quyền chỉnh sửa cho người dùng được gán ở cột "Người phụ trách chính".  
- Khi cập nhật dữ liệu "Thông tin hợp đồng", tự động thêm quyền xem cho tổ chức được gán ở cột "Tổ chức liên quan".  
- Khi tạo mới dữ liệu "Quản lý công việc", tự động thêm quyền chỉnh sửa cho người dùng được gán ở cột "Người phụ trách".  

※ Bảng tùy chỉnh cần có sẵn cột loại "User" (người dùng) hoặc "Organization" (tổ chức).

#### Ví dụ  
Trong trường hợp bảng "Quản lý khách hàng" được định nghĩa các cột như sau,

![Màn hình bảng tùy chỉnh](../img/table/table_extended_share3.png)

hãy thiết lập "Vào thời điểm 'When creating new' (khi tạo mới), thêm quyền 'Edit' (chỉnh sửa) cho người dùng được gán ở cột 'Người phụ trách'".
![Màn hình bảng tùy chỉnh](../img/table/table_extended_share1.png)

Sau đó, khi tạo mới dữ liệu có người phụ trách là người dùng "user1",
![Màn hình bảng tùy chỉnh](../img/table/table_extended_share2.png)

thông tin hợp đồng này sẽ được chia sẻ cho người dùng "user1" với quyền chỉnh sửa.

![Màn hình bảng tùy chỉnh](../img/table/table_extended_share4.png)

#### Cách thiết lập

- ##### Trigger (Thời điểm kích hoạt)
Là thời điểm chia sẻ dữ liệu.  
Có thể chọn "When creating new" (khi tạo mới) hoặc "When updating" (khi cập nhật).  

- ##### Target column (Cột đối tượng)
Là người dùng hoặc tổ chức sẽ được chia sẻ dữ liệu.

- ##### Target authority (Quyền áp dụng)
Chọn chia sẻ với quyền chỉnh sửa hay quyền xem khi thực hiện chia sẻ.


#### Thiết lập đồng bộ chia sẻ
Theo thiết lập tiêu chuẩn, khi trigger là "When updating", dù có thay đổi giá trị người dùng/tổ chức đối tượng thì thông tin chia sẻ của người dùng/tổ chức đã được thiết lập ban đầu cũng không bị xóa mà vẫn tiếp tục được chia sẻ.  

![Màn hình bảng tùy chỉnh](../img/table/table_extended_share5.png)

Bằng cách thay đổi thiết lập, khi cập nhật dữ liệu, có thể xóa khỏi thiết lập chia sẻ những người dùng/tổ chức không phải là người dùng/tổ chức đang được thiết lập ở cột và cũng không phải là người dùng thực hiện cập nhật.

![Màn hình bảng tùy chỉnh](../img/table/table_extended_share6.png)

Để thay đổi thiết lập này, hãy thiết lập mục "Synchronize automatic data sharing settings when updating" (đồng bộ thiết lập tự động chia sẻ dữ liệu khi cập nhật) trong phần thiết lập tùy chọn là YES.

![Màn hình bảng tùy chỉnh](../img/table/table_extended_share7.png)


### Thiết lập không cho phép thực hiện từ màn hình

Thiết lập khi không muốn cho phép thực hiện từ màn hình các thao tác tạo mới, chỉnh sửa, xóa dữ liệu hoặc nhập (import), xuất (export).  
Khi thực hiện thiết lập này, các nút tương ứng sẽ bị ẩn khỏi màn hình.  

- Mục "Cannot be changed from the screen" (không cho phép thay đổi từ màn hình) sẽ được hiển thị.

![Thiết lập không cho phép thay đổi và thực hiện từ màn hình](../img/table/ignore2.png)  

- Ví dụ thiết lập: Trường hợp ẩn "Export"

![Thiết lập không cho phép thay đổi và thực hiện từ màn hình](../img/table/ignore3.png)  

![Thiết lập không cho phép thay đổi và thực hiện từ màn hình](../img/table/ignore1.png)  

### Vị trí hiển thị các mục hệ thống trên màn hình dữ liệu

Thiết lập vị trí hiển thị các mục hệ thống trên màn hình chỉnh sửa dữ liệu và màn hình chi tiết dữ liệu.  
Có thể chọn trong số "Adjust to system settings" (theo thiết lập hệ thống), "Display at the top" (phía trên), "Display at the bottom" (phía dưới), "Hide" (ẩn). (Giá trị ban đầu là "Adjust to system settings")  
※ Vị trí hiển thị áp dụng cho toàn hệ thống có thể thay đổi trong thiết lập hệ thống.  

![Vị trí hiển thị các mục hệ thống trên màn hình dữ liệu](../img/table/system_display1.png)  

### Chuyển màn hình khi nhấp vào dòng

Thiết lập màn hình sẽ chuyển đến khi nhấp vào một dòng trên màn hình danh sách dữ liệu.  
Có thể chọn trong số "Match Default" (theo giá trị mặc định), "Data Edit" (màn hình chỉnh sửa dữ liệu), "Data Detail" (màn hình chi tiết dữ liệu), "No transaction" (không chuyển màn hình). (Giá trị ban đầu là "Match Default")  
※ Giá trị mặc định của toàn hệ thống là "Data Detail", nhưng có thể thay đổi bằng giá trị thiết lập trong .env.  

![Chuyển màn hình khi nhấp vào dòng](../img/table/row_click1.png)  

### Thiết lập định dạng tiêu đề
> Thiết lập này chỉ được hiển thị khi đã bật [chế độ chuyên gia (expert mode)](/additional_expert).

Bằng cách sử dụng biến tham số, bạn có thể thiết lập linh hoạt giá trị được hiển thị làm tiêu đề.  

- Bật chế độ chuyên gia và mở màn hình thiết lập mở rộng.

- Mục nhập chuỗi định dạng (format string) sẽ được hiển thị.  

![Thiết lập định dạng tiêu đề](../img/table/label_format1.png)  

- Để hiển thị giá trị đã lưu trong dữ liệu làm tiêu đề, hãy sử dụng [biến tham số](/params).  
Ví dụ: Trường hợp hiển thị "Tên người dùng&lt;admin@admin.admin&gt;" đối với thông tin người dùng  
${value:user_name}&lt;${value:email}&gt;  
![Thiết lập định dạng tiêu đề](../img/table/label_format2.png)  

- Bằng cách nhập như vậy, bạn có thể thiết lập mục được hiển thị làm tiêu đề.  
![Thiết lập định dạng tiêu đề](../img/table/label_format3.png)  


#### Khác
- Nếu đã thiết lập định dạng hiển thị tiêu đề này, "Thiết lập cột hiển thị tiêu đề" sẽ không còn hiệu lực.
