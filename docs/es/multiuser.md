# Configuración para portales externos (cuando se construye un sistema en el que inician sesión usuarios de varias organizaciones)
Es un ajuste para que, donde se eligen o se muestran usuarios y organizaciones, **"solo se muestren las organizaciones a las que pertenece el usuario con acceso y los usuarios de esas organizaciones"**.  
Lo recomendamos cuando personas de empresas distintas inician sesión en un mismo Exment (por ejemplo, un portal para el exterior).

La configuración en sí consiste en cambiar un solo elemento de la Configuración del sistema. Si quiere ver primero los pasos, vaya a "[Cómo configurarlo](/es/multiuser?id=Cómo-configurarlo)", más abajo.

## Contexto
En su origen, Exment se pensó sobre todo para usos como los siguientes.  

- Compartir información dentro de una empresa u organización  
- Compartir información entre empresas de un mismo grupo
- Publicar la API REST y guardar los datos como una base de datos web

En estos usos, que se vea quién usa el sistema y qué organizaciones o empresas están registradas no es un gran problema. Al contrario, lo natural es que se vea.  

![Roles y permisos](../img/user/multi_user7.png)

Sin embargo, en usos como los siguientes, **"poder obtener información de otros usuarios"** puede ser un problema.  

- Se dan cuentas de Exment a empresas totalmente distintas, que no son de un mismo grupo, y se gestionan los datos en una sola base de datos web.
- Se dan cuentas de Exment a personas individuales y se construye el sistema como un portal.

En estos usos, **poder ver u obtener información de usuarios, empresas y organizaciones que no son de la empresa de cada usuario puede ser, a veces, un problema.**  
  
![Roles y permisos](../img/user/multi_user8.png)

Como ejemplo, supongamos un Exment montado así.  

- En un entorno de Exment pueden iniciar sesión los responsables de las empresas proveedoras A, B y C.
- El responsable de cada proveedor tiene el permiso "Editar datos asignados" en la tabla "Información de productos" e introduce la información de los productos que lleva su empresa.
- La tabla "Información de productos" tiene la columna personalizada "Responsable". En la columna "Responsable" se pone el responsable de ese producto en la propia empresa.

Con la configuración normal, **entre los candidatos de la columna personalizada "Responsable" de la tabla "Información de productos" aparecen los responsables de todas las empresas proveedoras A, B y C.**    
Esto ocurre porque la columna "Usuario" de Exment, con la configuración normal, ofrece como opciones todos los usuarios que tienen permiso.  
  
![Pantalla de varios usuarios](../img/user/multi_user1.png)  
  
Por eso, a veces se quiere que **"a los usuarios con acceso de cada organización solo se les muestren las organizaciones y los usuarios de la organización a la que pertenecen"**.  
  
En esta página se explican los pasos para hacer estas 2 cosas.
- Que no se puedan mostrar las organizaciones a las que no pertenece el usuario con acceso.
- Y que no se puedan mostrar los usuarios que no pertenecen a esas organizaciones.


## Cómo configurarlo
1. Vaya a la pantalla de Configuración del sistema y haga clic en el botón "Configuración detallada", arriba a la derecha.
2. Cambie el elemento "Filtro de usuarios y organizaciones" de "Configuración de organizaciones" al ajuste adecuado.

![Pantalla de varios usuarios](../img/user/multi_user2.png)  

Los ajustes que se pueden elegir cambian según si en ese Exment "Usar la gestión de organizaciones" está en YES o no.

### Valores (cuando se usan las organizaciones)
Con cualquiera de los ajustes, el usuario con acceso solo puede obtener "las organizaciones que puede obtener" y "los usuarios que pertenecen a esas organizaciones" (excepto con "No filtrar").

#### No filtrar
- Es el valor predeterminado. No se filtran las organizaciones ni los usuarios según el usuario con acceso.

#### La organización a la que pertenece el usuario con acceso y las organizaciones de sus jerarquías superiores e inferiores, así como los usuarios que pertenecen a ellas
- El usuario con acceso solo puede obtener la información de la organización a la que pertenece y de las organizaciones de sus jerarquías superiores e inferiores.
- Solo puede obtener la información de los usuarios que pertenecen a esas organizaciones.

#### La organización a la que pertenece el usuario con acceso y las organizaciones de su jerarquía superior, así como los usuarios que pertenecen a ellas
- El usuario con acceso solo puede obtener la información de la organización a la que pertenece y de las organizaciones de su jerarquía superior.
- Solo puede obtener la información de los usuarios que pertenecen a esas organizaciones.

#### La organización a la que pertenece el usuario con acceso y las organizaciones de su jerarquía inferior, así como los usuarios que pertenecen a ellas
- El usuario con acceso solo puede obtener la información de la organización a la que pertenece y de las organizaciones de su jerarquía inferior.
- Solo puede obtener la información de los usuarios que pertenecen a esas organizaciones.

#### La organización a la que pertenece el usuario con acceso, así como los usuarios que pertenecen a ella
- El usuario con acceso solo puede obtener la información de la organización a la que pertenece.
- Solo puede obtener la información de los usuarios que pertenecen a esas organizaciones.


### Valores (cuando no se usan las organizaciones)
#### No filtrar
- Es el valor predeterminado. No se filtran los usuarios según el usuario con acceso.

#### Solo el usuario con acceso
- Ya no se puede obtener la información de otros usuarios que no sean el usuario con acceso.


## Comportamiento cuando se hace esta configuración
Con esta configuración, las pantallas cambian así.  

- **Pantalla de edición de datos**: las opciones de la columna personalizada "Organización" son solo las organizaciones que el usuario con acceso puede obtener.  
Las opciones de la columna personalizada "Usuario" también son solo los usuarios que el usuario con acceso puede obtener.

![Pantalla de varios usuarios](../img/user/multi_user3.png)  

- **Ver los datos**: cuando una columna contiene un usuario o una organización que el usuario con acceso no puede obtener, en lugar del enlace al usuario o a la organización se muestra "(Sin permiso)".  
<span class="red">※No es una función para impedir ver el dato en sí. Es una función que solo deja de mostrar los usuarios y las organizaciones.  
Si aparece este texto, es posible que el dato esté compartido también con usuarios u organizaciones a los que no iba dirigido. Revise la [configuración de permisos de los datos](/es/permission).</span>

![Pantalla de varios usuarios](../img/user/multi_user4.png)  

- **Pantalla para compartir datos**: las opciones son solo las organizaciones y los usuarios que el usuario con acceso puede obtener.

![Pantalla de varios usuarios](../img/user/multi_user5.png)  

- Solo los siguientes usuarios pueden obtener todas las organizaciones y todos los usuarios, sin importar la organización a la que pertenezcan.
    - El administrador del sistema
    - Los usuarios con acceso que tienen el permiso "Obtener todos los usuarios y organizaciones" en la [configuración de grupos de roles](/es/role_group)

![Pantalla de varios usuarios](../img/user/multi_user6.png)  
