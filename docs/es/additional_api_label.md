# Añadir la columna label en la API
Al obtener una lista de datos con la API, o al crear o actualizar datos, se puede añadir la columna "label" al resultado. En esta página se explica cómo configurarlo.

- La columna "label" es el texto que se decide con la [Configuración de columnas de encabezado](/es/table) de los datos. Se muestra en las sugerencias de la barra de búsqueda y en las listas de opciones.
- Hay 2 formas de configurarlo. Consulte más abajo el "Método 1" (añadirla en todas las API) o el "Método 2" (añadirla solo en esa petición).

> En v3.1.1 y anteriores, la columna label se mostraba de forma predeterminada. Para mejorar el rendimiento, ahora no se obtiene de forma predeterminada.  
Por eso, si quiere obtener la columna label, aplique esta configuración.

### Con la configuración de label (extracto)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null,
            "label": "admin"
        }
    ]
}
~~~

### Sin la configuración de label (extracto)

~~~
{
    "data": [
        {
            "id": 1,
            "suuid": "16fc14bdcea8eef51303",
            "parent_type": null,
            "parent_id": null,
            "value": {
                "user_code": "admin",
                "user_name": "admin",
                "email": "admin@admin.admin"
            },
            "created_at": "2020-02-22 23:43:59",
            "updated_at": "2020-02-22 23:43:59",
            "deleted_at": null,
            "deleted_user_id": null,
            "created_user_id": null,
            "updated_user_id": null
        }
    ]
}
~~~


### Método 1: añadirlo al archivo .env
La columna label se añade en todas las API.  
Añada lo siguiente al archivo .env.

~~~
EXMENT_API_APPEND_LABEL=true
~~~

### Método 2: añadir "label=1" a los valores de la petición
La columna label se añade solo en esa petición.  
Al ejecutar la API, añada "label=1". El lugar donde se añade es el siguiente.

| Qué se ejecuta | Dónde se añade "label=1" |
| ---- | ---- |
| Obtener datos | Cadena de consulta |
| Añadir datos nuevos | Valores POST |
| Actualizar datos | Valores PUT |


[←Volver a la lista de configuración adicional](/es/quickstart_more)