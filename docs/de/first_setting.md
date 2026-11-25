# Ersteinrichtung
Dies sind die Schritte der Einstellungen, die Sie nach der Installation zuerst vornehmen. Sie legen die Angaben zur Website, die Anmelde-ID des ersten Administrators und mehr fest.

Es sind die folgenden 4 Schritte.

1. Die Seite von Exment öffnen
2. Im Bildschirm der Ersteinrichtung die nötigen Angaben eingeben
3. Die gewünschten Vorlagen wählen
4. Auf die Schaltfläche „Absenden“ klicken

## Die URL öffnen
Öffnen Sie die Seite von Exment.  
http(s)://(URL Ihrer Website)  

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in `.env` einen Wert hat (bei Websites aus früheren Versionen ist es „admin“), hängen Sie diesen Wert an die URL der Website an (Beispiel: `http(s)://(URL von Exment)/admin/oauth/token`). Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

## Bildschirm der Ersteinrichtung
Wenn die Installation richtig abgeschlossen ist, erscheint der Bildschirm der Ersteinrichtung von Exment.

![Bildschirm der Ersteinrichtung](../img/install/install1.png)
Geben Sie die Angaben ein, die für die Einstellung des Systems nötig sind.  
※Eine genaue Erklärung der Felder steht unter [Systemeinstellungen](/de/system_setting).

## Einstellung der Vorlagen
In Exment sind schon Vorlagen vorbereitet.  
Wenn Sie eine Vorlage wählen, werden die Tabellen, Spalten, Formulare, Menüs und Berechtigungen dieser Vorlage auf einmal installiert.  
Sie können in diesem Bildschirm auch eine Vorlage hochladen, die in einem anderen Exment exportiert wurde.  
Einzelheiten stehen unter [Vorlage](/de/template).

![Installationsbildschirm_Vorlage](../img/install/install_template.png)

In der Liste stehen die Vorlagen, die von Anfang an im System sind, und die Vorlagen, die bisher importiert wurden.  
Wählen Sie die Vorlagen, die Sie installieren möchten.  

## Ersteinrichtung abgeschlossen
Wenn Sie die nötigen Felder ausfüllen und auf die Schaltfläche „Absenden“ klicken, werden die Einstellungen gespeichert, und Sie können Exment nutzen.

## Weitere zusätzliche Einstellungen
Mit den Schritten bis hier können Sie Exment nutzen. Für einige Funktionen sind aber zusätzliche Einstellungen nötig.  
Bitte lesen Sie die folgende Seite.  
- [Zusätzliche Einstellungen](/de/quickstart_more)
