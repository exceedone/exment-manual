# 安装步骤（简易安装）
这是放好 zip 文件、按照页面的引导安装 Exment 的步骤。  

步骤有下面 3 个。

1. 准备服务器
2. 下载 zip 文件，并解压到服务器上
3. 用浏览器打开 Exment，按照页面的引导安装

> ※要手动安装或指定版本安装时，请看[手动安装](/zh/quickstart_manual)。

## 注意事项
- 安装时出错的话，请看[故障排除](/zh/troubleshooting)。
- <span class="red bold">※不受理关于安装步骤和服务器搭建的个别咨询。需要个别处理时，请使用付费支持。</span>　　

## 搭建服务器
还没有准备 Web 服务器和数据库服务器时，请先准备。  
步骤请看[服务器设置](/zh/server)。


## Exment 应用的设置
服务器准备好后，放置 Exment 的应用。

### 下载并解压 zip
<script>
        //打开页面时执行
        window.addEventListener('load', (event) => {
        var link = document.getElementById('link');
        //获取 a 元素的 href 属性的值
        var oldHref = link.getAttribute('href');
        //设置当前时刻（yyyyMMddHHmmss）
        function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        return format;
        };
        var date = new Date
        //用 replace 把 oldHref 替换为新的值
        var newHref = oldHref.replace(oldHref, 'https://exment.net/downloads/en/exment.zip?ver='+ formatDate(date,'yyyyMMddHHmmss'));
        //把替换后的值设置到 a 元素的 href 属性
        link.setAttribute('href', newHref);
      });
</script>

- 从下面的链接下载 zip 文件。  
<a id="link" href="https://exment.net/downloads/en/exment.zip" target="_blank">[Exment zip 文件（最新版）]</a>  
现在的最新版是 **v7.2.4**（2026/11/24 发布，PHP 8.2 以上）。各版本的 zip、发布日期、SHA-256 和对应的 PHP 在[下载页面](https://exment.net/zh/download/)中（也可以在那里确认下载的文件是否损坏）。            
  
- 无论如何都要使用 PHP7.4 时，请从下面的链接下载。这个版本不在支持、咨询、Github issue 等的范围内。另外，可能不经预告就删除。  
<a href="https://exment.net/downloads/en/exment_v4_4_2.zip" target="_blank">[Exment zip 文件（能在 PHP 7.4 上运行的最后一个版本：v4.4.2）]</a>


- 把 zip 文件解压到 PHP 能运行的位置。  
例1（XAMPP Windows）： C:\xampp\local\exment  
例2（XAMPP Mac）： /Applications/XAMPP/local/exment  
例3（XServer）: $HOME/domain.com.foobar/exment/  
  
- <span class="red bold">请不要把 zip 文件直接放到服务器的公开文件夹（例如 linux 时：/var/www/html）的正下方。写有数据库设置、邮件密码等的设置文件会被外部看到，导致严重的信息泄露。</span>  


## 安装初始数据
按照页面的引导安装 Exment。  
※点击各设置页面的“重置”，会从语言和时区设置开始重新安装。

### 访问安装页面
首先，用浏览器打开 Exment 的页面。  
例 ： http(s)://(您的站点URL)  


### 语言和时区设置
决定语言和时区。  
需要时，请更改初始值。  
![安装页面_设置](../img/quickstart/setting_windows1.png)  


### 数据库设置
输入数据库的设置。  
请按照您使用的环境输入下面的内容。   
※不知道值时，[服务器设置](/zh/server)的各环境步骤中写有这些值，请再确认一次。
~~~
数据库的种类
数据库的主机名
数据库的端口号
Exment 用的数据库名
Exment 用的数据库用户名
Exment 用的数据库密码
~~~  

![安装页面_设置](../img/quickstart/setting_windows2.png)  
  

### 检查系统要求
这是确认运行 Exment 所需的服务器设置的页面。  
它会检查 Web 服务器等的设置值，如果有不推荐的设置或有问题的设置，就显示警告或错误。  
※有错误时，不能进入下一个页面。  
※这个页面的详细说明请看[服务器设置](/zh/server)的“确认系统要求”。

![安装页面_设置](../img/quickstart/setting_windows4.png)  


### 执行安装
请点击“执行安装”。  
![安装页面_设置](../img/quickstart/setting_windows3.png)  

> **可选：密码的哈希计算成本**  
> 密码用 bcrypt 进行哈希，计算成本（轮数）的默认值是 12。想更改时，请在 ".env" 中追加 `BCRYPT_ROUNDS`。设置示例请参照[手动安装](/zh/quickstart_manual)。

### 设置完成
安装结束后，请接着进行[初始设置](/zh/first_setting)。  

## 其他追加设置
做到这里，就可以开始使用 Exment 了。不过，要使用一部分功能，还需要追加设置。  
请确认下面的页面。  
- [追加设置](/zh/quickstart_more)


[←返回安装-概要](/zh/quickstart)
