# Bug fixes Menu characters up to 50 characters
### Failure conditions
- Make the menu URL more than 51 characters in v3.0.2 or less
- Unable to register menu

### Bug occurrence version
less than v3.0.2

### How to fix

- Connect directly to the mysql database.

- Execute the following SQL.

~~~
ALTER TABLE admin_menu MODIFY COLUMN uri varchar(2000);
~~~

- You can save more than 51 characters in the menu URL.