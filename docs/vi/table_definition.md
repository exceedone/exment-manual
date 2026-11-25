# Định nghĩa bảng cơ sở dữ liệu
Đây là định nghĩa các bảng cơ sở dữ liệu mà Exment sử dụng. Trang này dành cho người phát triển và người xem trực tiếp cơ sở dữ liệu.  
Với từng bảng, trang này ghi định nghĩa các cột (định nghĩa bảng) và thông tin INDEX. "Các cài đặt tùy chọn" là danh sách các khóa được lưu trong cột options, v.v.

※ Trang này đang được cập nhật dần.

## admin_menu
Bảng quản lý menu hiển thị ở thanh bên.  
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| parent_id| 0| NO| int(11)| | | ID của cấp cha|
| order| 0| NO| int(11)| | | Thứ tự sắp xếp|
| title| | NO| varchar(50)| | | Tên hiển thị menu|
| icon| | NO| varchar(50)| | | Biểu tượng|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | Các tùy chọn|
| permission| NULL| YES| varchar(255)| | | (chưa dùng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| menu_type| | NO| varchar(255)| | | Loại menu|
| menu_name| NULL| YES| varchar(255)| | | Tên menu|
| menu_target| NULL| YES| varchar(255)| | | Đối tượng|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
Bảng lưu nhật ký thao tác.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| user_id| | NO| int(11)| MUL| | ID người dùng|
| path| | NO| varchar(255)| | | Đường dẫn đã truy cập|
| method| | NO| varchar(10)| | | Phương thức thực hiện|
| ip| | NO| varchar(255)| | | Địa chỉ IP|
| input| | NO| text| | | Thông tin nhập / truy vấn|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
Bảng polymorphic lưu các loại điều kiện. Bảng này lưu điều kiện của cài đặt độ ưu tiên biểu mẫu, cài đặt cập nhật dữ liệu, hành động của quy trình làm việc, v.v.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| morph_type| | NO| varchar(255)| MUL| | Khóa polymorphic (loại)|
| morph_id| | NO| int(10) unsigned| | | Khóa polymorphic (ID)|
| condition_type| | NO| int(11)| | | Loại mục điều kiện (*)|
| condition_key| | NO| int(11)| | | Khóa loại điều kiện tìm kiếm|
| target_column_id| NULL| YES| int(11)| | | ID của mục điều kiện|
| condition_value| NULL| YES| varchar(1024)| | | Giá trị điều kiện|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 0: Cột tùy chỉnh, 1: Cột hệ thống, 2: ID cha, 3: Quy trình làm việc, 4: Điều kiện khác

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
Bảng quản lý cột tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng tùy chỉnh|
| column_name| | NO| varchar(255)| MUL| | Tên cột (chữ và số)|
| column_view_name| | NO| varchar(255)| | | Tên hiển thị cột|
| column_type| | NO| varchar(255)| MUL| | Loại cột|
| description| NULL| YES| varchar(1000)| | | Mô tả|
| system_flg| 0| NO| tinyint(1)| | | Cờ quản lý hệ thống|
| order| 0| NO| int(11)| | | Thứ tự sắp xếp|
| options| NULL| YES| longtext| | | Các tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Loại cột áp dụng |Ghi chú | 
|---|---|---|
| required| Chung| 1: Bắt buộc| 
| index_enabled| Chung| 1: Chỉ mục tìm kiếm| 
| freeword_search| Chỉ cột có chỉ mục tìm kiếm| 1: Đối tượng tìm kiếm tự do| 
| unique| Chung| 1: Duy nhất| 
| init_only| Chung| 1: Chỉ nhập một lần| 
| placeholder| Chung| Văn bản gợi ý| 
| help| Chung| Trợ giúp| 
| min_width| Chung| Độ rộng cột (tối thiểu)| 
| max_width| Chung| Độ rộng cột (tối đa)| 
| default| Chung (trừ tệp và hình ảnh)| Giá trị ban đầu| 
| string_length| Các mục văn bản| Số ký tự tối đa| 
| available_characters| Văn bản một dòng| Ký tự được phép| 
| suggest_input| Văn bản một dòng| 1: Gợi ý nhập liệu| 
| regex_validate| Văn bản một dòng| Biểu thức chính quy (chỉ hiển thị ở chế độ chuyên gia)| 
| rows| Văn bản nhiều dòng| Chiều cao (số dòng)| 
| number_min| Các mục số| Giá trị tối thiểu| 
| number_max| Các mục số| Giá trị tối đa| 
| number_format| Các mục số| Hiển thị số có dấu phân cách hàng nghìn| 
| calc_formula| Các mục số| Công thức tính| 
| updown_button| Số nguyên| 1: Hiển thị nút +-| 
| decimal_digit| Số thập phân, Tiền tệ| Số chữ số thập phân| 
| percent_format| Số thập phân| Hiển thị dạng phần trăm| 
| currency_symbol| Tiền tệ| Định dạng tiền tệ| 
| default_type| Các mục liên quan đến ngày, Người dùng| Loại giá trị ban đầu| 
| datetime_now_saving| Các mục liên quan đến ngày| 1: Ghi ngày giờ thực hiện khi lưu| 
| datetime_now_creating| Các mục liên quan đến ngày| 1: Ghi ngày giờ thực hiện khi tạo| 
| auto_number_type| Đánh số tự động| Loại đánh số tự động| 
| auto_number_format| Đánh số tự động| Định dạng đánh số tự động| 
| select_item| Lựa chọn| Lựa chọn| 
| select_item_valtext| Lựa chọn (giá trị và nhãn)| Lựa chọn| 
| check_radio_enabled| Lựa chọn, Lựa chọn (giá trị và nhãn)| 1: Hiển thị dạng nút radio / hộp kiểm| 
| free_input| Lựa chọn| 1: Cho phép nhập tự do| 
| select_target_table| Lựa chọn (từ bảng khác)| Bảng đối tượng| 
| select_target_view| Lựa chọn (từ bảng khác), Người dùng, Tổ chức| Chế độ xem điều kiện lọc| 
| select_import_column_id| Lựa chọn (từ bảng khác), Người dùng, Tổ chức| Cột khóa khi nhập| 
| select_export_column_id| Lựa chọn (từ bảng khác), Người dùng, Tổ chức| Cột khóa khi xuất| 
| select_load_ajax| Lựa chọn (từ bảng khác), Người dùng, Tổ chức| 1: Tìm kiếm lựa chọn mỗi lần nhập| 
| checkbox_enabled| YES/NO| 1: Hiển thị dạng hộp kiểm| 
| required_yes| YES/NO| 1: Bắt buộc YES| 
| true_value| Lựa chọn 2 giá trị| Giá trị của lựa chọn 1| 
| true_label| Lựa chọn 2 giá trị| Nhãn của lựa chọn 1| 
| false_value| Lựa chọn 2 giá trị| Giá trị của lựa chọn 2| 
| false_label| Lựa chọn 2 giá trị| Nhãn của lựa chọn 2| 
| multiple_enabled| Các mục tệp, các mục lựa chọn, Người dùng, Tổ chức| 1: Cho phép chọn nhiều| 
| accept_extensions| Các mục tệp| Phần mở rộng được phép tải lên| 
| showing_all_user_organizations| Người dùng, Tổ chức| Hiển thị cả người dùng / tổ chức không có quyền| 


## custom_column_multisettings
Bảng quản lý nhiều cài đặt liên quan đến bảng tùy chỉnh (cài đặt cột hiển thị tiêu đề, cài đặt khóa duy nhất kết hợp, so sánh 2 cột, cài đặt tự động chia sẻ dữ liệu, v.v.).
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_table_id| | NO| int(10) unsigned| | | ID của bảng tùy chỉnh|
| multisetting_type| 1| NO| int(11)| | | Loại cài đặt (*)|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| priority| 0| NO| int(10) unsigned| | | Thứ tự sắp xếp / độ ưu tiên|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 1: Cài đặt khóa duy nhất kết hợp, 2: Cài đặt cột hiển thị tiêu đề, 3: So sánh 2 cột, 4: Cài đặt tự động chia sẻ dữ liệu

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Cài đặt áp dụng |Ghi chú | 
|---|---|---|
| unique1_id| Cài đặt khóa duy nhất kết hợp| Khóa duy nhất kết hợp 1| 
| unique2_id| Cài đặt khóa duy nhất kết hợp| Khóa duy nhất kết hợp 2| 
| unique3_id| Cài đặt khóa duy nhất kết hợp| Khóa duy nhất kết hợp 3| 
| table_label_id| Cài đặt cột hiển thị tiêu đề| ID của cột đối tượng| 
| compare_column1_id| So sánh 2 cột| Cột kiểm tra (A)| 
| compare_column2_id| So sánh 2 cột| Cột so sánh (B)| 
| compare_type| So sánh 2 cột| Điều kiện| 
| share_trigger_type| Cài đặt tự động chia sẻ dữ liệu| Thời điểm kích hoạt (1: khi tạo mới, 2: khi cập nhật)| 
| share_column_id| Cài đặt tự động chia sẻ dữ liệu| ID của cột đối tượng| 
| share_permission| Cài đặt tự động chia sẻ dữ liệu| Quyền áp dụng (1: chỉnh sửa, 2: xem)| 

## custom_copies
Bảng quản lý cài đặt sao chép dữ liệu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng nguồn sao chép|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng đích sao chép|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| label| Nhãn nút| 
| icon| Biểu tượng của nút| 
| button_class| Class HTML của nút| 
| child_copy| Cài đặt bảng con| 

## custom_copy_columns
Bảng con của cài đặt sao chép dữ liệu. Quản lý các cột tùy chỉnh áp dụng.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| custom_copy_id| | NO| int(10) unsigned| MUL| | ID của cài đặt sao chép dữ liệu|
| from_column_type| NULL| YES| int(11)| | | Loại cột tùy chỉnh nguồn sao chép|
| from_column_table_id| NULL| YES| int(10) unsigned| | | ID bảng của cột tùy chỉnh nguồn sao chép|
| from_column_target_id| NULL| YES| int(11)| | | ID của cột tùy chỉnh nguồn sao chép|
| to_column_type| 0| NO| int(11)| | | Loại cột tùy chỉnh đích sao chép|
| to_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột tùy chỉnh đích sao chép|
| to_column_target_id| | NO| int(11)| | | ID của cột tùy chỉnh đích sao chép|
| copy_column_type| 0| NO| int(11)| | | 0: Cài đặt cột sao chép, 1: Cài đặt hộp thoại nhập|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
Bảng quản lý biểu mẫu tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng tùy chỉnh|
| form_view_name| | NO| varchar(256)| | | Tên hiển thị biểu mẫu|
| default_flg| 0| NO| tinyint(1)| | | 1: Biểu mẫu mặc định|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| form_label_type| Cách hiển thị nhãn| 
| show_grid_type| Cách hiển thị màn hình chi tiết| 

## custom_form_blocks
Bảng con của biểu mẫu tùy chỉnh. Quản lý các khối biểu mẫu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID của biểu mẫu tùy chỉnh|
| form_block_view_name| NULL| YES| varchar(255)| | | Tên khối biểu mẫu|
| form_block_type| | NO| int(11)| | | Loại khối biểu mẫu (*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | ID của bảng tùy chỉnh đối tượng|
| available| 0| NO| tinyint(1)| | | 1: Sử dụng|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 0: Mặc định, 1: Bảng con (một-nhiều), 2: Bảng con (nhiều-nhiều)

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
Bảng con của khối biểu mẫu. Quản lý các mục biểu mẫu trong khối.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| NULL| YES| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | ID của khối biểu mẫu|
| form_column_type| | NO| int(11)| | | Loại mục biểu mẫu (*)|
| form_column_target_id| NULL| YES| int(11)| | | ID của mục biểu mẫu|
| row_no| 1| NO| int(11)| | | Vị trí đặt (số hàng)|
| column_no| 1| NO| int(11)| | | Vị trí đặt (số cột)|
| width| NULL| YES| int(11)| | | Độ rộng cột|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| order| 0| NO| int(11)| | | Thứ tự hiển thị|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 0: Cột tùy chỉnh, 1: Cột hệ thống, 99: Mục khác

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Mục áp dụng | Ghi chú | 
|---|---|---|
| form_column_view_name| Cột tùy chỉnh| Tên hiển thị của trường| 
| field_label_type| Cột tùy chỉnh| Cách hiển thị nhãn| 
| field_showing_type| Cột tùy chỉnh| Loại trường| 
| required| Cột tùy chỉnh| 1: Mục bắt buộc| 
| default_type| Cột tùy chỉnh| Loại giá trị ban đầu| 
| default| Cột tùy chỉnh| Giá trị ban đầu| 
| help| Cột tùy chỉnh| Trợ giúp| 
| changedata_target_column_id| Cột tùy chỉnh| Cài đặt liên kết dữ liệu (ID của cột đối tượng)| 
| changedata_column_id| Cột tùy chỉnh| Cài đặt liên kết dữ liệu (ID của cột liên kết)| 
| relation_filter_target_column_id| Cột tùy chỉnh| Lọc theo quan hệ (ID của cột đối tượng)| 
| html| HTML, HTML mở rộng| HTML| 
| text| Tiêu đề, Mô tả| Văn bản| 
| append_hr| Tiêu đề| 1: Kẻ đường phân cách| 
| image_aslink| Hình ảnh| 1: Hiển thị hình ảnh dạng liên kết| 

## custom_form_priorities
Bảng quản lý độ ưu tiên hiển thị của biểu mẫu tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| custom_form_id| | NO| int(10) unsigned| | | ID của biểu mẫu tùy chỉnh|
| order| 0| NO| int(10) unsigned| | | Thứ tự xét độ ưu tiên|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| condition_join| Cách kết hợp điều kiện (and, or)| 

## custom_operations
Bảng quản lý cài đặt cập nhật dữ liệu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_table_id| | NO| int(10) unsigned| | | ID của bảng tùy chỉnh|
| operation_type| NULL| YES| varchar(255)| | | Thời điểm cập nhật|
| operation_name| | NO| varchar(40)| | | Tên thao tác|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| button_label| Nhãn nút| 
| button_icon| Biểu tượng của nút| 
| button_class| Class HTML của nút| 
| condition_join| Cách kết hợp điều kiện (and, or)| 

## custom_operation_columns
Bảng con của cài đặt cập nhật dữ liệu. Quản lý cột đối tượng và nội dung cập nhật.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| custom_operation_id| | NO| int(10) unsigned| MUL| | ID của cài đặt cập nhật dữ liệu|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_target_id| | NO| int(11)| | | ID của cột đối tượng|
| update_value_text| | NO| varchar(1024)| | | Giá trị cập nhật|
| operation_column_type| 0| NO| int(11)| | | 0: Cài đặt cột cập nhật, 1: Cài đặt hộp thoại nhập|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| operation_update_type| Loại cập nhật (default: giá trị cố định, system: giá trị hệ thống)| 

## custom_relations
Bảng quản lý cài đặt quan hệ giữa các bảng tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng cha|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng con|
| relation_type| 0| NO| int(11)| | | 1: Một-nhiều<br>2: Nhiều-nhiều|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| parent_import_column_id| ID của cột khóa khi nhập| 
| parent_export_column_id| ID của cột khóa khi xuất| 

## custom_relation_values
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
Bảng quản lý bảng tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| table_name| | NO| varchar(256)| | | Tên bảng (chữ và số)|
| table_view_name| | NO| varchar(256)| | | Tên hiển thị bảng|
| description| NULL| YES| varchar(1000)| | | Mô tả|
| system_flg| 0| NO| tinyint(1)| | | 1: Bảng hệ thống|
| showlist_flg| 1| NO| tinyint(1)| | | 1: Hiển thị trong danh sách|
| order| 0| NO| int(11)| | | Thứ tự hiển thị|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| color| Màu| 
| icon| Biểu tượng| 
| search_enabled| 1: Cho phép tìm kiếm| 
| use_label_id_flg| Dùng ID làm nhãn| 
| one_record_flg| 1: Chỉ cho phép lưu một bản ghi| 
| attachment_flg| 1: Sử dụng tệp đính kèm| 
| comment_flg| 1: Sử dụng bình luận| 
| revision_flg| 1: Sử dụng lịch sử thay đổi dữ liệu| 
| revision_count| Số phiên bản lịch sử thay đổi| 
| all_user_editable_flg| 1: Tất cả người dùng có thể chỉnh sửa| 
| all_user_viewable_flg| 1: Tất cả người dùng có thể xem| 
| all_user_accessable_flg| 1: Tất cả người dùng có thể tham chiếu| 

## custom_value_authoritables
Bảng quản lý cài đặt quyền của từng dữ liệu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| parent_type| NULL| YES| varchar(255)| MUL| | Tên chữ và số của bảng đối tượng|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID của dữ liệu đối tượng|
| authoritable_type| | NO| varchar(255)| MUL| | Loại quyền|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | Đối tượng được cấp quyền (người dùng hoặc tổ chức)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | ID của đối tượng được cấp quyền|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
Bảng quản lý chế độ xem tùy chỉnh.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID của bảng tùy chỉnh|
| view_type| 0| NO| int(11)| | | 0: Chế độ xem hệ thống<br>1: Chế độ xem người dùng|
| view_kind_type| 0| NO| int(11)| | | Loại chế độ xem (*)|
| view_view_name| | NO| varchar(40)| | | Tên hiển thị của chế độ xem|
| default_flg| 0| NO| tinyint(1)| | | 1: Chế độ xem mặc định|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| custom_options| NULL| YES| longtext| | | Cài đặt tùy chọn dùng trong plugin|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 0: Chế độ xem danh sách, 1: Chế độ xem tổng hợp, 2: Chế độ xem lịch, 3: Chế độ xem điều kiện, 4: Plugin, 9: Chế độ xem toàn bộ dữ liệu

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| use_view_infobox| 1: Sử dụng hộp thông tin của chế độ xem| 
| view_infobox_title| Hộp thông tin - Tiêu đề| 
| view_infobox| Hộp thông tin - Nội dung| 
| pager_count| Số dòng hiển thị| 
| condition_join| Cách kết hợp điều kiện (and, or)| 

## custom_view_columns
Bảng con của chế độ xem tùy chỉnh. Bảng quản lý các cột hiển thị.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID của chế độ xem tùy chỉnh|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột|
| view_column_target_id| NULL| YES| int(11)| | | ID của cột|
| order| 0| NO| int(10) unsigned| | | Thứ tự hiển thị|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|
| view_column_name| NULL| YES| varchar(40)| | | Tên hiển thị thay thế|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Loại chế độ xem | Ghi chú | 
|---|---|---|
| view_pivot_column_id| Chung| ID của cột khóa tham chiếu| 
| view_pivot_table_id| Chung| ID bảng của cột khóa tham chiếu| 
| view_group_condition| Chế độ xem tổng hợp| Loại cột| 
| sort_order| Chế độ xem tổng hợp| Sắp xếp| 
| sort_type| Chế độ xem tổng hợp| Thứ tự sắp xếp (1: tăng dần, -1: giảm dần)| 
| color| Chế độ xem lịch| Màu hiển thị| 
| font_color| Chế độ xem lịch| Màu chữ| 
| end_date_target| Chế độ xem lịch| ID cột của ngày kết thúc| 
| end_date_type| Chế độ xem lịch| Loại cột của ngày kết thúc| 

## custom_view_filters
Bảng con của chế độ xem tùy chỉnh. Bảng quản lý điều kiện hiển thị dữ liệu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| NULL| YES| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID của chế độ xem tùy chỉnh|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột|
| view_column_target_id| NULL| YES| int(11)| | | ID của cột|
| view_filter_condition| | NO| int(11)| | | Loại điều kiện tìm kiếm|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | Giá trị điều kiện|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | ID bảng của giá trị điều kiện|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | ID cột của giá trị điều kiện|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| view_pivot_column_id| ID của cột khóa tham chiếu| 
| view_pivot_table_id| ID bảng của cột khóa tham chiếu| 

## custom_view_grid_filters
Bảng con của chế độ xem tùy chỉnh. Bảng quản lý việc chỉ định mục "Bộ lọc" của chế độ xem.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID của chế độ xem tùy chỉnh|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột|
| view_column_target_id| NULL| YES| int(11)| | | ID của cột|
| order| 0| NO| int(10) unsigned| | | Thứ tự hiển thị|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| view_pivot_column_id| ID của cột khóa tham chiếu| 
| view_pivot_table_id| ID bảng của cột khóa tham chiếu| 

## custom_view_sorts
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| NULL| YES| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID của chế độ xem tùy chỉnh|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột|
| view_column_target_id| NULL| YES| int(11)| | | ID của cột|
| sort| 1| NO| int(11)| | | 1: Tăng dần<br>-1: Giảm dần|
| priority| 0| NO| int(10) unsigned| | | Thứ tự ưu tiên|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| view_pivot_column_id| ID của cột khóa tham chiếu| 
| view_pivot_table_id| ID bảng của cột khóa tham chiếu| 

## custom_view_summaries
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID của chế độ xem tùy chỉnh|
| view_column_type| 0| NO| int(11)| | | 0: Cột tùy chỉnh<br>1: Cột hệ thống|
| view_column_table_id| | NO| int(10) unsigned| | | ID bảng của cột|
| view_column_target_id| NULL| YES| int(11)| | | ID của cột|
| view_summary_condition| 0| NO| int(10) unsigned| | | Loại tổng hợp (*)|
| view_column_name| NULL| YES| varchar(40)| | | Tên hiển thị thay thế|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*)1: Tổng, 3: Số lượng, 4: Giá trị tối thiểu, 5: Giá trị tối đa

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| view_pivot_column_id| ID của cột khóa tham chiếu| 
| view_pivot_table_id| ID bảng của cột khóa tham chiếu| 
| sort_order| Sắp xếp| 
| sort_type| Thứ tự sắp xếp (1: tăng dần, -1: giảm dần)| 

## dashboards
Bảng quản lý bảng điều khiển.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| dashboard_type| 0| NO| int(11)| | | 0: Bảng điều khiển hệ thống, 1: Bảng điều khiển người dùng|
| dashboard_name| | NO| varchar(256)| MUL| | Tên bảng điều khiển (chữ và số)|
| dashboard_view_name| | NO| varchar(40)| | | Tên hiển thị của bảng điều khiển|
| default_flg| 0| NO| tinyint(1)| | | 1: Bảng điều khiển mặc định|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| row1| Số cột của hàng 1 trong bảng điều khiển| 
| row2| Số cột của hàng 2 trong bảng điều khiển| 
| row3| Số cột của hàng 3 trong bảng điều khiển| 
| row4| Số cột của hàng 4 trong bảng điều khiển| 

## dashboard_boxes
Bảng con của bảng điều khiển. Quản lý các mục hiển thị trong bảng điều khiển.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| dashboard_id| | NO| int(10) unsigned| MUL| | ID của bảng điều khiển|
| row_no| | NO| int(11)| MUL| | Số hàng|
| column_no| | NO| int(11)| MUL| | Số cột|
| dashboard_box_view_name| | NO| varchar(40)| | | Tên hiển thị của mục|
| dashboard_box_type| | NO| varchar(255)| | | Loại mục|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Loại bảng điều khiển | Ghi chú | 
|---|---|---|
| target_table_id| Chung (trừ Hệ thống)| Bảng đối tượng| 
| target_view_id| Chung (trừ Hệ thống)| Chế độ xem đối tượng| 
| pager_count| Danh sách dữ liệu| Hiển thị (theo hệ thống hoặc số dòng hiển thị)| 
| target_system_id| Hệ thống| Mục hiển thị (*)| 
| content| Hệ thống| Nội dung trình soạn thảo| 
| html| Hệ thống| HTML| 
| chart_type| Biểu đồ| Loại biểu đồ| 
| chart_axisx| Biểu đồ| Mục trục X| 
| chart_axisy| Biểu đồ| Mục trục Y| 
| chart_axis_label| Biểu đồ| Hiển thị nhãn (1: trục X, 2: trục Y)| 
| chart_axis_name| Biểu đồ| Hiển thị tên mục (1: trục X, 2: trục Y)| 
| chart_options| Biểu đồ| Cài đặt tùy chọn (1: bắt đầu từ 0, 2: hiển thị chú giải)| 
| calendar_type| Lịch| Loại lịch (theo tháng, danh sách)| 

*) 1: Hướng dẫn, 2: Danh sách tin mới của Exment, 3: Trình soạn thảo, 4: HTML

