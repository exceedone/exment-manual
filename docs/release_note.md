# Release notes
* Click [here](/patch_weakness) for the patch / vulnerability list.

## v6.1.0 (2024/07/02)

1. Added features
    - Added 2D barcode function


## v6.0.4 (2024/06/05)
1. Bug fixes
    - Fixed a bug where the password could not be changed after upgrading (laravel-admin)
    - Fixed a bug where "deleted data" was included in the calculation of the total of the summary view
    - Fixed a bug where the display order input field for the display column was displayed above the up and down buttons for selecting the display column when the display order was displayed on the view editing screen


## v6.0.3 (2024/05/09)
1. Function fixes
    - Adjusting the display order of the view list when switching views.

1. Bug fixes
    - Fix the bug where trying to update columns other than the image column (multiple selections OK) for data with an image column via the API (put-value) results in a 500 error.
    - Fix the malfunction in image deletion via the API.
    - Fix the bug where the condition value does not clear even if the condition item is changed when opening view settings etc. where the condition value is already set.
    - Fix the bug where data linkage does not work in the text editor column.


## v6.0.2 (2024/04/10)
1. General
     - Compatible with Maria DB 10.11 Details [here](/update/v6_0_2)
     - Compatible with PHP Stan Level.4

1. Added functions
     - Added deletion related event function in plugin (event)

1. Function correction
     - Support to maintain view when searching for free words
     - Supported data display conditions such as views so that items included in the conditions are not displayed.

1. Bug fixes
     - Fixed a bug where users with "all table management privileges" could not register or edit custom forms.
     - Fixed a bug where the "Organization hierarchy settings (role group)" in the system settings might not be followed when determining the "login user's role group"
     - Fixed a bug where an error occurred on the server side when attempting to register new data using Excel import for the n-side table in a 1:n relationship, but nothing was displayed on the UI side.
     - Fixed a bug where an exception would occur if a date item was selected in the group column of the summary view and there was null data in the target date item when column type: Day of the week was specified.
     - Fixed a bug where "Field type read-only" was not set when "Display as radio button/check box format" was selected.
     - Fixed a bug that caused an error when running exment:inittest on SQL Server.


## v6.0.1 (2024/03/21)

1. Bug fixes
     - Fixed a bug that caused a restore error if the export of AWS RDS GTID was not turned off.


## v6.0.0 (2024/02/15)

- <span class="red bold">Updating from v5.0.X or lower to v6.0.0 or higher requires a manual update. Please check the contents of [here](/update/v6_0_php8) before updating. </span>

1. General
     - Changed the framework used from Laravel9 to Laravel10
     - Changed the minimum PHP version from PHP8.0 to 8.2 or higher (recommended: PHP8.2)
     - Change the minimum version of MySQL from MySQL5.7 to 8.0 or higher (recommended: MySQL8.0)


## v5.0.11 (2023/12/14)

1. Bug fixes
     - Fixed a bug where the system dashboard was forced to become the user dashboard when saving on the dashboard settings change screen.
     - Fixed a bug where the child table sheet was output as empty when executing "Export (current page)" on a parent table that has a child table.

1. Functional fixes
     - Fixed so that custom tables can be copied.
     - Corrected the "default redirect destination after saving data" for each custom table.
     
## v5.0.10 (2023/10/30)

1. Bug fixes
     - Fixed a bug that caused an error during import when multiple selections were allowed in custom columns.
     - Fixed a bug where option items were not linked to data

1.Function correction
     - Additional fixes regarding child table display bugs in custom forms
    
1. Added functions
     - Added data replication function
     - Added valid flag to data update settings
     - Added ${login_user:custom column of user table} to the parameter variables that can be used in notification templates, etc.
     
## v5.0.9 (2023/09/29)

1. Bug fixes
     - Re-fixed the bug when upgrading Exment with LDAP authentication
     - Fixed a bug where details were not displayed when dates were summarized in the summary view
     - Fixed a bug caused by the correction to treat unentered items in the calculation formula as 0.

## v5.0.8 (2023/08/30)

1. Functional fix
     - Modified to treat unentered items as 0 in calculation formulas
     - Fixed the number of abbreviated display characters when displaying multiple lines of text when displaying a data list
     - Fixed workflow 404 error when adding ConditionModal

1. Bug fixes
     - Fixed a bug that files uploaded to child tables were not displayed correctly
     - Fixed a bug that the plug-in button was not displayed in the calendar view
     - Fixed a bug when upgrading Exment with LDAP authentication

## v5.0.7 (2023/07/14)

1. Functional fixes
    - Fixed horizontal scrollbar in table permission settings
    - Fixed truncation when calculating

1. Bug fixes
    - Fixed a bug that sorting by the sort icon of the view does not work
    - Fixed a bug that can not be changed to NO when the column type of the table is displayed in check box format by specifying YES / NO
    - Fixed a bug that automatic numbering is not done when creating a new record with the authority to edit assigned data

## v5.0.6 (2023/02/21)

1. Addition of functions
    - Added openLDAP for LDAP authentication. (openLDAP 2.4.44)

1. Functional fixes
    - Modal form display fixes

1. Bug fixes
    - Fix for the top of the callout of items displayed in the calendar view being cut off (month view only)

## v5.0.5 (2023/02/08)

1. Bug fixes
     - Fixed a bug in which batch import of logged-in user information could only import up to 14 items.
     - Fixed a bug that an error may occur in the input dialog.

## v5.0.4 (2022/12/07)

1. Functional fix
     - Fixed Organizations and Role Groups to reflect default view sort order.
     - Fixed the height of the plug-in editing screen (source code display) to fit the screen.

## v5.0.3 (2022/08/17)
- <span class="red bold">We are working on fixing this vulnerability. Please be sure to update.</span>Please check [here](/weakness/20220817)

- <span class="red bold">Updating from v4.4.X or lower to v5.0.0 or higher requires a manual update. Please check [here](/update/v5_0_php8) once and update it.</span>

1. Vulnerability response
    - Supports cross-site scripting and SQL injection that occur on specific screens. [Click here](/weakness/20220817) for details

1. Functional fix
    - Fixed so that even users who do not have login settings can reset with the password reset command.
    - In password (batch), fixed the return value of Plugin's execute function as the return value of the command.

1. Bug fix
    - Fixed a bug that the tooltip may protrude when displaying the month in the calendar view.
    - Fixed a bug that caused an error when displaying the details screen of parent data when many-to-many relation was performed and options (other tables) were set between the tables.


## v5.0.2 (2022/08/01)

- <span class="red bold">Updating from v4.4.X or lower to v5.0.0 or higher requires a manual update. Please check [here](/update/v5_0_php8) once and update it.</span>

1. Other
    - Source formatting of php-cs-fixer (*due to the revision of php-cs-fixer, which was accompanied by a major revision due to the rule change. We performed the version separately)

## v5.0.1 (2022/08/01)

- <span class="red bold">Updating from v4.4.X or lower to v5.0.0 or higher requires a manual update. Please check [here](/update/v5_0_php8) once and update it.</span>

1. Functional fix
    - Addition of processing to set values ​​in Excel by original processing in addition to general parameters in plug-ins (documents)
    - Addition of processing that can collectively obtain relational child data by adding the parameter children=1 when retrieving data with the API.

1. Bug fixes
    - Fixed a bug that files cannot be selected/edited on the plug-in edit screen
    - Fixed a bug that the date at the time of new creation was cleared when updating data if "Register execution date" was set to "YES" in custom column type "Date"
    - Other minor fixes

## v5.0.0 (2022/07/22)

- <span class="red bold">Updating from v4.4.X or lower to v5.0.0 or higher requires a manual update. Please check [here](/update/v5_0_php8) once and update it.</span>

1. General
    - Changed the framework used from Laravel8 to Laravel9
    - Changed the minimum version of PHP from PHP 7.3 to 8.0 or higher (recommended: PHP 8.0)
1. Addition of functions
    - Supports a script that rewrites the display contents of the calendar with a plug-in (script)

1. Bug fix
    - Fixed a bug that emails are not sent when multiple email addresses are registered in the notification settings.
    - Fixed a bug that may not work properly when sharing or deleting data in notifications.


## v4.4.3 (2022/08/17)
- <span class="red bold">We are working on fixing this vulnerability. Please be sure to update.</span>

1. Vulnerability response
    - Supports cross-site scripting and SQL injection that occur on specific screens. [Click here](/weakness/20220817) for details

## v4.4.2 (2022/06/17)
1. Addition of functions
    - Clarified validation development method in plugin (CRUD page)
1. Bug fix
    - Fixed a bug that "Key column at the time of import" and "Key column at the time of export" do not work properly when creating a new custom columns "User" and "Organization".
    - Fixed the problem that if there is a file column that allows multiple selection, even though the file is specified at the time of editing, "Please select a file" is displayed and the file cannot be saved.
    - Fixed a bug that options (other tables) cannot be selected when the form heading display method is other than horizontal display.
    

## v4.4.1 (2022/05/10)
1. Addition of functions
    - Added the function to change the display wording of the placeholder of the file column and the drag and drop item.
1. Bug fix
    - Fixed a bug that emails may not be sent normally when updating from less than v4.4.0 to v4.4.0 or higher.


## v4.4.0 (2022/04/25)

- <span class="red bold">Updating from v4.3.X or lower to v4.4.0 or higher requires a manual update. Please check the contents of [here](/update/v4_4) once and then update.</span>

1. General
    - Changed the framework used from Laravel6 to Laravel8
    - Changed the minimum version of PHP from PHP 7.2 to 7.3
1. Addition of functions
    - Added CRUD page to plugin type.
    - Added the function to select the position of the column name of the view by left justification, center, right justification on the view setting screen.
1. Bug fix
    - Fixed a bug that an error occurs when getting the parent data when N: N relation is performed in the parameter setting.
    - Fixed a bug that multiple N-side relations can be registered at the same time for one table with 1: n relations.
    - Fixed a bug that may not be output when trying to output multiple images when outputting images with a plug-in (document)
    - Fixed a bug that the site name (abbreviation) may not be used

## v4.3.5 (2022/04/05)
1. Bug fix
    - Fixed a bug that site favicon (ico) cannot be registered after installation.
    - Fixed a bug that is reflected in all records when an item in the child table is selected from the search button.
    - Fixed a bug that items that should be displayed in the related narrowing options are not displayed on the form setting screen.
    - Fixed a bug that an error may occur when setting the target view when the trigger for executing notification condition setting is "Create new data / Update / Share / Comment" in the notification settings.
    - Fixed a bug that "Match any condition" has the same result as "Match all conditions" when combining view conditions in some custom columns.

## v4.3.4 (2022/03/18)
1. Addition of functions
    - Added a function that allows you to select how to display "ID", "Creator", etc. in custom data from "Top of page", "Bottom of page", and "Hide". You can select from the system settings (details)
1. Bug fix
    - Fixed a bug that some folders have insufficient permissions in the command to set the owner and permissions of the files and folders required to execute Exment.

## v4.3.3 (2022/03/11)
1. Addition of functions
    - Plugin supports file download
1. Bug fix
    - Fixed a bug that notifications are not deleted when deleting public forms
    - Fixed a bug that when deleting an email template, if the email template had already been notified, it could not be deleted due to a related data error.
1. Others
    - Fixed SQL Server automated tests
    - Logic correction of maximum and minimum values ​​of integers and decimals

## v4.3.2 (2022/02/25)
1. Addition of functions
    - Addition of command to set owner / permission of files / folders required to execute Exment mainly in Linux environment
1. Bug fix
    - Fixed a bug that duplication could not be performed normally in the notification of the custom table.
    - Fixed a bug that the edit screen of custom view does not work properly when installing Exment with English Ver. In addition, correction of various deficiencies in the English version
