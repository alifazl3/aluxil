"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = ["Schiebe", "Daecher", "Pergola", "Markisen", "Kontakt"];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function WeatherHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const nextProgress = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 132 }, (_, index) => {
        const depth = index % 9;

        return {
          id: `rain-${index}`,
          left: (index * 17 + (index % 11) * 5 + Math.floor(index / 7)) % 101,
          delay: `${(index % 31) * -0.09}s`,
          duration: 0.74 + (depth % 5) * 0.12,
          height: 18 + depth * 5 + (index % 3) * 7,
          width: 0.8 + (index % 4) * 0.22,
          threshold: (index % 14) / 18,
        };
      }),
    [],
  );

  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 234 }, (_, index) => {
        const giant = index % 47 === 0;
        const near = !giant && (index % 19 === 0 || index % 31 === 0);
        const mid = !near && index % 7 === 0;
        const size = giant
          ? 22 + (index % 4) * 2.8
          : near
            ? 11 + (index % 5) * 1.8
            : mid
              ? 6 + (index % 4) * 1.1
              : 1.8 + (index % 6) * 0.72;

        return {
          id: `snow-${index}`,
          left: (index * 19 + (index % 13) * 4 + Math.floor(index / 9)) % 101,
          delay: `${(index % 29) * -0.2}s`,
          duration: `${
            giant
              ? 11.4 + (index % 3) * 0.7
              : near
                ? 9.6 + (index % 5) * 0.52
                : 5.4 + (index % 9) * 0.34
          }s`,
          size: `${size}px`,
          drift: `${(index % 2 === 0 ? 1 : -1) * (24 + (index % 8) * 8)}px`,
          threshold: (index % 17) / 22,
          blur: giant
            ? `${2.1 + (index % 3) * 0.28}px`
            : near
            ? `${1.25 + (index % 4) * 0.18}px`
            : mid
              ? `${0.72 + (index % 3) * 0.12}px`
              : `${0.48 + (index % 4) * 0.1}px`,
          maxOpacity: giant ? 0.18 : near ? 0.34 : mid ? 0.48 : 0.56,
          minOpacity: giant ? 0.03 : near ? 0.06 : mid ? 0.1 : 0.12,
        };
      }),
    [],
  );

  const rainBuild = clamp((progress - 0.28) / 0.36);
  const rainFade = clamp((0.94 - progress) / 0.26);
  const rainPower = rainBuild * rainFade;
  const rainOpacity = rainPower * 0.86;
  const snowOpacity = clamp((progress - 0.62) / 0.32);
  const nightOpacity = clamp((progress - 0.12) / 0.34);
  const overlayOpacity = 0.18 + progress * 0.32;
  const sliderPosition = `${progress * 100}%`;
  const lensFlareOpacity = clamp((0.34 - progress) / 0.22) * 0.44;
  const lensFlareTravel = clamp(progress / 0.34);
  const lensFlareRotation = `${progress * -58}deg`;
  const lensFlareX = `${36 - lensFlareTravel * 76}px`;
  const lensFlareY = `${54 - lensFlareTravel * 86}px`;

  const heroStyle = {
    "--night-opacity": nightOpacity,
    "--rain-opacity": rainOpacity,
    "--snow-opacity": snowOpacity,
    "--hero-overlay-opacity": overlayOpacity,
    "--slider-position": sliderPosition,
    "--lens-flare-opacity": lensFlareOpacity,
    "--lens-flare-rotation": lensFlareRotation,
    "--lens-flare-x": lensFlareX,
    "--lens-flare-y": lensFlareY,
  } as React.CSSProperties;

  const handleHeroClick = () => {
    if (rainOpacity < 0.08 && snowOpacity < 0.08) {
      return;
    }

    setFlash(true);
    window.setTimeout(() => setFlash(false), 180);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[320vh] bg-[#111322]"
      style={heroStyle}
    >
      <div
        className="sticky top-0 h-screen min-h-[620px] overflow-hidden bg-[#111322] text-white"
        onClick={handleHeroClick}
      >
        <Image
          src="/hero/day.jpg"
          alt="Modern aluminum terrace roof on a bright day"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <Image
          src="/hero/night.jpg"
          alt="Modern aluminum terrace roof at night"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[var(--night-opacity)]"
        />
        <div className="absolute inset-0 bg-[#050814] opacity-[var(--hero-overlay-opacity)]" />
        <div className="hero-lens-flare" aria-hidden="true">
          <Image
            src="/hero/lens-flare.png"
            alt=""
            fill
            sizes="(max-width: 768px) 68vw, 520px"
            className="object-contain"
          />
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-30 bg-white ${
            flash ? "animate-[hero-lightning_520ms_ease-out]" : "opacity-0"
          }`}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--rain-opacity)]"
        >
          {rainDrops.map((drop) => (
            <span
              key={drop.id}
              className="hero-rain-drop"
              style={{
                left: `${drop.left}%`,
                animationDelay: drop.delay,
                animationDuration: `${drop.duration - rainPower * 0.45}s`,
                height: `${drop.height + rainPower * 18}px`,
                width: `${drop.width + rainPower * 0.26}px`,
                opacity:
                  rainPower > drop.threshold
                    ? 0.2 + rainPower * 0.68
                    : rainPower * 0.18,
              }}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--snow-opacity)]"
        >
          {snowFlakes.map((flake) => (
            <span
              key={flake.id}
              className="hero-snow-flake"
              style={
                {
                  left: `${flake.left}%`,
                  width: flake.size,
                  height: flake.size,
                  animationDelay: flake.delay,
                  animationDuration: flake.duration,
                  opacity:
                    snowOpacity > flake.threshold
                      ? flake.minOpacity + snowOpacity * flake.maxOpacity
                      : snowOpacity * flake.minOpacity,
                  filter: `blur(${flake.blur})`,
                  "--flake-drift": flake.drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-[#020617]/72 backdrop-blur-md">
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link href="/" className="text-sm font-bold tracking-normal">
              Aluxil
            </Link>
            <nav aria-label="Primary navigation" className="hidden md:block">
              <ul className="flex items-center gap-8 text-xs font-medium text-white/72">
                {navItems.map((item) => (
                  <li key={item}>
                    <a className="transition hover:text-white" href="#projects">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div
          className="absolute left-1/2 top-[58px] z-20 w-[min(280px,68vw)] -translate-x-1/2"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-2 flex items-center justify-between px-1 text-base font-semibold leading-none text-white/78 sm:text-lg">
            <span>☀</span>
            <span>☁</span>
            <span>☔</span>
            <span>❄</span>
          </div>
          <div className="relative h-4 rounded-full border border-white/25 bg-white/18 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-y-1 left-2 right-2 rounded-full bg-white/24" />
            <div className="absolute inset-y-1 left-2 right-2 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-white/70"
                style={{ width: sliderPosition }}
              />
            </div>
            <div className="absolute left-[var(--slider-position)] top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white shadow-[0_8px_22px_rgba(0,0,0,0.35)] transition-[box-shadow]">
              <div className="absolute inset-2 rounded-full bg-cyan-500" />
            </div>
            <input
              aria-label="Weather intensity"
              type="range"
              min="0"
              max="100"
              value={Math.round(progress * 100)}
              onChange={(event) =>
                setProgress(Number(event.currentTarget.value) / 100)
              }
              className="absolute -inset-x-1 -inset-y-2 z-10 cursor-pointer opacity-0"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 top-[19%] z-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h1 className="max-w-[560px] text-4xl font-bold leading-[1.08] tracking-normal text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.48)] sm:text-5xl lg:text-6xl">
              Aluminium Terrassendächer & Überdachungen
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
