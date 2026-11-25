# Configuración inicial
Estos son los pasos de la primera configuración que se hace después de instalar. Se deciden los datos del sitio, el ID de inicio de sesión del primer administrador, etc.

Los pasos son estos 4.

1. Acceder a la página de Exment
2. Introducir los datos necesarios en la pantalla de configuración inicial
3. Elegir las plantillas que quiere usar
4. Pulsar el botón «Enviar»

## Acceso a la URL
Acceda a la página de Exment.  
http(s)://(URL de su sitio)  

> ※La URL es la de la configuración estándar, sin «/admin» (sitios instalados de nuevo con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es «admin»), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/oauth/token`). Para más detalles, consulte [Cambiar o quitar «admin» de la URL](/es/additional_prefix).

## Pantalla de configuración inicial
Si la instalación ha terminado bien, aparece la pantalla de configuración inicial de Exment.

![Pantalla de configuración inicial](../img/install/install1.png)
Introduzca los datos necesarios para configurar el sistema.  
※Para ver la explicación detallada de los campos, consulte [Configuración del sistema](/es/system_setting).

## Configuración de plantillas
Exment trae plantillas ya preparadas.  
Al elegir una plantilla, se instalan de una vez las tablas, las columnas, los formularios, los menús y los permisos que contiene.  
También puede subir desde esta pantalla una plantilla exportada desde otro Exment.  
Para más detalles, consulte [Plantilla](/es/template).

![Pantalla de instalación: plantillas](../img/install/install_template.png)

En la lista aparecen las plantillas que el sistema trae desde el principio y las plantillas importadas hasta ahora.  
Elija las plantillas que quiere instalar.  

## Fin de la configuración inicial
Al introducir los campos necesarios y pulsar el botón «Enviar», la configuración se guarda y ya puede usar Exment.

## Otros ajustes adicionales
Con lo hecho hasta aquí ya puede empezar a usar Exment. Sin embargo, para usar algunas funciones hacen falta ajustes adicionales.  
Consulte la siguiente página.  
- [Configuración adicional](/es/quickstart_more)
