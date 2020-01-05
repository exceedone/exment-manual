# Server settings
To use Exment, you must first set up a web server and database.  
Please set according to the following procedure according to the environment to use.  

- [XAMPP construction (development / verification environment) Windows](/install_xampp)  
→ First, if you want to install Exment on your PC (Windows version)

- [XAMPP construction (development / verification environment) Mac](/install_xampp_mac)  
→ If you want to install Exment on your PC first (Mac version)

- [Rental server construction](/install_rental)  
→ Exment is published and you want to easily access from other members or smartphones

- [Built on Linux](/install_linux)  
→steps for installing → Exment to Linux (CentOS)

- [Build on AWS](/install_aws)  
→ (β version) Procedure for building Exment on AWS

# composer introduction
Exment requires the introduction of composer. Please refer here for the introduction method.  
※ Those who have already introduced are unnecessary.  
- [Official site](https://getcomposer.org/download/)
- [Windows version explanation site](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux version explanation site](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Commentary site for Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

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