import { TrendingUpIcon, HashIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Separator } from './components/ui/separator';

interface RightSidebarProps {
  onNewConfession: () => void;
}

export function RightSidebar({ onNewConfession }: RightSidebarProps) {
  const trendingTags = [
    { tag: 'canteen', count: 234 },
    { tag: 'fest', count: 189 },
    { tag: 'placements', count: 156 },
    { tag: 'exams', count: 143 },
    { tag: 'friendship', count: 128 },
    { tag: 'college', count: 112 },
  ];

  const trendingConfessions = [
    { id: '1', preview: 'I secretly love the canteen food...', likes: 234 },
    { id: '2', preview: 'Does anyone else feel like they chose...', likes: 567 },
    { id: '3', preview: 'The notice board is literally my only...', likes: 445 },
  ];

  return (
    <aside className="hidden xl:block w-80 sticky top-24 h-fit space-y-6">
      <Card className="p-6 bg-gradient-2 text-tertiary-foreground border-0">
        <h3 className="font-headline font-semibold text-lg mb-3">Share Your Story</h3>
        <p className="text-sm mb-4 text-tertiary-foreground/90">
          Have something on your mind? Share it anonymously with the RAIT community.
        </p>
        <Button
          onClick={onNewConfession}
          className="w-full bg-white text-gray-900 hover:bg-white/90 font-normal"
        >
          Submit Your Confession
        </Button>
      </Card>

      <Card className="p-6 bg-card text-card-foreground border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUpIcon size={20} strokeWidth={2} className="text-primary" />
          <h3 className="font-headline font-semibold text-base text-gray-900">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingConfessions.map((confession) => (
            <div
              key={confession.id}
              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">{confession.preview}</p>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Heart size={14} strokeWidth={2} className="text-tertiary" />
                <span>{confession.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card text-card-foreground border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <HashIcon size={20} strokeWidth={2} className="text-primary" />
          <h3 className="font-headline font-semibold text-base text-gray-900">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((item) => (
            <button
              key={item.tag}
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-label"
            >
              #{item.tag} <span className="text-xs text-gray-600">({item.count})</span>
            </button>
          ))}
        </div>
      </Card>
    </aside>
  );
}

function Heart({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
