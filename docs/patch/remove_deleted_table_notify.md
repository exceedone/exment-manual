# Bug fix notification screen doesn't open
### Defect condition
- Add notification settings for specific tables in v2.1.1 or earlier
- And delete the table
- Error when opening notification settings

### Bug occurrence version
v2.1.1 or less

### How to fix
- [Update](/update) the version of Exment to v2.1.2 or higher.
- Execute the following command.

~~~
php artisan exment:patchdata remove_deleted_table_notify
~~~

- You can now save the data.