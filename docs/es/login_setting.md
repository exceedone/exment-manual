# Configuración de inicio de sesión
En esta página se deciden las reglas para iniciar sesión en Exment. Puede configurar las reglas de las contraseñas (política de contraseñas) y la autenticación de dos factores.  
En esta página también se explica cómo restablecer una contraseña con un comando.

> Para la configuración y la explicación del SSO, consulte [esta página](/es/login_sso).


## Autenticación de dos factores
Exment admite la autenticación de dos factores.  
Después de introducir los datos del usuario e iniciar sesión, se introduce el código recibido por correo electrónico o el código que aparece en Google Authenticator, y entonces se puede usar Exment.  
※La autenticación de dos factores se puede usar cuando el método de inicio de sesión es «estándar» o «LDAP».

- [Autenticación de dos factores: configuración del sistema](/es/login_2factor_setting)
- [Inicio de sesión (autenticación de dos factores)](/es/login_2factor)


## Cómo gestionar la configuración de inicio de sesión

- El administrador del sistema abre la siguiente URL.  
http(s)://(URL de Exment)/login_setting  
※Se puede acceder después de hacer el «cambio de la configuración del sistema» indicado arriba.

> ※La URL es la de la configuración estándar, sin «/admin» (sitios instalados de nuevo con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es «admin»), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/oauth/token`). Para más detalles, consulte [Cambiar o quitar «admin» de la URL](/es/additional_prefix).

- Desde v7.1.0, también se puede abrir desde «Configuración de administración» → «Configuración de inicio de sesión» en el menú de la izquierda.
- En v7.0 y anteriores, «Configuración de inicio de sesión» no aparece en el menú al principio. Para añadirla al menú, abra la página «Configuración de administración» > «Menú» y elija el tipo de menú «Menú del sistema». En el destino aparece «Configuración de inicio de sesión»; elíjala y guarde.

![Lista de la configuración de inicio de sesión](../img/login/login_setting4.png)  

- La autenticación de dos factores se configura con los pasos de la siguiente página.

    - [Autenticación de dos factores: configuración del sistema](/es/login_2factor_setting)


### Configuración de la política de contraseñas
Decide las reglas de las contraseñas de inicio de sesión.   

![Pantalla de configuración de la política de contraseñas](../img/system_setting/system_setting_password.png)  

#### Contraseña compleja
- Si lo pone en YES, la contraseña tiene que tener 12 caracteres o más e incluir 3 o más tipos de caracteres (mayúsculas, minúsculas, números y símbolos, todos de ancho medio).
- El valor inicial es «NO».

#### Días de validez de la contraseña
- Cuando pasan los días indicados, la primera vez que se inicia sesión aparece la pantalla de cambio de contraseña. Cambie la contraseña y vuelva a iniciar sesión.
- Si pone «0» en los días de validez, la contraseña no caduca.
- El valor inicial es «0».

#### Cambiar la contraseña en el primer inicio de sesión
- Si lo pone en YES, cuando un usuario inicia sesión por primera vez aparece la pantalla para cambiar la contraseña.
- Se aplica a los usuarios registrados y a los usuarios cuya contraseña se restablece después de poner este ajuste en YES.
- No se aplica a los usuarios registrados (o con otras operaciones) antes de ponerlo en YES.
- El valor inicial es «NO».

#### Número de contraseñas en el historial
- Impide volver a usar las contraseñas usadas hace poco. Si la contraseña nueva es igual a alguna de las últimas contraseñas, tantas como indique el número del historial, hay un error.
- Si pone «0» en el número del historial, no se compara.
- El valor inicial es «0».

#### Notas

- <span class="small">«Contraseña compleja» y «Número de contraseñas en el historial» se usan cuando el propio usuario decide su contraseña, en la pantalla de configuración de usuario, en la pantalla de restablecimiento de contraseña, etc. No se aplican cuando la decide el administrador del sistema.</span>


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




## Comando para restablecer la contraseña
Puede restablecer la contraseña de un usuario con un comando.

- El administrador del sistema ejecuta el siguiente comando en la consola.

~~~
php artisan exment:resetpassword --email=foobar@test.com --password=P@ssw0rd!
~~~

- Este comando pone la contraseña "P@ssw0rd!" al usuario cuya dirección de correo electrónico es "foobar@test.com".


### Argumentos del comando

```
exment:resetpassword {--id=} {--email=} {--user_code=} {--password=} {--random=0} {--send=0} {--reset_first_login=0}
```

#### Argumentos: indicar el usuario
※Es obligatorio uno de los siguientes argumentos. Si indica varios, se busca con esta prioridad: id > email > user_code.

- ##### id
Es el ID de inicio de sesión del usuario.

- ##### email
Es la dirección de correo electrónico del usuario.

- ##### user_code
Es el código de usuario del usuario.


#### Argumentos: contraseña
※Indique "password" o "random=1". Si indica los dos, tiene prioridad "password".

- ##### password  
Indique el texto de la contraseña nueva.

- ##### random  
Indique 1 para crear la contraseña al azar. Si no se indica, es 0.

#### Argumentos: opciones

- ##### send  
Indique 1 para enviar la contraseña nueva por correo al usuario. Si no se indica, es 0.

- ##### reset_first_login  
Después de cambiar la contraseña, cuando el usuario inicia sesión por primera vez aparece la pantalla para cambiar la contraseña. Si no se indica, es 0.  
※Aunque no indique esta opción, si en la configuración de inicio de sesión «Cambiar la contraseña en el primer inicio de sesión» está en YES, cuando el usuario inicia sesión por primera vez aparece la pantalla para cambiar la contraseña.

### Observaciones
- Si indica "random=1" y no indica "send=1", después del restablecimiento la contraseña nueva se muestra en la consola.


### Ejemplos de ejecución del comando

~~~
# Ejemplo: restablecer la contraseña del usuario con id 1, indicando la contraseña
php artisan exment:resetpassword --id=1 --password=P@ssw0rd!

# Ejemplo: poner una contraseña al azar al usuario con código de usuario "user1" y enviarla por correo
php artisan exment:resetpassword --user_code=user1 --random=1 --send=1

# Ejemplo: poner una contraseña al azar al usuario con dirección de correo electrónico "foobar@test.com"
php artisan exment:resetpassword --email=foobar@test.com --random=1
Se ha restablecido la contraseña. Contraseña nueva: XXXXXXXXXX #La contraseña cambiada se muestra en la consola
~~~

