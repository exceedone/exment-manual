# Tareas programadas
Es la lista de las tareas que el cron del servidor (`php artisan schedule:run`) ejecuta a horas fijas. Se abre en «Configuración: sistema» → «Tareas programadas» (la URL es `/scheduled_jobs`).

※Esta pantalla se puede usar en Exment v7.2.6 o posterior.  
※Solo el administrador del sistema puede ver esta pantalla.

## Empezar a usarla
En la [Gestión de funciones](/es/feature), ponga «Tareas programadas» en «usar». Al principio está en «no usar». Cuando no se usa, esta pantalla no se puede abrir (da 404).

Las ejecuciones de las tareas solo se registran mientras se usa.

## Estado de cron
Muestra la hora en que `schedule:run` se ejecutó por última vez. Si lleva 10 minutos o más sin ejecutarse, aparece un aviso. En ese caso, las notificaciones, las copias de seguridad automáticas, los lotes de los plugins, etc. están detenidos. Añada la siguiente línea al cron del servidor (también se puede comprobar en [Optimización](/es/tuning)).

~~~
* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1
~~~

## Lista de tareas
| Campo | Qué muestra |
|---|---|
| Tarea | El nombre de la tarea de Exment y el comando (los lotes de los plugins aparecen como «Lote del plugin: nombre») |
| Cuándo | Lo muestra con palabras, como «Cada 5 minutos», «Cada hora» o «Cada día a las 3:30» |
| Próxima ejecución | Se muestra en su zona horaria |
| Estado | En las tareas que no se ejecutan, también muestra el motivo (ejemplo: no se usa la «Comprobación de seguridad del personal») |
| Última ejecución y ejecuciones recientes | Inicio, fin, duración, resultado, código de salida, quién la ejecutó y los últimos 4KB de la salida |

De cada tarea se conservan las 20 ejecuciones más recientes. El número se puede cambiar con `EXMENT_SCHEDULED_JOBS_KEEP_RUNS` en `.env`.

## Cuando falla varias veces seguidas
Las tareas que fallan 3 veces seguidas aparecen en rojo. Al administrador del sistema se le avisa una sola vez, con un aviso en la parte superior de la pantalla y por correo. Cuando la tarea termina bien, vuelve a la normalidad, y se avisa de nuevo si vuelve a fallar varias veces seguidas. El número de veces se puede cambiar con `EXMENT_SCHEDULED_JOBS_ALERT_FAILURES` en `.env`.

## Ejecutar ahora
Al pulsar «Ejecutar ahora», esa tarea se ejecuta enseguida en segundo plano. Una tarea que se está ejecutando no se puede ejecutar otra vez al mismo tiempo.

Sin embargo, en las tareas que no tienen el ajuste que impide el solapamiento (el `exment:schedule` de cada hora y los lotes de los plugins), la ejecución a la hora fija no espera a «Ejecutar ahora». Si lo pulsa justo antes de la hora de ejecución (por ejemplo, la hora en punto), las dos pueden ejecutarse a la vez. No lo pulse cerca de la hora de ejecución.

En los siguientes casos no se puede pulsar el botón (se muestra el motivo). El cron del servidor sigue ejecutando las tareas también en esos casos.
- Servidores donde PHP no puede ejecutar comandos externos (servidores de alquiler donde no se puede usar `proc_open`, etc.)
- Entornos de demostración

## Comandos
~~~
php artisan exment:schedule-status          # Muestra la lista en una tabla
php artisan exment:schedule-status --json   # Muestra en JSON la última ejecución de cada tarea y el número de fallos seguidos
~~~

En SaaS, para cada inquilino solo se muestran las tareas y las ejecuciones de ese inquilino.
