# Installation flow
This is the flow from installing Exment on your own server until you start using it. There are four steps in all.

![Until you start using Exment](ja/img/quickstart/quickstart_first1.png)

> **When you want to use it without preparing a server**  
> There is also **Exment SaaS**, which you can use without installing (steps 01 and 02 above are not needed). If you want to try it first, use the [demo](https://exment.net/en/demo-env/). See [Plans and support](https://exment.net/en/plan/) for details.

## 1. Prepare a server
Exment runs on a web server where PHP works, with a database.

| What you need | Details |
|---|---|
| Web server | Apache, nginx, IIS and so on |
| PHP | 8.2 or higher |
| Database | One of MySQL 8.0 or higher, MariaDB 10.11 or higher, SQL Server 13.0 or higher |

For the detailed requirements and settings, see [Server settings](/server). There are also steps for each environment.

| Environment | Steps |
|---|---|
| A trial on your own computer | [XAMPP (Windows)](/install_xampp) / [XAMPP (Mac)](/install_xampp_mac) |
| A rental server (Xserver and so on) | [Rental server](/install_rental) |
| A Linux server | [Linux](/install_linux) |
| Cloud | [AWS](/install_aws) / [AWS (one server)](/install_aws_single) / [Azure Web Apps](/install_azure_web_apps) |
| Docker | [Docker](/install_docker) |
| A Windows server | [IIS](/install_iis) |

## 2. Install Exment
Install it in one of the following ways. If you are not sure, we recommend the "easy installation".

| Way | When | Steps |
|---|---|---|
| **Easy installation (recommended)** | You put the zip in place and follow the guidance on the screen | [Easy installation](/quickstart_easy) |
| Manual installation | You install with composer and commands | [Manual installation](/quickstart_manual) |
| Docker | You run it in containers | [Docker](/install_docker) |

- The zip of the latest version, and the older versions and their SHA-256, are on the [download page](https://exment.net/en/download/).
- In a new installation of v7.2.1 or later, the URL has no "/admin" (for example `http://localhost`). If you want it, you can decide it in "Value in front of the URLs" on the installation screen ([admin in the URL](/additional_prefix)).

## 3. Make the initial settings
When the installation is finished, the initial setting screen appears.

![Initial setting screen](img/install/install1.png)

- Decide the company name and the account of the system administrator.
- The **recommended settings** (the Exment cache, the config cache, the file permissions and so on) appear with their checks on. To use Exment fast and safely, we recommend leaving them on ([Tuning](/tuning)).
- When you choose the templates you want to use (customer management, the request pack and so on), their tables and menus are installed together.

See [Initial setting](/first_setting) for details.

## 4. Start using it
- **Decide this first (needed on every site)**: set up the [task schedule](/additional_task_schedule) (cron). Notifications, schedules, the automatic backup and so on run with it.
- Make [tables](/table), [forms](/form) and [views](/view) to fit your work.
- In [Feature Management](/feature), choose the features you use and the free official plugins (project management, IT support, Groupware).
- Check the settings for safety and speed with the [security check](/security_check) and [tuning](/tuning).
- The other settings (email, where files are saved, the queue and so on) are in [Additional settings](/quickstart_more).

## When it does not go well
- If you get an error during the installation, see [Troubleshooting](/troubleshooting).
- We do not accept individual inquiries about the installation or about building a server for free. If you need individual help, please use the [paid support](https://exment.net/en/plan/).
