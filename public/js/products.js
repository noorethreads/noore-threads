/**
 * NOORÉ THREADS - PRODUCT DATA
 * 
 * HOW TO ADD A PRODUCT:
 * 1. Copy an existing product block from the 'products' list below.
 * 2. Paste it before the closing bracket of the list.
 * 3. Change the 'id' to a unique name (e.g., "my-new-bag").
 * 4. Update the details.
 * 
 * HOW TO ADD MULTIPLE IMAGES:
 * Add paths inside the 'images' list, separated by commas.
 * e.g., images: ["/images/products/my-bag/01.jpg", "/images/products/my-bag/02.jpg"]
 * 
 * HOW TO ADD CATEGORIES:
 * Use categories from the allowed list (Bags, Flowers, Covers, Phone Cases, Parandas).
 * e.g., categories: ["Bags", "Flowers"]
 * 
 * HOW TO MARK FEATURED OR NEW:
 * Change featured: false to featured: true
 * Change newArrival: false to newArrival: true
 * 
 * HOW TO ADD OPTIONAL DETAILS:
 * If a product doesn't have dimensions, care, or colors, just leave the quotes empty ("") or delete the line. The website will automatically hide empty fields.
 */

const products = [
    {
        id: "eternity-rose-bouquet",
        name: "Eternity Rose Bouquet",
        categories: ["Flowers"],
        images: [
            "/images/products/eternity-rose-bouquet/01.jpg",
            "/images/products/eternity-rose-bouquet/02.jpg",
            "/images/products/eternity-rose-bouquet/03.jpg"
        ],
        shortDescription: "A delicate handmade crochet rose bouquet that lasts forever.",
        description: "Carefully crafted petal by petal, this eternal rose bouquet brings a touch of romantic handmade luxury to any space. Each stem is wired for flexible arranging. Perfect for gifting or elegant home styling.",
        price: "Enquire on Instagram",
        colors: ["Dusty Rose", "Ivory", "Deep Red"],
        dimensions: "Approx. 35cm length per stem",
        material: "Premium organic cotton yarn, floral wire",
        care: "Dust lightly. Do not wash. Keep away from direct sunlight.",
        availability: "Made to order (1-2 weeks)",
        featured: true,
        newArrival: true,
        sortOrder: 1,
        instagramMessage: "Hi! I am interested in ordering the Eternity Rose Bouquet."
    },
    {
        id: "artisan-tote",
        name: "The Artisan Tote",
        categories: ["Bags"],
        images: [
            "/images/products/artisan-tote/01.jpg"
        ],
        shortDescription: "A structural, contemporary chunky crochet tote bag.",
        description: "The Artisan Tote reimagines traditional crochet with a modern, structural silhouette. Hand-crocheted using thick, durable yarn, it holds its shape beautifully while offering ample space for your daily essentials.",
        price: "Enquire on Instagram",
        colors: ["Warm Cream", "Soft Taupe", "Charcoal"],
        dimensions: "30cm x 25cm x 10cm",
        material: "Recycled cotton cord",
        care: "Spot clean with a damp cloth. Dry flat.",
        availability: "In stock",
        featured: true,
        newArrival: false,
        sortOrder: 2,
        instagramMessage: "Hi! I would like to order The Artisan Tote."
    },
    {
        id: "minimalist-phone-pouch",
        name: "Minimalist Phone Pouch",
        categories: ["Phone Cases", "Bags"],
        images: [],
        shortDescription: "Elegant crossbody phone pouch with faux pearl accents.",
        description: "A minimalist yet striking phone pouch designed for hands-free elegance. Features a delicate strap and subtle pearl bead woven into the closure.",
        price: "Enquire on Instagram",
        colors: [], // Intentionally empty array to test hiding
        dimensions: "18cm x 10cm (Fits most standard and pro max phones)",
        material: "", // Intentionally empty to test hiding
        care: "Hand wash cold. Dry flat.",
        availability: "Made to order (1 week)",
        featured: false,
        newArrival: true,
        sortOrder: 3,
        instagramMessage: "Hi! I am interested in the Minimalist Phone Pouch."
    },
    {
        id: "sunflower-charm",
        name: "Golden Sunflower Charm",
        categories: ["Flowers"],
        images: [],
        shortDescription: "A vibrant miniature sunflower charm for bags or keys.",
        description: "Brighten your day with this meticulously detailed sunflower charm. Features a sturdy clasp to attach to your favourite bag, keys, or use as a decorative accent.",
        price: "", // Intentionally empty string to test hiding
        colors: ["Mustard Yellow & Espresso"],
        dimensions: "8cm diameter",
        material: "Mercerised cotton",
        care: "Hand wash gently in cold water if necessary.",
        availability: "In stock",
        featured: false,
        newArrival: false,
        sortOrder: 4,
        instagramMessage: "Hi! I would like to buy the Golden Sunflower Charm."
    }
];

// Categories to display in the filter bar
const categories = ['All', 'Bags', 'Flowers', 'Covers', 'Phone Cases', 'Parandas', 'New Arrivals'];

