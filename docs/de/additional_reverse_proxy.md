# Einstellungen bei Verwendung eines Reverse Proxys
Dies sind die Einstellungen, wenn vor dem Server von Exment ein Reverse Proxy steht (ein Server, der die Web-Anfragen zuerst annimmt und an den Webserver weitergibt).  
Sie nehmen 2 Einstellungen vor: die auf der Seite von Exment und die auf der Seite des Reverse-Proxy-Servers.

> Diese Anleitung wurde ab v3.7.2 teilweise überarbeitet.

## Einleitung
Manchmal sind der Server, der die Web-Anfragen annimmt (oder der Dienst, zum Beispiel der Load Balancer eines Cloud-Dienstes; im Folgenden Reverse-Proxy-Server), und der Webserver verschieden.  
Vor allem die folgende Einstellung kommt vor.  

- Verbindung vom Internet zum Reverse-Proxy-Server : HTTPS
- Verbindung vom Reverse-Proxy-Server zum Webserver : HTTP

![Reverse Proxy](../img/quickstart/reverse_proxy1.png)


Unten stehen die zusätzlichen Einstellungen für den Reverse-Proxy-Server und für Exment, die bei einem solchen Aufbau nötig sind.  



### Einrichtung - Exment

- Ändern Sie die Datei .env.

~~~
# (Ergänzung eines vorhandenen Werts) URL bis zum Reverse-Proxy-Server. "admin" ist nicht nötig
APP_URL=https://XXXX.com 

# Neu hinzufügen, wenn Internet⇔Reverse-Proxy-Server über HTTPS und Reverse-Proxy-Server⇔Webserver über HTTP läuft
ADMIN_HTTPS=true

# Den Wert von "APP_URL" oben zum Erzeugen der URLs verwenden
ADMIN_USE_APP_URL=true

# IP-Adressen der Reverse-Proxy-Server, für die der Proxy erlaubt ist. Bei mehreren IP-Adressen durch Kommas getrennt
# ※Wenn die IP nicht fest ist oder wenn durch die Zoneneinstellung nur der Reverse-Proxy-Server zugreift, ist auch "*" möglich
ADMIN_TRUST_PROXY_IPS=172.0.1.1,172.0.1.2
#ADMIN_TRUST_PROXY_IPS=*

# Bei AWS ELB den folgenden Wert hinzufügen
ADMIN_TRUST_PROXY_HEADERS=HEADER_X_FORWARDED_AWS_ELB
~~~

- Wenn Sie die [SAML-Authentifizierung](/de/login_saml) verwenden, stellen Sie unter „Optionseinstellungen“ das Feld „Proxy verwenden“ auf YES.
![Reverse Proxy](../img/quickstart/reverse_proxy2.png)


### Einrichtung - Reverse-Proxy-Server

- Wenn der Reverse-Proxy-Server (Load Balancer, Nginx usw.) an den Webserver weiterleitet, muss er die folgenden Header hinzufügen.  
Prüfen Sie, ob die Header gesetzt sind.  
※Diese Header geben die Daten des Zugriffs bis zum Reverse-Proxy-Server weiter. Der Webserver liest und verwendet sie.  
    - X-Forwarded-Host : Hostname des Reverse-Proxy-Servers
    - X-Forwarded-For : IP-Adresse des Clients
    - X-Forwarded-Proto : http oder https
    - X-Forwarded-Port : Port bis zum Reverse-Proxy-Server

- Beispiel: bei nginx

```
    location / {
        proxy_set_header X-Forwarded-Host localhost;
        proxy_set_header X-Forwarded-For XXXX;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 10443;
    }
```

- ※Wenn Sie zur Prüfung die Werte der Anfrage und der Header ausgeben möchten, fügen Sie der „.env“ im Stammordner die folgende Zeile hinzu. Die Ausgabe steht in storage/logs/laravel.log.

```
EXMENT_DEBUG_MODE_REQUEST=1
```


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
