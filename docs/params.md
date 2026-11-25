# Parameter variable list
A list of the "parameter variables", which are replaced by actual values at run time. They are written in the form "${variable name}" ([examples](/params?id=example)).
They can be used in the following items.

- Notification template
    - New data creation / update, etc.
    - Elapsed time
    - Button
    - Workflow
    - Create new user
    - User password reset
    - Notification of completion of registration of public form (user / administrator), error notification
- Document output
- Automatic numbering of custom columns
- Sender display name for sending emails

## Variable list
### Date
The following examples are for an execution date and time of "2018/02/17 11:20:32".

| Item | Description |
| ---- | ---- |
| ${y} or ${year} | The year at run time is set, in 4 digits. (Example: 2018) |
| ${m} or ${month} | The month at run time is set. (Example: 2) |
| ${m:(integer)} or ${month:(integer)} | The month at run time is set, with the specified number of digits. (Example: 02 when ${m:2} is written) |
| ${d} or ${day} | The day at run time is set. (Example: 17) |
| ${d:(integer)} or ${day:(integer)} | The day at run time is set, with the specified number of digits. (Example: 17 when ${d:2} is written) |
| ${h} or ${hour} | The hour at run time is set. (Example: 11) |
| ${h:(integer)} or ${hour:(integer)} | The hour at run time is set, with the specified number of digits. (Example: 11 when ${hour:2} is written) |
| ${i} or ${minute} | The minute at run time is set. (Example: 20) |
| ${i:(integer)} or ${minute:(integer)} | The minute at run time is set, with the specified number of digits. (Example: 20 when ${minute:2} is written) |
| ${s} or ${second} | The second at run time is set. (Example: 32) |
| ${s:(integer)} or ${second:(integer)} | The second at run time is set, with the specified number of digits. (Example: 32 when ${second:2} is written) |
| ${ymdhms} or ${ymdhis} | yyyymmddhhiiss string (Example: 20180217112032) |
| ${ymdhm} or ${ymdhi} | yyyymmddhhii string (Example: 201802171120) |
| ${ymdh} | yyyymmddHH string (Example: 2018021711) |
| ${ymd} | yyyymmdd string (Example: 20180217) |
| ${ym} | yyyyMM string (Example: 201802) |
| ${hms} or ${his} | hhiiss string (Example: 112032) |
| ${hm} or ${hi} | hhii string (Example: 1120) |
| ${now} | The execution date and time is output in the yyyymmddhhiiss format. (Example: 20180217112032) |
| ${now:(format)} | The execution date and time is output in the specified format. For the format, see <a href="https://www.php.net/manual/function.date.php" target="_blank">here</a>.<br />(Example: 18 when ${now:y} is written) |

### System value
| Item | Description |
| ---- | ---- |
| ${system:site_name} | The site name of the system |
| ${system:site_name_short} | The site name of the system (short) |
| ${system:system_mail_from} | The sender of the system |
| ${system:system_url} | The home URL of the system |
| ${system:login_url} | The login URL of the system |

### Table
| Item | Description |
| ---- | ---- |
| ${table_name} | The table name (alphanumeric) of the data is set. (Added in v4.2.7) |
| ${table_view_name} | The table display name of the data is set. (Added in v4.2.7) |

### Data
| Item | Description |
| ---- | ---- |
| ${id} | The ID of the registered data is set. (Example: 123) |
| ${id:(integer)} | The ID of the registered data is set, with the specified number of digits. (Example: 00123 when ${id:5} is written) |
| ${suuid} | The suuid (Short UUID, a random string of 20 characters) of the registered data is set. |
| ${created_user} | The name of the user who registered the data is set. (Example: Administrator) |
| ${updated_user} | The name of the user who updated the data is set. (Example: User A) |
| ${created_at} | The date and time when the data was registered is set. (Example: 2020/08/06 10:00:00) |
| ${updated_at} | The date and time when the data was updated is set. (Example: 2020/08/06 14:00:00) |
| ${value_url} | The link that shows the registered data is set. |
| ${value:(column name)} | The value of the column of the registered data is set.<br />(Example: when ${value:user_code} is written for user data, the user code is set) |

#### Data(Options)
You can add options to a parameter by writing it like "${value:(column name)/(option key 1)=(option value 1)}". If there are several options, separate them with commas.
Examples:
- ${value:mitsumori_date/format="Y"}
- ${value:mitsumori_price/disable_number_format=1,disable_currency_symbol=1}

