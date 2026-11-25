# Enable caching
This puts master data, such as settings, in a cache (the data is kept for a while and used again from the next time).  
The number of accesses to the database goes down, so Exment may become faster, depending on the environment.

Mainly the following data is cached.

- System setting
- Custom tables
- Custom columns
- Form settings
- View settings
- Workflow settings
- Whether the database can be connected to
- Other master information

### Setup steps
- Add the following content to the .env file and save it.

~~~
EXMENT_USE_CACHE=true
~~~

### If you want to delete the cache
- The cache is updated regularly. If you want to delete it immediately, run the following command.

~~~
php artisan cache:clear
~~~


[←Back to list of additional settings](/quickstart_more)
