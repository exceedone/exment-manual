# (For advanced users) Using the full-text search engine (Meilisearch)
Exment normally searches against the database, but you can use the full-text search engine "[Meilisearch](https://www.meilisearch.com/)".  
As a result, searches can be performed at high speed even in an environment that holds a large amount of data.  

You can use the following functions.

- Speeding up of free word search
- Narrowing down of search results (filter / facet)
- Highlighting of search keywords
- Setting of synonyms and stop words

> For the standard search specifications of Exment, please check [Search](/search).


## Operating conditions
When using Meilisearch, the following conditions must be satisfied.

|Item|Contents|
|---|---|
|Meilisearch server|v1.10 or later|
|PHP library|It is necessary to install "meilisearch/meilisearch-php". **This library is not a required library of Exment.** If it is not installed, the commands related to Meilisearch will result in an error, and the realtime sync will also be disabled.|
|Queue|It is necessary to set "database" (or redis) to "QUEUE_CONNECTION" and to have executed the migration.<br />Since the realtime sync is executed by the queue, if it remains the default value "sync", the process on the screen will be blocked. For details, please check [Delayed execution of notification processing](/additional_queue).|
|Custom table|Only tables whose "Search target" is YES in the custom table settings, and which have a custom column whose "Free word search target" is YES, become the target of index creation.|


