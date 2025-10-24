import { useEffect, useRef } from 'react';
import { Card } from './components/ui/card';
import gsap from 'gsap';

export function FeedLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={loaderRef} className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 bg-card text-card-foreground border border-gray-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
  );
}
