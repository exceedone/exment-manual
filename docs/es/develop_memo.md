# Notas de desarrollo
Son notas para desarrolladores.  
Aquí se reúnen especificaciones y otros puntos que son demasiado detallados para el manual de cada pantalla, pero que conviene compartir entre los desarrolladores.

## Por qué no se puede combinar el permiso "Consultar todos los datos" con "Editar datos asignados" y similares
Actualmente, para una misma tabla no se puede combinar el permiso "Consultar todos los datos" con "Editar datos asignados" o "Ver datos asignados".  
El motivo es la siguiente especificación.

#### Punto de partida
Los permisos se fusionan, y tiene prioridad el permiso más fuerte (los permisos del tipo "permitir").  
Por ejemplo, si se combinan "permitir obtener todos los datos" y "solo se pueden obtener los datos compartidos con uno mismo", tiene prioridad "permitir obtener todos los datos".

#### Detalle del permiso "Consultar todos los datos"

- Al ejecutar el SQL, no se añade la cláusula where del uso compartido de datos, y se permite obtener todos los datos.
- No se puede mostrar la pantalla de lista. Tampoco se puede mostrar el elemento en el menú.
- No se pueden crear ni editar datos.

#### Detalle del permiso "Editar datos asignados"

- Al ejecutar el SQL, se aplica la cláusula where por datos, y solo se pueden obtener los datos compartidos con uno mismo.
- Se puede mostrar la pantalla de lista. También se puede mostrar el elemento en el menú.
- Se pueden crear datos y editar los datos compartidos con uno mismo.


#### Resultado
Al combinar estos 2 permisos, el detalle queda así.

- Al ejecutar el SQL, no se añade la cláusula where del uso compartido de datos, y se permite obtener todos los datos.
- Se puede mostrar la pantalla de lista. También se puede mostrar el elemento en el menú.
- Se pueden crear datos y editar los datos compartidos con uno mismo.

Es decir, todos los datos se muestran en la pantalla de lista, y se pueden crear datos y editar los datos compartidos con uno mismo.  
  
Sería posible añadir en cada pantalla un proceso del tipo "en la pantalla de lista no se permite obtener todos los datos, y solo se pueden obtener los datos compartidos con uno mismo". Pero habría que añadir ese proceso en todos los plugins propios y en las demás pantallas, y podría convertirse en una vulnerabilidad.  
Además, esta situación es exactamente igual que combinar "Ver todos los datos" con "Editar datos asignados".  
Por eso, actualmente la configuración no permite combinar "Consultar todos los datos" con "Editar datos asignados" y similares.  

#### Para qué sirve "Consultar todos los datos"
Sirve, principalmente, para casos como el siguiente.  

- Tipos de impuesto  
    →A los responsables, etc. se les dan los permisos "Consultar todos los datos" y "Editar todos los datos", y lo mantienen como datos maestros.  
    →A los usuarios generales se les da solo "Consultar todos los datos", para que puedan obtenerlo como opción de selección.




## Especificación de la eliminación de datos personalizados
Revisada desde v4.0.7.

#### En la eliminación lógica
※Como se pueden restaurar, en general se conservan  

- Archivos de las columnas personalizadas "Archivo" e "Imagen": no se eliminan
- Archivos adjuntos: no se eliminan
- Relación (los datos secundarios cuando se eliminan los datos principales, en 1:n): se eliminan de forma lógica
- Relación (los demás casos): no se eliminan
- Control de permisos: no se elimina
- Revisiones: no se eliminan, y se añade un historial con la fecha y hora de la eliminación
- Notificación: se ejecuta
- Historial del flujo de trabajo: no se elimina

#### En la eliminación permanente
Se eliminan físicamente

- Archivos de las columnas personalizadas "Archivo" e "Imagen": se eliminan
- Archivos adjuntos: se eliminan
- Relación: se elimina todo físicamente
- Control de permisos: se elimina
- Revisiones: se eliminan
- Notificación: no se ejecuta
- Historial del flujo de trabajo: se elimina

#### En la eliminación física inmediata
※Si el valor de configuración EXMENT_DELETE_FORCE_CUSTOM_VALUE se pone en 1, la eliminación física es inmediata

- Archivos de las columnas personalizadas "Archivo" e "Imagen": se eliminan
- Archivos adjuntos: se eliminan
- Relación: se elimina todo físicamente
- Control de permisos: se elimina
- Revisiones: se eliminan
- Notificación: se ejecuta
- Historial del flujo de trabajo: se elimina



## Por qué el resultado de la función getOrganizationIdsForQuery está invertido respecto a las organizaciones reales
La función \Exment::user()->getOrganizationIdsForQuery devuelve un resultado invertido respecto a las organizaciones a las que el usuario pertenece realmente.  
Por ejemplo, supongamos la siguiente estructura de organizaciones.

```
 Ex. (O):Ogganization, (U):User
 
     (O)Company
         (O)develop-team
             (U) Manager
 
             (O) develop-team1
                  (U) User1
                  (U) User2
             (O) develop-team2
                  (U) User3
```

Aquí, si el usuario que ha iniciado sesión es Manager y $filterType es JoinedOrgFilterType::ONLY_UPPER, uno imaginaría que se obtienen (O)develop-team y (O)Company, pero  
**en realidad se obtienen (O)develop-team, (O) develop-team1 y (O) develop-team2.**
  
