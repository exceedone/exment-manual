# 简易安装（租用服务器）
在租用服务器（Xserver、Sakura Internet 等）上，**只需上传一个文件并用浏览器打开**即可安装 Exment。不使用 SSH 和 composer。

如需用 SSH 自行安装，请参阅[租用服务器](/zh/install_rental)。

## 需要的东西
- PHP 8.2 以上（可在服务器管理界面中选择）
- MySQL 8.0 以上或 MariaDB 10.11 以上的**空**数据库
- FTP 或服务器的文件管理器（用于上传和打开文件）
- 约 400MB 的可用空间

## 步骤
1. 下载 [exment-installer.zip](https://exment.net/downloads/exment-installer.zip) 并解压，取出其中的 `exment-installer.php`。
2. 将 `exment-installer.php` 上传到要放置 Exment 的文件夹。
    - 在域名的根目录使用：`public_html`（Sakura 为 `www`）
    - 在某个文件夹中使用：`public_html/exment` 等。请使用**空文件夹**。
3. 用浏览器打开（例：`https://example.com/exment-installer.php`）。
4. **输入密钥。** 安装程序会在同一文件夹中创建 `exment-installer-key.php`。请用 FTP 或文件管理器打开此文件，输入 `KEY:` 后面的字符。  
   此文件用浏览器打开不会显示任何内容。这是为了只让能看到文件的人（服务器的所有者）继续操作。
5. 查看**服务器检查**。出现 ✗ 时，请按显示的方法修改后点击“重新检查”（PHP 版本、memory_limit 等）。⚠ 不影响安装。
6. 点击“下载”。安装程序会从 exment.net 下载 Exment，检查内容（sha256），然后解压并放置。需要几分钟。中途停止时，重新打开页面并点击“继续”，即可从中断处继续。
7. **数据库**：按页面说明创建数据库，然后点击“确认连接”。在此输入的值不会保存。
8. 点击“前往 Exment 的安装界面”。安装程序会删除自身（包括密钥和工作文件），并打开 Exment 的安装界面。之后请按[安装步骤](/zh/quickstart_easy)进行。

## 放置的位置
- Exment 本体放在**不对 Web 公开的文件夹**中（例：`public_html` 旁边的 `exment`；若为 `public_html/t721` 则为 `exment_t721`）。
- 公开文件夹中只放 Exment 的 `public` 中的内容。
- 在只能写入公开文件夹的服务器上，Exment 放在其中的 `exment-app`，并通过 `.htaccess` 禁止 Web 访问。
- `.env` 会生成该站点专用的密钥（APP_KEY），并设为 `APP_ENV=production`、`APP_DEBUG=false`。

## 各服务器的注意事项
### Xserver
- PHP 版本：服务器面板 →“PHP Ver.切替”
- 数据库：在服务器面板 →“MySQL設定”中创建数据库和用户，并为用户授予该数据库的访问权限。主机名是“MySQL設定”中显示的名称。
- <span class="red bold">在 Exment 的安装界面中，数据库类型请选择“MariaDB”。</span>Xserver 的数据库是 MariaDB；选择“MySQL”会显示“您使用的数据库是 MariaDB，但选择了 MySQL…”并停止。

### Sakura Internet
- PHP 版本：控制面板 → 脚本设置
- 数据库：控制面板 → 数据库 → 新建（字符集 utf8mb4）。用户名是账户名，主机名是列表中显示的 `mysqlNNN.db.sakura.ne.jp`。

## 安装程序绝不会做的事
- 不会覆盖已有的 Exment 或其他站点（文件夹中有文件或已有 Exment 时会停止）。更新请参阅[更新](/zh/update)。
- 不使用已有表的数据库（连接确认时会拒绝）。
- 只从 exment.net 获取文件。内容（sha256）与发布版本不符的文件会被删除，绝不使用。
- 不保存或显示数据库的密码。
- 完成后不会残留（无法删除时，请按页面说明用 FTP 删除）。

## 无法顺利进行时
- **“此版本需要 PHP 8.x 以上”**：在服务器管理界面中提高 PHP 版本，重新打开页面并点击“继续”。
- **多次输错密钥**：等待约 10 分钟后重新输入。
- **想从头开始**：点击页面底部的“从头开始”（已放置的 Exment 文件也会删除）。
- 其他问题请参阅[安装时的错误](/zh/install_error)。
