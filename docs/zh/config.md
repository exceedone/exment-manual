# Exment 设置值一览
在 Exment(以及相关的库)中，改写项目文件夹里的“.env”文件，就可以更改内部的设置。  
本页是“.env”文件中可以使用的设置值一览。每个项目都写明了设置键、默认值和作用。  

## 设置方法
打开项目文件夹中的“.env”文件，按下面这样，以“设置键=值”的形式追加。  
※如果已经有同名的键，请改写它的值。

~~~
#例1
EXMENT_API=false

#例2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※“=”的前后请不要加空格。

## 设置值一览

#### 应用程序语言
- 设置键 : APP_LOCALE
- 默认值 ： en
- 作用 : 应用程序显示的语言。日语请填写“ja”。


#### 时区
- 设置键 : APP_TIMEZONE
- 默认值 ： UTC
- 作用 : 应用程序使用的时区。日本请填写“Asia/Tokyo”。


#### 更改“/admin”URL
- 设置键 : ADMIN_ROUTE_PREFIX
- 默认值 ： admin
- 作用 : 显示 Exment 时的路径名。详情请查看[这里](/zh/additional_prefix)。


#### 更改公开表单的“/publicform”URI

- 设置键 : EXMENT_PUBLICFORM_ROUTE_PREFIX
- 默认值 ： publicform
- 作用 : 显示公开表单时的路径名。详情请查看[这里](/zh/publicform)中关于更改 URL 所含“publicform”的说明。


#### 启用缓存
- 设置键 : EXMENT_USE_CACHE
- 默认值 ： false
- 作用 : 为 true 时，启用缓存。把自定义表、列、视图、工作流等主数据缓存起来。在某些环境下速度会变快。


#### 手册 URL
- 设置键 : EXMENT_MANUAL_URL
- 默认值 : https://exment.net/docs/#/
- 作用 : 设置 Exment 的手册 URL。


#### 更新历史默认值
- 设置键 : EXMENT_REVISION_COUNT
- 默认值 : 100
- 作用 : 保存数据时保留的更新历史的默认值。在新建表时使用。


#### Composer 路径
- 设置键 : EXMENT_COMPOSER_PATH
- 默认值 : (无)
- 作用 : composer 命令的路径。没有特别指定时，视为已经加入环境变量 PATH。


#### MySQL 路径
- 设置键 : EXMENT_MYSQL_BIN_DIR
- 默认值 : (无)
- 作用 : mysql 命令的路径。没有特别指定时，视为已经加入环境变量 PATH。


#### 搜索索引数量
- 设置键 : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- 默认值 : 20
- 作用 : 每个表可以设置的搜索索引列数的上限。  
<span class="red">※更改设置值请自行负责。开发方没有对 21 个以上的情况做过动作确认。</span>


#### 允许反向代理的 IP
- 设置键 : ADMIN_TRUST_PROXY_IPS
- 默认值 : 无
- 作用 : 详情请查看[这里](/zh/additional_reverse_proxy)。


#### 反向代理的判别标头
- 设置键 : ADMIN_TRUST_PROXY_HEADERS
- 默认值 : 无
- 作用 : 详情请查看[这里](/zh/additional_reverse_proxy)。


#### 禁用 Exment 标准的错误处理
- 设置键 : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- 默认值 : false
- 作用 : 设为 true 后，禁用 Exment 包附带的错误处理。


### 登录
#### 显示默认登录提供方
- 设置键 : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- 默认值 : true
- 作用 : 切换是否显示使用 Exment 的 ID 和密码的登录表单。在使用单点登录时，这个设置才有效。详情请查看[这里](/zh/login_sso)。

#### SSO 登录提供方字符串
- 设置键 : EXMENT_LOGIN_PROVIDERS
- 默认值 : (无)
- 作用 : 用逗号分隔，设置 SSO 使用的提供方名称一览。详情请查看[这里](/zh/login_sso)。


#### 统计登录失败次数
- 设置键 : EXMENT_THROTTLE
- 默认值 : true
- 作用 : 为 true 时，登录连续失败达到一定次数后，在经过一定时间之前无法登录。  

#### 登录失败次数
- 设置键 : EXMENT_MAX_ATTEMPTS
- 默认值 : 5
- 作用 : 到一定时间内无法登录为止的登录失败次数。  

#### 登录失败恢复时间(分钟)
- 设置键 : EXMENT_DECAY_MINUTES
- 默认值 : 60
- 作用 : 无法登录后，到可以再次登录为止的时间(分钟)。 

#### 关闭浏览器时自动退出登录
- 设置键 : EXMENT_SESSION_EXPIRE_ON_CLOSE
- 默认值 : false
- 作用 : 为 true 时，关闭浏览器后自动退出登录。

#### 登录页面不使用页眉徽标
- 设置键 : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- 默认值 : false
- 作用 : 为 true 时，即使在 Exment 的系统设置中设置了徽标，登录页面也不使用页眉。

#### 使用双重验证
- 设置键 : EXMENT_LOGIN_USE_2FACTOR
- 默认值 : false
- 作用 : 为 true 时，登录设置页面会显示“双重验证”的设置，可以使用双重验证。详情请查看[这里](/zh/login_2factor_setting)。

#### 双重验证(邮件)验证码的有效时间(分钟)
- 设置键 : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- 默认值 : 10
- 作用 : 在用邮件进行的双重验证中，邮件发送的验证码有效的时间(分钟)。

