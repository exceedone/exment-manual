# Development notes
These are notes for developers.  
They collect specifications and the like that are too detailed for the manual of each screen, but that we want to share among developers.

## Why the permission "Access All Data" cannot be combined with "Edit Personnel Data" and the like
At present, for one table, the permission "Access All Data" cannot be combined with "Edit Personnel Data" or "View Personnel Data".  
The reason is the following specification.

#### Premise
Permissions are merged, and the stronger permission (a permission of the "make it possible" kind) takes priority.  
For example, when "all data can be obtained" and "only the data shared with you can be obtained" are combined, "all data can be obtained" takes priority.

#### Details of the permission "Access All Data"

- When SQL is run, no where clause for data sharing is added, so all data can be obtained.
- The list screen cannot be displayed. Also, the item cannot be displayed in the menu.
- Data cannot be created or edited.

#### Details of the permission "Edit Personnel Data"

- When SQL is run, a where clause by data is applied, so only the data shared with you can be obtained.
- The list screen can be displayed. Also, the item can be displayed in the menu.
- Data can be created, and the data shared with you can be edited.


#### Result
When these two permissions are combined, the details become as follows.

- When SQL is run, no where clause for data sharing is added, so all data can be obtained.
- The list screen can be displayed. Also, the item can be displayed in the menu.
- Data can be created, and the data shared with you can be edited.

In other words, all data is displayed on the list screen, and data can be created and the data shared with you can be edited.  
  
It would be possible to write "on the list screen, do not make all data obtainable; make only the data shared with you obtainable" into each screen. But that process would have to be added to every custom plugin and every other screen, and it could become a vulnerability.  
Also, this situation is exactly the same as combining "View All Data" and "Edit Personnel Data".  
Therefore, at present, the settings do not allow "Access All Data" to be combined with "Edit Personnel Data" and the like.  

#### What "Access All Data" is for
It is mainly for uses like the following.  

- Tax rates  
    → Give the people in charge the permissions "Access All Data" and "Edit All Data", and let them maintain the data as a master.  
    → Give general users only "Access All Data", so that they can get the data as options.




## Specification when custom data is deleted
Reviewed in v4.0.7.

#### On logical deletion
※The data may be restored, so basically things are kept  

- Files of the custom columns "File" and "Image": not deleted
- Attachments: not deleted
- Relations (the child data when the parent data of a 1:n relation is deleted): logically deleted
- Relations (other than that): not deleted
- Permission control: not deleted
- Revisions: not deleted, and a history entry with the deletion date and time is added
- Notifications: sent
- Workflow history: not deleted

#### On permanent deletion
The data is physically deleted

- Files of the custom columns "File" and "Image": deleted
- Attachments: deleted
- Relations: all physically deleted
- Permission control: deleted
- Revisions: deleted
- Notifications: not sent
- Workflow history: deleted

#### On immediate physical deletion
※If the setting value EXMENT_DELETE_FORCE_CUSTOM_VALUE is set to 1, data is physically deleted at once

- Files of the custom columns "File" and "Image": deleted
- Attachments: deleted
- Relations: all physically deleted
- Permission control: deleted
- Revisions: deleted
- Notifications: sent
- Workflow history: deleted



## Why the result of the function getOrganizationIdsForQuery is swapped compared with the actual organizations
The function \Exment::user()->getOrganizationIdsForQuery returns a result that is swapped compared with the organizations the user actually belongs to.  
For example, suppose there is the following organization structure.

```
 Ex. (O):Ogganization, (U):User
 
     (O)Company
         (O)develop-team
             (U) Manager
 
             (O) develop-team1
                  (U) User1
                  (U) User2
             (O) develop-team2
                  (U) User3
```

Here, when the logged-in user is Manager and $filterType is JoinedOrgFilterType::ONLY_UPPER, you might expect (O)develop-team and (O)Company to be returned, but  
**(O)develop-team, (O) develop-team1 and (O) develop-team2 are actually returned.**
  