## data_share_authoritables
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
Bảng quản lý các tệp đã tải lên.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | Chuỗi ngẫu nhiên duy nhất|
| file_type| NULL| YES| int(11)| MUL| | Loại tệp|
| local_dirname| | NO| varchar(255)| MUL| | Tên thư mục của tệp được lưu|
| local_filename| | NO| varchar(255)| MUL| | Tên của tệp được lưu|
| filename| | NO| varchar(255)| MUL| | Tên tệp gốc|
| parent_type| NULL| YES| varchar(255)| MUL| | Tên bảng của dữ liệu cha (chữ và số)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID dữ liệu cha|
| custom_column_id| NULL| YES| int(11)| | | ID của cột tùy chỉnh|
| custom_form_column_id| NULL| YES| int(11)| MUL| | ID của cột biểu mẫu tùy chỉnh|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
Bảng quản lý các cài đặt đăng nhập mở rộng như xác thực SSO, xác thực 2 bước.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| login_view_name| | NO| varchar(255)| | | Tên hiển thị của cài đặt đăng nhập|
| login_type| | NO| varchar(255)| | | Loại đăng nhập|
| active_flg| 0| NO| tinyint(1)| | | 1: Bật|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Loại đăng nhập | Ghi chú | 
|---|---|---|
| oauth_provider_type| OAuth| Loại nhà cung cấp| 
| oauth_provider_name| OAuth| Tên nhà cung cấp (chữ và số)| 
| oauth_client_id| OAuth| Client ID| 
| oauth_client_secret| OAuth| Client Secret| 
| oauth_scope| OAuth| Phạm vi (scope)| 
| oauth_redirect_url| OAuth| URL chuyển hướng| 
| saml_name| SAML| Tên SAML (chữ và số)| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| URL đăng nhập của IdP| 
| saml_idp_ssout_url| SAML| URL đăng xuất của IdP| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1: Mã hóa NameID do SP gửi| 
| saml_option_authn_request_signed| SAML| 1: Ký yêu cầu xác thực do SP gửi| 
| saml_option_logout_request_signed| SAML| 1: Ký yêu cầu đăng xuất do SP gửi| 
| saml_option_logout_response_signed| SAML| 1: Ký phản hồi đăng xuất do SP gửi| 
| saml_option_proxy_vars| SAML| 1: Đang dùng reverse proxy, v.v.| 
| ldap_name| LDAP| Tên LDAP (chữ và số)| 
| ldap_hosts| LDAP| Tên máy chủ| 
| ldap_port| LDAP| Số cổng| 
| ldap_base_dn| LDAP| Base DN (tên phân biệt cơ sở)| 
| ldap_search_key| LDAP| Thuộc tính tìm kiếm người dùng| 
| ldap_account_prefix| LDAP| Tiền tố mã đăng nhập| 
| ldap_account_suffix| LDAP| Hậu tố mã đăng nhập| 
| ldap_use_ssl| LDAP| 1: Sử dụng SSL| 
| ldap_use_tls| LDAP| 1: Sử dụng TLS| 
| mapping_column_XX| Chung| Cài đặt ánh xạ (phần XX là tên trường của bảng người dùng)| 
| mapping_user_column| Chung| Cột tìm kiếm tài khoản| 
| sso_jit| Chung| 1: Tạo người dùng mới| 
| jit_rolegroups| Chung| Nhóm vai trò được gán khi tạo người dùng| 
| update_user_info| Chung| 1: Cập nhật thông tin người dùng| 
| login_button_label| Chung| Tên hiển thị của nút| 
| login_button_icon| SAML, OAuth| Biểu tượng nút| 
| login_button_background_color| Chung| Màu nền của nút| 
| login_button_background_color_hover| Chung| Màu nền của nút (khi di chuột)| 
| login_button_font_color| Chung| Màu chữ của nút| 
| login_button_font_color_hover| Chung| Màu chữ của nút (khi di chuột)| 