#### 禁用 SSO 登录设置
- 设置键 : EXMENT_CUSTOM_LOGIN_DISABLED
- 默认值 : false
- 作用 : 为 true 时，强制禁用 SSO 等登录设置，只显示用 Exment 的 ID 和密码登录的表单。详情请查看[这里](/zh/login_sso)中关于禁用 SSO 登录设置的说明。

#### 禁用 IP 限制
- 设置键 : EXMENT_DISABLE_IP_FILTER
- 默认值 : false
- 作用 : 为 true 时，强制禁用系统设置的 IP 地址限制。在 IP 地址限制设置错误、无法访问等情况下使用。详情请查看[这里](/zh/additional_ip_filter)。


### 搜索
#### 搜索时完全匹配
> 已改为从系统设置页面更改。


#### 从搜索页面跳转到列表页面时是否带筛选
- 设置键 : EXMENT_SEARCH_LIST_LINK_FILTER
- 默认值 : true
- 作用 : 设为 true 后，从全部数据搜索页面／关联数据搜索页面移动到数据列表页面时，可以把输入的搜索条件作为筛选保留下来，显示列表。


#### 从搜索栏搜索时，把自定义数据的“附件”的文件名作为搜索对象
- 设置键 : EXMENT_SEARCH_DOCUMENT
- 默认值 : false
- 作用 : 设为 true 后，从搜索栏搜索时，可以把自定义数据的“附件”的文件名作为搜索对象。
<span class="red">※为 true 时，搜索页面不使用全文搜索引擎(Meilisearch)。详情请查看[这里](/zh/additional_meilisearch)。</span>


#### 关键字搜索最大条数
- 设置键 : EXMENT_KEYWORD_SEARCH_COUNT
- 默认值 : 1000
- 作用 : 关键字搜索时，每个表取得的最大条数。


#### 关联数据搜索最大条数
- 设置键 : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- 默认值 : 5000
- 作用 : 关联数据搜索时，每个表取得的最大条数。


#### 关键字搜索时保留视图
- 设置键 : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- 默认值 : false
- 作用 : 为 true 时，以表为单位进行关键字搜索时，保留当时选择的视图。
（为 false 时，用全部数据视图进行关键字搜索。）



#### 关于全文搜索引擎(Meilisearch)的设置
下面以“MEILISEARCH_”开头的设置值，是使用全文搜索引擎“Meilisearch”时的设置。详情请查看[这里](/zh/additional_meilisearch)。
<span class="red">※其中，“MEILISEARCH_HOST”“MEILISEARCH_KEY”“MEILISEARCH_INDEX”“MEILISEARCH_GLOBAL_SEARCH”“MEILISEARCH_REALTIME_SYNC”“MEILISEARCH_BATCH_SIZE”“MEILISEARCH_REPAIR_ENABLED”“MEILISEARCH_REPAIR_AT”“MEILISEARCH_FILTER_MODE”，建议从菜单“管理员设置 > 系统设置(详细设置)”设置。保存这个页面后，这些项目以页面上的值优先于“.env”，“.env”的更改不再生效。用“.env”设置时的注意事项，请查看[这里](/zh/additional_meilisearch)。</span>
※上面以外的设置值，只能用“.env”设置。


#### Meilisearch 服务器的连接地址
- 设置键 : MEILISEARCH_HOST
- 默认值 : http://127.0.0.1:7700
- 作用 : Meilisearch 服务器的连接地址。


#### Meilisearch 的主密钥
- 设置键 : MEILISEARCH_KEY
- 默认值 : (无)
- 作用 : 连接 Meilisearch 用的主密钥。填写安装 Meilisearch 时生成的密钥。


#### 搜索时使用 Meilisearch
- 设置键 : MEILISEARCH_GLOBAL_SEARCH
- 默认值 : false
- 作用 : 为 true 时，关键字搜索时不用数据库，而用 Meilisearch 进行搜索。


#### 把更新内容实时反映到 Meilisearch
- 设置键 : MEILISEARCH_REALTIME_SYNC
- 默认值 : false
- 作用 : 为 true 时，在新建、更新、删除自定义数据时，把内容反映到 Meilisearch 的索引中。
※使用这个设置时，需要设置队列，并运行队列工作进程。


#### Meilisearch 的索引自动修复
- 设置键 : MEILISEARCH_REPAIR_ENABLED
- 默认值 : false
- 作用 : 为 true 时，每天自动修复一次数据库与 Meilisearch 索引之间的差异。
※使用这个设置时，需要设置任务计划。


#### Meilisearch 的索引自动修复 执行时刻
- 设置键 : MEILISEARCH_REPAIR_AT
- 默认值 : 03:00
- 作用 : 执行索引自动修复的时刻。以“HH:MM”的形式填写。
※设置了“HH:MM”以外的形式时，不执行自动修复，并在日志中输出警告。


#### Meilisearch 的索引名
- 设置键 : MEILISEARCH_INDEX
- 默认值 : exment_global
- 作用 : 在 Meilisearch 中创建的索引的名称。  
※更改后，请执行“php artisan exment:meili-index”，重新创建索引。  
※多个 Exment 使用同一个 Meilisearch 服务器时，请给每个 Exment 设置不同的索引名。不能使用其他 Exment 正在使用的索引。  
(使用索引的 Exment，会以从“APP_KEY”生成的识别符，记录在名为“(索引名)__owner”的索引中。因此，更改了“APP_KEY”时，也会被当作另一个 Exment。)


#### Meilisearch 的索引创建单位
- 设置键 : MEILISEARCH_BATCH_SIZE
- 默认值 : 1000
- 作用 : 创建索引时，一次请求发送的文档条数。


