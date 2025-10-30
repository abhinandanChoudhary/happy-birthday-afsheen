'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Balloon from './Balloon';

const LEAF_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  '#E6E6FA', // Lavender
  '#D8BFD8', // Thistle
];

const LEAVES_CONFIG = [
  // Crown
  { size: 24, top: '8%', left: '48%' },
  { size: 28, top: '15%', left: '35%' },
  { size: 32, top: '12%', left: '60%' },
  { size: 20, top: '25%', left: '28%' },
  { size: 30, top: '22%', left: '50%' },
  { size: 26, top: '28%', left: '70%' },
  { size: 28, top: '35%', left: '38%' },
  { size: 22, top: '40%', left: '60%' },
  { size: 30, top: '45%', left: '25%' },
  { size: 25, top: '50%', left: '75%' },
  { size: 28, top: '55%', left: '50%' },
  { size: 24, top: '60%', left: '35%' },
  { size: 29, top: '30%', left: '15%' },
  { size: 26, top: '48%', left: '85%' },
  { size: 31, top: '5%', left: '20%' },
];

const Leaf = ({
  color,
  size,
  top,
  left,
  animationDelay,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  animationDelay: string;
}) => (
  <div
    className="absolute rounded-full animate-bloom opacity-0"
    style={{
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      transform: 'translate(-50%, -50%)',
      animationDelay,
    }}
  ></div>
);

const Tree = ({ isGrown }: { isGrown: boolean }) => (
  <div className="relative w-48 h-64 md:w-64 md:h-80 mx-auto">
    {/* Trunk */}
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-10 h-2/5 bg-amber-900 rounded-t-md ${
        isGrown ? 'animate-grow-trunk' : 'scale-y-0'
      }`}
    ></div>
    {/* Branches */}
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-16 bg-amber-800 transform -rotate-45 origin-bottom-left rounded-md ${
        isGrown ? 'animate-grow-branch' : 'scale-0'
      }`}
      style={{ animationDelay: '1s' }}
    ></div>
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-16 bg-amber-800 transform rotate-45 origin-bottom-right rounded-md ${
        isGrown ? 'animate-grow-branch' : 'scale-0'
      }`}
      style={{ animationDelay: '1.2s' }}
    ></div>
    <div
      className={`absolute top-[30%] left-[55%] w-1.5 h-12 bg-amber-800 transform rotate-20 origin-bottom-right rounded-md ${
        isGrown ? 'animate-grow-branch' : 'scale-0'
      }`}
      style={{ animationDelay: '1.4s' }}
    ></div>
    <div
      className={`absolute top-[35%] left-[45%] w-1.5 h-12 bg-amber-800 transform -rotate-20 origin-bottom-left rounded-md ${
        isGrown ? 'animate-grow-branch' : 'scale-0'
      }`}
      style={{ animationDelay: '1.6s' }}
    ></div>
  </div>
);

const Seed = () => (
  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
    <div className="w-4 h-4 bg-secondary rounded-full animate-seed-pulse"></div>
  </div>
);

export default function WishingTree() {
  const [isMounted, setIsMounted] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);
  const [isGrown, setIsGrown] = useState(false);
  const [showLeaves, setShowLeaves] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 100);
    // Sequence: Seed -> Grow -> Grown -> Leaves
    const growTimer = setTimeout(() => setIsGrowing(true), 2000);
    const grownTimer = setTimeout(() => setIsGrown(true), 2100);
    const leavesTimer = setTimeout(() => setShowLeaves(true), 3500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(growTimer);
      clearTimeout(grownTimer);
      clearTimeout(leavesTimer);
    };
  }, []);

  return (
    <section className="w-full px-4 relative">
      <Balloon
        color="hsl(var(--secondary) / 0.6)"
        className="bottom-[20%] -left-[10%] w-36 h-auto"
        style={{ animationDelay: '1.5s' }}
      />
      <Balloon
        color="hsl(var(--primary) / 0.7)"
        className="top-[15%] -right-[8%] w-28 h-auto"
        style={{ animationDelay: '3.5s' }}
      />
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-4">
        A Tree of Wishes
      </h2>
      <p className="text-center text-muted-foreground mb-8 font-body">
        Each leaf a hope, a dream, a wish just for you.
      </p>
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4 sm:p-8 pt-10 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            {!isGrowing && isMounted && <Seed />}
            {isGrowing && <Tree isGrown={isGrown} />}
            <div className="absolute inset-0">
              {showLeaves &&
                LEAVES_CONFIG.map((leaf, index) => (
                  <Leaf
                    key={index}
                    color={LEAF_COLORS[index % LEAF_COLORS.length]}
                    size={leaf.size}
                    top={leaf.top}
                    left={leaf.left}
                    animationDelay={`${index * 100}ms`}
                  />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
