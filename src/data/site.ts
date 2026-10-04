export const site = {
  name: "scaleB Med & Beauty Store",
  shortName: "scaleB",
  tagline: "Your Health. Your Glow.",
  description:
    "Genuine medicines and premium beauty essentials, delivered fast across Bangladesh and checked by registered pharmacists.",
  email: "scalebbd@gmail.com",
  phone: "+880 1568-831806",
  address: "Huda Apartment (3rd Floor), House 59, Road 4, Block C, Banani, Dhaka-1213, Bangladesh",
  addressLines: ["Huda Apartment (3rd Floor)", "House 59, Road 4, Block C, Banani", "Dhaka-1213, Bangladesh"],
  hours: "Sat – Thu, 9:00 am – 10:00 pm",
  freeShippingThreshold: 999,
  shippingFee: 60,
};

/** Management contact shown on the Contact and About pages. */
export const leadership = {
  name: "MD Maksudur Rahaman",
  role: "Co-Founder & COO",
  phone: "+880 9642-602546",
};

/** Turns a display phone number into a tel: link. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/prescription", label: "Upload Prescription" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const reviews = [
  {
    name: "Nusrat J.",
    location: "Dhaka",
    rating: 5,
    text: "My prescription was verified within an hour and the medicines arrived the next morning in Gulshan. The packaging felt so premium!",
    product: "Prescription order",
  },
  {
    name: "Tanvir H.",
    location: "Chattogram",
    rating: 5,
    text: "Finally one place for my vitamins and my skincare. Prices are fair and everything is genuine, sealed and well within expiry.",
    product: "Omega-3 & Ceramide Moisturiser",
  },
  {
    name: "Farhana A.",
    location: "Sylhet",
    rating: 4,
    text: "The hyaluronic serum is now a staple in my routine. Loved the little handwritten note from the team too.",
    product: "Hyaluronic Acid Serum",
  },
];
