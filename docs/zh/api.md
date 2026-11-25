# API 设置
其他系统或程序可以通过 API（程序之间互相交换数据的入口）读写 Exment 的数据。
本页说明让 API 可以使用的设置，以及认证（确认以谁的身份执行）的方法。

到使用 API 为止的流程如下。

1. 在系统设置中把“使用 API”设为 YES（[系统设置变更](/zh/api?id=系统设置变更)）。
2. 从 3 种认证方式中选择 1 种，登记 API 应用（[API 认证方法](/zh/api?id=API-认证方法)）。
3. 获取访问令牌（调用 API 时附带的、有期限的口令）。
4. 带上访问令牌执行 API（[API 执行方法](/zh/api?id=API-执行方法)）。

认证采用使用 Exment 账户的 OAuth 方式。  
Exment 使用 [laravel/passport](https://github.com/laravel/passport) 进行认证。  
参考：[Laravel 12.x Laravel Passport](https://laravel.com/docs/12.x/passport)  
因此，认证方式依赖于 laravel/passport，本手册介绍 3 种认证方式。

※用户自己创建并使用密钥的“API 密钥”（v7.2.1 及以上版本），请参阅 [API 密钥](/zh/api_key)。它和本页的“API Key(API 密钥方式)”是不同的功能。

## 系统设置变更
要在 Exment 中使用 API，请从菜单“管理员设置 > 系统设置”中把“使用 API”改为 YES。

> ※此 URL 是不带“/admin”的标准设置（v7.2.1 及以上版本新安装的站点）时的写法。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点为“admin”），请在站点的 URL 后面加上该值（例：`http(s)://(Exment的URL)/admin/oauth/token`）。详情请参阅[更改、删除 URL 中包含的“admin”](/zh/additional_prefix)。

## API 认证方法
认证方式有 3 种。请选择适合用法的一种。

| 认证方式 | 适合的用法 |
| --- | --- |
| 1. 页面登录方式 | 从 Web 上执行 API 时 |
| 2. 密码方式 | 不方便调用 Web 页面的客户端应用 |
| 3. API 密钥方式 | 批处理执行 |

1. **OAuth 2.0, Authorization Code Flow(页面登录方式)**  
用户在浏览器中登录并批准应用的使用后，就可以使用 API 的方式。推荐在从 Web 上执行 API 时使用。

1. **Password Grant Token(密码方式)**  
在认证请求中包含登录 ID 和密码后，就可以使用 API 的方式。推荐用于不方便调用 Web 页面的客户端应用。

1. **API Key(API 密钥方式)**  
在创建 API 应用时生成 API 密钥。之后，在认证请求中包含 API 密钥，就可以使用 API 的方式。推荐用于批处理执行。


### 1. OAuth 2.0, Authorization Code Flow(页面登录方式)
这是用户从新开发的 Web 服务（例：会计系统）登录 Exment 后，就可以使用 API 的方式。按以下顺序进行。

- 认证时，Web 浏览器上会显示输入 Exment 的 ID 和密码的页面。  

- 用户输入 ID 和密码后，会显示批准应用的消息。    

![API 认证页面](../img/api/authorize1.png)  

- 用户批准后，返回 Web 服务（回调），并返回 code。

※本手册记载的是用 Laravel 构建 Exment 以外的 Web 服务时的例子。  
也可以用其他语言或框架构建。  

#### 设置方法

##### Exment 页面内的设置
- 系统管理员输入以下 URL。  
http(s)://(Exment的URL)/api_setting  
※进行上文的“系统设置变更”后，就可以打开。

- 从 v7.1.0 起，也可以从左侧菜单的“管理员设置”→“API 应用设置”打开（“使用 API”为 YES 时）。
- 在 v7.0 及以前的版本中，“API 应用设置”在默认设置下不显示在菜单中。要添加到菜单时，打开“管理员设置” > “菜单”页面，选择菜单类型“系统菜单”。对象中会显示“API 应用设置”，请选择并保存。


![API 认证页面](../img/api/api_setting1.png)  

- 显示 API 应用设置页面后，点击［新建］。  

- 填写必要事项。  

    **认证方式**  
	选择“页面登录方式”。  

	**应用名称**  
	请填写任意的名称。  

	**重定向 URL**  
	请填写用户在页面上完成认证时要重定向到的 URL。  

![API 认证页面](../img/api/api_setting2.png)  


- 保存完成后，会显示认证所需的 Client ID 和 Client Secret，请复制。  
※点击眼睛图标可以显示 Client Secret。  

![API 认证页面](../img/api/api_setting3.png)  

##### 自行开发的 Web 服务一侧的实现
- 在 Web 服务一侧，创建用来调用 Exment 认证页面的端点。

~~~
http(s)://(Exment的URL)/oauth/authorize  GET  
response_type: code
client_id: (复制的Client ID)
redirect_uri: (填写的callback URL)
scope: (用于访问的范围。列表见下文。有多个时用空格分隔)

例： http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- 例：
~~~ php
// Web 服务一侧的实现
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(复制的Client ID)',
        'redirect_uri' => '(填写的callback URL)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(Exment的URL)/oauth/authorize?'.$query);
}
~~~

