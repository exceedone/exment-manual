# Fix bug fix revision when executing API
### Defect condition
- Added / updated new data via API at v3.0.9 or lower
- Revisions are not displayed correctly

### Bug occurrence version
v3.0.9 or less

### How to fix
- [Update](/update) the version of Exment to v3.0.10 or higher.
- Execute the following command.

~~~
php artisan exment:patchdata revisionable_type
~~~

- The history of data newly added / registered from the API in the past is displayed.