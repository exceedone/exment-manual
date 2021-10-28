# DBテーブル定義
※随時メンテナンス中です。

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
各種条件を保存するPolymorphicテーブルです。フォーム優先度設定、データ更新設定、ワークフローアクション等の条件を保存します。
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
| options| NULL| YES| longtext| | | 各種オプション(別表)|
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

#### 各種オプション設定
| キー | 対象となる列種類 |コメント | 
|---|---|---|
| required| 共通| 1：必須| 
| index_enabled| 共通| 1：検索インデックス| 
| freeword_search| 検索インデックス列のみ| 1：フリーワード検索対象| 
| unique| 共通| 1：ユニーク(一意)| 
| init_only| 共通| 1：1度のみ入力| 
| placeholder| 共通| 1：プレースホルダー| 
| help| 共通| 1：ヘルプ| 
| min_width| 共通| 列幅(最小値)| 
| max_width| 共通| 列幅(最大値)| 
| default| 共通(ファイル・画像は除く)| 初期値| 
| string_length| テキスト項目| 最大文字数| 
| available_characters| 1行テキスト| 使用可能文字| 
| suggest_input| 1行テキスト| 1：サジェスト入力する| 
| regex_validate| 1行テキスト| 正規表現(エキスパートモード時のみ表示)| 
| rows| 複数行テキスト| 高さ(行数)| 
| number_min| 数値項目| 最小値| 
| number_max| 数値項目| 最大値| 
| number_format| 数値項目| 数値 カンマ文字列| 
| calc_formula| 数値項目| 計算式| 
| updown_button| 整数| 1：+-ボタンを表示する| 
| decimal_digit| 小数、通貨| 小数点以下の桁数| 
| percent_format| 小数| パーセント表示| 
| currency_symbol| 通貨| 通貨の表示形式| 
| default_type| 日付関連項目、ユーザー| 初期値種類| 
| datetime_now_saving| 日付関連項目| 1：保存時に実行日時を登録| 
| datetime_now_creating| 日付関連項目| 1：作成時に実行日時を登録| 
| auto_number_type| 自動採番| 採番種類| 
| auto_number_format| 自動採番| 採番フォーマット| 
| select_item| 選択肢| 選択肢| 
| select_item_valtext| 選択肢(値・見出し)| 選択肢| 
| check_radio_enabled| 選択肢、選択肢(値・見出し)| 1：ラジオボタン・チェックボックス形式で表示| 
| free_input| 選択肢| 1：自由に入力可能にする| 
| select_target_table| 選択肢(他テーブル)| 対象テーブル| 
| select_target_view| 選択肢(他テーブル)、ユーザー、組織| 絞り込み条件ビュー| 
| select_import_column_id| 選択肢(他テーブル)、ユーザー、組織| インポート時のキー列| 
| select_export_column_id| 選択肢(他テーブル)、ユーザー、組織| エクスポート時のキー列| 
| select_load_ajax| 選択肢(他テーブル)、ユーザー、組織| 1：選択肢を都度検索する| 
| checkbox_enabled| YES/NO| 1：チェックボックス形式で表示| 
| required_yes| YES/NO| 1：YES必須| 
| true_value| 2値の選択| 選択肢1のときの値| 
| true_label| 2値の選択| 選択肢1のときの表示| 
| false_value| 2値の選択| 選択肢2のときの値| 
| false_label| 2値の選択| 選択肢2のときの表示| 
| multiple_enabled| ファイル項目、選択肢項目、ユーザー、組織| 1：複数選択を許可する| 
| accept_extensions| ファイル項目| アップロード許可する拡張子| 
| showing_all_user_organizations| ユーザー、組織| 権限をもたないユーザー・組織も表示する| 


