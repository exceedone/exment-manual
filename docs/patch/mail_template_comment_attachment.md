# Bug fix Incorrect display of notification executor when commenting / attaching data
### Defect occurrence conditions
- Create a notification "New data creation / update / sharing / comment" in the environment of v3.7.5 or lower
- Add a comment or attachment
- In the body of the notification, it will be displayed as if it was executed by the data updater instead of the original performer.

### Defect image
- User "user2" adds a comment or an attached file to the data whose update user is "user1".
- The body of the notification is as follows. (The comment was made by user2, but it looks like user1 commented.)

`` ```
■ Subject:
[Exment] Data has been commented

■ Body:
The data for XXXX has been commented by user user1.
Please check the following contents.
(Omitted below)
`` ```

### Bug version
The version when the installation is executed is v3.7.5 or lower
* This is not the current version. It will be the version when the installation was performed.

### How to fix
- Open the notification template (email template).

- Edit the data with the notification key name "data_saved_notify".

- Correct the first line of the notification body as follows.

`` ```
■ Before correction
User $ {updated_user} has $ {create_or_update} the data in $ {target_table}.
■ After correction
User $ {target_user} has $ {create_or_update} the data in $ {target_table}.
`` ```

### v3.7.6 or later
- Since v3.7.6 or later, the notification template (email template) has been fixed from the beginning, so this bug does not occur.