## login_users
Bảng quản lý thông tin đăng nhập của người dùng.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| base_user_id| | NO| int(10) unsigned| MUL| | ID người dùng|
| login_type| 'pure'| NO| varchar(255)| MUL| | Loại đăng nhập (thông thường, OAuth, SAML, v.v.)|
| login_provider| NULL| YES| varchar(32)| | | Loại nhà cung cấp đăng nhập|
| password_reset_flg| 0| NO| tinyint(1)| | | 1: Đặt lại mật khẩu|
| password| | NO| varchar(1000)| | | Mật khẩu|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | URI của ảnh đại diện|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
Bảng quản lý tình trạng migration của cơ sở dữ liệu.  
<span class="red bold">※ Tuyệt đối không xóa, không thay đổi nội dung, v.v.</span>
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| migration| | NO| varchar(255)| | | Tên tệp migration|
| batch| | NO| int(11)| | | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
Bảng quản lý cài đặt thông báo.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| target_id| NULL| YES| int(10) unsigned| MUL| | ID của đối tượng thông báo (bảng tùy chỉnh, quy trình làm việc)|
| notify_name| NULL| YES| varchar(256)| | | Tên thông báo (chữ và số)|
| notify_view_name| | NO| varchar(256)| | | Tên hiển thị thông báo|
| active_flg| 1| NO| tinyint(1)| | | 1: Bật|
| custom_table_id| | NO| int(10) unsigned| | | (dự định bỏ)|
| workflow_id| NULL| YES| int(10) unsigned| | | (dự định bỏ)|
| custom_view_id| NULL| YES| int(10) unsigned| | | ID của chế độ xem điều kiện|
| notify_trigger| | NO| int(11)| | | Thời điểm kích hoạt|
| trigger_settings| NULL| YES| longtext| | | Cài đặt thời điểm kích hoạt (bảng riêng)|
| notify_actions| NULL| YES| varchar(50)| | | (dự định bỏ)|
| action_settings| NULL| YES| longtext| | | Cài đặt hành động thông báo (bảng riêng)|
| mail_template_id| NULL| YES| int(11)| | | ID của mẫu thông báo|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### Cài đặt thời điểm kích hoạt
| Khóa | Ghi chú | 
|---|---|
| notify_target_column| ID của cột ngày đối tượng| 
| notify_target_table_id| ID bảng của cột ngày đối tượng| 
| view_pivot_column_id| ID của cột khóa tham chiếu| 
| view_pivot_table_id| ID bảng của cột khóa tham chiếu| 
| notify_day| Ngày thông báo (giá trị cộng trừ)| 
| notify_beforeafter| Thông báo trước hay sau (-1: trước, 1: sau)| 
| notify_hour| Giờ thông báo| 
| notify_saved_trigger| Cài đặt điều kiện thông báo| 
| notify_myself| 1: Thông báo cả cho người thực hiện| 
| notify_button_name| Tên hiển thị của nút| 

