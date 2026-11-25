# APIで、label列を追加する
APIでデータの一覧を取得するときや、データを新規作成・更新するときに、結果に"label"列を追加できます。このページでは、その設定の方法を説明します。

- "label"列は、データの[見出し表示列設定](/ja/table#見出し表示列設定)で決まる文言です。検索バーの候補や、選択肢の一覧に表示されます。
- 設定の方法は2つあります。下の「方法1」(全APIで追加)か、「方法2」(そのリクエストだけ追加)をご覧ください。

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
すべてのAPIで、label列を追加します。  
.envファイルに、以下を追加してください。

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### 方法2 ： リクエスト値に「label=1」追加
そのリクエストだけ、label列を追加します。  
APIを実行するときに、「label=1」を追加してください。追加する場所は、次のとおりです。

| 実行する内容 | 「label=1」を追加する場所 |
| ---- | ---- |
| データ取得 | クエリ文字列 |
| データ新規追加 | POST値 |
| データ更新 | PUT値 |


[←追加設定一覧へ戻る](/ja/quickstart_more)