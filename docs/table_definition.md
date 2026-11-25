# Database table definition
These are the definitions of the database tables that Exment uses. This page is for developers and for people who look into the database directly.  
For each table, it lists the column definitions (Table definition) and the INDEX information. "Option settings" is a list of the keys stored in columns such as options.

Note: This page is updated from time to time.

## admin_menu
A table that manages the menus shown in the sidebar.  
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| parent_id| 0| NO| int(11)| | | ID of the parent level|
| order| 0| NO| int(11)| | | Order|
| title| | NO| varchar(50)| | | Menu display name|
| icon| | NO| varchar(50)| | | Icon|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | Options|
| permission| NULL| YES| varchar(255)| | | (Not used)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| menu_type| | NO| varchar(255)| | | Menu type|
| menu_name| NULL| YES| varchar(255)| | | Menu name|
| menu_target| NULL| YES| varchar(255)| | | Target|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
A table that stores the operation log.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| user_id| | NO| int(11)| MUL| | User ID|
| path| | NO| varchar(255)| | | Accessed path|
| method| | NO| varchar(10)| | | Executed method|
| ip| | NO| varchar(255)| | | IP address|
| input| | NO| text| | | Input information / query|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
A polymorphic table that stores various conditions. It stores the conditions of the form priority setting, the Mass Update Setting, workflow actions and so on.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic key (type)|
| morph_id| | NO| int(10) unsigned| | | Polymorphic key (ID)|
| condition_type| | NO| int(11)| | | Type of the condition item (*)|
| condition_key| | NO| int(11)| | | Key of the search condition type|
| target_column_id| NULL| YES| int(11)| | | ID of the condition item|
| condition_value| NULL| YES| varchar(1024)| | | Condition value|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 0: custom column, 1: system column, 2: parent ID, 3: workflow, 4: other condition

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
A table that manages custom columns.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID of the custom table|
| column_name| | NO| varchar(255)| MUL| | Column name (alphanumeric)|
| column_view_name| | NO| varchar(255)| | | Column display name|
| column_type| | NO| varchar(255)| MUL| | Column type|
| description| NULL| YES| varchar(1000)| | | Description|
| system_flg| 0| NO| tinyint(1)| | | System management flag|
| order| 0| NO| int(11)| | | Order|
| options| NULL| YES| longtext| | | Options (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Target column type |Comment | 
|---|---|---|
| required| Common| 1: Required| 
| index_enabled| Common| 1: Index Enabled| 
| freeword_search| Search index columns only| 1: Freeword Search Target| 
| unique| Common| 1: Unique| 
| init_only| Common| 1: Input Only Once| 
| placeholder| Common| PlaceHolder| 
| help| Common| Help| 
| min_width| Common| Column width (minimum)| 
| max_width| Common| Column width (maximum)| 
| default| Common (except file and image)| Default Value| 
| string_length| Text items| Max Length| 
| available_characters| One-Line Text| Available Characters| 
| suggest_input| One-Line Text| 1: Suggest Input| 
| regex_validate| One-Line Text| Regular expression (shown only in expert mode)| 
| rows| Multiple-Line Text| Height (number of rows)| 
| number_min| Number items| Min Number| 
| number_max| Number items| Max Number| 
| number_format| Number items| Use Number Comma String| 
| calc_formula| Number items| Calc Formula| 
| updown_button| Integer| 1: Show the +- Button| 
| decimal_digit| Decimal, Currency| Number of decimal places| 
| percent_format| Decimal| Show as Percent| 
| currency_symbol| Currency| Currency Format| 
| default_type| Date items, User| Initial value type| 
| datetime_now_saving| Date items| 1: Register execution date when saving| 
| datetime_now_creating| Date items| 1: Register execution date when creating| 
| auto_number_type| Auto Number| Auto Number Type| 
| auto_number_format| Auto Number| Auto Number Format| 
| select_item| Select (From Static Value)| Select Choice| 
| select_item_valtext| Select (Save Value and Label)| Select Choice| 
| check_radio_enabled| Select (From Static Value), Select (Save Value and Label)| 1: Displayed in radio button / check box format| 
| free_input| Select (From Static Value)| 1: Make it freely input| 
| select_target_table| Select (From Table)| Select Target Table| 
| select_target_view| Select (From Table), User, Organization| Target view| 
| select_import_column_id| Select (From Table), User, Organization| Key column when importing| 
| select_export_column_id| Select (From Table), User, Organization| Key column when exporting| 
| select_load_ajax| Select (From Table), User, Organization| 1: Narrow down the choices| 
| checkbox_enabled| YES/NO| 1: Display in check box format| 
| required_yes| YES/NO| 1: Required YES| 
| true_value| Select 2-value| Select1 Value| 
| true_label| Select 2-value| Select1 Label| 
| false_value| Select 2-value| Select2 Value| 
| false_label| Select 2-value| Select2 Label| 
| multiple_enabled| File items, select items, User, Organization| 1: Approval Multiple Select| 
| accept_extensions| File items| Extensions that allow uploading| 
| showing_all_user_organizations| User, Organization| Display users/organizations without permission| 


## custom_column_multisettings
Manages several settings related to a custom table (Headline display column setting, Compound unique key setting, Compare 2 columns, Data Share Setting, etc.).
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_table_id| | NO| int(10) unsigned| | | ID of the custom table|
| multisetting_type| 1| NO| int(11)| | | Type of the setting (*)|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| priority| 0| NO| int(10) unsigned| | | Order / priority|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 1: Compound unique key setting, 2: Headline display column setting, 3: Compare 2 columns, 4: Data Share Setting

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Target setting |Comment | 
|---|---|---|
| unique1_id| Compound unique key setting| Compound unique key 1| 
| unique2_id| Compound unique key setting| Compound unique key 2| 
| unique3_id| Compound unique key setting| Compound unique key 3| 
| table_label_id| Headline display column setting| ID of the target column| 
| compare_column1_id| Compare 2 columns| Validation column(A)| 
| compare_column2_id| Compare 2 columns| Compare column(B)| 
| compare_type| Compare 2 columns| Condition| 
| share_trigger_type| Data Share Setting| Trigger (1: when created, 2: when updated)| 
| share_column_id| Data Share Setting| ID of the target column| 
| share_permission| Data Share Setting| Target permission (1: edit, 2: view)| 

## custom_copies
A table that manages the Data Copy Setting.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | ID of the copy source table|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | ID of the copy destination table|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| label| Button label| 
| icon| Button icon| 
| button_class| HTML class of the button| 
| child_copy| Child Table Setting| 

## custom_copy_columns
A child table of the Data Copy Setting. It manages the target custom columns.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| custom_copy_id| | NO| int(10) unsigned| MUL| | ID of the Data Copy Setting|
| from_column_type| NULL| YES| int(11)| | | Type of the copy source custom column|
| from_column_table_id| NULL| YES| int(10) unsigned| | | Table ID of the copy source custom column|
| from_column_target_id| NULL| YES| int(11)| | | ID of the copy source custom column|
| to_column_type| 0| NO| int(11)| | | Type of the copy destination custom column|
| to_column_table_id| | NO| int(10) unsigned| | | Table ID of the copy destination custom column|
| to_column_target_id| | NO| int(11)| | | ID of the copy destination custom column|
| copy_column_type| 0| NO| int(11)| | | 0: copy column setting, 1: input dialog setting|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
A table that manages custom forms.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID of the custom table|
| form_view_name| | NO| varchar(256)| | | Form display name|
| default_flg| 0| NO| tinyint(1)| | | 1: Default form|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| form_label_type| Heading Display Method| 
| show_grid_type| Detailed Screen Display Method| 

## custom_form_blocks
A child table of the custom form. It manages the form blocks.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID of the custom form|
| form_block_view_name| NULL| YES| varchar(255)| | | Form block name|
| form_block_type| | NO| int(11)| | | Type of the form block (*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | ID of the target custom table|
| available| 0| NO| tinyint(1)| | | 1: Use|
| options| NULL| YES| longtext| | | Option settings|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 0: default, 1: child table (one-to-many), 2: child table (many-to-many)

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
A child table of the form block. It manages the form items in the block.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| NULL| YES| varchar(20)| MUL| | Random string of 20 characters|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | ID of the form block|
| form_column_type| | NO| int(11)| | | Type of the form item (*)|
| form_column_target_id| NULL| YES| int(11)| | | ID of the form item|
| row_no| 1| NO| int(11)| | | Position (row No)|
| column_no| 1| NO| int(11)| | | Position (column No)|
| width| NULL| YES| int(11)| | | Column width|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| order| 0| NO| int(11)| | | Display order|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 0: custom column, 1: system column, 99: other item

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Target item | Comment | 
|---|---|---|
| form_column_view_name| Custom Column| Field Display Name| 
| field_label_type| Custom Column| Heading Display Method| 
| field_showing_type| Custom Column| Field Type| 
| required| Custom Column| 1: Required| 
| default_type| Custom Column| Initial value type| 
| default| Custom Column| Default Value| 
| help| Custom Column| Help| 
| changedata_target_column_id| Custom Column| Data Linkage Setting (ID of the target column)| 
| changedata_column_id| Custom Column| Data Linkage Setting (ID of the link column)| 
| relation_filter_target_column_id| Custom Column| Relation Filter Setting (ID of the target column)| 
| html| HTML, Expand HTML| HTML| 
| text| Label, Explain| Text| 
| append_hr| Label| 1: Draw a hairline| 
| image_aslink| Image| 1: Display image as a link| 

## custom_form_priorities
A table that manages the display priority of custom forms.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| custom_form_id| | NO| int(10) unsigned| | | ID of the custom form|
| order| 0| NO| int(10) unsigned| | | Order of judging the priority|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| condition_join| How the conditions are joined (and, or)| 

## custom_operations
A table that manages the Mass Update Setting.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_table_id| | NO| int(10) unsigned| | | ID of the custom table|
| operation_type| NULL| YES| varchar(255)| | | Timing of the update|
| operation_name| | NO| varchar(40)| | | Name of the process|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| button_label| Button label| 
| button_icon| Button icon| 
| button_class| HTML class of the button| 
| condition_join| How the conditions are joined (and, or)| 

## custom_operation_columns
A child table of the Mass Update Setting. It manages the target columns and the update contents.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| custom_operation_id| | NO| int(10) unsigned| MUL| | ID of the Mass Update Setting|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_target_id| | NO| int(11)| | | ID of the target column|
| update_value_text| | NO| varchar(1024)| | | Update value|
| operation_column_type| 0| NO| int(11)| | | 0: update column setting, 1: input dialog setting|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| operation_update_type| Type of the update (default: fixed value, system: system value)| 

## custom_relations
A table that manages the relation settings between custom tables.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | ID of the parent table|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | ID of the child table|
| relation_type| 0| NO| int(11)| | | 1: one-to-many<br>2: many-to-many|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| parent_import_column_id| ID of the key column when importing| 
| parent_export_column_id| ID of the key column when exporting| 

## custom_relation_values
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
A table that manages custom tables.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| table_name| | NO| varchar(256)| | | Table name (alphanumeric)|
| table_view_name| | NO| varchar(256)| | | Table display name|
| description| NULL| YES| varchar(1000)| | | Description|
| system_flg| 0| NO| tinyint(1)| | | 1: System table|
| showlist_flg| 1| NO| tinyint(1)| | | 1: Show in the list|
| order| 0| NO| int(11)| | | Display order|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| color| Color| 
| icon| Icon| 
| search_enabled| 1: Search Enabled| 
| use_label_id_flg| Use ID as Label| 
| one_record_flg| 1: Save Only One Record| 
| attachment_flg| 1: Use Attachment File| 
| comment_flg| 1: Use Comment| 
| revision_flg| 1: Use Data Revision| 
| revision_count| Data Revision Versioning Count| 
| all_user_editable_flg| 1: All Users Can Edit| 
| all_user_viewable_flg| 1: All Users Can View| 
| all_user_accessable_flg| 1: All Users Can Access| 

## custom_value_authoritables
A table that manages the permission settings of each data.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| parent_type| NULL| YES| varchar(255)| MUL| | Alphanumeric name of the target table|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID of the target data|
| authoritable_type| | NO| varchar(255)| MUL| | Type of the permission|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | Who gets the permission (user or organization)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | ID of who gets the permission|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
A table that manages custom views.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID of the custom table|
| view_type| 0| NO| int(11)| | | 0: system view<br>1: user view|
| view_kind_type| 0| NO| int(11)| | | Type of the view (*)|
| view_view_name| | NO| varchar(40)| | | View display name|
| default_flg| 0| NO| tinyint(1)| | | 1: Default view|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| custom_options| NULL| YES| longtext| | | Option settings used by plugins|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 0: List view, 1: Summary view, 2: Calendar view, 3: Filter view, 4: plugin, 9: All data view

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| use_view_infobox| 1: Use View Infobox| 
| view_infobox_title| Infobox-Title| 
| view_infobox| Infobox-Body| 
| pager_count| Pager Count| 
| condition_join| How the conditions are joined (and, or)| 

## custom_view_columns
A child table of the custom view. It manages the display columns.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID of the custom view|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_table_id| | NO| int(10) unsigned| | | Table ID of the column|
| view_column_target_id| NULL| YES| int(11)| | | ID of the column|
| order| 0| NO| int(10) unsigned| | | Display order|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|
| view_column_name| NULL| YES| varchar(40)| | | Display under another name|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Type of the view | Comment | 
|---|---|---|
| view_pivot_column_id| Common| ID of the reference key column| 
| view_pivot_table_id| Common| Table ID of the reference key column| 
| view_group_condition| Summary view| Column type| 
| sort_order| Summary view| Sort| 
| sort_type| Summary view| Order (1: ascending, -1: descending)| 
| color| Calendar view| Display color| 
| font_color| Calendar view| Letter color| 
| end_date_target| Calendar view| Column ID of the end date| 
| end_date_type| Calendar view| Column type of the end date| 

## custom_view_filters
A child table of the custom view. It manages the data display conditions.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| NULL| YES| varchar(20)| MUL| | Random string of 20 characters|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID of the custom view|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_table_id| | NO| int(10) unsigned| | | Table ID of the column|
| view_column_target_id| NULL| YES| int(11)| | | ID of the column|
| view_filter_condition| | NO| int(11)| | | Type of the search condition|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | Condition value|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | Table ID of the condition value|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | Column ID of the condition value|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| view_pivot_column_id| ID of the reference key column| 
| view_pivot_table_id| Table ID of the reference key column| 

## custom_view_grid_filters
A child table of the custom view. It manages the "filter" items of the view.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID of the custom view|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_table_id| | NO| int(10) unsigned| | | Table ID of the column|
| view_column_target_id| NULL| YES| int(11)| | | ID of the column|
| order| 0| NO| int(10) unsigned| | | Display order|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| view_pivot_column_id| ID of the reference key column| 
| view_pivot_table_id| Table ID of the reference key column| 

## custom_view_sorts
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| NULL| YES| varchar(20)| MUL| | Random string of 20 characters|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID of the custom view|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_table_id| | NO| int(10) unsigned| | | Table ID of the column|
| view_column_target_id| NULL| YES| int(11)| | | ID of the column|
| sort| 1| NO| int(11)| | | 1: ascending<br>-1: descending|
| priority| 0| NO| int(10) unsigned| | | Priority|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| view_pivot_column_id| ID of the reference key column| 
| view_pivot_table_id| Table ID of the reference key column| 

## custom_view_summaries
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID of the custom view|
| view_column_type| 0| NO| int(11)| | | 0: custom column<br>1: system column|
| view_column_table_id| | NO| int(10) unsigned| | | Table ID of the column|
| view_column_target_id| NULL| YES| int(11)| | | ID of the column|
| view_summary_condition| 0| NO| int(10) unsigned| | | Summary type (*)|
| view_column_name| NULL| YES| varchar(40)| | | Display under another name|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 1: Summary, 3: Count, 4: Min, 5: Max

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| view_pivot_column_id| ID of the reference key column| 
| view_pivot_table_id| Table ID of the reference key column| 
| sort_order| Sort| 
| sort_type| Order (1: ascending, -1: descending)| 

## dashboards
A table that manages dashboards.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| dashboard_type| 0| NO| int(11)| | | 0: system dashboard, 1: user dashboard|
| dashboard_name| | NO| varchar(256)| MUL| | Dashboard name (alphanumeric)|
| dashboard_view_name| | NO| varchar(40)| | | Dashboard display name|
| default_flg| 0| NO| tinyint(1)| | | 1: Default dashboard|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Comment | 
|---|---|
| row1| Number of columns in row 1 of the dashboard| 
| row2| Number of columns in row 2 of the dashboard| 
| row3| Number of columns in row 3 of the dashboard| 
| row4| Number of columns in row 4 of the dashboard| 

## dashboard_boxes
A child table of the dashboard. It manages the items shown in the dashboard.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| dashboard_id| | NO| int(10) unsigned| MUL| | ID of the dashboard|
| row_no| | NO| int(11)| MUL| | Row No|
| column_no| | NO| int(11)| MUL| | Column No|
| dashboard_box_view_name| | NO| varchar(40)| | | Item display name|
| dashboard_box_type| | NO| varchar(255)| | | Item type|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Type of the dashboard | Comment | 
|---|---|---|
| target_table_id| Common (except System)| Target Table| 
| target_view_id| Common (except System)| Target View| 
| pager_count| Data List| Display (follow the system, or the number of items)| 
| target_system_id| System| Display item (*)| 
| content| System| Editor body| 
| html| System| HTML| 
| chart_type| Chart| Chart Type| 
| chart_axisx| Chart| Axis X| 
| chart_axisy| Chart| Axis Y| 
| chart_axis_label| Chart| Show axis label (1: X axis, 2: Y axis)| 
| chart_axis_name| Chart| Show axis name (1: X axis, 2: Y axis)| 
| chart_options| Chart| Option settings (1: start from 0, 2: show the legend)| 
| calendar_type| Calendar| Calendar Type (month, list)| 

*) 1: Guideline, 2: Exment new arrival information list, 3: Editor, 4: HTML

## data_share_authoritables
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
A table that manages the uploaded files.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | Unique random string|
| file_type| NULL| YES| int(11)| MUL| | Type of the file|
| local_dirname| | NO| varchar(255)| MUL| | Directory name of the stored file|
| local_filename| | NO| varchar(255)| MUL| | Name of the stored file|
| filename| | NO| varchar(255)| MUL| | Original file name|
| parent_type| NULL| YES| varchar(255)| MUL| | Table name of the parent data (alphanumeric)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID of the parent data|
| custom_column_id| NULL| YES| int(11)| | | ID of the custom column|
| custom_form_column_id| NULL| YES| int(11)| MUL| | ID of the custom form column|
| options| NULL| YES| longtext| | | Option settings|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
A table that manages the extended login settings, such as SSO authentication and two-factor authentication.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| login_view_name| | NO| varchar(255)| | | Login setting display name|
| login_type| | NO| varchar(255)| | | Login type|
| active_flg| 0| NO| tinyint(1)| | | 1: Enabled|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Login type | Comment | 
|---|---|---|
| oauth_provider_type| OAuth| Provider Type| 
| oauth_provider_name| OAuth| Provider Name| 
| oauth_client_id| OAuth| Client ID| 
| oauth_client_secret| OAuth| Client Secret| 
| oauth_scope| OAuth| Scope| 
| oauth_redirect_url| OAuth| Redirect URL| 
| saml_name| SAML| SAML Name| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| IdP Sign-on URL| 
| saml_idp_ssout_url| SAML| IdP Sign-out URL| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1: Encrypt the NameID sent by the SP| 
| saml_option_authn_request_signed| SAML| 1: Sign the authentication requests sent by the SP| 
| saml_option_logout_request_signed| SAML| 1: Sign the logout requests sent by the SP| 
| saml_option_logout_response_signed| SAML| 1: Sign the logout responses sent by the SP| 
| saml_option_proxy_vars| SAML| 1: A reverse proxy or the like is used| 
| ldap_name| LDAP| LDAP Name| 
| ldap_hosts| LDAP| Host Name| 
| ldap_port| LDAP| Port No| 
| ldap_base_dn| LDAP| Base DN| 
| ldap_search_key| LDAP| Search Key| 
| ldap_account_prefix| LDAP| Login Code Prefix| 
| ldap_account_suffix| LDAP| Login Code Suffix| 
| ldap_use_ssl| LDAP| 1: Use SSL| 
| ldap_use_tls| LDAP| 1: Use TLS| 
| mapping_column_XX| Common| Mapping setting (XX is a field name of the user table)| 
| mapping_user_column| Common| Account Search Column| 
| sso_jit| Common| 1: Create User| 
| jit_rolegroups| Common| Role group given when a user is created| 
| update_user_info| Common| 1: Update User Info| 
| login_button_label| Common| Button Display Name| 
| login_button_icon| SAML, OAuth| Button icon| 
| login_button_background_color| Common| Background color of the button| 
| login_button_background_color_hover| Common| Background color of the button (hover)| 
| login_button_font_color| Common| Font color of the button| 
| login_button_font_color_hover| Common| Font color of the button (hover)| 

## login_users
A table that manages the login information of users.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| base_user_id| | NO| int(10) unsigned| MUL| | User ID|
| login_type| 'pure'| NO| varchar(255)| MUL| | Type of the login (normal, OAuth, SAML, etc.)|
| login_provider| NULL| YES| varchar(32)| | | Type of the login provider|
| password_reset_flg| 0| NO| tinyint(1)| | | 1: Reset the password|
| password| | NO| varchar(1000)| | | Password|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | URI of the avatar image|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
A table that manages the state of the database migrations.  
<span class="red bold">Note: Never delete it or change its contents.</span>
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| migration| | NO| varchar(255)| | | Migration file name|
| batch| | NO| int(11)| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
A table that manages the notification settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| target_id| NULL| YES| int(10) unsigned| MUL| | ID of the notification target (custom table, workflow)|
| notify_name| NULL| YES| varchar(256)| | | Notification name (alphanumeric)|
| notify_view_name| | NO| varchar(256)| | | Notification display name|
| active_flg| 1| NO| tinyint(1)| | | 1: Enabled|
| custom_table_id| | NO| int(10) unsigned| | | (To be removed)|
| workflow_id| NULL| YES| int(10) unsigned| | | (To be removed)|
| custom_view_id| NULL| YES| int(10) unsigned| | | ID of the filter view|
| notify_trigger| | NO| int(11)| | | Trigger|
| trigger_settings| NULL| YES| longtext| | | Trigger settings (see the table below)|
| notify_actions| NULL| YES| varchar(50)| | | (To be removed)|
| action_settings| NULL| YES| longtext| | | Notification action settings (see the table below)|
| mail_template_id| NULL| YES| int(11)| | | Notification template ID|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### Trigger settings
| Key | Comment | 
|---|---|
| notify_target_column| ID of the date target column| 
| notify_target_table_id| Table ID of the date target column| 
| view_pivot_column_id| ID of the reference key column| 
| view_pivot_table_id| Table ID of the reference key column| 
| notify_day| Notification date (the value to add or subtract)| 
| notify_beforeafter| Before and After Notification (-1: before, 1: after)| 
| notify_hour| Notification Time| 
| notify_saved_trigger| Notify Trigger Setting| 
| notify_myself| 1: Notify the worker| 
| notify_button_name| Button Display Name| 

#### Notification action settings
| Key | Comment | 
|---|---|
| notify_action| Action (*)| 
| notify_action_target| Notify Target| 
| webhook_url| Webhook URL| 
| mention_here| 1: Notify all members| 
| target_emails| Destination email address| 

*) 1: Email, 2: In-system alert, 3: Slack, 4: Microsoft Teams

