import { create } from 'zustand';

export interface Confession {
  id: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  reactions: {
    heart: number;
    laugh: number;
    sad: number;
  };
}

export interface Comment {
  id: string;
  confessionId: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface ConfessionState {
  confessions: Confession[];
  comments: Record<string, Comment[]>;
  filter: 'home' | 'trending' | 'most-liked';
  addConfession: (confession: Omit<Confession, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'reactions'>) => void;
  likeConfession: (id: string) => void;
  addReaction: (id: string, type: 'heart' | 'laugh' | 'sad') => void;
  addComment: (confessionId: string, content: string) => void;
  setFilter: (filter: 'home' | 'trending' | 'most-liked') => void;
  getFilteredConfessions: () => Confession[];
}

const mockConfessions: Confession[] = [];

export const useConfessionStore = create<ConfessionState>((set, get) => ({
  confessions: mockConfessions,
  comments: {},
  filter: 'home',
  
  addConfession: (confession) => {
    const newConfession: Confession = {
      ...confession,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      reactions: { heart: 0, laugh: 0, sad: 0 },
    };
    set((state) => ({
      confessions: [newConfession, ...state.confessions],
    }));
  },
  
  likeConfession: (id) => {
    set((state) => ({
      confessions: state.confessions.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      ),
    }));
  },
  
  addReaction: (id, type) => {
    set((state) => ({
      confessions: state.confessions.map((c) =>
        c.id === id
          ? { ...c, reactions: { ...c.reactions, [type]: c.reactions[type] + 1 } }
          : c
      ),
    }));
  },
  
  addComment: (confessionId, content) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      confessionId,
      content,
      timestamp: new Date(),
      likes: 0,
    };
    set((state) => ({
      comments: {
        ...state.comments,
        [confessionId]: [...(state.comments[confessionId] || []), newComment],
      },
      confessions: state.confessions.map((c) =>
        c.id === confessionId ? { ...c, comments: c.comments + 1 } : c
      ),
    }));
  },
  
  setFilter: (filter) => set({ filter }),
  
  getFilteredConfessions: () => {
    const { confessions, filter } = get();
    switch (filter) {
      case 'trending':
        return [...confessions].sort((a, b) => 
          (b.likes + b.comments * 2 + b.shares * 3) - (a.likes + a.comments * 2 + a.shares * 3)
        );
      case 'most-liked':
        return [...confessions].sort((a, b) => b.likes - a.likes);
      default:
        return confessions;
    }
  },
}));
