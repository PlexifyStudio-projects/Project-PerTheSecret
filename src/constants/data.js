// ============================================================
// DATA — Perfumería The Secret · Centralized Content
// ============================================================

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
  { id: 'catalogo', label: 'Catálogo', href: '#catalogo' },
  { id: 'envases', label: 'Envases', href: '#envases' },
  { id: 'regalos', label: 'Regalos', href: '#regalos' },
  { id: 'testimonios', label: 'Testimonios', href: '#testimonios' },
];

export const HERO_DATA = {
  label: 'Perfumería Artesanal · Colombia',
  title: 'Descubre Tu',
  titleAccent: 'Esencia Secreta',
  subtitle:
    'Fragancias inspiradas en las marcas más exclusivas del mundo. Lujo y elegancia al alcance de todos.',
  ctaPrimary: 'Explorar Catálogo',
  ctaSecondary: 'Contáctanos',
};

export const MARQUEE_ITEMS = [
  'Fragancias Premium',
  'Envío a Domicilio',
  'Cajas de Regalo',
  'Atención Personalizada',
  'Perfumes Masculinos',
  'Perfumes Femeninos',
  'Calidad Garantizada',
  'Precios Accesibles',
];

export const ABOUT_SLIDES = [
  {
    label: 'Nuestra Esencia',
    title: 'El Arte de la',
    titleAccent: 'Perfumería',
    text: 'En Perfumería The Secret, cada fragancia cuenta una historia. Nos especializamos en perfumes inspirados en las casas más prestigiosas del mundo, cuidando cada detalle desde la selección de la esencia hasta la presentación final.',
    stat: { number: '500+', label: 'Clientes Felices' },
    image: 'images/product-2.jpg',
    features: [
      { icon: 'star', text: 'Fragancias Premium' },
      { icon: 'gift', text: 'Cajas de Regalo' },
      { icon: 'heart', text: 'Atención Personal' },
      { icon: 'truck', text: 'Envío Nacional' },
    ],
  },
  {
    label: 'Calidad Premium',
    title: 'Inspirados en las',
    titleAccent: 'Mejores Marcas',
    text: 'Cada uno de nuestros perfumes es cuidadosamente formulado para capturar la esencia de las fragancias más icónicas del mundo. Duración prolongada, proyección elegante y una experiencia sensorial única.',
    stat: { number: '100+', label: 'Fragancias' },
    image: 'images/product-3.jpg',
    features: [
      { icon: 'star', text: 'Alta Duración' },
      { icon: 'gift', text: 'Envases Elegantes' },
      { icon: 'heart', text: 'Fórmulas Únicas' },
      { icon: 'truck', text: 'Entrega Rápida' },
    ],
  },
  {
    label: 'Experiencia Única',
    title: 'Regalos que',
    titleAccent: 'Enamoran',
    text: 'Nuestras cajas de regalo son mucho más que un empaque. Son una experiencia completa que combina fragancias exquisitas con detalles artesanales que convierten cada obsequio en un momento inolvidable.',
    stat: { number: '5+', label: 'Años de Experiencia' },
    image: 'images/product-1.jpg',
    features: [
      { icon: 'star', text: 'Packaging Artesanal' },
      { icon: 'gift', text: 'Chocolates Incluidos' },
      { icon: 'heart', text: 'Tarjeta Personal' },
      { icon: 'truck', text: 'Envío Asegurado' },
    ],
  },
];

export const CATALOG_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'masculino', label: 'Masculinos' },
  { id: 'femenino', label: 'Femeninos' },
  { id: 'unisex', label: 'Unisex' },
];

