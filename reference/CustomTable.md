FORMAT: 1A

# Group カスタムテーブル
 
## カスタムテーブル一覧 [/api/table]
 
### 一覧取得 [GET]
 
#### 処理概要
* カスタムテーブル一覧を取得する
* ログインユーザーがアクセスできるテーブルのみ、一覧として取得できる

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
+ テーブル：担当者データの閲覧

#### APIスコープ(scope)
+ table_read
+ table_write

#### 対応バージョン
v1.0.11

+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)


+ Response 200 (application/json)
    + Attributes
        + current_page: 1 (number, required)
        + data: (array)
            + (object)
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
            
            + (object)
                + id: 4 (number, required)
                + suuid: 9c9c10e260c97d686510 (string, required)
                + table_name: organization (string, required)
                + table_view_name: 組織 (string, required)
                + description: 組織情報です。 (string)
                + system_flg: 1
                + showlist_flg: 1
                + options(object): 
                    + icon: fa-sitemap (string)
                    + color: #666666 (string)
                    + attachment_flg: 0
                    + search_enabled: 1
                + created_at: `2019-03-28 00:00:00`
                + updated_at: `2019-03-28 00:00:00`
                + deleted_at: null
                + created_user_id: null
                + updated_user_id: null
                + deleted_user_id: null
        + first_page_url: `http://localhost/admin/api/table?page=1`
        + from: 1
        + last_page: 1
        + last_page_url: `http://localhost/admin/api/table?page=1`
        + next_page_url: null
        + path: `http://localhost/admin/api/table`
        + per_page: 15
        + prev_page_url: null
        + to: 7
        + total: 7
        
+ Response 403 (application/json)
    + Attributes
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにアクセスする権限がない場合


## カスタムテーブル情報 [/api/table/{tableKey}]
 
### カスタムテーブル情報取得 [GET]
 
#### 処理概要
* カスタムテーブルのIDもしくはテーブル名から、カスタムテーブル情報を取得する
* ログインユーザーがアクセスできないテーブルの場合、403エラーが発生する

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
+ テーブル：担当者データの閲覧

#### APIスコープ(scope)
+ table_read
+ table_write

#### 対応バージョン
v1.0.11

+ Parameters
    + tableKey: user (string, required) - カスタムテーブルのID(Ex. 3)、もしくはテーブル名(Ex. user)
 
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes(object)
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
        + deleted_at: (string)
        + created_user_id: (string)
        + updated_user_id: (string)
        + deleted_user_id: (string)

+ Response 403 (application/json)
    + Attributes
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにアクセスする権限がない場合


## カスタムテーブル内のカスタム列一覧 [/api/table/{tableKey}/columns]
 
### カスタムテーブル内のカスタム列一覧 [GET]
 
#### 処理概要
* カスタムテーブルのIDもしくはテーブル名を指定し、そのカスタムテーブル内のカスタム列情報一覧を取得する
* ログインユーザーがアクセスできないテーブルの場合、403エラーが発生する

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
+ テーブル：担当者データの閲覧

#### APIスコープ(scope)
+ table_read
+ table_write

#### 対応バージョン
v1.0.11

+ Parameters
    + tableKey: user (string, required) - カスタムテーブルのID(Ex. 3)、もしくはテーブル名(Ex. user)
 
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes(array)
        + (object)
            + id: 24 (number, required)
            + suuid: 5fe95b4cd0a808015793 (string, required)
            + custom_table_id: 3 (string, required)
            + column_name: usercode (string, required)
            + column_view_name: ユーザーコード (string, required)
            + column_type: text (string, required)
            + description: ユーザーコードです。 (string)
            + system_flg: 1
            + options(object): 
                + unique: 1 (string)
                + required: 1 (string)
                + index_enabled: 1 (string)
            + created_at: `2019-03-28 00:00:00`
            + updated_at: `2019-03-28 00:00:00`
            + deleted_at: null
            + created_user_id: null
            + updated_user_id: null
            + deleted_user_id: null
        
        + (object)
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

+ Response 403 (application/json)
    + Attributes
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにアクセスする権限がない場合