This is because the purpose of this function is only to get shared data and data the user has permission for; its purpose is not to get the actual organizations.  
For example, with the settings "data A is shared with (O)develop-team1" and "data sharing includes the organizations of the parent levels (JoinedOrgFilterType::ONLY_UPPER)", Manager gets the data shared with (O)develop-team, (O) develop-team1 and (O) develop-team2.  
In this case, for the processing of the query, Manager is regarded as belonging to (O)develop-team, (O) develop-team1 and (O) develop-team2, and the SQL is run.  

Therefore, unlike what the Enum value suggests, the actual result is swapped.


## Loading plugins
Normally, autoload is used to load PHP files.  
It is generated by composer, and program developers and users hardly ever need to think about it.  
  
However, the PHP files installed by a plugin cannot use autoload.  
This is because Exment plugin files can be placed on an external service such as AWS S3 or FTP, and the plugin files themselves may not exist on the server.  
※For details of this function, please check [here](/additional_file_saveplace)  
  
Therefore, plugins are loaded in a special way.  
The details are as follows.  

### Downloading the plugin files (when the plugin files are placed on an external service)
When the plugin files are placed on an external service, they are downloaded.  
The following checks are made, and the files are downloaded only when needed.

- Check whether the target plugin folder on the server, "/storage/app/plugins/(plugin name)", has an "updated_at.txt" file  
→ If not, a download is needed

- Open the "updated_at.txt" file and check the timestamp written in it

- Compare it with the update date and time of the database table "Plugin", and check whether the date and time differ  
→ If they differ, a download is needed

When a download is needed, the plugin files are downloaded from the external service.  
After that, an "updated_at.txt" file is created in the target plugin folder, and the timestamp is written in it.

### Adding the directories to our own ClassLoader
Exment loops over the plugin files and adds the target plugin folder, and the namespace that matches that plugin, to its own \Exceedone\Exment\Services\ClassLoader.

### Running the load
When a class of a plugin is called, our own ClassLoader is called by spl_autoload_register.  
With the namespace of the called class and the target plugin folder as the keys, the matching PHP file is loaded with require_once.  
By this process, even a class that has not been loaded yet is read dynamically and require_once is done.




## Narrowing settings of the column types "Select (From Table)", "User" and "Organization"
On the input screen of custom data, the options displayed for the column types "Select (From Table)", "User" and "Organization" are not always all the records.  
The patterns in which the options are narrowed down are described below.  
  
※As an example for the explanation, suppose the following tables.  

- The displayed table: Contract
- Table 1 referred to by the column type "Select (From Table)": Customer
- Table 2 referred to by the column type "Select (From Table)": Person in charge  
※The Customer table and the Person in charge table have a relation setting of a 1:n parent-child relationship


### Narrowing cases of the column type "Select (From Table)"

#### Permissions of the logged-in user
Only the data of the referenced table (Customer) that the logged-in user has permission to access is displayed.  
Data without permission is not displayed in the options.  

##### What to do for this setting
If the options you expect are not displayed, do one of the following to add the permission.  

- Share the data of the referenced table (Customer) that you want to display in the options with the logged-in user.  
Details: [Data sharing](/data_details?id=data-sharing)

- Add the permission "Edit All Data / View All Data" for "the referenced table (Customer)" to the role group the logged-in user belongs to.  
Details: [Role group](/role_group)


#### The column setting "Filter view"
If the column setting "Filter view" is set, the displayed options are narrowed down according to the filter conditions of that filter view.  
※A filter view is a view for narrowing down the data of the referenced table (Customer).

##### What to do for this setting
If the options you expect are not displayed, do one of the following.  

- Review the conditions of the filter view of the referenced table (Customer) that you want to display in the options.  
Details: [Condition view](/view?id=condition-view)

- Delete the column setting "Filter view".


#### There are 100 or more data records
If the referenced table (Customer) has 100 or more data records, no options are displayed at first.  
When you enter a search word, only the data that matches the search word is displayed as options.   
Also, if the custom column setting "Narrow down the choices" is YES, the options are displayed in this way regardless of the number of data records.  


#### Relation Filter Setting
The custom form setting screen has the "Relation Filter Setting".  
When options in a parent-child relationship are in the same form, selecting the parent option (Customer) narrows down the child options (Person in charge) automatically.  
Details: [Form setting](/form?id=related-refinement-settings)  
 
With this setting, the behavior is as follows.

