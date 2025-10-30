import AgeDisplay from '@/components/birthday/AgeDisplay';
import ConfettiCanvas from '@/components/birthday/ConfettiCanvas';
import HeartfeltAffirmations from '@/components/birthday/HeartfeltAffirmations';
import Hero from '@/components/birthday/Hero';
import PersonalizedMessage from '@/components/birthday/PersonalizedMessage';

export default function Home() {
  return (
    <>
      <ConfettiCanvas />
      <div className="flex flex-col min-h-dvh animated-gradient">
        <main className="flex-1">
          <Hero />
          <div className="container mx-auto px-4 py-12 md:py-20 space-y-16 md:space-y-24">
            <AgeDisplay dob="2008-11-10" />
            <PersonalizedMessage />
            <HeartfeltAffirmations />
          </div>
        </main>
        <footer className="py-8 text-center text-sm text-muted-foreground bg-transparent">
          Made with ❤️ for Afsheen.
        </footer>
      </div>
    </>
  );
}
