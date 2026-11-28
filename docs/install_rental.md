# Environment construction using rental server
How to install Exment on a rental server. It is an option when you want to build and run an environment easily.  
This page explains the steps for Xserver and for Sakura Internet.

> To install without SSH, by uploading one file, see [Easy install (rental server)](/install_rental_easy).

| Your server | Where to look |
|---|---|
| Xserver | [For Xserver](/install_rental?id=for-xserver) |
| Sakura Internet | [For Sakura Internet](/install_rental?id=for-sakura-internet) |

The rough flow is the same for both.

1. Create a MySQL (database) for Exment
2. Connect to the server by SSH and install composer
3. Install Exment in a folder that is not open to the web
4. Open only the "public" folder of Exment to the web
5. Finish the settings by following the [installation steps](/quickstart)

## Points to note when building on a rental server
- Exment requires the following environment.
    1. PHP 8.2 or higher
    1. MySQL 8.0 or higher (recommended: 8.4)  
    or MariaDB 10.11 or higher  
  <span class="red">In particular, the MySQL version of some rental servers does not meet the requirements.  
  Please check first whether your rental server meets them.</span>

- A rental server has a fixed folder that is open to the web (/home/username/www, /public_html, etc.).  
<span class="red bold big">Do not put the folder where Exment is installed directly under this folder. Files that contain the database settings, the mail password and so on would be open to the outside, leading to a fatal information leak.</span>  
The steps on this page open only the folder that should be open to the web. Please publish it exactly as in these steps.

- On a rental server, after connecting by SSH, first install composer, and then install Exment.

- Depending on the environment of the rental server and the versions on the server side, the steps on this page may not work correctly.

- This page only describes the steps to run Exment on a rental server.  
It does not cover general IT knowledge such as SSH, creating a database, or Linux commands. Thank you for your understanding.

## Installation procedure using rental server

### For Xserver
※Operation has been confirmed with the X10 plan.

<iframe width="560" height="420" src="https://www.youtube.com/embed/RB6i0F2fev0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**(1) Create MySQL**

Create a MySQL for Exment in advance.

**(2) Make the PHP for commands the same version as the control panel**

On Xserver, the PHP version set on the control panel and the PHP version you get when you connect by SSH and run commands can be different.  
So set the PHP version used for commands.

1. On the Xserver control panel, click "PHP Ver. switch".  
Then select the target domain.  
![Xserver settings](img/install/install_xserver2.png)  
![Xserver settings](img/install/install_xserver3.png)  

2. The current version is written in "PHP version switch". Make a note of it.  
![Xserver settings](img/install/install_xserver4.png)  

3. Connect to Xserver by SSH.

4. Look up the PHP versions installed on Xserver with the command below.  
From the result, copy the path of the PHP version you noted.

~~~ bash
find /opt/php-*/bin -type f -name 'php'

## /opt/php-8.2.9/bin/php ←this one in this example
~~~

5. Create a folder and create a symbolic link to PHP (a symbolic link is like a shortcut that points to a file in another place).

~~~
mkdir $HOME/bin
ln -s /opt/php-8.2.9/bin/php $HOME/bin/php
~~~

6. Edit the bashrc file to put this PHP on the path.

~~~ bash
vi ~/.bashrc

## Write the following on the last line and save with ":wq!"
export PATH=$HOME/bin:$PATH

## Apply the change
source ~/.bashrc
~~~

7. Check the PHP version. If it is the version written on the control panel, it is done.

~~~ bash
php --version
~~~

**(3) Install composer**

~~~ bash
cd ~
curl -sS https://getcomposer.org/installer | php -- --install-dir=$HOME/bin/
## Rename
mv $HOME/bin/composer.phar $HOME/bin/composer
## Check
composer --version
# Composer version 2.6.5 2023-10-06 10:11:52
~~~

**(4) Install Exment**

<span class="red bold big">Never install directly under the "$HOME/(domain name)/public_html" folder. Files that contain the database settings, the mail password and so on would be open to the outside, leading to a fatal information leak.</span>  
Here, create the "$HOME/(domain name)/laravel" folder and install Exment in it.

~~~ bash
cd ~/(domain name)
mkdir laravel
cd laravel
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip
~~~

**(5) Open only the public folder**

Make "$HOME/(domain name)/public_html" a symbolic link to the "$HOME/(domain name)/laravel/exment/public" folder you just created.  
This way, the Laravel program and the setting values stay outside the folder that is open to the web, and only the public folder of Laravel is in public_html.

~~~ bash
## Delete the default public_html
rm -r $HOME/(domain name)/public_html
ln -s $HOME/(domain name)/laravel/exment/public $HOME/(domain name)/public_html
~~~

**(6) Continue the installation**

Now you are ready to open Exment.  
Please finish the settings by following the [installation steps](/quickstart).  
※From v7.2.1, Exment opens at this URL. On a site with "admin" in `ADMIN_ROUTE_PREFIX` of `.env` (a site installed with an older version), add "/admin" to the end of the URL.  


#### PHP for commands and cron
On Xserver, the PHP for the web (chosen in "PHP Ver. switch" on the control panel) and the PHP you get by typing `php` over SSH or in cron <span class="red bold">are different</span>.

- Over SSH, `php` runs `~/bin/php` (the PHP linked above). Without the link, it runs the server's default PHP, which can be an old version.
- cron does not read `~/.bashrc`. With only `php`, the server's default PHP (8.0, for example) runs, and Exment does not work.