- The options of the child (Person in charge) when the parent (Customer) is not selected  
→ No options are displayed at all.

- The options of the child (Person in charge) when the parent (Customer) is selected  
→ Of the data of the child (Person in charge), a list of the data whose parent (Customer) value is the value selected in the parent option is displayed.  




### Narrowing cases of the column types "User" and "Organization"

#### Permissions of users and organizations for the table currently displayed
Only the users and organizations that can access the table currently displayed (Contract) are displayed in the options.  
<span class="red">※The permissions of the logged-in user have no effect.</span> The criterion is "whether the user or organization to be displayed in the options has permission for the table currently displayed".  

##### What to do for this setting
If the options you expect are not displayed, do one of the following.  

- In the role group setting, add "the users and organizations you want to display in the options" to a role group that has permission for "the displayed table (Contract)".  
Details: [Role group](/role_group)

- In the custom column setting, set "Display users/organizations without permission" to YES.  
With this setting set to YES, the check "whether the user or organization has permission for the displayed table (Contract)" is no longer made.


#### Settings for external portal sites (when you build a system that users of several organizations log in to)
When users and organizations are displayed on the data list screen and the edit screen, the setting **"display only the organizations the logged-in user belongs to and the users who belong to them"** may be made.  
If this setting is made, when the logged-in user displays the options of organizations and users, only the users and organizations in a parent-child relationship with the logged-in user are displayed.  
Details: [Settings for external portal sites](/multiuser)


#### The column setting "Filter view"
If the column setting "Filter view" is set, the displayed options are narrowed down according to the filter conditions of that filter view.  
※A filter view is a view for narrowing down the data of the referenced table (User).

##### What to do for this setting
If the options you expect are not displayed, do one of the following.  

- Review the conditions of the filter view of the referenced table (User) that you want to display in the options.  
Details: [Condition view](/view?id=condition-view)

- Delete the column setting "Filter view".


#### There are 100 or more data records
If the referenced table (User) has 100 or more data records, no options are displayed at first.  
When you enter a search word, only the data that matches the search word is displayed as options.   
Also, if the custom column setting "Narrow down the choices" is YES, the options are displayed in this way regardless of the number of data records.  


#### Relation Filter Setting
The custom form setting screen has the "Relation Filter Setting".  
When options in a parent-child relationship are in the same form, selecting the parent option (Organization) narrows down the child options (User) automatically.  
Details: [Form setting](/form?id=related-refinement-settings)  
 
With this setting, the behavior is as follows.

- The options of the child (User) when the parent (Organization) is not selected  
→ No options are displayed at all.

- The options of the child (User) when the parent (Organization) is selected  
→ Of the data of the child (User), a list of the data that belongs to the parent (Organization) is displayed.  


## List of screens and functions

### Dashboard
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display dashboard</td>
            <td>Displays all the items set on the dashboard.</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Create Dashboard</td>
            <td>Creates a new dashboard.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Edit dashboard</td>
            <td>Changes the information of a dashboard that has already been created.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Delete dashboard</td>
            <td>Deletes a dashboard that has already been created.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Edit dashboard item</td>
            <td>Changes the contents of one item of the dashboard.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Delete dashboard item</td>
            <td>Deletes the contents of one item of the dashboard.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Chart Type</td>
            <td>Displays the registered data of a summary view as a graph of the set type.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Calendar Type</td>
            <td>Displays the registered data of a calendar view in the format of the set type.</td>
            <td>System Setting</td>
        </tr>
</table>

