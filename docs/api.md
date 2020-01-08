# API設定
In Exment, API can be executed.  
This can be done by OAuth-based authentication using an Exment account.  
  
Exment uses [laravel / passport](https://github.com/laravel/passport) for authentication.  
Reference: [Laravel 5.6 API authentication](https://readouble.com/laravel/5.6/en/passport.html)  
Therefore, authentication depends on laravel / passport, but this manual introduces two types of authentication.  

## Change system settings
> From v2.1.7, the setting has been changed from the screen.

To use the API in Exment, change "Use API" to YES from the menu "Admin Settings> System Settings".

## API authentication method
1. **OAuth 2.0, Authorization Code Flow(Screen Login Format)** :  
This format allows the user to use the API by entering the Exment login ID and password from the screen.  
Recommended for running APIs on the web.  
1. **Password Grant Token(Password Format)** :  
This is a format in which the login ID and password are set in advance at the execution source that calls the API, and the API is used. Recommended for batch execution.  

### 1. OAuth 2.0, Authorization Code Flow(Screen Login Format)
This authentication method can be used for users who log in to Exment and use Exment data from a newly constructed Web service (eg, accounting system).  

- When the user authenticates, the screen for entering the Exment ID and password is displayed on the Web browser.    

- When the user enters the ID and password, a message to approve the application is displayed.  

- When the user approves, the web service is called back and the code is returned.

※In this manual, the example when the Web service different from Exment is built with Laravel is described.  
It can be built in other languages and frameworks.  

#### Setting method

##### Exment page settings
- The system administrator enters the following URL.  
http(s)://(Exment URL)/admin/api_setting  
※You can access by performing "Change system settings" described above.  

- Or add "API app settings" to the menu.  
Open the "Administrator Settings"> "Menu" page and select the menu type "System Menu". The target "API Application Settings" will be displayed. Select and save.  
※"API app settings" is not displayed in the menu with default settings.  


![API authentication screen](img/api/api_setting1.png)  

- When the API application setting screen is displayed, click "New".  

- Enter the required information.
    - Authentication format: Select “Screen login format”.
	- App name: Enter any name.
	- Redirect URL: Enter the URL to redirect when the user completes the authentication from the screen.

![API authentication screen](img/api/api_setting2.png)  


- After saving, the Client ID and Client Secret required for authentication are displayed. Copy them.  
※Client Secret is displayed by clicking the eye icon.  

![API authentication screen](img/api/api_setting3.png)  

##### Web service side implementation developed independently
- On the Web service side, create an endpoint for calling the Exment authentication screen.

~~~
http(s)://(Exment URL)/admin/oauth/authorize'  GET  
response_type: code
client_id: (Client ID copied)
redirect_uri: (Callback URL entered)
scope: (Scope for accessing. The list is described below. Space delimiter if there are multiple)
~~~

- Example：
~~~ php
// Web service side implementation
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(Client ID copied)',
        'redirect_uri' => '(Callback URL entered)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(ExmentのURL)/admin/oauth/authorize?'.$query);
}
~~~

- After Exment authentication is completed, create an endpoint on the Web service side to obtain an access token.

~~~
http(s)://(Exment URL)/admin/oauth/token'  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "redirect_uri": "(callback URL entered)",
    "code": "(Code obtained from redirected URL)"
}
~~~

- Example：
~~~ php
// Implementation on Web service side. The endpoint is the callback URL entered
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(ExmentのURL)/admin/oauth/token', [
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

- By this, json including access_token, refresh_token, expires_in attribute is returned in the response value. 

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
In this authentication method, a login ID and password are set in advance at the execution source that calls the API, and the API is used.  

- Since the user does not need to enter the ID and password on the screen, it can be executed even in batch processing.  

- The user's ID password must be set in the system in advance.  

- This format cannot be used if authentication using OAuth has been set.  

※In this manual, the example when the Web service different from Exment is built with Laravel is described.  
It can be built in other languages and frameworks.  

#### Setting method

##### Exment page settings
- The system administrator enters the following URL.  
http(s)://(Exment URL)/admin/api_setting  
※You can access by performing "Change system settings" described above.

