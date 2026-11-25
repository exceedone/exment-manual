# Thiết lập workflow
Trang này dùng để tạo "workflow" như gửi yêu cầu, phê duyệt và cho phép dùng trong bảng. Quản trị viên hệ thống thực hiện thiết lập.

Trình tự thiết lập như sau.

1. **Step1. Thiết lập trạng thái**: quyết định các tình trạng như "chưa gửi yêu cầu", "chờ phê duyệt", "hoàn tất".
2. **Step2. Thiết lập hành động**: quyết định các thao tác như "gửi yêu cầu", "phê duyệt" và ai được thực hiện.
3. **Hoàn tất cài đặt**: hoàn tất thiết lập workflow. Sau bước này, không thể thêm, xóa, đổi thứ tự trạng thái.
4. **Step3. Thiết lập thông báo**: quyết định thông báo gửi đi khi thực hiện workflow.
5. **Step4. Thiết lập sử dụng**: quyết định dùng ở bảng nào.

※ Cũng có thể tạo và chỉnh sửa trạng thái và hành động trực tiếp trên sơ đồ luồng. Chi tiết vui lòng xem [Trình thiết kế quy trình](/vi/workflow_design).

## Workflow là gì
Workflow là "luồng của một chuỗi trao đổi trong công việc".  
Nhiều công việc có một luồng: "ai bắt đầu, ai quyết định và xử lý, rồi hoàn tất ra sao".  
Khi thiết lập workflow trong Exment, có thể thực hiện, ví dụ, luồng như sau.

![Màn hình workflow](../img/workflow/workflow1.png)  
- Người dùng gửi yêu cầu thanh toán chi phí đến bộ phận quản lý
- Bộ phận quản lý phê duyệt yêu cầu thanh toán chi phí, hoặc từ chối
- Đối với chi phí đã được phê duyệt, không thể sửa dữ liệu kể từ thời điểm đó


## Bảng thuật ngữ
Các thuật ngữ dùng trong workflow của Exment.

![Màn hình workflow](../img/workflow/workflow2.png)  

##### Workflow  
Chỉ toàn bộ luồng công việc, chẳng hạn như gửi yêu cầu và phê duyệt.  

##### Trạng thái  
Chỉ tình trạng hiện tại của workflow.  
Ví dụ: chưa gửi yêu cầu, chờ phê duyệt, hoàn tất  

##### Hành động (action)  
Là thao tác do người dùng thực hiện. Khi thực hiện, workflow chuyển từ một trạng thái sang trạng thái khác.  
Ví dụ: gửi yêu cầu, phê duyệt, từ chối, trả lại

##### Người dùng xử lý  
Là người dùng đến lượt thực hiện hành động tiếp theo.


## Hiển thị màn hình danh sách
Quản trị viên hệ thống nhấp vào "Cài đặt quản trị > Quy trình làm việc" trên menu.  
Danh sách các workflow đã lưu sẽ hiển thị.


## Tạo mới

1. Nhấp vào nút [Mới] ở phía trên bên phải của màn hình danh sách.
2. "Step1. Thiết lập trạng thái" của màn hình tạo workflow sẽ hiển thị, hãy nhập các thông tin cần thiết.

### Step1. Status setting (Thiết lập trạng thái)
Thiết lập các trạng thái của workflow.

![Màn hình workflow](../img/workflow/workflow_status1.png)  

#### Workflow display name (Tên hiển thị của workflow) ※Bắt buộc
- Tên workflow hiển thị trên màn hình. Có thể sử dụng cả tiếng Nhật. (Ví dụ: Luồng phê duyệt)  

#### Workflow type (Loại workflow) ※Bắt buộc
- Loại workflow sẽ tạo. Vui lòng chọn "Dùng chung" hoặc "Chỉ dùng cho bảng".  
※Không thể thay đổi sau khi tạo.  
##### General (Dùng chung)  
Có thể sử dụng workflow cho nhiều bảng.  
Hãy chọn loại này khi chỉ muốn sử dụng các trạng thái và hành động tiêu chuẩn như "gửi yêu cầu", "phê duyệt", "từ chối".  
##### Table only (Dành riêng cho bảng)  
Chỉ sử dụng được với bảng đã chọn khi tạo mới. Bù lại, có thể dùng các cột tùy chỉnh của bảng đó để thay đổi đích đến khi thực hiện hành động.  
Ví dụ: Trong bảng "Thanh toán chi phí", có thể phân nhánh hành động như sau: nếu cột tùy chỉnh "Số tiền" từ 100.000 yên trở lên thì thực hiện hành động "Trưởng bộ phận phê duyệt", nếu cột tùy chỉnh "Số tiền" dưới 100.000 yên thì thực hiện hành động "Trưởng phòng phê duyệt".

