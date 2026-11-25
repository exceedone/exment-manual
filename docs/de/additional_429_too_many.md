# Wenn bei der API der Fehler 429 auftritt
Beim Aufruf der API von Exment kann der Fehler 429 (429 Too Many Requests) auftreten.  
Diese Seite erklärt den Grund und wie Sie die Obergrenze für die Anzahl der Zugriffe ändern.

- Exment begrenzt die Anzahl der Zugriffe auf die API auf 60 pro Minute je Benutzer (ohne Anmeldung je IP-Adresse).
- Wird die Obergrenze überschritten, kommt der Fehler 429 Too Many Requests.
- Der Grund: Das Framework, das Exment verwendet (Laravel), begrenzt eine große Zahl von Anfragen.

### Einrichtung 
**(1)** Öffnen Sie die Datei „.env“ im Projektordner.

**(2)** Tragen Sie bei „EXMENT_API_MAX_RATE_LIMIT“ die Obergrenze für die Anzahl der Zugriffe pro Minute ein. Der Standardwert ist 60.  
※Wenn es bereits einen Schlüssel mit demselben Namen gibt, ändern Sie dessen Wert.

Beispiel: bis zu 120 Zugriffe pro Minute erlauben

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** Wenn Sie den Cache der Konfiguration verwenden, führen Sie „php artisan config:cache“ noch einmal aus.

> Einzelheiten zu dem Einstellungswert finden Sie in der [Liste der Exment-Einstellungswerte](/de/config).

### Hinweise
- **Wenn Sie ein eigenes throttle geschrieben haben**: Wenn Sie in „app/Http/Kernel.php“ oder „bootstrap/app.php“ für die Middleware-Gruppe api ein eigenes throttle mit direkt angegebener Anzahl (zum Beispiel „throttle:60,1“) eingestellt haben, hat dieses Vorrang, und „EXMENT_API_MAX_RATE_LIMIT“ wird nicht verwendet. Wenn Sie mit „EXMENT_API_MAX_RATE_LIMIT“ einstellen möchten, löschen Sie den Eintrag des eigenen throttle.
- **Ab v7.0.0**: Wenn die Middleware-Gruppe api keine throttle-Einstellung hat, fügt Exment automatisch „throttle:api“ hinzu. Deshalb lässt sich die Begrenzung nicht aufheben, indem Sie den throttle-Eintrag in „app/Http/Kernel.php“ auskommentieren. Wenn Sie die Begrenzung lockern möchten, stellen Sie bei „EXMENT_API_MAX_RATE_LIMIT“ einen großen Wert ein.
- **v6.x und älter**: Die Begrenzung erfolgt durch den Eintrag „\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'“ (der Standardeintrag von Laravel 10) in der Middleware-Gruppe api von „app/Http/Kernel.php“. Exment fügt „throttle:api“ nicht automatisch hinzu. Wenn Sie diesen Eintrag auskommentieren, können Sie die Begrenzung daher aufheben.
- „EXMENT_API_MAX_RATE_LIMIT“ können Sie ab Exment v6.2.4 verwenden.

[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
