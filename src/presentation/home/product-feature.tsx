"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Locale } from "@/core/domain/home";

type ProductFeatureProps = {
  locale: Locale;
};

const afw135Options = [
  { size: "400 x 394 cm / 2 posts", price: "EUR 4,290" },
  { size: "400 x 500 cm / 3 posts", price: "EUR 5,190" },
  { size: "400 x 600 cm / 3 posts", price: "EUR 5,890" },
  { size: "500 x 500 cm / 3 posts", price: "EUR 5,990" },
  { size: "500 x 600 cm / 3 posts", price: "EUR 6,790" },
];

const productCopy = {
  de: {
    eyebrow: "Products",
    name: "AFW135 System",
    description:
      "FlatCube | AFW135 - Perfektion in Form und Funktion\n\nDas Flachdachsystem FlatCube | AW135 steht für modernste Technik gepaart mit klarem und minimalistischem Design.\nEs fügt sich nahtlos in jedes moderne Wohnkonzept ein und schafft einen stilvollen Übergang zwischen Innen und Außen. Seine schlanke, zeitlose Ästhetik macht ihn zur perfekten Wahl für ale, die Wert auf Eleganz und Funktionalität legen. Dank seiner robusten und wetterfesten Konstruktion schützt die AW135 zuverlässig vor Regen, Wind und Schnee, ohne Kompromisse bei der Optik einzugehen. Die innovative Technik ermöglicht eine optimale Lichtdurchflutung, während integrierte Wasserabläufe für einen sauberen und trockenen Außenbereich sorgen.\n\nMit vielfältigen Anpassungsmöglichkeiten wie integrierter LED-Beleuchtung, Heizsystemen oder Seitenverglasungen wird FlatCube zum Herzstück deines Outdoorbereichs - individuell anpassbar an deine Bedürfnisse, Erlebe ganzjährig Komfort, Schutz und Style unter einem Dach, das zukunftsweisendes Design mit nachhaltigen Materialien verbindet.\nFlatCube | AW135 - die perfekte Wahl für modernes Wohnen im Einklang mit der Natur!",
    dimensionLabel: "AFW135 size",
  },
  en: {
    eyebrow: "Products",
    name: "AFW135 System",
    description:
      "FlatCube | AFW135 - precision in form and function\n\nThe FlatCube | AW135 flat-roof system combines modern engineering with a clear, minimal design language. It integrates naturally into contemporary living concepts and creates a refined transition between indoor and outdoor spaces. Its slim, timeless aesthetic makes it ideal for projects that value elegance, function, and durable weather protection.\n\nWith options such as integrated LED lighting, heating systems, and side glazing, FlatCube becomes the center of the outdoor area and can be adapted to individual needs throughout the year.",
    dimensionLabel: "AFW135 size",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProductFeature({ locale }: ProductFeatureProps) {
  const [selectedSize, setSelectedSize] = useState(afw135Options[0].size);
  const copy = productCopy[locale];
  const selectedOption = useMemo(
    () =>
      afw135Options.find((option) => option.size === selectedSize) ??
      afw135Options[0],
    [selectedSize],
  );

  return (
    <section className="product-feature-section" aria-labelledby="afw135-title">
      <div className="product-feature-section__copy">
        <p className="product-feature-section__eyebrow">{copy.eyebrow}</p>
        <h2 id="afw135-title">{copy.name}</h2>
        <div className="product-feature-section__description" tabIndex={0}>
          {copy.description.split("\n").map((line, index) =>
            line ? <p key={`${line}-${index}`}>{line}</p> : <br key={index} />,
          )}
        </div>
      </div>

      <div className="product-feature-section__visual">
        <div className="product-feature-section__stage" aria-hidden="true">
          <Image
            src="/products/afw135.png"
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className="product-feature-section__image product-feature-section__image--depth product-feature-section__image--depth-back"
          />
          <Image
            src="/products/afw135.png"
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className="product-feature-section__image product-feature-section__image--depth product-feature-section__image--depth-mid"
          />
          <Image
            src="/products/afw135.png"
            alt="AFW135 aluminium roof system"
            fill
            sizes="(max-width: 900px) 92vw, 56vw"
            className="product-feature-section__image"
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
            {afw135Options.map((option) => (
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
