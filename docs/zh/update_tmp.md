# 临时替换程序时
这是与通常的更新不同、临时替换 Exment 程序的步骤。  
在下面这些时候使用。

| 想做的事 | 看哪里 |
|---|---|
| 安装先行开发版（开发中的版本） | “发布开发版” |
| 安装过去的版本 | “发布开发版”（用相同的步骤指定过去的版本） |
| 在正式发布之前，临时替换有问题的一部分源代码 | “替换源代码” |

**请先阅读**

- 安装开发版之后，源代码有时会更新。之后再恢复原样的话，可能无法正常运行。  
特别是数据库的定义，有更改时可能出现不一致。请谅解。
- 安装过去的版本后，相关库的版本会改变，可能无法正常运行。


### 发布开发版
开发版和过去的版本按下面的步骤安装。

1. 备份文件夹“vendor/exceedone/exment”中的全部源代码。
2. 在命令行中执行下面的命令。先做备份，然后执行与想安装的版本对应的那 2 行（开发版或过去的版本）。

~~~
# 进行备份（范围主要是数据库，源代码不会被备份）
php artisan exment:backup

# 指定 Exment 的开发版本。例：安装版本“release_foobar”时，进行下面的步骤
composer require exceedone/exment=dev-release_foobar
php artisan exment:update

# 指定 Exment 的过去版本。例：安装版本“4.3.1”时，进行下面的步骤
composer require exceedone/exment=v4.3.1
php artisan exment:update
~~~

#### 从开发版恢复到最新版时
进行下面任意一项，就会换成最新版。

- 进行[更新](/zh/update)。
- 执行下面的命令。

~~~
composer require exceedone/exment
php artisan exment:update
~~~



### 替换源代码
替换一部分源代码时，按下面的步骤进行。

1. 备份文件夹“vendor/exceedone/exment”中的全部源代码。  
或者，只复制接下来要替换的源代码，并改好名称。
2. 把要替换的源代码放到“vendor/exceedone/exment”中对应的位置。

#### 从开发版恢复到最新版时
进行下面任意一项，就会换成最新版。  
<span class="red">※ 执行的中途，有时会出现确认是否覆盖文件的消息。</span>这时请同意，继续替换。

- 进行[更新](/zh/update)。
- 执行下面的命令。

~~~
composer require exceedone/exment
php artisan exment:update
~~~
