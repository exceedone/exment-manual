# 日志
本页说明 Exment 留下的记录（日志）的查看方法和设置方法。  
想查“谁、在什么时候、做了什么”时看操作日志，想查错误的原因时看日志文件。

## 日志的种类
Exment 的日志有 2 种。

| 种类 | 内容 | 查看的位置 |
| --- | --- | --- |
| **操作日志** | 各用户在页面上操作的内容。 | Exment 的页面（系统管理员） |
| **日志文件输出** | 主要是发生错误时的记录。 | 服务器上的文件 |


## 操作日志
在 Exment 的页面上，以列表显示各用户在页面上操作的内容。  
记录的主要是以下操作。

- 页面的显示，数据的新增、更新、删除等
- API 的认证和执行


### 确认方法
操作日志的页面由系统管理员打开。打开的方法有 2 种。

- 输入以下 URL。  
http(s)://(Exment的URL)/auth/logs    

> ※此 URL 是不带“/admin”的标准设置（v7.2.1 及以上版本新安装的站点）时的写法。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点为“admin”），请在站点的 URL 后面加上该值（例：`http(s)://(Exment的URL)/admin/auth/logs`）。详情请参阅[更改、删除 URL 中包含的“admin”](/zh/additional_prefix)。

- 或者，在菜单中添加“操作日志”，从那里打开。  
“操作日志”在默认设置下不显示在菜单中。要添加时，打开“管理员设置” > “菜单”页面，选择菜单类型“系统菜单”。对象中会显示“操作日志”，请选择并保存。

会显示操作日志的列表页面。

![数据页面](../img/logs/auth_logs1.png)  

点击某一行，会显示该操作的详细内容。  

![数据页面](../img/logs/auth_logs2.png)  

### 关于各项目

- ##### 用户名  
进行操作的用户。※未登录状态下的操作，此项为空。

- ##### 方法
HTTP 请求的方法种类。

- ##### 路径
HTTP 请求的目标 URI。  
※GET 方法的查询字符串（URL 中“?”之后的部分）不会出现在这一项中。会出现在“输入/查询”中。

- ##### IP 地址
进行操作的终端的 IP 地址。

- ##### 输入/查询
HTTP 请求的查询字符串，或 POST 的值。  

- ##### 创建时间
进行操作的日期和时间。


### 其他
- “输入/查询”中，以下项目的值属于机密信息，所以替换为字符串"***"（掩码）后保存。
    - password
    - password_confirmation
    - current_password
    - _token
    - verify_code
    - access_token
    - refresh_token
    - system_line_channel_token
    - system_line_channel_secret

※上述项目不受下文“机密信息的掩码”中 `config/exment.php` 设置的影响，始终会被掩码。  
※“system_line_channel_token”“system_line_channel_secret”在 v7.0.0 及以上版本中被掩码。


### 机密信息的掩码
※此设置可在 Exment v7.0.0 及以上版本中使用。在 v6.x 中，只有上文“其他”中列出的项目（LINE 的 2 项除外）会被掩码。

操作日志中，有时会记录用户输入的值、API 发送的值、URL 路径中包含的值。

为了不让认证信息等机密信息原样保存，Exment 在记录操作日志时，会对设置的项目和 URL 路径中的值进行掩码（替换为"***"）。

掩码的设置可以在以下文件的 `operation_log` 部分更改。

`config/exment.php`

下面是 `config/exment.php` 中记载的 `operation_log` 的默认值。（省略了一部分注释）

```php
'operation_log' => [
    // 在所有页面中都掩码的项目名
    'mask_columns' => [
        // SSO (OAuth / SAML)
        'oauth_client_id',
        'oauth_client_secret',
        'saml_sp_privatekey',
        // 系统设置（reCAPTCHA 的密钥、SMTP 的密码）
        'recaptcha_secret_key',
        'system_mail_password',
        // Meilisearch 的 API 密钥
        'meili_key',
        // LINE Messaging API 的频道信息
        'system_line_channel_token',
        'system_line_channel_secret',
        // 插件的数据库连接密码
        'custom_password',
        // 插件（CRUD 页面）的认证信息
        'crud_auth_key',
        'crud_auth_password',
    ],

    // 只在特定页面、API 中掩码的项目名
    'mask_columns_by_uri' => [
        // API 设置页面
        'api_setting*' => ['id', 'secret', 'client_api_key'],
        // OAuth 的令牌获取 API
        'oauth/*' => ['client_id', 'api_key', 'client_secret'],
        // 密码重置页面
        'auth/reset*' => ['token'],
    ],

    // 对紧接其后的路径段进行掩码的 URI 前缀
    'mask_path_prefixes' => [
        'api_setting' => true,
        'oauth/clients' => true,
        // 密码重置的令牌。请不要删除，也不要改为 true
        'auth/reset' => false,
    ],
],
```

<span class="red">※在 `config/exment.php` 中写了 `operation_log` 时，不会与 Exment 本体的默认值合并，而是用所写的内容替换整个默认值。</span>  
要添加、更改掩码对象时，请先把上述默认值全部写上，再添加、更改项目。  
特别是 `mask_path_prefixes` 的 `'auth/reset' => false`，请不要删除。删除后，密码重置的令牌会不经掩码就被记录。

#### mask_columns

- 指定在任何页面、API 中都始终掩码的项目名。
- 请用于 API 密钥、客户端密钥等始终作为机密信息处理的值。
- 即使把这里指定的项目名用作自定义表中普通业务数据的项目，其值也会被掩码。

#### mask_columns_by_uri

