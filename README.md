# Hotel El Marquez - Sitio Web

Sitio web moderno y responsivo para Hotel El Marquez, ubicado en El Coca, Orellana, Ecuador. Desarrollado con React, Tailwind CSS y Framer Motion.

## 🚀 Características

- ✨ Diseño moderno y elegante
- 📱 Completamente responsivo
- 🎨 Animaciones suaves con Framer Motion
- 🏨 Galería de imágenes interactiva
- 📝 Formulario de reservas
- 💬 Integración con WhatsApp
- 🗺️ Mapa de ubicación integrado
- ⚡ Optimizado para performance

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Build Tool:** Vite
- **Lenguaje:** JavaScript/JSX

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🔧 Instalación y Configuración

### 1. Clonar o crear el proyecto

```bash
# Crear nueva carpeta para el proyecto
mkdir hotel-el-marquez
cd hotel-el-marquez

# Inicializar el proyecto
npm init -y
```

### 2. Instalar dependencias

```bash
# Instalar dependencias de producción
npm install react react-dom framer-motion lucide-react clsx

# Instalar dependencias de desarrollo
npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss vite
```

### 3. Configurar Tailwind CSS

```bash
# Inicializar Tailwind CSS
npx tailwindcss init -p
```

### 4. Estructura de archivos

```
hotel-el-marquez/
├── public/
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Scripts de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Limpiar carpeta dist
npm run clean
```

## 🎨 Personalización

### Colores del tema
Los colores principales se pueden modificar en `tailwind.config.js`:

```javascript
colors: {
  yellow: {
    // Personalizar tonos de amarillo
  }
}
```

### Contenido del hotel
Editar el archivo `src/App.jsx` para modificar:
- Nombre del hotel
- Información de contacto
- Habitaciones y precios
- Testimonios
- Galería de imágenes

### Imágenes
- Reemplazar URLs de Unsplash con imágenes reales del hotel
- Agregar imágenes a la carpeta `public/` si es necesario

## 📱 Integración WhatsApp

El botón flotante de WhatsApp está configurado con el número:
**+593 96 288-0127**

Para cambiarlo, editar en `FloatingWhatsApp` component:
```javascript
const whatsappUrl = `https://wa.me/TU_NUMERO?text=${message}`;
```

## 🗺️ Configuración del Mapa

El mapa está configurado para El Coca, Orellana. Para actualizar la ubicación:

1. Obtener las coordenadas exactas del hotel
2. Actualizar el `src` del iframe en `MapSection` component
3. Usar Google Maps Embed API para generar el nuevo enlace

## 🚀 Despliegue

### Opciones de Hosting

1. **Vercel** (Recomendado)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm run build
   # Subir carpeta dist/ a Netlify
   ```

3. **GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   npm run build
   npx gh-pages -d dist
   ```

## 📈 SEO y Performance

- Meta tags configurados en `index.html`
- Imágenes optimizadas con lazy loading
- Código minificado en producción
- CSS optimizado con Tailwind

## 🔧 Mantenimiento

### Actualizar contenido
- Precios de habitaciones en `RoomsSection`
- Testimonios en `TestimonialsSection`
- Información de contacto en `Footer`

### Agregar nuevas secciones
- Crear componente en `src/App.jsx`
- Agregar referencia en `sectionRefs`
- Incluir en navegación del `Header`

## 📞 Soporte

Para soporte técnico o modificaciones, contactar:
- Email: desarrollo@acontplus.com
- Teléfono: +593 6 288-0127

## 📄 Licencia

© 2024 Acontplus S.A.S. Todos los derechos reservados.

---

**Desarrollado por Acontplus S.A.S Ecuador**
Stack: Angular, .NET, SQL Server, Flutter, AWS