#### Start status name (Tên trạng thái bắt đầu) ※Bắt buộc
- Thiết lập tên trạng thái khi workflow chưa được thực hiện.


#### Status settings (Thiết lập trạng thái)
- Định nghĩa các thiết lập của workflow và các trạng thái sẽ sử dụng.  
※Trạng thái ở dòng cuối cùng của bảng phải là trạng thái biểu thị luồng đã hoàn tất.
##### Status Name (Tên trạng thái)  
Tên của trạng thái đó.
##### Data not editable (Không cho chỉnh sửa dữ liệu)  
Có khóa chỉnh sửa dữ liệu đối tượng hay không trong khi workflow ở trạng thái này. Nếu không muốn cho chỉnh sửa, vui lòng đặt là YES.  
Ví dụ: khi là "chưa gửi yêu cầu" thì có thể chỉnh sửa và xóa dữ liệu, nhưng khi là "đang gửi yêu cầu" hoặc "hoàn tất" thì không muốn cho chỉnh sửa và xóa. Trường hợp này, đặt "đang gửi yêu cầu" và "hoàn tất" là YES.




### Step2. Action setting (Thiết lập hành động)

![Màn hình workflow](../img/workflow/workflow_action0.png)  
#### Workflow display name (Tên hiển thị của workflow)  
Hiển thị tên hiển thị đã thiết lập ở phần thiết lập trạng thái.
#### Status Name (Tên trạng thái)  
Hiển thị các tên trạng thái đã thiết lập ở phần thiết lập trạng thái.
#### Grant edit permission (Cấp quyền chỉnh sửa)  
Khi thực hiện workflow, có thể cấp quyền chỉnh sửa cho "Người xử lý tiếp theo".
#### Base user of executable users (Người dùng cơ sở) ※Bắt buộc  
Thiết lập người dùng làm cơ sở khi người dùng có thể thực hiện của hành động là "Lấy từ thông tin người thực thi". Có thể chọn trong số "Người thực thi đầu tiên", "Người thực thi", "Người tạo dữ liệu".

#### Action settings (Thiết lập hành động)
- Thiết lập các hành động được thực hiện trong workflow.  
##### Action name (Tên hành động)  
Tên của hành động đó.
##### Pre-execution status (Trạng thái trước khi thực hiện)  
Thiết lập trạng thái mà tại đó có thể thực hiện hành động này.  
Ví dụ: Khi trạng thái trước khi thực hiện được đặt là "chưa thực hiện", nếu trạng thái của dữ liệu là "chưa thực hiện" thì có thể thực hiện hành động đó.  
##### Action settings (Thiết lập hành động)  
Thiết lập hành động nào có thể được thực hiện. Nhấp vào nút [Thay đổi] để thay đổi thiết lập.  
Nội dung thiết lập khác nhau tùy theo loại workflow.  

  ※Khi loại workflow là "Dùng chung":  
    Thiết lập trạng thái sau khi thực hiện hành động này. Vui lòng chọn trạng thái khác với "Trạng thái trước khi thực thi".
![Màn hình workflow](../img/workflow/workflow_action1.png ':size=700')
  ※Khi loại workflow là "Chỉ dùng cho bảng":  
Thiết lập điều kiện thực hiện hành động và trạng thái sau khi thực hiện. Có thể thiết lập tối đa 3 tổ hợp điều kiện và trạng thái.
![Màn hình workflow](../img/workflow/workflow_action3.png)

> Khi loại cột của mục điều kiện là "Lựa chọn (từ bảng khác)", nội dung hiển thị ở giá trị điều kiện có thể thay đổi tại [thiết lập cột hiển thị tiêu đề](/vi/table).

#### Executable user (Người dùng có thể thực hiện)  

Chọn người dùng, tổ chức, v.v. có thể thực hiện hành động này. Nhấp vào nút [Thay đổi] để thay đổi thiết lập.
![Màn hình workflow](../img/workflow/workflow_action4.png)  

##### Người dùng có thể thực hiện: do người dùng thực hiện hành động trước chọn
Người dùng thực hiện hành động, mỗi lần, sẽ chọn gửi đến người dùng hoặc tổ chức nào.  
  
![Màn hình workflow](../ja/img/workflow/workflow_action8.png)

##### Người dùng có thể thực hiện: thiết lập trước
Quản trị viên quyết định sẵn sẽ gửi đến người dùng hoặc tổ chức nào. Luồng tiến theo đúng thiết lập đó.  
  
![Màn hình workflow](../ja/img/workflow/workflow_action9.png)

**■Các mục thiết lập**

- <span class="heading_smaller_than_h5">Người dùng</span>  
Người dùng được chỉ định có thể thực hiện hành động.  