- 在 Web 服务一侧，创建 Exment 认证完成后用来获取访问令牌的端点。

~~~
http(s)://(Exment的URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(复制的Client ID)",
    "client_secret": "(复制的Client Secret)",
    "redirect_uri": "(填写的callback URL)",
    "code": "(从重定向的URL中获取的code)"
}
~~~

- 例：
~~~ php
// Web 服务一侧的实现。端点为填写的 callback URL
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(Exment的URL)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(复制的Client ID)',
            'client_secret' => '(复制的Client Secret)',
            'redirect_uri' => '(填写的callback URL)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- 这样，响应值中会返回包含 access_token、refresh_token、expires_in 属性的 json。  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

使用这个访问令牌执行 API。


### 2. Password Grant Token(密码方式)
这是在认证请求中包含登录 ID 和密码后，就可以使用 API 的方式。

- 用户不需要在页面上输入 ID 和密码，所以在批处理等中也可以执行。  

- 需要在认证请求中包含用户的 ID 和密码。  

- 在 SSO 中支持 LDAP。不支持 OAuth 和 SAML 认证。

※本手册记载的是用 Laravel 构建 Exment 以外的 Web 服务时的例子。  
也可以用其他语言或框架构建。  

#### 设置方法

##### Exment 页面内的设置
- 系统管理员输入以下 URL。  
http(s)://(Exment的URL)/api_setting  
※进行上文的“系统设置变更”后，就可以打开。

- 从 v7.1.0 起，也可以从左侧菜单的“管理员设置”→“API 应用设置”打开（“使用 API”为 YES 时）。
- 在 v7.0 及以前的版本中，“API 应用设置”在默认设置下不显示在菜单中。要添加到菜单时，打开“管理员设置” > “菜单”页面，选择菜单类型“系统菜单”。对象中会显示“API 应用设置”，请选择并保存。

![API 认证页面](../img/api/api_setting1.png)  

- 显示 API 应用设置页面后，点击［新建］。  

- 填写必要事项。  

    **认证方式**  
	选择“密码方式”。  

	**应用名称**  
	请填写任意的名称。

![API 认证页面](../img/api/api_setting4.png)  


- 保存完成后，会显示认证所需的 Client ID 和 Client Secret，请复制。  
※点击眼睛图标可以显示 Client Secret。  

![API 认证页面](../img/api/api_setting5.png)  


##### 自行开发的程序一侧的实现
- 在调用方创建用来获取访问令牌的请求。

~~~
http(s)://(Exment的URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(复制的Client ID)",
    "client_secret": "(复制的Client Secret)",
    "username": "(要登录的用户ID或电子邮件地址)",
    "password": "(要登录的用户密码)",
    "scope": "(要访问的范围。列表见下文。有多个时用空格分隔)"
}
~~~

- 这样，响应值中会返回包含 access_token、refresh_token、expires_in 属性的 json。  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

使用这个访问令牌执行 API。


##### 自行开发的程序一侧的实现(LDAP 认证时)
- LDAP 认证时，请按以下方式进行 POST。

~~~
http(s)://(Exment的URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(复制的Client ID)",
    "client_secret": "(复制的Client Secret)",
	"login_type": "ldap",
	"provider_name": "(在登录设置页面中填写的“LDAP 名称（字母数字）”)",
    "username": "(要登录的用户ID或电子邮件地址)",
    "password": "(要登录的用户密码)",
    "scope": "(要访问的范围。列表见下文。有多个时用空格分隔)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

使用这个访问令牌执行 API。



### 3. API Key(API 密钥方式)
在创建 API 应用时生成 API 密钥。之后，在认证请求中包含 API 密钥，就可以使用 API 的方式。

- 用户不需要在页面上输入 ID 和密码。  
也不需要在执行方设置密码。开发批处理等时也不必嵌入密码，所以可以降低安全风险。

