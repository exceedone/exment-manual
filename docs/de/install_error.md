# Wenn bei der Installation ein Fehler auftritt
Je nach Serverumgebung und Version kann zum Beispiel bei der Installation ein Fehler auftreten.  
Diese Seite fasst für jeden Fehler zusammen, was zu tun ist.  

## Wenn beim Befehl „php artisan exment:install“ ein Fehler auftritt
Wenn Sie den Befehl „php artisan exment:install“ ausführen, kann ein Fehler wie der folgende auftreten.

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- Ursache: Der Fehler tritt auf, wenn die MySQL-Version älter als 5.7.7 ist.
- Abhilfe: Aktualisieren Sie MySQL auf Version 8.0 oder höher.

## Nach der ersten Installation tritt beim Aufruf der Verwaltungsseite der Fehler „SQLSTATE[HY000][202] Permission denied“ auf
Wenn Apache auf MySQL zugreift, kann eine Einstellung von SELinux (einer Sicherheitsfunktion von Linux) nötig sein.  
Wenn dieser Fehler auftritt, führen Sie bitte den folgenden Befehl aus.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## Auf einem Mietserver wird bei Befehlen wie „composer require“ die Meldung „Killed“ angezeigt
Das passiert gelegentlich, wenn der Arbeitsspeicher stark belastet ist (es passiert nicht immer).  
Wenn diese Meldung erscheint, stellen Sie dem Befehl „nice -n 20“ voran und führen Sie composer so aus. Der Befehl läuft dann mit niedrigerer Priorität.

~~~
nice -n 20 composer .....
~~~

※Auch bei dieser Ausführung kann „Killed“ erneut angezeigt werden. Wir bitten um Ihr Verständnis.
