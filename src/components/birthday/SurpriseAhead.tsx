'use client';

import { Key } from 'lucide-react';
import Balloon from './Balloon';

const Curtain = ({ side }: { side: 'left' | 'right' }) => (
  <div
    className={`absolute inset-y-0 w-1/2 bg-card/80 backdrop-blur-sm shadow-2xl transition-all duration-1000 ease-in-out transform-gpu
      group-hover:w-[48%]
      ${
        side === 'left'
          ? 'left-0 origin-left'
          : 'right-0 origin-right'
      }`}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
  </div>
);


export default function SurpriseAhead() {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden group">
      <Balloon
        color="hsl(var(--primary) / 0.7)"
        className="top-[5%] left-[2%] w-24 h-auto"
        style={{ animationDelay: '1s' }}
      />
      <Balloon
        color="hsl(var(--accent) / 0.8)"
        className="top-[10%] right-[5%] w-32 h-auto"
        style={{ animationDelay: '3s' }}
      />

      {/* The two curtains */}
      <Curtain side="left" />
      <Curtain side="right" />

      {/* The glowing crack between curtains */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 h-full bg-primary/50 blur-2xl transition-all duration-1000 ease-in-out transform-gpu group-hover:w-12 group-hover:bg-primary/70 animate-pulse"></div>

      {/* Content in the middle */}
      <div className="relative z-10 text-center p-8 flex flex-col items-center">
        <Key className="w-16 h-16 md:w-24 md:h-24 text-secondary mb-6 animate-pulse" />
        <h2 className="font-headline text-4xl md:text-6xl text-foreground drop-shadow-lg">
          Surprise Ahead...
        </h2>
        <p className="mt-4 font-body text-lg text-muted-foreground">
          Something magical is waiting.
        </p>
      </div>
    </section>
  );
}