#### Meilisearch 的连接超时时间
- 设置键 : MEILISEARCH_CONNECT_TIMEOUT
- 默认值 : 1.0
- 作用 : 连接 Meilisearch 服务器时的超时时间(秒)。


#### Meilisearch 的超时时间
- 设置键 : MEILISEARCH_TIMEOUT
- 默认值 : 5.0
- 作用 : 向 Meilisearch 服务器发送请求的超时时间(秒)。


#### Meilisearch 连接失败时的等待时间
- 设置键 : MEILISEARCH_UNREACHABLE_BACKOFF
- 默认值 : 10
- 作用 : 无法连接 Meilisearch 服务器时，到再次尝试连接为止的时间(秒)。在这段时间内，不尝试连接 Meilisearch，立即当作错误处理(搜索时切换为用数据库搜索)。这样可以防止在 Meilisearch 停止期间，每次处理都要等到连接超时。  
※设为 0 时，不等待，每次都尝试连接。


#### Meilisearch 的搜索匹配条件
- 设置键 : MEILISEARCH_MATCHING_STRATEGY
- 默认值 : all
- 作用 : 用多个单词搜索时的匹配条件。为 all 时，搜索包含所有单词的数据。为 last 时，如果匹配的条数少，就从末尾的单词起依次去掉条件再搜索。


#### Meilisearch 的权限筛选取得条数
- 设置键 : MEILISEARCH_PERMISSION_SCAN_CAP
- 默认值 : 1000
- 作用 : 为了按用户的权限筛选搜索结果，事先多取一些数据的条数上限。


#### Meilisearch 的分面最大值
- 设置键 : MEILISEARCH_MAX_FACET_VALUES
- 默认值 : 1000
- 作用 : 在搜索结果的筛选(分面)中，每个项目取得的值的上限。
※设置了小于 1000 的值时，按 1000 处理。


#### Meilisearch 的筛选动作
- 设置键 : MEILISEARCH_FILTER_MODE
- 默认值 : override
- 作用 : 在搜索结果页面的筛选(分面)中，决定对象列的方法。
为 override 时，先根据列的种类自动决定对象，再加上在“搜索筛选设置”页面添加的列，并去掉排除的列。(页面上为“自动 + 自定义”)
为 manual 时，只把在“搜索筛选设置”页面添加的列作为对象。(页面上为“仅自定义”)  
※更改后，需要重新创建索引。请执行“php artisan exment:meili-index”。


#### 在“选项（从其他表中选择）”中使用 Meilisearch
- 设置键 : MEILISEARCH_SELECT_TABLE
- 默认值 : false
- 作用 : 为 true 时，在自定义列“选项（从其他表中选择）”的输入补全(表单、API)中使用 Meilisearch。这是与“MEILISEARCH_GLOBAL_SEARCH”独立的设置。
※设为 true 后，候选的搜索方法会从对保存值的部分匹配，变为以单词为单位的前缀匹配。


#### Meilisearch 的索引重建单位
- 设置键 : MEILISEARCH_REINDEX_CHUNK_SIZE
- 默认值 : 500
- 作用 : 因自定义表、自定义列的设置更改而重建索引时，每次处理登记的文档条数。


#### Meilisearch 已保存搜索条件的上限
- 设置键 : MEILISEARCH_SAVED_SEARCH_LIMIT
- 默认值 : 50
- 作用 : 一个用户可以保存的搜索条件的最大条数。


#### Meilisearch 的同步队列名
- 设置键 : MEILISEARCH_SYNC_QUEUE
- 默认值 : default
- 作用 : 执行以一条自定义数据为单位的同步处理的队列的名称。


#### Meilisearch 的重建队列名
- 设置键 : MEILISEARCH_REINDEX_QUEUE
- 默认值 : (与 MEILISEARCH_SYNC_QUEUE 相同的值。初始状态为 default)
- 作用 : 执行以表为单位重新创建索引的处理的队列的名称。  
这个处理比较重，如果要与以一条自定义数据为单位的同步处理分开执行，请设置“meili-reindex”等与 MEILISEARCH_SYNC_QUEUE 不同的名称。这时，还需要在队列工作进程的“--queue=”中加上这个名称。


#### Meilisearch 的搜索对象语言
- 设置键 : MEILISEARCH_LOCALES
- 默认值 : jpn
- 作用 : Meilisearch 把文章分割成单词(分词)时使用的语言设置。用逗号分隔，填写 ISO-639-3 的语言代码。(例：“jpn”“jpn,eng”)留空时，这个设置会从索引中删除，由 Meilisearch 自动判定语言。
※使用这个设置需要 Meilisearch v1.10 以上。更改后，请执行“php artisan exment:meili-settings”。


### 邮件和通知设置
#### 显示或隐藏页面右上方的通知栏
- 设置键 : EXMENT_NOTIFY_NAVBAR
- 默认值 : true
- 作用 : 为 false 时，页眉右上方的通知图标不显示。

#### 从 env 文件使用邮件设置值
- 设置键 : EXMENT_MAIL_SETTING_ENV_FORCE
- 默认值 : false
- 作用 : 设为 true 后，邮件设置使用 .env 文件中的设置。  
(为 false 时，使用在系统设置页面填写的设置值。在系统设置页面设置了“主机名”时，即使 .env 的“MAIL_MAILER”仍是“log”，也用 SMTP 发送。)  
详情请查看[这里](/zh/mailsend_setting)。

#### 忽略连续邮件通知的时间(分钟)
- 设置键 : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- 默认值 : 5
- 作用 : 在新建、更新数据时的邮件通知中，同一条数据连续更新时，第 2 封以后的邮件会被跳过。这是用来判定连续通知条数的时间(分钟)。