- **用这个设置登记 API 应用时，REST API 以创建 API 应用的用户的身份执行。**  

※本手册记载的是用 Laravel 构建 Exment 以外的 Web 服务时的例子。  
也可以用其他语言或框架构建。  

#### (补充)用 API Key 设置时推荐的用户、角色组设置

用这个设置登记 API 应用时，REST API 以创建 API 应用的用户的身份执行。  
因此，不太推荐由系统管理员登记 API 应用。  
建议按以下步骤设置用户和角色组。  

- 新建[角色组设置](/zh/role_group)。
    - 添加“API 应用管理”权限。
	- 为要通过 API 执行的表添加权限。

- 添加用于执行 API 的用户。
    - 角色组选择上面创建的角色组。

- 用上面创建的用户登录，打开 API 应用设置页面，登记 API 应用。


#### 设置方法

##### Exment 页面内的设置
- 系统管理员输入以下 URL。  
http(s)://(Exment的URL)/api_setting  
※进行上文的“系统设置变更”后，就可以打开。

- 从 v7.1.0 起，也可以从左侧菜单的“管理员设置”→“API 应用设置”打开（“使用 API”为 YES 时）。
- 在 v7.0 及以前的版本中，“API 应用设置”在默认设置下不显示在菜单中。要添加到菜单时，打开“管理员设置” > “菜单”页面，选择菜单类型“系统菜单”。对象中会显示“API 应用设置”，请选择并保存。

![API 认证页面](../img/api/api_setting1.png)  

- 显示 API 应用设置页面后，点击［新建］。  

- 填写必要事项。  

    **认证方式**  
	选择“API 密钥方式”。  

	**应用名称**  
	请填写任意的名称。

![API 认证页面](../img/api/api_setting4.png)  


- 保存完成后，会显示认证所需的 Client ID、Client Secret 和 API 密钥，请复制。  
※点击眼睛图标可以显示 Client Secret 和 API 密钥。  

![API 认证页面（日语界面）](../ja/img/api/api_setting6.png)  


##### 自行开发的程序一侧的实现
- 在调用方创建用来获取访问令牌的请求。

~~~
http(s)://(Exment的URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(复制的Client ID)",
    "client_secret": "(复制的Client Secret)",
    "api_key": "(复制的API密钥)",
    "scope": "(要访问的范围。列表见下文。有多个时用空格分隔)"
}
~~~

- 这样，响应值中会返回包含 access_token、refresh_token、expires_in 属性的 json。  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

使用这个访问令牌执行 API。


## API 执行方法
执行 API 时，在请求头中添加以下内容。  
  
~~~
Content-Type: application/json  
Authorization: Bearer (获取的访问令牌)  
~~~

例：
~~~  
http://localhost/api/data/user GET
请求头的值：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

结果：
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> ※此 URL 是不带“/admin”的标准设置（v7.2.1 及以上版本新安装的站点）时的写法。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点为“admin”），请在站点的 URL 后面加上该值（例：`http(s)://(Exment的URL)/admin/oauth/token`）。详情请参阅[更改、删除 URL 中包含的“admin”](/zh/additional_prefix)。

## 令牌刷新
访问令牌过了一定时间后会过期，无法再使用。  
这时，可以使用刷新令牌（用来重新获取访问令牌的值）再次获取访问令牌。  
请用以下内容执行 HTTP POST。    

~~~
http(s)://(Exment的URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(复制的Client ID)",
    "client_secret": "(复制的Client Secret)",
    "refresh_token": "(获取的刷新令牌)"
}
~~~

结果：
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## （参考）在页面上进行认证、令牌获取和 API 执行
这是在编写程序之前，用浏览器和工具试一遍从认证到执行 API 的步骤。  
请用来掌握到获取访问令牌为止的流程。    

- 在 API 设置中，用“页面登录方式”创建应用。

- 访问以下 URL。  
http(s)://(Exment的URL)/oauth/authorize?client_id=(复制的Client ID)&redirect_uri=(填写的callback URL)&response_type=code&scope=me  
  
例：  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- 这样，会显示一个用于应用认证的简单页面。  

![API 认证页面](../img/api/authorize1.png)  

点击“授权”。  

- URL 栏中会增加“code=xxxxx”这样的查询。  
复制这个 code。    
例：  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- 使用可以进行 POST 通信的工具，执行以下 HTTP 通信。  
  
