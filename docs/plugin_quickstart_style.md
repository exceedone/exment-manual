# Plugin (style)
This plugin loads your own style sheet (css) on the screens of Exment and changes the design.

## How to make
Here, as a sample, we make a style that turns the text color of the whole site red.  
![Style](img/plugin/plugin_style1.png)  

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "Style test",
    "description": "Style test",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- Enter plugin_name in single-byte alphanumeric characters.
- uuid is a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter style for plugin_type.  
- (Optional) Enter cdns when you load related libraries from a CDN. Write the full paths, http or https, as an array.

### css file creation
- Create a css file like the one below. You can give it any name in single-byte alphanumeric characters. In this sample it is "style.css".

~~~ css
/* style.css */
*{
    color:red !important;
}
~~~

- Put the style sheet you made in the "public" folder.  
You can put several style sheets, as long as their extension is "css". If related libraries are needed, put them all in the folder.  

### Compress to zip
Compress into a zip.  
The zip file name should be "(plugin_name).zip".  
- SetStyle.zip
    - config.json
    - public folder
        - style.css

### Plugin upload
Upload the zip file you made on the [Plugin](/plugin) page.

### important point
- The uploaded css files are **all loaded when the screen is loaded for the first time.**  
The order in which the css files are called is not fixed (basically by name, but after the css of jquery, bootstrap and adminLTE).
Write them in a way that does not depend on the loading order.

- The data of each table has a class named "custom_value_(table name)".  
To apply a style only to a specific table, narrow down by this class name.
Example: "custom_value_user" for the "User" screen, "custom_value_organization" for the "Organization" screen


### Sample plugin
[Sample design](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