export const CATALOG_ITEMS = [
  // ── MASCULINOS ──
  { id: 1, name: 'Boss Bottled Intense', category: 'masculino', description: 'Intensidad sofisticada para el hombre moderno.', notes: 'Manzana · Canela · Sándalo', size: '100ml', price: 'Consultar', badge: 'Popular', image: 'images/p1.jpg' },
  { id: 2, name: 'Noir Absolu', category: 'masculino', description: 'Misterioso y magnético. La esencia de la noche.', notes: 'Oud · Incienso · Vetiver', size: '100ml', price: 'Consultar', badge: 'Top Ventas', image: 'images/p2.jpg' },
  { id: 3, name: 'Chrome Sport', category: 'masculino', description: 'Frescura y dinamismo para el día a día.', notes: 'Cítricos · Lavanda · Musgo', size: '100ml', price: 'Consultar', badge: null, image: 'images/p3.jpg' },
  { id: 4, name: 'Fuego Interior', category: 'masculino', description: 'Notas cálidas y especiadas para noches especiales.', notes: 'Pimienta · Cuero · Cedro', size: '100ml', price: 'Consultar', badge: null, image: 'images/p4.jpg' },
  { id: 5, name: 'Titanium Edge', category: 'masculino', description: 'Potencia metálica con frescura acuática.', notes: 'Bergamota · Pimienta · Ámbar', size: '100ml', price: 'Consultar', badge: 'Nuevo', image: 'images/p5.jpg' },
  { id: 6, name: 'Royal Oud', category: 'masculino', description: 'La majestuosidad del oud en su máxima expresión.', notes: 'Oud · Rosa · Sándalo', size: '100ml', price: 'Consultar', badge: null, image: 'images/p6.jpg' },
  { id: 7, name: 'Savage Elixir', category: 'masculino', description: 'Salvaje y adictivo. Imposible de ignorar.', notes: 'Pomelo · Pimienta · Ámbar gris', size: '60ml', price: 'Consultar', badge: null, image: 'images/p7.jpg' },

  // ── FEMENINOS ──
  { id: 8, name: 'Ámbar Dorado', category: 'femenino', description: 'Calidez envolvente con notas de ámbar y oro.', notes: 'Ámbar · Vainilla · Almizcle', size: '80ml', price: 'Consultar', badge: 'Exclusivo', image: 'images/p8.jpg' },
  { id: 9, name: 'Fleur de Lune', category: 'femenino', description: 'Delicadeza floral para noches de luna llena.', notes: 'Peonía · Gardenia · Sándalo', size: '80ml', price: 'Consultar', badge: null, image: 'images/p9.jpg' },
  { id: 10, name: 'Violet Dream', category: 'femenino', description: 'Un sueño de violetas y jazmín.', notes: 'Violeta · Iris · Almizcle', size: '75ml', price: 'Consultar', badge: null, image: 'images/p10.jpg' },
  { id: 11, name: 'Eleganza Rosa', category: 'femenino', description: 'Sofisticación pura con pétalos de rosa.', notes: 'Rosa · Jazmín · Vainilla', size: '80ml', price: 'Consultar', badge: 'Nuevo', image: 'images/p11.jpg' },
  { id: 12, name: 'Cherry Blossom', category: 'femenino', description: 'La dulzura del cerezo japonés en cada gota.', notes: 'Cereza · Peonía · Almizcle', size: '75ml', price: 'Consultar', badge: null, image: 'images/p12.jpg' },
  { id: 13, name: 'Dolce Notte', category: 'femenino', description: 'Una noche dulce e irresistible.', notes: 'Caramelo · Coco · Madera', size: '80ml', price: 'Consultar', badge: null, image: 'images/p13.jpg' },
  { id: 14, name: 'Crystal Aura', category: 'femenino', description: 'Transparencia cristalina con destellos florales.', notes: 'Lirio · Magnolia · Cedro', size: '100ml', price: 'Consultar', badge: 'Popular', image: 'images/p14.jpg' },

  // ── UNISEX ──
  { id: 15, name: 'Aqua Vitale', category: 'unisex', description: 'Frescura acuática para espíritus libres.', notes: 'Bergamota · Agua Marina · Cedro', size: '100ml', price: 'Consultar', badge: 'Unisex', image: 'images/p15.jpg' },
  { id: 16, name: 'Zen Garden', category: 'unisex', description: 'Serenidad oriental en cada aplicación.', notes: 'Té Verde · Bambú · Almizcle', size: '100ml', price: 'Consultar', badge: null, image: 'images/p16.jpg' },
  { id: 17, name: 'Madera Sagrada', category: 'unisex', description: 'La espiritualidad del palo santo y la mirra.', notes: 'Palo Santo · Mirra · Ámbar', size: '100ml', price: 'Consultar', badge: null, image: 'images/p17.jpg' },
  { id: 18, name: 'Café Noir', category: 'unisex', description: 'La intensidad del café con toques ahumados.', notes: 'Café · Tabaco · Vainilla', size: '80ml', price: 'Consultar', badge: 'Nuevo', image: 'images/p18.jpg' },
  { id: 19, name: 'Santal Rouge', category: 'unisex', description: 'Sándalo rojo con especias orientales.', notes: 'Sándalo · Canela · Cardamomo', size: '100ml', price: 'Consultar', badge: null, image: 'images/p19.jpg' },
  { id: 20, name: 'Brisa Marina', category: 'unisex', description: 'El frescor del océano en su estado más puro.', notes: 'Sal Marina · Limón · Madera', size: '100ml', price: 'Consultar', badge: null, image: 'images/p20.jpg' },
];

