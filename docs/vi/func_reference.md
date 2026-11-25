# Tài liệu tham khảo hàm
> Tài liệu tham khảo này chỉ ghi những class và hàm đặc biệt quan trọng khi tùy biến, ví dụ khi làm plugin.

## Mở đầu
Exment là hệ thống mã nguồn mở dùng PHP. Exment dùng những thứ sau.

- Framework: [Laravel](https://laravel.com/)
- Thư viện màn hình quản trị: [exment-admin-core](https://github.com/exceedone/exment-admin-core) (thư viện dựa trên laravel-admin / open-admin)
Lưu ý: từ Exment v6.x trở về trước, thư viện màn hình quản trị là [laravel-admin](http://laravel-admin.org/docs/#/).

Vì vậy, có thể dùng tất cả các hàm và model của chúng.

Tuy nhiên, chủ yếu để thực hiện bảng tùy chỉnh, Exment có những chỗ cần cách viết đặc biệt, khác với Eloquent thông thường của Laravel.
Ngoài ra, Exment cũng định nghĩa các hàm giúp phát triển dễ hơn.
Trang này giải thích các hàm do Exment tự định nghĩa.


## ModelBase / Class cơ sở của model
Đây là class cơ sở của từng model.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| id | string (số nguyên) | ID |
| created_user | CustomValue(user) | Instance người dùng đã tạo dữ liệu |
| updated_user | CustomValue(user) | Instance người dùng đã cập nhật dữ liệu |



## LoginUser / Class người dùng đăng nhập
Thông tin người dùng đăng nhập.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| id | string (số nguyên) | ID của bảng người dùng đăng nhập |
| base_user_id | string (số nguyên) | ID của dữ liệu tùy chỉnh "Người dùng".<br/><span class="red">Lưu ý: ID người dùng tạo, ID người dùng cập nhật, v.v. trên màn hình đều dùng ID này</span> |
| user_code | string | Mã người dùng |
| user_name | string | Tên hiển thị của người dùng |
| email | string | Địa chỉ email |
| display_avatar | string | Avatar của người dùng (nếu chưa đặt thì là avatar mặc định) |
| login_type | string | Loại provider đăng nhập.<br/>pure: thông thường<br/>oauth: xác thực OAuth2<br/>saml: xác thực SAML<br/>ldap: xác thực LDAP |
| login_provider | string | Tên provider đăng nhập. Được đặt khi không phải đăng nhập thông thường. google, github, v.v. |



### Danh sách hàm

#### \Exment::user()
Lấy thông tin người dùng đang đăng nhập.  
Lưu ý: đây không phải hàm của LoginUser, nhưng được ghi ở đây cho tiện.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| ?LoginUser | Nếu đã đăng nhập thì là thông tin người dùng đăng nhập. Nếu chưa đăng nhập thì là null |

##### Ví dụ sử dụng

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
Trả về ID của dữ liệu tùy chỉnh "Người dùng".

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string (số nguyên) | ID của dữ liệu tùy chỉnh "Người dùng" |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### Bổ sung: về id và base_user_id
Trong Exment, có 2 bảng DB liên quan đến người dùng: bảng "'Người dùng (user)' của dữ liệu tùy chỉnh" và bảng "Người dùng đăng nhập (login_users)".  
Chủ yếu có các đặc điểm sau.

- **Bảng "'Người dùng (user)' của dữ liệu tùy chỉnh"**
    - Có mã người dùng, tên người dùng, địa chỉ email
    - Trên màn hình, quản lý ở URL "/data/user"
    - Lấy được danh sách từ API

- **Bảng "Người dùng đăng nhập (login_users)"**
    - Có các thông tin như loại provider đăng nhập (mặc định, LDAP, OAuth, v.v.), mật khẩu, avatar, v.v.<br/>(Lưu ý: thông tin mã người dùng, tên người dùng, địa chỉ email được lấy trong chương trình bằng hàm của Laravel)
    - Trên màn hình, quản lý ở URL "/loginuser"
    - Không lấy được danh sách từ API. Chỉ lấy được thông tin đăng nhập của chính mình
    - Có "ID của 'Người dùng (user)' của dữ liệu tùy chỉnh" ở cột base_user_id. Quan hệ 1:n

#### Khi ID của 2 bảng lệch nhau
**Khi cài đặt nhiều cách đăng nhập, ID của bảng "'Người dùng (user)' của dữ liệu tùy chỉnh" và bảng "Người dùng đăng nhập (login_users)" có thể lệch nhau**. Đó là trường hợp như sau.

##### Bảng "'Người dùng (user)' của dữ liệu tùy chỉnh"
| ID | Mã người dùng | Tên người dùng | Địa chỉ email |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### Bảng "Người dùng đăng nhập (login_users)"
| ID | base_user_id | login_type | login_provider | Bổ sung |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | Người dùng admin đăng nhập bằng cách đăng nhập thông thường |
| 2 | 1 | oauth | google | Người dùng admin đăng nhập bằng OAuth của Google |
| 3 | 1 | ldap | ad | Người dùng admin đăng nhập bằng LDAP |
| 4 | 2 | pure | - | Người dùng user1 đăng nhập bằng cách đăng nhập thông thường |

Trong trường hợp này, ID của $login_user->id và của $login_user->getUserId() khác nhau.  

~~~ php
// Ví dụ: khi người dùng admin đăng nhập bằng LDAP

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

Ngoài ra, <span class="red">ID người dùng tạo, ID người dùng cập nhật, v.v. trên màn hình đều dùng getUserId().</span> Vì vậy, khi lấy ID người dùng trong plugin, v.v., hãy luôn dùng getUserId().


## CustomTable / Bảng tùy chỉnh
Class của bảng tùy chỉnh.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| table_name | string | Tên bảng (chữ và số) |
| table_view_name | string | Tên hiển thị của cột |
| description | string | Mô tả |


### Thuộc tính (hasMany)
Danh sách các thuộc tính được định nghĩa là đối tượng HasMany của Laravel.

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | Cột tùy chỉnh |
| custom_forms | CustomForm | Biểu mẫu |
| custom_views | CustomView | Chế độ xem |
| custom_operations | CustomOperation | Cập nhật hàng loạt |
| notifies | Notify | Thông báo |
| custom_relations | CustomRelation | Quan hệ (mà bảng đó là bảng cha) |
| child_custom_relations | CustomRelation | Quan hệ (mà bảng đó là bảng con) |

### Danh sách hàm


#### (static)getEloquent
Lấy đối tượng của bảng tùy chỉnh.  
$obj làm khóa có thể là id, table_name, CustomTable, CustomColumn, CustomValue.  
Trong cùng request, thông tin bảng tùy chỉnh đã lấy được giữ trong bộ nhớ, nên không cần lấy lại.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $obj | mixed | Giá trị khóa muốn lấy (id, table_name, CustomTable, CustomColumn, CustomValue) |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| CustomTable | Thông tin của bảng tùy chỉnh đã lấy |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
Lấy model của dữ liệu tùy chỉnh.  
Lưu ý: Model của dữ liệu tùy chỉnh dựa trên class CustomValue, và được tạo instance bằng tên class động kế thừa class đó.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $id | string,int | id, khi muốn lấy model của dữ liệu tùy chỉnh có ID chỉ định. Giá trị ban đầu là null |
| $withTrashed | bool | true khi muốn lấy model đã bị xóa. Giá trị ban đầu là false |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| CustomValue | Đối tượng của dữ liệu tùy chỉnh (class động kế thừa nó) |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1. Tạo query để lấy dữ liệu của thông báo
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// Viết tiếp query builder của cơ sở dữ liệu cho $query

// 2. Lấy dữ liệu có ID là 1 của dữ liệu thông báo
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Chào mừng đến với Exment!
\Log::debug($value->getValue('body')); // Exment là hệ thống web quản lý dữ liệu đơn giản, hợp túi tiền. ...

~~~

---

#### getSearchEnabledColumns
Lấy danh sách các cột tùy chỉnh có thể tìm kiếm.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| Collection(CustomColumn) | Danh sách đối tượng cột tùy chỉnh |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
Lấy cài đặt tùy chọn của bảng tùy chỉnh.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $key | string | Khóa của cài đặt cần lấy. color, icon, search_enabled, v.v. |
| $default | mixed | Giá trị mặc định khi khóa không tồn tại. Nếu không chỉ định thì là null |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| mixed | Giá trị tùy chọn của bảng tùy chỉnh |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
Xác định xem người dùng đăng nhập có quyền truy cập bảng đó hay không.  


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | Khóa của quyền cần xác định. Giá trị ban đầu là AVAILABLE_VIEW_CUSTOM_VALUE (quyền hiển thị của bảng tùy chỉnh) |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| bool | true nếu có quyền, false nếu không có |

##### Ví dụ sử dụng

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Xác định xem người dùng đăng nhập có quyền hiển thị với bảng "Hợp đồng" hay không
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// Xác định xem người dùng đăng nhập có quyền chỉnh sửa với bảng "Doanh thu" hay không
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
Xác định xem người dùng đăng nhập có quyền hiển thị id chỉ định của bảng chỉ định hay không.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $id | string,int | id của custom_value đối tượng |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| bool | true nếu có quyền, false nếu không có |

##### Ví dụ sử dụng

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Xác định xem người dùng đăng nhập có quyền hiển thị với dữ liệu id 3 của bảng "Hợp đồng" hay không
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
Xác định xem người dùng đăng nhập có quyền chỉnh sửa id chỉ định của bảng chỉ định hay không.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $id | string,int | id của custom_value đối tượng |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| bool | true nếu có quyền, false nếu không có |

##### Ví dụ sử dụng

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Xác định xem người dùng đăng nhập có quyền hiển thị với dữ liệu id 5 của bảng "Doanh thu" hay không
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / Cột tùy chỉnh
Class của cột tùy chỉnh.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| column_name | string | Tên cột (chữ và số) |
| column_view_name | string | Tên hiển thị của cột |
| required | bool | Có phải cột bắt buộc hay không |
| index_enabled | bool | Có phải cột có chỉ mục tìm kiếm hay không |
| unique | bool | Có phải cột duy nhất hay không |


### Thuộc tính (hasMany)
Danh sách các thuộc tính được định nghĩa là đối tượng HasMany của Laravel.

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | Cột của biểu mẫu |
| custom_view_columns | CustomViewColumn | Cột của chế độ xem |


### Thuộc tính (belongsTo)
Danh sách các thuộc tính được định nghĩa là đối tượng belongsTo của Laravel.

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Bảng tùy chỉnh |


### Danh sách hàm

#### (static)getEloquent
Lấy đối tượng cột tùy chỉnh.  
$obj làm khóa có thể là id, column_name, CustomColumn.  
Trong cùng request, thông tin cột tùy chỉnh đã lấy được giữ trong bộ nhớ, nên không cần lấy lại.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $column_obj | mixed | Giá trị khóa muốn lấy (id, column_name, CustomColumn) |
| $table_obj | mixed | Khi chỉ định $column_obj bằng column_name, đây là id, table_name, CustomTable, v.v. của bảng tùy chỉnh đối tượng, dùng để lọc bảng |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| CustomColumn | Thông tin của cột tùy chỉnh đã lấy |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Lấy thông tin cột "Tiêu đề" của bảng "Thông báo" bằng cách chỉ định ID của cột tùy chỉnh
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// Lấy thông tin cột "Nội dung" của bảng "Thông báo" bằng cách chỉ định tên cột tùy chỉnh.
// Tên cột có thể được dùng ở bảng khác, nên tham số cũng cần thông tin bảng
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // Tên hiển thị của cột
~~~

---


#### getIndexColumnName
Khi cột đó bật chỉ mục tìm kiếm, lấy tên INDEX của cơ sở dữ liệu.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $alterColumn | bool | Khi cột ảo của cột đó không tồn tại trong cơ sở dữ liệu, có tạo cột ảo hay không. Giá trị ban đầu là true |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Tên chỉ mục. |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Tìm các dòng có "Tiêu đề" của bảng "Thông báo" bắt đầu bằng "Exment"
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / Dữ liệu tùy chỉnh
Class của dữ liệu tùy chỉnh.  
Lưu ý: class này là class trừu tượng. Lấy class này làm base, class được tạo động cho từng bảng tùy chỉnh.
Khi muốn lấy class dữ liệu tùy chỉnh của từng bảng, vui lòng xem [getValueModel của class CustomTable](#getvaluemodel).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| parent_type | string | Tên bảng cha, khi dữ liệu đó có bảng cha |
| parent_id | int | id của dữ liệu tùy chỉnh của bảng cha, khi dữ liệu đó có bảng cha |
| label | string | Tiêu đề khi hiển thị dữ liệu đó trên màn hình |


### Thuộc tính (belongsTo)
Danh sách các thuộc tính được định nghĩa là đối tượng belongsTo của Laravel.

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Bảng tùy chỉnh |


### Danh sách hàm

#### notify
Chạy thông báo của dữ liệu tùy chỉnh đó.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | Loại thông báo |

##### Giá trị trả về
Không có

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Chạy thông báo khi tạo dữ liệu cho dữ liệu id 1 của bảng thông báo
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
Lấy giá trị đang lưu, với khóa là cột tùy chỉnh đã chỉ định.  
Lưu ý: tùy nội dung của tham số $valueType, kiểu và nội dung của giá trị trả về sẽ khác nhau.  
Ví dụ, khi loại cột tùy chỉnh là "Lựa chọn (từ bảng khác)" và $valueType là false, hàm trả về đối tượng của dữ liệu đã chọn.  
**Lưu ý: giá trị trả về theo từng loại cột tùy chỉnh, vui lòng xem [tại đây](/vi/column_reference).**  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | Một trong các loại: instance của CustomColumn, column_name, id |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | Trả về theo nội dung sau. <br />- Không có tham số, false hoặc ValueType::VALUE: trả về dạng value  <br /> - true hoặc ValueType::TEXT: trả về dạng text <br />- ValueType::HTML : trả về dạng html <br />- ValueType::PURE_VALUE : trả về dạng pureValue <br /><br />Lưu ý: về nội dung của pureValue, value, text, html, vui lòng xem [tại đây](/vi/column_reference). |
| $options | array | Tùy chọn của cách lấy |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| mixed | Giá trị dữ liệu tùy chỉnh của cột đã chỉ định |


##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Lấy dữ liệu có id 1 của bảng thông báo
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Chào mừng đến với Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Bình thường 
~~~

---

#### setValue
Gán giá trị, với khóa là cột tùy chỉnh đã chỉ định.  
Lưu ý: trong Exment, giá trị nhập vào dữ liệu tùy chỉnh được lưu ở cột "value" của cơ sở dữ liệu dưới kiểu json.  
Ngoài ra, trong instance của CustomValue, thuộc tính value đó được cast thành mảng kết hợp.  
Hàm này là xử lý gán giá trị vào cột value bằng cách chỉ định khóa.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $key | string | Tên cột tùy chỉnh |
| $val | mixed | Giá trị cần gán |
| $forgetIfNull | bool | Khi $val là null, có xóa khóa khỏi mảng kết hợp hay không. Giá trị ban đầu là false |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| CustomValue | Instance của CustomValue (magic method)) |


##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Lấy dữ liệu có id 1 của bảng thông báo
$value = CustomTable::getEloquent('information')->getValueModel(1);

// Cập nhật và lưu vào cơ sở dữ liệu
$value->setValue('title', 'Cập nhật tiêu đề');
$value->save();
~~~

---

#### setValueStrictly

> Có từ 3.4.3

Gán vào đối tượng mảng gồm các cột tùy chỉnh đã chỉ định và giá trị.  
Lưu ý: trước khi gán giá trị, validation được thực hiện.  
Khi có lỗi validation, \Illuminate\Validation\ValidationException được ném ra.  


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $list | array | Mảng có khóa là tên cột tùy chỉnh, giá trị là giá trị cần gán |
| $forgetIfNull | bool | Khi $val là null, có xóa khóa khỏi mảng kết hợp hay không. Giá trị ban đầu là false |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| CustomValue | Instance của CustomValue (magic method)) |


##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// Lấy dữ liệu có id 1 của bảng "foo"
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // Đặt giá trị vào đối tượng. Mảng "tên cột tùy chỉnh => giá trị"
    $value->setValueStrictly(['value1' => 'giá trị 1', 'value2' => 2]);
    // Cập nhật và lưu vào cơ sở dữ liệu
    $value->save();
}
// Khi có lỗi validation
catch(ValidationException $ex){
    // Lấy nội dung lỗi
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
Lấy chuỗi tiêu đề của dữ liệu tùy chỉnh.  

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Chuỗi tiêu đề của dữ liệu tùy chỉnh |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Lấy dữ liệu có id 1 của bảng thông báo
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Chào mừng đến với Exment!
~~~

---

#### getUrl
Lấy URL liên kết đến trang của dữ liệu tùy chỉnh.  


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $options | array | Mảng kết hợp chỉ định cách lấy. <br />tag : true khi muốn lấy dưới dạng thẻ a. Giá trị ban đầu là false<br />list : true khi muốn lấy dưới dạng trang danh sách. Giá trị ban đầu là false<br />icon : tên class của font-awesome, khi muốn thêm biểu tượng   |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | URL hoặc thẻ |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Lấy dữ liệu có id 1 của bảng thông báo
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">Chào mừng đến với Exment!</a>

~~~






## NotifyService / Dịch vụ thông báo
Dịch vụ được gọi khi thực hiện thông báo.

- namespace Exceedone\Exment\Services


### Danh sách hàm


#### (static)notifyMail
Thực hiện thông báo bằng email.


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $params | array | Tham số thông báo. Các khóa và mô tả ở dưới |
| $params['prms'] | array | Mảng khóa - giá trị dùng để thay thế trong tiêu đề và nội dung |
| $params['user'] | CustomValue(user) or string | Đối tượng người dùng nhận email, hoặc địa chỉ email |
| $params['custom_value'] | CustomValue | Dữ liệu tùy chỉnh là đối tượng gửi email |
| $params['mail_template'] | MailTemplate or string or id | Thông tin mẫu thông báo |
| $params['subject'] | string | Tiêu đề |
| $params['body'] | string | Nội dung |
| $params['to'] | string | Nơi nhận email. Nếu có nhiều thì cách nhau bằng dấu phẩy |
| $params['cc'] | string | CC của email. Nếu có nhiều thì cách nhau bằng dấu phẩy |
| $params['bcc'] | string | BCC của email. Nếu có nhiều thì cách nhau bằng dấu phẩy |


##### Ví dụ sử dụng

~~~ php
    // Ví dụ 1: gửi email đơn giản
    NotifyService::notifyMail([
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // Ví dụ 2: dùng mẫu thông báo
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // Ví dụ 3: thay thế tham số
    NotifyService::notifyMail([
        'subject' => 'Thử nghiệm ${prms1} ${prms2}',
        'body' => 'Đây là nội dung. ${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ví dụ 4: thay thế tham số bằng dữ liệu tùy chỉnh
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung. ${value:contract_code}', // Thay bằng giá trị contract_code của $custom_value
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
Hiển thị thông báo ở header phía trên bên phải của trang.


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $params | array | Tham số thông báo. Các khóa và mô tả ở dưới |
| $params['prms'] | array | Mảng khóa - giá trị dùng để thay thế trong tiêu đề và nội dung |
| $params['user'] | CustomValue(user) | Đối tượng người dùng nhận thông báo |
| $params['custom_value'] | CustomValue | Dữ liệu tùy chỉnh là đối tượng thông báo |
| $params['mail_template'] | MailTemplate or string or id | Thông tin mẫu thông báo |
| $params['subject'] | string | Tiêu đề |
| $params['body'] | string | Nội dung |


##### Ví dụ sử dụng

~~~ php
    // Ví dụ 1: thông báo đơn giản cho người dùng có ID người dùng là 1
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung',
        'user' => $user,
    ]);
    

    // Ví dụ 2: dùng mẫu thông báo
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // Ví dụ 3: thay thế tham số
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Thử nghiệm ${prms1} ${prms2}',
        'body' => 'Đây là nội dung. ${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ví dụ 4: thay thế tham số bằng dữ liệu tùy chỉnh
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung. ${value:contract_code}', // Thay bằng giá trị contract_code của $custom_value
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Gửi thông báo đến Slack.


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $params | array | Tham số thông báo. Các khóa và mô tả ở dưới |
| $params['webhook_url'] | string | URL của WebHook |
| $params['webhook_name'] | string | Tên đăng lên Slack |
| $params['webhook_icon'] | string | Biểu tượng đăng lên Slack |
| $params['prms'] | array | Mảng khóa - giá trị dùng để thay thế trong tiêu đề và nội dung |
| $params['custom_value'] | CustomValue | Dữ liệu tùy chỉnh là đối tượng thông báo |
| $params['mail_template'] | MailTemplate or string or id | Thông tin mẫu thông báo |
| $params['subject'] | string | Tiêu đề |
| $params['body'] | string | Nội dung |


##### Ví dụ sử dụng

~~~ php
    // Ví dụ 1: thông báo đơn giản đến Slack
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung',
    ]);
    

    // Ví dụ 2: dùng mẫu thông báo
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Ví dụ 3: thay thế tham số
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Thử nghiệm ${prms1} ${prms2}',
        'body' => 'Đây là nội dung. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ví dụ 4: thay thế tham số bằng dữ liệu tùy chỉnh
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung. ${value:contract_code}', // Thay bằng giá trị contract_code của $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Gửi thông báo đến Microsoft Teams.


##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $params | array | Tham số thông báo. Các khóa và mô tả ở dưới |
| $params['webhook_url'] | string | URL của WebHook |
| $params['prms'] | array | Mảng khóa - giá trị dùng để thay thế trong tiêu đề và nội dung |
| $params['custom_value'] | CustomValue | Dữ liệu tùy chỉnh là đối tượng thông báo |
| $params['mail_template'] | MailTemplate or string or id | Thông tin mẫu thông báo |
| $params['subject'] | string | Tiêu đề |
| $params['body'] | string | Nội dung |


##### Ví dụ sử dụng

~~~ php
    // Ví dụ 1: thông báo đơn giản đến Teams
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung',
    ]);
    

    // Ví dụ 2: dùng mẫu thông báo
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Ví dụ 3: thay thế tham số
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Thử nghiệm ${prms1} ${prms2}',
        'body' => 'Đây là nội dung. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ví dụ 4: thay thế tham số bằng dữ liệu tùy chỉnh
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Thử nghiệm',
        'body' => 'Đây là nội dung. ${value:contract_code}', // Thay bằng giá trị contract_code của $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / Class quản lý tệp
