// components/sections/GallerySection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn } from 'lucide-react';

const GallerySection = ({ images, onImageClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleImageClick = (image, index) => {
    onImageClick(image);
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
            Nuestra <span className="text-yellow-600">Galería</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre los espacios y experiencias que te esperan en Hotel El Marquez. 
            Cada rincón cuenta una historia de elegancia y confort.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => handleImageClick(image, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Hover Content */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90">Click para ampliar</p>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 via-black/20 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Eye size={16} />
                    <span>Ver en detalle</span>
                  </div>
                </div>
              </div>

              {/* Card Effect */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ZoomIn size={20} className="text-gray-700" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Vista panorámica del hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Vive la Experiencia Completa
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Desde nuestros elegantes espacios comunes hasta las vistas impresionantes 
                  del río Napo, cada momento en Hotel El Marquez es una invitación a descubrir 
                  la belleza única de la Amazonía ecuatoriana.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">360°</div>
                    <div className="text-sm text-gray-600">Vistas panorámicas</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">24/7</div>
                    <div className="text-sm text-gray-600">Espacios disponibles</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">100%</div>
                    <div className="text-sm text-gray-600">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;