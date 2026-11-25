# IP-Filter
Mit dieser Einstellung legen Sie fest, welche IP-Adressen auf die Webseiten und die API von Exment zugreifen dürfen.

- Sie tragen nur die IP-Adressen ein, die erlaubt sind (Whitelist-Verfahren).
- Die Adressen für die Webseiten und für die API tragen Sie getrennt ein. So können Sie zum Beispiel „nur für die API die IP-Adressen einschränken, die sie ausführen dürfen“.


### Einrichtung
1. Schalten Sie Exment in den Expertenmodus. Wenn der Expertenmodus noch nicht aktiv ist, öffnen Sie die Datei „.env“ und fügen Sie den folgenden Wert hinzu.

~~~
EXMENT_EXPART_MODE=true
~~~

2. Öffnen Sie den Bildschirm „Systemeinstellungen“. Dort sind jetzt die Felder unter „IP-Filter-Einstellungen“ hinzugekommen.

![IP-Filter-Einstellungen](../img/quickstart/ip_filter.png)

#### Einstellungen im Einzelnen

| Was Sie möchten | So geben Sie es ein | Beispiel |
| ---- | ---- | ---- |
| Eine bestimmte IP-Adresse erlauben | Geben Sie die IP-Adresse unverändert ein | 123.4.5.6 |
| Einen Bereich von IP-Adressen erlauben | Geben Sie ihn in der Form mit Subnetzmaske ein | Beispiel 1: 123.4.0.0/16 → Zugriff erlaubt von 123.4.0.0 bis 123.4.255.255<br>Beispiel 2: 123.4.10.0/24 → Zugriff erlaubt von 123.4.10.0 bis 123.4.10.255 |
| Auf einem Server, der auf localhost eingerichtet ist, den Zugriff von localhost erlauben | Geben Sie „::1“ ein | ::1 |
| Mehrere IP-Adressen erlauben | Geben Sie sie durch Zeilenumbrüche getrennt ein. Der Zugriff ist möglich, wenn eine davon passt | |


#### IP-Einschränkung zwangsweise ausschalten
Mit diesen Schritten schalten Sie die IP-Einschränkung aus, zum Beispiel wenn Sie die IP-Adressen für die Webseiten falsch eingestellt haben und nicht mehr zugreifen können.

- Öffnen Sie die Datei „.env“ und fügen Sie den folgenden Wert hinzu.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
