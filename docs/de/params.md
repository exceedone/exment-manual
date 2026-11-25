# Liste der Parametervariablen
Dies ist die Liste der „Parametervariablen“, die bei der Ausführung durch die tatsächlichen Werte ersetzt werden. Sie werden in der Form „${Variablenname}“ geschrieben ([Beispiele](/de/params?id=Beispiele)).
Sie können sie an den folgenden Stellen verwenden.

- Benachrichtigungsvorlagen
    - Neuanlage und Aktualisierung von Daten usw.
    - Zeitablauf
    - Schaltfläche
    - Workflow
    - Neuanlage eines Benutzers
    - Zurücksetzen des Passworts eines Benutzers
    - Öffentliches Formular: Benachrichtigung über den Abschluss der Registrierung (Benutzer, Administrator) und Fehlerbenachrichtigung
- Dokumentausgabe
- Automatische Nummerierung einer benutzerdefinierten Spalte
- Anzeigename des Absenders beim E-Mail-Versand

## Liste der Variablen
### Datum
Die folgenden Beispiele gelten für den Ausführungszeitpunkt „2018/02/17 11:20:32“.

| Element | Beschreibung |
| ---- | ---- |
| ${y} or ${year} | Das Jahr der Ausführung wird 4-stellig gesetzt. (Beispiel: 2018) |
| ${m} or ${month} | Der Monat der Ausführung wird gesetzt. (Beispiel: 2) |
| ${m:(ganze Zahl)} or ${month:(ganze Zahl)} | Der Monat der Ausführung wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 02, wenn Sie ${m:2} schreiben) |
| ${d} or ${day} | Der Tag der Ausführung wird gesetzt. (Beispiel: 17) |
| ${d:(ganze Zahl)} or ${day:(ganze Zahl)} | Der Tag der Ausführung wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 17, wenn Sie ${d:2} schreiben) |
| ${h} or ${hour} | Die Stunde der Ausführung wird gesetzt. (Beispiel: 11) |
| ${h:(ganze Zahl)} or ${hour:(ganze Zahl)} | Die Stunde der Ausführung wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 11, wenn Sie ${hour:2} schreiben) |
| ${i} or ${minute} | Die Minute der Ausführung wird gesetzt. (Beispiel: 20) |
| ${i:(ganze Zahl)} or ${minute:(ganze Zahl)} | Die Minute der Ausführung wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 20, wenn Sie ${minute:2} schreiben) |
| ${s} or ${second} | Die Sekunde der Ausführung wird gesetzt. (Beispiel: 32) |
| ${s:(ganze Zahl)} or ${second:(ganze Zahl)} | Die Sekunde der Ausführung wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 32, wenn Sie ${second:2} schreiben) |
| ${ymdhms} or ${ymdhis} | Zeichenfolge yyyymmddhhiiss (Beispiel: 20180217112032) |
| ${ymdhm} or ${ymdhi} | Zeichenfolge yyyymmddhhii (Beispiel: 201802171120) |
| ${ymdh} | Zeichenfolge yyyymmddHH (Beispiel: 2018021711) |
| ${ymd} | Zeichenfolge yyyymmdd (Beispiel: 20180217) |
| ${ym} | Zeichenfolge yyyyMM (Beispiel: 201802) |
| ${hms} or ${his} | Zeichenfolge hhiiss (Beispiel: 112032) |
| ${hm} or ${hi} | Zeichenfolge hhii (Beispiel: 1120) |
| ${now} | Der Ausführungszeitpunkt wird im Format yyyymmddhhiiss ausgegeben. (Beispiel: 20180217112032) |
| ${now:(format)} | Der Ausführungszeitpunkt wird im angegebenen Format ausgegeben. Zum Format siehe <a href="https://www.php.net/manual/function.date.php" target="_blank">hier</a>.<br />(Beispiel: 18, wenn Sie ${now:y} schreiben) |

### Systemwerte
| Element | Beschreibung |
| ---- | ---- |
| ${system:site_name} | Website-Name des Systems |
| ${system:site_name_short} | Website-Name des Systems (kurz) |
| ${system:system_mail_from} | Absender des Systems |
| ${system:system_url} | Start-URL des Systems |
| ${system:login_url} | Anmelde-URL des Systems |

### Tabelle
| Element | Beschreibung |
| ---- | ---- |
| ${table_name} | Der Tabellenname (alphanumerisch) der betreffenden Daten wird gesetzt. (ab v4.2.7) |
| ${table_view_name} | Der Anzeigename der Tabelle der betreffenden Daten wird gesetzt. (ab v4.2.7) |

