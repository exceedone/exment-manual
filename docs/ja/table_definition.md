# DBテーブル定義

## admin_menu
サイドバーに表示するメニューを管理するテーブルです。  
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_id| 0| NO| int(11)| | | 親階層のID|
| order| 0| NO| int(11)| | | 並び順|
| title| | NO| varchar(50)| | | メニュー表示名|
| icon| | NO| varchar(50)| | | アイコン|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | 各種オプション|
| permission| NULL| YES| varchar(255)| | | (未使用)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| menu_type| | NO| varchar(255)| | | メニュー種類|
| menu_name| NULL| YES| varchar(255)| | | メニュー名|
| menu_target| NULL| YES| varchar(255)| | | 対象|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
操作ログを保存するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| user_id| | NO| int(11)| MUL| | ユーザーID|
| path| | NO| varchar(255)| | | アクセスしたパス|
| method| | NO| varchar(10)| | | 実行メソッド|
| ip| | NO| varchar(255)| | | IPアドレス|
| input| | NO| text| | | 入力情報・クエリ|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
各種条件を保存するPolymorphicテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| morph_type| | NO| varchar(255)| MUL| | Polymorphicキー(種類)|
| morph_id| | NO| int(10) unsigned| | | Polymorphicキー(ID)|
| condition_type| | NO| int(11)| | | 条件項目の種類(*)|
| condition_key| | NO| int(11)| | | 検索条件の種類キー|
| target_column_id| NULL| YES| int(11)| | | 条件項目のID|
| condition_value| NULL| YES| varchar(1024)| | | 条件値|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 0：カスタム列、1：システム列、2：親ID、3：ワークフロー、4：その他条件

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
カスタム列を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| MUL| | カスタムテーブルのID|
| column_name| | NO| varchar(255)| MUL| | 列名(英数字)|
| column_view_name| | NO| varchar(255)| | | 列表示名|
| column_type| | NO| varchar(255)| MUL| | 列種類|
| description| NULL| YES| varchar(1000)| | | 説明|
| system_flg| 0| NO| tinyint(1)| | | システム管理フラグ|
| order| 0| NO| int(11)| | | 並び順|
| options| NULL| YES| longtext| | | 各種オプション|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_column_multisettings
カスタムテーブルに関連する複数の設定（見出し表示列設定、複合ユニークキー設定、2つの列を比較、データ自動共有設定etc）を管理しています。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| | | カスタムテーブルのID|
| multisetting_type| 1| NO| int(11)| | | 設定の種類(*)|
| options| NULL| YES| longtext| | | 各種オプション設定|
| priority| 0| NO| int(10) unsigned| | | 並び順・優先度|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 1：複合ユニークキー設定、2：見出し表示列設定、3：2つの列を比較、4：データ自動共有設定

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_copies
データコピー設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | コピー元テーブルのID|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | コピー先テーブルのID|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_copy_columns
データコピー設定の子テーブル。対象となるカスタム列を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| custom_copy_id| | NO| int(10) unsigned| MUL| | データコピー設定のID|
| from_column_type| NULL| YES| int(11)| | | コピー元カスタム列の種類|
| from_column_table_id| NULL| YES| int(10) unsigned| | | コピー元カスタム列のテーブルID|
| from_column_target_id| NULL| YES| int(11)| | | コピー元カスタム列のID|
| to_column_type| 0| NO| int(11)| | | コピー先カスタム列の種類|
| to_column_table_id| | NO| int(10) unsigned| | | コピー先カスタム列のテーブルID|
| to_column_target_id| | NO| int(11)| | | コピー先カスタム列のID|
| copy_column_type| 0| NO| int(11)| | | 0：コピー列設定、1：入力ダイアログ設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
カスタムフォームを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| MUL| | カスタムテーブルのID|
| form_view_name| | NO| varchar(256)| | | フォーム表示名|
| default_flg| 0| NO| tinyint(1)| | | 1：既定のフォーム|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_form_blocks
カスタムフォームの子テーブル。フォームブロックを管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| custom_form_id| | NO| int(10) unsigned| MUL| | カスタムフォームのID|
| form_block_view_name| NULL| YES| varchar(255)| | | フォームブロック名|
| form_block_type| | NO| int(11)| | | フォームブロックの種類(*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | 対象カスタムテーブルのID|
| available| 0| NO| tinyint(1)| | | 1：使用する|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 0：デフォルト、1：子テーブル(1対多)、2：子テーブル(多対多)

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
フォームブロックの子テーブル。ブロック内のフォーム項目を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| NULL| YES| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | フォームブロックのID|
| form_column_type| | NO| int(11)| | | フォーム項目の種類(*)|
| form_column_target_id| NULL| YES| int(11)| | | フォーム項目のID|
| row_no| 1| NO| int(11)| | | 配置位置(行No)|
| column_no| 1| NO| int(11)| | | 配置位置(列No)|
| width| NULL| YES| int(11)| | | 列幅|
| options| NULL| YES| longtext| | | 各種オプション設定|
| order| 0| NO| int(11)| | | 表示順|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 0：カスタム列、1：システム列、99：その他項目

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_form_priorities
カスタムフォームの表示優先度を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| custom_form_id| | NO| int(10) unsigned| | | カスタムフォームのID|
| order| 0| NO| int(10) unsigned| | | 優先度判定順|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## custom_operations
データ更新設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| | | カスタムテーブルのID|
| operation_type| NULL| YES| varchar(255)| | | 更新のタイミング|
| operation_name| | NO| varchar(40)| | | 処理の名前|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_operation_columns
データ更新設定の子テーブル。対象列と更新内容を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| custom_operation_id| | NO| int(10) unsigned| MUL| | データ更新設定のID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_target_id| | NO| int(11)| | | 対象列のID|
| update_value_text| | NO| varchar(1024)| | | 更新値|
| operation_column_type| 0| NO| int(11)| | | 0：更新列設定、1：入力ダイアログ設定|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

## custom_relations
カスタムテーブル間のリレーション設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | 親テーブルのID|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | 子テーブルのID|
| relation_type| 0| NO| int(11)| | | 1：1対多<br>2：多対多|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_relation_values
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
カスタムテーブルを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| table_name| | NO| varchar(256)| | | テーブル名(英数字)|
| table_view_name| | NO| varchar(256)| | | テーブル表示名|
| description| NULL| YES| varchar(1000)| | | 説明|
| system_flg| 0| NO| tinyint(1)| | | 1：システムテーブル|
| showlist_flg| 1| NO| tinyint(1)| | | 1：一覧表示する|
| order| 0| NO| int(11)| | | 表示順|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_value_authoritables
データ毎の権限設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_type| NULL| YES| varchar(255)| MUL| | 対象テーブルの英数字名|
| parent_id| NULL| YES| bigint(20) unsigned| | | 対象データのID|
| authoritable_type| | NO| varchar(255)| MUL| | 権限の種類|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | 権限付与対象(ユーザーor組織)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | 権限付与対象のID|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
カスタムビューを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| MUL| | カスタムテーブルのID|
| view_type| 0| NO| int(11)| | | 0：システムビュー<br>1：ユーザービュー|
| view_kind_type| 0| NO| int(11)| | | ビューの種類(*)|
| view_view_name| | NO| varchar(40)| | | ビュー表示名|
| default_flg| 0| NO| tinyint(1)| | | 1：既定のビュー|
| options| NULL| YES| longtext| | | 各種オプション設定|
| custom_options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 0：通常ビュー、1：集計ビュー、2：カレンダービュー、3：条件ビュー、4：プラグイン、9：全件ビュー

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_columns
カスタムビューの子テーブル。表示列を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_view_id| | NO| int(10) unsigned| MUL| | カスタムビューのID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_table_id| | NO| int(10) unsigned| | | 列のテーブルID|
| view_column_target_id| NULL| YES| int(11)| | | 列のID|
| order| 0| NO| int(10) unsigned| | | 表示順|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|
| view_column_name| NULL| YES| varchar(40)| | | 別名表示|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_filters
カスタムビューの子テーブル。データ表示条件を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| NULL| YES| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_view_id| | NO| int(10) unsigned| MUL| | カスタムビューのID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_table_id| | NO| int(10) unsigned| | | 列のテーブルID|
| view_column_target_id| NULL| YES| int(11)| | | 列のID|
| view_filter_condition| | NO| int(11)| | | 検索条件の種類|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | 条件値|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | 条件値のテーブルID|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | 条件値の列ID|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_grid_filters
カスタムビューの子テーブル。ビューの「フィルタ」項目指定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_view_id| | NO| int(10) unsigned| MUL| | カスタムビューのID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_table_id| | NO| int(10) unsigned| | | 列のテーブルID|
| view_column_target_id| NULL| YES| int(11)| | | 列のID|
| order| 0| NO| int(10) unsigned| | | 表示順|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_sorts
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| NULL| YES| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_view_id| | NO| int(10) unsigned| MUL| | カスタムビューのID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_table_id| | NO| int(10) unsigned| | | 列のテーブルID|
| view_column_target_id| NULL| YES| int(11)| | | 列のID|
| sort| 1| NO| int(11)| | | 1：昇順<br>-1：降順|
| priority| 0| NO| int(10) unsigned| | | 優先順位|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## custom_view_summaries
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_view_id| | NO| int(10) unsigned| MUL| | カスタムビューのID|
| view_column_type| 0| NO| int(11)| | | 0：カスタム列<br>1：システム列|
| view_column_table_id| | NO| int(10) unsigned| | | 列のテーブルID|
| view_column_target_id| NULL| YES| int(11)| | | 列のID|
| view_summary_condition| 0| NO| int(10) unsigned| | | 集計タイプ(*)|
| view_column_name| NULL| YES| varchar(40)| | | 別名表示|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*)1：合計、3：件数、4：最小値、5：最大値

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## dashboards
ダッシュボードを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| dashboard_type| 0| NO| int(11)| | | 0：システムダッシュボード、1：ユーザーダッシュボード|
| dashboard_name| | NO| varchar(256)| MUL| | ダッシュボード名(英数字)|
| dashboard_view_name| | NO| varchar(40)| | | ダッシュボード表示名|
| default_flg| 0| NO| tinyint(1)| | | 1：既定のダッシュボード|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## dashboard_boxes
ダッシュボードの子テーブル。ダッシュボード内の表示アイテムを管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| dashboard_id| | NO| int(10) unsigned| MUL| | ダッシュボードのID|
| row_no| | NO| int(11)| MUL| | 行No|
| column_no| | NO| int(11)| MUL| | 列No|
| dashboard_box_view_name| | NO| varchar(40)| | | アイテム表示名|
| dashboard_box_type| | NO| varchar(255)| | | アイテム種類|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

