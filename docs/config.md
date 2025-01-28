# Exment setting value list
Exment (and related libraries) can change internal settings by modifying the ".env" file in the project folder.  

## Setting method
Open the ".env" file from the project folder and add as follows.  
※ If a key with the same name is already registered, rewrite the value.  

~~~
#Example.1
EXMENT_API=false

#Example.2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※Please do not put a space before and after "=".

## List of set values

#### Application language
- Setting key : APP_LOCALE
- Default value ： en
- Role : The language to display in the application.


#### Time zone
- Setting key : APP_TIMEZONE
- Default value ： UTC
- Role : The time zone used by the application. For Japan, enter "Asia / Tokyo".


#### "/ Admin" URL change
- Setting key : ADMIN_ROUTE_PREFIX
- Default value ： admin
- Role : This is the path name when displaying Exment.  
For more details, please see [here](/quickstart_more?Id=url).

#### Change "/ publicform" URI of public form
- Setting key : EXMENT_PUBLICFORM_ROUTE_PREFIX
- Default value ： publicform
- Role : The pathname for displaying the public form. For details, see "Changing the public form included in the URL" [here](/publicform).

#### Enable caching
- Setting key : EXMENT_USE_CACHE
- Default value ： false
- Role : If true, enable caching. Cache master data such as custom tables and columns, views, and workflows.  
Depending on the environment, it may be faster.

#### Manual URL
- Setting key : EXMENT_MANUAL_URL
- Default value : https://exment.net/docs/#/
- Role : Set the manual URL for Exment.


#### Update history default value
- Setting key : EXMENT_REVISION_COUNT
- Default value : 100
- Role : The default value of the update history to be retained when saving data. It is used when creating a new table.


#### Composer path
- Setting key : EXMENT_COMPOSER_PATH
- Default value : (None)
- Role : The path to the composer command. Unless otherwise specified, it is assumed that the environment variable PATH is in the PATH.


#### MySQL path
- Setting key : EXMENT_MYSQL_BIN_DIR
- Default value : (None)
- Role : The path to the mysql command. Unless otherwise specified, it is assumed that the environment variable PATH is in the PATH.


#### Number of search indexes
- Setting key : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- Default value : 20
- Role : The upper limit of the number of search index columns set in each table.  
<span class="red">* Please change the set value at your own risk. The developer has not confirmed the operation with more than 21 cases.</span>


#### IP that allows reverse proxy
- Setting key : ADMIN_TRUST_PROXY_IPS
- Default value : なし
- Role : Click [here](/additional_reverse_proxy) for details.


#### Reverse proxy determination header
- Setting key : ADMIN_TRUST_PROXY_HEADERS
- Default value : なし
- Role : Click [here](/additional_reverse_proxy) for details.


#### Disable Exment standard error handling
- Setting key : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- Default value : false
- Role :  Set to true to disable the error handling provided by the Extension package.


### Login
#### Default login provider display
- Setting key : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Default value : true
- Role : Toggles whether to display the login form using the Exment ID / password. The setting takes effect when using single sign-on. For more information please check [here](/login_sso).

#### SSO login provider string
- Setting key : EXMENT_LOGIN_PROVIDERS
- Default value : (None)
- Role :  Sets the list of provider names used by SSO, separated by commas. For more information please check [here](/login_sso).


#### Login failure count measurement
- Setting key : EXMENT_THROTTLE
- Default value : true
- Role : If true, if login failures continue for a certain number of times, you will not be able to log in until a certain amount of time has passed.  

#### Number of login failures
- Setting key : EXMENT_MAX_ATTEMPTS
- Default value : 5
- Role : The number of login failures until you cannot log in for a certain period of time.  

#### Login failure recovery time (minutes)
- Setting key : EXMENT_DECAY_MINUTES
- Default value : 60
- Role : The time (minutes) before you can log in again if you cannot login. 

#### Log out automatically when you close your browser
- Setting key : EXMENT_SESSION_EXPIRE_ON_CLOSE
- Default value : false
- Role : If true, you will be automatically logged out when you close your browser.

#### Login page header logo unused
- Setting key : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- Default value : false
- Role : If true, do not use headers on the login page, even if the logo is set in the Exment system settings.


### Search
#### Full text match when searching
> It has been changed from the system setting page.


#### With or without filter when transitioning from the search page to the list page
- Setting key : EXMENT_SEARCH_LIST_LINK_FILTER
- Default value : true
- Role : When set to true, when moving from the data search page to the data list page, the list can be displayed while maintaining the entered search conditions as a filter.