### Daten
| Element | Beschreibung |
| ---- | ---- |
| ${id} | Die ID der gespeicherten Daten wird gesetzt. (Beispiel: 123) |
| ${id:(ganze Zahl)} | Die ID der gespeicherten Daten wird mit der angegebenen Stellenzahl gesetzt. (Beispiel: 00123, wenn Sie ${id:5} schreiben) |
| ${suuid} | Die suuid der gespeicherten Daten (Short UUID, eine zufällige Zeichenfolge mit 20 Stellen) wird gesetzt. |
| ${created_user} | Der Name des Benutzers, der die Daten angelegt hat, wird gesetzt. (Beispiel: Administrator) |
| ${updated_user} | Der Name des Benutzers, der die Daten aktualisiert hat, wird gesetzt. (Beispiel: Benutzer A) |
| ${created_at} | Datum und Uhrzeit, zu denen die Daten angelegt wurden, werden gesetzt. (Beispiel: 2020/08/06 10:00:00) |
| ${updated_at} | Datum und Uhrzeit, zu denen die Daten aktualisiert wurden, werden gesetzt. (Beispiel: 2020/08/06 14:00:00) |
| ${value_url} | Der Link zum Anzeigen der gespeicherten Daten wird gesetzt. |
| ${value:(Spaltenname)} | Der Wert der Spalte der gespeicherten Daten wird gesetzt.<br />(Beispiel: Wenn Sie bei Benutzerdaten ${value:user_code} schreiben, wird der Benutzercode gesetzt.) |

#### Daten (Optionen)
Wenn Sie etwas wie „${value:(Spaltenname)/(Optionsschlüssel 1)=(Optionswert 1)}“ schreiben, können Sie dem Parameter Optionen hinzufügen. Mehrere Optionen trennen Sie durch Kommas.
Beispiele:
- ${value:mitsumori_date/format="Y"}
- ${value:mitsumori_price/disable_number_format=1,disable_currency_symbol=1}

| Optionsschlüssel | Beschreibung |
| ---- | ---- |
| ${value:(Spaltenname)/format="(Datumsformat)"} | Beim Spaltentyp „Datum“ oder „Datum und Uhrzeit“ wird der Wert der Spalte der gespeicherten Daten in das Format umgewandelt und angezeigt.<br />(Beispiel 1: Die Tabelle „Vertragsinformationen (contract)“ hat die Spalte „Vertragsdatum (contract_date)“, und Sie möchten das Vertragsjahr anzeigen: ${value:contract_date/format="Y"})<br />(Beispiel 2: Die Tabelle „Vertragsinformationen (contract)“ hat die Spalte „Vertragsdatum (contract_date)“, und Sie möchten sie im Format „yyyy/mm/dd“ anzeigen: ${value:contract_date/format="Y/m/d"})|
| ${value:(Spaltenname)/disable_number_format=1} | Beim Spaltentyp „Ganzzahl“, „Dezimalzahl“ oder „Währung“ wird die Einstellung für Zahlen mit Tausendertrennzeichen ausgeschaltet.|
| ${value:(Spaltenname)/disable_currency_symbol=1} | Beim Spaltentyp „Währung“ wird die Einstellung für das Währungsformat (Yen-Zeichen, $ usw.) ausgeschaltet.|


### Relationen und verknüpfte Daten
| Element | Beschreibung |
| ---- | ---- |
| ${select_table:(Spaltenname).(Spaltenname der referenzierten Tabelle)} | Wenn die Spalte „Spaltenname“ vom Typ „Auswahl (aus Tabelle)“, „Benutzer“ oder „Organisation“ ist, wird der Wert der referenzierten Spalte gesetzt.<br />   (Beispiel: Die Tabelle „Vertragsinformationen (contract)“ hat die Spalte „Kunde (client)“, die auf die Tabelle „Kundeninformationen (client)“ verweist. Mit ${select_table:client.client_code} können Sie dann den Kundencode (client_code) der Tabelle „Kundeninformationen (client)“ anzeigen.) |
| ${parent:(Spaltenname der referenzierten Tabelle)} | Der Wert der Spalte der übergeordneten Tabelle wird gesetzt.<br />(Beispiel: Wenn Sie aus der Tabelle „Vertragspositionen (contract_detail)“ auf den Vertragscode (contract_code) der übergeordneten Tabelle „Vertragsinformationen (contract)“ verweisen und ${parent:contract_code} schreiben, wird der Vertragscode gesetzt.) |


### Einzelne Funktionen
Manche Funktionen haben Variablenparameter, die nur in dieser Funktion verwendet werden können.
Es folgt die Liste der Funktionen und Seiten und der Parameter, die dort verwendet werden können.