## data_share_authoritables
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
アップロードされたファイルを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | 一意なランダム文字列|
| file_type| NULL| YES| int(11)| MUL| | ファイルの種類|
| local_dirname| | NO| varchar(255)| MUL| | 保管ファイルのディレクトリ名|
| local_filename| | NO| varchar(255)| MUL| | 保管ファイルの名前|
| filename| | NO| varchar(255)| MUL| | 元のファイル名|
| parent_type| NULL| YES| varchar(255)| MUL| | 親データのテーブル名(英数字)|
| parent_id| NULL| YES| bigint(20) unsigned| | | 親データのID|
| custom_column_id| NULL| YES| int(11)| | | カスタム列のID|
| custom_form_column_id| NULL| YES| int(11)| MUL| | カスタムフォーム列のID|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
SSO認証や2段階認証などの拡張ログイン設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| login_view_name| | NO| varchar(255)| | | ログイン設定表示名|
| login_type| | NO| varchar(255)| | | ログイン種類|
| active_flg| 0| NO| tinyint(1)| | | 1：有効|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## login_users
ユーザーのログイン情報を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| base_user_id| | NO| int(10) unsigned| MUL| | ユーザーID|
| login_type| 'pure'| NO| varchar(255)| MUL| | ログインの種類(通常、OAuth、SAML等)|
| login_provider| NULL| YES| varchar(32)| | | ログインプロバイダの種類|
| password_reset_flg| 0| NO| tinyint(1)| | | 1：パスワードをリセットする|
| password| | NO| varchar(1000)| | | パスワード|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | アバター画像のURI|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
データベースのマイグレーション状況を管理するテーブルです。  
<span class="red bold">※削除、内容変更等は絶対に行わないでください。</span>
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| migration| | NO| varchar(255)| | | マイグレーションファイル名|
| batch| | NO| int(11)| | | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
通知設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| target_id| NULL| YES| int(10) unsigned| MUL| | 通知対象のID(カスタムテーブル、ワークフロー)|
| notify_name| NULL| YES| varchar(256)| | | 通知名(英数字)|
| notify_view_name| | NO| varchar(256)| | | 通知表示名|
| active_flg| 1| NO| tinyint(1)| | | 1：有効|
| custom_table_id| | NO| int(10) unsigned| | | (廃止予定)|
| workflow_id| NULL| YES| int(10) unsigned| | | (廃止予定)|
| custom_view_id| NULL| YES| int(10) unsigned| | | 条件ビューのID|
| notify_trigger| | NO| int(11)| | | 実施トリガー|
| trigger_settings| NULL| YES| longtext| | | 実施トリガー設定|
| notify_actions| NULL| YES| varchar(50)| | | (廃止予定)|
| action_settings| NULL| YES| longtext| | | 通知アクション設定|
| mail_template_id| NULL| YES| int(11)| | | 通知テンプレートID|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

