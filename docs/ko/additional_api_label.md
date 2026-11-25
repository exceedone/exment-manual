# API에서 label 열을 추가하기
API로 데이터 목록을 가져올 때나 데이터를 새로 만들거나 업데이트할 때, 결과에 "label" 열을 추가할 수 있습니다. 이 페이지에서는 그 설정 방법을 설명합니다.

- "label" 열은 데이터의 [제목 표시 열 설정](/ko/table)으로 정해지는 문구입니다. 검색 바의 후보나 선택지 목록에 표시됩니다.
- 설정 방법은 2가지입니다. 아래의 "방법 1"(모든 API에서 추가) 또는 "방법 2"(그 요청에만 추가)를 확인하십시오.

> v3.1.1 이전에는 기본으로 label 열을 표시했지만, 성능 개선을 위해 지금은 기본으로는 가져오지 않습니다.  
그래서 label 열을 가져오려면 이 설정을 하십시오.

### label 설정을 한 경우(일부 발췌)

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

### label 설정을 하지 않은 경우(일부 발췌)

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


### 방법 1: .env 파일에 추가
모든 API에서 label 열을 추가합니다.  
.env 파일에 다음을 추가하십시오.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### 방법 2: 요청 값에 "label=1" 추가
그 요청에만 label 열을 추가합니다.  
API를 실행할 때 "label=1"을 추가하십시오. 추가하는 위치는 다음과 같습니다.

| 실행하는 내용 | "label=1"을 추가하는 위치 |
| ---- | ---- |
| 데이터 가져오기 | 쿼리 문자열 |
| 데이터 새로 추가 | POST 값 |
| 데이터 업데이트 | PUT 값 |


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)