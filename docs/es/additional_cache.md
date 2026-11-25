# Activar la caché
Guarda los datos maestros, como la configuración, en una caché (un mecanismo que guarda los datos por un tiempo y los vuelve a usar a partir de la siguiente vez).  
Como baja el número de accesos a la base de datos, en algunos entornos Exment puede ir más rápido.

Se guardan en la caché, principalmente, los siguientes datos.

- Configuración del sistema
- Tablas personalizadas
- Columnas personalizadas
- Configuración de formularios
- Configuración de vistas
- Configuración del flujo de trabajo
- Si se puede conectar o no a la base de datos
- Otra información maestra

### Pasos de configuración 
- Añada el siguiente contenido al archivo .env y guarde.

~~~
EXMENT_USE_CACHE=true
~~~

### Si quiere eliminar la caché 
- La caché se actualiza periódicamente. Si quiere eliminarla enseguida, ejecute el siguiente comando.

~~~
php artisan cache:clear
~~~


[←Volver a la lista de configuración adicional](/es/quickstart_more)
