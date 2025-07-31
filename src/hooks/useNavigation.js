// hooks/useNavigation.js
import { useCallback } from 'react';

/**
 * Custom hook para manejar la navegación suave entre secciones
 * @param {Object} sectionRefs - Objeto con las referencias de las secciones
 * @returns {Object} - Objeto con la función handleNavClick
 */
const useNavigation = (sectionRefs) => {
  const handleNavClick = useCallback((sectionId) => {
    const element = sectionRefs[sectionId]?.current;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [sectionRefs]);

  return { handleNavClick };
};

export default useNavigation;