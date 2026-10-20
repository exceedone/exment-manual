# When 429 error occurs in API
When executing the Exment API, a 429 error may occur.  
This is because Exment's framework (Laravel) controls a large number of requests.  
Exment limits the number of API accesses to 60 per minute for each user (for each IP address if not authenticated). If the limit is exceeded, a 429 Too Many Requests error is returned.

This is the procedure to change this request limit.

### Setting procedure 
- Open the ".env" file in the project folder.

- Write the maximum number of accesses per minute in "EXMENT_API_MAX_RATE_LIMIT". The default value is 60.  
※If the same key is already registered, rewrite the value.

- Example: To allow up to 120 times per minute

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

- If you use the configuration cache, execute "php artisan config:cache" again.

> For details of the setting value, please check [Exment setting value list](/config?id=api-access-rate-limit).

### Notes
- If your own throttle that specifies the number of accesses directly (such as "throttle:60,1") is set in the api middleware group in "app/Http/Kernel.php" or "bootstrap/app.php", that setting takes precedence and "EXMENT_API_MAX_RATE_LIMIT" is not used. To use "EXMENT_API_MAX_RATE_LIMIT", delete your own throttle.
- From v7.0.0, if no throttle is set in the api middleware group, Exment automatically adds "throttle:api". Therefore, commenting out the throttle in "app/Http/Kernel.php" does not remove the limit. To relax the limit, set a large value in "EXMENT_API_MAX_RATE_LIMIT".
- ※ In Exment v6.x or earlier, the limit is applied by "\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'" (the Laravel 10 default) written in the api middleware group in "app/Http/Kernel.php". Exment does not add "throttle:api" automatically, so commenting out this line removes the limit.  
"EXMENT_API_MAX_RATE_LIMIT" is available in Exment v6.2.4 or later.

[←Back to list of additional settings](/quickstart_more)
