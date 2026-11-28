# 更新
这是把 Exment 升级到新版本的步骤。  
哪个版本改变了什么，请看[发行说明](/release_note)（英语）。

## 更新的流程
1. **确认现在的版本**
2. **进行备份**
3. **更新**（步骤随现在的版本而不同）
4. **更新之后确认**（也确认附带的官方插件的新版本）

## 1. 确认现在的版本
- 在页面上看：“系统设置”→“系统版本信息”→“当前版本”
- 在文件中看：`composer.lock` 的 `exceedone/exment` 的 `version`

## 2. 进行备份
更新之前，请备份数据。详情请看[备份](/zh/backup)。

- 以管理员登录 Exment，打开左侧菜单的“管理员设置”→“备份”。
- 点击右上角的［备份］按钮。会生成数据和附件的备份。
- 点击生成的备份文件，下载保存。

※ 使用下面的“更新批处理”时，批处理会自动进行备份。

## 3. 更新
### 使用哪个步骤
由现在的版本和想升级到的版本决定。

| 现在的版本 | 要做的事 |
|---|---|
| **v7.x**（在 v7 之内升级） | 用下面的“[普通的更新](/zh/update?id=普通的更新)”升级 |
| **v6.x 以下** | 需要先进行下面的“[从旧版本升级时](/zh/update?id=从旧版本升级时)”的步骤 |

- 从 v7.0.x 升级到 v7.1.0 以上时，<span class="red bold">页面设计会变为“现代”。</span>要恢复以前的外观，请在“系统设置”的[页面设计](/zh/system_setting)中选择“经典”。

### 普通的更新
方法有 3 种。要做的事都一样（备份 → 获取新的程序 → 更新数据库）。

| 方法 | 适合的人 |
|---|---|
| **A. 更新批处理（推荐）** | 只想在服务器上执行 1 个文件 |
| **B. 用命令进行** | 想自己一个一个地执行 |
| **C. 自动更新** | 想每天自动升级到新版本（[自动更新](/zh/update_auto)） |

#### A. 更新批处理（推荐）
**(1) 下载批处理（只在第 1 次）**

放在安装 Exment 的文件夹（项目的根目录）中。

