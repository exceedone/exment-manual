# Environment construction with XAMPP
XAMPP is recommended when building an environment with PHP, Apache, and MySQL as a development environment from the beginning.  
In this manual, Windows is introduced.  

- For other inquiries, please feel free to [contact us](https://exment.net/inquiry) for free.  

## important point
- **Please use XAMPP installation only for development and verification. We recommend that you do not use it as a production environment.** 

## Installation procedure

### XAMPP installation procedure
- Access the following site and download XAMPP.  
From the following page, select the one with "PHP7.3" or higher and download it.  
[XAMPP Download](https://www.apachefriends.org/jp/download.html)  

- After that, proceed with the installation of XAMPP.  
![XAMPP installation screen](img/xampp/xampp1.png)

- On the way, the screen for selecting the XAMPP component will be displayed. Select Apache and MySQL.  
Also add a check to "phpMyAdmin".  
※ Otherwise, please check arbitrarily and then click "Next".  
![XAMPP installation screen](img/xampp/xampp2.png)

- Follow the instructions on the screen to complete the installation.  

- When installation is complete, launch the XAMPP control panel.  
![XAMPP installation screen](img/xampp/xampp3.png)

- Click "Start" in the top "Apache" and "MySQL" rows.  
![XAMPP installation screen](img/xampp/xampp4.png)

- When the firewall settings are displayed, click "Allow".  
![XAMPP installation screen](img/xampp/xampp5.png)

- This will start Apache.  
![XAMPP installation screen](img/xampp/xampp6.png)

#### 【important point】
- When the OS is restarted, it is necessary to start the XAMPP control panel again and restart Apache.  


### Add environment variable
If you run mysql from the command prompt, you need to pass the path to "environment variables".  

- From Explorer, right-click "PC" and click "Properties".  
![MySQL environment variables](img/xampp/mysql_command1.png)

- Click "Advanced system settings".
![MySQL environment variables](img/xampp/mysql_command2.png)

- Click Environment Variables.
![MySQL environment variables](img/xampp/mysql_command3.png)

- Click "Path" of "User environment variable", and click "Edit".
![MySQL environment variables](img/xampp/mysql_command4.png)

- Click New and add the following line:

~~~
C:\Program Files\MySQL\MySQL Server 5.7\bin  
~~~

![MySQL environment variables](img/xampp/mysql_command5.png)

- After inputting, click “OK” to complete all the dialogs that have been started.

#### Create database
- After starting the XAMPP control panel, click "Admin" in the "MySQL" row.
![MySQL environment variables](img/xampp/phpmyadmin0.png)

- Click "New" on the left menu.
![MySQL environment variables](img/xampp/phpmyadmin1.png)

- In the "Create database" line, enter any database name in alphanumeric characters and click "Create".

![MySQL environment variables](img/xampp/phpmyadmin2.png)
Completes the database creation.


### Subdomain settings
Under normal settings, you can use Exment by placing the Exment project file in the "C: \ xampp \ htdocs" folder.  
However, there is a big problem, for example, when accessing the URL of [http: //localhost/exment/.env](http://localhost/exment/.env), the configuration file including the database information is displayed on the screen.  
Therefore, we strongly recommend that you avoid these issues. Please set according to the following procedure.  

- Create a folder "local" in the folder "C: \ xampp".
![Subdomain settings](img/xampp/subdomain1.png)

- Open "C: \ xampp \ apache \ conf \ extra \ httpd-vhosts.conf".

- Add the following description at the end of the line.  
**※"/ Public" is required at the end of DocumentRoot**  

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

- Open "C: \ WINDOWS \ system32 \ drivers \ etc \ hosts" and edit.  
※  Since this file cannot be edited directly, copy it to the desktop etc., edit it, and overwrite it in the original location.  

~~~
127.0.0.1       localhost
127.0.0.1       exment.localapp
~~~

- Restart Apache in the XAMPP control panel. In the XAMPP control panel, click the "Stop" button in the "Apache" line and click "Start" again.  
![XAMPP installation screen](img/xampp/xampp7.png)

- This will allow you to access Exment from the URL below.  
http://exment.localapp/admin

### Install Exment
Install Exment according to the Exment [installation procedure](/quickstart).
Exment installation is usually performed in the "C: \ xampp \ local" folder.
Here, it is assumed that the installation was performed in the "C: \ xampp \ local \ exment" folder.

- In the future installation of Exment, there is a screen to fill in the database settings, please enter as follows.  
    - Database type: MariaDB
    - Host name: 127.0.0.1
    - Port: 3306
    - Database: (Database name created above)
    - User name: root
    - Password: (blank)


## Correspondence at the time of PHP version upgrade
If you want to change the PHP version, please follow the steps below to upgrade.  
*You will not be able to access Exment during the version upgrade process.  
*The example below is the procedure for updating from PHP7.2 to PHP7.4. Also, it is a way to replace only PHP without updating all of XAMPP.  
*The version upgrade method may differ depending on the environment, installation time, version and installation method.  

- As a preparation for work, stop apache and MySQL and exit the XAMPP control panel.  

- Back up the PHP folder under XAMPP that you are currently using (default is C:\xampp\php). Choose your preferred method, such as renaming the folder or copying it to another location.  

- Download the new XAMPP in ZIP format.  

   1. Go to [XAMPP Download](https://www.apachefriends.org/jp/download.html)
   2. Download the file according to the OS and the version of PHP you want to use.  
      > In doing so, select the zip file instead of installer.exe. (If you have an environment that can be decompressed, you can use a 7z file)  
      ![XAMPP Download Page](img/xampp/xampp8.png)

   3. Unzip the ZIP file and copy the PHP folder directly under the extracted folder under XAMPP.  

- Modify the php.ini file as needed.  
*If you have changed the original ini file, you need to make the same change to the new ini file. Compare the backed up php.ini file with the new php.ini file and add various settings etc.  

- Launch the XAMPP Control Panel.  

- Press the Shell button to bring up the command screen and check that the PHP version is new.  

~~~
php -v
~~~

- Click Start in the Apache and MySQL rows.  

   > An error may occur at "Start" of "Apache".  
   In that case, open "Logs"-> "Apache (error.log)" on the right side of the same line.  
   If the latest line of the log says "PHP Warning:'vcruntime140.dll' ...", you need to install the "Visual C ++ Redistributable Package".  
   Go to the [Microsoft Download Site](https://visualstudio.microsoft.com/en/downloads/) and scroll to the bottom → open "Other Tools, Frameworks, and Redistributables".  
   Click the download button of "Microsoft Visual C ++ Redistributable for Visual Studio 2022" to get the installer → execute it.  
