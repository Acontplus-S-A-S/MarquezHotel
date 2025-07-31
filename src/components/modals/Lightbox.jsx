// components/modals/Lightbox.jsx
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ image, onClose, images = [], currentIndex = 0 }) => {
  const [imageIndex, setImageIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Si no hay imagen, no renderizar
  if (!image && (!images || images.length === 0)) return null;

  // Determinar si estamos en modo galería múltiple o imagen única
  const isGalleryMode = images && images.length > 1;
  const currentImage = isGalleryMode ? images[imageIndex] : image;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (isGalleryMode && imageIndex > 0) {
            setImageIndex(prev => prev - 1);
            setImageLoaded(false);
          }
          break;
        case 'ArrowRight':
          if (isGalleryMode && imageIndex < images.length - 1) {
            setImageIndex(prev => prev + 1);
            setImageLoaded(false);
          }
          break;
        case 'z':
        case 'Z':
          setIsZoomed(!isZoomed);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose, isGalleryMode, imageIndex, images, isZoomed]);

  // Navigation functions
  const goToPrevious = () => {
    if (isGalleryMode && imageIndex > 0) {
      setImageIndex(prev => prev - 1);
      setImageLoaded(false);
      setIsZoomed(false);
    }
  };

  const goToNext = () => {
    if (isGalleryMode && imageIndex < images.length - 1) {
      setImageIndex(prev => prev + 1);
      setImageLoaded(false);
      setIsZoomed(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hotel-el-marquez-${currentImage.title || 'imagen'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hotel El Marquez - ${currentImage.title}`,
          text: currentImage.alt,
          url: currentImage.src,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentImage.src);
      // You could show a toast notification here
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative max-w-7xl max-h-full mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            {/* Image Counter */}
            {isGalleryMode && (
              <div className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                {imageIndex + 1} de {images.length}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
                title={isZoomed ? "Zoom Out (Z)" : "Zoom In (Z)"}
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              
              <button
                onClick={handleDownload}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
                title="Descargar imagen"
              >
                <Download size={20} />
              </button>
              
              <button
                onClick={handleShare}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
                title="Compartir imagen"
              >
                <Share2 size={20} />
              </button>
              
              <button
                onClick={onClose}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
                title="Cerrar (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {isGalleryMode && (
            <>
              <button
                onClick={goToPrevious}
                disabled={imageIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed z-10"
                title="Imagen anterior (←)"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={goToNext}
                disabled={imageIndex === images.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed z-10"
                title="Imagen siguiente (→)"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              onLoad={handleImageLoad}
              className={`max-w-full max-h-[calc(100vh-8rem)] object-contain transition-all duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              } ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onClick={() => setIsZoomed(!isZoomed)}
              draggable={false}
            />
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">{currentImage.title}</h3>
              {currentImage.alt && (
                <p className="text-sm opacity-90">{currentImage.alt}</p>
              )}
              
              {/* Keyboard Shortcuts Info */}
              <div className="mt-3 text-xs opacity-70 flex flex-wrap gap-4">
                <span>ESC: Cerrar</span>
                {isGalleryMode && (
                  <>
                    <span>← →: Navegar</span>
                  </>
                )}
                <span>Z: Zoom</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation (for gallery mode) */}
          {isGalleryMode && images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm max-w-md overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setImageIndex(index);
                      setImageLoaded(false);
                      setIsZoomed(false);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                      index === imageIndex 
                        ? 'border-yellow-500 scale-110' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;