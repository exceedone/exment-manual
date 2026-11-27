# 安装的流程
这是把 Exment 安装到自己的服务器上、直到开始使用的流程。一共有 4 个步骤。

![开始使用 Exment 之前](../ja/img/quickstart/quickstart_first1.png)

> **不想准备服务器时**  
> 也有不用安装就能使用的 **Exment SaaS**（不需要上面的 01、02）。想先试用一下时，请使用[演示](https://exment.net/zh/demo-env/)。详情请看[价格和支持](https://exment.net/en/plan/)。

## 1. 准备服务器
只要有能运行 PHP 的 Web 服务器和数据库，Exment 就能运行。

| 需要的东西 | 内容 |
|---|---|
| Web 服务器 | Apache、nginx、IIS 等 |
| PHP | 8.2 以上 |
| 数据库 | MySQL 8.0 以上、MariaDB 10.11 以上、SQL Server 13.0 以上中的任意一种 |

详细的运行环境和设置请看[服务器设置](/zh/server)。也有各环境的步骤。

| 使用的环境 | 步骤 |
|---|---|
| 在自己的电脑上试用 | [XAMPP（Windows）](/zh/install_xampp)、[XAMPP（Mac）](/zh/install_xampp_mac) |
| 租用服务器（Xserver 等） | [租用服务器](/zh/install_rental) |
| Linux 服务器 | [Linux](/zh/install_linux) |
| 云 | [AWS](/zh/install_aws)、[AWS（1 台）](/zh/install_aws_single)、[Azure Web Apps](/zh/install_azure_web_apps) |
| Docker | [Docker](/zh/install_docker) |
| Windows 服务器 | [IIS](/zh/install_iis) |

## 2. 安装 Exment
用下面的任意一种方法安装。拿不定主意时，推荐“简易安装”。

| 方法 | 适用的情况 | 步骤 |
|---|---|---|
| **简易安装（推荐）** | 放好 zip，按页面的引导进行 | [简易安装](/zh/quickstart_easy) |
| 手动安装 | 用 composer 和命令安装 | [手动安装](/zh/quickstart_manual) |
| Docker | 用容器运行 | [Docker](/zh/install_docker) |

- 最新版的 zip、过去的版本和 SHA-256 在[下载](https://exment.net/zh/download/)中。
- v7.2.1 以后新安装时，URL 中不带“/admin”（例：`http://localhost`）。想带上时，可以在安装页面的“URL 前缀”中决定（[URL 中包含的 admin](/zh/additional_prefix)）。

## 3. 进行初始设置
安装结束后，会显示初始设置的页面。

![初始设置页面](../img/install/install1.png)

- 决定公司名称和系统管理员的账号。
- **推荐的设置**（Exment 的缓存、设置的缓存、文件的权限等）会以已勾选的状态显示。为了用得又快又安全，推荐直接这样设置（[性能调优](/zh/tuning)）。
- 选择想用的模板（客户管理、申请包等），表和菜单会一起装好。

详情请看[初始设置](/zh/first_setting)。

## 4. 开始使用
- **首先要决定的事（任何站点都需要）**：请设置[任务计划](/zh/additional_task_schedule)（cron）。通知、计划、自动备份等才会运行。
- 按照业务创建[表](/zh/table)、[表单](/zh/form)、[视图](/zh/view)。
- 在[功能管理](/zh/feature)中选择要使用的功能和免费的官方插件（项目管理、支持服务台、Groupware）。
- 用[安全检查](/zh/security_check)和[性能调优](/zh/tuning)确认安全和速度方面的设置。
- 其他设置（邮件、文件的保存位置、队列等）在[追加设置](/zh/quickstart_more)中。

## 不顺利的时候
- 安装时出错的话，请看[故障排除](/zh/troubleshooting)。
- 关于安装和服务器搭建的个别咨询，不提供免费受理。需要个别处理时，请使用[付费支持](https://exment.net/en/plan/)。
