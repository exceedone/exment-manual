# 함수 레퍼런스
> 이 레퍼런스에는 플러그인 등의 커스터마이즈를 할 때 특히 중요한 클래스와 함수만 적혀 있습니다.

## 시작하기 전에
Exment는 PHP를 사용한 오픈 소스 시스템입니다. 다음을 사용하고 있습니다.

- 프레임워크: [Laravel](https://laravel.com/)
- 관리 화면 라이브러리: [exment-admin-core](https://github.com/exceedone/exment-admin-core)(laravel-admin / open-admin을 기반으로 한 라이브러리)
※Exment v6.x 이전에서는 관리 화면 라이브러리로 [laravel-admin](http://laravel-admin.org/docs/#/)을 사용합니다.

그래서 이들의 함수와 모델은 모두 사용할 수 있습니다.

다만 Exment에는, 주로 사용자 정의 테이블을 실현하기 위해, 보통의 Laravel의 Eloquent와는 다른 특수한 작성법이 필요한 곳이 있습니다.
또한 개발하기 쉽게 하기 위한 함수 등도 정의되어 있습니다.
이 페이지에서는 Exment에서 독자적으로 정의한 함수를 설명합니다.


## ModelBase / 모델의 기저 클래스
각 모델의 기저 클래스입니다.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| id | string(정수) | ID |
| created_user | CustomValue(user) | 데이터를 만든 사용자 인스턴스 |
| updated_user | CustomValue(user) | 데이터를 업데이트한 사용자 인스턴스 |



## LoginUser / 로그인 사용자 클래스
로그인 사용자 정보입니다.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| id | string(정수) | 로그인 사용자 테이블의 ID |
| base_user_id | string(정수) | 사용자 정의 데이터 "사용자"의 ID.<br/><span class="red">※화면의 작성 사용자 ID, 업데이트 사용자 ID 등은 모두 이 ID를 사용</span> |
| user_code | string | 사용자 코드 |
| user_name | string | 사용자 표시 이름 |
| email | string | 이메일 주소 |
| display_avatar | string | 사용자 아바타(설정하지 않은 경우, 기본 아바타) |
| login_type | string | 로그인 프로바이더 종류.<br/>pure:보통<br/>oauth:OAuth2 인증<br/>saml:SAML 인증<br/>ldap:LDAP 인증 |
| login_provider | string | 로그인 프로바이더 이름. 보통의 로그인 이외에서 설정된다. google, github 등 |



### 함수 목록

#### \Exment::user()
로그인한 사용자 정보를 가져옵니다.  
※LoginUser의 함수는 아니지만, 편의상 여기에 적었습니다.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| ?LoginUser | 로그인했으면 로그인 사용자 정보. 로그인하지 않은 경우에는 null |

##### 사용 예

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
사용자 정의 데이터 "사용자"의 ID를 반환합니다.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string(정수) | 사용자 정의 데이터 "사용자"의 ID |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### 보충: id와 base_user_id에 대하여
Exment에는 사용자에 관한 DB 테이블로, "사용자 정의 데이터의 '사용자(user)'" 테이블과 "로그인 사용자(login_users)" 테이블의 2개가 있습니다.  
주로 아래와 같은 특징이 있습니다.

- **"사용자 정의 데이터의 '사용자(user)'" 테이블**
    - 사용자 코드·사용자 이름·이메일 주소를 가진다
    - 화면에서는 URL "/data/user"에서 관리
    - API에서 목록을 가져올 수 있음

- **"로그인 사용자(login_users)" 테이블**
    - 로그인 프로바이더 종류(기본, LDAP, OAuth 등), 비밀번호, 아바타 등의 정보를 가진다<br/>(※사용자 코드·사용자 이름·이메일 주소 정보는 Laravel의 함수로, 프로그램에서 가져옴)
    - 화면에서는 URL "/loginuser"에서 관리
    - API에서 목록을 가져올 수 없음. 자신의 로그인 정보만 가져올 수 있음
    - "사용자 정의 데이터의 '사용자(user)'의 ID"를 base_user_id 열에 가진다. 1:n의 관계

#### 2개의 테이블의 ID가 어긋나는 경우
**여러 로그인 방법을 설정한 경우, "사용자 정의 데이터의 '사용자(user)'" 테이블과 "로그인 사용자(login_users)" 테이블의 ID가 어긋나는 경우가 있습니다**. 이것은 아래와 같은 경우입니다.

##### "사용자 정의 데이터의 '사용자(user)'" 테이블
| ID | 사용자 코드 | 사용자 이름 | 이메일 주소 |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### "로그인 사용자(login_users)" 테이블
| ID | base_user_id | login_type | login_provider | ※보충 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | admin 사용자가 보통의 로그인 방법으로 로그인 |
| 2 | 1 | oauth | google | admin 사용자가 Google의 OAuth로 로그인 |
| 3 | 1 | ldap | ad | admin 사용자가 LDAP로 로그인 |
| 4 | 2 | pure | - | user1 사용자가 보통의 로그인 방법으로 로그인 |

이런 경우, $login_user->id와 $login_user->getUserId()의 ID가 달라집니다.  

~~~ php
// 예: admin 사용자가 LDAP로 로그인한 경우

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

또한 <span class="red">※화면의 작성 사용자 ID, 업데이트 사용자 ID 등은 모두 getUserId()를 사용합니다.</span> 그래서 플러그인 등에서 사용자 ID를 가져오는 경우에는 모두 getUserId()를 사용해 주십시오.


## CustomTable / 사용자 정의 테이블
사용자 정의 테이블의 클래스입니다.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| table_name | string | 테이블 이름(영숫자) |
| table_view_name | string | 열 표시 이름 |
| description | string | 설명문 |


### 프로퍼티(hasMany)
Laravel의 HasMany 객체로 정의되어 있는 프로퍼티의 목록입니다.

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | 사용자 정의 열 |
| custom_forms | CustomForm | 폼 |
| custom_views | CustomView | 뷰 |
| custom_operations | CustomOperation | 일괄 업데이트 |
| notifies | Notify | 알림 |
| custom_relations | CustomRelation | (그 테이블이 상위가 되는) 관계 |
| child_custom_relations | CustomRelation | (그 테이블이 하위가 되는) 관계 |

### 함수 목록


#### (static)getEloquent
사용자 정의 테이블의 객체를 가져옵니다.  
키가 되는 $obj에는 id, table_name, CustomTable, CustomColumn, CustomValue를 사용할 수 있습니다.  
그 요청 안에서 이미 가져온 사용자 정의 테이블 정보는 메모리에 보관하므로, 다시 가져올 필요가 없습니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $obj | mixed | 가져오고 싶은 키 값(id, table_name, CustomTable, CustomColumn, CustomValue) |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| CustomTable | 가져온 사용자 정의 테이블의 정보 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
사용자 정의 데이터의 모델을 가져옵니다.  
※사용자 정의 데이터의 Model은 클래스 CustomValue를 바탕으로 하며, 그 클래스를 상속한 동적인 클래스 이름으로 인스턴스화됩니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $id | string,int | 지정한 사용자 정의 데이터 ID의 모델을 가져오고 싶은 경우, 그 id. 초깃값은 null |
| $withTrashed | bool | 삭제된 모델을 가져오고 싶은 경우에는 true. 초깃값은 false |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| CustomValue | 사용자 정의 데이터(를 상속한, 동적인 클래스)의 객체 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1. 공지사항의 데이터를 가져오기 위한 쿼리 만들기
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// $query에 대해 데이터베이스의 쿼리 빌더를 적어 나간다

// 2. 공지사항 데이터의 ID가 1인 데이터를 가져온다
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Exment에 오신 것을 환영합니다!
\Log::debug($value->getValue('body')); // Exment는 간단하고 저렴한 데이터 관리 웹 시스템입니다. ...

~~~

---

#### getSearchEnabledColumns
검색할 수 있는 사용자 정의 열의 목록을 가져옵니다.

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| Collection(CustomColumn) | 사용자 정의 열 객체의 목록 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
사용자 정의 테이블의 옵션 설정을 가져옵니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $key | string | 가져올 설정의 키. color, icon, search_enabled 등 |
| $default | mixed | 키 값이 없었던 경우의 기본값. 지정하지 않은 경우에는 null |


##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| mixed | 사용자 정의 테이블의 옵션 값 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
로그인 사용자가 그 테이블에 접근할 권한을 가지고 있는지 판정합니다.  


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | 판정할 권한의 키. 초깃값은 AVAILABLE_VIEW_CUSTOM_VALUE(사용자 정의 테이블의 표시 권한) |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| bool | 권한이 있으면 true, 없으면 false |

##### 사용 예

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 로그인 사용자가 "계약" 테이블에 표시 권한이 있는지의 판정
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// 로그인 사용자가 "매출" 테이블에 편집 권한이 있는지의 판정
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
로그인 사용자가 지정한 테이블의 지정한 id를 표시할 권한을 가지고 있는지 판정합니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $id | string,int | 대상 custom_value의 id |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| bool | 권한이 있으면 true, 없으면 false |

##### 사용 예

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 로그인 사용자가 "계약" 테이블의 id 3인 데이터에 표시 권한이 있는지의 판정
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
로그인 사용자가 지정한 테이블의 지정한 id를 편집할 권한을 가지고 있는지 판정합니다.  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $id | string,int | 대상 custom_value의 id |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| bool | 권한이 있으면 true, 없으면 false |

##### 사용 예

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 로그인 사용자가 "매출" 테이블의 id 5인 데이터에 표시 권한이 있는지의 판정
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / 사용자 정의 열
사용자 정의 열의 클래스입니다.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| column_name | string | 열 이름(영숫자) |
| column_view_name | string | 열 표시 이름 |
| required | bool | 필수 열인지 여부 |
| index_enabled | bool | 검색 인덱스 열인지 여부 |
| unique | bool | 고유 열인지 여부 |


### 프로퍼티(hasMany)
Laravel의 HasMany 객체로 정의되어 있는 프로퍼티의 목록입니다.

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | 폼 열 |
| custom_view_columns | CustomViewColumn | 뷰 열 |


### 프로퍼티(belongsTo)
Laravel의 belongsTo 객체로 정의되어 있는 프로퍼티의 목록입니다.

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블 |


### 함수 목록

#### (static)getEloquent
사용자 정의 열 객체를 가져옵니다.  
키가 되는 $obj에는 id, column_name, CustomColumn을 사용할 수 있습니다.  
그 요청 안에서 이미 가져온 사용자 정의 열 정보는 메모리에 보관하므로, 다시 가져올 필요가 없습니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $column_obj | mixed | 가져오고 싶은 키 값(id, column_name, CustomColumn) |
| $table_obj | mixed | $column_obj를 column_name으로 지정한 경우, 테이블을 좁히기 위한, 대상 사용자 정의 테이블의 id, table_name, CustomTable 등 |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| CustomColumn | 가져온 사용자 정의 열의 정보 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// "공지사항" 테이블의 "제목" 열의 정보를, 사용자 정의 열의 ID를 지정하여 가져오기
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// "공지사항" 테이블의 "본문" 열의 정보를, 사용자 정의 열 이름을 지정하여 가져오기.
// 열 이름은 다른 테이블에서도 사용하고 있을 수 있으므로, 테이블 정보도 인수에 필요
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // 열 표시 이름
~~~

---


#### getIndexColumnName
그 열이 검색 인덱스를 사용하도록 되어 있는 경우, 데이터베이스의 INDEX 이름을 가져옵니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $alterColumn | bool | 그 열의 가상 열이 데이터베이스에 없었던 경우, 가상 열을 만들지 여부. 초깃값은 true |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 인덱스 이름입니다. |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// "공지사항" 테이블의 "제목"이 "Exment"로 시작하는 열의 검색
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / 사용자 정의 데이터
사용자 정의 데이터의 클래스입니다.  
※이 클래스는 추상 클래스입니다. 이 클래스를 base로 하여, 사용자 정의 테이블마다 클래스가 동적으로 만들어집니다.
테이블별 사용자 정의 데이터 클래스를 가져오고 싶은 경우에는 [CustomTable 클래스의 getValueModel](/ko/func_reference?id=getvaluemodel)을 참조해 주십시오.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| parent_type | string | 그 데이터에 상위 테이블이 있는 경우, 상위 테이블 이름 |
| parent_id | int | 그 데이터에 상위 테이블이 있는 경우, 상위 테이블의 사용자 정의 데이터의 id |
| label | string | 그 데이터를 화면에 표시할 때의 제목 |


### 프로퍼티(belongsTo)
Laravel의 belongsTo 객체로 정의되어 있는 프로퍼티의 목록입니다.

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 사용자 정의 테이블 |


### 함수 목록

#### notify
그 사용자 정의 데이터의 알림을 실행합니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | 알림의 종류 |

##### 반환값
없음

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 데이터를 만들 때의 알림을, 공지사항 테이블의 id 1인 데이터에 대해 실행
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
지정한 사용자 정의 열을 키로 하여, 저장되어 있는 값을 가져옵니다.  
※인수 $valueType의 내용에 따라, 반환값의 형이나 내용이 달라집니다.  
예를 들어 사용자 정의 열 종류가 "선택 (테이블에서)"인 경우, $valueType이 false이면 선택한 데이터의 객체를 반환합니다.  
**※사용자 정의 열 종류별 반환값은 [여기](/ko/column_reference)를 확인해 주십시오.**  

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | CustomColumn의 인스턴스,column_name,id 중 하나 |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | 아래의 내용으로 반환한다. <br />- 인수 없음, false, ValueType::VALUE 중 하나: value로 반환  <br /> - true, ValueType::TEXT 중 하나: text로 반환 <br />- ValueType::HTML : html로 반환 <br />- ValueType::PURE_VALUE : pureValue로 반환 <br /><br />※pureValue,value,text,html의 내용에 대해서는 [여기](/ko/column_reference)를 확인해 주십시오. |
| $options | array | 가져오는 방법의 옵션 |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| mixed | 지정한 열의, 사용자 정의 데이터의 값 |


##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// 공지사항 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Exment에 오신 것을 환영합니다!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 보통 
~~~

---

#### setValue
지정한 사용자 정의 열을 키로 하여, 값을 대입합니다.  
※Exment에서는 사용자 정의 데이터에 적은 값은 데이터베이스의 "value" 열에 json 형으로 저장합니다.  
또한 CustomValue 인스턴스에서는 그 value 프로퍼티가 연관 배열로 캐스트되어 있습니다.  
이 함수는 value 열에, 키를 지정하여 값을 대입하는 처리입니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $key | string | 사용자 정의 열 이름 |
| $val | mixed | 대입할 값 |
| $forgetIfNull | bool | $val이 null인 경우, 연관 배열에서 키를 삭제할지 여부. 초깃값은 false |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| CustomValue | CustomValue 인스턴스(매직 메서드)) |


##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 공지사항 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('information')->getValueModel(1);

// 업데이트하여 데이터베이스에 저장
$value->setValue('title', '제목 업데이트');
$value->save();
~~~

---

#### setValueStrictly

> 3.4.3부터 구현

지정한 사용자 정의 열과 값의 배열을 객체에 대입합니다.  
※값을 대입하기 전에 유효성 검사를 합니다.  
유효성 검사 오류가 발생한 경우, \Illuminate\Validation\ValidationException이 발생합니다.  


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $list | array | 사용자 정의 열 이름을 키, 대입할 값을 값으로 한 배열 |
| $forgetIfNull | bool | $val이 null인 경우, 연관 배열에서 키를 삭제할지 여부. 초깃값은 false |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| CustomValue | CustomValue 인스턴스(매직 메서드)) |


##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// 테이블 "foo"의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // 객체에 값을 넣기. "사용자 정의 열 이름 => 값"의 배열
    $value->setValueStrictly(['value1' => '값1', 'value2' => 2]);
    // 업데이트하여 데이터베이스에 저장
    $value->save();
}
// 유효성 검사 오류가 발생한 경우
catch(ValidationException $ex){
    // 오류 내용 가져오기
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
사용자 정의 데이터의 제목 문자열을 가져옵니다.  

##### 인수
없음

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 사용자 정의 데이터의 제목 문자열 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 공지사항 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Exment에 오신 것을 환영합니다!
~~~

---

#### getUrl
사용자 정의 데이터의 페이지로 링크하는 URL을 가져옵니다.  


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $options | array | 가져오는 방법을 지정하는 연관 배열입니다. <br />tag : a 태그로 가져오고 싶은 경우 true. 초깃값은 false<br />list : 목록 페이지로 가져오고 싶은 경우 true. 초깃값은 false<br />icon : 아이콘을 추가하고 싶은 경우, font-awesome의 클래스 이름   |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | URL 또는 태그 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 공지사항 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">Exment에 오신 것을 환영합니다!</a>

~~~






## NotifyService / 알림 서비스
알림을 실행할 때 호출하는 서비스입니다.

- namespace Exceedone\Exment\Services


### 함수 목록


#### (static)notifyMail
메일 알림을 실행합니다.


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $params | array | 알림 매개변수. 키와 설명은 아래 |
| $params['prms'] | array | 제목과 본문에서 치환할, 키·값의 배열 |
| $params['user'] | CustomValue(user) or string | 메일을 받는 사용자 객체, 또는 메일 주소 |
| $params['custom_value'] | CustomValue | 메일 전송 대상의 사용자 정의 데이터 |
| $params['mail_template'] | MailTemplate or string or id | 알림 템플릿 정보 |
| $params['subject'] | string | 제목 |
| $params['body'] | string | 본문 |
| $params['to'] | string | 메일을 받는 사람. 여러 명인 경우에는 쉼표로 구분 |
| $params['cc'] | string | 메일 CC. 여러 명인 경우에는 쉼표로 구분 |
| $params['bcc'] | string | 메일 BCC. 여러 명인 경우에는 쉼표로 구분 |


##### 사용 예

~~~ php
    // 예 1 간단한 메일 전송
    NotifyService::notifyMail([
        'subject' => '테스트',
        'body' => '본문입니다',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // 예 2 알림 템플릿 사용
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // 예 3 매개변수 치환
    NotifyService::notifyMail([
        'subject' => '테스트 ${prms1} ${prms2}',
        'body' => '본문입니다. ${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 예 4 사용자 정의 데이터로 매개변수 치환
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => '테스트',
        'body' => '본문입니다. ${value:contract_code}', // $custom_value의 contract_code의 값으로 치환
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
페이지 오른쪽 위의 헤더 알림을 표시합니다.


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $params | array | 알림 매개변수. 키와 설명은 아래 |
| $params['prms'] | array | 제목과 본문에서 치환할, 키·값의 배열 |
| $params['user'] | CustomValue(user) | 알림을 받는 사용자 객체 |
| $params['custom_value'] | CustomValue | 알림 대상의 사용자 정의 데이터 |
| $params['mail_template'] | MailTemplate or string or id | 알림 템플릿 정보 |
| $params['subject'] | string | 제목 |
| $params['body'] | string | 본문 |


##### 사용 예

~~~ php
    // 예 1 사용자 ID 1인 사용자에게 간단한 알림
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => '테스트',
        'body' => '본문입니다',
        'user' => $user,
    ]);
    

    // 예 2 알림 템플릿 사용
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // 예 3 매개변수 치환
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => '테스트 ${prms1} ${prms2}',
        'body' => '본문입니다. ${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 예 4 사용자 정의 데이터로 매개변수 치환
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => '테스트',
        'body' => '본문입니다. ${value:contract_code}', // $custom_value의 contract_code의 값으로 치환
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Slack에 알림을 보냅니다.


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $params | array | 알림 매개변수. 키와 설명은 아래 |
| $params['webhook_url'] | string | WebHook의 URL |
| $params['webhook_name'] | string | Slack에 게시할 이름 |
| $params['webhook_icon'] | string | Slack에 게시할 아이콘 |
| $params['prms'] | array | 제목과 본문에서 치환할, 키·값의 배열 |
| $params['custom_value'] | CustomValue | 알림 대상의 사용자 정의 데이터 |
| $params['mail_template'] | MailTemplate or string or id | 알림 템플릿 정보 |
| $params['subject'] | string | 제목 |
| $params['body'] | string | 본문 |


##### 사용 예

~~~ php
    // 예 1 Slack에 간단한 알림
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '테스트',
        'body' => '본문입니다',
    ]);
    

    // 예 2 알림 템플릿 사용
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 예 3 매개변수 치환
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '테스트 ${prms1} ${prms2}',
        'body' => '본문입니다. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 예 4 사용자 정의 데이터로 매개변수 치환
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '테스트',
        'body' => '본문입니다. ${value:contract_code}', // $custom_value의 contract_code의 값으로 치환
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Microsoft Teams에 알림을 보냅니다.


##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $params | array | 알림 매개변수. 키와 설명은 아래 |
| $params['webhook_url'] | string | WebHook의 URL |
| $params['prms'] | array | 제목과 본문에서 치환할, 키·값의 배열 |
| $params['custom_value'] | CustomValue | 알림 대상의 사용자 정의 데이터 |
| $params['mail_template'] | MailTemplate or string or id | 알림 템플릿 정보 |
| $params['subject'] | string | 제목 |
| $params['body'] | string | 본문 |


##### 사용 예

~~~ php
    // 예 1 Teams에 간단한 알림
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '테스트',
        'body' => '본문입니다',
    ]);
    

    // 예 2 알림 템플릿 사용
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 예 3 매개변수 치환
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '테스트 ${prms1} ${prms2}',
        'body' => '본문입니다. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 예 4 사용자 정의 데이터로 매개변수 치환
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '테스트',
        'body' => '본문입니다. ${value:contract_code}', // $custom_value의 contract_code의 값으로 치환
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / 파일 관리 클래스
Exment에 업로드된 각종 파일(파일 열이나 이미지 열의 파일, 첨부 파일, 아바타 이미지 etc...)을 관리하는 클래스입니다.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 프로퍼티

| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| uuid | string | 파일을 관리하는 고유한 문자열입니다. 원래의 파일 이름은 중복될 수 있으므로, Exment에서는 모든 파일에 uuid를 붙입니다. |
| file_type | integer | 파일의 종류(1: 사용자 정의 열, 2: 첨부 파일, 3: 아바타, 4: 시스템, 5: 폼 이미지, 6: 공개 폼) |
| local_dirname | string | 파일이 저장되어 있는 디렉터리의 이름 |
| local_filename | string | 저장되어 있는 파일 이름(보통은 uuid+확장자) |
| filename | string | 업로드한 시점의 원래 파일 이름 |
| parent_type | string | 파일이 연결되어 있는 CustomTable의 이름 |
| parent_id | string | 파일이 연결되어 있는 CustomValue의 ID |
| custom_column_id | integer | 파일이 연결되어 있는 CustomColumn의 ID |
| custom_form_column_id | integer | 파일이 연결되어 있는 CustomFormColumn의 ID |
| path | string | 저장되어 있는 파일의 경로. 전체 경로가 아니라 업로드 스토리지로부터의 상대 경로입니다. |
| extension | string | 파일의 확장자 |



### 함수 목록

#### (static)getUrl
파일에 접근하기 위한 URL을 반환합니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $path | string | 파일의 상대 경로 |
| $options | array | 가져오는 방법을 지정하는 연관 배열입니다. <br />asApi : API의 URL을 가져오고 싶은 경우 true. 초깃값은 false  |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| string | 파일의 URL |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// 테스트 테이블의 id 1인 데이터를 가져오기
$value = CustomTable::getEloquent('test')->getValueModel(1);
// 파일 열의 값을 가져오기(파일 열이나 이미지 열에는 상대 경로가 들어 있다)
$file_path = $value->getValue('file');
// URL을 가져오기
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
파일 콘텐츠를 스토리지에 저장하고, 파일 관리 테이블에 데이터를 추가합니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $file_type | integer | 파일의 종류(자세한 내용은 프로퍼티 참조) |
| $content | mixed | 파일 콘텐츠. UploadedFile이나 String(파일에 써넣을 문자열) 등을 지정할 수 있습니다. |
| $dirname | string | 파일을 저장할 디렉터리의 이름 |
| $filename | string | 원래의 파일 이름 |
| $options | array | 저장할 때의 옵션을 지정하는 연관 배열입니다.  |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| File | 파일 관리 테이블에 추가한 데이터의 인스턴스 |