- <span class="heading_smaller_than_h5">Tổ chức</span>  
Người dùng thuộc tổ chức được chỉ định có thể thực hiện hành động.  

- <span class="heading_smaller_than_h5">Cột tùy chỉnh</span>  
Người dùng hoặc tổ chức được thiết lập trong cột tùy chỉnh của dữ liệu đối tượng có thể thực hiện hành động. Đây là chức năng chỉ dành cho "Chỉ dùng cho bảng".  

- <span class="heading_smaller_than_h5">Hệ thống > Người tạo</span>  
Người dùng đã tạo dữ liệu tùy chỉnh có thể thực hiện hành động.


##### Người dùng có thể thực hiện: lấy từ thông tin người dùng thực hiện
Quyết định nơi gửi từ thông tin của người dùng thực hiện workflow. Hệ thống lấy giá trị của mục người dùng, tổ chức (cấp trên, v.v.) đã đặt cho người dùng đó, rồi gửi hành động đến người dùng, tổ chức ấy.

- Ví dụ 1: Khi cấp trên của người dùng A là "Trưởng bộ phận X", hành động được gửi đến Trưởng bộ phận X
- Ví dụ 2: Khi cấp trên của người dùng B là "Trưởng bộ phận Y" và "Trưởng bộ phận Z", hành động được gửi đến Trưởng bộ phận Y và Trưởng bộ phận Z
  
![Màn hình workflow](../ja/img/workflow/workflow_action10.png)

※Để sử dụng chức năng này, quản trị viên hệ thống cần thêm trước vào bảng "Người dùng" các cột có loại cột tùy chỉnh là "Người dùng" hoặc "Tổ chức". Ngoài ra, cần đặt "Chỉ mục tìm kiếm" của các cột này là YES.

![Màn hình workflow](../ja/img/workflow/workflow_action11.png)

**■Người dùng cơ sở**

Là người dùng làm cơ sở khi lấy người dùng có thể thực hiện. Mục này được [thiết lập theo từng workflow](/vi/workflow_setting?id=Base-user-of-executable-users-Người-dùng-cơ-sở-※Bắt-buộc).  

- "Người thực thi đầu tiên": lấy người dùng đã thực hiện hành động đầu tiên của luồng làm cơ sở.  
- "Người thực thi": lấy người dùng đã thực hiện hành động tương ứng làm cơ sở.  
- "Người tạo dữ liệu": lấy người dùng đã tạo dữ liệu làm cơ sở.  

> Vui lòng xem [Ví dụ về workflow](/vi/workflow_example) để biết sự khác biệt về cách hoạt động tùy theo người dùng cơ sở.

**■Cột tùy chỉnh**

Các cột "Người dùng" và cột "Tổ chức" của bảng người dùng sẽ được hiển thị làm ứng viên. Khi thực hiện hành động, người dùng hoặc tổ chức được thiết lập ở cột tương ứng của người dùng cơ sở có thể thực hiện hành động tiếp theo.  


#### Option settings > Condition to go to next status (Điều kiện để chuyển sang trạng thái tiếp theo)  
Thiết lập số người cần thực hiện hành động này để chuyển sang trạng thái tiếp theo.  
※Thông thường, chỉ cần một người thực hiện là luồng tiến tiếp. Khi muốn làm như "chỉ chuyển sang trạng thái tiếp theo khi có từ 3 người trở lên phê duyệt" hoặc "chỉ chuyển sang trạng thái tiếp theo khi tất cả người dùng của tổ chức quản lý phê duyệt", hãy đổi giá trị thiết lập này.  

#### Option settings > Comments (Bình luận)  
Có cho nhập bình luận khi thực hiện hành động hay không.  
Có thể chọn trong số "Bắt buộc", "Tùy chọn", "Không sử dụng".  
※Hành động được đặt là "Bắt buộc" sẽ không có nút trên thẻ thông báo của [LINE](/vi/line) và không thể thực hiện từ LINE.

#### Option settings > Special actions (Hành động đặc biệt)  
Khi đánh dấu chọn, "Người dùng có thể thực thi" của hành động này sẽ không được tính vào người xử lý hiện tại.  
(Người xử lý hiện tại là người dùng có thể thực hiện một hành động workflow nào đó ở trạng thái tại thời điểm hiện tại.)  
Vui lòng đánh dấu chọn cho các hành động như hành động mà quản trị viên phê duyệt theo trường hợp ngoại lệ.  
※Nếu người dùng xử lý chỉ được phân công vào "Hành động đặc biệt", người dùng đó sẽ không nhận được thông báo. Ngoài ra, người dùng đó cũng không được hiển thị ở "Người xử lý hiện tại".

