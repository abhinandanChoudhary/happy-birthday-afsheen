'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, PartyPopper, Cake as CakeIcon } from 'lucide-react';

const Candle = ({ lit, onClick }: { lit: boolean; onClick: () => void }) => (
  <div
    className="relative w-4 h-16 bg-rose-200 rounded-t-sm mx-auto cursor-pointer group"
    onClick={onClick}
  >
    {/* Wick */}
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-600"></div>

    {/* Flame */}
    {lit && (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-8">
        <div className="w-full h-full bg-amber-400 rounded-t-full rounded-b-full blur-sm animate-flicker scale-75"></div>
      </div>
    )}

    {/* Smoke */}
    {!lit && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-400 opacity-0 animate-smoke-up"></div>
    )}
  </div>
);

const BirthdayCake = () => (
    <div className="relative w-72 h-24 bg-pink-200 rounded-lg shadow-md mt-10">
        <div className="absolute -bottom-4 w-full h-8 bg-pink-300 rounded-b-lg"></div>
        <div className="absolute top-1/2 left-0 w-full h-4 bg-pink-100/50 -translate-y-1/2"></div>
    </div>
)


export default function BlowTheCandle() {
  const [candles, setCandles] = useState(Array(17).fill(true));
  const [wishMade, setWishMade] = useState(false);

  const allCandlesOut = useMemo(() => !candles.some(lit => lit), [candles]);

  const handleBlowOut = () => {
    setCandles(Array(17).fill(false));
    setTimeout(() => setWishMade(true), 1000); // Wait for smoke animation
  };

  const handleReset = () => {
    setCandles(Array(17).fill(true));
    setWishMade(false);
  };

  const toggleCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = !newCandles[index];
    setCandles(newCandles);
    if(newCandles.every(c => !c)) {
        setTimeout(() => setWishMade(true), 1000);
    }
  }

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        Make a Wish!
      </h2>
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-8 pt-10 flex flex-col items-center justify-center">
          {wishMade ? (
            <div className="text-center">
              <PartyPopper className="w-16 h-16 mx-auto text-accent mb-4" />
              <p className="text-2xl font-body mb-6 text-accent-foreground">
                Your wish has been made!
              </p>
              <Button onClick={handleReset} variant="outline" size="lg">
                <CakeIcon className="mr-2" />
                Light Another
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-4 text-center font-body">
                Click the button and make your birthday wish!
              </p>
              <div className="relative mb-8">
                  <BirthdayCake />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-end justify-center gap-1 w-64">
                      {candles.map((lit, index) => (
                        <Candle key={index} lit={lit} onClick={() => toggleCandle(index)} />
                      ))}
                  </div>
              </div>
              <Button onClick={handleBlowOut} disabled={allCandlesOut} size="lg">
                <Wind className="mr-2" />
                Blow out the candles
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