##### 사용 예
※saveCustomValue, saveDocumentModel을 참조.

---

#### saveCustomValue
파일 관리 테이블의 데이터에 CustomValue의 정보를 덧붙입니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $custom_value_id | integer | CustomValue의 ID |
| $custom_column | mixed | 파일 종류가 사용자 정의 열인 경우에 CustomColumn의 인스턴스/대상 데이터의 ID/열 이름(영숫자) |
| $custom_table | mixed | CustomTable의 인스턴스 |
| $replace | bool | 지정된 열에 연결되어 있는 파일을 모두 바꿔 넣는 경우에는 true. 초깃값은 false |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| File | 파일 관리 테이블의 인스턴스 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// 테스트 테이블을 가져오기
$custom_table = CustomTable::getEloquent('test');
// 테스트 테이블의 id=1인 데이터를 가져오기
$custom_value = $custom_table->getValueModel(1);
// 테스트 테이블의 file 열을 가져오기
$file_column = CustomColumn::getEloquent('file', $custom_table);
// 문자열 "hogehoge"를 "hoge.txt"라는 이름으로 스토리지에 저장. 파일 관리 테이블에 데이터를 추가하고, 테스트 테이블의 id=1인 데이터의 file 열과 연결한다
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// 테스트 테이블의 id=1인 데이터의 file 열을 업데이트한다
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
파일 관리 테이블의 데이터에서 문서 정보를 만듭니다.

