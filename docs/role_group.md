# Role group / Authority setting

A "role group" is the mechanism that decides who may do what (the permissions).  
This page explains how to create a role group, set its permissions, and put users and organizations in it.

- With role groups, specific data and pages can be handled only by the users you decide.
- A newly added user can log in, but cannot use most functions as it is. The system administrator must assign a suitable role group to that user.

> Before you set up role groups, we recommend reading [Overview of roles and permissions in Exment](/permission).

## Image of role group
You can decide what users can do according to their department and job title.  
For example, permissions are assigned by department and job title, as in the figure below.
![Role / Authority](ja/img/role/workgroup1.png)

## List of initial role groups
The role groups that exist from the time of installation.
![Role group screen](img/role/role_group2.png)

### All data manager group
A role group that can edit and view the data of all tables registered by users.

### User / organization management group
A role group that manages the user and organization information and the login user settings.  
It can also change the users and organizations that belong to role groups.

### Announcement information management group
A role group that can create, edit and delete data in "Information", which is installed in Exment from the beginning.

### General group
A group for the users who do not fit any of the above.  
Note: right after installation, no permissions are set for it.


## Role group data structure
A role group is made of two parts: "(1) Authority setting" and "(2) Users and organizations".
![Role / Authority](img/role/role_group1.png)

### (1) Authority setting
An authority (permission) decides whether an operation may be done in Exment.  
For example, there are the following permissions.
##### Management of login users
The permission to give each user the right to log in, and to reset passwords
##### Edit all data
The permission to add, edit and delete all data in a specific table
##### Viewing data you are in charge of
The permission to view the data for which you are the person in charge

Each role group has its own permission settings.

### (2) Users and organizations
Set the users and organizations that belong to the role group.  
When a user set here logs in, the user can do the operations of the permissions of that role group.

## Setting method

### Overall flow of settings
1. Create a role group (the role group name and so on).
1. Decide what can be done in that role group (the permissions).
1. Put the users and organizations that belong to the role group in it.

<span class="red">Note: set the system administrators on the [System Setting page](/system_setting).</span>

### List
Click "Role group" in the menu.  
The list screen of the role groups that have been created is displayed.

![Role group screen](img/role/role_group2.png)

### Create new role group
1. Click the [New] button at the top right of the list screen.
![Role group screen](img/role/role_group3.png)

2. The screen for creating a new role group is displayed. Enter the necessary information and click [Submit].  
![Role group screen](img/role/role_group4.png)

3. After saving, you return to the list screen, and the created role group is displayed.
![Role group screen](img/role/role_group5.png)


### How to change permission settings
1. On the role group list screen, click the row of the created role group.  
Or click the [Permission Setting] link.
![Role group screen](img/role/role_group6.png)

2. The permission setting screen is displayed. Set the permissions. For the types of permissions, see "Type and list of permissions" below.
![Role group screen](img/role/role_group7.png)


### Type and list of permissions
The permissions that can be set have the following types.

| Type | What it decides |
|---|---|
| Whole system | Operations of the whole of Exment |
| Role group | Operations on role groups |
| Plugin permission setting | Changing the settings of plugins, and using them |
| Master permission setting | Operations on the tables that manage master data |
| Table permissions | Operations for each table |


#### System permissions
Permissions that decide the operations of the whole of Exment ("Whole system" on the screen).

##### Authority list
- ##### Custom Table  
The user can add custom tables, and change and delete all custom tables. The user can also add, change and delete all data in the custom tables.
- ##### All Data  
The user can add, change and delete all data in the custom tables.
- ##### Manage login user  
The user can manage the users who log in to Exment: giving the right to log in, resetting passwords, and so on.
- ##### Workflow Settings  
The user can change the workflow settings.
- ##### Manage API Application  
The user can add, change and delete all API applications.
- ##### API Application  
The user can add, change and delete only the API applications the user created. Note: the user cannot view, add, change or delete API applications created by other users.
- ##### Manage Plugin
The user can add, change and delete all plugins. The user can also use the plugins.


#### Role group
Permissions that decide the operations on role groups.

