'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, PartyPopper, Cake } from 'lucide-react';

const Candle = ({ lit, onClick }: { lit: boolean; onClick: () => void }) => (
  <div
    className="relative w-8 h-32 bg-rose-200 rounded-t-sm mx-auto cursor-pointer group"
    onClick={onClick}
  >
    {/* Stripes */}
    <div className="absolute top-4 left-0 w-full h-2 bg-rose-300"></div>
    <div className="absolute top-10 left-0 w-full h-2 bg-rose-300"></div>
    <div className="absolute top-16 left-0 w-full h-2 bg-rose-300"></div>
    <div className="absolute top-22 left-0 w-full h-2 bg-rose-300"></div>

    {/* Wick */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-600"></div>

    {/* Flame */}
    {lit && (
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-12">
        <div className="w-full h-full bg-amber-400 rounded-t-full rounded-b-full blur-sm animate-flicker"></div>
      </div>
    )}

    {/* Smoke */}
    {!lit && (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-400 opacity-0 animate-smoke-up"></div>
    )}
  </div>
);

export default function BlowTheCandle() {
  const [isLit, setIsLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowOut = () => {
    if (isLit) {
      setIsLit(false);
      setWishMade(true);
    }
  };

  const handleReset = () => {
    setIsLit(true);
    setWishMade(false);
  };

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        Make a Wish!
      </h2>
      <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-8 pt-10 flex flex-col items-center justify-center">
          {wishMade ? (
            <div className="text-center">
              <PartyPopper className="w-16 h-16 mx-auto text-accent mb-4" />
              <p className="text-2xl font-body mb-6 text-accent-foreground">
                Your wish has been made!
              </p>
              <Button onClick={handleReset} variant="outline" size="lg">
                <Cake className="mr-2" />
                Light Another
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-8 text-center font-body">
                Click the button and make your birthday wish!
              </p>
              <Candle lit={isLit} onClick={handleBlowOut} />
              <div className="h-4"></div>
              <Button onClick={handleBlowOut} disabled={!isLit} size="lg">
                <Wind className="mr-2" />
                Blow out the candle
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
