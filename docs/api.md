# API Setting
Other systems and programs can read and write Exment data through the API (the entrance through which programs talk to each other).
This page explains the settings to make the API usable, and how to authenticate (to check as whom the API is executed).

The steps until you use the API are as follows.

1. Set "API Available" to YES in the system setting ([Change system settings](/api?id=change-system-settings)).
2. Choose one of the three authentication methods and register an API application ([API authentication method](/api?id=api-authentication-method)).
3. Get an access token (a password with a time limit that you attach when you call the API).
4. Attach the access token and execute the API ([API execution method](/api?id=api-execution-method)).

The authentication is OAuth, a method that uses an Exment account.  
Exment uses [laravel/passport](https://github.com/laravel/passport) for authentication.  
Reference: [Laravel 12.x Laravel Passport](https://laravel.com/docs/12.x/passport)  
Therefore, authentication depends on laravel/passport. This manual introduces three authentication methods.

※For the "API keys" that users make and use by themselves (v7.2.1 or later), see [API keys](/api_key). It is a different function from "API Key(API Key Format)" on this page.

## Change system settings
To use the API in Exment, change "API Available" to YES from the menu "Admin Setting > System Setting".

> Note: the URLs are for the default without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (an older site has "admin"), add it after the URL of the site (e.g. `http(s)://(Exment URL)/admin/oauth/token`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

## API authentication method
There are three authentication methods. Choose the one that fits how you use the API.

| Authentication method | Good for |
| --- | --- |
| 1. Screen Login Format | Executing the API from the Web |
| 2. Password Format | Client applications where it is hard to call a Web screen |
| 3. API Key Format | Batch execution |

1. **OAuth 2.0, Authorization Code Flow(Screen Login Format)**  
The user logs in with the browser and approves the use of the application; then the API can be used. Recommended for executing the API from the Web.

1. **Password Grant Token(Password Format)**  
The login ID and password are included in the authentication request; then the API can be used. Recommended for client applications where it is hard to call a Web screen.

1. **API Key(API Key Format)**  
An API key is created when the API application is created. After that, the API key is included in the authentication request; then the API can be used. Recommended for batch execution.


### 1. OAuth 2.0, Authorization Code Flow(Screen Login Format)
From a newly built Web service (for example, an accounting system), the user logs in to Exment; then the API can be used. It goes in this order.

- At authentication, a screen to enter the Exment ID and password is displayed on the Web browser.

- When the user enters the ID and password, a message to approve the application is displayed.

![API authentication screen](img/api/authorize1.png)  

- When the user approves, the browser returns to the Web service (callback) and a code is returned.

※This manual describes an example in which a Web service separate from Exment is built with Laravel.  
It can also be built with other languages and frameworks.

#### Setting method

##### Exment page settings
- The system administrator enters the following URL.  
http(s)://(Exment URL)/api_setting  
※You can open it after doing "Change system settings" above.

- From v7.1.0, you can also open it from "Admin Setting" > "API Setting" in the left menu (when "API Available" is YES).
- In v7.0 and earlier, "API Setting" is not displayed in the menu by default. To add it to the menu, open the "Admin Setting" > "Menu" page and select the menu type "System Menu". "API Setting" appears in the target; select it and save.


![API authentication screen](img/api/api_setting1.png)  

- The API application setting screen is displayed. Click [New].

- Enter the required information.

    **Authentication Type**  
	Select "Client Login on Display".

	**Application Name**  
	Enter any name.

	**Redirect URL**  
	Enter the URL to redirect to when the user completes the authentication on the screen.

![API authentication screen](img/api/api_setting2.png)  


- After saving, the Client ID and Client Secret required for authentication are displayed. Copy them.  
※The Client Secret is displayed by clicking the eye icon.

![API authentication screen](img/api/api_setting3.png)  

##### Web service side implementation developed independently
- On the Web service side, create an endpoint for calling the Exment authentication screen.

~~~
http(s)://(Exment URL)/oauth/authorize  GET  
response_type: code
client_id: (Client ID copied)
redirect_uri: (Callback URL entered)
scope: (Scope for accessing. The list is described below. Space delimiter if there are multiple)

Example: http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- Example:
~~~ php
// Web service side implementation
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(Client ID copied)',
        'redirect_uri' => '(Callback URL entered)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(Exment URL)/oauth/authorize?'.$query);
}
~~~

- After the Exment authentication is completed, create an endpoint on the Web service side to get an access token.

~~~
http(s)://(Exment URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "redirect_uri": "(Callback URL entered)",
    "code": "(Code obtained from redirected URL)"
}
~~~

- Example:
~~~ php
// Implementation on Web service side. The endpoint is the callback URL entered
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(Exment URL)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(Client ID copied)',
            'client_secret' => '(Client Secret copied)',
            'redirect_uri' => '(Callback URL entered)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- By this, json including the access_token, refresh_token and expires_in attributes is returned in the response.

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Use this access token to execute the API.


### 2. Password Grant Token(Password Format)
The login ID and password are included in the authentication request; then the API can be used.

