# Environment construction using Docker
These are the steps to run Exment with Docker (a system that runs applications in boxes called "containers").  
Note: for more detailed information, see [GitHub](https://github.com/exceedone/docker-exment).

The overall flow is as follows.

1. (Windows PCs only) Install WSL2 and Docker
2. Get the definition files
3. Build and set up the environment with the commands for your database
4. Do the initial settings of Exment in the browser


## Special thanks!
The Docker image is made from the [docker repository by oreno4649](https://github.com/oreno4649/docker-exment). Thank you very much!

## Environment
The steps on this page were made with the following environment.  
- nginx latest version
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## Important point

- Depending on your environment and versions, you may not be able to set up as written in these steps. Please understand.

- This page only describes the steps to run Exment with Docker.  
General IT knowledge such as SSH, creating a database and Docker commands is not written. Please understand.  

## Using a Windows PC (WSL2)
On Windows, install Docker in Ubuntu on WSL2 (a system that runs Linux inside Windows) and run Exment there. These steps are for development and testing.

### 1. Install WSL2 and Ubuntu
- Open PowerShell with "Run as administrator", run the following, and then restart the PC.

```
wsl --install -d Ubuntu
```

- After the restart, open "Ubuntu" from the Start menu and decide the Linux user name and password.
- Run `wsl -l -v` in PowerShell and check that the "VERSION" of Ubuntu is "2".

> If you get an error that virtualization is disabled, check that the virtualization setting (Intel VT-x, AMD-V) of the BIOS (UEFI) is enabled.

### 2. Install Docker in Ubuntu
- Run the following on the Ubuntu screen.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- Run `wsl --shutdown` in PowerShell, then open Ubuntu again.
- Run `docker run --rm hello-world`. If "Hello from Docker!" is shown, it is done.

> If Docker does not start, write the following in `/etc/wsl.conf`, run `wsl --shutdown`, open Ubuntu again, and then run `sudo systemctl enable --now docker`.
> ```
> [boot]
> systemd=true
> ```

> Docker Desktop for Windows also works. Docker Desktop is paid for use in companies above a certain size (check the terms of use of Docker, Inc.).

### 3. Run Exment
- Put the files inside Ubuntu (example: `~/exment`) and run the "Installation steps using Docker" below on the Ubuntu screen. If you put them on the C drive (`/mnt/c/...`), it runs very slowly.
- Open http://localhost in the browser on Windows.

### Notes
- WSL2 stops by itself when it is not used for a while, and the Docker containers stop too. When you use it, open Ubuntu and run `make mysql-up` (according to your database).
- If other software uses port 80 on Windows, change `EXMENT_DOCKER_HTTP_PORTS` in the `.env` of docker-exment to `8080` or the like. Then open it at http://localhost:8080.

## Installation steps using Docker

> Note: here we describe the steps for the most basic configuration, "web server" and "MySQL".  
Finer settings are also possible, such as "add a redundant configuration and a load balancer" and "add https".  
For details, see the Readme of [docker-exment](https://github.com/exceedone/docker-exment).


### Get definition file
- Get [docker-exment](https://github.com/exceedone/docker-exment), and get [exment-boilerplate](https://github.com/exceedone/exment-boilerplate) inside it. Keep the folder name "exment-boilerplate".

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- If you do not use git, download both as zip files and unzip them, rename the folder of exment-boilerplate to "exment-boilerplate" (it is "exment-boilerplate-master" after unzipping), and put it in the docker-exment folder.
- Run the commands below in the docker-exment folder. Run the ones for your database.



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
$ make mariadb-init
````

### Setting up a MariaDB environment

````bash
$ make mariadb-up
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
- Open the following URL and do the initial settings of Exment. (Note: if you changed the port of the web server, open it with that port)  
http://localhost


- The database information is as follows. (Note: the port is the port number inside the container. Even if you changed the port in env, it stays 3306)

| Item | Setting value |
| ---- | ---- |
| Database Type | MySQL |
| Host Name | mysql |
| Port | 3306 |
| Database | exment_database |
| User Name | exment_user |
| Password | secret |


## Steps to connect to the server
- Show the list of containers with the following command.

```
docker ps
# Example result
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- In the result, copy the value of "CONTAINER ID" of the image "docker-exment-php". In the example above, it is "123412341234".  

- Run the following command.

```
docker exec -it (CONTAINER ID) /bin/bash
#Example
docker exec -it 123412341234 /bin/bash
```

- Now you can connect to the web server where Exment is running.


## others
We are still testing this Docker image and adding features to it.  
For GitHub, see [docker-exment](https://github.com/exceedone/docker-exment).
