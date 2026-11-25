# Refresco de los datos personalizados
Estos son los pasos para eliminar de una vez, con un comando, los datos personalizados registrados (refrescarlos).  
La configuración (definición de las tablas, configuración del sistema, etc.) se conserva y solo se borran los datos. Se usa en casos como los siguientes.

- Después de probar el entorno, quiere eliminar todos los datos registrados y volver a probar.
- Después de pasar del entorno de pruebas al entorno de producción, quiere eliminar todos los datos del entorno de producción y empezar a trabajar.

Hay 2 comandos.

| Qué quiere hacer | Comando | Dónde mirar |
|---|---|---|
| Eliminar de una vez los datos de todas las tablas personalizadas | `php artisan exment:refreshdata` | «Datos de todas las tablas» |
| Eliminar solo los datos de las tablas indicadas | `php artisan exment:refreshtable` | «Datos de las tablas personalizadas indicadas» |

Con los dos comandos, le recomendamos hacer una copia de seguridad de los datos antes de ejecutarlos.

## Datos de todas las tablas
Afecta a todas las tablas.  
Al ejecutar el comando, se eliminan todos los «Datos que se eliminan» de abajo. La numeración de id también vuelve a empezar en 1.


### Datos que se eliminan (incluidas las tablas internas)
- Registros de acceso
- Tabla de verificación de las direcciones de correo electrónico
- Datos de la barra de notificaciones
- Historial de actualizaciones
- Usuarios responsables del trabajo en el flujo de trabajo
- Estados de ejecución del flujo de trabajo
- Datos personalizados compartidos
- Datos de relación n:n (excepto organización-usuario)
- Datos personalizados (excepto usuarios, organizaciones y plantillas de notificación)
- Archivos adjuntos de los datos personalizados (excepto usuarios, organizaciones y plantillas de notificación)

### Datos que no se eliminan
- Configuración del sistema
- Valores de configuración de las tablas personalizadas
- Configuración del flujo de trabajo
- Otros valores de configuración relacionados con el sistema
- Información de inicio de sesión
- Datos de usuarios, de organizaciones y de plantillas de notificación
- Información de pertenencia organización-usuario

### Cómo ejecutarlo
- <span class="red bold">※ Le recomendamos hacer una copia de seguridad de los datos antes de ejecutar este comando.</span>
- Ejecute el siguiente comando.

~~~
php artisan exment:refreshdata
~~~


## Datos de las tablas personalizadas indicadas
Afecta a las tablas personalizadas indicadas.  
No se elimina todo de una vez: la forma de eliminar cambia según el tipo de datos (los 3 casos de abajo).  
※ Los datos de usuarios, organizaciones y plantillas de notificación no se pueden refrescar.

### Datos que se eliminan por completo y cuya numeración de id vuelve a 1
- Los datos de la tabla personalizada indicada
- Si la tabla personalizada indicada es el lado padre de una relación 1:n, los datos de la tabla personalizada del lado hijo
- Si la tabla personalizada indicada es el lado padre o el lado hijo de una relación n:n, la información de los datos de relación n:n. ※ Los datos de la tabla personalizada relacionada no se eliminan.

### Se eliminan solo los datos relacionados con la tabla que se elimina (incluidas las tablas internas)
- Datos de la barra de notificaciones
- Historial de actualizaciones
- Usuarios responsables del trabajo en el flujo de trabajo
- Estados de ejecución del flujo de trabajo
- Datos personalizados compartidos
- Archivos adjuntos y comentarios de los datos personalizados

### Se actualizan para dejar el valor vacío
- Si la tabla que se elimina se usa en una columna personalizada «Selección (desde tabla)» de otra tabla personalizada, los datos de esa tabla personalizada se actualizan de una vez para que el valor de referencia quede vacío.


### Cómo ejecutarlo

- <span class="red bold">※ Le recomendamos hacer una copia de seguridad de los datos antes de ejecutar este comando.</span>
- Ejecute el siguiente comando.

~~~
php artisan exment:refreshtable {nombre de la tabla. Si son varias, entre "" y separadas por comas}

# Ejemplo: ejecutar sobre 1 tabla
php artisan exment:refreshtable information

# Ejemplo: ejecutar sobre varias tablas
php artisan exment:refreshtable "table1,table2,table3"
~~~