## Notes
- Meilisearch must be running at all times as a server process separate from Exment. **If the Meilisearch process stops, the search will not be executed.**  
Therefore, please pay close attention, such as setting the service to start and restart automatically.
- In order to reflect updates of custom data in the Meilisearch index, it is necessary to execute a queue worker. This worker also needs to keep running, and **if the worker stops, the updated contents will not be reflected in the index.**
- The Meilisearch index is held separately from the Exment database. Therefore, a difference may occur between the database and the index.  
In order to repair the difference automatically, please also set "Automatic index repair" (MEILISEARCH_REPAIR_ENABLED) and the scheduler.
- <span class="red">※When "EXMENT_SEARCH_DOCUMENT" is set to true, Meilisearch is not used on the search screen.</span>  
Since the contents of attachments are not included in the index, when this setting is enabled, all the processes of the search screen (suggestion, search results, sidebar, sorting, export) return to the search using the database, even if "MEILISEARCH_GLOBAL_SEARCH" is true.  
*The input completion of the custom column "Select (select from the list of values of another table)" is not affected.
- The master key is important information for connecting to Meilisearch. Please manage it strictly so that it is not shared with third parties.
- <span class="red">※Please do not publish Meilisearch to the Internet.</span> Please set it so that it can be connected only from the same server as Exment or from the internal network.
- For details on Meilisearch, please refer to the [Meilisearch official documentation](https://www.meilisearch.com/docs).


## Setup steps (Linux)
These are the steps for an environment using Ubuntu and systemd.  
*Please change the paths and user names according to your environment.

### 1. Install the Meilisearch server
- Execute the following command and place the Meilisearch binary file.  
Since Meilisearch works with a single file, it is not necessary to install other libraries.

```
curl -L -o /tmp/meilisearch \
  https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-linux-amd64

chmod +x /tmp/meilisearch && sudo mv /tmp/meilisearch /usr/local/bin/meilisearch
```

- Execute the following command and confirm that the version is displayed.

```
meilisearch --version
```

- Execute the following command to create the user for executing Meilisearch and the folder for saving data.

```
sudo useradd -r -s /usr/sbin/nologin meilisearch
sudo mkdir -p /var/lib/meilisearch
sudo chown meilisearch:meilisearch /var/lib/meilisearch
```

- Execute the following command to create the Meilisearch configuration file.  
The master key is automatically generated with a random character string.

```
sudo tee /etc/meilisearch.conf > /dev/null << EOF
MEILI_DB_PATH=/var/lib/meilisearch/data.ms
MEILI_HTTP_ADDR=127.0.0.1:7700
MEILI_ENV=production
MEILI_MASTER_KEY=$(openssl rand -hex 16)
MEILI_NO_ANALYTICS=true
EOF

sudo chmod 600 /etc/meilisearch.conf
```

> In the case of "MEILI_ENV=production", the master key must be 16 bytes or more.  
Since "openssl rand -hex 16" generates a character string of 32 characters, this condition is satisfied.

- Execute the following command and check the generated master key.  
**Please be sure to keep this key, because you will write it in the ".env" of Exment later.**

```
sudo grep MASTER_KEY /etc/meilisearch.conf
```

- Execute the following command to register Meilisearch as a service.

```
sudo tee /etc/systemd/system/meilisearch.service > /dev/null << 'EOF'
[Unit]
Description=Meilisearch search engine
After=network.target

[Service]
Type=simple
User=meilisearch
Group=meilisearch
EnvironmentFile=/etc/meilisearch.conf
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/local/bin/meilisearch
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/lib/meilisearch

[Install]
WantedBy=multi-user.target
EOF
```

> The description "WorkingDirectory=/var/lib/meilisearch" is required.  
Since Meilisearch creates a temporary folder in the current directory, if this description is missing, "Permission denied" occurs and the service repeats starting and stopping.

- Execute the following command to enable automatic startup of the service and start Meilisearch.

```
sudo systemctl daemon-reload
sudo systemctl enable --now meilisearch
```

- Execute the following command and confirm that `{"status":"available"}` is displayed.

```
curl -s http://127.0.0.1:7700/health
```

### 2. Register the queue worker
Register the queue worker as a service in order to reflect updates of custom data in the index.  

The queue worker needs to target the following two queues.

- default : This is a queue with light processing, which performs the sync of custom data one by one, the reflection of settings, and so on.
- meili-reindex : This is a queue with heavy processing, which recreates the index for each table.

*If you have changed the settings of "MEILISEARCH_SYNC_QUEUE" or "MEILISEARCH_REINDEX_QUEUE", please change the contents of "--queue=" as well.

- Execute the following command.  
*"/var/www/exment" is the installation folder of Exment, and "/usr/bin/php" is the path of the php command. Please change them according to your environment.

```
sudo tee /etc/systemd/system/exment-meili-worker.service > /dev/null << 'EOF'
[Unit]
Description=Exment queue worker (Meilisearch sync)
After=network.target mysql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/exment
ExecStart=/usr/bin/php artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

- Execute the following command to enable automatic startup of the service and start the queue worker.

```
sudo systemctl daemon-reload
sudo systemctl enable --now exment-meili-worker
```

- Execute the following command and confirm that the service is running.

```
systemctl status exment-meili-worker --no-pager
```

### 3. Set the scheduler
When "MEILISEARCH_REPAIR_ENABLED" is set to true, the automatic index repair is executed at the time set in "MEILISEARCH_REPAIR_AT".  
In order to execute this process, the setting of the scheduler is required. **If you do not perform the setting, the automatic repair will not be executed.**  
*If you have already performed the setting of [Task schedule](/additional_task_schedule), this step is not necessary.

- Execute the following command.

```
sudo crontab -u www-data -l 2>/dev/null | { cat; echo "* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1"; } | sudo crontab -u www-data -
```


## Setup steps (Windows)
These are the steps for an environment using NSSM (Non-Sucking Service Manager) and Task Scheduler.  
Open PowerShell with "Run as administrator" and execute the following commands.  
*Please change the paths according to your environment.

### 1. Install the Meilisearch server
- Execute the following command to create the folder and download the Meilisearch binary file.

```
New-Item -ItemType Directory -Force C:\meilisearch
Invoke-WebRequest -Uri "https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-windows-amd64.exe" `
  -OutFile C:\meilisearch\meilisearch.exe
```

- Execute the following command and confirm that the version is displayed.

```
C:\meilisearch\meilisearch.exe --version
```

- Execute the following command to generate the master key.  
**Please be sure to keep this key, because you will write it in the ".env" of Exment later.**

```
$key = -join (1..32 | ForEach-Object { '0123456789abcdef'[(Get-Random -Maximum 16)] })
$key
```

> With the method using "Get-Random -Count 32", the generated character string becomes 16 characters.  
This is because there are only 16 kinds of hexadecimal characters, and "Get-Random -Count" does not get the same value more than once.  
In order to generate a key of 32 characters, please use the command above.

- Download NSSM from the [NSSM official site](https://nssm.cc/download), and place "nssm.exe" in the "C:\nssm\" folder.  
*You can also install it with the "winget install nssm" command.

- Execute the following command to register Meilisearch as a Windows service.

```
C:\nssm\nssm.exe install Meilisearch C:\meilisearch\meilisearch.exe
C:\nssm\nssm.exe set Meilisearch AppParameters "--db-path C:\meilisearch\data.ms --http-addr 127.0.0.1:7700 --env production --master-key $key --no-analytics"
C:\nssm\nssm.exe set Meilisearch AppDirectory C:\meilisearch
C:\nssm\nssm.exe set Meilisearch AppExit Default Restart
C:\nssm\nssm.exe set Meilisearch Start SERVICE_AUTO_START
C:\nssm\nssm.exe start Meilisearch
```

- Execute the following command and confirm that "status : available" is displayed.

```
Invoke-RestMethod http://127.0.0.1:7700/health
```

- Execute the following command to exclude the index save folder from the scan target of Windows Defender.  
*If it is included in the scan target, creating and updating the index may become slow.

```
Add-MpPreference -ExclusionPath "C:\meilisearch\data.ms"
```

### 2. Register the queue worker
Register the queue worker as a service in order to reflect updates of custom data in the index.  
For the target queues, please check "2. Register the queue worker" of "Setup steps (Linux)".

- Execute the following command.  
*"C:\inetpub\exment" is the installation folder of Exment, and "C:\php\php.exe" is the path of the php command. Please change them according to your environment.

```
C:\nssm\nssm.exe install ExmentMeiliWorker C:\php\php.exe
C:\nssm\nssm.exe set ExmentMeiliWorker AppParameters "artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3"
C:\nssm\nssm.exe set ExmentMeiliWorker AppDirectory C:\inetpub\exment
C:\nssm\nssm.exe set ExmentMeiliWorker AppExit Default Restart
C:\nssm\nssm.exe set ExmentMeiliWorker Start SERVICE_AUTO_START
C:\nssm\nssm.exe start ExmentMeiliWorker
```

### 3. Set the scheduler
Set the task schedule in order to execute the automatic index repair.  
*If you have already performed the setting of [Task schedule](/additional_task_schedule), this step is not necessary.

- Execute the following command.

```
schtasks /create /tn "ExmentScheduler" /sc minute /mo 1 /ru SYSTEM `
  /tr "C:\php\php.exe C:\inetpub\exment\artisan schedule:run"
```


## Exment settings
Once the Meilisearch server is ready, configure the Exment side.  
The following steps are common to Linux and Windows.

### 1. Install the library
- Execute the following command in the Exment folder.

```
composer require meilisearch/meilisearch-php
```

### 2. .env settings
- Open the ".env" file from the Exment folder and write the following settings.

```
#Connection destination of the Meilisearch server
MEILISEARCH_HOST=http://127.0.0.1:7700

#Master key of Meilisearch. Write the key generated at installation
MEILISEARCH_KEY=(the generated master key)

#Use Meilisearch when searching (setting on the search side)
MEILISEARCH_GLOBAL_SEARCH=true

#Reflect updates of custom data in the index in real time (setting on the update side)
MEILISEARCH_REALTIME_SYNC=true

#Automatically repair the difference between the database and the index periodically
MEILISEARCH_REPAIR_ENABLED=true

#Time to execute the automatic repair. Write it in the "HH:MM" format
MEILISEARCH_REPAIR_AT=03:00
```

> Since "MEILISEARCH_GLOBAL_SEARCH" is a setting on the search side, you can also change it to true after the creation of the index is completed.  
Since "MEILISEARCH_REALTIME_SYNC" is a setting on the update side, the queue worker needs to be running when you set it to true.  
When you set "MEILISEARCH_REPAIR_ENABLED" to true, the setting of the scheduler is required.

- For settings other than the above, please check "Search" in [List of setting values](/config). Write them only when you change them from the default values.

> The configuration file of Meilisearch is loaded inside the Exment package. Therefore, it is not necessary to execute "php artisan vendor:publish".

### 3. Execute the commands
- Execute the following command to create the tables used by Meilisearch.

```
php artisan migrate
```

- Execute the following command to delete the cache of the setting contents.  
*If you are using the cache of settings, please execute "php artisan config:cache" again.

```
php artisan config:clear
```

- Execute the following command to create the index from the contents of the database.  
Since the existing index is deleted and recreated, a confirmation message is displayed at execution.  
*Depending on the number of data, the process may take time.

```
php artisan exment:meili-index --fresh
```

> When executing it without displaying the confirmation message, such as in a batch process, please specify "--force" as well.
>
> ```
> php artisan exment:meili-index --fresh --force
> ```

- Execute the following command to check the connection status with Meilisearch and the number of registered documents.

```
php artisan exment:meili-health
```


## Priority of the setting values
The settings of Meilisearch can be changed not only from the ".env" but also from the screen of Exment.  
**The settings saved from the screen take priority over the settings of the ".env".**

- From the menu "Admin Settings > System Settings (Advanced settings)", you can set the connection destination, the master key and each flag.  
- Once you have saved on this screen, that value is held in the database and overwrites the contents of the ".env".  
Therefore, **if the contents are not reflected even though you changed the ".env", please check the settings on this screen.**


## About the search accuracy
In Meilisearch, before performing a search, the process of splitting a sentence into words (tokenization) is performed.  
When handling data of a language such as Japanese, the setting of "MEILISEARCH_LOCALES" is used in order to perform this process correctly.

- The default value is "jpn". When handling only Japanese, it is not necessary to write it.
- For the value, write the language codes of ISO-639-3 separated by commas. (Example: "jpn", "jpn,eng")
- When you leave it empty like "MEILISEARCH_LOCALES=", this setting is deleted from the index, and Meilisearch determines the language automatically.
- In order to use this setting, Meilisearch v1.10 or later is required.
- When you have changed the setting, please execute "php artisan exment:meili-settings". Since Meilisearch splits the words again automatically, it is not necessary to recreate the index.

"MEILISEARCH_LOCALES" and the dictionary settings (synonyms and stop words) work at different stages. Please use them in combination.

|Setting|Stage|Contents of the process|
|---|---|---|
|MEILISEARCH_LOCALES|Before|Splits a sentence into words.|
|Synonyms and stop words|After|Performs the expansion of synonyms and the exclusion, against the split words.|


## Administration screens
The screens related to Meilisearch are as follows.  
*The "admin" part of the URL differs depending on the setting of "ADMIN_ROUTE_PREFIX". For details, please check [Change / delete "admin" included in the URL](/additional_prefix).

|Screen|URL|Contents|
|---|---|---|
|System settings|/admin/system|From "Advanced settings", set the connection destination, the master key and each flag.|
|Filter settings|/admin/meili-filter|Set the narrowing-down conditions displayed in the sidebar of the search result page.|
|Dictionary settings|/admin/meili-dictionary|Set synonyms and stop words.|


## Operation check
- Log in to Exment, enter a word in the search bar at the top of the page, and perform a search.
- Confirm that the search results are displayed.
- After creating or updating custom data, search again and confirm that the updated contents are reflected in the search results.  
*If they are not reflected, please check whether the queue worker is running.

- You can also execute a search from the command and check the results and the response time.

```
php artisan exment:meili-search "keyword" --limit=5 --highlight --facets
```

- When searching only a specific table, specify "--table".

```
php artisan exment:meili-search "keyword" --table=(table name)
```


## Recreating and repairing the index
These are the steps for repairing the index, such as when a difference occurs between the database and the index, or when a large amount of data has been imported or deleted.

### Repairing the difference
The "exment:meili-reconcile" command performs the following two processes.

1. For the tables that are the target of the index, it adds the missing documents and deletes the unnecessary documents (data already deleted from the database).
1. It deletes from the index all the documents of the tables that are no longer the target of the index (those whose "Search target" was changed to NO, those that no longer have a free word search column, those whose table itself was deleted, and so on).  
*When executed with "--table" specified, this process is not performed.

<span class="red">※With this command, documents are deleted from the index.</span>  
When you want to check the contents to be deleted in advance, please execute it with "--dry-run" specified.

- Execute the following command to check the difference between the database and the index. When "--dry-run" is specified, only the check is performed and the repair is not performed.

```
php artisan exment:meili-reconcile --dry-run
```

- Execute the following command to repair the difference.

```
php artisan exment:meili-reconcile
```

- When repairing only a specific table, specify "--table".

```
php artisan exment:meili-reconcile --table=(table name)
```

### Recreating the index
- When recreating the whole index, execute the following command.

```
php artisan exment:meili-index --fresh
```

### Reflecting only the settings
- When you have changed settings such as synonyms, stop words and the target language, you can reflect the settings without recreating the index by executing the following command.  
*When "--show" is specified, the current setting contents are displayed.

```
php artisan exment:meili-settings
php artisan exment:meili-settings --show
```


## Limitations of the automatic recreation
When you have changed the settings of a custom table or a custom column, the process of recreating the index of that table is registered in the queue.  
However, this process has the following limitations.

- There is a time limit of **60 seconds** per process. (This is because it needs to be shorter than "retry_after" of the queue.)
- The processing speed is approximately **300 records per second**. Therefore, the process completes for tables **up to about 18,000 records**.
- In the case of a table exceeding this, the process is interrupted, and after retrying up to 3 times, the process is given up.  
Even in this case, **the contents of the index remain as they are.** (This is because the process is performed by overwriting, without deleting in advance.) However, the changed settings are not reflected.  
The following contents are output to the log.

```
[Meili] reindex of 'xxx' gave up after 3 attempts: ... run `php artisan exment:meili-index` to refresh them.
```

- Therefore, **when you have changed the settings of a table with a large number of data, please execute "php artisan exment:meili-index".**

- Also, when "QUEUE_CONNECTION" is sync, this process is executed inside the saving process of the screen.  
In the case of a table whose number of data exceeds "MEILISEARCH_BATCH_SIZE", in order to prevent the process of the screen from stopping, **the process is given up without being performed.**  
In this case as well, contents prompting the execution of the command are output to the log.


## When updating the system
Since the queue worker is a long-lived process, it will not reflect changes in the code unless it is restarted.  
When you have updated Exment, execute the following command and restart the queue worker.

- For Linux

```
sudo systemctl restart exment-meili-worker
```

- For Windows

```
C:\nssm\nssm.exe restart ExmentMeiliWorker
```


## If it does not work properly
|Symptom|Possible cause|
|---|---|
|"meilisearch/meilisearch-php is not installed" is displayed|The PHP library is not installed. Please execute "composer require meilisearch/meilisearch-php".|
|"Could not connect to Meilisearch" is displayed|The Meilisearch service is not running, the setting of "MEILISEARCH_HOST" is wrong, or the master key is wrong.|
|The contents are not reflected even though you changed the ".env"|The value saved in "Admin Settings > System Settings (Advanced settings)" takes priority. Please check the settings on the screen.|
|"No search-enabled custom table with a freeword column to index." is displayed|"Search target" is not set to YES in the custom table settings, or there is no custom column whose "Free word search target" is YES.|
|The search results do not change even after updating data|"MEILISEARCH_REALTIME_SYNC" is false, or the queue worker has stopped. Please check the status of the service, and the failed jobs with "php artisan exment:meili-health --failed".|
|There is a difference in the data after an import or a bulk deletion|Please execute "php artisan exment:meili-reconcile".|
|The search results do not change even after changing the column settings of a table with a large number of data|The process of recreating the index exceeded the time limit of 60 seconds. Please check whether "gave up after 3 attempts" is output to the log, and execute "php artisan exment:meili-index".|
|"reindex ... skipped: the queue connection is 'sync'" is output to the log|Since "QUEUE_CONNECTION" is sync, the process was given up. Please execute "php artisan exment:meili-index", or change the queue to database or redis and execute the queue worker.|
|"Too many results to export" is displayed at export|It exceeds "MEILISEARCH_PERMISSION_SCAN_CAP" (default value 1000). Since it is treated as an error instead of reducing the number of records, please narrow down the search conditions, or increase the setting value and then execute "php artisan exment:meili-settings".|
|Some results are not displayed in a Japanese search (such as when kanji and katakana are consecutive)|The tokenization setting is not applied. Please check the setting contents with "php artisan exment:meili-settings --show", and check whether "MEILISEARCH_LOCALES" is empty and whether Meilisearch is v1.10 or later.|
|A table whose "Search target" was changed to NO is displayed in the search results|The documents remain in the index. Please execute "php artisan exment:meili-reconcile" without specifying "--table".|
|The automatic repair is not executed|The setting of the scheduler has not been performed, or "MEILISEARCH_REPAIR_ENABLED" is false.|
|The Meilisearch service repeats starting and stopping (Linux)|"WorkingDirectory=/var/lib/meilisearch" is not described in the service configuration file.|

- For Linux, you can check the error contents of Meilisearch with the following command.

```
sudo journalctl -u meilisearch -n 50 --no-pager
```

- You can check the number of jobs that failed to sync with the following command.

```
php artisan exment:meili-health --failed
```


[←Back to list of additional settings](/quickstart_more)
