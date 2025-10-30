'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import Balloon from './Balloon';
import BirthdayCard from './BirthdayCard';
import { cn } from '@/lib/utils';

const Candle = ({
  lit,
  onClick,
  number,
}: {
  lit: boolean;
  onClick: () => void;
  number: number;
}) => (
  <div
    className="relative w-2 h-10 bg-rose-200 rounded-t-sm mx-auto cursor-pointer group flex items-center justify-center"
    onClick={onClick}
  >
    <span className="text-pink-600 font-bold text-xs scale-50">{number}</span>
    {/* Wick */}
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-600"></div>

    {/* Flame */}
    {lit && (
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-7">
        <div className="w-full h-full bg-amber-400 rounded-t-full rounded-b-full blur-sm animate-flicker scale-75"></div>
      </div>
    )}

    {/* Smoke */}
    {!lit && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-400 opacity-0 animate-smoke-up"></div>
    )}
  </div>
);

const Cake = () => (
  <div className="relative w-full max-w-xs h-24 bg-pink-200 rounded-lg shadow-md flex items-center justify-center">
    <div className="absolute -bottom-4 w-full h-8 bg-pink-300 rounded-b-lg"></div>
    <div className="absolute top-1/2 left-0 w-full h-4 bg-pink-100/50 -translate-y-1/2"></div>
     <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xl font-headline text-pink-600 drop-shadow-sm">Afsheen 🎊🎉</span>
    </div>
  </div>
);

export default function BlowTheCandle({ onCandlesBlown }: { onCandlesBlown: () => void }) {
  const [candles, setCandles] = useState(Array(17).fill(true));
  const [wishMade, setWishMade] = useState(false);

  const allCandlesOut = useMemo(() => !candles.some(lit => lit), [candles]);

  const triggerConfettiBurst = () => {
    window.dispatchEvent(
      new CustomEvent('confetti-burst', {
        detail: {
          bursts: [
            { x: window.innerWidth * 0.25, y: window.innerHeight * 0.2 },
            { x: window.innerWidth * 0.75, y: window.innerHeight * 0.2 },
            { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          ],
        },
      })
    );
  };


  useEffect(() => {
    if (allCandlesOut && !wishMade) {
      triggerConfettiBurst();
      const timer = setTimeout(() => {
        setWishMade(true);
        // Delay calling the next section to allow card to flip
        setTimeout(onCandlesBlown, 3000); 
      }, 500); // Short delay for flip
      return () => clearTimeout(timer);
    }
  }, [allCandlesOut, wishMade, onCandlesBlown]);

  const handleBlowOut = () => {
    setCandles(Array(17).fill(false));
  };


  const handleReset = () => {
    setWishMade(false);
    // Add a small delay to allow the card to flip back before re-lighting
    setTimeout(() => {
      setCandles(Array(17).fill(true));
    }, 800);
  };

  const toggleCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = !newCandles[index];
    setCandles(newCandles);
  };

  return (
    <section className="w-full px-4 relative flex flex-col items-center justify-center">
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
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-4 sm:mb-8">
        Make a Wish!
      </h2>
      <div className="max-w-3xl w-full mx-auto perspective-1000">
        <div className={cn("relative w-full h-[500px] sm:h-auto transition-transform duration-1000 transform-style-3d", wishMade && "rotate-y-180")}>
            {/* Front of the card - The Cake */}
            <div className="absolute w-full h-full backface-hidden">
                <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex flex-col justify-center h-full">
                    <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-around h-full">
                        <p className="text-muted-foreground mt-2 text-center font-body">
                            Click the candles or the button to make your birthday wish!
                        </p>
                        <div className="relative my-2 sm:my-4">
                            <div className="relative flex items-end justify-center gap-0.5 w-full max-w-xs px-1 mb-2 scale-75">
                                {candles.map((lit, index) => (
                                <Candle
                                    key={index}
                                    lit={lit}
                                    onClick={() => toggleCandle(index)}
                                    number={index + 1}
                                />
                                ))}
                            </div>
                            <Cake />
                        </div>
                        <Button onClick={handleBlowOut} disabled={allCandlesOut} size="lg">
                            <Wind className="mr-2" />
                            Blow out all candles
                        </Button>
                    </CardContent>
                </Card>
            </div>
            
            {/* Back of the card - The Birthday Card */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
                 <BirthdayCard onReset={handleReset} />
            </div>
        </div>
      </div>
    </section>
  );
}