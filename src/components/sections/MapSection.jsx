// components/sections/MapSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Plane, Car, Phone, Mail, Navigation } from 'lucide-react';

const MapSection = () => {
  const locationInfo = [
    {
      icon: MapPin,
      title: "Desde el Aeropuerto",
      description: "15 minutos en taxi desde el Aeropuerto Francisco de Orellana",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Desde Quito",
      description: "45 minutos en vuelo o 5 horas por carretera",
      color: "text-green-600"
    },
    {
      icon: Navigation,
      title: "Ubicación Central",
      description: "En el corazón de El Coca, cerca de todas las atracciones",
      color: "text-purple-600"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+593 6 288-0127",
      action: "tel:+59362880127"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@hotelelmarquez.com",
      action: "mailto:info@hotelelmarquez.com"
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: "Av. Alejandro Labaka y Camilo de Torrano, El Coca, Orellana",
      action: "https://maps.google.com/?q=El+Coca+Orellana+Ecuador"
    }
  ];

  const nearbyAttractions = [
    { name: "Parque Nacional Yasuní", distance: "2 horas", type: "Naturaleza" },
    { name: "Río Napo", distance: "5 minutos", type: "Recreación" },
    { name: "Centro de El Coca", distance: "Caminando", type: "Comercial" },
    { name: "Comunidades Indígenas", distance: "30 minutos", type: "Cultural" }
  ];

  return (
    <section className="py-16 bg-gray-50">
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
            Nuestra <span className="text-yellow-600">Ubicación</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estratégicamente ubicado en El Coca, puerta de entrada a la Amazonía ecuatoriana 
            y punto de partida perfecto para explorar la selva tropical.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Information Side */}
          <div className="space-y-8">
            {/* How to Get Here */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Car className="text-yellow-600" size={28} />
                Cómo llegar
              </h3>
              
              <div className="space-y-4">
                {locationInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className={`${info.color} bg-gray-50 p-3 rounded-full`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Phone className="text-yellow-600" size={28} />
                Información de Contacto
              </h3>
              
              <div className="space-y-3">
                {contactMethods.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.action}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:bg-yellow-50 group"
                    >
                      <IconComponent className="text-yellow-600 group-hover:text-yellow-700" size={20} />
                      <div>
                        <div className="text-sm text-gray-500">{contact.label}</div>
                        <div className="font-medium text-gray-800 group-hover:text-yellow-700">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Nearby Attractions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="text-yellow-600" size={28} />
                Atracciones Cercanas
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      {attraction.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{attraction.distance}</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        {attraction.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            {/* Interactive Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.123456789!2d-76.99876543210987!3d-0.4654321098765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjcnNTUuNiJTIDc2wrA1OSc1NS41Ilc!5e0!3m2!1ses!2sec!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Hotel El Marquez"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
                
                {/* Map Overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-yellow-600" size={20} />
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">Hotel El Marquez</div>
                      <div className="text-xs text-gray-600">El Coca, Orellana</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Actions */}
              <div className="p-4 bg-gradient-to-r from-yellow-600 to-yellow-700">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-semibold">¿Necesitas direcciones?</h4>
                    <p className="text-sm opacity-90">Te ayudamos a llegar</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://maps.google.com/?q=El+Coca+Orellana+Ecuador"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation Options */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plane className="text-yellow-600" size={20} />
                Opciones de Transporte
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Taxi desde aeropuerto</span>
                  <span className="font-medium text-gray-800">$15-20</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Transfer privado</span>
                  <span className="font-medium text-gray-800">$25-30</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Transporte público</span>
                  <span className="font-medium text-gray-800">$2-5</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> Contáctanos para organizar tu transporte desde el aeropuerto
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;