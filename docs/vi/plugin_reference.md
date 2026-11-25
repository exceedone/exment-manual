# Tài liệu tham khảo plugin
Trang này dành cho người phát triển plugin.  
Với từng loại plugin, trang này tổng hợp lớp cần kế thừa và các hàm, thuộc tính dùng được trong lớp đó.

- Về các hàm của bảng tùy chỉnh, cột tùy chỉnh và dữ liệu tùy chỉnh, vui lòng xem [Tài liệu tham khảo hàm](/vi/func_reference).
- Về giải thích chi tiết của plugin (trang CRUD), vui lòng xem [Tài liệu tham khảo plugin (trang CRUD)](/vi/plugin_reference_crud).
- Các lớp của thư viện màn hình quản trị được viết theo namespace của Exment v7.0.0 trở lên ("ExmentAdminCore\Admin"). Nếu bạn dùng v6.x trở xuống, hãy đọc thay thành "Encore\Admin". Chi tiết vui lòng xem [Cập nhật lên v7.0.0](/update/v7_0_0).



## PluginBase / Lớp dùng chung của plugin

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| plugin | Plugin | Instance Eloquent của plugin |
| pluginOptions | PluginOptionBase | Instance của lớp chứa các thuộc tính của plugin (kế thừa PluginOptionBase) |
| useCustomOption | bool | Có dùng cài đặt riêng của plugin hay không. Giá trị ban đầu là false |

※ Trước đây, các thuộc tính được định nghĩa trực tiếp trong lớp trừu tượng của từng loại plugin. Với cách này, tên có thể bị trùng với thuộc tính do người dùng tự định nghĩa.  
Vì vậy, các thuộc tính được thêm từ v4.2.2 trở đi được định nghĩa trong pluginOptions. Có thể truy cập bằng "$this->pluginOptions->tên thuộc tính". Các thuộc tính đã có vẫn dùng được như trước để giữ tính tương thích.

### Danh sách hàm

#### setCustomOptionForm
Định nghĩa cài đặt riêng của plugin. Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart).  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Instance biểu mẫu của thư viện màn hình quản trị (exment-admin-core; với v6.x trở xuống là laravel-admin) |

##### Giá trị trả về
Không có

##### Ví dụ sử dụng
Vui lòng xem [tại đây](/vi/plugin_quickstart).

---



## PluginApiBase
Lớp trừu tượng của plugin (API). Khi phát triển plugin API, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_api).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### Thuộc tính
Không có

### Danh sách hàm

#### getRouteUri
Lấy endpoint của API riêng.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $endpoint | string | URL endpoint cần thêm. Giá trị ban đầu là null |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Endpoint của API riêng |


---




## PluginBatchBase
Lớp trừu tượng của plugin (batch). Khi phát triển plugin batch, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_batch).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Thuộc tính

##### PluginOptionBatch (kế thừa PluginOptionBase)
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| command_options | array | Các tham số dòng lệnh được truyền cho batch |

### Danh sách hàm

#### execute
Chạy batch. Hãy viết xử lý muốn chạy trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---




## PluginButtonBase
Lớp trừu tượng của plugin (nút). Khi phát triển plugin nút, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_button).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| custom_value | CustomValue | Khi nút được bấm ở màn hình chi tiết: instance Eloquent của dữ liệu tùy chỉnh ở trang đó |
| selected_custom_values | array | Khi nút được bấm ở màn hình danh sách: mảng các instance Eloquent của dữ liệu tùy chỉnh đã chọn |


### Danh sách hàm

#### execute
Chạy xử lý khi nút được bấm. Hãy viết xử lý muốn chạy trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---

#### render
Tự vẽ nút.  
Khi muốn nút có hình thức đặc biệt hoặc muốn nhúng script riêng, hãy viết trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string,Renderable | Nút đã tự vẽ |


---



## PluginDashboardBase
Lớp trừu tượng của plugin (bảng điều khiển). Khi phát triển plugin bảng điều khiển, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_dashboard).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | Instance của box bảng điều khiển đã đặt |


### Danh sách hàm

#### header
Trả về HTML của phần đầu của box bảng điều khiển.  
Nếu muốn xuất HTML ở phần đầu, hãy thêm xử lý trả về HTML vào hàm này trong tệp plugin đã kế thừa.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | HTML của phần đầu |

---


#### body
Trả về HTML của phần thân của box bảng điều khiển.  
Nếu muốn xuất HTML ở phần thân, hãy thêm xử lý trả về HTML vào hàm này trong tệp plugin đã kế thừa.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | HTML của phần thân |

---


#### footer
Trả về HTML của phần chân của box bảng điều khiển.  
Nếu muốn xuất HTML ở phần chân, hãy thêm xử lý trả về HTML vào hàm này trong tệp plugin đã kế thừa.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | HTML của phần chân |

---

#### getDashboardUri
Lấy endpoint của từng box bảng điều khiển.  
Khi GET, POST, PUT, v.v. giá trị trong box bảng điều khiển, hãy dùng hàm này để lấy phần URI.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $endpoint | string | URL endpoint cần thêm. Giá trị ban đầu là null |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Endpoint tới box bảng điều khiển |


