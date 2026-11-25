# 用 Docker 搭建环境
这是用 Docker（让应用在叫做“容器”的盒子里运行的机制）运行 Exment 的步骤。  
※更详细的信息请看 [GitHub](https://github.com/exceedone/docker-exment)。

大致流程如下。

1. （只限 Windows 电脑）安装 WSL2 和 Docker
2. 获取定义文件
3. 用与数据库对应的命令，搭建并设置环境
4. 用浏览器进行 Exment 的初始设置


## Special thanks!
Docker 镜像是以 [oreno4649 先生的 docker 仓库](https://github.com/oreno4649/docker-exment)为基础制作的。非常感谢！

## 环境
本页的步骤是在下面的环境中编写的。  
- nginx 最新版
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## 注意事项

- 根据您使用的环境和版本，有时不能按本步骤设置。敬请谅解。

- 本页只写了让 Exment 在 Docker 上运行的步骤。  
SSH、创建数据库、Docker 的命令等一般的 IT 知识没有写。敬请谅解。  

## 在 Windows 电脑上使用时（WSL2）
在 Windows 上，把 Docker 安装在 WSL2（在 Windows 里运行 Linux 的机制）的 Ubuntu 中来运行。这是开发和验证用的步骤。

### 1. 安装 WSL2 和 Ubuntu
- 用“以管理员身份运行”打开 PowerShell，执行下面的命令，然后重新启动电脑。

```
wsl --install -d Ubuntu
```

- 重新启动后，从开始菜单打开“Ubuntu”，决定 Linux 的用户名和密码。
- 在 PowerShell 中执行 `wsl -l -v`，确认 Ubuntu 的“VERSION”是“2”。

> 出现虚拟化无效的错误时，请确认 BIOS（UEFI）的虚拟化设置（Intel VT-x、AMD-V）是否已启用。

### 2. 在 Ubuntu 中安装 Docker
- 在 Ubuntu 的窗口中执行下面的命令。

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- 在 PowerShell 中执行 `wsl --shutdown`，然后重新打开 Ubuntu。
- 执行 `docker run --rm hello-world`，显示“Hello from Docker!”就完成了。

> Docker 不能启动时，请在 `/etc/wsl.conf` 中写入下面的内容，执行 `wsl --shutdown` 后重新打开 Ubuntu，再执行 `sudo systemctl enable --now docker`。
> ```
> [boot]
> systemd=true
> ```

> 用 Docker Desktop for Windows 也可以运行。Docker Desktop 在一定规模以上的企业中使用是收费的（请确认 Docker 公司的使用条款）。

### 3. 运行 Exment
- 文件放在 Ubuntu 里（例: `~/exment`），在 Ubuntu 的窗口中执行下面的“用 Docker 安装的步骤”。放在 C 盘（`/mnt/c/...`）的话，运行会非常慢。
- 用 Windows 的浏览器打开 http://localhost 。

### 注意
- WSL2 一段时间不用就会自动停止，Docker 的容器也会停止。使用时，请打开 Ubuntu，执行 `make mysql-up`（按您使用的数据库选择）。
- Windows 的 80 端口被其他软件占用时，请把 docker-exment 的 `.env` 中的 `EXMENT_DOCKER_HTTP_PORTS` 改为 `8080` 等。这时用 http://localhost:8080 打开。

## 用 Docker 安装的步骤

> ※这里写的是采用最基本的“Web 服务器”“MySQL”结构的步骤。  
此外，也可以做“添加冗余结构和负载均衡器”“添加 https”等细致的指定。  
详细内容请看 [docker-exment](https://github.com/exceedone/docker-exment) 的 Readme。


### 获取定义文件
- 获取 [docker-exment](https://github.com/exceedone/docker-exment)，再在其中获取 [exment-boilerplate](https://github.com/exceedone/exment-boilerplate)。文件夹名请保持“exment-boilerplate”。

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- 不使用 git 时，把两者都用 zip 下载并解压，把 exment-boilerplate 的文件夹名改为“exment-boilerplate”（解压后会是“exment-boilerplate-master”），放到 docker-exment 的文件夹里。
- 下面的命令在 docker-exment 的文件夹中执行。请执行您使用的数据库对应的命令。



### 搭建 MySQL 环境

````bash
$ make mysql-init
````

### 设置 MySQL 环境

````bash
$ make mysql-up
````

### 搭建 MariaDB 环境

````bash
$ make mariadb-init
````

### 设置 MariaDB 环境

````bash
$ make mariadb-up
````

### 搭建 SQL Server 环境

````bash
$ make sqlsrv-init
````

### 设置 SQL Server 环境

````bash
$ make sqlsrv-up
````

### Exment 初始设置
- 请打开下面的 URL，进行 Exment 的初始设置。(※更改了 Web 服务器的端口时，请用那个端口打开)  
http://localhost


- 数据库的信息如下。(※端口使用容器内的端口号。即使在 env 中改了端口，也仍然是 3306)

| 项目 | 设置值 |
| ---- | ---- |
| 数据库类型 | MySQL |
| 主机名 | mysql |
| 端口 | 3306 |
| 数据库名 | exment_database |
| 用户名 | exment_user |
| 密码 | secret |


## 连接服务器的步骤
- 用下面的命令显示容器的列表。

```
docker ps
# 结果示例
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- 在结果中，复制镜像为“docker-exment-php”的那一行的“CONTAINER ID”的值。上面的例子中是“123412341234”。  

- 执行下面的命令。

```
docker exec -it (CONTAINER ID) /bin/bash
#例
docker exec -it 123412341234 /bin/bash
```

- 这样就可以连接到运行着 Exment 的 Web 服务器。


## 其他
这个 Docker 镜像现在仍在继续验证和添加功能。  
GitHub 请看 [docker-exment](https://github.com/exceedone/docker-exment)。
