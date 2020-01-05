# Attachment encryption for notifications
Attachments can be added when notifying by email.  
By making the settings, the attached file can be automatically encrypted by the system and sent by e-mail.  
The setting method is described.  

## Windows, Linux common

- Add the following content to ".env".

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- Install 7-zip to create an encrypted zip file.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- Install zip using the package command of the OS such as yum.  

~~~
// For CentOS
yum install zip
~~~

This completes the settings.