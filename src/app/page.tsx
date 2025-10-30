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
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 via-purple-900 to-slate-900">
        
        <div className={`w-full h-dvh flex items-center justify-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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
