# Configuración cuando se usa un proxy inverso
Esta es la configuración para cuando delante del servidor de Exment hay un proxy inverso (un servidor que recibe primero las peticiones web y las pasa al servidor web).  
Se hacen dos configuraciones: la del lado de Exment y la del lado del servidor de proxy inverso.

> Este procedimiento se revisó en parte a partir de la v3.7.2.

## Introducción
A veces el servidor que recibe las peticiones web (o el servicio, como el balanceador de carga de un servicio en la nube; en adelante, servidor de proxy inverso) y el servidor web son distintos.  
En especial, a veces se configura así.  

- Comunicación de Internet al servidor de proxy inverso: HTTPS
- Comunicación del servidor de proxy inverso al servidor web: HTTP

![Proxy inverso](../img/quickstart/reverse_proxy1.png)


Abajo se describe la configuración adicional del servidor de proxy inverso y de Exment que hace falta con una estructura así.  



### Pasos de configuración - Exment

- Corrija el archivo .env.

~~~
# (Añadir a un valor que ya existe) URL hasta el servidor de proxy inverso. No hace falta "admin"
APP_URL=https://XXXX.com 

# Añádalo como valor nuevo si Internet⇔servidor de proxy inverso es HTTPS y servidor de proxy inverso⇔servidor web es HTTP
ADMIN_HTTPS=true

# Usa el valor de "APP_URL" de arriba para generar las URL
ADMIN_USE_APP_URL=true

# Direcciones IP de los servidores de proxy inverso a los que se permite el proxy. Si se esperan varias direcciones IP, sepárelas con comas
# ※Si la IP no es fija, o si por la configuración de zonas solo accede el servidor de proxy inverso, también se puede indicar con "*"
ADMIN_TRUST_PROXY_IPS=172.0.1.1,172.0.1.2
#ADMIN_TRUST_PROXY_IPS=*

# En el caso de AWS ELB, añada el valor siguiente
ADMIN_TRUST_PROXY_HEADERS=HEADER_X_FORWARDED_AWS_ELB
~~~

- Si usa la [autenticación SAML](/es/login_saml), en «Ajustes de opciones» ponga «Usar proxy» en YES.
![Proxy inverso](../img/quickstart/reverse_proxy2.png)


### Pasos de configuración - Servidor de proxy inverso

- Cuando el servidor de proxy inverso (balanceador de carga, Nginx, etc.) reenvía al servidor web, tiene que añadir las cabeceras siguientes.  
Compruebe que las cabeceras están puestas.  
※Son cabeceras que transmiten la información del acceso hasta el servidor de proxy inverso. El servidor web las lee y las usa.  
    - X-Forwarded-Host : nombre de host del servidor de proxy inverso
    - X-Forwarded-For : dirección IP del cliente
    - X-Forwarded-Proto : http o https
    - X-Forwarded-Port : puerto hasta el servidor de proxy inverso

- Ejemplo: con nginx

```
    location / {
        proxy_set_header X-Forwarded-Host localhost;
        proxy_set_header X-Forwarded-For XXXX;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 10443;
    }
```

- ※Si para comprobar quiere ver los valores de la petición y de las cabeceras, añada la línea siguiente al «.env» de la carpeta raíz. Se escriben en storage/logs/laravel.log.

```
EXMENT_DEBUG_MODE_REQUEST=1
```


[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
