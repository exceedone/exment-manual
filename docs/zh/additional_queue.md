# (面向高级用户)通知处理的延迟执行
这是让发送通知的处理与页面操作分开、稍后再执行的设置。  
Exment 通常当场执行所有处理（同步执行）。进行这项设置后，一部分处理可以稍后执行（延迟执行、队列执行）。页面的等待时间会变短。

现在可以稍后执行的是下面的处理。

- 发送邮件
- 发送 Slack
- 发送 Microsoft Teams

## 注意事项
- 延迟执行时，处理（作业）先存放在叫做“队列”的排队位置，由与页面不同的进程执行。
- 要执行存放的作业，需要用命令运行“队列工作进程”（执行作业的程序）。工作进程必须一直运行。**工作进程停止后，处理就不会执行**。  
请充分注意，例如监视工作进程是否在运行。
- 从页面执行通知的时候，还不知道通知是成功还是失败。  
因此，即使通知实际上失败了，也可能显示“已执行通知！”的消息。
- 队列的详细说明请看 [Laravel 手册](https://laravel.com/docs/queues)。


## 设置步骤
设置队列驱动（存放作业的位置）。这里使用数据库。（根据设置，也可以使用 Redis 等）

**(1) 打开 .env，写入下面的设置。**

```
#队列驱动。Exment 安装步骤中设置的值是 sync(同步处理)
QUEUE_CONNECTION=database
```

**(2) 执行下面的命令。** 创建存放队列信息的表。

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> “jobs”“failed_jobs”表，有时已经在创建 Laravel 项目时的迁移中创建。请查看“database/migrations”文件夹，按下表执行。
>
> | “database/migrations”文件夹里 | 要执行的命令 |
> | ---- | ---- |
> | 有包含“create_jobs_table”的文件(用 Laravel 11 以后创建的项目) | 只执行“php artisan exment:update”（两张表都由默认的迁移创建，所以不执行“queue:table”“queue:failed-table”） |
> | 只有包含“create_failed_jobs_table”的文件 | “queue:table”和“php artisan exment:update” |
> | 两者都没有 | 上面的 3 个命令全部执行 |
>
> 显示“Migration already exists.”时，说明这个迁移已经存在。请不要在意这个错误，继续执行下一个命令。

**(3) 执行下面的命令。** 工作进程开始运行。  
这个命令会一直运行，直到自己停止它，或者关闭终端。

```
php artisan queue:listen
```

> 要让 queue:listen 在后台一直运行，需要 [Supervisor](https://laravel.com/docs/queues#supervisor-configuration) 这样的进程监视器（监视工作进程有没有停止的机制）。

### 不能让工作进程一直运行时（租用服务器等）
在租用服务器等环境中不能让工作进程一直运行时，用 cron 每分钟处理积存的作业（`--stop-when-empty` 表示作业没有了就结束，`--max-time=50` 表示在下一次 cron 之前结束）。php 请用完整路径写与 Web 相同的版本。

```
* * * * * cd /(Exment的根目录) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

这也做不到时，请保持 `QUEUE_CONNECTION=sync`（安装时的值）。

## 系统更新时
队列工作进程是长时间运行的进程。只要不重新启动，就不会使用新的代码。  
因此，更新系统时，请重新启动工作进程。用 queue:restart 命令可以平稳地重新启动所有工作进程。

```
php artisan queue:restart
```


## 确认执行中的作业
这是确认现在正在执行的作业的方法。

- 连接数据库，执行下面的命令。

```
select * from jobs;
```

- 会显示现在正在执行的作业的列表。


## 确认执行失败的作业
这是确认执行失败的作业的方法。

- 连接数据库，执行下面的命令。

```
select * from failed_jobs;
```

- 会显示执行失败的作业的列表。
