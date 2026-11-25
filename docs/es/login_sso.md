# Configuración de inicio de sesión (SSO)
De los ajustes para iniciar sesión en Exment, esta página trata el inicio de sesión único (SSO).  
El SSO es un mecanismo que permite iniciar sesión en Exment con la cuenta de otro servicio (Google, Office365, etc.).

- Los métodos de inicio de sesión que se pueden usar están en «Métodos de inicio de sesión», más abajo.
- La forma de abrir la pantalla de configuración está en «Cómo gestionar la configuración de inicio de sesión», más abajo.

## Métodos de inicio de sesión
Además del inicio de sesión estándar, Exment tiene varios métodos de inicio de sesión.

| Método | Cómo es el inicio de sesión | Página de configuración |
|---|---|---|
| Estándar | Se inicia sesión con el usuario y la contraseña registrados en Exment | - |
| OAuth | Se inicia sesión en la pantalla de un proveedor registrado antes (Google, etc.) | [Inicio de sesión único (OAuth)](/es/login_oauth) |
| SAML | Se inicia sesión en la pantalla de un proveedor registrado antes (Keycloak, etc.) | [Inicio de sesión único (SAML)](/es/login_saml) |
| LDAP | Se introducen el ID y la contraseña de LDAP (Active Directory, etc.) en la página de inicio de sesión de Exment | [Configuración de inicio de sesión (LDAP)](/es/login_ldap) |

### Estándar
Es el método en el que se registra un usuario en la base de datos de Exment, se le pone una contraseña y se inicia sesión con ese usuario y esa contraseña.  


### OAuth
Es el método para iniciar sesión con el inicio de sesión único de tipo OAuth.  
Al pulsar el botón de inicio de sesión, se pasa a la pantalla de inicio de sesión del proveedor registrado antes, y allí se inicia sesión.  

- [Inicio de sesión único (OAuth)](/es/login_oauth)
  
※Ejemplos de proveedores:  

- Google
- Facebook
- Office365


### SAML
Es el método para iniciar sesión con el inicio de sesión único de tipo SAML.  
Al pulsar el botón de inicio de sesión, se pasa a la pantalla de inicio de sesión del proveedor registrado antes, y allí se inicia sesión.  
  
- [Inicio de sesión único (SAML)](/es/login_saml)
  
※Ejemplos de proveedores:  

- OpenAM
- Keycloak
- ADFS


### LDAP
Es el método para iniciar sesión con LDAP.  
En la página de inicio de sesión de Exment, al introducir los datos del usuario en los campos de ID y contraseña y pulsar el botón de inicio de sesión, se autentica con LDAP y se importan los datos del usuario.  
  
- [Configuración de inicio de sesión (LDAP)](/es/login_ldap)
  
※Ejemplos de proveedores:  

- Active Directory


## Cómo gestionar la configuración de inicio de sesión

- El administrador del sistema abre la siguiente URL.  
http(s)://(URL de Exment)/login_setting  
※Se puede acceder después de hacer el «cambio de la configuración del sistema» indicado arriba.

