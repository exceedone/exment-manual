# (Para usuarios avanzados) Actualización automática
Esta configuración sirve para actualizar Exment automáticamente cuando sale una versión nueva.  
Se registra en el servidor un proceso que se ejecuta cada día a una hora fija (proceso de actualización periódica).

- Para saber cómo se hace la actualización normal y hasta qué versiones se sube, consulte [Actualización](/es/update).

## Especificación de la actualización automática
El proceso registrado hace lo siguiente cada vez.

- Ejecuta la Web API y obtiene la información de la última versión de Exment (1)
- Obtiene la versión de Exment instalada (2)
- Si (1) es más nueva que (2), ejecuta el batch de actualización
- Si (2) es una versión que empieza por «dev», no se actualiza

## Cómo configurarlo
Los pasos son distintos en Linux y en Windows.

| Servidor | Dónde mirar | Qué se usa |
|---|---|---|
| Linux (incluidos Sakura Internet y XServer) | Pasos de configuración (Linux) | Batch de actualización, ExmentAutoUpdate.bash, jq, cron |
| Windows | Pasos de configuración (Windows) | Batch de actualización, ExmentAutoUpdate.exe, Programador de tareas |

### Pasos de configuración (Linux)
**(1) Colocar el batch de actualización**

Descargue el [batch de actualización](/es/update) y colóquelo en la carpeta del proyecto de Exment.  
Descargue el archivo que corresponda a su entorno.

- En Sakura Internet : ExmentUpdateLinuxSakura.sh
- En XServer : ExmentUpdateLinuxXserver.sh
- En los demás casos : ExmentUpdateLinux.sh

> El script de shell que hace la actualización se ha actualizado. Consulte [Actualización](/es/update) y sustitúyalo.  
Compruebe que en la segunda línea del archivo de shell figura la versión «v1.1.0» o superior.

**(2) Descargar el batch que comprueba si hay actualizaciones**

Ejecute los siguientes comandos en el directorio raíz del proyecto de Exment.

~~~
wget https://exment.net/downloads/cmd/ExmentAutoUpdate.bash
chmod 775 ExmentAutoUpdate.bash
~~~

**(3) Instalar «jq»**

Se usa una biblioteca llamada «jq». Compruebe con el siguiente comando si el comando «jq» está instalado.

```
jq --help
```

- Si aparece algo como «comando no encontrado», el comando jq no está instalado.  
Instale el comando jq con [el método de la documentación oficial](https://stedolan.github.io/jq/download/).

**(4) Escribir la ubicación de composer en el batch de actualización**

Busque la ruta de composer. Ejecute el siguiente comando en cualquier ruta y copie el resultado.

```
which composer
# Ejemplo de resultado
# /home/xxx/usr/local/bin/composer
```

Edite el archivo descargado ExmentUpdateLinux.sh (o ExmentUpdateLinuxSakura.sh, ExmentUpdateLinuxXserver.sh).  
Cambie el valor de composer_path del archivo por el resultado de «which composer».

```
# composer_path=''
# Cámbielo como sigue
composer_path='/home/xxx/usr/local/bin/composer'
```

**(5) Registrar en cron**

Ejecute el siguiente comando.

~~~
crontab -e
~~~

Aparece la pantalla de configuración de Cron. Escriba el siguiente contenido.

~~~

###Añada la siguiente línea
(minuto de ejecución) (hora de ejecución) * * * cd /(directorio raíz de Exment); bash ExmentAutoUpdate.bash
# Ejemplo: ejecutar cada día a las 3:00 el Exment que está en la ruta /var/www/exment
0 3 * * * cd /var/www/exment; bash ExmentAutoUpdate.bash >> storage/logs/ExmentAutoUpdate.log  2>&1
~~~


#### En XServer, haga además lo siguiente

- Ejecute el siguiente comando y busque la ruta HOME.

```
echo $HOME
# Ejemplo de resultado
# /home/xxx
```

- Después, edite el archivo descargado ExmentUpdateLinuxXserver.sh.  
Cambie el valor de home_path por el resultado de «echo $HOME».

```
# home_path=''
# Cámbielo como sigue. No ponga «/» al final
home_path='/home/xxx'
```


#### Fin de la configuración
- Con esto, ExmentAutoUpdate.bash se ejecuta cada día a la hora fijada. Si hay una versión nueva, se actualiza automáticamente.
- El registro de ejecución de la actualización automática queda en storage/logs/ExmentAutoUpdate.log.




### Pasos de configuración (Windows)
**(1) Colocar el batch de actualización y el programa de actualización automática**

1. Descargue el [batch de actualización ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) y colóquelo en la carpeta del proyecto de Exment.

2. Descargue [aquí](https://exment.net/downloads/cmd/ExmentAutoUpdateWindows.zip) el zip del programa de actualización automática.

3. Descomprima el archivo zip descargado y coloque la carpeta "ExmentAutoUpdateWindows" entera en la carpeta del proyecto de Exment.

```
# Estructura de carpetas (parte)
- app
- bootstrap
- config
- ExmentUpdateWindows.bat
- ExmentAutoUpdateWindows
    - ExmentAutoUpdate.exe
    - ExmentAutoUpdate.exe.config
    - Newtonsoft.Json.dll
```

**(2) Registrar en el Programador de tareas**

1. En el menú de Windows, escriba «task» e inicie el Programador de tareas.  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows2.png)

2. En el Programador de tareas, haga clic en «Crear tarea».  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows6.png)

3. En la pestaña «General», configure como sigue. («Nombre» puede ser cualquier nombre.)  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows1.png)

4. Haga clic en la pestaña «Desencadenadores». Cree un desencadenador.  
    (1) Haga clic en el botón «Nuevo».  
    Después, escriba lo siguiente.  
    - Iniciar la tarea: Según una programación
    - Inicio: la hora de ejecución, en la fecha de inicio
    - Intervalo: 1 día
    - Marque «Habilitado»  
    Cuando termine, haga clic en «Aceptar».  
![Configuración del Programador de tareas de Windows](../ja/img/quickstart/task_update_windows1.png)

5. En la pestaña «Acciones», haga clic en el botón «Nuevo».  
Después, escriba lo siguiente.
    - Acción: Iniciar un programa
    - Programa o script: la ruta hasta el «ExmentAutoUpdate.exe» que ha colocado

    ![Configuración del Programador de tareas de Windows](../ja/img/quickstart/task_update_windows2.png)

6. En un portátil, en la pestaña «Condiciones», quite la marca de «Iniciar la tarea solo si el equipo está conectado a la corriente alterna».  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows9.png)

7. Cuando haya configurado todo esto, haga clic en Aceptar.  
Después aparece una pantalla para escribir las credenciales del usuario. Escriba la contraseña.  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows7.png)

8. Cuando termine la configuración, en «Biblioteca del Programador de tareas» elija la tarea creada y haga clic en «Ejecutar».  
![Configuración del Programador de tareas de Windows](../img/quickstart/task_windows8.png)

Con esto termina la configuración.





#### Fin de la configuración
- Con esto, ExmentAutoUpdate.exe se ejecuta cada día a la hora fijada. Si hay una versión nueva, se actualiza automáticamente.

