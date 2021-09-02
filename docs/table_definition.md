# Database table definition

## admin_menu
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_id| 0| NO| int(11)| | | |
| order| 0| NO| int(11)| | | |
| title| | NO| varchar(50)| | | |
| icon| | NO| varchar(50)| | | |
| uri| NULL| YES| varchar(2000)| | | |
| options| NULL| YES| longtext| | | |
| permission| NULL| YES| varchar(255)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| menu_type| | NO| varchar(255)| | | |
| menu_name| NULL| YES| varchar(255)| | | |
| menu_target| NULL| YES| varchar(255)| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| user_id| | NO| int(11)| MUL| | |
| path| | NO| varchar(255)| | | |
| method| | NO| varchar(10)| | | |
| ip| | NO| varchar(255)| | | |
| input| | NO| text| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| morph_type| | NO| varchar(255)| MUL| | |
| morph_id| | NO| int(10) unsigned| | | |
| condition_type| | NO| int(11)| | | |
| condition_key| | NO| int(11)| | | |
| target_column_id| NULL| YES| int(11)| | | |
| condition_value| NULL| YES| varchar(1024)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_table_id| | NO| int(10) unsigned| MUL| | |
| column_name| | NO| varchar(255)| MUL| | |
| column_view_name| | NO| varchar(255)| | | |
| column_type| | NO| varchar(255)| MUL| | |
| description| NULL| YES| varchar(1000)| | | |
| system_flg| 0| NO| tinyint(1)| | | |
| order| 0| NO| int(11)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_column_multisettings
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_table_id| | NO| int(10) unsigned| | | |
| multisetting_type| 1| NO| int(11)| | | |
| options| NULL| YES| longtext| | | |
| priority| 0| NO| int(10) unsigned| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_copies
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| from_custom_table_id| | NO| int(10) unsigned| MUL| | |
| to_custom_table_id| | NO| int(10) unsigned| MUL| | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_copy_columns
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| custom_copy_id| | NO| int(10) unsigned| MUL| | |
| from_column_type| NULL| YES| int(11)| | | |
| from_column_table_id| NULL| YES| int(10) unsigned| | | |
| from_column_target_id| NULL| YES| int(11)| | | |
| to_column_type| 0| NO| int(11)| | | |
| to_column_table_id| | NO| int(10) unsigned| | | |
| to_column_target_id| | NO| int(11)| | | |
| copy_column_type| 0| NO| int(11)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_table_id| | NO| int(10) unsigned| MUL| | |
| form_view_name| | NO| varchar(256)| | | |
| default_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_form_blocks
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| custom_form_id| | NO| int(10) unsigned| MUL| | |
| form_block_view_name| NULL| YES| varchar(255)| | | |
| form_block_type| | NO| int(11)| | | |
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | |
| available| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| NULL| YES| varchar(20)| MUL| | |
| custom_form_block_id| | NO| int(10) unsigned| MUL| | |
| form_column_type| | NO| int(11)| | | |
| form_column_target_id| NULL| YES| int(11)| | | |
| row_no| 1| NO| int(11)| | | |
| column_no| 1| NO| int(11)| | | |
| width| NULL| YES| int(11)| | | |
| options| NULL| YES| longtext| | | |
| order| 0| NO| int(11)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_form_priorities
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| custom_form_id| | NO| int(10) unsigned| | | |
| order| 0| NO| int(10) unsigned| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## custom_operations
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_table_id| | NO| int(10) unsigned| | | |
| operation_type| NULL| YES| varchar(255)| | | |
| operation_name| | NO| varchar(40)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_operation_columns
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| custom_operation_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_target_id| | NO| int(11)| | | |
| update_value_text| | NO| varchar(1024)| | | |
| operation_column_type| 0| NO| int(11)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