## custom_column_multisettings
カスタムテーブルに関連する複数の設定（見出し表示列設定、複合ユニークキー設定、2つの列を比較、データ自動共有設定etc）を管理しています。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| custom_table_id| | NO| int(10) unsigned| | | カスタムテーブルのID|
| multisetting_type| 1| NO| int(11)| | | 設定の種類(*)|
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | 対象となる設定 |コメント | 
|---|---|---|
| unique1_id| 複合ユニークキー設定| 複合ユニークキー１| 
| unique2_id| 複合ユニークキー設定| 複合ユニークキー２| 
| unique3_id| 複合ユニークキー設定| 複合ユニークキー３| 
| table_label_id| 見出し表示列設定| 対象列のID| 
| compare_column1_id| 2つの列を比較| 検証列(A)| 
| compare_column2_id| 2つの列を比較| 比較列(B)| 
| compare_type| 2つの列を比較| 条件| 
| share_trigger_type| データ自動共有設定| トリガー(1：新規作成時、2：更新時)| 
| share_column_id| データ自動共有設定| 対象列のID| 
| share_permission| データ自動共有設定| 対象の権限(1：編集、2：閲覧)| 

## custom_copies
データコピー設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| suuid| | NO| varchar(20)| MUL| | 20桁のランダム文字列|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | コピー元テーブルのID|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | コピー先テーブルのID|
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| label| ボタンのラベル| 
| icon| ボタンのアイコン| 
| button_class| ボタンのHTML class| 
| child_copy| 子テーブル設定| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| form_label_type| 見出し表示方法| 
| show_grid_type| 詳細画面表示方法| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | 対象項目 | コメント | 
|---|---|---|
| form_column_view_name| カスタム列| フィールド表示名| 
| field_label_type| カスタム列| 見出し表示方法| 
| field_showing_type| カスタム列| フィールド種類| 
| required| カスタム列| 1：必須項目| 
| default_type| カスタム列| 初期値種類| 
| default| カスタム列| 初期値| 
| help| カスタム列| ヘルプ| 
| changedata_target_column_id| カスタム列| データ連動設定(対象列のID)| 
| changedata_column_id| カスタム列| データ連動設定(リンク列のID)| 
| relation_filter_target_column_id| カスタム列| 関連絞り込み(対象列のID)| 
| html| HTML、拡張HTML| HTML| 
| text| 見出し、説明文| テキスト| 
| append_hr| 見出し| 1：罫線を引く| 
| image_aslink| 画像| 1：画像をリンクとして表示| 

## custom_form_priorities
カスタムフォームの表示優先度を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| custom_form_id| | NO| int(10) unsigned| | | カスタムフォームのID|
| order| 0| NO| int(10) unsigned| | | 優先度判定順|
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| condition_join| 条件の結合(and,or)| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| button_label| ボタンのラベル| 
| button_icon| ボタンのアイコン| 
| button_class| ボタンのHTML class| 
| condition_join| 条件の結合(and,or)| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| operation_update_type| 更新の種類(default：固定値、system：システム値)| 

