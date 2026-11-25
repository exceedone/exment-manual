# 性能调优
确认让这个站点更快的设置。在“设置：系统”→“性能调优”（URL 是 `/tuning`）中，会以列表显示设置后能让 Exment 变快的项目和现在的状态。

※这个页面可以在 Exment v7.2.1 以后使用。  
※只有系统管理员可以看到这个页面。

![性能调优](../ja/img/tuning/tuning1.png)

## 页面的看法
- 每个项目会显示“已设置”或“未设置（建议设置）”。“未设置”的项目，请按下面显示的内容进行设置。
- 有按钮的项目可以从这个页面更改。
- 服务器的设置（php.ini、.env）请委托服务器管理员。
- 同样的内容也会显示在安装页面的“进一步提速（可选）”和 `php artisan exment:checkrequire` 的“== 性能调优（可选） ==”中。结果只有“已设置”或“未设置”，不会停止安装。

## Exment 可自动完成的设置（推荐的设置）
Exment 可以安全更改的设置，可以勾选后从这个页面应用。只显示这台服务器需要的设置。

| 设置 | 内容 |
|---|---|
| Exment 的缓存 | 在 `.env` 中设置 `EXMENT_USE_CACHE=true` |
| 界面文件 | JS、CSS 不齐全时，用 `exment:publish` 重新放置 |
| 缓存的存放位置 | 只在可以使用 Redis 时（PHP 能连到 Redis 时），把缓存放到 Redis |
| 会话的存放位置 | 同样放到 Redis（只在这个页面。初始设置时不显示） |
| 删除路由缓存 | 有路由缓存就删除（因为会打不开插件的页面） |
| 创建配置缓存 | `config:cache`（权限 640）。在写入 `.env` 的设置之后创建 |
| 机密文件的权限 | 把 `.env` 和配置缓存设为 640（只在 PHP 的用户是所有者时） |

- 点击“应用勾选的设置”后，先确认要应用的设置列表，然后再应用。应用的记录会留在操作日志中，上次的结果（已应用、原已设置、失败及其原因）显示在下面。
- **初始设置时也可以选择**：安装之后的初始设置页面中，同样的设置会以已勾选的状态显示。取消勾选的不会应用。

  ![初始设置中的推荐设置](../ja/img/tuning/tuning_setup.png)

- 不会更改 php.ini、PHP-FPM、OPcache、cron、队列。请服务器管理员看下面的项目来设置。
- `.env` 中有 `EXMENT_TUNING_SERVER_ACTIONS=false` 时，这一栏和初始设置中的设置都不会显示。

## 项目
### OPcache
把 PHP 程序编译后的结果保存在内存中。Exment 的文件很多，所以内存和文件数的上限也要加大（内存 128MB 以上、文件数 20,000 以上为“已设置”）。

请按下面这样设置 php.ini，并重新启动 PHP（PHP-FPM、Web 服务器）。

~~~ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
~~~

### PHP 版本
PHP 越新，运行越快。PHP 8.2 的安全支持到 2026-12-31 为止。建议升级到 PHP 8.3 或以上。

### 调试模式（APP_DEBUG）
在调试模式下，每次请求都会收集详细信息，并把错误的详细内容显示在页面上。正式环境中请设为 OFF。

~~~
# .env
APP_DEBUG=false
~~~

### 配置缓存（config:cache）
把设置文件合并为 1 个，减少每次请求的读取。可以用页面上的“创建配置缓存”“删除配置缓存”按钮，或下面的命令创建。

~~~
php artisan config:cache
~~~

- 手动改写 `.env` 后，请再创建一次（重新创建之前，改写的内容不会生效）。
- Exment 改写 `.env` 时（安装、还原等），会自动删除缓存。
- `bootstrap/cache/config.php` 中包含 `.env` 的机密（数据库的密码、`APP_KEY` 等）。在 1 台服务器上，各站点用不同的 OS 用户运行时（多租户），为了不让其他站点读取，请在创建后把权限设为 640（以 umask 027 运行）。
- 不使用路由缓存（`route:cache`）。因为插件的路由是从数据库生成的，使用后会打不开插件的页面。

### 类加载优化（composer）
用 composer 预先生成类的列表后，PHP 查找类文件的时间会减少。

~~~
composer install --optimize-autoloader --no-dev
~~~

### Exment 缓存（EXMENT_USE_CACHE）
把表、列、设置等的定义放入缓存，不必每次请求都从数据库读取。

~~~
# .env
EXMENT_USE_CACHE=true
~~~

### 缓存和会话的存放位置
把缓存和会话放在 Redis 等处，比放在文件中更快。Web 服务器有多台时是必需的。可以使用 Redis 时，按下面这样设置（可选）。

~~~
# .env (Redis)
CACHE_STORE=redis
SESSION_DRIVER=redis
~~~

