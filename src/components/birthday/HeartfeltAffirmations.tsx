'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Balloon from './Balloon';

const affirmations = [
  "Just a reminder: You are amazing. (That's it, that's the message) 💖",
  "Your smile is literally the brightest. Keep shining!",
  "You're one of the kindest and most caring people I know. 💌",
  "You're smart, funny, and going to do so many great things.",
  "I hope you're having the best 17th birthday ever! ✨",
  "You make the world a better place just by being in it. 🐼",
  "You're capable of anything you set your mind to. Go for it!",
  "Don't ever forget how wonderful you are. hehe 😉"
];

export default function HeartfeltAffirmations() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));

  return (
    <section className="relative w-full px-4 flex flex-col items-center justify-center">
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
        <Balloon
        color="hsl(var(--secondary) / 0.6)"
        className="bottom-[5%] -left-[2%] w-36 h-auto"
        style={{ animationDelay: '1.5s' }}
      />
      <Balloon
        color="hsl(var(--primary) / 0.5)"
        className="bottom-[15%] -right-[5%] w-28 h-auto"
        style={{ animationDelay: '3.5s' }}
      />
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        The list of all your happy thoughts
      </h2>
      <div className="max-w-2xl w-full mx-auto">
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
      </div>
    </section>
  );
}
