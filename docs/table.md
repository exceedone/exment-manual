# Custom table settings
Exment uses "custom tables" to manage information.  
Make the necessary settings such as the functions and permissions allowed for the registered data.  

## List
Click "Custom Table" in the menu.  
The list screen of the created custom table settings is displayed.  

![Custom table screen](img/table/table_grid.png)

※ "Basic information" "User" "Organization" "Email template" "Email sending history" "Notice".  
These tables are initially set when Exment is installed.  
In addition, tables that are imported as templates are also displayed on the list screen.  

## Create New

- Click the "New" button at the top right of the list screen.  
![Custom table screen](img/table/table_new1.png)  
  
- The table creation screen will be displayed. Enter the necessary items.  
![Custom table screen](img/table/table_new2.png)

## Details of setting items

#### Table name (alphanumeric) ※ required
- Represents the name of the table. (Example: user, information, estimate)
- The set alphanumeric characters are used in the URL when the table is opened. (Example: http (s): // (Exment URL) / admin / data / user)
- Only alphanumeric characters and symbols "-" and "_" can be used.
- Table names used in other tables cannot be used.
- The table name can be no longer than 30 characters, and the table name must begin with a letter.
- This can only be set when creating a new table. Once saved, they cannot be changed.

![Custom table screen](img/table/table_detail1.png)

####  Table display name ※ required
- The name to be displayed on the screen. Japanese is also available. (Examples: users, announcements, quotes)

![Custom table screen](img/table/table_detail2.png)  

#### Description
- Description of the table.

![Custom table screen](img/table/table_detail3.png)
- The description entered to the right of the table display name on the data screen is displayed as shown in the following image.　　

![Custom table screen](img/table/table_detail3_sample.png)

#### Display order
- This is the display order on the custom table setting list screen.
- Please input a half-width character, or specify a number with the right and left "-" "+" buttons.

![Custom table screen](img/table/table_detail4.png)

#### Color
- Set the table color. The color set here is used for suggestions when searching.

![Custom table screen](img/table/table_detail5.png)

- Clicking the currently specified color displays the selection screen.

![Custom table screen](img/table/table_detail5_choice.png)

#### Icon
- Table icons set. The set icons are displayed as menu icons and search result icons.

![Custom table screen](img/table/table_detail6.png)

- Clicking the currently specified icon displays the selection screen.

![Custom table screen](img/table/table_detail6_choice.png)

#### Searchable
- Set whether to include the table in the search target when [searching](/search.md) from the search bar . Default is YES.
Set it to NO if you want to exclude it from the search results, such as when you want to make it a hidden table.

![Custom table screen](img/table/table_detail7.png)

#### Use ID for labels
- ou can add the data ID to the head of the label in the search suggestions displayed when using the search bar. See [Using on Labels](/column?id=Use-in-labels) for more information. Default is NO.

![Custom table screen](img/table/table_detail8.png)

#### Only one can be registered
- If the table does not register multiple data items and allows only one data item, set it to YES. Default is NO.  

![Custom table screen](img/table/table_detail9.png)

#### Use attachments
- Set to YES to allow uploading [attachments](/data_details?id=attachments) to table data . Default is YES.

![Custom table screen](img/table/table_detail10.png)

#### Use comments
- Set to YES to allow [comments](/data_details?id=comments) on table data. Default is YES.

![Custom table screen](img/table/table_detail11.png)

#### Use data change history
- Set to YES if you want to manage who updates what data in the table as a revision (history). Default is YES.  

![Custom table screen](img/table/table_detail12.png)

#### Change history version number
- If "Use data change history" is YES, enter the number of versions that retain the change history as an integer.  
If you enter "200", the first update history information will be deleted at the 201st update. The default value is 100.

![Custom table screen](img/table/table_detail13.png)

#### Editable by all users
- If set to YES, all users will be able to edit all data in the table.  
Eliminates the need to assign permissions individually. Default is NO.

![Custom table screen](img/table/table_detail14.png)

#### Visible to all users
- If set to YES, all users will be able to see all data in the table. Eliminates the need to assign permissions individually. Default is NO.  
※ At the time of Exment installation, "All users can view" is initially set to YES for only the "Notification" table. This is so that all users can view the announcement information.  
On the other hand, only the administrator can edit the notification information.  

![Custom table screen](img/table/table_detail15.png)

#### Available to all users
- If set to YES, all users will be able to see all data in the table.  
Eliminates the need to assign permissions individually. Default is NO.  
※ If only "Available for all users" is set to YES, the table cannot be displayed on the menu or list screen, but it can be referenced from other tables.  
Example: The "consumption tax" table does not need to be displayed on the list screen for general users, but must have "consumption tax" selected as an option. For such tables, set "Anyone can see" to YES.  

![Custom table screen](img/table/table_detail16.png)

#### Add to menu
- If set to YES, add the table to the [menu](/menu.md) when saving the table. Default is NO.  
※ This item is displayed only when creating a new table. If you want to change the settings as a menu after adding it to the menu, make the settings on the menu screen.

![Custom table screen](img/table/table_detail17.png)

#### Parent menu to add to
- This item is displayed when "Add to menu" is set to YES. When adding a menu, select the parent menu name.  
Example: When creating a new “Manual” table and selecting “Administrator Settings” in the parent menu, the menu for the newly created “Manual” table as shown in the image is displayed at the bottom of “Administrator Settings”. It will be created.

![Custom table screen](img/table/table_detail17_sample.png)
![Custom table screen](img/table/table_detail17_sample2.png)

#### Add to notification
- If set to YES, a notification setting to notify the authorized user in the system when creating, updating, sharing, or commenting on data is added to the table save.
※ This item is displayed only when creating a new table.  
If you want to change the settings as a [notification](/notify.md) after adding it to the notification, make the settings on the notification screen.

[Custom table screen](img/table/table_detail18.png)

## Authority
Add the users / organizations that you want to allow access to the table to the appropriate permission items.

![Custom table screen](img/table/table_authority.png)
  
- The added user / organization can access the table with the appropriate authority.
- However, users / organizations registered in the menu "System Settings" can also access the table.
- Users / organizations for which permissions are not set in either of the above cannot access the table.

※ For details on setting permissions, see [Roles and Permissions](/permission.md).

## Save
- Click the "Send" button to save the settings. A table is created with the settings.

- If you create a new table, it will move to the [custom column list screen](/column.md) after saving .
Please continue to register custom columns.

## Edit
- Click the "Edit" button of the applicable table displayed in the custom table list.
The screen changes to the edit screen, where you can change the settings.  

![Custom table screen](img/table/table_edit.png)

## Delete
- If you want to delete the table, first go to the edit screen by the same procedure as above.

- Next, click the "Delete" link at the top right of the edit screen.

![Custom table screen](img/table/table_delete.png)  

- A confirmation screen will be displayed as shown in the image below. Enter delete me in the text area and click the confirmation button. The table is deleted.  
**<span style="color: red; ">※ However, tables installed in the system cannot be deleted.</span>**

![Custom table screen](img/table/table_delete2.png)


## Extended settings
You can make advanced settings using multiple columns in a table.  

- Click the "Extended setting" button of the applicable table displayed in the custom table list.  

- Move to the setting screen.

![Custom table screen](img/table/table_extended_setting1.png)  

### Composite unique key setting
By setting multiple columns as unique keys, it is possible to prevent duplicate registration due to specific combinations when registering new data.  

- Select two or three types of columns that you want to prevent duplicate registration by a specific combination.  
- When registering new data, an error will occur if the value to be registered matches the registered value for any of the setting columns.  

Example: In the case of the settings shown in the image below, using the "Next scheduled date" and "Name" as unique keys prevents the same name from being registered multiple times on the same next scheduled date.  
![Custom table screen](img/table/table_extended_setting2.png)

※ If you want to perform duplicate judgment on only one type of column and prevent duplicate registration, set the unique column to YES in the [custom column setting](/column.md).

### Heading display column setting
In the custom column settings, there is an item "Use in label".  
With this setting, you can control the wording to be displayed when displaying search bar candidates or displaying a list of options.  

For example, suppose you have a table called "Customer Information" as shown below.  
Assume that the customer information table has information such as "customer code", "customer name", "phone number", and "mail address".  

![Heading display column setting](img/table/label1.png)    

When you enter a search word in the search bar, search suggestions are displayed, and you want to display it as follows.  
`` (Customer code) (Customer name) ''
![Heading display column setting](img/table/label2.png)    
  
In that case, on the extension setting screen of the custom table, set as follows for the column you want to display as a label.  
![Heading display column setting](img/table/label3.png)  
  
By registering in this way, when entering text in the search bar at the top of the page, it will be displayed like this as a candidate.  
By registering columns in order from the top on the extended setting screen, candidate character strings are displayed in that column order.  
![Heading display column setting](img/table/label5.png)  

If you want to display "E-mail address", please add "E-mail address" column.  
![Heading display column setting](img/table/label4.png)  
![Heading display column setting](img/table/label6.png)  
  
In the custom table settings, there is an item "Display ID on label".
![Heading display column setting](img/table/label7.png)  

If this is set to YES, the word "# (id)" will be added to the beginning of the label.
![Heading display column setting](img/table/label8.png)  

#### Other
- If this heading display column setting is not registered, the value of the first column is displayed in the custom column setting.
- If the value of the first column is empty in the custom column settings, display the ID.
- IDs can be added at the beginning of the label. It cannot be added anywhere else.

### Heading format settings
> This setting appears only if you have enabled [expert mode](/quickstart_more#expert-mode).

By using parameter variables, you can flexibly set the values ​​displayed as headings.  
When expert mode is enabled, format string input items are displayed on the extended setting screen.

![Heading format column setting](img/table/label_format1.png)  

Use [parameter variables](/params) to display the values ​​stored in the data as headings.  
Example: When displaying "User name < admin@admin.admin >" in user information.
${value:user_name}&lt;${value:email}&gt;  
![Heading format column setting](img/table/label_format2.png)  

By inputting in this way, you can set the items to be displayed as headings.
![Heading format column setting](img/table/label_format3.png)  

#### Other
- If you set this heading display format setting, "heading display column setting" will be invalid.
