'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);

  const colors = ['#E6E6FA', '#D8BFD8', '#ffc0cb', '#f0e68c', '#ffffff'];

  class Particle {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    angle: number;
    rotation: number;
    color: string;
    opacity: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.w = Math.random() * 10 + 5;
      this.h = Math.random() * 10 + 5;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = Math.random() * -5 - 2;
      this.angle = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * 0.1 - 0.05;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.1; // gravity
      this.angle += this.rotation;
      this.opacity -= 0.005;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    }
  }

  const createBurst = useCallback((x: number, y: number) => {
    for (let i = 0; i < 50; i++) {
      particles.current.push(new Particle(x, y));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.opacity > 0);

      particles.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const initialBurst = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBurst(Math.random() * canvas.width, -20);
        }, i * 200);
      }
    };
    
    initialBurst();
    animate();

    const handleClick = (e: MouseEvent) => {
      createBurst(e.clientX, e.clientY);
    };

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('click', handleClick);
    };
  }, [createBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}
