# 数据库表定义
这里是 Exment 使用的数据库表的定义。本页面面向开发人员，以及直接查看数据库的人员。
每张表都列出了列的定义（表定义）和 INDEX 信息。“各种选项设置”是保存在 options 列等中的键的列表。

※本页面会随时更新。

## admin_menu
管理侧边栏中显示的菜单的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| parent_id| 0| NO| int(11)| | | 上级层级的 ID|
| order| 0| NO| int(11)| | | 排列顺序|
| title| | NO| varchar(50)| | | 菜单显示名称|
| icon| | NO| varchar(50)| | | 图标|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | 各种选项|
| permission| NULL| YES| varchar(255)| | | （未使用）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| menu_type| | NO| varchar(255)| | | 菜单类型|
| menu_name| NULL| YES| varchar(255)| | | 菜单名称|
| menu_target| NULL| YES| varchar(255)| | | 对象|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
保存操作日志的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| user_id| | NO| int(11)| MUL| | 用户 ID|
| path| | NO| varchar(255)| | | 访问的路径|
| method| | NO| varchar(10)| | | 执行的方法|
| ip| | NO| varchar(255)| | | IP 地址|
| input| | NO| text| | | 输入信息和查询|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
保存各种条件的 Polymorphic 表。保存表单优先级设置、批量更新设置、工作流操作等的条件。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic 键（类型）|
| morph_id| | NO| int(10) unsigned| | | Polymorphic 键（ID）|
| condition_type| | NO| int(11)| | | 条件项目的类型（*）|
| condition_key| | NO| int(11)| | | 筛选条件的类型键|
| target_column_id| NULL| YES| int(11)| | | 条件项目的 ID|
| condition_value| NULL| YES| varchar(1024)| | | 条件值|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 0：自定义列、1：系统列、2：父 ID、3：工作流、4：其他条件

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
管理自定义列的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_table_id| | NO| int(10) unsigned| MUL| | 自定义表的 ID|
| column_name| | NO| varchar(255)| MUL| | 列名（英文和数字）|
| column_view_name| | NO| varchar(255)| | | 列显示名称|
| column_type| | NO| varchar(255)| MUL| | 列类型|
| description| NULL| YES| varchar(1000)| | | 说明|
| system_flg| 0| NO| tinyint(1)| | | 系统管理标志|
| order| 0| NO| int(11)| | | 排列顺序|
| options| NULL| YES| longtext| | | 各种选项（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 适用的列类型 |备注 | 
|---|---|---|
| required| 通用| 1：必填| 
| index_enabled| 通用| 1：搜索索引| 
| freeword_search| 仅搜索索引列| 1：关键字搜索对象| 
| unique| 通用| 1：唯一| 
| init_only| 通用| 1：仅可输入一次| 
| placeholder| 通用| 占位符| 
| help| 通用| 帮助| 
| min_width| 通用| 列宽（最小值）| 
| max_width| 通用| 列宽（最大值）| 
| default| 通用（文件和图片除外）| 初始值| 
| string_length| 文本类项目| 最大字符数| 
| available_characters| 单行文本| 可用字符| 
| suggest_input| 单行文本| 1：使用输入建议| 
| regex_validate| 单行文本| 正则表达式（仅在专家模式下显示）| 
| rows| 多行文本| 高度（行数）| 
| number_min| 数值类项目| 最小值| 
| number_max| 数值类项目| 最大值| 
| number_format| 数值类项目| 数值使用千位分隔符| 
| calc_formula| 数值类项目| 计算公式| 
| updown_button| 整数| 1：显示 +- 按钮| 
| decimal_digit| 小数、货币| 小数位数| 
| percent_format| 小数| 以百分比显示| 
| currency_symbol| 货币| 货币显示格式| 
| default_type| 日期类项目、用户| 初始值类型| 
| datetime_now_saving| 日期类项目| 1：保存时登记执行时间| 
| datetime_now_creating| 日期类项目| 1：创建时登记执行时间| 
| auto_number_type| 自动编号| 编号类型| 
| auto_number_format| 自动编号| 编号格式| 
| select_item| 选项| 选项| 
| select_item_valtext| 选项（值和标签）| 选项| 
| check_radio_enabled| 选项、选项（值和标签）| 1：以单选按钮/复选框形式显示| 
| free_input| 选项| 1：允许自由输入| 
| select_target_table| 选项（其他表）| 目标表| 
| select_target_view| 选项（其他表）、用户、组织| 筛选条件视图| 
| select_import_column_id| 选项（其他表）、用户、组织| 导入时的键列| 
| select_export_column_id| 选项（其他表）、用户、组织| 导出时的键列| 
| select_load_ajax| 选项（其他表）、用户、组织| 1：每次搜索选项| 
| checkbox_enabled| YES/NO| 1：以复选框形式显示| 
| required_yes| YES/NO| 1：必须为 YES| 
| true_value| 二选一| 选项 1 的值| 
| true_label| 二选一| 选项 1 的显示| 
| false_value| 二选一| 选项 2 的值| 
| false_label| 二选一| 选项 2 的显示| 
| multiple_enabled| 文件类项目、选项类项目、用户、组织| 1：允许多选| 
| accept_extensions| 文件类项目| 允许上传的扩展名| 
| showing_all_user_organizations| 用户、组织| 同时显示没有权限的用户和组织| 


