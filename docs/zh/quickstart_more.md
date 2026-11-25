# 追加设置
完成[安装步骤](/zh/quickstart)后，Exment 就可以运行了。  
不过，要使用一部分功能，还需要追加设置。  
请从下面的列表中打开想使用的功能的页面，按步骤进行设置。  

### 设置内容一览

- [更改或删除 URL 中包含的“admin”](/zh/additional_prefix)  
更改或去掉加在 URL 前面的“/admin”等值（v7.2.1 以后新安装时，默认不带）。

- [任务计划](/zh/additional_task_schedule)  
自动创建备份、期限通知等，在固定的时刻自动运行处理所需的设置。

- [关闭服务器外部通信](/zh/additional_disable_outside_api)  
停止从服务器到外部服务器的通信（例如获取 Exment 的更新信息）所需的设置。

- [启用缓存](/zh/additional_cache)  
缓存自定义表、列、视图、工作流等主数据。在有些环境中会变快。

- [更改文件保存位置](/zh/additional_file_saveplace)  
把文件的保存位置从本地服务器改为 FTP、AWS S3 等的步骤。

- [更改 PHP 设置值](/zh/additional_php_ini)  
更改附件的上传大小、PHP 的内存使用量、超时时间的步骤。

- [IP 筛选](/zh/additional_ip_filter)  
可以按 IP 地址限制对 Web 页面的请求和 API 的执行。

- [API 发生 429 错误时](/zh/additional_429_too_many)  
执行 API 时出现 429 Too Many Requests 的处理方法。

- [在获取数据的 API 中添加 label 列](/zh/additional_api_label)  
在获取数据列表、新建和更新数据时，可以在结果中加上 "label" 列。

- [在列类型“单行文本”的设置“可用字符”中添加自己的选项](/zh/additional_available_characters)  
在自定义列的类型“单行文本”的设置“可用字符”中，可以增加能使用的选项。

- [延迟执行通知处理](/zh/additional_queue)  
可以让通知等一部分处理稍后执行（队列执行）。

- [反向代理设置](/zh/additional_reverse_proxy)  
在使用反向代理的环境中需要的追加设置。

- [使用全文搜索引擎（Meilisearch）](/zh/additional_meilisearch)  
在数据很多的环境中，使用全文搜索引擎“Meilisearch”快速搜索所需的设置。

- [专家模式](/zh/additional_expert)  
在页面上显示更细的设置项目的步骤。