1. Others
    - Fixed permission settings when creating a folder
    - Extended range of php-cs-fixer
    - Fixed syntax errors in TypeScript
    - Updated test.md description when running test

## v4.3.1 (2022/01/27)
1. Addition of functions
    - Added "Post-execution status" and "Implemented action" to the notification condition in the workflow notification.
1. Bug fix
    - Fixed a bug that an error occurs when the workflow type is "general purpose" in the workflow notification.
    - Fixed some display bugs of workflow action conditions

## v4.3.0 (2022/01/26)
1. Addition of functions
    - Added "Get from Execution User" to the user who can execute the action of the workflow. You can dynamically set the execution destination, such as "execute action for user A's superior X" and "execute action for user B's superior Y".
    - Supports workflow deletion
    - Added "View / Edit Personal Information" option to custom column settings in "Users" table. Login users will be able to view and edit their information
1. Others
    - Correcting the layout deviation of the "Search" button for each data
    - Minor modifications to the workflow

## v4.2.8 (2022/01/21)
1. Addition of functions
    - Added "specified user" and "specified organization" to the notification destination. Also, modified so that a specific custom column can be specified as the notification destination of the workflow.
1. Bug fix
    - Fixed a bug that data list using a view other than all views may not be acquired in the custom data list acquisition (view use) API.
    - Fixed a bug that does not hit when the corresponding value is searched for Japanese in a column that allows multiple selection when the database is MySQL (not MariaDB).
    - Fixed a bug that the plugin (view) does not appear in the role group permission list.
    - Fixed the problem that the form is duplicated when the table / column automatically installed by the system is exported as a template and imported again in another environment (it will be solved only when newly installed after this version).
1. Others
    - Fixed so that the endpoint can be changed when the data save destination is S3

## v4.2.7 (2022/01/13)
1. Addition of functions
    - Added avatar acquisition function to API.
    - Added "table name (alphanumerical)" and "table display name" to parameter variable
    - Addition of a function to send the following files by e-mail when the notification is executed
        - Custom columns "File" "Image"
        - Files uploaded to "Document List"
1. Bug fix
    - Fixed a bug that the time cannot be specified and the data is deleted when the date and time are specified in the API "Custom data search (column specification)".

## v4.2.6 (2021/12/23)
1. Bug fix
    - Fixed a bug that does not hit when searching Japanese in a column that does not allow multiple selection when the custom column is "choice" in MySQL.
1. Others
    - Minor fixes for plugins

## v4.2.5 (2021/12/21)
1. Addition of functions
    - Added a function that allows you to set the display position to left-justified, center-justified, or right-justified when displayed on the list screen. Add from custom column settings
    - Added multiple selections of "Include search value" to "Current status" of workflow in the data display condition of custom view.
    - Added the function to add a fixed attachment to the notification template when the notification is executed.
    - Added the function to display the unread list of system notifications on the dashboard. Please add from the dashboard type "System"
    - Added work performer to workflow notification
1. Bug fix
    - Fixed a bug that HTML class of button of data copy setting is not reflected
    - Fixed a bug that "Restore Revision" may not work properly
    - Fixed a bug that no hit is found when searching Japanese in a column that allows multiple selection in MuSQL.
1. Others
    - Fixed so that the relationship type cannot be changed after saving once in the relationship settings.
    - Some bug fixes related to SQL Server
    - Other minor corrections


## v4.2.4 (2021/11/30)
1. Bug fix
    - Fixed a bug that the notification type "Time has passed" may not work properly.
    - Fixed a bug that the 1: n form may not work properly with the "Search" button on the data entry screen.
    - Fixed a bug that child data may not work properly when exporting n: n data when exporting data.
    - Fixed a bug that may not work properly due to validation target when deleting a row on the workflow action setting screen.
    - Fixed a bug that role authority may not work properly when configuring an organization with a very large number of child organizations.
    - Fixed the problem that the previous check remains when the action is taken again after checking the list and taking the action on the data list screen where the authority of the role group is "View assigned data".

## v4.2.3 (2021/10/28)
1. Addition of functions
    - Custom column types of custom columns For "Choice (select from other tables)", "User", and "Organization", you can set multiple initial values ​​by setting "Initial value setting" and comma-separated IDs. Fix
    - Added the function to set the displayed contents when the user icon on the upper right of the page is clicked. You can register from the system setting details screen
    - Added the function to set the number of items displayed on the custom data list screen from .env
    - Added variable "isDelete" to judge whether it is deleted by plug-in (event)
1. Bug fix
    - Fixed a bug that other tables can be managed when the custom table permission "Table management" is added with the role table permission.
    - Fixed a bug that the label of the button on the list screen registered in the data update settings is displayed as "Process name".
    - Fixed a bug that the display disappears when the display is changed to the next month in the calendar view.
    - Fixed a bug that access token cannot be obtained by function LoginService::getAccessToken()
    - Fixed a bug where the sender display name of the email template was not added to the form during installation. If you already have it installed, please add it manually from the email template form.
1. Others
    - For some plug-in types, if there is an error in the plug-in description, the system error will be described and corrected so that it will not be a system error.
    - Other minor corrections

## v4.2.2 (2021/08/19)
1. Addition of functions
    - Added the function to enter the data update value in the dialog in the data update setting.
    - Add "Creator" to the update value of the user column in the data update settings
    - Fixed so that multiple columns can be set as update values ​​when multiple columns are enabled in the data update settings.

1. Bug fix
    - Fixed a bug that an error occurs when accessing API settings
    - Fixed a bug that role group settings could not be deleted
    - Fixed a bug that an error occurs when exporting data when there is a relationship and data sorting is set in SQL Server.
    - Fixed a bug that an error may occur during the sharing dialog in SQL Server.
    - Fixed a bug that the format is not enabled in the data output for child data in the plug-in "Document".
    - Fixed a bug that some links were broken when displaying help for items in the dialog.
    - Fixed a bug that rarely causes an error depending on the data view setting / deletion status when updating to 4.2.1.
    - Other minor cumulative corrections.


## v4.2.1 (2021/07/01)
1. Bug fix
    - Bug fix syntax error Relation table.


## v4.2.0 (2021/07/01)
1. Addition of functions
    - Added various functions of view
        - Fixed so that you can narrow down by specifying the columns of the parent table and related table of the relation in "Data display condition" of the normal view and aggregate view (however, many-to-many relations are excluded).
        - Fixed so that you can sort by specifying the column of the parent table of the relation and the related table in "Data sort" of the all view / normal view (however, many-to-many relations are excluded).
        - Added "Specify" filter "item of view" in all view / normal view. The filter displayed at the top of the view will be able to display the specified columns. You can also narrow down the columns of the parent table and related table of the relationship.
        
    - In the public form "Set initial value from URL", in the custom columns "Choice (select from other tables)" "User" "Organization", you can set the initial value only with suuid (20-digit random character string) Add settings to do so. The setting method is [here] (/ja/publicform) "Custom column" Choice (select from other tables) ""User "" Organization ", the initial value can be set only with suuid (20-digit random character string) If you want to do so, please check"
    - Fixed so that "Date" and "Date" columns of the parent table and related table of the relation can be specified in "Time elapsed" of the notification.
    - Fixed so that the "Email" column of the parent table and related table can be specified when the "Email" column is selected in the "Implementation action" of the notification.
1. Bug fix
    - Fixed a bug that the revision function does not delete past revisions when the specified number of revisions is exceeded.
    - Fixed a bug that past images may be deleted when multiple images are inserted in the custom column "Editor".
    - Other minor corrections
1. Other
   - Added maximum character string control as a system in custom columns "Multi-line text" and "Editor". The default value is 63999 characters.
    - We are making major internal refactorings and corrections to the acquisition of the data list. We spend a lot of time testing, but if you have any problems, please contact us via an issue on GitHub.

## v4.1.5 (2021/05/29)
1. Addition of functions
    - Added an option to hide columns whose column item settings are "read-only" and "display-only" on the custom data details screen.
    - Added "Maximum number of POSTs at one time" setting at the time of installation and in "System requirements check" on the system setting screen.
1. Bug fix
    - Fixed a bug that the notification at the time of data update is notified with the value before the update.
    - Fixed a bug that the original column name is displayed on the data input confirmation screen of the public form when the display column name is changed in the form settings.
    - Fixed a bug that "Error CSRF token mismatch." Is displayed in the alert when some browser operations are performed after the login expiration date has expired.
    - Fixed a bug that the choices of the child side column are not narrowed down when the initial value of the parent side column is set on the custom data input screen.
    - Fixed a bug that the "Display data list in this view" button is displayed even if the view type is "Conditional view" on the view setting screen.
    - Fixed a bug that PHP files are not installed properly when there is a subdirectory in the plugin when installing the plugin.
1. Other
    - In the custom form settings, the image insertion is not supported in the "Initial value" item setting of the custom column "Editor".


## v4.1.4 (2021/04/29)
1. Addition of functions
    - Supports image output with a plug-in (document output)
    - Supports export of operation log
1. Bug fix
    - Fixed a bug that an error occurs in the form column setting "Display only"
    - Fixed a bug that an error occurs when editing and displaying the data for which "Allow multiple selection" is registered as NO for the custom columns "File" and "Image" after changing "Allow multiple selection" to YES.
    - Fixed a bug that an error occurs when "#" or space is included in the database password etc. at the time of easy installation.
    - Other minor corrections

## v4.1.3 (2021/04/25)
1. Bug fix
    - Fixed a bug that the image update did not complete normally in the custom column "Editor" except for the administrator.

## v4.1.2 (2021/04/23)
1. Bug fix
    - Fixed a bug that all data search did not work properly when the custom columns "File" and "Image" were set to "Free word search target".
    - Fixed a bug that the custom column "Choice (select from other table)" may be registered as int type when registering data from API etc. From now on, it will always be registered as a string type.
    - Other minor corrections

## v4.1.1 (2021/04/22)
1. Bug fix
    - Fixed a bug that LDAP login may not work properly
    - Fixed a bug that the custom column "Choice (select from other table)" may be registered as int type when registering data from API etc. From now on, it will be registered as a string type. * The conversion method of the already registered data will be announced separately.
    - Fixed a bug that images could not be uploaded in the custom column "Editor"
    - Other minor corrections

