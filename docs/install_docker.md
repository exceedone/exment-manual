# Environment construction using Docker
This page describes the steps to build Exment with Docker.   
※For more detailed information on this page, please check [GitHub](https://github.com/exment-git/docker-exment).


## Special thanks!
The Docker image is built based on the [docker repository by yamada28go](https://github.com/yamada28go/docker-exment). Thank you very much!

## Environment
This page is constructed with the following contents.   
- nginx latest version
- PHP 8.2.XX
- Debian
- MySQL 8.0.XX

## Important point

- Depending on your environment and version, you may not be able to set up correctly using this procedure. note that.

- This procedure only describes the steps to run Exment with Docker.   
General IT knowledge such as SSH, database creation, Docker commands, etc. is not included. note that.   

## Installation steps using Docker

> ※Here are the steps for configuring the most standard web server, MySQL.   
Other than that, detailed specifications such as adding https to add a redundant configuration and load balancer are also possible.   
For details, please check the Readme of [docker-exment](https://github.com/exment-git/docker-exment).


### Get definition file
- Download the required folder from the page below and unzip the zip file.   
[docker-exment](https://github.com/exment-git/docker-exment)


### Building a MySQL environment

````bash
$ make mysql-init
````

### Setting up a MySQL environment

````bash
$ make mysql-up
````

### Building a MariaDB environment

````bash
$ make maridb-init
````

### Setting up a MariaDB environment

````bash
$ make maridb-init
````

### Building a SQL Server environment

````bash
$ make sqlsrv-init
````

### Setting up a SQL Server environment

````bash
$ make sqlsrv-up
````

### Exment initial settings
- Please access the following site and perform the initial settings of Exment. (※If you have changed the web server port, please access using that port)  
http://localhost/admin


- Database information is as follows. (※port refers to the internal port number, so even if you change the port in env, it will be fixed at 3306)

| Item | Setting value |
| ---- | ---- |
| Database type | MySQL |
| hostname | mysql |
| Port | 3306 |
| Database name | exment_database |
| Username | exment_user |
| password | secret |


## Steps to connect to the server
- Use the following command to get a list of containers.

````
docker ps
# Example result
123412341234        exment-docker_php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             exment-docker_php_1
````

- Copy the CONTAINER ID value of the image exment-docker_php in the results. In the example above, 123412341234 is applicable.   

- Run the following command.

````
docker exec -it (CONTAINER ID) /bin/bash
#example
docker exec -it 123412341234 /bin/bash
````

- Now you can connect to the web server where Exment is running.


## others
This Docker image is currently being verified and features are being added.   
Please use GitHub [here](https://github.com/exment-git/docker-exment).
