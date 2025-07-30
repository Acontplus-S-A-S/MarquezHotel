// Modales
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
  React.useEffect(() => {
    if (reservationData && isOpen) {
      setFormData(prev => ({
        ...prev,
        checkin: reservationData.checkin || '',
        checkout: reservationData.checkout || '',
        guests: reservationData.guests || 1
      }));
    } else if (isOpen && !formData.checkin) {
      // Fechas por defecto si no hay reservationData
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);
      
      setFormData(prev => ({
        ...prev,
        checkin: tomorrow.toISOString().split('T')[0],
        checkout: dayAfter.toISOString().split('T')[0]
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

  const calculateNights = () => {
    if (formData.checkin && formData.checkout) {
      const checkin = new Date(formData.checkin);
      const checkout = new Date(formData.checkout);
      const diffTime = Math.abs(checkout - checkin);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear mensaje para WhatsApp
    const nights = calculateNights();
    const totalPrice = roomData ? roomData.price * nights : 0;
    
    let message = `¡Hola! Me interesa hacer una reserva en Hotel El Marquez.\n\n`;
    message += `📋 DATOS DE LA RESERVA:\n`;
    message += `• Nombre: ${formData.name}\n`;
    message += `• Email: ${formData.email}\n`;
    message += `• Teléfono: ${formData.phone}\n\n`;
    
    if (roomData) {
      message += `🏨 HABITACIÓN SELECCIONADA:\n`;
      message += `• Tipo: ${roomData.name}\n`;
      message += `• Precio: ${roomData.price}/noche\n\n`;
    }
    
    message += `📅 FECHAS:\n`;
    message += `• Check-in: ${formData.checkin}\n`;
    message += `• Check-out: ${formData.checkout}\n`;
    message += `• Noches: ${nights}\n`;
    message += `• Huéspedes: ${formData.guests}\n\n`;
    
    if (totalPrice > 0) {
      message += `💰 TOTAL ESTIMADO: ${totalPrice}\n\n`;
    }
    
    if (formData.comments) {
      message += `💬 COMENTARIOS:\n${formData.comments}\n\n`;
    }
    
    message += `¿Podrían confirmar disponibilidad y enviarme más detalles?\n\n¡Gracias!`;
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/593962880127?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar modal
    onClose();
    
    // Limpiar datos de reserva
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

  const nights = calculateNights();
  const totalPrice = roomData ? roomData.price * nights : 0;
  const savings = roomData && roomData.originalPrice ? (roomData.originalPrice - roomData.price) * nights : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Solicitar Reserva</h2>
            {roomData && (
              <p className="text-yellow-600 font-medium">{roomData.name}</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
};import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Phone, Mail, Star, Users, ChevronDown, Wifi, Car, Coffee, Waves, Menu, X, Check, Clock, Shield, Award } from 'lucide-react';

// Componentes principales del sitio web
const Header = ({ hotelName, onBookNow, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">{hotelName}</h1>
          </div>
          
          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => onNavClick('inicio')} className="text-gray-600 hover:text-yellow-600 transition-colors">Inicio</button>
            <button onClick={() => onNavClick('habitaciones')} className="text-gray-600 hover:text-yellow-600 transition-colors">Habitaciones</button>
            <button onClick={() => onNavClick('servicios')} className="text-gray-600 hover:text-yellow-600 transition-colors">Servicios</button>
            <button onClick={() => onNavClick('contacto')} className="text-gray-600 hover:text-yellow-600 transition-colors">Contacto</button>
          </nav>

          <button 
            onClick={onBookNow}
            className="hidden md:block bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Reservar Ahora
          </button>

          {/* Botón hamburguesa móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => { onNavClick('inicio'); setIsMenuOpen(false); }} className="text-gray-600 hover:text-yellow-600 transition-colors">Inicio</button>
              <button onClick={() => { onNavClick('habitaciones'); setIsMenuOpen(false); }} className="text-gray-600 hover:text-yellow-600 transition-colors">Habitaciones</button>
              <button onClick={() => { onNavClick('servicios'); setIsMenuOpen(false); }} className="text-gray-600 hover:text-yellow-600 transition-colors">Servicios</button>
              <button onClick={() => { onNavClick('contacto'); setIsMenuOpen(false); }} className="text-gray-600 hover:text-yellow-600 transition-colors">Contacto</button>
              <button 
                onClick={() => { onBookNow(); setIsMenuOpen(false); }}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors w-fit"
              >
                Reservar Ahora
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = ({ onBookNow, onSeeRooms }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Hotel El Marquez
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
        >
          Elegancia colonial en el corazón de Ecuador. Donde la tradición se encuentra con el lujo moderno.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={onBookNow}
            className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors"
          >
            Reservar Ahora
          </button>
          <button 
            onClick={onSeeRooms}
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors"
          >
            Ver Habitaciones
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ReservationBar = ({ onCheckAvailability }) => {
  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);

  const handleInputClick = (ref) => {
    ref.current?.focus();
  };

  return (
    <section className="bg-white shadow-lg border-t-4 border-yellow-600">
      <div className="container mx-auto px-4 py-8">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={(e) => { e.preventDefault(); onCheckAvailability(); }}>
          <div>
            <label htmlFor="checkin-date" className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
            <div className="relative">
              <input 
                id="checkin-date"
                ref={checkinRef}
                type="date" 
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Calendar 
                onClick={() => handleInputClick(checkinRef)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer" 
                size={20} 
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="checkout-date" className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
            <div className="relative">
              <input 
                id="checkout-date"
                ref={checkoutRef}
                type="date" 
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Calendar 
                onClick={() => handleInputClick(checkoutRef)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer" 
                size={20} 
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="guests-select" className="block text-sm font-semibold text-gray-700 mb-2">Huéspedes</label>
            <div className="relative">
              <select 
                id="guests-select"
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option>1 Huésped</option>
                <option>2 Huéspedes</option>
                <option>3 Huéspedes</option>
                <option>4 Huéspedes</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400" size={20} />
            </div>
          </div>
          
          <button 
            type="submit"
            className="bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Verificar Disponibilidad
          </button>
        </form>
      </div>
    </section>
  );
};

const ValueProposition = ({ hotelName }) => {
  const features = [
    {
      icon: <Shield className="text-white" size={32} />,
      title: "Seguridad y Confort",
      description: "Instalaciones completamente renovadas con los más altos estándares de seguridad y protocolos sanitarios actualizados."
    },
    {
      icon: <Coffee className="text-white" size={32} />,
      title: "Gastronomía Tradicional",
      description: "Restaurante especializado en comida ecuatoriana e internacional, con ingredientes frescos de la región amazónica."
    },
    {
      icon: <MapPin className="text-white" size={32} />,
      title: "Ubicación Privilegiada",
      description: "En el corazón de El Coca, puerta de entrada a la Amazonía ecuatoriana y cerca de las principales atracciones naturales."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            ¿Por qué elegir <span className="text-yellow-600">{hotelName}</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiencia única en la Amazonía ecuatoriana con servicios de primera clase y hospitalidad genuina.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoomsSection = ({ onRoomSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const rooms = [
    {
      id: 1,
      name: "Habitación Estándar",
      subtitle: "Comodidad Esencial",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      price: 85,
      originalPrice: 95,
      capacity: 2,
      size: "25 m²",
      view: "Vista a los jardines",
      rating: 4.8,
      amenities: [
        { icon: "wifi", name: "WiFi gratuito" },
        { icon: "tv", name: "TV cable HD" },
        { icon: "ac", name: "Aire acondicionado" },
        { icon: "bath", name: "Baño privado" },
        { icon: "safe", name: "Caja fuerte" },
        { icon: "coffee", name: "Cafetera" }
      ],
      features: ["Cama King", "Escritorio", "Mini refrigerador", "Balcón privado"],
      description: "Habitación elegante con todas las comodidades modernas. Perfecta para viajeros que buscan confort y funcionalidad en un ambiente acogedor.",
      highlights: ["Renovada recientemente", "Vista a jardines tropicales", "Desayuno incluido"]
    },
    {
      id: 2,
      name: "Habitación Superior",
      subtitle: "Elegancia Amazónica",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      price: 120,
      originalPrice: 140,
      capacity: 3,
      size: "35 m²",
      view: "Vista parcial al río Napo",
      rating: 4.9,
      amenities: [
        { icon: "wifi", name: "WiFi gratuito" },
        { icon: "tv", name: "Smart TV 55''" },
        { icon: "ac", name: "Climatización dual" },
        { icon: "minibar", name: "Minibar premium" },
        { icon: "river", name: "Vista al río" },
        { icon: "jacuzzi", name: "Bañera de hidromasaje" }
      ],
      features: ["Cama King + Sofá cama", "Área de estar", "Terraza privada", "Amenidades de lujo"],
      description: "Habitación espaciosa con vista parcial al majestuoso río Napo. Diseñada para brindar una experiencia superior con toques amazónicos únicos.",
      highlights: ["Vista al río Napo", "Terraza con hamaca", "Amenidades premium"]
    },
    {
      id: 3,
      name: "Suite Junior",
      subtitle: "Lujo Tropical",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      price: 180,
      originalPrice: 210,
      capacity: 4,
      size: "50 m²",
      view: "Vista panorámica al río",
      rating: 5.0,
      amenities: [
        { icon: "wifi", name: "WiFi premium" },
        { icon: "tv", name: "Smart TV 65''" },
        { icon: "ac", name: "Climatización inteligente" },
        { icon: "minibar", name: "Minibar gourmet" },
        { icon: "living", name: "Sala de estar" },
        { icon: "spa", name: "Kit de spa privado" }
      ],
      features: ["Suite dos ambientes", "Sala de estar independiente", "Terraza panorámica", "Servicio de mayordomo"],
      description: "Suite elegante con sala de estar separada y vista panorámica al río Napo. El refugio perfecto para familias que buscan lujo y comodidad absoluta.",
      highlights: ["Vista panorámica 180°", "Servicio de mayordomo", "Kit de bienvenida gourmet"]
    },
    {
      id: 4,
      name: "Suite Presidencial",
      subtitle: "Experiencia Exclusiva",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520637736862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      price: 280,
      originalPrice: 320,
      capacity: 6,
      size: "75 m²",
      view: "Vista panorámica 360°",
      rating: 5.0,
      amenities: [
        { icon: "wifi", name: "WiFi ultra-rápido" },
        { icon: "entertainment", name: "Sistema de entretenimiento" },
        { icon: "ac", name: "Control climático premium" },
        { icon: "kitchen", name: "Kitchenette" },
        { icon: "jacuzzi", name: "Jacuzzi privado" },
        { icon: "concierge", name: "Servicio de concierge 24/7" }
      ],
      features: ["Suite tres ambientes", "Comedor privado", "Jacuzzi en terraza", "Acceso VIP"],
      description: "La suite más exclusiva del hotel con vistas panorámicas de 360° y servicios premium. Una experiencia única en el corazón de la Amazonía.",
      highlights: ["Acceso VIP", "Jacuzzi panorámico", "Chef privado disponible"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rooms.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, rooms.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentRoom = rooms[currentSlide];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
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
                            <span className="text-sm line-through opacity-70">${room.originalPrice}</span>
                            <span className="text-lg ml-2">${room.price}</span>
                            <span className="text-sm">/noche</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mini galería */}
                    <div className="flex gap-2 mt-4">
                      {room.gallery.slice(0, 3).map((img, idx) => (
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

                    {/* Amenidades principales */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-800 mb-3">Amenidades incluidas:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities.slice(0, 6).map((amenity, i) => (
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
                        onClick={() => {
                          // Pasar la habitación seleccionada al modal de reservas
                          window.selectedRoom = room;
                          // Abrir modal de reservas
                          const reservationEvent = new CustomEvent('openReservationModal', { 
                            detail: { room: room }
                          });
                          window.dispatchEvent(reservationEvent);
                        }}
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

const GallerySection = ({ images, onImageClick }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Galería</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los espacios y experiencias que te esperan en Hotel El Marquez.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => onImageClick(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="font-semibold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      location: "Quito, Ecuador",
      rating: 5,
      comment: "Excelente ubicación y servicio. Las habitaciones son muy cómodas y el personal extremadamente amable. Perfecto para explorar la Amazonía."
    },
    {
      name: "Carlos Rodríguez",
      location: "Guayaquil, Ecuador",
      rating: 5,
      comment: "Hotel muy recomendado. La comida del restaurante es deliciosa y la atención al cliente excepcional. Definitivamente regresaremos."
    },
    {
      name: "Ana Martínez",
      location: "Cuenca, Ecuador",
      rating: 5,
      comment: "Una experiencia maravillosa. El hotel está muy bien ubicado y las instalaciones son modernas y limpias. Ideal para turismo de naturaleza."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Lo que dicen nuestros huéspedes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiencias reales de quienes han disfrutado de la hospitalidad del Hotel El Marquez.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Nuestra Ubicación</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estratégicamente ubicado en El Coca, puerta de entrada a la Amazonía ecuatoriana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Cómo llegar</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Desde el Aeropuerto</h4>
                  <p className="text-gray-600">15 minutos en taxi desde el Aeropuerto Francisco de Orellana</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Desde Quito</h4>
                  <p className="text-gray-600">45 minutos en vuelo o 5 horas por carretera</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Dirección</h4>
                  <p className="text-gray-600">Av. Alejandro Labaka y Camilo de Torrano, El Coca, Orellana</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.123456789!2d-76.99876543210987!3d-0.4654321098765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjcnNTUuNiJTIDc2wrA1OSc1NS41Ilc!5e0!3m2!1ses!2sec!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Hotel El Marquez"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ hotelName, onNavClick }) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">{hotelName}</h3>
            <p className="text-gray-300 mb-4">
              Tu hogar en la Amazonía ecuatoriana. Donde la aventura se encuentra con el confort.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
            <div className="space-y-3">
              <button onClick={() => onNavClick('inicio')} className="block text-gray-300 hover:text-white transition-colors">Inicio</button>
              <button onClick={() => onNavClick('habitaciones')} className="block text-gray-300 hover:text-white transition-colors">Habitaciones</button>
              <button onClick={() => onNavClick('servicios')} className="block text-gray-300 hover:text-white transition-colors">Servicios</button>
              <button onClick={() => onNavClick('contacto')} className="block text-gray-300 hover:text-white transition-colors">Contacto</button>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">Av. Alejandro Labaka y Camilo de Torrano, El Coca</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">+593 6 288-0127</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">info@hotelelmarquez.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Servicios</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Wifi className="text-yellow-500 mr-3" size={16} />
                <span>WiFi Gratuito</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Car className="text-yellow-500 mr-3" size={16} />
                <span>Transporte</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Coffee className="text-yellow-500 mr-3" size={16} />
                <span>Restaurante</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Waves className="text-yellow-500 mr-3" size={16} />
                <span>Tours Amazónicos</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © 2024 {hotelName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <button
      onClick={() => {
        const message = encodeURIComponent("¡Hola! Me interesa hacer una reserva en Hotel El Marquez. ¿Podrían ayudarme con información sobre disponibilidad y tarifas?");
        const whatsappUrl = `https://wa.me/593962880127?text=${message}`;
        window.open(whatsappUrl, '_blank');
      }}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686z"/>
      </svg>
    </button>
  );
};

// Modales
const ReservationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Realizar Reserva</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
            <input type="tel" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
              <input type="date" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
              <input type="date" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Número de huéspedes</label>
            <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500">
              <option>1 Huésped</option>
              <option>2 Huéspedes</option>
              <option>3 Huéspedes</option>
              <option>4 Huéspedes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Comentarios adicionales</label>
            <textarea rows="3" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"></textarea>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
          >
            Enviar Solicitud de Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <X size={24} />
        </button>
        <img 
          src={image.src} 
          alt={image.alt}
          className="max-w-full max-h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
          <h3 className="text-xl font-semibold">{image.title}</h3>
        </div>
      </div>
    </div>
  );
};

const RoomDetailModal = ({ room, onClose, onBookNow }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState({
    checkin: '',
    checkout: ''
  });
  const [guests, setGuests] = useState(1);

  if (!room) return null;

  // Calcular número de noches
  const calculateNights = () => {
    if (selectedDate.checkin && selectedDate.checkout) {
      const checkin = new Date(selectedDate.checkin);
      const checkout = new Date(selectedDate.checkout);
      const diffTime = Math.abs(checkout - checkin);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const nights = calculateNights();
  const totalPrice = room.price * nights;
  const savings = room.originalPrice ? (room.originalPrice - room.price) * nights : 0;

  // Generar fechas por defecto (hoy + 1 día)
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    return {
      checkin: tomorrow.toISOString().split('T')[0],
      checkout: dayAfter.toISOString().split('T')[0]
    };
  };

  // Setear fechas por defecto al abrir el modal
  React.useEffect(() => {
    if (room && (!selectedDate.checkin || !selectedDate.checkout)) {
      setSelectedDate(getDefaultDates());
    }
  }, [room]);

  const handleReservation = () => {
    // Crear objeto con datos de reserva
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
    window.reservationData = reservationData;
    
    // Cerrar modal actual y abrir modal de reservas
    onClose();
    onBookNow();
  };

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
                  {room.amenities.map((amenity, i) => (
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
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>✅ Cancelación gratuita hasta 24h antes</p>
                  <p>✅ Reserva sin tarjeta de crédito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
function App() {
  const [isReservationModalOpen, setReservationModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationRoom, setReservationRoom] = useState(null);

  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    inicio: heroRef,
    habitaciones: roomsRef,
    servicios: servicesRef,
    contacto: contactRef,
  };

  const hotelName = "Hotel El Marquez";

  const galleryImages = [
    { 
      src: 'https://images.unsplash.com/photo-1531982535417-a39d136cca87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Piscina de lujo del hotel con agua cristalina', 
      title: 'Piscina Principal' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1572803089768-1b990231961a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Restaurante elegante con ambiente gourmet', 
      title: 'Restaurante Amazónico' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Lobby elegante con decoración moderna', 
      title: 'Lobby Principal' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Terraza con vista panorámica', 
      title: 'Terraza Mirador' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Bar del hotel con ambiente acogedor', 
      title: 'Bar Lounge' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
      alt: 'Jardines tropicales del hotel', 
      title: 'Jardines Tropicales' 
    },
  ];

  // Event listener para botón "Reservar Ahora" desde el carrusel
  useEffect(() => {
    const handleOpenReservationModal = (event) => {
      setReservationRoom(event.detail.room);
      setReservationModalOpen(true);
    };

    window.addEventListener('openReservationModal', handleOpenReservationModal);
    
    return () => {
      window.removeEventListener('openReservationModal', handleOpenReservationModal);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    const element = sectionRefs[sectionId]?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationModalClose = () => {
    setReservationModalOpen(false);
    setReservationRoom(null);
    // Limpiar datos globales
    if (typeof window !== 'undefined') {
      window.reservationData = null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        hotelName={hotelName} 
        onBookNow={() => setReservationModalOpen(true)}
        onNavClick={handleNavClick}
      />
      
      <main>
        <div ref={heroRef}>
          <HeroSection 
            onBookNow={() => setReservationModalOpen(true)}
            onSeeRooms={() => handleNavClick('habitaciones')}
          />
        </div>
        
        <ReservationBar onCheckAvailability={() => setReservationModalOpen(true)} />
        
        <div ref={servicesRef}>
          <ValueProposition hotelName={hotelName} />
        </div>
        
        <div ref={roomsRef}>
          <RoomsSection onRoomSelect={setSelectedRoom} />
        </div>
        
        <GallerySection 
          images={galleryImages} 
          onImageClick={setLightboxImage}
        />
        
        <TestimonialsSection />
        
        <div ref={contactRef}>
          <MapSection />
        </div>
      </main>
      
      <Footer hotelName={hotelName} onNavClick={handleNavClick} />
      
      <FloatingWhatsApp />
      
      {/* Modales */}
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={handleReservationModalClose}
        selectedRoom={reservationRoom}
      />
      
      <Lightbox 
        image={lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />
      
      <RoomDetailModal 
        room={selectedRoom} 
        onClose={() => setSelectedRoom(null)}
        onBookNow={() => {
          setSelectedRoom(null);
          setReservationModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;