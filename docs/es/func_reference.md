# Referencia de funciones
> En esta referencia solo se describen las clases y funciones más importantes para hacer personalizaciones, como los plugins.

## Introducción
Exment es un sistema de código abierto hecho con PHP. Usa lo siguiente.

- Framework: [Laravel](https://laravel.com/)
- Biblioteca de la pantalla de administración: [exment-admin-core](https://github.com/exceedone/exment-admin-core) (biblioteca basada en laravel-admin / open-admin)
Nota: en Exment v6.x y anteriores, la biblioteca de la pantalla de administración es [laravel-admin](http://laravel-admin.org/docs/#/).

Por eso, se pueden usar todas sus funciones y modelos.

Sin embargo, en Exment hay partes que necesitan una forma de escribir especial, distinta de la del Eloquent normal de Laravel, sobre todo para hacer posibles las tablas personalizadas.
También se definen funciones para que el desarrollo sea más fácil.
En esta página se explican las funciones que Exment define por su cuenta.


## ModelBase / Clase base de los modelos
Es la clase base de cada modelo.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| id | string (entero) | ID |
| created_user | CustomValue(user) | Instancia del usuario que creó el dato |
| updated_user | CustomValue(user) | Instancia del usuario que actualizó el dato |



## LoginUser / Clase del usuario conectado
Es la información del usuario conectado.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| id | string (entero) | ID de la tabla de usuarios de inicio de sesión |
| base_user_id | string (entero) | ID del dato personalizado "Usuario".<br/><span class="red">Nota: el ID del usuario creador, el ID del usuario que actualiza, etc. de las pantallas usan siempre este ID</span> |
| user_code | string | Código de usuario |
| user_name | string | Nombre visible del usuario |
| email | string | Dirección de correo electrónico |
| display_avatar | string | Avatar del usuario (si no está configurado, el avatar por defecto) |
| login_type | string | Tipo de proveedor de inicio de sesión.<br/>pure: normal<br/>oauth: autenticación OAuth2<br/>saml: autenticación SAML<br/>ldap: autenticación LDAP |
| login_provider | string | Nombre del proveedor de inicio de sesión. Se pone cuando el inicio de sesión no es el normal. google, github, etc. |



### Lista de funciones

#### \Exment::user()
Obtiene la información del usuario conectado.  
Nota: no es una función de LoginUser, pero se describe aquí por comodidad.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| ?LoginUser | Si hay una sesión iniciada, la información del usuario conectado. Si no, null |

##### Ejemplo de uso

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
Devuelve el ID del dato personalizado "Usuario".

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string (entero) | ID del dato personalizado "Usuario" |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### Nota complementaria: sobre id y base_user_id
En Exment hay dos tablas de la base de datos sobre los usuarios: la tabla "'Usuario (user)' de los datos personalizados" y la tabla "Usuarios de inicio de sesión (login_users)".  
Sus características principales son las siguientes.

- **Tabla "'Usuario (user)' de los datos personalizados"**
    - Tiene el código de usuario, el nombre de usuario y la dirección de correo electrónico
    - En la pantalla, se administra en la URL "/data/user"
    - Se puede obtener la lista desde la API

- **Tabla "Usuarios de inicio de sesión (login_users)"**
    - Tiene información como el tipo de proveedor de inicio de sesión (por defecto, LDAP, OAuth, etc.), la contraseña y el avatar<br/>(Nota: el código de usuario, el nombre de usuario y la dirección de correo electrónico se obtienen en el programa con funciones de Laravel)
    - En la pantalla, se administra en la URL "/loginuser"
    - No se puede obtener la lista desde la API. Solo se puede obtener la información de inicio de sesión propia
    - Tiene el "ID del 'Usuario (user)' de los datos personalizados" en la columna base_user_id. La relación es 1:n

#### Cuando los ID de las dos tablas no coinciden
**Si hay varios métodos de inicio de sesión configurados, los ID de la tabla "'Usuario (user)' de los datos personalizados" y de la tabla "Usuarios de inicio de sesión (login_users)" pueden no coincidir**. Es un caso como el siguiente.

##### Tabla "'Usuario (user)' de los datos personalizados"
| ID | Código de usuario | Nombre de usuario | Dirección de correo electrónico |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### Tabla "Usuarios de inicio de sesión (login_users)"
| ID | base_user_id | login_type | login_provider | Nota complementaria |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | El usuario admin inicia sesión con el método normal |
| 2 | 1 | oauth | google | El usuario admin inicia sesión con OAuth de Google |
| 3 | 1 | ldap | ad | El usuario admin inicia sesión con LDAP |
| 4 | 2 | pure | - | El usuario user1 inicia sesión con el método normal |

En un caso así, el ID de $login_user->id y el de $login_user->getUserId() son distintos.  

~~~ php
// Ejemplo: el usuario admin ha iniciado sesión con LDAP

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

Además, <span class="red">el ID del usuario creador, el ID del usuario que actualiza, etc. de las pantallas usan siempre getUserId().</span> Por eso, cuando obtenga el ID de usuario en un plugin, etc., use siempre getUserId().


## CustomTable / Tabla personalizada
Es la clase de la tabla personalizada.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| table_name | string | Nombre de la tabla (alfanumérico) |
| table_view_name | string | Nombre visible de la columna |
| description | string | Descripción |


### Propiedades (hasMany)
Lista de las propiedades definidas como objetos HasMany de Laravel.

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | Columnas personalizadas |
| custom_forms | CustomForm | Formularios |
| custom_views | CustomView | Vistas |
| custom_operations | CustomOperation | Actualización masiva |
| notifies | Notify | Notificaciones |
| custom_relations | CustomRelation | Relaciones (en las que esa tabla es la principal) |
| child_custom_relations | CustomRelation | Relaciones (en las que esa tabla es la secundaria) |

### Lista de funciones


#### (static)getEloquent
Obtiene el objeto de la tabla personalizada.  
Como clave $obj se puede usar id, table_name, CustomTable, CustomColumn o CustomValue.  
La información de una tabla personalizada que ya se obtuvo en esa petición se guarda en la memoria, así que no hace falta obtenerla otra vez.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $obj | mixed | Valor de la clave que quiere obtener (id, table_name, CustomTable, CustomColumn o CustomValue) |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| CustomTable | Información de la tabla personalizada obtenida |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
Obtiene el modelo de los datos personalizados.  
Nota: el Model de los datos personalizados parte de la clase CustomValue y se instancia con un nombre de clase dinámico que hereda de esa clase.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $id | string,int | Si quiere obtener el modelo de un dato personalizado con un ID concreto, ese id. El valor inicial es null |
| $withTrashed | bool | true si quiere obtener un modelo eliminado. El valor inicial es false |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| CustomValue | Objeto del dato personalizado (de la clase dinámica que hereda de él) |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1. Crear la consulta para obtener los datos de avisos
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// Sobre $query se escribe el generador de consultas de la base de datos

// 2. Obtener el dato de avisos cuyo ID es 1
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // ¡Bienvenido a Exment!
\Log::debug($value->getValue('body')); // Exment es un sistema web de gestión de datos sencillo y asequible. ...

~~~

---

#### getSearchEnabledColumns
Obtiene la lista de las columnas personalizadas en las que se puede buscar.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| Collection(CustomColumn) | Lista de objetos de columnas personalizadas |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
Obtiene la configuración de las opciones de la tabla personalizada.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $key | string | Clave de la configuración que se obtiene. color, icon, search_enabled, etc. |
| $default | mixed | Valor por defecto cuando la clave no existe. Si no se indica, null |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| mixed | Valor de la opción de la tabla personalizada |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
Comprueba si el usuario conectado tiene permiso para acceder a esa tabla.  


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | Clave del permiso que se comprueba. El valor inicial es AVAILABLE_VIEW_CUSTOM_VALUE (permiso para ver la tabla personalizada) |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| bool | true si tiene permiso; false si no |

##### Ejemplo de uso

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Comprobar si el usuario conectado tiene permiso para ver la tabla "contratos"
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// Comprobar si el usuario conectado tiene permiso para editar la tabla "ventas"
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
Comprueba si el usuario conectado tiene permiso para ver el id indicado de la tabla indicada.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $id | string,int | id del custom_value de destino |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| bool | true si tiene permiso; false si no |

##### Ejemplo de uso

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Comprobar si el usuario conectado tiene permiso para ver el dato con id 3 de la tabla "contratos"
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
Comprueba si el usuario conectado tiene permiso para editar el id indicado de la tabla indicada.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $id | string,int | id del custom_value de destino |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| bool | true si tiene permiso; false si no |

##### Ejemplo de uso

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Comprobar si el usuario conectado tiene permiso para ver el dato con id 5 de la tabla "ventas"
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / Columna personalizada
Es la clase de la columna personalizada.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| column_name | string | Nombre de la columna (alfanumérico) |
| column_view_name | string | Nombre visible de la columna |
| required | bool | Si es una columna obligatoria |
| index_enabled | bool | Si es una columna con índice de búsqueda |
| unique | bool | Si es una columna única |


### Propiedades (hasMany)
Lista de las propiedades definidas como objetos HasMany de Laravel.

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | Columnas del formulario |
| custom_view_columns | CustomViewColumn | Columnas de la vista |


### Propiedades (belongsTo)
Lista de las propiedades definidas como objetos belongsTo de Laravel.

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Tabla personalizada |


### Lista de funciones

#### (static)getEloquent
Obtiene el objeto de la columna personalizada.  
Como clave $obj se puede usar id, column_name o CustomColumn.  
La información de una columna personalizada que ya se obtuvo en esa petición se guarda en la memoria, así que no hace falta obtenerla otra vez.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $column_obj | mixed | Valor de la clave que quiere obtener (id, column_name o CustomColumn) |
| $table_obj | mixed | Si indica $column_obj con column_name, el id, el table_name, el CustomTable, etc. de la tabla personalizada de destino, para acotar la tabla |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| CustomColumn | Información de la columna personalizada obtenida |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Obtener la información de la columna "título" de la tabla "avisos" indicando el ID de la columna personalizada
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// Obtener la información de la columna "cuerpo" de la tabla "avisos" indicando el nombre de la columna personalizada.
// El nombre de la columna puede usarse también en otra tabla, por eso hace falta la información de la tabla como argumento
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // nombre visible de la columna
~~~

---


#### getIndexColumnName
Si esa columna tiene activado el índice de búsqueda, obtiene el nombre del INDEX de la base de datos.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $alterColumn | bool | Si la columna virtual de esa columna no existe en la base de datos, indica si se crea la columna virtual. El valor inicial es true |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Es el nombre del índice. |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Buscar en la tabla "avisos" los datos cuyo "título" empieza por "Exment"
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / Datos personalizados
Es la clase de los datos personalizados.  
Nota: esta clase es una clase abstracta. A partir de ella, se genera dinámicamente una clase para cada tabla personalizada.
Si quiere obtener la clase de datos personalizados de cada tabla, consulte [getValueModel de la clase CustomTable](/es/func_reference?id=getValueModel).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| parent_type | string | Si ese dato tiene una tabla principal, el nombre de la tabla principal |
| parent_id | int | Si ese dato tiene una tabla principal, el id del dato personalizado de la tabla principal |
| label | string | Etiqueta con la que se muestra ese dato en la pantalla |


### Propiedades (belongsTo)
Lista de las propiedades definidas como objetos belongsTo de Laravel.

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Tabla personalizada |


### Lista de funciones

#### notify
Ejecuta la notificación de ese dato personalizado.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | Tipo de notificación |

##### Valor devuelto
Ninguno

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Ejecutar la notificación de creación de datos sobre el dato con id 1 de la tabla de avisos
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
Obtiene el valor guardado, usando como clave la columna personalizada indicada.  
Nota: el tipo y el contenido del valor devuelto cambian según el argumento $valueType.  
Por ejemplo, si el tipo de la columna personalizada es "Selección (desde tabla)" y $valueType es false, devuelve el objeto del dato seleccionado.  
**Nota: para el valor devuelto según el tipo de columna personalizada, consulte [esta página](/es/column_reference).**  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | Una instancia de CustomColumn, un column_name o un id |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | Devuelve el valor de la forma siguiente. <br />• Sin argumento, false o ValueType::VALUE: lo devuelve como value  <br /> • true o ValueType::TEXT: lo devuelve como text <br />• ValueType::HTML: lo devuelve como html <br />• ValueType::PURE_VALUE: lo devuelve como pureValue <br /><br />Nota: para el contenido de pureValue, value, text y html, consulte [esta página](/es/column_reference). |
| $options | array | Opciones de la forma de obtener el valor |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| mixed | Valor del dato personalizado en la columna indicada |


##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Obtener el dato con id 1 de la tabla de avisos
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // ¡Bienvenido a Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal 
~~~

---

#### setValue
Asigna un valor, usando como clave la columna personalizada indicada.  
Nota: en Exment, los valores escritos en los datos personalizados se guardan como tipo json en la columna "value" de la base de datos.  
Además, en la instancia de CustomValue, la propiedad value está convertida en un array asociativo.  
Esta función asigna un valor a la columna value indicando la clave.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $key | string | Nombre de la columna personalizada |
| $val | mixed | Valor que se asigna |
| $forgetIfNull | bool | Si $val es null, indica si se quita la clave del array asociativo. El valor inicial es false |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| CustomValue | Instancia de CustomValue (método mágico)) |


##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Obtener el dato con id 1 de la tabla de avisos
$value = CustomTable::getEloquent('information')->getValueModel(1);

// Actualizar y guardar en la base de datos
$value->setValue('title', 'Título actualizado');
$value->save();
~~~

---

#### setValueStrictly

> Implementado desde 3.4.3

Asigna al objeto un array de columnas personalizadas y valores.  
Nota: antes de asignar los valores, se hace la validación.  
Si hay un error de validación, se lanza \Illuminate\Validation\ValidationException.  


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $list | array | Array con el nombre de la columna personalizada como clave y el valor que se asigna como valor |
| $forgetIfNull | bool | Si $val es null, indica si se quita la clave del array asociativo. El valor inicial es false |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| CustomValue | Instancia de CustomValue (método mágico)) |


##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// Obtener el dato con id 1 de la tabla "foo"
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // Poner los valores en el objeto. Array de "nombre de la columna personalizada => valor"
    $value->setValueStrictly(['value1' => 'valor 1', 'value2' => 2]);
    // Actualizar y guardar en la base de datos
    $value->save();
}
// Si hay un error de validación
catch(ValidationException $ex){
    // Obtener el contenido del error
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
Obtiene la cadena de la etiqueta del dato personalizado.  

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Cadena de la etiqueta del dato personalizado |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Obtener el dato con id 1 de la tabla de avisos
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // ¡Bienvenido a Exment!
~~~

---

#### getUrl
Obtiene la URL que enlaza con la página del dato personalizado.  


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $options | array | Array asociativo que indica la forma de obtenerla. <br />tag : true si quiere obtenerla como una etiqueta a. El valor inicial es false<br />list : true si quiere obtenerla como página de lista. El valor inicial es false<br />icon : si quiere añadir un icono, el nombre de la clase de font-awesome   |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | URL o etiqueta |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Obtener el dato con id 1 de la tabla de avisos
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">¡Bienvenido a Exment!</a>

~~~






## NotifyService / Servicio de notificación
Es el servicio que se llama para hacer una notificación.

- namespace Exceedone\Exment\Services


### Lista de funciones


#### (static)notifyMail
Hace una notificación por correo.


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $params | array | Parámetros de la notificación. Las claves y su descripción están abajo |
| $params['prms'] | array | Array de claves y valores que se sustituyen en el asunto y en el cuerpo |
| $params['user'] | CustomValue(user) or string | Objeto del usuario al que se envía el correo, o su dirección de correo |
| $params['custom_value'] | CustomValue | Dato personalizado sobre el que se envía el correo |
| $params['mail_template'] | MailTemplate or string or id | Información de la plantilla de notificación |
| $params['subject'] | string | Asunto |
| $params['body'] | string | Cuerpo |
| $params['to'] | string | Destinatario del correo. Si hay varios, separados por comas |
| $params['cc'] | string | CC del correo. Si hay varios, separados por comas |
| $params['bcc'] | string | BCC del correo. Si hay varios, separados por comas |


##### Ejemplo de uso

~~~ php
    // Ejemplo 1: envío de un correo sencillo
    NotifyService::notifyMail([
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // Ejemplo 2: uso de una plantilla de notificación
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // Ejemplo 3: sustitución de parámetros
    NotifyService::notifyMail([
        'subject' => 'Prueba ${prms1} ${prms2}',
        'body' => 'Este es el cuerpo. ${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ejemplo 4: sustitución de parámetros con un dato personalizado
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo. ${value:contract_code}', // Se sustituye por el valor de contract_code de $custom_value
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
Muestra una notificación en el encabezado, arriba a la derecha de la página.


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $params | array | Parámetros de la notificación. Las claves y su descripción están abajo |
| $params['prms'] | array | Array de claves y valores que se sustituyen en el asunto y en el cuerpo |
| $params['user'] | CustomValue(user) | Objeto del usuario al que se envía la notificación |
| $params['custom_value'] | CustomValue | Dato personalizado sobre el que se notifica |
| $params['mail_template'] | MailTemplate or string or id | Información de la plantilla de notificación |
| $params['subject'] | string | Asunto |
| $params['body'] | string | Cuerpo |


##### Ejemplo de uso

~~~ php
    // Ejemplo 1: notificación sencilla al usuario con ID de usuario 1
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo',
        'user' => $user,
    ]);
    

    // Ejemplo 2: uso de una plantilla de notificación
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // Ejemplo 3: sustitución de parámetros
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Prueba ${prms1} ${prms2}',
        'body' => 'Este es el cuerpo. ${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ejemplo 4: sustitución de parámetros con un dato personalizado
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo. ${value:contract_code}', // Se sustituye por el valor de contract_code de $custom_value
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Envía una notificación a Slack.


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $params | array | Parámetros de la notificación. Las claves y su descripción están abajo |
| $params['webhook_url'] | string | URL del WebHook |
| $params['webhook_name'] | string | Nombre con el que se publica en Slack |
| $params['webhook_icon'] | string | Icono con el que se publica en Slack |
| $params['prms'] | array | Array de claves y valores que se sustituyen en el asunto y en el cuerpo |
| $params['custom_value'] | CustomValue | Dato personalizado sobre el que se notifica |
| $params['mail_template'] | MailTemplate or string or id | Información de la plantilla de notificación |
| $params['subject'] | string | Asunto |
| $params['body'] | string | Cuerpo |


##### Ejemplo de uso

~~~ php
    // Ejemplo 1: notificación sencilla a Slack
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo',
    ]);
    

    // Ejemplo 2: uso de una plantilla de notificación
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Ejemplo 3: sustitución de parámetros
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Prueba ${prms1} ${prms2}',
        'body' => 'Este es el cuerpo. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ejemplo 4: sustitución de parámetros con un dato personalizado
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo. ${value:contract_code}', // Se sustituye por el valor de contract_code de $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Envía una notificación a Microsoft Teams.


##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $params | array | Parámetros de la notificación. Las claves y su descripción están abajo |
| $params['webhook_url'] | string | URL del WebHook |
| $params['prms'] | array | Array de claves y valores que se sustituyen en el asunto y en el cuerpo |
| $params['custom_value'] | CustomValue | Dato personalizado sobre el que se notifica |
| $params['mail_template'] | MailTemplate or string or id | Información de la plantilla de notificación |
| $params['subject'] | string | Asunto |
| $params['body'] | string | Cuerpo |


##### Ejemplo de uso

~~~ php
    // Ejemplo 1: notificación sencilla a Teams
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo',
    ]);
    

    // Ejemplo 2: uso de una plantilla de notificación
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Ejemplo 3: sustitución de parámetros
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Prueba ${prms1} ${prms2}',
        'body' => 'Este es el cuerpo. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Ejemplo 4: sustitución de parámetros con un dato personalizado
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Prueba',
        'body' => 'Este es el cuerpo. ${value:contract_code}', // Se sustituye por el valor de contract_code de $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / Clase de gestión de archivos
