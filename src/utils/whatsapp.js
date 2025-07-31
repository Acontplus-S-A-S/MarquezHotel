// utils/whatsapp.js

/**
 * Número de WhatsApp del hotel
 */
export const WHATSAPP_NUMBER = '593962880127';

/**
 * Genera URL de WhatsApp con mensaje personalizado
 * @param {string} message - Mensaje a enviar
 * @returns {string} URL de WhatsApp
 */
export const generateWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Genera mensaje de WhatsApp para consulta general
 * @returns {string} Mensaje formateado
 */
export const generateGeneralInquiryMessage = () => {
  return "¡Hola! Me interesa hacer una reserva en Hotel El Marquez. ¿Podrían ayudarme con información sobre disponibilidad y tarifas?";
};

/**
 * Genera mensaje de WhatsApp para reserva específica
 * @param {Object} formData - Datos del formulario
 * @param {Object} roomData - Datos de la habitación
 * @param {number} nights - Número de noches
 * @param {number} totalPrice - Precio total
 * @returns {string} Mensaje formateado
 */
export const generateReservationMessage = (formData, roomData, nights, totalPrice) => {
  let message = `¡Hola! Me interesa hacer una reserva en Hotel El Marquez.\n\n`;
  message += `📋 DATOS DE LA RESERVA:\n`;
  message += `• Nombre: ${formData.name}\n`;
  message += `• Email: ${formData.email}\n`;
  message += `• Teléfono: ${formData.phone}\n\n`;
  
  if (roomData) {
    message += `🏨 HABITACIÓN SELECCIONADA:\n`;
    message += `• Tipo: ${roomData.name}\n`;
    message += `• Precio: $${roomData.price}/noche\n\n`;
  }
  
  message += `📅 FECHAS:\n`;
  message += `• Check-in: ${formData.checkin}\n`;
  message += `• Check-out: ${formData.checkout}\n`;
  message += `• Noches: ${nights}\n`;
  message += `• Huéspedes: ${formData.guests}\n\n`;
  
  if (totalPrice > 0) {
    message += `💰 TOTAL ESTIMADO: $${totalPrice}\n\n`;
  }
  
  if (formData.comments) {
    message += `💬 COMENTARIOS:\n${formData.comments}\n\n`;
  }
  
  message += `¿Podrían confirmar disponibilidad y enviarme más detalles?\n\n¡Gracias!`;
  
  return message;
};

/**
 * Abre WhatsApp con mensaje específico
 * @param {string} message - Mensaje a enviar
 */
export const openWhatsApp = (message) => {
  const url = generateWhatsAppUrl(message);
  window.open(url, '_blank');
};