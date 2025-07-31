// components/modals/ReservationModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { calculateNights, getDefaultReservationDates } from '../../utils/dateUtils';
import { generateReservationMessage, openWhatsApp } from '../../utils/whatsapp';

const ReservationModal = ({ isOpen, onClose, selectedRoom = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: 1,
    comments: ''
  });

  // Obtener datos de reserva si vienen del modal de habitación
  const reservationData = typeof window !== 'undefined' ? window.reservationData : null;
  const roomData = selectedRoom || reservationData?.room;

  // Setear fechas por defecto desde reservationData
  useEffect(() => {
    if (reservationData && isOpen) {
      setFormData(prev => ({
        ...prev,
        checkin: reservationData.checkin || '',
        checkout: reservationData.checkout || '',
        guests: reservationData.guests || 1
      }));
    } else if (isOpen && !formData.checkin) {
      // Fechas por defecto si no hay reservationData
      const defaultDates = getDefaultReservationDates();
      setFormData(prev => ({
        ...prev,
        checkin: defaultDates.checkin,
        checkout: defaultDates.checkout
      }));
    }
  }, [isOpen, reservationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcular datos de reserva
    const nights = calculateNights(formData.checkin, formData.checkout);
    const totalPrice = roomData ? roomData.price * nights : 0;
    
    // Generar y enviar mensaje de WhatsApp
    const message = generateReservationMessage(formData, roomData, nights, totalPrice);
    openWhatsApp(message);
    
    // Cerrar modal y limpiar datos
    onClose();
    
    // Limpiar datos globales
    if (typeof window !== 'undefined') {
      window.reservationData = null;
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      checkin: '',
      checkout: '',
      guests: 1,
      comments: ''
    });
  };

  if (!isOpen) return null;

  const nights = calculateNights(formData.checkin, formData.checkout);
  const totalPrice = roomData ? roomData.price * nights : 0;
  const savings = roomData && roomData.originalPrice ? (roomData.originalPrice - roomData.price) * nights : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Solicitar Reserva</h2>
            {roomData && (
              <p className="text-yellow-600 font-medium">{roomData.name}</p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Resumen de habitación si está seleccionada */}
        {roomData && (
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex items-center gap-4">
              <img 
                src={roomData.image} 
                alt={roomData.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{roomData.name}</h3>
                <p className="text-sm text-gray-600">{roomData.subtitle}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500">{roomData.size}</span>
                  <span className="text-sm text-gray-500">Hasta {roomData.capacity} huéspedes</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-600">${roomData.price}</div>
                <div className="text-sm text-gray-500">por noche</div>
              </div>
            </div>
            
            {formData.checkin && formData.checkout && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{nights} {nights === 1 ? 'noche' : 'noches'}</span>
                  <span className="font-medium">${roomData.price * nights}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600">Descuento</span>
                    <span className="text-green-600 font-medium">-${savings}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-yellow-600">${totalPrice}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors" 
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors" 
                placeholder="tu@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono *
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors" 
              placeholder="+593 xxx xxx xxx"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-in *
              </label>
              <input 
                type="date" 
                name="checkin"
                value={formData.checkin}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-out *
              </label>
              <input 
                type="date" 
                name="checkout"
                value={formData.checkout}
                onChange={handleInputChange}
                required
                min={formData.checkin || new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Huéspedes *
              </label>
              <select 
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              >
                {[...Array(roomData ? roomData.capacity : 4)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? 'Huésped' : 'Huéspedes'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Comentarios adicionales
            </label>
            <textarea 
              rows="3" 
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="Solicitudes especiales, preferencias, ocasión especial, etc."
            ></textarea>
          </div>

          {/* Información importante */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Información importante:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Esta es una solicitud de reserva, no una confirmación</li>
              <li>• Te contactaremos vía WhatsApp para confirmar disponibilidad</li>
              <li>• No se requiere pago anticipado para procesar tu solicitud</li>
              <li>• Cancelación gratuita hasta 24 horas antes del check-in</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-yellow-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686z"/>
              </svg>
              Enviar Solicitud por WhatsApp
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;