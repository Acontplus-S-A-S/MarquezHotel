# Hotel El Marquez - Versión Modular

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx                 # Navegación principal
│   │   └── Footer.jsx                 # Pie de página
│   ├── sections/
│   │   ├── HeroSection.jsx            # Sección principal
│   │   ├── ReservationBar.jsx         # Barra de reservas
│   │   ├── ValueProposition.jsx       # Propuesta de valor
│   │   ├── RoomsSection.jsx           # Carrusel de habitaciones
│   │   ├── GallerySection.jsx         # Galería de imágenes
│   │   ├── TestimonialsSection.jsx    # Testimonios
│   │   └── MapSection.jsx             # Mapa y ubicación
│   ├── modals/
│   │   ├── ReservationModal.jsx       # Modal de reservas
│   │   ├── RoomDetailModal.jsx        # Detalle de habitación
│   │   └── Lightbox.jsx               # Galería expandida
│   ├── ui/
│   │   └── FloatingWhatsApp.jsx       # Botón WhatsApp flotante
│   └── index.js                       # Barrel exports
├── data/
│   ├── rooms.js                       # Datos de habitaciones
│   ├── gallery.js                     # Imágenes de galería
│   └── testimonials.js                # Testimonios y features
├── hooks/
│   └── useNavigation.js               # Hook de navegación
├── utils/
│   ├── whatsapp.js                    # Utilidades WhatsApp
│   └── dateUtils.js                   # Utilidades de fechas
└── App.jsx                            # Componente principal
```

## 🎯 Ventajas de la Estructura Modular

### ✅ **Mantenibilidad**
- **Separación de responsabilidades**: Cada componente tiene una función específica
- **Código más limpio**: Archivos pequeños y enfocados
- **Fácil debugging**: Problemas aislados en componentes específicos

### ✅ **Escalabilidad**
- **Fácil agregar features**: Nuevos componentes sin afectar existentes
- **Reutilización de código**: Componentes pueden usarse en otras partes
- **Estructura clara**: Nuevos desarrolladores entienden rápidamente

### ✅ **Colaboración en Equipo**
- **Trabajo paralelo**: Diferentes desarrolladores en diferentes componentes
- **Menos conflictos Git**: Archivos separados = menos merge conflicts
- **Code reviews focalizados**: Revisar cambios específicos por componente

### ✅ **Testing**
- **Tests unitarios**: Probar componentes individualmente
- **Mocking fácil**: Aislar dependencias por componente
- **Cobertura específica**: Identificar qué componentes necesitan más tests

## 📁 Descripción de Carpetas

### `/components`
Todos los componentes React organizados por categoría:

- **`/layout`**: Componentes de estructura (Header, Footer)
- **`/sections`**: Secciones principales de la página
- **`/modals`**: Ventanas modales y overlays
- **`/ui`**: Componentes de interfaz reutilizables

### `/data`
Datos estáticos separados de la lógica:

- **`rooms.js`**: Información de habitaciones
- **`gallery.js`**: Imágenes y metadatos
- **`testimonials.js`**: Reseñas y características del hotel

### `/hooks`
Custom hooks para lógica reutilizable:

- **`useNavigation.js`**: Manejo de navegación suave

### `/utils`
Funciones utilitarias puras:

- **`whatsapp.js`**: Generación de URLs y mensajes WhatsApp
- **`dateUtils.js`**: Manipulación y validación de fechas

## 🚀 Cómo Usar la Estructura

### 1. **Importaciones Limpias**
```javascript
// ❌ Antes (monolítico)
import { ReservationModal, RoomDetailModal, Lightbox } from './App';

// ✅ Ahora (modular)
import { ReservationModal, RoomDetailModal, Lightbox } from './components';
```

### 2. **Modificar Componentes**
```javascript
// Editar solo el archivo específico
src/components/sections/RoomsSection.jsx

// Sin afectar otros componentes
```

### 3. **Agregar Nuevas Funcionalidades**
```javascript
// Crear nuevo componente
src/components/sections/SpecialOffersSection.jsx

// Agregar al barrel export
export { default as SpecialOffersSection } from './sections/SpecialOffersSection';

// Importar en App.jsx
import { SpecialOffersSection } from './components';
```

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Convenciones de Código

### **Nombres de Archivos**
- Componentes: `PascalCase.jsx`
- Hooks: `camelCase.js`
- Utilidades: `camelCase.js`
- Datos: `camelCase.js`

### **Estructura de Componentes**
```javascript
// 1. Imports externos
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Imports internos
import { useNavigation } from '../../hooks/useNavigation';
import { rooms } from '../../data/rooms';

// 3. Componente principal
const ComponentName = ({ prop1, prop2 }) => {
  // Estados
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 4. Export
export default ComponentName;
```

### **Props y Estado**
- Props: Descriptivos y específicos
- Estado: Minimal y bien estructurado
- Handlers: Prefijo `handle`

## 🔧 Mejoras Futuras

### **Próximas Implementaciones**
1. **Testing**: Jest + React Testing Library
2. **Storybook**: Documentación de componentes
3. **TypeScript**: Tipado estático
4. **Error Boundaries**: Manejo de errores
5. **Performance**: React.memo, useMemo, useCallback

### **Estructura Avanzada**
```
src/
├── __tests__/              # Tests unitarios
├── stories/                # Storybook stories
├── types/                  # TypeScript types
├── context/                # React Context
├── services/               # API calls
├── constants/              # Constantes globales
└── styles/                 # Estilos globales
```

## 🎯 Beneficios para Acontplus

Como empresa de software, esta estructura modular ofrece:

1. **Desarrollo más rápido**: Componentes reutilizables
2. **Menor tiempo de onboarding**: Estructura clara para nuevos devs
3. **Mantenimiento eficiente**: Cambios localizados
4. **Calidad superior**: Separación de responsabilidades
5. **Escalabilidad**: Fácil crecimiento del proyecto

---

**Desarrollado con ❤️ por Acontplus S.A.S Ecuador**
*Aplicando las mejores prácticas de desarrollo moderno*