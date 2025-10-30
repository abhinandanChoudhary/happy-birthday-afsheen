'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const images = PlaceHolderImages.slice(0, 5); // Use first 5 images for the grid

export default function PhotoMemories() {
  const imagePositions = [
    'row-start-1 col-start-2',
    'row-start-2 col-start-4',
    'row-start-3 col-start-1',
    'row-start-4 col-start-3',
    'row-start-5 col-start-5',
  ];

  return (
    <section className="relative h-[600px] overflow-hidden">
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-12 absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full">
        Floating Through Memories
      </h2>
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-4 -z-1">
        {images.map((image, index) => (
          <Card
            key={image.id}
            className={cn(
              'overflow-hidden shadow-xl animate-float',
              imagePositions[index % imagePositions.length]
            )}
            style={{ animationDelay: `${index * 1.5}s` }}
          >
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
