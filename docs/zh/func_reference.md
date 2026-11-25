# 函数参考
> 本参考中，只记载了在进行插件等定制时特别重要的类和函数。

## 前言
Exment 是使用 PHP 的开源系统。使用了以下内容。

- 框架：[Laravel](https://laravel.com/)
- 管理页面库：[exment-admin-core](https://github.com/exceedone/exment-admin-core)（以 laravel-admin / open-admin 为基础的库）
※Exment v6.x 及以前的版本中，管理页面库使用 [laravel-admin](http://laravel-admin.org/docs/#/)。

因此，这些函数和模型全部都可以使用。

但是 Exment 中，主要为了实现自定义表，有些地方需要和普通的 Laravel 的 Eloquent 不同的特殊写法。
另外，还定义了便于开发的函数等。
本页说明 Exment 中独自定义的函数。


## ModelBase / 模型的基类
各模型的基类。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | string(整数) | ID |
| created_user | CustomValue(user) | 创建数据的用户实例 |
| updated_user | CustomValue(user) | 更新数据的用户实例 |



## LoginUser / 登录用户类
登录用户信息。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | string(整数) | 登录用户表的 ID |
| base_user_id | string(整数) | 自定义数据“用户”的 ID。<br/><span class="red">※页面中的创建用户 ID、更新用户 ID 等，全部使用这个 ID</span> |
| user_code | string | 用户代码 |
| user_name | string | 用户显示名 |
| email | string | 电子邮件地址 |
| display_avatar | string | 用户头像(未设置时为默认头像) |
| login_type | string | 登录提供方的种类。<br/>pure:普通<br/>oauth:OAuth2 认证<br/>saml:SAML 认证<br/>ldap:LDAP 认证 |
| login_provider | string | 登录提供方的名称。在普通登录以外的情况下设置。google、github 等 |



### 函数列表

#### \Exment::user()
获取已登录的用户信息。  
※这不是 LoginUser 的函数，但为了方便记载在这里。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| ?LoginUser | 已登录时为登录用户信息。未登录时为 null |

##### 使用示例

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
返回自定义数据“用户”的 ID。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string(整数) | 自定义数据“用户”的 ID |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### 补充：关于 id 和 base_user_id
Exment 中，和用户有关的 DB 表有 2 个：“自定义数据的‘用户(user)’”表和“登录用户(login_users)”表。  
主要有以下特点。

- **“自定义数据的‘用户(user)’”表**
    - 拥有用户代码、用户名、电子邮件地址
    - 在页面中，用 URL“/data/user”管理
    - 可以从 API 获取列表

- **“登录用户(login_users)”表**
    - 拥有登录提供方的种类(默认、LDAP、OAuth 等)、密码、头像等信息<br/>(※用户代码、用户名、电子邮件地址的信息，用 Laravel 的函数通过程序获取)
    - 在页面中，用 URL“/loginuser”管理
    - 不能从 API 获取列表。只能获取自己的登录信息
    - 在 base_user_id 列中拥有“自定义数据的‘用户(user)’的 ID”。1:n 的关系

#### 2 个表的 ID 不一致的情况
**设置了多种登录方法时，“自定义数据的‘用户(user)’”表和“登录用户(login_users)”表的 ID 有时会不一致**。这是如下的情况。

##### “自定义数据的‘用户(user)’”表
| ID | 用户代码 | 用户名 | 电子邮件地址 |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### “登录用户(login_users)”表
| ID | base_user_id | login_type | login_provider | ※补充 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | admin 用户用普通的登录方法登录 |
| 2 | 1 | oauth | google | admin 用户用 Google 的 OAuth 登录 |
| 3 | 1 | ldap | ad | admin 用户用 LDAP 登录 |
| 4 | 2 | pure | - | user1 用户用普通的登录方法登录 |

这种情况下，$login_user->id 和 $login_user->getUserId() 的 ID 会不同。  

~~~ php
// 例：admin 用户用 LDAP 登录时

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

另外，<span class="red">※页面中的创建用户 ID、更新用户 ID 等，全部使用 getUserId()。</span>因此，在插件等中获取用户 ID 时，请全部使用 getUserId()。


## CustomTable / 自定义表
自定义表的类。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| table_name | string | 表名(英文数字) |
| table_view_name | string | 列显示名 |
| description | string | 说明文字 |


### 属性(hasMany)
作为 Laravel 的 HasMany 对象定义的属性列表。

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | 自定义列 |
| custom_forms | CustomForm | 表单 |
| custom_views | CustomView | 视图 |
| custom_operations | CustomOperation | 批量更新 |
| notifies | Notify | 通知 |
| custom_relations | CustomRelation | (该表作为父表的)关联 |
| child_custom_relations | CustomRelation | (该表作为子表的)关联 |

### 函数列表


#### (static)getEloquent
获取自定义表的对象。  
作为键的 $obj 可以使用 id、table_name、CustomTable、CustomColumn、CustomValue。  
在该请求内，已经获取过的自定义表信息会保留在内存中，所以不需要再次获取。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $obj | mixed | 想要获取的键值（id、table_name、CustomTable、CustomColumn、CustomValue） |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| CustomTable | 获取到的自定义表的信息 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
获取自定义数据的模型。  
※自定义数据的 Model 以类 CustomValue 为基础，通过继承该类的动态类名来实例化。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $id | string,int | 想获取指定的自定义数据 ID 的模型时，为该 id。初始值为 null |
| $withTrashed | bool | 想获取已删除的模型时为 true。初始值为 false |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| CustomValue | 自定义数据(继承它的动态类)的对象 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1.创建用来获取“通知信息”数据的查询
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// 对 $query 编写数据库的查询构造器

// 2.获取“通知信息”数据中 ID 为 1 的数据
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // 欢迎使用 Exment！
\Log::debug($value->getValue('body')); // Exment 是简单、实惠的数据管理 Web 系统。 ……

~~~

---

#### getSearchEnabledColumns
获取可以搜索的自定义列的列表。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| Collection(CustomColumn) | 自定义列对象的列表 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
获取自定义表的选项设置。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $key | string | 要获取的设置的键。color、icon、search_enabled 等 |
| $default | mixed | 键值不存在时的默认值。不指定时为 null |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| mixed | 自定义表的选项值 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
判断登录用户是否拥有访问该表的权限。  


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | 要判断的权限的键。初始值为 AVAILABLE_VIEW_CUSTOM_VALUE（自定义表的显示权限） |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| bool | 有权限时为 true，没有时为 false |

##### 使用示例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 判断登录用户对“合同”表是否有显示权限
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// 判断登录用户对“销售”表是否有编辑权限
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
判断登录用户是否拥有显示指定表的指定 id 的权限。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $id | string,int | 对象的 custom_value 的 id |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| bool | 有权限时为 true，没有时为 false |

##### 使用示例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 判断登录用户对“合同”表的 id3 的数据是否有显示权限
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
判断登录用户是否拥有编辑指定表的指定 id 的权限。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $id | string,int | 对象的 custom_value 的 id |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| bool | 有权限时为 true，没有时为 false |

##### 使用示例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// 判断登录用户对“销售”表的 id5 的数据是否有显示权限
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / 自定义列
自定义列的类。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| column_name | string | 列名(英文数字) |
| column_view_name | string | 列显示名 |
| required | bool | 是否为必填列 |
| index_enabled | bool | 是否为搜索索引列 |
| unique | bool | 是否为唯一列 |


### 属性(hasMany)
作为 Laravel 的 HasMany 对象定义的属性列表。

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | 表单列 |
| custom_view_columns | CustomViewColumn | 视图列 |


### 属性(belongsTo)
作为 Laravel 的 belongsTo 对象定义的属性列表。

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表 |


### 函数列表

#### (static)getEloquent
获取自定义列对象。  
作为键的 $obj 可以使用 id、column_name、CustomColumn。  
在该请求内，已经获取过的自定义列信息会保留在内存中，所以不需要再次获取。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $column_obj | mixed | 想要获取的键值（id、column_name、CustomColumn） |
| $table_obj | mixed | $column_obj 用 column_name 指定时，为了筛选表而指定的对象自定义表的 id、table_name、CustomTable 等 |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| CustomColumn | 获取到的自定义列的信息 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// 指定自定义列的 ID，获取“通知信息”表的“标题”列的信息
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// 指定自定义列名，获取“通知信息”表的“正文”列的信息。
// 列名可能在其他表中也在使用，所以参数中还需要表信息
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // 列显示名
~~~

---


#### getIndexColumnName
该列启用了搜索索引时，获取数据库的 INDEX 名。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $alterColumn | bool | 该列的虚拟列在数据库中不存在时，是否创建虚拟列。初始值为 true |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 索引名。 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// 搜索“通知信息”表中“标题”以“Exment”开头的列
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / 自定义数据
自定义数据的类。  
※这个类是抽象类。以这个类为 base，为每个自定义表动态生成类。
想获取每个表的自定义数据类时，请参阅 [CustomTable 类的 getValueModel](/zh/func_reference?id=getvaluemodel)。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| parent_type | string | 该数据有父表时，为父表名 |
| parent_id | int | 该数据有父表时，为父表的自定义数据的 id |
| label | string | 在页面中显示该数据时的标题 |


### 属性(belongsTo)
作为 Laravel 的 belongsTo 对象定义的属性列表。

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表 |


### 函数列表

#### notify
执行该自定义数据的通知。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | 通知的种类 |

##### 返回值
无

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 对“通知信息”表的 id1 的数据，执行数据创建时的通知
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
以指定的自定义列为键，获取保存的值。  
※根据参数 $valueType 的内容，返回值的类型和内容会不同。  
例如，自定义列类型为“选项（从其他表中选择）”时，$valueType 为 false 的话，返回所选数据的对象。  
**※每种自定义列类型的返回值，请确认[这里](/zh/column_reference)。**  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | CustomColumn 的实例、column_name、id 中的任意一个 |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | 按以下内容返回。 <br />·没有参数、false、ValueType::VALUE 中的任意一个：作为 value 返回  <br /> ·true、ValueType::TEXT 中的任意一个：作为 text 返回 <br />·ValueType::HTML ： 作为 html 返回 <br />·ValueType::PURE_VALUE ： 作为 pureValue 返回 <br /><br />※pureValue,value,text,html 的内容请确认[这里](/zh/column_reference)。 |
| $options | array | 获取方法的选项 |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| mixed | 指定列的自定义数据的值 |


##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// 获取“通知信息”表的 id1 的数据
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // 欢迎使用 Exment！
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 普通 
~~~

---

#### setValue
以指定的自定义列为键，代入值。  
※Exment 中，自定义数据中填写的值，以 json 类型保存在数据库的 "value" 列中。  
另外，在 CustomValue 实例中，其 value 属性被转换为关联数组。  
这个函数是在 value 列中指定键并代入值的处理。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $key | string | 自定义列名 |
| $val | mixed | 要代入的值 |
| $forgetIfNull | bool | $val 为 null 时，是否从关联数组中删除键。初始值为 false |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| CustomValue | CustomValue 实例(魔术方法)) |


##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 获取“通知信息”表的 id1 的数据
$value = CustomTable::getEloquent('information')->getValueModel(1);

// 更新并保存到数据库
$value->setValue('title', '更新标题');
$value->save();
~~~

---

#### setValueStrictly

> 3.4.3 起实现

把指定的自定义列和值的数组代入对象。  
※代入值之前，会进行验证。  
发生验证错误时，会抛出 \Illuminate\Validation\ValidationException。  


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $list | array | 以自定义列名为键、代入值为值的数组 |
| $forgetIfNull | bool | $val 为 null 时，是否从关联数组中删除键。初始值为 false |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| CustomValue | CustomValue 实例(魔术方法)) |


##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// 获取表 "foo" 的 id1 的数据
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // 给对象设置值。“自定义列名 => 值”的数组
    $value->setValueStrictly(['value1' => '值1', 'value2' => 2]);
    //更新并保存到数据库
    $value->save();
}
// 发生验证错误时
catch(ValidationException $ex){
    // 获取错误内容
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
获取自定义数据的标题字符串。  

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 自定义数据的标题字符串 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 获取“通知信息”表的 id1 的数据
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // 欢迎使用 Exment！
~~~

---

#### getUrl
获取链接到自定义数据页面的 URL。  


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $options | array | 指定获取方法的关联数组。 <br />tag : 想作为 a 标签获取时为 true。初始值为 false<br />list : 想作为列表页面获取时为 true。初始值为 false<br />icon : 想添加图标时，为 font-awesome 的类名   |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | URL 或标签 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 获取“通知信息”表的 id1 的数据
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">欢迎使用 Exment！</a>

~~~






## NotifyService / 通知服务
进行通知时调用的服务。

- namespace Exceedone\Exment\Services


### 函数列表


#### (static)notifyMail
进行邮件通知。


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $params | array | 通知参数。键和说明如下 |
| $params['prms'] | array | 在主题和正文中替换的键、值的数组 |
| $params['user'] | CustomValue(user) or string | 邮件收件人的用户对象，或邮件地址 |
| $params['custom_value'] | CustomValue | 邮件发送对象的自定义数据 |
| $params['mail_template'] | MailTemplate or string or id | 通知模板信息 |
| $params['subject'] | string | 主题 |
| $params['body'] | string | 正文 |
| $params['to'] | string | 邮件收件人。多个时用逗号分隔 |
| $params['cc'] | string | 邮件 CC。多个时用逗号分隔 |
| $params['bcc'] | string | 邮件 BCC。多个时用逗号分隔 |


##### 使用示例

~~~ php
    // 例1 简单的邮件发送
    NotifyService::notifyMail([
        'subject' => '测试',
        'body' => '这是正文',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // 例2 使用通知模板
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // 例3 替换参数
    NotifyService::notifyMail([
        'subject' => '测试 ${prms1} ${prms2}',
        'body' => '这是正文。${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 用自定义数据替换参数
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => '测试',
        'body' => '这是正文。${value:contract_code}', // 用 $custom_value 的 contract_code 的值替换
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
显示页面右上角的页眉通知。


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $params | array | 通知参数。键和说明如下 |
| $params['prms'] | array | 在主题和正文中替换的键、值的数组 |
| $params['user'] | CustomValue(user) | 通知接收方的用户对象 |
| $params['custom_value'] | CustomValue | 通知对象的自定义数据 |
| $params['mail_template'] | MailTemplate or string or id | 通知模板信息 |
| $params['subject'] | string | 主题 |
| $params['body'] | string | 正文 |


##### 使用示例

~~~ php
    // 例1 给用户 ID 为 1 的用户发送简单的通知
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => '测试',
        'body' => '这是正文',
        'user' => $user,
    ]);
    

    // 例2 使用通知模板
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // 例3 替换参数
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => '测试 ${prms1} ${prms2}',
        'body' => '这是正文。${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 用自定义数据替换参数
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => '测试',
        'body' => '这是正文。${value:contract_code}', // 用 $custom_value 的 contract_code 的值替换
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
向 Slack 发送通知。


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $params | array | 通知参数。键和说明如下 |
| $params['webhook_url'] | string | WebHook 的 URL |
| $params['webhook_name'] | string | 发布到 Slack 时的名称 |
| $params['webhook_icon'] | string | 发布到 Slack 时的图标 |
| $params['prms'] | array | 在主题和正文中替换的键、值的数组 |
| $params['custom_value'] | CustomValue | 通知对象的自定义数据 |
| $params['mail_template'] | MailTemplate or string or id | 通知模板信息 |
| $params['subject'] | string | 主题 |
| $params['body'] | string | 正文 |


##### 使用示例

~~~ php
    // 例1 向 Slack 发送简单的通知
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '测试',
        'body' => '这是正文',
    ]);
    

    // 例2 使用通知模板
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 例3 替换参数
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '测试 ${prms1} ${prms2}',
        'body' => '这是正文。${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 用自定义数据替换参数
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => '测试',
        'body' => '这是正文。${value:contract_code}', // 用 $custom_value 的 contract_code 的值替换
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
向 Microsoft Teams 发送通知。


##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $params | array | 通知参数。键和说明如下 |
| $params['webhook_url'] | string | WebHook 的 URL |
| $params['prms'] | array | 在主题和正文中替换的键、值的数组 |
| $params['custom_value'] | CustomValue | 通知对象的自定义数据 |
| $params['mail_template'] | MailTemplate or string or id | 通知模板信息 |
| $params['subject'] | string | 主题 |
| $params['body'] | string | 正文 |


##### 使用示例

~~~ php
    // 例1 向 Teams 发送简单的通知
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '测试',
        'body' => '这是正文',
    ]);
    

    // 例2 使用通知模板
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 例3 替换参数
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '测试 ${prms1} ${prms2}',
        'body' => '这是正文。${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 用自定义数据替换参数
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => '测试',
        'body' => '这是正文。${value:contract_code}', // 用 $custom_value 的 contract_code 的值替换
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / 文件管理类
管理上传到 Exment 的各种文件（文件列和图片列的文件、附件、头像图像 etc...）的类。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### 属性

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| uuid | string | 管理文件的唯一字符串。原来的文件名可能重复，所以 Exment 给所有文件都赋予了 uuid。 |
| file_type | integer | 文件的种类（1：自定义列、2：附件、3：头像、4：系统、5：表单图像、6：公开表单） |
| local_dirname | string | 保存文件的目录的名称 |
| local_filename | string | 保存的文件名（通常是 uuid＋扩展名） |
| filename | string | 上传时原本的文件名 |
| parent_type | string | 文件所关联的 CustomTable 的名称 |
| parent_id | string | 文件所关联的 CustomValue 的 ID |
| custom_column_id | integer | 文件所关联的 CustomColumn 的 ID |
| custom_form_column_id | integer | 文件所关联的 CustomFormColumn 的 ID |
| path | string | 保存的文件的路径。不是完整路径，而是相对于上传存储的相对路径。 |
| extension | string | 文件的扩展名 |



