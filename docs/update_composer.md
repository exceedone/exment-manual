# Update composer
How to update composer from version 1 to version 2.  
composer is the library used for installing and updating Exment.

> If, after this update, errors start to appear when you update Exment, we would be very grateful if you report it [here](https://github.com/exceedone/exment/issues/849).  

## Flow of the update
1. Check the current composer version (if it is already 2.X.X, the rest is not needed)
2. Check the version of laravel/framework (if it is old, update it first)
3. Update composer

## About composer 2
In October 2020, ver2 of composer was released.  
ver2 is better in the following points.

- Significant improvements in both speed and memory usage
- require/remove and partial updates are much faster

![composer2](ja/img/update/composer2.png)

Quoted from:  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

We have verified installing and updating Exment with composer2, and confirmed that both work without problems.  
It depends on the environment, but the excessive memory usage that often happened with composer1 can be expected to get better. So we recommend updating to composer2.


## Update procedure
Updating to composer2 needs several steps.  
<span class="red">※ As far as possible, try the same steps in a development environment or the like before doing them in the production environment.</span>

### Check the current composer version

- Check the current composer version with the following command. (You can run it in any folder.)

```
composer --version
```

| Result | What to do |
|---|---|
| composer2.X.X, and updates of Exment also finish without problems | composer is already updated. The steps after this are not needed |
| composer1.X.X | Do the steps after this |

### Check and update the current laravel / framework version

Check the version of laravel/framework used by Exment.  
※ If several Exment are installed on the same server, do the following steps for every Exment.  

- Run the following command in the root folder of Exment.

```
php artisan --version
# A result like the following is shown
# Laravel Framework 5.6.39
```

- If the result is version5.6.40 or higher, you do not need to do anything.

- If the result is lower than version5.6.40, update the whole project with the following command.  

```
composer update
```

### composer update

- Update the composer version to 2.X.X.

```
# Run one of the following
composer self-update --2
composer selfupdate --2
```

- If a problem occurs after the update, you can go back to version1.X.X with the following commands.  
However, run these commands **in a path other than the Exment folder**. Running them inside the Exment folder seems to cause an error.

```
composer self-update --1
composer selfupdate --1
```