## custom_relations
カスタムテーブル間のリレーション設定を管理するテーブルです。
### テーブル定義
| 列名 | デフォルト | NULL | 型 | キー | その他 | コメント 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| 主キー|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | 親テーブルのID|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | 子テーブルのID|
| relation_type| 0| NO| int(11)| | | 1：1対多<br>2：多対多|
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| parent_import_column_id| インポート時のキー列のID| 
| parent_export_column_id| エクスポート時のキー列のID| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| color| 色| 
| icon| アイコン| 
| search_enabled| 1：検索可能| 
| use_label_id_flg| IDをラベルに使用する| 
| one_record_flg| 1：1件のみ登録可能| 
| attachment_flg| 1：添付ファイルを使用する| 
| comment_flg| 1：コメントを使用する| 
| revision_flg| 1：データ変更履歴を使用する| 
| revision_count| 変更履歴バージョン数| 
| all_user_editable_flg| 1：全ユーザーが編集可能| 
| all_user_viewable_flg| 1：全ユーザーが閲覧可能| 
| all_user_accessable_flg| 1：全ユーザーが参照可能| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| custom_options| NULL| YES| longtext| | | プラグインで使用するオプション設定|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| use_view_infobox| 1：ビューの情報ボックスを使用する| 
| view_infobox_title| 情報ボックス-タイトル| 
| view_infobox| 情報ボックス-本文| 
| pager_count| 表示件数| 
| condition_join| 条件の結合(and,or)| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | ビューの種類 | コメント | 
|---|---|---|
| view_pivot_column_id| 共通| 参照キー列のID| 
| view_pivot_table_id| 共通| 参照キー列のテーブルID| 
| view_group_condition| 集計ビュー| 列タイプ| 
| sort_order| 集計ビュー| 並べ替え| 
| sort_type| 集計ビュー| 並び順(1：昇順、-1：降順)| 
| color| カレンダービュー| 表示色| 
| font_color| カレンダービュー| 文字色| 
| end_date_target| カレンダービュー| 終了日の列ID| 
| end_date_type| カレンダービュー| 終了日の列種類| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| view_pivot_column_id| 参照キー列のID| 
| view_pivot_table_id| 参照キー列のテーブルID| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| view_pivot_column_id| 参照キー列のID| 
| view_pivot_table_id| 参照キー列のテーブルID| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| view_pivot_column_id| 参照キー列のID| 
| view_pivot_table_id| 参照キー列のテーブルID| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| view_pivot_column_id| 参照キー列のID| 
| view_pivot_table_id| 参照キー列のテーブルID| 
| sort_order| 並べ替え| 
| sort_type| 並び順(1：昇順、-1：降順)| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| row1| ダッシュボード1行目の列数| 
| row2| ダッシュボード2行目の列数| 
| row3| ダッシュボード3行目の列数| 
| row4| ダッシュボード4行目の列数| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | ダッシュボードの種類 | コメント | 
|---|---|---|
| target_table_id| 共通(システムを除く)| 対象のテーブル| 
| target_view_id| 共通(システムを除く)| 対象のビュー| 
| pager_count| データ一覧| 表示(システムに合わせるor表示件数)| 
| target_system_id| システム| 表示アイテム(*)| 
| content| システム| エディター本文| 
| html| システム| HTML| 
| chart_type| チャート| チャート種類| 
| chart_axisx| チャート| X軸の項目| 
| chart_axisy| チャート| Y軸の項目| 
| chart_axis_label| チャート| ラベルを表示する(1：X軸、2：Y軸)| 
| chart_axis_name| チャート| 項目名を表示する(1：X軸、2：Y軸)| 
| chart_options| チャート| オプション設定(1：０を起点にする、2：凡例を表示する)| 
| calendar_type| カレンダー| カレンダーの種類(月別、リスト)| 