### System Setting
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>API Available</td>
            <td>Sets whether the API can be used.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Server external communication</td>
            <td>Sets whether server external communication is done.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Role management</td>
            <td>Sets whether permissions can be set for the whole system and for custom tables.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Organization management</td>
            <td>When role management is used, sets whether permissions can be given by specifying an organization.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>System Administrator</td>
            <td>Sets the users who become the system administrators.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Number of displayed data list</td>
            <td>Data is displayed on the list page with the set number of items.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Date and time display format</td>
            <td>Dates and times are displayed in the selected format.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Data search method</td>
            <td>Registered data is searched by the selected method.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Disable Grid Filter</td>
            <td>Hides specific filter items on the data list screen.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Data Submit Redirect</td>
            <td>After custom data is saved, you are redirected to the selected screen.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Use public form</td>
            <td>Sets whether public forms can be used.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Google reCAPTCHA</td>
            <td>Sets the version of Google reCAPTCHA.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Organization Tree Setting</td>
            <td>The organizations of the parent and child levels that are set are included in the range of the role settings and the range of data sharing.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Data Share Setting</td>
            <td>When custom data is newly created, the data is automatically shared with the set range.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>User Organization Filter</td>
            <td>Users and organizations are displayed within the set range.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>View/Dashboard Setting</td>
            <td>Sets whether logged-in users can create dashboards and views.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>System Mail Settings</td>
            <td>Mail can be sent from the system according to the settings.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Slack Setting</td>
            <td>When a Slack notification is sent, a mention addressed to the user ID can be added.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>IP Filter Setting</td>
            <td>Allows communication from the IP addresses that are set.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Send TestMail</td>
            <td>Sends a test mail.</td>
            <td>System Setting</td>
        </tr>
</table>


### Custom table settings
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display custom tables</td>
            <td>Displays a list of the registered custom tables.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Create custom table</td>
            <td>Creates a new custom table.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Edit custom table</td>
            <td>Changes the settings of a custom table that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Custom table data list</td>
            <td>Displays the data list of the custom table.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Custom table extended settings</td>
            <td>Makes the extended settings of the custom table.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Delete custom table</td>
            <td>Deletes a custom table that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Search Enabled</td>
            <td>Makes it possible to search from the search screen.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Use ID as Label</td>
            <td>Displays the id value of the data as a heading item.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Save Only One Record</td>
            <td>Only one data record can be registered.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Use Attachment File</td>
            <td>Files can be attached to each data record.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Use Comment</td>
            <td>Comments can be added to each data record.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Use Data Revision</td>
            <td>Saves the change history of the data when the data is saved</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Data Revision Versioning Count</td>
            <td>Saves the change history of the data up to the set maximum number</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Permission Setting</td>
            <td>All users can edit, view and access the table.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Headline display column setting</td>
            <td>Sets the columns whose text is displayed on the screen when data is selected.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Compound unique key setting</td>
            <td>Data cannot be saved when the values of all the set columns match values that are already registered.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Compare 2 columns</td>
            <td>Compares the two set columns, and data can be saved only when the condition is met.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Data automatic sharing settings</td>
            <td>When data is saved, the data is automatically shared with the users and organizations set in the data.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Sync automatic data Sharing settings When Updating</td>
            <td>When data is shared automatically, users and organizations other than those set in the columns are removed from the sharing settings.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Cannot changed from display</td>
            <td>Makes the set operations impossible to run from the screen.</td>
            <td>Custom Table</td>
        </tr>
</table>

### Custom columns
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display custom columns</td>
            <td>Displays a list of the registered custom columns.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Create custom column</td>
            <td>Creates a new custom column.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Edit custom column</td>
            <td>Changes a custom column that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Delete custom column</td>
            <td>Deletes a custom column that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Search index</td>
            <td>Adds a search index.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Freeword Search Target</td>
            <td>Makes the column a search target when you search by entering text in the search bar.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Unique</td>
            <td>The same value cannot be registered in other data.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Input Only Once</td>
            <td>The value can be entered only once.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>PlaceHolder</td>
            <td>Displays text as guidance in the field before input.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Help</td>
            <td>Displays help text under the field.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Column width</td>
            <td>Specifies the width of the column in the list display.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Suggest Input</td>
            <td>From the values of data already registered in the same custom column, displays the values that match the input as input candidates.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Regular expression</td>
            <td>Validates by a regular expression.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Min Number</td>
            <td>An error occurs when a value lower than this is sent.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Max Number</td>
            <td>An error occurs when a value higher than this is sent.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Calc Formula</td>
            <td>Calculates with ordinary operators and variables.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Select Choice</td>
            <td>Displays the registered options as candidates.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Radio button / check box</td>
            <td>The form input is done in radio button format or check box format.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Make it freely input</td>
            <td>An option that is not registered in the column setting can be entered freely and registered.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Initial value type</td>
            <td>Sets the type of the initial value for new registration.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Select Target Table</td>
            <td>The specified table is displayed as the candidates of the options.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Narrow down the choices</td>
            <td>Searches data by the user's input and narrows down the candidates.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Auto Number Type</td>
            <td>Numbers are assigned by the selected type when data is registered.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Display users/organizations without permission</td>
            <td>Also displays users and organizations that have no access permission for the table.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Approval Multiple Select</td>
            <td>More than one can be selected in image, file and select items.</td>
            <td>Custom Table</td>
        </tr>
