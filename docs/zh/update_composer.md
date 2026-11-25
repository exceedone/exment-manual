# 更新 composer
这是把 composer 从版本 1 更新到版本 2 的步骤。  
composer 是 Exment 的安装和更新中使用的库。

> 万一在这次更新之后，更新 Exment 时开始出现错误，如能在[这里](https://github.com/exceedone/exment/issues/849)报告，我们将非常感谢。  

## 更新的流程
1. 确认现在的 composer 版本（已经是 2.X.X 的话，后面的步骤就不需要了）
2. 确认 laravel/framework 的版本（旧的话，先更新）
3. 更新 composer

## 关于 composer 2
2020 年 10 月，composer 的 ver2 发布了。  
ver2 在下面这些方面有改进。

- 速度和内存使用量两方面都有大幅改善
- require/remove 以及部分更新快了很多

![composer2](../ja/img/update/composer2.png)

引用：  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

Exment 也验证了用 composer2 进行安装和更新，确认可以顺利进行。  
虽然因环境而异，但 composer1 时经常发生的内存占用过多的问题，有望得到改善。所以推荐更新到 composer2。


## 更新步骤
要更新到 composer2，需要几个步骤。  
<span class="red">※ 请尽量先在开发环境等试过相同的步骤，再在正式环境进行。</span>

### 确认现在的 composer 版本

- 用下面的命令确认现在的 composer 版本。（在哪个文件夹执行都可以）

```
composer --version
```

| 结果 | 要做的事 |
|---|---|
| 是 composer2.X.X，并且 Exment 的更新也能顺利完成 | composer 的更新已经完成。后面的步骤不需要 |
| composer1.X.X | 请进行后面的步骤 |

### 确认并更新现在的 laravel/framework 版本

确认 Exment 使用的 laravel/framework 的版本。  
※ 在同一台服务器上安装了多个 Exment 时，请对所有的 Exment 进行下面的步骤。  

- 在 Exment 的根文件夹执行下面的命令。

```
php artisan --version
# 会显示下面这样的结果
# Laravel Framework 5.6.39
```

- 结果是 version5.6.40 以上时，什么都不用做。

- 结果低于 version5.6.40 时，用下面的命令更新整个项目。  

```
composer update
```

### 更新 composer

- 把 composer 的版本更新到 2.X.X。

```
# 请执行下面的任意一个
composer self-update --2
composer selfupdate --2
```

- 更新之后出现问题时，可以用下面的命令恢复到 version1.X.X。  
不过，这个命令请在 **Exment 的文件夹以外的路径** 执行。在 Exment 的文件夹中执行似乎会出错。

```
composer self-update --1
composer selfupdate --1
```