Class quản lý các loại tệp đã tải lên Exment (tệp của cột tệp và cột hình ảnh, tệp đính kèm, ảnh avatar, v.v.).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Thuộc tính

| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| uuid | string | Chuỗi duy nhất để quản lý tệp. Vì tên tệp gốc có thể trùng nhau, Exment gắn uuid cho mọi tệp. |
| file_type | integer | Loại tệp (1: cột tùy chỉnh, 2: tệp đính kèm, 3: avatar, 4: hệ thống, 5: hình ảnh của biểu mẫu, 6: biểu mẫu công khai) |
| local_dirname | string | Tên thư mục nơi tệp được lưu |
| local_filename | string | Tên tệp được lưu (thường là uuid + phần mở rộng) |
| filename | string | Tên tệp gốc vào lúc tải lên |
| parent_type | string | Tên của CustomTable mà tệp gắn với |
| parent_id | string | ID của CustomValue mà tệp gắn với |
| custom_column_id | integer | ID của CustomColumn mà tệp gắn với |
| custom_form_column_id | integer | ID của CustomFormColumn mà tệp gắn với |
| path | string | Đường dẫn của tệp được lưu. Không phải đường dẫn đầy đủ mà là đường dẫn tương đối tính từ storage tải lên. |
| extension | string | Phần mở rộng của tệp |



