# Referencia de plugins
Esta página es para quienes desarrollan plugins.  
Para cada tipo de plugin, reúne la clase que se hereda y las funciones y propiedades que se pueden usar en esa clase.

- Para las funciones de las tablas personalizadas, las columnas personalizadas y los datos personalizados, consulte la [Referencia de funciones](/es/func_reference).
- Para una explicación detallada del plugin (Página CRUD), consulte la [Referencia de plugins (Página CRUD)](/es/plugin_reference_crud).
- Las clases de la biblioteca de la pantalla de administración están escritas con el espacio de nombres de Exment v7.0.0 o posterior ("ExmentAdminCore\Admin"). Si usa v6.x o anterior, léalo como "Encore\Admin". Para más detalles, consulte [Procedimiento de actualización v7.0.0](/update/v7_0_0) (inglés).



## PluginBase / Clase común de los plugins

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| plugin | Plugin | Instancia Eloquent del plugin |
| pluginOptions | PluginOptionBase | Instancia de la clase que guarda las distintas propiedades del plugin (hereda PluginOptionBase) |
| useCustomOption | bool | Si se usa o no la configuración propia del plugin. El valor inicial es false |

Nota: antes, las propiedades se definían directamente en la clase abstracta de cada tipo de plugin. Con ese método, un nombre puede chocar con el de una propiedad definida por el usuario.  
Por eso, las propiedades que se añaden en v4.2.2 o posterior se definen dentro de pluginOptions.  Se puede acceder a ellas con "$this->pluginOptions->nombre de la propiedad". Las propiedades que ya existían se pueden seguir usando como hasta ahora, para mantener la compatibilidad.

### Lista de funciones

#### setCustomOptionForm
Define la configuración propia del plugin. Para más detalles, consulte [esta página](/es/plugin_quickstart).  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Instancia del formulario de la biblioteca de la pantalla de administración (exment-admin-core; laravel-admin en v6.x o anterior) |

##### Valor devuelto
Ninguno

##### Ejemplo de uso
Consulte [esta página](/es/plugin_quickstart).

---



## PluginApiBase
Es la clase abstracta del plugin (API). Si desarrolla un plugin de API, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_api).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### Propiedades
Ninguna

### Lista de funciones

#### getRouteUri
Obtiene el endpoint de la API propia.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $endpoint | string | URL del endpoint que se añade. El valor inicial es null |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Endpoint de la API propia |


---




## PluginBatchBase
Es la clase abstracta del plugin (Lote). Si desarrolla un plugin de lote, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_batch).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Propiedades

##### PluginOptionBatch (hereda PluginOptionBase)
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| command_options | array | Argumentos de la línea de comandos que se pasaron al lote |

### Lista de funciones

#### execute
Ejecuta el lote. Escriba dentro de esta función el proceso que quiere ejecutar.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---




## PluginButtonBase
Es la clase abstracta del plugin (Botón). Si desarrolla un plugin de botón, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_button).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| custom_value | CustomValue | Cuando se pulsa el botón en la pantalla de detalle, instancia Eloquent de los datos personalizados de esa página |
| selected_custom_values | array | Cuando se pulsa el botón en la pantalla de lista, array de las instancias Eloquent de los datos personalizados seleccionados |


### Lista de funciones

#### execute
Ejecuta el proceso que se hace al pulsar el botón. Escriba dentro de esta función el proceso que quiere ejecutar.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---

#### render
Dibuja el botón de forma propia.  
Si quiere darle un aspecto especial o incrustar un script propio, escríbalo dentro de esta función.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string,Renderable | Botón dibujado de forma propia |


---



## PluginDashboardBase
Es la clase abstracta del plugin (Panel). Si desarrolla un plugin de panel, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_dashboard).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | Instancia del Box del panel que se colocó |


### Lista de funciones

#### header
Devuelve el HTML de la parte del encabezado del BOX del panel.  
Si quiere mostrar HTML en la parte del encabezado, añada dentro de esta función, en el archivo del plugin que hereda la clase, el proceso que devuelve el HTML.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | HTML de la parte del encabezado |

---


#### body
Devuelve el HTML de la parte del cuerpo del BOX del panel.  
Si quiere mostrar HTML en la parte del cuerpo, añada dentro de esta función, en el archivo del plugin que hereda la clase, el proceso que devuelve el HTML.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | HTML de la parte del cuerpo |

---


#### footer
Devuelve el HTML de la parte del pie del BOX del panel.  
Si quiere mostrar HTML en la parte del pie, añada dentro de esta función, en el archivo del plugin que hereda la clase, el proceso que devuelve el HTML.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | HTML de la parte del pie |

---

