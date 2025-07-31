// components/index.js - Barrel exports for cleaner imports

// Layout Components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';

// Section Components
export { default as HeroSection } from './sections/HeroSection';
export { default as ReservationBar } from './sections/ReservationBar';
export { default as ValueProposition } from './sections/ValueProposition';
export { default as RoomsSection } from './sections/RoomsSection';
export { default as GallerySection } from './sections/GallerySection';
export { default as TestimonialsSection } from './sections/TestimonialsSection';
export { default as MapSection } from './sections/MapSection';

// Modal Components
export { default as ReservationModal } from './modals/ReservationModal';
export { default as RoomDetailModal } from './modals/RoomDetailModal';
export { default as Lightbox } from './modals/Lightbox';

// UI Components
export { default as FloatingWhatsApp } from './ui/FloatingWhatsApp';

// ============================================
// USAGE EXAMPLES:
// ============================================

// Instead of multiple imports:
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import HeroSection from './components/sections/HeroSection';

// Use single barrel import:
// import { Header, Footer, HeroSection } from './components';

// ============================================
// COMPONENT ORGANIZATION:
// ============================================

// LAYOUT: Components that define the structure
// - Header: Navigation and branding
// - Footer: Links, contact info, copyright

// SECTIONS: Main content sections of the page
// - HeroSection: Main banner with CTA
// - ReservationBar: Quick booking form
// - ValueProposition: Why choose us
// - RoomsSection: Room carousel and details
// - GallerySection: Image gallery
// - TestimonialsSection: Customer reviews
// - MapSection: Location and contact

// MODALS: Overlay components
// - ReservationModal: Booking form modal
// - RoomDetailModal: Detailed room information
// - Lightbox: Image viewer

// UI: Reusable interface components
// - FloatingWhatsApp: Sticky contact button