</table>


### Custom form settings
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display custom forms</td>
            <td>Displays all the registered forms.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Create custom form</td>
            <td>Creates a new custom form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Edit custom form</td>
            <td>Changes the information of a custom form that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Delete custom form</td>
            <td>Deletes a custom form that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Preview custom form</td>
            <td>Displays a preview of the custom form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Copy custom form</td>
            <td>Copies a form that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Create form priority</td>
            <td>Creates a new form priority setting.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Edit form priority</td>
            <td>Changes a form priority setting that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Delete form priority</td>
            <td>Deletes a form priority setting that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Default Form</td>
            <td>Sets the form as the default form displayed when data is registered.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Detailed Screen Display Method</td>
            <td>The data detail screen is laid out by the set method.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Heading Display Method</td>
            <td>The heading of each item is displayed by the set method.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Form block settings</td>
            <td>Sets the boxes in which form items are placed, from 1 to 4 columns in each row.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Add Box</td>
            <td>Creates a new box in the next row or the next column.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Resize Box</td>
            <td>Changes the size of a box that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Delete Box</td>
            <td>Deletes a box that has already been created.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Label</td>
            <td>Displays text in heading format in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Explain</td>
            <td>Displays text as an explanation in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>HTML</td>
            <td>Displays the set HTML in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Expand HTML</td>
            <td>Displays HTML and the contents set as parameters in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Image</td>
            <td>Displays an image in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Hairline</td>
            <td>Displays a ruled line in the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Form item settings</td>
            <td>Opens the setting dialog and makes the detailed settings as a form item.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Heading display format</td>
            <td>The form item is displayed by the set method.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Field Type</td>
            <td>On the form screen, the item is displayed in the set display format (Read Only, View Only, Hidden Field, or not displayed).</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Data Linkage Setting</td>
            <td>When data of another table is selected in the form, copies the contents of the selected data to another related item.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Relation Filter Setting</td>
            <td>Narrows down the options according to what is selected in another item of the form.</td>
            <td>Form</td>
        </tr>
        <tr>
            <td>Custom Form Priority Setting</td>
            <td>By setting conditions and priorities, switches the form screen used for creating data and for the data detail screen.</td>
            <td>Form</td>
        </tr>
</table>


### Data registration and editing
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display data registration form</td>
            <td>Displays the form for registering data.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Display data list</td>
            <td>Displays a list of the data of the table.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Display data details</td>
            <td>Displays the details of the data that is open on the edit screen.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Delete data</td>
            <td>Deletes the data that is open on the edit screen.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Search</td>
            <td>Opens the table that is the target of the options, and selects data.</td>
            <td>Edit data, access to the data of the target table</td>
        </tr>
        <tr>
            <td>Upload files and images</td>
            <td>You can upload by selecting a file or by dragging and dropping it.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Create child table data</td>
            <td>Creates new data of a child table in a 1:n relation.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Delete child table data</td>
            <td>Deletes the specified data of a child table in a 1:n relation.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Check box: List</td>
            <td>After the data is saved, displays the data list screen.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Check box: View</td>
            <td>After the data is saved, displays the data detail screen.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Check box: Continue creating</td>
            <td>After the data is saved, displays a new data creation screen.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Check box: Continue editing</td>
            <td>After the data is saved, displays the current data edit screen.</td>
            <td>Edit data</td>
        </tr>
</table>

