# (For advanced users) Delayed execution of notification processing
This setting runs the sending of notifications later, apart from the operation on the screen.  
Exment normally runs every process on the spot (synchronous execution). With this setting, some processes can run later (delayed execution, queue execution). The waiting time on the screen gets shorter.

Currently, the following processes can run later.

- Sending mail
- Sending to Slack
- Sending to Microsoft Teams
- Sending webhooks (JSON) (v7.3.0 and later)
- Finding the recipients of the notifications of a saved record and sending them (v7.3.0 and later, [When notifications are sent](#when-notifications-are-sent))

## Notes
- In delayed execution, processes (jobs) are kept in a waiting line called a "queue" and run in a process separate from the screen.
- To run the jobs in the queue, start a "queue worker" (the program that runs the jobs) by a command. The worker must keep running. **If the worker stops, the processes are not run**.  
Please be careful, for example by monitoring whether the worker is running.
- At the time a notification is run from the screen, it is not known whether the notification succeeded or failed.  
Therefore, even if the notification has actually failed, the message "The notification has been executed!" may be shown.
- For details on queues, see the [Laravel manual](https://laravel.com/docs/queues).


## Setting procedure
Set the queue driver (the place where the jobs are kept). Here, the database is used. (Depending on the settings, Redis and others can also be used)

**(1) Open .env and write the following setting.**

```
#Queue driver. The value set in the Exment installation steps is sync (synchronous processing)
QUEUE_CONNECTION=database
```

**(2) Run the following commands.** They create the tables that hold the queue information.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> The "jobs" and "failed_jobs" tables may already be created by the migrations made when the Laravel project was created. Look in the "database/migrations" folder and run the commands as follows.
>
> | In the "database/migrations" folder | Commands to run |
> | ---- | ---- |
> | There is a file containing "create_jobs_table" (a project created with Laravel 11 or later) | Only "php artisan exment:update" (both tables are created by the standard migrations, so do not run "queue:table" and "queue:failed-table") |
> | There is only a file containing "create_failed_jobs_table" | "queue:table" and "php artisan exment:update" |
> | There is neither | All three commands above |
>
> If "Migration already exists." is shown, that migration already exists. Ignore the error and go on to the next command.

**(3) Run the following command.** The worker starts.  
This command keeps running until you stop it or close the terminal.

```
php artisan queue:listen
```

> To keep queue:listen running in the background all the time, you need a process monitor (something that watches whether the worker has stopped) such as [Supervisor](https://laravel.com/docs/queues#supervisor-configuration).

### When a worker cannot keep running (rental servers, etc.)
On a rental server or the like, where a worker cannot keep running, let cron clear the waiting jobs every minute (`--stop-when-empty` ends when no jobs are left, and `--max-time=50` ends before the next cron). Write php by the full path of the same version as the web.

```
* * * * * cd /(Exment root directory) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

If you cannot do that either, keep `QUEUE_CONNECTION=sync` (the value set at installation).

## When notifications are sent
* This setting is available in Exment v7.3.0 and later.

The notifications of a saved record (create, update, comment, attachment) are sent later, without keeping the answer of the save waiting. Even with many recipients, the save ends quickly. The recipients and the content are the same as before.  
When they are sent is set by `EXMENT_NOTIFY_MODE` in .env.

| EXMENT_NOTIFY_MODE | When it is sent |
|---|---|
| not set (auto) | queue when `QUEUE_CONNECTION` is not sync; when it is sync, after_response (on the screen) or sync (a command) |
| queue | By the queue worker |
| after_response | By the same PHP process, after it answers the screen |
| sync | In the save (as up to v7.2) |

- **When `QUEUE_CONNECTION` is not sync, always run a worker** ([Setting procedure](#setting-procedure)). While no worker runs, neither the notifications of a save nor the mails, Slack, Teams and webhooks are sent.
- With after_response, the process (a php-fpm worker, for example) stays busy after the answer until the notifications are sent. With very many recipients and many saves at the same time, use queue.
- The notifications of a share and a delete are sent at once, as before.
- A save from a command (a data import, for example) sends at once with auto.

## When updating the system
The queue worker is a process that keeps running for a long time. Unless it is restarted, the new code is not used.  
So restart the workers when you update the system. The queue:restart command restarts all workers gracefully.

```
php artisan queue:restart
```


## Checking the running jobs
This is how to check the jobs that are currently running.

- Connect to the database and execute the following command.

```
select * from jobs;
```

- The list of the jobs currently running is displayed.


## Checking the failed jobs
This is how to check the jobs whose execution failed.

- Connect to the database and execute the following command.

```
select * from failed_jobs;
```

- The list of the jobs whose execution failed is displayed.