Es la clase que gestiona los archivos subidos a Exment (archivos de las columnas de archivo y de imagen, archivos adjuntos, imágenes de avatar, etc.).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Propiedades

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| uuid | string | Cadena única con la que se gestiona el archivo. El nombre original del archivo puede repetirse, por eso Exment da un uuid a todos los archivos. |
| file_type | integer | Tipo de archivo (1: columna personalizada, 2: archivo adjunto, 3: avatar, 4: sistema, 5: imagen del formulario, 6: formulario público) |
| local_dirname | string | Nombre del directorio donde está guardado el archivo |
| local_filename | string | Nombre con el que está guardado el archivo (normalmente, uuid + extensión) |
| filename | string | Nombre original del archivo en el momento de subirlo |
| parent_type | string | Nombre de la CustomTable a la que está vinculado el archivo |
| parent_id | string | ID del CustomValue al que está vinculado el archivo |
| custom_column_id | integer | ID de la CustomColumn a la que está vinculado el archivo |
| custom_form_column_id | integer | ID de la CustomFormColumn a la que está vinculado el archivo |
| path | string | Ruta del archivo guardado. No es la ruta completa, sino la ruta relativa desde el almacenamiento de subida. |
| extension | string | Extensión del archivo |



### Lista de funciones

#### (static)getUrl
Devuelve la URL para acceder al archivo.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $path | string | Ruta relativa del archivo |
| $options | array | Array asociativo que indica la forma de obtenerla. <br />asApi : true si quiere obtener la URL de la API. El valor inicial es false  |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | URL del archivo |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// Obtener el dato con id 1 de la tabla de prueba
$value = CustomTable::getEloquent('test')->getValueModel(1);
// Obtener el valor de la columna de archivo (las columnas de archivo y de imagen guardan una ruta relativa)
$file_path = $value->getValue('file');
// Obtener la URL
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
Guarda el contenido del archivo en el almacenamiento y añade un dato a la tabla de gestión de archivos.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $file_type | integer | Tipo de archivo (para los detalles, vea las propiedades) |
| $content | mixed | Contenido del archivo. Se puede indicar un UploadedFile, un String (la cadena que se escribe en el archivo), etc. |
| $dirname | string | Nombre del directorio donde se guarda el archivo |
| $filename | string | Nombre original del archivo |
| $options | array | Array asociativo que indica las opciones al guardar.  |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| File | Instancia del dato añadido a la tabla de gestión de archivos |

