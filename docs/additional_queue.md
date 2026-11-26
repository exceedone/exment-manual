# (For advanced users) Delayed execution of notification processing
This setting runs the sending of notifications later, apart from the operation on the screen.  
Exment normally runs every process on the spot (synchronous execution). With this setting, some processes can run later (delayed execution, queue execution). The waiting time on the screen gets shorter.

Currently, the following processes can run later.

- Sending mail
- Sending to Slack
- Sending to Microsoft Teams

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

### Keeping the worker running (Supervisor, systemd)
Run the worker under a process monitor, so it starts again when it stops. With `--max-time=3600` (one hour) and `--memory=192` (192 MB) the worker is replaced from time to time and its memory does not grow. Run it as the same user as the web (www-data, for example).

Supervisor (`/etc/supervisor/conf.d/exment-queue.conf`):
```
[program:exment-queue]
command=/usr/bin/php8.3 artisan queue:work --sleep=3 --tries=3 --timeout=120 --memory=192 --max-time=3600
directory=/(Exment root directory)
user=www-data
autostart=true
autorestart=true
stopwaitsecs=130
stdout_logfile=/var/log/exment-queue.log
```

systemd (`/etc/systemd/system/exment-queue.service`):
```
[Unit]
Description=Exment queue worker
After=network.target

[Service]
User=www-data
WorkingDirectory=/(Exment root directory)
ExecStart=/usr/bin/php8.3 artisan queue:work --sleep=3 --tries=3 --timeout=120 --memory=192 --max-time=3600
Restart=always
RestartSec=5
Nice=10

[Install]
WantedBy=multi-user.target
```
Start it with `systemctl enable --now exment-queue`.

### Checking that a worker runs (v7.3.0 and later)
With `QUEUE_CONNECTION` other than sync, Exment queues a small job every five minutes and keeps the time a worker ran it (the scheduler, `php artisan schedule:run` every minute, must be running).

- When it has not been run for 15 minutes, "The queue worker" of the [security check](/security_check) is NG: the worker has stopped, or cannot keep up.
- `php artisan exment:queue-heartbeat --status` shows it too.
- With `QUEUE_CONNECTION=sync` (the default) nothing is done.

### When a worker cannot keep running (rental servers, etc.)
On a rental server or the like, where a worker cannot keep running, let cron clear the waiting jobs every minute (`--stop-when-empty` ends when no jobs are left, and `--max-time=50` ends before the next cron). Write php by the full path of the same version as the web.

```
* * * * * cd /(Exment root directory) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

If you cannot do that either, keep `QUEUE_CONNECTION=sync` (the value set at installation).

## When updating the system
The queue worker is a process that keeps running for a long time. Unless it is restarted, the new code is not used.  
So restart the workers when you update the system. The queue:restart command restarts all workers gracefully.

```
php artisan queue:restart
```

- With the worker under Supervisor or systemd, restarting it (`supervisorctl restart exment-queue`, `systemctl restart exment-queue`) does the same, more surely.
- From v7.3.0, clearing Exment's cache (saving the settings, `php artisan exment:update`) keeps the queue:restart signal. In earlier versions, clearing the cache could wipe the signal, so a worker went on with the old code even after queue:restart; there, run queue:restart last, after the update has finished.


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