## notify_navbars
ナビゲーションバーや通知一覧に表示する通知データを保管するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| notify_id| | NO| int(10) unsigned| MUL| | 通知設定のID|
| parent_type| NULL| YES| varchar(255)| MUL| | 対象データのテーブル名(英数字)|
| parent_id| NULL| YES| bigint(20) unsigned| | | 対象データのID|
| target_user_id| | NO| int(10) unsigned| MUL| | 通知対象ユーザーID|
| trigger_user_id| NULL| YES| int(10) unsigned| | | 通知のトリガーとなる操作を行ったユーザーID|
| notify_subject| NULL| YES| varchar(200)| | | 通知件名|
| notify_body| NULL| YES| varchar(2000)| | | 通知本文|
| read_flg| 0| NO| tinyint(1)| MUL| | 1：既読|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| expires_at| NULL| YES| datetime| | | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
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
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
パスワード変更履歴を保管するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| login_user_id| | NO| int(10) unsigned| MUL| | 対象のユーザーID|
| password| | NO| varchar(1000)| | | パスワード|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
パスワードリセット実行時の一時データを管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | Eメールアドレス|
| token| | NO| varchar(255)| | | 一時的なアクセストークン|
| created_at| NULL| YES| timestamp| | | 作成日時|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
プラグインを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| uuid| | NO| varchar(255)| UNI| | 一意なランダム文字列|
| plugin_name| | NO| varchar(256)| MUL| | プラグイン名(英数字)|
| plugin_view_name| | NO| varchar(256)| | | プラグイン表示名|
| author| NULL| YES| varchar(256)| | | 作者|
| plugin_types| NULL| YES| varchar(255)| | | プラグインの種類|
| version| NULL| YES| varchar(128)| | | バージョン|
| description| NULL| YES| varchar(1000)| | | 説明|
| active_flg| 1| NO| tinyint(1)| | | 1：有効|
| options| NULL| YES| longtext| | | 各種オプション設定|
| custom_options| NULL| YES| longtext| | | カスタムオプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

