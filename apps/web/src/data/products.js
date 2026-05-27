
const products = [
  {
    id: 1,
    title: "The Art of Luxury Living",
    subtitle: "A comprehensive guide to refined lifestyle",
    description: "<p>Discover the principles of luxury living through this meticulously crafted e-book. Learn how to curate your environment, develop sophisticated tastes, and embrace a lifestyle of intentional elegance.</p><p>This 150-page digital guide covers interior design, personal style, entertaining with grace, and cultivating meaningful experiences.</p>",
    category: "E-books",
    price_in_cents: 4900,
    price_formatted: "$49.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80" }
    ],
    ribbon_text: "Bestseller",
    rating: 4.9,
    review_count: 127,
    purchasable: true,
    variants: [
      {
        id: 101,
        title: "Digital Download",
        price_in_cents: 4900,
        price_formatted: "$49.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 1,
        title: "What's Included",
        description: "<p>150 pages of expert guidance, 50+ high-resolution images, downloadable worksheets, and lifetime access to updates.</p>",
        order: 1
      }
    ]
  },
  {
    id: 2,
    title: "Digital Minimalism Guide",
    subtitle: "Simplify your digital life with intention",
    description: "<p>Master the art of digital minimalism and reclaim your time, focus, and peace of mind. This practical e-book provides actionable strategies for reducing digital clutter and creating meaningful online experiences.</p><p>Learn to curate your digital spaces with the same care you bring to your physical environment.</p>",
    category: "E-books",
    price_in_cents: 3900,
    price_formatted: "$39.00",
    sale_price_in_cents: 2900,
    sale_price_formatted: "$29.00",
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&q=80" }
    ],
    ribbon_text: "Sale",
    rating: 4.7,
    review_count: 89,
    purchasable: true,
    variants: [
      {
        id: 102,
        title: "Digital Download",
        price_in_cents: 3900,
        price_formatted: "$39.00",
        sale_price_in_cents: 2900,
        sale_price_formatted: "$29.00",
        manage_inventory: false,
        inventory_quantity: 999,
        image_url: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: []
  },
  {
    id: 3,
    title: "Building Your Personal Brand",
    subtitle: "6-week intensive online course",
    description: "<p>Transform your professional presence with this comprehensive 6-week course. Learn to define your unique value proposition, craft compelling narratives, and build an authentic personal brand that opens doors.</p><p>Includes video lessons, workbooks, templates, and access to our exclusive community.</p>",
    category: "Courses",
    price_in_cents: 29900,
    price_formatted: "$299.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" }
    ],
    ribbon_text: "Premium",
    rating: 5.0,
    review_count: 64,
    purchasable: true,
    variants: [
      {
        id: 103,
        title: "Full Course Access",
        price_in_cents: 29900,
        price_formatted: "$299.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 2,
        title: "Course Curriculum",
        description: "<p>Week 1-2: Brand Foundation & Strategy<br/>Week 3-4: Visual Identity & Messaging<br/>Week 5-6: Implementation & Growth</p>",
        order: 1
      }
    ]
  },
  {
    id: 4,
    title: "Luxury Product Photography",
    subtitle: "Master the art of visual storytelling",
    description: "<p>Elevate your product photography skills with this hands-on course. Learn professional lighting techniques, composition principles, and post-processing workflows used by top luxury brands.</p><p>Perfect for entrepreneurs, content creators, and aspiring photographers.</p>",
    category: "Courses",
    price_in_cents: 19900,
    price_formatted: "$199.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80" }
    ],
    ribbon_text: null,
    rating: 4.8,
    review_count: 52,
    purchasable: true,
    variants: [
      {
        id: 104,
        title: "Full Course Access",
        price_in_cents: 19900,
        price_formatted: "$199.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        image_url: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: []
  },
  {
    id: 5,
    title: "Gold Vermeil Necklace",
    subtitle: "Delicate chain with pendant",
    description: "<p>Handcrafted 18k gold vermeil necklace featuring a minimalist pendant design. This timeless piece adds subtle elegance to any ensemble, from casual to formal.</p><p>Chain length: 16-18 inches adjustable. Pendant: 0.5 inches. Hypoallergenic and tarnish-resistant.</p>",
    category: "Jewelry",
    price_in_cents: 12900,
    price_formatted: "$129.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1694868016080-6ad62c44e50e?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1694868016080-6ad62c44e50e?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80" }
    ],
    ribbon_text: "New Arrival",
    rating: 4.9,
    review_count: 43,
    purchasable: true,
    variants: [
      {
        id: 105,
        title: "16-18 inch",
        price_in_cents: 12900,
        price_formatted: "$129.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: true,
        inventory_quantity: 12,
        image_url: "https://images.unsplash.com/photo-1694868016080-6ad62c44e50e?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 3,
        title: "Care Instructions",
        description: "<p>Store in a cool, dry place. Avoid contact with perfumes and lotions. Clean gently with a soft cloth.</p>",
        order: 1
      }
    ]
  },
  {
    id: 6,
    title: "Pearl Drop Earrings",
    subtitle: "Freshwater pearls in gold setting",
    description: "<p>Elegant freshwater pearl earrings set in 14k gold-filled settings. These classic drops feature lustrous 8mm pearls that catch the light beautifully.</p><p>Perfect for weddings, special occasions, or everyday sophistication. Comes with secure butterfly backs.</p>",
    category: "Jewelry",
    price_in_cents: 8900,
    price_formatted: "$89.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1630871533698-1f5e2d2586b4?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1630871533698-1f5e2d2586b4?w=800&q=80" }
    ],
    ribbon_text: null,
    rating: 5.0,
    review_count: 78,
    purchasable: true,
    variants: [
      {
        id: 106,
        title: "Standard",
        price_in_cents: 8900,
        price_formatted: "$89.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: true,
        inventory_quantity: 8,
        image_url: "https://images.unsplash.com/photo-1630871533698-1f5e2d2586b4?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: []
  },
  {
    id: 7,
    title: "Signature Ring Collection",
    subtitle: "Set of three stackable rings",
    description: "<p>Curated set of three delicate stackable rings in mixed metals. Includes one gold vermeil band, one rose gold band, and one sterling silver band with subtle texture.</p><p>Wear together or separately for versatile styling. Each ring is 1.5mm wide.</p>",
    category: "Jewelry",
    price_in_cents: 14900,
    price_formatted: "$149.00",
    sale_price_in_cents: 11900,
    sale_price_formatted: "$119.00",
    image: "https://images.unsplash.com/photo-1702721024378-18faa83a3b40?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1702721024378-18faa83a3b40?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80" }
    ],
    ribbon_text: "Sale",
    rating: 4.8,
    review_count: 91,
    purchasable: true,
    variants: [
      {
        id: 107,
        title: "Size 6",
        price_in_cents: 14900,
        price_formatted: "$149.00",
        sale_price_in_cents: 11900,
        sale_price_formatted: "$119.00",
        manage_inventory: true,
        inventory_quantity: 5,
        image_url: "https://images.unsplash.com/photo-1702721024378-18faa83a3b40?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      },
      {
        id: 108,
        title: "Size 7",
        price_in_cents: 14900,
        price_formatted: "$149.00",
        sale_price_in_cents: 11900,
        sale_price_formatted: "$119.00",
        manage_inventory: true,
        inventory_quantity: 7,
        image_url: "https://images.unsplash.com/photo-1702721024378-18faa83a3b40?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      },
      {
        id: 109,
        title: "Size 8",
        price_in_cents: 14900,
        price_formatted: "$149.00",
        sale_price_in_cents: 11900,
        sale_price_formatted: "$119.00",
        manage_inventory: true,
        inventory_quantity: 3,
        image_url: "https://images.unsplash.com/photo-1702721024378-18faa83a3b40?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: []
  },
  {
    id: 8,
    title: "Silk Scarf Collection",
    subtitle: "Hand-rolled pure silk scarves",
    description: "<p>Luxurious collection of three hand-rolled silk scarves in complementary neutral tones. Each scarf measures 35x35 inches and features original artwork inspired by natural landscapes.</p><p>100% pure mulberry silk with hand-finished edges. Versatile styling for neck, hair, or bag accessory.</p>",
    category: "Accessories",
    price_in_cents: 18900,
    price_formatted: "$189.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80" }
    ],
    ribbon_text: "Limited Edition",
    rating: 4.9,
    review_count: 34,
    purchasable: true,
    variants: [
      {
        id: 110,
        title: "Set of 3",
        price_in_cents: 18900,
        price_formatted: "$189.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: true,
        inventory_quantity: 15,
        image_url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 4,
        title: "Care Instructions",
        description: "<p>Dry clean only or hand wash in cold water with gentle silk detergent. Lay flat to dry. Iron on low heat if needed.</p>",
        order: 1
      }
    ]
  },
  {
    id: 9,
    title: "Premium Leather Clutch",
    subtitle: "Italian leather evening bag",
    description: "<p>Sophisticated evening clutch handcrafted from premium Italian leather. Features a magnetic closure, interior card slots, and removable gold chain strap for versatile carrying.</p><p>Dimensions: 10 x 6 x 1.5 inches. Available in classic black with gold hardware.</p>",
    category: "Accessories",
    price_in_cents: 24900,
    price_formatted: "$249.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80" }
    ],
    ribbon_text: null,
    rating: 5.0,
    review_count: 28,
    purchasable: true,
    variants: [
      {
        id: 111,
        title: "Black",
        price_in_cents: 24900,
        price_formatted: "$249.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: true,
        inventory_quantity: 6,
        image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: []
  },
  {
    id: 10,
    title: "Cashmere Wrap",
    subtitle: "Oversized pure cashmere shawl",
    description: "<p>Indulgent oversized wrap in 100% pure cashmere. This versatile piece transitions seamlessly from office to evening, providing warmth and elegance.</p><p>Measures 80 x 28 inches. Available in timeless cream with subtle fringe detail. Comes with luxury gift packaging.</p>",
    category: "Accessories",
    price_in_cents: 29900,
    price_formatted: "$299.00",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80" }
    ],
    ribbon_text: "Bestseller",
    rating: 4.9,
    review_count: 56,
    purchasable: true,
    variants: [
      {
        id: 112,
        title: "Cream",
        price_in_cents: 29900,
        price_formatted: "$299.00",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: true,
        inventory_quantity: 9,
        image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 5,
        title: "Care Instructions",
        description: "<p>Dry clean recommended. Store folded in a breathable garment bag. Avoid direct sunlight and moisture.</p>",
        order: 1
      }
    ]
  },
  {
    id: 11,
    title: "How To Heal Pain",
    subtitle: "Transform trauma into lasting peace and power",
    description: "<p>heal your trauma, break generational cycles. Reclaim your freedom. Get a simple 10-step framework to heal your deepest wounds, destroy limiting beliefs, and turn pain into lasting peace, purpose & power. no more self-sabotage. No more repeating the past.</p>",
    category: "E-books",
    price_in_cents: 4999,
    price_formatted: "$49.99",
    sale_price_in_cents: null,
    sale_price_formatted: null,
    image: "/how-to-heal-pain-book.jpg",
    images: [
      { url: "/how-to-heal-pain-book.jpg" }
    ],
    ribbon_text: "New",
    rating: 4.9,
    review_count: 142,
    purchasable: true,
    variants: [
      {
        id: 113,
        title: "Digital Download",
        price_in_cents: 4999,
        price_formatted: "$49.99",
        sale_price_in_cents: null,
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        image_url: "/how-to-heal-pain-book.jpg",
        currency_info: { code: "USD", symbol: "$" }
      }
    ],
    additional_info: [
      {
        id: 6,
        title: "What's Included",
        description: "<p>Complete 10-step healing framework, guided exercises, worksheets for breaking limiting beliefs, and lifetime access to updates and bonus content.</p>",
        order: 1
      }
    ]
  }
];

export default products;
