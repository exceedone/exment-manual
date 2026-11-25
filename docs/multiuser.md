# Settings for external portal sites (when building a system where users from multiple organizations log in)  
This setting makes the places where users and organizations are selected or displayed **"show only the organizations the login user belongs to, and the users who belong to them"**.  
It is recommended when people from different companies log in to one Exment (for example, a portal site for outside users).

The setting itself is only one item of the System Setting. If you want to know the steps first, see "[Setting method](/multiuser?id=setting-method)" below.

## Background
Originally, Exment was mainly intended for the following uses.

- Sharing information inside a company or an organization
- Sharing information between group companies
- Publishing a REST API and keeping data as a web database

For these uses, it is not a big problem if people can see who is using the system and which organizations and companies are registered. Rather, it is natural that they can see it.

![Role / Authority](img/user/multi_user7.png)

However, for the following uses, **"being able to get the information of other users"** can be a problem.

- Exment accounts are issued to completely different companies that are not group companies, and the data is managed in one web database.
- Exment accounts are issued to individuals, and the system is built as a portal site.

For such uses, **being able to view and get the user information and the company / organization information outside each user's own company can sometimes be a problem.**
  
![Role / Authority](img/user/multi_user8.png)

As an example, suppose Exment is configured as follows.

- In one Exment environment, the persons in charge at vendor companies A, B and C can log in.
- The person in charge at each vendor has the "Edit Personnel Data" permission on the table "Product information", and enters the information of the products the company is in charge of.
- The table "Product information" has a custom column "Person in charge". The company's person in charge of the product is set in the "Person in charge" column.

With the usual settings, **the candidates of the custom column "Person in charge" of the table "Product information" show the persons in charge of all of vendor companies A, B and C.**  
This is because, with the usual settings, a "User" column of Exment shows all users with permission as its options.
  
![Multiple user screen](img/user/multi_user1.png)  
  
So there are cases where you want **"the login users of each organization to see only the organizations and users that the user belongs to"**.
  
This page explains the steps to do the following two things.
- Make the organizations other than those the login user belongs to impossible to display.
- Also make the users other than those who belong to these organizations impossible to display.


## Setting method
1. Go to the System Setting screen and click the "Detail Setting" button at the top right of the screen.
2. Change the "User Organization Filter" item in "Organization Setting" to a suitable setting.

![Multiple user screen](img/user/multi_user2.png)  

The settings you can choose depend on whether the "use organizations" setting of that Exment is YES.

### Setting value (for setting using organization)
With any of the settings, the login user can get only "the organizations that can be got" and "the users who belong to those organizations" (except for "Not filter").

#### Do not narrow down
- This is the default ("Not filter" on the screen). Organizations and users are not narrowed down by the login user.

#### The organization to which the logged-in user belongs and the organization of the parent-child hierarchy. And their affiliated users
- The login user can get only the information of the organizations the user belongs to and of their parent and child organizations.
- The login user can get only the information of the users who belong to those organizations.

#### The organization to which the logged-in user belongs and the organization of the parent hierarchy. And their affiliated users
- The login user can get only the information of the organizations the user belongs to and of their parent organizations.
- The login user can get only the information of the users who belong to those organizations.

#### The organization to which the logged-in user belongs and the organization of the child hierarchy. And their affiliated users
- The login user can get only the information of the organizations the user belongs to and of their child organizations.
- The login user can get only the information of the users who belong to those organizations.

#### The organization to which the logged-in user belongs. And their affiliated users
- The login user can get only the information of the organizations the user belongs to.
- The login user can get only the information of the users who belong to those organizations.


### Setting value (when the setting does not use the organization)
#### Do not narrow down
- This is the default ("Not filter" on the screen). Users are not narrowed down by the login user.

#### Login users only
- The information of users other than the login user cannot be got ("Only login user" on the screen).


## Specifications when this setting is made
With this setting, the screens change as follows.

- **Data edit screen**: the options of a custom column "Organization" become only the organizations the login user can get.  
The options of a custom column "User" also become only the users the login user can get.

![Multiple user screen](img/user/multi_user3.png)  

- **Viewing data**: when a column holds a user or organization that the login user cannot get, a text saying that you have no permission to view it is displayed instead of the link of the user or organization.  
<span class="red">Note: this is not a function that makes the data itself impossible to view. It only stops the user or organization from being displayed.  
When this text appears, the data may be shared with users or organizations that are not the intended target. Check the [permission settings of the data](/permission?id=_3-data-unit).</span>

![Multiple user screen](img/user/multi_user4.png)  

- **Data sharing screen**: the options become only the organizations and users the login user can get.

![Multiple user screen](img/user/multi_user5.png)  

- Only the following users can get all organizations and users, regardless of the organizations they belong to.
    - System administrators
    - Login users who have the "Get All User and Org" permission in the [role group setting](/role_group)

![Multiple user screen](img/user/multi_user6.png)  
