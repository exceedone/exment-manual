# (For advanced users) Delayed execution of notification processing
Exment normally executes all processes synchronously, but some processes can be executed with a delay (queue execution).  
As a result, the processing time on the screen can be shortened, and time-consuming processes can be executed later.  

Currently, the following processes support delayed execution.

- Sending mail
- Sending to Slack
- Sending to Microsoft Teams

## Notes
- In the delayed execution of processes, jobs are held in a queue, and the processes are executed in a process separate from the screen.  
- In order to execute the jobs held in the queue, it is necessary to execute a queue worker from the command. This worker needs to keep running, and **if the worker stops, the processes will not be executed.**  
Therefore, please pay close attention, such as monitoring the queue worker.
- Since the processes are executed with a delay, it is not possible to catch "whether the notification succeeded" or "whether it failed" at the timing when the execution of the notification is called from the screen.  
Therefore, even if the notification has actually failed, the message "The notification has been executed!" may be displayed.
- For details on queue processing, please refer to the [Laravel manual](https://laravel.com/docs/queues).


## Setting procedure
- Set the queue driver. Here, the database is used. (Depending on the settings, Redis and so on can also be used)

- Open the .env and write the following settings.

```
#Queue driver. The default value is sync (synchronous processing)
QUEUE_CONNECTION=database
```

- Execute the following commands. The tables for holding the queue information are created.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

- Execute the following command.  
Please note that when you execute this command, it keeps running until you stop it or close the terminal.

> In order to keep the queue:listen process running permanently in the background, you need to use a process monitor such as [Supervisor](https://laravel.com/docs/queues#supervisor-configuration), so that the queue worker keeps running without stopping.

```
php artisan queue:listen
```

## When updating the system
Since the queue worker is a long-lived process, it will not reflect changes in the code unless it is restarted. Therefore, the simplest way to deploy an application that uses queue workers is to restart the workers during the deployment process. By executing the queue:restart command, all workers can be restarted gracefully.

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
