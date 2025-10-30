import { Moon, Star } from 'lucide-react';

const ShootingStar = () => (
  <div className="absolute top-1/2 left-0 w-0.5 h-64 bg-gradient-to-b from-transparent via-white to-transparent transform -rotate-45 animate-shooting-star" />
);

const Balloon = ({ className, color }: { className: string; color: string }) => (
  <div className={`absolute ${className}`}>
    <div
      className={`w-20 h-24 rounded-full ${color} relative animate-balloon-float flex items-center justify-center shadow-lg`}
    >
      <div className={`w-2 h-4 ${color} brightness-75 rounded-b-full absolute -bottom-2`}></div>
    </div>
    <div className="absolute bottom-[-96px] left-1/2 w-px h-24 bg-white/30 transform -translate-x-1/2"></div>
  </div>
);

export default function Hero() {
  return (
    <section className="relative text-center py-20 md:py-32 bg-gradient-to-b from-blue-900 via-purple-900 to-slate-900 overflow-hidden min-h-[50vh]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <Star className="absolute top-[10%] left-[10%] text-white/80 w-6 h-6 animate-twinkle" style={{ animationDelay: '0s' }} />
        <Star className="absolute top-[20%] left-[80%] text-white/80 w-4 h-4 animate-twinkle" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-[50%] left-[50%] text-white/80 w-5 h-5 animate-twinkle" style={{ animationDelay: '2s' }} />
        <Star className="absolute top-[70%] left-[20%] text-white/80 w-4 h-4 animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <Star className="absolute top-[85%] left-[90%] text-white/80 w-6 h-6 animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <Star className="absolute top-[40%] left-[30%] text-white/80 w-3 h-3 animate-twinkle" style={{ animationDelay: '2.5s' }} />
        <Moon className="absolute top-[15%] right-[15%] text-yellow-200/90 w-16 h-16 transform -rotate-45" />
        <ShootingStar />
      </div>

      {/* Balloons */}
      <Balloon className="top-[5%] left-[5%]" color="bg-pink-400/80" />
      <Balloon className="bottom-[10%] right-[10%]" color="bg-blue-400/80" />
      <Balloon className="bottom-[20%] left-[20%]" color="bg-purple-400/80" />
      <Balloon className="top-[10%] right-[30%]" color="bg-yellow-300/80" />

      {/* Foreground content */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Afsheen's Enchanted B-Day
        </h1>
        <p className="mt-4 font-body text-xl md:text-2xl text-muted-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Happy 17th Birthday!
        </p>
      </div>
    </section>
  );
}
