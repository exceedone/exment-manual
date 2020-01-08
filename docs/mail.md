# Mail template
Set the subject, body, etc. of the email when sending email from the system.

## Management method
### Page display
- From the left menu, select "Email template".  
Or access the following URL.  
http (s): // (Exment URL) / admin / mail  
This will display the plugin screen.  
![Email template screen](img/mail/mail_grid1.png)  

### Add new template
- On the "Email Template" screen, click the "New" button at the top right of the page.

- The new mail template addition screen is displayed.
![Email template screen](img/mail/mail_new1.png)

- Enter the required information.
![Email template screen](img/mail/mail_new2.png)

### Save
After entering the settings, click “Save”.

### Edit
If you want to edit a template, click the "Edit" link in the corresponding row.
![Email template screen](img/mail/mail_edit.png)

### Delete
To delete a column, click the "Delete" link in the corresponding row.
![Email template screen](img/mail/mail_delete.png)
**<span style="color: red; ">※ However, templates installed on the system cannot be deleted.</span>**


## Variable rules
Variables can be used in "Email subject" and "Email body".  
By using variables, registered data and system names can be added to the subject and body.  

### Variable list
#### Common
Check the following pages for common parameter variables.  
[Parameter variables](/params)

#### Destination user

| item | Description |
| ---- | ---- |
| ${user.user_name} | User name of the mail destination user |
| ${user.user_code} | User code of the mail destination user |
| ${user.email} | E-mail address of the e-mail destination user |

#### Password reset
It can be used only when sending a password reset e-mail.  

| item | Description |
| ---- | ---- |
| ${system.password_reset_url} | System password reset URL |
| ${user.password} | Login password of the mail destination user |