### Danh sách hàm

#### (static)getUrl
Trả về URL để truy cập tệp.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $path | string | Đường dẫn tương đối của tệp |
| $options | array | Mảng kết hợp chỉ định cách lấy. <br />asApi : true khi muốn lấy URL của API. Giá trị ban đầu là false  |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | URL của tệp |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// Lấy dữ liệu có id 1 của bảng test
$value = CustomTable::getEloquent('test')->getValueModel(1);
// Lấy giá trị của cột tệp (cột tệp và cột hình ảnh chứa đường dẫn tương đối)
$file_path = $value->getValue('file');
// Lấy URL
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
Lưu nội dung tệp vào storage và thêm dữ liệu vào bảng quản lý tệp.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $file_type | integer | Loại tệp (chi tiết xem phần thuộc tính) |
| $content | mixed | Nội dung tệp. Có thể chỉ định UploadedFile, String (chuỗi ghi vào tệp), v.v. |
| $dirname | string | Tên thư mục lưu tệp |
| $filename | string | Tên tệp gốc |
| $options | array | Mảng kết hợp chỉ định các tùy chọn khi lưu.  |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| File | Instance của dữ liệu đã thêm vào bảng quản lý tệp |

##### Ví dụ sử dụng
Lưu ý: xem saveCustomValue, saveDocumentModel.