*) 1：ガイドライン、2：Exment新着情報一覧、3：エディター、4：HTML

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### 各種オプション設定
| キー | ログイン種類 | コメント | 
|---|---|---|
| oauth_provider_type| OAuth| プロバイダ種類| 
| oauth_provider_name| OAuth| プロバイダ種類(英数字)| 
| oauth_client_id| OAuth| クライアントID| 
| oauth_client_secret| OAuth| クライアントシークレット| 
| oauth_scope| OAuth| スコープ| 
| oauth_redirect_url| OAuth| リダイレクトURL| 
| saml_name| SAML| SAML名(英数字)| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| IdP サインオンURL| 
| saml_idp_ssout_url| SAML| IdP サインアウトURL| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1：SPによって送信するNameIDを暗号化する| 
| saml_option_authn_request_signed| SAML| 1：SPによって送信する認証リクエストを署名する| 
| saml_option_logout_request_signed| SAML| 1：SPによって送信するログアウトリクエストを署名する| 
| saml_option_logout_response_signed| SAML| 1：SPによって送信するログアウトレスポンスを署名する| 
| saml_option_proxy_vars| SAML| 1：リバースプロキシなどを使用している| 
| ldap_name| LDAP| LDAP名(英数字)| 
| ldap_hosts| LDAP| ホスト名| 
| ldap_port| LDAP| ホスト名| 
| ldap_base_dn| LDAP| 基本DN(識別名)| 
| ldap_search_key| LDAP| ユーザー検索属性| 
| ldap_account_prefix| LDAP| ログインコード接頭辞| 
| ldap_account_suffix| LDAP| ログインコード接尾辞| 
| ldap_use_ssl| LDAP| 1：SSLを使用する| 
| ldap_use_tls| LDAP| 1：TSLを使用する| 
| mapping_column_XX| 共通| マッピング設定(XX部分はユーザーテーブルのフィールド名)| 
| mapping_user_column| 共通| アカウント検索列| 
| sso_jit| 共通| 1：ユーザー新規作成| 
| jit_rolegroups| 共通| ユーザー作成時に付与する役割グループ| 
| update_user_info| 共通| 1：ユーザー情報を更新する| 
| login_button_label| 共通| ボタン表示名| 
| login_button_icon| SAML、OAuth| ボタンアイコン| 
| login_button_background_color| 共通| ボタンの背景色| 
| login_button_background_color_hover| 共通| ボタンの背景色(オンマウス)| 
| login_button_font_color| 共通| ボタンの文字色| 
| login_button_font_color_hover| 共通| ボタンの文字色(オンマウス)| 

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
| trigger_settings| NULL| YES| longtext| | | 実施トリガー設定(別表)|
| notify_actions| NULL| YES| varchar(50)| | | (廃止予定)|
| action_settings| NULL| YES| longtext| | | 通知アクション設定(別表)|
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

#### 実施トリガー設定
| キー | コメント | 
|---|---|
| notify_target_column| 日付対象列のID| 
| notify_target_table_id| 日付対象列のテーブルID| 
| view_pivot_column_id| 参照キー列のID| 
| view_pivot_table_id| 参照キー列のテーブルID| 
| notify_day| 通知日(加減する値)| 
| notify_beforeafter| 通知前後(-1：前、1：後)| 
| notify_hour| 通知時間| 
| notify_saved_trigger| 通知条件設定| 
| notify_myself| 1：作業実施者にも通知する| 
| notify_button_name| ボタン表示名| 

#### 通知アクション設定
| キー | コメント | 
|---|---|
| notify_action| 実施アクション(*)| 
| notify_action_target| 通知対象| 
| webhook_url| Webhook URL| 
| mention_here| 1：メンバー全員に通知を実施| 
| target_emails| 送信先メールアドレス| 