### Data list
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display data list</td>
            <td>Displays a list of the data of the table.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>New</td>
            <td>Creates new data of the table.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Data view</td>
            <td>Selects one of the views already created and displays the data list. You can also create and edit views.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Free word search</td>
            <td>Searches the data list by the word entered in the search bar.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Filter</td>
            <td>Narrows down the contents of the data list.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Import</td>
            <td>Imports data of the displayed table.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Export</td>
            <td>Exports data of the displayed table.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Display deleted data</td>
            <td>Displays a list of the deleted data.</td>
            <td>Show Trashed Data</td>
        </tr>
        <tr>
            <td>Restore</td>
            <td>Restores deleted data.</td>
            <td>Show Trashed Data</td>
        </tr>
        <tr>
            <td>Permanently Delete</td>
            <td>Deletes deleted data completely (physical deletion).</td>
            <td>Show Trashed Data</td>
        </tr>
        <tr>
            <td>Batch update of data</td>
            <td>Selects several data records that are already registered and updates their contents at one time.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Batch deletion of data</td>
            <td>Selects several data records that are already registered and deletes them at one time.</td>
            <td>View data</td>
        </tr>
</table>


### Data details
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display data details</td>
            <td>Displays the data details.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Delete data</td>
            <td>Deletes data that has already been created.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Search Relation Data</td>
            <td>Displays a list of the related data tied to the data.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Notify</td>
            <td>Notifies as a button action.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Execute workflow</td>
            <td>Press an action button to execute the workflow.</td>
            <td>Current Work Users</td>
        </tr>
        <tr>
            <td>Upload attachment</td>
            <td>You can upload a file and attach it to the data.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Delete attachment</td>
            <td>Deletes an attachment that has been uploaded.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>You can comment on the data.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Delete comment</td>
            <td>You can delete a comment that you made on the data yourself.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Update History</td>
            <td>The date the data was updated and the name of the user are displayed as the update history.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Revision</td>
            <td>Compares and restores the data of the update history.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Data sharing</td>
            <td>Shares the saved data with other users and organizations.</td>
            <td>Data sharing</td>
        </tr>
</table>


### Custom view
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display custom views</td>
            <td>Displays all the views that have already been created.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Create custom view</td>
            <td>Creates a new custom view.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Edit custom view</td>
            <td>Changes the information of a view that has already been created.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Delete custom view</td>
            <td>Deletes a view that has already been created.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>List data in this view</td>
            <td>Displays the data list with a view that has already been created or is being edited.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Copy view</td>
            <td>Copies a view with the same settings as one that has already been created.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Summary view</td>
            <td>Groups the registered data and displays summary values such as the total, the count and the maximum.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Calendar view</td>
            <td>Displays the registered data in calendar format.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Filter view</td>
            <td>Can be used as a narrowing condition when the data is referred to as table data.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Default View</td>
            <td>Displayed on the table list screen as the default view.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Use View Infobox</td>
            <td>Places an information box at the top of the view and displays any contents.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Select view columns</td>
            <td>In the data list, the columns are displayed in the set order.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>View Filter</td>
            <td>The data is filtered by the set conditions and displayed in the data list.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Condtion Join</td>
            <td>When more than one data display condition is set, sets whether to judge by all the conditions or by any of the conditions.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Sort data</td>
            <td>Sorts the data based on the specified custom column.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>View filter item setting</td>
            <td>Displays the specified columns as the choices of the "Filter" at the top of the view.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Select grouping columns of a summary view</td>
            <td>Groups in the summary based on the columns chosen as the target.</td>
            <td>View</td>
        </tr>
        <tr>
            <td>Select summary columns of a summary view</td>
            <td>Summarizes by the values of the columns chosen as the target.</td>
            <td>View</td>
        </tr>
</table>


### Mass Update Setting
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Create mass update setting</td>
            <td>Creates a new mass update setting.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Edit mass update setting</td>
            <td>Changes a mass update setting that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Delete mass update setting</td>
            <td>Deletes a mass update setting that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Update timing</td>
            <td>Updates the data at the set timing.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Update Column Setting</td>
            <td>Updates the data with the set target columns and update values.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Update Condition</td>
            <td>Sets the conditions for updating the data.</td>
            <td>Custom Table</td>
        </tr>
</table>