> ※La URL es la de la configuración estándar, sin «/admin» (sitios instalados de nuevo con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es «admin»), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/oauth/token`). Para más detalles, consulte [Cambiar o quitar «admin» de la URL](/es/additional_prefix).

- Desde v7.1.0, también se puede abrir desde «Configuración de administración» → «Configuración de inicio de sesión» en el menú de la izquierda.
- En v7.0 y anteriores, añada «Configuración de inicio de sesión» al menú.  
Abra la página «Configuración de administración» > «Menú» y elija el tipo de menú «Menú del sistema». En el destino aparece «Configuración de inicio de sesión»; elíjala y guarde.  
※En v7.0 y anteriores, «Configuración de inicio de sesión» no aparece en el menú con la configuración por defecto.

![Lista de la configuración de inicio de sesión](../img/login/login_setting4.png)  

- Para añadir un proveedor de SSO nuevo, pulse el botón «+ Nuevo», arriba a la derecha. Para ver lo que hay que introducir, consulte la página de cada método.  
    - [Inicio de sesión único (OAuth)](/es/login_oauth)
    - [Inicio de sesión único (SAML)](/es/login_saml)
    - [Configuración de inicio de sesión (LDAP)](/es/login_ldap)
  

### Configuración de SSO
Son los ajustes de todo el SSO.  
※Solo aparece cuando hay 1 o más SSO activados.

#### Mostrar inicio de sesión predeterminado
Si lo pone en YES, se muestran el formulario de inicio de sesión que usa el ID y la contraseña de Exment y los botones de inicio de sesión.  
※Si quiere que solo se inicie sesión con SAML u OAuth, póngalo en NO. Deja de aparecer el formulario de inicio de sesión predeterminado, donde se introducen el ID de usuario y la contraseña.

![Pantalla de inicio de sesión con SSO](../img/quickstart/sso1.png)


#### Redirigir al inicio de sesión SSO
Si lo pone en YES, cuando el usuario abre la pantalla de inicio de sesión se pasa directamente a la página de inicio de sesión del SSO, sin mostrar la página de inicio de sesión de Exment.  
※Tiene efecto cuando hay en total 1 solo proveedor de SAML u OAuth.

#### Dominios permitidos
Se rellena para decidir los dominios a los que se permite iniciar sesión. Si hay varios, introdúzcalos separados por saltos de línea.  
Si inicia sesión un usuario de un dominio distinto de los introducidos, aparece un error.  



### Desactivar la configuración del inicio de sesión SSO
Si por algún motivo quiere desactivar a la fuerza la configuración del inicio de sesión SSO, haga la siguiente configuración.

- Abra el archivo «.env» de la carpeta del proyecto y añada lo siguiente.  
※Para ver cómo modificar los archivos de configuración, consulte [Lista de valores de configuración](/es/config).

~~~
EXMENT_CUSTOM_LOGIN_DISABLED=true
~~~

Con este ajuste, en la pantalla de inicio de sesión aparece el formulario normal de ID y contraseña.


### Validación al iniciar sesión con SSO
Al iniciar sesión con SSO, los datos del usuario recibidos del proveedor (en adelante, «usuario del proveedor») se comprueban (validación) con las siguientes reglas.  

- Si el usuario del proveedor no trae los datos de las columnas que son «Obligatorio» en la tabla de usuarios, hay un error.
- Si en la configuración de SSO «Crear usuario» está en YES y es la primera vez que se inicia sesión en Exment, se comprueba con los ajustes de la tabla de usuarios de Exment (caracteres permitidos, longitud del texto, etc.).
- Si en la configuración de SSO «Actualizar datos del usuario» está en YES y se inicia sesión con un usuario ya registrado en Exment, también se comprueba con los ajustes de la tabla de usuarios de Exment (caracteres permitidos, longitud del texto, etc.).

Cuando hay un error, la causa se muestra en la pantalla. También se escribe en el archivo de log.


### Otros
- Si ha actualizado de una versión anterior a v3.3.0 a v3.3.0 o superior, puede haber un error al iniciar sesión con un proveedor cuyo código de usuario contiene un «punto (.)».  
En ese caso, corríjalo así.
    - En «Configuración de columnas personalizadas» de la tabla «Usuario», abra la pantalla de edición de la columna «Código de usuario».
    - En la opción «Caracteres permitidos», marque «"." (punto)» y guarde.


- Con la configuración inicial, aunque cierre el navegador con la sesión iniciada, la sesión sigue iniciada hasta que pasa un tiempo (120 minutos).  
Desde v3.6.0, puede hacer que la sesión se cierre automáticamente al cerrar el navegador. Abra el archivo «.env» y añada lo siguiente.  
※Para ver cómo modificar los archivos de configuración, consulte [Lista de valores de configuración](/es/config).

~~~
EXMENT_SESSION_EXPIRE_ON_CLOSE=true
~~~


