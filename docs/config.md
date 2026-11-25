# Exment setting value list
In Exment (and its related libraries), you can change the internal settings by rewriting the ".env" file in the project folder.  
This page is a list of the setting values you can use in the ".env" file. For each item, it gives the setting key, the default value and the role.  

## Setting method
Open the ".env" file in the project folder and add a line in the form "setting key=value", as follows.  
※If a key with the same name already exists, rewrite its value.

~~~
#Example.1
EXMENT_API=false

#Example.2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※Please do not put a space before or after "=".

## List of set values

#### Application language
- Setting key : APP_LOCALE
- Default value : en
- Role : The language displayed in the application. For Japanese, enter "ja".


#### Time zone
- Setting key : APP_TIMEZONE
- Default value : UTC
- Role : The time zone used by the application. For Japan, enter "Asia/Tokyo".


#### "/ Admin" URL change
- Setting key : ADMIN_ROUTE_PREFIX
- Default value : admin
- Role : The path name for displaying Exment. Please check [here](/additional_prefix) for details.


#### Change "/ publicform" URI of public form

- Setting key : EXMENT_PUBLICFORM_ROUTE_PREFIX
- Default value : publicform
- Role : The path name for displaying the public form. For details, see "Change "publicform" included in URL" [here](/publicform).


#### Enable caching
- Setting key : EXMENT_USE_CACHE
- Default value : false
- Role : If true, caching is enabled. Master data such as custom tables, columns, views and workflows is cached. Depending on the environment, Exment may become faster.


#### Manual URL
- Setting key : EXMENT_MANUAL_URL
- Default value : https://exment.net/docs/#/
- Role : Sets the URL of the Exment manual.


#### Update history default value
- Setting key : EXMENT_REVISION_COUNT
- Default value : 100
- Role : The default value of the update history kept when data is saved. It is used when a new table is created.


#### Composer path
- Setting key : EXMENT_COMPOSER_PATH
- Default value : (None)
- Role : The path of the composer command. If it is not specified, the command is assumed to be in the environment variable PATH.


#### MySQL path
- Setting key : EXMENT_MYSQL_BIN_DIR
- Default value : (None)
- Role : The path of the mysql command. If it is not specified, the command is assumed to be in the environment variable PATH.


#### Number of search indexes
- Setting key : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- Default value : 20
- Role : The upper limit of the number of search index columns set in each table.  
<span class="red">※Please change this value at your own risk. The developer has not checked the operation with 21 or more.</span>


#### IP that allows reverse proxy
- Setting key : ADMIN_TRUST_PROXY_IPS
- Default value : None
- Role : Please check [here](/additional_reverse_proxy) for details.


#### Reverse proxy determination header
- Setting key : ADMIN_TRUST_PROXY_HEADERS
- Default value : None
- Role : Please check [here](/additional_reverse_proxy) for details.


#### Disable Exment standard error handling
- Setting key : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- Default value : false
- Role : Set to true to disable the error handling added by the Exment package.


### Login
#### Default login provider display
- Setting key : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Default value : true
- Role : Switches whether to display the login form that uses the Exment ID and password. The setting takes effect when single sign-on is used. Please check [here](/login_sso) for details.

#### SSO login provider string
- Setting key : EXMENT_LOGIN_PROVIDERS
- Default value : (None)
- Role : Sets the list of provider names used for SSO, separated by commas. Please check [here](/login_sso) for details.


#### Login failure count measurement
- Setting key : EXMENT_THROTTLE
- Default value : true
- Role : If true, when login fails a certain number of times in a row, you cannot log in until a certain time has passed.  

#### Number of login failures
- Setting key : EXMENT_MAX_ATTEMPTS
- Default value : 5
- Role : The number of login failures before you cannot log in for a certain time.  

#### Login failure recovery time (minutes)
- Setting key : EXMENT_DECAY_MINUTES
- Default value : 60
- Role : The time (minutes) until you can log in again after you became unable to log in. 

#### Log out automatically when you close your browser
- Setting key : EXMENT_SESSION_EXPIRE_ON_CLOSE
- Default value : false
- Role : If true, you are logged out automatically when you close the browser.

#### Login page header logo unused
- Setting key : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- Default value : false
- Role : If true, the header is not used on the login page, even if a logo is set in the Exment system setting.

#### Use two-factor authentication
- Setting key : EXMENT_LOGIN_USE_2FACTOR
- Default value : false
- Role : If true, the "2-factor authentication" settings are displayed on the login setting screen, and two-factor authentication can be used. Please check [here](/login_2factor_setting) for details.

#### Valid period of the two-factor authentication code sent by email (minutes)
- Setting key : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- Default value : 10
- Role : For two-factor authentication by email, the time (minutes) for which the verification code sent by email is valid.

#### Minimum password length (v7.3.0 and later)
- Setting key : EXMENT_PASSWORD_RULE_MIN
- Default value : 8
- Role : The minimum length of a password.

#### Maximum password length (v7.3.0 and later)
- Setting key : EXMENT_PASSWORD_RULE_MAX
- Default value : 64
- Role : The maximum length of a password. It was 32 before v7.3.0.