<span class="small">※Mục đích sử dụng chủ yếu là làm hành động để đưa workflow đang tiến hành về lại bước đầu bằng quyền quản trị viên, hoặc để đưa luồng đến bước hoàn tất theo trường hợp ngoại lệ.</span>

#### Khác biệt so với hành động thông thường
| Nội dung | Thông thường | Hành động đặc biệt |
| ---- | ---- | ---- |
| Thiết lập người dùng có thể thực thi | Không giới hạn | Chỉ "Thiết lập trước" |
| Thông báo đến người dùng đối tượng | Được thực hiện | Không được thực hiện |
| Hiển thị ở "Người xử lý hiện tại" | Được hiển thị | Không được hiển thị |
| Hiển thị ở ["Công việc chờ xử lý"](/vi/workflow_task) | Được hiển thị | Không được hiển thị |


### Hoàn tất thiết lập
Khi đã thực hiện cả thiết lập trạng thái lẫn thiết lập hành động, nút "Hoàn tất cài đặt" sẽ hiển thị ở phía trên bên phải của trang.  

![Màn hình workflow](../img/workflow/workflow_beginning1.png)  

Nhấp vào nút này để hoàn tất thiết lập workflow.  
※Sau khi hoàn tất thiết lập, sẽ không thể làm các việc sau. 
- Thêm, xóa, thay đổi thứ tự trạng thái




### Step3. Notify setting (Thiết lập thông báo)
Step 3 và Step 4 được hiển thị sau khi đã thực hiện [Hoàn tất cài đặt].  
Thiết lập các thông báo được gửi khi thực hiện workflow. Về các mục thiết lập, vui lòng xem [Thiết lập thông báo / gửi email](/vi/notify).

### Step4. Usage settings (Thiết lập sử dụng)
Thiết lập workflow nào sẽ được thực hiện ở bảng nào.  
![Màn hình workflow](../img/workflow/workflow_beginning2.png)  

- Các workflow được hiển thị cho từng bảng là những workflow thuộc loại "Dùng chung" hoặc được tạo dành riêng cho bảng đó, và đang ở tình trạng "đã hoàn tất thiết lập".

- Khi sử dụng workflow, vui lòng đánh dấu chọn vào hộp kiểm "Sử dụng".  

- Khi muốn đổi workflow theo ngày, hãy nhập ngày vào "Ngày bắt đầu sử dụng" và "Ngày kết thúc sử dụng". Hãy để các khoảng thời gian không trùng nhau rồi lưu.


Đến đây, việc thiết lập workflow đã hoàn tất.  
Khi thực hiện workflow trên thực tế, vui lòng xem [Thực hiện workflow](/vi/workflow_execution).



### Xóa workflow
Có thể xóa thiết lập workflow đã đăng ký.  
Khi xóa thiết lập workflow đã được thiết lập sử dụng, vui lòng lưu ý các điểm sau.

- Không thể khôi phục thiết lập workflow.
- Các workflow đang tiến hành sẽ bị vô hiệu hóa.
- **Ngay cả khi thiết lập "Không cho chỉnh sửa dữ liệu" trong phần thiết lập trạng thái là YES, các dữ liệu đang bị khóa chỉnh sửa sẽ lại có thể chỉnh sửa được.**

![Màn hình workflow](../ja/img/workflow/workflow4.png)  



### Các đặc tả chi tiết khác

- Với "Người dùng có thể thực thi: Lấy từ thông tin người thực thi" và "Người dùng cơ sở để xác định người có thể thực thi: Người thực thi", khi đặt "Cài đặt tùy chọn > Điều kiện chuyển sang trạng thái tiếp theo" từ 2 người trở lên, người xử lý tiếp theo sẽ được lấy dựa trên người dùng thực hiện sau cùng.  
Ví dụ: Khi đặt "Điều kiện chuyển sang trạng thái tiếp theo" là 3 người, người dùng làm cơ sở để lấy "người dùng thực hiện hành động tiếp theo" chỉ là người thứ 3 thực hiện hành động. Thông tin của người dùng thứ 1 và thứ 2 không được lấy.

- Đối với các hành động có cùng "Trạng thái trước khi thực thi", không thể thiết lập đồng thời "Người dùng có thể thực thi: Thiết lập trước" và "Người dùng có thể thực thi: Do người thực thi hành động trước chọn". (Trừ trường hợp đặt "Người dùng có thể thực thi: Thiết lập trước" làm "Hành động đặc biệt".)

- Đối với các hành động có cùng "Trạng thái trước khi thực thi", không thể thiết lập đồng thời "Người dùng có thể thực thi: Lấy từ thông tin người thực thi" và "Người dùng có thể thực thi: Do người thực thi hành động trước chọn". (Trừ trường hợp đặt "Người dùng có thể thực thi: Lấy từ thông tin người thực thi" làm "Hành động đặc biệt".)
