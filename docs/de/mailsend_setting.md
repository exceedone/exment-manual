# Einstellungen für den E-Mail-Versand
Dies sind die Einstellungen, damit Exment E-Mails senden kann, und die Schritte, um danach eine Test-E-Mail zu senden.  

Es sind die folgenden 2 Schritte.

1. Die Art des E-Mail-Versands einstellen (normalerweise geben Sie die SMTP-Werte im Bildschirm der Systemeinstellungen ein)
2. Eine Test-E-Mail senden und prüfen, ob sie ankommt

> ※Der E-Mail-Versand hängt stark vom jeweiligen Server und von der Umgebung ab. Anfragen wie „E-Mails kommen nicht an“ oder „E-Mails landen im Spam“ nehmen wir deshalb nicht an.  

## Überblick
- Exment sendet manchmal E-Mails aus dem System.  
Beispiele:
    - Benachrichtigung über Datenaktualisierungen
    - Zwei-Faktor-Authentifizierung

- Für den E-Mail-Versand sind Einstellungen wie SMTP nötig.

- Es gibt 2 Wege der Einstellung.
    - [Am Bildschirm einstellen (Standard)](/de/mailsend_setting?id=Einstellung-am-Bildschirm):   
    Sie geben die SMTP-Werte im Bildschirm der Systemeinstellungen ein. Diesen Weg nutzen Sie, wenn Sie E-Mails mit normalem SMTP senden.
    
    - [In der config-Datei oder env-Datei einstellen](/de/mailsend_setting?id=Einstellung-in-der-config-Datei-oder-env-Datei):  
    Für den Versand auf anderen Wegen als SMTP, zum Beispiel Amazon SES. Sie ändern Konfigurationsdateien auf dem Server oder nutzen composer. ※Für Fortgeschrittene.

### Einstellung am Bildschirm
- Der Systemadministrator öffnet den Bildschirm der Systemeinstellungen.

- Geben Sie die folgenden Einstellungen ein.
![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_mail.png)  

- Wenn Sie den „Hostname“ eingeben und speichern, sendet Exment die E-Mails per SMTP mit den Einstellungen des Bildschirms.  
Das gilt auch, wenn „MAIL_MAILER“ in „.env“ noch auf dem Laravel-Anfangswert „log“ steht (E-Mails werden nicht gesendet, sondern ins Protokoll geschrieben).  
※Wenn „MAIL_MAILER“ in „.env“ auf einem anderen Wert als „log“ steht (sendmail, ses usw.), wird dieser Versandweg genutzt.  
※Wenn „EXMENT_MAIL_SETTING_ENV_FORCE=true“ in „.env“ steht, werden die Einstellungen des Bildschirms nicht genutzt. Einzelheiten stehen unter [In der config-Datei oder env-Datei einstellen](/de/mailsend_setting?id=Einstellung-in-der-config-Datei-oder-env-Datei).

※Beispiel für SMTP-Einstellungen (Xserver): [hier](https://www.xserver.ne.jp/manual/man_mail_setting.php)  

※Beispiel für SMTP-Einstellungen (Sakura Internet): [hier](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)  


### Einstellung in der config-Datei oder env-Datei
Normalerweise sendet Exment E-Mails mit den Werten, die im Bildschirm „Systemeinstellungen“ gespeichert sind.  
Wenn Sie E-Mails auf einem anderen Weg als SMTP senden möchten, zum Beispiel mit Amazon SES, können Sie den Standardweg von Laravel nutzen (die Einstellungen in die Datei „.env“ schreiben).  
Nehmen Sie dafür die folgenden Einstellungen vor. ※Für Fortgeschrittene.


- Öffnen Sie die Datei .env und tragen Sie den folgenden Wert ein.

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- Stellen Sie danach den E-Mail-Treiber von Laravel ein.

- Wir empfehlen, dazu auch die folgenden Werte in .env einzutragen.

~~~
MAIL_FROM_ADDRESS=(Absenderadresse)
MAIL_FROM_NAME=(Name, der als Absender angezeigt wird)
~~~

## Einstellung des SPF-Eintrags
- Wenn gesendete E-Mails im Spam landen, fehlt in den meisten Fällen der „SPF-Eintrag“ der Domain. Tragen Sie in den Einstellungen der Domain einen SPF-Eintrag ein.  
[Referenz 1](https://sendgrid.kke.co.jp/blog/?p=3509)  
[Referenz 2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/)  


## Test-E-Mail senden
- Mit den Einstellungen oben können Sie eine Test-E-Mail senden.  
Das geht am Bildschirm und per Befehl.

### Am Bildschirm ausführen
- Der Systemadministrator öffnet den Bildschirm der Systemeinstellungen.

- Geben Sie im Feld „Empfänger der Test-E-Mail“ den Empfänger ein und klicken Sie auf [Test-E-Mail senden].

![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_mail_testmail.png)  

※Vorher müssen die „System-E-Mail-Einstellungen“ weiter oben auf der Seite gespeichert sein. Speichern Sie einmal und senden Sie dann die Test-E-Mail.


### Per Befehl ausführen
- Führen Sie im Stammordner des Projekts den folgenden Befehl aus.

~~~
php artisan exment:notifytest --to=(Empfänger der E-Mail)
~~~

### Bei einem Sendefehler
- Das Fehlerprotokoll steht in „storage/logs/laravel.log“. Bitte sehen Sie dort nach.