#### Characters allowed in a password (v7.3.0 and later)
- Setting key : EXMENT_PASSWORD_RULE
- Default value : ^[ -~]+$
- Role : Decides the characters allowed in a password with a regular expression. The default is half-width letters, numbers and symbols.

#### Password policy for a new site (v7.3.0 and later)
- Setting key : EXMENT_PASSWORD_POLICY_NEW_SITE
- Default value : false
- Role : If true, a newly created site starts with "Complex password" and "Have the password changed when logging in for the first time" set to YES, and "Number of password history records" set to 5. The effective days stay 0. A site that already exists is not changed. Please check [here](/login_setting) for details.

#### Disable SSO login settings
- Setting key : EXMENT_CUSTOM_LOGIN_DISABLED
- Default value : false
- Role : If true, the login settings such as SSO are forcibly disabled, and only the login form with the Exment ID and password is displayed. For details, see "Disable SSO login settings" [here](/login_sso).

#### Disable IP filter
- Setting key : EXMENT_DISABLE_IP_FILTER
- Default value : false
- Role : If true, the IP address restriction of the system setting is forcibly disabled. Use it, for example, when you can no longer access Exment because the IP address restriction was set wrongly. Please check [here](/additional_ip_filter) for details.


### Search
#### Full text match when searching
> This is now changed from the system setting screen.


#### With or without filter when transitioning from the search page to the list page
- Setting key : EXMENT_SEARCH_LIST_LINK_FILTER
- Default value : true
- Role : If true, when you move from the "Search All Data" screen or the "Search Relation Data" screen to the data list screen, the list is displayed with the search condition you entered kept as a filter.


#### When searching from the search bar, the file name of the "attached file" of the custom data is searched
- Setting key : EXMENT_SEARCH_DOCUMENT
- Default value : false
- Role : By setting to true, the file names of the "attachments" of custom data are also searched when you search from the search bar.
<span class="red">※If it is true, the full-text search engine (Meilisearch) is not used on the search screen. Please check [here](/additional_meilisearch) for details.</span>


#### Maximum number of keyword searches
- Setting key : EXMENT_KEYWORD_SEARCH_COUNT
- Default value : 1000
- Role : The maximum number of records obtained per table in a keyword search.


#### Maximum number of related data searches
- Setting key : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Default value : 5000
- Role : The maximum number of records obtained per table in a related data search.


#### Maintain view when searching for free words
- Setting key : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- Default value : false
- Role : If true, the view selected at that time is kept in a free word search of a table.
(If false, the free word search is done with the all data view.)



#### About the settings of the full-text search engine (Meilisearch)
The following setting values beginning with "MEILISEARCH_" are the settings for using the full-text search engine "Meilisearch". Please check [here](/additional_meilisearch) for details.
<span class="red">※Among these, we recommend setting "MEILISEARCH_HOST", "MEILISEARCH_KEY", "MEILISEARCH_INDEX", "MEILISEARCH_GLOBAL_SEARCH", "MEILISEARCH_REALTIME_SYNC", "MEILISEARCH_BATCH_SIZE", "MEILISEARCH_REPAIR_ENABLED", "MEILISEARCH_REPAIR_AT" and "MEILISEARCH_FILTER_MODE" from the menu "Admin Setting > System Setting (Detail Setting)". Once that screen is saved, the values on the screen take priority over the ".env" for these items, and changes in the ".env" are no longer reflected. For the points to note when setting them in the ".env", please check [here](/additional_meilisearch?id=setting-the-items-of-the-screen-in-the-env).</span>
※The setting values other than the above can be set only in the ".env".


#### Connection destination of the Meilisearch server
- Setting key : MEILISEARCH_HOST
- Default value : http://127.0.0.1:7700
- Role : The connection destination of the Meilisearch server.


#### Master key of Meilisearch
- Setting key : MEILISEARCH_KEY
- Default value : (None)
- Role : The master key for connecting to Meilisearch. Enter the key generated when Meilisearch was installed.


#### Use Meilisearch when searching
- Setting key : MEILISEARCH_GLOBAL_SEARCH
- Default value : false
- Role : If true, a free word search uses Meilisearch instead of the database.


#### Reflect updates in Meilisearch in real time
- Setting key : MEILISEARCH_REALTIME_SYNC
- Default value : false
- Role : If true, when custom data is created, updated or deleted, the change is reflected in the Meilisearch index.
※To use this setting, the queue has to be set and the queue worker has to be running.


#### Automatic repair of the Meilisearch index
- Setting key : MEILISEARCH_REPAIR_ENABLED
- Default value : false
- Role : If true, the difference between the database and the Meilisearch index is repaired automatically once a day.
※To use this setting, the task schedule has to be set.


#### Execution time of the automatic repair of the Meilisearch index
- Setting key : MEILISEARCH_REPAIR_AT
- Default value : 03:00
- Role : The time at which the automatic repair of the index runs. Enter it in the "HH:MM" format.
※If a format other than "HH:MM" is set, the automatic repair does not run, and a warning is output to the log.


#### Index name of Meilisearch
- Setting key : MEILISEARCH_INDEX
- Default value : exment_global
- Role : The name of the index created in Meilisearch.  
※If you change it, run "php artisan exment:meili-index" and create the index again.  
※When more than one Exment uses one Meilisearch server, give each Exment a different index name. An index used by another Exment cannot be used.  
(The Exment that uses the index is recorded in the index "(index name)__owner", with an identifier generated from "APP_KEY". Therefore, if you change "APP_KEY", it is also treated as another Exment.)