- Or add "API app settings" to the menu.  
Open the "Administrator Settings"> "Menu" page and select the menu type "System Menu".  
The target "API Application Settings" will be displayed.  
Select and save.  
※"API app settings" is not displayed in the menu with default settings.

![API authentication screen](img/api/api_setting1.png)  

- When the API application setting screen is displayed, click "New".  

- Enter the required information.  
    - Authentication format: Select “Password format”.  
	- App name: Enter any name.  

![API authentication screen](img/api/api_setting4.png)  


- After saving, the Client ID and Client Secret required for authentication are displayed. Copy them.  
※Client Secret is displayed by clicking the eye icon.  

![API authentication screen](img/api/api_setting5.png)  


##### Implementation of the program developed independently
- Create a request to obtain an access token at the caller.

~~~
http(s)://(Exment URL)/admin/oauth/token'  POST
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

- By this, json including access_token, refresh_token, expires_in attribute is returned in the response value.  

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

Example：
~~~  
http://localhost/admin/api/data/user GET
Header value：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

result：
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
			"deleted_user_id": null,
			"label": "admin"
		}
	],
	"first_page_url": "http://localhost/admin/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/admin/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/admin/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Token refresh
The access token expires after a certain period of time and is invalidated.  
In that case, you can get the access token again by using the refresh token.  
This is a method to get an access token using a refresh token.  
Execute HTTP POST with the following contents.  

~~~
http(s)://(Exment URL)/admin/oauth/token'  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(Client ID copied)",
    "client_secret": "(Client Secret copied)",
    "refresh_token": "(Refresh token acquired)"
}
~~~

result：
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (Reference) Perform authentication, token acquisition, and API execution on the screen
In this section, we will use a tool or a browser to actually authenticate to Exment and obtain an access token.  
Imagine the flow up to obtaining an access token.  

- Access the following URL.  
http(s)://(Exment URL)/admin/oauth/authorize?client_id=(Client ID copied)&redirect_uri=(Callback URL entered)&response_type=code&scope=me  
  
Example：  
http://localhost/admin/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fadmin%2fauth%2fcallback&response_type=code&scope=me  


- This will bring up a simple screen for app authentication.  
![API authentication screen](img/api/authorize1.png)  
Click "Authonize".  

- A query with "code = xxxxx" has been added to the URL field.  
Copy this code.  
Example：  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- Execute the following HTTP communication using a tool that can perform POST communication.  
  
~~~
http(s)://(Exment URL)/admin/oauth/token'  POST  
grant_type: authorization_code
client_id: (Client ID copied)
client_secret: (Client Secret copied)
redirect_uri: (Callback URL entered)
code: (The acquired code value)  
~~~
  
Example：  
~~~
http://localhost/admin/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/admin/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- Upon successful completion, the following response will be returned.  
![API authentication screen](img/api/authorize2.png)  
Get access_token from json value of this response.  

- Add this access token to the API header and execute the API.  
  
Example：  
~~~
http://localhost/admin/api/data/user GET
Header value：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
result：  
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
			"deleted_user_id": null,
			"label": "admin"
		}
	],
	"first_page_url": "http://localhost/admin/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/admin/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/admin/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Scope list
Define the permission level as an application.  
When a token is obtained, the API can be executed up to the level defined in this scope.  
**※Regardless of the scope setting, only the role / authority information of the logged-in user can be accessed with the API.**  
For example, you cannot retrieve information for tables for which you do not have permissions, and you cannot update custom data for which you do not have permissions.  


| Parameter name | Description |
| ---- | ---- |
| me | You can get the login user information. |
| system_read | You can get system information. |
| system_write | You can get, add, update, and delete system information. |
| table_read | You can get the setting information of the custom table. |
| table_write | You can get / add new / update / delete setting information of custom table. |
| value_read | You can get information on custom data. |
| value_write | You can get / add new / update / delete information of custom data. |
| notify_read | You can get notification information. |
| notify_write | You can add new notifications. |
| workflow_read | You can get workflow information. |
| workflow_execute | You can execute the workflow. |

※When specifying multiple scopes, set them in parameters separated by spaces.  


## WebAPI reference
Please refer to [API Reference](https://exment.net/reference/ja/webapi.html) for API reference.