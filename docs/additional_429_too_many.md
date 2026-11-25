# When 429 error occurs in API
When you call the Exment API, a 429 error (429 Too Many Requests) may occur.  
This page explains why, and how to change the limit on the number of accesses.

- Exment limits the number of API accesses to 60 per minute for each user (for each IP address if not authenticated).
- If the limit is exceeded, a 429 Too Many Requests error is returned.
- This is because the framework that Exment uses (Laravel) limits a large number of requests.

### Setting procedure 
**(1)** Open the ".env" file in the project folder.

**(2)** Write the maximum number of accesses per minute in "EXMENT_API_MAX_RATE_LIMIT". The default value is 60.  
※If a key with the same name already exists, rewrite its value.

Example: to allow up to 120 times per minute

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** If you use the configuration cache, run "php artisan config:cache" again.

> For details of the setting value, please check the [Exment setting value list](/config?id=api-access-rate-limit).

### Notes
- **If you have written your own throttle**: if your own throttle that specifies the number of accesses directly (such as "throttle:60,1") is set in the api middleware group in "app/Http/Kernel.php" or "bootstrap/app.php", that setting takes precedence and "EXMENT_API_MAX_RATE_LIMIT" is not used. To set the limit with "EXMENT_API_MAX_RATE_LIMIT", delete your own throttle.
- **v7.0.0 or later**: if no throttle is set in the api middleware group, Exment automatically adds "throttle:api". Therefore, commenting out the throttle in "app/Http/Kernel.php" does not remove the limit. To relax the limit, set a large value in "EXMENT_API_MAX_RATE_LIMIT".
- **v6.x or earlier**: the limit is applied by "\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'" (the Laravel 10 default) written in the api middleware group in "app/Http/Kernel.php". Exment does not add "throttle:api" automatically, so commenting out this line removes the limit.
- "EXMENT_API_MAX_RATE_LIMIT" is available in Exment v6.2.4 or later.

[←Back to list of additional settings](/quickstart_more)
