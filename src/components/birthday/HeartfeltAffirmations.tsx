'use client';

import { useState } from 'react';
import { useAIFlow } from '@genkit-ai/next/client';
import { generateHeartfeltAffirmations } from '@/ai/flows/generate-heartfelt-affirmations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, HeartHandshake } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function HeartfeltAffirmations() {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const { run, running } = useAIFlow(generateHeartfeltAffirmations);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (running) return;
    setAffirmations([]);
    try {
      const affirmationsPromises = Array(3)
        .fill(0)
        .map(() =>
          run({
            name: 'Afsheen',
            age: 17,
            senderCrush: 'The sender of this card has a crush on her.',
          })
        );
      const results = await Promise.all(affirmationsPromises);
      const newAffirmations = results
        .map(r => r?.affirmation)
        .filter(Boolean) as string[];
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
  };

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        Your Daily Dose of Sparkle
      </h2>
      <div className="max-w-2xl mx-auto">
        {affirmations.length > 0 ? (
          <Carousel className="w-full">
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
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
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