#### Unit of the index creation of Meilisearch
- Setting key : MEILISEARCH_BATCH_SIZE
- Default value : 1000
- Role : The number of documents sent in one request when the index is created.


#### Connection timeout of Meilisearch
- Setting key : MEILISEARCH_CONNECT_TIMEOUT
- Default value : 1.0
- Role : The timeout (seconds) when connecting to the Meilisearch server.


#### Timeout of Meilisearch
- Setting key : MEILISEARCH_TIMEOUT
- Default value : 5.0
- Role : The timeout (seconds) of a request to the Meilisearch server.


#### Wait time after a Meilisearch connection failure
- Setting key : MEILISEARCH_UNREACHABLE_BACKOFF
- Default value : 10
- Role : The time (seconds) before trying to connect again when the Meilisearch server could not be reached. Within this time, Exment does not try to connect to Meilisearch and treats it as an error at once (a search switches to the search by the database). This prevents every process from waiting for the connection timeout while Meilisearch is stopped.  
※If 0 is set, Exment does not wait and tries to connect every time.


#### Matching strategy of the Meilisearch search
- Setting key : MEILISEARCH_MATCHING_STRATEGY
- Default value : all
- Role : The matching condition when you search with more than one word. With all, data containing all the words is searched. With last, when there are few matches, the search drops the conditions in order from the last word.


#### Number of records fetched for the permission filter of Meilisearch
- Setting key : MEILISEARCH_PERMISSION_SCAN_CAP
- Default value : 1000
- Role : The upper limit of the number of records fetched in advance (more than needed), so that the search results can be narrowed down by the permissions of the user.


#### Maximum number of facet values of Meilisearch
- Setting key : MEILISEARCH_MAX_FACET_VALUES
- Default value : 1000
- Role : The upper limit of the number of values fetched per item for narrowing down (facets) the search results.
※If a value lower than 1000 is set, it is treated as 1000.


#### Filter behavior of Meilisearch
- Setting key : MEILISEARCH_FILTER_MODE
- Default value : override
- Role : How the target columns are decided for narrowing down (facets) on the search result screen.
With override, the targets are decided automatically from the column types, then the columns added on the "Search Filter Setting" screen are added and the excluded columns are removed. ("Auto + Custom" on the screen)
With manual, only the columns added on the "Search Filter Setting" screen are the targets. ("Custom only" on the screen)  
※If you change it, the index has to be created again. Run "php artisan exment:meili-index".


#### Use Meilisearch for "Select (select from the list of values of another table)"
- Setting key : MEILISEARCH_SELECT_TABLE
- Default value : false
- Role : If true, Meilisearch is used for the input completion (form and API) of the custom column "Select (From Table)". This setting is independent of "MEILISEARCH_GLOBAL_SEARCH".
※If you set it to true, the way candidates are searched changes from a partial match against the saved value to a prefix match by word.


#### Unit of the index recreation of Meilisearch
- Setting key : MEILISEARCH_REINDEX_CHUNK_SIZE
- Default value : 500
- Role : The number of documents registered per run, when the index is created again because the settings of a custom table or custom column were changed.


#### Upper limit of the saved searches of Meilisearch
- Setting key : MEILISEARCH_SAVED_SEARCH_LIMIT
- Default value : 50
- Role : The maximum number of search conditions that one user can save.


#### Sync queue name of Meilisearch
- Setting key : MEILISEARCH_SYNC_QUEUE
- Default value : default
- Role : The name of the queue that runs the sync process for each custom data record.


#### Reindex queue name of Meilisearch
- Setting key : MEILISEARCH_REINDEX_QUEUE
- Default value : (the same value as MEILISEARCH_SYNC_QUEUE. default in the initial state)
- Role : The name of the queue that runs the process of creating the index again for each table.  
This process is heavy. To run it separately from the sync process for each custom data record, set a name different from MEILISEARCH_SYNC_QUEUE, such as "meili-reindex". In that case, you also need to add that name to "--queue=" of the queue worker.


#### Target language of the Meilisearch search
- Setting key : MEILISEARCH_LOCALES
- Default value : jpn
- Role : The language setting used when Meilisearch splits a sentence into words (tokenization). Enter the ISO-639-3 language codes, separated by commas. (Example: "jpn", "jpn,eng") If it is left empty, this setting is deleted from the index and Meilisearch detects the language automatically.
※This setting requires Meilisearch v1.10 or later. If you change it, run "php artisan exment:meili-settings".


### Email / Notification settings
#### Show / hide notification bar at the top right of the page
- Setting key : EXMENT_NOTIFY_NAVBAR
- Default value : true
- Role : If false, the notification icon at the top right of the header is hidden.

#### Use mail settings from env file
- Setting key : EXMENT_MAIL_SETTING_ENV_FORCE
- Default value : false
- Role : If true, the mail settings are taken from the settings in the .env file.  
(If false, the setting values entered on the system setting screen are used. When "Host Name" is set on the system setting screen, mail is sent by SMTP even if "MAIL_MAILER" in .env is still "log".)  
Please check [here](/mailsend_setting) for details.

