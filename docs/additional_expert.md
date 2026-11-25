# Expert mode
This mode lets people who know the system well use more detailed settings.  
In expert mode, the following settings become available.

- When the custom column is "One-Line Text", validation of the input by a regular expression
- The [Non-executable setting from the screen](/table?id=non-executable-setting-from-the-screen) of the custom table setting
- Setting by parameter columns in the [Heading format settings](/table?id=heading-format-settings) of the custom table setting

### Setup steps
- Add the following content to the .env file and save it.

~~~
EXMENT_EXPART_MODE=true
~~~

- As a result, the setting items above are displayed on screens such as the custom table setting and custom column setting screens.


[←Back to list of additional settings](/quickstart_more)