### Workflow
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display workflow settings</td>
            <td>Displays all the workflow settings.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Create workflow setting</td>
            <td>Creates a new workflow setting.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Edit workflow setting</td>
            <td>Changes a workflow setting that has already been created.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Delete workflow setting</td>
            <td>Deletes a workflow setting that has already been created.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Status Setting</td>
            <td>The set types and status names are used in the workflow.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Cannot Edit Data</td>
            <td>Makes the target data impossible to edit while it is in that status.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Action Setting</td>
            <td>The set actions are executed in the workflow.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Workflow Type: Generic</td>
            <td>Makes the workflow usable in more than one table.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Workflow Type: Table Only</td>
            <td>You can change who executes an action by using the custom columns of the table selected at creation.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Work User</td>
            <td>The set users and organizations can execute the action.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Option Setting: Condition to advance to next status</td>
            <td>When the set number of people have executed this action, the workflow proceeds to the next status.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Option Setting: Comment</td>
            <td>A comment can be entered when the action is executed.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Option Setting: Ignore as Work User</td>
            <td>Excludes the "Work User" set in the action from the current work users.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Setting Complete</td>
            <td>Completes the setting of the workflow. After that, some contents cannot be changed or deleted.</td>
            <td>Workflow Settings</td>
        </tr>
        <tr>
            <td>Usage settings</td>
            <td>Sets the workflow to use for each table.</td>
            <td>Workflow Settings</td>
        </tr>
</table>

### Public form settings
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display public form settings</td>
            <td>Displays the whole list of the public forms that have already been set.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Create public form setting</td>
            <td>Creates a new public form.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Edit public form setting</td>
            <td>Changes a public form setting that has already been created.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Delete public form setting</td>
            <td>Deletes a public form setting that has already been created.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Created from template</td>
            <td>Installs a template zip file and creates a new public form.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Publication expiration date</td>
            <td>You can set the period for which the form is public by entering the start and end date and time.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Header settings</td>
            <td>You can set the background color, the logo, the text, etc. of the header part.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Form settings</td>
            <td>You can set the background color of the form part and the outer frame part.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Footer settings</td>
            <td>You can set the background and the text color of the footer part.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Answer confirmation setting</td>
            <td>Displays a screen for checking the input before the data is sent.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Completion setting</td>
            <td>After the data is sent, displays a screen with the set text, URL, etc.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Completion notification (general user)</td>
            <td>Sends a mail to the general user who entered the data, after the registration is complete.</td>
            <td>Public Form Management</td>
        </tr>
         <tr>
            <td>Completion notification (administrator)</td>
            <td>After a general user sends data, sends a notification to the administrator.</td>
            <td>Public Form Management</td>
        </tr>
         <tr>
            <td>Error Settings</td>
            <td>If an error occurs when data is sent, displays the set screen.</td>
            <td>Public Form Management</td>
        </tr>
         <tr>
            <td>Error notification (administrator)</td>
            <td>If an error occurs when data is sent, sends a notification to the administrator.</td>
            <td>Public Form Management</td>
        </tr>
         <tr>
            <td>CSS / Javascript</td>
            <td>You can set CSS and Javascript.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Make the initial value settable from the URL</td>
            <td>The values of the query string of the URL can be set as the initial values of the form.</td>
            <td>Public Form Management</td>
        </tr>
         <tr>
            <td>Google analytics</td>
            <td>You can set Google Analytics.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Use Google reCAPTCHA</td>
            <td>You can set Google reCAPTCHA.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Preview</td>
            <td>Displays a preview of the open public form.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Activate</td>
            <td>The open public form is activated and can be used.</td>
            <td>Public Form Management</td>
        </tr>
        <tr>
            <td>Template export</td>
            <td>Exports the open public form as a template.</td>
            <td>Public Form Management</td>
        </tr>
</table>

### Template
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Template - Export</td>
            <td>Exports the table, column and form information registered in the system.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Template - Import</td>
            <td>Imports exported Exment template information into this system.</td>
            <td>System Setting</td>
        </tr>
</table>


