"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/core/domain/home";

const heroTitle = {
  de: "Aluminium Terrassendaecher & Ueberdachungen",
  en: "Aluminium patio roofs & canopies",
} satisfies Record<Locale, string>;

type WeatherHeroProps = {
  locale: Locale;
  soundMuted: boolean;
};

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

type HeroAudioGraph = {
  birdGain: GainNode;
  chirpTimer: number | null;
  context: AudioContext;
  master: GainNode;
  rainFilter: BiquadFilterNode;
  rainGain: GainNode;
  rainSource: AudioBufferSourceNode;
  snowGain: GainNode;
  snowSource: AudioBufferSourceNode;
};

type HeroAudioState = {
  muted: boolean;
  progress: number;
  rainPower: number;
  snowOpacity: number;
};

function createNoiseBuffer(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function createLoopingNoiseSource(context: AudioContext, seconds: number) {
  const source = context.createBufferSource();

  source.buffer = createNoiseBuffer(context, seconds);
  source.loop = true;

  return source;
}

function createHeroAudioGraph(context: AudioContext): HeroAudioGraph {
  const master = context.createGain();
  const birdGain = context.createGain();
  const rainGain = context.createGain();
  const snowGain = context.createGain();
  const rainFilter = context.createBiquadFilter();
  const snowFilter = context.createBiquadFilter();
  const rainSource = createLoopingNoiseSource(context, 2);
  const snowSource = createLoopingNoiseSource(context, 2);

  master.gain.value = 0;
  birdGain.gain.value = 0.65;
  rainGain.gain.value = 0;
  snowGain.gain.value = 0;
  rainFilter.type = "bandpass";
  rainFilter.frequency.value = 1250;
  rainFilter.Q.value = 0.74;
  snowFilter.type = "lowpass";
  snowFilter.frequency.value = 520;
  snowFilter.Q.value = 0.38;

  rainSource.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(master);
  snowSource.connect(snowFilter);
  snowFilter.connect(snowGain);
  snowGain.connect(master);
  birdGain.connect(master);
  master.connect(context.destination);

  rainSource.start();
  snowSource.start();

  return {
    birdGain,
    chirpTimer: null,
    context,
    master,
    rainFilter,
    rainGain,
    rainSource,
    snowGain,
    snowSource,
  };
}

function setSmoothValue(param: AudioParam, value: number, context: AudioContext, time = 0.28) {
  const now = context.currentTime;

  param.cancelScheduledValues(now);
  param.setTargetAtTime(value, now, time);
}

function updateHeroAudio(graph: HeroAudioGraph, state: HeroAudioState) {
  const { context } = graph;
  const audible = state.muted ? 0 : 1;
  const birdVolume =
    state.progress < 0.32 && state.rainPower < 0.08 && state.snowOpacity < 0.08 ? 0.72 : 0.18;
  const rainVolume = state.rainPower > 0.02 ? 0.012 + state.rainPower * 0.18 : 0;
  const snowVolume = state.snowOpacity > 0.03 ? state.snowOpacity * 0.036 : 0;

  setSmoothValue(graph.master.gain, audible * 0.58, context, 0.22);
  setSmoothValue(graph.birdGain.gain, birdVolume, context, 0.8);
  setSmoothValue(graph.rainGain.gain, audible * rainVolume, context, 0.24);
  setSmoothValue(graph.snowGain.gain, audible * snowVolume, context, 0.5);
  setSmoothValue(graph.rainFilter.frequency, 900 + state.rainPower * 2500, context, 0.18);
  setSmoothValue(graph.rainFilter.Q, 0.64 + state.rainPower * 0.62, context, 0.18);
}

function playBirdChirp(graph: HeroAudioGraph) {
  const { context } = graph;
  const chirpCount = 2 + Math.floor(Math.random() * 2);

  for (let index = 0; index < chirpCount; index += 1) {
    const start = context.currentTime + index * (0.1 + Math.random() * 0.05);
    const end = start + 0.12 + Math.random() * 0.05;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const baseFrequency = 1450 + Math.random() * 540;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(baseFrequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * (1.28 + Math.random() * 0.26), end);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.024 + Math.random() * 0.012, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    oscillator.connect(gain);
    gain.connect(graph.birdGain);
    oscillator.start(start);
    oscillator.stop(end + 0.02);
  }
}

function playThunder(graph: HeroAudioGraph) {
  const { context } = graph;
  const now = context.currentTime;
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const rumble = context.createOscillator();
  const rumbleGain = context.createGain();
  const duration = 2.5 + Math.random() * 0.9;

  noise.buffer = createNoiseBuffer(context, duration);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(260 + Math.random() * 120, now);
  filter.frequency.exponentialRampToValueAtTime(56 + Math.random() * 24, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.34 + Math.random() * 0.16, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  rumble.type = "sine";
  rumble.frequency.setValueAtTime(42 + Math.random() * 18, now);
  rumble.frequency.exponentialRampToValueAtTime(28 + Math.random() * 12, now + duration);
  rumbleGain.gain.setValueAtTime(0.0001, now);
  rumbleGain.gain.exponentialRampToValueAtTime(0.16 + Math.random() * 0.08, now + 0.08);
  rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(graph.master);
  rumble.connect(rumbleGain);
  rumbleGain.connect(graph.master);
  noise.start(now);
  noise.stop(now + duration);
  rumble.start(now);
  rumble.stop(now + duration);
}

function startBirdChirpLoop(
  graph: HeroAudioGraph,
  getLatestState: () => HeroAudioState,
) {
  if (graph.chirpTimer !== null) {
    return;
  }

  graph.chirpTimer = window.setInterval(() => {
    const latestState = getLatestState();

    if (
      !latestState.muted &&
      latestState.progress < 0.32 &&
      latestState.rainPower < 0.08 &&
      latestState.snowOpacity < 0.08 &&
      Math.random() > 0.34
    ) {
      playBirdChirp(graph);
    }
  }, 2100);
}

function useHeroWeatherAudio(state: HeroAudioState) {
  const audioRef = useRef<HeroAudioGraph | null>(null);
  const latestStateRef = useRef(state);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) {
      void audioRef.current.context.resume();
      return audioRef.current;
    }

    const AudioContextConstructor =
      window.AudioContext ??
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    const context = new AudioContextConstructor();
    const graph = createHeroAudioGraph(context);

    audioRef.current = graph;
    updateHeroAudio(graph, latestStateRef.current);
    startBirdChirpLoop(graph, () => latestStateRef.current);
    void context.resume();

    return graph;
  }, []);

  useEffect(() => {
    const nextState = {
      muted: state.muted,
      progress: state.progress,
      rainPower: state.rainPower,
      snowOpacity: state.snowOpacity,
    };
    const graph = audioRef.current;

    latestStateRef.current = nextState;

    if (!graph) {
      return;
    }

    updateHeroAudio(graph, nextState);
  }, [state.muted, state.progress, state.rainPower, state.snowOpacity]);

  useEffect(() => {
    const activateAudio = () => {
      ensureAudio();
    };

    window.addEventListener("pointerdown", activateAudio, {
      capture: true,
      once: true,
    });
    window.addEventListener("keydown", activateAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", activateAudio, {
        capture: true,
      });
      window.removeEventListener("keydown", activateAudio);

      const graph = audioRef.current;

      if (!graph) {
        return;
      }

      if (graph.chirpTimer !== null) {
        window.clearInterval(graph.chirpTimer);
      }

      try {
        graph.rainSource.stop();
        graph.snowSource.stop();
      } catch {
        // Audio nodes may already be stopped if the browser tears down the context.
      }

      void graph.context.close();
      audioRef.current = null;
    };
  }, [ensureAudio]);

  return useCallback(() => {
    const graph = ensureAudio();

    if (!graph || latestStateRef.current.muted) {
      return;
    }

    playThunder(graph);
  }, [ensureAudio]);
}

