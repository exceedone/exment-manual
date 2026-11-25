# Plugin (script)
This plugin runs your own script (javascript) on the screens of Exment.
There are seven triggers that start a script.

| Trigger | When it starts |
| ---- | ---- |
| **When a screen is loaded** | When a screen of Exment has finished loading. Note: it is loaded every time, on each screen transition. |
| **When a screen is loaded (first time)** | When a screen of Exment has finished loading. Note: it is loaded only once, at the first login or after a refresh with F5. |
| **When the data list is shown** | When the data list screen has finished loading |
| **When the data details are shown** | When the data details screen has finished loading |
| **When the data create / edit screen is shown** | When the data create / edit screen has finished loading |
| **When the dashboard is loaded** | When a dashboard box has finished loading |
| **When a calendar view item is loaded** | When each item is loaded in the calendar view. You can change the background color and the text color. |

## How to make
Here, as a sample, we make a script that sets the address automatically.
When "Zip code 1" and "Zip code 2" are entered on the edit screen of the "Basic information" data, "Prefecture", "Address" and "Address (after building)" are set automatically from the 7 digits of the zip code.
![Script](img/plugin/plugin_script1.png)  

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "Address set",
    "description": "Set the address on the basic information screen.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- Enter plugin_name in single-byte alphanumeric characters.
- uuid is a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter script for plugin_type.  
- (Optional) Enter cdns when you load related libraries from a CDN. Write the full paths, http or https, as an array.

### create js file
- Create a js file like the one below. You can give it any name in single-byte alphanumeric characters. In this sample it is "script.js".

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(ev){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- The events are called with jquery.  
- The part "exment:form_loaded" defines the event. The event names currently defined in Exment are as follows.
    - **exment:loaded** : The trigger starts when a screen of Exment has finished loading. Note: it is loaded every time, on each screen transition.  
    - **exment:first_loaded** : The trigger starts when a screen of Exment has finished loading. Note: it is loaded only once, at the first login or after a refresh with F5.  
    - **exment:list_loaded** : The event runs when the data list screen has finished loading.  
    - **exment:show_loaded** : The event runs when the data details screen has finished loading.  
    - **exment:form_loaded** : The event runs when the data create / edit screen has finished loading.
    - **exment:dashboard_loaded** : The event runs when a dashboard box of the top screen has finished loading. Note: it runs when each dashboard box has finished loading, as many times as there are dashboard boxes.  
    - **exment:calendar_bind** : The trigger starts when each item is loaded in the calendar view. You can change the background color and the text color.  
- Put the script you made in the "public" folder.  
You can put several scripts, as long as their extension is "js". If related libraries are needed, put them all in the folder.  
This sample also has a js file that is a customized [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io).

### Compress to zip
Compress into a zip.  
The zip file name should be "(plugin_name).zip".  
- SetAddress.zip
    - config.json
    - public folder
        - script.js
        - ajaxzip3-source.js

### Plugin upload
Upload the zip file you made on the [Plugin](/plugin) page.

### important point
- The uploaded js files are **all loaded when the screen is loaded for the first time.**
The order in which the scripts are called is not fixed (basically by name, but after the js of jquery and bootstrap).
Write them in a way that does not depend on the loading order.

- The data of each table has a class named "custom_value_(table name)".
To run a script only for a specific table, narrow down by this class name.
Example: "custom_value_user" for the "User" screen, "custom_value_organization" for the "Organization" screen


## How to write a script

### Data list screen, data details screen, data create / edit screen

Write as follows.

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // Your own processing
    }
});
~~~


### Dashboard boxes of the top screen

- Write as follows.

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // Your own processing
    }
});
~~~

- This event runs every time one dashboard box has finished loading (as many times as there are dashboard boxes). This is because each dashboard box is called asynchronously.

- The div class ".box-dashboard" of a dashboard box has data attributes that follow the settings of the dashboard.

- Tell which dashboard box is being loaded by the data attributes set on the target of the event ev.

~~~ js
// Example
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### Data attributes set on a dashboard box

##### Common

| Name | Description |
| ---- | ---- |
| row_no | The row number where the dashboard box is set |
| column_no | The column number where the dashboard box is set |
| dashboard_box_view_name | The display name of the dashboard box |
| dashboard_box_type | The type of the dashboard box.<br />system, list, chart, calendar, plugin |


##### System

| Name | Description |
| ---- | ---- |
| target_system_name | The system item type of the dashboard box. <br />guideline, news, editor, html |


##### Data list, chart, calendar

| Name | Description |
| ---- | ---- |
| target_table_id | The ID of the table shown |
| target_table_name | The name (alphanumeric) of the table shown |
| target_view_view_name | The display name of the view shown |


##### Plugin

| Name | Description |
| ---- | ---- |
| plugin_id | The ID of the plugin shown |
| plugin_uuid | The UUID of the plugin shown |
| plugin_name | The name (alphanumeric) of the plugin shown |
| plugin_view_name | The display name of the plugin shown |



### Calendar view

- **To use the values of each data in the script, first make the following setting as described in [Changing setting values](/config).**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- Write as follows.

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // Stop unless it is the "Information" table
        // First half: check for the table view, second half: check for the dashboard
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // When the "priority" is high (4) or more, force a red background
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- This event starts before the calendar view is shown.

- The second argument, event, has the following values.

| Key | Type | Description |
| ---- | ---- | ---- |
| allDayBetween | true/false | Whether it is all day |
| start | string | Start date and time |
| end | string | End date and time |
| title | string | Display name |
| color | string | Background color |
| textColor | string | Text color |
| url | string | Where a click goes |
| id | int | The ID of the data (available only when the setting value has been changed so that the ID is obtained) |
| value | array | The registered values of the data (available only when the setting value has been changed so that the ID is obtained) |

- To change values by a condition, rewrite the values of event and return event.

### important point
The same as "important point" in "How to make" above. Take care with when and in what order the js files are loaded, and with the class name of each table, "custom_value_(table name)".


## Sample plugin
- [Address set script](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [Full-width alphanumeric → half-width alphanumeric conversion script](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
A script that converts full-width alphanumeric characters to half-width alphanumeric characters.  

- [Half-width kana → full-width kana conversion script](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
A script that converts half-width kana to full-width kana.  