## notify_navbars
A table that stores the notification data shown in the navigation bar and the notification list.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| notify_id| | NO| int(10) unsigned| MUL| | ID of the notification setting|
| parent_type| NULL| YES| varchar(255)| MUL| | Table name of the target data (alphanumeric)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID of the target data|
| target_user_id| | NO| int(10) unsigned| MUL| | ID of the user to notify|
| trigger_user_id| NULL| YES| int(10) unsigned| | | ID of the user who did the operation that triggered the notification|
| notify_subject| NULL| YES| varchar(200)| | | Notification subject|
| notify_body| NULL| YES| varchar(2000)| | | Notification body|
| read_flg| 0| NO| tinyint(1)| MUL| | 1: Read|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| expires_at| NULL| YES| datetime| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
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
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
A table that stores the password change history.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| login_user_id| | NO| int(10) unsigned| MUL| | ID of the target user|
| password| | NO| varchar(1000)| | | Password|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
Manages the temporary data used when a password reset is run.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | Email address|
| token| | NO| varchar(255)| | | Temporary access token|
| created_at| NULL| YES| timestamp| | | Created date and time|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
A table that manages plugins.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| uuid| | NO| varchar(255)| UNI| | Unique random string|
| plugin_name| | NO| varchar(256)| MUL| | Plugin name (alphanumeric)|
| plugin_view_name| | NO| varchar(256)| | | Plugin display name|
| author| NULL| YES| varchar(256)| | | Author|
| plugin_types| NULL| YES| varchar(255)| | | Type of the plugin|
| version| NULL| YES| varchar(128)| | | Version|
| description| NULL| YES| varchar(1000)| | | Description|
| active_flg| 1| NO| tinyint(1)| | | 1: Enabled|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| custom_options| NULL| YES| longtext| | | Custom option settings|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### Option settings
| Key | Type of the plugin | Comment | 
|---|---|---|
| target_tables| Button, Event, Trigger, Document, Import, Export, Validation, View| Target table name (alphanumeric)| 
| event_triggers| Button, Event, Trigger| Trigger| 
| icon| Page, View, Button, Trigger, Document, Export| Button icon| 
| label| Page, View, Button, Trigger, Document, Export| Button label| 
| button_class| Page, View, Button, Trigger, Document| HTML class of the button| 
| uri| API, Page| URI| 
| endpoint_page| Page| Endpoint(Page)| 
| endpoint_api| API| Endpoint(API)| 
| batch_hour| Batch| Batch execution time(hour)| 
| batch_cron| Batch| Batch execution cron| 
| command_only| Batch| 1: Run by command only| 
| grid_menu_title| View| Title in Menu| 
| grid_menu_description| View| Description in Menu| 
| all_user_enabled| Page, Trigger, Document, API, Dashboard, Import, Export, Button| 1: All user can use| 
| export_types| Export| Export Type| 
| export_description| Export| Description| 

