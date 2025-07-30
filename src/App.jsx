import React, { useState, useRef } from 'react';
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
  const rooms = [
    {
      id: 1,
      name: "Habitación Estándar",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 85,
      capacity: 2,
      size: "25 m²",
      amenities: ["WiFi gratuito", "TV cable", "Aire acondicionado", "Baño privado"],
      description: "Habitación cómoda y funcional con todas las comodidades básicas para una estancia placentera."
    },
    {
      id: 2,
      name: "Habitación Superior",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 120,
      capacity: 3,
      size: "35 m²",
      amenities: ["WiFi gratuito", "TV cable", "Aire acondicionado", "Minibar", "Vista parcial al río"],
      description: "Habitación espaciosa con vista parcial al río Napo y amenidades adicionales para mayor confort."
    },
    {
      id: 3,
      name: "Suite Junior",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 180,
      capacity: 4,
      size: "50 m²",
      amenities: ["WiFi gratuito", "TV cable", "Aire acondicionado", "Minibar", "Sala de estar", "Vista al río"],
      description: "Suite elegante con sala de estar separada y vista completa al río Napo, ideal para familias."
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Nuestras Habitaciones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Espacios diseñados para brindar el máximo confort durante tu estadía en la Amazonía.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${room.price}/noche
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{room.capacity} personas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{room.size}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Amenidades:</h4>
                  <ul className="space-y-1">
                    {room.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Check size={16} className="text-yellow-600" />
                        <span className="text-sm">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => onRoomSelect(room)}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  Ver Detalles
                </button>
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
  if (!room) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{room.name}</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">${room.price}</div>
              <div className="text-gray-500">por noche</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{room.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="text-yellow-600" size={20} />
              <span>Hasta {room.capacity} personas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-yellow-600" size={20} />
              <span>{room.size}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Amenidades incluidas</h3>
            <div className="grid grid-cols-2 gap-2">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="text-yellow-600" size={16} />
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={onBookNow}
              className="flex-1 bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Reservar Ahora
            </button>
            <button 
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
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

  const handleNavClick = (sectionId) => {
    const element = sectionRefs[sectionId]?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        onClose={() => setReservationModalOpen(false)} 
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