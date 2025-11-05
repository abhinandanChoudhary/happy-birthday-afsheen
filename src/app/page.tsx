'use client';

import { useState, useTransition, useEffect, useRef, useCallback } from 'react';
import Hero from '@/components/birthday/Hero';
import SurpriseAhead from '@/components/birthday/SurpriseAhead';
import BlowTheCandle from '@/components/birthday/BlowTheCandle';
import ConfettiCanvas from '@/components/birthday/ConfettiCanvas';
import HeartfeltAffirmations from '@/components/birthday/HeartfeltAffirmations';

const MagicalBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-background to-purple-900/80">
      {/* Wavy Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 rounded-full animate-wave"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-gradient-to-bl from-accent/30 via-transparent to-primary/30 rounded-full animate-wave-reverse"></div>
      </div>
      {isClient && (
        <>
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
            <div
              key={`sparkle-${i}`}
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
            <div
              key={`bokeh-${i}`}
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
        </>
      )}
    </div>
  );
};


export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, startTransition] = useTransition();
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const sections = [
    { component: Hero, id: 'hero' },
    { component: SurpriseAhead, id: 'surprise' },
    { component: BlowTheCandle, id: 'candle' },
    { component: HeartfeltAffirmations, id: 'affirmations' },
  ];

  const handleNextSection = useCallback(() => {
    startTransition(() => {
      setDirection('down');
      setCurrentSection(prev => {
        if (prev < sections.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    });
  }, [sections.length]);

  const handlePrevSection = useCallback(() => {
    startTransition(() => {
      setDirection('up');
      setCurrentSection(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    });
  }, []);

  const handleBegin = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current?.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    handleNextSection();
  };
  
  const SECTION_INTERVAL = 5000;

  useEffect(() => {
    const currentSectionId = sections[currentSection].id;
    
    if (currentSectionId === 'surprise') {
      const timer = setTimeout(() => {
        handleNextSection();
      }, SECTION_INTERVAL);

      return () => clearTimeout(timer);
    }
    
    if (currentSection === sections.length - 1) {
      const timer = setTimeout(() => {
        audioRef.current?.pause();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, handleNextSection, sections]);
  
  const CurrentComponent = sections[currentSection].component;

  const props: any = {};
  if (sections[currentSection].id === 'hero') {
    props.onBegin = handleBegin;
  }
  if (sections[currentSection].id === 'candle') {
    props.onCandlesBlown = handleNextSection;
    props.onReset = handlePrevSection;
  }

  const animationClass = isTransitioning
    ? direction === 'down' ? 'animate-slide-out-up' : 'animate-slide-out-down'
    : 'animate-slide-in';


  return (
    <>
      <audio ref={audioRef} loop className="sr-only">
        <source src="https://raw.githubusercontent.com/abhinandanChoudhary/happy-birthday-afsheen-hehe-/main/aud.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <ConfettiCanvas />
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
        <MagicalBackground />
        <div className={`relative z-10 w-full h-dvh flex items-center justify-center ${animationClass}`}>
            <CurrentComponent {...props} />
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
