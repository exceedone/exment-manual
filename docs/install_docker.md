# Environment construction using Docker
This page describes the steps to build Exment with Docker.   
※For more detailed information on this page, please check [GitHub](https://github.com/exceedone/docker-exment).


## Special thanks!
The Docker image is built based on the [docker repository by oreno4649](https://github.com/oreno4649/docker-exment). Thank you very much!

## Environment
This page is constructed with the following contents.   
- nginx latest version
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## Important point

- Depending on your environment and version, you may not be able to set up correctly using this procedure. note that.

- This procedure only describes the steps to run Exment with Docker.   
General IT knowledge such as SSH, database creation, Docker commands, etc. is not included. note that.   

## Using a Windows PC (WSL2)
On Windows, install Docker in Ubuntu on WSL2 (the Windows feature that runs Linux) and run Exment there. This is for development and testing.

### 1. Install WSL2 and Ubuntu
- Open PowerShell with "Run as administrator", run the following, and restart the PC.

```
wsl --install -d Ubuntu
```

- After the restart, open "Ubuntu" from the Start menu and set a Linux user name and password.
- Run `wsl -l -v` in PowerShell and check that the "VERSION" of Ubuntu is "2".

> If you get an error that virtualization is disabled, check that virtualization (Intel VT-x / AMD-V) is enabled in the BIOS (UEFI) settings.

### 2. Install Docker in Ubuntu
- Run the following in Ubuntu.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- Run `wsl --shutdown` in PowerShell, then open Ubuntu again.
- Run `docker run --rm hello-world`. If "Hello from Docker!" is shown, Docker is ready.

> If Docker does not start, write the following in `/etc/wsl.conf`, run `wsl --shutdown`, open Ubuntu again, and run `sudo systemctl enable --now docker`.
> ```
> [boot]
> systemd=true
> ```

> Docker Desktop for Windows also works. Docker Desktop is paid for companies above a certain size (see the Docker subscription terms).

### 3. Run Exment
- Put the files in Ubuntu (for example `~/exment`) and run the "Installation steps using Docker" below in Ubuntu. Files on the C drive (`/mnt/c/...`) make it very slow.
- Open http://localhost in the browser on Windows.

### Notes
- WSL2 stops by itself after a while without use, and the Docker containers stop with it. Open Ubuntu and run `make mysql-up` (for your database) when you use it.
- If another program uses port 80 on Windows, change `EXMENT_DOCKER_HTTP_PORTS` in the `.env` of docker-exment to, for example, `8080`, and open http://localhost:8080/admin.

## Installation steps using Docker

> ※Here are the steps for configuring the most standard web server, MySQL.   
Other than that, detailed specifications such as adding https to add a redundant configuration and load balancer are also possible.   
For details, please check the Readme of [docker-exment](https://github.com/exceedone/docker-exment).


### Get definition file
- Get [docker-exment](https://github.com/exceedone/docker-exment), and get [exment-boilerplate](https://github.com/exceedone/exment-boilerplate) inside it. Keep the folder name "exment-boilerplate".

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- Without git, download both as zip files, unzip them, rename the folder of exment-boilerplate to "exment-boilerplate" (it is "exment-boilerplate-master" after unzipping), and put it in the docker-exment folder.
- Run the commands below in the docker-exment folder.


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
- Please access the following site and perform the initial settings of Exment. (※If you have changed the web server port, please access using that port)  
http://localhost


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
Please use GitHub [here](https://github.com/exceedone/docker-exment).
