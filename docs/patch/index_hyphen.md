# Bug fix Search index including hyphen
### Failure conditions
- If a custom column contains a hyphen in the column name (alphanumeric characters) 「Example:『exment-code』,『 building-room-name』」
- When the search index setting is set to YES
- An error occurs when you try to register data for a table that contains the above condition columns

### Bug occurrence version
Custom column registered in v1.3.0 or lower

### How to fix
- [Update](/update) the version of Exment to v1.3.1 or higher.
- Execute the following command.

~~~
php artisan exment:patchdata alter_index_hyphen
~~~

- You can now save the data.