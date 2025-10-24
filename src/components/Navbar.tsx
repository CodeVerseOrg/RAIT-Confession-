import { useState } from 'react';
import { BellIcon, SearchIcon, MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { useConfessionStore } from './stores/confessionStore';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { filter, setFilter } = useConfessionStore();

  const handleNavClick = (newFilter: 'home' | 'trending' | 'most-liked') => {
    setFilter(newFilter);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-1 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <h1 className="text-xl md:text-2xl font-headline font-bold text-primary-foreground">
              RAIT Confession
            </h1>
            
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => handleNavClick('home')}
                      className={`px-4 py-2 text-base font-label cursor-pointer transition-colors ${
                        filter === 'home'
                          ? 'text-primary-foreground font-semibold'
                          : 'text-primary-foreground/80 hover:text-primary-foreground'
                      }`}
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => handleNavClick('trending')}
                      className={`px-4 py-2 text-base font-label cursor-pointer transition-colors ${
                        filter === 'trending'
                          ? 'text-primary-foreground font-semibold'
                          : 'text-primary-foreground/80 hover:text-primary-foreground'
                      }`}
                    >
                      Trending
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => handleNavClick('most-liked')}
                      className={`px-4 py-2 text-base font-label cursor-pointer transition-colors ${
                        filter === 'most-liked'
                          ? 'text-primary-foreground font-semibold'
                          : 'text-primary-foreground/80 hover:text-primary-foreground'
                      }`}
                    >
                      Most Liked
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} strokeWidth={2} />
              <Input
                type="search"
                placeholder="SearchIcon confessions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  <BellIcon size={24} strokeWidth={2} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card text-card-foreground">
                <div className="p-4">
                  <h3 className="font-headline font-semibold text-lg mb-3 text-gray-900">Notifications</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-700">
                      <p className="font-medium text-gray-900">New reaction on your confession</p>
                      <p className="text-gray-600">Someone reacted with ❤️ to your post</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium text-gray-900">Trending confession</p>
                      <p className="text-gray-600">Your confession is now trending!</p>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Avatar className="hidden md:flex h-10 w-10 cursor-pointer border-2 border-white/30">
              <AvatarFallback className="bg-tertiary text-tertiary-foreground font-label">AN</AvatarFallback>
            </Avatar>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon size={24} strokeWidth={2} /> : <MenuIcon size={24} strokeWidth={2} />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} strokeWidth={2} />
              <Input
                type="search"
                placeholder="SearchIcon confessions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-label transition-colors ${
                filter === 'home'
                  ? 'bg-white/20 text-primary-foreground font-semibold'
                  : 'text-primary-foreground/80 hover:bg-white/10'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('trending')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-label transition-colors ${
                filter === 'trending'
                  ? 'bg-white/20 text-primary-foreground font-semibold'
                  : 'text-primary-foreground/80 hover:bg-white/10'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => handleNavClick('most-liked')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-label transition-colors ${
                filter === 'most-liked'
                  ? 'bg-white/20 text-primary-foreground font-semibold'
                  : 'text-primary-foreground/80 hover:bg-white/10'
              }`}
            >
              Most Liked
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
