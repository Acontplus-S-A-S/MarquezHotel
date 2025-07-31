// components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Bed, 
  Utensils, 
  Camera, 
  MessageSquare, 
  MapPin, 
  Phone,
  Calendar,
  Star,
  ChevronDown,
  Wifi,
  Car,
  Coffee,
  Waves
} from 'lucide-react';

const Header = ({ hotelName, onBookNow, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Configuración completa del menú
  const navigationItems = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
      description: 'Página principal',
      hasDropdown: false
    },
    {
      id: 'habitaciones',
      label: 'Habitaciones',
      icon: Bed,
      description: 'Nuestras suites y habitaciones',
      hasDropdown: true,
      dropdownItems: [
        { id: 'habitacion-estandar', label: 'Habitación Estándar', price: '$85/noche', icon: Bed },
        { id: 'habitacion-superior', label: 'Habitación Superior', price: '$120/noche', icon: Star },
        { id: 'suite-junior', label: 'Suite Junior', price: '$180/noche', icon: Star },
        { id: 'suite-presidencial', label: 'Suite Presidencial', price: '$280/noche', icon: Star },
        { id: 'ver-todas', label: 'Ver todas las habitaciones', action: 'habitaciones', highlight: true }
      ]
    },
    {
      id: 'servicios',
      label: 'Servicios',
      icon: Utensils,
      description: 'Amenidades y servicios',
      hasDropdown: true,
      dropdownItems: [
        { id: 'restaurante', label: 'Restaurante Amazónico', icon: Utensils },
        { id: 'wifi', label: 'WiFi Gratuito', icon: Wifi },
        { id: 'transporte', label: 'Transporte', icon: Car },
        { id: 'tours', label: 'Tours Amazónicos', icon: Waves },
        { id: 'spa', label: 'Servicios de Spa', icon: Star },
        { id: 'ver-servicios', label: 'Ver todos los servicios', action: 'servicios', highlight: true }
      ]
    },
    {
      id: 'galeria',
      label: 'Galería',
      icon: Camera,
      description: 'Fotos del hotel',
      hasDropdown: false
    },
    {
      id: 'testimonios',
      label: 'Reseñas',
      icon: MessageSquare,
      description: 'Lo que dicen nuestros huéspedes',
      hasDropdown: false
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: MapPin,
      description: 'Ubicación e información',
      hasDropdown: true,
      dropdownItems: [
        { id: 'ubicacion', label: 'Cómo llegar', icon: MapPin },
        { id: 'telefono', label: '+593 96 288-0127', icon: Phone, action: 'tel:+593962880127' },
        { id: 'whatsapp', label: 'WhatsApp', icon: Phone, action: 'whatsapp' },
        { id: 'email', label: 'info@hotelelmarquez.com', icon: Phone, action: 'mailto:info@hotelelmarquez.com' },
        { id: 'ver-contacto', label: 'Ver información completa', action: 'contacto', highlight: true }
      ]
    }
  ];

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar clicks fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.header-container')) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavItemClick = (sectionId, item = null) => {
    if (item?.action) {
      if (item.action.startsWith('tel:') || item.action.startsWith('mailto:')) {
        window.location.href = item.action;
      } else if (item.action === 'whatsapp') {
        const message = encodeURIComponent("¡Hola! Me interesa hacer una reserva en Hotel El Marquez.");
        window.open(`https://wa.me/593962880127?text=${message}`, '_blank');
      } else {
        onNavClick(item.action);
      }
    } else {
      onNavClick(sectionId);
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleBookNowClick = () => {
    onBookNow();
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full transition-all duration-300 z-50 header-container ${
          isScrolled || isMenuOpen 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm shadow-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center z-20">
              <button 
                onClick={() => onNavClick('inicio')}
                className="flex items-center gap-3 text-2xl font-bold text-gray-800 hover:text-yellow-600 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HM</span>
                </div>
                <span className="hidden sm:block">{hotelName}</span>
              </button>
            </div>
            
            {/* Navegación Desktop */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => item.hasDropdown ? handleDropdownToggle(item.id) : onNavClick(item.id)}
                      onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-yellow-600 transition-all duration-200 font-medium rounded-lg hover:bg-yellow-50 group"
                    >
                      <IconComponent size={18} />
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>

                    {/* Dropdown Desktop */}
                    {item.hasDropdown && (
                      <div 
                        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ${
                          activeDropdown === item.id 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible translate-y-2'
                        }`}
                        onMouseEnter={() => setActiveDropdown(item.id)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <IconComponent size={20} className="text-yellow-600" />
                            {item.label}
                          </h3>
                          <div className="space-y-2">
                            {item.dropdownItems.map((dropItem) => {
                              const DropIconComponent = dropItem.icon;
                              return (
                                <button
                                  key={dropItem.id}
                                  onClick={() => handleNavItemClick(item.id, dropItem)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                                    dropItem.highlight 
                                      ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200' 
                                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                  }`}
                                >
                                  <DropIconComponent size={16} className={dropItem.highlight ? 'text-yellow-600' : 'text-gray-400'} />
                                  <div className="flex-1">
                                    <div className="font-medium">{dropItem.label}</div>
                                    {dropItem.price && (
                                      <div className="text-sm text-gray-500">{dropItem.price}</div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Botones CTA Desktop */}
            <div className="hidden xl:flex items-center gap-3">
              <button 
                onClick={() => window.open('https://wa.me/593962880127', '_blank')}
                className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors duration-200 font-medium rounded-lg hover:bg-green-50"
              >
                <Phone size={18} />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={onBookNow}
                className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Calendar size={18} />
                <span>Reservar Ahora</span>
              </button>
            </div>

            {/* Botón hamburguesa móvil */}
            <button 
              onClick={toggleMenu}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-20"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                />
                <span 
                  className={`absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 top-3 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Menú móvil - Overlay completo */}
        <div 
          className={`xl:hidden fixed inset-0 bg-black/50 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ top: '64px' }}
        >
          <div 
            className={`bg-white w-full h-full transition-all duration-300 overflow-y-auto ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="p-6 space-y-4">
              {/* Items de navegación móvil */}
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="space-y-2">
                    <button
                      onClick={() => item.hasDropdown ? handleDropdownToggle(item.id) : handleNavItemClick(item.id)}
                      className={`w-full flex items-center justify-between p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 transform ${
                        isMenuOpen 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-8 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: isMenuOpen ? `${(index + 1) * 100}ms` : '0ms' 
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <IconComponent size={20} className="text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>

                    {/* Dropdown móvil */}
                    {item.hasDropdown && (
                      <div 
                        className={`ml-4 space-y-2 transition-all duration-300 ${
                          activeDropdown === item.id 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        {item.dropdownItems.map((dropItem) => {
                          const DropIconComponent = dropItem.icon;
                          return (
                            <button
                              key={dropItem.id}
                              onClick={() => handleNavItemClick(item.id, dropItem)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                                dropItem.highlight 
                                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' 
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <DropIconComponent size={16} className={dropItem.highlight ? 'text-yellow-600' : 'text-gray-400'} />
                              <div className="flex-1">
                                <div className="font-medium">{dropItem.label}</div>
                                {dropItem.price && (
                                  <div className="text-sm text-gray-500">{dropItem.price}</div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Botones CTA móvil */}
              <div 
                className={`pt-6 space-y-4 transform ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? '600ms' : '0ms' 
                }}
              >
                <button 
                  onClick={() => window.open('https://wa.me/593962880127', '_blank')}
                  className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold shadow-lg"
                >
                  <Phone size={20} />
                  Contactar por WhatsApp
                </button>
                
                <button 
                  onClick={handleBookNowClick}
                  className="w-full flex items-center justify-center gap-3 bg-yellow-600 text-white px-6 py-4 rounded-xl hover:bg-yellow-700 transition-all duration-200 font-semibold shadow-lg"
                >
                  <Calendar size={20} />
                  Reservar Ahora
                </button>
              </div>

              {/* Información de contacto móvil */}
              <div 
                className={`pt-8 border-t border-gray-200 transform ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? '700ms' : '0ms' 
                }}
              >
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-4">Hotel El Marquez - Amazonía Ecuatoriana</p>
                  <div className="flex justify-center space-x-6 text-sm">
                    <a href="tel:+593962880127" className="text-yellow-600 hover:text-yellow-700">
                      +593 96 288-0127
                    </a>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">El Coca, Orellana</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Espaciador para compensar el header fijo */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;