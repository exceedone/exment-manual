# IT-Support (offizielles Plugin)
„IT-Support“ („ITサポート“) ist ein **offizielles Plugin** für Exment, gedacht für IT-Support und Helpdesk. Anfragen von Kunden (E-Mail, Anfrageformular, Telefon) und Probleme aus Überwachung und Fehlerprotokollen werden als „Tickets“ verwaltet. **Der Kunde sieht den Fortschritt ohne Anmeldung**. Das Plugin ist kostenlos.

- Quellcode und Beschreibung: [exceedone/exment-plugins (it-support)](https://github.com/exceedone/exment-plugins/tree/main/it-support)
- Lizenz: GPL-3.0 (wie Exment)
- Name in der Plugin-Liste: Exment Plugin IT Support（ITサポート）. Der interne Name ist `ExmentITSupport`, die URL ist `/plugins/exment_it_support`.

<!-- Screenshot: Eingangskorb der Bearbeiter (img/plugin_it_support/its_desk.png). Erst aufnehmen, nachdem 2b es geprüft hat -->

## Was es kann
| Bereich | Was es kann |
| --- | --- |
| Seite der Bearbeiter | Ein eigener **Eingangskorb** (drei Spalten: Arten des Eingangskorbs mit Anzahl, Liste der Tickets, Unterhaltung mit Feldern). Beim Wechsel des Tickets wird die Seite nicht neu geladen. Tastaturbedienung (`J`/`K` hoch und runter, `R` antworten, `N` interne Notiz, `Ctrl+Enter` senden, `A` selbst übernehmen, `E` lösen, `?` Übersicht), automatisches Speichern von Entwürfen, Dunkelmodus, Darstellung für Smartphones |
| Eingang | **E-Mail** (Abruf über IMAP alle 5 Minuten. ISO-2022-JP, Shift_JIS und Anhänge werden unterstützt), **Anfrageformular** (ohne Anmeldung, zuerst wird auf die FAQ hingewiesen), **Telefon und Besuch** (der Bearbeiter trägt die Anfrage ein), **Überwachung und Fehlerprotokolle** (API. Gleiche Fehler werden zu einem Ticket zusammengefasst und gezählt), **Fristen von IT-Geräten** (wenn die Frist für Wartung, Lizenz, Domain oder Zertifikat näher rückt, wird automatisch ein Ticket angelegt) |
| Austausch | Die Antwort an den Kunden kommt per E-Mail an. Antwortet der Kunde direkt darauf, landet die Antwort im selben Ticket. Der zitierte Teil wird automatisch entfernt. **Interne Notizen** sieht der Kunde nicht. **Textbausteine** und **Vorschläge aus der Wissensdatenbank** stehen neben dem Antwortfeld |
| Schutz vor doppelter Bearbeitung | Wenn ein anderer Bearbeiter gerade eine Antwort auf dasselbe Ticket schreibt, wird das auf der Seite angezeigt |
| Teilen mit dem Kunden | **Link ohne Anmeldung** (zeigt nur dieses eine Ticket, mit Ablaufdatum und Widerruf, Zugriffe werden aufgezeichnet). Für wichtige Tickets ein **Bestätigungscode** (6 Ziffern per E-Mail). Kunden, die sich anmelden, nutzen das **Kundenportal** (der Administrator einer Firma sieht alle Tickets der Firma) |
| SLA | Richtwerte für die erste Antwort und für die Lösung, je Kunde und je Priorität. **Gezählt wird nach Geschäftszeiten und Feiertagen**, und **die Zeit steht still, solange auf die Antwort des Kunden gewartet wird**. Wenn die Frist näher rückt oder überschritten ist, wird der Bearbeiter benachrichtigt |
| Automatisierung | Automatische Zuweisung an den Bearbeiter der jeweiligen Art oder an die Person mit den wenigsten offenen Tickets. Erinnerung beim Warten auf Antwort → automatisch gelöst → automatisch abgeschlossen. Nach der Lösung wird nach der Zufriedenheit gefragt (5 Stufen) |
| Wissensdatenbank (FAQ) | Veröffentlichte Artikel erscheinen auf der FAQ-Seite für Kunden und im Anfrageformular. Aus einem Ticket lässt sich mit einem Klick ein Entwurf anlegen |
| IT-Geräte | PCs, Server, Lizenzen und Ähnliches der Kunden werden erfasst und mit Tickets verknüpft |
| Berichte | Eingang, Lösung, SLA-Erfüllung, Zeit bis zur ersten Antwort, Zufriedenheit und mehr. **Vergleich von Arbeitszeit und Vertragszeit je Kunde** (für den Monatsbericht), CSV |
| Suche | Teilübereinstimmung in Betreff, Text, Austausch, E-Mail und Nummer. Leerzeichen bedeuten UND, bei Tags können Sie UND oder ODER wählen |
| Anpassung | Alles sind Tabellen von Exment. Felder, Formulare, Ansichten, Workflows und API lassen sich deshalb auf den Seiten von Exment ändern. Ein Board für Tickets (Kanban) ist auch dabei |

## Voraussetzungen
- Exment 7.0 oder neuer (PHP 8.2 oder neuer). Zusätzliche PHP-Erweiterungen sind nicht nötig.
- Für den Empfang von E-Mails brauchen Sie ein Postfach für Anfragen (IMAP). Gesendet wird mit den [Einstellungen für den E-Mail-Versand](/de/mailsend_setting) von Exment.
- Die automatischen Abläufe (E-Mail-Empfang, SLA, Warten auf Antwort, Abschluss, Fristen der Geräte) laufen alle 5 Minuten. Richten Sie die [Aufgabenplanung](/de/additional_task_schedule) ein.
- Die Seiten gibt es nur auf Japanisch.

## Installation
1. Installieren Sie das Plugin. Ab Exment v7.2.1 geht das über die „Funktionsverwaltung“, in älteren Versionen laden Sie die ZIP-Datei hoch. Lesen Sie [Offizielle Plugins](/de/plugin_official).
2. Ab Exment v7.2.1 schalten Sie unter „Administratoreinstellungen“ → „[Funktionsverwaltung](/de/feature)“ den Punkt „ITサポート：受付箱“ (IT-Support: Eingangskorb) ein (solange er aus ist, lässt sich auch die Einrichtungsseite nicht öffnen). Für den Eingangskorb können Sie die Rollengruppen wählen, die ihn nutzen dürfen. Wenn Sie den Kundenzugang (`/support`), den E-Mail-Empfang und Tickets aus der Überwachung nutzen, schalten Sie auch „ITサポート：お客様の窓口“ (IT-Support: Kundenzugang) ein (er arbeitet nur, wenn der Eingangskorb eingeschaltet ist).
   - Auf einer neu installierten Website sind beide zunächst aus. Auf Websites, die den IT-Support schon vor der Funktionsverwaltung genutzt haben, bleiben beide eingeschaltet.
   - Wenn Sie den Eingangskorb auf „Nicht verwenden“ stellen, verschwindet auch „ITサポート“ aus dem Menü. Die Tabellen (Tickets und andere) bleiben als Daten erhalten. Sie lassen sich als gewöhnliche Tabellen von Exment über die URL (zum Beispiel `/data/its_ticket`) oder unter „Administratoreinstellungen“ → „Benutzerdefinierte Tabelle“ öffnen. Wenn sie im Menü stehen sollen, fügen Sie die Tabellen unter „Administratoreinstellungen“ → „Menü“ hinzu. Wenn sie nicht sichtbar sein sollen, entfernen Sie die Tabellenberechtigungen in den Rollengruppen.
3. Öffnen Sie im Menü „ITサポート“ (oder `/plugins/exment_it_support`) und klicken Sie auf „セットアップする“ (Einrichten). Angelegt werden Tabellen, Menü, Berechtigungen, SLA, Arten, Textbausteine und Beispiele für die FAQ.
   - Im linken Menü steht nur der eine Punkt „ITサポート“ (er öffnet den Eingangskorb). Ticket-Tabelle, Wissensdatenbank, Kunden, Kontakte, IT-Geräte und Textbausteine öffnen Sie über das Menü oben im Eingangskorb. Alle Tabellen (auch Ticketarten und SLA) öffnen Sie unter „設定“ (Einstellungen) über „テーブル・権限“ (Tabellen und Berechtigungen).
   - Der Ordner „ITサポート“ bis 1.0.6 (Eingangskorb und 8 Tabellen) wird nach der Aktualisierung auf 1.0.7 zu einem Punkt zusammengefasst, sobald der Eingangskorb zum ersten Mal geöffnet wird. Menüpunkte, die ein Administrator selbst hinzugefügt hat, bleiben.
4. Tragen Sie unter „設定“ (Einstellungen) das Postfach für Anfragen (IMAP) und die Adresse des Kundenzugangs ein, speichern Sie und klicken Sie auf „IMAP につながるか試す“ (IMAP-Verbindung testen). Wenn Sie den E-Mail-Empfang nutzen, tragen Sie auch „差出人の確認“ (Prüfung des Absenders) und „受信サーバーの名前“ (Name des Empfangsservers: der erste Name in Authentication-Results einer empfangenen E-Mail) ein. Bis dahin gelten Tickets aus E-Mails als „Verdacht auf gefälschten Absender“.
5. Nehmen Sie die Bearbeiter in die Rollengruppe „ITサポート 担当者“ (IT-Support Bearbeiter) auf. Kunden, die sich anmelden, kommen in „ITサポート お客様“ (IT-Support Kunden) und werden über „Exment のユーザー“ (Exment-Benutzer) bei „お客様の担当者“ (Kontakt des Kunden) verknüpft.
6. Teilen Sie den Kunden die URL des Kundenzugangs mit (`https://Ihr Exment/support`).

## Bedienung

### Der Eingangskorb
Öffnen Sie im Menü „ITサポート“. Dann erscheint der Eingangskorb („受付箱“). Die Seite hat drei Spalten.

| Spalte | Inhalt |
| --- | --- |
| Links | Die Arten des Eingangskorbs mit Anzahl: 対応が必要 (Handlung nötig), 自分の担当 (meine Tickets), 担当者なし (ohne Bearbeiter), お客様から返事 (Antwort vom Kunden), SLA 注意・超過 (SLA bald fällig oder überschritten), お客様の返事待ち (Warten auf den Kunden), 保留 (zurückgestellt), 監視・エラー (Überwachung und Fehler), 解決 (gelöst), 完了 (abgeschlossen), すべて (alle). Darunter steht, ob der E-Mail-Empfang ein- oder ausgeschaltet ist und wann die automatischen Abläufe zuletzt gelaufen sind |
| Mitte | Die Liste der Tickets. Sie können in Betreff, Text, Austausch, E-Mail und Nummer suchen. Sie können filtern (Status, Priorität, Bearbeiter, Kunde, Art, Tags) und die Reihenfolge wählen (nächste Frist zuerst, nach Priorität, neueste zuerst, älteste zuerst, nach Aktualisierung). Wenn Sie mehrere Tickets wählen, ändern Sie Status, Priorität und Bearbeiter auf einmal |
| Rechts | Die Unterhaltung des gewählten Tickets und das Antwortfeld. Rechts daneben stehen die Felder (Status, Priorität, Bearbeiter, Art, Kunde, Tags, „お客様に見せる“ (dem Kunden zeigen), „開くときに確認のコード“ (Bestätigungscode zum Öffnen)), das SLA, der Kunde, der Link für den Kunden, die Wissensdatenbank, die Dateien, andere Tickets desselben Kunden und das Zusammenführen |

| Taste | Was sie tut |
| --- | --- |
| `J` / `K` | Nächstes / vorheriges Ticket |
| `/` | Suchen |
| `R` | Dem Kunden antworten |
| `N` | Interne Notiz |
| `Ctrl` + `Enter` | Senden |
| `A` | Selbst übernehmen |
| `E` | Lösen |
| `\` | Rechte Spalte öffnen oder schließen |
| `?` | Liste der Tastenkürzel |
| `Esc` | Schließen oder die Eingabe verlassen |

Anrufe, Besuche und Dinge, die intern auffallen, tragen Sie über „チケット“ (Ticket) im Menü oben ein (wenn Sie „受付のメール“ (Eingangsbestätigung) wählen, erhält der Kunde die Nummer und den Link).

### Der Ablauf eines Tickets
Es gibt diese 6 Status.

新規 (neu) → 対応中 (in Bearbeitung) → お客様の返事待ち (Warten auf den Kunden) ／ 保留（社内） (zurückgestellt, intern) → 解決 (gelöst) → 完了 (abgeschlossen)

- Tickets aus E-Mail und Anfrageformular beginnen als „新規“. Wenn ein Bearbeiter dem Kunden antwortet, wird daraus „対応中“. Tickets, die ein Bearbeiter einträgt, beginnen gleich als „対応中“.
- Mit „送ったあとの状態“ (Status nach dem Senden) im Antwortfeld ändern Sie den Status beim Senden (zum Beispiel „お客様の返事待ち“, wenn Sie dem Kunden eine Frage stellen).
- Wenn der Kunde zu einem Ticket mit „お客様の返事待ち“, „解決“ oder „完了“ schreibt, geht es zurück auf „対応中“. Schreibt er mehr als 14 Tage nach dem Abschluss, wird ein neues Ticket angelegt, das auf das alte verweist.
- Wenn bei „お客様の返事待ち“ keine Antwort kommt, wird 3 Tage nach der letzten Antwort eine Erinnerung per E-Mail gesendet. Nach 7 Tagen wird das Ticket „解決“.
- „解決“ geht auch mit der Taste `E`, mit dem Status in der rechten Spalte und mit „解決しました“ (gelöst) auf der Seite des Links für den Kunden. Beim Lösen wird der Kunde nach der Zufriedenheit gefragt (5 Stufen).
- 7 Tage nach „解決“ wird das Ticket „完了“.
- Die Zahl der Tage ändern Sie unter „設定“ (Einstellungen) bei „自動で進める“ (automatisch weiterschalten) (0 schaltet den Schritt aus).

### Antworten und interne Notizen
- „お客様へ返信“ (dem Kunden antworten) im Antwortfeld kommt beim Kunden per E-Mail an. Vor den Betreff wird die Ticketnummer gesetzt (zum Beispiel `[SUP-00012]`), und der Link zum Fortschritt ist enthalten. Sie können auch CC eintragen.
- „社内メモ“ (interne Notiz) sieht der Kunde nicht. Es wird auch keine E-Mail gesendet.
- Zu jeder Antwort können Sie die Arbeitszeit (Minuten) eintragen. Sie wird je Kunde addiert und mit der Vertragszeit verglichen.
- Wenn der Kunde direkt auf die E-Mail antwortet, landet die Antwort im selben Ticket. Erkannt wird das an der Nummer im Betreff oder daran, auf welche E-Mail geantwortet wird (Message-ID). Der zitierte Teil wird entfernt. Wenn die Antwort nicht von der anfragenden Person, einer Person in CC oder einer Person derselben Firma stammt, kommt sie nicht in dasselbe Ticket.
- Wenn ein anderer Bearbeiter gerade eine Antwort auf dasselbe Ticket schreibt, wird das auf der Seite angezeigt.

### Zuständigkeit
- Wählen Sie die Person unter „担当者“ (Bearbeiter) in der rechten Spalte. Mit der Taste `A` übernehmen Sie das Ticket selbst. Wenn Sie zu einem Ticket ohne Bearbeiter eine Antwort oder eine interne Notiz senden, werden Sie zum Bearbeiter.
- Für die automatische Zuweisung wählen Sie unter „設定“ bei „担当者の決め方“ (Art der Zuweisung).
    - 種類ごとの「最初の担当者」 (erster Bearbeiter der Art, Standard): die Person, die bei der Art des Tickets eingetragen ist.
    - 種類で決まらなければ、対応中が少ない人 (sonst die Person mit den wenigsten offenen Tickets): in der Rollengruppe „ITサポート 担当者“ die Person mit den wenigsten nicht beendeten Tickets.
    - 自動では決めない (nicht automatisch zuweisen)

### Fristen (SLA)
- Jedes Ticket erhält „最初の返事の期限“ (Frist für die erste Antwort) und „解決の期限“ (Frist für die Lösung). Die Richtwerte legen Sie in der Tabelle „SLA“ je Priorität fest (緊急 dringend, 高 hoch, 中 normal, 低 niedrig). Die erste Antwort in Minuten, die Lösung in Stunden.
- Wenn für einen Kunden kein SLA festgelegt ist, gilt das SLA mit „標準にする“ (als Standard verwenden). Die Einrichtung legt „標準“ (Standard, nur Geschäftszeiten zählen) und „プレミアム（24 時間）“ (Premium, 24 Stunden) an.
- Ein SLA mit „営業時間だけで数える“ (nur Geschäftszeiten zählen) zählt nur die Geschäftstage, Geschäftszeiten und Feiertage aus „営業時間（SLA の時計）“ (Geschäftszeiten, die Uhr des SLA) unter „設定“. Die japanischen Feiertage für dieses und das nächste Jahr werden bei der Einrichtung eingetragen. Feiertage um den Jahreswechsel und Ähnliches tragen Sie selbst ein.
- Solange das Ticket auf „お客様の返事待ち“ steht, steht die Uhr still. Die Frist für die Lösung verschiebt sich um diese Zeit nach hinten.
- Wenn nur noch wenig Zeit bleibt (weniger als ein Viertel der ganzen Zeit oder weniger als 30 Minuten) und wenn die Frist überschritten ist, wird der Bearbeiter über die Glocke und per E-Mail benachrichtigt. Gibt es keinen Bearbeiter, werden alle Bearbeiter benachrichtigt.

### Textbausteine und Wissensdatenbank
- Wählen Sie im Antwortfeld unter „定型文…“ (Textbausteine) einen Eintrag. Er wird in den Text eingefügt. `{name}` (Name des Kunden), `{ticket_no}`, `{subject}` und `{link}` werden durch die Werte des Tickets ersetzt. Wenn bei einem Textbaustein ein Status festgelegt ist, ändert sich auch „送ったあとの状態“. Textbausteine fügen Sie über „定型文“ im Menü oben hinzu.
- Unter „ナレッジ“ (Wissensdatenbank) in der rechten Spalte erscheinen Artikel, die zum Betreff passen. Sie können auch suchen. Ein Klick fügt bei veröffentlichten Artikeln Titel und Link in die Antwort ein, bei anderen den Text.
- Mit „このチケットからナレッジを作る“ (aus diesem Ticket einen Artikel anlegen) entsteht ein Entwurf für einen Artikel.

### Die Seite der Kunden
Der Kundenzugang ist `https://Ihr Exment/support` (wenn „ITサポート：お客様の窓口“ und „使う“ (verwenden) unter „設定“ bei „お客様の窓口（ログインなし）“ (Kundenzugang ohne Anmeldung) beide eingeschaltet sind).

| URL | Inhalt |
| --- | --- |
| `/support` | Startseite des Zugangs. In der FAQ suchen, eine Anfrage stellen, die eigenen Anfragen ansehen |
| `/support/request` | Anfrageformular (ohne Anmeldung). Name, E-Mail-Adresse, Betreff und Inhalt sind Pflicht. Bis zu 5 Dateien (je bis 10MB) |
| `/support/faq` | Die veröffentlichte Wissensdatenbank (FAQ) |
| `/support/mine` | Die eigenen Anfragen ansehen. Nach Eingabe der E-Mail-Adresse kommt ein Link zur Liste der Anfragen per E-Mail (7 Tage gültig) |
| `/support/t/…` | Die Seite eines Tickets. Sie wird über den Link in der E-Mail geöffnet |

- Auf der Seite des Tickets sieht der Kunde, wie weit es ist (受付 eingegangen, 対応中, 解決, 完了), und den Austausch (interne Notizen erscheinen nicht). Er kann Antworten und Dateien senden und auf „解決しました“ klicken.
- 30 Tage nach dem Abschluss des Tickets lässt sich der Link nicht mehr öffnen („リンクの期限“ (Ablauf des Links) unter „設定“).
- Ein Ticket, bei dem in der rechten Spalte „開くときに確認のコード“ eingeschaltet ist, öffnet sich nur mit dem 6-stelligen Code, der an die eingetragene Adresse gesendet wird.
- Wenn ein Kunde, der sich anmeldet (Rollengruppe „ITサポート お客様“), „ITサポート“ öffnet, sieht er die Liste seiner Anfragen (`/plugins/exment_it_support/my`). Kontakte des Kunden mit „お客様の管理者“ (Administrator des Kunden) sehen alle Anfragen der Firma.

### E-Mail-Empfang
- Schalten Sie unter „設定“ bei „メールで受け付ける（IMAP）“ (per E-Mail annehmen) „受信する“ (empfangen) ein und tragen Sie IMAP-Server, Port und Verschlüsselung (SSL/TLS oder STARTTLS), Benutzername, Passwort und Ordner ein. Das Passwort wird verschlüsselt gespeichert.
- Empfangen wird alle 5 Minuten (bis zu 50 E-Mails auf einmal). Mit „いますぐ受信する“ (jetzt empfangen) geht es auch sofort. Gelesen werden ungelesene E-Mails, die danach als gelesen markiert werden.
- E-Mails in ISO-2022-JP und Shift_JIS sowie Anhänge (bis zu 20 je E-Mail) werden übernommen.
- Eine neue E-Mail wird ein Ticket mit „新規“, und der Kunde erhält eine Eingangsbestätigung (Nummer und Link). „Re:“ und Ähnliches wird aus dem Betreff entfernt. Wenn im Text Wörter wie „至急“, „緊急“ oder „止まって“ (dringend, steht still) stehen, wird die Priorität „高“ (hoch).
- Wenn die Adresse des Absenders bei einem eingetragenen Kontakt steht, wird es ein Ticket dieses Kunden. Sonst wird es ein Ticket des Kunden, dessen „メールのドメイン“ (E-Mail-Domain) zur Domain der Adresse passt, und es wird ein Kontakt angelegt. Bei unbekannten Absendern wählen Sie mit „知らない差出人“ (unbekannte Absender), ob ein Ticket (ohne Kunde) angelegt oder die E-Mail nicht übernommen wird.
- Zur Behandlung von Antworten per E-Mail und zu E-Mails mit Verdacht auf gefälschten Absender lesen Sie oben „Antworten und interne Notizen“ und unten „Regeln für die Sicherheit“.

## Tickets aus Überwachung und Fehlerprotokollen anlegen
Ein Überwachungssystem kann über die API Tickets anlegen. Der Schlüssel steht auf der Einstellungsseite.

~~~sh
curl -X POST https://Ihr Exment/support/intake/alert \
  -H "X-ITS-Key: (Schlüssel von der Einstellungsseite)" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| Feld | Bedeutung |
| --- | --- |
| `title` (Pflicht) | Betreff (`message` wird auch angenommen) |
| `source` | Quelle (`host` wird auch angenommen). Wenn die Domain zur „E-Mail-Domain“ eines Kunden passt, wird es ein Ticket dieses Kunden |
| `severity` | Wird zur Priorität (`level` wird auch angenommen). critical, emergency, alert und fatal ergeben „dringend“, error und high ergeben „hoch“, alles andere „normal“ |
| `fingerprint` | Kennzeichen, um gleiche Fehler zusammenzufassen (fehlt es, wird es aus Quelle und Betreff gebildet) |
| `detail` | Text |
| `customer` | Kundencode |

Systeme, die die ursprüngliche E-Mail unverändert weitergeben können (zum Beispiel eine Pipe von Postfix), können per POST an `/support/intake/mail` senden (mit demselben Schlüssel).

- Tickets aus der Überwachung werden dem Kunden zunächst nicht gezeigt.
- Wenn in der Funktionsverwaltung „ITサポート：お客様の窓口“ aus ist, antworten `/support/intake/alert` und `/support/intake/mail` mit 404.

## Regeln für die Sicherheit
- Der Link für den Kunden ist eine lange Nummer, die sich nicht erraten lässt. In der Datenbank wird nur der Hash gespeichert. Über den Link ist nur dieses eine Ticket zu sehen (interne Notizen, andere Kunden und die E-Mail-Adressen der Bearbeiter erscheinen nicht).
- Der Bestätigungscode gilt 10 Minuten, für höchstens 5 Versuche und nur einmal. Je Link wird der Code höchstens 5-mal pro Stunde gesendet, und es sind höchstens 10 Fehlversuche pro Tag erlaubt (danach ist der Code dieses Links bis zum nächsten Tag gesperrt).
- Auch wenn im Betreff eine Ticketnummer steht, kommt die E-Mail nur dann in dieses Ticket, wenn sie von der anfragenden Person, einer Person in CC oder einer Person derselben Firma stammt.
- Bei der Prüfung des Absenders gilt als Standard (empfohlen): „Nur E-Mails vertrauen, die die Prüfung des Empfangsservers bestanden haben (DMARC oder DKIM/SPF passend zur Domain in From)“. E-Mails, die sich nicht prüfen lassen, werden als „Verdacht auf gefälschten Absender“ angenommen. Cc wird nicht übernommen, und es wird kein Kontakt angelegt. Eine Antwort auf ein vorhandenes Ticket wird zu einer internen Notiz, die der Kunde nicht sieht (Tag „要確認“, Prüfung nötig). In den Einstellungen können Sie auch „Nur E-Mails verdächtigen, die bei der Prüfung durchgefallen sind“ wählen.
- Das Anfrageformular zeigt nach dem Absenden keinen Link an. Der Link wird per E-Mail an die eingegebene Adresse gesendet. Bis dieser Link geöffnet wird, hat das Ticket den Tag „メール未確認“ (E-Mail nicht bestätigt), und es wird kein Kontakt angelegt.
- Automatische Antworten, Bounces und E-Mails von der eigenen Adresse werden nicht übernommen.
- Der Link zur Zufriedenheit speichert nichts, wenn er nur geöffnet wird.
- Die Seite der Bearbeiter können nur Personen nutzen, die in der Ticket-Tabelle „alles bearbeiten“ dürfen (zum Beispiel die Rollengruppe „ITサポート 担当者“). „Nur eigene Daten bearbeiten“ reicht nicht.

### Seiten ohne Anmeldung
Aus Sicherheitsgründen lässt Exment nicht zu, dass ein Plugin über seine `config.json` Seiten ohne Anmeldung anlegt. Ein Helpdesk braucht aber einen Zugang für Kunden ohne Konto. Deshalb registriert dieses Plugin die Seiten unter `/support/...` selbst, wenn Exment startet. Es folgt demselben Gedanken wie die öffentlichen Formulare von Exment: Gezeigt wird nur, was das Geheimnis in der URL öffnet.

## Verwandte Themen
- [Offizielle Plugins](/de/plugin_official)
- [Plugin](/de/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
