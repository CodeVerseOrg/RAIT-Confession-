import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AdminRoute } from './components/AdminRoute';
import { Toaster } from './components/ui/toaster';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { NewConfessionInput } from './components/NewConfessionInput';
import { ConfessionCard } from './components/ConfessionCard';
import { FeedLoader } from './components/FeedLoader';
import { NewConfessionModal } from './components/NewConfessionModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Footer } from './components/Footer';
import { useConfessionStore } from './stores/confessionStore';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const { getFilteredConfessions } = useConfessionStore();

  const confessions = getFilteredConfessions();
  const displayedConfessions = confessions.slice(0, page * 5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && displayedConfessions.length < confessions.length) {
          setLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, displayedConfessions.length, confessions.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex gap-8">
          <Sidebar onNewConfession={() => setModalOpen(true)} />
          
          <div className="flex-1 max-w-3xl">
            <div className="hidden md:block">
              <NewConfessionInput />
            </div>
            
            <div className="space-y-6">
              {displayedConfessions.map((confession) => (
                <ConfessionCard key={confession.id} confession={confession} />
              ))}
            </div>

            {loading && <FeedLoader />}
            
            <div ref={observerRef} className="h-20" />
          </div>

          <RightSidebar onNewConfession={() => setModalOpen(true)} />
        </div>
      </main>

      <Footer />

      <FloatingActionButton onClick={() => setModalOpen(true)} />

      <NewConfessionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;