## public_forms
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| uuid| | NO| char(36)| UNI| | 一意なランダム文字列|
| custom_form_id| | NO| int(10) unsigned| MUL| | カスタムフォームのID|
| public_form_view_name| | NO| varchar(256)| | | 公開フォーム表示名|
| active_flg| 0| NO| tinyint(1)| | | 1：有効|
| proxy_user_id| | NO| int(10) unsigned| MUL| | 実行ユーザーのID|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

## revisions
更新履歴を保管するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| revisionable_type| | NO| varchar(255)| | | 対象テーブル名(英数字)|
| revisionable_id| | NO| int(11)| MUL| | 対象データID|
| revision_no| 0| NO| int(10) unsigned| | | リビジョンNo|
| key| | NO| varchar(255)| MUL| | 対象項目キー|
| old_value| NULL| YES| text| | | 変更前の値|
| new_value| NULL| YES| text| | | 変更後の値|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| deleted_at| NULL| YES| timestamp| | | 削除日時|
| create_user_id| NULL| YES| int(11)| | | 作成ユーザーID|
| delete_user_id| NULL| YES| int(11)| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
役割グループを管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| role_group_name| | NO| varchar(256)| UNI| | 役割グループ名(英数字)|
| role_group_view_name| | NO| varchar(256)| | | 役割グループ表示名|
| description| NULL| YES| varchar(1000)| | | 説明|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
役割グループの子テーブル。権限設定を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| role_group_id| | NO| int(10) unsigned| MUL| | 役割グループID|
| role_group_permission_type| | NO| varchar(255)| MUL| | 権限の種類(*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | 権限対象項目のID|
| permissions| NULL| YES| longtext| | | 許可されている操作|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

*) 0：システム、1：テーブル、3：プラグイン

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
役割グループの子テーブル。役割グループに所属するユーザー、組織を管理します。

### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| role_group_id| | NO| int(10) unsigned| MUL| | 役割グループID|
| role_group_user_org_type| | NO| varchar(255)| MUL| | ユーザー・組織区分|
| role_group_target_id| NULL| YES| int(11)| MUL| | 対象ユーザーまたは組織のID|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
システム設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | システム設定名(英数字)|
| system_value| NULL| YES| text| | | 設定値|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
ログインユーザー毎の設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| base_user_id| | NO| int(10) unsigned| MUL| | ユーザーID|
| settings| NULL| YES| longtext| | | 各種設定値|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
ワークフロー設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| workflow_type| 0| NO| int(11)| | | ワークフロー種類(0：汎用、1：テーブル専用)|
| workflow_view_name| | NO| varchar(30)| | | ワークフロー表示名|
| start_status_name| | NO| varchar(30)| | | 開始ステータス名|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1：設定完了済|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

## workflow_actions
ワークフロー設定の子テーブル。アクション設定を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| workflow_id| | NO| int(10) unsigned| MUL| | ワークフローID|
| status_from| | NO| varchar(255)| | | 実行前ステータス(start又はID)|
| action_name| | NO| varchar(30)| | | アクション名|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1：特殊なアクション|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| deleted_at| NULL| YES| timestamp| | | 削除日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

## workflow_authorities
ワークフローのアクション設定の子テーブル。アクション実行可能なユーザーを管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 対象のID|
| related_type| | NO| varchar(255)| | | 対象の種類(ユーザー、組織、カスタム列、システム)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | アクション設定のID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
ワークフローのアクション設定の子テーブル。アクション分岐設定を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| workflow_action_id| | NO| int(10) unsigned| MUL| | アクション設定のID|
| status_to| | NO| varchar(255)| | | 実行後のステータスID|
| enabled_flg| 0| NO| tinyint(1)| | | 1：有効|
| options| NULL| YES| longtext| | | 各種オプション設定|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

## workflow_statuses
ワークフロー設定の子テーブル。ステータス設定を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| workflow_id| | NO| int(10) unsigned| MUL| | ワークフローID|
| status_type| 0| NO| int(10) unsigned| MUL| | (廃止予定)|
| order| | NO| int(10) unsigned| MUL| | 並び順|
| status_name| | NO| varchar(30)| | | ステータス名|
| datalock_flg| 0| NO| tinyint(1)| | | 1：データの編集不可|
| completed_flg| 0| NO| tinyint(1)| | | 1：完了ステータス|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
ワークフロー設定の子テーブル。利用設定を管理します。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| workflow_id| | NO| int(10) unsigned| MUL| | ワークフローID|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | 対象となるカスタムテーブルのID|
| active_flg| 0| NO| tinyint(1)| | | 1：使用する|
| active_start_date| NULL| YES| date| | | 使用開始日|
| active_end_date| NULL| YES| date| | | 使用終了日|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
個々のデータに対するワークフローの実行履歴を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| workflow_id| | NO| int(10) unsigned| MUL| | ワークフローID|
| morph_type| | NO| varchar(255)| MUL| | Polymorphicキー(種類)|
| morph_id| | NO| bigint(20) unsigned| | | Polymorphicキー(ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | アクション設定のID|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | 実行前のステータスID|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | 実行後のステータスID|
| comment| NULL| YES| varchar(1000)| | | コメント|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1：ワークフロー実行中|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1：最新データ|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
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
ワークフロー実行時に指定された次の作業ユーザーを保管しています。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | 対象のID|
| related_type| | NO| varchar(255)| | | 対象の種類(ユーザー、組織、カスタム列、システム)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | ワークフロー実行履歴のID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
