# Release notes

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
- "Process to reduce line feed code in HTML response" is added as an option. [Click here](/config#Line-feed-code-removal-in-HTTP-response) for details.

## v3.0.10(2019/12/12)
- Added option to not show latest version of dashboard. [Click here](/config#Disable-latest-version-display-of-dashboard) for details. 
- Added processing to save execution log when executing API.
- Fixed a bug that history is not displayed properly when creating / updating custom data with API. [Click here](/patch/api_revision) for details.
- Fixed a bug that workflow parameters were not displayed correctly in workflow email notifications.
- Other minor fixes.

## v3.0.9(2019/12/09)
- Disable "Process to reduce line feed code in HTML response". Some problems occurred, such as the line break in the text editor could not be done.
- Improve performance when users belong to multiple organizations.

## v3.0.8(2019/12/07)
- Support uploading files to other services (FTP, SFTP, AWS S3, Azure Blob) instead of local server. [Click here](/additional_file_saveplace) for details.
- Supports Web server redundancy.
- Added IP filter setting function. Executable IP addresses can be registered as whitelists on the Web screen and API. [Click here](/additional_ip_filter) for details.
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
- Added a setting that is automatically shared to the login user's organization when saving custom data. [Click here](/organization#kyouyu_jidou) for details.
- Added the setting of whether to refer to parent organization and child organization in sharing of organization of custom data organization when setting organization hierarchy. [Click here](/organization#kaisou_syurui) for details.
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
- **Added support for workflow function.** [Click here](/workflow_setting) for details.
- Supports multiple form settings. You can switch the usage form depending on the conditions.
- Added support for cache settings. [Click here](/additional_cache) for details.
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
- Changed role / authority management method to role group management. [Click here](/role_group) for details.
- Added a function to display notifications in the upper right corner of the header. [Click here](/notify) for details.
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
- Added the function to send an email from the data details screen to the target user or email address. [Click here](/notify) for details.
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