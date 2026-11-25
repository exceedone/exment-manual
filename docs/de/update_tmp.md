# Wenn Sie das Programm vorübergehend austauschen
Hier steht, wie Sie das Programm von Exment unabhängig vom normalen Update vorübergehend austauschen.  
Das verwenden Sie in den folgenden Fällen.

| Was Sie tun möchten | Wo Sie nachsehen |
|---|---|
| Eine Vorabversion (eine Version in Entwicklung) installieren | „Eine Entwicklungsversion einspielen“ |
| Eine frühere Version installieren | „Eine Entwicklungsversion einspielen“ (mit denselben Schritten geben Sie die frühere Version an) |
| Einen fehlerhaften Teil des Quellcodes vor der offiziellen Veröffentlichung vorübergehend austauschen | „Den Quellcode austauschen“ |

**Bitte zuerst lesen**

- Nachdem Sie eine Entwicklungsversion installiert haben, kann der Quellcode aktualisiert werden. Wenn Sie danach zurückwechseln, läuft Exment unter Umständen nicht mehr richtig.  
Vor allem bei der Definition der Datenbank können nach einer Änderung Unstimmigkeiten entstehen. Wir bitten um Verständnis.
- Wenn Sie eine frühere Version installieren, ändern sich die Versionen der zugehörigen Bibliotheken. Exment läuft dann unter Umständen nicht mehr richtig.


### Eine Entwicklungsversion einspielen
Eine Entwicklungsversion oder eine frühere Version installieren Sie mit den folgenden Schritten.

1. Sichern Sie den gesamten Quellcode im Ordner „vendor/exceedone/exment“.
2. Führen Sie in der Befehlszeile die folgenden Befehle aus. Erstellen Sie zuerst die Sicherung. Führen Sie danach die 2 Zeilen aus, die zur gewünschten Version passen (Entwicklungsversion oder frühere Version).

~~~
# Sicherung ausführen (sie umfasst vor allem die Datenbank, der Quellcode wird nicht gesichert)
php artisan exment:backup

# Eine Entwicklungsversion von Exment angeben. Beispiel: Um die Version „release_foobar“ zu installieren, die folgenden Schritte ausführen
composer require exceedone/exment=dev-release_foobar
php artisan exment:update

# Eine frühere Version von Exment angeben. Beispiel: Um die Version „4.3.1“ zu installieren, die folgenden Schritte ausführen
composer require exceedone/exment=v4.3.1
php artisan exment:update
~~~

#### Von der Entwicklungsversion zur neuesten Version zurückkehren
Mit einem der beiden folgenden Wege wechseln Sie zur neuesten Version.

- Das [Update](/de/update) ausführen.
- Die folgenden Befehle ausführen.

~~~
composer require exceedone/exment
php artisan exment:update
~~~



### Den Quellcode austauschen
Einen Teil des Quellcodes tauschen Sie mit den folgenden Schritten aus.

1. Sichern Sie den gesamten Quellcode im Ordner „vendor/exceedone/exment“.  
Oder kopieren Sie nur den Quellcode, den Sie gleich austauschen, und benennen Sie die Kopie um.
2. Legen Sie den neuen Quellcode an die passende Stelle in „vendor/exceedone/exment“.

#### Von der Entwicklungsversion zur neuesten Version zurückkehren
Mit einem der beiden folgenden Wege wechseln Sie zur neuesten Version.  
<span class="red">※ Während der Ausführung kann eine Meldung erscheinen, die fragt, ob Dateien überschrieben werden sollen.</span> Stimmen Sie dann zu und setzen Sie den Austausch fort.

- Das [Update](/de/update) ausführen.
- Die folgenden Befehle ausführen.

~~~
composer require exceedone/exment
php artisan exment:update
~~~