#### When searching from the search bar, the file name of the "attached file" of the custom data is searched
- Setting key : EXMENT_SEARCH_DOCUMENT
- Default value : false
- Role : By setting to true, the file name of "Attachment" of custom data can be searched when searching from the search bar.


#### Maximum number of keyword searches
- Setting key : EXMENT_KEYWORD_SEARCH_COUNT
- Default value : 1000
- Role : Maximum number of records to be acquired per table when searching for keywords.


#### Maximum number of related data searches
- Setting key : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Default value : 5000
- Role : Maximum number of records to be acquired per table when searching related data.


#### Maintain view when searching for free words
- Setting key : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- Default value : false
- Role : If true, the currently selected view will be maintained when searching for free words in a table.
(If false, a free word search will be performed in all view.)


### Email / Notification settings
#### Show / hide notification bar at the top right of the page
- Setting key : EXMENT_NOTIFY_NAVBAR
- Default value : true
- Role : If false, the notification icon in the upper right corner of the header will be hidden.

#### Use mail settings from env file
- Setting key : EXMENT_MAIL_SETTING_ENV_FORCE
- Default value : false
- Role : If set to true, the mail settings will be used from the settings in the .env file.  
(If false, the setting value entered on the system setting screen will be used.)

#### E-mail continuous notification ignore time (minutes)
- Setting key : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Default value : 5
- Role : When notifying an email when creating / updating new data, the second and subsequent emails will be skipped if the same data is continuously updated. The time (minutes) to determine the number of consecutive notifications.

#### Email attachment encryption
- Setting key : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Default value : false
- Role : By setting to true, when sending an attachment by email from the screen, the attachment will be zipped and sent.  
The decryption password will be sent separately.

#### If the notification target is a logged-in user, skip the notification
- Setting key : EXMENT_NOTIFY_SKIP_SELF_TARGET
- Default value : true
- Role : If true, at the time of notification, if the notification target is the logged-in user himself, the notification will be skipped. If false, the logged-in user will also be notified.

### API

#### API enabled / disabled
> It has been changed from the system setting page.

#### Standard number of API acquisitions
- Setting key : EXMENT_API_DEFAULT_DATA_COUNT
- Default value ： 20
- Role : The number of data acquisitions when count is not used in API data list acquisition.

#### API list Maximum number of acquisitions
- Setting key : EXMENT_API_MAX_DATA_COUNT
- Default value ： 100
- Role : Maximum number of API data list acquisition that can be acquired at the same time.

#### Maximum number of new APIs created at once
- Setting key : EXMENT_API_MAX_CREATE_COUNT
- Default value ： 100
- Role : The maximum number of new APIs that can be created at the same time.

#### Maximum number of API batch deletions
- Setting key : EXMENT_API_MAX_DELETE_COUNT
- Default value ： 100
- Role : Maximum number of APIs that can be deleted at the same time by batch deletion.

#### Get data label
- Setting key : EXMENT_API_APPEND_LABEL
- Default value ： false
- Role : If true, the label column can be included when acquiring the data list or executing new data creation / update.


### List (grid)

#### Invalid page transition when clicking a line
- Setting key : EXMENT_GRIDROW_SELECT_DISABLED
- Default value : false
- Role : By setting to true, the page transition when clicking a row on the list page is disabled.

#### Edit page transition when a line is clicked
- Setting key : EXMENT_GRIDROW_SELECT_EDIT
- Default value : false
- Role : If true, when you click a row on the list page, you will be taken to the data edit page. (The default is the data details page.)

#### Setting options for the number of items displayed on the custom data list page
- Setting key : EXMENT_GRID_PER_PAGES
- Default value : nothing
- Role : Please enter the setting value for the number of display options on the custom data list page. If multiple, please separate them with commas. example:100,200,500,1000

#### Display custom data copy link
- Setting key : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- Default value : false
- Role : By setting it to true, the copy link will be displayed in the operation field of the list page.



### Custom Data

#### Hide "Table Details" button on custom data page
- Setting key : EXMENT_TABLE_BUTTON_DISABLED
- Default value : false
- Role : By setting true, the "Table Details" button on the custom data page will be hidden.

#### Hide "Table Details" button on custom data page (users only)
- Setting key : EXMENT_TABLE_BUTTON_DISABLED_USER
- Default value : false
- Role : By setting true, the "Table Details" button on the custom data page will be hidden. * Only for general users. The system administrator and the administrator of that table are displayed.

#### Hide "Change View" button on the custom data page (users only)
- Setting key : EXMENT_VIEW_BUTTON_DISABLED
- Default value : false
- Role : By setting to true, the "Change View" button on the custom data page will be hidden.