| 服务器 | 要做的事 |
|---|---|
| Windows | 下载 [ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) 并放到文件夹中 |
| Linux | 下面的命令（`ExmentUpdateLinux.sh`） |
| Xserver | 下面的命令（`ExmentUpdateLinuxXserver.sh`） |
| Sakura Internet | 下面的命令（`ExmentUpdateLinuxSakura.sh`） |
| Mac | 下载 [ExmentUpdateLinux.sh](https://exment.net/downloads/cmd/ExmentUpdateLinux.sh) 并放到文件夹中，然后执行 `chmod 775 ExmentUpdateLinux.sh` |

Linux、Xserver、Sakura Internet 在文件夹中执行下面的命令（只执行您使用的服务器的 2 行）。

~~~
# Linux
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh

# Xserver
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh

# Sakura Internet
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

※ 使用的是 2021 年 4 月 13 日之前下载的批处理时，请替换为新的。

**(2) 执行批处理**

在文件夹中执行。

~~~
# Linux、Mac
sh ExmentUpdateLinux.sh

# Xserver
sh ExmentUpdateLinuxXserver.sh

# Sakura Internet
sh ExmentUpdateLinuxSakura.sh

# Windows
ExmentUpdateWindows.bat
~~~

批处理按顺序做下面的事。

- 备份数据
- 获取新的程序并替换
- 更新数据库

#### B. 用命令进行
请先进行上面的“2. 进行备份”。  
然后，在文件夹中执行下面的命令。

~~~
cd (项目的根目录)
composer update
php artisan exment:update
~~~

- 新版本刚发布时，有时还找不到。这时请等 10～20 分钟后再执行一次。
- 在正式的站点（`APP_ENV=production`）上，更改数据库之前会出现确认的提问。在没有页面的地方（脚本、cron、CI）运行时，请使用 `php artisan exment:update --force`。

**租用服务器（Xserver 等）时**

- 在 Xserver 上，请执行 `composer update --ignore-platform-reqs` 来代替 `composer update`。因为 Xserver 一开始没有安装 PHP 的 Sodium 扩展（无论如何都想安装时，请咨询 Xserver 的支持）。
- SSH 中使用的 `php` 有时与在服务器的管理页面中选择的 PHP 版本不同。请用 `php --version` 确认是否是同一个版本。不同时，把 `~/bin/php` 链接到那个版本，或者像 `/usr/bin/php8.3 artisan exment:update` 这样写出完整的位置来运行（[租用服务器](/zh/install_rental)）。

#### C. 自动更新
每天检查有没有新版本，有的话就运行更新批处理。设置方法请看[自动更新](/zh/update_auto)。

- 自动更新能升级的只是“普通的更新”能升级的范围。**像 v6 到 v7 这样的大版本交替不会升级**。详情请看下面的“[版本号和升级的范围](/zh/update?id=版本号和升级的范围)”。

### 从旧版本升级时
下面的版本交替有手动的步骤。用更新批处理和自动更新不能升级。  
请确认从现在的版本到最新版本之间的所有版本交替的页面。

| 版本交替 | 步骤的页面 |
|---|---|
| v3.x 以下 → v4.0.x | [更新到 v4.0](/update/v4_0)（英语） |
| v4.3.x 以下 → v4.4.x 以上 | [更新到 v4.4](/update/v4_4)（英语） |
| v4.4.x 以下 → v5.0.0 以上 | [更新到 v5.0](/update/v5_0_php8)（英语） |
| v5.0.x 以下 → v6.0.0 以上 | [更新到 v6.0](/update/v6_0_php8)（英语） |
| <span class="red bold">v6.x 以下 → v7.0.0 以上</span> | <span class="red bold">[更新到 v7.0](/update/v7_0_0)（英语）</span>（Laravel 的版本和管理页面的库的命名空间会改变） |

- 哪个版本修正到什么时候，请看[支持期限](/zh/support_policy)。

## 4. 更新之后确认
- 请在浏览器中按 **Ctrl+F5**（强制刷新），重新加载页面。
- 在“系统设置”→“系统版本信息”中确认是否已成为新版本。
- 出现错误时，请看[故障排除](/zh/troubleshooting)。
- 更新之后，在“功能管理”中确认附带的官方插件的新版本（见下面的“[更新与附带的官方插件](/zh/update?id=更新与附带的官方插件)”）。

## 更新与附带的官方插件
从 Exment v7.2.1 起，免费的官方插件（项目管理、支持服务台、Groupware）随 Exment 附带（软件包 exceedone/exment-plugins-release）。

`composer update` 和 `php artisan exment:update`（更新批处理和自动更新也一样）会随新的 Exment 一起带来新的附带插件。**但站点正在使用的插件不会自动切换。** 插件有数据和设置，所以何时切换由系统管理员决定。

因此，更新之后的站点有以下两种：

| | 在哪里 | 何时变化 |
| --- | --- | --- |
| 正在使用的插件 | 站点的插件文件夹和数据库 | 系统管理员在“功能管理”中切换时 |
| 附带的插件 | Exment 的软件包中（exceedone/exment-plugins-release） | 更新 Exment 时 |

### 切换方法
1. 打开“[功能管理](/zh/feature?id=免费官方插件（随-exment-附带）)”。附带的插件显示在“免费官方插件（随 Exment 附带）”一栏中。
2. 有新版本时，会显示“有可用的版本 ○○。”。点击“更新到此版本”即可切换。设置、菜单、权限会保留。
3. 切换之前的版本会保留。不能正常工作时，可以用“恢复到上一版本（○○）”恢复。

- 只显示能确认 Exceed One 签名的官方插件。
- 新版本包含安全修复时，会用系统管理员首页的通知和铃铛通知（能发送邮件的站点还有邮件）只通知 1 次（[安全修复的通知](/zh/feature?id=安全修复的通知)）。
- 还没有点击过“使用”的插件，更新也不会安装。
- 在由运营方切换版本的站点（Exment SaaS 等），不显示按钮，由运营方切换。

### 附带插件的新版本到来时
- Exment 7.2.x 以 `~7.2.0` 的范围使用软件包 exceedone/exment-plugins-release。因此执行 `composer update` 时，**即使 Exment 本身没有新版本**，也会带来 7.2.x 最新的附带插件（例如 ExmentPM 1.7.24 随软件包 7.2.22 到来）。
- 到来后，正在使用的插件也不会变化。只有系统管理员在“功能管理”中点击“更新到此版本”时才会切换。
- 从 exment.net 下载的 zip 中，包含制作该 zip 当天的附带插件。zip 只在 Exment 有新版本时重新制作。用 zip 安装的站点，在下次 `composer update` 时也会收到新的附带插件。
- Exment 7.3 也会收到与 7.2 相同的附带插件（官方插件在两者上都能运行；Exment 7.3 以 `^7.2` 的范围使用该软件包）。

## 版本号和升级的范围
Exment 的版本号是“主版本 . 次版本 . 补丁”（例：v7.1.0）。更新的方法随哪个数字上升而不同。

| 种类 | 例 | 内容 | 更新的方法 |
|---|---|---|---|
| 补丁 | v7.0.2 → v7.0.3 | 只修正缺陷和漏洞 | 用普通的更新升级 |
| 次版本 | v7.0.x → v7.1.0 | 加入新功能。页面有时会有少许变化 | 用普通的更新升级。升级之前请确认[发行说明](/release_note)（英语） |
| 主版本 | v6.x → v7.0 | Laravel、PHP 的要求和程序的结构有很大变化 | **用普通的更新不能升级**。请按“从旧版本升级时”的步骤升级 |

### 为什么主版本不会自动升级
- 更新批处理和自动更新使用 `composer update`。`composer update` 在 `composer.json` 中写的范围之内升级到最新的版本。
- 例如，写的是 `"exceedone/exment": "^7.0"` 时，最多到 v7.x 的最新版。不会变成 v8。写的是 `"^6.2"` 时，即使 v7 已经发布，也最多到 v6.x 的最新版。
- 在仍然使用 v6 的状态下运行自动更新时，自动更新会判断“有更新的版本（v7）”，每天运行更新批处理（版本仍然是 v6.x 的最新版）。请考虑升级到 v7，或者在不升级期间停止自动更新。

## 其他
- 安装开发中的版本、恢复到以前的版本、临时替换程序：[安装开发版和过去的版本](/zh/update_tmp)
