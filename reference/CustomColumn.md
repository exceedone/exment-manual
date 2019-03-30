FORMAT: 1A
 
# Group カスタム列

## カスタム列情報 [/api/column/{id}]
 
### カスタム列情報取得 [GET]
 
#### 処理概要
* カスタム列のIDから、カスタム列情報を取得する。
* ログインユーザーがアクセスできないカスタムテーブルの列だった場合、403エラーが発生する。

#### Exment権限(Permission)
+ システム：システム情報
+ システム：カスタムテーブル
+ システム：すべてのデータ
+ テーブル：テーブル
+ テーブル：すべてのデータの編集
+ テーブル：すべてのデータの閲覧
+ テーブル：すべてのデータの参照
+ テーブル：担当者データの編集
+ テーブル：担当者データの閲覧
+ テーブル：担当者データの参照

#### APIスコープ(scope)
+ table_read
+ table_write

#### 対応バージョン
v1.0.11

+ Parameters
    + id: 3 (number, required) - カスタム列のID
 
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)


+ Response 200 (application/json)
    + Attributes(object)
        + id: 25 (number, required)
        + suuid: 2282a7d7ee4a8583ad3f (string, required)
        + custom_table_id: 3 (string, required)
        + column_name: username (string, required)
        + column_view_name: ユーザー名 (string, required)
        + column_type: text (string, required)
        + description: ユーザー名です。 (string)
        + system_flg: 1
        + options(object): 
            + required: 1 (string)
            + index_enabled: 1 (string)
            + use_label_flg: 1 (string)
        + created_at: `2019-03-28 00:00:00`
        + updated_at: `2019-03-28 00:00:00`
        + deleted_at: null
        + created_user_id: null
        + updated_user_id: null
        + deleted_user_id: null
        + custom_table: (object)
            + id: 3 (number, required)
            + suuid: 8cc7d2b90439d4e97546 (string, required)
            + table_name: user (string, required)
            + table_view_name: ユーザー (string, required)
            + description: ユーザー情報です。 (string)
            + system_flg: 1
            + showlist_flg: 1
            + options(object): 
                + icon: fa-user (string)
                + color: #777777 (string)
                + attachment_flg: 0
                + search_enabled: 1
            + created_at: `2019-03-28 00:00:00`
            + updated_at: `2019-03-28 00:00:00`
            + deleted_at: null
            + created_user_id: null
            + updated_user_id: null
            + deleted_user_id: null
