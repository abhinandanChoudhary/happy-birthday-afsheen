'use client';

import { useState, useTransition, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { getHeartfeltAffirmations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, HeartHandshake } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Balloon from './Balloon';

export default function HeartfeltAffirmations() {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const handleGenerate = async () => {
    if (isPending) return;
    setAffirmations([]);

    startTransition(async () => {
      try {
        const newAffirmations = await getHeartfeltAffirmations();
        if (newAffirmations.length > 0) {
          setAffirmations(newAffirmations);
        } else {
          throw new Error('No affirmations generated.');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: "Oops! Couldn't find the right words.",
          description:
            'There was a problem generating affirmations. Please try again.',
        });
      }
    });
  };

  const running = isPending;

  return (
    <section className="relative w-full px-4">
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
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        Your Daily Dose of Sparkle
      </h2>
      <div className="max-w-2xl mx-auto">
        {affirmations.length > 0 ? (
          <Carousel 
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {affirmations.map((affirmation, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-64 md:h-72">
                      <HeartHandshake className="w-12 h-12 mb-4 text-primary" />
                      <p className="text-xl font-body">{affirmation}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <p className="text-muted-foreground mb-6 font-body">
                Want some kind words and thoughtful sentiments?
              </p>
              <Button onClick={handleGenerate} disabled={running} size="lg">
                {running ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding inspiration...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Affirmations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