#### Cài đặt hành động thông báo
| Khóa | Ghi chú | 
|---|---|
| notify_action| Hành động thực hiện (*)| 
| notify_action_target| Đối tượng nhận thông báo| 
| webhook_url| Webhook URL| 
| mention_here| 1: Thông báo cho tất cả thành viên| 
| target_emails| Địa chỉ email nhận| 

*) 1: Email, 2: Cảnh báo trong hệ thống, 3: Thông báo Slack, 4: Thông báo Microsoft Teams

## notify_navbars
Bảng lưu dữ liệu thông báo hiển thị ở thanh điều hướng và danh sách thông báo.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| notify_id| | NO| int(10) unsigned| MUL| | ID của cài đặt thông báo|
| parent_type| NULL| YES| varchar(255)| MUL| | Tên bảng của dữ liệu đối tượng (chữ và số)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID của dữ liệu đối tượng|
| target_user_id| | NO| int(10) unsigned| MUL| | ID người dùng nhận thông báo|
| trigger_user_id| NULL| YES| int(10) unsigned| | | ID người dùng đã thực hiện thao tác kích hoạt thông báo|
| notify_subject| NULL| YES| varchar(200)| | | Tiêu đề thông báo|
| notify_body| NULL| YES| varchar(2000)| | | Nội dung thông báo|
| read_flg| 0| NO| tinyint(1)| MUL| | 1: Đã đọc|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| expires_at| NULL| YES| datetime| | | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| name| | NO| varchar(255)| | | |
| secret| | NO| varchar(100)| | | |
| redirect| | NO| text| | | |
| personal_access_client| | NO| tinyint(1)| | | |
| password_client| | NO| tinyint(1)| | | |
| api_key_client| 0| NO| tinyint(1)| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
Bảng lưu lịch sử thay đổi mật khẩu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| login_user_id| | NO| int(10) unsigned| MUL| | ID người dùng đối tượng|
| password| | NO| varchar(1000)| | | Mật khẩu|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
Quản lý dữ liệu tạm thời khi thực hiện đặt lại mật khẩu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | Địa chỉ email|
| token| | NO| varchar(255)| | | Access token tạm thời|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
Bảng quản lý plugin.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| uuid| | NO| varchar(255)| UNI| | Chuỗi ngẫu nhiên duy nhất|
| plugin_name| | NO| varchar(256)| MUL| | Tên plugin (chữ và số)|
| plugin_view_name| | NO| varchar(256)| | | Tên hiển thị của plugin|
| author| NULL| YES| varchar(256)| | | Tác giả|
| plugin_types| NULL| YES| varchar(255)| | | Loại plugin|
| version| NULL| YES| varchar(128)| | | Phiên bản|
| description| NULL| YES| varchar(1000)| | | Mô tả|
| active_flg| 1| NO| tinyint(1)| | | 1: Bật|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| custom_options| NULL| YES| longtext| | | Cài đặt tùy chọn riêng|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Loại plugin | Ghi chú | 
|---|---|---|
| target_tables| Nút, Sự kiện, Trigger, Tài liệu, Nhập, Xuất, Kiểm tra hợp lệ, Chế độ xem| Tên bảng đối tượng (chữ và số)| 
| event_triggers| Nút, Sự kiện, Trigger| Thời điểm kích hoạt| 
| icon| Trang, Chế độ xem, Nút, Trigger, Tài liệu, Xuất| Biểu tượng của nút| 
| label| Trang, Chế độ xem, Nút, Trigger, Tài liệu, Xuất| Nhãn nút| 
| button_class| Trang, Chế độ xem, Nút, Trigger, Tài liệu| Class HTML của nút| 
| uri| API, Trang| URI| 
| endpoint_page| Trang| Endpoint (trang)| 
| endpoint_api| API| Endpoint (API)| 
| batch_hour| Batch| Thời gian chạy batch (giờ)| 
| batch_cron| Batch| Cron chạy batch| 
| command_only| Batch| 1: Chỉ chạy bằng lệnh| 
| grid_menu_title| Chế độ xem| Tiêu đề trong menu| 
| grid_menu_description| Chế độ xem| Mô tả trong menu| 
| all_user_enabled| Trang, Trigger, Tài liệu, API, Bảng điều khiển, Nhập, Xuất, Nút| 1: Tất cả người dùng đều có thể sử dụng| 
| export_types| Xuất| Loại xuất| 
| export_description| Xuất| Mô tả| 

