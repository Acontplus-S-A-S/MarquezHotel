// utils/dateUtils.js

/**
 * Obtiene la fecha de hoy en formato YYYY-MM-DD
 * @returns {string} Fecha de hoy
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Obtiene la fecha de mañana en formato YYYY-MM-DD
 * @returns {string} Fecha de mañana
 */
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

/**
 * Obtiene una fecha futura basada en días a agregar
 * @param {number} daysToAdd - Días a agregar a la fecha actual
 * @returns {string} Fecha futura en formato YYYY-MM-DD
 */
export const getFutureDate = (daysToAdd) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysToAdd);
  return futureDate.toISOString().split('T')[0];
};

/**
 * Calcula el número de noches entre dos fechas
 * @param {string} checkin - Fecha de check-in (YYYY-MM-DD)
 * @param {string} checkout - Fecha de check-out (YYYY-MM-DD)
 * @returns {number} Número de noches
 */
export const calculateNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 1;
  
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diffTime = Math.abs(checkoutDate - checkinDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 1;
};

/**
 * Genera fechas por defecto para reserva (mañana y pasado mañana)
 * @returns {Object} Objeto con fechas de check-in y check-out
 */
export const getDefaultReservationDates = () => {
  return {
    checkin: getTomorrowDate(),
    checkout: getFutureDate(2)
  };
};

/**
 * Valida si una fecha es válida y no es en el pasado
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {boolean} True si la fecha es válida
 */
export const isValidFutureDate = (dateString) => {
  if (!dateString) return false;
  
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate >= today;
};

/**
 * Formatea una fecha para mostrar al usuario
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @param {string} locale - Locale para formateo (default: 'es-EC')
 * @returns {string} Fecha formateada
 */
export const formatDisplayDate = (dateString, locale = 'es-EC') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'America/Guayaquil'
  };
  
  return date.toLocaleDateString(locale, options);
};