#### E-mail continuous notification ignore time (minutes)
- Setting key : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Default value : 5
- Role : In mail notifications for creating and updating data, when the same data is updated several times in a row, the second and later mails are skipped. This is the time (minutes) used to judge such notifications in a row.

#### Email attachment encryption
- Setting key : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Default value : false
- Role : By setting to true, when an attachment is sent by mail from the screen, the attachment is zip-encrypted and sent.  
The password for decryption is sent separately.

#### If the notification target is a logged-in user, skip the notification
- Setting key : EXMENT_NOTIFY_SKIP_SELF_TARGET
- Default value : true
- Role : If true, a notification is skipped when its target is the logged-in user himself or herself. If false, the logged-in user is also notified.

### Workflow

#### Show / hide the pending task icon
- Setting key : EXMENT_WORKFLOW_TASK_NAVBAR
- Default value : true
- Role : If false, the [pending task](/workflow_task) icon at the top right of the header is hidden.  
The pending task list screen can be opened from the URL "/workflow_task".

#### Update interval of the pending task icon (seconds)
- Setting key : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- Default value : 300
- Role : The interval (seconds) at which the count on the pending task icon at the top right of the header is updated automatically. If a value lower than 30 is set, it becomes 30 seconds.  
※Every update checks the data of all workflows. The shorter the interval, the higher the load on the server.

#### Notify the other members of the same organization
- Setting key : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- Default value : true
- Role : When a member of an organization executes a workflow action addressed to that organization, the other members of the same organization are notified by an in-system alert. If false, they are not notified.  
Please check [Pending tasks](/workflow_task?id=notifying-the-other-members-of-the-organization) for details.

#### Show workflow IDs
- Setting key : EXMENT_SHOW_WORKFLOW_ID
- Default value : false
- Role : If true, the ID of the workflow and the IDs of the actions are displayed on the workflow setting screen. Use it when you want to check the IDs for plugins, the API and so on.

### LINE integration

#### Channel access token
- Setting key : LINE_CHANNEL_ACCESS_TOKEN
- Default value : (None)
- Role : The LINE channel access token used by the [LINE integration](/line). The value saved in "LINE Setting" on the system setting screen takes priority.

#### Channel secret
- Setting key : LINE_CHANNEL_SECRET
- Default value : (None)
- Role : The LINE channel secret. The value saved in "LINE Setting" on the system setting screen takes priority.

#### Basic ID of the LINE Official Account
- Setting key : LINE_OA_BASIC_ID
- Default value : (None)
- Role : The basic ID of the LINE Official Account (the ID that starts with "@"). The value saved in "LINE Setting" on the system setting screen takes priority.

#### Time to prevent duplicate LINE notifications (passage of time) (minutes)
- Setting key : LINE_DEDUPE_MINUTES
- Default value : 0
- Role : For LINE notifications whose Notify Trigger is "The Passage of Time": after a LINE message about a data record is sent to a user, a message about the same data is not sent to the same user again for this time (minutes). Messages sent by other notification settings and messages that failed to send also count. If 0, this function is disabled.

#### Validity period of the LINE link code (minutes)
- Setting key : LINE_LINK_CODE_TTL_MINUTES
- Default value : 10
- Role : The validity period (minutes) of the link code used for [linking a LINE account](/line?id=linking-a-line-account).

#### Maximum number of wrong LINE link codes
- Setting key : LINE_LINK_MAX_ATTEMPTS
- Default value : 5
- Role : The number of times a wrong link code can be sent. When this number is exceeded, linking is not possible for a certain time.

#### Period for counting wrong LINE link codes (minutes)
- Setting key : LINE_LINK_ATTEMPT_DECAY_MINUTES
- Default value : 10
- Role : The time (minutes) in which wrong link codes are counted. If wrong codes are sent "LINE_LINK_MAX_ATTEMPTS" times within this time after the first wrong code, linking is not possible until this time has passed.

#### Timeout of LINE communication (seconds)
- Setting key : LINE_HTTP_TIMEOUT
- Default value : 10
- Role : The timeout (seconds) when communicating with the LINE server.

#### URL of the LINE Messaging API
- Setting key : LINE_API_BASE
- Default value : https://api.line.me
- Role : The URL of the LINE Messaging API. Normally, do not change it.

### Safety check

#### URL to get earthquake information
- Setting key : EXMENT_SAFETY_CHECK_FEED_URL
- Default value : https://api.p2pquake.net/v2/history
- Role : The URL of the API from which earthquake information is obtained, for the automatic sending of the [safety check](/safety_check) when an earthquake occurs. Normally, do not change it.

#### Number of earthquake information records to get
- Setting key : EXMENT_SAFETY_CHECK_FEED_LIMIT
- Default value : 10
- Role : The number of the latest earthquake information records obtained in one check (every minute). Set a value from 1 to 100.

### API

#### API enabled / disabled
> This is now changed from the system setting screen.

#### Standard number of API acquisitions
- Setting key : EXMENT_API_DEFAULT_DATA_COUNT
- Default value : 20
- Role : The number of records obtained when count is not used in getting a data list with the API.

