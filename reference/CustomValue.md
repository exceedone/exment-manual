FORMAT: 1A
 
# Group カスタムデータ

## カスタムデータ情報 [/api/data/{tableKey}]
 
### カスタムデータ一覧取得 [GET]
 
#### 処理概要
* 特定のカスタムテーブルに登録している、カスタムデータの一覧を取得する
* ログインユーザーに権限のあるデータのみ、一覧の対象となる

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
+ value_read
+ value_write

#### 対応バージョン
v1.1.0

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
 
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes(object)
        + current_page: 1 (number, required)
        + data: (array)
            + (object)
                + id: 3 (number, required)
                + suuid: 39c97ba08c6e392a125a (string, required)
                + parent_type: null (string, required)
                + parent_id: null (required)
                + value(object): 
                    + body: Exmentは、かんたん、おやすいOSSシステムです。
                    + order: 5
                    + title: Exmentへようこそ！
                    + priority: 3
                    + view_flg: 1
                + created_at: `2019-03-28 00:00:00`
                + updated_at: `2019-03-28 00:00:00`
                + deleted_at: null
                + created_user_id: null
                + updated_user_id: null
                + deleted_user_id: null
                + label: Exmentへようこそ！

            + (object)
                + id: 4 (number, required)
                + suuid: a85c4e6e1793611b173a (string, required)
                + parent_type: null (string, required)
                + parent_id: null (required)
                + value(object): 
                    + body: xmentでは、この「お知らせ」画面をはじめとし、
                    + order: 2
                    + title: データを新規追加するには
                    + priority: 3
                    + view_flg: 1
                + created_at: `2019-03-28 00:00:00`
                + updated_at: `2019-03-28 00:00:00`
                + deleted_at: null
                + created_user_id: null
                + updated_user_id: null
                + deleted_user_id: null
                + label: データを新規追加するには
            
        + first_page_url: `http://local-exment-master/admin/api/data/information?page=1`
        + from: 1
        + last_page: 1
        + last_page_url: `http://local-exment-master/admin/api/data/information?page=1`
        + next_page_url: null
        + path: `http://local-exment-master/admin/api/data/information`
        + per_page: 15
        + prev_page_url: null
        + to: 5
        + total: 5

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにアクセスする権限がない場合


### カスタムデータ新規作成 [POST]
 
#### 処理概要
* カスタムテーブルに、データを新規作成する
* ログインユーザーがカスタムテーブルに新規追加する権限のない場合、403エラーが発生する
* 登録を行いたいデータは、value配列内に値を代入してPOSTする

#### Exment権限(Permission)
+ システム：システム情報
+ システム：カスタムテーブル
+ システム：すべてのデータ
+ テーブル：テーブル
+ テーブル：すべてのデータの編集
+ テーブル：担当者データの編集

#### APIスコープ(scope)
+ value_write

#### 対応バージョン
v1.1.0

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    
+ Request (application/json)
    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)
            
    + Attributes
        + value: (object)
            + body: テストの本文です
            + title: テストです
            + priority: 3
            + view_flg: 1
            + order: 6

+ Response 201 (application/json)
    + Attributes(object)
        + current_page: 1 (number, required)
        + (object)
            + id: 8 (number, required)
            + suuid: 247dec5d77042eaa10fc (string, required)
            + value(object): 
                + body: テストの本文です
                + order: 6
                + title: テストです
                + priority: 3
                + view_flg: 1
            + created_at: `2019-03-29 00:00:00`
            + updated_at: `2019-03-29 00:00:00`
            + label: テストです

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにデータを新規追加する権限がない場合


## カスタムデータ詳細 [/api/data/{tableKey}/{id}]
 
### カスタムデータ情報取得 [GET]
 
#### 処理概要
* 特定のカスタムテーブルに登録している、カスタムデータ情報を取得する
* ログインユーザーに権限のないデータだった場合、403エラーが発生する

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
+ value_read
+ value_write

#### 対応バージョン
v1.1.0

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    + id: 3 (number) - カスタムデータのID
 
+ Request (application/json)
    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes(object)
        + (object)
            + id: 3 (number, required)
            + suuid: 39c97ba08c6e392a125a (string, required)
            + parent_type: null (string, required)
            + parent_id: null (required)
            + value(object): 
                + body: Exmentは、かんたん、おやすいOSSシステムです。
                + order: 5
                + title: Exmentへようこそ！
                + priority: 3
                + view_flg: 1
            + created_at: `2019-03-28 00:00:00`
            + updated_at: `2019-03-28 00:00:00`
            + deleted_at: null
            + created_user_id: null
            + updated_user_id: null
            + deleted_user_id: null
            + label: Exmentへようこそ！
            
+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のデータにアクセスする権限がない場合



### カスタムデータ情報更新 [PUT]
 
#### 処理概要
* カスタムデータ情報を更新する
* ログインユーザーに権限のないデータだった場合、403エラーが発生する
* 更新が発生する列の情報のみ、value配列内に値を代入してPUTする


#### Exment権限(Permission)
+ システム：システム情報
+ システム：カスタムテーブル
+ システム：すべてのデータ
+ テーブル：テーブル
+ テーブル：すべてのデータの編集
+ テーブル：担当者データの編集

#### APIスコープ(scope)
+ value_write

#### 対応バージョン
v1.1.0

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    + id: 8 (number, required) - カスタムデータのID
    
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)
            
    + Attributes
        + value: (object)
            + body: テストの本文を更新します
            + title: タイトルも更新します

+ Response 200 (application/json)
    + Attributes(object)
        + id: 8 (number, required)
        + suuid: 247dec5d77042eaa10fc (string, required)
        + parent_type: null (string, required)
        + parent_id: null (required)
        + value(object): 
            + body: テストの本文を更新します
            + order: 5
            + title: タイトルも更新します
            + priority: 3
            + view_flg: 1
        + created_at: `2019-03-28 00:00:00`
        + updated_at: `2019-03-28 00:00:00`
        + deleted_at: null
        + created_user_id: null
        + updated_user_id: null
        + deleted_user_id: null
        + label: タイトルも更新します

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のデータを更新する権限がない場合


### カスタムデータ情報削除 [DELETE]
 
#### 処理概要
* カスタムデータ情報を削除する
* ログインユーザーに権限のないデータだった場合、403エラーが発生する


#### Exment権限(Permission)
+ システム：システム情報
+ システム：カスタムテーブル
+ システム：すべてのデータ
+ テーブル：テーブル
+ テーブル：すべてのデータの編集
+ テーブル：担当者データの編集

#### APIスコープ(scope)
+ value_write

#### 対応バージョン
v1.1.0

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    + id: 8 (number, required) - カスタムデータのID
    
+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 204 (application/json)

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のデータを削除する権限がない場合
