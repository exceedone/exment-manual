# (For advanced users) Auto update
The setting for updating Exment by itself when a new version comes out.  
You register on the server a job that runs every day at a fixed time (the periodic update job).

- For the usual way to update, and how far the version goes up, see [Update](/update).

## Specification of the auto update
Every time it runs, the registered job does the following.

- Calls a Web API and gets the latest version of Exment (1)
- Gets the version of the installed Exment (2)
- If (1) is newer than (2), runs the update batch
- If (2) is a version that starts with "dev", no update is done

## How to set up
The steps are different for Linux and Windows.

| Server | Where to look | What is used |
|---|---|---|
| Linux (including Sakura Internet and XServer) | Setup steps (Linux) | The update batch, ExmentAutoUpdate.bash, jq, cron |
| Windows | Setup steps (Windows) | The update batch, ExmentAutoUpdate.exe, Task Scheduler |

### Setup steps (Linux)
**(1) Put the update batch in place**

Download the [update batch](/update) and put it in the project folder of Exment.  
Download the file that fits your environment.

- For Sakura Internet : ExmentUpdateLinuxSakura.sh
- For XServer : ExmentUpdateLinuxXserver.sh
- For others : ExmentUpdateLinux.sh

> The shell that does the update has been updated. Please check [Update](/update) and replace your file.  
Please check that the second line of the shell file shows the version "v1.1.0" or higher.

**(2) Download the batch that checks for updates**

Run the following commands in the root directory of the Exment project.

~~~
wget https://exment.net/downloads/cmd/ExmentAutoUpdate.bash
chmod 775 ExmentAutoUpdate.bash
~~~

**(3) Install "jq"**

A library called "jq" is used. Check with the following command whether the "jq" command is installed.

```
jq --help
```

- If something like "command not found" is shown, the jq command is not installed.  
Install the jq command in [the way of the official document](https://stedolan.github.io/jq/download/).

**(4) Write the place of composer in the update batch**

Look up the path of composer. Run the following command in any path and copy the result.

```
which composer
# Example result
# /home/xxx/usr/local/bin/composer
```

Edit the downloaded ExmentUpdateLinux.sh (or ExmentUpdateLinuxSakura.sh, ExmentUpdateLinuxXserver.sh).  
Change the value of composer_path in the file to the result of "which composer".

```
# composer_path=''
# Change it as below
composer_path='/home/xxx/usr/local/bin/composer'
```

**(5) Register it in cron**

Run the following command.

~~~
crontab -e
~~~

The Cron setting screen appears. Write the following.

~~~

###Add the lines below
(minute to run) (hour to run) * * * cd /(root directory of Exment); bash ExmentAutoUpdate.bash
# Example: to run the Exment under the path /var/www/exment every day at 3:00
0 3 * * * cd /var/www/exment; bash ExmentAutoUpdate.bash >> storage/logs/ExmentAutoUpdate.log  2>&1
~~~


#### For XServer, also do the following

- Run the following command to look up the HOME path.

```
echo $HOME
# Example result
# /home/xxx
```

- Then edit the downloaded ExmentUpdateLinuxXserver.sh.  
Change the value of home_path to the result of "echo $HOME".

```
# home_path=''
# Change it as below. Do not put "/" at the end
home_path='/home/xxx'
```


#### Setup complete
- Now ExmentAutoUpdate.bash runs every day at the fixed time. If there is a newer version, it is installed automatically.
- The log of the auto update is kept in storage/logs/ExmentAutoUpdate.log.




### Setup steps (Windows)
**(1) Put the update batch and the auto update program in place**

1. Download the [update batch ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) and put it in the project folder of Exment.

2. Download the zip of the auto update program from [here](https://exment.net/downloads/cmd/ExmentAutoUpdateWindows.zip).

3. Extract the downloaded zip file, and put the whole "ExmentAutoUpdateWindows" folder in the project folder of Exment.

```
# Folder structure (part)
- app
- bootstrap
- config
- ExmentUpdateWindows.bat
- ExmentAutoUpdateWindows
    - ExmentAutoUpdate.exe
    - ExmentAutoUpdate.exe.config
    - Newtonsoft.Json.dll
```

**(2) Register it in Task Scheduler**

1. Type "task" in the Windows menu and start Task Scheduler.  
![Windows Task Scheduler settings](img/quickstart/task_windows2.png)

2. In Task Scheduler, click "Create Task".  
![Windows Task Scheduler settings](img/quickstart/task_windows6.png)

3. On the "General" tab, set as follows. ("Name" can be any name.)  
![Windows Task Scheduler settings](img/quickstart/task_windows1.png)

4. Click the "Triggers" tab. Create a trigger.  
    (1) Click the "New" button.  
    Then enter as follows.  
    - Begin the task: On a schedule
    - Start: the time to run, on the date to start
    - Recur every: 1 day
    - Check "Enabled"  
    When done, click "OK".  
![Windows Task Scheduler settings](ja/img/quickstart/task_update_windows1.png)

5. On the "Actions" tab, click the "New" button.  
Then enter as follows.
    - Action: Start a program
    - Program/script: the path to the "ExmentAutoUpdate.exe" you put in place

    ![Windows Task Scheduler settings](ja/img/quickstart/task_update_windows2.png)

6. On a notebook PC, on the "Conditions" tab, uncheck "Start the task only if the computer is on AC power".  
![Windows Task Scheduler settings](img/quickstart/task_windows9.png)

7. When you have set everything so far, click OK.  
Then a screen for entering the user's credentials appears. Enter the password.  
![Windows Task Scheduler settings](img/quickstart/task_windows7.png)

8. When the settings are done, select the task you made in "Task Scheduler Library" and click "Run".  
![Windows Task Scheduler settings](img/quickstart/task_windows8.png)

The setup is now complete.





#### Setup complete
- Now ExmentAutoUpdate.exe runs every day at the fixed time. If there is a newer version, it is installed automatically.

