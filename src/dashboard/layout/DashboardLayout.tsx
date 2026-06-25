import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SideBar from './SideBar';
import DashboardNavbar from './DashboardNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0F' }}>
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main ref={contentRef} className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