## custom_column_multisettings
管理与自定义表相关的多种设置（标题显示列设置、复合唯一键设置、比较两列、数据自动共享设置等）。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_table_id| | NO| int(10) unsigned| | | 自定义表的 ID|
| multisetting_type| 1| NO| int(11)| | | 设置的类型（*）|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| priority| 0| NO| int(10) unsigned| | | 排列顺序和优先级|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 1：复合唯一键设置、2：标题显示列设置、3：比较两列、4：数据自动共享设置

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 适用的设置 |备注 | 
|---|---|---|
| unique1_id| 复合唯一键设置| 复合唯一键 1| 
| unique2_id| 复合唯一键设置| 复合唯一键 2| 
| unique3_id| 复合唯一键设置| 复合唯一键 3| 
| table_label_id| 标题显示列设置| 目标列的 ID| 
| compare_column1_id| 比较两列| 验证列（A）| 
| compare_column2_id| 比较两列| 比较列（B）| 
| compare_type| 比较两列| 条件| 
| share_trigger_type| 数据自动共享设置| 触发条件（1：新建时、2：更新时）| 
| share_column_id| 数据自动共享设置| 目标列的 ID| 
| share_permission| 数据自动共享设置| 对象的权限（1：编辑、2：查看）| 

## custom_copies
管理数据复制设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | 复制源表的 ID|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | 复制目标表的 ID|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| label| 按钮标签| 
| icon| 按钮图标| 
| button_class| 按钮的 HTML class| 
| child_copy| 子表设置| 

## custom_copy_columns
数据复制设置的子表。管理作为对象的自定义列。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| custom_copy_id| | NO| int(10) unsigned| MUL| | 数据复制设置的 ID|
| from_column_type| NULL| YES| int(11)| | | 复制源自定义列的类型|
| from_column_table_id| NULL| YES| int(10) unsigned| | | 复制源自定义列的表 ID|
| from_column_target_id| NULL| YES| int(11)| | | 复制源自定义列的 ID|
| to_column_type| 0| NO| int(11)| | | 复制目标自定义列的类型|
| to_column_table_id| | NO| int(10) unsigned| | | 复制目标自定义列的表 ID|
| to_column_target_id| | NO| int(11)| | | 复制目标自定义列的 ID|
| copy_column_type| 0| NO| int(11)| | | 0：复制列设置、1：输入对话框设置|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
管理自定义表单的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_table_id| | NO| int(10) unsigned| MUL| | 自定义表的 ID|
| form_view_name| | NO| varchar(256)| | | 表单显示名称|
| default_flg| 0| NO| tinyint(1)| | | 1：默认表单|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| form_label_type| 标题显示方式| 
| show_grid_type| 详情页面显示方式| 

## custom_form_blocks
自定义表单的子表。管理表单块。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| custom_form_id| | NO| int(10) unsigned| MUL| | 自定义表单的 ID|
| form_block_view_name| NULL| YES| varchar(255)| | | 表单块名称|
| form_block_type| | NO| int(11)| | | 表单块的类型（*）|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | 目标自定义表的 ID|
| available| 0| NO| tinyint(1)| | | 1：使用|
| options| NULL| YES| longtext| | | 各种选项设置|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 0：默认、1：子表（一对多）、2：子表（多对多）

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
表单块的子表。管理块内的表单项目。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| NULL| YES| varchar(20)| MUL| | 20 位随机字符串|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | 表单块的 ID|
| form_column_type| | NO| int(11)| | | 表单项目的类型（*）|
| form_column_target_id| NULL| YES| int(11)| | | 表单项目的 ID|
| row_no| 1| NO| int(11)| | | 放置位置（行号）|
| column_no| 1| NO| int(11)| | | 放置位置（列号）|
| width| NULL| YES| int(11)| | | 列宽|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| order| 0| NO| int(11)| | | 显示顺序|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 0：自定义列、1：系统列、99：其他项目

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 适用的项目 | 备注 | 
|---|---|---|
| form_column_view_name| 自定义列| 字段显示名称| 
| field_label_type| 自定义列| 标题显示方式| 
| field_showing_type| 自定义列| 字段类型| 
| required| 自定义列| 1：必填| 
| default_type| 自定义列| 初始值类型| 
| default| 自定义列| 初始值| 
| help| 自定义列| 帮助| 
| changedata_target_column_id| 自定义列| 数据联动设置（目标列的 ID）| 
| changedata_column_id| 自定义列| 数据联动设置（链接列的 ID）| 
| relation_filter_target_column_id| 自定义列| 关联筛选（目标列的 ID）| 
| html| HTML、扩展 HTML| HTML| 
| text| 标题、说明文字| 文本| 
| append_hr| 标题| 1：绘制分隔线| 
| image_aslink| 图片| 1：以链接形式显示图片| 

