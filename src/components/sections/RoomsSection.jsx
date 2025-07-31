// components/sections/RoomsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MapPin, Check, Award, Calendar, ChevronDown } from 'lucide-react';
import { rooms } from '../../data/rooms';

const RoomsSection = ({ onRoomSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rooms.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleReserveRoom = (room) => {
    // Pasar la habitación seleccionada al modal de reservas
    window.selectedRoom = room;
    // Abrir modal de reservas
    const reservationEvent = new CustomEvent('openReservationModal', { 
      detail: { room: room }
    });
    window.dispatchEvent(reservationEvent);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nuestras <span className="text-yellow-600">Habitaciones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Espacios únicos diseñados para brindar el máximo confort durante tu estadía en la Amazonía ecuatoriana.
          </p>
        </motion.div>

        {/* Carrusel Principal */}
        <div className="relative max-w-7xl mx-auto">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {rooms.map((room, index) => (
              <div key={room.id} className="w-full flex-shrink-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Imagen de la habitación */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay con información rápida */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-6 left-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(Math.floor(room.rating))].map((_, i) => (
                              <Star key={i} className="text-yellow-400 fill-current" size={16} />
                            ))}
                            <span className="text-sm font-medium">{room.rating}</span>
                          </div>
                          <p className="text-sm opacity-90">{room.view}</p>
                        </div>
                        
                        {/* Badge de precio */}
                        <div className="absolute top-6 right-6">
                          <div className="bg-yellow-600 text-white px-4 py-2 rounded-full font-bold">
                            {room.originalPrice && (
                              <span className="text-sm line-through opacity-70">${room.originalPrice}</span>
                            )}
                            <span className="text-lg ml-2">${room.price}</span>
                            <span className="text-sm">/noche</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mini galería */}
                    <div className="flex gap-2 mt-4">
                      {room.gallery?.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="flex-1">
                          <img 
                            src={img} 
                            alt={`${room.name} ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Información de la habitación */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="lg:pl-8"
                  >
                    <div className="mb-6">
                      <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">
                        {room.subtitle}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        {room.name}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    {/* Características principales */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="text-yellow-600" size={20} />
                        <span className="text-gray-700">Hasta {room.capacity} huéspedes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-yellow-600" size={20} />
                        <span className="text-gray-700">{room.size}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {room.highlights && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Destacados:</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.highlights.map((highlight, i) => (
                            <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Amenidades principales */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-800 mb-3">Amenidades incluidas:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities?.slice(0, 6).map((amenity, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="text-yellow-600 flex-shrink-0" size={16} />
                            <span className="text-gray-600 text-sm">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => onRoomSelect(room)}
                        className="flex-1 bg-yellow-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        <Award size={20} />
                        Ver Detalles Completos
                      </button>
                      <button 
                        onClick={() => handleReserveRoom(room)}
                        className="flex-1 border-2 border-yellow-600 text-yellow-600 py-4 px-6 rounded-xl font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Calendar size={20} />
                        Reservar Ahora
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles del carrusel */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
          >
            <ChevronDown className="rotate-90" size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
          >
            <ChevronDown className="-rotate-90" size={24} />
          </button>
        </div>

        {/* Indicadores del carrusel */}
        <div className="flex justify-center mt-8 gap-3">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-yellow-600 rounded-full' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
            />
          ))}
        </div>

        {/* Vista rápida de todas las habitaciones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentSlide 
                  ? 'ring-4 ring-yellow-600 shadow-xl scale-105' 
                  : 'hover:shadow-lg hover:scale-102'
              }`}
            >
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-24 object-cover"
              />
              <div className="p-3 bg-white">
                <h4 className="font-semibold text-sm text-gray-800 truncate">{room.name}</h4>
                <p className="text-yellow-600 font-bold text-sm">${room.price}/noche</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;