| Option Key | Description |
| ---- | ---- |
| ${value:(column name)/format="(date format)"} | When the column type is "Date" or "Date and Time", the value of the column of the registered data is shown converted to the format.<br />(Example 1: the "contract information (contract)" table has a "contract date (contract_date)" column and you want to show the contract year: ${value:contract_date/format="Y"})<br />(Example 2: the "contract information (contract)" table has a "contract date (contract_date)" column and you want to show it in the "yyyy/mm/dd" format: ${value:contract_date/format="Y/m/d"})|
| ${value:(column name)/disable_number_format=1} | When the column type is "Integer", "Decimal" or "Currency", the comma formatting of numbers is disabled.|
| ${value:(column name)/disable_currency_symbol=1} | When the column type is "Currency", the currency display format setting (yen mark, $, etc.) is disabled.|


### Relations, Related data
| Item | Description |
| ---- | ---- |
| ${select_table:(column name).(column name of the referenced table)} | When the column of "column name" is "Select (From Table)", "User" or "Organization", the value of the column of the referenced table is set.<br />   (Example: when the "contract information (contract)" table has a "customer (client)" column that refers to the "customer information (client)" table, setting ${select_table:client.client_code} shows the customer code (client_code) of the "customer information (client)" table) |
| ${parent:(column name of the referenced table)} | The value of the column of the parent table is set.<br />(Example: to refer, from the "contract detail information (contract_detail)" table, to the contract code (contract_code) of its parent "contract information (contract)" table, write ${parent:contract_code} and the contract code is set) |


### Individual
Some functions have variable parameters that can be used only in that function.
Below are the functions and screens, and the parameters that can be used in each.

#### Notification
These can be used when a notification is sent to users by email or by an in-system alert.

| Item | Description |
| ---- | ---- |
| ${user:user_name} | The user name of the user the email is sent to |
| ${user:user_code} | The user code of the user the email is sent to |
| ${user:email} | The email address of the user the email is sent to |

#### Notification(Attachment file)
When a parameter is set by the following rules in the "Custom attachments" column of the notification template, the attachment registered in that custom column is sent to the user at the time of an email notification.
For details, see [Attachments and custom attachments](/mail).
Note: currently this works only for email notifications.

| Item | Description |
| ---- | ---- |
| ${file:(custom column name)} | The attachment registered in a custom column of the type "File" or "Image" |
| ${file:select_table:(custom column name of the select column).(file column name of the referenced table)} | The attachment registered in a "File" or "Image" column of the data selected in a custom column "Select (From Table)".<br/>Example: ${file:select_table:customer.contract_file} |
| ${documents} | The attachments registered for the data details screen (the place shown in the image of the page linked above) |

#### Login user
These can be used only while logged in. They cannot be used for a notification by a batch, etc.

| Item | Description |
| ---- | ---- |
| ${login_user:user_name} | The user name of the login user |
| ${login_user:user_code} | The user code of the login user |
| ${login_user:email} | The email address of the login user |
| ${login_user:(column name)} | The value of the specified column of the login user is set |

#### Password Reset
These can be used only when the password reset email is sent.

| Item | Description |
| ---- | ---- |
| ${system:password_reset_url} | The password reset URL of the system |
| ${user:password} | The login password of the user the email is sent to |

#### Public Form
These can be used only in the notifications of a public form.

| Item | Description |
| ---- | ---- |
| ${publicform:public_form_view_name} | The display name of the public form |
| ${publicform:inputs} | The values the user entered in the public form |

#### Public form (when an error occurs)
These can be used only in the notification sent when an error occurs in a public form.

| Item | Description |
| ---- | ---- |
| ${error:message} | The summary of the public form error |
| ${error:stacktrace} | The details of the public form error |


#### Plugin (document output)

| Item | Description |
| ---- | ---- |
| ${value_image:(column name)} | When the type of the column of "column name" is "Image", the image is output to the Excel file. |
| ${value_image:(column name)/width=(size, integer),height=(size, integer)} | To specify the width or the height of the output image, enter the options. You can also specify only one of width and height. |


## example
Note: when the execution date is 2018/8/9, the ID of the target data is 100 and the user_code (user code) of the target data is "U12345"
- U-${id:4} → U-0100
- ${y}-${m:2}-${d:2}-${id} → 2018-08-09-100
- ${y}${m:2}${d:2}-${id:5} → 20180809-00100
- ${now:y}${m:2}${d:2}-${id:4} → 180809-0100
- ${y}${m:2}${d:2}-${value:user_code} → 20180809-U12345
