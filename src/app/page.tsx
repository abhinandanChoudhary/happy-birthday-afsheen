'use client';

import { useState, useTransition, useEffect } from 'react';
import AgeDisplay from '@/components/birthday/AgeDisplay';
import BlowTheCandle from '@/components/birthday/BlowTheCandle';
import ConfettiCanvas from '@/components/birthday/ConfettiCanvas';
import HeartfeltAffirmations from '@/components/birthday/HeartfeltAffirmations';
import Hero from '@/components/birthday/Hero';
import PersonalizedMessage from '@/components/birthday/PersonalizedMessage';

const sections = [
  { component: <Hero />, id: 'hero' },
  { component: <AgeDisplay dob="2008-11-10" />, id: 'age' },
  { component: <PersonalizedMessage />, id: 'message' },
  { component: <BlowTheCandle />, id: 'candle' },
  { component: <HeartfeltAffirmations />, id: 'affirmations' },
];

const SECTION_INTERVAL = 7000; // 7 seconds

const MagicalBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-background to-purple-900/80">
    {/* Wavy Shapes */}
    <div className="absolute top-0 left-0 w-full h-full opacity-30">
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 rounded-full animate-wave"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-gradient-to-bl from-accent/30 via-transparent to-primary/30 rounded-full animate-wave-reverse"></div>
    </div>
    {/* Sparkles */}
    {[...Array(30)].map((_, i) => (
        <div key={`sparkle-${i}`}
             className="absolute w-1 h-1 bg-secondary rounded-full animate-sparkle"
             style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
             }}
        />
    ))}
    {/* Bokeh */}
    {[...Array(15)].map((_, i) => (
        <div key={`bokeh-${i}`}
            className="absolute bg-primary/20 rounded-full animate-float"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
            }}
        />
    ))}
  </div>
);


export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, startTransition] = useTransition();

  useEffect(() => {
    // If it's not the last section, set a timer to go to the next one
    if (currentSection < sections.length - 1) {
      const timer = setTimeout(() => {
        startTransition(() => {
          setCurrentSection(prev => prev + 1);
        });
      }, SECTION_INTERVAL);

      // Clear the timer if the component unmounts or the section changes
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const CurrentComponent = sections[currentSection].component;

  return (
    <>
      <ConfettiCanvas />
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
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
