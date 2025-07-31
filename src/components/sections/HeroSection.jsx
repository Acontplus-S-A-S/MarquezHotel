// components/sections/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onBookNow, onSeeRooms }) => {
  const heroImage = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.h1 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-shadow"
        >
          Hotel El Marquez
        </motion.h1>
        
        <motion.p 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-shadow"
        >
          Elegancia colonial en el corazón de Ecuador. Donde la tradición se encuentra con el lujo moderno.
        </motion.p>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button 
            onClick={onBookNow}
            variants={buttonVariants}
            whileHover="hover"
            className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors duration-200 shadow-lg"
          >
            Reservar Ahora
          </motion.button>
          
          <motion.button 
            onClick={onSeeRooms}
            variants={buttonVariants}
            whileHover="hover"
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-200 shadow-lg"
          >
            Ver Habitaciones
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;