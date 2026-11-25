# Log Management

"Admin Setting" → "Settings: System" → "Log Management" manages the logs of the site in one page (Exment 7.3.0 or later).
The system administrators and the role groups with **Audit** see it. Only the system administrators change the settings and download the files and the archives.

## Kinds of logs

| Kind | Where | Kept (default) |
|---|---|---|
| Operation log | database | as its own automatic deleting (the "Operation Log" page) |
| Login records | database | 365 days |
| Application log | storage/logs | the daily files 90 days (one laravel.log is never deleted) |

The scheduled job "Logs: delete the old ones" (`php artisan exment:log-maintenance`, every day at 03:40) deletes the old logs. 0 days: kept until deleted.

## Settings

- **Days the login records / the daily files of the application log are kept**
- **Level of the application log**: the lowest level written (debug, info, notice, warning, error). Empty: LOG_LEVEL of the site
- **One file of the application log a day**: laravel-YYYY-MM-DD.log, deleted after the days kept
- **What the operation log keeps**: every request (as before), or only the requests that change something

## Login records

Filter by dates, login name and result (success, failure, locked out, logout) and download as CSV. A failure has its reason (wrong password, unknown user, 2-step verification failed).

## Archive

With "Put the old logs in a gzip file a month before they are deleted", the old logs go to one file a month and a kind (`log_archive/<kind>/<kind>-YYYY-MM.csv.gz`, `.log.gz` for the application log) before they are deleted.

- Where: this server (storage/app/log_archive, 600) or where the backups go (S3 when the backups are on S3; encrypted by S3)
- "Encrypt the archive with APP_KEY": the months written from then on are encrypted. **If APP_KEY is lost, the archive cannot be read.**
- The years the archive is kept

## Personal data in the logs

Logs can be stolen. From Exment 7.3.0 the logs keep as little personal data as they need.

- **Keep the input in the logs** (off by default): off, the operation log (pages, API, MCP) keeps the keys of what was sent with the values as `***`, and the application log masks mail addresses and the values in SQL. On: the values as before (passwords, tokens and secret keys are still masked)
- **IP address in the logs**: as it is (default), shortened (IPv4 /24, IPv6 /48), or hashed (the same address gives the same text). Audits usually need the address as it is
- **Do not keep the body in the mail send log** (off by default: the body is kept as before)
- A failed login keeps no typed text (it may be a password typed in the wrong field)
- New log files are made 0640 (`EXMENT_LOG_FILE_PERMISSION` in `.env`; 0660 when cron runs as another user of the group). `php artisan exment:setup-dir` makes storage/logs 02770/0640 and the archive 02700/0600
- The request debug mode (`EXMENT_DEBUG_MODE_REQUEST`) never writes the cookies nor the credentials

The [security check](/security_check) item "Logs and personal data" warns when the input is kept, when a debug mode is on, or when the files of the logs can be read by everyone.

## Updating to 7.3.0

<span class="red bold">From 7.3.0 the operation log keeps no values of what was sent (only the keys), the application log masks mail addresses and the values in SQL, and new log files are 0640. To keep the values as before, turn on "Keep the input in the logs" in Log Management.</span>
`php artisan exment:update` says this once.
