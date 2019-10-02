FORMAT: 1A
 
# Group カスタムデータ

## カスタムデータ情報 [/api/data/{tableKey}{?page}{&count}{&orderby}]
 
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
    + page: 1 (number, optional) - 取得するページ番号
    + count: 20 (number, optional) - 1回のリクエストで取得する件数。1～100
    + orderby: id,created_at (string, optional) - データの並べ替えを行う場合、並べ替えの列名。複数ある場合はカンマ区切り。逆順は、「id desc」のように半角スペースを追加する
 
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

#### カスタム列の種類が「選択肢 (他のテーブルの値一覧から選択)」で、id以外をキーとして新規作成を行いたい場合
パラメータ「findKeys」を追加することにより、id以外の値をキーとできます。  
例：「契約」テーブルのカスタムデータを登録時、列「顧客(customer)」のデータを、「顧客」テーブル内の「顧客名(customer_code)」を使用したい場合  

■通常時：
```
{
    value: {
        'contract_code': 'C00001',
        'customer': '1'
    }
}
```

■findKeys使用時：
```
{
    value: {
        'contract_code': 'C00001',
        'customer': '株式会社ABC'
    },
    findKeys: {
        'customer': 'customer_name'
    }
}
```

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    
+ Request (application/json)
    + Headers
            Accept: application/json
            Authorization: Bearer (Access Token)
            
    + Attributes
        + value: (object, required)
            + body: テストの本文です
            + title: テストです
            + priority: 3
            + view_flg: 1
            + order: 6

+ Request findKeys (application/json)
    + Headers
            Accept: application/json
            Authorization: Bearer (Access Token)
            
    + Attributes
        + value: (object, required)
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

### カスタムデータ新規作成(一括) [POST]
 
#### 処理概要
* カスタムテーブルに、データを一括で新規作成する
* ログインユーザーがカスタムテーブルに新規追加する権限のない場合、403エラーが発生する
* 登録を行いたいデータは、value配列内に値を複数代入してPOSTする
* 1件でもエラーが発生した場合は、すべてのデータを登録しない
* 1度に登録できる件数は100件まで

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
v2.1.4

#### カスタム列の種類が「選択肢 (他のテーブルの値一覧から選択)」で、id以外をキーとして新規作成を行いたい場合
パラメータ「findKeys」を追加することにより、id以外の値をキーとできます。  
例：「契約」テーブルのカスタムデータを登録時、列「顧客(customer)」のデータを、「顧客」テーブル内の「顧客名(customer_code)」を使用したい場合  

■通常時：
```
{
    value: [
        {
            'contract_code': 'C00001',
            'customer': '1'
        },
        {
            'contract_code': 'C00002',
            'customer': '2'
        },
    ]
}
```

■findKeys使用時：
```
{
    value: [
        {
            'contract_code': 'C00001',
            'customer': '株式会社ABC'
        },
        {
            'contract_code': 'C00002',
            'customer': '株式会社DEF'
        },
    ],
    findKeys: {
        'customer': 'customer_name'
    }
}
```

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    
+ Request (application/json)
    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)
            
    + Attributes
        + value: (array, required)
            + (object)
                + body: テストの本文その1です
                + title: テストその1です
                + priority: 3
                + view_flg: 1
                + order: 6
            + (object)
                + body: テストの本文その2です
                + title: テストその2です
                + priority: 3
                + view_flg: 1
                + order: 7

+ Response 201 (application/json)
    + Attributes(object)
        + current_page: 1 (number, required)
        + (array)
            + (object)
                + id: 8 (number, required)
                + suuid: 247dec5d77042eaa10fc (string, required)
                + value(object): 
                    + body: テストの本文その1です
                    + order: 6
                    + title: テストその1です
                    + priority: 3
                    + view_flg: 1
                + created_at: `2019-03-29 00:00:00`
                + updated_at: `2019-03-29 00:00:00`
                + label: テストその1です
            + (object)
                + id: 9 (number, required)
                + suuid: a85c4e6e1793611b173a (string, required)
                + value(object): 
                    + body: テストの本文その2です
                    + order: 7
                    + title: テストその2です
                    + priority: 3
                    + view_flg: 1
                + created_at: `2019-03-29 00:00:00`
                + updated_at: `2019-03-29 00:00:00`
                + label: テストその2です

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにデータを新規追加する権限がない場合




## カスタムデータ検索 [/api/data/{tableKey}/query{?q}{&count}]
 
### カスタムデータ検索 [GET]
 
#### 処理概要
* 特定のカスタムテーブルに登録している、カスタムデータを検索する
* ログインユーザーに権限のあるデータのみ、一覧の対象となる
* 「検索インデックス」に登録している列が、検索対象列となる
* 検索は前方一致。全文一致で検索を行いたい場合は、<a href="https://exment.net/docs/#/ja/search?id=%e8%a3%9c%e8%b6%b3%e3%83%87%e3%83%bc%e3%82%bf%e6%a4%9c%e7%b4%a2%e3%82%92%e9%83%a8%e5%88%86%e4%b8%80%e8%87%b4%e3%81%ab%e5%88%87%e3%82%8a%e6%9b%bf%e3%81%88" target="_blank">こちら</a>に従い、設定が必要

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
v2.1.6

+ Parameters
    + tableKey: information (string, required) - カスタムテーブルのID(Ex. 5)、もしくはテーブル名(Ex. information)
    + q: Exment (string, required) - 検索文字列
    + page: 1 (number, optional) - 取得するページ番号
    + count: 20 (number, optional) - 1回のリクエストで取得する件数。1～100
 
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

        + first_page_url: `http://local-exment-master/admin/api/data/information/query?q=Exment&page=1`
        + from: 1
        + last_page: 1
        + last_page_url: `http://local-exment-master/admin/api/data/information/query?q=Exment&page=1`
        + next_page_url: null
        + path: `http://local-exment-master/admin/api/data/information`
        + per_page: 15
        + prev_page_url: null
        + to: 5
        + total: 5

+ Response 403 (application/json)
    + Attribute
        + message: `権限がありません。` (string, required) - 該当のカスタムテーブルにアクセスする権限がない場合




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

#### カスタム列の種類が「選択肢 (他のテーブルの値一覧から選択)」で、id以外をキーとして更新を行いたい場合
パラメータ「findKeys」を追加することにより、id以外の値をキーとできます。  
例：「契約」テーブルのカスタムデータを更新時、列「顧客(customer)」のデータを、「顧客」テーブル内の「顧客名(customer_code)」を使用したい場合  

■通常時：
```
{
    value: {
        'contract_code': 'C00001',
        'customer': '1'
    }
}
```

■findKeys使用時：
```
{
    value: {
        'contract_code': 'C00001',
        'customer': '株式会社ABC'
    },
    findKeys: {
        'customer': 'customer_name'
    }
}
```

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

