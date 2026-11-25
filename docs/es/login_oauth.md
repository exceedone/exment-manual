# Inicio de sesión único (OAuth)
Aquí se explica cómo configurar el inicio de sesión único (SSO) con OAuth. Permite iniciar sesión en Exment con una cuenta de Google, de Microsoft, etc.  
En Exment se puede añadir el inicio de sesión único en la [Configuración de inicio de sesión](/es/login_setting). Al añadirlo, se puede iniciar sesión con el ID y la contraseña del proveedor (el servicio que se encarga del inicio de sesión, como Google), sin tener que gestionar una contraseña de inicio de sesión propia de Exment.

La configuración se hace en este orden, en 2 partes.

1. **Preparación del servidor y del proveedor** (crear una aplicación en el proveedor y, si hace falta, instalar la biblioteca) … «Configuración del servidor y de cada proveedor»
2. **Configuración en pantalla** (añadir el proveedor en la pantalla de configuración de inicio de sesión) … «Configuración en pantalla»

Los pasos de la parte 1 cambian según el proveedor que se use.

| Proveedor que se usa | Dónde mirar |
|---|---|
| Google, Facebook, Twitter, GitHub, LinkedIn, Bitbucket | (1) Proveedores incluidos de serie en Socialite |
| Office365, Microsoft Graph | (2) Proveedores preparados como extensión de Exment |
| Los demás | (3) Proveedores que prepara usted mismo |

