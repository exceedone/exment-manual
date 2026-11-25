# (Para usuarios avanzados) Ejecución diferida de las notificaciones
Este ajuste sirve para ejecutar el envío de notificaciones más tarde, aparte de las operaciones de la pantalla.  
Normalmente Exment ejecuta todos los procesos en el momento (ejecución síncrona). Con este ajuste, una parte de los procesos se puede ejecutar más tarde (ejecución diferida, ejecución en cola). El tiempo de espera de la pantalla se acorta.

Por ahora, se pueden ejecutar más tarde estos procesos.

- Envío de correo
- Envío a Slack
- Envío a Microsoft Teams

## Puntos de atención
- En la ejecución diferida, los procesos (trabajos) se guardan en un lugar de espera por turno llamado «cola», y se ejecutan en un proceso distinto del de la pantalla.
- Para ejecutar los trabajos guardados, se pone en marcha con un comando el «worker de la cola» (el programa que ejecuta los trabajos). El worker tiene que seguir funcionando siempre. **Si el worker se detiene, los procesos no se ejecutan**.  
Tenga mucho cuidado; por ejemplo, vigile si el worker está funcionando.
- En el momento en que se ejecuta la notificación desde la pantalla, no se sabe si la notificación ha salido bien o mal.  
Por eso, aunque en realidad la notificación haya fallado, puede aparecer el mensaje «¡Se ha ejecutado la notificación!».
- Para una explicación detallada de las colas, vea el [manual de Laravel](https://laravel.com/docs/queues).


## Pasos de configuración
Se configura el driver de la cola (el lugar donde se guardan los trabajos). Aquí se usa la base de datos. (Según la configuración, también se puede usar Redis y otros)

**(1) Abra .env y escriba el ajuste siguiente.**

```
#Driver de la cola. El valor que se pone en la instalación de Exment es sync (proceso síncrono)
QUEUE_CONNECTION=database
```

**(2) Ejecute los comandos siguientes.** Crean las tablas donde se guarda la información de la cola.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> Las tablas «jobs» y «failed_jobs» a veces ya se crean con las migraciones del momento en que se creó el proyecto de Laravel. Mire la carpeta «database/migrations» y ejecute lo siguiente.
>
> | Contenido de la carpeta «database/migrations» | Comandos que se ejecutan |
> | ---- | ---- |
> | Hay un archivo que contiene «create_jobs_table» (proyecto creado con Laravel 11 o posterior) | Solo «php artisan exment:update» (las dos tablas se crean con las migraciones estándar, así que no se ejecutan «queue:table» ni «queue:failed-table») |
> | Solo hay un archivo que contiene «create_failed_jobs_table» | «queue:table» y «php artisan exment:update» |
> | No hay ninguno de los dos | Los 3 comandos de arriba |
>
> Si aparece «Migration already exists.», esa migración ya existe. No haga caso del error y pase al comando siguiente.

**(3) Ejecute el comando siguiente.** El worker empieza a funcionar.  
Este comando sigue funcionando hasta que usted lo detiene o cierra el terminal.

```
php artisan queue:listen
```

> Para que queue:listen siga funcionando siempre en segundo plano, hace falta un monitor de procesos (un mecanismo que vigila si el worker se ha detenido) como [Supervisor](https://laravel.com/docs/queues#supervisor-configuration).

### Cuando no se puede mantener el worker en marcha (servidores de alquiler, etc.)
En un servidor de alquiler u otro lugar donde no se puede mantener el worker en marcha, se despachan con cron, cada minuto, los trabajos acumulados (con `--stop-when-empty` termina cuando no quedan trabajos, y con `--max-time=50` termina antes del cron siguiente). Escriba php con la ruta completa y con la misma versión que usa la web.

```
* * * * * cd /(directorio raíz de Exment) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

Si tampoco se puede hacer eso, deje `QUEUE_CONNECTION=sync` (el valor de la instalación).

## Al actualizar el sistema
El worker de la cola es un proceso que funciona durante mucho tiempo. Mientras no se reinicie, no usa el código nuevo.  
Por eso, al actualizar el sistema, reinicie el worker. Con el comando queue:restart se pueden reiniciar todos los workers de forma suave.

```
php artisan queue:restart
```


## Comprobar los trabajos en ejecución
Así se comprueban los trabajos que se están ejecutando ahora.

- Conéctese a la base de datos y ejecute el comando siguiente.

```
select * from jobs;
```

- Aparece la lista de los trabajos que se están ejecutando ahora.


## Comprobar los trabajos fallidos
Así se comprueban los trabajos cuya ejecución ha fallado.

- Conéctese a la base de datos y ejecute el comando siguiente.

```
select * from failed_jobs;
```

- Aparece la lista de los trabajos cuya ejecución ha fallado.
