# composer aktualisieren
Hier steht, wie Sie composer von Version 1 auf Version 2 aktualisieren.  
composer ist die Bibliothek, die für die Installation und das Update von Exment verwendet wird.

> Falls nach diesem Update beim Aktualisieren von Exment Fehler auftreten, wären wir sehr dankbar, wenn Sie es [hier](https://github.com/exceedone/exment/issues/849) melden.  

## Ablauf des Updates
1. Die jetzige Version von composer prüfen (bei 2.X.X sind die weiteren Schritte nicht nötig)
2. Die Version von laravel/framework prüfen (wenn sie alt ist, zuerst aktualisieren)
3. composer aktualisieren

## Über composer 2
Im Oktober 2020 ist Version 2 von composer erschienen.  
In Version 2 ist Folgendes besser geworden.

- Deutliche Verbesserung sowohl bei der Geschwindigkeit als auch beim Speicherverbrauch
- require/remove und teilweise Updates sind viel schneller

![composer2](../ja/img/update/composer2.png)

Quellen:  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

Auch für Exment haben wir die Installation und das Update mit composer2 geprüft und bestätigt, dass beides ohne Probleme funktioniert.  
Es hängt von der Umgebung ab, aber es ist zu erwarten, dass der zu hohe Speicherverbrauch, der bei composer1 oft auftrat, besser wird. Deshalb empfehlen wir das Update auf composer2.


## Update-Schritte
Für das Update auf composer2 sind einige Schritte nötig.  
<span class="red">※ Probieren Sie dieselben Schritte möglichst zuerst in einer Entwicklungsumgebung oder Ähnlichem aus und führen Sie sie erst danach in der Produktivumgebung aus.</span>

### Die jetzige Version von composer prüfen

- Prüfen Sie die jetzige Version von composer mit dem folgenden Befehl. (Sie können ihn in jedem Ordner ausführen.)

```
composer --version
```

| Ergebnis | Was zu tun ist |
|---|---|
| composer2.X.X, und auch das Update von Exment läuft ohne Probleme durch | Das Update von composer ist bereits erledigt. Die weiteren Schritte sind nicht nötig |
| composer1.X.X | Führen Sie die weiteren Schritte aus |

### Die jetzige Version von laravel/framework prüfen und aktualisieren

Prüfen Sie die Version von laravel/framework, die Exment verwendet.  
※ Wenn auf demselben Server mehrere Exment installiert sind, führen Sie die folgenden Schritte für alle Exment aus.  

- Führen Sie den folgenden Befehl im Stammordner von Exment aus.

```
php artisan --version
# Es wird ein Ergebnis wie das folgende angezeigt
# Laravel Framework 5.6.39
```

- Wenn das Ergebnis version5.6.40 oder höher ist, müssen Sie nichts tun.

- Wenn das Ergebnis niedriger als version5.6.40 ist, aktualisieren Sie mit dem folgenden Befehl das ganze Projekt.  

```
composer update
```

### composer aktualisieren

- Aktualisieren Sie composer auf die Version 2.X.X.

```
# Führen Sie einen der folgenden Befehle aus
composer self-update --2
composer selfupdate --2
```

- Wenn nach dem Update ein Fehler auftritt, können Sie mit dem folgenden Befehl zu version1.X.X zurückkehren.  
Führen Sie diesen Befehl aber in einem **Pfad außerhalb des Exment-Ordners** aus. Im Exment-Ordner scheint er zu einem Fehler zu führen.

```
composer self-update --1
composer selfupdate --1
```
