'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import Hero from '@/components/birthday/Hero';
import SurpriseAhead from '@/components/birthday/SurpriseAhead';
import BlowTheCandle from '@/components/birthday/BlowTheCandle';
import ConfettiCanvas from '@/components/birthday/ConfettiCanvas';
import HeartfeltAffirmations from '@/components/birthday/HeartfeltAffirmations';
import WishingTree from '@/components/birthday/WishingTree';

const sections = [
  { component: <Hero />, id: 'hero' },
  { component: <SurpriseAhead />, id: 'surprise' },
  { component: <BlowTheCandle onCandlesBlown={() => handleNextSection(2)} />, id: 'candle' },
  { component: <WishingTree />, id: 'tree' },
  { component: <HeartfeltAffirmations />, id: 'affirmations' },
];

const SECTION_INTERVAL = 5000; // 5 seconds

const MagicalBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-background to-purple-900/80">
    {/* Wavy Shapes */}
    <div className="absolute top-0 left-0 w-full h-full opacity-30">
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 rounded-full animate-wave"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-gradient-to-bl from-accent/30 via-transparent to-primary/30 rounded-full animate-wave-reverse"></div>
    </div>
    {/* Shooting Stars */}
    {[...Array(3)].map((_, i) => (
      <div
        key={`shooting-star-${i}`}
        className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-secondary/80 to-transparent rounded-full animate-shooting-star"
        style={{
          animationDelay: `${i * 3 + Math.random() * 2}s`,
          left: `${Math.random() * 100}vw`,
        }}
      />
    ))}
    {/* Sparkles */}
    {[...Array(50)].map((_, i) => (
        <div key={`sparkle-${i}`}
             className="absolute w-1.5 h-1.5 bg-secondary/80 rounded-full animate-sparkle"
             style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
             }}
        />
    ))}
    {/* Bokeh */}
    {[...Array(25)].map((_, i) => (
        <div key={`bokeh-${i}`}
            className="absolute bg-primary/20 rounded-full animate-float"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 120 + 60}px`,
                height: `${Math.random() * 120 + 60}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 12 + 18}s`,
            }}
        />
    ))}
  </div>
);

let handleNextSection: (current: number) => void;

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, startTransition] = useTransition();
  const candleSectionIndex = sections.findIndex(s => s.id === 'candle');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  handleNextSection = (current: number) => {
    if (current < sections.length - 1) {
      startTransition(() => {
        setCurrentSection(current + 1);
      });
    }
  };


  useEffect(() => {
    // If it's not the last section, and not the candle section, set a timer to go to the next one
    if (currentSection < sections.length - 1 && currentSection !== candleSectionIndex) {
      const timer = setTimeout(() => {
        startTransition(() => {
          setCurrentSection(prev => prev + 1);
        });
      }, SECTION_INTERVAL);

      // Clear the timer if the component unmounts or the section changes
      return () => clearTimeout(timer);
    }
  }, [currentSection, candleSectionIndex]);
  
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current?.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <>
      <audio ref={audioRef} loop className="sr-only">
        <source src="https://upload.wikimedia.org/wikipedia/commons/2/23/Happy_Birthday_to_You_instrumental_piano_version.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <ConfettiCanvas />
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden" onClick={handleInteraction}>
        <MagicalBackground />
        <div className={`relative z-10 w-full h-dvh flex items-center justify-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {CurrentComponent}
        </div>

        {currentSection === sections.length - 1 && (
          <footer className="absolute bottom-8 text-center text-sm text-muted-foreground bg-transparent z-20 transition-opacity duration-1000 opacity-100">
            Made with ❤️ for Afsheen.
          </footer>
        )}
      </div>
    </>
  );
}
