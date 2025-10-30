import Balloon from './Balloon';
import { Button } from '@/components/ui/button';
import BirthdayCountdown from './BirthdayCountdown';

export default function Hero({ onBegin }: { onBegin: () => void }) {
  // Set the target birthday date.
  // Note: Months are 0-indexed (0 = January, 10 = November, etc.)
  const birthDate = new Date(2008, 10, 10);

  return (
    <section className="relative text-center py-20 md:py-32 overflow-hidden min-h-[50vh] w-full flex flex-col items-center justify-center">
      {/* Foreground content */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-bubble text-5xl md:text-7xl font-bold text-foreground tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          HAPPY BIRTHDAY AFSHEEN
        </h1>
        <p className="mt-4 font-body text-lg text-secondary">
          Celebrating every moment of your amazing journey...
        </p>
        
        <BirthdayCountdown birthDate={birthDate} />

        <Button onClick={onBegin} size="lg" className="mt-8 animate-pulse">
          tap here to begin 🐼
        </Button>
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