#### API list Maximum number of acquisitions
- Setting key : EXMENT_API_MAX_DATA_COUNT
- Default value : 100
- Role : The maximum number of records that can be obtained at one time in getting a data list with the API.

#### Maximum number of new APIs created at once
- Setting key : EXMENT_API_MAX_CREATE_COUNT
- Default value : 100
- Role : The maximum number of records that can be created at one time by the batch creation of the API.

#### Maximum number of API batch deletions
- Setting key : EXMENT_API_MAX_DELETE_COUNT
- Default value : 100
- Role : The maximum number of records that can be deleted at one time by the batch deletion of the API.

#### API Access Rate Limit
※Available from v6.2.4.

- Setting key : EXMENT_API_MAX_RATE_LIMIT
- Default value : 60
- Role : The upper limit of the number of API accesses per minute, for each user (for each IP address if not authenticated). If the limit is exceeded, a 429 error (Too Many Requests) is returned. Please check [here](/additional_429_too_many) for details.

#### Get data label
- Setting key : EXMENT_API_APPEND_LABEL
- Default value : false
- Role : By setting to true, the label column can be included when a data list is obtained, or when data is created or updated.


### List (grid)

#### Invalid page transition when clicking a line
- Setting key : EXMENT_GRIDROW_SELECT_DISABLED
- Default value : false
- Role : By setting to true, the screen transition when a row of the list screen is clicked is disabled.

#### Edit page transition when a line is clicked
- Setting key : EXMENT_GRIDROW_SELECT_EDIT
- Default value : false
- Role : By setting to true, clicking a row of the list screen opens the data edit screen. (The default is the data detail screen.)

#### Setting options for the number of items displayed on the custom data list page
- Setting key : EXMENT_GRID_PER_PAGES
- Default value : None
- Role : Enter the options for the number of items displayed on the custom data list screen. For more than one, separate them with commas. Example: 100,200,500,1000

#### Display custom data copy link
- Setting key : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- Default value : false
- Role : By setting to true, the copy link is displayed in the operation column of the list screen.

#### Screen design
- Setting key : EXMENT_UI_DESIGN
- Default value : None
- Role : Fixes the design of the login screen and the admin screens on the server side. Enter "modern" (Modern) or "classic" (Classic). If set, this value takes priority over "Screen Design" in the [system setting](/system_setting?id=screen-design), and it can no longer be changed on the system setting screen. If not set, "Screen Design" in the system setting (the initial value is "Modern") is followed.

※Available from v7.1.0.

#### Minimum width of the columns on the list page (px)
- Setting key : EXMENT_GRID_MIN_WIDTH
- Default value : 100
- Role : The default minimum width (px) of the columns on the list screen.

#### Maximum width of the columns on the list page (px)
- Setting key : EXMENT_GRID_MAX_WIDTH
- Default value : 300
- Role : The default maximum width (px) of the columns on the list screen.

#### Maximum number of characters displayed on the list page
- Setting key : EXMENT_GRID_MAX_LENGTH
- Default value : 50
- Role : The maximum number of characters displayed for one item on the list screen. For a longer value, the part over this number is left out and "..." is added at the end.


### Custom Data

#### Hide "Table Details" button on custom data page
- Setting key : EXMENT_TABLE_BUTTON_DISABLED
- Default value : false
- Role : By setting to true, the "Table Details" button on the custom data screen is hidden.

#### Hide "Table Details" button on custom data page (users only)
- Setting key : EXMENT_TABLE_BUTTON_DISABLED_USER
- Default value : false
- Role : By setting to true, the "Table Details" button on the custom data screen is hidden. ※For general users only. It is displayed for the system administrator and the administrators of that table.

#### Hide "Change View" button on the custom data page
- Setting key : EXMENT_VIEW_BUTTON_DISABLED
- Default value : false
- Role : By setting to true, the "Change View" button on the custom data screen is hidden.

#### Hide "Change View" button on the custom data page (users only)
- Setting key : EXMENT_VIEW_BUTTON_DISABLED_USER
- Default value : false
- Role : By setting to true, the "Change View" button on the custom data screen is hidden. ※For general users only. It is displayed for the system administrator and the administrators of that table.

#### Disable the data search dialog function of "Select (reference to other table)", "User", and "Organization"
- Setting key : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- Default value : false
- Role : By setting to true, the data search dialog function of "Select (reference to other table)", "User" and "Organization" is disabled on the custom data input screen.

#### Number of cases to switch to "Search for choices each time" format for "Select (reference to other tables)", "Users", and "Organization"
- Setting key : EXMENT_SELECT_TABLE_LIMIT_COUNT
- Default value : 100
- Role : Sets the number of records at which a select item switches to the "Narrow down the choices" format on the screens for creating and editing custom data.  

#### Disable the image upload function of the custom column "Editor"
- Setting key : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- Default value : false
- Role : By setting to true, the image upload function of the custom column "Text Editor" is disabled on the custom data edit screen.

#### Number of custom data attachments that can be uploaded at one time
- Setting key : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- Default value : 5
- Role : The number of files that can be uploaded at one time in the attachment form of custom data.

#### Maximum size of an image pasted into a comment
- Setting key : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- Default value : 10240
- Role : The maximum size (KB) of an image (PNG, JPEG, GIF, WebP) that can be pasted or dragged and dropped into the comment box of data. ※Available from v7.1.0.