#### 加密邮件的附件
- 设置键 : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- 默认值 : false
- 作用 : 设为 true 后，从页面用邮件发送附件时，把附件加密成 zip 再发送。  
解密密码另行发送。

#### 通知对象是登录用户时跳过通知
- 设置键 : EXMENT_NOTIFY_SKIP_SELF_TARGET
- 默认值 : true
- 作用 : 为 true 时，通知时如果通知对象是登录用户自己，就跳过通知。为 false 时，也通知登录用户自己。

### 工作流

#### 显示或隐藏待办任务的图标
- 设置键 : EXMENT_WORKFLOW_TASK_NAVBAR
- 默认值 : true
- 作用 : 为 false 时，页眉右上方的[待办任务](/zh/workflow_task)图标不显示。  
待办任务一览的页面，可以从 URL“/workflow_task”显示。

#### 待办任务图标的更新间隔(秒)
- 设置键 : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- 默认值 : 300
- 作用 : 页眉右上方的待办任务图标自动更新条数的间隔(秒)。设置了小于 30 的值时，按 30 秒处理。  
※每次更新都会确认所有工作流的数据。间隔越短，服务器的负载越高。

#### 通知同一组织的成员
- 设置键 : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- 默认值 : true
- 作用 : 组织的成员执行了发给组织的工作流操作时，用系统内提醒通知同一组织的其他成员。为 false 时不通知。  
详情请查看[待办任务](/zh/workflow_task)。

#### 显示工作流的 ID
- 设置键 : EXMENT_SHOW_WORKFLOW_ID
- 默认值 : false
- 作用 : 为 true 时，在工作流设置页面显示工作流的 ID 和操作的 ID。想在插件、API 等中确认 ID 时使用。

### LINE 联动

#### 频道访问令牌
- 设置键 : LINE_CHANNEL_ACCESS_TOKEN
- 默认值 : (无)
- 作用 : [LINE 联动](/zh/line)使用的 LINE 频道访问令牌。以在系统设置页面的“LINE 设置”中保存的值为优先。

#### 频道密钥
- 设置键 : LINE_CHANNEL_SECRET
- 默认值 : (无)
- 作用 : LINE 的频道密钥。以在系统设置页面的“LINE 设置”中保存的值为优先。

#### LINE 官方账号的基本 ID
- 设置键 : LINE_OA_BASIC_ID
- 默认值 : (无)
- 作用 : LINE 官方账号的基本 ID(以“@”开头的 ID)。以在系统设置页面的“LINE 设置”中保存的值为优先。

#### 防止 LINE 通知(时间经过)重复发送的时间(分钟)
- 设置键 : LINE_DEDUPE_MINUTES
- 默认值 : 0
- 作用 : 在触发条件为“时间经过”的 LINE 通知中，向同一用户发送了关于同一条数据的 LINE 消息之后，在这段时间(分钟)内不再发送。用其他通知设置发送的消息、发送失败的消息也算在内。为 0 时，这个功能无效。

#### LINE 关联码的有效期限(分钟)
- 设置键 : LINE_LINK_CODE_TTL_MINUTES
- 默认值 : 10
- 作用 : [LINE 账号关联](/zh/line)使用的关联码的有效期限(分钟)。

#### LINE 关联码的发送失败次数
- 设置键 : LINE_LINK_MAX_ATTEMPTS
- 默认值 : 5
- 作用 : 可以发送错误关联码的次数。超过这个次数后，一定时间内无法关联。

#### 统计 LINE 关联码发送失败的时间(分钟)
- 设置键 : LINE_LINK_ATTEMPT_DECAY_MINUTES
- 默认值 : 10
- 作用 : 统计错误关联码发送次数的时间(分钟)。从第一次发送错误的码起，在这段时间内错了“LINE_LINK_MAX_ATTEMPTS”次，就要等这段时间过去才能关联。

#### LINE 通信的超时(秒)
- 设置键 : LINE_HTTP_TIMEOUT
- 默认值 : 10
- 作用 : 与 LINE 的服务器通信时的超时时间(秒)。

#### LINE Messaging API 的 URL
- 设置键 : LINE_API_BASE
- 默认值 : https://api.line.me
- 作用 : LINE Messaging API 的 URL。通常请不要更改。

### 安全确认

#### 地震信息的取得地址 URL
- 设置键 : EXMENT_SAFETY_CHECK_FEED_URL
- 默认值 : https://api.p2pquake.net/v2/history
- 作用 : 在[安全确认](/zh/safety_check)的地震发生时自动发送中，取得地震信息的 API 的 URL。通常请不要更改。

#### 地震信息的取得条数
- 设置键 : EXMENT_SAFETY_CHECK_FEED_LIMIT
- 默认值 : 10
- 作用 : 一次确认(每分钟)取得的最新地震信息的条数。在 1～100 的范围内设置。

### API

#### 启用或禁用 API
> 已改为从系统设置页面更改。

#### API 的标准取得条数
- 设置键 : EXMENT_API_DEFAULT_DATA_COUNT
- 默认值 ： 20
- 作用 : 在 API 的数据一览取得中，不使用 count 时取得的数据条数。

#### API 的一览取得条数上限
- 设置键 : EXMENT_API_MAX_DATA_COUNT
- 默认值 ： 100
- 作用 : 在 API 的数据一览取得中，一次可以取得的最大条数。

#### API 的批量新建条数上限
- 设置键 : EXMENT_API_MAX_CREATE_COUNT
- 默认值 ： 100
- 作用 : 在 API 的批量新建中，一次可以新建的最大条数。

