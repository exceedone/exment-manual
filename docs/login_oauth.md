# Single sign-on (OAuth)
How to set up single sign-on (SSO) with OAuth. Users can then log in to Exment with an account of Google, Microsoft and so on.  
In Exment, you can add single sign-on in the [Login Setting](/login_setting). Once it is added, users can log in with the ID and password of the provider (the service that handles the login, such as Google), and you do not have to manage a login password only for Exment.

Do the settings in these two steps, in order.

1. **Prepare the server and the provider** (create an application on the provider side, and install a library if needed) … "Server and provider settings"
2. **Settings on the screen** (add the provider on the login setting screen) … "On-screen settings"

Step 1 depends on the provider you use.

| Provider you use | Where to look |
|---|---|
| Google, Facebook, Twitter, GitHub, LinkedIn, Bitbucket | (1) In case of a provider provided as standard by Socialite |
| Office365, Microsoft Graph | (2) In case of provider provided by Exment extension |
| Others | (3) If you provide your own provider |

#### important point
- Exment implements the single sign-on processing with [Socialite](https://github.com/laravel/socialite).
- **This manual is for those who are familiar with OAuth. For how to create the Client ID and Client Secret of each provider, please refer to their documents.**
- <span class="red">If you are on v3.0.16 or lower and cannot log in with Google, please follow [these steps](/patch/sso_google).</span>

#### Reference links
- [Supporting SSO with a Google account in the open source web database "Exment"](https://qiita.com/hirossyi73/items/70dcc35305a96abace08)


## Server and provider settings
Before you add a provider on the login setting screen, you need to run commands on the server to install the extension.

### (1) In case of a provider provided as standard by Socialite
- The providers that Socialite provides as standard are as follows. (The text in parentheses is used later to specify the service.)
    - Google (google)
    - Facebook (facebook)
    - Twitter (twitter)
    - GitHub (github)
    - LinkedIn (linkedin)
    - Bitbucket (bitbucket)

- Create an application for Exment at each provider.  
※The callback URL is as follows.  
http(s)://(Exment URL)/auth/login/(socialite provider name)/callback  

    - Example 1, GitHub: http(s)://(Exment URL)/auth/login/github/callback  
    - Example 2, Facebook: http(s)://(Exment URL)/auth/login/facebook/callback  
    - Example 3, Google: http(s)://(Exment URL)/auth/login/google/callback  

> ※The URLs are for the default setting without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an older version has "admin"), add that value after the URL of the site (e.g. `http(s)://(Exment URL)/admin/auth/login/google/callback`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

- Run the following command in the root directory of Exment.

~~~
composer require laravel/socialite=~5.1
~~~
※In Exment v7.0.0 or later, "laravel/socialite" is installed automatically as a dependency of Exment, so you do not need to run this command.

- Do the [On-screen settings](/login_oauth?id=on-screen-settings).




### (2) In case of provider provided by Exment extension
- Some providers are provided as an extension of Exment. (The text in parentheses is used later to specify the service.)
    - Office365, Microsoft Graph (graph)

- Create an application for Exment at each provider.  
※The callback URL is as follows.  
http(s)://(Exment URL)/auth/login/(socialite provider name)/callback  

    - Example, Office365: http(s)://(Exment URL)/auth/login/graph/callback

- Run the following command in the root directory of Exment.

~~~
composer require exceedone/microsoft-graph
~~~

- Do the [On-screen settings](/login_oauth?id=on-screen-settings).


### (3) If you provide your own provider
For a provider that is not in (1) or (2), add an unofficial provider from [Socialite Providers](https://socialiteproviders.github.io/).  
The unofficial providers do not include the processing for getting an avatar (the image of the user) either. If you want to get the avatar, add that processing. (Optional)  
  
※There are several steps. See [How to create your own provider](/login_oauth?id=how-to-create-your-own-provider) for details.

- When the steps are done, do the [On-screen settings](/login_oauth?id=on-screen-settings).



## On-screen settings
When the server settings are done, add the provider on the [login setting screen](/login_setting).

1. Open the System Setting screen with an administrator account.  
Open the login setting screen from the "Login Setting" button at the top right of the page.  
![Login setting screen](ja/img/login/login_setting1.png)  

2. Press the New button to create a login setting. The items to enter are as below.

### Provider type
![Login setting creation screen](ja/img/login/login_oauth1.png)  

- If you chose a provider of (1) in "Server and provider settings", select the name of that provider.  

- If you chose a provider of (2) or (3) in "Server and provider settings", select "Other".  
When you select "Other", "Provider Name" appears. Enter there the alphanumeric provider type that Socialite specifies.  
Example, Microsoft Graph: "graph"

![Login setting creation screen](ja/img/login/login_oauth2.png)  


### Client ID, Client Secret
Enter the strings given by the provider.

### Scope
For login only, it basically has no clear use. We recommend setting it if you get an access token as in [Obtaining an access token](/login_oauth?id=obtaining-an-access-token).

### Option Setting
Set the options that fit the selected provider type.
(It is not shown if you selected a provider type that has no option setting.)

#### In case of the provider type is "other"
![Option setting](img/login/login_setting10.png) 

##### Single Sign-out
When you log out of Exment, you are also logged out of the provider you logged in to by SSO.<span class="red">※Okta is not supported at present.</span>

<!---
  Write the same thing for OAuth and Saml
-->
### User Setting
Set how the logged-in user is handled.

![User setting](ja/img/login/login_setting5.png)  

#### Account search column
Set which column of the account obtained by SSO is used to find the Exment account.

#### Create a new user
- If YES: when the logged-in user does not exist in Exment, a new Exment user is created from the login information.
- If NO: you need to create the user in Exment beforehand. When the logged-in user does not exist in Exment, an error is shown.

#### Role group settings
If YES, the new Exment user can be linked to role groups when it is created.  

#### Update user information
If YES, user information such as the user name is updated when the user logs in again.


- After you save the data once or more, the "Activate" button and the "Login Test" button are shown.

- When the active flag is YES, a button for SSO authentication is shown on the login screen.  
※Normally the default login form, for entering the user ID and password, is shown together. In the [SSO settings](/system_setting?id=sso-settings), you can also hide it as in the image.  
![SSO login screen](img/quickstart/sso1.png)



### Login button settings
Set the login button shown on the login screen.  
※Even without this setting, the providers in "(1) In case of a provider provided as standard by Socialite" above are shown in their own formats.

![User setting](ja/img/login/login_setting6.png)  


### Activation and login test
- After you save the data once or more, the "Activate" button and the "Login Test" button are shown.

![User setting](ja/img/login/login_setting7.png)  

#### activation
- When you run the activation, a button for SSO authentication is shown on the login screen.  
![User setting](ja/img/login/login_setting8.png)  

#### Login test
- Click the "Login Test" button to test a login with the login information you set. You can test even if the login setting is not activated.  
**In that case, temporarily add the URL shown in "Redirect URL for Test" to the callback URL of the provider's OAuth authentication setting, or change the callback URL to it.**

![User setting](ja/img/login/login_setting9.png)  


- Click the "Login" button to test whether the settings are correct.  
The result is shown in the "Execute Result" item.


### Obtaining an access token

- To get the access token and the refresh token after login, get them as follows.

~~~ php
use Exceedone\Exment\Services\Login\LoginService;

$access_token = LoginService::getAccessToken();
$refresh_token = LoginService::getRefreshToken();
~~~



## How to create your own provider
These are the detailed steps for (3). Add the package specified in [Socialite Providers](https://socialiteproviders.github.io/).  
Also create your own provider for getting the avatar. (Optional)

| Step | Required or not |
|---|---|
| Provider settings/addition | Required |
| Development for obtaining avatars | Optional |
| Add service provider | Required |
| Add optional settings | Required for some providers |
| Configure screen settings | Required |

### (Required) Provider settings/addition
- Create an application for Exment at each provider.  
※The callback URL is as follows.  
http(s)://(Exment URL)/auth/login/(socialite provider name)/callback  

    - Example, Microsoft Graph: http(s)://(Exment URL)/auth/login/graph/callback

- Run the following command in the root directory of Exment.

~~~
composer require laravel/socialite=~5.1
~~~
※In Exment v7.0.0 or later, "laravel/socialite" is installed automatically as a dependency of Exment, so you do not need to run this command.

- Add the package specified in [Socialite Providers](https://socialiteproviders.github.io/).  

    - Example: Microsoft Graph

~~~
composer require socialiteproviders/microsoft-graph
~~~

### (Optional) Development for obtaining avatars
※Creating this provider of your own is an optional step for getting the avatar. If you do not need the avatar, you do not need to create it.

- To get the avatar, create two classes that inherit the existing provider, in the folder "app/Socialite". ※If the folder "app/Socialite" does not exist, create it.  
The first one is MicrosoftGraphProvider.php. It implements the interface ProviderAvatar and implements getAvatar.  
In the getAvatar method, write the API processing that gets the avatar. Check the URL and the endpoint for getting it at each OAuth provider.  
The example below is for Microsoft Graph.

~~~ php
<?php

namespace App\Socialite;

use Exceedone\Exment\Auth\ProviderAvatar;
use SocialiteProviders\Graph\Provider;

class MicrosoftGraphProvider extends Provider implements ProviderAvatar
{
    /**
     * Get avatar stream
     * @param mixed $token
     * @return string
     */
    public function getAvatar($token = null){
        try
        {
            $client = $this->getHttpClient();
            $response = $client->get('https://graph.microsoft.com/v1.0/me/photo/$value', [
                'headers' => [
                    'Authorization' => 'Bearer '.$token,
                    'Content-Type' => 'application/json;odata.metadata=minimal;odata.streaming=true'
                ],
                'http_errors' => false,
            ]);

            if($response->getStatusCode() == 404){
                return null;
            }

            return $response->getBody()->getContents();

        }
        catch (Exception $exception)
        {
            return null;
        }
        return null;
    }
}

~~~ 

- The second one is GraphExtendSocialite.php. Specify the MicrosoftGraphProvider you created.

~~~ php
<?php

namespace App\Socialite;

use SocialiteProviders\Manager\SocialiteWasCalled;

class GraphExtendSocialite
{
    /**
     * Execute the provider.
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {
        $socialiteWasCalled->extendSocialite(
            'graph', __NAMESPACE__.'\MicrosoftGraphProvider'
        );
    }
}

~~~ 

### (Required) Add service provider
- Write the provider you added in the file app/Providers/EventServiceProvider.php to add the service provider.  
※What to write depends on whether you did your own development for getting the avatar.  
Also, the class name written at "@handle" is in most cases written in the manual of the provider you added from [Socialite Providers](https://socialiteproviders.github.io/). Please check it.

~~~ php

// Example: Microsoft Graph

protected $listen = [
    ///// If you did your own development for getting the avatar
    'App\Events\Event' => [
        'App\Listeners\EventListener',
    ],
    
    /// Add
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        '\App\Socialite\GraphExtendSocialite@handle', ///// If you did your own development for getting the avatar
        // 'SocialiteProviders\\Graph\\GraphExtendSocialite@handle', ///// For the normal way, uncomment this line and use it
    ],
];

~~~
~~~php

// Example: EntraID

protected $listen = [
    // ... other listeners
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        // ... other providers
        \SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class.'@handle',
    ],
];

~~~

※If Exment v7.0.0 or later was newly installed (a project created with Laravel12), "app/Providers/EventServiceProvider.php" does not exist. In that case, write as follows in the boot method of "app/Providers/AppServiceProvider.php".

~~~php

// Example: EntraID

public function boot(): void
{
    \Illuminate\Support\Facades\Event::listen(
        \SocialiteProviders\Manager\SocialiteWasCalled::class,
        [\SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class, 'handle']
    );
}

~~~


### (Required by Provider) Add optional settings
Some OAuth sign-in providers need additional settings.  

  
Example: [OKTA](https://github.com/SocialiteProviders/Okta)
- Open config/services.php and add the following.

``` php
'okta' => [    
  'base_url' => env('OKTA_BASE_URL'), 
],
```

- Open the .env file and add the following.

```
OKTA_BASE_URL='https://<OKTA domain>'
```

> Socialite itself requires the setting values "client_id", "client_secret" and "redirect" in config/services.php. In the OAuth authentication of Exment, the values set on the screen are given to them automatically.  
If you want to enter setting values that are special to the provider, add the values to config/services.php as above.


### (Required) Configure screen settings

- When all the settings on the server side are done, do the [On-screen settings](/login_oauth?id=on-screen-settings).

  
  
[← Return to login settings](/login_setting)