#### Hide "Change View" button on the custom data page
- Setting key : EXMENT_VIEW_BUTTON_DISABLED_USER
- Default value : false
- Role : By setting to true, the "Change View" button on the custom data page will be hidden. * Only for general users. The system administrator and the administrator of that table are displayed.

#### Disable the data search dialog function of "Select (reference to other table)", "User", and "Organization"
- Setting key : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- Default value : false
- Role : By setting true, the data search dialog function of "Select (reference to other table)", "User" and "Organization" is disabled on the custom data entry page.

#### Number of cases to switch to "Search for choices each time" format for "Select (reference to other tables)", "Users", and "Organization"
- Setting key : EXMENT_SELECT_TABLE_LIMIT_COUNT
- Default value : 100
- Role : On the new custom data creation / editing page, set the number of cases to switch the selected item to the "search for choices each time" format.  

#### Disable the image upload function of the custom column "Editor"
- Setting key : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- Default value : false
- Role : By setting to true, the image upload function in the custom column "Editor" is disabled on the custom data edit screen.

#### Number of custom data attachments that can be uploaded at one time
- Setting key : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- Default value : 5
- Role : The number of custom data attachments that can be uploaded at one time.


#### Always perform physical deletion without using logical deletion
- Setting key : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- Default value : false
- Role : By setting to true, physical deletion is always performed without using logical deletion of custom data.


### Organization settings

#### Perform hierarchical display on the department list page
- Setting key : EXMENT_SHOW_ORGANIZATION_TREE
- Default value : false
- Role : By setting to true, you can display the hierarchy of the organization on the organization list page.

#### Custom data automatic sharing setting-Default value
- Setting key : EXMENT_CUSTOM_VALUE_SAVE_AUTOSHARE_DEFAULT
- Default value : 0
- Role : Default value in "Custom data automatic sharing setting" of custom table setting. Please choose from the following.
    - 0 : Login user only
    - 1 : Login user and lowest organization
    - 2 : Login user and all affiliated organizations

#### Location of the 'custom_value_(table_name)' class
- Setting Key: EXMENT_SHOW_PAGE_CLASS_TYPE
- Default Value: 1
- Role: Configures the insertion position of the "custom_value_(table name)" class. Please select from the following options:
    - 1 OR No Setting: The class will be set in the parent container of optional information such as attachments, comments, etc.
    - 2: The class will be set in the container displaying custom column items.
    - 3: The class will be set in both the above 1 and 2.

### Order setting

#### Sorting order of affiliated organization settings on the user edit page
- Setting key : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- Default value : false
- Role : By setting it to true, the sorting order of the departments will match the sorting order of the default view (of the department) in the belonging department setting of the user edit page. If false, it will be in id order.

#### Sort order of role group settings
- Setting key : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- Default value : false
- Role : By setting it to true, the order of role group settings on the user edit page and organization edit page and the order of the role group list page will match the display order (of role groups). If false, it will be in id order.

#### Custom view sort order
- Setting key : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- Default value : 0
- Role : Set the order of views displayed on the custom view menu button. Please choose from the following.  
0: 1st key: System view/user view, 2nd key: View type, 3rd key: id   
1: 1st key: System view/user view, 2nd key: View type, 3rd key: order   
2: 1st key: system view/user view, 2nd key: order

### Import / Export

#### Disable Import
- Setting key : EXMENT_IMPORT_DISABLED
- Default value : false
- Role : Set to true, to hide the data import function on the list page of all tables.

#### Disable Export
- Setting key : EXMENT_EXPORT_DISABLED
- Default value : false
- Role : Set to true, to hide the data export function on the list page of all tables.

#### Disable Export (view)
- Setting key : EXMENT_EXPORT_VIEW_DISABLED
- Default value : false
- Role : Set to true, to hide the data export (view) function on the list page of all tables.

#### Disable import / export in csv format
- Setting key : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- Default value : false
- Role : Set to true, the csv format will not be displayed from the data import / export button on the list page of all tables.

#### Disable import / export in xlsx format
- Setting key : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- Default value : false
- Role : Set to true, the xlsx format will not be displayed from the data import / export button on the list page of all tables.

#### Add BOM when exporting in csv format
- Setting key : EXMENT_EXPORT_APPEND_CSV_BOM
- Default value : false
- Role : By setting to true, BOM will be added when exporting CSV data. (The characters are not garbled even if opened in Excel.)


### Dashboard

#### Dashboard rows
- Setting key : EXMENT_DASHBOARD_ROWS
- Default value : 4
- Role : Change the number of rows that can be placed on the dashboard.  


