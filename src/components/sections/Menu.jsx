// src/components/sections/Menu.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useActiveCategories } from '@/hooks/useCategories';

// Datos de ejemplo como fallback (mantener los datos originales como respaldo)
const fallbackMenuData = {
  "Desayunos": [
    { id: 1, name: "Desayuno Amazónico", description: "Huevos, plátano, yuca y café", price: 8.50, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
    { id: 2, name: "Tostadas Mikuna", description: "Pan artesanal con mermelada de cacao", price: 6.00, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/3ff21d64d4a6558674b2f9f3e7d0d8c7.webp" },
    { id: 3, name: "Bowl de Açaí", description: "Açaí con frutas tropicales y granola", price: 9.00, image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85" }
  ],
  "Platos Principales": [
    { id: 4, name: "Pescado a la Plancha", description: "Pescado fresco con vegetales amazónicos", price: 15.00, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2" },
    { id: 5, name: "Pollo al Curry Verde", description: "Pollo en salsa de hierbas amazónicas", price: 13.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/b70baf0e9e392a93ce357385c4576c11.webp" },
    { id: 6, name: "Ensalada Tropical", description: "Mix de hojas verdes con frutas exóticas", price: 11.00, image: "https://images.unsplash.com/photo-1540420773420-2850a42b2456" }
  ],
  "Cafés y Bebidas": [
    { id: 7, name: "Café Mikuna Especial", description: "Blend exclusivo de granos amazónicos", price: 4.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/2efec85d3866e61cd8d0b6f60b037637.webp" },
    { id: 8, name: "Latte de Cacao", description: "Espresso con leche y cacao orgánico", price: 5.00, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/db45ede3210a9165ac3ed3f3f84e3fe6.webp" },
    { id: 9, name: "Jugo Verde Detox", description: "Espinaca, piña, apio y jengibre", price: 6.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/60dabba9302cc5226c42c1a4a6d685cf.webp" }
  ]
};

// Componente para mostrar el estado de carga
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-amber-600 mb-4" />
    <p className="text-stone-600">Cargando categorías...</p>
  </div>
);

// Componente para mostrar el estado de error
const ErrorState = ({ error, onRetry, showRetry = true }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <AlertCircle className="h-6 w-6 text-amber-500 mb-2" />
    <p className="text-stone-600 text-sm text-center max-w-md">
      {showRetry ? 'Usando menú local. ' : ''}
      {error && `Error: ${error}`}
    </p>
    {showRetry && (
      <Button onClick={onRetry} variant="outline" size="sm" className="mt-3 gap-2">
        <RefreshCw className="h-4 w-4" />
        Intentar reconectar
      </Button>
    )}
  </div>
);

// Componente para mostrar un item del menú
const MenuItem = ({ item, onAddToCart }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="aspect-w-16 aspect-h-12 bg-stone-200">
      <img
        src={item.image_url || item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
        alt={item.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
        }}
      />
    </div>
    <div className="p-6">
      <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
        {item.name}
      </h3>
      <p className="text-stone-600 mb-4 text-sm leading-relaxed">
        {item.description || item.summary || "Deliciosa opción disponible"}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-amber-600">
          ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
        </span>
        <Button
          onClick={() => onAddToCart(item)}
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Agregar
        </Button>
      </div>
    </div>
  </motion.div>
);

const Menu = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(null);
  const [menuData, setMenuData] = useState({});
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Hook para obtener categorías de la API
  const {
    categories,
    loading,
    error,
    refetch,
    hasCategories,
    isEmpty
  } = useActiveCategories();

  // Efecto para procesar las categorías y establecer el tab activo
  useEffect(() => {
    if (hasCategories && categories.length > 0) {
      // Procesar categorías de la API
      const processedData = {};
      categories.forEach(category => {
        // Por ahora usar datos de fallback para cada categoría
        // Aquí posteriormente puedes hacer una llamada adicional para obtener productos por categoría
        const fallbackCategory = Object.keys(fallbackMenuData)[0];
        processedData[category.name] = fallbackMenuData[fallbackCategory] || [];
      });
      setMenuData(processedData);
      setActiveTab(categories[0].name);
      setIsUsingFallback(false);
    } else if (isEmpty && !loading) {
      // Si no hay categorías de la API, usar datos de fallback
      console.warn('No se encontraron categorías en la API, usando datos de fallback');
      setMenuData(fallbackMenuData);
      setActiveTab(Object.keys(fallbackMenuData)[0]);
      setIsUsingFallback(true);
    }
  }, [categories, hasCategories, isEmpty, loading]);

  const handleAddToCart = (item) => {
    // Asegurar que el item tenga un precio válido
    const itemWithPrice = {
      ...item,
      price: typeof item.price === 'number' ? item.price : 0
    };
    
    addToCart(itemWithPrice);
    toast({
      title: "¡Añadido al carrito!",
      description: `${item.name} ha sido agregado a tu pedido.`,
    });
  };

  const handleRetry = () => {
    refetch();
  };

  // Estados de carga
  if (loading) {
    return (
      <section id="menu" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingState />
        </div>
      </section>
    );
  }

  // Si no hay datos, usar fallback pero mostrar mensaje
  if (Object.keys(menuData).length === 0) {
    setMenuData(fallbackMenuData);
    setActiveTab(Object.keys(fallbackMenuData)[0]);
    setIsUsingFallback(true);
  }

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nuestro Menú
          </motion.p>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sabores del Amazonas
          </motion.h2>
          
          {/* Mostrar mensaje si hay error pero se usa fallback */}
          {(error || isUsingFallback) && (
            <motion.div
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ErrorState 
                error={error} 
                onRetry={handleRetry} 
                showRetry={!!error && !isUsingFallback}
              />
            </motion.div>
          )}
        </div>

        {/* Tabs de categorías */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Items del menú */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData[activeTab]?.map((item, index) => (
            <MenuItem
              key={item.id || index}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Mensaje si no hay items en la categoría */}
        {menuData[activeTab]?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600">
              No hay productos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;