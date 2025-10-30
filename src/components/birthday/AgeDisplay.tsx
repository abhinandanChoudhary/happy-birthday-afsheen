'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface Age {
  years: number;
  months: number;
  days: number;
}

interface Countdown {
  days: number;
}

export default function AgeDisplay({ dob }: { dob: string }) {
  const [age, setAge] = useState<Age | null>(null);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const birthDate = new Date(dob);

    const calculateAgeAndCountdown = () => {
      const now = new Date();

      // Age calculation
      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setAge({ years, months, days });

      // Countdown calculation
      let nextBirthday = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );
      if (nextBirthday < now && nextBirthday.getDate() !== now.getDate()) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }
      if (nextBirthday.getTime() === now.getTime()) {
        setCountdown({ days: 0 });
        return;
      }
      
      const diffTime = nextBirthday.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCountdown({ days: diffDays });
    };

    calculateAgeAndCountdown();
    const interval = setInterval(calculateAgeAndCountdown, 1000 * 60);

    return () => clearInterval(interval);
  }, [dob]);

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-center mb-8">
        A Journey Through Time
      </h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 font-headline text-2xl">
              <Clock />
              Your Amazing Age
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {age ? (
              <p className="text-2xl font-body">
                {age.years} years, {age.months} months, & {age.days} days of being awesome!
              </p>
            ) : (
              <p className="text-2xl font-body animate-pulse">Calculating...</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 font-headline text-2xl">
              <Calendar />
              Next Celebration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {countdown ? (
              <p className="text-2xl font-body">
                {countdown.days === 0 || countdown.days > 365
                  ? 'Happy Birthday!'
                  : `${countdown.days} day${
                      countdown.days !== 1 ? 's' : ''
                    } until your next birthday!`}
              </p>
            ) : (
              <p className="text-2xl font-body animate-pulse">Calculating...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