- The user does not need to enter the ID and password on a screen, so it can also be executed in batch processing and the like.

- The user's ID and password must be included in the authentication request.

- Of the SSO methods, LDAP is supported. OAuth and SAML authentication are not supported.

※This manual describes an example in which a Web service separate from Exment is built with Laravel.  
It can also be built with other languages and frameworks.

#### Setting method

##### Exment page settings
- The system administrator enters the following URL.  
http(s)://(Exment URL)/api_setting  
※You can open it after doing "Change system settings" above.

- From v7.1.0, you can also open it from "Admin Setting" > "API Setting" in the left menu (when "API Available" is YES).
- In v7.0 and earlier, "API Setting" is not displayed in the menu by default. To add it to the menu, open the "Admin Setting" > "Menu" page and select the menu type "System Menu". "API Setting" appears in the target; select it and save.

![API authentication screen](img/api/api_setting1.png)  

- The API application setting screen is displayed. Click [New].

- Enter the required information.

    **Authentication Type**  
	Select "Password Grant".

	**Application Name**  
	Enter any name.

![API authentication screen](img/api/api_setting4.png)  


- After saving, the Client ID and Client Secret required for authentication are displayed. Copy them.  
※The Client Secret is displayed by clicking the eye icon.

![API authentication screen](img/api/api_setting5.png)  


##### Implementation of the program developed independently
- Create the request to get an access token at the caller.

~~~
http(s)://(Exment URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "username": "(User ID or email address to log in)",
    "password": "(User password to log in)",
    "scope": "(The scope to access. The list is described below. Space delimiter if there are multiple)"
}
~~~

- By this, json including the access_token, refresh_token and expires_in attributes is returned in the response.

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Use this access token to execute the API.


##### Implementation of the program developed independently (for LDAP authentication)
- For LDAP authentication, POST as follows.

~~~
http(s)://(Exment URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
	"login_type": "ldap",
	"provider_name": "(\"LDAP name (alphanumeric)\" entered on the login setting screen)",
    "username": "(User ID or email address to log in)",
    "password": "(User password to log in)",
    "scope": "(The scope to access. The list is described below. Space delimiter if there are multiple)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Use this access token to execute the API.



### 3. API Key(API Key Format)
An API key is created when the API application is created. After that, the API key is included in the authentication request; then the API can be used.

- The user does not need to enter the ID and password on a screen.  
The password does not need to be set at the caller either. Even when you develop batch processing and the like, you do not have to embed a password, which lowers the security risk.

- **When an API application is registered with this setting, the REST API is executed as the user who created the API application.**

※This manual describes an example in which a Web service separate from Exment is built with Laravel.  
It can also be built with other languages and frameworks.

#### (Supplement) Recommended user and role group settings for the API Key format

When an API application is registered with this setting, the REST API is executed as the user who created the API application.  
Therefore, we do not much recommend that a system administrator registers the API application.  
We recommend setting the user and the role group in these steps.

- Create a new [role group](/role_group).
    - Add the "API Application" permission.
	- Add permissions for the tables you want to use through the API.

- Add the user who executes the API.
    - For the role group, select the role group created above.

- Log in as the user created above, open the API application setting screen and register the API application.


#### Setting method

##### Exment page settings
- The system administrator enters the following URL.  
http(s)://(Exment URL)/api_setting  
※You can open it after doing "Change system settings" above.

- From v7.1.0, you can also open it from "Admin Setting" > "API Setting" in the left menu (when "API Available" is YES).
- In v7.0 and earlier, "API Setting" is not displayed in the menu by default. To add it to the menu, open the "Admin Setting" > "Menu" page and select the menu type "System Menu". "API Setting" appears in the target; select it and save.

![API authentication screen](img/api/api_setting1.png)  

- The API application setting screen is displayed. Click [New].

- Enter the required information.

    **Authentication Type**  
	Select "API Key".

	**Application Name**  
	Enter any name.

![API authentication screen](img/api/api_setting4.png)  


- After saving, the Client ID, Client Secret and API key required for authentication are displayed. Copy them.  
※The Client Secret and the API key are displayed by clicking the eye icon.

![API authentication screen](ja/img/api/api_setting6.png)  


##### Implementation of the program developed independently
- Create the request to get an access token at the caller.

~~~
http(s)://(Exment URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "api_key": "(API key copied)",
    "scope": "(The scope to access. The list is described below. Space delimiter if there are multiple)"
}
~~~

- By this, json including the access_token, refresh_token and expires_in attributes is returned in the response.

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Use this access token to execute the API.


## API execution method
To execute the API, add the following to the request header.

~~~
Content-Type: application/json  
Authorization: Bearer (Acquired access token)  
~~~

Example:
~~~  
http://localhost/api/data/user GET
Header value:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

Result:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> Note: the URLs are for the default without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (an older site has "admin"), add it after the URL of the site (e.g. `http(s)://(Exment URL)/admin/oauth/token`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

## Token refresh
The access token expires after a certain time and can no longer be used.  
In that case, you can get an access token again by using the refresh token (a value for getting the access token again).  
Execute an HTTP POST with the following contents.

~~~
http(s)://(Exment URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "refresh_token": "(Refresh token acquired)"
}
~~~