#### Hide "Read only" fields on the custom data detail screen
- Setting key : EXMENT_DISABLE_SHOW_FIELD_READONLY
- Default value : false
- Role : By setting to true, the items set to "Read Only" are hidden on the custom data detail screen.

#### Hide "View only" fields on the custom data detail screen
- Setting key : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- Default value : false
- Role : By setting to true, the items set to "View Only" are hidden on the custom data detail screen.

#### Maximum number of characters of the custom columns "Multi-line text" and "Editor"
- Setting key : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- Default value : 63999
- Role : The maximum number of characters of the custom columns "Multiple-Line Text" and "Text Editor" that can be set as the system

#### Always perform physical deletion without using logical deletion
- Setting key : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- Default value : false
- Role : By setting to true, the logical deletion of custom data is not used, and physical deletion is always done.

#### Display of spaces in the custom column "Multiple-Line Text"
- Setting key : EXMENT_TEXTAREA_SPACE_TAG
- Default value : true
- Role : If true, when a value of the custom column "Multiple-Line Text" is displayed on the list screen or the detail screen, each half-width space is replaced with a tag that has a width. Spaces in a row are also displayed with the width as entered. If false, they are not replaced.

#### Disable the relation filter
- Setting key : SELECT_RELATION_LINKAGE_DISABLED
- Default value : false
- Role : By setting to true, the "Relation Filter Setting" of custom forms (the function that narrows down the options of other items when an item is selected) is disabled in all forms.

#### Disable user views for specific tables
- Setting key : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- Default value : (None)
- Role : Enter the names (alphanumeric) of the tables in which user views are not available, separated by commas. (Example: information,contract) In the tables entered, even if user views are enabled in the system setting, only users who have the permission for system views, such as the administrators of the table, can create and edit views.

#### Also get the ID and the data of each item when displaying the calendar view
- Setting key : EXMENT_CALENDAR_DATA_GET_VALUE
- Default value : false
- Role : By setting to true, the ID and the data of each item are also obtained when the custom view is displayed.  
※Set it to true if you want to use the value of each data record when you rewrite the display of the custom view with a [plugin (script)](/plugin_quickstart_script).

#### Maximum number of records fetched by the calendar view
- Setting key : EXMENT_CALENDAR_MAX_SIZE_COUNT
- Default value : 300
- Role : The maximum number of records obtained for the displayed period in the calendar view.

#### Maximum number of records displayed in the kanban view
- Setting key : EXMENT_KANBAN_MAX_SIZE_COUNT
- Default value : 300
- Role : The default maximum number of records displayed in the [kanban view](/view_kanban). It is the initial value of "Max display count" when a new kanban view is created.  
※If "Max display count" is set in the view, the setting of the view takes priority. A large number makes the display slow.

#### Location of the 'custom_value_(table_name)' class
- Setting key : EXMENT_SHOW_PAGE_CLASS_TYPE
- Default value : 1
- Role : Sets where the "custom_value_(table name)" class is inserted. Select from the following.
    - 1 OR no setting: the class is set on the parent container of the option information, such as attachments and comments
    - 2 : the class is set on the container that displays the custom column items
    - 3 : the class is set on both 1 and 2 above

### Organization settings

#### Perform hierarchical display on the department list page
- Setting key : EXMENT_SHOW_ORGANIZATION_TREE
- Default value : false
- Role : By setting to true, the organizations can be displayed as a hierarchy on the organization list page.

#### Depth of the organization hierarchy
- Setting key : EXMENT_ORGANIZATION_DEEPS
- Default value : 4
- Role : The upper limit of the number of levels followed through parent and child organizations. Parent and child organizations are obtained down to this number of levels, for example when permissions are judged.

### Order setting

#### Sorting order of affiliated organization settings on the user edit page
- Setting key : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- Default value : false
- Role : By setting to true, the order of the organizations in the organization setting of the user edit screen follows the order of the default view (of the organization). If false, they are in id order.

#### Sort order of role group settings
- Setting key : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- Default value : false
- Role : By setting to true, the order of the role group settings on the user edit screen and the organization edit screen, and the order of the role group list screen, follow the display order (of the role groups). If false, they are in id order.

#### Custom view sort order
- Setting key : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- Default value : 0
- Role : Sets the order of the views displayed on the custom view menu button. Select from the following.  
0 : 1st key: system view / user view, 2nd key: view type, 3rd key: id  
1 : 1st key: system view / user view, 2nd key: view type, 3rd key: order   
2 : 1st key: system view / user view, 2nd key: order

### Import / Export

#### Disable Import
- Setting key : EXMENT_IMPORT_DISABLED
- Default value : false
- Role : By setting to true, the data import function is hidden on the list screens of all tables.

#### Disable Export
- Setting key : EXMENT_EXPORT_DISABLED
- Default value : false
- Role : By setting to true, the data export function is hidden on the list screens of all tables.

#### Disable Export (view)
- Setting key : EXMENT_EXPORT_VIEW_DISABLED
- Default value : false
- Role : By setting to true, the data export (view) function is hidden on the list screens of all tables.

