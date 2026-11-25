# Thêm cột label trong API
Khi lấy danh sách dữ liệu bằng API, hoặc khi tạo mới hay cập nhật dữ liệu, bạn có thể thêm cột "label" vào kết quả. Trang này giải thích cách thiết lập.

- Cột "label" là chuỗi được quyết định bởi [Cài đặt cột hiển thị tiêu đề](/vi/table?id=thiết-lập-cột-hiển-thị-tiêu-đề) của dữ liệu. Chuỗi này được hiển thị ở các gợi ý của thanh tìm kiếm và trong danh sách lựa chọn.
- Có 2 cách thiết lập. Vui lòng xem "Cách 1" (thêm ở mọi API) hoặc "Cách 2" (chỉ thêm ở request đó) bên dưới.

> Ở v3.1.1 trở về trước, cột label được hiển thị mặc định. Để cải thiện hiệu năng, hiện nay mặc định không lấy cột này.  
Vì vậy, nếu muốn lấy cột label, hãy thực hiện thiết lập này.

### Khi đã thiết lập label (trích một phần)

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

### Khi không thiết lập label (trích một phần)

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


### Cách 1: thêm vào tệp .env
Thêm cột label ở mọi API.  
Hãy thêm dòng sau vào tệp .env.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### Cách 2: thêm "label=1" vào giá trị request
Chỉ thêm cột label ở request đó.  
Khi chạy API, hãy thêm "label=1". Vị trí thêm như sau.

| Việc thực hiện | Vị trí thêm "label=1" |
| ---- | ---- |
| Lấy dữ liệu | Query string |
| Thêm mới dữ liệu | Giá trị POST |
| Cập nhật dữ liệu | Giá trị PUT |


[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)