#### getDashboardUri
Obtiene el endpoint de cada BOX del panel.  
Si dentro del BOX del panel hace GET, POST, PUT, etc. de valores, use esta función para obtener la parte de la URI.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $endpoint | string | URL del endpoint que se añade. El valor inicial es null |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Endpoint hasta el BOX del panel |


---



## PluginDocumentBase
Es la clase abstracta del plugin (Documento). Si desarrolla un plugin de documento, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_document).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| custom_value | CustomValue | Instancia de los datos personalizados |
| document_value | CustomValue | Instancia de los datos del documento generado (solo se puede consultar dentro de la función executed) |


### Lista de funciones

#### (protected)executing
Es la función que se llama antes de generar el documento.  
Use esta función si necesita un proceso propio, por ejemplo, si quiere guardar un valor en los datos personalizados antes de la ejecución.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---

#### (protected)executed
Es la función que se llama después de generar el documento.  
Use esta función si necesita un proceso propio.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---




## PluginEventBase
Es la clase abstracta del plugin (Evento). Si desarrolla un plugin de evento, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_event).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| custom_value | CustomValue | Instancia Eloquent de los datos personalizados (null en los eventos que no tienen que ver con datos personalizados) |
| isCreate | bool | Si son datos recién creados o no |
| isDelete | bool | Si son datos eliminados o no |

##### PluginOptionEvent (hereda PluginOptionBase)
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| is_modal | bool | Si la página donde ocurrió el evento es un formulario modal o no |
| event_type | PluginEventType | Tipo de evento<br>(loading: al cargar, saving: antes de guardar, saved: después de guardar, workflow_action_executing: justo antes de ejecutar el flujo de trabajo, workflow_action_executed: justo después de ejecutar el flujo de trabajo, notify_executing: justo antes de ejecutar la notificación, notify_executed: después de ejecutar la notificación) |
| page_type | PluginPageType | Tipo de la página donde ocurrió el evento<br>(list: pantalla de lista, create: pantalla de creación, edit: pantalla de edición, show: pantalla de detalle) |


### Lista de funciones

#### execute
Escriba dentro de esta función el proceso que quiere ejecutar cuando ocurre el evento.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---



## PluginExportBase
Es la clase abstracta del plugin (Exportación). Si desarrolla un plugin de exportación, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_export).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |


### Lista de funciones

#### defaultProvider
Es la función que establece el proveedor de exportación predeterminado.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| default_provider | ProviderBase | Instancia del proveedor de exportación |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| PluginExportBase | Instancia de esta clase |

---

#### viewProvider
Es la función que establece el proveedor de vista.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| view_provider | ProviderBase | Instancia del proveedor de vista para la exportación |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| PluginExportBase | Instancia de esta clase |

---


#### execute
Es la función que se llama como proceso de exportación.  
Implemente en esta función el proceso de exportación.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---


#### getFileName
Es la función que establece el nombre del archivo que se descarga como resultado del proceso de exportación.  

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Nombre del archivo de descarga del resultado de la exportación |


---






## PluginImportBase
Es la clase abstracta del plugin (Importación). Si desarrolla un plugin de importación, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_import).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| file | File | Archivo importado desde la pantalla |


### Lista de funciones

#### execute
Es la función que se llama como proceso de importación.  
Añada en esta función el proceso de importación.

##### Argumentos
Ninguno

##### Valor devuelto
Ninguno

---




## PluginPageBase
Es la clase abstracta del plugin (Página). Si desarrolla un plugin de página, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_page).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| showHeader | bool | Si se muestran o no el icono y el título en la parte del encabezado, arriba de la página. true: se muestran / false: no se muestran. El valor inicial es true |

### Lista de funciones

#### getRouteUri
Obtiene el endpoint de la página propia.  
Si en la página propia hace GET, POST, PUT, etc., use esta función para obtener la parte de la URI.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $endpoint | string | URL del endpoint que se añade. El valor inicial es null |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string | Endpoint de la página propia |

---



## PluginPublicBase
Es la clase abstracta del plugin (Script, Estilo). Si desarrolla un plugin de script o un plugin de estilo, herede esta clase.  
Para más detalles, consulte [Plugin (Script)](/es/plugin_quickstart_script) o [Plugin (Estilo)](/es/plugin_quickstart_style).

- namespace Exceedone\Exment\Services\Plugin

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| plugin | Plugin | Instancia Eloquent del plugin |

### Lista de funciones

#### css
Es la función que obtiene las rutas de los archivos CSS.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| skipPath | bool | Póngalo en true si los archivos css están guardados directamente en la carpeta public. (El valor inicial es false) |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| array | Array de las rutas de los archivos CSS |

---