## public_forms
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| uuid| | NO| char(36)| UNI| | Unique random string|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID of the custom form|
| public_form_view_name| | NO| varchar(256)| | | Public form display name|
| active_flg| 0| NO| tinyint(1)| | | 1: Enabled|
| proxy_user_id| | NO| int(10) unsigned| MUL| | ID of the executing user|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### Option settings
| Key | Tab | Comment | 
|---|---|---|
| validity_period_start| Basic Setting| Publication expiration date (from)| 
| validity_period_end| Basic Setting| Publication expiration date (to)| 
| use_header| Design settings| 1: Use header| 
| header_background_color| Design settings| Header-Background color| 
| header_logo| Design settings| Header Logo| 
| header_label| Design settings| Header string| 
| header_text_color| Design settings| Header text color| 
| background_color_outer| Design settings| Background color-Outer frame| 
| background_color| Design settings| Background color| 
| use_footer| Design settings| 1: Use footer| 
| footer_label| Design settings| Footer string| 
| footer_text_color| Design settings| Footer text color| 
| use_confirm| Answer confirmation / completion setting| 1: Use answer confirmation| 
| confirm_title| Answer confirmation / completion setting| Confirm Title| 
| confirm_text| Answer confirmation / completion setting| Confirm Text| 
| complete_title| Answer confirmation / completion setting| Completion Title| 
| complete_text| Answer confirmation / completion setting| Completion Text| 
| complete_link_url| Answer confirmation / completion setting| Completion link URL| 
| complete_link_text| Answer confirmation / completion setting| Completion link text| 
| use_notify_complete_user| Answer confirmation / completion setting| 1: Notify general users of completion| 
| use_notify_complete_admin| Answer confirmation / completion setting| 1: Notify administrator of completion| 
| error_title| Error Settings| Error Title| 
| error_text| Error Settings| Error Text| 
| error_link_url| Error Settings| Error link URL| 
| error_link_text| Error Settings| Error link text| 
| use_notify_error| Error Settings| 1: Notify an error| 
| custom_css| CSS / Javascript| Custom CSS| 
| plugin_css| CSS / Javascript| Plugin(CSS)| 
| custom_js| CSS / Javascript| Custom Javascript| 
| plugin_js| CSS / Javascript| Plugin(Javascript)| 
| use_default_query| Option Setting| 1: Make the initial value settable from the URL| 
| analytics_tag| Option Setting| Google analytics| 
| use_recaptcha| Option Setting| 1: Use Google reCAPTCHA| 