##### Ejemplo de uso
Nota: vea saveCustomValue y saveDocumentModel.

---

#### saveCustomValue
Añade la información del CustomValue al dato de la tabla de gestión de archivos.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $custom_value_id | integer | ID del CustomValue |
| $custom_column | mixed | Si el tipo de archivo es columna personalizada, la instancia de CustomColumn / el ID del dato de destino / el nombre de la columna (alfanumérico) |
| $custom_table | mixed | Instancia de CustomTable |
| $replace | bool | true si se sustituyen todos los archivos vinculados a la columna indicada. El valor inicial es false |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| File | Instancia de la tabla de gestión de archivos |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Obtener la tabla de prueba
$custom_table = CustomTable::getEloquent('test');
// Obtener el dato con id=1 de la tabla de prueba
$custom_value = $custom_table->getValueModel(1);
// Obtener la columna file de la tabla de prueba
$file_column = CustomColumn::getEloquent('file', $custom_table);
// Guardar la cadena "hogehoge" en el almacenamiento con el nombre "hoge.txt". Se añade un dato a la tabla de gestión de archivos y se vincula con la columna file del dato con id=1 de la tabla de prueba
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// Actualizar la columna file del dato con id=1 de la tabla de prueba
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
Crea la información del documento a partir del dato de la tabla de gestión de archivos.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instancia de CustomValue a la que se vincula el documento |
| $document_name | string | Nombre de archivo del documento |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| File | Instancia del dato añadido a la tabla de documentos |