Esto se debe a que esta función tiene como único fin obtener los datos compartidos y los datos sobre los que se tiene permiso, y no obtener las organizaciones reales.  
Por ejemplo, con la configuración "el dato A está compartido con (O)develop-team1" y "el uso compartido de datos incluye las organizaciones de los niveles superiores (JoinedOrgFilterType::ONLY_UPPER)", Manager obtiene los datos compartidos con (O)develop-team, (O) develop-team1 y (O) develop-team2.  
En este caso, para el proceso de la consulta, se considera que Manager pertenece a (O)develop-team, (O) develop-team1 y (O) develop-team2, y se ejecuta el SQL.  

Por eso, a diferencia de lo que sugiere el valor del Enum, el resultado real se obtiene invertido.


## Proceso de carga de los plugins
Normalmente, para cargar los archivos PHP se usa autoload.  
Lo genera composer, y ni los desarrolladores ni los usuarios del programa tienen que pensar casi nunca en él.  
  
Sin embargo, los archivos PHP que se instalan con un plugin no pueden usar autoload.  
Esto se debe a que los archivos de los plugins de Exment se pueden colocar en servicios externos, como AWS S3 o FTP, y puede que los archivos del plugin no existan realmente en el servidor.  
※Para los detalles de esta función, consulte [esta página](/es/additional_file_saveplace)  
  
Por eso, la carga de los plugins se hace de una forma especial.  
A continuación se explican los detalles.  

### Descarga de los archivos del plugin (cuando los archivos del plugin están en un servicio externo)
Si los archivos del plugin están en un servicio externo, se descargan.  
Se hacen las siguientes comprobaciones y la descarga se hace solo cuando es necesaria.

- Se comprueba si en la carpeta del plugin en el servidor, "/storage/app/plugins/(nombre del plugin)", existe el archivo "updated_at.txt"  
→Si no existe, hay que descargar

- Se abre el archivo "updated_at.txt" y se comprueba la marca de tiempo escrita en él

- Se compara con la fecha y hora de actualización de la tabla "Plugin" de la base de datos, y se comprueba si la fecha y hora son distintas  
→Si son distintas, hay que descargar

Si la descarga es necesaria, los archivos del plugin se descargan del servicio externo.  
Después, se crea el archivo "updated_at.txt" en la carpeta del plugin y se escribe en él la marca de tiempo.

### Añadir los directorios al ClassLoader propio
Se recorren los archivos de cada plugin y se añaden al \Exceedone\Exment\Services\ClassLoader propio la carpeta del plugin y el espacio de nombres que corresponde a ese plugin.

### Ejecución de la carga
Cuando se llama a una clase de un plugin, spl_autoload_register llama al ClassLoader propio.  
Con ello, usando como clave el namespace de la clase llamada y la carpeta del plugin, se hace require_once del archivo PHP que corresponde.  
Con este proceso, aunque la clase no esté cargada, se lee de forma dinámica y se hace require_once.




## Configuración de filtrado de los tipos de columna "Selección (desde tabla)", "Usuario" y "Organización"
En la pantalla de introducción de datos personalizados, las opciones que se muestran en los tipos de columna "Selección (desde tabla)", "Usuario" y "Organización" no siempre son todas.  
A continuación se describen los casos en los que las opciones se filtran.  
  
※Como ejemplo para la explicación, se suponen las siguientes tablas.  

- Tabla que se muestra: Contratos
- Tabla 1 a la que se hace referencia con el tipo de columna "Selección (desde tabla)": Clientes
- Tabla 2 a la que se hace referencia con el tipo de columna "Selección (desde tabla)": Responsables  
※Las tablas Clientes y Responsables tienen configurada una relación principal-secundario 1:n


### Casos de filtrado del tipo de columna "Selección (desde tabla)"

#### Permisos del usuario que ha iniciado sesión
En la tabla de referencia (Clientes), solo se muestran los datos a los que el usuario que ha iniciado sesión tiene permiso de acceso.  
Los datos sobre los que no tiene permiso no se muestran en las opciones.  

##### Qué hacer con esta configuración
Si no se muestran las opciones esperadas, haga una de las siguientes cosas para añadir el permiso.  

- Comparta con el usuario que ha iniciado sesión los datos de la tabla de referencia (Clientes) que quiere que se muestren en las opciones.  
Detalle: [Compartir datos](/es/data_details)

- Añada el permiso "Editar todos los datos / Ver todos los datos" de la "tabla de referencia (Clientes)" al grupo de roles al que pertenece el usuario que ha iniciado sesión.  
Detalle: [Grupo de roles](/es/role_group)


#### Ajuste de columna "Vista de condiciones"
Si se ha configurado el ajuste de columna "Vista de condiciones", las opciones que se muestran se filtran según las condiciones de filtrado de esa vista de condiciones.  
※La vista de condiciones es una vista para filtrar los datos de la tabla de referencia (Clientes).

##### Qué hacer con esta configuración
Si no se muestran las opciones esperadas, haga una de las siguientes cosas.  

- Revise las condiciones de la vista de condiciones de la tabla de referencia (Clientes) cuyos datos quiere que se muestren en las opciones.  
Detalle: [Vista de condiciones](/es/view)

- Elimine la configuración del ajuste de columna "Vista de condiciones".


#### Hay 100 datos o más
Si en la tabla de referencia (Clientes) hay 100 datos o más, al principio no se muestran opciones.  
Al escribir una palabra de búsqueda, se muestran como opciones solo los datos que coinciden con esa palabra.   
Además, si el ajuste de la columna personalizada "Buscar las opciones cada vez" está en YES, las opciones se muestran de esta forma sea cual sea el número de datos.  


#### Configuración del filtro por relación
En la pantalla de configuración del formulario personalizado hay un ajuste "Filtro por relación".  
Es una función por la que, cuando en el mismo formulario hay opciones con relación principal-secundario, al seleccionar la opción principal (cliente) las opciones secundarias (responsable) se filtran automáticamente.  
Detalle: [Configuración de formularios](/es/form)  
 