### 队列（邮件等后台处理）
队列为 `sync` 时，发送邮件等会在页面的处理中进行，所以页面要等到它结束。请按下面这样设置，并运行队列的 worker（supervisor、systemd 等）。

~~~
# .env
QUEUE_CONNECTION=database
# 让 worker 一直运行
php artisan queue:work --tries=3
~~~

### 仪表板汇总缓存（EXMENT_DASHBOARD_CACHE_SECONDS）
汇总视图的图表在每次打开仪表板时都会汇总表。把结果按查看的人分别保留指定的秒数，在这期间不重新汇总。初始值是 `0`（不使用）。

~~~
# .env（秒）
EXMENT_DASHBOARD_CACHE_SECONDS=60
~~~

- 保存、删除数据时，会重新汇总。
- 共享和所属的变更等，要过了保留的时间才会反映到表中。

### 调查用日志
系统性能日志和 `.env` 的调试模式（`EXMENT_DEBUG_MODE_REQUEST`、`EXMENT_DEBUG_MODE_SQL`、`EXMENT_DEBUG_MODE_SQLFUNCTION`、`EXMENT_DEBUG_MODE_SQLFUNCTION1`、`EXMENT_DEBUG_MODE_SCHEDULE`）会在每次请求时写日志。调查结束后请设为 OFF。系统性能日志可以用“关闭系统性能日志”按钮停止。

### 搜索索引
在超过 1 万条的表中，给经常用于筛选、排序的列加上“搜索索引”，列表、搜索、汇总会变快。请在[自定义列](/zh/column)的设置中，给常用的列加上“搜索索引”。

### 定时任务（schedule:run、cron）
通知、计划、批处理等由 cron 每分钟运行的 `schedule:run` 进行。因为每分钟都要启动 PHP 和 Exment，有繁重的处理时，页面处理能用的 CPU 会减少。这里显示最后运行的时刻和每分钟最长的时间。cron 没有运行时、有繁重的任务时会通知。

### PHP-FPM 进程
`pm = ondemand` 且等待时间（`pm.process_idle_timeout`）很短时，一段时间没有使用之后的第 1 次，会因为要启动进程而变慢。`pm.max_children` 按服务器的内存来设置。

### 路由缓存（route:cache）
Exment 在每次请求时从数据库添加插件页面的路由。有路由缓存时，后来安装的插件的页面会打不开。**没有才是正确的状态**。

### 机密文件的权限（.env、配置缓存）
`.env` 和配置缓存（`bootstrap/cache/config.php`）中包含密码和 APP_KEY。为了不让服务器的其他用户读取，请设为 640 等（也可以在上面的“Exment 可自动完成的设置”中修复）。

### 界面文件（JS、CSS）
确认登录页面等加载的 JS、CSS 是否齐全，以及是否是浏览器可以缓存的设置（Cache-Control、Expires）。URL 中带有版本（`?v=`），所以让浏览器长时间缓存也没有问题。

### 慢查询日志（数据库）
把 MySQL、MariaDB 的 slow query log 设为 ON 后，花时间的查询会被记录下来，可以查找变慢的原因。

### 搜索索引列的索引（数据库）
加了“搜索索引”的列，在数据的表中有专用的列和索引。因还原或变更失败而没有索引时，每次筛选、排序都会读取全部数据。这里确认索引是否齐全。

## 其他与速度有关的设置
### 列表视图的图表（EXMENT_CHART_LIST_MAX_ROWS）
列表视图的图表每 1 行画 1 个点。初始值（`0`）时会读取所有行。大的表中内存或时间不够时，可以在 `.env` 中决定上限（例：1000）。超过上限时，会显示“请使用汇总视图的图表”。大的表的图表请用汇总视图来做。

~~~
# .env（决定上限时）
EXMENT_CHART_LIST_MAX_ROWS=1000
~~~

## 不显示页面的按钮（EXMENT_TUNING_SERVER_ACTIONS）
1 台服务器上多个站点共用代码时（多租户等），在 `.env` 中按下面这样写，就不显示更改整个服务器的按钮（创建、删除配置缓存）。页面上会显示“在此服务器上无法通过界面修改（由服务器管理员设置）。”。

~~~
# .env
EXMENT_TUNING_SERVER_ACTIONS=false
~~~

## 隐藏页面
- 性能调优是“[功能管理](/zh/feature)”的功能之一，一开始就是“使用”。站点的系统管理员可以在功能管理中设为“不使用”。
- 在服务器一侧（SaaS 等）隐藏时，在 `.env` 中写上 `EXMENT_FEATURES_LOCKED=tuning`（要和其他功能一起停用时，用逗号分隔）。页面会变为 404，也不会显示在菜单中。

## 相关项目
- [安全检查](/zh/security_check)
- [功能管理](/zh/feature)
- [系统设置](/zh/system_setting)
- [服务器设置](/zh/server)
- [（面向高级用户）冗余化](/zh/redundant)
