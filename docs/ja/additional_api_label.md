# APIで、label列を追加する
データ一覧取得、もしくはデータ新規作成・更新の実行時に、"label"列を追加することができます。  
この"label"列は、データの[見出し表示列設定](/ja/table#見出し表示列設定)で設定する、検索バーの候補表示や、選択肢での一覧での表示文言です。  
この設定では、このlabel列を取得するための手順です。

> v3.1.1以前では、デフォルトでlabel列を表示していましたが、パフォーマンス改善により、2020/05/01以降、既定では取得しなくなる予定です。  
そのため、2020/05/01以降も引き続き、label列を取得したい場合は、こちらの設定を実施してください。

### label設定を行った場合(一部抜粋)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null,
            "label": "admin"
        }
    ]
}
~~~

### label設定を行わない場合(一部抜粋)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null,
        }
    ]
}
~~~


### 方法1：.envファイルに追加
.envファイルに、以下を追加してください。  
全API共通で、label列を追加します。

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### 方法2 ： リクエスト値に「label=1」追加
API実行時、「label=1」を追加してください。  
そのリクエストで、label列を追加します。  
※データ取得時にはクエリ文字列に、データ新規追加時にはPOST値に、データ更新時にはPUT値に追加します。


[←追加設定一覧へ戻る](/ja/quickstart_more)