## revisions
A table that stores the update history.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| revisionable_type| | NO| varchar(255)| | | Target table name (alphanumeric)|
| revisionable_id| | NO| int(11)| MUL| | ID of the target data|
| revision_no| 0| NO| int(10) unsigned| | | Revision No|
| key| | NO| varchar(255)| MUL| | Key of the target item|
| old_value| NULL| YES| text| | | Value before the change|
| new_value| NULL| YES| text| | | Value after the change|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| deleted_at| NULL| YES| timestamp| | | Deleted date and time|
| create_user_id| NULL| YES| int(11)| | | Created user ID|
| delete_user_id| NULL| YES| int(11)| | | Deleted user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
A table that manages role groups.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| role_group_name| | NO| varchar(256)| UNI| | Role group name (alphanumeric)|
| role_group_view_name| | NO| varchar(256)| | | Role group display name|
| description| NULL| YES| varchar(1000)| | | Description|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
A child table of the role group. It manages the permission settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| role_group_id| | NO| int(10) unsigned| MUL| | Role group ID|
| role_group_permission_type| | NO| varchar(255)| MUL| | Type of the permission (*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID of the permission target item|
| permissions| NULL| YES| longtext| | | Permitted operations|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

*) 0: system, 1: table, 3: plugin

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
A child table of the role group. It manages the users and organizations that belong to the role group.

### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| role_group_id| | NO| int(10) unsigned| MUL| | Role group ID|
| role_group_user_org_type| | NO| varchar(255)| MUL| | User / organization class|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID of the target user or organization|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
A table that manages the system settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | System setting name (alphanumeric)|
| system_value| NULL| YES| text| | | Setting value|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
A table that manages the settings of each login user.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| base_user_id| | NO| int(10) unsigned| MUL| | User ID|
| settings| NULL| YES| longtext| | | Setting values|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
A table that manages the workflow settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| workflow_type| 0| NO| int(11)| | | Workflow type (0: common, 1: for one table)|
| workflow_view_name| | NO| varchar(30)| | | Workflow display name|
| start_status_name| | NO| varchar(30)| | | Start status name|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1: Setting completed|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### Option settings
| Key | Comment | 
|---|---|
| workflow_edit_flg| 1: Give the edit permission to the next work user| 

## workflow_actions
A child table of the workflow setting. It manages the action settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow ID|
| status_from| | NO| varchar(255)| | | Status before execution (start or an ID)|
| action_name| | NO| varchar(30)| | | Action name|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1: Special action|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| deleted_at| NULL| YES| timestamp| | | Deleted date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### Option settings
| Key | Comment | 
|---|---|
| work_target_type| How the work users are specified (action_select: chosen by the user who ran the previous action, fix: set in advance, get_by_userinfo: taken from the information of the executing user)| 
| comment_type| Comment type (required: required, nullable: optional, not_use: not used)| 
| flow_next_type| Condition to advance to next status (some: run by X or more people, all: run by everyone)| 
| flow_next_count| Number of people needed to advance to the next status| 