---



## PluginDocumentBase
Lớp trừu tượng của plugin (tài liệu). Khi phát triển plugin tài liệu, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_document).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| custom_value | CustomValue | Instance của dữ liệu tùy chỉnh |
| document_value | CustomValue | Instance của dữ liệu tài liệu đã xuất (chỉ tham chiếu được trong hàm executed) |


### Danh sách hàm

#### (protected)executing
Hàm được gọi trước khi xuất tài liệu.  
Khi cần xử lý riêng, ví dụ muốn lưu giá trị vào dữ liệu tùy chỉnh trước khi chạy, hãy dùng hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---

#### (protected)executed
Hàm được gọi sau khi xuất tài liệu.  
Khi cần xử lý riêng, hãy dùng hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---




## PluginEventBase
Lớp trừu tượng của plugin (sự kiện). Khi phát triển plugin sự kiện, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_event).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| custom_value | CustomValue | Instance Eloquent của dữ liệu tùy chỉnh (là null với sự kiện không liên quan đến dữ liệu tùy chỉnh) |
| isCreate | bool | Có phải dữ liệu tạo mới hay không |
| isDelete | bool | Có phải dữ liệu đã xóa hay không |

##### PluginOptionEvent (kế thừa PluginOptionBase)
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| is_modal | bool | Trang xảy ra sự kiện có phải là biểu mẫu modal hay không |
| event_type | PluginEventType | Loại sự kiện<br>(loading: khi tải, saving: trước khi lưu, saved: sau khi lưu, workflow_action_executing: ngay trước khi chạy quy trình làm việc, workflow_action_executed: ngay sau khi chạy quy trình làm việc, notify_executing: ngay trước khi chạy thông báo, notify_executed: sau khi chạy thông báo) |
| page_type | PluginPageType | Loại trang xảy ra sự kiện<br>(list: màn hình danh sách, create: màn hình tạo mới, edit: màn hình chỉnh sửa, show: màn hình chi tiết) |


### Danh sách hàm

#### execute
Hãy viết xử lý muốn chạy khi sự kiện xảy ra trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---



## PluginExportBase
Lớp trừu tượng của plugin (xuất). Khi phát triển plugin xuất, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_export).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |


### Danh sách hàm

#### defaultProvider
Hàm đặt provider xuất mặc định.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| default_provider | ProviderBase | Instance của provider xuất |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| PluginExportBase | Instance của lớp này |

---

#### viewProvider
Hàm đặt provider chế độ xem.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| view_provider | ProviderBase | Instance của provider chế độ xem dùng để xuất |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| PluginExportBase | Instance của lớp này |

---


#### execute
Hàm được gọi để xử lý xuất.  
Hãy viết xử lý xuất trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---


#### getFileName
Hàm đặt tên của tệp được tải về làm kết quả của xử lý xuất.  

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Tên tệp tải về của kết quả xuất |


---






## PluginImportBase
Lớp trừu tượng của plugin (nhập). Khi phát triển plugin nhập, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_import).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| file | File | Tệp đã nhập từ màn hình |


### Danh sách hàm

#### execute
Hàm được gọi để xử lý nhập.  
Hãy thêm xử lý nhập vào hàm này.

##### Tham số
Không có

##### Giá trị trả về
Không có

---




## PluginPageBase
Lớp trừu tượng của plugin (trang). Khi phát triển plugin trang, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_page).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| showHeader | bool | Có hiển thị biểu tượng và tiêu đề ở phần đầu phía trên trang hay không. true: hiển thị / false: không hiển thị. Giá trị ban đầu là true |

### Danh sách hàm

#### getRouteUri
Lấy endpoint của trang riêng.  
Khi GET, POST, PUT, v.v. trong trang riêng, hãy dùng hàm này để lấy phần URI.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $endpoint | string | URL endpoint cần thêm. Giá trị ban đầu là null |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string | Endpoint của trang riêng |

---



## PluginPublicBase
Lớp trừu tượng của plugin (script, style). Khi phát triển plugin script hoặc plugin style, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [Plugin (script)](/vi/plugin_quickstart_script) hoặc [Plugin (style)](/vi/plugin_quickstart_style).

- namespace Exceedone\Exment\Services\Plugin

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| plugin | Plugin | Instance Eloquent của plugin |

### Danh sách hàm

#### css
Hàm lấy đường dẫn của các tệp CSS.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| skipPath | bool | Đặt true nếu tệp css nằm ngay dưới thư mục public. (Giá trị ban đầu là false) |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| array | Mảng đường dẫn của các tệp CSS |

---

#### js
Hàm lấy đường dẫn của các tệp js.  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| skipPath | bool | Đặt true nếu tệp js nằm ngay dưới thư mục public. (Giá trị ban đầu là false) |


##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| array | Mảng đường dẫn của các tệp js |


---