#### Benachrichtigung
Verwendbar, wenn Benutzern per E-Mail oder per Hinweis im System eine Benachrichtigung gesendet wird.

| Element | Beschreibung |
| ---- | ---- |
| ${user:user_name} | Benutzername des Benutzers, an den die E-Mail geht |
| ${user:user_code} | Benutzercode des Benutzers, an den die E-Mail geht |
| ${user:email} | E-Mail-Adresse des Benutzers, an den die E-Mail geht |

#### Benachrichtigung (Anhänge)
Wenn Sie in der Spalte „Benutzerdefinierte Anhänge“ der Benachrichtigungsvorlage Parameter nach den folgenden Regeln setzen, werden bei einer E-Mail-Benachrichtigung die Anhänge, die in dieser benutzerdefinierten Spalte gespeichert sind, an den Benutzer gesendet.
Einzelheiten finden Sie unter [Anhänge und benutzerdefinierte Anhänge](/de/mail).
※ Derzeit gilt dies nur für E-Mail-Benachrichtigungen.

| Element | Beschreibung |
| ---- | ---- |
| ${file:(Name der benutzerdefinierten Spalte)} | Anhänge, die in einer benutzerdefinierten Spalte vom Typ „Datei“ oder „Bild“ gespeichert sind |
| ${file:select_table:(Name der benutzerdefinierten Auswahlspalte).(Name der Dateispalte der referenzierten Tabelle)} | Anhänge, die in der Spalte „Datei“ oder „Bild“ der Daten gespeichert sind, die in der benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ ausgewählt sind.<br/>Beispiel: ${file:select_table:customer.contract_file} |
| ${documents} | Anhänge, die auf der Detailseite der Daten gespeichert sind (die Stelle, die das Bild auf der oben verlinkten Seite zeigt) |

#### Login-Benutzer
Nur verwendbar, wenn jemand angemeldet ist. Bei Benachrichtigungen durch einen Batch usw. nicht verwendbar.

| Element | Beschreibung |
| ---- | ---- |
| ${login_user:user_name} | Benutzername des angemeldeten Benutzers |
| ${login_user:user_code} | Benutzercode des angemeldeten Benutzers |
| ${login_user:email} | E-Mail-Adresse des angemeldeten Benutzers |
| ${login_user:(Spaltenname)} | Der Wert der angegebenen Spalte des angemeldeten Benutzers wird gesetzt |

#### Zurücksetzen des Passworts
Nur beim Versand der E-Mail zum Zurücksetzen des Passworts verwendbar.

| Element | Beschreibung |
| ---- | ---- |
| ${system:password_reset_url} | URL des Systems zum Zurücksetzen des Passworts |
| ${user:password} | Anmeldepasswort des Benutzers, an den die E-Mail geht |

#### Öffentliches Formular
Nur in Benachrichtigungen des öffentlichen Formulars verwendbar.

| Element | Beschreibung |
| ---- | ---- |
| ${publicform:public_form_view_name} | Anzeigename des öffentlichen Formulars |
| ${publicform:inputs} | Öffentliches Formular: Eingabewerte des Benutzers |

#### Öffentliches Formular (bei einem Fehler)
Nur in Benachrichtigungen verwendbar, die bei einem Fehler des öffentlichen Formulars gesendet werden.

| Element | Beschreibung |
| ---- | ---- |
| ${error:message} | Öffentliches Formular: Fehlerübersicht |
| ${error:stacktrace} | Öffentliches Formular: Fehlerdetails |


#### Plugin (Dokumentausgabe)

| Element | Beschreibung |
| ---- | ---- |
| ${value_image:(Spaltenname)} | Wenn die Spalte „Spaltenname“ vom Typ „Bild“ ist, wird das Bild in Excel ausgegeben. |
| ${value_image:(Spaltenname)/width=(Größe als ganze Zahl),height=(Größe als ganze Zahl)} | Wenn Sie Breite (width) und Höhe (height) des ausgegebenen Bildes angeben möchten, geben Sie die Optionen ein. Sie können auch nur width oder nur height angeben. |


## Beispiele
※ Wenn das Ausführungsdatum 2018/8/9 ist, die ID der Zieldaten 100 und der user_code (Benutzercode) der Zieldaten "U12345"
- U-${id:4} → U-0100
- ${y}-${m:2}-${d:2}-${id} → 2018-08-09-100
- ${y}${m:2}${d:2}-${id:5} → 20180809-00100
- ${now:y}${m:2}${d:2}-${id:4} → 180809-0100
- ${y}${m:2}${d:2}-${value:user_code} → 20180809-U12345