## custom_form_priorities
管理自定义表单的显示优先级的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| custom_form_id| | NO| int(10) unsigned| | | 自定义表单的 ID|
| order| 0| NO| int(10) unsigned| | | 优先级的判定顺序|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| condition_join| 条件的连接方式（and,or）| 

## custom_operations
管理批量更新设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_table_id| | NO| int(10) unsigned| | | 自定义表的 ID|
| operation_type| NULL| YES| varchar(255)| | | 更新时机|
| operation_name| | NO| varchar(40)| | | 处理名称|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| button_label| 按钮标签| 
| button_icon| 按钮图标| 
| button_class| 按钮的 HTML class| 
| condition_join| 条件的连接方式（and,or）| 

## custom_operation_columns
批量更新设置的子表。管理目标列和更新内容。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| custom_operation_id| | NO| int(10) unsigned| MUL| | 批量更新设置的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_target_id| | NO| int(11)| | | 目标列的 ID|
| update_value_text| | NO| varchar(1024)| | | 更新值|
| operation_column_type| 0| NO| int(11)| | | 0：更新列设置、1：输入对话框设置|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| operation_update_type| 更新的类型（default：固定值、system：系统值）| 

## custom_relations
管理自定义表之间的关联设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | 父表的 ID|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | 子表的 ID|
| relation_type| 0| NO| int(11)| | | 1：一对多<br>2：多对多|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| parent_import_column_id| 导入时的键列的 ID| 
| parent_export_column_id| 导出时的键列的 ID| 

## custom_relation_values
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
管理自定义表的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| table_name| | NO| varchar(256)| | | 表名（英文和数字）|
| table_view_name| | NO| varchar(256)| | | 表显示名称|
| description| NULL| YES| varchar(1000)| | | 说明|
| system_flg| 0| NO| tinyint(1)| | | 1：系统表|
| showlist_flg| 1| NO| tinyint(1)| | | 1：显示在列表中|
| order| 0| NO| int(11)| | | 显示顺序|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| color| 颜色| 
| icon| 图标| 
| search_enabled| 1：可搜索| 
| use_label_id_flg| 将 ID 用作标签| 
| one_record_flg| 1：仅可登记一条| 
| attachment_flg| 1：使用附件| 
| comment_flg| 1：使用评论| 
| revision_flg| 1：使用数据变更历史| 
| revision_count| 变更历史版本数| 
| all_user_editable_flg| 1：所有用户均可编辑| 
| all_user_viewable_flg| 1：所有用户均可查看| 
| all_user_accessable_flg| 1：所有用户均可引用| 

## custom_value_authoritables
管理每条数据的权限设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| parent_type| NULL| YES| varchar(255)| MUL| | 目标表的英文数字名称|
| parent_id| NULL| YES| bigint(20) unsigned| | | 目标数据的 ID|
| authoritable_type| | NO| varchar(255)| MUL| | 权限的类型|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | 授权对象（用户 or 组织）|
| authoritable_target_id| NULL| YES| int(11)| MUL| | 授权对象的 ID|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
管理自定义视图的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_table_id| | NO| int(10) unsigned| MUL| | 自定义表的 ID|
| view_type| 0| NO| int(11)| | | 0：系统视图<br>1：用户视图|
| view_kind_type| 0| NO| int(11)| | | 视图的类型（*）|
| view_view_name| | NO| varchar(40)| | | 视图显示名称|
| default_flg| 0| NO| tinyint(1)| | | 1：默认视图|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| custom_options| NULL| YES| longtext| | | 插件使用的选项设置|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 0：列表视图、1：汇总视图、2：日历视图、3：条件视图、4：插件、9：全部数据视图

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| use_view_infobox| 1：使用视图信息框| 
| view_infobox_title| 信息框 - 标题| 
| view_infobox| 信息框 - 正文| 
| pager_count| 每页显示条数| 
| condition_join| 条件的连接方式（and,or）| 

