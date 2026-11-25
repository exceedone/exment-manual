# 插件（样式）
这是在 Exment 的页面中加载独自的样式表（css），更改设计的插件。

## 创建方法
这里作为示例，创建把整个站点的文字颜色改为红色的样式。  
![样式](../img/plugin/plugin_style1.png)  

### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "样式测试",
    "description": "样式测试",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- plugin_name 请用半角英文数字填写。
- uuid 是用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 style。  
- （任意）cdns 在用 CDN 加载相关库时填写。请用 http 或 https 的完整路径，以数组记载。

### 创建 css 文件
- 创建如下的 css 文件。名称用半角英文数字，可以自由决定。本示例中设为“style.css”。

~~~ css
/* style.css */
*{
    color:red !important;
}
~~~

- 创建的样式表请放在“public”文件夹内。  
放置的样式表只要扩展名是“css”，就可以放多个。需要相关库时，请全部放在文件夹内。  

### 压缩为 zip
压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- SetStyle.zip
    - config.json
    - public 文件夹
        - style.css

### 上传插件
请在[插件](/zh/plugin)页面中上传创建的 zip 文件。

### 注意事项
- 上传的 css 文件，**在页面初次加载时全部加载。**  
css 文件被调用的顺序没有规定（基本上按名称顺序。但是在 jquery、bootstrap、adminLTE 的 css 之后）。
请用不依赖加载顺序的写法来实现。

- 在各个表的数据中，定义了名为“custom_value_(表名)”的类。  
只想在特定的表中应用样式时，请用这个类名筛选。
※例：“用户”页面时："custom_value_user"，“组织”页面时："custom_value_organization"


### 示例插件
[示例设计](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
