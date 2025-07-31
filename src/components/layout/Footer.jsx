// components/layout/Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail, Wifi, Car, Coffee, Waves } from 'lucide-react';

const Footer = ({ hotelName, onNavClick }) => {
  const navigationLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'habitaciones', label: 'Habitaciones' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: 'Av. Alejandro Labaka y Camilo de Torrano, El Coca'
    },
    {
      icon: Phone,
      text: '+593 6 288-0127'
    },
    {
      icon: Mail,
      text: 'info@hotelelmarquez.com'
    }
  ];

  const services = [
    {
      icon: Wifi,
      text: 'WiFi Gratuito'
    },
    {
      icon: Car,
      text: 'Transporte'
    },
    {
      icon: Coffee,
      text: 'Restaurante'
    },
    {
      icon: Waves,
      text: 'Tours Amazónicos'
    }
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Información del Hotel */}
          <div>
            <h3 className="text-2xl font-bold mb-6">{hotelName}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Tu hogar en la Amazonía ecuatoriana. Donde la aventura se encuentra con el confort.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 {hotelName}. Todos los derechos reservados.
            </p>
          </div>
          
          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
            <div className="space-y-3">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavClick(link.id)}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contacto</h4>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-start">
                    <IconComponent className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-sm leading-relaxed">{contact.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Servicios */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Servicios</h4>
            <div className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="flex items-center text-gray-300">
                    <IconComponent className="text-yellow-500 mr-3 flex-shrink-0" size={16} />
                    <span className="text-sm">{service.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Desarrollado por Acontplus S.A.S Ecuador
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Stack: Angular, .NET, SQL Server, Flutter, AWS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;