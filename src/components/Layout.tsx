import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, []);

  return (
    <div ref={wrapRef} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