### 函数列表

#### (static)getUrl
返回用来访问文件的 URL。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $path | string | 文件的相对路径 |
| $options | array | 指定获取方法的关联数组。 <br />asApi : 想获取 API 的 URL 时为 true。初始值为 false  |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 文件的 URL |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// 获取测试表的 id1 的数据
$value = CustomTable::getEloquent('test')->getValueModel(1);
// 获取文件列的值（文件列和图片列中存放的是相对路径）
$file_path = $value->getValue('file');
// 获取 URL
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
把文件内容保存到存储，并在文件管理表中添加数据。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $file_type | integer | 文件的种类（详情参照属性） |
| $content | mixed | 文件内容。可以指定 UploadedFile 或 String（写入文件的字符串）等。 |
| $dirname | string | 保存文件的目录的名称 |
| $filename | string | 原来的文件名 |
| $options | array | 指定保存时的选项的关联数组。  |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| File | 添加到文件管理表的数据的实例 |

##### 使用示例
※参照 saveCustomValue、saveDocumentModel。

---

#### saveCustomValue
给文件管理表的数据附加 CustomValue 的信息。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $custom_value_id | integer | CustomValue 的 ID |
| $custom_column | mixed | 文件种类为自定义列时，为 CustomColumn 的实例／对象数据的 ID／列名(英文数字) |
| $custom_table | mixed | CustomTable 的实例 |
| $replace | bool | 要把指定列所关联的文件全部替换时为 true。初始值为 false |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| File | 文件管理表的实例 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// 获取测试表
$custom_table = CustomTable::getEloquent('test');
// 获取测试表的 id=1 的数据
$custom_value = $custom_table->getValueModel(1);
// 获取测试表的 file 列
$file_column = CustomColumn::getEloquent('file', $custom_table);
// 把字符串“hogehoge”以“hoge.txt”的名称保存到存储。在文件管理表中添加数据，并和测试表的 id=1 的数据的 file 列关联
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// 更新测试表的 id=1 的数据的 file 列
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
根据文件管理表的数据创建文档信息。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $custom_value | CustomValue | 要关联文档的 CustomValue 实例 |
| $document_name | string | 文档的文件名 |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| File | 添加到文档表的数据的实例 |

##### 使用示例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// 获取测试表
$custom_table = CustomTable::getEloquent('test');
// 获取测试表的 id=1 的数据
$custom_value = $custom_table->getValueModel(1);

// 把字符串“hogehoge”以“hoge.txt”的名称保存到存储。在文件管理表中添加数据
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// 把文件管理表的数据和测试表的 id=1 的数据关联
$file = $file->saveCustomValue(1, null, $custom_table);
// 创建文档信息（和测试表的 id=1 的数据关联）
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### 补充：关于文件的处理
在 Exment 的自定义数据中查看文件列的信息，会发现只设置了简单的相对路径。  
实际的文件存放在存储中。管理访问这个存储上的文件所需的信息、文件的种类，以及它和哪个自定义数据关联的，就是文件管理表(files)。  
除了上传到文件列和图片列的文件以外，还横向管理附件、头像图像、系统的图标和徽标等各种文件。（另外，附件还另外使用名为文档表的独自的表）  
因此，在插件中给文件列设置数据，或者添加附件时，需要比普通字段稍微复杂一些的写法。  
详情请看上面的“使用示例”和示例插件。