Con este ajuste, el comportamiento es el siguiente.

- Opciones del secundario (responsable) cuando no se ha seleccionado el principal (cliente)  
→No se muestra ninguna opción.

- Opciones del secundario (responsable) cuando se ha seleccionado el principal (cliente)  
→De los datos del secundario (responsable), se muestran en la lista aquellos cuyo valor del principal (cliente) es el valor seleccionado en la opción principal.  




### Casos de filtrado de los tipos de columna "Usuario" y "Organización"

#### Permisos de los usuarios y las organizaciones sobre la tabla que se muestra
En las opciones solo se muestran los usuarios y las organizaciones que pueden acceder a la tabla que se muestra (Contratos).  
<span class="red">※Los permisos del usuario que ha iniciado sesión no influyen.</span> El criterio es "si el usuario o la organización que se va a mostrar en las opciones tiene permiso sobre la tabla que se muestra".  

##### Qué hacer con esta configuración
Si no se muestran las opciones esperadas, haga una de las siguientes cosas.  

- En la configuración de grupos de roles, añada "los usuarios y las organizaciones que quiere que se muestren en las opciones" a un grupo de roles que tenga permiso sobre "la tabla que se muestra (Contratos)".  
Detalle: [Grupo de roles](/es/role_group)

- En la configuración de la columna personalizada, ponga en YES "Mostrar también usuarios y organizaciones sin permiso".  
Al poner este ajuste en YES, deja de comprobarse "si el usuario o la organización tiene permiso sobre la tabla que se muestra (Contratos)".


#### Configuración para un portal externo (cuando se construye un sistema en el que inician sesión usuarios de varias organizaciones)
En la pantalla de lista de datos y en la de edición, al mostrar los usuarios y las organizaciones, a veces se configura **"mostrar solo las organizaciones a las que pertenece el usuario que ha iniciado sesión y los usuarios que pertenecen a ellas"**.  
Si se ha hecho esta configuración, cuando el usuario que ha iniciado sesión abre las opciones de organizaciones y usuarios, solo se muestran los usuarios y las organizaciones que tienen relación principal-secundario con él.  
Detalle: [Configuración para un portal externo](/es/multiuser)


#### Ajuste de columna "Vista de condiciones"
Si se ha configurado el ajuste de columna "Vista de condiciones", las opciones que se muestran se filtran según las condiciones de filtrado de esa vista de condiciones.  
※La vista de condiciones es una vista para filtrar los datos de la tabla de referencia (Usuario).

##### Qué hacer con esta configuración
Si no se muestran las opciones esperadas, haga una de las siguientes cosas.  

- Revise las condiciones de la vista de condiciones de la tabla de referencia (Usuario) cuyos datos quiere que se muestren en las opciones.  
Detalle: [Vista de condiciones](/es/view)

- Elimine la configuración del ajuste de columna "Vista de condiciones".


#### Hay 100 datos o más
Si en la tabla de referencia (Usuario) hay 100 datos o más, al principio no se muestran opciones.  
Al escribir una palabra de búsqueda, se muestran como opciones solo los datos que coinciden con esa palabra.   
Además, si el ajuste de la columna personalizada "Buscar las opciones cada vez" está en YES, las opciones se muestran de esta forma sea cual sea el número de datos.  


#### Configuración del filtro por relación
En la pantalla de configuración del formulario personalizado hay un ajuste "Filtro por relación".  
Es una función por la que, cuando en el mismo formulario hay opciones con relación principal-secundario, al seleccionar la opción principal (organización) las opciones secundarias (usuario) se filtran automáticamente.  
Detalle: [Configuración de formularios](/es/form)  
 
Con este ajuste, el comportamiento es el siguiente.

- Opciones del secundario (usuario) cuando no se ha seleccionado el principal (organización)  
→No se muestra ninguna opción.

- Opciones del secundario (usuario) cuando se ha seleccionado el principal (organización)  
→De los datos del secundario (usuario), se muestran en la lista los que pertenecen al principal (organización).  


## Tabla de pantallas y funciones

### Panel
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar el panel</td>
            <td>Muestra todos los elementos configurados en el panel.</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Crear panel</td>
            <td>Crea un panel nuevo.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Editar el panel</td>
            <td>Modifica la información de un panel ya creado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Eliminar el panel</td>
            <td>Elimina un panel ya creado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Editar un elemento del panel</td>
            <td>Modifica el contenido de 1 elemento del panel.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Eliminar un elemento del panel</td>
            <td>Elimina el contenido de 1 elemento del panel.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Tipo de gráfico</td>
            <td>Muestra los datos registrados de una vista de resumen con el tipo de gráfico configurado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Tipo de calendario</td>
            <td>Muestra los datos registrados de una vista de calendario con el tipo de formato configurado.</td>
            <td>Administración del sistema</td>
        </tr>
</table>

