# 插件(脚本)
这是在 Exment 的页面中执行自己的脚本（javascript）的插件。
执行脚本的契机（触发条件）有下面 7 个。

| 触发条件 | 启动的时机 |
| ---- | ---- |
| **页面加载时** | Exment 的页面加载完成时。※每次页面跳转都会加载。 |
| **页面加载时（初次）** | Exment 的页面加载完成时。※只在最初登录时，或用 F5 刷新时加载 1 次。 |
| **显示数据列表时** | 数据列表页面加载完成时 |
| **显示数据详情时** | 数据详情页面加载完成时 |
| **显示数据新建、编辑时** | 数据新建、编辑页面加载完成时 |
| **仪表板加载时** | 仪表板 BOX 加载完成时 |
| **日历视图 项目加载时** | 在日历视图中加载各个项目时。可以更改背景色和文字颜色。 |

## 创建方法
这里作为示例，创建自动设置地址的脚本。
在“基本信息”数据的编辑页面中，输入“邮政编码1”“邮政编码2”后，会根据 7 位邮政编码自动设置“都道府县”“地址”“地址（楼栋及以后）”。
![脚本](../img/plugin/plugin_script1.png)  

### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "设置地址",
    "description": "在基本信息页面中设置地址。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- plugin_name 请用半角英文数字填写。
- uuid 是用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 script。  
- （任意）cdns 在用 CDN 加载相关库时填写。请用 http 或 https 的完整路径，以数组记载。

### 创建 js 文件
- 创建如下的 js 文件。名称用半角英文数字，可以自由决定。本示例中设为“script.js”。

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

- 事件以 jquery 的方式调用。  
- 在“exment:form_loaded”的部分定义事件。目前 Exment 已定义的事件名如下。
    - **exment:loaded** …… Exment 的页面加载完成时，触发条件启动。※每次页面跳转都会加载。  
    - **exment:first_loaded** …… Exment 的页面加载完成时，触发条件启动。※只在最初登录时，或用 F5 刷新时加载 1 次。  
    - **exment:list_loaded** …… 数据列表页面加载完成时，执行事件。  
    - **exment:show_loaded** …… 数据详情页面加载完成时，执行事件。  
    - **exment:form_loaded** …… 数据新建、编辑页面加载完成时，执行事件。
    - **exment:dashboard_loaded** …… TOP 页面的仪表板 BOX 加载完成时，执行事件。 ※在各个仪表板 BOX 加载完成的时刻执行，有多少个仪表板就执行多少次。  
    - **exment:calendar_bind** …… 在日历视图中，加载各个项目时触发条件启动。可以更改背景色和文字颜色。  
- 创建的脚本请放在“public”文件夹内。  
放置的脚本只要扩展名是“js”，就可以放多个。需要相关库时，请全部放在文件夹内。  
本示例中，也放了定制 [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io) 而成的 js 文件。

### 压缩为 zip
压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- SetAddress.zip
    - config.json
    - public 文件夹
        - script.js
        - ajaxzip3-source.js

### 上传插件
请在[插件](/zh/plugin)页面中上传创建的 zip 文件。

### 注意事项
- 上传的 js 文件，**在页面初次加载时全部加载。**
脚本被调用的顺序没有规定（基本上按名称顺序。但是在 jquery、bootstrap 的 js 之后）。
请用不依赖加载顺序的写法来实现。

- 在各个表的数据中，定义了名为“custom_value_(表名)”的类。
只想在特定的表中执行脚本时，请用这个类名筛选。
※例：“用户”页面时："custom_value_user"，“组织”页面时："custom_value_organization"


## 脚本的写法

### 数据列表页面、数据详情页面、数据新建和编辑页面

请像下面这样写。

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // 自己的处理
    }
});
~~~


### TOP 页面的仪表板 BOX

- 请像下面这样写。

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // 自己的处理
    }
});
~~~

- 这个事件在每加载完 1 个仪表板 BOX 时执行（有多少个仪表板就执行多少次）。因为各个仪表板 BOX 是异步调用的。

- 仪表板 BOX 的 div 类“.box-dashboard”上，设置了与仪表板的设置内容对应的 data 属性。

- 正在加载哪个仪表板 BOX，请用事件 ev 的 target 上设置的 data 属性来判别。

~~~ js
// 例
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### 仪表板 BOX 上设置的 data 属性

##### 通用

| 名称 | 说明 |
| ---- | ---- |
| row_no | 设置了仪表板 BOX 的行号 |
| column_no | 设置了仪表板 BOX 的列号 |
| dashboard_box_view_name | 仪表板 BOX 的显示名称 |
| dashboard_box_type | 仪表板 BOX 的种类。<br />system, list, chart, calendar, plugin |


##### 系统

| 名称 | 说明 |
| ---- | ---- |
| target_system_name | 仪表板 BOX 的系统的项目种类。 <br />guideline, news, editor, html |


##### 数据列表、图表、日历

| 名称 | 说明 |
| ---- | ---- |
| target_table_id | 显示对象的表 ID |
| target_table_name | 显示对象的表的英文名 |
| target_view_view_name | 显示对象的视图显示名称 |


##### 插件

| 名称 | 说明 |
| ---- | ---- |
| plugin_id | 显示对象的插件 ID |
| plugin_uuid | 显示对象的插件的 UUID |
| plugin_name | 显示对象的插件的英文名 |
| plugin_view_name | 显示对象的插件显示名称 |



### 日历视图

- **想在脚本中使用各数据的值时，请事先在[更改设置值](/zh/config)中进行下面的设置。**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- 请像下面这样写。

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // 不是“通知信息”表就结束
        // 前半：检查表的视图，后半：检查仪表板
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // “优先级”为高(4)以上时，强制改为红色背景
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- 这个事件在显示日历视图之前启动。

- 第 2 个参数 event 中有下面的值。

| 键值 | 类型 | 说明 |
| ---- | ---- | ---- |
| allDayBetween | true/false | 是否全天 |
| start | string | 开始日期时间 |
| end | string | 结束日期时间 |
| title | string | 显示名称 |
| color | string | 背景色 |
| textColor | string | 文字颜色 |
| url | string | 点击时的跳转目标 |
| id | int | 该数据的 ID（只有在更改设置值中设为取得 ID 时才能取得） |
| value | array | 该数据的登记值（只有在更改设置值中设为取得 ID 时才能取得） |

- 想按条件改变值时，请改写 event 的值，然后 return event。

### 注意事项
和上面“创建方法”的“注意事项”相同。请注意 js 文件被加载的时机和顺序，以及各个表的类名“custom_value_(表名)”。


## 示例插件
- [设置地址的脚本](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [全角英文数字→半角英文数字转换脚本](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
把全角英文数字转换为半角英文数字的脚本。  

- [半角假名→全角假名转换脚本](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
把半角假名转换为全角假名的脚本。  
