# Scheduled jobs
The jobs that the cron of the server (`php artisan schedule:run`) runs at set times. Open it from "Settings: System" → "Scheduled Jobs" (URL `/scheduled_jobs`).

* This page is available in Exment v7.2.6 or later.  
* Only system administrators can see this page.

## Turn it on
In [Feature management](/feature), set "Scheduled jobs" to used. It starts off; while it is off, the page cannot be opened (404).

The runs are kept only while the feature is used.

## Cron
Shows when `schedule:run` last ran. When it has not run for more than 10 minutes, a warning is shown: notifications, automatic backups and plugin batches have stopped. Add this line to the cron of the server (the [Tuning](/tuning) page checks it too):

~~~
* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1
~~~

## The jobs
| Item | What is shown |
|---|---|
| Job | The name of the Exment job and its command ("Plugin batch: name" for a batch plugin) |
| When | In words, such as "Every 5 minutes", "Every hour", "Every day at 3:30" |
| Next run | In your time zone |
| State | Why a job is not run (e.g. "Safety check" is not used) |
| Last run, recent runs | Start, end, duration, result, exit code, who ran it, the last 4 KB of its output |

The last 20 runs of each job are kept. Change the number with `EXMENT_SCHEDULED_JOBS_KEEP_RUNS` in `.env`.

## When a job keeps failing
A job that failed 3 times in a row is shown in red, and the system administrators are told once, by a notice at the top of the page and a mail. A successful run resets it, and the next run of failures is told again. Change the number with `EXMENT_SCHEDULED_JOBS_ALERT_FAILURES` in `.env`.

## Run now
"Run now" starts the job at once, in the background. A job that is running cannot be started again.

The button is disabled (with the reason) in these cases; cron still runs the jobs:
- servers where PHP cannot start commands (no `proc_open`, as on some shared hosts)
- demo mode

## Command
~~~
php artisan exment:schedule-status          # a table of the jobs
php artisan exment:schedule-status --json   # per job: the last run and the failures in a row, as JSON
~~~

On a SaaS, each tenant sees only its own jobs and runs.