### Configuración del sistema
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Uso de la API</td>
            <td>Configura si se puede usar la API.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Comunicación externa del servidor</td>
            <td>Configura si se permite la comunicación externa del servidor.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Gestión de permisos</td>
            <td>Configura si se pueden configurar permisos sobre todo el sistema y sobre las tablas personalizadas.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Gestión de organizaciones</td>
            <td>Al usar la gestión de permisos, configura si se pueden conceder permisos indicando una organización.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Uso de la administración del sistema</td>
            <td>Configura los usuarios que supervisan el sistema.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Número de elementos en la lista de datos</td>
            <td>Muestra los datos en las páginas de lista con el número de elementos establecido.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Formato de visualización de fecha y hora</td>
            <td>La fecha y la hora se muestran con el formato seleccionado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Método de búsqueda de datos</td>
            <td>Los datos registrados se buscan con el método seleccionado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Ocultar filtros de la lista de datos</td>
            <td>Oculta determinados elementos del filtro en la pantalla de lista de datos.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Destino predeterminado tras guardar datos</td>
            <td>Después de guardar datos personalizados, se redirige a la pantalla seleccionada.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Uso de formularios públicos</td>
            <td>Configura si se pueden usar los formularios públicos.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Google reCAPTCHA</td>
            <td>Configura la versión de Google reCAPTCHA.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Jerarquía de organizaciones</td>
            <td>El ámbito de configuración de los roles y el ámbito del uso compartido de datos incluyen las organizaciones de los niveles superiores o inferiores configurados.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Configuración para compartir datos</td>
            <td>Al crear datos personalizados, los datos se comparten automáticamente con el ámbito configurado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Filtro de usuarios y organizaciones</td>
            <td>Los usuarios y las organizaciones se muestran dentro del ámbito configurado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Configuración de vistas y paneles</td>
            <td>Configura si los usuarios que inician sesión pueden crear paneles y vistas.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Configuración del correo del sistema</td>
            <td>Según la configuración, el sistema puede enviar correos.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Configuración de Slack</td>
            <td>Al enviar notificaciones a Slack, se puede añadir una mención dirigida al ID de usuario.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Configuración del filtro de IP</td>
            <td>Permite la comunicación de las direcciones IP configuradas.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Enviar correo de prueba</td>
            <td>Envía un correo de prueba.</td>
            <td>Administración del sistema</td>
        </tr>
</table>


### Configuración de tablas personalizadas
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar las tablas personalizadas</td>
            <td>Muestra la lista de las tablas personalizadas registradas.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Crear una tabla personalizada</td>
            <td>Crea una tabla personalizada nueva.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Editar una tabla personalizada</td>
            <td>Modifica la configuración de una tabla personalizada ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Lista de datos de la tabla personalizada</td>
            <td>Muestra la lista de datos de la tabla personalizada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración ampliada de la tabla personalizada</td>
            <td>Hace la configuración ampliada de la tabla personalizada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Eliminar una tabla personalizada</td>
            <td>Elimina una tabla personalizada ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Permitir búsqueda</td>
            <td>Permite buscar desde la pantalla de búsqueda.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Usar el ID como etiqueta</td>
            <td>Muestra el valor del id de los datos como encabezado.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Permitir solo un registro</td>
            <td>Solo se puede registrar 1 dato.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Usar archivos adjuntos</td>
            <td>Se pueden adjuntar archivos a cada dato.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Usar comentarios</td>
            <td>Se pueden añadir comentarios a cada dato.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Usar historial de cambios de datos</td>
            <td>Al guardar los datos, se guarda el historial de cambios de los datos</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Número de versiones del historial de cambios</td>
            <td>Guarda el historial de cambios de los datos hasta el número máximo configurado</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de permisos</td>
            <td>Todos los usuarios pueden editar, ver y consultar la tabla.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de columnas de encabezado</td>
            <td>Configura las columnas del texto que se muestra en pantalla al seleccionar los datos.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de clave única compuesta</td>
            <td>No permite guardar los datos cuando los valores de todas las columnas configuradas coinciden con valores ya registrados.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Comparar 2 columnas</td>
            <td>Compara las 2 columnas configuradas y solo permite guardar los datos cuando se cumple la condición.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de uso compartido automático de datos</td>
            <td>Al guardar los datos, los comparte automáticamente con los usuarios y las organizaciones indicados en los datos.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Sincronizar el uso compartido automático de datos al actualizar</td>
            <td>Al hacer el uso compartido automático de datos, quita del uso compartido a quienes no son los usuarios u organizaciones indicados en la columna.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>No se puede cambiar desde la pantalla</td>
            <td>Impide ejecutar desde la pantalla las operaciones configuradas.</td>
            <td>Tabla personalizada</td>
        </tr>
</table>

### Columna personalizada
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar las columnas personalizadas</td>
            <td>Muestra la lista de las columnas personalizadas registradas.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Crear una columna personalizada</td>
            <td>Crea una columna personalizada nueva.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Editar una columna personalizada</td>
            <td>Modifica una columna personalizada ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Eliminar una columna personalizada</td>
            <td>Elimina una columna personalizada ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Índice de búsqueda</td>
            <td>Añade un índice de búsqueda.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Incluir en la búsqueda de texto libre</td>
            <td>Se incluye en la búsqueda cuando se busca escribiendo un texto en la barra de búsqueda.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Único</td>
            <td>No permite registrar el mismo valor en otros datos.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Introducir solo una vez</td>
            <td>El valor solo se puede introducir 1 vez.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Texto de marcador</td>
            <td>Muestra un texto de orientación en el campo antes de escribir.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Ayuda</td>
            <td>Muestra un texto de ayuda debajo del campo.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Ancho de la columna</td>
            <td>Indica el ancho de la columna en la lista.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Sugerencias de entrada</td>
            <td>Muestra como sugerencias los valores ya registrados en la misma columna personalizada que coinciden con lo que se escribe.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Expresión regular</td>
            <td>Hace la validación con una expresión regular.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Valor mínimo</td>
            <td>Da error si se envía un valor menor.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Valor máximo</td>
            <td>Da error si se envía un valor mayor.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Fórmula de cálculo</td>
            <td>Hace cálculos con operadores normales y variables.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Opciones</td>
            <td>Muestra como candidatas las opciones registradas.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Botones de opción y casillas de verificación</td>
            <td>La entrada en el formulario se hace con botones de opción o con casillas de verificación.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Permitir entrada libre</td>
            <td>Se puede escribir libremente y registrar una opción que no está registrada en la configuración de la columna.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Tipo de valor inicial</td>
            <td>Configura el tipo de valor inicial al crear un registro nuevo.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Tabla de destino</td>
            <td>La tabla indicada se muestra como candidata de las opciones.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Buscar las opciones cada vez</td>
            <td>Busca los datos con lo que escribe el usuario y reduce las candidatas.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Tipo de numeración</td>
            <td>Al registrar los datos, se numera con el tipo seleccionado.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Mostrar también usuarios y organizaciones sin permiso</td>
            <td>Muestra también los usuarios y las organizaciones que no tienen permiso de acceso a la tabla.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Permitir selección múltiple</td>
            <td>En los campos de imagen, de archivo y de selección se pueden seleccionar varios.</td>
            <td>Tabla personalizada</td>
        </tr>