export function WeatherHero({ locale, soundMuted }: WeatherHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const [lightning, setLightning] = useState({
    duration: 1040,
    peak: 0.2,
  });

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
      Array.from({ length: 468 }, (_, index) => {
        const massive = index % 157 === 0;
        const giant = index % 47 === 0;
        const near =
          !massive && !giant && (index % 19 === 0 || index % 31 === 0);
        const mid = !near && index % 7 === 0;
        const size = massive
          ? 46 + (index % 3) * 8
          : giant
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
            massive
              ? 14.5 + (index % 3) * 1.1
              : giant
                ? 11.4 + (index % 3) * 0.7
                : near
                  ? 9.6 + (index % 5) * 0.52
                  : 5.4 + (index % 9) * 0.34
          }s`,
          size: `${size}px`,
          drift: `${(index % 2 === 0 ? 1 : -1) * (24 + (index % 8) * 8)}px`,
          threshold: (index % 17) / 22,
          blur: massive
            ? `${4.2 + (index % 3) * 0.55}px`
            : giant
              ? `${2.1 + (index % 3) * 0.28}px`
              : near
                ? `${1.25 + (index % 4) * 0.18}px`
                : mid
                  ? `${0.72 + (index % 3) * 0.12}px`
                  : `${0.48 + (index % 4) * 0.1}px`,
          maxOpacity: massive
            ? 0.12
            : giant
              ? 0.18
              : near
                ? 0.34
                : mid
                  ? 0.48
                  : 0.56,
          minOpacity: massive
            ? 0.02
            : giant
              ? 0.03
              : near
                ? 0.06
                : mid
                  ? 0.1
                  : 0.12,
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
  const triggerThunder = useHeroWeatherAudio({
    muted: soundMuted,
    progress,
    rainPower,
    snowOpacity,
  });

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

    setLightning({
      duration: 920 + Math.round(Math.random() * 360),
      peak: 1,
    });
    setFlash(true);
    triggerThunder();
    window.setTimeout(() => setFlash(false), 1320);
  };

  const lightningStyle = flash
    ? ({
        animation: `hero-lightning ${lightning.duration}ms cubic-bezier(0.12, 0, 0.18, 1)`,
        "--lightning-peak": lightning.peak,
        "--lightning-mid": lightning.peak * 0.54,
        "--lightning-low": lightning.peak * 0.2,
      } as React.CSSProperties)
    : undefined;

  const lightningStreakStyle = flash
    ? ({
        animation: `hero-lightning ${lightning.duration}ms cubic-bezier(0.12, 0, 0.18, 1)`,
        "--lightning-peak": lightning.peak * 0.5,
        "--lightning-mid": lightning.peak * 0.27,
        "--lightning-low": lightning.peak * 0.1,
      } as React.CSSProperties)
    : undefined;

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
          className="hero-lightning-overlay"
          style={lightningStyle}
        />
        <div
          aria-hidden="true"
          className="hero-rad-lightning"
          style={lightningStreakStyle}
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
              {heroTitle[locale]}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
