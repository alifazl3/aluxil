"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Locale } from "@/core/domain/home";

type ProductFeatureProps = {
  locale: Locale;
};

type ProductKey = "afw135" | "aw110";

const products = {
  afw135: {
    name: "AFW135 System",
    image: "/products/afw135.png",
    imageFit: "wide",
    options: [
      { size: "400 x 394 cm / 2 posts", price: "EUR 4,290" },
      { size: "400 x 500 cm / 3 posts", price: "EUR 5,190" },
      { size: "400 x 600 cm / 3 posts", price: "EUR 5,890" },
      { size: "500 x 500 cm / 3 posts", price: "EUR 5,990" },
      { size: "500 x 600 cm / 3 posts", price: "EUR 6,790" },
    ],
  },
  aw110: {
    name: "AW110 System",
    image: "/products/aw110.png",
    imageFit: "tall",
    options: [
      { size: "340 x 340 cm / 2 posts", price: "EUR 3,490" },
      { size: "340 x 500 cm / 3 posts", price: "EUR 4,290" },
      { size: "340 x 600 cm / 3 posts", price: "EUR 4,890" },
      { size: "400 x 500 cm / 3 posts", price: "EUR 5,390" },
      { size: "400 x 600 cm / 3 posts", price: "EUR 6,190" },
    ],
  },
} satisfies Record<
  ProductKey,
  {
    imageFit?: "wide" | "tall";
    image: string;
    name: string;
    options: { price: string; size: string }[];
  }
>;

const productCopy = {
  de: {
    eyebrow: "Products",
    dimensionLabel: "Groesse",
    productLabel: "Produkt",
    descriptions: {
      afw135:
        "FlatCube | AFW135 - Perfektion in Form und Funktion\n\nDas Flachdachsystem FlatCube | AW135 steht für modernste Technik gepaart mit klarem und minimalistischem Design.\nEs fügt sich nahtlos in jedes moderne Wohnkonzept ein und schafft einen stilvollen Übergang zwischen Innen und Außen. Seine schlanke, zeitlose Ästhetik macht ihn zur perfekten Wahl für ale, die Wert auf Eleganz und Funktionalität legen. Dank seiner robusten und wetterfesten Konstruktion schützt die AW135 zuverlässig vor Regen, Wind und Schnee, ohne Kompromisse bei der Optik einzugehen. Die innovative Technik ermöglicht eine optimale Lichtdurchflutung, während integrierte Wasserabläufe für einen sauberen und trockenen Außenbereich sorgen.\n\nMit vielfältigen Anpassungsmöglichkeiten wie integrierter LED-Beleuchtung, Heizsystemen oder Seitenverglasungen wird FlatCube zum Herzstück deines Outdoorbereichs - individuell anpassbar an deine Bedürfnisse, Erlebe ganzjährig Komfort, Schutz und Style unter einem Dach, das zukunftsweisendes Design mit nachhaltigen Materialien verbindet.\nFlatCube | AW135 - die perfekte Wahl für modernes Wohnen im Einklang mit der Natur!",
      aw110:
        "Das Terrassendachsystem SKYROOF | AW110\n\nkombiniert Eleganz mit herausragender Witterungsbeständigkeit. Mit seinem harmonischen Design fügt es sich nahtlos in jede Umgebung ein und schafft einen stilvollen und funktionalen Außenbereich. Die robuste Aluminiumstruktur sorgt für Schutz vor Sonne, Regen und Wind, während natürliches Licht für eine angenehme Atmosphäre sorgt. Verstellbare Lamellen ermöglichen maximale Flexibilität, sodass Licht und Schatten individuell reguliert werden können. Nachhaltig, langlebig und wartungsarm SKYROOF | AW110 ist die perfekte Lösung für Komfort, Stil und Lebensqualität im Freien.",
    },
  },
  en: {
    eyebrow: "Products",
    dimensionLabel: "Size",
    productLabel: "Product",
    descriptions: {
      afw135:
        "FlatCube | AFW135 - precision in form and function\n\nThe FlatCube | AW135 flat-roof system combines modern engineering with a clear, minimal design language. It integrates naturally into contemporary living concepts and creates a refined transition between indoor and outdoor spaces. Its slim, timeless aesthetic makes it ideal for projects that value elegance, function, and durable weather protection.\n\nWith options such as integrated LED lighting, heating systems, and side glazing, FlatCube becomes the center of the outdoor area and can be adapted to individual needs throughout the year.",
      aw110:
        "The SKYROOF | AW110 patio roof system combines elegance with outstanding weather resistance. Its balanced design fits naturally into any environment and creates a stylish, functional outdoor area. The robust aluminium structure protects against sun, rain, and wind while natural light keeps the atmosphere pleasant. Adjustable louvers provide flexibility so light and shade can be regulated individually. Sustainable, durable, and low-maintenance, SKYROOF | AW110 is a refined solution for comfort, style, and outdoor quality of life.",
    },
  },
} satisfies Record<
  Locale,
  {
    descriptions: Record<ProductKey, string>;
    dimensionLabel: string;
    eyebrow: string;
    productLabel: string;
  }
>;

export function ProductFeature({ locale }: ProductFeatureProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>("afw135");
  const [selectedSize, setSelectedSize] = useState(products.afw135.options[0].size);
  const copy = productCopy[locale];
  const product = products[selectedProduct];
  const selectedOption = useMemo(
    () =>
      product.options.find((option) => option.size === selectedSize) ??
      product.options[0],
    [product.options, selectedSize],
  );

  const handleProductChange = (value: ProductKey) => {
    setSelectedProduct(value);
    setSelectedSize(products[value].options[0].size);
  };

  return (
    <section className="product-feature-section" aria-label="Product showcase">
      <div className="product-feature-section__copy">
        <p className="product-feature-section__eyebrow">{copy.eyebrow}</p>
        <label className="product-feature-section__product-picker" htmlFor="product-picker">
          <span>{copy.productLabel}</span>
          <select
            id="product-picker"
            value={selectedProduct}
            onChange={(event) =>
              handleProductChange(event.currentTarget.value as ProductKey)
            }
          >
            {(Object.keys(products) as ProductKey[]).map((key) => (
              <option key={key} value={key}>
                {products[key].name}
              </option>
            ))}
          </select>
        </label>
        <div className="product-feature-section__description-wrap">
          <div className="product-feature-section__description" tabIndex={0}>
            {copy.descriptions[selectedProduct].split("\n").map((line, index) =>
              line ? (
                <p
                  key={`${line}-${index}`}
                  className={
                    index === 0
                      ? "product-feature-section__description-title"
                      : undefined
                  }
                >
                  {line}
                </p>
              ) : (
                <br key={index} />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="product-feature-section__visual">
        <div className="product-feature-section__stage" aria-hidden="true">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className={`product-feature-section__image product-feature-section__image--${product.imageFit} product-feature-section__image--depth product-feature-section__image--depth-back`}
          />
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className={`product-feature-section__image product-feature-section__image--${product.imageFit} product-feature-section__image--depth product-feature-section__image--depth-mid`}
          />
          <Image
            src={product.image}
            alt={`${product.name} aluminium roof system`}
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className={`product-feature-section__image product-feature-section__image--${product.imageFit}`}
            priority={false}
          />
        </div>
      </div>

      <div className="product-feature-section__controls">
        <label>
          <span>{copy.dimensionLabel}</span>
          <select
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.currentTarget.value)}
          >
            {product.options.map((option) => (
              <option key={option.size} value={option.size}>
                {option.size}
              </option>
            ))}
          </select>
        </label>
        <strong>{selectedOption.price}</strong>
      </div>
    </section>
  );
}
