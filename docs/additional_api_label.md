# Add a label column with the API
When getting a data list, or when creating or updating data, you can add a "label" column.  
This "label" column is the text shown as a candidate in the search bar or in select lists, as set in the data's [Heading display column setting](/table?id=heading-display-column-setting).  
This page describes the steps to get this label column.

> In v3.1.1 and earlier, the label column was shown by default, but to improve performance, it is planned not to be returned by default from 2020/05/01.  
Therefore, if you want to keep getting the label column from 2020/05/01 onward, please apply this setting.

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
            "updated_user_id": null,
        }
    ]
}
~~~


### Method 1: Add to the .env file
Add the following to the .env file.  
The label column is added for all APIs.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### Method 2: Add "label=1" to the request values
When calling the API, add "label=1".  
The label column is added for that request.  
※Add it to the query string when getting data, to the POST values when creating data, and to the PUT values when updating data.


[←Back to list of additional settings](/quickstart_more)
