# Parameter variable list
List of parameters that can be used in the following items.

- mail template
- Document output
- Automatic numbering of custom columns

## Variable list
### Date

| item | Description |
| ---- | ---- |
| ${y} or ${year} | The run-time year is set with four digits. (Example: 2018) |
| ${m} or ${month} | The month at the time of execution is set. (Example: 8) |
| ${m:(integer)} or ${month:(integer)} | The run-time month is set to the specified integer number of digits. (Example: If you enter $ {m: 2}, 08) |
| ${d} or ${day} | The day of the run is set. (Example: 9) |
| ${d:(integer)} or ${day:(integer)} | The day of the run is set to the specified integer number of digits. (Example: If you enter $ {d: 2}, 09) |
| ${h} or ${hour} | The execution time is set. (Example: 7) |
| ${h:(integer)} or ${hour:(integer)} | The runtime is set to the specified number of integer digits. (Example: If you write $ {hour: 2}, 07) |
| ${i} or ${minute} | The minute at the time of execution is set. (Example: 6) |
| ${i:(integer)} or ${minute:(integer)} | The runtime minute is set with the specified integer digits. (Example: If you enter $ {minute: 2}, 6) |
| ${s} or ${second} | The execution time is set. (Example: 5) |
| ${s:(integer)} or ${second:(integer)} | The runtime is set to the specified integer number of digits. (Example: If you write $ {second: 2}, 5)
 |
| ${ymdhms} or ${ymdhis} | yyyymmddhhiiss String(example：20180217112032) |
| ${ymdhm} or ${ymdhi} | yyyymmddhhii String(example：201802171120) |
| ${ymdh} | yyyymmddHH String(example：2018021711) |
| ${ymd} | yyyymmdd String(example：20180217) |
| ${ym} | yyyyMM String(example：201802) |
| ${hms} or ${his} | hhiiss String(example：112032) |
| ${hm} or ${hi} | hhii String(example：1120) |

### System value
| item | Description |
| ---- | ---- |
| ${system:site_name} | System site name |
| ${system:site_name_short} | System site name (abbreviated) |
| ${system:system_mail_from} | System source |
| ${system:system_url} | System home URL |
| ${system:login_url} | System login URL |

### Date
| item | Description |
| ---- | ---- |
| ${id} | The ID of the registered data is set. (Example: 123) |
| ${id:(integer)} | The ID of the registered data is set with the specified integer number of digits. (Example: If you enter $ {id: 5}, 00123) |
| ${suuid} | The suuid (Short UUID. 20-digit random character string) of the registered data is set. |
| ${value_url} | A link to display registered data is set. |
| ${value:(列名)} | The value of the registered data column is set. (Example: When $ {value: user_code} is entered for user data, the user code is set) |

### Individual
Separate variable parameters may be set for each function.  
For a list of individual variable parameters, see the page for each function.

## example
※ When the execution date is August 9, 2018, the target data ID is 100, and the user_code (user code) of the target data is "U12345"
- U-${id:4} → U0100
- ${y}-${m}-${d}-${id} → 2018-08-09-100
- ${y}${m}${d}-${id:5} → 20180809-00100
- ${y:2}${m}${d}-${id:4} → 180809-0100
- ${y}${m}${d}-${value:user_code} → 20180809-U12345
