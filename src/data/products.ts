/**
 * Dummy product catalogue for scaleB Med & Beauty Store.
 * Everything here is fictional demo data — no real brands or medical claims.
 *
 * `shape`, `color` and `accent` drive both the generated SVG product art
 * and the 3D product preview, so no image files are needed.
 */

export type Category = "medicine" | "beauty";

export type PackShape = "bottle" | "jar" | "tube" | "box" | "dropper" | "pump";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  tag: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  size: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  usage: string;
  shape: PackShape;
  /** Main packaging colour */
  color: string;
  /** Cap / label colour */
  accent: string;
  featured?: boolean;
  prescriptionRequired?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  // ───────────────────────────── Medicine ─────────────────────────────
  {
    id: "m1",
    slug: "paracetamol-500mg-tablets",
    name: "Paracetamol 500mg Tablets",
    brand: "MediCore",
    category: "medicine",
    tag: "Pain & Fever",
    price: 60,
    mrp: 75,
    rating: 4.7,
    reviewCount: 1284,
    size: "Strip of 15 tablets",
    shortDescription: "Fast, gentle relief from fever, headache and body pain.",
    description:
      "A trusted everyday essential for your medicine cabinet. Each tablet contains 500mg of paracetamol to help reduce fever and relieve mild to moderate pain, including headaches, toothache and muscle aches.",
    highlights: ["Relieves fever and mild pain", "Gentle on the stomach", "Suitable for adults and children over 12"],
    usage: "1–2 tablets every 4–6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    shape: "box",
    color: "#ffffff",
    accent: "#3ba57e",
    featured: true,
  },
  {
    id: "m2",
    slug: "vitamin-c-1000mg-effervescent",
    name: "Vitamin C 1000mg Effervescent",
    brand: "VitaLeaf",
    category: "medicine",
    tag: "Immunity",
    price: 420,
    mrp: 490,
    rating: 4.6,
    reviewCount: 842,
    size: "20 tablets · Orange",
    shortDescription: "Fizzy orange tablets to support daily immunity.",
    description:
      "A refreshing way to top up your vitamin C. Drop one tablet in a glass of water for a fizzy orange drink that supports your immune system and helps reduce tiredness.",
    highlights: ["1000mg vitamin C per tablet", "Sugar-free orange flavour", "Supports normal immune function"],
    usage: "Dissolve 1 tablet in 200ml of water once daily.",
    shape: "bottle",
    color: "#f7a63b",
    accent: "#ffffff",
    featured: true,
  },
  {
    id: "m3",
    slug: "omega-3-fish-oil-capsules",
    name: "Omega-3 Fish Oil Capsules",
    brand: "PureNord",
    category: "medicine",
    tag: "Heart Health",
    price: 900,
    mrp: 1100,
    rating: 4.8,
    reviewCount: 563,
    size: "60 softgels",
    shortDescription: "High-strength EPA & DHA for heart, brain and eyes.",
    description:
      "Purified, high-strength omega-3 sourced from sustainable fisheries. Each softgel delivers EPA and DHA to support heart health, brain function and normal vision.",
    highlights: ["1000mg fish oil per softgel", "Molecularly distilled for purity", "No fishy aftertaste"],
    usage: "Take 1 softgel twice daily with meals.",
    shape: "bottle",
    color: "#1f2c4d",
    accent: "#f2c14e",
  },
  {
    id: "m4",
    slug: "honey-tulsi-cough-syrup",
    name: "Honey & Tulsi Cough Syrup",
    brand: "HerbaCare",
    category: "medicine",
    tag: "Cold & Cough",
    price: 190,
    mrp: 210,
    rating: 4.5,
    reviewCount: 921,
    size: "100ml",
    shortDescription: "Soothing herbal syrup for dry and chesty coughs.",
    description:
      "A comforting blend of honey, tulsi and ginger that soothes an irritated throat and helps ease coughs. Non-drowsy and suitable for the whole family.",
    highlights: ["Honey, tulsi & ginger formula", "Non-drowsy", "Alcohol-free"],
    usage: "Adults: 10ml three times a day. Children 6–12: 5ml three times a day.",
    shape: "bottle",
    color: "#9a5a1c",
    accent: "#2b8565",
    featured: true,
  },
  {
    id: "m5",
    slug: "daily-multivitamin-tablets",
    name: "Daily Multivitamin Tablets",
    brand: "VitaLeaf",
    category: "medicine",
    tag: "Wellness",
    price: 700,
    mrp: 840,
    rating: 4.6,
    reviewCount: 1107,
    size: "60 tablets",
    shortDescription: "24 essential vitamins and minerals in one daily tablet.",
    description:
      "A complete once-a-day multivitamin with 24 essential nutrients, including vitamin D, zinc and B-complex, to help fill nutritional gaps and support energy levels.",
    highlights: ["24 vitamins & minerals", "Supports energy and immunity", "Vegetarian friendly"],
    usage: "Take 1 tablet daily after breakfast.",
    shape: "bottle",
    color: "#ffffff",
    accent: "#3ba57e",
    isNew: true,
  },
  {
    id: "m6",
    slug: "ors-electrolyte-sachets",
    name: "ORS Electrolyte Sachets",
    brand: "HydraPlus",
    category: "medicine",
    tag: "Hydration",
    price: 170,
    mrp: 200,
    rating: 4.7,
    reviewCount: 488,
    size: "Pack of 10 sachets · Lemon",
    shortDescription: "WHO-formula rehydration salts for quick recovery.",
    description:
      "Quickly replaces fluids and electrolytes lost through dehydration, heat or illness. A light lemon taste makes it easy to drink for adults and children alike.",
    highlights: ["WHO-recommended formula", "Light lemon taste", "Restores energy fast"],
    usage: "Dissolve 1 sachet in 200ml of clean drinking water.",
    shape: "box",
    color: "#e9f6ff",
    accent: "#2f7fd1",
  },
  {
    id: "m7",
    slug: "diclofenac-pain-relief-gel",
    name: "Diclofenac Pain Relief Gel",
    brand: "MediCore",
    category: "medicine",
    tag: "Pain Relief",
    price: 230,
    mrp: 265,
    rating: 4.4,
    reviewCount: 702,
    size: "30g tube",
    shortDescription: "Targeted relief for muscle, joint and back pain.",
    description:
      "A non-greasy, fast-absorbing gel that works where it hurts. Ideal for sprains, strains, back pain and joint stiffness, with a cooling menthol finish.",
    highlights: ["Fast-absorbing, non-greasy", "Cooling menthol finish", "For sprains & joint pain"],
    usage: "Apply a thin layer to the affected area 3–4 times a day and massage gently.",
    shape: "tube",
    color: "#ffffff",
    accent: "#d35f6c",
    featured: true,
  },
  {
    id: "m8",
    slug: "azithromycin-500mg-tablets",
    name: "Azithromycin 500mg Tablets",
    brand: "MediCore",
    category: "medicine",
    tag: "Antibiotic",
    price: 165,
    mrp: 190,
    rating: 4.5,
    reviewCount: 316,
    size: "Strip of 3 tablets",
    shortDescription: "Prescription antibiotic — upload a valid prescription.",
    description:
      "An antibiotic used to treat certain bacterial infections. This medicine is dispensed only against a valid prescription, which our licensed pharmacist will verify before dispatch.",
    highlights: ["Prescription required", "Verified by a licensed pharmacist", "Complete the full course"],
    usage: "Use strictly as directed by your doctor.",
    shape: "box",
    color: "#ffffff",
    accent: "#1f2c4d",
    prescriptionRequired: true,
  },

  // ───────────────────────────── Beauty ─────────────────────────────
  {
    id: "b1",
    slug: "hyaluronic-acid-hydrating-serum",
    name: "Hyaluronic Acid Hydrating Serum",
    brand: "Glowé",
    category: "beauty",
    tag: "Serum",
    price: 1120,
    mrp: 1400,
    rating: 4.8,
    reviewCount: 2310,
    size: "30ml",
    shortDescription: "Deep, weightless hydration for plump, dewy skin.",
    description:
      "A featherlight serum with multi-weight hyaluronic acid that draws moisture into the skin for an instantly plumper, smoother and dewy-looking complexion.",
    highlights: ["Multi-weight hyaluronic acid", "Fragrance-free", "Suitable for all skin types"],
    usage: "Apply 2–3 drops to damp skin morning and night, then follow with moisturiser.",
    shape: "dropper",
    color: "#f6cfd2",
    accent: "#e9d7b8",
    featured: true,
  },
  {
    id: "b2",
    slug: "niacinamide-10-serum",
    name: "Niacinamide 10% Serum",
    brand: "Dermaleaf",
    category: "beauty",
    tag: "Serum",
    price: 840,
    mrp: 980,
    rating: 4.6,
    reviewCount: 1488,
    size: "30ml",
    shortDescription: "Refines pores and evens tone for a balanced glow.",
    description:
      "A balancing serum with 10% niacinamide and 1% zinc that visibly refines pores, controls excess oil and evens out skin tone over time.",
    highlights: ["10% niacinamide + 1% zinc", "Controls shine", "Non-comedogenic"],
    usage: "Apply a few drops to clean skin before heavier creams.",
    shape: "dropper",
    color: "#b4e7d2",
    accent: "#ffffff",
  },
  {
    id: "b3",
    slug: "ceramide-barrier-moisturiser",
    name: "Ceramide Barrier Moisturiser",
    brand: "Dermaleaf",
    category: "beauty",
    tag: "Moisturiser",
    price: 980,
    mrp: 1120,
    rating: 4.7,
    reviewCount: 964,
    size: "50g",
    shortDescription: "Rich yet light cream that restores the skin barrier.",
    description:
      "Formulated with three essential ceramides and squalane, this cream locks in moisture for up to 48 hours and helps repair a stressed, dry skin barrier.",
    highlights: ["3 essential ceramides", "48-hour hydration", "Dermatologist tested"],
    usage: "Massage into face and neck morning and evening.",
    shape: "jar",
    color: "#ffffff",
    accent: "#86d5b6",
    featured: true,
  },
  {
    id: "b4",
    slug: "rose-renewal-night-cream",
    name: "Rose Renewal Night Cream",
    brand: "Glowé",
    category: "beauty",
    tag: "Night Care",
    price: 1260,
    mrp: 1540,
    rating: 4.7,
    reviewCount: 731,
    size: "50g",
    shortDescription: "Overnight nourishment with rosehip oil and peptides.",
    description:
      "A velvety night cream infused with rosehip oil and peptides that works while you sleep, so you wake up to softer, smoother and more radiant skin.",
    highlights: ["Rosehip oil + peptides", "Wake up to softer skin", "Delicate natural rose scent"],
    usage: "Apply generously to face and neck as the last step of your night routine.",
    shape: "jar",
    color: "#efabb1",
    accent: "#e9d7b8",
    isNew: true,
  },
  {
    id: "b5",
    slug: "spf-50-daily-sunscreen",
    name: "SPF 50 PA++++ Daily Sunscreen",
    brand: "SunVeil",
    category: "beauty",
    tag: "Sun Care",
    price: 770,
    mrp: 910,
    rating: 4.6,
    reviewCount: 1876,
    size: "50ml",
    shortDescription: "Invisible, no white cast protection for everyday wear.",
    description:
      "A lightweight, fast-absorbing broad-spectrum sunscreen that leaves no white cast. Its gel texture sits beautifully under makeup.",
    highlights: ["SPF 50 PA++++ broad spectrum", "No white cast", "Water resistant"],
    usage: "Apply generously 15 minutes before sun exposure. Reapply every 2–3 hours.",
    shape: "tube",
    color: "#fff3d6",
    accent: "#f7a63b",
    featured: true,
  },
  {
    id: "b6",
    slug: "gentle-foaming-cleanser",
    name: "Gentle Foaming Cleanser",
    brand: "PureSkin",
    category: "beauty",
    tag: "Cleanser",
    price: 630,
    mrp: 700,
    rating: 4.5,
    reviewCount: 1022,
    size: "150ml",
    shortDescription: "Soap-free cleanser that never leaves skin tight.",
    description:
      "A soft, cushiony foam that lifts away dirt, oil and makeup while keeping skin comfortable and hydrated. pH balanced and soap-free.",
    highlights: ["pH balanced & soap-free", "Removes light makeup", "With aloe and glycerin"],
    usage: "Pump onto wet hands, massage onto damp skin and rinse.",
    shape: "pump",
    color: "#d9f3e8",
    accent: "#ffffff",
  },
  {
    id: "b7",
    slug: "vitamin-c-glow-serum",
    name: "Vitamin C Glow Serum",
    brand: "Glowé",
    category: "beauty",
    tag: "Serum",
    price: 1190,
    mrp: 1400,
    rating: 4.7,
    reviewCount: 1342,
    size: "30ml",
    shortDescription: "Brightens dull skin and fades dark spots.",
    description:
      "A stable 15% vitamin C serum with ferulic acid and vitamin E that brightens dull skin, fades the look of dark spots and boosts your natural glow.",
    highlights: ["15% stabilised vitamin C", "With ferulic acid & vitamin E", "Visible glow in 2 weeks"],
    usage: "Apply 3–4 drops each morning before sunscreen.",
    shape: "dropper",
    color: "#f7a63b",
    accent: "#e9d7b8",
    featured: true,
  },
  {
    id: "b8",
    slug: "shea-butter-lip-balm",
    name: "Shea Butter Lip Balm",
    brand: "PureSkin",
    category: "beauty",
    tag: "Lip Care",
    price: 280,
    mrp: 350,
    rating: 4.6,
    reviewCount: 655,
    size: "10g",
    shortDescription: "Melting balm for soft, cared-for lips.",
    description:
      "A rich, melting lip balm with shea butter, vitamin E and a hint of vanilla that soothes and protects dry, chapped lips all day long.",
    highlights: ["Shea butter & vitamin E", "Long-lasting comfort", "Hint of vanilla"],
    usage: "Apply to lips as often as needed.",
    shape: "jar",
    color: "#fbe7e8",
    accent: "#d35f6c",
  },
];

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

/** Upper bound for the price filter, rounded up to the next ৳500. */
export const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 500) * 500;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured).slice(0, 8);
}

export function getRelatedProducts(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  // Prefer items that share a tag or brand, then fill with the rest of the category
  const scored = sameCategory
    .map((p) => ({ p, score: (p.tag === product.tag ? 2 : 0) + (p.brand === product.brand ? 1 : 0) }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}