#### API 的批量删除条数上限
- 设置键 : EXMENT_API_MAX_DELETE_COUNT
- 默认值 ： 100
- 作用 : 在 API 的批量删除中，一次可以删除的最大条数。

#### API 的访问次数上限
※从 v6.2.4 起可以使用。

- 设置键 : EXMENT_API_MAX_RATE_LIMIT
- 默认值 ： 60
- 作用 : API 中每个用户(未认证时为每个 IP 地址)每分钟的访问次数上限。超过上限时，会出现 429 错误(Too Many Requests)。详情请查看[这里](/zh/additional_429_too_many)。

#### 数据的 label（）
- 设置键 : EXMENT_API_APPEND_LABEL
- 默认值 ： false
- 作用 : 设为 true 后，在取得数据一览，或执行数据的新建、更新时，可以包含 label 列。


### 列表(网格)

#### 禁用单击行时的页面跳转
- 设置键 : EXMENT_GRIDROW_SELECT_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，单击列表页面的行时不再跳转页面。

#### 单击行时跳转到编辑页面
- 设置键 : EXMENT_GRIDROW_SELECT_EDIT
- 默认值 : false
- 作用 : 设为 true 后，单击列表页面的行时，跳转到数据编辑页面。（默认是数据详情页面。）

#### 自定义数据列表页面中显示条数选项的设置
- 设置键 : EXMENT_GRID_PER_PAGES
- 默认值 : 无
- 作用 : 请输入自定义数据列表页面中显示条数选项的设置值。有多个时请用逗号分隔。例：100,200,500,1000

#### 显示自定义数据的复制链接
- 设置键 : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- 默认值 : false
- 作用 : 设为 true 后，在列表页面的操作栏中显示复制链接。

#### 页面设计
- 设置键 : EXMENT_UI_DESIGN
- 默认值 : 无
- 作用 : 在服务器一侧固定登录页面和管理页面的设计。请输入“modern”(现代)或“classic”(经典)。设置后，这个值优先于[系统设置](/zh/system_setting)的“页面设计”，在系统设置页面中无法更改。没有设置时，按系统设置的“页面设计”(初始值为“现代”)。

※从 v7.1.0 起可以使用。

#### 列表页面的列的最小宽度(px)
- 设置键 : EXMENT_GRID_MIN_WIDTH
- 默认值 : 100
- 作用 : 列表页面的列的最小宽度(px)的默认值。

#### 列表页面的列的最大宽度(px)
- 设置键 : EXMENT_GRID_MAX_WIDTH
- 默认值 : 300
- 作用 : 列表页面的列的最大宽度(px)的默认值。

#### 列表页面显示的最大字符数
- 设置键 : EXMENT_GRID_MAX_LENGTH
- 默认值 : 50
- 作用 : 在列表页面中，一个项目显示的最大字符数。超过这个字符数的值，省略超出的部分，并在末尾加上“...”显示。


### 自定义数据

#### 隐藏自定义数据页面的“表详细设置”按钮
- 设置键 : EXMENT_TABLE_BUTTON_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，自定义数据页面的“表详细设置”按钮不显示。

#### 隐藏自定义数据页面的“表详细设置”按钮(仅用户)
- 设置键 : EXMENT_TABLE_BUTTON_DISABLED_USER
- 默认值 : false
- 作用 : 设为 true 后，自定义数据页面的“表详细设置”按钮不显示。※仅限普通用户。系统管理员、该表的管理员仍然显示。

#### 隐藏自定义数据页面的“更改视图”按钮
- 设置键 : EXMENT_VIEW_BUTTON_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，自定义数据页面的“更改视图”按钮不显示。

#### 隐藏自定义数据页面的“更改视图”按钮(仅用户)
- 设置键 : EXMENT_VIEW_BUTTON_DISABLED_USER
- 默认值 : false
- 作用 : 设为 true 后，自定义数据页面的“更改视图”按钮不显示。※仅限普通用户。系统管理员、该表的管理员仍然显示。

#### 禁用“选项（从其他表中选择）”“用户”“组织”的数据搜索对话框功能
- 设置键 : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，在自定义数据输入页面中，“选项（从其他表中选择）”“用户”“组织”的数据搜索对话框功能被禁用。

#### “选项（从其他表中选择）”“用户”“组织”切换为“每次搜索选项”形式的条数
- 设置键 : EXMENT_SELECT_TABLE_LIMIT_COUNT
- 默认值 : 100
- 作用 : 设置在自定义数据的新建、编辑页面中，把选择项目切换为“每次搜索选项”形式的条数。  

#### 禁用自定义列“文本编辑器”的图片上传功能
- 设置键 : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- 默认值 : false
- 作用 : 设为 true 后，在自定义数据编辑页面中，禁用自定义列“文本编辑器”的图片上传功能。

#### 自定义数据的附件一次可以上传的文件数
- 设置键 : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- 默认值 : 5
- 作用 : 在自定义数据的附件表单中，一次可以上传的个数。

#### 可以粘贴到评论中的图片的最大大小
- 设置键 : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- 默认值 : 10240
- 作用 : 可以粘贴或拖放到数据评论栏中的图片（PNG、JPEG、GIF、WebP）的最大大小(KB)。※从 v7.1.0 起可以使用。

#### 在自定义数据的详情页面中不显示“只读”字段
- 设置键 : EXMENT_DISABLE_SHOW_FIELD_READONLY
- 默认值 : false
- 作用 : 设为 true 后，在自定义数据的详情页面中，不显示设置为“只读”的项目。

