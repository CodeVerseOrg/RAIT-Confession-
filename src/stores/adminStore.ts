import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'moderator';
}

export interface PostReport {
  id: string;
  confessionId: string;
  reason: string;
  reportedAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface PostMetadata {
  confessionId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

interface AdminState {
  isAuthenticated: boolean;
  currentAdmin: AdminUser | null;
  reports: PostReport[];
  postMetadata: Record<string, PostMetadata>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addReport: (confessionId: string, reason: string) => void;
  updateReportStatus: (reportId: string, status: 'pending' | 'reviewed' | 'resolved') => void;
  getPostMetadata: (confessionId: string) => PostMetadata | undefined;
  trackPost: (confessionId: string, ipAddress: string, userAgent: string) => void;
}

const mockAdminCredentials = {
  username: 'SmitroniX',
  password: '#Aax49634',
};

const mockReports: PostReport[] = [
  {
    id: '1',
    confessionId: '2',
    reason: 'Inappropriate content',
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    confessionId: '3',
    reason: 'Spam',
    reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: 'reviewed',
  },
];

const mockMetadata: Record<string, PostMetadata> = {
  '1': {
    confessionId: '1',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  '2': {
    confessionId: '2',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  '3': {
    confessionId: '3',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentAdmin: null,
      reports: mockReports,
      postMetadata: mockMetadata,

      login: (username, password) => {
        if (username === mockAdminCredentials.username && password === mockAdminCredentials.password) {
          const admin: AdminUser = {
            id: '1',
            username,
            role: 'admin',
          };
          set({ isAuthenticated: true, currentAdmin: admin });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, currentAdmin: null });
      },

      addReport: (confessionId, reason) => {
        const newReport: PostReport = {
          id: Date.now().toString(),
          confessionId,
          reason,
          reportedAt: new Date(),
          status: 'pending',
        };
        set((state) => ({
          reports: [newReport, ...state.reports],
        }));
      },

      updateReportStatus: (reportId, status) => {
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === reportId ? { ...r, status } : r
          ),
        }));
      },

      getPostMetadata: (confessionId) => {
        return get().postMetadata[confessionId];
      },

      trackPost: (confessionId, ipAddress, userAgent) => {
        set((state) => ({
          postMetadata: {
            ...state.postMetadata,
            [confessionId]: {
              confessionId,
              ipAddress,
              userAgent,
              timestamp: new Date(),
            },
          },
        }));
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentAdmin: state.currentAdmin,
      }),
    }
  )
);
