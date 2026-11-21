# Tuning
Check the settings that make this site faster. "Admin Setting" > "Tuning" (the URL is `/admin/tuning`) lists the settings that make Exment faster, with their state now.

※This page is available in Exment v7.2.0 or later.  
※Only system administrators can see it.

<!-- Screenshot: the Tuning page (img/tuning/tuning.png). Take it when 7.2.0 is complete -->

## Reading the page
- Each item shows "Already set" or "Not set (recommended)". For the items marked "Not set", set what is shown below them.
- The items with a button can be changed from this page.
- Ask the server administrator to change the server settings (php.ini, .env).
- The same items are shown in "To make it faster (optional)" on the installer and in "== Tuning (optional) ==" of `php artisan exment:checkrequire`. They only say "Already set" or "Not set", and never stop the install.

## Items
### OPcache
Keeps compiled PHP in memory. Exment has many files, so the memory and the number of files must be large enough (at least 128 MB and 20,000 files for "Already set").

Set php.ini as below and restart PHP (PHP-FPM, the web server).

~~~ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
~~~

### PHP version
Newer PHP runs faster. PHP 8.2 gets security fixes only until 2026-12-31. Upgrading to PHP 8.3 or later is recommended.

### Debug mode (APP_DEBUG)
In debug mode every request collects details and errors are shown on the screen. Turn it off in production.

~~~
# .env
APP_DEBUG=false
~~~

### Config cache (config:cache)
Puts the config files into one file, read once per request. Make it with the buttons "Make the config cache" / "Remove the config cache" on the page, or with this command.

~~~
php artisan config:cache
~~~

- After changing `.env` by hand, make it again (the change does not take effect until then).
- When Exment writes `.env` (install, restore), it removes the cache itself.
- The route cache (`route:cache`) is not used: the routes of plugins are made from the database, so the pages of plugins would not open.

### Optimized class loading (composer)
With a list of the classes made by composer, PHP finds the file of a class faster.

~~~
composer install --optimize-autoloader --no-dev
~~~

### Exment cache (EXMENT_USE_CACHE)
Keeps the definitions (tables, columns, settings) in the cache instead of reading them from the database on every request.

~~~
# .env
EXMENT_USE_CACHE=true
~~~

### Where the cache and sessions are kept
Redis and the like are faster than files, and needed when several web servers serve the site. If Redis is available, set .env as below (optional).

~~~
# .env (Redis)
CACHE_STORE=redis
SESSION_DRIVER=redis
~~~

### Queue (mails and other background work)
With the `sync` queue, mails are sent inside the request and the screen waits until they are sent. Set .env as below and keep a queue worker running (supervisor, systemd and so on).

~~~
# .env
QUEUE_CONNECTION=database
# keep a worker running
php artisan queue:work --tries=3
~~~

### Dashboard aggregation cache (EXMENT_DASHBOARD_CACHE_SECONDS)
A chart of a summary view aggregates its table every time the dashboard is opened. This keeps the result for each viewer for the given seconds, without aggregating again. The default is `0` (off).

~~~
# .env (seconds)
EXMENT_DASHBOARD_CACHE_SECONDS=60
~~~

- Saving or deleting data aggregates again.
- A change of a share or a membership shows once the time has passed.

### Logs for investigation
The system performance log and the debug modes of `.env` (`EXMENT_DEBUG_MODE_REQUEST`, `EXMENT_DEBUG_MODE_SQL`, `EXMENT_DEBUG_MODE_SQLFUNCTION`, `EXMENT_DEBUG_MODE_SQLFUNCTION1`, `EXMENT_DEBUG_MODE_SCHEDULE`) write a log on every request. Turn them off after the investigation. The system performance log can be stopped with the button "Turn off the system performance log".

### Search index
In a table with more than 10,000 rows, a "search index" on the columns often used to filter and sort makes lists, searches and summaries faster. In the [column](/column) settings, add "Search index" to the columns often used.

## Other settings for speed
### Charts of list views (EXMENT_CHART_LIST_MAX_ROWS)
A chart of a list view draws one point per row, so it reads at most 1,000 rows. With more rows, it says to use a chart of a summary view. Make charts of large tables with summary views. Change the limit in `.env` (`0` = no limit).

~~~
# .env
EXMENT_CHART_LIST_MAX_ROWS=1000
~~~

## Hiding the buttons (EXMENT_TUNING_SERVER_ACTIONS)
When several sites share the code on one server (as a multi-tenant server), this line in `.env` hides the buttons that change the whole server (make or remove the config cache). The page then says "On this server it cannot be changed from the screen (the server administrator sets it)."

~~~
# .env
EXMENT_TUNING_SERVER_ACTIONS=false
~~~

## Hiding the page
- Tuning is one of the features of [Feature Management](/feature), on from the start. The system administrators of the site can turn it off there.
- To hide it from the server side (as a SaaS), write `EXMENT_FEATURES_LOCKED=tuning` in `.env` (separate it with commas from other features). The page answers 404 and is not in the menu.

## Related
- [Feature Management](/feature)
- [System setting](/system_setting)
- [Server setting](/server)
- [Redundancy (for advanced users)](/redundant)
