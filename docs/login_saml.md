# Single sign-on (SAML)
How to set up single sign-on (SSO) with SAML.  
In Exment, you can add single sign-on in the [Login Setting](/login_setting). Once it is added, users can log in with the ID and password of the provider (the service that handles the login), and you do not have to manage a login password only for Exment.

Do the settings in these two steps, in order.

1. **Prepare the server and the provider** (install the library and create an application on the provider side) … "Server and provider settings"
2. **Settings on the screen** (add the provider on the login setting screen) … "On-screen settings"

#### Important point
- **This manual is for those who are familiar with SAML. For how to set up each provider, please refer to their documents.**
- This manual and the Exment screens say "SAML", but SAML2 is actually used.


## Server and provider settings
Before you add a provider on the login setting screen, you need to run commands on the server to install the extension.

1. Run the following command in the root directory of Exment.

~~~
composer require aacotroneo/laravel-saml2
~~~

2. Create an application for Exment at each SAML provider.  
※The callback URL is as follows.  
http(s)://(Exment URL)/saml/login/(the SAML name you add later)/acs  

> ※The URL is for the default setting without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an older version has "admin"), add that value after the URL of the site (e.g. `http(s)://(Exment URL)/admin/saml/login/(the SAML name you add later)/acs`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

3. Do the [On-screen settings](/login_saml?id=on-screen-settings).


## On-screen settings
When the server settings are done, add the provider on the [login setting screen](/login_setting).

1. Open the System Setting screen with an administrator account.  
Open the login setting screen from the "Login Setting" button at the top right of the page.  
![Login setting screen](ja/img/login/login_setting1.png)  

2. Press the New button to create a login setting. The items to enter are as below.

- **SAML Name** : The provider name used in the callback URL and so on. Enter it in alphanumeric characters, so that it is not the same as any other.

![Login setting](ja/img/login/login_saml1.png)  

### IdP Setting
Enter the settings of the IdP.
![Login setting](ja/img/login/login_saml2.png)  

### SP Setting
Enter the settings of the SP.
![Login setting](ja/img/login/login_saml3.png)  

### Option Setting
Enter the option settings.
![Login setting](ja/img/login/login_saml4.png)  


### Mapping Setting
The field names returned from the provider have to be matched to the field names of the "User" table of Exment.  

![Login setting](ja/img/login/login_mapping.png)  

Enter the field names returned from the provider.

![Login setting](ja/img/login/login_mapping1.png)  

There are three ways to write them.

| Way to write | When to use | Example |
|---|---|---|
| Write the field name as it is | Use one field as it is | |
| Write several, separated by commas | There are several candidates; the first one that has a value is used | seimei,username |
| Write several in the form ${field name} | Combine several fields | ${last_name} ${first_name} |

#### Write the field name as it is
Write the field name returned from the provider as it is.
![Login setting](ja/img/login/login_mapping3.png)  

#### Write several field names separated by commas
When there are several candidates for the field you want to use, write the field names returned from the provider, separated by commas.  
The values are looked for in order from the first one, and the first value found is used.  
(Example: you would like to use the full name field "seimei", but it is not a required item on the provider side. So use the value of "seimei" as the user name if it has one, and "username" if not → write seimei,username)
![Login setting](ja/img/login/login_mapping4.png)  

#### Write several field names in the form ${field name}
This is how to write when you want to combine several pieces of the user information returned from the provider and use them as the user information of Exment. Write several fields in the form ${field name}.  
(Example: the provider has no "full name" field, but it has the "last name (last_name)" and "first name (first_name)" fields. So combine them as "last name first name" → write ${last_name} ${first_name})
![Login setting](ja/img/login/login_mapping5.png)  


### User Setting
Set how the logged-in user is handled.

![User setting](ja/img/login/login_setting5.png)  

#### Account Search Column
Set which column of the account obtained by SSO is used to find the Exment account.

#### Create User
- If YES: when the logged-in user does not exist in Exment, a new Exment user is created from the login information.
- If NO: you need to create the user in Exment beforehand. When the logged-in user does not exist in Exment, an error is shown.

#### Role group settings
If YES, the new Exment user can be linked to role groups when it is created.  

#### Update User Info
If YES, user information such as the user name is updated when the user logs in again.


- After you save the data once or more, the "Activate" button and the "Login Test" button are shown.

- When the active flag is YES, a button for SSO authentication is shown on the login screen.  
※Normally the default login form, for entering the user ID and password, is shown together. In the [SSO settings](/system_setting?id=sso-settings), you can also hide it as in the image.  
![SSO login screen](img/quickstart/sso1.png)



### Login Button Setting
Set the login button shown on the login screen.  

![User setting](ja/img/login/login_setting6.png)  


### Activation and login test
- After you save the data once or more, the "Activate" button and the "Login Test" button are shown.

![User setting](ja/img/login/login_setting7.png)  

#### Activation
- When you run the activation, a button for SSO authentication is shown on the login screen.  
![User setting](ja/img/login/login_setting8.png)  

#### Login Test
- Click the "Login Test" button to test a login with the login information you set. You can test even if the login setting is not activated.  
**In that case, temporarily add the URL shown in "Redirect URL for Test" to the callback URL of the provider's SAML authentication setting, or change the callback URL to it.**

![User setting](ja/img/login/login_setting9.png)  


- Click the "Login" button to test whether the settings are correct.  
The result is shown in the "Execute Result" item.

![Login setting](ja/img/login/login_saml9.png)  

![Login setting](ja/img/login/login_saml10.png)  
  
  
[← Return to login settings](/login_setting)