## custom_relations
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | |
| child_custom_table_id| | NO| int(10) unsigned| MUL| | |
| relation_type| 0| NO| int(11)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_relation_values
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| table_name| | NO| varchar(256)| | | |
| table_view_name| | NO| varchar(256)| | | |
| description| NULL| YES| varchar(1000)| | | |
| system_flg| 0| NO| tinyint(1)| | | |
| showlist_flg| 1| NO| tinyint(1)| | | |
| order| 0| NO| int(11)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_values
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| value| NULL| YES| longtext| | | |
| laravel_admin_escape| NULL| YES| varchar(255)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| deleted_at| NULL| YES| timestamp| MUL| | |
| deleted_user_id| NULL| YES| int(10) unsigned| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_values_deleted_at_index| deleted_at| | |
| custom_values_parent_type_parent_id_index| parent_type,parent_id| | |
| custom_values_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_value_authoritables
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_table_id| | NO| int(10) unsigned| MUL| | |
| view_type| 0| NO| int(11)| | | |
| view_kind_type| 0| NO| int(11)| | | |
| view_view_name| | NO| varchar(40)| | | |
| default_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| custom_options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_columns
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_view_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_table_id| | NO| int(10) unsigned| | | |
| view_column_target_id| NULL| YES| int(11)| | | |
| order| 0| NO| int(10) unsigned| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |
| view_column_name| NULL| YES| varchar(40)| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_filters
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| NULL| YES| varchar(20)| MUL| | |
| custom_view_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_table_id| | NO| int(10) unsigned| | | |
| view_column_target_id| NULL| YES| int(11)| | | |
| view_filter_condition| | NO| int(11)| | | |
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | |
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | |
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_grid_filters
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_view_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_table_id| | NO| int(10) unsigned| | | |
| view_column_target_id| NULL| YES| int(11)| | | |
| order| 0| NO| int(10) unsigned| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_sorts
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| NULL| YES| varchar(20)| MUL| | |
| custom_view_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_table_id| | NO| int(10) unsigned| | | |
| view_column_target_id| NULL| YES| int(11)| | | |
| sort| 1| NO| int(11)| | | |
| priority| 0| NO| int(10) unsigned| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_summaries
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| custom_view_id| | NO| int(10) unsigned| MUL| | |
| view_column_type| 0| NO| int(11)| | | |
| view_column_table_id| | NO| int(10) unsigned| | | |
| view_column_target_id| NULL| YES| int(11)| | | |
| view_summary_condition| 0| NO| int(10) unsigned| | | |
| view_column_name| NULL| YES| varchar(40)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## dashboards
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| dashboard_type| 0| NO| int(11)| | | |
| dashboard_name| | NO| varchar(256)| MUL| | |
| dashboard_view_name| | NO| varchar(40)| | | |
| default_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## dashboard_boxes
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| dashboard_id| | NO| int(10) unsigned| MUL| | |
| row_no| | NO| int(11)| MUL| | |
| column_no| | NO| int(11)| MUL| | |
| dashboard_box_view_name| | NO| varchar(40)| | | |
| dashboard_box_type| | NO| varchar(255)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## data_share_authoritables
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

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
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |

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
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | |
| file_type| NULL| YES| int(11)| MUL| | |
| local_dirname| | NO| varchar(255)| MUL| | |
| local_filename| | NO| varchar(255)| MUL| | |
| filename| | NO| varchar(255)| MUL| | |
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| custom_column_id| NULL| YES| int(11)| | | |
| custom_form_column_id| NULL| YES| int(11)| MUL| | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

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
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| login_view_name| | NO| varchar(255)| | | |
| login_type| | NO| varchar(255)| | | |
| active_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## login_users
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| base_user_id| | NO| int(10) unsigned| MUL| | |
| login_type| 'pure'| NO| varchar(255)| MUL| | |
| login_provider| NULL| YES| varchar(32)| | | |
| password_reset_flg| 0| NO| tinyint(1)| | | |
| password| | NO| varchar(1000)| | | |
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | |
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| migration| | NO| varchar(255)| | | |
| batch| | NO| int(11)| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| target_id| NULL| YES| int(10) unsigned| MUL| | |
| notify_name| NULL| YES| varchar(256)| | | |
| notify_view_name| | NO| varchar(256)| | | |
| active_flg| 1| NO| tinyint(1)| | | |
| custom_table_id| | NO| int(10) unsigned| | | |
| workflow_id| NULL| YES| int(10) unsigned| | | |
| custom_view_id| NULL| YES| int(10) unsigned| | | |
| notify_trigger| | NO| int(11)| | | |
| trigger_settings| NULL| YES| longtext| | | |
| notify_actions| NULL| YES| varchar(50)| | | |
| action_settings| NULL| YES| longtext| | | |
| mail_template_id| NULL| YES| int(11)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

## notify_navbars
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| notify_id| | NO| int(10) unsigned| MUL| | |
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| target_user_id| | NO| int(10) unsigned| MUL| | |
| trigger_user_id| NULL| YES| int(10) unsigned| | | |
| notify_subject| NULL| YES| varchar(200)| | | |
| notify_body| NULL| YES| varchar(2000)| | | |
| read_flg| 0| NO| tinyint(1)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

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
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
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
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |

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
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| login_user_id| | NO| int(10) unsigned| MUL| | |
| password| | NO| varchar(1000)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | |
| token| | NO| varchar(255)| | | |
| created_at| NULL| YES| timestamp| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| password_resets_email_index| email| | |

## pivot__6230cca21266dd6c9aa7_b8147e1abf78aed6074e
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## plugins
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| uuid| | NO| varchar(255)| UNI| | |
| plugin_name| | NO| varchar(256)| MUL| | |
| plugin_view_name| | NO| varchar(256)| | | |
| author| NULL| YES| varchar(256)| | | |
| plugin_types| NULL| YES| varchar(255)| | | |
| version| NULL| YES| varchar(128)| | | |
| description| NULL| YES| varchar(1000)| | | |
| active_flg| 1| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| custom_options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

## public_forms
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| uuid| | NO| char(36)| UNI| | |
| custom_form_id| | NO| int(10) unsigned| MUL| | |
| public_form_view_name| | NO| varchar(256)| | | |
| active_flg| 0| NO| tinyint(1)| | | |
| proxy_user_id| | NO| int(10) unsigned| MUL| | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