## custom_view_columns
自定义视图的子表。管理显示列的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_view_id| | NO| int(10) unsigned| MUL| | 自定义视图的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_table_id| | NO| int(10) unsigned| | | 列的表 ID|
| view_column_target_id| NULL| YES| int(11)| | | 列的 ID|
| order| 0| NO| int(10) unsigned| | | 显示顺序|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|
| view_column_name| NULL| YES| varchar(40)| | | 别名显示名称|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 视图的类型 | 备注 | 
|---|---|---|
| view_pivot_column_id| 通用| 引用键列的 ID| 
| view_pivot_table_id| 通用| 引用键列的表 ID| 
| view_group_condition| 汇总视图| 列类型| 
| sort_order| 汇总视图| 排序| 
| sort_type| 汇总视图| 排列顺序（1：升序、-1：降序）| 
| color| 日历视图| 显示颜色| 
| font_color| 日历视图| 文字颜色| 
| end_date_target| 日历视图| 结束日期的列 ID| 
| end_date_type| 日历视图| 结束日期的列类型| 

## custom_view_filters
自定义视图的子表。管理数据显示条件的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| NULL| YES| varchar(20)| MUL| | 20 位随机字符串|
| custom_view_id| | NO| int(10) unsigned| MUL| | 自定义视图的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_table_id| | NO| int(10) unsigned| | | 列的表 ID|
| view_column_target_id| NULL| YES| int(11)| | | 列的 ID|
| view_filter_condition| | NO| int(11)| | | 筛选条件的类型|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | 条件值|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | 条件值的表 ID|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | 条件值的列 ID|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| view_pivot_column_id| 引用键列的 ID| 
| view_pivot_table_id| 引用键列的表 ID| 

## custom_view_grid_filters
自定义视图的子表。管理视图的“筛选”项目指定的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_view_id| | NO| int(10) unsigned| MUL| | 自定义视图的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_table_id| | NO| int(10) unsigned| | | 列的表 ID|
| view_column_target_id| NULL| YES| int(11)| | | 列的 ID|
| order| 0| NO| int(10) unsigned| | | 显示顺序|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| view_pivot_column_id| 引用键列的 ID| 
| view_pivot_table_id| 引用键列的表 ID| 

## custom_view_sorts
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| NULL| YES| varchar(20)| MUL| | 20 位随机字符串|
| custom_view_id| | NO| int(10) unsigned| MUL| | 自定义视图的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_table_id| | NO| int(10) unsigned| | | 列的表 ID|
| view_column_target_id| NULL| YES| int(11)| | | 列的 ID|
| sort| 1| NO| int(11)| | | 1：升序<br>-1：降序|
| priority| 0| NO| int(10) unsigned| | | 优先级|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| view_pivot_column_id| 引用键列的 ID| 
| view_pivot_table_id| 引用键列的表 ID| 

## custom_view_summaries
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| custom_view_id| | NO| int(10) unsigned| MUL| | 自定义视图的 ID|
| view_column_type| 0| NO| int(11)| | | 0：自定义列<br>1：系统列|
| view_column_table_id| | NO| int(10) unsigned| | | 列的表 ID|
| view_column_target_id| NULL| YES| int(11)| | | 列的 ID|
| view_summary_condition| 0| NO| int(10) unsigned| | | 汇总类型（*）|
| view_column_name| NULL| YES| varchar(40)| | | 别名显示名称|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*)1：合计、3：件数、4：最小值、5：最大值

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| view_pivot_column_id| 引用键列的 ID| 
| view_pivot_table_id| 引用键列的表 ID| 
| sort_order| 排序| 
| sort_type| 排列顺序（1：升序、-1：降序）| 

## dashboards
管理仪表板的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| dashboard_type| 0| NO| int(11)| | | 0：系统仪表板、1：用户仪表板|
| dashboard_name| | NO| varchar(256)| MUL| | 仪表板名称（字母数字）|
| dashboard_view_name| | NO| varchar(40)| | | 仪表板显示名称|
| default_flg| 0| NO| tinyint(1)| | | 1：默认仪表板|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| row1| 仪表板第 1 行的列数| 
| row2| 仪表板第 2 行的列数| 
| row3| 仪表板第 3 行的列数| 
| row4| 仪表板第 4 行的列数| 

