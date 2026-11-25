# 命令一览
这里列出 Exment 中可以使用的命令。  
其中也包括系统内部使用的命令和开发用的命令。  
有详细说明链接的项目，请同时查看链接的页面。

## 安装与更新

### 安装

这是手动安装 Exment 的命令。  
详情请查看[这里](/zh/quickstart_manual)。   
※安装时，除了这条命令以外还有其他必要的操作。安装时，基本上请按上面链接页面的步骤进行。

```
php artisan exment:install
```

### 更新
这是手动更新 Exment 的命令。  
详情请查看[这里](/zh/update)。  
※更新时，除了这条命令以外还有其他必要的操作。更新时，基本上请按上面链接页面的步骤进行。

```
php artisan exment:update
```

在正式的网站（`APP_ENV=production`）上，更改数据库之前会出现确认的提问。没有终端时（脚本、cron、CI），请用 `php artisan exment:update --force` 执行。

```
php artisan exment:update --force
```

### 发布 css、js 文件等
把包内的 css、js、图片文件和设置文件等一整套文件，发布到 laravel 的默认路径。

```
php artisan exment:publish
```

### 设置服务器时的初始文件、文件夹设置
主要在 Linux 环境中，为运行 Exment 所需的文件和文件夹设置所有者和权限。  
详情请查看[这里](/zh/server)。  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### 检查系统要求
检查 PHP 的版本和扩展、文件夹的写入权限等是否满足运行 Exment 所需的系统要求，并显示结果。  
详情请查看[这里](/zh/server)的“检查系统要求”。

```
php artisan exment:checkrequire
```



## 数据导入、导出与数据删除

### 数据导出
用命令执行数据的导出。  
详情请查看[这里](/zh/data_cmd_import_export)。

```
php artisan exment:export (表名)
```

### 数据导出（chunk 模式）
用命令执行数据的导出（chunk 模式、分割输出）。  
详情请查看[这里](/zh/data_cmd_import_export)。

```
php artisan exment:chunkexport (表名)
```


### 数据导入
用命令执行数据的导入。  
详情请查看[这里](/zh/data_cmd_import_export)。

```
php artisan exment:import {文件夹名}
```


### 数据导入 - 导入图片、文件列的附件
可以把附件批量登记到 Exment 的自定义列类型“图片”“文件”的列中。  
详情请查看[这里](/zh/data_cmd_import_export)。

```
php artisan exment:file-import {文件夹名}
```


### 数据导入 - 文档（附件）列表
可以把文件批量登记到指定自定义数据的文档（附件）中。  
详情请查看[这里](/zh/data_cmd_import_export)。

```
php artisan exment:document-import {文件夹名}
```


### 大量数据批量投入
用命令执行大量数据的批量投入。  
详情请查看[这里](/zh/data_bulk_insert)。

```
php artisan exment:bulkinsert {文件夹名}
```


### 刷新自定义数据
刷新（批量删除）登记在 Exment 中的自定义数据。  
只保留表定义、删除测试数据等情况下请使用。  
详情请查看[这里](/zh/refresh_data)。

```
php artisan exment:refreshdata
```


### 刷新自定义数据（指定的表）
在登记于 Exment 的自定义数据中，刷新（批量删除）指定表的数据。  
只保留表定义、删除测试数据等情况下请使用。  
详情请查看[这里](/zh/refresh_data)。

```
php artisan exment:refreshtable (表名)
```


### 删除操作日志
删除[操作日志](/zh/logs)的数据。可以指定下面的选项。

- --keep-days=(天数。删除早于指定天数的操作日志。请指定 1 以上的整数。不指定时，删除所有的操作日志)
- --force(指定后，不显示删除前的确认消息，直接执行)

<span class="red">※不指定“--keep-days”时，所有的操作日志都会被删除，请注意。</span>  
※在无法显示确认消息的环境（cron 等）中，不指定“--force”时不会执行删除。

```
php artisan exment:log-clear {--keep-days=} {--force}

# 删除 180 天以前的操作日志，且不显示确认消息时
php artisan exment:log-clear --keep-days=180 --force
```







## 备份与还原

### 备份
执行 Exment 的备份。与从页面执行的备份功能相同。  
详情请查看[这里](/zh/backup)。  

```
php artisan exment:backup
```

### 还原
执行 Exment 的还原。与从页面执行的还原功能相同。  
详情请查看[这里](/zh/backup)。  

```
php artisan exment:restore (zip文件名)
```


## 批处理与计划
### 执行插件批处理
执行登记在 Exment 中的批处理。  
要执行的插件，用插件的 ID（下面例子中的“1”）、“--name=(插件名)”、“--uuid=(插件的 uuid)”中的任意一种来指定。  
详情请查看[这里](/zh/plugin_quickstart_batch)。

```
php artisan exment:batch 1
```


