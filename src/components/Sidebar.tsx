import { FileTextIcon, TrendingUpIcon, HeartIcon, PenSquareIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { useConfessionStore } from './stores/confessionStore';

interface SidebarProps {
  onNewConfession: () => void;
}

export function Sidebar({ onNewConfession }: SidebarProps) {
  const { filter, setFilter } = useConfessionStore();

  const handleNavClick = (newFilter: 'home' | 'trending' | 'most-liked') => {
    setFilter(newFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="hidden lg:block w-64 sticky top-24 h-fit">
      <Card className="p-6 bg-card text-card-foreground border border-gray-200">
        <nav className="space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-label transition-colors ${
              filter === 'home'
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileTextIcon size={20} strokeWidth={2} />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleNavClick('trending')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-label transition-colors ${
              filter === 'trending'
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <TrendingUpIcon size={20} strokeWidth={2} />
            <span>Trending</span>
          </button>
          <button
            onClick={() => handleNavClick('most-liked')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-label transition-colors ${
              filter === 'most-liked'
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HeartIcon size={20} strokeWidth={2} />
            <span>Most Liked</span>
          </button>
          <Button
            onClick={onNewConfession}
            className="w-full mt-4 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 font-normal"
          >
            <PenSquareIcon size={20} strokeWidth={2} className="mr-2" />
            Submit Confession
          </Button>
        </nav>

        <Separator className="my-6 bg-gray-200" />

        <div className="space-y-3">
          <h3 className="font-headline font-semibold text-sm text-gray-900">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            RAIT Confession is an anonymous platform for students to share their thoughts, experiences, and feelings freely.
          </p>
          <div className="pt-2">
            <h4 className="font-label font-medium text-sm text-gray-900 mb-2">Guidelines</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Be respectful and kind</li>
              <li>• No hate speech or bullying</li>
              <li>• Keep it college-related</li>
              <li>• Report inappropriate content</li>
            </ul>
          </div>
        </div>
      </Card>
    </aside>
  );
}
