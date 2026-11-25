# 在 API 中添加 label 列
用 API 获取数据列表时，或新建、更新数据时，可以在结果中添加“label”列。本页说明设置方法。

- “label”列是由数据的[标题显示列设置](/zh/table)决定的文字。它显示在搜索栏的候选和选项列表中。
- 设置方法有两种。请看下面的“方法1”（在所有 API 中添加）或“方法2”（只在该请求中添加）。

> 在 v3.1.1 及更早的版本中，默认会显示 label 列。为了改善性能，现在默认不获取。  
因此，想获取 label 列时，请进行这里的设置。

### 进行了 label 设置时（节选）

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

### 没有进行 label 设置时（节选）

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
            "updated_user_id": null
        }
    ]
}
~~~


### 方法1：在 .env 文件中添加
在所有的 API 中添加 label 列。  
请在 .env 文件中添加下面的内容。

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### 方法2：在请求值中添加“label=1”
只在该请求中添加 label 列。  
执行 API 时，请添加“label=1”。添加的位置如下。

| 执行的内容 | 添加“label=1”的位置 |
| ---- | ---- |
| 获取数据 | 查询字符串 |
| 新建数据 | POST 值 |
| 更新数据 | PUT 值 |


[←返回追加设置一览](/zh/quickstart_more)
