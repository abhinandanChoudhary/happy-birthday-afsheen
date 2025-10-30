'use client';

import { useState, useTransition } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AgeDisplay from '@/components/birthday/AgeDisplay';
import BlowTheCandle from '@/components/birthday/BlowTheCandle';
import ConfettiCanvas from '@/components/birthday/ConfettiCanvas';
import HeartfeltAffirmations from '@/components/birthday/HeartfeltAffirmations';
import Hero from '@/components/birthday/Hero';
import PersonalizedMessage from '@/components/birthday/PersonalizedMessage';
import { Button } from '@/components/ui/button';

const sections = [
  { component: <Hero />, id: 'hero' },
  { component: <AgeDisplay dob="2008-11-10" />, id: 'age' },
  { component: <PersonalizedMessage />, id: 'message' },
  { component: <BlowTheCandle />, id: 'candle' },
  { component: <HeartfeltAffirmations />, id: 'affirmations' },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, startTransition] = useTransition();

  const navigate = (direction: 'next' | 'prev') => {
    startTransition(() => {
      if (direction === 'next') {
        setCurrentSection(prev => (prev + 1) % sections.length);
      } else {
        setCurrentSection(prev => (prev - 1 + sections.length) % sections.length);
      }
    });
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <>
      <ConfettiCanvas />
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
        
        <div className={`w-full h-dvh flex items-center justify-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {CurrentComponent}
        </div>

        {currentSection > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/10 backdrop-blur-sm"
            aria-label="Previous Section"
          >
            <ArrowLeft />
          </Button>
        )}

        {currentSection < sections.length -1 && (
             <Button
             variant="outline"
             size="icon"
             onClick={() => navigate('next')}
             className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/10 backdrop-blur-sm"
             aria-label="Next Section"
           >
             <ArrowRight />
           </Button>
        )}
         {currentSection === sections.length - 1 && (
          <footer className="absolute bottom-8 text-center text-sm text-muted-foreground bg-transparent z-20">
            Made with ❤️ for Afsheen.
          </footer>
        )}
      </div>
    </>
  );
}