Result:
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (Reference) Perform authentication, token acquisition, and API execution on the screen
These are the steps to try everything from authentication to executing the API with a browser and a tool, before you write a program.  
Use them to get the flow up to getting an access token.

- In the API setting, create an application with "Client Login on Display".

- Access the following URL.  
http(s)://(Exment URL)/oauth/authorize?client_id=(Client ID copied)&redirect_uri=(Callback URL entered)&response_type=code&scope=me  
  
Example:  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- A simple screen for approving the application is displayed.

![API authentication screen](img/api/authorize1.png)  

Click "Authorize".

- A query "code=xxxxx" has been added to the URL field.  
Copy this code.  
Example:  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- Using a tool that can send a POST, execute the following HTTP request.

~~~
http(s)://(Exment URL)/oauth/token  POST  
grant_type: authorization_code
client_id: (Client ID copied)
client_secret: (Client Secret copied)
redirect_uri: (Callback URL entered)
code: (The acquired code value)  
~~~

Example:
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~

- When it completes normally, a response like the following is returned.  
![API authentication screen](img/api/authorize2.png)  
Get the access_token from the json value of this response.

- Add this access token to the header of the API and execute the API.

Example:
~~~
http://localhost/api/data/user GET
Header value:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

Result:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Scope list
A scope is a value that decides "how much the application may do through the API".  
The API can be executed within the range of the scopes specified when the token was obtained.  
**※Regardless of the scope setting, the API can only access what the roles and permissions of the logged-in user allow.**  
For example, you cannot get the information of a table you have no permission for, and you cannot update custom data you have no permission for.


| Parameter name | Description |
| ---- | ---- |
| me | You can get the login user information. |
| system_read | You can get system information. (Currently unused. Listed as a reserved word) |
| system_write | You can get, add, update, and delete system information. (Currently unused. Listed as a reserved word) |
| table_read | You can get the setting information of the custom table. |
| table_write | You can get / add new / update / delete setting information of custom table. (Currently unused. Listed as a reserved word) |
| view_read | You can get the setting information of the custom view. |
| value_read | You can get information on custom data. |
| value_write | You can get / add new / update / delete information of custom data. |
| notify_read | You can get notification information. |
| notify_write | You can add new notifications. |
| workflow_read | You can get workflow information. |
| workflow_execute | You can execute the workflow. |
| log | You can get operation log. |
| plugin | You can use the APIs added as plugins. See [here](/plugin_quickstart_api) for details. |

※When specifying multiple scopes, set them in the parameter separated by spaces.



## Error code list
When an error occurs in executing the API, an error code is returned.  
This is the list of the error codes and the status codes of the HTTP response.

| Exment error code | HTTP status code | Description |
| ---- | ---- | ---- |
| 101 | 403 | You do not have permission to access the endpoint or custom table. Please review the permissions of the executing user. |
| 102 | 400 | There is a problem with the query string or the values sent. Please review the values. |
| 103 | 400 | Mainly when adding or updating data, the validation of the values sent has failed. Please review the values sent. |
| 104 | 403 | Occurs when an action such as creating, updating or deleting data cannot be performed due to the settings. |
| 105 | 403 | This data cannot be deleted. |
| 106 | 403 | The scope at API authentication is incorrect. Please review the scope value. |
| 107 | 400 | When getting specific data by specifying id, the data does not exist. Please specify the id. |
| 108 | 401 | The access token at API authentication is incorrect or has expired. Please review the access token. |
| 109 | 400 | Occurs when a request exceeds the number of data that can be created or deleted at the same time (default: 100). |
| 110 | 403 | Occurs when updating data, etc. for data that has already been deleted. |
| 111 | 500 | Occurs when the specified plugin does not exist when executing a plugin (API). Please review the plugin name. |
| 112 | 400 | Occurs when the table and the view are different in an API for a view. |
| 113 | 400 | Occurs when an unsupported view type is specified in an API for a view. |
| 201 | 403 | Occurs when updating or deleting data, etc. for data locked by the workflow status. |
| 202 | 400 | Occurs when the workflow has not been started when executing the "Get the current workflow value" API. |
| 203 | 400 | Occurs when the workflow has been completed when executing the "Get the list of working users for specific data" or "Get the list of next actions that can be executed for specific data" API. |
| 204 | 400 | Occurs when the specified action ID cannot be executed when executing the "Execute the workflow for specific data" API. |
| 205 | 400 | Occurs when the next working user does not exist when executing the "Execute the workflow for specific data" API. |
| 301 | 400 | The API cannot be executed due to IP restriction. |
| 401 | 403 | Occurs when the target table is not included in the public form in the API for public forms. |
| 402 | 403 | Occurs when trying to create the second or later data for a table with "Save Only One Record" set. |

## WebAPI reference
For the API reference, see the [API Reference](https://exment.net/reference/ja/webapi.html).