*) 1：Eメール、2：システム内アラート、3：Slack通知、4：Microsoft Teams通知

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | プラグインの種類 | コメント | 
|---|---|---|
| target_tables| ボタン、イベント、トリガー、ドキュメント、インポート、エクスポート、バリエーション、ビュー| 対象テーブル名(英数字)| 
| event_triggers| ボタン、イベント、トリガー| 実施トリガー| 
| icon| ページ、ビュー、ボタン、トリガー、ドキュメント、エクスポート| ボタンのアイコン| 
| label| ページ、ビュー、ボタン、トリガー、ドキュメント、エクスポート| ボタンのラベル| 
| button_class| ページ、ビュー、ボタン、トリガー、ドキュメント| ボタンのHTML class| 
| uri| API、ページ| URI| 
| endpoint_page| ページ| エンドポイント(ページ)| 
| endpoint_api| API| エンドポイント(API)| 
| batch_hour| バッチ| バッチの実行時間(時)| 
| batch_cron| バッチ| バッチ実行cron| 
| command_only| バッチ| 1：コマンド実行限定| 
| grid_menu_title| ビュー| メニューでのタイトル| 
| grid_menu_description| ビュー| メニューでの説明文| 
| all_user_enabled| ページ、トリガー、ドキュメント、API、ダッシュボード、インポート、エクスポート、ボタン| 1：すべてのユーザーが利用可能| 
| export_types| エクスポート| エクスポートの種類| 
| export_description| エクスポート| 説明文| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | タブ | コメント | 
|---|---|---|
| validity_period_start| 基本設定| 公開有効期限(from)| 
| validity_period_end| 基本設定| 公開有効期限(to)| 
| use_header| デザイン設定| 1：ヘッダーを使用する| 
| header_background_color| デザイン設定| ヘッダー-背景色| 
| header_logo| デザイン設定| ヘッダー-ロゴ| 
| header_label| デザイン設定| ヘッダー文字列| 
| header_text_color| デザイン設定| ヘッダー文字色| 
| background_color_outer| デザイン設定| 背景色-外枠| 
| background_color| デザイン設定| 背景色| 
| use_footer| デザイン設定| 1：フッターを使用する| 
| footer_label| デザイン設定| フッター文字列| 
| footer_text_color| デザイン設定| フッター文字色| 
| use_confirm| 回答確認・完了設定| 1：回答確認を使用する| 
| confirm_title| 回答確認・完了設定| 確認タイトル| 
| confirm_text| 回答確認・完了設定| 確認テキスト| 
| complete_title| 回答確認・完了設定| 完了タイトル| 
| complete_text| 回答確認・完了設定| 完了テキスト| 
| complete_link_url| 回答確認・完了設定| 完了リンク先URL| 
| complete_link_text| 回答確認・完了設定| 完了リンク先テキスト| 
| use_notify_complete_user| 回答確認・完了設定| 1：完了通知を一般ユーザーに行う| 
| use_notify_complete_admin| 回答確認・完了設定| 完了テキスト| 
| use_notify_error| 回答確認・完了設定| 完了テキスト| 
| error_title| エラー設定| エラータイトル| 
| error_text| エラー設定| エラーテキスト| 
| error_link_url| エラー設定| エラーリンク先URL| 
| error_link_text| エラー設定| エラーリンク先テキスト| 
| use_notify_error| エラー設定| 1：エラー通知を行う| 
| custom_css| CSS・Javascript| カスタムCSS| 
| plugin_css| CSS・Javascript| プラグイン(CSS)| 
| custom_js| CSS・Javascript| カスタムJavascript| 
| plugin_js| CSS・Javascript| プラグイン(Javascript)| 
| use_default_query| オプション設定| 1：初期値をURLから設定可能にする| 
| analytics_tag| オプション設定| Googleアナリティクス| 
| use_recaptcha| オプション設定| 1：Google reCAPTCHAを使用する| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| workflow_edit_flg| 1：次の作業ユーザーに編集権限を付与する| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
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

#### 各種オプション設定
| キー | コメント | 
|---|---|
| work_target_type| 1：次の作業ユーザーに編集権限を付与する| 
| comment_type| コメントタイプ(required：必須、nullable：任意、not_use：使用しない)| 
| flow_next_type| 次のステータスへ進む条件(some：X人以上実行、all：全員実行)| 
| flow_next_count| 次のステータスへ進むのに必要な人数| 

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
| options| NULL| YES| longtext| | | 各種オプション設定(別表)|
| created_at| NULL| YES| timestamp| | | 作成日時|
| updated_at| NULL| YES| timestamp| | | 更新日時|
| created_user_id| NULL| YES| int(10) unsigned| | | 作成ユーザーID|
| updated_user_id| NULL| YES| int(10) unsigned| | | 更新ユーザーID|

### INDEX情報
| INDEX名 | INDEX列 | UNIQUE |コメント | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### 各種オプション設定
| キー | コメント | 
|---|---|
| condition_join| 条件の結合(and,or)| 

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
