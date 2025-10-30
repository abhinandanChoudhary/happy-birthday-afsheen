import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PartyPopper } from 'lucide-react';

const timelineData = [
  {
    year: 'Nov 10, 2008',
    title: 'A Star is Born!',
    description: 'The world became a brighter place.',
    imageId: 'timeline-1',
    icon: <PartyPopper />,
  },
  {
    year: '2013',
    title: 'First Day of Adventures',
    description: 'Stepping into school and the start of many friendships.',
    imageId: 'timeline-2',
    icon: <PartyPopper />,
  },
  {
    year: '2018',
    title: 'Finding Her Rhythm',
    description:
      'Discovering passions and talents that make you uniquely you.',
    imageId: 'timeline-3',
    icon: <PartyPopper />,
  },
  {
    year: '2024',
    title: 'Sweet Sixteen & Fabulous',
    description: 'A milestone year filled with joy and celebration.',
    imageId: 'timeline-4',
    icon: <PartyPopper />,
  },
  {
    year: '2025',
    title: 'The Big 1-7!',
    description: "Here's to new chapters, dreams, and adventures waiting for you.",
    imageId: 'timeline-5',
    icon: <PartyPopper />,
  },
];

export default function InteractiveTimeline() {
  const images = PlaceHolderImages;

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-12">
        A Story in the Making
      </h2>
      <div className="relative wrap overflow-hidden p-10 py-10">
        <div
          className="absolute left-1/2 -ml-[1px] h-full border-2 border-dashed border-accent"
          style={{ height: 'calc(100% - 8rem)' }}
        ></div>
        {timelineData.map((item, index) => {
          const image = images.find(img => img.id === item.imageId);
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={cn(
                'mb-8 flex w-full items-center',
                isEven ? 'justify-start' : 'flex-row-reverse justify-start'
              )}
            >
              <div className="w-1/2 px-4">
                <Card className="bg-card/80 backdrop-blur-sm shadow-lg transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{item.year}</p>
                  </CardHeader>
                  <CardContent>
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        width={600}
                        height={400}
                        className="mb-4 rounded-md"
                      />
                    )}
                    <p className="font-body">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-1/2 z-20 flex h-8 w-8 -ml-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