#### 在自定义数据的详情页面中不显示“仅显示”字段
- 设置键 : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- 默认值 : false
- 作用 : 设为 true 后，在自定义数据的详情页面中，不显示设置为“仅显示”的项目。

#### 自定义列“多行文本”“文本编辑器”的最大字符数
- 设置键 : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- 默认值 : 63999
- 作用 : 系统可以设置的、自定义列“多行文本”“文本编辑器”的最大字符数

#### 不使用逻辑删除，始终进行物理删除
- 设置键 : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- 默认值 : false
- 作用 : 设为 true 后，不使用自定义数据的逻辑删除，始终进行物理删除。

#### 自定义列“多行文本”的半角空格的显示
- 设置键 : EXMENT_TEXTAREA_SPACE_TAG
- 默认值 : true
- 作用 : 为 true 时，在列表页面、详情页面显示自定义列“多行文本”的值时，把半角空格替换成有宽度的标签。连续的半角空格也按输入时的宽度显示。为 false 时，不做替换。

#### 禁用关联筛选
- 设置键 : SELECT_RELATION_LINKAGE_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，在所有表单中禁用自定义表单的“关联筛选”(选择某个项目后，筛选其他项目的选项的功能)。

#### 让特定的表不能使用用户视图
- 设置键 : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- 默认值 : (无)
- 作用 : 用逗号分隔，填写不能使用用户视图的表的名称(英文字母和数字)。(例：information,contract)在填写的表中，即使系统设置允许使用用户视图，也只有表的管理员等拥有系统视图权限的用户才能创建、编辑视图。

#### 显示日历视图时，也取得 ID 和各项目的数据
- 设置键 : EXMENT_CALENDAR_DATA_GET_VALUE
- 默认值 : false
- 作用 : 设为 true 后，显示自定义视图时，也取得 ID 和各项目的数据。  
※在[插件(脚本)](/zh/plugin_quickstart_script)中改写自定义视图的显示时，如果想使用各数据的值，请设为 true。

#### 日历视图的最大取得条数
- 设置键 : EXMENT_CALENDAR_MAX_SIZE_COUNT
- 默认值 : 300
- 作用 : 在日历视图中，取得所显示期间的数据时的最大条数。

#### 看板视图的最大显示条数
- 设置键 : EXMENT_KANBAN_MAX_SIZE_COUNT
- 默认值 : 300
- 作用 : [看板视图](/zh/view_kanban)中显示的数据最大条数的默认值。它是新建看板视图时“最大显示条数”的初始值。  
※视图设置了“最大显示条数”时，以视图的设置为优先。条数多时显示会变慢。

#### “custom_value_(表名)”类的位置
- 设置键 : EXMENT_SHOW_PAGE_CLASS_TYPE
- 默认值 : 1
- 作用 : 设置“custom_value_(表名)”类的插入位置。请从下面选择。
    - 1 OR 没有设置: 类设置在附件、评论等选项信息的父容器上
    - 2 : 类设置在显示自定义列项目的容器上
    - 3 : 类同时设置在上面的 1 和 2 上

### 组织设置

#### 在组织列表页面中进行层级显示
- 设置键 : EXMENT_SHOW_ORGANIZATION_TREE
- 默认值 : false
- 作用 : 设为 true 后，在组织列表页面中可以按层级显示组织。

#### 组织的层级数
- 设置键 : EXMENT_ORGANIZATION_DEEPS
- 默认值 : 4
- 作用 : 追溯上级组织、下级组织的层级数上限。在权限判定等处理中，取得上级组织、下级组织到这个层级数为止。

### 排列顺序设置

#### 用户编辑页面中所属组织设置的排列顺序
- 设置键 : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- 默认值 : false
- 作用 : 设为 true 后，在用户编辑页面的所属组织设置中，组织的排列顺序与（组织的）默认视图的排列顺序一致。为 false 时按 id 顺序。

#### 角色组设置的排列顺序
- 设置键 : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- 默认值 : false
- 作用 : 设为 true 后，用户编辑页面、组织编辑页面中角色组设置的排列顺序，以及角色组列表页面的排列顺序，与（角色组的）显示顺序一致。为 false 时按 id 顺序。

#### 自定义视图的排序顺序
- 设置键 : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- 默认值 : 0
- 作用 : 设置自定义视图菜单按钮中显示的视图的排列顺序。请从下面选择。  
0 : 第 1 键：系统视图／用户视图，第 2 键：视图的种类，第 3 键：id  
1 : 第 1 键：系统视图／用户视图，第 2 键：视图的种类，第 3 键：order   
2 : 第 1 键：系统视图／用户视图，第 2 键：order

### 导入和导出

#### 禁用导入
- 设置键 : EXMENT_IMPORT_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，在所有表的列表页面中隐藏数据的导入功能。

#### 禁用导出
- 设置键 : EXMENT_EXPORT_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，在所有表的列表页面中隐藏数据的导出功能。

#### 禁用导出(视图)
- 设置键 : EXMENT_EXPORT_VIEW_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，在所有表的列表页面中隐藏数据的导出(视图)功能。

#### 禁用 csv 格式的导入和导出
- 设置键 : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- 默认值 : false
- 作用 : 设为 true 后，在所有表的列表页面中，数据的导入、导出按钮不再显示 csv 格式。

#### 禁用 xlsx 格式的导入和导出
- 设置键 : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- 默认值 : false
- 作用 : 设为 true 后，在所有表的列表页面中，数据的导入、导出按钮不再显示 xlsx 格式。

