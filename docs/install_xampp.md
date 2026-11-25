# Environment construction using XAMPP
How to build an environment that runs Exment on a Windows PC with XAMPP.  
XAMPP is software that installs PHP, Apache and MySQL together. We recommend it when you build a development environment from the beginning.

## Important point
- **Please use an XAMPP installation only for development and verification. We recommend that you do not use it as a production environment.**

## Installation instructions
Go in this order.

1. Install XAMPP and start Apache and MySQL
2. Make the mysql command usable (environment variables)
3. Create a database
4. Make a URL for Exment (subdomain settings)
5. Install Exment

### XAMPP installation instructions
1. Download XAMPP from the site below.  
[XAMPP download](https://www.apachefriends.org/jp/download.html)

2. Select one with "PHP8.2" or higher and download it.  
![XAMPP installation screen](img/xampp/xampp_win.png)

3. Proceed with the installation of XAMPP.  
![XAMPP installation screen](img/xampp/xampp1.png)

4. On the way, a screen for selecting the XAMPP components appears. Select Apache and MySQL.  
Also check "phpMyAdmin".  
※Check the others as you like  
Then click "Next".  
![XAMPP installation screen](img/xampp/xampp2.png)

5. Follow the screens to finish the installation.

6. When the installation is finished, start the XAMPP control panel.  
![XAMPP installation screen](img/xampp/xampp3.png)

7. Click "Start" in the "Apache" and "MySQL" rows at the top.  
![XAMPP installation screen](img/xampp/xampp4.png)

8. If the firewall setting appears, click "Allow".  
![XAMPP installation screen](img/xampp/xampp5.png)

9. Apache is now running.  
![XAMPP installation screen](img/xampp/xampp6.png)

#### 【Important point】
- After you restart the OS, you need to start the XAMPP control panel again and start Apache again.


### Add environment variables
To run mysql from the command prompt, you need to add its path to the "environment variables".

1. In Explorer, right-click "This PC" and click "Properties".  
![MySQL environment variables](img/xampp/mysql_command1.png)

2. Click "Advanced system settings".  
![MySQL environment variables](img/xampp/mysql_command2.png)

3. Click "Environment Variables".  
![MySQL environment variables](img/xampp/mysql_command3.png)

4. Click "Path" under "User variables" and click "Edit".  
![MySQL environment variables](img/xampp/mysql_command4.png)

5. Click "New" and add the following line.

~~~
C:\xampp\mysql\bin  
~~~

![MySQL environment variables](img/xampp/mysql_command5.png)

6. After entering it, close all the open dialogs with "OK".

##### When running Mysql under XAMPP
- When you run the Mysql inside XAMPP, add the path to the folder that holds the executable file to .env in the root directory of Exment, at the [Exment installation](/install_xampp?id=exment-installation) step.

~~~
#Example  
EXMENT_MYSQL_BIN_DIR="C:/xampp/mysql/bin"
~~~

#### Create database
1. Start the XAMPP control panel and click "Admin" in the "MySQL" row.  
![MySQL environment variables](img/xampp/phpmyadmin0.png)

2. Click "New" in the left menu.  
![MySQL environment variables](img/xampp/phpmyadmin1.png)

3. In the "Create database" row, enter any database name in alphanumeric characters and click "Create".  
![MySQL environment variables](img/xampp/phpmyadmin2.png)

The database is now created.


### Subdomain settings
With the usual settings, you can use Exment by putting the Exment project files in the "C:\xampp\htdocs" folder.  
But as it is, there is a big problem: for example, opening the URL [http://localhost/exment/.env](http://localhost/exment/.env) shows the setting file, which contains the database information, on the screen.  
So we strongly recommend the settings that prevent this problem. Set them with the steps below.

1. Create the folder "local" in the folder "C:\xampp".  
![Subdomain settings](img/xampp/subdomain1.png)

2. Open "C:\xampp\apache\conf\extra\httpd-vhosts.conf".

3. Add the following to the end of the file. **※DocumentRoot must have "/public" at the end**  

~~~
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
  DocumentRoot "C:/xampp/local/exment/public"
  ServerName exment.localapp
</VirtualHost>

<Directory "C:\xampp\local\exment\public">
  Allow from all
  AllowOverride All
  Require all granted
</Directory>
~~~

4. Open "C:\WINDOWS\system32\drivers\etc\hosts" and edit it as follows.  
※This file cannot be edited directly. Copy it to the desktop or another place, edit it, and then overwrite the original.  

~~~
127.0.0.1       localhost
127.0.0.1       exment.localapp
~~~

5. Restart Apache in the XAMPP control panel. Click the "Stop" button in the "Apache" row, then click "Start" again.  
![XAMPP installation screen](img/xampp/xampp7.png)

6. Now you can open Exment at the URL below.  
http://exment.localapp

### Exment installation
Install Exment by following the Exment [installation steps](/quickstart).  
Exment is normally installed in the "C:\xampp\local" folder.  
Here, we assume that it was installed in the "C:\xampp\local\exment" folder.  

- During the installation, there is a screen for entering the database settings. Enter them as follows.
    - Database Type: MariaDB
    - Host Name: 127.0.0.1
    - Port: 3306
    - Database: (the database name created above)
    - User Name: root
    - Password: (blank)

## Correspondence when upgrading PHP version
To change the PHP version, follow the steps below.

- Exment cannot be accessed while the version is being changed.
- The example below is the procedure for updating from PHP7.4 to PHP8.2. It replaces only PHP, without updating the whole of XAMPP.
- The steps may differ depending on the environment, when Exment was installed, the version and the installation method.

1. To prepare, stop Apache and MySQL and exit the XAMPP control panel.

2. Back up the PHP folder (default: C:\xampp\php) and the Apache folder (default: C:\xampp\apache) inside the XAMPP you are using now. Any method is fine, such as renaming the folders or copying them to another place.

3. Download a new XAMPP in ZIP format.  

   1. Open [XAMPP download](https://www.apachefriends.org/jp/download.html)
   2. Download the file that matches your OS and the PHP version you want to use.  
      > Select the zip file, not installer.exe. (A 7z file is also fine if you can extract it.)
      ![XAMPP download screen](img/xampp/xampp8.png)

   3. Extract the ZIP file, and copy the PHP folder and the Apache folder directly under the extracted folder into the XAMPP folder.  

4. Edit the php.ini file if necessary.  
※If you had changed the original ini file, the new ini file needs the same changes. Compare the backed-up php.ini with the new php.ini and add the setting values.  

5. Start the XAMPP control panel.

6. Press the config button of Apache and select "Apache(httpd-xampp.conf)" from the pull-down. 
   ![XAMPP selection screen](img/xampp/xampp9.png)

7. Edit httpd-xampp.conf. 
   1. First, replace all "php7_module" with "php_module".
   2. Replace all the remaining "php7" with "php8".
   ![httpd-xampp.conf edit screen](img/xampp/xampp10.png)

8. Press the Shell button to open the command screen, and check that the PHP version is the new one.

~~~
php -v
~~~

9. Click "Start" in the "Apache" and "MySQL" rows.  

   > An error may occur at "Start" of "Apache".  
   In that case, open "Logs" → "Apache(error.log)" on the right side of the same row.  
   If the newest line of the log shows "PHP Warning: 'vcruntime140.dll'...", you need to install the "Visual C++ Redistributable".  
   Open [Microsoft's download site](https://visualstudio.microsoft.com/downloads/), scroll to the bottom and open "Other Tools, Frameworks, and Redistributables".  
   Click the download button of "Microsoft Visual C++ Redistributable for Visual Studio 2022" to get the installer, and run it.  