#### Disable import / export in csv format
- Setting key : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- Default value : false
- Role : By setting to true, the csv format is no longer displayed in the data import / export button on the list screens of all tables.

#### Disable import / export in xlsx format
- Setting key : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- Default value : false
- Role : By setting to true, the xlsx format is no longer displayed in the data import / export button on the list screens of all tables.

#### Add BOM when exporting in csv format
- Setting key : EXMENT_EXPORT_APPEND_CSV_BOM
- Default value : false
- Role : By setting to true, a BOM is added when CSV data is exported. (The characters are not garbled when the file is opened in Excel.)

#### Maximum number of rows for import from the screen
- Setting key : EXMENT_IMPORT_MAX_ROW_COUNT
- Default value : 5000
- Role : The maximum number of rows that can be imported at one time when data is imported from the screen. A file with more rows than this causes an error.  
※Increasing the number of rows may cause a timeout or a shortage of memory. To import a large amount of data, please consider the [bulk insert](/data_bulk_insert).

#### Enable import / export for role group
- Setting key : ROLE_GROUP_IMPORT_EXPORT
- Default value : false
- Role : By setting to true, the data import / export button is displayed on the role group setting screen.  
※This is an extended function for those who know the permission management of Exment well. Be sure to work carefully, for example by taking a backup beforehand.

### Dashboard

#### Dashboard rows
- Setting key : EXMENT_DASHBOARD_ROWS
- Default value : 4
- Role : Changes the number of rows that can be placed on the dashboard.  


#### Disable latest version display of dashboard
- Setting key : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Default value : false
- Role : By setting to true, the latest version notice displayed on the dashboard is disabled.

#### Change the color of the dashboard graph display
- Setting key : EXMENT_CHART_BG_COLOR
- Default value : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- Role : You can change the colors of the graphs displayed on the dashboard, separated by commas. When a graph has more items than the number of colors specified, the colors are used again from the first.

※This setting was added in v3.4.3. For users who installed Exment with v3.4.2 or lower, the setting above is a fixed value.  
To change it, open the "config/exment.php" file and change the description as follows.  

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
- Role : By setting to true, the files uploaded on the data detail screen can be deleted only by the person who uploaded them.

#### Invalid file drag and drop
- Setting key : EXMENT_FILE_DRAG_DROP_DISABLED
- Default value : false
- Role : By setting to true, the drag and drop display items, such as the file and image columns of custom columns, are disabled.

#### Allow deleting attachments even in tables whose deletion is disabled by "Cannot changed from display"
- Setting key : EXMENT_ALLOW_DELETE_ATTACHMENT
- Default value : false
- Role : In a table where "Delete" is checked in "Cannot changed from display" of the custom table setting, the attachments on the data detail screen normally cannot be deleted either. By setting to true, users who can edit the data can delete attachments even in such tables.

#### File save destination
- Setting key : EXMENT_DRIVER_EXMENT, EXMENT_DRIVER_BACKUP, EXMENT_DRIVER_TEMPLATE, EXMENT_DRIVER_PLUGIN
- Default value : local
- Role : Changes the save destination (local, FTP, SFTP, Amazon S3, Azure Blob, etc.) of attachments, backups, templates and plugins, each separately. Please check [here](/additional_file_saveplace) for details, including the setting values needed for each save destination (such as AWS_BUCKET_EXMENT).

#### 7-Zip folder (Windows)
- Setting key : EXMENT_7ZIP_DIR
- Default value : C:\Program Files\7-Zip
- Role : On a Windows server, the folder where 7-Zip is installed. It is used to create password-protected zip files when "Email attachment encryption" (EXMENT_ARCHIVE_MAIL_ATTACHMENT) is used. Enter the folder that contains "7z.exe".

#### Change the extension displayed on the browser when clicking the attached file
- Setting key : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- Default value : None
- Role : Enter the extensions that are displayed in the browser when an attachment is clicked, without dots and separated by commas. (Example: png,jpg,gif)  
- Other special notes : In the past, all files were displayed in the browser when clicked. After a [vulnerability was pointed out](/weakness/20200819_2), attachments are now downloaded.  
Because of this background, <span class="red">please make this setting at your own risk.</span>

#### Validity period of the temporary URL when downloading a file
- Setting key : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- Default value : 15
- Role : The validity period (minutes) of the temporary URL, when the [file save destination](/additional_file_saveplace) is a storage that can issue temporary URLs (signed URLs), such as Amazon S3.  
With such a storage, downloading a file redirects to the temporary URL of the storage, and the browser downloads the file directly from the storage.  
※The validity period is checked when the download starts, so a download is not interrupted even if the validity period passes during the download. However, resuming a download that was interrupted, for example by a communication error, fails if the validity period has passed.



### Public form (Google reCAPTCHA)

#### Score threshold of Google reCAPTCHA v3
- Setting key : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- Default value : 0.5
- Role : The score threshold when Google reCAPTCHA v3 is used in the [public form](/publicform). reCAPTCHA v3 returns a score from 0.0 (very likely a bot) to 1.0 (very likely a human), and a submission whose score is lower than this value becomes an error. Raise the value if spam keeps being sent, and lower it if real users get errors.  
※It is used only when "V3" is selected for Google reCAPTCHA on the system setting screen.  
※If a value outside the range 0 to 1 is set, it is treated as 0.5.

