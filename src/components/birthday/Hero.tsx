import Balloon from './Balloon';

export default function Hero() {
  return (
    <section className="relative text-center py-20 md:py-32 overflow-hidden min-h-[50vh] w-full">
      {/* Foreground content */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Afsheen's Enchanted B-Day
        </h1>
        <p className="mt-4 font-body text-xl md:text-2xl text-muted-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Happy 17th Birthday!
        </p>
      </div>
      {/* Balloons */}
      <Balloon
        color="hsl(var(--primary))"
        className="bottom-[5%] left-[5%] w-32 h-auto opacity-80"
        style={{ animationDelay: '0s' }}
      />
      <Balloon
        color="hsl(var(--secondary))"
        className="bottom-[10%] right-[5%] w-40 h-auto opacity-70"
        style={{ animationDelay: '2s' }}
      />
      <Balloon
        color="hsl(var(--accent))"
        className="bottom-[2%] right-[25%] w-28 h-auto opacity-90"
        style={{ animationDelay: '4s' }}
      />
    </section>
  );
}