## dashboard_boxes
仪表板的子表。管理仪表板内的显示项目。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| dashboard_id| | NO| int(10) unsigned| MUL| | 仪表板的 ID|
| row_no| | NO| int(11)| MUL| | 行号|
| column_no| | NO| int(11)| MUL| | 列号|
| dashboard_box_view_name| | NO| varchar(40)| | | 项目显示名称|
| dashboard_box_type| | NO| varchar(255)| | | 项目类型|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 仪表板的类型 | 备注 | 
|---|---|---|
| target_table_id| 通用（系统除外）| 目标表| 
| target_view_id| 通用（系统除外）| 目标视图| 
| pager_count| 数据列表| 显示（跟随系统设置 or 每页显示条数）| 
| target_system_id| 系统| 显示项目（*）| 
| content| 系统| 编辑器正文| 
| html| 系统| HTML| 
| chart_type| 图表| 图表类型| 
| chart_axisx| 图表| X 轴项目| 
| chart_axisy| 图表| Y 轴项目| 
| chart_axis_label| 图表| 显示坐标轴标签（1：X 轴、2：Y 轴）| 
| chart_axis_name| 图表| 显示坐标轴名称（1：X 轴、2：Y 轴）| 
| chart_options| 图表| 选项设置（1：从零开始、2：显示图例）| 
| calendar_type| 日历| 日历的类型（按月、列表）| 

*) 1：指南、2：Exment 最新信息列表、3：编辑器、4：HTML

## data_share_authoritables
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
管理已上传文件的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | 唯一的随机字符串|
| file_type| NULL| YES| int(11)| MUL| | 文件类型|
| local_dirname| | NO| varchar(255)| MUL| | 保存文件的目录名|
| local_filename| | NO| varchar(255)| MUL| | 保存文件的名称|
| filename| | NO| varchar(255)| MUL| | 原文件名|
| parent_type| NULL| YES| varchar(255)| MUL| | 父数据的表名（英文和数字）|
| parent_id| NULL| YES| bigint(20) unsigned| | | 父数据的 ID|
| custom_column_id| NULL| YES| int(11)| | | 自定义列的 ID|
| custom_form_column_id| NULL| YES| int(11)| MUL| | 自定义表单列的 ID|
| options| NULL| YES| longtext| | | 各种选项设置|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
管理 SSO 认证、两步验证等扩展登录设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| login_view_name| | NO| varchar(255)| | | 登录设置显示名称|
| login_type| | NO| varchar(255)| | | 登录类型|
| active_flg| 0| NO| tinyint(1)| | | 1：启用|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 登录类型 | 备注 | 
|---|---|---|
| oauth_provider_type| OAuth| 提供商类型| 
| oauth_provider_name| OAuth| 提供商名称（字母数字）| 
| oauth_client_id| OAuth| 客户端 ID| 
| oauth_client_secret| OAuth| 客户端密钥| 
| oauth_scope| OAuth| 范围| 
| oauth_redirect_url| OAuth| 重定向 URL| 
| saml_name| SAML| SAML 名称（字母数字）| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| IdP 登录 URL| 
| saml_idp_ssout_url| SAML| IdP 登出 URL| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1：加密 SP 发送的 NameID| 
| saml_option_authn_request_signed| SAML| 1：对 SP 发送的认证请求进行签名| 
| saml_option_logout_request_signed| SAML| 1：对 SP 发送的登出请求进行签名| 
| saml_option_logout_response_signed| SAML| 1：对 SP 发送的登出响应进行签名| 
| saml_option_proxy_vars| SAML| 1：使用反向代理等| 
| ldap_name| LDAP| LDAP 名称（字母数字）| 
| ldap_hosts| LDAP| 主机名| 
| ldap_port| LDAP| 端口号| 
| ldap_base_dn| LDAP| 基本 DN（识别名）| 
| ldap_search_key| LDAP| 用户搜索属性| 
| ldap_account_prefix| LDAP| 登录代码前缀| 
| ldap_account_suffix| LDAP| 登录代码后缀| 
| ldap_use_ssl| LDAP| 1：使用 SSL| 
| ldap_use_tls| LDAP| 1：使用 TLS| 
| mapping_column_XX| 通用| 映射设置（XX 部分为用户表的字段名）| 
| mapping_user_column| 通用| 账户搜索列| 
| sso_jit| 通用| 1：新建用户| 
| jit_rolegroups| 通用| 创建用户时赋予的角色组| 
| update_user_info| 通用| 1：更新用户信息| 
| login_button_label| 通用| 按钮显示名称| 
| login_button_icon| SAML、OAuth| 按钮图标| 
| login_button_background_color| 通用| 按钮的背景色| 
| login_button_background_color_hover| 通用| 按钮的背景色（悬停）| 
| login_button_font_color| 通用| 按钮的文字颜色| 
| login_button_font_color_hover| 通用| 按钮的文字颜色（悬停）| 

