import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const fetch = await import('node-fetch').then(module => module.default);

  // Información de autenticación y contacto
  const email = 'test-email-a@testing.com'; // Este correo debe corresponder al contacto relacionado al evento
  const apiKey = process.env.HUBSPOT_API_KEY; // Usar variable de entorno

  // Propiedades que deseas actualizar IMPORTANTE, deben asignarse los valores correspondientes al evento reemplazando los valores de ejemplo
  const propertiesToUpdate = {
    "documentos_seleccionados": "false", // true, false
    "plazo": "2",
    "subproducto": "factura", // Usar nombres internos de propiedad
    "total_a_simular": "99999.87", // Usar "." para decimales. El monto se ingresará en HubSpot como $99.999,87
    "cantidad_de_documentos_seleccionados": "1", // Debe enviarse el número de documentos seleccionados
    "tasa_de_simulacion": "0.0057", // Equivale a un 0.57 %
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

  // Función para actualizar propiedades del contacto
  async function updateContactProperties(email, properties) {
    console.log(`Intentando actualizar las propiedades del contacto con email: ${email}`);
    // Buscar el ID del contacto usando el email
    const contactId = await getContactIdByEmail(email);
    if (!contactId) {
      console.error('Contacto no encontrado');
      return;
    }
  
    console.log(`ID del contacto encontrado: ${contactId}`);
  
    // URL de la API para actualizar propiedades del contacto
    const url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
  
    // Realizar la solicitud para actualizar las propiedades del contacto
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ properties: propertiesToUpdate })
    });
  
    if (response.ok) {
      console.log('Propiedades del contacto actualizadas con éxito. Valores actualizados:');
      for (const [key, value] of Object.entries(properties)) {
        console.log(`${key}: ${value}`);
      }
    } else {
      const errorData = await response.json();
      console.error('Error al actualizar las propiedades del contacto:', errorData);
    }
  }
  
  // Función para obtener el ID del contacto usando el email
  async function getContactIdByEmail(email) {
    console.log(`Buscando el contacto con email: ${email}`);
    // URL de la API para buscar contactos
    const url = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
  
    // Cuerpo de la solicitud para buscar el contacto por email
    const requestBody = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }
          ]
        }
      ],
      properties: ['email'],
      limit: 1
    };
  
    // Realizar la solicitud para buscar el contacto
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
  
    console.log(`Respuesta del servidor: ${response.status}`);
    const data = await response.json();
    console.log(`Datos recibidos: ${JSON.stringify(data)}`);
    if (data.results && data.results.length > 0) {
      return data.results[0].id;
    } else {
      return null;
    }
  }

  // Ejecutar la función para actualizar las propiedades del contacto
  updateContactProperties(email, propertiesToUpdate);
})();
