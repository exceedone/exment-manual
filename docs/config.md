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

#### Enable caching
- Setting key : EXMENT_USE_CACHE
- Default value ： false
- Role : If true, enable caching. Cache master data such as custom tables and columns, views, and workflows.  
Depending on the environment, it may be faster.


#### Dashboard rows
- Setting key : EXMENT_DASHBOARD_ROWS
- Default value : 4
- Role : Change the number of rows that can be placed on the dashboard.  


#### Disable latest version display of dashboard
- Setting key : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Default value : false
- Role :  If true, disables the "new version is available" display on the dashboard.  


#### Manual URL
- Setting key : EXMENT_MANUAL_URL
- Default value : https://exment.net/docs/#/
- Role : Set the manual URL for Exment.


#### Update history default value
- Setting key : EXMENT_REVISION_COUNT
- Default value : 100
- Role : This is the default value of the update history retained when saving data. Used to create a new table.  


#### MySQL path
- Setting key : EXMENT_MYSQL_BIN_DIR
- Default value : (none)
- Role :  Path to the mysql command. Unless otherwise specified, it is assumed that the environment variable PATH passes.


### Login
#### Default login provider display
- Setting key : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Default value : true
- Role : Switches whether to display the login form using the ID and password of Exment.  
The setting is enabled when using single sign-on. 
See [here](/quickstart_more?Id=singlesign-on) for details.

#### SSO login provider string
- Setting key : EXMENT_LOGIN_PROVIDERS
- Default value : (none)
- Role : Set the comma-separated list of provider names used in SSO.  
See [here](/quickstart_more?Id=singlesign-on) for details.


#### Login failure count measurement
- Setting key : EXMENT_THROTTLE
- Default value : true
- Role : If true, login fails after a certain period of time after a certain number of failed login attempts.  

#### Login failure count
- Setting key : EXMENT_MAX_ATTEMPTS
- Default value : 5
- Role : The number of login failures before a period of inability to log in.  

#### Login failure recovery time (min)
- Setting key : EXMENT_DECAY_MINUTES
- Default value : 60
- Role : The time (in minutes) before you can log in again if you cannot log in.  


### Search
#### Full text match when searching
- Setting key : EXMENT_FILTER_SEARCH_FULL
- Default value : false
- Role : Whether to match all text when searching data. If true, it matches all text, and if false, it matches forward.  
See [here](/search?Id=Switch-supplemental-data-search-to-partial-match) for details.


#### Existence of filter at the time of transition from search screen to list screen
- Setting key : EXMENT_SEARCH_LIST_LINK_FILTER
- Default value : true
- Role : If set to true, when moving from the data search screen to the data list screen, a list can be displayed while maintaining the entered search conditions as a filter.


#### Maximum number of keyword searches
- Setting key : EXMENT_KEYWORD_SEARCH_COUNT
- Default value : 1000
- Role : The maximum number of records to retrieve per table when searching for keywords.


#### Maximum number of related data searches
- Setting key : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Default value : 5000
- Role : Maximum number of records to retrieve per table when searching related data.


### Email settings
#### Use email settings from env file
- Setting key : EXMENT_MAIL_SETTING_ENV_FORCE
- Default value : false
- Role :  If true, the mail settings will be used from the settings in the .env file.  
(If false, use the settings entered on the system setting screen.)

#### Email continuous notification ignore time (minutes)
- Setting key : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Default value : 5
- Role : At the time of e-mail notification for new data creation / update, if the same data is continuously updated, the second and subsequent e-mails will be skipped.  
This is the time (minutes) for determining the number of consecutive notifications.

#### Email attachment encryption
- Setting key : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Default value : false
- Role : By setting to true, when sending an attached file by e-mail from the screen, the attached file is zip encrypted and sent.  
The decryption password will be sent separately.  

### API

#### API valid / invalid
- Setting key : EXMENT_API
- Default value ： false
- Role : By setting to true, you can use the API of Exment. Please check [here](/api) for details.

#### API standard acquisition count
- Setting key : EXMENT_API_DEFAULT_DATA_COUNT
- Default value ： 20
- Role : In API data list acquisition, it is the number of data acquisition when count is not used.  

#### API batch creation limit
- Setting key : EXMENT_API_MAX_CREATE_COUNT
- Default value ： 100
- Role : This is the maximum number of items that can be created at the same time when creating new APIs at once.


### List (grid)

#### Screen transition invalid at line click
- Setting key : EXMENT_GRIDROW_SELECT_DISABLED
- Default value : false
- Role : By setting to true, screen transition when clicking the row of the list screen is disabled.

#### Screen transition invalid at line click
- Setting key : EXMENT_GRIDROW_SELECT_EDIT
- Default value : false
- Role : By setting to true, when you click the row of the list screen, transition to the data editing screen.  
(The default is the data details screen.)


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


### Other

#### Line feed code removal in HTTP response
- Setting key : EXMENT_REMOVE_RESPONSE_SPACE
- Default value : false
- Role : By setting to true, the line feed code in the response will be deleted.

#### User view disabled
- Setting key : EXMENT_USER_VIEW_DISABLED
- Default value : false
- Role : Set to true to prevent general users from creating user views.

#### User dashboard disabled
- Setting key : EXMENT_USER_DASHBOARD_DISABLED
- Default value : false
- Role : If set to true, you will be able to set password complexity, number of valid days, number of comparisons with recently used history, etc.

#### Hide "Hidden fields" on the data details screen
- Setting key : EXMENT_PASSWORD_POLICY
- Default value : false
- Role : By setting to true, the data which is "Hidden field" in the form setting is hidden on the data detail screen.

#### Prevents anyone other than the uploader from deleting attachments
- Setting key : EXMENT_HIDE_HIDDENFIELD
- Default value : false
- Role : By setting to true, the data which is "Hidden field" in the form setting is hidden on the data detail screen.

#### Prevents anyone other than the uploader from deleting attachments
- Setting key : EXMENT_FILE_DELETE_USERONLY
- Default value : false
- Role : By setting to true, files uploaded on the data detail screen can only be deleted by the uploader.

### For debugging and developers

#### Expert mode
- Setting key : EXMENT_EXPART_MODE
- Default value ： false
- Role : True gives you more flexibility and system-specific settings.


#### Debug mode (SQL log output)
- Setting key : EXMENT_DEBUG_MODE
- Default value ： false
- Role : By setting to true, when executing SQL in Exment, you can log SQL statement.  
※ For development.


#### Debug mode (SQL log output-function display)
- Setting key : EXMENT_DEBUG_MODE_SQLFUNCTION
- Default value ： false
- Role : When SQL is executed by Exment, when "EXMENT_DEBUG_MODE" is true, by making it true, the function list of the caller can be output simultaneously with the SQL statement.  
※ For development.