~~~
http(s)://(Exment的URL)/oauth/token  POST  
grant_type: authorization_code
client_id: (复制的Client ID)
client_secret: (复制的Client Secret)
redirect_uri: (填写的callback URL)
code: (获取的code值)  
~~~
  
例：  
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- 正常完成后，会返回如下的响应。  
![API 认证页面](../img/api/authorize2.png)  
从这个响应的 json 值中获取 access_token。  

- 把这个访问令牌添加到 API 的请求头中，执行 API。  
  
例：  
~~~
http://localhost/api/data/user GET
请求头的值：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
结果：  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## 范围一览
范围（scope）是决定“允许该应用通过 API 做到哪一步”的值。  
可以在获取令牌时指定的范围之内执行 API。  
**※无论范围如何设置，通过 API 能访问的只有登录用户拥有的角色、权限内的信息。**  
例如，不能获取没有权限的表的信息，也不能更新没有权限的自定义数据。    


| 参数名 | 说明 |
| ---- | ---- |
| me | 可以获取登录用户的信息。 |
| system_read | 可以获取系统信息。 (目前未使用。作为保留字记载) |
| system_write | 可以获取、新增、更新、删除系统信息。(目前未使用。作为保留字记载) |
| table_read | 可以获取自定义表的设置信息。 |
| table_write | 可以获取、新增、更新、删除自定义表的设置信息。(目前未使用。作为保留字记载) |
| view_read | 可以获取自定义视图的设置信息。 |
| value_read | 可以获取自定义数据的信息。 |
| value_write | 可以获取、新增、更新、删除自定义数据的信息。 |
| notify_read | 可以获取通知的信息。 |
| notify_write | 可以新增通知。 |
| workflow_read | 可以获取工作流的信息。 |
| workflow_execute | 可以执行工作流。 |
| log | 可以获取操作日志。 |
| plugin | 可以使用作为插件添加的 API。详情见[这里](/zh/plugin_quickstart_api) |

※指定多个范围时，请用空格分隔后设置到参数中。  



## 错误代码一览(确认中)
执行 API 时发生错误，会返回错误代码。  
下面是错误代码和 HTTP 响应状态码的列表。    

| Exment 错误代码 | HTTP 状态码 | 说明 | 
| ---- | ---- | ---- |
| 101 | 403 | 没有访问该端点、自定义表的权限。请检查执行用户的权限。 |
| 102 | 400 | 执行时的查询字符串或发送的值有问题。请检查这些值。 |
| 103 | 400 | 主要在添加、更新数据时，发送的值没有通过验证（validation）。请检查发送的值。 |
| 104 | 403 | 因设置而无法执行数据的新建、更新、删除等操作时发生。 |
| 105 | 403 | 是不能删除的数据。 |
| 106 | 403 | API 认证时的范围有误。请检查范围的值。 |
| 107 | 400 | 指定 id 获取特定数据时，该值不存在。请指定 id。 |
| 108 | 401 | API 认证时的访问令牌有误，或已过期。请检查访问令牌。 |
| 109 | 400 | 新建或删除数据时，请求超过了可以同时处理的条数（标准：100 条）时发生。 |
| 110 | 403 | 对已经删除的数据进行更新等操作时发生。 |
| 111 | 500 | 执行插件（API）时，指定的插件不存在时发生。请检查插件名称。 |
| 112 | 400 | 在以视图为对象的 API 中，表和视图不对应时发生。 |
| 113 | 400 | 在以视图为对象的 API 中，指定了不支持的视图种类时发生。 |
| 201 | 403 | 对因工作流的状态而被锁定的数据进行更新、删除等操作时发生。 |
| 202 | 400 | 执行“当前工作流的执行值”API 时，工作流还没有开始时发生。 |
| 203 | 400 | 执行“获取特定数据的处理用户列表”“获取特定数据可以执行的下一个操作的列表”API 时，工作流已经完成时发生。 |
| 204 | 400 | 执行“对特定数据执行工作流”API 时，指定的操作 ID 不能执行时发生。 |
| 205 | 400 | 执行“对特定数据执行工作流”API 时，下一处理用户不存在时发生。 |
| 301 | 400 | 因 IP 限制，无法执行 API。 |
| 401 | 403 | 在公开表单用的 API 中，目标表不包含在公开表单中时发生。 |
| 402 | 403 | 对设置了“仅可登记一条”的表，试图新建第 2 条及以后的数据时发生。 |

## WebAPI 参考
API 的参考请参阅 [API 参考](https://exment.net/reference/ja/webapi.html)（日语）。
