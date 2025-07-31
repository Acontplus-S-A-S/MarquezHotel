// data/rooms.js
export const rooms = [
  {
    id: 1,
    name: "Habitación Estándar",
    subtitle: "Comodidad Esencial",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 85,
    originalPrice: 95,
    capacity: 2,
    size: "25 m²",
    view: "Vista a los jardines",
    rating: 4.8,
    amenities: [
      { icon: "wifi", name: "WiFi gratuito" },
      { icon: "tv", name: "TV cable HD" },
      { icon: "ac", name: "Aire acondicionado" },
      { icon: "bath", name: "Baño privado" },
      { icon: "safe", name: "Caja fuerte" },
      { icon: "coffee", name: "Cafetera" }
    ],
    features: ["Cama King", "Escritorio", "Mini refrigerador", "Balcón privado"],
    description: "Habitación elegante con todas las comodidades modernas. Perfecta para viajeros que buscan confort y funcionalidad en un ambiente acogedor.",
    highlights: ["Renovada recientemente", "Vista a jardines tropicales", "Desayuno incluido"]
  },
  {
    id: 2,
    name: "Habitación Superior",
    subtitle: "Elegancia Amazónica",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 120,
    originalPrice: 140,
    capacity: 3,
    size: "35 m²",
    view: "Vista parcial al río Napo",
    rating: 4.9,
    amenities: [
      { icon: "wifi", name: "WiFi gratuito" },
      { icon: "tv", name: "Smart TV 55''" },
      { icon: "ac", name: "Climatización dual" },
      { icon: "minibar", name: "Minibar premium" },
      { icon: "river", name: "Vista al río" },
      { icon: "jacuzzi", name: "Bañera de hidromasaje" }
    ],
    features: ["Cama King + Sofá cama", "Área de estar", "Terraza privada", "Amenidades de lujo"],
    description: "Habitación espaciosa con vista parcial al majestuoso río Napo. Diseñada para brindar una experiencia superior con toques amazónicos únicos.",
    highlights: ["Vista al río Napo", "Terraza con hamaca", "Amenidades premium"]
  },
  {
    id: 3,
    name: "Suite Junior",
    subtitle: "Lujo Tropical",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 180,
    originalPrice: 210,
    capacity: 4,
    size: "50 m²",
    view: "Vista panorámica al río",
    rating: 5.0,
    amenities: [
      { icon: "wifi", name: "WiFi premium" },
      { icon: "tv", name: "Smart TV 65''" },
      { icon: "ac", name: "Climatización inteligente" },
      { icon: "minibar", name: "Minibar gourmet" },
      { icon: "living", name: "Sala de estar" },
      { icon: "spa", name: "Kit de spa privado" }
    ],
    features: ["Suite dos ambientes", "Sala de estar independiente", "Terraza panorámica", "Servicio de mayordomo"],
    description: "Suite elegante con sala de estar separada y vista panorámica al río Napo. El refugio perfecto para familias que buscan lujo y comodidad absoluta.",
    highlights: ["Vista panorámica 180°", "Servicio de mayordomo", "Kit de bienvenida gourmet"]
  },
  {
    id: 4,
    name: "Suite Presidencial",
    subtitle: "Experiencia Exclusiva",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520637736862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 280,
    originalPrice: 320,
    capacity: 6,
    size: "75 m²",
    view: "Vista panorámica 360°",
    rating: 5.0,
    amenities: [
      { icon: "wifi", name: "WiFi ultra-rápido" },
      { icon: "entertainment", name: "Sistema de entretenimiento" },
      { icon: "ac", name: "Control climático premium" },
      { icon: "kitchen", name: "Kitchenette" },
      { icon: "jacuzzi", name: "Jacuzzi privado" },
      { icon: "concierge", name: "Servicio de concierge 24/7" }
    ],
    features: ["Suite tres ambientes", "Comedor privado", "Jacuzzi en terraza", "Acceso VIP"],
    description: "La suite más exclusiva del hotel con vistas panorámicas de 360° y servicios premium. Una experiencia única en el corazón de la Amazonía.",
    highlights: ["Acceso VIP", "Jacuzzi panorámico", "Chef privado disponible"]
  }
];