## public_forms
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| uuid| | NO| char(36)| UNI| | Chuỗi ngẫu nhiên duy nhất|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID của biểu mẫu tùy chỉnh|
| public_form_view_name| | NO| varchar(256)| | | Tên hiển thị biểu mẫu công khai|
| active_flg| 0| NO| tinyint(1)| | | 1: Bật|
| proxy_user_id| | NO| int(10) unsigned| MUL| | ID của người thực hiện|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### Các cài đặt tùy chọn
| Khóa | Tab | Ghi chú | 
|---|---|---|
| validity_period_start| Cài đặt cơ bản| Thời hạn công khai (from)| 
| validity_period_end| Cài đặt cơ bản| Thời hạn công khai (to)| 
| use_header| Cài đặt thiết kế| 1: Sử dụng đầu trang| 
| header_background_color| Cài đặt thiết kế| Đầu trang - Màu nền| 
| header_logo| Cài đặt thiết kế| Đầu trang - Logo| 
| header_label| Cài đặt thiết kế| Chuỗi ký tự đầu trang| 
| header_text_color| Cài đặt thiết kế| Màu chữ đầu trang| 
| background_color_outer| Cài đặt thiết kế| Màu nền - Khung ngoài| 
| background_color| Cài đặt thiết kế| Màu nền| 
| use_footer| Cài đặt thiết kế| 1: Sử dụng chân trang| 
| footer_label| Cài đặt thiết kế| Chuỗi ký tự chân trang| 
| footer_text_color| Cài đặt thiết kế| Màu chữ chân trang| 
| use_confirm| Cài đặt xác nhận / hoàn tất trả lời| 1: Sử dụng xác nhận trả lời| 
| confirm_title| Cài đặt xác nhận / hoàn tất trả lời| Tiêu đề xác nhận| 
| confirm_text| Cài đặt xác nhận / hoàn tất trả lời| Văn bản xác nhận| 
| complete_title| Cài đặt xác nhận / hoàn tất trả lời| Tiêu đề hoàn tất| 
| complete_text| Cài đặt xác nhận / hoàn tất trả lời| Văn bản hoàn tất| 
| complete_link_url| Cài đặt xác nhận / hoàn tất trả lời| URL liên kết khi hoàn tất| 
| complete_link_text| Cài đặt xác nhận / hoàn tất trả lời| Văn bản liên kết khi hoàn tất| 
| use_notify_complete_user| Cài đặt xác nhận / hoàn tất trả lời| 1: Gửi thông báo hoàn tất cho người dùng thông thường| 
| use_notify_complete_admin| Cài đặt xác nhận / hoàn tất trả lời| 1: Gửi thông báo hoàn tất cho quản trị viên| 
| error_title| Cài đặt lỗi| Tiêu đề lỗi| 
| error_text| Cài đặt lỗi| Văn bản lỗi| 
| error_link_url| Cài đặt lỗi| URL liên kết khi lỗi| 
| error_link_text| Cài đặt lỗi| Văn bản liên kết khi lỗi| 
| use_notify_error| Cài đặt lỗi| 1: Gửi thông báo lỗi| 
| custom_css| CSS / Javascript| CSS tùy chỉnh| 
| plugin_css| CSS / Javascript| Plugin (CSS)| 
| custom_js| CSS / Javascript| Javascript tùy chỉnh| 
| plugin_js| CSS / Javascript| Plugin (Javascript)| 
| use_default_query| Cài đặt tùy chọn| 1: Cho phép đặt giá trị mặc định từ URL| 
| analytics_tag| Cài đặt tùy chọn| Google Analytics| 
| use_recaptcha| Cài đặt tùy chọn| 1: Sử dụng Google reCAPTCHA| 

