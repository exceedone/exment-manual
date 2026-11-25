# Liste der Patches und Sicherheitslücken

## Patches
Dies ist eine Liste der Fehler, die Sie von Hand beheben müssen, und der jeweiligen Abhilfe.  
Wenn Ihre Version unter „Betroffene Version“ fällt, lesen Sie bitte auf der verlinkten Seite, was zu tun ist.

| Inhalt | Betroffene Version | Details |
| ---- | ---- | ---- |
| [Kommazeichen entfernen](/patch/comma) (Englisch) | bis v1.2.6 | Abhilfe für den Fehler, dass Kommazeichen in der Datenbank gespeichert werden. |
| [Suchindex mit Bindestrich](/patch/index_hyphen) (Englisch) | bis v1.3.0 | Abhilfe für den Fehler, der bei einem Suchindex mit Bindestrich auftritt. |
| [Die Benachrichtigungsseite lässt sich nicht mehr öffnen](/patch/remove_deleted_table_notify) (Englisch) | bis v2.1.1 | Abhilfe für den Fehler, dass sich die Benachrichtigungsseite nicht mehr öffnen lässt, nachdem eine Tabelle mit einer Benachrichtigung gelöscht wurde. |
| [Menü nur bis 50 Zeichen](/patch/menu_uri_length) (Englisch) | bis v3.0.2 | Abhilfe für das Problem, dass in der URL eines Menüs nicht 51 oder mehr Zeichen gespeichert werden können. |
| [Revision bei Ausführung über die API](/patch/api_revision) (Englisch) | bis v3.0.9 | Abhilfe für den Fehler, dass keine Revision angezeigt wird, wenn Daten über die API neu angelegt oder aktualisiert wurden. |
| [SSO mit Google-Konto nicht möglich](/patch/sso_google) (Englisch) | bis v3.0.16 | Abhilfe für das Problem, dass SSO mit einem Google-Konto nicht mehr möglich ist, weil der Dienst Google+ eingestellt wurde. |
| [Nach dem Löschen einer Beziehung bleibt das Eltern-Kind-Formular bestehen](/patch/remove_deleted_relation) (Englisch) | bis v3.0.16 | Abhilfe für den Fehler, der auftritt, wenn eine Beziehung gelöscht wird, während ein Eltern-Kind-Formular eingerichtet ist. |
| [Filtereinstellung der Felder mit Eltern-Kind-Beziehung im Formular und deren Löschung](/patch/relation_filter) (Englisch) | bis v3.3.1 | Beschreibt die Filtereinstellung der Beziehung, wenn ein Eltern-Kind-Formular eingerichtet ist. |
| [Mit v3.6.7 gesicherte Dateien lassen sich mit v3.6.7 nicht wiederherstellen](/patch/resotre_ignore_view) (Englisch) | v3.6.7 | Beschreibt die Abhilfe für das Problem, dass sich mit v3.6.7 gesicherte Dateien mit v3.6.7 nicht wiederherstellen lassen. |
| [Falsche Anzeige des Ausführenden in der Benachrichtigung zu Kommentaren und Anhängen von Daten](/patch/mail_template_comment_attachment) (Englisch) | bis v3.7.5 | Beschreibt, wie Sie die Anzeige des Ausführenden in der Benachrichtigung zu Kommentaren und Anhängen von Daten korrigieren. |
| [Dateien löschen, die zu endgültig gelöschten Daten gehören](/patch/file_deleting) (Englisch) | bis v4.0.6 | Beschreibt, wie Sie Dateien löschen, die zu keinen Daten mehr gehören, weil die Daten bereits endgültig gelöscht wurden. |
| [Wenn bei der benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ mit der Zieltabelle „Benutzer“ oder „Organisation“ aus Excel importiert wurde](/ja/patch/select_table_user_org) (Japanisch) | Alle Versionen | Abhilfe für den Fall, dass bei der benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ mit der Zieltabelle „Benutzer“ oder „Organisation“ aus Excel importiert wurde. |
| [Bei den benutzerdefinierten Spalten „Auswahl (aus Tabelle)“, „Benutzer“ und „Organisation“ kann der in der Datenbank gespeicherte Wert ein Zahlentyp sein](/ja/patch/select_table_integer) (Japanisch) | bis v4.1.0 | Abhilfe für die benutzerdefinierten Spalten „Auswahl (aus Tabelle)“, „Benutzer“ und „Organisation“: Wenn Daten nicht über die Bildschirme gespeichert wurden, werden die als Zahlentyp gespeicherten Daten in den Zeichenkettentyp umgewandelt. |


## Liste der Sicherheitslücken
Dies ist eine Liste der bisher gefundenen Sicherheitslücken (Schwachstellen in der Sicherheit, die missbraucht werden könnten).  
Über den Link am Datum finden Sie den Inhalt und die Abhilfe.

| Datum der Veröffentlichung | Betroffene Version | Details |
| ---- | ---- | ---- |
| [2020/08/19](/weakness/20200819) (Englisch) | bis v3.5.4 | Cross-Site-Scripting sowie die Richtlinie zur Ausführung von Skripten bei Eingaben auf dem Bildschirm |
| [2020/08/19](/weakness/20200819_2) (Englisch) | bis v3.5.4 | Ausführung von Skripten beim Klick auf einen Anhang |
| [2020/03/25](/weakness/20200325) (Englisch) | bis v3.1.6 | Cross-Site-Scripting in der Listenansicht |
| [2021/04/13](/weakness/20210413) (Englisch) | facade/ignition < 1.16.15 | Abhilfe für die Sicherheitslücke in Laravel, durch die beliebiger Code ausgeführt werden kann |
| [2022/08/17](/weakness/20220817) (Englisch) | bis v5.0.2 | Cross-Site-Scripting sowie SQL-Injection |
| [2024/10/10](/weakness/20241010) (Englisch) | bis v6.1.4 | Cross-Site-Scripting |
| [2024/10/10](/weakness/20241010_2) (Englisch) | bis v6.1.4 | Änderung der Einstellungen einer benutzerdefinierten Tabelle ohne Berechtigung |
