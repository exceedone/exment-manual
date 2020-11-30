# Narrow down settings for fields that have a parent-child relationship in the form, and delete

### Target version
less than v3.3.1

### Background
From v3.3.1, "Setting whether to narrow down related fields in fields with parent-child relationship/reference relationship" has been added in [Form settings # Related refinement settings].  
However, in v3.3.1 and below, this setting screen was not displayed, and the choices were narrowed down in all fields with 1: n parent-child relationship / reference relationship.  
This narrowing down sometimes caused unwanted narrowing down and unexpected problems, so in v3.3.1, we have added a setting to select whether or not to narrow down.  
  
When updating from less than v3.3.1 to v3.3.1 or higher, in order to maintain compatibility, continue the setting of "narrow down the options in all fields with 1: n parent-child relationship / reference relationship". I am doing it.


### How to respond
It will be reflected automatically by updating from less than v3.3.1 to v3.3.1 or higher.


### Reset the refinement settings
Even if you update from less than v3.3.1 to v3.3.1 or higher, if you want to delete the filtering settings for all columns, update to v3.3.1 or higher and then execute the following command.

```
php artisan exment:patchdata clear_form_column_relation
```