## PluginValidatorBase
Lớp trừu tượng của plugin (kiểm tra hợp lệ). Khi phát triển plugin kiểm tra hợp lệ, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_validate).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| original_value | CustomValue | Instance của dữ liệu tùy chỉnh trước khi thay đổi |
| input_value | array | Mảng kết hợp chứa các giá trị nhập trên màn hình (khóa: tên cột, giá trị: giá trị nhập) |
| called_type | ValidateCalledType | Loại nơi gọi<br>(form: biểu mẫu, import: nhập, api: API) |
| messages | array | Chứa các thông báo lỗi<br>(khóa: tên cột, giá trị: thông báo lỗi ※ là mảng nếu có nhiều thông báo) |


### Danh sách hàm

#### validate
Chạy kiểm tra hợp lệ. Hãy viết xử lý muốn chạy trong hàm này.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| boolean | Kết quả kiểm tra hợp lệ (true: bình thường, false: có lỗi) |

#### validateDestroy
Chạy kiểm tra hợp lệ trước khi xóa dữ liệu tùy chỉnh. Hãy viết xử lý muốn chạy trong hàm này.

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instance của dữ liệu tùy chỉnh  |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| array | Kết quả kiểm tra hợp lệ và thông báo (true: bình thường, false: có lỗi) |

~~~ php
        [
            'status'  => false,
            'message' =>  'Không thể xóa dữ liệu có độ quan trọng cao.',
        ]
~~~


---





## PluginViewBase
Lớp trừu tượng của plugin (chế độ xem). Khi phát triển plugin chế độ xem, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_view).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance của bảng tùy chỉnh |
| custom_view | CustomView | Instance của chế độ xem tùy chỉnh |
| useBox | bool | Có hiển thị các nút ở danh sách hay không |
| useBoxButtons | array | Hiển thị nút nào<br>(newButton: tạo mới, menuButton: menu, viewButton: chế độ xem) |


### Danh sách hàm

#### grid
Hàm được gọi để xử lý hiển thị danh sách.  

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| string,Renderable | Nội dung hiển thị trong grid |

---

#### setViewOptionForm
Định nghĩa cài đặt riêng của chế độ xem. Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart).  

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Instance biểu mẫu của thư viện màn hình quản trị (exment-admin-core; với v6.x trở xuống là laravel-admin) |

##### Giá trị trả về
Không có

---






## PluginCrudBase
Lớp trừu tượng của plugin (trang CRUD). Khi phát triển plugin trang CRUD, hãy kế thừa lớp này.  
Chi tiết vui lòng xem [tại đây](/vi/plugin_quickstart_crud).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Thuộc tính
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| title | string | Tiêu đề hiển thị ở các trang của plugin |
| description  | string | Mô tả hiển thị ở các trang của plugin |
| icon | string | Biểu tượng hiển thị ở các trang của plugin |


### Danh sách hàm (người phát triển cần tự viết)

#### getFieldDefinitions
Hàm trả về định nghĩa cột dưới dạng mảng kết hợp. Hãy viết định nghĩa của các mục hiển thị ở từng trang.

##### Tham số
Không có

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| array | Trả về định nghĩa của các mục ở từng trang dưới dạng mảng kết hợp |

##### Giá trị trả về - định nghĩa của mảng kết hợp
| Kiểu | Mô tả |
| ---- | ---- |
| key | Tên mục, dùng khi lấy dữ liệu và làm name của các phần tử HTML. Hãy nhập bằng chữ và số |
| label | Chữ dùng làm tên mục ở màn hình danh sách, v.v. |
| grid | Đặt cho mục hiển thị ở màn hình danh sách. Hãy ghi số nguyên theo thứ tự hiển thị |
| show | Đặt cho mục hiển thị ở màn hình chi tiết. Hãy ghi số nguyên theo thứ tự hiển thị |
| create | Đặt cho mục hiển thị ở màn hình tạo mới. Hãy ghi số nguyên theo thứ tự hiển thị |
| edit | Đặt cho mục hiển thị ở màn hình chỉnh sửa. Hãy ghi số nguyên theo thứ tự hiển thị |


##### Ví dụ cài đặt

``` php
/**
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Tên thành phố', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Mã quốc gia', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Dân số', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }
```

#### getPaginate
Hàm lấy danh sách dữ liệu theo dạng phân trang.  
Hãy trả về dữ liệu đã lấy theo dạng LengthAwarePaginator.  
Mỗi phần tử của danh sách phải là mảng kết hợp, và các khóa của mảng kết hợp này phải giống với các khóa đã đặt trong getFieldDefinitions.  
※ Khi tìm kiếm trên màn hình, giá trị sẽ được đặt vào tham số $options

##### Tham số
| Tên | Kiểu | Mô tả |
| ---- | ---- | ---- |
| $options | array | Các giá trị tùy chọn khi được gọi từ màn hình danh sách |

##### Giá trị trả về
| Kiểu | Mô tả |
| ---- | ---- |
| LengthAwarePaginator | Danh sách dữ liệu đã lấy |

##### Ví dụ cài đặt
Vui lòng xem [Tài liệu tham khảo plugin (trang CRUD)](/vi/plugin_reference_crud).
