'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Gift, Heart } from 'lucide-react';

export default function BirthdayCard({ onReset, onContinue }: { onReset: () => void, onContinue: () => void }) {
  return (
    <Card className="bg-card/90 backdrop-blur-md shadow-lg w-full h-full flex flex-col">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
          <Gift className="text-primary" />
          A Wish for You
          <Heart className="text-accent" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4 sm:p-6">
        <p className="text-muted-foreground text-center mb-4 font-body">
          Pen down your heartfelt wishes for Afsheen...
        </p>
        <Textarea
          placeholder="Write your birthday message here..."
          className="flex-grow resize-none bg-background/50 border-border text-lg font-body"
        />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
            <p className="font-body text-muted-foreground">From: A secret admirer ❤️</p>
            <div className="flex gap-2">
              <Button onClick={onReset} variant="outline" size="lg">
                  Start Over
              </Button>
              <Button onClick={onContinue} size="lg">
                  Continue here
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
