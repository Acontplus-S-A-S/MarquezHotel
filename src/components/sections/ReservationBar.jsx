// components/sections/ReservationBar.jsx
import React, { useRef } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { getTodayDate } from '../../utils/dateUtils';

const ReservationBar = ({ onCheckAvailability }) => {
  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);

  const handleInputClick = (ref) => {
    ref.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckAvailability();
  };

  const guestOptions = [
    { value: 1, label: '1 Huésped' },
    { value: 2, label: '2 Huéspedes' },
    { value: 3, label: '3 Huéspedes' },
    { value: 4, label: '4+ Huéspedes' }
  ];

  return (
    <section className="bg-white shadow-lg border-t-4 border-yellow-600">
      <div className="container mx-auto px-4 py-8">
        <form 
          className="grid grid-cols-1 md:grid-cols-4 gap-4" 
          onSubmit={handleSubmit}
        >
          {/* Check-in */}
          <div className="relative">
            <label 
              htmlFor="checkin-date" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Check-in
            </label>
            <div className="relative">
              <input 
                id="checkin-date"
                ref={checkinRef}
                type="date" 
                min={getTodayDate()}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 pr-12"
                placeholder="Seleccionar fecha"
              />
              <Calendar 
                onClick={() => handleInputClick(checkinRef)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer hover:text-yellow-600 transition-colors" 
                size={20} 
              />
            </div>
          </div>
          
          {/* Check-out */}
          <div className="relative">
            <label 
              htmlFor="checkout-date" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Check-out
            </label>
            <div className="relative">
              <input 
                id="checkout-date"
                ref={checkoutRef}
                type="date" 
                min={getTodayDate()}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 pr-12"
                placeholder="Seleccionar fecha"
              />
              <Calendar 
                onClick={() => handleInputClick(checkoutRef)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer hover:text-yellow-600 transition-colors" 
                size={20} 
              />
            </div>
          </div>
          
          {/* Huéspedes */}
          <div className="relative">
            <label 
              htmlFor="guests-select" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Huéspedes
            </label>
            <div className="relative">
              <select 
                id="guests-select"
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white transition-all duration-200 pr-12"
              >
                {guestOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
          
          {/* Botón de Búsqueda */}
          <div className="relative">
            <label className="block text-sm font-semibold text-transparent mb-2">
              Acción
            </label>
            <button 
              type="submit"
              className="w-full bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Check size={20} />
              <span className="hidden sm:inline">Verificar Disponibilidad</span>
              <span className="sm:hidden">Buscar</span>
            </button>
          </div>
        </form>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Check size={16} className="text-green-600" />
              Cancelación gratuita
            </span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="inline-flex items-center gap-1">
              <Check size={16} className="text-green-600" />
              Sin pago anticipado
            </span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="inline-flex items-center gap-1">
              <Check size={16} className="text-green-600" />
              Confirmación inmediata
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReservationBar;