import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import upranko from "../assets/upranko.png.jpeg";

const links = [
  { label: "How it works", to: "/how-it-works" },
  { label: "Offer", to: "/pricing" },
  { label: "Benefits", to: "/benefits" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Navbar entrance + scroll effect
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop background page scrolling while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm"
          : "bg-white border-b border-black/10"
      }`}
    >
      {/* ================= NAVBAR ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <img
            loading="lazy"
            src={upranko}
            alt="Upranko NFC Business Card Logo"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-black/10 group-hover:ring-brand-gold-500/60 transition-all duration-300"
          />

          <span className="font-display font-bold text-xl">
            <span className="text-brand-red-600">up</span>
            <span className="gold-text">Ranko</span>
          </span>
        </Link>

        {/* ================= DESKTOP LINKS ================= */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-black"
                    : "text-black/55 hover:text-black"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ================= DESKTOP RIGHT SIDE ================= */}
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #C81E3A, #D4AF37)",
            }}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-black/55 hover:text-black transition-colors"
            >
              Sign in

              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
              </span>
            </Link>

            <a
              href="https://wa.me/918427175161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20WhatsApp%20demo%20of%20upRanko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #C81E3A 0%, #D4AF37 100%)",
              }}
            >
              WhatsApp Demo
            </a>
          </div>
        )}

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={26} strokeWidth={2} />
          ) : (
            <Menu size={26} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden
          fixed left-0 right-0 top-16
          h-[calc(100dvh-4rem)]
          bg-white
          z-50
          transition-all duration-300 ease-out
          ${
            menuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-3 invisible pointer-events-none"
          }
        `}
      >
        <div className="h-full flex flex-col px-6 sm:px-8 pt-7 pb-6 overflow-y-auto">

          {/* Navigation links */}
          <div className="flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center min-h-[56px] text-[18px] font-medium border-b border-black/5 transition-colors ${
                    isActive
                      ? "text-red-600"
                      : "text-black/65 hover:text-black"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-auto pt-8">

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full min-h-[52px] rounded-full text-base font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #C81E3A, #D4AF37)",
                }}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-4">

                {/* Sign In */}
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 min-h-[48px] text-base font-medium text-black/65 hover:text-black transition-colors"
                >
                  Sign in

                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
                  </span>
                </Link>

                {/* Get Started */}
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full min-h-[54px] rounded-full text-base font-bold text-white transition-transform active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, #D91C1C 0%, #B81515 100%)",
                    boxShadow: "0 8px 25px rgba(200,30,30,0.18)",
                  }}
                >
                  Get Started Free
                </Link>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918427175161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20WhatsApp%20demo%20of%20upRanko"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full min-h-[54px] rounded-full text-base font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #C81E3A 0%, #D4AF37 100%)",
                  }}
                >
                  WhatsApp Demo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}