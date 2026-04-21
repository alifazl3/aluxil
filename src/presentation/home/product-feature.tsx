import Image from "next/image";
import type { Locale } from "@/core/domain/home";

type ProductFeatureProps = {
  locale: Locale;
};

const productCopy = {
  de: {
    eyebrow: "Products",
    name: "AFW135 System",
    description:
      "FlatCube | AFW135 - Perfektion in Form und Funktion. Das Flachdachsystem FlatCube | AW135 steht fuer modernste Technik gepaart mit klarem und minimalistischem Design. Es fuegt sich nahtlos in jedes moderne Wohnkonzept ein und schafft einen stilvollen Uebergang zwischen Innen und Aussen. Seine schlanke, zeitlose Aesthetik macht ihn zur perfekten Wahl fuer alle, die Wert auf Eleganz und Funktionalitaet legen. Dank seiner robusten und wetterfesten Konstruktion schuetzt die AW135 zuverlaessig vor Regen, Wind und Schnee, ohne Kompromisse bei der Optik einzugehen.",
    size: "340 x 340 cm / 2 posts",
    price: "EUR 4,890",
  },
  en: {
    eyebrow: "Products",
    name: "AFW135 System",
    description:
      "FlatCube | AFW135 brings precision, structure, and clean modern function together. Its minimal aluminium profile creates a quiet transition between indoor and outdoor living while protecting reliably from rain, wind, and snow. A slim, timeless roof system for projects that value elegance, durability, and architectural clarity.",
    size: "340 x 340 cm / 2 posts",
    price: "EUR 4,890",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProductFeature({ locale }: ProductFeatureProps) {
  const copy = productCopy[locale];

  return (
    <section className="product-feature-section" aria-labelledby="afw135-title">
      <div className="product-feature-section__copy">
        <p className="product-feature-section__eyebrow">{copy.eyebrow}</p>
        <h2 id="afw135-title">{copy.name}</h2>
        <p>{copy.description}</p>
      </div>

      <div className="product-feature-section__visual" aria-hidden="true">
        <div className="product-feature-section__stage">
          <Image
            src="/products/afw135.jpeg"
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className="product-feature-section__image"
          />
        </div>
      </div>

      <div className="product-feature-section__controls">
        <button type="button">{copy.size}</button>
        <strong>{copy.price}</strong>
      </div>
    </section>
  );
}