#### 导出 csv 格式时添加 BOM
- 设置键 : EXMENT_EXPORT_APPEND_CSV_BOM
- 默认值 : false
- 作用 : 设为 true 后，导出 CSV 数据时添加 BOM。(用 Excel 打开也不会出现乱码。)

#### 从页面导入的最大行数
- 设置键 : EXMENT_IMPORT_MAX_ROW_COUNT
- 默认值 : 5000
- 作用 : 从页面导入数据时，一次可以导入的最大行数。超过这个行数的文件会出错。  
※增加行数后，可能发生超时或内存不足。要导入大量数据时，请考虑使用[大量数据投入](/zh/data_bulk_insert)。

#### 启用角色组的导入和导出
- 设置键 : ROLE_GROUP_IMPORT_EXPORT
- 默认值 : false
- 作用 : 设为 true 后，在角色组设置页面中显示数据的导入、导出按钮。  
※这是面向对 Exment 的权限管理有充分知识的人的扩展功能。请务必事先做好备份等，谨慎操作。

### 仪表板

#### 仪表板行数
- 设置键 : EXMENT_DASHBOARD_ROWS
- 默认值 : 4
- 作用 : 更改仪表板上可以配置的行数。  


#### 禁用仪表板的最新版本通知
- 设置键 : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- 默认值 : false
- 作用 : 设为 true 后，禁用仪表板上显示的最新版本通知功能。

#### 更改仪表板图表显示的颜色
- 设置键 : EXMENT_CHART_BG_COLOR
- 默认值 : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- 作用 : 可以用逗号分隔，更改仪表板上显示的图表的颜色种类。要显示的图表条数超过指定的颜色数时，循环指定颜色。

※这个设置是从 v3.4.3 起添加的。在 v3.4.2 以下安装 Exment 的用户，上面的设置值是固定值。  
要更改时，请打开“config/exment.php”文件，做下面的修改。  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### 文件

#### 让上传者以外的人不能删除附件
- 设置键 : EXMENT_FILE_DELETE_USERONLY
- 默认值 : false
- 作用 : 设为 true 后，在数据详情页面上传的文件，上传者以外的人不能删除。

#### 禁用文件的拖放
- 设置键 : EXMENT_FILE_DRAG_DROP_DISABLED
- 默认值 : false
- 作用 : 设为 true 后，禁用自定义列的文件列、图片列等的拖放显示项目。

#### 在用“禁止从页面更改”禁止删除的表中，也可以删除附件
- 设置键 : EXMENT_ALLOW_DELETE_ATTACHMENT
- 默认值 : false
- 作用 : 在自定义表设置的“禁止从页面更改”中勾选了“删除”的表中，通常数据详情页面的附件也不能删除。设为 true 后，在这样的表中，可以编辑数据的用户也可以删除附件。

#### 文件的保存位置
- 设置键 : EXMENT_DRIVER_EXMENT、EXMENT_DRIVER_BACKUP、EXMENT_DRIVER_TEMPLATE、EXMENT_DRIVER_PLUGIN
- 默认值 : local
- 作用 : 分别更改附件、备份、模板、插件的保存位置(本地、FTP、SFTP、Amazon S3、Azure Blob 等)。包括每个保存位置所需的设置值(AWS_BUCKET_EXMENT 等)在内，详情请查看[这里](/zh/additional_file_saveplace)。

#### 7-Zip 的文件夹(Windows)
- 设置键 : EXMENT_7ZIP_DIR
- 默认值 : C:\Program Files\7-Zip
- 作用 : 在 Windows 服务器上使用“加密邮件的附件”(EXMENT_ARCHIVE_MAIL_ATTACHMENT)时，用来创建带密码 zip 的 7-Zip 的安装文件夹。填写“7z.exe”所在的文件夹。

#### 更改单击附件时在浏览器中显示的扩展名
- 设置键 : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- 默认值 : 无
- 作用 : 不带点号、以逗号分隔，填写单击附件时在浏览器中显示的扩展名。(例：png,jpg,gif)  
- 其他特别事项 : 关于单击文件时的动作，以前所有文件都在浏览器中显示，但在[有人指出漏洞](/weakness/20200819_2)（英语）之后，附件改为下载的形式。  
因为有上面这样的背景，<span class="red">这个设置请自行负责。</span>

#### 下载文件时临时 URL 的有效期限
- 设置键 : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- 默认值 : 15
- 作用 : 把[文件的保存位置](/zh/additional_file_saveplace)设为 Amazon S3 等可以发行临时 URL(带签名的 URL)的存储时，临时 URL 的有效期限(分钟)。  
使用这样的存储时，下载文件时会重定向到存储的临时 URL，浏览器直接从存储下载文件。  
※有效期限在下载开始时确认，所以下载过程中过了有效期限，下载也不会中断。但是，要继续因通信错误等而中断的下载时，如果已过有效期限就会失败。



### 公开表单(Google reCAPTCHA)

#### Google reCAPTCHA v3 的分数阈值
- 设置键 : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- 默认值 : 0.5
- 作用 : 在[公开表单](/zh/publicform)中使用 Google reCAPTCHA v3 时的分数阈值。reCAPTCHA v3 返回 0.0(很可能是机器人)～1.0(很可能是人)的分数，分数低于这个值时，发送会出错。垃圾发送持续不断时请把值调大，正常的使用者出错时请把值调小。  
※只有在系统设置页面中，Google reCAPTCHA 选择了“V3”时才使用。  
※设置了 0～1 范围以外的值时，按 0.5 处理。

#### 隐藏公开表单页脚的“Powered by Exment”
- 设置键 : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- 默认值 : false
- 作用 : 设为 true 后，隐藏公开表单页脚显示的“Powered by Exment”。