---

#### saveCustomValue
Thêm thông tin của CustomValue vào dữ liệu của bảng quản lý tệp.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $custom_value_id | integer | ID của CustomValue |
| $custom_column | mixed | Khi loại tệp là cột tùy chỉnh: instance của CustomColumn / ID của dữ liệu đối tượng / tên cột (chữ và số) |
| $custom_table | mixed | Instance của CustomTable |
| $replace | bool | true khi thay toàn bộ các tệp gắn với cột đã chỉ định. Giá trị ban đầu là false |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| File | Instance của bảng quản lý tệp |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Lấy bảng test
$custom_table = CustomTable::getEloquent('test');
// Lấy dữ liệu có id=1 của bảng test
$custom_value = $custom_table->getValueModel(1);
// Lấy cột file của bảng test
$file_column = CustomColumn::getEloquent('file', $custom_table);
// Lưu chuỗi "hogehoge" vào storage với tên "hoge.txt". Thêm dữ liệu vào bảng quản lý tệp rồi gắn với cột file của dữ liệu id=1 của bảng test
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// Cập nhật cột file của dữ liệu id=1 của bảng test
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
Tạo thông tin tài liệu từ dữ liệu của bảng quản lý tệp.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instance của CustomValue sẽ gắn với tài liệu |
| $document_name | string | Tên tệp của tài liệu |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| File | Instance của dữ liệu đã thêm vào bảng tài liệu |

