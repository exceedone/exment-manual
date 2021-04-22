# Parameter variable list
List of parameters that can be used in the following items.

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
- Source display name for sending emails

## Variable list
### Date
The following example is when the execution date and time is "2018/02/17 11:20:32".

| item | Description |
| ---- | ---- |
| ${y} or ${year} | The run-time year is set with four digits. (example: 2018) |
| ${m} or ${month} | The month at the time of execution is set. (example: 8) |
| ${m:(integer)} or ${month:(integer)} | The run-time month is set to the specified integer number of digits. (example: If you enter $ {m: 2}, 08) |
| ${d} or ${day} | The day of the run is set. (example: 9) |
| ${d:(integer)} or ${day:(integer)} | The day of the run is set to the specified integer number of digits. (example: If you enter $ {d: 2}, 09) |
| ${h} or ${hour} | The execution time is set. (example: 7) |
| ${h:(integer)} or ${hour:(integer)} | The runtime is set to the specified number of integer digits. (example: If you write $ {hour: 2}, 07) |
| ${i} or ${minute} | The minute at the time of execution is set. (example: 6) |
| ${i:(integer)} or ${minute:(integer)} | The runtime minute is set with the specified integer digits. (example: If you enter $ {minute: 2}, 6) |
| ${s} or ${second} | The execution time is set. (example: 5) |
| ${s:(integer)} or ${second:(integer)} | The runtime is set to the specified integer number of digits. (example: If you write $ {second: 2}, 5) |
| ${ymdhms} or ${ymdhis} | yyyymmddhhiiss String(example：20180217112032) |
| ${ymdhm} or ${ymdhi} | yyyymmddhhii String(example：201802171120) |
| ${ymdh} | yyyymmddHH String(example：2018021711) |
| ${ymd} | yyyymmdd String(example：20180217) |
| ${ym} | yyyyMM String(example：201802) |
| ${hms} or ${his} | hhiiss String(example：112032) |
| ${hm} or ${hi} | hhii String(example：1120) |
| ${now} | The execution date and time is output in yyyymmddhhiiss format. (example: 20180217112032) |
| ${now:(format)} | The execution date and time is output in the specified format. <a href="https://www.php.net/manual/function.date.php" target="_blank">Click here</a> for the format.<br />(example: If you enter ${now: y} , 18) |

### System value
| item | Description |
| ---- | ---- |
| ${system:site_name} | System site name |
| ${system:site_name_short} | System site name (abbreviated) |
| ${system:system_mail_from} | System source |
| ${system:system_url} | System home URL |
| ${system:login_url} | System login URL |

### Data
| item | Description |
| ---- | ---- |
| ${id} | The ID of the registered data is set. (example: 123) |
| ${id:(integer)} | The ID of the registered data is set with the specified integer number of digits. (example: If you enter $ {id: 5}, 00123) |
| ${suuid} | The suuid (Short UUID. 20-digit random character string) of the registered data is set. |
| ${created_user} | The user name that registered the data is set. (example: administrator) |
| ${updated_user} | The user name that updated the data is set. (example: User A) |
| ${created_at} | The date and time when the data was registered is set. (example: 2020/08/06 10:00:00) |
| ${updated_at} | The date and time when the data was updated is set. (example: 2020/08/06 14:00:00) |
| ${value_url} | A link to display registered data is set. |
| ${value:(column name)} | The value of the registered data column is set. (example: When ${value:user_code} is entered for user data, the user code is set) |

### Data(Options)
You can add options to the parameter by filling like ${value:(column name)/(Option Key 1)=(Option Value 1)}. If there are more than one, separate them with commas.  
example:
- ${value:mitsumori_date/format="Y"}
- ${value:mitsumori_price/disable_number_format=1,disable_currency_symbol=1}

| Option Key | Description |
| ---- | ---- |
| $ {value: (column name) / format = "(date format)"} | When the column type is "date" or "datetime", the value of the registered data column is converted to format and displayed.<br />(example 1: If you have a "Contract Date (contract_date)" column in the "Contract Information (contract)" table and you want to display the contract year, $ {value: contract_date / format = "Y"})<br />(example 2: "Contract" If you have a "contract_date" column in the "contract" table and want to display it in "yyyy/mm/dd" format, $ {value: contract_date / format = "Y/m/d"}) |
| ${value:(column name)/disable_number_format=1} | When the column type is "integer", "decimal", or "currency", the numeric comma character string setting is disabled.|
| ${value:(column name)/disable_currency_symbol=1} | When the column type is "Currency", the currency display format setting is disabled.|

### Relations, Related data
| item | Description |
| ---- | ---- |
| $ {select_table: (column name). (Column name of referenced table)} | If the column corresponding to "Column name" is "Choice (select from the list of values ​​in other tables)", "User", or "Organization", the value of the referenced column is set.<br />(example: If you have a Client column in the contract table and you are referencing the client table, you can set it to $ {select_table: client.client_code}. Can display the customer code (client_code) in the "Customer Information (client)" table)|
| $ {parent: (column name of referenced table)} | Sets the value of the column in the parent table.<br />(example: When referring to the contract code (contract_code) of the parent "contract information (contract)" table from the "contract detail information (contract_detail)" table, if you enter $ {parent: contract_code}, the contract code will be set) |

### Individual
Separate variable parameters may be set for each function.  
For a list of individual variable parameters, see the page for each function.

#### Notification
It can be used to send notifications to users via email or in-system alerts.

| item | Description |
| ---- | ---- |
| ${user:user_name} | User name of the user to whom the mail is sent |
| ${user:user_code} | User code of the user to whom the email is sent |
| ${user:email} | E-mail address of the user to whom the e-mail is sent |

#### Password Reset
It can be used only when sending a password reset email.

| item | Description |
| ---- | ---- |
| ${system:password_reset_url} | System password reset URL |
| ${user:password} | Login password of the user to whom the email is sent |

#### Public Form
Only public form notifications are available.

| item | Description |
| ---- | ---- |
| ${publicform:public_form_view_name} | Public form display name |
| ${publicform:inputs} | Public form user input value |

#### Public form (when an error occurs)
Only notifications when a public form error occurs are available.

| item | Description |
| ---- | ---- |
| ${error:message} | Public form error summary |
| ${error:stacktrace} | Public form error details |

## example
※ When the execution date is August 9, 2018, the target data ID is 100, and the user_code (user code) of the target data is "U12345"
- U-${id:4} → U0100
- ${y}-${m}-${d}-${id} → 2018-08-09-100
- ${y}${m}${d}-${id:5} → 20180809-00100
- ${y:2}${m}${d}-${id:4} → 180809-0100
- ${y}${m}${d}-${value:user_code} → 20180809-U12345