### Backup / Restore
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Backup</td>
            <td>Backs up the database and the various files.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Manual backup</td>
            <td>Backs up by hand, by pressing a button.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Auto Backup</td>
            <td>Backs up automatically at a fixed time.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Restore</td>
            <td>Restores the data.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Restore: select from the backup list</td>
            <td>Selects a file from the list of past backups and runs the restore.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Restore: Upload</td>
            <td>Uploads a backup file saved locally and runs the restore.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Delete</td>
            <td>Deletes a backup file that has already been created.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Edit File Name</td>
            <td>Changes the file name of a backup file that has already been created.</td>
            <td>System Setting</td>
        </tr>
        <tr>
            <td>Download</td>
            <td>Downloads a backup file that has already been created to your local computer.</td>
            <td>System Setting</td>
        </tr>
</table>

### User
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display users</td>
            <td>Displays a list of the users that have already been created.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Create User</td>
            <td>Creates a new user.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Edit user</td>
            <td>Changes the information of a user that has already been created.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Delete user</td>
            <td>Deletes a user that has already been created.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Login Authorization Granted</td>
            <td>The user can log in to the system.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Auto-Create Password</td>
            <td>Generates a password automatically and sends a mail to the user.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Change Password at First Login</td>
            <td>When the user logs in for the first time, displays the screen for changing the password.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Send User Info</td>
            <td>Sends a mail with the user information to the user.</td>
            <td>Edit data</td>
        </tr>
</table>

### Organization
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display organizations</td>
            <td>Displays a list of the organizations that have already been created.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Create organization</td>
            <td>Creates a new organization.</td>
            <td>View data</td>
        </tr>
        <tr>
            <td>Edit organization</td>
            <td>Changes the information of an organization that has already been created.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Delete organization</td>
            <td>Deletes an organization that has already been created.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>Parent organization</td>
            <td>The set organization becomes the parent organization.</td>
            <td>Edit data</td>
        </tr>
        <tr>
            <td>User</td>
            <td>The selected users belong to the organization.</td>
            <td>Edit data</td>
        </tr>
</table>


### Role group
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display role groups</td>
            <td>Displays a list of the role groups that have already been created.</td>
            <td>Authority setting change, User/organization management</td>
        </tr>
        <tr>
            <td>Create role group</td>
            <td>Creates a new role group.</td>
            <td>Manage the entire role group</td>
        </tr>
        <tr>
            <td>Permission Setting</td>
            <td>Sets the permissions given to the role group.</td>
            <td>Authority setting change</td>
        </tr>
        <tr>
            <td>User/organization setting</td>
            <td>Sets the users and organizations to which the permissions are given.</td>
            <td>User/organization management</td>
        </tr>
        <tr>
            <td>Delete role group</td>
            <td>Deletes a role group that has already been created.</td>
            <td>Manage the entire role group</td>
        </tr>
</table>


### Notification settings
<table class="Funclist">
        <tr>
            <th style="width:30%">Function name</th>
            <th style="width:45%">Summary</th>
            <th style="width:25%">Permission</th>
        </tr>
        <tr>
            <td>Display notification settings</td>
            <td>Displays a list of the notification settings that have already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Create notification setting</td>
            <td>Creates a new notification setting.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Edit notification setting</td>
            <td>Changes the information of a notification setting that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Delete notification setting</td>
            <td>Deletes a notification setting that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Copy notification setting</td>
            <td>Copies a notification setting that has already been created.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Active Flg</td>
            <td>Changes the state of the notification.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Trigger</td>
            <td>Sets the condition for notifying.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Target view</td>
            <td>The data of the target table is narrowed down by specifying a filter view.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify Target Date Column</td>
            <td>The selected date or date and time field is used to judge whether to notify.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notification date</td>
            <td>Notifies on the date entered.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Before and After Notification</td>
            <td>Notifies the number of days before or after the field.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notification Time</td>
            <td>Notifies at the set time.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify Trigger Setting</td>
            <td>Notifies with the contents set as the condition.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify the worker</td>
            <td>Also notifies the logged-in user who did the work.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify Action</td>
            <td>Notifies by the set method.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify Target</td>
            <td>Notifies the set targets.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Destination email address</td>
            <td>Notifications are sent to the specified mail address.</td>
            <td>Custom Table</td>
        </tr>
        <tr>
            <td>Notify Mail Template</td>
            <td>The notification is sent with the selected template.</td>
            <td>Custom Table</td>
        </tr>
</table>