##### Ví dụ sử dụng

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Lấy bảng test
$custom_table = CustomTable::getEloquent('test');
// Lấy dữ liệu có id=1 của bảng test
$custom_value = $custom_table->getValueModel(1);

// Lưu chuỗi "hogehoge" vào storage với tên "hoge.txt". Thêm dữ liệu vào bảng quản lý tệp
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// Gắn dữ liệu của bảng quản lý tệp với dữ liệu id=1 của bảng test
$file = $file->saveCustomValue(1, null, $custom_table);
// Tạo thông tin tài liệu (gắn với dữ liệu id=1 của bảng test)
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### Bổ sung: về cách xử lý tệp
Khi xem thông tin của cột tệp trong dữ liệu tùy chỉnh của Exment, ở đó chỉ có một đường dẫn tương đối đơn giản.  
Tệp thực tế được lưu trong storage. Bảng quản lý tệp (files) là nơi quản lý thông tin để truy cập tệp trên storage này, loại tệp, và tệp gắn với dữ liệu tùy chỉnh nào.  
Ngoài các tệp tải lên ở cột tệp và cột hình ảnh, bảng này quản lý chung nhiều loại tệp như tệp đính kèm, ảnh avatar, biểu tượng và logo của hệ thống, v.v. (Ngoài ra, tệp đính kèm còn dùng thêm một bảng riêng gọi là bảng tài liệu)  
Vì vậy, khi dùng plugin để đặt dữ liệu vào cột tệp hoặc gắn tệp đính kèm, cần cách viết hơi phức tạp hơn so với các trường thông thường.  
Chi tiết vui lòng xem "Ví dụ sử dụng" ở trên và các plugin mẫu.
