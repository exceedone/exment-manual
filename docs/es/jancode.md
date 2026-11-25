# Configuración de código de barras JAN
Esta página explica la pantalla en la que se decide, para cada tabla, lo que ocurre al leer un código de barras JAN (qué formulario se abre y qué pantalla se muestra después de guardar).

El flujo de configuración es el siguiente.

1. Abrir la pantalla de configuración de código de barras JAN
2. Configurar y guardar
3. Pulsar el botón "Habilitar"

## Resumen de la función de código de barras JAN
Para ver un resumen de la función de código de barras JAN, consulte la [publicación del sitio oficial](https://exment.net/release_v6-2-0/).

## Abrir la página
- En la lista de tablas personalizadas, marque la tabla que va a configurar y haga clic en "Configuración detallada de la tabla", arriba a la derecha.  
![Página de código JAN](../img/jancode/jancode1.png)

> Nota: también se puede pasar directamente desde la pantalla de lista de datos o la pantalla de registro de datos de esa tabla personalizada. En ese caso, haga clic también en "Configuración detallada de la tabla", arriba a la derecha.  
![Página de código JAN](../img/jancode/jancode2.png)

- En la pantalla de configuración detallada de la tabla, al hacer clic en el icono de configuración de código de barras JAN aparece la pantalla de configuración de código de barras JAN.  
![Página de código JAN](../img/jancode/jancode3.png)

## Opciones de configuración del código de barras JAN
![Página de código JAN](../img/jancode/jancode4.png)


### Lectura de código de barras JAN
Configure lo que ocurre al leer el código de barras JAN. 

- #### Formulario de registro  
Elija el formulario de registro que se abre después de leer el código de barras JAN.  
Se puede elegir entre los formularios personalizados registrados en esa tabla. 

- #### Acción tras registrar los datos  
Elija la pantalla que se muestra después de registrar el dato.  
Se puede elegir entre la pantalla de inicio, la pantalla de lista, la pantalla de detalles, la pantalla de edición y la pantalla de la cámara.

- #### Formulario de edición
Elija el formulario de edición que se abre después de leer el código de barras JAN.  
Se puede elegir entre los formularios personalizados registrados en esa tabla.

- #### Acción tras editar los datos
Elija la pantalla que se muestra después de editar el dato.  
Se puede elegir entre la pantalla de inicio, la pantalla de lista, la pantalla de detalles, la pantalla de edición y la pantalla de la cámara.

Cuando termine de configurar, haga clic en el botón "Guardar".  

### Habilitar la configuración de código de barras JAN  
- Para poder usar la función de código de barras JAN en esa tabla, hay que "habilitarla". Guarde una vez y después haga clic en el botón "Habilitar", arriba a la derecha de la página.  
- Solo se puede habilitar uno de los dos: el código de barras 2D o el código de barras JAN.  
Si el código de barras 2D está habilitado, el botón "Habilitar" de la función de código de barras JAN no aparece y no se puede habilitar. Del mismo modo, si el código de barras JAN está habilitado, no se puede habilitar el código de barras 2D.  

![Página de código JAN](../img/jancode/jancode5.png)

### Deshabilitar la configuración de código de barras JAN  
- Para dejar de gestionar con códigos de barras JAN, o para gestionar los códigos de barras JAN en otra tabla, haga clic en el botón "Deshabilitar", arriba a la derecha de la página.  
- La información de los códigos de barras JAN vinculados mientras estaba habilitado se conserva. Por eso, al leer un código de barras JAN aparece el dato de esta tabla.  

![Página de código JAN](../img/jancode/jancode6.png)

## Abrir la pantalla de la cámara desde Exment
- Desde el panel de Exment se puede abrir la pantalla de la cámara para leer códigos de barras 2D/JAN.  

- Para ver cómo añadir al panel el elemento "Código de barras 2D/JAN", consulte [Panel](/es/dashboard).
