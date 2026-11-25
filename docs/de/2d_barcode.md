# 2D-Barcode-Einstellungen
Diese Seite erklärt den Bildschirm, in dem Sie je Tabelle das Aussehen der 2D-Barcode-Etiketten und das Verhalten beim Einlesen festlegen.

Der Ablauf bis zur Verwendung ist wie folgt.

1. Den Bildschirm der 2D-Barcode-Einstellungen öffnen
2. Einstellen und speichern
3. Die Schaltfläche „Aktivieren“ drücken
4. Aus der Datenliste das PDF der 2D-Barcodes erstellen

## Überblick über die 2D-Barcode-Funktion
Einen Überblick über die 2D-Barcode-Funktion finden Sie im [Beitrag auf der offiziellen Website](https://exment.net/release_v6-1-0/).

### Nötige PHP-Erweiterung (PDF der Etiketten)
Um das PDF der 2D-Barcode-Etiketten zu erstellen, muss die PHP-Erweiterung gd mit FreeType installiert sein (`imagettftext` ist verwendbar). Sonst tritt beim Erstellen des PDF der Etiketten ein Fehler auf.

- Wenn Sie docker-exment verwenden: Aktualisieren Sie docker-exment (ab PR #23 vom 2026-11-23) und bauen Sie das php-Image neu (`docker compose build php`, danach `docker compose up -d`).
- Bei anderen Servern: Installieren Sie gd mit FreeType (normalerweise ist es im Paket php-gd der Distribution enthalten). Ob es verwendbar ist, prüfen Sie mit dem folgenden Befehl. Bei der Ausgabe `bool(true)` ist es verwendbar.

```
php -r 'var_dump(function_exists("imagettftext"));'
```

## Seite öffnen
- Setzen Sie in der Liste der benutzerdefinierten Tabellen ein Häkchen bei der Tabelle, die Sie einstellen möchten, und klicken Sie oben rechts auf „Tabellen-Detaileinstellungen“.  
![Seite 2D-Barcode](../img/2d_barcode/barcode1.png)

> ※ Sie können auch direkt aus der Datenliste oder dem Erfassungsbildschirm dieser benutzerdefinierten Tabelle dorthin wechseln. Klicken Sie auch dann oben rechts auf „Tabellen-Detaileinstellungen“.  
![Seite 2D-Barcode](../img/2d_barcode/barcode12.png)

- Wenn Sie im Bildschirm der Tabellen-Detaileinstellungen auf das Symbol der 2D-Barcode-Einstellungen klicken, erscheint der Bildschirm der 2D-Barcode-Einstellungen.  
![Seite 2D-Barcode](../img/2d_barcode/barcode2.png)

## Einstellungen des 2D-Barcodes
![Seite 2D-Barcode](../img/2d_barcode/barcode3.png)

### Zusatzinformationen für 2D-Barcodes
Stellen Sie die Informationen ein, die rechts neben dem 2D-Barcode stehen.

- #### Titel
Geben Sie den festen Text ein, der rechts neben dem 2D-Barcode steht.

- #### Anzeigespalte
Wählen Sie die Spalte der benutzerdefinierten Daten, die rechts neben dem 2D-Barcode steht.   
Sie können die ID-Spalte oder eine Spalte mit automatischer Nummerierung wählen (sie muss eindeutig und ein Pflichtfeld sein).

### Layoutgröße der 2D-Barcodes
Stellen Sie die Layoutgröße der 2D-Barcodes ein. 
Sehen Sie dazu die Tabelle unten.

| Case | Cell width | Cell height | Margin right | Margin top | Column per page | Row per page | Column spacing | Row spacing |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 2x5 | 84 | 52 | 17 | 10.5 | 2 | 5 | 8 | 4 |
| 2x6 | 83.8 | 42.3 | 19.3 | 21.5 | 2 | 6 | 3.8 | 0 |
| 2x7 | 83 | 32 | 20 | 24 | 2 | 7 | 4 | 4 |
| 3x6 | 63.5 | 46.5 | 7.2 | 9 | 3 | 6 | 2.55 | 0 |
| 3x7 | 63.5 | 38 | 7.2 | 15.5 | 3 | 7 | 2.55 | 0 |
| 3x8 | 56 | 30 | 17 | 14.5 | 3 | 8 | 4 | 4 |
| 3x9 | 62 | 31 | 9 | 9 | 3 | 9 | 3 | 0 |
| 3x10 | 53.3 | 25.4 | 19 | 21.5 | 3 | 10 | 3.8 | 0 |
| 3x12 | 60 | 20 | 12 | 12 | 3 | 12 | 3 | 3 |
| 4x11 | 48.3 | 25.4 | 8.4 | 8.8 | 4 | 11 | 0 | 0 |

![Seite 2D-Barcode](../img/2d_barcode/barcode4.png)

### 2D-Barcode einlesen
Stellen Sie das Verhalten beim Einlesen eines 2D-Barcodes ein. 

- #### Formular nach dem Scannen des 2D-Barcodes
Wählen Sie das Erfassungsformular, das sich nach dem Einlesen des 2D-Barcodes öffnet.  
Sie können aus den benutzerdefinierten Formularen wählen, die für diese Tabelle gespeichert sind. 

- #### Aktion nach der Datenregistrierung  
Wählen Sie den Bildschirm, der nach dem Speichern der Daten erscheint.  
Zur Wahl stehen Startseite, Liste, Detailansicht, Bearbeitungsbildschirm und Kamera.

Klicken Sie nach dem Einstellen auf die Schaltfläche „Speichern“.  

### 2D-Barcode-Einstellungen aktivieren  
- Damit die 2D-Barcode-Funktion in dieser Tabelle verwendbar ist, müssen Sie sie „Aktivieren“. Speichern Sie einmal und klicken Sie dann oben rechts auf der Seite auf die Schaltfläche „Aktivieren“.

![Seite 2D-Barcode](../img/2d_barcode/barcode5.png)

## Neuen 2D-Barcode erstellen
- Wenn die 2D-Barcode-Funktion aktiviert ist, erscheint in der Datenliste dieser Tabelle die Schaltfläche „2D-Barcode neu erstellen“.  
Den Teil „2D-Barcode“ im Namen der Schaltfläche können Sie mit „EXMENT_TEXT_QR_BUTTON_JA/EN“ in der .env-Datei ändern.  

![Seite 2D-Barcode](../img/2d_barcode/barcode6.png)

- Mit einem Klick auf „2D-Barcode neu erstellen“ erscheint der Bildschirm „Neuen 2D-Barcode erstellen“.
![Seite 2D-Barcode](../img/2d_barcode/barcode7.png)
- Wenn Sie die Anzahl der 2D-Barcodes eingeben und speichern, werden so viele Daten angelegt, und auch das PDF der 2D-Barcodes wird ausgegeben.
![Seite 2D-Barcode](../img/2d_barcode/barcode8.png)

## 2D-Barcode herunterladen
- Wenn die 2D-Barcode-Funktion aktiviert ist, erscheint in der Datenliste dieser Tabelle die Schaltfläche „2D-Barcode herunterladen“.  
Den Teil „2D-Barcode“ im Namen der Schaltfläche können Sie mit „EXMENT_TEXT_QR_BUTTON_JA/EN“ in der .env-Datei ändern.
![Seite 2D-Barcode](../img/2d_barcode/barcode9.png)

- Wenn Sie Daten wählen und auf „2D-Barcode herunterladen“ klicken, werden die 2D-Barcodes der gewählten Daten als PDF ausgegeben.

![Seite 2D-Barcode](../img/2d_barcode/barcode10.png)

![Seite 2D-Barcode](../img/2d_barcode/barcode11.png)

## Kamerabildschirm aus Exment starten
- Aus dem Dashboard von Exment können Sie den Kamerabildschirm zum Einlesen von 2D-Barcodes starten.

- Wie Sie das Element „2D-/JAN-Barcode“ zum Dashboard hinzufügen, finden Sie unter [Dashboard](/de/dashboard).
