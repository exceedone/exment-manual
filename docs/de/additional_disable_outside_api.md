# Externe Serverkommunikation ausschalten
Mit dieser Einstellung unterbinden Sie die Kommunikation vom Exment-Server zu anderen Servern.  
Sie verwenden sie in Umgebungen, die nicht mit anderen Servern kommunizieren, zum Beispiel in einer reinen On-Premises-Umgebung.

Exment kommuniziert für die folgenden Zwecke manchmal mit anderen Servern.

- Um festzustellen, ob es eine neuere Version von Exment gibt, kommuniziert Exment mit dem Paketsystem und ruft die Information zur neuesten Version ab
- Für die Anzeige unter „Exment-Neuigkeiten“ im Dashboard kommuniziert Exment mit der offiziellen Exment-Website (exment.net) und ruft die Neuigkeiten ab

### Einrichtung 
> Diese Schritte haben sich mit v1.3.0 geändert.

1. Öffnen Sie über das linke Menü die Seite „Systemeinstellungen“.
2. Stellen Sie in der Liste den Eintrag „Externe Serverkommunikation durchführen“ auf NO.  
![Externe Serverkommunikation ausschalten](../img/quickstart/outside_api.png)
3. Speichern Sie. Damit ist die Einrichtung abgeschlossen.


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
