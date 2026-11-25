# 通知时加密附件
邮件通知可以带附件。  
做了这里的设置后，系统会自动把附件加密后再发送（变成加密的 zip 文件）。

设置有下面 2 项。

1. 在 `.env` 中添加 1 行（Windows、Linux 通用）
2. 在服务器上安装创建 zip 的软件（Windows 和 Linux 不同）

## Windows、Linux 通用

- 把下面的内容添加到 `.env` 中。

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- 为了创建加密的 zip 文件，安装 7-zip。  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- 用 yum 等操作系统的软件包命令安装 zip。

~~~
// CentOS 时
yum install zip
~~~

这样，设置就完成了。
