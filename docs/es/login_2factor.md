# Inicio de sesión (autenticación de dos factores)
Esta página explica cómo iniciar sesión en Exment con la autenticación de dos factores.  
La configuración para poder usar la autenticación de dos factores la hace el administrador ([Autenticación de dos factores: configuración del sistema](/es/login_2factor_setting)).

## Métodos de autenticación de dos factores
Ahora se pueden usar estos 2 métodos de autenticación de dos factores.  
Pregunte al administrador cuál de los dos métodos se usa.

##### Correo electrónico
Después de iniciar sesión con el ID y la contraseña, llega un correo con el código de autenticación a la dirección de correo registrada.  
Al introducir ese código de autenticación en la pantalla, termina el inicio de sesión.

##### Google Authenticator
Después de iniciar sesión con el ID y la contraseña, la autenticación de dos factores se hace con Google Authenticator.

### Pasos de la autenticación de dos factores (correo electrónico)

- En la pantalla de inicio de sesión, introduzca el ID y la contraseña y pulse el botón [Iniciar sesión].
![Pantalla de configuración del sistema](../img/login/login_2factor11.png)  

- Cambia a la pantalla de la autenticación de dos factores y aparece el campo para introducir el código de autenticación.
![Pantalla de configuración del sistema](../img/login/login_2factor12.png)  

- El código de autenticación llega a la dirección de correo del usuario que ha iniciado sesión; compruébelo.
![Pantalla de configuración del sistema](../img/login/login_2factor13.png)  

### Pasos de la autenticación de dos factores (Google Authenticator)

- En la pantalla de inicio de sesión, introduzca el ID y la contraseña y pulse el botón [Iniciar sesión].
![Pantalla de configuración del sistema](../img/login/login_2factor11.png)  

- Cambia a la pantalla de la autenticación de dos factores y aparece el campo para introducir el código de autenticación.
![Pantalla de configuración del sistema](../img/login/login_2factor15.png)  

- La primera vez que inicia sesión, antes hay que configurar Google Authenticator.  
Al pulsar el botón [Enviar], se envía a la dirección de correo registrada un correo para registrar Google Authenticator.
![Pantalla de configuración del sistema](../img/login/login_2factor5.png)  

- A la dirección de correo del usuario que ha iniciado sesión llega la URL para registrar Google Authenticator; púlsela.  
![Pantalla de configuración del sistema](../img/login/login_2factor6.png)  

- Al pulsar la URL, cambia a la pantalla para instalar el sistema de autenticación de dos factores. Haga los pasos step1 a 3.  
Al introducir correctamente el código de autenticación y enviarlo, termina el inicio de sesión con la autenticación de dos factores.

![Pantalla de configuración del sistema](../img/login/login_2factor7.png)  

> En la autenticación de dos factores, si se equivoca al introducir el código de autenticación más de un cierto número de veces, se bloquea el inicio de sesión desde la conexión con la que se hizo la autenticación. Tenga cuidado.