#### Hide "Powered by Exment" in the footer of public forms
- Setting key : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- Default value : false
- Role : By setting to true, "Powered by Exment" displayed in the footer of public forms is hidden.

#### Change the "/publicformapi" URI of the public form API
- Setting key : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- Default value : publicformapi
- Role : The path name of the URL of the API that public forms use internally (for getting options, etc.).

#### IP addresses that skip Google reCAPTCHA
- Setting key : None (set with "recaptcha_skip_ips" in "config/exment.php")
- Default value : [] (None)
- Role : The list of IP addresses for which the Google reCAPTCHA check is not done. Use it, for example, when you check the operation of a public form from inside your company.  
<span class="red">※For submissions from the IP addresses entered here, no reCAPTCHA check is done at all. We recommend not setting it in a production environment.</span>  
※This setting cannot be set in ".env". Open the "config/exment.php" file and write it as follows.  
※If you set "skip-ips" in "config/no-captcha.php" in Exment v6.x or earlier, write it again in this setting in v7.0.0 or later.

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### Other

#### In public forms, allow the initial value of the custom columns "Select (reference to other table)", "User" and "Organization" to be set only by suuid (20-digit random string)

- Setting key : EXMENT_PUBLICFORM_URLPARAM_SUUID
- Default value : false
- Role : For details, see "When you want the initial values of the custom columns "Select (from another table)", "User" and "Organization" to be settable only by suuid (a random string of 20 characters)" [here](/publicform).


#### Line feed code removal in HTTP response
- Setting key : EXMENT_REMOVE_RESPONSE_SPACE
- Default value : false
- Role : By setting to true, the line feed codes in the response are removed.

#### User view disabled

> From v3.5.0, this is changed from the system setting screen.

#### User dashboard disabled

> From v3.5.0, this is changed from the system setting screen.

#### Hide "Hidden field" on the data detail screen
- Setting key : EXMENT_HIDE_HIDDENFIELD
- Default value : true
- Role : By setting to true, data that is a "Hidden Field" in the form setting is hidden on the data detail screen.

#### Demo mode
- Setting key : EXMENT_DEMO_MODE
- Default value : false
- Role : A setting for demo sites that make the administrator login public. If true, even for the system administrator, it stops operations that run code on the server, operations that change the server or other sites, operations that send something outside, and operations that show secret values (uploading and editing the code of plugins, backup, importing templates, the mail, login and API settings, changing passwords, etc.). Mail is only written to the log, and Slack, Teams and LINE messages are not sent. "This is a demo site." is displayed at the top of the screen. Console commands (such as a nightly restore by cron) are not stopped. Do not set it in an environment in normal use.

※Available from v7.1.0.



### For debug and developers

#### Expert mode
- Setting key : EXMENT_EXPART_MODE
- Default value : false
- Role : By setting to true, you can make more flexible settings, meant for people who know the system well.


#### Debug mode (request value output)
- Setting key : EXMENT_DEBUG_MODE_REQUEST
- Default value : false
- Role : By setting to true, the request values sent to the Exment web service are output to the log.  


#### Debug mode (SQL log output)
- Setting key : EXMENT_DEBUG_MODE_SQL
- Default value : false
- Role : By setting to true, the SQL statements are output to the log when Exment runs SQL. ※For development.


#### Debug mode (SQL log output-function display)
- Setting key : EXMENT_DEBUG_MODE_SQLFUNCTION
- Default value : false
- Role : When Exment runs SQL and "EXMENT_DEBUG_MODE_SQL" is true, setting this to true outputs the list of the calling functions to the log together with the SQL statement. ※For development.


#### Debug mode (Scheduling log output))
- Setting key : EXMENT_DEBUG_MODE_SCHEDULE
- Default value : false
- Role : By setting to true, you can check the scheduling definitions and the progress of the run when scheduling is run. For details, see "Checking when it does not work" [here](/additional_task_schedule). ※For verification.

### 2D Barcode
#### Button Display Name (Japanese)
- Setting key : EXMENT_TEXT_QR_BUTTON_JA
- Default value : (None)
- Role : Sets the Japanese display name of "2D barcode" for creating a new 2D barcode and downloading 2D barcodes. If it is not specified, "二次元バーコード" is used.

#### Button Display Name (English)
- Setting key : EXMENT_TEXT_QR_BUTTON_EN
- Default value : (None)
- Role : Sets the English display name of "2D barcode" for creating a new 2D barcode and downloading 2D barcodes. If it is not specified, "2D barcode" is used.

### 2D/JAN Barcode
#### Button Display Name (Japanese)
- Setting key : EXMENT_TEXT_SCAN_BUTTON_JA
- Default value : (None)
- Role : Sets the Japanese display name of "2D barcode/JANcode" on the button for reading 2D/JAN barcodes. If it is not specified, "二次元／JANバーコード" is used.

#### Button Display Name (English)
- Setting key : EXMENT_TEXT_SCAN_BUTTON_EN
- Default value : (None)
- Role : Sets the English display name of "2D barcode/JANcode" on the button for reading 2D/JAN barcodes. If it is not specified, "2D barcode／JANcode" is used.
