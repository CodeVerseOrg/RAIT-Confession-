import { PenSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg lg:hidden bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 z-40 font-normal"
      size="icon"
    >
      <PenSquareIcon size={24} strokeWidth={2} />
    </Button>
  );
}
