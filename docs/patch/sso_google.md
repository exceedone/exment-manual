# Bug fix I can't SSO with my Google account
### Defect occurrence conditions
- Under v3.0.17, you are using SSO's Google login
- And you are using Socialite 3.2.0
- Exment SSO does not allow you to log in successfully

### Cause of trouble
Due to the termination of Google+ service

### Bug version
- Exment v3.0.16 or less
- Sociite 3.2.0

### How to fix
- [Update](/update) the version of Exment to v3.0.17 or higher.
- Execute the following command.

~~~
composer require laravel/socialite=~3.3.0
~~~

- You can now log in.