#### Disable latest version display of dashboard
- Setting key : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Default value : false
- Role :  If true, disables the "new version is available" display on the dashboard.  

#### Change the color of the dashboard graph display
- Setting key : EXMENT_CHART_BG_COLOR
- Default value : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- Role : You can change the color type of the graph displayed on the dashboard, separated by commas. If you want to display a graph with more than the specified number of colors, specify the colors in a cycle.

\* This setting has been added since v3.4.3. For users who have installed Exment with v3.4.2 or lower, the above settings are fixed.  
To change it, open the "config/extension.php" file and make the following changes.  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### File

#### Prevents anyone other than the uploader from deleting attachments
- Setting key : EXMENT_FILE_DELETE_USERONLY
- Default value : false
- Role : By setting to true, files uploaded on the data detail screen can only be deleted by the uploader.

#### Invalid file drag and drop
- Setting key : EXMENT_FILE_DRAG_DROP_DISABLED
- Default value : false
- Role : Set to true to disable drag and drop display items such as custom column files and image columns.

#### Change the extension displayed on the browser when clicking the attached file
- Setting key : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- Default value : なし
- Role : The extension to be displayed on the browser when the attached file is clicked is described without dots and separated by the extension. (Example: png, jpg, gif)  
- Other special notes : Regarding the behavior of file click, all files were displayed on the browser before, but due to the [indication of the vulnerability](/weakness/20200819_2), the attached file is in the download format.
Due to the above background, <span class="red">please make this setting at your own risk.</span>



### Other

#### Line feed code removal in HTTP response
- Setting key : EXMENT_REMOVE_RESPONSE_SPACE
- Default value : false
- Role : By setting to true, the line feed code in the response will be deleted.

#### User view disabled

> From v3.5.0, it has been changed to change from the system setting page.

#### User dashboard disabled

> From v3.5.0, it has been changed to change from the system setting page.

#### Prevents anyone other than the uploader from deleting attachments
- Setting key : EXMENT_HIDE_HIDDENFIELD
- Default value : false
- Role : By setting to true, the data which is "Hidden field" in the form setting is hidden on the data detail screen.


### For debug and developers

#### Expert mode
- Setting key : EXMENT_EXPART_MODE
- Default value ： false
- Role : True gives you more flexibility and system-specific settings.


#### Debug mode (request value output)
- Setting key : EXMENT_DEBUG_MODE_REQUEST
- Default value ： false
- Role : Set to true to log the request value to the Exment Web service.

#### Debug mode (SQL log output)
- Setting key : EXMENT_DEBUG_MODE_SQL
- Default value ： false
- Role : By setting to true, you can log the SQL statement when executing SQL with Extension.  
\* For development.

#### Debug mode (SQL log output-function display)
- Setting key : EXMENT_DEBUG_MODE_SQLFUNCTION
- Default value ： false
- Role : When executing SQL with Exment, when "EXMENT_DEBUG_MODE_SQL" is true, you can log the caller's function list at the same time as the SQL statement by setting it to true.  
\* For development.

#### Debug mode (Scheduling log output))
- Setting key : EXMENT_DEBUG_MODE_SCHEDULE
- Default value ： false
- Role : By setting to true when scheduling is executed, you can check the scheduling definition and the progress of execution. For details, please check [here](/additional_task_schedule) "Verification when it does not work".
\* For verification.

### 2D Barcode
#### Button Display Name (Japanese)
- **Configuration Key**: EXMENT_TEXT_QR_BUTTON_JA  
- **Default Value**: (None)  
- **Purpose**: Sets the Japanese display name for "2D Barcode" used in creating and downloading 2D barcodes. If not specified, the default is "二次元バーコード".

#### Button Display Name (English)
- **Configuration Key**: EXMENT_TEXT_QR_BUTTON_EN  
- **Default Value**: (None)  
- **Purpose**: Sets the English display name for "2D Barcode" used in creating and downloading 2D barcodes. If not specified, the default is "2D barcode".

### 2D/JAN Barcode
#### Button Display Name (Japanese)
- **Configuration Key**: EXMENT_TEXT_SCAN_BUTTON_JA  
- **Default Value**: (None)  
- **Purpose**: Sets the Japanese display name for the "2D/JAN Barcode" scan button. If not specified, the default is "二次元／JANバーコード".

#### Button Display Name (English)
- **Configuration Key**: EXMENT_TEXT_SCAN_BUTTON_EN  
- **Default Value**: (None)  
- **Purpose**: Sets the English display name for the "2D/JAN Barcode" scan button. If not specified, the default is "2D barcode/JANcode".