## revisions
Bảng lưu lịch sử cập nhật.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| revisionable_type| | NO| varchar(255)| | | Tên bảng đối tượng (chữ và số)|
| revisionable_id| | NO| int(11)| MUL| | ID của dữ liệu đối tượng|
| revision_no| 0| NO| int(10) unsigned| | | Số phiên bản sửa đổi|
| key| | NO| varchar(255)| MUL| | Khóa của mục đối tượng|
| old_value| NULL| YES| text| | | Giá trị trước khi thay đổi|
| new_value| NULL| YES| text| | | Giá trị sau khi thay đổi|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| deleted_at| NULL| YES| timestamp| | | Ngày giờ xóa|
| create_user_id| NULL| YES| int(11)| | | ID người tạo|
| delete_user_id| NULL| YES| int(11)| | | ID người xóa|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
Bảng quản lý nhóm vai trò.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| role_group_name| | NO| varchar(256)| UNI| | Tên nhóm vai trò (chữ và số)|
| role_group_view_name| | NO| varchar(256)| | | Tên hiển thị nhóm vai trò|
| description| NULL| YES| varchar(1000)| | | Mô tả|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
Bảng con của nhóm vai trò. Quản lý cài đặt quyền.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| role_group_id| | NO| int(10) unsigned| MUL| | ID nhóm vai trò|
| role_group_permission_type| | NO| varchar(255)| MUL| | Loại quyền (*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID của mục được áp dụng quyền|
| permissions| NULL| YES| longtext| | | Các thao tác được phép|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

*) 0: Hệ thống, 1: Bảng, 3: Plugin

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
Bảng con của nhóm vai trò. Quản lý người dùng và tổ chức thuộc nhóm vai trò.

### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| role_group_id| | NO| int(10) unsigned| MUL| | ID nhóm vai trò|
| role_group_user_org_type| | NO| varchar(255)| MUL| | Loại người dùng/tổ chức|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID của người dùng hoặc tổ chức đối tượng|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
Bảng quản lý cài đặt hệ thống.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | Tên cài đặt hệ thống (chữ và số)|
| system_value| NULL| YES| text| | | Giá trị cài đặt|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
Bảng quản lý cài đặt của từng người dùng đăng nhập.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| base_user_id| | NO| int(10) unsigned| MUL| | ID người dùng|
| settings| NULL| YES| longtext| | | Các giá trị cài đặt|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
Bảng quản lý cài đặt quy trình làm việc.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| workflow_type| 0| NO| int(11)| | | Loại quy trình làm việc (0: dùng chung, 1: chỉ dùng cho bảng)|
| workflow_view_name| | NO| varchar(30)| | | Tên hiển thị quy trình làm việc|
| start_status_name| | NO| varchar(30)| | | Tên trạng thái bắt đầu|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1: Đã hoàn tất cài đặt|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| workflow_edit_flg| 1: Cấp quyền chỉnh sửa cho người làm việc tiếp theo| 

## workflow_actions
Bảng con của cài đặt quy trình làm việc. Quản lý cài đặt hành động.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| workflow_id| | NO| int(10) unsigned| MUL| | ID của quy trình làm việc|
| status_from| | NO| varchar(255)| | | Trạng thái trước khi thực hiện (start hoặc ID)|
| action_name| | NO| varchar(30)| | | Tên hành động|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1: Hành động đặc biệt|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| deleted_at| NULL| YES| timestamp| | | Ngày giờ xóa|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| work_target_type| Cách chỉ định người làm việc (action_select: người thực hiện hành động trước chọn, fix: đặt trước, get_by_userinfo: lấy từ thông tin của người thực hiện)| 
| comment_type| Loại bình luận (required: bắt buộc, nullable: tùy chọn, not_use: không sử dụng)| 
| flow_next_type| Điều kiện để sang trạng thái tiếp theo (some: từ X người trở lên thực hiện, all: tất cả thực hiện)| 
| flow_next_count| Số người cần để sang trạng thái tiếp theo| 