So run artisan commands and cron with **the same PHP version as the control panel, by its full path**.

- Example (PHP 8.3): `/usr/bin/php8.3`, or `/opt/php-8.3.x/bin/php` found by `find` above
- When you change the PHP version on the control panel, change the `~/bin/php` link and the cron path to the same version.

Set the [task schedule](/additional_task_schedule) in "Cron settings" on the Xserver control panel like this (use your own `(server ID)` and `(domain name)`).

~~~
* * * * * cd /home/(server ID)/(domain name)/laravel/exment && nice -n 15 /usr/bin/php8.3 artisan schedule:run >> /dev/null 2>&1
~~~

For the queue ([delayed notifications](/additional_queue)), a rental server cannot keep a worker running all the time. Keep `QUEUE_CONNECTION` in `.env` as `sync` (the value set at installation). If you use `database`, let cron clear the waiting jobs every minute.

~~~
* * * * * cd /home/(server ID)/(domain name)/laravel/exment && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
~~~


#### Correspondence when upgrading PHP version
To change the PHP version, follow the steps below.

- Exment cannot be accessed while the version is being changed.
- The example below is the procedure for updating from PHP7.4 to PHP8.2.
- The steps may differ depending on the environment, when Exment was installed, the version and the installation method.

1. On the Xserver control panel, click "PHP Ver. switch".  
Then select the target domain.

2. In "PHP version switch", switch to the new version and click "Change".  
![Xserver settings](img/install/install_xserver6.png)  

3. Connect to Xserver by SSH.

4. Check the current PHP version with the command below.  
(At this point, the old version is shown.)

~~~ 
php --version
~~~

5. Remove the symbolic link to PHP.

~~~
unlink $HOME/bin/php
~~~

6. Look up the path of the version selected in "PHP version switch".

~~~ bash
find /opt/php-*/bin -type f -name 'php'

## /opt/php-8.2.9/bin/php  ←this one in this example
~~~

7. Create a symbolic link to the path you found.

~~~
ln -s /opt/php-8.2.9/bin/php $HOME/bin/php
~~~

8. Check the PHP version. If it is the new version, it worked.

~~~ 
php --version
~~~

### For Sakura Internet
※Operation has been confirmed with the Standard plan.  
※On Sakura Internet, "composer" may stop in the middle of a run.  
So run it with "nice -n 20" in front, like "nice -n 20 composer".

**(1) Create MySQL**

Create a MySQL for Exment in advance.

**(2) Change the folder that is open to the web**

1. In "Domain/SSL settings" of the Sakura Internet control menu, select the domain you want to change.  
![Sakura Internet settings](img/install/install_rental1.png)  

2. In "Target folder of the multi-domain", change the specified folder. Here it is "/exment".  
![Sakura Internet settings](img/install/install_rental2.png)  

**(3) Connect by SSH and set the shell and the path**

1. Connect by SSH with your ID and password.

2. Change the shell.

~~~
which bash
#  /usr/local/bin/bash

chsh -s /usr/local/bin/bash
# Password:  ## Enter the password
# chsh: user information updated
~~~

3. Edit .bash_profile.

~~~ bash
vi .bash_profile

## Write the following and save with ":wq!"
PATH=$PATH:$HOME/bin:$HOME/usr/local/bin
export PATH
~~~

4. Disconnect SSH once, and connect by SSH again.

**(4) Install composer**

~~~ bash
cd ~
mkdir -p usr/local/bin/
curl -sS https://getcomposer.org/installer | php -- --install-dir=usr/local/bin/
## Rename
mv usr/local/bin/composer.phar usr/local/bin/composer
## Check
nice -n 20 composer --version
# Composer version 2.6.5 2023-10-06 10:11:52
~~~

**(5) Install Exment**

<span class="red bold big">Never install directly under the "$HOME/www/" folder. Files that contain the database settings, the mail password and so on would be open to the outside, leading to a fatal information leak.</span>  
Here, create the "$HOME/laravel" folder and install Exment in it.

~~~ bash
cd ~
mkdir laravel
cd laravel
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip
~~~

**(6) Open only the public folder**

Create "$HOME/www/exment" as a symbolic link to the "$HOME/laravel/exment/public" folder you just created.  
This way, the Laravel program and the setting values stay outside the folder that is open to the web, and only the public folder of Laravel is in the www folder.

~~~
ln -s $HOME/laravel/exment/public $HOME/www/exment
~~~

**(7) Continue the installation**

Now you are ready to open Exment.  
Please finish the settings by following the [installation steps](/quickstart).  
※From v7.2.1, Exment opens at this URL. On a site with "admin" in `ADMIN_ROUTE_PREFIX` of `.env` (a site installed with an older version), add "/admin" to the end of the URL.  



#### Correspondence when upgrading PHP version
To change the PHP version, follow the steps below.

- Exment cannot be accessed while the version is being changed.
- The steps may differ depending on the environment, when Exment was installed, the version and the installation method.

1. On the Sakura Internet control panel, click "Script settings" → "Language version settings".  
![Sakura Internet settings](img/install/install_sakura1.png)  

2. In "PHP version", switch to the new version and click "Save".  
![Sakura Internet settings](img/install/install_sakura2.png)  

3. Connect to Sakura Internet by SSH.

4. Check the PHP version. If it is the new version, it worked.

~~~ bash
php --version
~~~