## workflow_authorities
A child table of the workflow action setting. It manages the users who can run the action.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID of the target|
| related_type| | NO| varchar(255)| | | Type of the target (user, organization, custom column, system)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID of the action setting|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
A child table of the workflow action setting. It manages the action branch settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID of the action setting|
| status_to| | NO| varchar(255)| | | Status ID after execution|
| enabled_flg| 0| NO| tinyint(1)| | | 1: Enabled|
| options| NULL| YES| longtext| | | Option settings (see the table below)|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### Option settings
| Key | Comment | 
|---|---|
| condition_join| How the conditions are joined (and, or)| 

## workflow_statuses
A child table of the workflow setting. It manages the status settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow ID|
| status_type| 0| NO| int(10) unsigned| MUL| | (To be removed)|
| order| | NO| int(10) unsigned| MUL| | Order|
| status_name| | NO| varchar(30)| | | Status name|
| datalock_flg| 0| NO| tinyint(1)| | | 1: Data cannot be edited|
| completed_flg| 0| NO| tinyint(1)| | | 1: Completed status|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
A child table of the workflow setting. It manages the usage settings.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow ID|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | ID of the target custom table|
| active_flg| 0| NO| tinyint(1)| | | 1: Use|
| active_start_date| NULL| YES| date| | | Start date of use|
| active_end_date| NULL| YES| date| | | End date of use|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
A table that manages the workflow execution history of each data.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primary key|
| suuid| | NO| varchar(20)| MUL| | Random string of 20 characters|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow ID|
| morph_type| | NO| varchar(255)| MUL| | Polymorphic key (type)|
| morph_id| | NO| bigint(20) unsigned| | | Polymorphic key (ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | ID of the action setting|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | Status ID before execution|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | Status ID after execution|
| comment| NULL| YES| varchar(1000)| | | Comment|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1: Workflow in progress|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1: Latest data|
| created_at| NULL| YES| timestamp| | | Created date and time|
| updated_at| NULL| YES| timestamp| | | Updated date and time|
| created_user_id| NULL| YES| int(10) unsigned| | | Created user ID|
| updated_user_id| NULL| YES| int(10) unsigned| | | Updated user ID|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
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
Stores the next work users specified when a workflow was run.
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID of the target|
| related_type| | NO| varchar(255)| | | Type of the target (user, organization, custom column, system)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | ID of the workflow execution history|

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
