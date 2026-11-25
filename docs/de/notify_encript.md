# Anhänge bei Benachrichtigungen verschlüsseln
An eine Benachrichtigung per E-Mail können Sie Dateien anhängen.  
Mit dieser Einstellung verschlüsselt das System diese Anhänge automatisch, bevor es sie sendet (es entsteht eine verschlüsselte zip-Datei).

Es gibt die folgenden 2 Einstellungen.

1. Eine Zeile zur `.env` hinzufügen (gleich für Windows und Linux)
2. Auf dem Server eine Software installieren, die zip-Dateien erstellt (bei Windows und Linux verschieden)

## Gemeinsam für Windows und Linux

- Fügen Sie den folgenden Inhalt zur `.env` hinzu.

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- Installieren Sie 7-zip, um verschlüsselte zip-Dateien zu erstellen.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- Installieren Sie zip mit dem Paketbefehl des Betriebssystems, zum Beispiel yum.

~~~
// Bei CentOS
yum install zip
~~~

Damit ist die Einstellung fertig.
