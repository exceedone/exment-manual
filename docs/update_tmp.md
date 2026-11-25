# Replacing the program temporarily
Apart from the usual update, these are the steps for temporarily replacing the program of Exment.  
Use them in cases like these.

| What you want to do | Where to look |
|---|---|
| Install an early development version (a version under development) | "Release a development version" |
| Install an older version | "Release a development version" (the same steps, specifying the older version) |
| Temporarily replace a part of the source that has a bug, before the official release | "Replace source code" |

**Please read first**

- After you install a development version, its source may be updated. If you then go back, Exment may not work correctly.  
In particular, when the database definitions are changed, inconsistencies may occur. Thank you for your understanding.
- When you install an older version, the versions of the related libraries change, and Exment may not work correctly.


### Release a development version
Install a development version or an older version with the following steps.

1. Back up the whole source code in the folder "vendor/exceedone/exment".
2. Run the following commands on the command line. First take the backup, then run the two lines that fit the version you want to install (a development version or an older version).

~~~
# Take a backup (it mainly covers the database; the source code is not backed up)
php artisan exment:backup

# Specify a development version of Exment. Example: to install the version "release_foobar", do the following
composer require exceedone/exment=dev-release_foobar
php artisan exment:update

# Specify an older version of Exment. Example: to install the version "4.3.1", do the following
composer require exceedone/exment=v4.3.1
php artisan exment:update
~~~

#### Going back from a development version to the latest version
Doing either of the following replaces it with the latest version.

- Do the [update](/update).
- Run the following commands.

~~~
composer require exceedone/exment
php artisan exment:update
~~~



### Replace source code
To replace a part of the source code, use the following steps.

1. Back up the whole source code in the folder "vendor/exceedone/exment".  
Or copy only the source code you are going to replace, and rename the copy.
2. Put the replacement source code in the matching place under "vendor/exceedone/exment".

#### Going back from a development version to the latest version
Doing either of the following replaces it with the latest version.  
<span class="red">※ In the middle of the run, a message may ask whether to overwrite files.</span> In that case, agree and continue the replacement.

- Do the [update](/update).
- Run the following commands.

~~~
composer require exceedone/exment
php artisan exment:update
~~~