// ── ENVASES (Bottles) — from client PDF catalog ──
export const ENVASES_ITEMS = [
  // Page 2 — Invictus & Creed
  { id: 'e1', name: 'Invictus', sizes: ['30ml', '60ml', '115ml'], image: 'images/envases/envase-p2-5.png' },
  { id: 'e2', name: 'Creed', sizes: ['35ml', '55ml', '100ml'], image: 'images/envases/envase-p2-9.png' },
  // Page 3 — Polo, Fahrenheit, Issey, Boss, Valentino
  { id: 'e3', name: 'Polo Black', sizes: ['100ml'], image: 'images/envases/envase-p3-2.png' },
  { id: 'e4', name: 'Fahrenheit', sizes: ['100ml'], image: 'images/envases/envase-p3-3.png' },
  { id: 'e5', name: 'Issey Miyake', sizes: ['120ml'], image: 'images/envases/envase-p3-4.png' },
  { id: 'e6', name: 'Boss', sizes: ['60ml'], image: 'images/envases/envase-p3-5.png' },
  { id: 'e7', name: 'Boss Negro', sizes: ['120ml'], image: 'images/envases/envase-p3-6.png' },
  { id: 'e8', name: 'Boss Blanco', sizes: ['120ml'], image: 'images/envases/envase-p3-7.png' },
  { id: 'e9', name: 'Boss Bottled', sizes: ['120ml'], image: 'images/envases/envase-p3-8.png' },
  { id: 'e10', name: 'Valentino', sizes: ['30ml', '55ml'], badge: 'Opalizado', image: 'images/envases/envase-p3-10.png' },
  // Page 4 — Valentino, 212 Men, Bad Boy, Polo, Puño, Legend
  { id: 'e11', name: 'Valentino Original', sizes: ['105ml'], image: 'images/envases/envase-p4-2.png' },
  { id: 'e12', name: 'Valentino Negro', sizes: ['105ml'], image: 'images/envases/envase-p4-3.png' },
  { id: 'e13', name: '212 Men', sizes: ['100ml'], badge: 'Tipo Original', image: 'images/envases/envase-p4-4.png' },
  { id: 'e14', name: 'Bad Boy', sizes: ['100ml'], image: 'images/envases/envase-p4-5.png' },
  { id: 'e15', name: 'Polo Red', sizes: ['100ml'], image: 'images/envases/envase-p4-6.png' },
  { id: 'e16', name: 'Polo Blue', sizes: ['130ml'], soldOut: true, image: 'images/envases/envase-p4-7.png' },
  { id: 'e17', name: 'Puño', sizes: ['60ml', '80ml'], soldOut: true, image: 'images/envases/envase-p4-9.png' },
  { id: 'e18', name: 'Legend', sizes: ['100ml'], image: 'images/envases/envase-p4-10.png' },
  // Page 5 — Lacoste
  { id: 'e19', name: 'Lacoste Red', sizes: ['100ml'], image: 'images/envases/envase-p5-2.png' },
  { id: 'e20', name: 'Lacoste Rojo', sizes: ['100ml'], image: 'images/envases/envase-p5-4.png' },
  { id: 'e21', name: 'Lacoste Negro', sizes: ['100ml'], image: 'images/envases/envase-p5-5.png' },
  { id: 'e22', name: 'Lacoste Blanca', sizes: ['100ml'], image: 'images/envases/envase-p5-9.png' },
  { id: 'e23', name: 'Lacoste Magnetic', sizes: ['100ml'], image: 'images/envases/envase-p5-10.png' },
  // Page 6 — Dior, Chanel, Swiss Army, 212 VIP, Jean Paul, Granada, Phantom
  { id: 'e24', name: 'Dior Sauvage', sizes: ['50ml', '100ml'], image: 'images/envases/envase-p6-2.png' },
  { id: 'e25', name: 'Bleu de Chanel', sizes: ['55ml', '115ml'], image: 'images/envases/envase-p6-4.png' },
  { id: 'e26', name: 'Swiss Army', sizes: ['105ml'], image: 'images/envases/envase-p6-5.png' },
  { id: 'e27', name: '212 VIP', sizes: ['150ml'], image: 'images/envases/envase-p6-7.png' },
  { id: 'e28', name: 'Jean Paul', sizes: ['60ml'], image: 'images/envases/envase-p6-8.png' },
  { id: 'e29', name: 'Granada', sizes: ['110ml'], image: 'images/envases/envase-p6-9.png' },
  { id: 'e30', name: 'Phantom', sizes: ['100ml'], badge: 'Tipo Original', image: 'images/envases/envase-p6-10.png' },
  // Page 7 — Santal 33, Osito Moschino
  { id: 'e31', name: 'Santal 33', sizes: ['35ml', '60ml', '150ml'], image: 'images/envases/envase-p7-6.png' },
  { id: 'e32', name: 'Osito Moschino', sizes: ['35ml', '55ml'], image: 'images/envases/envase-p7-10.png' },
  // Page 8 — Moon, Yara
  { id: 'e33', name: 'Moon', sizes: ['30ml', '60ml'], image: 'images/envases/envase-p8-3.png' },
  { id: 'e34', name: 'Yara', sizes: ['30ml', '50ml', '100ml'], image: 'images/envases/envase-p8-5.png' },
];

