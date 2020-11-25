# Server settings
To use Exment, first you need to set up the web server and database.
Follow the procedure below to make the settings depending on your environment.
* Currently, we are very sorry, but we are not accepting individual inquiries regarding the installation procedure or server construction. If you would like individual support, please request paid support.
In addition, we do not currently have manuals for environments other than the following. Please note.

## Web server
This is the procedure for building a web server. Follow one of the steps below to build a web server.  
※XAMPP is recommended when building an environment with PHP, Apache, and MySQL from the beginning as a development environment.

- [XAMPP construction (development / verification environment) Windows](/install_xampp)  
→ First of all, if you want to install Extension on your personal computer (Windows version)

- [XAMPP construction (development / verification environment) Mac](/install_xampp_mac)  
→ First of all, if you want to install Extension on your PC (Mac version)

- [Rental server construction](/install_rental)  
→ If you want to publish the Exment and easily access it from other members or smartphones

- [Build on Linux](/install_linux)  
→ Procedure for installing Extension on Linux (CentOS)

- [Build on IIS](/install_iis)  
→ Procedure when building Exment on IIS

- [Build on AWS](/install_aws)  
→ Procedure when building Exment on AWS

- [Build with Docker](/install_docker)  
→ Procedure when building Exment with Docker

## Database
Exment's database engine requires one of the following:

- MySQL 5.7.8 or higher and less than 8.0.0
- MariaDB 10.2.7 and above
- SQL Server 13.0.0 or higher (Currently, automatic backup / restore is not supported)

### Database environment construction
--If you have not set up the database server yet, please build the database server.
Please check the link below for the construction method.
* Not required if already installed.

     - [MySQL](/install_mysql)
     - [SQL Server](/install_sqlserver)

### Create database

- Create a database for Exment with each database engine.

## Operating environment
### server
- PHP 7.1.3 or higher
- MySQL 5.7.8 or higher, lower than 8.0.0 or MariaDB 10.2.7 or higher
- Laravel5.6aravel5.6

<span class="red">※ In Exment, json type is used for the database. Databases that support json type are MySQL 5.7.8 or higher and MariaDB 10.2.7 or higher. Please check the version of the database you plan to use.</span>

### Operation check browser
- Google Chrome
- Microsoft Edge

> Internet Explorer is not supported by Exment due to its high technical debt and the fact that [Microsoft is asking us to stop using](https:/panese.engadget.com/2019/02/08/internet-explorer-ie/) it.
The javascript used is also one that IE does not support. We ask you to acknowledge it.