</table>


### Configuración del formulario personalizado
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar los formularios personalizados</td>
            <td>Muestra todos los formularios registrados.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Crear un formulario personalizado</td>
            <td>Crea un formulario personalizado nuevo.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Editar un formulario personalizado</td>
            <td>Modifica la información de un formulario personalizado ya creado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Eliminar un formulario personalizado</td>
            <td>Elimina un formulario personalizado ya creado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Vista previa del formulario personalizado</td>
            <td>Muestra la vista previa del formulario personalizado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Duplicar un formulario personalizado</td>
            <td>Duplica un formulario ya creado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Crear una prioridad de formularios</td>
            <td>Crea una configuración nueva de prioridad de formularios.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Editar una prioridad de formularios</td>
            <td>Modifica una configuración de prioridad de formularios ya creada.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Eliminar una prioridad de formularios</td>
            <td>Elimina una configuración de prioridad de formularios ya creada.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Formulario predeterminado</td>
            <td>Lo configura como el formulario predeterminado que se muestra al registrar datos.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Visualización en la pantalla de detalle</td>
            <td>La pantalla de detalle de los datos se distribuye con el método configurado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Visualización de etiquetas</td>
            <td>La etiqueta de cada campo se muestra con el método configurado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Configuración de bloques del formulario</td>
            <td>Configura los cuadros en los que se colocan los campos del formulario, de 1 a 4 columnas en cada fila.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Añadir cuadro</td>
            <td>Crea un cuadro nuevo en la fila siguiente o en la columna siguiente.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Cambiar tamaño del cuadro</td>
            <td>Cambia el tamaño de un cuadro ya creado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Eliminar cuadro</td>
            <td>Elimina un cuadro ya creado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Encabezado</td>
            <td>Muestra en el formulario un texto con formato de encabezado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Texto explicativo</td>
            <td>Muestra en el formulario un texto como explicación.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>HTML</td>
            <td>Muestra en el formulario el contenido HTML configurado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>HTML ampliado</td>
            <td>Muestra en el formulario el HTML y el contenido configurado como parámetros.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Imagen</td>
            <td>Muestra una imagen en el formulario.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Línea divisoria</td>
            <td>Muestra una línea divisoria en el formulario.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Configuración de los campos del formulario</td>
            <td>Abre el diálogo de configuración y hace la configuración detallada del campo del formulario.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Formato de visualización de etiquetas</td>
            <td>El campo del formulario se muestra con el método configurado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Tipo de campo</td>
            <td>En la pantalla del formulario, se muestra con el formato de visualización configurado (Solo lectura, Solo visualización, Campo oculto, no mostrar).</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Configuración de vinculación de datos</td>
            <td>Cuando en el formulario se seleccionan datos de otra tabla, copia el contenido de los datos seleccionados en otro campo relacionado.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Configuración del filtro por relación</td>
            <td>Reduce las opciones según lo que se selecciona en otro campo del formulario.</td>
            <td>Formulario</td>
        </tr>
        <tr>
            <td>Configuración de prioridad de formularios personalizados</td>
            <td>Al configurar condiciones y prioridades, cambia el formulario que se usa en la creación de datos y en la pantalla de detalle de los datos.</td>
            <td>Formulario</td>
        </tr>
</table>


### Registro y edición de datos
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar el formulario de registro de datos</td>
            <td>Muestra el formulario para registrar datos.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Mostrar la lista de datos</td>
            <td>Muestra la lista de los datos de la tabla.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Mostrar el detalle de los datos</td>
            <td>Muestra el detalle de los datos abiertos en la pantalla de edición.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Eliminar datos</td>
            <td>Elimina los datos abiertos en la pantalla de edición.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Búsqueda</td>
            <td>Abre la tabla de la que salen las opciones y permite seleccionar los datos.</td>
            <td>Editar datos, consultar los datos de la tabla de destino</td>
        </tr>
        <tr>
            <td>Subir archivos e imágenes</td>
            <td>Se pueden subir seleccionando un archivo, o arrastrándolo y soltándolo.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Crear datos de la tabla secundaria</td>
            <td>Crea datos nuevos de una tabla secundaria con relación 1:n.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Eliminar datos de la tabla secundaria</td>
            <td>Elimina los datos indicados de una tabla secundaria con relación 1:n.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Casilla de verificación: Lista</td>
            <td>Después de guardar los datos, muestra la pantalla de lista de datos.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Casilla de verificación: Ver</td>
            <td>Después de guardar los datos, muestra la pantalla de detalle de los datos.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Casilla de verificación: Seguir creando</td>
            <td>Después de guardar los datos, muestra una nueva pantalla de creación de datos.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Casilla de verificación: Seguir editando</td>
            <td>Después de guardar los datos, muestra la pantalla de edición de los datos actuales.</td>
            <td>Editar datos</td>
        </tr>
