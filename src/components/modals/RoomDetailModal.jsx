// components/modals/RoomDetailModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Star, Users, MapPin, Award, Calendar, ChevronDown, Check } from 'lucide-react';
import { calculateNights, getDefaultReservationDates } from '../../utils/dateUtils';

const RoomDetailModal = ({ room, onClose, onBookNow }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState({
    checkin: '',
    checkout: ''
  });
  const [guests, setGuests] = useState(1);

  if (!room) return null;

  // Setear fechas por defecto al abrir el modal
  useEffect(() => {
    if (room && (!selectedDate.checkin || !selectedDate.checkout)) {
      const defaultDates = getDefaultReservationDates();
      setSelectedDate(defaultDates);
    }
  }, [room]);

  const handleReservation = () => {
    // Crear objeto con datos de reserva
    const nights = calculateNights(selectedDate.checkin, selectedDate.checkout);
    const totalPrice = room.price * nights;
    const savings = room.originalPrice ? (room.originalPrice - room.price) * nights : 0;

    const reservationData = {
      room: room,
      checkin: selectedDate.checkin,
      checkout: selectedDate.checkout,
      guests: guests,
      nights: nights,
      totalPrice: totalPrice,
      savings: savings
    };
    
    // Pasar datos al modal de reservas
    if (typeof window !== 'undefined') {
      window.reservationData = reservationData;
    }
    
    // Cerrar modal actual y abrir modal de reservas
    onClose();
    onBookNow();
  };

  const nights = calculateNights(selectedDate.checkin, selectedDate.checkout);
  const totalPrice = room.price * nights;
  const savings = room.originalPrice ? (room.originalPrice - room.price) * nights : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          {/* Galería de imágenes */}
          <div className="relative">
            <img 
              src={room.gallery ? room.gallery[selectedImageIndex] : room.image} 
              alt={`${room.name} - Imagen ${selectedImageIndex + 1}`}
              className="w-full h-80 md:h-96 object-cover"
            />
            
            {/* Navegación de galería */}
            {room.gallery && room.gallery.length > 1 && (
              <>
                <button 
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : room.gallery.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                >
                  <ChevronDown className="rotate-90" size={20} />
                </button>
                <button 
                  onClick={() => setSelectedImageIndex(prev => prev < room.gallery.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                >
                  <ChevronDown className="-rotate-90" size={20} />
                </button>
                
                {/* Indicadores de galería */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {room.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Badges superpuestos */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {room.subtitle}
              </div>
              {room.rating && (
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="fill-current" size={14} />
                  {room.rating}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{room.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{room.description}</p>
                
                {/* Características principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="text-yellow-600 mx-auto mb-2" size={24} />
                    <div className="text-sm text-gray-600">Huéspedes</div>
                    <div className="font-semibold">{room.capacity}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="text-yellow-600 mx-auto mb-2" size={24} />
                    <div className="text-sm text-gray-600">Tamaño</div>
                    <div className="font-semibold">{room.size}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="text-yellow-600 mx-auto mb-2" size={24} />
                    <div className="text-sm text-gray-600">Vista</div>
                    <div className="font-semibold text-xs">{room.view}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="text-yellow-600 mx-auto mb-2 fill-current" size={24} />
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="font-semibold">{room.rating}</div>
                  </div>
                </div>
              </div>

              {/* Destacados */}
              {room.highlights && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">✨ Destacados</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.highlights.map((highlight, i) => (
                      <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Amenidades completas */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🏨 Amenidades Incluidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {room.amenities?.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="text-yellow-600" size={16} />
                      </div>
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Características adicionales */}
              {room.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">🛏️ Características</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {room.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Minigalería clickeable */}
              {room.gallery && room.gallery.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">📸 Galería</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {room.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative overflow-hidden rounded-lg transition-all ${
                          index === selectedImageIndex ? 'ring-2 ring-yellow-600' : 'hover:opacity-75'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Vista ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Panel de reserva */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {room.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${room.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-yellow-600">${room.price}</span>
                  </div>
                  <div className="text-sm text-gray-600">por noche</div>
                  {savings > 0 && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      ¡Ahorras ${savings} en total!
                    </div>
                  )}
                </div>

                {/* Formulario de fechas */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                    <input 
                      type="date" 
                      value={selectedDate.checkin}
                      onChange={(e) => setSelectedDate(prev => ({...prev, checkin: e.target.value}))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                    <input 
                      type="date" 
                      value={selectedDate.checkout}
                      onChange={(e) => setSelectedDate(prev => ({...prev, checkout: e.target.value}))}
                      min={selectedDate.checkin || new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Huéspedes</label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      {[...Array(room.capacity)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Huésped' : 'Huéspedes'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resumen de precio */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">${room.price} x {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                    <span className="font-medium">${room.price * nights}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-green-600">Descuento</span>
                      <span className="text-green-600 font-medium">-${savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-yellow-600">${totalPrice}</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                  <button 
                    onClick={handleReservation}
                    disabled={!selectedDate.checkin || !selectedDate.checkout}
                    className="w-full bg-yellow-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar size={20} />
                    Reservar Ahora
                  </button>
                  
                  <button 
                    onClick={onClose}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>

                {/* Información adicional */}
                <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
                  <p>✅ Cancelación gratuita hasta 24h antes</p>
                  <p>✅ Reserva sin tarjeta de crédito</p>
                  <p>✅ Confirmación inmediata por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;