## workflow_authorities
Bảng con của cài đặt hành động của quy trình làm việc. Quản lý những người dùng có thể thực hiện hành động.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID của đối tượng|
| related_type| | NO| varchar(255)| | | Loại đối tượng (người dùng, tổ chức, cột tùy chỉnh, hệ thống)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID của cài đặt hành động|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
Bảng con của cài đặt hành động của quy trình làm việc. Quản lý cài đặt phân nhánh hành động.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID của cài đặt hành động|
| status_to| | NO| varchar(255)| | | ID trạng thái sau khi thực hiện|
| enabled_flg| 0| NO| tinyint(1)| | | 1: Bật|
| options| NULL| YES| longtext| | | Các cài đặt tùy chọn (bảng riêng)|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### Các cài đặt tùy chọn
| Khóa | Ghi chú | 
|---|---|
| condition_join| Cách kết hợp điều kiện (and, or)| 

## workflow_statuses
Bảng con của cài đặt quy trình làm việc. Quản lý cài đặt trạng thái.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| workflow_id| | NO| int(10) unsigned| MUL| | ID của quy trình làm việc|
| status_type| 0| NO| int(10) unsigned| MUL| | (dự định bỏ)|
| order| | NO| int(10) unsigned| MUL| | Thứ tự sắp xếp|
| status_name| | NO| varchar(30)| | | Tên trạng thái|
| datalock_flg| 0| NO| tinyint(1)| | | 1: Không cho chỉnh sửa dữ liệu|
| completed_flg| 0| NO| tinyint(1)| | | 1: Trạng thái hoàn thành|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
Bảng con của cài đặt quy trình làm việc. Quản lý cài đặt sử dụng.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| workflow_id| | NO| int(10) unsigned| MUL| | ID của quy trình làm việc|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | ID của bảng tùy chỉnh áp dụng|
| active_flg| 0| NO| tinyint(1)| | | 1: Sử dụng|
| active_start_date| NULL| YES| date| | | Ngày bắt đầu sử dụng|
| active_end_date| NULL| YES| date| | | Ngày kết thúc sử dụng|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
Bảng quản lý lịch sử chạy quy trình làm việc đối với từng dữ liệu.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Khóa chính|
| suuid| | NO| varchar(20)| MUL| | Chuỗi ngẫu nhiên 20 ký tự|
| workflow_id| | NO| int(10) unsigned| MUL| | ID của quy trình làm việc|
| morph_type| | NO| varchar(255)| MUL| | Khóa polymorphic (loại)|
| morph_id| | NO| bigint(20) unsigned| | | Khóa polymorphic (ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | ID của cài đặt hành động|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | ID trạng thái trước khi thực hiện|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | ID trạng thái sau khi thực hiện|
| comment| NULL| YES| varchar(1000)| | | Ghi chú|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1: Đang chạy quy trình làm việc|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1: Dữ liệu mới nhất|
| created_at| NULL| YES| timestamp| | | Ngày giờ tạo|
| updated_at| NULL| YES| timestamp| | | Ngày giờ cập nhật|
| created_user_id| NULL| YES| int(10) unsigned| | | ID người tạo|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID người cập nhật|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_values_action_executed_flg_index| action_executed_flg| | |
| workflow_values_latest_flg_index| latest_flg| | |
| workflow_values_morph_type_morph_id_index| morph_type,morph_id| | |
| workflow_values_suuid_index| suuid| | |
| workflow_values_workflow_action_id_index| workflow_action_id| | |
| workflow_values_workflow_id_index| workflow_id| | |
| workflow_values_workflow_status_from_id_index| workflow_status_from_id| | |
| workflow_values_workflow_status_to_id_index| workflow_status_to_id| | |

## workflow_value_authorities
Lưu người làm việc tiếp theo được chỉ định khi chạy quy trình làm việc.
### Định nghĩa bảng
| Tên cột | Mặc định | NULL | Kiểu | Khóa | Khác | Ghi chú 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID của đối tượng|
| related_type| | NO| varchar(255)| | | Loại đối tượng (người dùng, tổ chức, cột tùy chỉnh, hệ thống)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | ID của lịch sử chạy quy trình làm việc|

### Thông tin INDEX
| Tên INDEX | Cột INDEX | UNIQUE |Ghi chú | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
