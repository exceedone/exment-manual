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


#### IPv6 (7.3.0)
Ab Exment 7.3.0 können auch IPv6-Adressen und -Bereiche eingetragen werden, gemischt mit IPv4.

| Was Sie möchten | Eingabe | Beispiel |
| ---- | ---- | ---- |
| Eine IPv6-Adresse erlauben | Die Adresse so eingeben, wie sie ist (Groß- oder Kleinschreibung, kurze oder lange Form) | 2001:db8::10 |
| Das Netz eines Haushalts oder Büros erlauben | Das /64 des Anbieters eingeben | 2001:db8:1:2::/64 |
| Einen größeren IPv6-Bereich erlauben | Mit der Präfixlänge eingeben | 2001:db8::/32 |

- Ein IPv4-Client, den ein Dual-Stack-Server als `::ffff:192.0.2.7` sieht, wird als `192.0.2.7` verglichen: eine IPv4-Zeile wie `192.0.2.0/24` passt.
- Zeilen werden durch Zeilenumbrüche oder Kommas getrennt. Eine Zeile, die keine Adresse und kein Bereich ist, kann nicht gespeichert werden.
- Die Begrenzung der Versuche (Login-Sperre, API-Ratenlimit) zählt eine IPv6-Adresse als ihr /64: ein Wechsel der Adresse im selben /64 gibt keine weiteren Versuche.
- Mit „Gekürzt“ in der IP-Einstellung der Protokollverwaltung wird eine IPv6-Adresse als ihr /64 gespeichert (`2001:db8:1:2::/64`).

#### IP-Einschränkung zwangsweise ausschalten
Mit diesen Schritten schalten Sie die IP-Einschränkung aus, zum Beispiel wenn Sie die IP-Adressen für die Webseiten falsch eingestellt haben und nicht mehr zugreifen können.

- Öffnen Sie die Datei „.env“ und fügen Sie den folgenden Wert hinzu.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
