import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Lightweight, resolution-independent product illustration.
 * Used as the product "photo" on cards and as the fallback while
 * (or instead of) loading the 3D preview. Zero network requests.
 */
export function ProductArt({
  product,
  className,
  background = true,
}: {
  product: Pick<Product, "id" | "name" | "brand" | "shape" | "color" | "accent" | "category">;
  className?: string;
  background?: boolean;
}) {
  const gloss = `gloss-${product.id}`;
  const bg = `bg-${product.id}`;
  const tint = product.category === "medicine" ? "var(--color-mint-50)" : "var(--color-blush-50)";
  const tintDeep = product.category === "medicine" ? "var(--color-mint-100)" : "var(--color-blush-100)";

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${product.name} by ${product.brand}`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={gloss} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#0f182e" stopOpacity="0" />
          <stop offset="1" stopColor="#0f182e" stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id={bg} cx="0.5" cy="0.42" r="0.65">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.6" stopColor={tint} />
          <stop offset="1" stopColor={tintDeep} />
        </radialGradient>
      </defs>

      {background && <rect width="200" height="200" fill={`url(#${bg})`} />}
      <ellipse cx="100" cy="178" rx="52" ry="7" fill="#0f182e" opacity="0.08" />

      <Shape product={product} gloss={`url(#${gloss})`} />
    </svg>
  );
}

function Label({ x, y, w, h, product }: { x: number; y: number; w: number; h: number; product: { brand: string; accent: string } }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#fff" opacity="0.92" />
      <rect x={x} y={y + h - 6} width={w} height="6" fill={product.accent} opacity="0.9" />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize={Math.min(11, w / 6)}
        fontWeight="600"
        fill="#172240"
      >
        {product.brand}
      </text>
    </g>
  );
}

function Shape({ product, gloss }: { product: Pick<Product, "shape" | "color" | "accent" | "brand">; gloss: string }) {
  const stroke = "rgb(15 24 46 / 0.08)";
  switch (product.shape) {
    case "bottle":
      return (
        <g>
          <rect x="74" y="58" width="52" height="16" rx="4" fill={product.color} stroke={stroke} />
          <rect x="62" y="70" width="76" height="104" rx="16" fill={product.color} stroke={stroke} />
          <Label x={62} y={104} w={76} h={42} product={product} />
          <rect x="62" y="70" width="76" height="104" rx="16" fill={gloss} />
          <rect x="70" y="34" width="60" height="28" rx="6" fill={product.accent} stroke={stroke} />
          <rect x="70" y="34" width="60" height="28" rx="6" fill={gloss} />
        </g>
      );
    case "jar":
      return (
        <g>
          <rect x="44" y="100" width="112" height="74" rx="18" fill={product.color} stroke={stroke} />
          <Label x={44} y={118} w={112} h={34} product={product} />
          <rect x="44" y="100" width="112" height="74" rx="18" fill={gloss} />
          <rect x="40" y="76" width="120" height="30" rx="9" fill={product.accent} stroke={stroke} />
          <rect x="40" y="76" width="120" height="30" rx="9" fill={gloss} />
        </g>
      );
    case "tube":
      return (
        <g>
          <rect x="56" y="22" width="88" height="12" rx="3" fill={product.color} stroke={stroke} />
          <path d="M58 32 H142 L124 148 Q100 154 76 148 Z" fill={product.color} stroke={stroke} />
          <Label x={74} y={70} w={52} h={40} product={product} />
          <path d="M58 32 H142 L124 148 Q100 154 76 148 Z" fill={gloss} />
          <rect x="80" y="146" width="40" height="28" rx="6" fill={product.accent} stroke={stroke} />
          <rect x="80" y="146" width="40" height="28" rx="6" fill={gloss} />
        </g>
      );
    case "box":
      return (
        <g>
          {/* top & side faces for a simple isometric feel */}
          <path d="M50 62 L68 46 H164 L146 62 Z" fill={product.color} stroke={stroke} />
          <path d="M50 62 L68 46 H164 L146 62 Z" fill="#0f182e" opacity="0.04" />
          <path d="M146 62 L164 46 V158 L146 174 Z" fill={product.color} stroke={stroke} />
          <path d="M146 62 L164 46 V158 L146 174 Z" fill="#0f182e" opacity="0.1" />
          <rect x="50" y="62" width="96" height="112" fill={product.color} stroke={stroke} />
          <rect x="50" y="62" width="96" height="22" fill={product.accent} />
          <path d="M50 150 H146 V174 H50 Z" fill={product.accent} opacity="0.18" />
          <text x="98" y="122" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#172240">
            {product.brand}
          </text>
          <rect x="74" y="132" width="48" height="4" rx="2" fill="#172240" opacity="0.2" />
          <rect x="50" y="62" width="96" height="112" fill={gloss} />
        </g>
      );
    case "dropper":
      return (
        <g>
          <ellipse cx="100" cy="46" rx="15" ry="22" fill="#172240" />
          <ellipse cx="94" cy="40" rx="4" ry="9" fill="#fff" opacity="0.25" />
          <rect x="80" y="64" width="40" height="26" rx="5" fill={product.accent} stroke={stroke} />
          <rect x="80" y="64" width="40" height="26" rx="5" fill={gloss} />
          <rect x="66" y="88" width="68" height="86" rx="14" fill={product.color} stroke={stroke} opacity="0.95" />
          <Label x={66} y={116} w={68} h={34} product={product} />
          <rect x="66" y="88" width="68" height="86" rx="14" fill={gloss} />
        </g>
      );
    case "pump":
      return (
        <g>
          <rect x="74" y="28" width="58" height="12" rx="5" fill={product.accent} stroke={stroke} />
          <rect x="128" y="31" width="18" height="6" rx="3" fill={product.accent} stroke={stroke} />
          <rect x="95" y="40" width="10" height="20" fill={product.accent} stroke={stroke} />
          <rect x="82" y="58" width="36" height="18" rx="4" fill={product.accent} stroke={stroke} />
          <rect x="60" y="74" width="80" height="100" rx="22" fill={product.color} stroke={stroke} />
          <Label x={60} y={106} w={80} h={40} product={product} />
          <rect x="60" y="74" width="80" height="100" rx="22" fill={gloss} />
        </g>
      );
  }
}
