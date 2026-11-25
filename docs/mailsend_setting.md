# Email sending settings
The settings for sending emails from Exment, and the steps to send a test email after the settings.  

There are two steps.

1. Set how emails are sent (usually you enter the SMTP settings on the System Setting screen)
2. Send a test email and check that it arrives

> Note: matters of the email sending feature such as "emails do not arrive" or "emails are classified as junk mail" depend largely on each server and environment, so they are outside our inquiries.  

## Overview
- Exment sometimes sends emails from the system.  
Examples:
    - Data update notifications
    - Two-factor authentication

- To send emails, settings such as SMTP are needed.

- There are two ways to set it.
    - [Set from the screen (default)](/mailsend_setting?id=setting-method-set-from-the-screen):   
    Enter the SMTP settings on the System Setting screen. Use this when you send emails by ordinary SMTP.
    
    - [Set with a config file or the env file](/mailsend_setting?id=setting-method-set-with-config-file-or-env-file):  
    Use this when you send emails by a method that is not SMTP, such as Amazon SES. You edit setting files on the server and use composer. Note: for advanced users.

### Setting method-Set from the screen
- The system administrator opens the System Setting screen.

- Enter the following settings.
![System setting screen](img/system_setting/system_setting_mail.png)  

- When you enter "Host Name" and save, Exment sends emails by SMTP, using the settings of the screen.  
It sends by SMTP even when "MAIL_MAILER" in ".env" is still "log", the initial value of Laravel (a setting that writes the mail to the log without sending it).  
Note: when "MAIL_MAILER" in ".env" is set to something other than "log" (sendmail, ses and so on), that sending method is used.  
Note: when "EXMENT_MAIL_SETTING_ENV_FORCE=true" is set in ".env", the settings of the screen are not used. See [Set with a config file or the env file](/mailsend_setting?id=setting-method-set-with-config-file-or-env-file) for details.

Note: SMTP setting example (Xserver): [here](https://www.xserver.ne.jp/manual/man_mail_setting.php)  

Note: SMTP setting example (Sakura Internet): [here](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)  


### Setting method-Set with config file or env file
Exment usually sends emails with the values saved in "System Setting" on the screen.  
When you want to send emails by a method that is not SMTP, such as Amazon SES, you can use the standard way of Laravel (writing the settings in the ".env" file).  
To use this way, make the following settings. Note: for advanced users.


- Open the .env file and enter the following setting value.

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- After that, set up the mail sending driver of Laravel.

- We recommend also entering the following settings in .env.

~~~
MAIL_FROM_ADDRESS=(sender address)
MAIL_FROM_NAME=(name shown as the sender)
~~~

## SPF record settings
- When the emails you send become junk mail, in many cases the "SPF record" setting of the domain is not enough. Register an SPF record in the settings of the domain.  
[Reference 1](https://sendgrid.kke.co.jp/blog/?p=3509)  
[Reference 2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/)  


## Send test email
- With the settings above, you can send a test email.  
You can send it from the screen or by a command.

### Run from screen
- The system administrator opens the System Setting screen.

- Enter the destination in the "Send TestMail" item and press [Send TestMail].

![System setting screen](img/system_setting/system_setting_mail_testmail.png)  

Note: you need to save "System Mail Settings", in the upper part of the page, first. Save once, and then send the test email.


### Execute from command
- Run the following command in the root folder of the project.

~~~
php artisan exment:notifytest --to=(mail destination)
~~~

### In case of transmission error
- An error log is written to "storage/logs/laravel.log". Please check it.