- 指定只在特定页面或 API 中掩码的项目名。
- 数组的键指定从 `admin` 前缀起的相对 URI 模式。可以使用通配符 `*`。
- 请用于 `id`、`secret`、`client_id`、`api_key`、`token` 这类在其他页面中可能作为普通业务数据使用的项目名。
- 匹配的项目，包括嵌套的值在内，全部会被掩码。

#### mask_path_prefixes

- 在 URL 的路径中含有机密信息时使用。指定从 `admin` 前缀起的相对 URI 前缀后，会对紧接其后的路径段（用“/”分隔的下一部分）进行掩码。
- 用数组的值指定掩码的方式。
    - `true`: 值为 13 个字符以上时，只保留开头 8 个字符，其后替换为 `***`。12 个字符以下时，把整个值替换为 `***`。用于需要追踪的记录 ID 等。
    - `false`: 把整个值替换为 `***`。用于密码重置令牌等应当完全隐藏的值。
- 例如，把 `auth/reset` 设为 `false` 时，URL 中包含的密码重置令牌整体会被替换为 `***`。

#### 注意事项

- 掩码适用于新创建的操作日志。
- <span class="red">已有的操作日志，在升级 Exment 时不会自动掩码。</span>要把当前的设置也应用到已有的操作日志时，请先备份数据库，再执行以下命令。掩码后的值无法恢复。

```
php artisan exment:patchdata patch_log_opelation
```

※命令名中的“opelation”不是笔误。请按上面的写法输入。
- `config/exment.php` 在升级 Exment（`php artisan exment:update`）时不会被覆盖。因此，即使新版本中默认的掩码对象增加了，也不会反映到已经写了 `operation_log` 的环境中。升级时，请把 `operation_log` 的设置和上述默认值比较，手动添加缺少的掩码对象。
- 始终属于机密信息的值，请使用 `mask_columns`。只在特定页面或 API 中属于机密信息的值，请使用 `mask_columns_by_uri` 或 `mask_path_prefixes`（这是为了不误把普通业务数据掩码）。


### 自动删除操作日志
在操作日志页面的下方，可以设置自动删除旧的操作日志。

![自动删除操作日志的设置](../img/logs/auth_logs3.png)  

#### 启用自动删除
- 启用或停用操作日志的自动删除。
- 启用后，比保留期限更旧的日志会被自动删除。
- 停用后，日志不会被自动删除。
- 默认值为“NO”。


#### 日志保留期限（天）
- 指定保存操作日志的天数。
- 比指定天数更旧的日志会被自动删除。
- 请输入 1 以上的值。
- 此设置只在“自动删除操作日志”为 YES 时显示。
- 默认值为“180”。


#### 执行星期
- 指定执行自动删除的星期。
- 未选择时，不限星期执行。
- 占位文字为“全部”。


#### 执行月份
- 指定执行自动删除的月份。
- 未选择时，不限月份执行。
- 占位文字为“全部”。


#### 执行日
- 指定执行自动删除的日期。
- 未选择时，不限日期执行。
- 同时指定了执行星期和执行日时，在两个条件都满足的日期和时间执行。
- 占位文字为“全部”。


#### 执行时间（时）
- 指定执行自动删除的时刻（时）。
- 未选择时，不限小时执行。
- 占位文字为“全部”。


#### 执行时间（分）
- 指定执行自动删除的时刻（分）。
- 未选择时，不限分钟执行。
- 占位文字为“全部”。


#### 要停用自动删除时
1. 把“自动删除操作日志”设为“NO”。
2. 点击“保存”。

保存后，自动删除即被停用。


### 删除操作日志的旧数据
也可以使用插件（批处理）删除旧的操作日志。  
会把早于一定日期（默认为 14 天）的操作日志物理删除（无法恢复）。  
请通过以下链接安装插件（批处理）。  
[插件-操作日志 删除旧日志](https://github.com/exment-git/plugin-sample/tree/main/batch/OperationLogDelete)




## 日志文件输出  
主要在发生错误时，记录到服务器上的日志文件中。  
※进行下文“添加设置值”的设置后，也可以输出错误以外的内容。

### 确认方法
1. 在安装了 Exment 的服务器上，打开以下文件夹。  
(Exment的根文件夹)/storage/logs  

2. 请查看 laravel.log 文件。

### 添加设置值
- 更改[设置值](/zh/config)后，以下内容也可以输出到日志文件。设置的步骤请参阅[设置值](/zh/config)。

- ##### 输出请求值
    - 设置键 : EXMENT_DEBUG_MODE_REQUEST
    - 默认值 ： false
    - 作用 : 设为 true 后，把发给 Exment 的请求值输出到日志。  

- ##### 输出 SQL 日志
    - 设置键 : EXMENT_DEBUG_MODE_SQL
    - 默认值 ： false
    - 作用 : 设为 true 后，把 Exment 执行的 SQL 语句输出到日志。

- ##### 输出 SQL 日志 - 显示函数
    - 设置键 : EXMENT_DEBUG_MODE_SQLFUNCTION
    - 默认值 ： false
    - 作用 : “EXMENT_DEBUG_MODE_SQL”为 true 时，把这一项也设为 true，就会和 SQL 语句一起把调用方函数的列表输出到日志。

### 其他
- Laravel（Exment 使用的框架）除了输出到日志文件之外，还有以下功能。
    - 把日志输出到 Slack 等其他地方
    - 更改日志的格式
    - 每天切换日志的输出文件

- 这些设置请按照 [Laravel 的日志手册](https://readouble.com/laravel/12.x/ja/logging.html)（日语）进行。