#### 更改公开表单 API 的“/publicformapi”URI
- 设置键 : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- 默认值 : publicformapi
- 作用 : 公开表单内部使用的 API(取得选项等)的 URL 路径名。

#### 不进行 Google reCAPTCHA 确认的 IP 地址
- 设置键 : 无(在“config/exment.php”的“recaptcha_skip_ips”中设置)
- 默认值 : [] (无)
- 作用 : 不进行 Google reCAPTCHA 确认的 IP 地址一览。在从公司内部确认公开表单的动作等情况下使用。  
<span class="red">※从这里填写的 IP 地址发送时，完全不进行 reCAPTCHA 的确认。建议在正式环境中不要设置。</span>  
※这个设置不能用“.env”设置。请打开“config/exment.php”文件，按下面这样填写。  
※在 Exment v6.x 以前设置了“config/no-captcha.php”的“skip-ips”时，v7.0.0 以后请改写到这个设置中。

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### 其他

#### 在公开表单中，让自定义列“选项（从其他表中选择）”“用户”“组织”只能用 suuid(20 位随机字符串)设置初始值

- 设置键 : EXMENT_PUBLICFORM_URLPARAM_SUUID
- 默认值 ： false
- 作用 :详情请查看[这里](/zh/publicform)中关于让自定义列“选项（从其他表中选择）”“用户”“组织”只能用 suuid(20 位随机字符串)设置初始值的说明。


#### 删除 HTTP 响应中的换行符
- 设置键 : EXMENT_REMOVE_RESPONSE_SPACE
- 默认值 : false
- 作用 : 设为 true 后，删除响应中的换行符。

#### 禁用用户视图

> 从 v3.5.0 起，已改为从系统设置页面更改。

#### 禁用用户仪表板

> 从 v3.5.0 起，已改为从系统设置页面更改。

#### 在数据详情页面中隐藏“隐藏字段”
- 设置键 : EXMENT_HIDE_HIDDENFIELD
- 默认值 : true
- 作用 : 设为 true 后，在数据详情页面中，隐藏在表单设置中设为“隐藏字段”的数据。

#### 演示模式
- 设置键 : EXMENT_DEMO_MODE
- 默认值 : false
- 作用 : 这是面向公开管理员登录的演示站点的设置。设为 true 后，即使是系统管理员，也会被阻止进行在服务器上运行代码的操作、更改服务器或其他站点的操作、向外部发送东西的操作、能看到秘密值的操作（上传插件和编辑代码、备份、导入模板、邮件、登录、API 的设置、更改密码等）。邮件只写入日志，不发送 Slack、Teams、LINE 的消息。页面上方显示“这是演示站点”。控制台的命令（用 cron 在夜间还原等）不会被阻止。请不要在平时运用的环境中设置。

※从 v7.1.0 起可以使用。



### 调试和面向开发者

#### 专家模式
- 设置键 : EXMENT_EXPART_MODE
- 默认值 ： false
- 作用 : 设为 true 后，可以进行更灵活的、面向熟悉系统的人的设置。


#### 调试模式(输出请求值)
- 设置键 : EXMENT_DEBUG_MODE_REQUEST
- 默认值 ： false
- 作用 : 设为 true 后，把发给 Exment 的 Web 服务的请求值输出到日志。  


#### 调试模式(输出 SQL 日志)
- 设置键 : EXMENT_DEBUG_MODE_SQL
- 默认值 ： false
- 作用 : 设为 true 后，Exment 执行 SQL 时，可以把 SQL 语句输出到日志。※开发用。


#### 调试模式(输出 SQL 日志 - 显示函数)
- 设置键 : EXMENT_DEBUG_MODE_SQLFUNCTION
- 默认值 ： false
- 作用 : Exment 执行 SQL 时，在“EXMENT_DEBUG_MODE_SQL”为 true 的情况下设为 true，可以在输出 SQL 语句的同时，把调用方的函数一览输出到日志。※开发用。


#### 调试模式(输出计划任务日志)
- 设置键 : EXMENT_DEBUG_MODE_SCHEDULE
- 默认值 ： false
- 作用 : 执行计划任务时设为 true，可以确认计划任务的定义和执行的中间经过。详情请查看[这里](/zh/additional_task_schedule)中关于不能正常动作时如何验证的说明。※验证用。

### 二维码
#### 按钮显示名（日语）
- 设置键 : EXMENT_TEXT_QR_BUTTON_JA
- 默认值 : (无)
- 作用 : 设置新建二维码、下载二维码中“二维码”的日语显示名。没有特别指定时为「二次元バーコード」。

#### 按钮显示名（英语）
- 设置键 : EXMENT_TEXT_QR_BUTTON_EN
- 默认值 : (无)
- 作用 : 设置新建二维码、下载二维码中“二维码”的英语显示名。没有特别指定时为“2D barcode”。

### 二维码／JAN 条形码
#### 按钮显示名（日语）
- 设置键 : EXMENT_TEXT_SCAN_BUTTON_JA
- 默认值 : (无)
- 作用 : 设置二维码／JAN 条形码读取按钮中“二维码／JAN 条形码”的日语显示名。没有特别指定时为「二次元／JANバーコード」。

#### 按钮显示名（英语）
- 设置键 : EXMENT_TEXT_SCAN_BUTTON_EN
- 默认值 : (无)
- 作用 : 设置二维码／JAN 条形码读取按钮中“二维码／JAN 条形码”的英语显示名。没有特别指定时为“2D barcode／JANcode”。
