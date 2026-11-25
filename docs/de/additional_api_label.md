# In der API die Spalte label hinzufügen
Wenn Sie über die API eine Liste von Daten abrufen oder Daten neu anlegen oder aktualisieren, können Sie dem Ergebnis die Spalte "label" hinzufügen. Diese Seite erklärt, wie Sie das einstellen.

- Die Spalte "label" ist der Text, der durch die [Einstellungen der Überschriftenspalten](/de/table) der Daten bestimmt wird. Er wird bei den Vorschlägen der Suchleiste und in Auswahllisten angezeigt.
- Es gibt 2 Möglichkeiten der Einstellung. Siehe unten „Methode 1“ (bei allen APIs hinzufügen) oder „Methode 2“ (nur bei dieser Anfrage hinzufügen).

> Bis v3.1.1 wurde die Spalte label standardmäßig angezeigt. Zur Verbesserung der Leistung wird sie jetzt standardmäßig nicht mehr abgerufen.  
Wenn Sie die Spalte label abrufen möchten, nehmen Sie deshalb bitte diese Einstellung vor.

### Mit der label-Einstellung (Auszug)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null,
            "label": "admin"
        }
    ]
}
~~~

### Ohne die label-Einstellung (Auszug)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null
        }
    ]
}
~~~


### Methode 1: In der .env-Datei hinzufügen
Die Spalte label wird bei allen APIs hinzugefügt.  
Fügen Sie der .env-Datei Folgendes hinzu.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### Methode 2: Den Anfragewerten „label=1“ hinzufügen
Die Spalte label wird nur bei dieser Anfrage hinzugefügt.  
Fügen Sie beim Ausführen der API „label=1“ hinzu. Wo Sie es hinzufügen, zeigt die folgende Tabelle.

| Was Sie ausführen | Wo Sie „label=1“ hinzufügen |
| ---- | ---- |
| Daten abrufen | Query-String |
| Daten neu anlegen | POST-Werte |
| Daten aktualisieren | PUT-Werte |


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
