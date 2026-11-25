# Registro de datos
Esta página explica la pantalla de formulario que se usa para crear y para editar un dato.

- Los campos que aparecen en el formulario dependen de la [Configuración de columnas personalizadas](/es/column), del formulario personalizado y de la configuración de [tablas relacionadas](/es/relation).  
- Si no aparecen como esperaba, corrija la configuración en las páginas anteriores.  

## Lista de funciones
![Pantalla de datos](../img/data/data_form1.png)  

##### Botón [Cambiar de página]  
Pasa a la pantalla para cambiar la configuración de la tabla personalizada que se está mostrando.

##### Botón [Lista]
Pasa a la pantalla de lista de datos.  
Nota: desde v7.1.0 también se puede volver con el botón [← Volver a la lista], a la derecha de la fila del encabezado. Para más detalles, consulte "Volver a la lista" en [Detalle de datos](/es/data_details).

##### Botón [Ver]  
Pasa a la pantalla para ver el dato.

##### Botón [Eliminar]
Elimina el dato que se está mostrando.  
Nota: los datos eliminados se pueden recuperar desde [Datos eliminados](/es/deleted_data).

##### Campos del formulario  
Cambian los valores del dato.  
Los campos que aparecen dependen de la [Configuración de columnas personalizadas](/es/column), del formulario personalizado y de la configuración de [tablas relacionadas](/es/relation).  
Si no aparecen como esperaba, corrija la configuración en las páginas anteriores.  

##### Tabla secundaria  
Si en las [tablas relacionadas](/es/relation) hay una configuración 1:n o n:n, también se pueden añadir y cambiar a la vez los datos de la tabla configurada como tabla relacionada. Para más detalles, consulte "Tabla secundaria", más abajo.


## Detalle de las funciones  

### Tabla secundaria
Si en las [tablas relacionadas](/es/relation) hay una configuración 1:n o n:n, también se pueden añadir y cambiar a la vez los datos de la tabla configurada como tabla relacionada.  
Ejemplo: si la tabla que se muestra es "Contratos" y la tabla secundaria es "Detalles del contrato", al registrar la fecha de facturación o la información del cliente se pueden añadir y cambiar a la vez los datos de detalle de ese contrato.  
![Pantalla de tabla secundaria](../img/data/data_form2.png)  
  
Nota: hay 2 formas de mostrar los datos de la tabla secundaria: "formato de formulario normal" y "formato de tabla".  
El formato se cambia en la pantalla de formulario personalizado.  
  
##### Botón [Nuevo]  
Añade un dato de la tabla secundaria.  
  
##### Botón [Eliminar]  
Elimina el dato elegido de la tabla secundaria.  


### Destino tras guardar el dato
![Pantalla de tabla secundaria](../img/data/data_submit_redirect1.png)  
A la izquierda del botón de guardar aparecen casillas.  
Al marcar una, cambia la pantalla que se abre después de guardar el dato.

| Casilla | Pantalla que se abre después de guardar |
|---|---|
| Lista | La pantalla de lista de esos datos (si no se marca ninguna casilla, también es la pantalla de lista) |
| Ver | La pantalla de detalle de ese dato |
| Seguir creando | La pantalla de creación de un dato de esa tabla |
| Seguir editando | La pantalla de edición de ese dato (se muestra otra vez) |

- Si se guarda con "Seguir creando" o "Seguir editando" marcado, la próxima vez que se muestre el formulario "Seguir creando" o "Seguir editando" ya estará marcado desde el principio.  
- Desde v3.9.1 se puede indicar el valor predeterminado de las casillas. Para más detalles, consulte "Destino predeterminado tras guardar datos" en [Configuración del sistema](/es/system_setting).
