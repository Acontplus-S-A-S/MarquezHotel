// src/App.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';

// Componentes principales
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Reservation from '@/components/sections/Reservation';

function App() {
  return (
    <CartProvider>
      {/* Meta tags y SEO */}
      <Helmet>
        <title>MIKUNA CAFETERIA - Cafetería Amazónica | Amor, Paz y Café</title>
        <meta 
          name="description" 
          content="Descubre MIKUNA CAFETERIA, tu rincón de sabor amazónico. Disfruta de café de especialidad, comida orgánica y un ambiente único. Amor, Paz y Café en cada experiencia." 
        />
        <meta name="keywords" content="café, cafetería, amazónico, orgánico, Quito, Ecuador, especialidad" />
        <meta name="author" content="MIKUNA CAFETERIA" />
        
        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="MIKUNA CAFETERIA - Cafetería Amazónica" />
        <meta property="og:description" content="Tu rincón de sabor amazónico. Amor, Paz y Café en cada experiencia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mikunacafeteria.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MIKUNA CAFETERIA - Cafetería Amazónica" />
        <meta name="twitter:description" content="Tu rincón de sabor amazónico. Amor, Paz y Café en cada experiencia." />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>

      {/* Contenido principal de la aplicación */}
      <div className="bg-stone-50 text-stone-800">
        {/* Header de navegación */}
        <Header />
        
        {/* Contenido principal */}
        <main>
          {/* Sección Hero/Banner principal */}
          <Hero />
          
          {/* Sección Acerca de nosotros */}
          <About />
          
          {/* Sección del Menú (con integración API) */}
          <Menu />
          
          {/* Sección de Reservas */}
          <Reservation />
          
          {/* Galería de imágenes */}
          <Gallery />
          
          {/* Testimonios de clientes */}
          <Testimonials />
          
          {/* Información de contacto */}
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Carrito de compras (modal lateral) */}
        <ShoppingCart />
        
        {/* Sistema de notificaciones toast */}
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;