</table>

### Lista de datos
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar la lista de datos</td>
            <td>Muestra la lista de los datos de la tabla.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Crear</td>
            <td>Crea datos nuevos de la tabla.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Vista de datos</td>
            <td>Muestra la lista de datos con la vista seleccionada entre las ya creadas. También permite crear vistas nuevas, editarlas, etc.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Búsqueda de texto libre</td>
            <td>Busca en la lista de datos con las palabras escritas en la barra de búsqueda.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Filtro</td>
            <td>Filtra el contenido de la lista de datos.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Importar</td>
            <td>Importa datos a la tabla que se muestra.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Exportar</td>
            <td>Exporta los datos de la tabla que se muestra.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Mostrar datos eliminados</td>
            <td>Muestra la lista de los datos eliminados.</td>
            <td>Mostrar datos eliminados</td>
        </tr>
        <tr>
            <td>Restaurar</td>
            <td>Restaura los datos eliminados.</td>
            <td>Mostrar datos eliminados</td>
        </tr>
        <tr>
            <td>Eliminar permanentemente</td>
            <td>Elimina permanentemente (eliminación física) los datos eliminados.</td>
            <td>Mostrar datos eliminados</td>
        </tr>
        <tr>
            <td>Actualización de datos en bloque</td>
            <td>Se seleccionan varios datos ya registrados y su contenido se actualiza de una vez.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Eliminación de datos en bloque</td>
            <td>Se seleccionan varios datos ya registrados y se eliminan de una vez.</td>
            <td>Ver datos</td>
        </tr>
</table>


### Detalle de los datos
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar el detalle de los datos</td>
            <td>Muestra el detalle de los datos.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Eliminar datos</td>
            <td>Elimina datos ya creados.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Buscar datos relacionados</td>
            <td>Muestra la lista de los datos relacionados vinculados.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Notificación</td>
            <td>Hace una notificación como acción de un botón.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Ejecutar el flujo de trabajo</td>
            <td>Al pulsar el botón de acción, ejecuta el flujo de trabajo.</td>
            <td>Usuarios responsables actuales</td>
        </tr>
        <tr>
            <td>Subir archivos adjuntos</td>
            <td>Se pueden subir archivos y adjuntarlos a los datos.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Eliminar archivos adjuntos</td>
            <td>Elimina un archivo adjunto ya subido.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Comentarios</td>
            <td>Se pueden hacer comentarios sobre los datos.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Eliminar comentarios</td>
            <td>Se pueden eliminar los comentarios que uno mismo ha hecho sobre los datos.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Historial de actualizaciones</td>
            <td>Se muestran como historial de actualizaciones la fecha en la que se actualizó el contenido de los datos y el nombre del usuario.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Revisión</td>
            <td>Compara y restaura los datos del historial de actualizaciones.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Compartir datos</td>
            <td>Comparte los datos guardados con otros usuarios y organizaciones.</td>
            <td>Compartir datos</td>
        </tr>
</table>


### Vista personalizada
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar las vistas personalizadas</td>
            <td>Muestra todas las vistas ya creadas.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Crear una vista personalizada</td>
            <td>Crea una vista personalizada nueva.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Editar una vista personalizada</td>
            <td>Modifica la información de una vista ya creada.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Eliminar una vista personalizada</td>
            <td>Elimina una vista ya creada.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Mostrar la lista de datos con esta vista</td>
            <td>Muestra la lista de datos con una vista ya creada o con la vista que se está editando.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Duplicar la vista</td>
            <td>Duplica una vista con la misma configuración que una ya creada.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Vista de resumen</td>
            <td>Agrupa los datos registrados y muestra valores de resumen, como el total, el número de registros o el valor máximo.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Vista de calendario</td>
            <td>Muestra los datos registrados en formato de calendario.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Vista de condiciones</td>
            <td>Se puede usar como condición de filtrado cuando se hace referencia a los datos de la tabla.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Vista predeterminada</td>
            <td>Se muestra en la pantalla de lista de la tabla como vista predeterminada.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Usar el cuadro de información de la vista</td>
            <td>Coloca un cuadro de información en la parte superior de la vista y muestra el contenido que se quiera.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Seleccionar columnas de la vista</td>
            <td>En la lista de datos, las columnas se muestran en el orden configurado.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Filtro de la vista</td>
            <td>Los datos se filtran con las condiciones configuradas y así se muestran en la lista de datos.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Combinación de condiciones</td>
            <td>Cuando hay varias condiciones de filtro de la vista, configura si se decide con todas las condiciones o con cualquiera de ellas.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Ordenar datos</td>
            <td>Ordena los datos tomando como base la columna personalizada indicada.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Elementos del "Filtro" de la vista</td>
            <td>Muestra las columnas indicadas como candidatas del "Filtro" de la parte superior de la vista.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Seleccionar las columnas de agrupación de la vista de resumen</td>
            <td>Agrupa el resumen tomando como base las columnas elegidas.</td>
            <td>Vista</td>
        </tr>
        <tr>
            <td>Seleccionar las columnas de resumen de la vista de resumen</td>
            <td>Hace el resumen con los valores de las columnas elegidas.</td>
            <td>Vista</td>
        </tr>
</table>


### Configuración de actualización de datos
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Crear una configuración de actualización de datos</td>
            <td>Crea una configuración de actualización de datos nueva.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Editar una configuración de actualización de datos</td>
            <td>Modifica una configuración de actualización de datos ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Eliminar una configuración de actualización de datos</td>
            <td>Elimina una configuración de actualización de datos ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Momento de la actualización</td>
            <td>Actualiza los datos en el momento configurado.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de columnas a actualizar</td>
            <td>Actualiza los datos con las columnas de destino y los valores de actualización configurados.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Condiciones de actualización</td>
            <td>Configura las condiciones con las que se actualizan los datos.</td>
            <td>Tabla personalizada</td>
        </tr>
