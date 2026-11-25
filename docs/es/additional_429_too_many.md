# Cuando se produce el error 429 en la API
Al llamar a la API de Exment, puede aparecer el error 429 (429 Too Many Requests).  
En esta página se explica el motivo y cómo cambiar el límite del número de accesos.

- Exment limita el número de accesos a la API a 60 por minuto por cada usuario (por cada dirección IP si no está autenticado).
- Si se supera el límite, se devuelve el error 429 Too Many Requests.
- Esto se debe a que el framework que usa Exment (Laravel) limita las peticiones masivas.

### Pasos de configuración 
**(1)** Abra el archivo ".env" que está en la carpeta del proyecto.

**(2)** Escriba en "EXMENT_API_MAX_RATE_LIMIT" el límite de accesos por minuto. El valor predeterminado es 60.  
※Si ya existe una clave con el mismo nombre, cambie su valor.

Ejemplo: para permitir hasta 120 veces por minuto

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** Si usa la caché de configuración, ejecute otra vez "php artisan config:cache".

> Para más detalles sobre el valor de configuración, consulte la [Lista de valores de configuración de Exment](/es/config).

### Puntos a tener en cuenta
- **Si ha escrito su propio throttle**: si en "app/Http/Kernel.php" o en "bootstrap/app.php" ha configurado, en el grupo de middleware api, un throttle propio que indica el número de veces directamente (como "throttle:60,1"), ese tiene prioridad y "EXMENT_API_MAX_RATE_LIMIT" no se usa. Para configurarlo con "EXMENT_API_MAX_RATE_LIMIT", elimine su throttle propio.
- **v7.0.0 o posterior**: si el grupo de middleware api no tiene ningún throttle configurado, Exment añade "throttle:api" automáticamente. Por eso, aunque comente el throttle de "app/Http/Kernel.php", el límite no se quita. Para relajar el límite, ponga un valor grande en "EXMENT_API_MAX_RATE_LIMIT".
- **v6.x o anterior**: el límite se aplica mediante "\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'" (el texto predeterminado de Laravel 10), escrito en el grupo de middleware api de "app/Http/Kernel.php". Exment no añade "throttle:api" automáticamente, así que el límite se quita al comentar esa línea.
- "EXMENT_API_MAX_RATE_LIMIT" se puede usar en Exment v6.2.4 o posterior.

[←Volver a la lista de configuración adicional](/es/quickstart_more)
