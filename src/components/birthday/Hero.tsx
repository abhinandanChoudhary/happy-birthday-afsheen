import { Cake, Gift, Heart, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-center py-20 md:py-32 bg-secondary overflow-hidden">
      <div className="absolute top-10 left-10 text-primary/30 animate-pulse">
        <Heart size={48} className="-rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-primary/30 animate-pulse delay-500">
        <Star size={48} className="rotate-12" />
      </div>
      <div className="absolute top-1/4 right-1/4 text-accent/50 animate-spin-slow">
        <Gift size={32} />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-accent/50 animate-spin-slow [animation-direction:reverse]">
        <Cake size={32} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground tracking-tight">
          Afsheen's Enchanted B-Day
        </h1>
        <p className="mt-4 font-body text-xl md:text-2xl text-muted-foreground">
          Happy 17th Birthday!
        </p>
      </div>
    </section>
  );
}