</table>


### Flujo de trabajo
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar la configuración del flujo de trabajo</td>
            <td>Muestra todas las configuraciones de flujo de trabajo.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Crear una configuración del flujo de trabajo</td>
            <td>Crea una configuración de flujo de trabajo nueva.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Editar una configuración del flujo de trabajo</td>
            <td>Modifica una configuración de flujo de trabajo ya creada.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Eliminar una configuración del flujo de trabajo</td>
            <td>Elimina una configuración de flujo de trabajo ya creada.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Configuración de estados</td>
            <td>El tipo y los nombres de estado configurados se usan en el flujo de trabajo.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>No permitir editar los datos</td>
            <td>Cuando los datos están en ese estado, no se pueden editar.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Configuración de acciones</td>
            <td>Las acciones configuradas se ejecutan en el flujo de trabajo.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Tipo de flujo de trabajo: Genérico</td>
            <td>El flujo de trabajo se puede usar en varias tablas.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Tipo de flujo de trabajo: Solo para una tabla</td>
            <td>Se puede cambiar el destinatario de la ejecución de las acciones usando las columnas personalizadas de la tabla seleccionada al crearlo.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Usuarios ejecutores</td>
            <td>Los usuarios y las organizaciones configurados pueden ejecutar la acción.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Ajustes de opciones: Condición para avanzar al siguiente estado</td>
            <td>Cuando el número de personas configurado ha ejecutado esta acción, se avanza al siguiente estado.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Ajustes de opciones: Comentario</td>
            <td>Al ejecutar la acción se puede escribir un comentario.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Ajustes de opciones: Acción especial</td>
            <td>Quita de los usuarios responsables actuales a los "Usuarios ejecutores" configurados en la acción.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Configuración completada</td>
            <td>Termina la configuración del flujo de trabajo; una parte del contenido ya no se puede cambiar ni eliminar.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
        <tr>
            <td>Configuración de uso</td>
            <td>Configura, para cada tabla, el flujo de trabajo que se usa.</td>
            <td>Configuración del flujo de trabajo</td>
        </tr>
</table>

### Configuración del formulario público
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar la configuración de los formularios públicos</td>
            <td>Muestra la lista de todos los formularios públicos ya configurados.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Crear una configuración de formulario público</td>
            <td>Crea un formulario público nuevo.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Editar una configuración de formulario público</td>
            <td>Modifica una configuración de formulario público ya creada.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Eliminar una configuración de formulario público</td>
            <td>Elimina una configuración de formulario público ya creada.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Crear desde plantilla</td>
            <td>Instala el archivo zip de una plantilla y crea un formulario público nuevo.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Periodo de publicación</td>
            <td>Se puede configurar el periodo en el que el formulario es público, escribiendo la fecha y hora de inicio y la de fin.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Configuración del encabezado</td>
            <td>Se pueden configurar el color de fondo, el logotipo, el texto, etc. de la parte del encabezado.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Configuración del formulario</td>
            <td>Se puede configurar el color de fondo de la parte del formulario y de la parte del marco exterior.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Configuración del pie de página</td>
            <td>Se pueden configurar el fondo y el color del texto de la parte del pie de página.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Configuración de confirmación de respuestas</td>
            <td>Antes de enviar los datos, muestra una pantalla para comprobar lo que se ha escrito.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Configuración de finalización</td>
            <td>Después de enviar los datos, muestra una pantalla con el texto, la URL, etc. configurados.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Notificación de finalización (usuario general)</td>
            <td>Envía un correo, después de completar el registro, al usuario general que ha introducido los datos.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
         <tr>
            <td>Notificación de finalización (administrador)</td>
            <td>Después de que un usuario general envía los datos, envía una notificación al administrador.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
         <tr>
            <td>Configuración de errores</td>
            <td>Si se produce un error al enviar los datos, muestra la pantalla configurada.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
         <tr>
            <td>Notificación de errores (administrador)</td>
            <td>Si se produce un error al enviar los datos, envía una notificación al administrador.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
         <tr>
            <td>CSS / Javascript</td>
            <td>Se pueden configurar CSS y Javascript.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Permitir establecer valores iniciales desde la URL</td>
            <td>Los valores de la cadena de consulta de la URL se pueden poner como valores iniciales del formulario.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
         <tr>
            <td>Google Analytics</td>
            <td>Se puede configurar Google Analytics.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Usar Google reCAPTCHA</td>
            <td>Se puede configurar Google reCAPTCHA.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Vista previa</td>
            <td>Muestra la vista previa del formulario público abierto.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Habilitar</td>
            <td>El formulario público abierto se habilita y se puede usar.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
        <tr>
            <td>Plantilla - Exportar</td>
            <td>Exporta como plantilla el formulario público abierto.</td>
            <td>Gestión de formularios públicos</td>
        </tr>
</table>

### Plantilla
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Plantilla - Exportar</td>
            <td>Exporta la información de las tablas, las columnas y los formularios registrados en el sistema.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Plantilla - Importar</td>
            <td>Importa a este sistema la información de una plantilla de Exment exportada.</td>
            <td>Administración del sistema</td>
        </tr>
</table>


