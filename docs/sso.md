# Single sign-on
Exment allows single sign-on (SSO).  
This allows you to use each provider's ID and password without having to manage Exment-specific login passwords.

- [Setup steps](#Setup-steps)
- [Access token acquisition](#Access-token-acquisition)


#### Important point
- Even when using single sign-on, users must be added in advance on the [user management screen](/user.md#user-management).  
This is to prevent an unintended user from logging in and using Exment.  
If a user who has not been added as an Exment user attempts to log in to Exment using the user information of each provider, an error will occur.  
- In Exment, [Socialite](https://github.com/laravel/socialite) implements single sign-on processing.
- **This manual is for those who are familiar with OAuth. Please refer to each document for how to create Client ID and Client Secret of each provider.**


### Setup steps
#### Example 1 In case of provider provided by Socialite standard
- The providers provided by the Socialite standard are as follows. (The parentheses will be used later in the service specification.)
    - Google (google)
    - Facebook (facebook)
    - Twitter (twitter)
    - GitHub (github)
    - LinkedIn (linkedIn)
    - Bitbucket (bitbucket)

- For each provider, create an application for Exment.  
※ The callback URL is as follows.  
http(s)://(Exment URL)/admin/auth/ login/(socialite provider name)/callback  
Example 1 For GitHub: http(s)://(Exment URL)/admin/ auth/login/github/callback  
Example 2 For Facebook: http(s)://(Exment URL)/admin/ auth/login/facebook/callback  
Example 3 For Google: http(s)://(Exment URL)/admin/auth/login/google/callback  

- Execute the following command in the Exment root directory.  

~~~
composer require laravel/socialite=~3.3.0
~~~

- Enter the client_id and client_secret of each provider in config/services.php.  
The "redirect" property is set automatically.  

~~~ php

'github' => [
    'client_id'     => 'xxxxxxxxxxxxxxxx',
    'client_secret' => 'yyyyyyyyyyyyyyyy',
    'scope' => '', //Optional. Set when changing the scope. Multiples are separated by commas. Supported by v2.1.7
],

// If you write like this, please write FB_CLIENT_ID and FB_CLIENT_SECRET in .env file
'facebook' => [
    'client_id'     => env('FB_CLIENT_ID'),
    'client_secret' => env('FB_CLIENT_SECRET'),
    'scope' => '', //Optional. Set when changing the scope. Multiples are separated by commas. Supported by v2.1.7
],


//  In this case, please write GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file
'google' => [
    'client_id' => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'scope' => '', //Optional. Set when changing the scope. Multiples are separated by commas. Supported by v2.1.7
]

~~~

- Add the following content to the .env file.

~~~
EXMENT_LOGIN_PROVIDERS=github,facebook,google #comma separated list of providers using SSO
EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER=true #Whether to show normal login. False recommended when using SSO
~~~

- On the login screen, an SSO button is displayed.  
![SSO login screen](img/quickstart/sso1.png)


#### Example 2 In case of provider provided by Exment extension
- Some providers provide providers as an extension of Exment. (The parentheses will be used later in the service specification.)
    - Office365、Microsoft Graph (graph)

> Initially, Office 365 login was guided by the method of "Example 3" below, but the procedure has been improved to Example 2 to reduce the labor.

- For each provider, create an application for Exment.  
※ The callback URL is as follows.  
http(s): // (Exment URL) / admin / auth / login / (socialite provider name) / callback  
Example For Office365: http(s)://(Exment URL)/admin/ auth / login / graph / callback  

- Execute the following command in the Exment root directory.  

~~~
composer require exment-oauth/microsoft-graph
~~~

- Enter the client_id and client_secret of each provider in config/services.php.  
By default, there is no button style for Office365, so you need to make additional settings.  

~~~ php
'graph' => [
    'client_id'     => 'xxxxxxxxxxxxxxxx',
    'client_secret' => 'yyyyyyyyyyyyyyyy',
    'font_owesome' => 'fa-windows', // icon. Specify with font-awesome
    'display_name' => 'Office365', // text to display on screen
    'background_color' => '#D83B01', // background color
    'font_color' => '#FFFFFF', // font color
    'background_color_hover' => '#ff501e', //  background color when on-mouse
    'font_color_hover' => '#FFFFFF', // text color when mouse is on
    'scope' => 'offline_access', //optional. Set when changing the scope. Multiples are separated by commas. Supported by v2.1.7
],
~~~

- Add the following content to the .env file.

~~~
EXMENT_LOGIN_PROVIDERS=graph #Comma separated list of providers using SSO
EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER=true #Whether to show normal login. False recommended when using SSO
~~~

- On the login screen, an SSO button is displayed.  
![SSO login screen](img/quickstart/sso2.png)


#### Example 3 When preparing a provider by yourself
※ If the provider is not in Examples 1 and 2, add an unofficial provider in [Socialite Providers](https://socialiteproviders.github.io/).  
Also, unofficial providers do not include processing for obtaining avatars, so we will add processing. (Any)  

> Currently, in the operation of Exment, we want to implement login implementation with various providers.  
Therefore, if anyone implements login with a provider that is not in Example 1 or 2, we would be very happy if you could provide the source code.

- For each provider, create an application for Exment.  
※ The callback URL is as follows.  
http(s)://(Exment URL)/admin/ auth / login / (socialite provider name) / callback  
Example For Office365: http(s)://(Exment URL)/admin/ auth / login / graph / callback  

- Execute the following command in the Exment root directory.  

~~~
composer require laravel/socialite=~3.3.0
composer require socialiteproviders/microsoft-graph
~~~

- Enter the client_id and client_secret of each provider in config/services.php.  
By default, there is no button style for Office365, so you need to make additional settings.  

~~~ php
'graph' => [
    'client_id'     => 'xxxxxxxxxxxxxxxx',
    'client_secret' => 'yyyyyyyyyyyyyyyy',
    'font_owesome' => 'fa-windows', // icon. Specify with font-awesome
    'display_name' => 'Office365', // text to display on screen
    'background_color' => '#D83B01', // background color
    'font_color' => '#FFFFFF', // font color
    'background_color_hover' => '#ff501e', // background color when on-mouse
    'font_color_hover' => '#FFFFFF', // text color when mouse is on
],
~~~

- Add the following content to the .env file.  

~~~
EXMENT_LOGIN_PROVIDERS=graph #Comma separated list of providers using SSO
EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER=true #Whether to show normal login. False recommended when using SSO
~~~

- (Optional) To get an avatar, create a class in App \ Socialite that inherits from the existing provider.  
The first is MicrosoftGraphProvider.php. Implements the interface ProviderAvatar and implements getAvatar.  

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

- The second is GraphExtendSocialite.php. Specify the created MicrosoftGraphProvider.  

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

- Enter the added provider in **App\Providers\EventServiceProvider.php**.  

~~~ php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        
        ///  add to
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            // 'SocialiteProviders\Graph\GraphExtendSocialite@handle', ///// normal get
            '\App\Socialite\GraphExtendSocialite@handle', ///// When inheriting to get avatar
        ],
    ];

    // ...
}

~~~


- On the login screen, an SSO button is displayed.
![SSO login screen](img/quickstart/sso2.png)



### Access token acquisition
> Supported from v2.1.7.

- After login, if you want to get access token and refresh token, please do so by the following method.

~~~ php
use Exceedone\Exment\Services\LoginService;

$access_token = LoginService::getAccessToken();
$refresh_token = LoginService::getRefreshToken();
~~~