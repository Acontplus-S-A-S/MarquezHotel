// components/sections/ValueProposition.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Coffee, MapPin } from 'lucide-react';
import { hotelFeatures } from '../../data/testimonials';

const ValueProposition = ({ hotelName }) => {
  // Mapeo de iconos string a componentes
  const iconComponents = {
    Shield: Shield,
    Coffee: Coffee,
    MapPin: MapPin
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
            ¿Por qué elegir <span className="text-yellow-600">{hotelName}</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experiencia única en la Amazonía ecuatoriana con servicios de primera clase y hospitalidad genuina.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {hotelFeatures.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon];
            
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                {/* Icon */}
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <IconComponent className="text-white" size={32} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-gray-600 font-medium">Años de experiencia</div>
            </div>
            
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                5,000+
              </div>
              <div className="text-gray-600 font-medium">Huéspedes felices</div>
            </div>
            
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                4.9
              </div>
              <div className="text-gray-600 font-medium">Rating promedio</div>
            </div>
            
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Atención al cliente</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para vivir la experiencia amazónica?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Descubre la magia de Ecuador en nuestro oasis de confort y elegancia.
            </p>
            <button className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Explorar Habitaciones
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;