FORMAT: 1A
 
# Group ログインユーザー
 
## ログインユーザー情報 [/api/me]
 
### ログインユーザー情報 [GET]
 
#### 処理概要
* ログインユーザー自身のユーザー情報を取得する

#### Exment権限(Permission)
なし

#### APIスコープ(scope)
+ me

#### 対応バージョン
v1.1.0

+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes
        + current_page: 1 (number, required)
        + data: (object)
            + id: 3 (number, required)
            + suuid: 4853a244e9ca274ad8e1 (string, required)
            + parent_type: null (string, required)
            + parent_id: null (required)
            + value(object): 
                + email: admin@admin.admin
                + user_code: admin (string)
                + user_name: admin (string)
            + created_at: `2019-03-28 00:00:00`
            + updated_at: `2019-03-28 00:00:00`
            + deleted_at: null
            + created_user_id: null
            + updated_user_id: null
            + deleted_user_id: null
            + label: admin
        
