# Initial setting
These are the steps of the first settings after the installation. You decide the information of the site, the login ID of the first administrator and so on.

There are four steps.

1. Open the Exment page
2. Enter the necessary information on the initial setting screen
3. Choose the templates you want to use
4. Press the "Submit" button

## URL access
Open the Exment page.  
http(s)://(your site URL)  

> Note: the URLs are for the default without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an older version has "admin"), add it after the URL of the site (e.g. `http(s)://(Exment URL)/admin/oauth/token`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

## Initial setting screen
If the installation has finished correctly, the initial setting screen of Exment appears.

![Initial setting screen](img/install/install1.png)
Enter the information needed to set up the system.  
Note: for a detailed explanation of the items, see [System Setting](/system_setting).

## Template settings
Exment provides templates in advance.  
When you choose a template, the tables, columns, forms, menus and permissions in that template are installed together.  
You can also upload, from this screen, a template exported from another Exment.  
See [Template](/template) for details.

![Installation screen_template](img/install/install_template.png)

The list shows the templates that are in the system from the start and the templates imported so far.  
Choose the templates you want to install.  

## Initial setting completed
Enter the necessary items and press the "Submit" button. The settings are saved, and you can use Exment.

## Other additional settings
With the work so far, you can start using Exment. However, some features need additional settings.  
Check the following page.  
- [Additional settings](/quickstart_more)
