'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type BalloonProps = {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
};

export default function Balloon({
  className,
  color = 'hsl(var(--primary))',
  style,
}: BalloonProps) {
  return (
    <div
      className={cn('absolute animate-balloon-float z-0', className)}
      style={style}
    >
      <svg
        width="100"
        height="120"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <radialGradient
            id="balloon-gradient"
            cx="0.3"
            cy="0.3"
            r="0.7"
            fx="0.2"
            fy="0.2"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M50 0C10 0 0 35 0 60c0 30 50 60 50 60s50-30 50-60C100 35 90 0 50 0z"
          fill={color}
        />
        <path
          d="M50 0C10 0 0 35 0 60c0 30 50 60 50 60s50-30 50-60C100 35 90 0 50 0z"
          fill="url(#balloon-gradient)"
        />
        <path d="M47 118l3 2 3-2v-8h-6v8z" fill={color} />
      </svg>
    </div>
  );
}
