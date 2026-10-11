import bcrypt from 'bcryptjs';
import { queryOne, runExecute } from './database.js';

export async function seedDatabaseIfNeeded() {
  const adminUser = await queryOne('SELECT id FROM users WHERE email = ?', ['admin@amillennialstitch.com']);
  if (adminUser) {
    console.log('🌱 Database already seeded.');
    return;
  }

  console.log('🌱 Seeding A Millennial\'s Stitch database with rich initial craft data...');

  // 1. Seed Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  await runExecute(
    `INSERT INTO users (email, password_hash, full_name, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)`,
    ['admin@amillennialstitch.com', adminPassword, 'Hannah Grace (Founder)', '(555) 234-5678', '124 Faith Way, Nashville, TN', 'ADMIN']
  );

  await runExecute(
    `INSERT INTO users (email, password_hash, full_name, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)`,
    ['customer@example.com', customerPassword, 'Sarah Jenkins', '(555) 987-6543', '742 Evergreen Terrace, Springfield, OR', 'CUSTOMER']
  );

  // 2. Seed Categories
  const categories = [
    {
      name: 'Crochet Accessories',
      slug: 'crochet-accessories',
      description: 'Elegant handmade scarves, beanies, fingerless gloves, and hair scrunchies.',
      image_url: '/images/hero_showcase.jpg',
      item_count: 8
    },
    {
      name: 'Baby & Kids',
      slug: 'baby-kids',
      description: 'Ultra-soft hand-knitted cardigans, plush loveys, booties, and nursery keepsakes.',
      image_url: '/images/baby_cardigan.jpg',
      item_count: 6
    },
    {
      name: 'Handmade Gifts',
      slug: 'handmade-gifts',
      description: 'Thoughtful everlasting crochet flower bouquets, bookmark sets, and gift boxes.',
      image_url: '/images/crochet_bouquet.jpg',
      item_count: 7
    },
    {
      name: 'Home Decor',
      slug: 'home-decor',
      description: 'Cozy chunky yarn blankets, scalloped coasters, plant hangers, and cushion covers.',
      image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      item_count: 5
    },
    {
      name: 'Bags & Pouches',
      slug: 'bags-pouches',
      description: 'Chic boho granny square tote bags, drawstring cosmetic pouches, and crossbody purses.',
      image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      item_count: 6
    },
    {
      name: 'Keychains & Charms',
      slug: 'keychains-charms',
      description: 'Adorable mini crochet sunflowers, tulip bag charms, and heart charms.',
      image_url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      item_count: 9
    },
    {
      name: 'Custom Creations',
      slug: 'custom-creations',
      description: 'Personalized bespoke handmade creations turned from your vision into reality.',
      image_url: '/images/hero_showcase.jpg',
      item_count: 12
    }
  ];

  for (const cat of categories) {
    await runExecute(
      `INSERT INTO categories (name, slug, description, image_url, item_count) VALUES (?, ?, ?, ?, ?)`,
      [cat.name, cat.slug, cat.description, cat.image_url, cat.item_count]
    );
  }

  // 3. Seed Products
  const products = [
    {
      name: 'Everlasting Rose & Daisy Crochet Bouquet',
      slug: 'everlasting-rose-daisy-crochet-bouquet',
      sku: 'AMS-BQT-001',
      category_id: 3,
      category_name: 'Handmade Gifts',
      description: 'Handcrafted with love using premium soft cotton yarn. Features 3 dusty rose blossoms, 4 cream field daisies, and lush muted sage leaves wrapped in eco-friendly craft paper and bound with organic twine. Never fades, symbol of eternal care.',
      short_description: 'Everlasting handmade crochet floral bouquet in dusty rose and cream.',
      price: 48.00,
      discount_price: 42.00,
      stock: 15,
      image_url: '/images/crochet_bouquet.jpg',
      additional_images: JSON.stringify(['/images/crochet_bouquet.jpg', '/images/hero_showcase.jpg']),
      materials: '100% Combed Cotton Yarn, Flexible Floral Stem Wire, Kraft Paper Wrap',
      dimensions: 'Height: 14 inches, Width: 9 inches',
      available_colors: JSON.stringify(['Dusty Rose & Cream', 'Blush & White', 'Vintage Ochre & Sage']),
      available_sizes: JSON.stringify(['Standard Bouquet (7 Stems)', 'Deluxe Bouquet (12 Stems)']),
      is_featured: 1,
      is_bestseller: 1
    },
    {
      name: 'Heirloom Newborn Knitted Cardigan & Booties Set',
      slug: 'heirloom-newborn-knitted-cardigan-booties-set',
      sku: 'AMS-BB-002',
      category_id: 2,
      category_name: 'Baby & Kids',
      description: 'Soft heirloom baby cardigan hand-knitted with hypoallergenic extra-fine merino yarn. Completed with genuine wooden heart buttons and matching delicate booties with satin tie ribbons. Gentle against delicate baby skin.',
      short_description: 'Cozy cream hand-knitted baby sweater set with wooden heart buttons.',
      price: 65.00,
      discount_price: 0,
      stock: 8,
      image_url: '/images/baby_cardigan.jpg',
      additional_images: JSON.stringify(['/images/baby_cardigan.jpg']),
      materials: '100% Ultra-Soft Hypoallergenic Cotton-Merino Blend Yarn, Wooden Heart Buttons',
      dimensions: '0-3 Months (Chest 18in, Length 10.5in)',
      available_colors: JSON.stringify(['Warm Cream', 'Soft Blush Pink', 'Muted Sage', 'Oatmeal Beige']),
      available_sizes: JSON.stringify(['0-3 Months', '3-6 Months', '6-12 Months']),
      is_featured: 1,
      is_bestseller: 1
    },
    {
      name: 'Boho Floral Granny Square Tote Bag',
      slug: 'boho-floral-granny-square-tote-bag',
      sku: 'AMS-BAG-003',
      category_id: 5,
      category_name: 'Bags & Pouches',
      description: 'Chic hand-crocheted shoulder tote bag crafted from 16 intricate floral granny squares in warm earthy tones. Reinforced with a sturdy cream linen inner lining and comfortable wide shoulder straps.',
      short_description: 'Handmade floral granny square shoulder bag with linen lining.',
      price: 54.00,
      discount_price: 49.00,
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      additional_images: JSON.stringify(['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80']),
      materials: 'Heavy Weight Cotton Cord, Natural Linen Lining, Magnetic Snap Closure',
      dimensions: '14" W x 15" H (Strap Drop: 11")',
      available_colors: JSON.stringify(['Dusty Rose & Sage Blend', 'Warm Earth Tones', 'Pastel Blossom']),
      available_sizes: JSON.stringify(['One Size']),
      is_featured: 1,
      is_bestseller: 1
    },
    {
      name: 'Handcrafted Chunky Cable Knit Throw Blanket',
      slug: 'handcrafted-chunky-cable-knit-throw-blanket',
      sku: 'AMS-HOM-004',
      category_id: 4,
      category_name: 'Home Decor',
      description: 'Luxuriously plush hand-knitted chunky yarn throw blanket. Designed with rich textured cables for maximum warmth, elegance, and aesthetic beauty draped over your living room sofa or bedroom duvet.',
      short_description: 'Plush chunky yarn hand-knitted throw blanket in warm cream.',
      price: 110.00,
      discount_price: 95.00,
      stock: 4,
      image_url: '/images/hero_showcase.jpg',
      additional_images: JSON.stringify(['/images/hero_showcase.jpg']),
      materials: '100% Chenille Soft Chunky Yarn',
      dimensions: '50" x 60" (Standard Throw)',
      available_colors: JSON.stringify(['Warm Cream', 'Soft Blush', 'Sage Mist', 'Charcoal Taupe']),
      available_sizes: JSON.stringify(['Throw (50x60")', 'Full Blanket (60x70")']),
      is_featured: 1,
      is_bestseller: 0
    },
    {
      name: 'Handmade Scalloped Botanical Coaster Set (Set of 4)',
      slug: 'handmade-scalloped-botanical-coaster-set',
      sku: 'AMS-HOM-005',
      category_id: 4,
      category_name: 'Home Decor',
      description: 'Set of 4 absorbent handcrafted crochet coasters featuring delicate scalloped floral edges. Perfect for hot tea, coffee mugs, or morning matcha while adding a rustic artisanal touch to your coffee table.',
      short_description: 'Set of 4 absorbent floral crochet mug coasters.',
      price: 24.00,
      discount_price: 0,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      additional_images: JSON.stringify(['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80']),
      materials: '100% Absorbent Natural Cotton',
      dimensions: 'Diameter: 4.5 inches each',
      available_colors: JSON.stringify(['Assorted Palette (Rose, Sage, Cream, Taupe)', 'Natural Ivory Mono', 'Sage & Cream']),
      available_sizes: JSON.stringify(['Set of 4', 'Set of 6']),
      is_featured: 0,
      is_bestseller: 1
    },
    {
      name: 'Crochet Mini Sunflower Bag Charm & Keychain',
      slug: 'crochet-mini-sunflower-bag-charm-keychain',
      sku: 'AMS-KEY-006',
      category_id: 6,
      category_name: 'Keychains & Charms',
      description: 'Cheerful miniature crochet sunflower featuring vibrant golden petals, rich brown textured center, and cute green leaf stem. Comes with a premium anti-tarnish gold metal clasp for keys or handbag decoration.',
      short_description: 'Handmade sunny crochet sunflower bag charm with gold clasp.',
      price: 14.50,
      discount_price: 12.00,
      stock: 35,
      image_url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      additional_images: JSON.stringify(['https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80']),
      materials: 'Mercerized Cotton Thread, Gold Alloy Keyring & Lobster Clasp',
      dimensions: 'Flower Width: 2.5 inches, Total Length: 5 inches',
      available_colors: JSON.stringify(['Classic Sunflower', 'Blush Daisy', 'Sage Clover']),
      available_sizes: JSON.stringify(['Standard Keyring']),
      is_featured: 0,
      is_bestseller: 1
    },
    {
      name: 'Fingerless Botanical Cable Hand Warmer Gloves',
      slug: 'fingerless-botanical-cable-hand-warmer-gloves',
      sku: 'AMS-ACC-007',
      category_id: 1,
      category_name: 'Crochet Accessories',
      description: 'Keep your hands warm while texting, typing, or crocheting! Hand-knitted fingerless gloves featuring an intricate twisting cable stitch and cozy ribbed wrist cuffs.',
      short_description: 'Cozy cable knit fingerless texting gloves in dusty rose.',
      price: 28.00,
      discount_price: 0,
      stock: 18,
      image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      additional_images: JSON.stringify(['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80']),
      materials: '80% Soft Acrylic, 20% Wool Blend',
      dimensions: 'Length: 8 inches (Stretchable Fit)',
      available_colors: JSON.stringify(['Dusty Rose', 'Oatmeal Taupe', 'Muted Sage', 'Midnight Mocha']),
      available_sizes: JSON.stringify(['Small/Medium', 'Medium/Large']),
      is_featured: 1,
      is_bestseller: 0
    },
    {
      name: 'Vintage Floral Crochet Bucket Hat',
      slug: 'vintage-floral-crochet-bucket-hat',
      sku: 'AMS-ACC-008',
      category_id: 1,
      category_name: 'Crochet Accessories',
      description: 'Chic hand-crocheted bucket hat with scalloped brim and subtle botanical daisy motifs around the crown. Soft, breathable, and easily foldable into your tote bag for sunny day outings.',
      short_description: 'Handcrafted floral bucket hat with scalloped brim.',
      price: 38.00,
      discount_price: 34.00,
      stock: 9,
      image_url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
      additional_images: JSON.stringify(['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80']),
      materials: '100% Breathable Cotton Yarn',
      dimensions: 'Head Circumference: 21.5" - 23.5"',
      available_colors: JSON.stringify(['Sage & Cream', 'Dusty Rose & Beige', 'Buttercup Yellow']),
      available_sizes: JSON.stringify(['One Size Fits Most']),
      is_featured: 0,
      is_bestseller: 1
    }
  ];

  for (const prod of products) {
    await runExecute(
      `INSERT INTO products (
        name, slug, sku, category_id, category_name, description, short_description,
        price, discount_price, stock, image_url, additional_images, materials,
        dimensions, available_colors, available_sizes, is_featured, is_bestseller
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        prod.name, prod.slug, prod.sku, prod.category_id, prod.category_name,
        prod.description, prod.short_description, prod.price, prod.discount_price,
        prod.stock, prod.image_url, prod.additional_images, prod.materials,
        prod.dimensions, prod.available_colors, prod.available_sizes,
        prod.is_featured, prod.is_bestseller
      ]
    );
  }

  // 4. Seed Orders
  const sampleOrders = [
    {
      order_number: 'AMS-2026-0001',
      customer_id: 2,
      customer_name: 'Sarah Jenkins',
      customer_email: 'customer@example.com',
      customer_phone: '(555) 987-6543',
      shipping_address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      postal_code: '97477',
      country: 'United States',
      subtotal: 107.00,
      shipping_cost: 0,
      discount_amount: 10.70,
      total_amount: 96.30,
      payment_method: 'Credit Card',
      payment_status: 'Paid',
      order_status: 'Processing',
      notes: 'Customer requested gift note: "Happy Birthday Grace!"',
      items: [
        { product_id: 1, product_name: 'Everlasting Rose & Daisy Crochet Bouquet', price: 42.00, quantity: 1, color: 'Dusty Rose & Cream', size: 'Standard Bouquet (7 Stems)', total_price: 42.00, image: '/images/crochet_bouquet.jpg' },
        { product_id: 2, product_name: 'Heirloom Newborn Knitted Cardigan & Booties Set', price: 65.00, quantity: 1, color: 'Warm Cream', size: '0-3 Months', total_price: 65.00, image: '/images/baby_cardigan.jpg' }
      ]
    },
    {
      order_number: 'AMS-2026-0002',
      customer_id: 0,
      customer_name: 'Emily Watson',
      customer_email: 'emily.watson@gmail.com',
      customer_phone: '(555) 432-1098',
      shipping_address: '321 Maple Avenue',
      city: 'Austin',
      state: 'TX',
      postal_code: '78701',
      country: 'United States',
      subtotal: 54.00,
      shipping_cost: 5.00,
      discount_amount: 0,
      total_amount: 59.00,
      payment_method: 'PayPal',
      payment_status: 'Paid',
      order_status: 'Shipped',
      notes: 'Tracking ID: USPS 9400111899560000000000',
      items: [
        { product_id: 3, product_name: 'Boho Floral Granny Square Tote Bag', price: 49.00, quantity: 1, color: 'Dusty Rose & Sage Blend', size: 'One Size', total_price: 49.00, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' }
      ]
    },
    {
      order_number: 'AMS-2026-0003',
      customer_id: 0,
      customer_name: 'Jessica Miller',
      customer_email: 'jessica.m@yahoo.com',
      customer_phone: '(555) 345-6789',
      shipping_address: '55 Ocean Drive, Apt 4B',
      city: 'Miami',
      state: 'FL',
      postal_code: '33139',
      country: 'United States',
      subtotal: 38.50,
      shipping_cost: 4.50,
      discount_amount: 0,
      total_amount: 43.00,
      payment_method: 'Credit Card',
      payment_status: 'Paid',
      order_status: 'Delivered',
      notes: 'Package delivered at front porch.',
      items: [
        { product_id: 5, product_name: 'Handmade Scalloped Botanical Coaster Set', price: 24.00, quantity: 1, color: 'Assorted Palette', size: 'Set of 4', total_price: 24.00, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80' },
        { product_id: 6, product_name: 'Crochet Mini Sunflower Bag Charm', price: 14.50, quantity: 1, color: 'Classic Sunflower', size: 'Standard Keyring', total_price: 14.50, image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80' }
      ]
    }
  ];

  for (const ord of sampleOrders) {
    const res = await runExecute(
      `INSERT INTO orders (
        order_number, customer_id, customer_name, customer_email, customer_phone,
        shipping_address, city, state, postal_code, country, subtotal, shipping_cost,
        discount_amount, total_amount, payment_method, payment_status, order_status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ord.order_number, ord.customer_id, ord.customer_name, ord.customer_email,
        ord.customer_phone, ord.shipping_address, ord.city, ord.state, ord.postal_code,
        ord.country, ord.subtotal, ord.shipping_cost, ord.discount_amount,
        ord.total_amount, ord.payment_method, ord.payment_status, ord.order_status, ord.notes
      ]
    );

    if (res.lastID) {
      for (const item of ord.items) {
        await runExecute(
          `INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, color, size, total_price)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [res.lastID, item.product_id, item.product_name, item.image, item.price, item.quantity, item.color, item.size, item.total_price]
        );
      }
    }
  }

  // 5. Seed Custom Order Requests
  const sampleCustomOrders = [
    {
      request_code: 'CST-2026-8801',
      customer_name: 'Chloe Bennett',
      email: 'chloe.bennett@lifestyle.com',
      phone: '(555) 777-8899',
      product_type: 'Custom Crochet Baby Blanket & Amigurumi Bear',
      preferred_color: 'Pastel Sage & Soft Cream',
      size: '36" x 48" Blanket + 8" Teddy Bear',
      quantity: 1,
      budget: '$120 - $150',
      deadline: '2026-11-15',
      custom_description: 'I am hosting a botanical themed baby shower for my sister. I would love a matching cable knit baby blanket in sage and cream with her baby\'s initials "E.M." embroidered on a leather tag, plus a matching plush crochet teddy bear.',
      reference_image_url: '/images/baby_cardigan.jpg',
      status: 'In Production',
      admin_notes: 'Yarn sourced (Organic Merino). Estimated completion: Oct 20.'
    },
    {
      request_code: 'CST-2026-8802',
      customer_name: 'Marcus Vance',
      email: 'marcus.vance@gmail.com',
      phone: '(555) 222-3344',
      product_type: 'Custom Bridal Party Crochet Bouquets (6 Sets)',
      preferred_color: 'Dusty Rose, Blush, Eucalyptus Green & Ivory',
      size: '1 Maid of Honor + 5 Bridesmaid bouquets',
      quantity: 6,
      budget: '$300 - $400',
      deadline: '2026-12-01',
      custom_description: 'Looking for lasting handmade crochet flower bouquets for our winter wedding so the bridal party can keep them forever. Would love roses, peonies, and olive leaf sprigs.',
      reference_image_url: '/images/crochet_bouquet.jpg',
      status: 'Quoted',
      admin_notes: 'Sent quote for $340 including gift boxes. Awaiting final deposit confirmation.'
    }
  ];

  for (const cst of sampleCustomOrders) {
    await runExecute(
      `INSERT INTO custom_orders (
        request_code, customer_name, email, phone, product_type, preferred_color,
        size, quantity, budget, deadline, custom_description, reference_image_url,
        status, admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cst.request_code, cst.customer_name, cst.email, cst.phone, cst.product_type,
        cst.preferred_color, cst.size, cst.quantity, cst.budget, cst.deadline,
        cst.custom_description, cst.reference_image_url, cst.status, cst.admin_notes
      ]
    );
  }

  // 6. Seed Coupons
  const sampleCoupons = [
    { code: 'WELCOME10', discount_type: 'percentage', discount_amount: 10, min_order: 20, expiration_date: '2026-12-31', usage_limit: 500, times_used: 42, is_active: 1 },
    { code: 'FAITH15', discount_type: 'percentage', discount_amount: 15, min_order: 50, expiration_date: '2026-11-30', usage_limit: 200, times_used: 18, is_active: 1 },
    { code: 'HANDMADE5', discount_type: 'fixed', discount_amount: 5, min_order: 30, expiration_date: '2026-12-31', usage_limit: 100, times_used: 9, is_active: 1 }
  ];

  for (const cpn of sampleCoupons) {
    await runExecute(
      `INSERT INTO coupons (code, discount_type, discount_amount, min_order, expiration_date, usage_limit, times_used, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [cpn.code, cpn.discount_type, cpn.discount_amount, cpn.min_order, cpn.expiration_date, cpn.usage_limit, cpn.times_used, cpn.is_active]
    );
  }

  // 7. Seed Testimonials
  const sampleTestimonials = [
    { customer_name: 'Hannah & Caleb R.', location_or_role: 'Verified Customer', comment: 'Absolutely beautiful! The attention to detail was amazing. The baby cardigan was the highlight of our baby shower.', rating: 5, is_featured: 1 },
    { customer_name: 'Rachel Stevens', location_or_role: 'Custom Order Client', comment: 'The perfect handmade gift. You can really feel the love behind the work. The flower bouquet will never wither!', rating: 5, is_featured: 1 },
    { customer_name: 'Megan K.', location_or_role: 'Repeat Shopper', comment: 'Beautiful quality and such a thoughtful custom creation. Shipped with lovely handwritten notes and botanical packaging.', rating: 5, is_featured: 1 }
  ];

  for (const tst of sampleTestimonials) {
    await runExecute(
      `INSERT INTO testimonials (customer_name, location_or_role, comment, rating, is_featured)
       VALUES (?, ?, ?, ?, ?)`,
      [tst.customer_name, tst.location_or_role, tst.comment, tst.rating, tst.is_featured]
    );
  }

  // 8. Seed Reviews
  const sampleReviews = [
    { product_id: 1, customer_name: 'Sophia M.', customer_email: 'sophia@example.com', rating: 5, comment: 'I ordered the rose & daisy bouquet for my mom\'s birthday. She cried happy tears! The stitching is so neat and delicate.' },
    { product_id: 2, customer_name: 'Brianna White', customer_email: 'brianna@example.com', rating: 5, comment: 'So soft and gentle for my newborn! The wooden heart buttons give it such a cozy heirloom feel.' },
    { product_id: 3, customer_name: 'Clara D.', customer_email: 'clara@example.com', rating: 5, comment: 'Love this tote bag so much! High quality lining so my keys don\'t poke through the crochet.' }
  ];

  for (const rev of sampleReviews) {
    await runExecute(
      `INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment, is_approved)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [rev.product_id, rev.customer_name, rev.customer_email, rev.rating, rev.comment]
    );
  }

  // 9. Seed FAQs
  const sampleFaqs = [
    { category: 'Custom Orders', question: 'How do custom order requests work?', answer: 'Simply fill out our Custom Order Request form with your vision, preferred colors, and budget. We will review your request within 24-48 hours and provide a detailed quote and estimated completion timeline.' },
    { category: 'Shipping & Delivery', question: 'What is the processing time for handmade items?', answer: 'Ready-to-ship items are dispatched within 2-3 business days. Custom handmade creations usually take 1-2 weeks depending on complexity and yarn availability.' },
    { category: 'Care Instructions', question: 'How should I clean and wash my crochet items?', answer: 'We recommend gentle handwashing in cold water with mild detergent. Reshape laying flat on a dry towel. Avoid harsh wringing or machine drying.' },
    { category: 'Materials', question: 'What kind of yarn and materials do you use?', answer: 'We exclusively select premium 100% combed cotton, ultra-soft merino wool blends, and eco-certified hypoallergenic yarns free of harsh dyes.' }
  ];

  for (let i = 0; i < sampleFaqs.length; i++) {
    const faq = sampleFaqs[i];
    await runExecute(
      `INSERT INTO faqs (category, question, answer, is_active, order_num) VALUES (?, ?, ?, 1, ?)`,
      [faq.category, faq.question, faq.answer, i + 1]
    );
  }

  // 10. Seed Website Settings (CMS)
  const defaultSettings: Record<string, string> = {
    business_name: "A Millennial's Stitch",
    tagline: "Handmade with Love, Rooted in Faith.",
    hero_headline: "Thoughtfully Handcrafted Crochet & Knitting",
    hero_subtext: "Thoughtfully handcrafted crochet pieces, gifts and accessories made with creativity, care and love.",
    about_headline: "Slow Handmade Creation, Woven with Purpose",
    about_text: "A Millennial’s Stitch began with a quiet prayer, a ball of soft yarn, and a passion for crafting meaningful, lasting pieces. Every knot, loop, and stitch is guided by love, creativity, and faith.",
    contact_email: "hello@amillennialstitch.com",
    contact_phone: "(555) 234-5678",
    business_address: "Nashville, Tennessee, USA",
    currency_symbol: "$",
    shipping_charge: "5.00",
    free_shipping_threshold: "75.00",
    tax_percentage: "7.0",
    announcement_banner: "✨ Free Shipping on orders over $75 | Handcrafted with Love & Rooted in Faith ✨",
    instagram_url: "https://instagram.com/amillennialstitch",
    pinterest_url: "https://pinterest.com/amillennialstitch",
    etsy_url: "https://etsy.com/shop/amillennialstitch"
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await runExecute(
      `INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?)`,
      [key, value]
    );
  }

  console.log('✅ Seeding complete!');
}
