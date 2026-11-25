# Servidor MCP (uso desde una IA)
Una IA como Claude puede leer los datos de Exment con los mismos permisos del usuario. Exment incluye un servidor MCP (Model Context Protocol).

Nota: esta función se puede usar desde Exment v7.2.1.  
Nota: al principio no se usa. El administrador del sistema debe activar "MCP (conexión desde una IA)" en "Configuración: sistema" → "[Gestión de funciones](/es/feature)" y elegir los grupos de roles que pueden usarla.  
Nota: **solo se puede leer**.

## Cómo conectar
- Dirección: `https://(URL de Exment)/api/mcp` (en un sitio que lleva "/admin", `/admin/api/mcp`)
- Inicio de sesión: envíe una [clave de API](/es/api_key) (o un token de acceso de OAuth) como `Authorization: Bearer ...`

Ejemplo (Claude Code):
~~~
claude mcp add --transport http exment https://(URL de Exment)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## Herramientas disponibles
| Herramienta | Contenido |
|---|---|
| `list_tables` | Lista de las tablas que se pueden ver |
| `get_table` | Las columnas y demás de una tabla |
| `search_data` | Buscar datos (sin palabras, primero los más recientes) |
| `get_data` | Un dato |
| `list_attachments` | Lista de archivos adjuntos (solo el nombre y similares) |
| `get_workflow_status` | El estado del flujo de trabajo |

## Qué devuelve
- Devuelve **solo lo que puede ver el usuario de la clave o del token**. Los permisos de las tablas y de los datos, los ámbitos de la clave (`table_read`, `value_read`, `workflow_read`) y las tablas elegidas para la clave se aplican igual que en la API.
- El número de filas por llamada es `EXMENT_MCP_MAX_ROWS` de `.env` (al principio 50, máximo 100). El número de llamadas por persona y minuto es `EXMENT_MCP_CALLS_PER_MINUTE` (al principio 60).
- Las herramientas usadas quedan en el registro de operaciones (método `MCP`).
- La restricción de IP de la API también se aplica tal cual.

## Temas relacionados
- [Claves de API](/es/api_key)
- [Gestión de funciones](/es/feature)
- [Configuración de la API](/es/api)
