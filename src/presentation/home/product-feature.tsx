"use client";

import Image from "next/image";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type ProductPriceProps = {
  price: string;
};

type PriceDigitWheelProps = {
  digit: string;
  index: number;
  previousDigit: string;
  revision: number;
};

function PriceDigitWheel({
  digit,
  index,
  previousDigit,
  revision,
}: PriceDigitWheelProps) {
  const stackRef = useRef<HTMLSpanElement>(null);
  const currentValue = Number(digit);
  const previousValue = Number(previousDigit);
  const finalDelta = (currentValue - previousValue + 10) % 10;
  const totalSteps = revision === 0 ? 0 : 30 + finalDelta;
  const sequence = useMemo(
    () =>
      Array.from({ length: totalSteps + 1 }, (_, step) =>
        String((previousValue + step) % 10),
      ),
    [previousValue, totalSteps],
  );
  const reversedSequence = useMemo(() => [...sequence].reverse(), [sequence]);
  const startOffset = totalSteps * -100;
  const coastOffset = (totalSteps - 30) * -100;

  useLayoutEffect(() => {
    const stack = stackRef.current;

    if (!stack) {
      return;
    }

    if (revision === 0) {
      stack.style.transform = "translateY(0%)";
      return;
    }

    stack.style.transform = `translateY(${startOffset}%)`;
    const animation = stack.animate(
      [
        {
          offset: 0,
          transform: `translateY(${startOffset}%)`,
          easing: "cubic-bezier(0.42, 0, 0.96, 0.64)",
        },
        {
          offset: 0.68,
          transform: `translateY(${coastOffset}%)`,
          easing: "cubic-bezier(0.06, 0.72, 0.18, 1)",
        },
        {
          offset: 1,
          transform: "translateY(0%)",
        },
      ],
      {
        delay: index * 54,
        duration: 1580 + index * 44,
        fill: "both",
      },
    );

    return () => animation.cancel();
  }, [coastOffset, index, revision, startOffset]);

  return (
    <span className="product-feature-section__price-wheel" aria-hidden="true">
      <span ref={stackRef} className="product-feature-section__price-wheel-stack">
        {reversedSequence.map((value, valueIndex) => (
          <span
            key={`wheel-${revision}-${index}-${valueIndex}-${value}`}
            className="product-feature-section__price-wheel-digit"
          >
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

function ProductPrice({ price }: ProductPriceProps) {
  const [priceState, setPriceState] = useState({
    current: price,
    previous: price,
    revision: 0,
  });
  let activePriceState = priceState;

  if (priceState.current !== price) {
    activePriceState = {
      current: price,
      previous: priceState.current,
      revision: priceState.revision + 1,
    };
    setPriceState(activePriceState);
  }

  return (
    <strong className="product-feature-section__price" aria-label={price}>
      {Array.from(activePriceState.current).map((character, index) => {
        const previousCharacter = activePriceState.previous[index] ?? character;
        const isDigit = /\d/.test(character);

        if (!isDigit) {
          return (
            <span
              key={`static-${index}-${character}`}
              className="product-feature-section__price-static"
              aria-hidden="true"
            >
              {character}
            </span>
          );
        }

        return (
          <PriceDigitWheel
            key={`digit-${activePriceState.revision}-${index}-${character}`}
            digit={character}
            index={index}
            previousDigit={previousCharacter}
            revision={activePriceState.revision}
          />
        );
      })}
    </strong>
  );
}

export function ProductFeature({ locale }: ProductFeatureProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>("afw135");
  const [selectedSize, setSelectedSize] = useState(products.afw135.options[0].size);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
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
    descriptionRef.current?.scrollTo({ top: 0 });
    setIsProductOpen(false);
    setIsSizeOpen(false);
  };

  return (
    <section className="product-feature-section" aria-label="Product showcase">
      <p className="product-feature-section__eyebrow">{copy.eyebrow}</p>
      <div
        className={`product-feature-section__product-picker ${
          isProductOpen ? "product-feature-section__product-picker--open" : ""
        }`}
      >
        <span>{copy.productLabel}</span>
        <button
          type="button"
          className="product-feature-section__product-trigger"
          aria-controls="product-model-menu"
          aria-expanded={isProductOpen}
          aria-haspopup="listbox"
          onClick={() => {
            setIsProductOpen((isOpen) => !isOpen);
            setIsSizeOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsProductOpen(false);
            }
          }}
        >
          {product.name}
        </button>
        <div
          id="product-model-menu"
          className="product-feature-section__product-menu"
          role="listbox"
          aria-hidden={!isProductOpen}
        >
          {(Object.keys(products) as ProductKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="option"
              aria-selected={key === selectedProduct}
              tabIndex={isProductOpen ? 0 : -1}
              onClick={() => handleProductChange(key)}
            >
              {products[key].name}
            </button>
          ))}
        </div>
      </div>
      <div className="product-feature-section__description-wrap">
        <div
          ref={descriptionRef}
          className="product-feature-section__description"
          tabIndex={0}
        >
          {copy.descriptions[selectedProduct].split("\n").map((line, index) =>
            line ? (
              <p
                key={`${line}-${index}`}
                className={
                  index === 0
                    ? "product-feature-section__description-title"
                    : "product-feature-section__description-body"
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
        <div
          className={`product-feature-section__size-picker ${
            isSizeOpen ? "product-feature-section__size-picker--open" : ""
          }`}
        >
          <span>{copy.dimensionLabel}</span>
          <button
            type="button"
            className="product-feature-section__size-trigger"
            aria-controls="product-size-menu"
            aria-expanded={isSizeOpen}
            aria-haspopup="listbox"
            onClick={() => {
              setIsSizeOpen((isOpen) => !isOpen);
              setIsProductOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsSizeOpen(false);
              }
            }}
          >
            {selectedOption.size}
          </button>
          <div
            id="product-size-menu"
            className="product-feature-section__size-menu"
            role="listbox"
            aria-hidden={!isSizeOpen}
          >
            {product.options.map((option) => (
              <button
                key={option.size}
                type="button"
                role="option"
                aria-selected={option.size === selectedSize}
                tabIndex={isSizeOpen ? 0 : -1}
                onClick={() => {
                  setSelectedSize(option.size);
                  setIsSizeOpen(false);
                }}
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>
        <ProductPrice price={selectedOption.price} />
      </div>
    </section>
  );
}
