# HubSpot Autofactoring

Este proyecto se encarga de actualizar las propiedades de contactos en HubSpot basándose en eventos específicos. Utiliza la API de HubSpot para buscar y actualizar contactos de manera automatizada.

## Descripción

El script `scripta.js` realiza las siguientes acciones:

1. **Buscar el ID de un contacto** usando su correo electrónico.
2. **Actualizar las propiedades del contacto** con valores proporcionados en el script.

## Requisitos

- Node.js
- npm
- Cuenta de HubSpot con acceso a la API

## Instalación

1. **Configurar el entorno**:

   - Asegúrate de tener Node.js y npm instalados en tu sistema.
   - Abre una terminal y navega a la carpeta del proyecto.
2. **Instalar dependencias**:

   - En la terminal, ejecuta:
     ```bash
     npm install
     ```
3. **Configurar variables de entorno**:

   - Crea un archivo `.env` en la raíz del proyecto y añade tu clave API de HubSpot:
     ```plaintext
     HUBSPOT_API_KEY=tu-api-key-aqui
     ```

## Uso

1. **Editar `scripta.js`**:

   - Asegúrate de que el correo electrónico y las propiedades a actualizar sean correctas:
     ```javascript
     const email = 'test-email-a@testing.com'; // Correo del contacto relacionado al evento
     const propertiesToUpdate = {
       // Propiedades a actualizar con sus valores correspondientes
       "documentos_seleccionados": "false",
       "plazo": "2",
       "subproducto": "factura",
       "total_a_simular": "99999.87",
       "cantidad_de_documentos_seleccionados": "1",
       "tasa_de_simulacion": "0.0057", // Equivale a un 0.57%
       "porcentaje_de_anticipo": "0.95", // Equivale a un 95%
       "monto_documento": "9999999",
       "ultimo_monto_financiado": "9999999",
       "diferencia_de_precio": "9999999",
       "ultima_comision": "9999999",
       "ultimo_iva": "9999999",
       "ultimos_gastos": "9999999",
       "ultima_aplicacion": "9999999",
       "ultimo_monto_a_girar": "9999999"
     };
     ```
2. **Ejecutar el script**:

   - En la terminal, ejecuta:
     ```bash
     node scripta.js
     ```

## URLs usadas

1. **Buscar el ID del contacto**:
   ```http
   POST https://api.hubapi.com/crm/v3/objects/contacts/search
   ```
