# Notificar al chat personal de Teams

Una notificación se puede enviar directamente al **chat personal de Teams** de cada persona (Exment 7.2.6 o posterior).
Exment envía el contenido de la notificación a un **flujo de trabajo** de Teams (Power Automate), y el flujo de trabajo lo publica en el chat de esa persona como bot (bot de flujo).

- Se envían el asunto, el cuerpo y el enlace al dato. En Teams llega como una tarjeta (Adaptive Card): el asunto es un título en negrita, el cuerpo conserva sus párrafos y sus listas numeradas, y lleva un botón "Abrir"
- El asunto y el cuerpo de la plantilla de notificación se usan en el idioma de quien la recibe ([idioma del usuario](/es/user_locale))
- La cuenta de Teams de destino es la **dirección de correo electrónico** del usuario de Exment

> El método actual para enviar a un canal ([Webhook](/es/notify_webhook), Microsoft Teams) usa los conectores de Office 365, que Microsoft va a retirar. Con el mismo flujo de trabajo también se puede enviar a un canal (vea "Enviar a un canal" más abajo).

## 1. Crear el flujo de trabajo en Teams

Lo crea una persona de la organización de Teams (se ejecuta con la cuenta de quien lo crea).

1. En Teams, abra **Flujos de trabajo** (Workflows) desde "Aplicaciones", a la izquierda, y elija "Crear" → "Crear desde cero"
2. Como desencadenador, elija **"Cuando se recibe una solicitud de webhook de Teams"** (When a Teams webhook request is received)
   - En "Quién puede desencadenar el flujo", elija **"Cualquiera"** (Anyone). Las solicitudes de Exment se aceptan solo por conocer la dirección. **Mantenga la dirección en secreto**
3. Con "Nuevo paso", añada **"Publicar tarjeta en un chat o canal"** (Post card in a chat or channel)
   - Publicar como: **Bot de flujo**
   - Publicar en: **Chat con el bot de flujo**
   - Destinatario: en "Expresión", escriba `triggerBody()?['to_email']`
   - Tarjeta adaptable: en "Expresión", escriba `triggerBody()?['card']`
4. Al guardar, el desencadenador obtiene una **URL de HTTP POST**. Cópiela

### El JSON que envía Exment

El flujo de trabajo recibe un JSON con la forma siguiente. La tarjeta (`card`) la crea Exment, así que el flujo de trabajo solo tiene que publicarla tal cual.

```json
{
  "to_email": "user1@example.com",
  "title": "Incidencia actualizada (ISS00423)",
  "body": "**No se puede iniciar sesión**\n\n1. El estado ha cambiado a En curso",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "Seiji Noro",
  "locale": "es",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

Si usa el "Esquema JSON del cuerpo de la solicitud" del desencadenador, escriba lo siguiente.

```json
{
  "type": "object",
  "properties": {
    "to_email": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "url": { "type": ["string", "null"] },
    "sender": { "type": ["string", "null"] },
    "locale": { "type": "string" },
    "card": { "type": "object" }
  }
}
```

## 2. Configurarlo en Exment

1. En "Configuración de administración" → "Gestión de funciones", ponga **"Notificaciones de Teams (chat personal)"** en "Usar" (al principio no se usa)
2. En "Configuración del sistema" (Configuración detallada), en **"Teams (flujo de trabajo)"**, escriba la URL copiada en "Nueva dirección" y guarde
   - La dirección es un valor secreto: después de guardarla, no se vuelve a mostrar en la pantalla (solo aparece "Configurada (no se muestra)"). Si guarda con el campo vacío, se sigue usando la dirección actual. Para quitarla, active "Eliminar la dirección" y guarde
   - La dirección tampoco aparece en el registro de operaciones
3. En la configuración de la notificación ([Notificación](/es/notify)), elija **"Teams (personal)"** en "Acción de notificación" y elija los destinatarios (columnas de usuario u organización, el creador, etc.)

## Enviar a un canal

En el flujo de trabajo, ponga **Canal** en "Publicar en" y elija el equipo y el canal (la expresión del destinatario no hace falta). En Exment, deje un solo destinatario en esa notificación: se envía una vez por persona, así que, con muchos destinatarios, la misma tarjeta se publica muchas veces.

## Si no llega

- Si en el registro de Exment (storage/logs) aparece "the Teams workflow answered …", mire el motivo en el historial de ejecuciones del flujo de trabajo (Flujos de trabajo de Teams → ese flujo → historial de ejecuciones)
- Si no se encuentra el destinatario, compruebe que la dirección de correo electrónico del usuario de Exment sea la misma que la de la cuenta de Teams (la dirección de la organización)
- Si no pasa nada, compruebe que "Notificaciones de Teams (chat personal)" esté en "Usar" en la gestión de funciones y que la dirección esté escrita en la configuración del sistema