##### Ejemplo de uso

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Obtener la tabla de prueba
$custom_table = CustomTable::getEloquent('test');
// Obtener el dato con id=1 de la tabla de prueba
$custom_value = $custom_table->getValueModel(1);

// Guardar la cadena "hogehoge" en el almacenamiento con el nombre "hoge.txt". Se añade un dato a la tabla de gestión de archivos
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// Vincular el dato de la tabla de gestión de archivos con el dato con id=1 de la tabla de prueba
$file = $file->saveCustomValue(1, null, $custom_table);
// Crear la información del documento (vinculada con el dato con id=1 de la tabla de prueba)
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### Nota complementaria: sobre el manejo de los archivos
Si mira la información de una columna de archivo en los datos personalizados de Exment, solo hay puesta una ruta relativa sencilla.  
El archivo real está guardado en el almacenamiento. La tabla de gestión de archivos (files) es la que gestiona la información para acceder a ese archivo del almacenamiento, el tipo de archivo y a qué dato personalizado está vinculado.  
Gestiona de forma transversal archivos muy variados: además de los archivos subidos a las columnas de archivo y de imagen, los archivos adjuntos, las imágenes de avatar, los iconos y logotipos del sistema, etc. (Los archivos adjuntos usan además otra tabla propia, llamada tabla de documentos.)  
Por eso, cuando un plugin pone datos en una columna de archivo o añade archivos adjuntos, hace falta escribir un código algo más complejo que con los campos normales.  
Para más detalles, vea los "Ejemplos de uso" de arriba y los plugins de ejemplo.