export const GIFT_BOXES = [
  {
    id: 1,
    name: 'Caja Romántica',
    description:
      'Perfecta para sorprender a esa persona especial con una presentación premium llena de detalles.',
    includes: ['Perfume', 'Caja Decorada', 'Lazo Premium', 'Ferrero Rocher'],
    image: 'images/gift-1.jpg',
  },
  {
    id: 2,
    name: 'Ten Un Lindo Día',
    description:
      'Un detalle que ilumina cualquier momento. Presentación delicada en tonos dorados y rosa.',
    includes: ['Perfume', 'Caja Temática', 'Moño Artesanal', 'Chocolate'],
    image: 'images/gift-2.jpg',
  },
  {
    id: 3,
    name: 'Caja Sorpresa Azul',
    description:
      'Ideal para él. Elegancia masculina que dice "Ábrelo, te encantará".',
    includes: ['Perfume', 'Caja Premium', 'Lazo Azul', 'Ferrero Rocher'],
    image: 'images/gift-3.jpg',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'Increíble la calidad del perfume. La presentación en caja de regalo fue perfecta para el cumpleaños de mi novio. Sin duda volveré a comprar.',
    author: 'María Gómez',
    role: 'Cliente desde 2024',
    stars: 5,
    image: 'images/gift-1.jpg',
  },
  {
    id: 2,
    text: 'Me encantó el trato personalizado. Me ayudaron a elegir la fragancia ideal y la caja de regalo quedó espectacular. Servicio de primera.',
    author: 'Carlos Ramírez',
    role: 'Cliente frecuente',
    stars: 5,
    image: 'images/product-2.jpg',
  },
  {
    id: 3,
    text: 'Los perfumes duran todo el día y huelen idéntico a las marcas originales. Precio increíble por la calidad que ofrecen. 100% recomendado.',
    author: 'Ana Pérez',
    role: 'Cliente desde 2025',
    stars: 5,
    image: 'images/product-1.jpg',
  },
  {
    id: 4,
    text: 'Pedí el Noir Absolu para mi esposo y quedó fascinado. La proyección es brutal, le dura desde la mañana hasta la noche. Ya van tres perfumes que les compro.',
    author: 'Valentina Herrera',
    role: 'Cliente frecuente',
    stars: 5,
    image: 'images/p2.jpg',
  },
  {
    id: 5,
    text: 'Les escribí por WhatsApp a las 10pm y me respondieron al instante. Me asesoraron con paciencia y al otro día tenía mi pedido en la puerta. Ese servicio no se encuentra fácil.',
    author: 'Andrés Castillo',
    role: 'Primera compra',
    stars: 5,
    image: 'images/product-3.jpg',
  },
  {
    id: 6,
    text: 'Compré la Caja Romántica para el aniversario con mi novia y casi llora de la emoción. Los Ferrero Rocher, el lazo, todo impecable. Se nota el amor en cada detalle.',
    author: 'Santiago Mejía',
    role: 'Cliente desde 2024',
    stars: 5,
    image: 'images/gift-2.jpg',
  },
  {
    id: 7,
    text: 'Soy súper exigente con las fragancias y el Ámbar Dorado me conquistó. Recibo cumplidos todo el tiempo. Ya les recomendé a todas mis amigas del trabajo.',
    author: 'Laura Ríos',
    role: 'Cliente frecuente',
    stars: 5,
    image: 'images/p8.jpg',
  },
  {
    id: 8,
    text: 'Necesitaba un regalo de último momento para el día de la madre y me salvaron la vida. Envío rapidísimo a Bucaramanga y la caja llegó perfecta. Mi mamá quedó feliz.',
    author: 'Julián Vargas',
    role: 'Primera compra',
    stars: 5,
    image: 'images/gift-3.jpg',
  },
  {
    id: 9,
    text: 'Lo que más me gusta es que puedes probar fragancias sin gastar una fortuna. El Savage Elixir huele exactamente igual al original. Increíble relación calidad-precio.',
    author: 'Camila Duarte',
    role: 'Cliente desde 2025',
    stars: 5,
    image: 'images/p7.jpg',
  },
  {
    id: 10,
    text: 'Ya he comprado más de 6 perfumes y cada uno ha sido un acierto. El Bleu de Chanel y el Zen Garden son mis favoritos. Se convirtieron en mi perfumería de confianza.',
    author: 'Diego Parra',
    role: 'Cliente frecuente',
    stars: 5,
    image: 'images/product-4.jpg',
  },
  {
    id: 11,
    text: 'Pedí la Caja Sorpresa Azul para mi papá y la presentación era de otro nivel. El lazo azul, los chocolates... parecía de una marca de lujo internacional. Volveré siempre.',
    author: 'Isabella Moreno',
    role: 'Cliente desde 2024',
    stars: 5,
    image: 'images/product-5.jpg',
  },
  {
    id: 12,
    text: 'Llegué por recomendación de una amiga y no me arrepiento. El Cherry Blossom es divino, dulce pero elegante. Además la atención por WhatsApp es súper rápida y amable.',
    author: 'Natalia Quintero',
    role: 'Primera compra',
    stars: 5,
    image: 'images/p12.jpg',
  },
  {
    id: 13,
    text: 'Tengo perfumes originales y honestamente estos están al mismo nivel. El Royal Oud tiene una profundidad impresionante. Mis compañeros en la oficina siempre preguntan qué uso.',
    author: 'Felipe Torres',
    role: 'Cliente desde 2025',
    stars: 5,
    image: 'images/p6.jpg',
  },
  {
    id: 14,
    text: 'Compré el set "Ten Un Lindo Día" para mi mejor amiga y la presentación en tonos dorados y rosa fue hermosísima. Me pidió que le dijera dónde lo conseguí. Publicidad gratuita para ustedes.',
    author: 'Daniela Ospina',
    role: 'Cliente frecuente',
    stars: 5,
    image: 'images/product-6.jpg',
  },
  {
    id: 15,
    text: 'Lo que diferencia a The Secret es la experiencia completa: la asesoría, el empaque, la rapidez. Pedí Madera Sagrada y Café Noir y ambos son espectaculares. Esto es lujo accesible de verdad.',
    author: 'Sebastián Restrepo',
    role: 'Cliente desde 2024',
    stars: 5,
    image: 'images/p18.jpg',
  },
];

export const CONTACT_DATA = {
  label: 'Contáctanos',
  title: 'Hablemos de Tu',
  titleAccent: 'Fragancia Ideal',
  description:
    'Estamos aquí para ayudarte a encontrar el perfume perfecto o preparar ese regalo especial que buscas.',
  phone: '+57 317-469-0412',
  email: 'perfumeriathesecrets@gmail.com',
  location: 'Bucaramanga, Colombia',
  instagram: '@perfumeriathesecret',
  whatsappNumber: '573174690412',
  whatsappMessage: '¡Hola! Me interesa conocer más sobre sus perfumes.',
};

export const FOOTER_DATA = {
  tagline:
    'Fragancias inspiradas en las mejores marcas del mundo. Lujo y elegancia al alcance de todos.',
  quickLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Cajas de Regalo', href: '#regalos' },
    { label: 'Contacto', href: '#contacto' },
  ],
  services: [
    'Perfumes Masculinos',
    'Perfumes Femeninos',
    'Cajas de Regalo',
    'Envío a Domicilio',
  ],
};