### 执行计划
按照登记在 Exment 中的调度器执行作业。  
详情请查看[这里](/zh/additional_task_schedule)。

```
php artisan exment:schedule
```


### 执行通知（时间经过）
对通知的触发条件设置为“时间经过”的通知，不管“通知时间”的设置如何，立即执行。  
目标通知用通知的 ID、“--name=(通知名称（英文数字）)”、“--suuid=(通知的 suuid)”中的任意一种来指定。  
※启用标志为“否”的通知也会被执行。  
详情请查看[这里](/zh/notify)。

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# 例：执行 ID 为 3 的通知时
php artisan exment:notify 3
```


### 按通知时间执行通知（时间经过）
在触发条件为“时间经过”且启用标志为“是”的通知中，执行“通知时间”与当前时刻（小时）一致的通知。  
※通常，“执行计划”（exment:schedule）中会执行同样的处理，所以不需要单独执行这条命令。

```
php artisan exment:notifyschedule
```


### 安全确认（检查地震信息）
获取地震信息。如果有符合[安全确认](/zh/safety_check)自动发送条件的地震，就发送安全确认。  
由[任务计划](/zh/additional_task_schedule)每分钟执行一次。  
※系统设置的“发生地震时自动发送”为“否”时，什么也不执行。

```
php artisan exment:safetywatch
```



## 全文搜索引擎（Meilisearch）
这些是使用全文搜索引擎“Meilisearch”时的命令。  
各命令的详情请查看[这里](/zh/additional_meilisearch)。

|命令|内容|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|根据数据库的内容创建索引。指定“--fresh”时，重新创建所有索引。详情请查看[这里](/zh/additional_meilisearch)。|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|修复数据库与索引之间的差异。详情请查看[这里](/zh/additional_meilisearch)。|
|php artisan exment:meili-settings {--show}|应用索引的设置（语言、同义词、停用词等）。指定“--show”时，显示当前的设置内容。详情请查看[这里](/zh/additional_meilisearch)。|
|php artisan exment:meili-health {--failed}|显示与 Meilisearch 的连接状态和已登记的文档件数。指定“--failed”时，还会显示等待同步的作业和同步失败的作业的件数。|
|php artisan exment:meili-search (关键词) {--limit=10} {--table=} {--highlight} {--facets}|用 Meilisearch 进行搜索，显示搜索结果和处理时间。这是确认运行情况用的命令。详情请查看[这里](/zh/additional_meilisearch)。|



## 其他、开发用

### Exment 版本
显示当前安装的 Exment 的版本。

```
php artisan exment:version
```


### 重置密码
用命令重置 Exment 的登录密码。  
详情请查看[这里](/zh/login_setting)。

```
php artisan exment:resetpassword --email=(目标用户的邮箱地址) --password=(更改后的密码)
```

### 显示 API 客户端列表
显示在 [API 设置](/zh/api)中登记的客户端列表。对每个客户端显示名称、类型、用户 ID、Client ID、Client Secret、重定向 URL。  
<span class="red">※会显示 Client Secret。请注意执行结果的保管。</span>

```
php artisan passport:clientlist
```

### 重置工作流的数据 
可以重置进行中的工作流的数据。因某种原因工作流无法继续进行时，请执行。  
详情请查看[这里](/zh/workflow_execution)。

```
php artisan exment:workflow-clear (表名) (ID)
```


### 发行 LINE 关联码
为指定的用户发行关联 LINE 账号用的关联码和关联用的 URL（深层链接）。  
在已把 LINE 官方账号加为好友的智能手机上打开关联用的 URL，并发送显示的消息，关联就完成了。  
※通常，请由各用户从 [LINE 关联](/zh/line)的页面进行关联。  
※“用户的ID”请指定用户数据的 ID（数值）。不是用户代码。  
<span class="red">※对已经关联了 LINE 账号的用户执行时，当前的关联会被解除。</span>

```
php artisan exment:line-linkcode (用户的ID)
```



### 创建测试数据
创建 Exment 的一整套测试数据。  
<span class="red">※已登记的所有数据都会被删除，请注意。</span>

```
php artisan exment:inittest
```


### 邮件发送测试
按照 Exment 中设置的邮件设置，进行邮件发送测试。  
详情请查看[这里](/zh/mailsend_setting)。

```
php artisan exment:notifytest --to=(邮件收件地址)
```

### 检查语言文件的遗漏
检查 Laravel 的语言文件中，没有反映到包里的语言和单词。

```
php artisan exment:checklang
```


### 数据补丁
这是需要修正数据库中登记的数据时执行的命令。  
※基本上会在执行数据更新时自动执行。  
※执行动作请直接查看源代码“src/Console/PatchDataCommand.php”。

```
php artisan exment:patchdata {执行动作}
```



### 检查数据库连接
检查是否已连接到数据库。  
已连接时返回 1，未连接时返回 0。

```
php artisan exment:check-connection
```