##### 인수
| 이름 | 종류 | 설명 |
| ---- | ---- | ---- |
| $custom_value | CustomValue | 문서를 연결할 CustomValue 인스턴스 |
| $document_name | string | 문서의 파일 이름 |

##### 반환값
| 종류 | 설명 |
| ---- | ---- |
| File | 문서 테이블에 추가한 데이터의 인스턴스 |

##### 사용 예

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// 테스트 테이블을 가져오기
$custom_table = CustomTable::getEloquent('test');
// 테스트 테이블의 id=1인 데이터를 가져오기
$custom_value = $custom_table->getValueModel(1);

// 문자열 "hogehoge"를 "hoge.txt"라는 이름으로 스토리지에 저장. 파일 관리 테이블에 데이터를 추가한다
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// 파일 관리 테이블의 데이터를 테스트 테이블의 id=1인 데이터와 연결한다
$file = $file->saveCustomValue(1, null, $custom_table);
// 문서 정보를 만든다(테스트 테이블의 id=1인 데이터와 연결)
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### 보충: 파일을 다루는 방법에 대하여
Exment의 사용자 정의 데이터에서 파일 열의 정보를 보면, 간단한 상대 경로가 설정되어 있을 뿐입니다.  
실제 파일은 스토리지에 들어 있습니다. 그리고 이 스토리지의 파일에 접근하기 위한 정보나 파일의 종류, 어느 사용자 정의 데이터에 연결되어 있는지를 관리하는 것이 파일 관리 테이블(files)입니다.  
파일 열이나 이미지 열에 업로드된 파일 외에, 첨부 파일, 아바타 이미지, 시스템의 아이콘이나 로고 등, 여러 가지 파일을 가로질러 관리합니다. (또한 첨부 파일은 따로 문서 테이블이라는 독자적인 테이블도 이용합니다)  
그래서 플러그인에서 파일 열에 데이터를 설정하거나 첨부 파일을 붙이는 경우에, 보통의 필드보다 조금 복잡한 기술이 필요합니다.  
자세한 내용은 위의 "사용 예"나 샘플 플러그인을 참조해 주십시오.
