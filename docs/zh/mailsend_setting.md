# 邮件发送设置
这是从 Exment 发送邮件所需的设置，以及设置之后发送测试邮件的步骤。  

步骤有下面 2 个。

1. 设置邮件的发送方法（通常是在系统设置的页面输入 SMTP 的设置）
2. 发送测试邮件，确认能否收到

> ※“收不到邮件”“邮件被归为垃圾邮件”等邮件发送功能方面的问题，很大程度上取决于各服务器和环境，所以不在咨询的范围内。  

## 概要
- Exment 有时会从系统发送邮件。  
例：
    - 数据更新通知
    - 双重验证

- 要发送邮件，需要 SMTP 等的设置。

- 设置方法有 2 种。
    - [从页面设置（默认）](/zh/mailsend_setting?id=设置方法-从页面设置) :   
    在系统设置页面输入 SMTP 的设置。用普通的 SMTP 发送邮件时使用这种方法。
    
    - [用config文件或env文件设置](/zh/mailsend_setting?id=设置方法-用config文件或env文件设置)：  
    用 Amazon SES 等不是 SMTP 的方法发送邮件时使用。要在服务器上修改设置文件或使用 composer。※面向高级用户。

### 设置方法-从页面设置
- 系统管理员打开系统设置页面。

- 输入下面的设置。
![系统设置页面](../img/system_setting/system_setting_mail.png)  

- 输入“主机名”并保存后，Exment 会使用页面的设置，用 SMTP 发送邮件。  
即使“.env”的“MAIL_MAILER”仍然是 Laravel 的初始值“log”（不发送邮件、输出到日志的设置），也会用 SMTP 发送。  
※“.env”的“MAIL_MAILER”设置为“log”以外的值（sendmail、ses 等）时，使用那种发送方法。  
※“.env”中设置了“EXMENT_MAIL_SETTING_ENV_FORCE=true”时，不使用页面的设置。详情请看[用config文件或env文件设置](/zh/mailsend_setting?id=设置方法-用config文件或env文件设置)。

※SMTP 设置示例（Xserver 时）： [这里](https://www.xserver.ne.jp/manual/man_mail_setting.php)  

※SMTP 设置示例（Sakura Internet 时）： [这里](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)  


### 设置方法-用config文件或env文件设置
Exment 通常用页面的“系统设置”中登记的值发送邮件。  
想用 Amazon SES 等不是 SMTP 的方法发送邮件时，可以使用 Laravel 的标准方法（在“.env”文件中写设置的方法）。  
使用这种方法时，请进行下面的设置。※面向高级用户。


- 打开 .env 文件，输入下面的设置值。

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- 然后，请设置 Laravel 的邮件发送驱动。

- 另外，推荐把下面的设置也输入到 .env 中。

~~~
MAIL_FROM_ADDRESS=(发件人地址)
MAIL_FROM_NAME=(显示为发件人的名称)
~~~

## SPF 记录设置
- 发送的邮件变成垃圾邮件时，多数情况是域名的“SPF 记录”设置不够。请在域名的设置中登记 SPF 记录。  
[参考1](https://sendgrid.kke.co.jp/blog/?p=3509)  
[参考2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/)  


## 发送测试邮件
- 用上面的设置可以发送测试邮件。  
从页面和从命令都可以发送。

### 从页面执行
- 系统管理员打开系统设置页面。

- 在“发送测试邮件”的项目中输入收件人，然后点击［发送测试邮件］。

![系统设置页面](../img/system_setting/system_setting_mail_testmail.png)  

※需要先保存页面上方的“系统邮件设置”。请保存一次之后再发送测试邮件。


### 从命令执行
- 请在项目的根文件夹中执行下面的命令。

~~~
php artisan exment:notifytest --to=(邮件收件人)
~~~

### 发送出错时
- “storage/logs/laravel.log”中会输出错误日志，请确认。