## login_users
管理用户登录信息的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| base_user_id| | NO| int(10) unsigned| MUL| | 用户 ID|
| login_type| 'pure'| NO| varchar(255)| MUL| | 登录的类型（普通、OAuth、SAML 等）|
| login_provider| NULL| YES| varchar(32)| | | 登录提供商的类型|
| password_reset_flg| 0| NO| tinyint(1)| | | 1：重置密码|
| password| | NO| varchar(1000)| | | 密码|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | 头像图片的 URI|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
管理数据库迁移状况的表。
<span class="red bold">※请绝对不要删除或更改其内容。</span>
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| migration| | NO| varchar(255)| | | 迁移文件名|
| batch| | NO| int(11)| | | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
管理通知设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| target_id| NULL| YES| int(10) unsigned| MUL| | 通知对象的 ID（自定义表、工作流）|
| notify_name| NULL| YES| varchar(256)| | | 通知名称（英文数字）|
| notify_view_name| | NO| varchar(256)| | | 通知显示名称|
| active_flg| 1| NO| tinyint(1)| | | 1：启用|
| custom_table_id| | NO| int(10) unsigned| | | （计划废弃）|
| workflow_id| NULL| YES| int(10) unsigned| | | （计划废弃）|
| custom_view_id| NULL| YES| int(10) unsigned| | | 条件视图的 ID|
| notify_trigger| | NO| int(11)| | | 执行触发条件|
| trigger_settings| NULL| YES| longtext| | | 执行触发条件设置（见另表）|
| notify_actions| NULL| YES| varchar(50)| | | （计划废弃）|
| action_settings| NULL| YES| longtext| | | 通知操作设置（见另表）|
| mail_template_id| NULL| YES| int(11)| | | 通知模板 ID|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### 执行触发条件设置
| 键 | 备注 | 
|---|---|
| notify_target_column| 日期目标列的 ID| 
| notify_target_table_id| 日期目标列的表 ID| 
| view_pivot_column_id| 引用键列的 ID| 
| view_pivot_table_id| 引用键列的表 ID| 
| notify_day| 通知日（加减的值）| 
| notify_beforeafter| 通知前后（-1：前、1：后）| 
| notify_hour| 通知时间| 
| notify_saved_trigger| 通知条件设置| 
| notify_myself| 1：也通知操作执行人| 
| notify_button_name| 按钮显示名称| 

#### 通知操作设置
| 键 | 备注 | 
|---|---|
| notify_action| 执行的操作（*）| 
| notify_action_target| 通知对象| 
| webhook_url| Webhook URL| 
| mention_here| 1：通知所有成员| 
| target_emails| 收件人邮箱地址| 

*) 1：电子邮件、2：系统内提醒、3：Slack 通知、4：Microsoft Teams 通知

## notify_navbars
保存显示在导航栏和通知列表中的通知数据的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| notify_id| | NO| int(10) unsigned| MUL| | 通知设置的 ID|
| parent_type| NULL| YES| varchar(255)| MUL| | 目标数据的表名（英文和数字）|
| parent_id| NULL| YES| bigint(20) unsigned| | | 目标数据的 ID|
| target_user_id| | NO| int(10) unsigned| MUL| | 通知对象用户 ID|
| trigger_user_id| NULL| YES| int(10) unsigned| | | 执行了触发通知的操作的用户 ID|
| notify_subject| NULL| YES| varchar(200)| | | 通知标题|
| notify_body| NULL| YES| varchar(2000)| | | 通知正文|
| read_flg| 0| NO| tinyint(1)| MUL| | 1：已读|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| expires_at| NULL| YES| datetime| | | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
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
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
保存密码变更历史的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| login_user_id| | NO| int(10) unsigned| MUL| | 目标用户 ID|
| password| | NO| varchar(1000)| | | 密码|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
管理执行密码重置时的临时数据。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | 电子邮件地址|
| token| | NO| varchar(255)| | | 临时访问令牌|
| created_at| NULL| YES| timestamp| | | 创建时间|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
管理插件的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| uuid| | NO| varchar(255)| UNI| | 唯一的随机字符串|
| plugin_name| | NO| varchar(256)| MUL| | 插件名称（字母数字）|
| plugin_view_name| | NO| varchar(256)| | | 插件显示名称|
| author| NULL| YES| varchar(256)| | | 作者|
| plugin_types| NULL| YES| varchar(255)| | | 插件的类型|
| version| NULL| YES| varchar(128)| | | 版本|
| description| NULL| YES| varchar(1000)| | | 说明|
| active_flg| 1| NO| tinyint(1)| | | 1：启用|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| custom_options| NULL| YES| longtext| | | 自定义选项设置|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### 各种选项设置
| 键 | 插件的类型 | 备注 | 
|---|---|---|
| target_tables| 按钮、事件、触发器、文档、导入、导出、验证、视图| 目标表名（英文和数字）| 
| event_triggers| 按钮、事件、触发器| 执行触发条件| 
| icon| 页面、视图、按钮、触发器、文档、导出| 按钮图标| 
| label| 页面、视图、按钮、触发器、文档、导出| 按钮标签| 
| button_class| 页面、视图、按钮、触发器、文档| 按钮的 HTML class| 
| uri| API、页面| URI| 
| endpoint_page| 页面| 端点（页面）| 
| endpoint_api| API| 端点（API）| 
| batch_hour| 批处理| 批处理执行时间（时）| 
| batch_cron| 批处理| 批处理执行 cron| 
| command_only| 批处理| 1：仅限命令执行| 
| grid_menu_title| 视图| 菜单中的标题| 
| grid_menu_description| 视图| 菜单中的说明| 
| all_user_enabled| 页面、触发器、文档、API、仪表板、导入、导出、按钮| 1：所有用户可用| 
| export_types| 导出| 导出类型| 
| export_description| 导出| 说明文字| 

