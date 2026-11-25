# Add a label column with the API
When you get a data list with the API, or create or update data, you can add a "label" column to the result. This page explains how to set it.

- The "label" column is the text decided by the [Heading display column setting](/table?id=heading-display-column-setting) of the data. It is shown as a candidate in the search bar and in select lists.
- There are two ways to set it. See "Method 1" (add it for all APIs) or "Method 2" (add it for that request only) below.

> In v3.1.1 and earlier, the label column was returned by default. To improve performance, it is now not returned by default.  
Therefore, if you want to get the label column, please apply this setting.

### With the label setting (excerpt)

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

### Without the label setting (excerpt)

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


### Method 1: Add to the .env file
The label column is added for all APIs.  
Add the following to the .env file.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### Method 2: Add "label=1" to the request values
The label column is added for that request only.  
When you call the API, add "label=1". Where to add it is as follows.

| What you do | Where to add "label=1" |
| ---- | ---- |
| Get data | Query string |
| Create data | POST values |
| Update data | PUT values |


[←Back to list of additional settings](/quickstart_more)
