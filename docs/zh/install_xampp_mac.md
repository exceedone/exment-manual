# 用 XAMPP 搭建环境
这是用 XAMPP 在 Mac 上搭建 Exment 运行环境的步骤。  
XAMPP 是可以一次装好 PHP、Apache、MySQL 的软件。从头搭建开发用的环境时，推荐使用。

## 注意事项
- **用 XAMPP 安装的环境请只用于开发、验证。建议不要用作正式环境。** 

## 安装步骤
按下面的顺序进行。

1. 安装 XAMPP，启动 Apache 和 MySQL
2. 让 mysql 命令可以使用（环境变量）
3. 创建数据库
4. 创建 Exment 用的 URL（子域名设置）
5. 安装 Exment

### XAMPP 安装步骤
1. 从下面的网站下载 XAMPP。  
[下载 XAMPP](https://www.apachefriends.org/jp/download.html)  

2. 请从“OS X 版 XAMPP”中选择“PHP8.2”的版本下载。  

![XAMPP 安装页面](../img/xampp_mac/xampp_mac1.png)

3. 继续安装 XAMPP。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac2.png)

4. 在选择 XAMPP 组件的页面中，两项都勾选，然后按 Next。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac3.png)

5. 之后按页面的提示按 Next，完成安装。

6. 安装完成后，LaunchPad 的 XAMPP（其他）中有一个叫 manager-osx 的应用。可以从那里启动 XAMPP。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac4.png)

7. 启动 XAMPP 后，点击 Manage Servers。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac5.png)

8. 点击 MySQL 和 Apache 的 Start 按钮，让 Status 变成 Running。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac6.png)


#### 【注意事项】
- 重新启动操作系统后，需要再次启动 XAMPP 控制面板，重新启动 Apache。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac8.png)

### 添加环境变量
要从终端执行 mysql，需要在终端的设置文件 .bash_profile 中补写 Path。

1. 用下面的命令打开 .bash_profile。

~~~
vi .bash_profile
~~~

2. 在打开的页面中按键盘的 i，进入输入模式（左下角会显示 INSERT）。然后按下面这样输入 Path。

~~~
export PATH="/Applications/XAMPP/xamppfiles/bin:$PATH"
~~~
![XAMPP 安装页面](../img/xampp_mac/mysql_mac1.png)

3. 要保存并关闭，请按键盘的 Esc，然后输入 :wq。  
![XAMPP 安装页面](../img/xampp_mac/mysql_mac2.png)

4. 最后，用下面的命令读取 .bash_profile，让 Path 生效。

~~~
source ~/.bash_profile
~~~

#### 创建数据库
1. 启动 XAMPP 控制面板后，用 Web 浏览器打开下面的 URL，访问 phpMyadmin。

http://localhost/phpmyadmin/index.php  


2. 点击左侧菜单的“新建”。  
![MySQL 环境变量](../img/xampp_mac/phpmyadmin1.png)

3. 在“新建数据库”一行中，用英文和数字输入任意的数据库名，点击“创建”。  
![MySQL 环境变量](../img/xampp_mac/phpmyadmin2.png)

这样，数据库就建好了。

### 子域名设置
在通常的设置下，把 Exment 的项目文件放到"/Applications/XAMPP/htdocs"文件夹中，就可以使用 Exment。  
但是，这样会有很大的问题。例如打开 [http://localhost/exment/.env](http://localhost/exment/.env) 这个 URL，包含数据库信息的设置文件就会显示在页面上。  
所以，强烈建议进行避免这个问题的设置。请按下面的步骤设置。

1. 在文件夹“/Applications/XAMPP”中创建文件夹“local”。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac9.png)

2. 打开"/Applications/XAMPP/xamppfiles/etc/extra/httpd-xampp.conf"。

3. 在文件的最后添加下面的内容。**※DocumentRoot 的末尾需要“/public”**  

~~~
<VirtualHost *:80>
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs"
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
  DocumentRoot "/Applications/XAMPP/local/exment/public"
  ServerName exment.localapp
</VirtualHost>

<Directory "/Applications/XAMPP/local/exment/public">
  Allow from all
  AllowOverride All
  Require all granted
</Directory>  
~~~

4. 打开"/Applications/XAMPP/xamppfiles/etc/httpd.conf"，用字符串搜索找到下面的内容。

~~~
User daemon
Group daemon
</IfModule>
~~~

把这段内容改成下面这样。

~~~
User (Mac的登录用户名)
Group daemon
</IfModule>
~~~


5. 编辑"/etc/hosts"。  
在终端中输入下面的命令。  
※会要求输入密码，请输入登录用户的密码

~~~
sudo vi /etc/hosts
~~~

请在 hosts 文件中添加下面的项目。

~~~
127.0.0.1       localhost
127.0.0.1       exment.localapp
~~~

6. 在 XAMPP 控制面板中重新启动 Apache。  
![XAMPP 安装页面](../img/xampp_mac/xampp_mac8.png)

### 安装 Exment
按照 Exment 的[安装步骤](/zh/quickstart)安装 Exment。  
Exment 的安装通常在"/Applications/XAMPP/local"文件夹中进行。  
这里假设安装在"/Applications/XAMPP/local/exment"文件夹中。  

- 安装的中途有输入数据库设置的页面。请按下面这样输入。
    - 数据库类型：MariaDB
    - 主机名：127.0.0.1
    - 端口：3306
    - 数据库：（上面创建的数据库名）
    - 用户名：root
    - 密码：（留空）