## v4.1.0 (2021/04/19)
1. Functional modification
    - Supports public forms. General users (users who are not logged in) can enter data. In the public form, you can share the URL and publish it without having to log in with your ID and password.
    - Update the form setting screen. Main correspondence contents
        - For form columns, you can set the number of columns for each row, such as "1 column, 2 columns, 1 column"
        - Up to 4 columns can be set
        - Column width can be changed
        - The display position of the headline can be set to horizontal, vertical, or non-display. Can be set for the entire form or for each column
        - Form display name, initial value, help can be set separately from custom column setting
        - Images and ruled lines can be set on the form
        - Addition of preview function that allows you to check the input screen while editing the form
        - In addition, change the layout of the form setting screen
    - Custom column updates. Main correspondence contents
        - Supports uploading multiple files with custom columns "Image" and "File"
        - Added the function to set the extension that can be uploaded in the custom column "File"
        - Addition of setting that allows input users to freely input selection items in the custom column "Choice"
        - Addition of setting to display in check box format in custom column "YES / NO"
        - Custom column "Choice" "Choice (value and heading)", added setting to display in radio button (when multiple selection is NO), check box (when multiple selection is YES) format
        - In each custom column setting, the initial value corresponds to the entry method according to the column type
    - Plugin update. Main correspondence contents
        - Added plugin (view).
        - Added mandatory component check function when installing the plugin. If the server does not include the functions required when using the plug-in, an error can be issued during installation.
        - Addition of template import function when installing plugin. Templates that are required when using the plug-in can be added at the time of installation. Click here for details (/ ja / plugin_quickstart # Install template during installation)
    - In the notification action, add "specified email address" and "system administrator" to the notification destination options.
    - Added "View Information Box" to the view settings. By inputting, you can display a message etc. at the top of the view
1. Other
    - Move notification settings to the "Detailed Table Settings" button for custom data, and to "Workflow" for workflows.
    - Fixed to switch to maintenance mode when restoring
    - Correct the behavior of the error content to be displayed by the setting value "app.debug" of Laravel for the error display method.
    - In addition, a large number of minor fixes and bug fixes

## v4.0.10 (2021/04/12)
1. Bug fix
    - Fixed a bug that the "Display Only" column of the form settings may not be saved due to validation when saving data.
    - Fixed a bug that an error occurs when exporting data while entering text in the search bar in a table with a 1: n relation.
    - Fixed a bug that an error may occur when "Current working user" is set in the form display conditions.

## v4.0.9 (2021/03/25)

1. Bug fix
    - In the custom data copy dialog, if the target is "Choice", "Choice (register value / heading)", "Choice (select from the list of values ​​in other tables)", "User", and "Organization" columns, the choices can be narrowed down. Not a bug fix
    - Fixed a bug that options are not included in "User / Organization Settings" of the role group when there are 100 or more users / organizations.
1. Other
    - In template import (Excel), add a patch to return to the normal custom column when the custom column "Choice (select from the value list of other tables)" and the target table are registered as "User" and "Organization".

## v4.0.8 (2021/03/19)
1. Bug fix
    - Fixed a bug that the status other than the status at the start of workflow is not displayed normally in the form priority setting, "Workflow status" and "Include" settings.
    - Fixed a bug where the initial role group was not installed during installation.


## v4.0.7 (2021/03/12)
1. Functional modification
    - Added an option to always make physical deletion when deleting with custom data. For the setting method, see in [here](/config).
    - Added option to physically delete custom data in API. Please check [here](https://exment.net/reference/en/webapi.html#operation/delete-value)
    - Addition of processing to delete associated files (here, "attached files", "files" and "images" in custom columns) when physically deleting custom data.
1. Bug fix
    - Fixed a bug that an error occurs and the backup ends when the attached file is deleted during the backup.
1. Other
    - In v4.0.6 or lower, added a command to delete files that have already been physically deleted and are no longer linked to any data. Please check [here](/patch/file_deleting)
    - Other minor corrections


## v4.0.6 (2021/03/08)
1. Functional modification
    - Addition of function to output debug log at the time of scheduling.


## v4.0.5 (2021/03/02)
1. Functional modification
    - In the data list screen and the view filter function, the conditions for the custom columns "Choice", "Choice (register values ​​/ headings)", "Choice (select from the value list of other tables)", "User", and "Organization" columns. Fixed to be able to select multiple choices. In that case, it will be judged "whether any of the selected values ​​match".
1. Bug fix
    - Fixed a bug that the summary column is not displayed when the summary view is selected in the dashboard chart.
    - Other minor corrections


## v4.0.4 (2021/02/22)
1. Functional modification
    - Addition of batch command import function for attached files. Check [here](/ja/data_cmd_import_export#import_file) or [here](/ja/data_cmd_import_export#import_document)
    - Added a command to get the version of Exment. Check [here](/ja/command?Exmentバージョン)
1. Bug fix
    - Fixed a bug that the corresponding plugin is not displayed in the menu when multiple plugin types are included in one plugin and there is a type "page".
    - Fixed a bug that some files such as plug-ins may not be restored normally when restoring from Windows environment to Linux environment.
    - Partially reviewed validation process at the time of SSO certification.



1. Functional modification
    - Addition of operation log acquisition function from API. check [Here](https://exment.net/reference/en/webapi.html#log/get-logs)
1. Bug fix
    - Fixed a bug that an error that does not exist in the field occurs when adding an administrator on the system setting screen when there are 100 or more users.
    - Fixed a bug that an error occurs when registering a child record of 1: n with "+New" from the parent record screen.

    
## v4.0.3 (2021/02/17)

1. Functional modification
    - Addition of operation log acquisition function from API. check [Here](https://exment.net/reference/en/webapi.html#log/get-logs)
1. Bug fix
    - Fixed a bug that an error that does not exist in the field occurs when adding an administrator on the system setting screen when there are 100 or more users.
    - Fixed a bug that an error occurs when registering a child record of 1: n with "+New" from the parent record screen.

    
## v4.0.2 (2021/02/13)

1. Functional modification
    - Added "Workflow status" and "Workflow execution user" to the conditions in the form priority setting.
1. Bug fix
    - Fixed a bug that the parent data cannot be selected when the saved child data is edited after setting the 1: n relation later.
    - Fixed a bug that error log is output when searching related data of self-referencing custom table
    - Fixed a bug that loading does not end when trying to delete itself on the user setting screen
1. Others
    - Added test for stability
    - A lot of refactoring is done mainly for condition setting


## v4.0.1 (2021/02/02)

1. Bug fix
    - Fixed a bug that text editor images cannot be inserted by users who do not have system administration privileges.
    - Fixed a bug that an error occurs when the date column of the child table is specified as "specified date" in the summary view of the table with parent-child relationship.
    - Column type Fixed a bug that data cannot be updated if other than yourself is entered in the table and user column that have required items.
    - Fixed a bug that custom table cannot be deleted when setting data copy
    - Fixed a bug that filtering is not executed when the normal view with filtering is specified in "Graph" for the item on the dashboard.
    - Other cumulative bug fixes.
1. Other
    - Added test for stability.


## v4.0.0 (2021/01/21)
1. Functional modification
    - Changed the framework version to Laravel 6.X. Corrected some descriptions associated with it
    - Addition of judgment whether composer version is 2.0.0 or higher in system requirement check
    - Fixed the display method of the current version and the latest version on the system setting screen
1. Bug fixes
    - Fixed a bug that jpg files could not be uploaded when uploading images from a text editor

## v3.9.5 (2021/01/08)
1. Bug fix
    - Fixed a bug that jpg image could not be uploaded in custom column type "image"
    - Fixed a bug that an error occurs when submitting a form containing an array in the setting value "debug mode (request value output)".
    - Fixed a bug that cannot be executed if a custom column is set for the workflow executable user and the column is not registered as data.
1. Other
    - Some minor fixes

## v3.9.4 (2021/01/01)
1. Function addition / improvement
    - Added a command to check the database connection.
    - Fixed so that "Refer all data", "Edit assigned data" and "View assigned data" cannot be set at the same time in the role group setting.
1. Other
    - Some minor fixes

## v3.9.3 (2020/12/28)
1. Function addition 
    - Added the function to check the system requirements from the screen and commands. Click [here](/server) for details
1. Bug fix
    - Fixed a bug that menu cannot be newly registered
    - Fixed some query bugs when using SQL Server
1. Other
    - Refactor the code for data filtering
    - Create automated tests for plugins
    - Optimized the manual for initial setting and installation. The contents are [here] (/quickstart)


## v3.9.2 (2020/12/21)
1. Bug fix
    - Fixed a bug that could not be saved normally when there are "Key column at the time of import" and "Key column at the time of export" on the custom column setting screen.
    - Fixed a bug that system columns could not be sorted normally on the data list screen.

## v3.9.1 (2020/12/17)
1. Function addition 
    - Added an option to set the default value of the checkbox to select the transition destination after saving the data. Click [here](/ja/data_form) for details 
1. Bug fix
    - Fixed a bug that could not be saved due to validation error on the plugin setting screen

## v3.9.0 (2020/12/16)
1. Function addition / improvement
    - Formally supports the calculation formula in the input form. Please check [here](/ja/column) for how to set the calculation formula.
1. Bug fix
    - Fixed a bug that the same value is displayed when the same column type is set on the data list screen. Also, fix a bug that causes an error when sorting data.
    - Fixed a bug that comments are displayed when alphabetic characters continue on the data details screen.
1. Other
    - Enhanced validation of input form

## v3.8.0 (2020/12/11)
**There are some points to check when updating to v3.8.0 or higher. Please check the contents of [here] (/ja/update/v3_8) once and then update.**
1. Function addition / improvement
    - Improved data import / export performance and memory usage. For details, please check the contents of [here] (/ja/update/v3_8).
    - Improvement of screen display contents when import command is executed, modified so that you can see which line is currently being imported.
    - In addition, refactoring of import / export
1. Bug fix
    - Fixed a bug that an error occurs when sorting the list screen by data creation date / time / update date / time, etc.(Remand v3.7.7 fixes)


## v3.7.7 (2020/12/06)
1. Bug fix
     - Fixed a bug that an error occurs when some custom columns are selected in "Display only" of form settings or "Enter only once" of custom columns.
     - Fixed a bug that the email address may not be obtained normally when the notification target is "Choice (refer to other table)" including the email column in the notification settings.
     - Other minor corrections.
1. Other
     - Added the update procedure to composer2. Click [here](/update_composer) for details

## v3.7.6 (2020/11/25)
1. Bug fix
     - Fixed a bug that an error occurs in export (view)
     - Fixed the phenomenon that a problem occurs when N: N relation is performed and the child table side does not have the authority and the data on the parent table side is accessed (and the logged-in user is not an administrator).
     - Corrected an error in the notification executor display when commenting / attaching data. * If you installed with v3.7.5 or lower, please change the settings manually by clicking [here](/patch/mail_template_comment_attachment).

## v3.7.5 (2020/11/24)
1. Addition of functions  
     - Fixed so that the type of validation can be obtained in the plugin (validation). Click [here](/plugin_quickstart_validate) for details
1. Bug fix
     - Fixed a bug that an error occurs when the workflow "status" and "working user" are used as conditions in the notification settings.
1. Other
     - Added the update procedure to composer2. Click [here](/update_composer) for details


## v3.7.4 (2020/11/16)
1. Bug fix
     - Fixed a bug that the same user may be notified twice by notification  
     - Fixed a bug that emails may not be sent normally when the user column is specified in the notification.
     - Fixed a bug that the decimal digits may be incorrect in the custom column "decimal".
     - Fixed a bug that the filter for the current day was not narrowed down properly in the filter related to the custom column "Date".
1. Other
     - The notification email has been refactored.
     - Significantly added test code for notifications. In the future, we will continue to add test code to improve quality, focusing on areas that are likely to cause problems.
     - The source for Lint execution has been prepared.

    
## v3.7.3 (2020/11/10)
1. Function addition / correction  
     - Added an option to specify the extension that can be displayed on the browser when downloading the file. For details, refer to "Changing the extension displayed on the browser when clicking an attached file" in [here](/config).
     - Fixed to be able to copy and paste images in the custom column "Editor"
1. Bug fix
     - Fixed a bug that the custom column set to "Enter only once" cannot be used in the calculation formula.
     - Fixed a bug that an error occurred when setting "This year", "Next year", and "Last year" in the view condition.
     - Other minor corrections
    
## v3.7.2 (2020/10/27)
1. Function addition / correction
    - Supports comparison using system date in "Compare two columns" setting of custom table extension setting.
    - Added "read-only" and "display-only" as separate settings in the form settings. Click [here](/form#read-only) for details.
    - Supports data detail screen transition in a separate window on the list screen from the search button.
    - Slightly improved usability on the form settings screen.
    - Added a function that can output a log of request value as a debugging function. For details, refer to "Debug mode (request value output)" in [here](/config).
1. Bug fix
    - Fixed a bug that the filter cannot be executed when the search index is set in the column type "File".
    - Changed the reverse proxy settings to take into account settings such as Nginx. Also, amend the manual. Click [here](/additional_reverse_proxy) for details.
    - Fixed a bug that an error occurs when the column in the corresponding table contains "choices" that can be selected multiple times in the API data update and the corresponding column is not included in the request value.
    - Fixed a bug that users with table administrator authority cannot display the custom form setting screen.

    
## v3.7.1 (2020/10/18)
1. Bug fix
    - Fixed a bug that custom columns of multiple selectable choices could be sorted.
    - Fixed a bug that the custom column display screen does not check even if the free word search target is displayed on the custom column list screen.
    - Fixed a bug that data is not displayed when conditions are set by specifying a month such as "last month" or "this month" in the date item in the custom view condition settings.
    - Fixed improper reverse proxy settings.
1. Other
    - Slightly modified the script on the installation screen.
    
## v3.7.0 (2020/10/16)
1. Addition of functions
    - Added support for SQL Server (backup / restore function is not supported).
    - Added "valid flag" to the notification settings. You can turn off notifications by disabling.
    - Added "Notify work performer" option to notification settings. By setting YES, you can also send a notification to the worker.
    - Added the ability to add mentions to Slack notifications. Click [here](/notify#Slack) for details.
    - Regarding the filter function of various list screens, filter items have been added to screens where the item was only "ID".
1. Bug fix
    - Fixed a bug that could not be saved normally when the parent-child form was set and the column of the child table was set to "unique".
    - Fixed a bug that an error may occur when multiple views with workflow status are specified in the same dashboard in the same table.
    - Other cumulative bug fixes.
1. Other
    - Partial refactoring of notification setting method.
    - The entire source has been reviewed due to the implementation of SQL Server.
    - Improved the speed of the dashboard "Data list" and "Exment new information list".
    - Changed the method of retaining version information of Exment from session to cache.
    - Changed "Mail Template" to "Notification Template". * For Exments installed with less than v3.7.0, the notation will remain "Mail template".
    - Other minor corrections.
    
## v3.6.8 (2020/10/07)
1. Functional modification
    - When logging in to SSO, an error message when there is a problem with user information is displayed on the screen.
    - In SSO login, when logging in as a user who has already been added to Exment, the validation rule when the SSO setting "Update user information" is NO has been relaxed.
1. Bug fix
    - Fixed a bug that the file backed up with v3.6.7 did not complete normally when restored to v3.6.7 environment (caused by database view. When restoring to v3.6.7, Please execute [here](/patch/restore_ignore_view)).
    - Fixed a bug that importing data of a table with multiple n: n relations did not complete normally.
    - Fixed a bug that an error occurs when a user is completely deleted.
    - Other minor corrections.
    

## v3.6.7 (2020/10/05)
1. Addition of functions
    - Added a function to display the data associated with the parent from the data details screen on the child side when the n: n relation is set.
    - Added a function so that the data associated with the parent can be set from the data edit screen on the child side when the n: n relation is set.
    - Added a function to return a value other than true / false in the plugin (import).
1. Bug fix
    - Fixed a bug that was narrowed down by "Match all conditions" even if the workflow "Current status" and "Current working user" were set to "Match any condition" in the view narrowing condition.
1. Other
    - I decided to use the MySQL view because the SQL query became too complicated for some processing.
    - Some comments etc. have been modified to check source consistency with Lint.
    - Other minor corrections.


## v3.6.6 (2020/09/28)
1. Bug fix
    - Fixed a bug that when uploading multiple files in the attached file on the data details screen, reloading may occur during upload depending on the file size.
    - Fixed a bug that a script error occurs when there are multiple custom columns "editors" on the data edit screen.
1. Other
    - Fixed the file name of the uploaded file displayed on the attachment list screen when uploading an image with the custom column "Editor" so that it is displayed with the uploaded file name.
    - Disable preview button in file upload library.
    - Fixed so that the condition view cannot be deleted when the condition view is set in the custom column "Choice (select from the list of values ​​in other tables)" and the notification condition.
    - Fixed the data backup / restore function to display an error message and prevent backup / restore in an environment where backup / restore is not possible due to server settings, etc.
    - Other minor corrections.


## v3.6.5 (2020/09/22)
1. Addition of functions
    - Support for uploading images in the custom column "Editor". * If you want to disable it, please check "Disable the image upload function of the custom column" Editor "" in [here](/config).
    - Fixed so that you can search by file name in the custom columns "File" and "Image".
    - Added the function to search the file attached to the custom data when searching for free words using the header search form. * The default is disabled. If you want to enable it, please check "Disable image upload function of custom column" editor "" in [here](/config).
1. Bug fix
    - Fixed the problem that the association is not performed when the filter is executed in the search dialog after clicking the search button when the "association setting" of the form is set.
    - Fixed a bug that the option may not appear in the input item "Choice (select from the list of values ​​in other tables)" when "Sort setting" is set in the condition view.
    - Fixed a bug that the option does not appear in the search condition "Choice (select from the list of values ​​in other tables)".
1. Other
    - Optimization of plugin editing function.
    - Other minor corrections.


## v3.6.4 (2020/09/12)
1. Bug fix
    - 1: n Fixed a bug when displaying the relation form


## v3.6.3 (2020/09/11)

> <span class = "red bold"> As of 09/11/2020, we have confirmed the phenomenon that composer error occurs when updating Exment. </span>
[This page](/troubleshooting?Id=A-composer-error-occurs-during-manual-installation-or-update) describes how to deal with it. If an error occurs in the update, follow the procedure to deal with it. Please go.

1. Addition of functions
    - Added the function to set the background color and background image of the login page. It can be changed from [Login settings](login_setting).
    - Supports password reset command execution. Click [here](/login_setting#password_reset_command) for details.
    - Added the function to use the original driver at the file upload destination. Click [here](/additional_file_saveplace) for details.
    - Added a check box to select the transition destination after saving on the role group workflow setting screen.
    - Added a function to select the type of notification email from HTML and text.
    - Addition of function that can execute plug-in (batch) from the screen
1. Bug fix
    - Fixed a bug that the display view of the menu is not reflected when importing a template
    - - Fixed a bug that the search button does not work properly in the child table in the form with 1: n relation set.
    - Fixed a bug that the search button does not work properly due to view display conditions, etc.
    - Fixed a bug that the data linkage setting does not work properly when the custom column type is "Choice (select from the list of values ​​in other tables), User, Organization" and "Search for choice each time" is enabled.
    - Other fixes for cumulative bugs
1. Other
    - Refactored notification processing. In addition, a reference has been added so that notifications can be executed from plugins. For details, refer to "Notify Service" in [here](/func_reference).
    - Refactoring of new custom data creation / editing screen

## v3.6.2 (2020/09/02)
1. Addition of functions
    - Addition of chunk mode (split output) by command data export. Click [here](/data_cmd_import_export#export_chunk) for details.
    - Added the function to specify and execute a table with the custom data refresh function. Click [here](/refresh_data) for details.
    - Added the function to use the original driver at the file upload destination. Click [here](/additional_file_saveplace) for details.
1. Bug fix
    - Fixed a bug that a validation error occurs when importing csv file, custom column is "1 line text" and only numeric data is imported.
    - Fixed a bug that a format error occurs when importing xlsx depending on the environment.
    - When executing the custom data update API, if the column types "Choice (reference to other table)", "User", and "Organization" are executed without including the column for which "Allow multiple columns" is set to YES, Fixed a bug that caused an error
    - Other cumulative bug fixes
1. Other
    - Making PHP 7.4 tentatively installable
    - Custom column type can no longer be changed after saving custom column
    - Added the process to delete the corresponding custom column data from the target custom data list when deleting the custom column.
    - Added the command list manual. Click [here](/command) for details.


## v3.6.1 (2020/08/25)
1. Addition of functions
    - Added the function to execute the data import / export function by command. Click [here](/data_cmd_import_export) for details.
    - Addition of form copy function on custom form screen
1. Bug fix
    - Fixed a bug that the action for which "Perform previous action selected by user" cannot be executed in the "Workflow executable" user setting in the workflow settings when there are 100 or more users.
    - Fixed a bug that a validation error occurs when executing APIs "Create new data" and "Update data" when the required settings have been made for the custom column type "Image".
    - - Fixed a bug that the search button does not work properly when selecting a parent table when creating a new child table when 1: n relation is set.


## v3.6.0 (2020/08/19)
1. Vulnerability response
    - Cross-site scripting support. Clarification of script execution availability and HTML input in the form that can input HTML. Click [here](/weakness/20200819) for details.
    - Changed the format to download the file instead of displaying the attached file in the browser when clicking the URL of the attached file. Click [here](/weakness/20200819_2) for details.
1. Bug fix
    - Fixed a bug that the table cannot be deleted when there is one or more user views and there is a user view that the logged-in user cannot access.
    - Fixed a bug that the column data of the parent table is not displayed when the column data of the parent table is set to be displayed from the view of the child table when the n: n relation is performed.
    - Fixed a bug that "Data auto sharing setting" of custom table is not exported normally when exporting template
    - Fixed a bug that data is not displayed when "Workflow status" is selected in the calendar view condition settings.
1. Addition of functions
    - Addition of reverse proxy option with SAML authentication (added to the option settings on the SAML setting screen)
1. Other
    - When installing with v3.6.0 or later, change the initial value of the user dashboard / user view from use to not use.
    - When performing a free word search, the request was made for each table, but changed to 5 tables (reduction of the number of simultaneous requests).


## v3.5.4 (2020/08/06)
1. Addition of functions
    - Addition of option to skip notification if the notification target is the logged-in user at the time of notification (default is skip). * For setting changes, refer to "Skip notification if the notification target is a logged-in user" in [here](/config).
1. Bug fix
    - Fixed a bug that the custom view with sorting may not be displayed.
    - Fixed a bug that the form cannot be deleted when the form priority is set.
    - Fixed a bug that the initial value is not set when the initial value setting of the custom column is "0".
    - Other minor corrections


## v3.5.3 (2020/07/30)
* There were some defects at the time of release. Please note that v3.5.0 → 3.5.3.

1. Addition of functions
    - Added the function to automatically set the organization of the logged-in user in the data update settings. Data update settings are [here](/operation)
1. Bug fix
    - Fixed a bug when custom columns of custom columns "User" and "Organization" were specified as group columns in the summary view.
    - Fixed a bug that the field selected from two lists, such as "Organization settings" on the user data edit screen, may not respond even if clicked.
    - Other minor corrections
1. Other
    - Fixed so that the button is not displayed when there is only one menu of "Detailed table settings" on the data list screen.

    
## v3.5.0 (2020/07/28)
1. Addition of functions
    - Added data update settings. A specific trigger such as "click a button" or "create new data" updates the data saved in Exment in a batch. Click [here](/operation) for details.
    - You can now select the screen type in the form priority settings. You can make settings such as "form that is displayed only when creating a new form" and "form that is displayed only on the data details screen". Form priority setting is [here](/form#form-priority-settings)
    - Added the editing function of the plug-in. You can edit, upload new, and delete plug-in files from the screen.
    - Fixed so that the user view / user dashboard can be enabled / disabled from the system settings.
    - Drag and drop is supported for file / image columns. * To disable it, click [here](/config#disable-drag-and-drop-of-file).
1. Bug fix
    - Fixed a bug that the radio button is not displayed on another screen after transitioning to the form screen.
    - Other minor corrections

    

## v3.4.3 (2020/07/20)
1. Addition of functions
    - Added a setting to change the color of the graph displayed on the dashboard. Click [here](/config # Change the color of the dashboard graph display) for details.
    - Added the function to control the display / non-display of buttons by logic in "Button" and "Document" of the plug-in. For details, see [here (button)](/plugin_quickstart_button) or [here (document)](/plugin_quickstart_document).
1. Bug fix
    - Fixed a bug that an exclusive control error occurs when data is saved as it is after deleting a file in the custom columns "File" and "Image".
    - Fixed a bug that the "current status" of the workflow is not displayed under certain conditions.
    - Fixed a bug that an error occurs when deleting an image in the table "Basic information"
1. Other
    - Fixed to display a caution statement when restoring backup data
    - Enhanced custom column validation logic, assuming saving data from plugins.
    - Added a function to check validation when setting a value in custom data by plugin. Click here for details (/ ja / func_reference # setValueStrictly)
    - Other minor corrections
    

## v3.4.2 (2020/07/14)
1. Addition of functions
    - Added a setting value that disables the data search dialog function of "Choice (reference to other tables)", "User", and "Organization". For details, refer to "Disable the data search dialog function of" Choice (reference to other tables) "," User "and" Organization "" in [here](/config).
1. Bug fix
    - Fixed a bug that the search button is displayed even when the item is displayed only in the data search dialog of "Choice (reference to other table)", "User", and "Organization".
    - Fixed validation bugs by creating new users and importing data
    - Control correction when an error occurs when the password expires or the password is reset by the first login
    
    

## v3.4.1 (2020/07/13)
1. Addition of functions
    - Added data search dialog function when entering data for "Choice (reference to other tables)", "User", and "Organization". You will be able to search from the list of target tables and select data.
    - Added the function to get the checked data of the list when the button is displayed on the list screen with the plug-in "button". Click [here](/plugin_quickstart_button) for details.
    - Added the function to display your own button with the plug-in "button". Click [here](/plugin_quickstart_button) for details.
    - Addition of setting to synchronize data sharing settings with users / organizations set in columns in automatic data sharing settings for each table
    - Fixed so that multiple files can be uploaded at once in the attached file on the data details screen.
1. Bug fix
    - Fixed a bug that free word search in "Choice (reference to other table)" column does not hit when "Heading column" is registered in 0 in the search destination table.
    - Fixed a bug that import does not complete normally when "Cannot create new / Allow import" is set in the "Cannot change from screen" setting of the table.
    - Fixed a bug that the status name at the start is always displayed when the data list is displayed when "Workflow status" is selected in the group column in the summary view.
1. Other
    - Corrected the internal description of the data list screen and data detail screen.
    - Add an overview manual around roles and privileges. Please check [here](/permission)
    - Other minor corrections
    


## v3.4.0 (2020/07/03)
1. Addition of functions
    - Addition of settings for external portal sites. You can prevent each user from viewing user information outside your organization. Click [here](/multiuser) for details.
    - Added automatic data sharing setting for each table. When saving data, you can automatically share the data with the organization or user that is set as the value. Click [here](/table#data_automatic_sharing_settings) for details.
    - Addition of an option that allows users / organizations who cannot access the table to be displayed as candidate choices in the "User" and "Organization" settings of the custom column.
    - Changed to select the search target column in the header, the search bar on the data list screen, and the data search by API (performance measures)
    - Changed to output the margin by tag when multi-line text is displayed in html and the body contains a half-width space.
    - Fixed the function so that it can be added to the "heading column" when creating a new column.
    - Changed the form decision button from "Submit" to "Save"
    - Changed the function to keep the check box when saving data after checking the "Continue creation" and "Continue editing" check boxes.
1. Bug fix
    - Fixed a bug that caused an error in "Display summary data details" display in the summary view.
1. Other
    - Fixed some judgments about "Is Exment installed?"
    - Lint is being supported (We are preparing for more detailed automatic tests for future error confirmation)
    - Other minor corrections

## v3.3.2 (2020/06/25)
1. Addition of functions
    - Added LIKE search in "Custom data search (column specification)" of API. Also, add OR search. Click [here](https://exment.net/reference/ja/webapi.html#operation/get-values-query) for details.
    - Added API to retrieve data using views. Click [here](https://exment.net/reference/ja/webapi.html#operation/get-view-values) for details.
    - In the case of a table that has a reference to itself, such as an organization, correct it so that it is not included in the registration of the reference destination.
1. Bug fix
    - Fixed a bug that the graph is not displayed on the dashboard of the TOP page.
    - Fixed a bug that an error occurs due to duplicate values ​​and validation that the value of "Unique" column cannot be changed even if the user information is not updated when logging in to SSO.
    - In the form with 1: n relation, when "Choice (reference to other table)" with 100 or more data is added to the child data, the choice is not displayed.
    - Fixed a bug that if there is a column for which required & initial value is set in API, it will be registered empty without becoming a required error even if that column is not included when creating new data.
    - Other minor corrections


## v3.3.1 (2020/06/23)
1. Addition of functions
    - When a custom column (choice to refer to another table) to a table with parent-child / reference relationship exists in the same form, by selecting the parent item, only the child item associated with that parent is automatically automatically Expansion of functions to be narrowed down. Click [here](/form#related_refinement_settings) for details.
    - Changed to call the "Filter" item on the data list screen asynchronously. * Since it takes time to get the option list, the function has been modified to render only when necessary.
1. Bug fix
    - Fixed a cumulative bug related to "Custom column (choice to refer to another table)". In particular, fixed a bug when "Allow multiple selection" was performed.
    - Fixed a bug that the description of the role group was not updated
    - Fixed so that the parent table cannot be deleted when there is a child table
    - Fixed a bug that an error occurs in the "Notification list" display when deleting a custom table that has been notified.
    - Fixed a bug that only the last content is displayed on the detail screen display when items such as "Heading" are set in the form.
    - Other minor corrections


## v3.3.0 (2020/06/14)
1. Addition of features (SSO)
    - Added LDAP authentication and SAML authentication. Click [here](/login_setting) for details.
    - Added function to set SSO login settings from the screen
    - You can now perform a login test in advance with SSO login. Please use for communication confirmation etc.
    - Adding a setting to add a user to Exment when logging in for the first time from SSO, even if you have not added the user in advance
    - Addition of setting to deny login depending on the domain of the logged-in user
    - Added a function to automatically link to the set role group only when logging in for the first time.
    - Added "dot" to "Available characters" option of custom column "1 line text"
1. Addition of functions (others)
    - Addition of setting that requires password change when logging in for the first time with a normal account
    - Added sharing function for [User View](/view) and [User Dashboard](/dashboard)
    - Added a button to display a dialog on the "System Settings" related screen.
    - Many other minor corrections



## v3.2.8 (2020/06/10)
1. Addition of functions
    - Added setting value to hide "Table details" and "Change view" buttons on the custom data screen. Click [here](/config#"Table-details"button-on-the-custom-data-screen-is-hidden) for details.
1. Bug fix
    - Fixed a bug that Japanese characters in file names are garbled when exporting data in Edge
    - Fixed a bug that an error occurs when the character string "parent table name_small table name" becomes 31 characters or more in total due to the relation setting when exporting data.
    - Fixed a bug that the filter is not filtered properly when the view display condition "Does not include search value" is set in the column type "Choice" and the setting of multiple selection "YES".
    - Other minor corrections
1. Other
    - Modification of template import (Excel)
    

## v3.2.7 (2020/06/01)
1. Bug fix
    - Fixed a bug that the role group list screen was not displayed properly

## v3.2.6 (2020/05/29)
1. Bug fix
    - Fixed a bug that the reference destination of "Choice (select from the list of values ​​in other tables)" for which the search index was not set was displayed on the setting screen of the summary view.
    - Fixed a bug that did not work effectively when the workflow status was selected in the "Match any condition" setting in the view condition.
    - Fixed a bug that "Display count" in view settings is not valid
    - Fixed a bug in importing CSV and numerical values ​​in the YES column and the option column where "Allow multiple columns"
1. Other
    - Added a process to redirect to the edit screen when the URL is directly entered on some endpoints.
    - Added a manual for batch import function of logged-in users. Click [here](/user?Id=Bulk-import-of-login-user-information) for details.


## v3.2.4 (2020/05/22)
1. Addition of functions
    - BOM can now be added when exporting csv data. (The characters are not garbled even if opened in Excel.) The setting method is [here](/config#csv-format) (BOM is added when exporting in).
1. Bug fix
    - Fixed a bug that backup loading did not end when "Keep backup generation" was set when backing up data.


## v3.2.3 (2020/05/18)
1. Bug fix
    - Fixed a bug when two or more plugins are installed and the plugin button, trigger, batch export is executed.


## v3.2.2 (2020/05/14)
1. Addition of functions
    - Added the function to change the backup file name
    - Performance improvement when importing data
    - When importing data, if there is already a target image in the "files" table in the URL of the file / image column, the function is corrected so that it is automatically linked at the time of import (optimization at the time of data migration)
    - Added the function to display an error in MySQL 8.0.0 or higher during easy installation.
1. Bug fix
    - Fixed a bug that the status name at the start is always displayed when the dashboard is displayed when "Workflow status" is selected in the group column in the summary view.
    - Fixed a bug that an error occurs when displaying "Display summary data details" from the data list when the group column "Workflow status" is selected in the summary view.
    - Fixed a bug that backup did not complete normally in some versions of mysqldump v8.0.X. [Reference](https://serverfault.com/questions/912162/mysqldump-throws-unknown-table-column-statistics-in-information-schema-1109)
    - Fixed a bug where workflows that were not enabled could be selected as notification targets in the notification settings.
    - Fixed a bug that the display wording of the target data may be corrupted on the notification bar details screen.
1. Other minor corrections


## v3.2.1 (2020/05/07)
- Fixed to add column name class to td tag of dashboard data list table
- When importing data, if the target file of the URL exists in "File" and "Image" of the custom column, it can be imported.
- Fixed a bug that an error occurs when saving a role group if the plugin is not installed.
-Fixed a bug that an error occurred when executing the extension: publish command during development with [Develop](https://github.com/exceedone/exment/blob/master/Develop.md).
- Other minor corrections

## v3.2.0 (May 05, 2020)
- Added a function so that "Match any condition" can be selected in the view display condition, form switching condition, and workflow action setting condition.
- Added a function that allows you to set binary comparison validation from the screen when saving data. Click [here](/table?Id=comparing-two-columns)
- Changed "Detailed table settings", "Import / export", and "Change view settings" to a dialog display format.
- Added the role authority management function of the plugin. Click [here](/plugin?Id=role-authority-management) for details.
- Added "Export" to the plugin type. Click [here](/plugin_quickstart_export) for details.
- Deprecated "Trigger" in the plugin type, and added [Button](/plugin_quickstart_button) and [Event](/plugin_quickstart_event) instead.
- Added "When screen is loaded" and "When dashboard is loaded" events in the plug-in type "Script". Click [here](/plugin_quickstart_script) for details
- Changed not to get "label" value by default when getting API data list
- Added the function to add your own options in the setting "Available characters" of the custom column type "1 line text". Click [here](/additional_available_characters) for details.
- Other minor corrections.


## v3.1.14 (2020/05/01)
-(Version numbering error. The contents are the same as v3.1.13.)

## v3.1.13 (2020/05/01)
- Fixed a bug that an error occurs when the custom column type is "File" and "Image" and the "Required" setting is set and the file is not attached when updating the data.
- Fixed a bug that the cache is not refreshed when "Role group" is set on the "User" screen when the cache is enabled.
- Fixed a bug that the plug-in type "script" is not loaded at runtime with F5
- Enhanced validation of custom column setting "Enter only once"
- Other minor corrections


## v3.1.12 (2020/04/20)
- Added an option to give edit permission to "Next Working User" when executing a workflow. It has been added to the action setting screen.
- Added "Get custom column information by specifying table name / column name" to API
- Fixed a bug in permissions other than the administrator in the plugin (page). And optimization of authority processing
- Fixed file path when running Linux with bulk insert function
- Other minor corrections

## v3.1.11 (2020/04/10)
- Corrected the output format when the column type is "Date" or "Date" in the parameter settings.
- Fixed a bug that the button name setting is not valid in the plug-in type "Document".
- In addition, carry out detailed refactoring, etc.

## v3.1.10 (2020/04/05)
- Addition of exclusive control. When updating data from the screen or API, an error message will be displayed if another user has updated it.
- Added "API key" to API authentication method. When authenticating from batch, API can be executed without using ID / password. Click [here](/api) for details.
- Added "Get document (attached file) list" and "Delete file" to API. Also, for "File Download", add an endpoint with a specified file name.
- Added "Overall API App Management" and "API App Management" to the authority of the role group.
- Added an option to hide "ID", "Created date" and "Updated date" in the filter of the data list screen to the system setting screen.
- Changed the file path character string for Windows from "\" to "/" (unified with Linux). In addition, patching of the data registered so far
- In addition, carry out detailed refactoring, etc.

## v3.1.9 (2020/04/02)
- Supported to search for values ​​such as "Select (other table)" in the header search bar and custom data list search form.
- Supports large amount of data registration (bulk insert). Click [here](/data_bulk_insert) for details.
- Variable form display conditions on the data details screen
- Other bug fixes

## v3.1.8 (2020/03/27)
- Fixed to display an error if PHP7.4 was used during installation
- Fixed a bug that a non-administrator user would get an error when logging in when the user who was set in the menu deleted the table (occurs when the table was deleted in the past version)
- Fixed a bug that an error occurs when editing when "Enter only once" is set in the custom column setting and not "hidden field" is set in the custom form.
- Fixed a bug when deleting multiple data by deleting custom data of API
- Other minor corrections

## v3.1.7 (2020/03/25)
- Fixed a bug that cross-site scripting occurs when the system administrator inputs a script tag in the custom view, notification, and workflow list screens.
- When importing data, set the maximum number of items that can be imported at one time (Since the content was very inquired, we set a limit of 1000 items.)
- Added a query to change the format of the acquired data when acquiring API data
- Other minor corrections

## v3.1.6 (2020/03/22)
- Added "HTML" and "Editor" boxes to the dashboard. It can be set by setting "System" from the "Dashboard" settings. Click [here](/dashboard) for details.
- Support for delayed execution in the notification function. Click [here](/additional_queue) for details * This is a function for advanced users.
- Fixed a bug in the list screen when the workflow was aggregated.
- Fixed a bug when the number of lines on the dashboard is set to 5 or more.
- Other minor corrections

## v3.1.5 (2020/03/18)
- Added export function using the displayed view on the data list screen. Click [here](/data_import_export) for details.
* Currently, the data export / import menu is very long. If there are unnecessary items, they can be hidden by [Setting value](/config#Import_Export).
- Fixed the notification to the right of the header so that the bell sways when a notification is added
- Strengthen deletion check for table deletion when performing relations and table references
- Other minor corrections

## v3.1.4 (2020/03/07)
- Changed the number of search indexes so that it can be changed from config
- Changed the number of filter items on the data list screen to balance left and right.
- Other minor corrections

## v3.1.2 (2020/03/02)
- Performance improvement on the data list screen <br /> * If the column "label" is used in the data list acquisition API, it will not be possible to acquire it by default after 2020/04/30. For details, follow [here](/additional_api_label) to add.
- Added "now" to [Parameter](/params)
- Fixed a bug that data cannot be saved when the date system custom column is required, input only once, and the execution date and time is registered at the time of creation.
- Fixed a bug that an error occurs when the data list screen is displayed without setting the target table after uploading the "trigger" of the plug-in.


## v3.1.1 (2020/02/26)
- Addition of notification before and after execution to the trigger condition of plugin (trigger)
- Along with that, "Notification name (alphanumeric characters)" was added to the notification item.

## v3.1.0 (2020/02/22)
- Added the function to restore logically deleted data. Click [here](/deleted_data) for details.
- Added a file save function to image / file columns using the data API. Click [here](https://exment.net/reference/ja/webapi.html#operation/post-values) for details.
- Supports the function to import templates from Excel files. Click [here](/template # import-excel) for details.
- Changed the system setting screen to be divided into "basic settings" and "detailed settings"
- Other minor corrections

## v3.0.22 (2020/02/21)
- Added test mail sending function. Click [here](/mailsend_setting) for details.
- Fixed a bug that the unique key is not imported normally when the unique key is set in the custom column when importing the data.
- Other minor corrections

## v3.0.21 (2020/02/16)
- In the data export, in the case of "Parent data ID", "User", "Organization", and "Choice (select from the value list of other tables)", the function to output the value other than id has been added. Click [here](/ata_import_export#Change-output-value-when-exporting) for details.
- Added setting to disable file type csv, xlsx in data import / export. Click [here](/config#import-export) for details.
- Other minor corrections

## v3.0.20 (2020/02/12)
- Fixed a run-time scope bug in the plugin API

## v3.0.19 (2020/02/10)
- Fixed a bug that an error occurs on the data list screen when multiple selections are allowed when the column is "Choice" or "Choice (register value / heading)".
- Fixed a bug that an error occurs on the workflow action setting screen when a user / organization is specified as an action target in a workflow action and then the user / organization is deleted.
- Fixed to output log when template list could not be acquired normally
- Fixed a bug that unnecessary contents were displayed on the setting screen at the time of initial installation (contents managed on the system setting screen)
- Fixed a bug that an error message may be displayed even though the backup was completed normally when executing the backup.
- Other minor corrections


## v3.0.18 (2020/01/30)
- Added the function to specify the parent data (parent_id) when registering the data of the table on the n side with the relation of 1: n in the "Add new data" function of API. Click [here](https://exment.net/reference/ja/webapi.html#operation/post-values) for details.
- Fixed the parameter so that the value of the referenced table in the column "Choice (select from the list of values ​​in other tables)" can be displayed.
- Fixed plugin scripts, styles and pages to load js and css at the end of HTML loading
- Fixed to display even if you are not in expert mode from "Executable setting from screen" of table extension setting
- Fixed a bug that password policy and IP filter settings are not displayed when "Use organizational management" in the system settings is set to NO.
- Fixed a bug that the condition view may not work properly with the notification function.
- Fixed a bug that the notification function does not notify normally when registering data from a situation where you are not logged in.
- Other minor corrections

## v3.0.17 (2020/01/24)
- Fixed a relation bug when "User" and "Organization" were in the form at the same time.
- Fixed a bug that parent-child form remains when the relation is deleted after registering the form.
* If the form remains in the relation deleted in the past, delete it with [here](/patch / remove_deleted_relation).
- Fixed a bug that an error occurs when linking settings are made in the user column and organization column.
- Fixed a bug that images could not be acquired normally when SSO login was performed with a Google account. Click [here](/patch/sso_google) for details.

## v3.0.16 (2020/01/17)
- Fixed custom view sort settings

## v3.0.15 (2020/01/16)
- Fixed a bug in uploading and restoring files
- Fixed a bug when deleting a custom column
- Fixed a bug that plugins (pages, documents) may not be displayed properly
- Other minor corrections

## v3.0.14 (2020/01/09)
- Partially modified dialog specifications (with Docurain support)


## v3.0.13 (2019/12/27)
- Added an option to set the login user to the initial value when the column type is "User".
- API custom data deletion supports multiple deletions.
- Other minor fixes.

## v3.0.12(2019/12/23)
- Fixed deleting old backup files.
- Other minor fixes.

## v3.0.11(2019/12/17)
- Fixed a bug that HTTP logs were not saved.
- Fixed a bug that password reset email was not sent properly.
- When restoring, if the target is local, nothing is executed and the process ends.
- "Process to reduce line feed code in HTML response" is added as an option. Click [here](/config#Line-feed-code-removal-in-HTTP-response) for details.

## v3.0.10(2019/12/12)
- Added option to not show latest version of dashboard. Click [here](/config#Disable-latest-version-display-of-dashboard) for details. 
- Added processing to save execution log when executing API.
- Fixed a bug that history is not displayed properly when creating / updating custom data with API. Click [here](/patch/api_revision) for details.
- Fixed a bug that workflow parameters were not displayed correctly in workflow email notifications.
- Other minor fixes.

## v3.0.9(2019/12/09)
- Disable "Process to reduce line feed code in HTML response". Some problems occurred, such as the line break in the text editor could not be done.
- Improve performance when users belong to multiple organizations.

## v3.0.8(2019/12/07)
- Support uploading files to other services (FTP, SFTP, AWS S3, Azure Blob) instead of local server. Click [here](/additional_file_saveplace) for details.
- Supports Web server redundancy.
- Added IP filter setting function. Executable IP addresses can be registered as whitelists on the Web screen and API. Click [here](/additional_ip_filter) for details.
- Add workflow and notification function to API.
- Added custom data search (column specification) to API.
- Added "expand" option to collectively retrieve child data list in some APIs.
- Options added to some APIs.
- Added processing to reduce line feed code in HTML response.
- Add "Before Workflow Execution" and "After Execution" to trigger type in "Trigger" of plugin.
- Fixed a bug that the search value by the magnifying glass remained when the filter was executed after searching by the magnifying glass in the custom data list.
- Add processing to delete uploaded template file.
- Added automatic testing of some functions.
- Other minor fixes.

## v3.0.7(2019/11/29)
- Fixed an issue where an error may occur when saving custom data when the custom column is a user.

## v3.0.6(2019/11/28)
- Fixed a bug that file download was not completed normally.

## v3.0.5(2019/11/28)
- Fixed an issue where an error occurred when opening the dashboard setting screen after deleting a view on the dashboard.
- When one-many form has automatic calculation and-+ button at the same time, when the-+ button was clicked, the automatic calculation was executed on another line.
- Fixed a bug where unexpected error occurred when clicking a button in plug-in "Trigger".
- Fixed a bug that the form could not be sent if the column type was required in "Text Editor".
- Fixed the problem that the selected item is not displayed correctly when the setting is displayed again after saving on the setting screen of the calendar view.
- Fixed missing multilingual translations, and added command to get list of untranslated items.
- Other minor fixes.

## v3.0.4(2019/11/25)
- Added a setting that is automatically shared to the login user's organization when saving custom data. Click [here](/organization#kyouyu_jidou) for details.
- Added the setting of whether to refer to parent organization and child organization in sharing of organization of custom data organization when setting organization hierarchy. Click [here](/organization#kaisou_syurui) for details.
- Added [organization manual](/organization).
- Other minor fixes.

## v3.0.3(2019/11/22)
- Improved performance when exporting large amounts of data.
- Logic modification of timeout.
- Fixed a bug that search conditions are not displayed in custom view settings.
- Fixed a bug that the order page may be duplicated on the next page when orderby is specified in API of custom data list.

## v3.0.2(2019/11/20)
- Added processing to delete cache when listing.
- The URL number of characters that can be registered in the menu, the better to first install the Exment a modified.  
※ v3.0.1 to up to 50 characters to → 2000 characters, [here](/patch/menu_uri_length) we need your help with modification.
- Fixed a bug that data creator ID and updater ID were not registered when registering data by API.
- Fixed a problem that the menu is not displayed properly depending on the setting when displayed.

## v3.0.1(2019/11/15)
- Fixed a bug that template could not be output.
- Fixed a bug where an error occurred in multiple column primary key validation.
- Fixed a bug that the user / organization did not support the data linkage setting on the custom form setting screen.
- Fixed the problem that layout collapse occurred on data detail screen and edit screen. And smartphone optimization.

## v3.0.0(2019/11/13)
- **Added support for workflow function.** Click [here](/workflow_setting) for details.
- Supports multiple form settings. You can switch the usage form depending on the conditions.
- Added support for cache settings. Click [here](/additional_cache) for details.
- Change the display method such as ID and update date on the data detail screen and data edit screen.
- "Validation" added to plugin.
- Added a setting that does not perform page transition when clicking a row in the list.
- Performance improvement. Added processing to remove unnecessary white space etc. in HTML response.
- Changed to return error message and error code when an error occurs during API execution.
- Added a function to enable / disable import / export for each table. Expert mode setting is required.
- "Extended HTML" added to the form. Other values ​​can be embedded in HTML.
- Addition of memory release processing when exporting data.
- Fixed a problem that an error occurs when saving on the form setting screen when there is an n: n relation.
- Fixed a bug where saved values ​​were not selected and empty on the data edit screen when "Narrow options" was set to YES in column settings.
- Other minor fixes.


## v2.1.12(2019/11/02)
- Added a function to display an error when accessing with IE11.
- When importing data, fixed an error that may cause an error in "Choices (select from a list of values ​​in another table)".
- Fixed a bug that failed to export data when the first character is "=".
- Other minor fixes.

## v2.1.11(2019/10/28)
- Added option to hide "hidden fields" on data detail screen.
- Added option to prevent attachments from being deleted only by uploaders.
- Partially optimized processing during data import.

## v2.1.10(2019/10/25)
- Changed to duplicate the custom column from the default view if all views do not exist in the view list.
- Fixed a bug that data search could not be performed on the search form in the custom data list.

## v2.1.9(2019/10/17)
- Fixed a bug that data cannot be searched.

## v2.1.8(2019/10/16)
- Fixed a bug where a non-administrator user has no permission error when entering a URL to create new custom data in the menu.
- Fixed timeout issue when exporting large amounts of data.
- When importing data, if a custom column is a table reference, an error occurs if it is not a required item and data is not entered.
- Performance improvement. Reduced access to database.
- Other minor fixes

## v2.1.7(2019/10/02)
- Add password policy. Added a control to prevent registration of past passwords and a function to force password change after a certain date.
- Added filter function for only "empty (no value)" data in data list filter.
- "API usage" and "data search method (prefix / partial match)" can be changed from the system setting screen.
- Modified to be able to get the access token of the provider when performing OAuth authentication.
- Fixed a bug that required write permission for custom data list acquisition of API.
- Fixed a bug that error occurs when totaling by date / month / day of the week for date column.
- Fixed a bug that the sorting setting did not work properly on the dashboard screen in the data list display of the custom view.
- Fixed a bug that narrowing down within the same date when narrowing down "Create date / time" / "Update date / time" of data list.
- When importing data, if the custom column contained "Choices (select from a list of values ​​in another table)", "User", and "Organization", the performance was affected very slowly.
- Fixed a bug that "findKeys" was not executed correctly when "customKey" was "User" or "Organization" when creating / updating custom data of API.
- Other minor fixes

## v2.1.6(2019/09/24)
- Fixed a bug where values ​​were not saved properly when "Allow multiple columns" was selected.

## v2.1.5(2019/09/20)
- Fixed a bug where the operation log might not be displayed.
- Addition of processing that generates an error when saving more than a certain number of records when creating new custom data of API.
- Correction of wrong key of setting value.
- Other minor fixes.

## v2.1.4(2019/09/18)
- Slack and Microsoft Teams support for notification destinations.
- Added a function to send a zip with password when sending a file with notification.
- Added the function to display as a percentage when the custom column is decimal.
- Added "Dashboard" and "Import" to plug-in types.
- Fixed internal processing of plug-in type "Trigger".
- Changed multiple plug-in types to be executed by one zip file.
- API settings can be changed from the screen.
- Added the function to display the operation log list in the administrator function. You can add from the menu.
- Added "count" and "orderby" to API custom data list acquisition.
- Supports batch creation of custom API data.
- Added support for changing the date display format.
- Modified so that the system administrator can change the created user view / user dashboard to the system view / system dashboard.
- Added a function to prevent user views or user dashboards from being created depending on the settings.
- Calculation formulas correspond to the total value of items in the child table.
- On the organization list page, change the hierarchy display to off by default. If you turn it on, please do this setting.
- Fixed a problem that occurred in data copy.
- Fixed the bug that the view that was displayed on the dashboard is always displayed when displaying the data list from the menu when the view was displayed on the dashboard.
- Fixed a bug that updating was not performed correctly when the primary key was changed during import.
- Fixed a bug that caused an error when editing the menu name on the menu screen.
- Fixed a bug where drag & drop could not be performed normally when "Add to all items" was performed on the form setting screen.
- Other minor fixes.

## v2.1.3(2019/09/09)
- Fixed a bug where a non-administrator user would see an error under certain conditions when viewing the user list.
- Corrected some wording in role group settings.

## v2.1.2(2019/09/06)
- Modified so that selection table can be selected as a candidate in "calculation" setting of custom column setting.
- Fixed a bug that was not required in the data form when custom column settings were "required" and "can be registered only once".
- Fixed a bug that the notification screen could not be opened when the table itself was deleted in the custom table for which notification settings were made. * If you have not opened it already, please execute [here](/patch/remove_deleted_table_notify).
- Other minor fixes

## v2.1.1(2019/09/03)
- Fixed a bug where an error may occur when checking notifications
- Fixed a bug that attachments cannot be sent by email notification

## v2.1.0(2019/08/24)
- Supports "script" and "style" plug-ins. Also, the specification change of the plug-in "Page".
- Supports batch update of data. Multiple data can be updated simultaneously from the check box on the list screen.
- Corresponds to the column width setting on the data list screen. Also supports screen display by horizontal scrolling.
- On the data list screen, added processing to shorten if the character string is too long.
- In the data view, if the custom column is "Choice (select from the list of values ​​in other tables)", the reference column can be displayed.
- Change the file path for uploading plugins and templates. Made changes in storage folder.
- Correction of copy processing bug when there is a parent-child relationship table in data copy setting.
- Remove packages required for two-factor authentication from dependencies (change to manual package installation method).
- Other minor fixes.

## v2.0.6(2019/08/22)
- Fixed a bug where the menu "Custom URL" does not show anyone other than the system administrator.

## v2.0.5(2019/08/20)
- Fixed the problem that an error occurs when the view is displayed depending on the input string when the custom column is "Editor", "Multiline text", etc.

## v2.0.4(2019/08/08)
- If the custom column is "User" "Organization" "Options (reference to other table)" and the number of cases is 100 or more, the option is not displayed in "Filter" of the data list.

## v2.0.3(2019/08/08)
- Added a setting to display the value of data saved in the past as input candidates when the custom column is "1 line text".
- Added setting that can be entered only once in custom column setting. Once entered and saved, it can no longer be edited.
- Change "User code", "Organization code" and "Mail key" to non-editable.
- When the custom column is "Choice (Table)", the setting to always search from the database without displaying the initial selection candidate is added.
- Enhanced validation, error message, and initial value settings when importing data.
- When exporting data, if the column type is "Image" or "File", change the method to output the URL to download the file.
- Change the way headings are displayed in dashboard charts.
- Add "include" and "do not include" in the display condition filter of custom view.
- Change javascript from ES5 to ES6.
- Add euro to currency.
- Supports Japanese language display of choice library.
- Fixed a bug where n: n relations could not be searched in the data filter.
- Fixed a bug that data export of 1: n relation was not performed correctly when exporting data.
- Fixed a bug that favicons are rarely displayed after login when registering favicons.
- Correction of a bug that an error occurs when sorting by parent table on the data list screen of the child table.
- Fixed a bug that all users are not displayed in the user list option of the form even if authority management is not used.
- Fixed a bug that some error messages are in English.
- Other minor fixes.

## v2.0.2(2019/08/01)
- If the custom column is "User", "Organization", "Choices (reference to other tables)", and the number of records is 100 or more, the data will not be displayed unless you have the editing authority of the reference table.

## v2.0.1(2019/07/31)
- Fixed a bug that the date, time, and date / time columns are registered with the current time even if they are registered in the blank.
- Fixed a bug that can be registered with a value other than date in date type and date / time type.
- Modified so that custom columns can be set as condition view in "User" and "Organization".
- Fixed a bug that was not displayed as an option even if "Browse all data" was set to YES in the custom table settings.
- Fixed a problem that the setting contents are not maintained at the time of a mandatory error in the 1: n form on the custom form screen.
- Other minor fixes

## v2.0.0(2019/07/26)
- Changed role / authority management method to role group management. Click [here](/role_group) for details.
- Added a function to display notifications in the upper right corner of the header. Click [here](/notify) for details.
- Added a reload button at the top right of the header.
- Added a function that can execute a notification when commenting / attaching to data.
- Added the ability to share data.
- Modified to be able to add data update notification on custom table creation screen.
- Changed to be able to set login user / department / role group settings on "User" edit screen.
- Changed to be able to set role groups on "Organization" edit screen.
- Add all views. Used in data search screen.
- Add a condition view. When the custom column is "Choices (select from a list of values ​​in another table)", the options to be displayed can be narrowed down by the condition view.
- Added the function to perform required checks on custom forms. Also, display optimization.
- When the custom column is "Date", the format at importing may be in "yyyy / MM / dd" format.
- Fixed a bug that import by CSV did not complete normally.
- Fixed a bug that restore may not be performed normally when uploading a restore file from the screen.
- Other minor fixes

## v1.4.2(2019/07/19)
- Fixed the problem of document attachment by data attachment and plugin.

## v1.4.1(2019/07/17)
- Fixed a bug that memory overflow error occurs when backup / restore file is large file.
- Fixed a bug that uploading files and images to child table does not work properly.

## v1.4.0(2019/07/11)
- Compatible with two-step authentication. Click [here](/login_2factor_setting) for details.
- Added the function to send an email from the data details screen to the target user or email address. Click [here](/notify) for details.
- Modified to be unable to log in for a certain period of time after a certain number of failed logins.
- Added the function to configure the SMTP setting of mail on the system setting screen.
- Support duplicate notification.
- Add email address, etc. to items that can be set as notification destination.
- Modified so that you cannot change your email address on the user settings screen.
- Fixed a bug where some screens could be deleted even for tables and columns installed in the system.
- Fixed a bug where only one item could be obtained on some screens even if multiple options were allowed.
- Fixed a bug that custom table could be deleted by check box on the screen.
- Changed to save .env file when backing up.
- Changed to replace some values ​​in .env file when listing.
- Fixed a bug that occurred when exporting / importing "chart" of dashboard.
- Other minor fixes.

## v1.3.4(2019/07/01)
- Fixed a bug where an error occurs when changing authority management from NO to YES in the system settings

## v1.3.3(2019/06/30)
- Data aggregation setting supports grouping by child table items.
- Data heading supports output of values ​​by parameter setting.
- When custom column is "1 line text", it supports validation by regular expression. ※ Expert mode setting is required.
- Changed to return to the list screen from the data edit screen or data detail screen while maintaining the filter while setting the filter on the data list screen.
- Fixed a bug that event of child table form does not work properly when relation is registered in parent-child relationship.
- Fixed a bug that Linux characters are garbled when Japanese names are included when saving images and files.
- Fixed a bug where custom columns could be grouped even in "time" in data view settings.
- Fixed a bug that system setting image and user banner could not be deleted.
- Fixed a bug that the thumbnail is not displayed when the custom column is "Image".
- Fixed a bug that some fields did not become read-only even if it was set to "display only" in form setting.
- Fixed a bug that [data link setting](/form) did not work properly.
- Fixed a bug that 500 error occurred when changing custom column type on custom column setting screen.
- Fixed a bug that the setting screen was not displayed when the plug-in setting was "Function".
- Other minor fixes

## v1.3.2(2019/06/28)
- Fixed a bug that the calendar view was not displayed

## v1.3.1(2019/06/27)
**v1.3.1 requires special steps. [Here](/patch/index_hyphen) in the procedure, please do the update.**
- Fixed a problem that data could not be saved properly when the search index was set to YES with the column name including a hyphen in the custom column settings.

## v1.3.0(2019/06/22)
- Supports simple installation. At the time of new installation, you will be able to configure settings from the screen.
- Distribution of update batch started.
- Added search function on custom data screen. Free word search can be performed for each table.
- Modified so that rows can be swapped with "↑" and "↓" buttons in custom view settings.
- Specification change to change table heading setting from custom table extension setting.
- Changed the extension setting of custom table so that it can transition from the data modification screen.
- Added a function to display the update history of Exment as a dashboard part.
- When displaying the list screen from data search, changed to be displayed in a narrowed state in advance.
- Modified to allow communication from outside server to be changed from the screen (can be changed from the system setting screen).
- Modified to be able to change the default number of display items for free word search and dashboard display (can be changed from system setting screen).
- Fixed the bug that the summary view was not selected when the summary view was selected in the dashboard data list.
- Other minor fixes

## v1.2.12(2019/06/22)
- Preparations for updating to v1.3.0 or higher (for convenience of version control system)

## v1.2.11(2019/06/20)
- When restoring data for which "Database" has not been checked in the backup settings, the restoration cannot be performed normally.

## v1.2.10(2019/06/15)
- In the group column of the aggregation view, it is possible to aggregate in units such as "every year", "every month", "every month, day", "every day".
- Added support for exporting summary views.
- Fixed so that data list can be displayed from "Calendar" and "Chart" of dashboard.
- Fixed a bug that the key column specification at the time of data import cannot be selected normally when the column type is user-department.
- Fixed the bug that the URL of the manual always becomes the dashboard when the prefix is ​​left blank from "admin".
- Other minor fixes

## v1.2.9(2019/06/13)
- Fixed a bug that the "parent organization" setting of the organization could not be set normally.
- Fixed the problem that the same result is displayed when searching for organizations.
- Fixed a bug that the view different from the selected view setting is displayed in the calendar view.

## v1.2.8(2019/06/11)
- Added processing to save backup destinations externally, such as FTP, SFTP, and Amazon S3.
- "Batch" function added to plugin.
- When importing data, added a function that allows you to specify the values ​​of "Customer ID", "Options (select from the list of values ​​in other tables)", "User", and "Organization" in the custom column of the reference destination
- Changed to display the maximum size when uploading files.
- Changed to delete unnecessary custom data table when restoring backup.
- Fixed an error when editing "chart" on dashboard.
- Other minor fixes

## v1.2.7(2019/06/04)
- Compatible with user dashboard. Non-admins can add their own dashboards.
- Supports user view. Non-admins can add their own views.
- Supports multiple unique keys. Can raise an error when all column values ​​are the same.
- Added view duplication function.
- List required, index and unique in custom column list.
- Fixed screen display logic of login user setting.
- When importing data, the values ​​entered in "Choices (register values ​​/ headings)", "Choices (select from a list of values ​​in other tables)", "YES / NO", "Choice of two values", and "Parent id" are automatically Function to convert the data.
- In the form, when there are two or more "selct_table" items in a row and they are in a parent-child relationship, narrowing down is performed when selecting a parent option.
- Added processing to input "delete me" in confirmation dialog when deleting table.
- Fixed a bug that filter conditions were not output even when performing a filter search in data output.
- Corrected the problem that the formula was not set correctly when "calculation formula" was modified again in custom column setting.
- Other minor fixes

## v1.2.6(2019/06/04)
- Fixed a bug that the column type was "integer", "decimal number" or "currency" and the value was not correctly aggregated when the value including comma was saved.

## v1.2.5(2019/06/01)
**※ Updating from v1.0.X or v1.1.X to v1.2.X requires special procedures. [Here](/update/v1_2) in the procedure, please do the update.**
- Fixed bug that MariaDB cannot be installed.

## v1.2.4(2019/05/26)
- Corrected the problem that a new installation could not start due to an error in the configuration file.

## v1.2.3(2019/05/25)
- Add "week" and "day" in calendar view.
- Added an option to automatically set the current date and time when creating or saving a new date, time, and date and time settings in custom columns.
- Added "Display Number" of the list for the whole system. When the list is displayed, the data of the set number is displayed.
- Added "Display Number" of list to view setting. When the view is displayed, the set number of data is displayed.
- Improved search performance for search from header.
- Changed to notify when comment / attach if notification setting for new creation / update of data.
- Changed to not notify the person who performed the action when notifying new data or updating data.
- Added a function to log executed SQL when saving "EXMENT_DEBUG_MODE = 1" in .env file.
- When displaying "Create user" and "Update user" in the view, the detailed information of the user is displayed in a dialog.
- Modified to return error message when authentication error occurs in API.
- When "Add to default view" is set to YES in custom column settings, the column is added to the last view displayed instead of the default view.
- Fixed the problem that the setting disappears when the "calculation" column setting of custom column is performed again.
- Fixed a bug that a permission error occurs when a user who is not a system administrator refers to another user.
- Fixed a bug that was unable to save correctly when using custom date and time in Linux environment.
- Fixed a bug that non-existent columns in the form are deleted when saving json type columns in the database.
- Other minor fixes.

## v1.2.2(2019/05/22)
- Fixed a bug where the time zone might not be valid.

## v1.2.1(2019/05/21)
- Fixed a bug where plug-in buttons might not be displayed properly.

## v1.2.0(2019/05/18)
- Supports calendar view. Data can be displayed in calendar format.
- Revised data structure for deletion. Change logical delete to physical delete in some tables.
- Fixed a bug that occurred when importing a template, etc. due to the above deletion key modification.
- Simplified initial setup.
- Pre-compliant with SQL Server (restricted. Currently backup / restore is not possible).
- Review the data display condition settings in the view settings. Correspondence to be able to select target data more appropriately.
- Corresponding to have the number of generations to keep during automatic backup.
- Support favicon (icon) display of site.
- Fixed multilingual omission.
- Fixed a bug that API authentication cannot be performed by anyone other than the administrator.
- Other minor fixes.

## v1.1.8(2019/05/15)
**※Updating from v1.0.X to v1.1.X requires special procedures. [Here](/update/v1_1) in the procedure, please do the update.**
- Due to the update of the related library (laravel-admin), the display of data and the "change form" that did not work properly were corrected.

## v1.1.6(2019/05/04)
- Fixed an issue where data details could not be displayed correctly when uploading plugins.

## v1.1.5(2019/05/03)
- Fixed a bug that PHP7.3 cannot be executed normally.

## v1.1.4(2019/05/02)
- Added comment function. Comments can be added to the saved data.
- Enhanced search function. If you have related data, you can view a list of that data.
- If the form is set in two columns, it will be displayed in two columns even on the data detail screen.
- Fix to be able to change the display order of custom tables and columns.
- Tables where custom columns are referenced in "Choices (select from list of values ​​in other tables)" cannot be deleted.
- Deleted the "unique column" setting of the database except for the suuid column (because problems frequently occurred when deleting data).
- Fixed versioning of css and js from the date and time of the call to the version of exment.
- Bug fix of input form when data is 100 or more.
- Fixed a bug that error display was not performed correctly when an error occurred during data import.
- Fixed dashboard design crash on Safari.
- Fixed a bug that occurred when repeating the page transition on the custom form screen.
- Fixed a bug that banner of login user cannot be deleted.
- Menu screen design modification.
- Other minor design fixes and bug fixes.

## v1.1.3(2019/04/17)
- Performance measures were taken. Reduced useless access to the database.
- Fixed an error when displaying parent data of table with parent table in view setting.
- Fixed the problem that the frame goes out when registering a logo larger than a certain size.

## v1.1.2(2019/04/16)
- Fixed an issue where logo could not be deleted in system settings.

## v1.1.1(2019/04/16)
- Fixed a bug that related data cannot be searched.
- Fixed a bug that an error occurs when rearranging data on the screen, when creating or updating user.
- Fixed bug where template search was not completed.
- Source code refactoring.

## v1.1.0(2019/04/15)
- Aggregate view support. Calculate and display the sum of the amount and numerical value based on the registered data.
- Graph display on dashboard.
- REST API fully open. Easy linkage with external systems.
- Supports URL subdirectories. URLs like " [http://foobar.com/sub](http://foobar.com/sub) " can be used.
- Increased data memory retention, reduced access to DB → improved performance.
- Many other minor corrections

## v1.0.12(2019/04/11)
- Fixed an issue where an error icon was displayed in Backup & Restore despite success.

## v1.0.11(2019/04/11)
- Modified so that users who do not have all data editing authority do not display the authority registration item when editing data.
- Review how to create URL endpoints to improve performance.
- Fixed bug where roles could not be deleted.
- Fixed a bug that an error occurs when "Create user" and "Update user" are specified in the data filter.
- Fixed a bug that "The latest version is available" is displayed on the TOP page even if the latest version is installed.
- Fixed a bug that the password change screen was not displayed on the user setting screen.
- Fixed a bug that email was not sent when automatically generating a password on the login user screen.
- Changed to display a message on the login user screen when an email is not sent due to incomplete email settings.
- Tooltips are displayed for some items in the list screen, such as backup screen icons, when the mouse is on the mouse. It is fully supported when v1.1.0 is supported.
- Pre-supported API. Specifications will be posted when v1.1.0 is released.
- Corrected some URLs from relative paths to absolute paths. It is fully supported when v1.1.0 is supported.
- Other minor fixes.

## v1.0.10(2019/03/27)
- Added PDF format to document output (manual will be revised soon).
- Fixed a problem that did not work with PHP7.3.
- Added rules so that up to 10 custom column search indexes can be registered for each table.
- Added optional mandatory check on custom column registration screen.
- Fixed so that only image can be selected in column type "Image" of custom column.
- Fixed a problem that "Data linkage setting" of custom form could not be registered normally.
- Changed so that if there is data registered as a table option when deleting data, it cannot be deleted.
- Fixed a problem where a script error occurred on the initial setting screen.
- Fixed an issue where a system error occurred when obtaining the latest version information of Exment failed.
- Addition of a mode that does not connect to an external server.
- Fixed an issue where the "exment: install" and "exment: update" commands did not correctly distribute public, lang, and views folders.
- Delete unused classes (including classes used in the implementation verification. I'm sorry).
- Other, refactoring, etc.

## v1.0.9(2019/03/14)
- Added exment: update command. Reduced commands that need to be executed when updating.
- Reduced commands required when installing Exment.
- Fixed a bug that occurred when multiple permissions were set in the permission setting.
- Modified internal processing of authority setting (change of class name, etc.).
- Added a link to the manual located on the page.
- Remove manual pages and images from the package. Manuals have been moved to another package.
- Other minor fixes.

## v1.0.8(2019/03/08)
- Changed to be able to set the number of form lines when custom column is "Multiline Text" or "Editor".
- When creating a new table, redirect to the custom column page of the table.
- Modified to display a message on the system administrator's dashboard when there is an update.
- Modified to be able to output parent table data when outputting data.
- Fixed a bug where relations could be set indefinitely (example: If you set "Organization → User → Organization", you will not be able to start).
- Fixed a bug where data copy settings could not be deleted.
- Fixed an issue where some environments did not complete successfully during backup.
- Other minor fixes

## v1.0.7(2019/02/17)
- Fixed a bug that 404 occurs on the backup page when changing the route from "admin".
- Fixed an error that caused an error after deleting a table.
- Fixed a bug that custom columns and forms cannot be deleted.
- Fixed update history (revision) logic.
- Other minor fixes

## v1.0.6(2019/02/05)
- Fixed a bug that the default view includes "Delete date".
- Fixed broken design of dashboard.
- Added a function that can be added to the menu at the same time when creating a new table.
- Added the ability to add columns to the default form and view at the same time a new column is created.

## v1.0.5(2019/01/28)
- Fixed a bug that menu settings could not be set normally

## v1.0.4(2019/01/16)
- Fixed a problem that some templates cannot be imported correctly when importing templates

## v1.0.3(2019/01/10)
- Fixed an issue where custom forms could not be saved properly

## v1.0.2(2019/01/09)
- Fixed a bug that an error occurs when the column type of the custom column is "decimal" "currency", "numeric comma character string" is set to YES, and if you try to save a value of 4 digits or more in the item
- Added the function to display version information on the system
- Other minor fixes

## v1.0.1(2019/01/08)
- Fixed bug where password reset could not be performed

## v1.0.0(2019/01/07)
- Official release