#### Notas
- En Exment, el inicio de sesión único está implementado con [Socialite](https://github.com/laravel/socialite).
- **Los pasos de este manual están pensados para personas que conocen bien OAuth. Para saber cómo crear el Client ID y el Client Secret de cada proveedor, consulte la documentación correspondiente.**
- <span class="red">Si usa v3.0.16 o anterior y no puede iniciar sesión con Google, siga [estos pasos](/patch/sso_google) (inglés).</span>

#### Enlaces de referencia
- [Usar el SSO con una cuenta de Google en la base de datos web de código abierto «Exment»](https://qiita.com/hirossyi73/items/70dcc35305a96abace08) (japonés)


## Configuración del servidor y de cada proveedor
Antes de añadir el proveedor en la pantalla de configuración de inicio de sesión, hay que ejecutar comandos en el servidor para instalar la extensión.

### (1) Proveedores incluidos de serie en Socialite
- Los proveedores que Socialite incluye de serie son los siguientes. (El texto entre paréntesis se usa después, al indicar el service.)
    - Google (google)
    - Facebook (facebook)
    - Twitter (twitter)
    - GitHub (github)
    - LinkedIn (linkedin)
    - Bitbucket (bitbucket)

- En cada proveedor, cree una aplicación para Exment.  
※ La callback URL es la siguiente.  
http(s)://(URL de Exment)/auth/login/(nombre del provider de socialite)/callback  

    - Ejemplo 1, con GitHub: http(s)://(URL de Exment)/auth/login/github/callback  
    - Ejemplo 2, con Facebook: http(s)://(URL de Exment)/auth/login/facebook/callback  
    - Ejemplo 3, con Google: http(s)://(URL de Exment)/auth/login/google/callback  

> ※La URL es la de la configuración estándar, sin «/admin» (sitios instalados de nuevo con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es «admin»), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/auth/login/google/callback`). Para más detalles, consulte [Cambiar o quitar el «admin» de la URL](/es/additional_prefix).

- Ejecute el siguiente comando en el directorio raíz de Exment.

~~~
composer require laravel/socialite=~5.1
~~~
※ Desde Exment v7.0.0, «laravel/socialite» se instala automáticamente como biblioteca de la que depende Exment, así que no hace falta ejecutar este comando.

- Haga la [Configuración en pantalla](/es/login_oauth?id=Configuración-en-pantalla).




### (2) Proveedores preparados como extensión de Exment
- Algunos proveedores están preparados como extensión de Exment. (El texto entre paréntesis se usa después, al indicar el service.)
    - Office365, Microsoft Graph (graph)

- En cada proveedor, cree una aplicación para Exment.  
※ La callback URL es la siguiente.  
http(s)://(URL de Exment)/auth/login/(nombre del provider de socialite)/callback  

    - Ejemplo, con Office365: http(s)://(URL de Exment)/auth/login/graph/callback

- Ejecute el siguiente comando en el directorio raíz de Exment.

~~~
composer require exceedone/microsoft-graph
~~~

- Haga la [Configuración en pantalla](/es/login_oauth?id=Configuración-en-pantalla).


### (3) Proveedores que prepara usted mismo
Si el proveedor no está en (1) ni en (2), añada un proveedor no oficial con [Socialite Providers](https://socialiteproviders.github.io/).  
Los proveedores no oficiales tampoco incluyen el proceso para obtener el avatar (la imagen del usuario). Si quiere obtener el avatar, añada ese proceso. (Opcional)  
  
※ Hay varios pasos. Para más detalles, consulte [Cómo crear un proveedor propio](/es/login_oauth?id=Cómo-crear-un-proveedor-propio).

- Cuando termine los pasos, haga la [Configuración en pantalla](/es/login_oauth?id=Configuración-en-pantalla).



## Configuración en pantalla
Cuando termine la configuración del servidor, añada el proveedor en la [pantalla de configuración de inicio de sesión](/es/login_setting).

1. Abra la pantalla de configuración del sistema con una cuenta de administrador.  
Abra la pantalla de configuración de inicio de sesión con el botón «Configuración de inicio de sesión», arriba a la derecha de la página.  
![Pantalla de configuración de inicio de sesión](../ja/img/login/login_setting1.png)  

2. Pulse el botón Nuevo y cree una configuración de inicio de sesión. Los campos que hay que rellenar son los siguientes.

### Tipo de proveedor
![Pantalla de creación de la configuración de inicio de sesión](../ja/img/login/login_oauth1.png)  

- Si en «Configuración del servidor y de cada proveedor» eligió un proveedor de (1), elija el nombre de ese proveedor.  

- Si en «Configuración del servidor y de cada proveedor» eligió un proveedor de (2) o (3), elija «Otro».  
Al elegir «Otro» aparece «Nombre del proveedor». Escriba ahí, con caracteres alfanuméricos, el tipo de proveedor que indica Socialite.  
Ejemplo, con Microsoft Graph: "graph"

![Pantalla de creación de la configuración de inicio de sesión](../ja/img/login/login_oauth2.png)  


### ID de cliente, Secreto de cliente
Escriba las cadenas que le ha dado el proveedor.

### Ámbito
Si solo se usa para iniciar sesión, en general no tiene un uso claro. Si va a obtener el token de acceso con [Obtener el token de acceso](/es/login_oauth?id=Obtener-el-token-de-acceso), se recomienda configurarlo.

### Ajustes de opciones
Aquí se hacen los ajustes de opciones que corresponden al tipo de proveedor elegido.
(Si elige un tipo de proveedor que no tiene ajustes de opciones, no se muestran.)

#### Cuando el tipo de proveedor es «Otro»
![Ajustes de opciones](../img/login/login_setting10.png) 

##### Cierre de sesión único
Al cerrar sesión en Exment, también se cierra la sesión en el proveedor con el que se inició sesión por SSO.<span class="red">※ Por ahora no es compatible con Okta.</span>

<!---
  El mismo texto se usa en OAuth y en SAML
-->
### Configuración de usuario
Aquí se configura cómo se trata al usuario que inicia sesión.

![Configuración de usuario](../ja/img/login/login_setting5.png)  

#### Columna de búsqueda de cuenta
Configure qué columna de la cuenta obtenida por SSO se usa para buscar la cuenta de Exment.

#### Crear usuario
- Si es YES: cuando el usuario que inicia sesión no existe en Exment, se crea un usuario nuevo de Exment con la información de inicio de sesión.
- Si es NO: hay que crear antes el usuario en Exment. Cuando el usuario que inicia sesión no existe en Exment, se muestra un error.

#### Configuración del grupo de roles
Si es YES, al crear un usuario nuevo de Exment se le puede vincular a un grupo de roles.  

#### Actualizar datos del usuario
Si es YES, al iniciar sesión otra vez se actualizan los datos del usuario, como el nombre de usuario.


- Cuando los datos se han guardado 1 vez o más, se muestran el botón «Habilitar» y el botón «Prueba de inicio de sesión».

- Si pone el indicador de activo en YES, en la pantalla de inicio de sesión se muestra el botón para la autenticación SSO.  
※ Normalmente también se muestra, junto a él, el formulario de inicio de sesión predeterminado, en el que se escriben el ID de usuario y la contraseña. En la «Configuración de SSO» de la [Configuración del sistema](/es/system_setting) también se puede dejar de mostrar, como en la imagen.  
![Pantalla de inicio de sesión con SSO](../img/quickstart/sso1.png)



### Configuración del botón de inicio de sesión
Aquí se configura el botón de inicio de sesión que se muestra en la pantalla de inicio de sesión.  
※ Aunque no haga esta configuración, los proveedores de «(1) Proveedores incluidos de serie en Socialite», más arriba, se muestran cada uno con su propio formato.

![Configuración de usuario](../ja/img/login/login_setting6.png)  


### Habilitación y prueba de inicio de sesión
- Cuando los datos se han guardado 1 vez o más, se muestran el botón «Habilitar» y el botón «Prueba de inicio de sesión».

![Configuración de usuario](../ja/img/login/login_setting7.png)  

#### Habilitación
- Al habilitarlo, en la pantalla de inicio de sesión se muestra el botón para la autenticación SSO.  
![Configuración de usuario](../ja/img/login/login_setting8.png)  

#### Prueba de inicio de sesión
- Al hacer clic en el botón «Prueba de inicio de sesión», puede probar el inicio de sesión con la información configurada. Puede probarlo aunque la configuración de inicio de sesión no esté habilitada.  
**En ese caso, añada temporalmente la URL que aparece en «URL de redirección para pruebas» a la URL de callback de la configuración de autenticación OAuth del proveedor, o cámbiela por ella.**

![Configuración de usuario](../ja/img/login/login_setting9.png)  


- Al hacer clic en el botón «Iniciar sesión», puede probar si la configuración es correcta.  
El resultado se muestra en el elemento «Resultado».


### Obtener el token de acceso

- Si quiere obtener el token de acceso y el token de actualización después de iniciar sesión, hágalo de la siguiente forma.

~~~ php
use Exceedone\Exment\Services\Login\LoginService;

$access_token = LoginService::getAccessToken();
$refresh_token = LoginService::getRefreshToken();
~~~



## Cómo crear un proveedor propio
Estos son los pasos detallados para hacer lo indicado en (3). Se añade el paquete que indica [Socialite Providers](https://socialiteproviders.github.io/).  
Además, se crea un proveedor propio para obtener el avatar. (Opcional)

| Paso | Si es necesario |
|---|---|
| Configurar y añadir el proveedor | Obligatorio |
| Desarrollo para obtener el avatar | Opcional |
| Añadir el proveedor de servicios | Obligatorio |
| Añadir los ajustes de opciones | Obligatorio según el proveedor |
| Hacer la configuración en pantalla | Obligatorio |

### (Obligatorio) Configurar y añadir el proveedor
- En cada proveedor, cree una aplicación para Exment.  
※ La callback URL es la siguiente.  
http(s)://(URL de Exment)/auth/login/(nombre del provider de socialite)/callback  

    - Ejemplo, con Microsoft Graph: http(s)://(URL de Exment)/auth/login/graph/callback

- Ejecute el siguiente comando en el directorio raíz de Exment.

~~~
composer require laravel/socialite=~5.1
~~~
※ Desde Exment v7.0.0, «laravel/socialite» se instala automáticamente como biblioteca de la que depende Exment, así que no hace falta ejecutar este comando.

- Añada el paquete que indica [Socialite Providers](https://socialiteproviders.github.io/).  

    - Ejemplo: con Microsoft Graph

~~~
composer require socialiteproviders/microsoft-graph
~~~

### (Opcional) Desarrollo para obtener el avatar
※ Crear este proveedor propio es un paso opcional, para obtener el avatar. Si no necesita obtener el avatar, no hace falta crearlo.

- Para obtener el avatar, cree 2 clases que heredan del proveedor existente, en la carpeta «app/Socialite». ※ Si la carpeta «app/Socialite» no existe, créela.  
La primera es MicrosoftGraphProvider.php. Implementa (implements) la interfaz ProviderAvatar y el método getAvatar.  
En el método getAvatar, escriba la llamada a la API que obtiene el avatar. Consulte en cada proveedor de OAuth la URL y el endpoint para obtenerlo.  
El ejemplo de abajo son los pasos con Microsoft Graph.

~~~ php
<?php

namespace App\Socialite;

use Exceedone\Exment\Auth\ProviderAvatar;
use SocialiteProviders\Graph\Provider;

class MicrosoftGraphProvider extends Provider implements ProviderAvatar
{
    /**
     * Get avatar stream
     * @param mixed $token
     * @return string
     */
    public function getAvatar($token = null){
        try
        {
            $client = $this->getHttpClient();
            $response = $client->get('https://graph.microsoft.com/v1.0/me/photo/$value', [
                'headers' => [
                    'Authorization' => 'Bearer '.$token,
                    'Content-Type' => 'application/json;odata.metadata=minimal;odata.streaming=true'
                ],
                'http_errors' => false,
            ]);

            if($response->getStatusCode() == 404){
                return null;
            }

            return $response->getBody()->getContents();

        }
        catch (Exception $exception)
        {
            return null;
        }
        return null;
    }
}

~~~ 

- La segunda es GraphExtendSocialite.php. En ella se indica el MicrosoftGraphProvider que ha creado.

~~~ php
<?php

namespace App\Socialite;

use SocialiteProviders\Manager\SocialiteWasCalled;

class GraphExtendSocialite
{
    /**
     * Execute the provider.
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {
        $socialiteWasCalled->extendSocialite(
            'graph', __NAMESPACE__.'\MicrosoftGraphProvider'
        );
    }
}

~~~ 

### (Obligatorio) Añadir el proveedor de servicios
- En el archivo app/Providers/EventServiceProvider.php, escriba el proveedor que ha añadido, para añadir el proveedor de servicios.  
※ Lo que hay que escribir cambia según haya hecho o no el desarrollo propio para obtener el avatar.  
Además, el nombre de clase que se escribe en «@handle» suele estar en el manual del proveedor que añadió con [Socialite Providers](https://socialiteproviders.github.io/). Compruébelo.

~~~ php

// Ejemplo: con Microsoft Graph

protected $listen = [
    ///// Si ha hecho el desarrollo propio para obtener el avatar
    'App\Events\Event' => [
        'App\Listeners\EventListener',
    ],
    
    /// Añadir
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        '\App\Socialite\GraphExtendSocialite@handle', ///// Si ha hecho el desarrollo propio para obtener el avatar
        // 'SocialiteProviders\\Graph\\GraphExtendSocialite@handle', ///// Para la obtención normal, quite el comentario de esta línea y escríbala
    ],
];

~~~
~~~php

// Ejemplo: con EntraID

protected $listen = [
    // ... other listeners
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        // ... other providers
        \SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class.'@handle',
    ],
];

~~~

※ Si ha hecho una instalación nueva con Exment v7.0.0 o posterior (proyecto creado con Laravel12), «app/Providers/EventServiceProvider.php» no existe. En ese caso, escriba lo siguiente en el método boot de «app/Providers/AppServiceProvider.php».

~~~php

// Ejemplo: con EntraID

public function boot(): void
{
    \Illuminate\Support\Facades\Event::listen(
        \SocialiteProviders\Manager\SocialiteWasCalled::class,
        [\SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class, 'handle']
    );
}

~~~


### (Obligatorio según el proveedor) Añadir los ajustes de opciones
Algunos proveedores de inicio de sesión con OAuth necesitan una configuración adicional.  

  
Ejemplo: con [OKTA](https://github.com/SocialiteProviders/Okta)
- Abra config/services.php y añada lo siguiente.

``` php
'okta' => [    
  'base_url' => env('OKTA_BASE_URL'), 
],
```

- Abra el archivo .env y añada lo siguiente.

```
OKTA_BASE_URL='https://<dominio de OKTA>'
```

> En principio, Socialite exige los valores "client_id", "client_secret" y "redirect" en config/services.php. En la autenticación OAuth de Exment, los valores configurados en la pantalla se asignan automáticamente.  
Si quiere escribir valores de configuración propios del proveedor, añádalos en config/services.php como en el ejemplo de arriba.


### (Obligatorio) Hacer la configuración en pantalla

- Cuando termine toda la configuración del servidor, haga la [Configuración en pantalla](/es/login_oauth?id=Configuración-en-pantalla).

  
  
[←Volver a Configuración de inicio de sesión](/es/login_setting)
