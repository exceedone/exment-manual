# Configuración de la API
Desde otros sistemas o programas se pueden leer y escribir los datos de Exment mediante la API (la entrada por la que los programas se comunican entre sí).
En esta página se explican la configuración necesaria para usar la API y la forma de autenticarse (comprobar como quién se ejecuta).

El proceso hasta usar la API es el siguiente.

1. En la configuración del sistema, ponga "Usar API" en SÍ ([Cambiar la configuración del sistema](/es/api?id=Cambiar-la-configuración-del-sistema)).
2. Elija uno de los 3 métodos de autenticación y registre una aplicación de API ([Métodos de autenticación de la API](/es/api?id=Métodos-de-autenticación-de-la-API)).
3. Obtenga un token de acceso (una contraseña con fecha de caducidad que se añade al llamar a la API).
4. Ejecute la API añadiendo el token de acceso ([Cómo ejecutar la API](/es/api?id=Cómo-ejecutar-la-API)).

La autenticación usa un método llamado OAuth, con la cuenta de Exment.  
Exment realiza la autenticación con [laravel/passport](https://github.com/laravel/passport).  
Referencia: [Laravel 12.x Laravel Passport](https://readouble.com/laravel/12.x/ja/passport.html) (japonés)  
Por eso, la autenticación depende de laravel/passport, pero en este manual se presentan 3 métodos de autenticación.

Nota: para las "Claves de API" que cada usuario crea y usa por sí mismo (v7.2.1 o posterior), consulte [Claves de API](/es/api_key). Es una función distinta de "API Key (clave de API)" de esta página.

## Cambiar la configuración del sistema
Para usar la API en Exment, cambie "Usar API" a SÍ desde el menú "Configuración de administración > Configuración del sistema".

> Nota: las URL corresponden a la configuración estándar sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/oauth/token`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

## Métodos de autenticación de la API
Hay 3 métodos de autenticación. Elija el que se ajuste a su uso.

| Método de autenticación | Uso para el que es adecuado |
| --- | --- |
| 1. Inicio de sesión en pantalla | Ejecutar la API desde la web |
| 2. Concesión por contraseña | Aplicaciones cliente desde las que es difícil abrir una pantalla web |
| 3. Clave de API | Ejecución por lotes |

1. **OAuth 2.0, Authorization Code Flow (Inicio de sesión en pantalla)**  
El usuario inicia sesión en el navegador y, al aprobar el uso de la aplicación, se puede usar la API. Se recomienda para ejecutar la API desde la web.

1. **Password Grant Token (Concesión por contraseña)**  
Si la solicitud de autenticación incluye el ID de inicio de sesión y la contraseña, se puede usar la API. Se recomienda para aplicaciones cliente desde las que es difícil abrir una pantalla web.

1. **API Key (Clave de API)**  
Al crear la aplicación de API, se crea una clave de API. Después, si la solicitud de autenticación incluye la clave de API, se puede usar la API. Se recomienda para la ejecución por lotes.


### 1. OAuth 2.0, Authorization Code Flow (Inicio de sesión en pantalla)
Con este método, desde un servicio web nuevo (por ejemplo, un sistema de contabilidad), el usuario inicia sesión en Exment y puede usar la API. Los pasos son los siguientes.

- En el momento de la autenticación, en el navegador web aparece una pantalla para introducir el ID y la contraseña de Exment.  

- Cuando el usuario introduce el ID y la contraseña, aparece un mensaje para aprobar la aplicación.    

![Pantalla de autenticación de la API](../img/api/authorize1.png)  

- Cuando el usuario aprueba, vuelve al servicio web (callback) y se devuelve un código.

Nota: en este manual se describe un ejemplo en el que el servicio web, distinto de Exment, está construido con Laravel.  
También se puede construir con otros lenguajes o frameworks.  

#### Cómo configurarlo

##### Configuración en las páginas de Exment
- El administrador del sistema introduce la URL siguiente.  
http(s)://(URL de Exment)/api_setting  
Nota: se puede abrir después de hacer el paso "Cambiar la configuración del sistema" de arriba.

- Desde v7.1.0 también se puede abrir desde "Configuración de administración" → "Configuración de API" del menú de la izquierda (cuando "Usar API" está en SÍ).
- En v7.0 y anteriores, "Configuración de API" no aparece en el menú con la configuración predeterminada. Para añadirlo al menú, abra la página "Configuración de administración" > "Menú" y elija el tipo de menú "Menú del sistema". En "Destino" aparece "Configuración de API"; elíjalo y guarde.


![Pantalla de autenticación de la API](../img/api/api_setting1.png)  

- Aparece la pantalla de configuración de la API; pulse [Nuevo].  

- Introduzca los datos necesarios.  

    **Tipo de autenticación**  
	Elija "Inicio de sesión en pantalla".  

	**Nombre de la aplicación**  
	Escriba el nombre que quiera.  

	**URL de redirección**  
	Escriba la URL a la que se redirige cuando el usuario termina la autenticación en la pantalla.  

![Pantalla de autenticación de la API](../img/api/api_setting2.png)  


- Después de guardar, aparecen el ID de cliente (Client ID) y el secreto de cliente (Client Secret) necesarios para la autenticación; cópielos.  
Nota: el secreto de cliente se muestra al pulsar el icono del ojo.  

![Pantalla de autenticación de la API](../img/api/api_setting3.png)  

##### Implementación en el servicio web de desarrollo propio
- En el servicio web, cree un endpoint para llamar a la pantalla de autenticación de Exment.

~~~
http(s)://(URL de Exment)/oauth/authorize  GET  
response_type: code
client_id: (Client ID copiado)
redirect_uri: (URL de callback introducida)
scope: (ámbitos con los que se va a acceder. La lista está más abajo. Si hay varios, sepárelos con espacios)

Ejemplo: http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- Ejemplo:
~~~ php
// Implementación en el servicio web
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(Client ID copiado)',
        'redirect_uri' => '(URL de callback introducida)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(URL de Exment)/oauth/authorize?'.$query);
}
~~~

- En el servicio web, cree un endpoint para obtener el token de acceso después de completar la autenticación de Exment.

~~~
http(s)://(URL de Exment)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(Client ID copiado)",
    "client_secret": "(Client Secret copiado)",
    "redirect_uri": "(URL de callback introducida)",
    "code": "(code obtenido de la URL a la que se redirigió)"
}
~~~

- Ejemplo:
~~~ php
// Implementación en el servicio web. El endpoint es la URL de callback introducida
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(URL de Exment)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(Client ID copiado)',
            'client_secret' => '(Client Secret copiado)',
            'redirect_uri' => '(URL de callback introducida)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- Con esto, en la respuesta se devuelve un json con los atributos access_token, refresh_token y expires_in.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Con este token de acceso se ejecuta la API.


### 2. Password Grant Token (Concesión por contraseña)
Si la solicitud de autenticación incluye el ID de inicio de sesión y la contraseña, se puede usar la API.

- Como el usuario no tiene que introducir el ID y la contraseña en una pantalla, también se puede ejecutar en procesos por lotes y similares.  

- Hay que incluir el ID y la contraseña del usuario en la solicitud de autenticación.  

- De los tipos de SSO, se admite LDAP. No se admiten la autenticación OAuth ni SAML.

Nota: en este manual se describe un ejemplo en el que el servicio web, distinto de Exment, está construido con Laravel.  
También se puede construir con otros lenguajes o frameworks.  

#### Cómo configurarlo

##### Configuración en las páginas de Exment
- El administrador del sistema introduce la URL siguiente.  
http(s)://(URL de Exment)/api_setting  
Nota: se puede abrir después de hacer el paso "Cambiar la configuración del sistema" de arriba.

- Desde v7.1.0 también se puede abrir desde "Configuración de administración" → "Configuración de API" del menú de la izquierda (cuando "Usar API" está en SÍ).
- En v7.0 y anteriores, "Configuración de API" no aparece en el menú con la configuración predeterminada. Para añadirlo al menú, abra la página "Configuración de administración" > "Menú" y elija el tipo de menú "Menú del sistema". En "Destino" aparece "Configuración de API"; elíjalo y guarde.

![Pantalla de autenticación de la API](../img/api/api_setting1.png)  

- Aparece la pantalla de configuración de la API; pulse [Nuevo].  

- Introduzca los datos necesarios.  

    **Tipo de autenticación**  
	Elija "Concesión por contraseña".  

	**Nombre de la aplicación**  
	Escriba el nombre que quiera.

![Pantalla de autenticación de la API](../img/api/api_setting4.png)  


- Después de guardar, aparecen el ID de cliente (Client ID) y el secreto de cliente (Client Secret) necesarios para la autenticación; cópielos.  
Nota: el secreto de cliente se muestra al pulsar el icono del ojo.  

![Pantalla de autenticación de la API](../img/api/api_setting5.png)  


##### Implementación en el programa de desarrollo propio
- En el programa que llama, cree la solicitud para obtener el token de acceso.

~~~
http(s)://(URL de Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID copiado)",
    "client_secret": "(Client Secret copiado)",
    "username": "(ID de usuario o dirección de correo electrónico con que se inicia sesión)",
    "password": "(contraseña del usuario con que se inicia sesión)",
    "scope": "(ámbitos con los que se va a acceder. La lista está más abajo. Si hay varios, sepárelos con espacios)"
}
~~~

- Con esto, en la respuesta se devuelve un json con los atributos access_token, refresh_token y expires_in.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Con este token de acceso se ejecuta la API.


##### Implementación en el programa de desarrollo propio (con autenticación LDAP)
- Con autenticación LDAP, haga el POST de la forma siguiente.

~~~
http(s)://(URL de Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(Client ID copiado)",
    "client_secret": "(Client Secret copiado)",
	"login_type": "ldap",
	"provider_name": "(el «Nombre de LDAP» introducido en la pantalla de configuración de inicio de sesión)",
    "username": "(ID de usuario o dirección de correo electrónico con que se inicia sesión)",
    "password": "(contraseña del usuario con que se inicia sesión)",
    "scope": "(ámbitos con los que se va a acceder. La lista está más abajo. Si hay varios, sepárelos con espacios)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Con este token de acceso se ejecuta la API.



### 3. API Key (Clave de API)
Al crear la aplicación de API, se crea una clave de API. Después, si la solicitud de autenticación incluye la clave de API, se puede usar la API.

- El usuario no tiene que introducir el ID y la contraseña en una pantalla.  
Tampoco hay que configurar la contraseña en el programa que ejecuta. Aunque se desarrollen procesos por lotes y similares, no hace falta incrustar la contraseña, por lo que se reduce el riesgo de seguridad.

- **Si la aplicación de API se registra con esta configuración, la API REST se ejecuta como el usuario que creó la aplicación de API.**  

Nota: en este manual se describe un ejemplo en el que el servicio web, distinto de Exment, está construido con Laravel.  
También se puede construir con otros lenguajes o frameworks.  

#### (Complemento) Configuración de usuario y grupo de roles recomendada para API Key

Si la aplicación de API se registra con esta configuración, la API REST se ejecuta como el usuario que creó la aplicación de API.  
Por eso, no se recomienda mucho que el administrador del sistema registre la aplicación de API.  
Se recomienda configurar el usuario y el grupo de roles con los pasos siguientes.  

- Cree un nuevo [grupo de roles](/es/role_group).
    - Añada el permiso "Aplicación de API".
	- Añada permisos sobre las tablas que quiera usar con la API.

- Añada el usuario con el que se ejecutará la API.
    - Como grupo de roles, elija el grupo de roles creado arriba.

- Inicie sesión con el usuario creado arriba, abra la pantalla de configuración de la API y registre la aplicación de API.


#### Cómo configurarlo

##### Configuración en las páginas de Exment
- El administrador del sistema introduce la URL siguiente.  
http(s)://(URL de Exment)/api_setting  
Nota: se puede abrir después de hacer el paso "Cambiar la configuración del sistema" de arriba.

- Desde v7.1.0 también se puede abrir desde "Configuración de administración" → "Configuración de API" del menú de la izquierda (cuando "Usar API" está en SÍ).
- En v7.0 y anteriores, "Configuración de API" no aparece en el menú con la configuración predeterminada. Para añadirlo al menú, abra la página "Configuración de administración" > "Menú" y elija el tipo de menú "Menú del sistema". En "Destino" aparece "Configuración de API"; elíjalo y guarde.

![Pantalla de autenticación de la API](../img/api/api_setting1.png)  

- Aparece la pantalla de configuración de la API; pulse [Nuevo].  

- Introduzca los datos necesarios.  

    **Tipo de autenticación**  
	Elija "Clave de API".  

	**Nombre de la aplicación**  
	Escriba el nombre que quiera.

![Pantalla de autenticación de la API](../img/api/api_setting4.png)  


- Después de guardar, aparecen el ID de cliente (Client ID), el secreto de cliente (Client Secret) y la clave de API necesarios para la autenticación; cópielos.  
Nota: el secreto de cliente y la clave de API se muestran al pulsar el icono del ojo.  

![Pantalla de autenticación de la API](../ja/img/api/api_setting6.png)  


##### Implementación en el programa de desarrollo propio
- En el programa que llama, cree la solicitud para obtener el token de acceso.

~~~
http(s)://(URL de Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(Client ID copiado)",
    "client_secret": "(Client Secret copiado)",
    "api_key": "(clave de API copiada)",
    "scope": "(ámbitos con los que se va a acceder. La lista está más abajo. Si hay varios, sepárelos con espacios)"
}
~~~

- Con esto, en la respuesta se devuelve un json con los atributos access_token, refresh_token y expires_in.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Con este token de acceso se ejecuta la API.


## Cómo ejecutar la API
Para ejecutar la API, añada lo siguiente a la cabecera de la solicitud.  
  
~~~
Content-Type: application/json  
Authorization: Bearer (token de acceso obtenido)  
~~~

Ejemplo:
~~~  
http://localhost/api/data/user GET
Valores de la cabecera:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

Resultado:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> Nota: las URL corresponden a la configuración estándar sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/oauth/token`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

## Renovación del token
El token de acceso caduca al cabo de cierto tiempo y deja de poder usarse.  
En ese caso, se puede obtener otra vez un token de acceso con el token de actualización (refresh token: el valor que sirve para volver a obtener el token de acceso).  
Ejecute un HTTP POST con el contenido siguiente.    

~~~
http(s)://(URL de Exment)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(Client ID copiado)",
    "client_secret": "(Client Secret copiado)",
    "refresh_token": "(token de actualización obtenido)"
}
~~~

Resultado:
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (Referencia) Autenticación, obtención del token y ejecución de la API desde la pantalla
Son los pasos para probar, con el navegador y una herramienta, desde la autenticación hasta la ejecución de la API antes de escribir un programa.  
Úselos para entender el proceso hasta obtener el token de acceso.    

- En la configuración de la API, cree una aplicación con "Inicio de sesión en pantalla".

- Acceda a la URL siguiente.  
http(s)://(URL de Exment)/oauth/authorize?client_id=(Client ID copiado)&redirect_uri=(URL de callback introducida)&response_type=code&scope=me  
  
Ejemplo:  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- Con esto aparece una pantalla sencilla para autorizar la aplicación.  

![Pantalla de autenticación de la API](../img/api/authorize1.png)  

Pulse "Autorizar".  

- En la barra de direcciones se ha añadido la consulta "code=xxxxx".  
Copie ese código.    
Ejemplo:  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- Con una herramienta que pueda hacer peticiones POST, ejecute la comunicación HTTP siguiente.  
  
~~~
http(s)://(URL de Exment)/oauth/token  POST  
grant_type: authorization_code
client_id: (Client ID copiado)
client_secret: (Client Secret copiado)
redirect_uri: (URL de callback introducida)
code: (valor de code obtenido)  
~~~
  
Ejemplo:  
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- Si termina correctamente, se devuelve una respuesta como la siguiente.  
![Pantalla de autenticación de la API](../img/api/authorize2.png)  
Obtenga el access_token del valor json de esta respuesta.  

- Añada este token de acceso a la cabecera de la API y ejecute la API.  
  
Ejemplo:  
~~~
http://localhost/api/data/user GET
Valores de la cabecera:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
Resultado:  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Lista de ámbitos
El ámbito (scope) es el valor que decide "hasta dónde puede llegar la aplicación con la API".  
La API se puede ejecutar dentro de los ámbitos indicados al obtener el token.  
**Nota: sea cual sea la configuración de los ámbitos, con la API solo se puede acceder a la información para la que el usuario que ha iniciado sesión tiene roles y permisos.**  
Por ejemplo, no se puede obtener la información de una tabla sobre la que no se tiene permiso, ni actualizar datos personalizados sobre los que no se tiene permiso.    


| Nombre del parámetro | Descripción |
| ---- | ---- |
| me | Se puede obtener la información del usuario que ha iniciado sesión. |
| system_read | Se puede obtener la información del sistema. (No se usa actualmente. Se indica como palabra reservada) |
| system_write | Se puede obtener, añadir, actualizar y eliminar la información del sistema. (No se usa actualmente. Se indica como palabra reservada) |
| table_read | Se puede obtener la información de configuración de las tablas personalizadas. |
| table_write | Se puede obtener, añadir, actualizar y eliminar la información de configuración de las tablas personalizadas. (No se usa actualmente. Se indica como palabra reservada) |
| view_read | Se puede obtener la información de configuración de las vistas personalizadas. |
| value_read | Se puede obtener la información de los datos personalizados. |
| value_write | Se puede obtener, añadir, actualizar y eliminar la información de los datos personalizados. |
| notify_read | Se puede obtener la información de las notificaciones. |
| notify_write | Se pueden añadir notificaciones. |
| workflow_read | Se puede obtener la información de los flujos de trabajo. |
| workflow_execute | Se pueden ejecutar los flujos de trabajo. |
| log | Se puede obtener el registro de operaciones. |
| plugin | Se pueden usar las API añadidas como plugins. Para más detalles, vea [aquí](/es/plugin_quickstart_api) |

Nota: para indicar varios ámbitos, póngalos en el parámetro separados por espacios.  



## Lista de códigos de error (en revisión)
Cuando se produce un error al ejecutar la API, se devuelve un código de error.  
Esta es la lista de los códigos de error y de los códigos de estado de la respuesta HTTP.    

| Código de error de Exment | Código de estado HTTP | Descripción | 
| ---- | ---- | ---- |
| 101 | 403 | No tiene permiso para acceder a ese endpoint o a esa tabla personalizada. Revise los permisos del usuario que ejecuta. |
| 102 | 400 | Hay un defecto en la cadena de consulta de la ejecución o en los valores enviados. Revise los valores. |
| 103 | 400 | Sobre todo al añadir o actualizar datos, la validación de los valores enviados ha encontrado un defecto. Revise los valores enviados. |
| 104 | 403 | Se produce cuando, por la configuración, no se pueden ejecutar acciones como crear, actualizar o eliminar datos. |
| 105 | 403 | Es un dato que no se puede eliminar. |
| 106 | 403 | El ámbito de la autenticación de la API es incorrecto. Revise el valor del ámbito. |
| 107 | 400 | Al obtener un dato concreto indicando el id, ese valor no existe. Indique el id. |
| 108 | 401 | El token de acceso de la autenticación de la API es incorrecto o ha caducado. Revise el token de acceso. |
| 109 | 400 | Se produce cuando, al crear o eliminar datos, la solicitud supera el número de datos que se pueden tratar a la vez (estándar: 100). |
| 110 | 403 | Se produce cuando se intenta actualizar, por ejemplo, un dato que ya está eliminado. |
| 111 | 500 | Se produce cuando, al ejecutar un plugin (API), el plugin indicado no existe. Revise el nombre del plugin. |
| 112 | 400 | Se produce cuando, en una API dirigida a una vista, la tabla y la vista no se corresponden. |
| 113 | 400 | Se produce cuando, en una API dirigida a una vista, se ha indicado un tipo de vista no admitido. |
| 201 | 403 | Se produce cuando se intenta actualizar o eliminar, por ejemplo, un dato bloqueado por el estado del flujo de trabajo. |
| 202 | 400 | Se produce cuando, al ejecutar la API "valor de ejecución actual del flujo de trabajo", el flujo de trabajo no se había iniciado. |
| 203 | 400 | Se produce cuando, al ejecutar las API "obtener la lista de usuarios de trabajo de un dato concreto" u "obtener la lista de las siguientes acciones ejecutables de un dato concreto", el flujo de trabajo ya había terminado. |
| 204 | 400 | Se produce cuando, al ejecutar la API "ejecutar el flujo de trabajo de un dato concreto", el ID de acción indicado no se podía ejecutar. |
| 205 | 400 | Se produce cuando, al ejecutar la API "ejecutar el flujo de trabajo de un dato concreto", no existe el siguiente usuario de trabajo. |
| 301 | 400 | La API no se puede ejecutar por la restricción de IP. |
| 401 | 403 | Se produce cuando, en la API para formularios públicos, la tabla indicada no está incluida en el formulario público. |
| 402 | 403 | Se produce cuando se intenta crear un segundo dato o posterior en una tabla que tiene configurado "Permitir solo un registro". |

## Referencia de la API web
Para la referencia de la API, consulte la [referencia de la API](https://exment.net/reference/ja/webapi.html) (japonés).