## public_forms
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| uuid| | NO| char(36)| UNI| | 唯一的随机字符串|
| custom_form_id| | NO| int(10) unsigned| MUL| | 自定义表单的 ID|
| public_form_view_name| | NO| varchar(256)| | | 公开表单显示名称|
| active_flg| 0| NO| tinyint(1)| | | 1：启用|
| proxy_user_id| | NO| int(10) unsigned| MUL| | 执行用户的 ID|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### 各种选项设置
| 键 | 选项卡 | 备注 | 
|---|---|---|
| validity_period_start| 基本设置| 公开有效期（from）| 
| validity_period_end| 基本设置| 公开有效期（to）| 
| use_header| 设计设置| 1：使用页眉| 
| header_background_color| 设计设置| 页眉 - 背景色| 
| header_logo| 设计设置| 页眉 - Logo| 
| header_label| 设计设置| 页眉文字| 
| header_text_color| 设计设置| 页眉文字颜色| 
| background_color_outer| 设计设置| 背景色 - 外框| 
| background_color| 设计设置| 背景色| 
| use_footer| 设计设置| 1：使用页脚| 
| footer_label| 设计设置| 页脚文字| 
| footer_text_color| 设计设置| 页脚文字颜色| 
| use_confirm| 回答确认/完成设置| 1：使用回答确认| 
| confirm_title| 回答确认/完成设置| 确认标题| 
| confirm_text| 回答确认/完成设置| 确认文本| 
| complete_title| 回答确认/完成设置| 完成标题| 
| complete_text| 回答确认/完成设置| 完成文本| 
| complete_link_url| 回答确认/完成设置| 完成链接 URL| 
| complete_link_text| 回答确认/完成设置| 完成链接文本| 
| use_notify_complete_user| 回答确认/完成设置| 1：向普通用户发送完成通知| 
| use_notify_complete_admin| 回答确认/完成设置| 1：向管理员发送完成通知| 
| error_title| 错误设置| 错误标题| 
| error_text| 错误设置| 错误文本| 
| error_link_url| 错误设置| 错误链接 URL| 
| error_link_text| 错误设置| 错误链接文本| 
| use_notify_error| 错误设置| 1：发送错误通知| 
| custom_css| CSS / Javascript| 自定义 CSS| 
| plugin_css| CSS / Javascript| 插件（CSS）| 
| custom_js| CSS / Javascript| 自定义 Javascript| 
| plugin_js| CSS / Javascript| 插件（Javascript）| 
| use_default_query| 选项设置| 1：允许通过 URL 设置初始值| 
| analytics_tag| 选项设置| Google Analytics| 
| use_recaptcha| 选项设置| 1：使用 Google reCAPTCHA| 

## revisions
保存更新历史的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| revisionable_type| | NO| varchar(255)| | | 目标表名（英文和数字）|
| revisionable_id| | NO| int(11)| MUL| | 目标数据 ID|
| revision_no| 0| NO| int(10) unsigned| | | 修订版本号|
| key| | NO| varchar(255)| MUL| | 目标项目的键|
| old_value| NULL| YES| text| | | 变更前的值|
| new_value| NULL| YES| text| | | 变更后的值|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| deleted_at| NULL| YES| timestamp| | | 删除时间|
| create_user_id| NULL| YES| int(11)| | | 创建用户 ID|
| delete_user_id| NULL| YES| int(11)| | | 删除用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
管理角色组的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| role_group_name| | NO| varchar(256)| UNI| | 角色组名称（英文数字）|
| role_group_view_name| | NO| varchar(256)| | | 角色组显示名称|
| description| NULL| YES| varchar(1000)| | | 说明|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
角色组的子表。管理权限设置。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| role_group_id| | NO| int(10) unsigned| MUL| | 角色组 ID|
| role_group_permission_type| | NO| varchar(255)| MUL| | 权限的类型（*）|
| role_group_target_id| NULL| YES| int(11)| MUL| | 权限对象项目的 ID|
| permissions| NULL| YES| longtext| | | 允许的操作|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

*) 0：系统、1：表、3：插件

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
角色组的子表。管理属于角色组的用户和组织。

### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| role_group_id| | NO| int(10) unsigned| MUL| | 角色组 ID|
| role_group_user_org_type| | NO| varchar(255)| MUL| | 用户/组织类型|
| role_group_target_id| NULL| YES| int(11)| MUL| | 目标用户或组织的 ID|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
管理系统设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | 系统设置名称（英文和数字）|
| system_value| NULL| YES| text| | | 设置值|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
管理每个登录用户的设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| base_user_id| | NO| int(10) unsigned| MUL| | 用户 ID|
| settings| NULL| YES| longtext| | | 各种设置值|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
管理工作流设置的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| workflow_type| 0| NO| int(11)| | | 工作流类型（0：通用、1：表专用）|
| workflow_view_name| | NO| varchar(30)| | | 工作流显示名称|
| start_status_name| | NO| varchar(30)| | | 开始状态名称|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1：设置已完成|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| workflow_edit_flg| 1：向下一处理用户授予编辑权限| 

## workflow_actions
工作流设置的子表。管理操作设置。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| workflow_id| | NO| int(10) unsigned| MUL| | 工作流 ID|
| status_from| | NO| varchar(255)| | | 执行前的状态（start 或 ID）|
| action_name| | NO| varchar(30)| | | 操作名称|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1：特殊操作|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| deleted_at| NULL| YES| timestamp| | | 删除时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| work_target_type| 处理用户的指定方式（action_select：由上一操作的执行用户选择、fix：事先设置、get_by_userinfo：从执行用户信息获取）| 
| comment_type| 评论类型（required：必填、nullable：可选、not_use：不使用）| 
| flow_next_type| 进入下一状态的条件（some：X 人以上执行、all：全员执行）| 
| flow_next_count| 进入下一状态所需的人数| 

## workflow_authorities
工作流操作设置的子表。管理可以执行操作的用户。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 对象的 ID|
| related_type| | NO| varchar(255)| | | 对象的类型（用户、组织、自定义列、系统）|
| workflow_action_id| | NO| int(10) unsigned| MUL| | 操作设置的 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
工作流操作设置的子表。管理操作分支设置。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| workflow_action_id| | NO| int(10) unsigned| MUL| | 操作设置的 ID|
| status_to| | NO| varchar(255)| | | 执行后的状态 ID|
| enabled_flg| 0| NO| tinyint(1)| | | 1：启用|
| options| NULL| YES| longtext| | | 各种选项设置（见另表）|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### 各种选项设置
| 键 | 备注 | 
|---|---|
| condition_join| 条件的连接方式（and,or）| 

## workflow_statuses
工作流设置的子表。管理状态设置。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| workflow_id| | NO| int(10) unsigned| MUL| | 工作流 ID|
| status_type| 0| NO| int(10) unsigned| MUL| | （计划废弃）|
| order| | NO| int(10) unsigned| MUL| | 排列顺序|
| status_name| | NO| varchar(30)| | | 状态名称|
| datalock_flg| 0| NO| tinyint(1)| | | 1：禁止编辑数据|
| completed_flg| 0| NO| tinyint(1)| | | 1：完成状态|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
工作流设置的子表。管理使用设置。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| workflow_id| | NO| int(10) unsigned| MUL| | 工作流 ID|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | 目标自定义表的 ID|
| active_flg| 0| NO| tinyint(1)| | | 1：使用|
| active_start_date| NULL| YES| date| | | 使用开始日期|
| active_end_date| NULL| YES| date| | | 使用结束日期|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
管理每条数据的工作流执行历史的表。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主键|
| suuid| | NO| varchar(20)| MUL| | 20 位随机字符串|
| workflow_id| | NO| int(10) unsigned| MUL| | 工作流 ID|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic 键（类型）|
| morph_id| | NO| bigint(20) unsigned| | | Polymorphic 键（ID）|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | 操作设置的 ID|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | 执行前的状态 ID|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | 执行后的状态 ID|
| comment| NULL| YES| varchar(1000)| | | 评论|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1：工作流执行中|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1：最新数据|
| created_at| NULL| YES| timestamp| | | 创建时间|
| updated_at| NULL| YES| timestamp| | | 更新时间|
| created_user_id| NULL| YES| int(10) unsigned| | | 创建用户 ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新用户 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
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
保存执行工作流时指定的下一处理用户。
### 表定义
| 列名 | 默认值 | NULL | 类型 | 键 | 其他 | 备注 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 对象的 ID|
| related_type| | NO| varchar(255)| | | 对象的类型（用户、组织、自定义列、系统）|
| workflow_value_id| | NO| int(10) unsigned| MUL| | 工作流执行历史的 ID|

### INDEX 信息
| INDEX 名 | INDEX 列 | UNIQUE |备注 | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
