# Bug fix By deleting the relation, the parent-child relationship form remains
### Defect occurrence conditions
- Set parent-child relationship form when there is a 1: n relationship in v3.0.16 or earlier.
- And delete the 1: n relation
- The parent-child relationship form remains

### Bug version
v3.0.16 or less

### How to fix
- [Update](/update) the version of Exment to v3.0.17 or higher.
- Execute the following command.

~~~
php artisan exment:patchdata remove_deleted_relation
~~~

- You can now save the data.