### Copia de seguridad y restauración
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Copia de seguridad</td>
            <td>Hace la copia de seguridad de la base de datos y de los distintos archivos.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Copia de seguridad manual</td>
            <td>Hace la copia de seguridad a mano, al pulsar el botón.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Copia de seguridad automática</td>
            <td>Hace la copia de seguridad automáticamente a una hora fija.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Restaurar</td>
            <td>Restaura (recupera) los datos.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Restaurar: seleccionar en la lista de copias de seguridad</td>
            <td>Se selecciona un archivo en la lista de copias de seguridad hechas antes y se ejecuta la restauración.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Restaurar: Subir</td>
            <td>Se sube un archivo de copia de seguridad guardado en el equipo local y se ejecuta la restauración.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Eliminar</td>
            <td>Elimina un archivo de copia de seguridad ya creado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Editar nombre de archivo</td>
            <td>Cambia el nombre de un archivo de copia de seguridad ya creado.</td>
            <td>Administración del sistema</td>
        </tr>
        <tr>
            <td>Descargar</td>
            <td>Descarga al equipo local un archivo de copia de seguridad ya creado.</td>
            <td>Administración del sistema</td>
        </tr>
</table>

### Usuario
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar los usuarios</td>
            <td>Muestra la lista de los usuarios ya creados.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Crear usuario</td>
            <td>Crea un usuario nuevo.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Editar un usuario</td>
            <td>Modifica la información de un usuario ya creado.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Eliminar un usuario</td>
            <td>Elimina un usuario ya creado.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Conceder acceso de inicio de sesión</td>
            <td>El usuario puede iniciar sesión en el sistema.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Generar contraseña automáticamente</td>
            <td>Genera la contraseña automáticamente y envía un correo al usuario.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Cambiar la contraseña en el primer inicio de sesión</td>
            <td>Cuando el usuario inicia sesión por primera vez, muestra la pantalla para cambiar la contraseña.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Enviar datos del usuario por correo</td>
            <td>Envía al usuario un correo con sus datos de usuario.</td>
            <td>Editar datos</td>
        </tr>
</table>

### Organización
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar las organizaciones</td>
            <td>Muestra la lista de las organizaciones ya creadas.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Crear una organización</td>
            <td>Crea una organización nueva.</td>
            <td>Ver datos</td>
        </tr>
        <tr>
            <td>Editar una organización</td>
            <td>Modifica la información de una organización ya creada.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Eliminar una organización</td>
            <td>Elimina una organización ya creada.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Organización superior</td>
            <td>La organización configurada pasa a ser la organización superior.</td>
            <td>Editar datos</td>
        </tr>
        <tr>
            <td>Usuario</td>
            <td>Los usuarios seleccionados pasan a pertenecer a la organización.</td>
            <td>Editar datos</td>
        </tr>
</table>


### Grupo de roles
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar los grupos de roles</td>
            <td>Muestra la lista de los grupos de roles ya creados.</td>
            <td>Cambiar la configuración de permisos, Gestión de usuarios/organizaciones</td>
        </tr>
        <tr>
            <td>Crear un grupo de roles</td>
            <td>Crea un grupo de roles nuevo.</td>
            <td>Gestionar todos los grupos de roles</td>
        </tr>
        <tr>
            <td>Configuración de permisos</td>
            <td>Configura los permisos que se conceden al grupo de roles.</td>
            <td>Cambiar la configuración de permisos</td>
        </tr>
        <tr>
            <td>Configuración de usuarios/organizaciones</td>
            <td>Configura los usuarios y las organizaciones a los que se conceden los permisos.</td>
            <td>Gestión de usuarios/organizaciones</td>
        </tr>
        <tr>
            <td>Eliminar un grupo de roles</td>
            <td>Elimina un panel ya creado.</td>
            <td>Gestionar todos los grupos de roles</td>
        </tr>
</table>


### Configuración de notificaciones
<table class="Funclist">
        <tr>
            <th style="width:30%">Función</th>
            <th style="width:45%">Resumen de la función</th>
            <th style="width:25%">Permisos</th>
        </tr>
        <tr>
            <td>Mostrar la configuración de notificaciones</td>
            <td>Muestra la lista de las configuraciones de notificación ya creadas.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Crear una configuración de notificación</td>
            <td>Crea una configuración de notificación nueva.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Editar una configuración de notificación</td>
            <td>Modifica la información de una configuración de notificación ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Eliminar una configuración de notificación</td>
            <td>Elimina una configuración de notificación ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Duplicar una configuración de notificación</td>
            <td>Duplica una configuración de notificación ya creada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Activo</td>
            <td>Cambia el estado de la notificación.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Desencadenador</td>
            <td>Configura la condición con la que se hace la notificación.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Vista de destino</td>
            <td>Los datos de la tabla de destino se filtran indicando una vista de condiciones.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Columna de fecha de destino</td>
            <td>Con el campo de fecha o de fecha y hora seleccionado se decide si se hace la notificación.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Día de notificación</td>
            <td>Hace la notificación en la fecha escrita.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Antes o después</td>
            <td>Hace la notificación el número de días indicado antes o después del campo.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Hora de notificación</td>
            <td>Hace la notificación a la hora configurada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Configuración de condiciones de notificación</td>
            <td>Hace la notificación según el contenido puesto como condición.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Notificar también al ejecutor</td>
            <td>También se notifica al usuario que ha iniciado sesión, que es quien ejecuta el trabajo.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Acción de notificación</td>
            <td>La notificación se hace con el método configurado.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Destinatarios de la notificación</td>
            <td>Hace la notificación a los destinatarios configurados.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Dirección de correo electrónico de destino</td>
            <td>La notificación se envía a la dirección de correo indicada.</td>
            <td>Tabla personalizada</td>
        </tr>
        <tr>
            <td>Plantilla de notificación</td>
            <td>La notificación se envía con la plantilla seleccionada.</td>
            <td>Tabla personalizada</td>
        </tr>
</table>

