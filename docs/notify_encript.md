# Attachment encryption for notifications
An email notification can have attached files.  
With the setting on this page, the system encrypts the attached files by itself before it sends them (they become an encrypted zip file).

There are two settings.

1. Add one line to `.env` (the same for Windows and Linux)
2. Install software that makes zip files on the server (different for Windows and Linux)

## Windows, Linux common

- Add the following content to `.env`.

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- Install 7-zip to create an encrypted zip file.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- Install zip using the package command of the OS, such as yum.

~~~
// For CentOS
yum install zip
~~~

This completes the settings.