##### Authority list
- ##### Manage the entire role group  
The user can change the settings of the whole role groups: adding, changing and deleting groups, changing the permission settings of groups, and changing the users and organizations.
- ##### Authority setting change  
The user can change the permission settings of role groups.
- ##### User/organization management  
The user can change the users and organizations registered in role groups.



#### Plugin permission setting
You can assign the permissions to access the plugins of Exment.

##### Authority list
- ##### Manage Setting
For a plugin that has settings, the user can change the settings of this plugin.  
Note: the user cannot delete or upload plugins. To allow deleting, add "Manage Plugin".

- ##### Access
The user can actually use the plugin and access its page. What is controlled depends on the type of the plugin.

- **Button, document output**: whether the button is shown on the screen is controlled.
- **Page, dashboard**: whether the page can be accessed is switched.
- **API**: whether the API can be executed is switched. (When access is not allowed, a 403 error occurs.)
- **Import, export**: whether the data import and export can be executed is controlled.
- **Others**: cannot be controlled by role groups. They are executed for all users.



#### Master permission setting
You can assign the permissions on the tables that manage the master data of Exment.

##### Authority list
- ##### Master management  
The user can change the definition of the master. The user can also add, edit and delete master data.
- ##### View  
The user can manage the system views of the specified custom table.
- ##### Edit data  
The user can add, edit and delete master data.
- ##### View data  
The user can view master data. Note: the user cannot edit or delete the data.



#### Table permissions
In Exment, you can create tables to manage data.  
Permissions can be assigned for each of those tables.  
For example, they are used as follows.
- The users of the sales department can edit and view all data of the table "Sales activities".
- The users of the engineering department can edit and view all data of the table "Engineering management".
- The users of a partner company can view only the data they have permission for in the table "Order request".

##### Authority list
- ##### Custom Table  
The user can modify the table definition, the forms and so on of the specified custom table.  
The user can also add, edit and delete all data in the specified custom table.
- ##### Form  
The user can add, edit and delete forms of the specified custom table.
- ##### Public Form Management  
The user can add, edit and delete public form settings of the specified custom table.  
Note: shown only when "Use public form" is YES in the System Setting.  
Note: the user cannot add, edit or delete the forms themselves.
- ##### View  
The user can manage the system views of the specified custom table.
- ##### Edit All Data  
The permission to add, edit and delete all data in the specified custom table.
- ##### View All Data  
The permission to view all data in the specified custom table.  
Note: the user cannot edit or delete the data.
- ##### Edit Personnel Data  
The permission to add, edit and delete the data in the specified custom table for which the login user is set as the person in charge.
- ##### View Personnel Data  
The permission to view the data in the specified custom table for which the login user is set as the person in charge.  
Note: the user cannot edit or delete the data.
- ##### Data sharing  
The permission to share the data the user can edit with other users and organizations.
- ##### Import  
The user can import data into the specified custom table from a file in csv or Excel format.
- ##### Export  
The user can export the data of the specified custom table to a file in csv or Excel format.
- ##### Show Trashed Data  
The user can display logically deleted data again. Note: to restore the data, the edit permission for that data is needed.


### User / organization setting method
How to change the users and organizations that belong to a role group.

- On the list screen, click the user link.
![Role group screen](img/role/role_group8.png)  
Or click the [User/organization setting] button at the top right of the permission setting screen.  
![Role group screen](img/role/role_group9.png)  

- The user/organization setting screen is displayed. Register the users and organizations that belong to this role group.  
![Role group screen](img/role/role_group10.png)

### Delete
- On the role group list screen, click the [Delete] link.
![Role group screen](img/role/role_group11.png)


### Others

#### When several role groups are added
When several role groups are given to one user or one organization, the result is all the permissions of those role groups put together.

- Example: User A
    - Role group X
        - Table 1
            - Edit Personnel Data
        - Table 2
            - View Personnel Data
        - Table 3
            - View All Data
        
    - Role group Y
        - Table 1
            - View All Data
        - Table 4
            - Edit Personnel Data

    - <span class="red">→ The final permissions of User A</span>
        - Table 1
            - View All Data
            - Edit Personnel Data
        - Table 2
            - View Personnel Data
        - Table 3
            - View All Data
        - Table 4
            - Edit Personnel Data