## revisions
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| revisionable_type| | NO| varchar(255)| | | |
| revisionable_id| | NO| int(11)| MUL| | |
| revision_no| 0| NO| int(10) unsigned| | | |
| key| | NO| varchar(255)| MUL| | |
| old_value| NULL| YES| text| | | |
| new_value| NULL| YES| text| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| deleted_at| NULL| YES| timestamp| | | |
| create_user_id| NULL| YES| int(11)| | | |
| delete_user_id| NULL| YES| int(11)| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| role_group_name| | NO| varchar(256)| UNI| | |
| role_group_view_name| | NO| varchar(256)| | | |
| description| NULL| YES| varchar(1000)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| role_group_id| | NO| int(10) unsigned| MUL| | |
| role_group_permission_type| | NO| varchar(255)| MUL| | |
| role_group_target_id| NULL| YES| int(11)| MUL| | |
| permissions| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| role_group_id| | NO| int(10) unsigned| MUL| | |
| role_group_user_org_type| | NO| varchar(255)| MUL| | |
| role_group_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | |
| system_value| NULL| YES| text| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## users
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| name| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| UNI| | |
| email_verified_at| NULL| YES| timestamp| | | |
| password| | NO| varchar(255)| | | |
| remember_token| NULL| YES| varchar(100)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| users_email_unique| email| UNIQUE| |

## user_settings
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| base_user_id| | NO| int(10) unsigned| MUL| | |
| settings| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## view_workflow_start（VIEW）
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| workflow_id| 0| NO| int(10) unsigned| | | |
| workflow_table_id| NULL| YES| int(10) unsigned| | | |
| workflow_action_id| 0| NO| int(10) unsigned| | | |
| authority_related_id| | NO| varchar(255)| | | |
| authority_related_type| | NO| varchar(255)| | | |

## view_workflow_value_unions（VIEW）
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| workflow_value_id| 0| NO| int(10) unsigned| | | |
| workflow_id| 0| NO| int(10) unsigned| | | |
| workflow_table_id| NULL| YES| int(10) unsigned| | | |
| custom_value_id| 0| NO| bigint(20) unsigned| | | |
| custom_value_type| ''| NO| varchar(255)| | | |
| workflow_action_id| 0| NO| int(10) unsigned| | | |
| authority_related_id| ''| NO| varchar(255)| | | |
| authority_related_type| ''| NO| varchar(255)| | | |

## workflows
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| workflow_type| 0| NO| int(11)| | | |
| workflow_view_name| | NO| varchar(30)| | | |
| start_status_name| | NO| varchar(30)| | | |
| setting_completed_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

## workflow_actions
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| workflow_id| | NO| int(10) unsigned| MUL| | |
| status_from| | NO| varchar(255)| | | |
| action_name| | NO| varchar(30)| | | |
| ignore_work| 0| NO| tinyint(1)| MUL| | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| deleted_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

## workflow_authorities
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | |
| related_type| | NO| varchar(255)| | | |
| workflow_action_id| | NO| int(10) unsigned| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| workflow_action_id| | NO| int(10) unsigned| MUL| | |
| status_to| | NO| varchar(255)| | | |
| enabled_flg| 0| NO| tinyint(1)| | | |
| options| NULL| YES| longtext| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

## workflow_statuses
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| workflow_id| | NO| int(10) unsigned| MUL| | |
| status_type| 0| NO| int(10) unsigned| MUL| | |
| order| | NO| int(10) unsigned| MUL| | |
| status_name| | NO| varchar(30)| | | |
| datalock_flg| 0| NO| tinyint(1)| | | |
| completed_flg| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| workflow_id| | NO| int(10) unsigned| MUL| | |
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | |
| active_flg| 0| NO| tinyint(1)| | | |
| active_start_date| NULL| YES| date| | | |
| active_end_date| NULL| YES| date| | | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| |
| suuid| | NO| varchar(20)| MUL| | |
| workflow_id| | NO| int(10) unsigned| MUL| | |
| morph_type| | NO| varchar(255)| MUL| | |
| morph_id| | NO| bigint(20) unsigned| | | |
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | |
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | |
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | |
| Comment| NULL| YES| varchar(1000)| | | |
| action_executed_flg| 0| NO| tinyint(1)| MUL| | |
| latest_flg| 0| NO| tinyint(1)| MUL| | |
| created_at| NULL| YES| timestamp| | | |
| updated_at| NULL| YES| timestamp| | | |
| created_user_id| NULL| YES| int(10) unsigned| | | |
| updated_user_id| NULL| YES| int(10) unsigned| | | |

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
### Table definition
| Column name | Default | NULL | Type | Key | Other | Comment 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | |
| related_type| | NO| varchar(255)| | | |
| workflow_value_id| | NO| int(10) unsigned| MUL| | |

### INDEX infomation
| INDEX name | INDEX column | UNIQUE |Comment | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