#### js
Es la función que obtiene las rutas de los archivos js.  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| skipPath | bool | Póngalo en true si los archivos js están guardados directamente en la carpeta public. (El valor inicial es false) |


##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| array | Array de las rutas de los archivos js |


---



## PluginValidatorBase
Es la clase abstracta del plugin (Validación). Si desarrolla un plugin de validación, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_validate).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| original_value | CustomValue | Instancia de los datos personalizados antes del cambio |
| input_value | array | Array asociativo que guarda los valores introducidos en la pantalla (clave: nombre de la columna, valor: valor introducido) |
| called_type | ValidateCalledType | Tipo de origen de la llamada<br>(form: formulario, import: importación, api: API) |
| messages | array | Guarda los mensajes de error<br>(clave: nombre de la columna, valor: mensaje de error; si hay varios, un array) |


### Lista de funciones

#### validate
Ejecuta la validación. Escriba dentro de esta función el proceso que quiere ejecutar.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| boolean | Resultado de la validación (true: correcto, false: hay errores) |

#### validateDestroy
Ejecuta la validación antes de eliminar los datos personalizados. Escriba dentro de esta función el proceso que quiere ejecutar.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instancia de los datos personalizados  |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| array | Resultado de la validación y mensaje (true: correcto, false: hay errores) |

~~~ php
        [
            'status'  => false,
            'message' =>  'No se pueden eliminar los datos de prioridad alta.',
        ]
~~~


---





## PluginViewBase
Es la clase abstracta del plugin (Vista). Si desarrolla un plugin de vista, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_view).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instancia de la tabla personalizada |
| custom_view | CustomView | Instancia de la vista personalizada |
| useBox | bool | Si se muestran o no los botones en la lista |
| useBoxButtons | array | Qué botones se muestran<br>(newButton: nuevo, menuButton: menú, viewButton: vista) |


### Lista de funciones

#### grid
Es la función que se llama como proceso de visualización de la lista.  

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| string,Renderable | Contenido que se muestra en la cuadrícula |

---

#### setViewOptionForm
Define la configuración propia de la vista. Para más detalles, consulte [esta página](/es/plugin_quickstart).  

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Instancia del formulario de la biblioteca de la pantalla de administración (exment-admin-core; laravel-admin en v6.x o anterior) |

##### Valor devuelto
Ninguno

---






## PluginCrudBase
Es la clase abstracta del plugin (Página CRUD). Si desarrolla un plugin de página CRUD, herede esta clase.  
Para más detalles, consulte [esta página](/es/plugin_quickstart_crud).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Propiedades
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| title | string | Título que se muestra en cada página del plugin |
| description  | string | Texto explicativo que se muestra en cada página del plugin |
| icon | string | Icono que se muestra en cada página del plugin |


### Lista de funciones (el desarrollador debe implementarlas)

#### getFieldDefinitions
Es la función que devuelve la definición de las columnas como array asociativo. Escriba la definición de los elementos que se muestran en cada página.

##### Argumentos
Ninguno

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| array | Devuelve la definición de los elementos de cada página como array asociativo |

##### Valor devuelto: definición del array asociativo
| Tipo | Descripción |
| ---- | ---- |
| key | Nombre del elemento, que se usa para obtener los datos, como name de cada elemento HTML, etc. Escríbalo con caracteres alfanuméricos |
| label | Texto que se usa como nombre del elemento en la pantalla de lista, etc. |
| grid | Póngalo en los elementos que se muestran en la pantalla de lista. Escriba un número entero con el orden de visualización |
| show | Póngalo en los elementos que se muestran en la pantalla de detalle. Escriba un número entero con el orden de visualización |
| create | Póngalo en los elementos que se muestran en la pantalla de creación. Escriba un número entero con el orden de visualización |
| edit | Póngalo en los elementos que se muestran en la pantalla de edición. Escriba un número entero con el orden de visualización |


##### Ejemplo de implementación

``` php
/**
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Nombre de la ciudad', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Código de país', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Población', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }
```

#### getPaginate
Es la función que obtiene la lista de datos en formato de paginación.  
Devuelva los datos obtenidos en formato LengthAwarePaginator.  
Además, cada elemento de la lista debe ser un array asociativo, y las claves de ese array asociativo deben ser las mismas que las claves definidas en getFieldDefinitions.  
Nota: si se hace una búsqueda en la pantalla, el argumento $options recibe un valor.

##### Argumentos
| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| $options | array | Recibe los valores de las opciones cuando se llama desde la pantalla de lista |

##### Valor devuelto
| Tipo | Descripción |
| ---- | ---- |
| LengthAwarePaginator | Lista de los datos obtenidos |

##### Ejemplo de implementación
Consulte la [Referencia de plugins (Página CRUD)](/es/plugin_reference_crud).






