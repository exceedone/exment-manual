# Enable caching
Cache the master data. Since the number of accesses to the database can be reduced, the speed may increase depending on the environment.  
Mainly cache the following data.  

- System setting
- Custom tables
- Custom columns
- Form settings
- View settings
- Workflow settings
- Whether to connect to the database
- Other, master information

### Setup steps
- Add the following content to the .env file and save it.

~~~
EXMENT_USE_CACHE=true
~~~

### If you want to delete the cache
- The cache is updated regularly, but if you want to delete it immediately, execute the following command.

~~~
php artisan cache:clear
~~~


[←Back to list of additional settings](/quickstart_more)