import { useState, useEffect } from 'react';

interface NavProps {
  currentPath: string;
  transparentHero?: boolean;
}

const NAV_LINKS = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/attractions', label: 'Attractions' },
  { href: '/amenities', label: 'Amenities' },
];

export default function Nav({ currentPath, transparentHero = false }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!transparentHero);

  useEffect(() => {
    const onScroll = () => setScrolled(!transparentHero || window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    currentPath === href || currentPath === href + '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-var'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className={`font-display font-semibold text-lg md:text-xl tracking-tight transition-colors ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
          >
            Villa Calma
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`font-body text-sm font-medium tracking-wide transition-colors ${
                    isActive(href)
                      ? scrolled
                        ? 'text-secondary border-b-2 border-secondary pb-0.5'
                        : 'text-white border-b-2 border-white pb-0.5'
                      : scrolled
                      ? 'text-on-surface hover:text-secondary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="/booking"
            className="hidden md:inline-flex items-center px-6 py-3 bg-secondary text-on-secondary font-body font-bold text-xs tracking-widest uppercase border-2 border-secondary hover:opacity-90 transition-opacity rounded-sm"
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 rounded transition-colors ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <span className="w-6 h-0.5 bg-current block" />
            <span className="w-6 h-0.5 bg-current block" />
            <span className="w-4 h-0.5 bg-current block ml-auto" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-[100] flex transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`relative ml-auto w-72 max-w-full h-full bg-surface flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-outline-var">
            <span className="font-display font-semibold text-primary">Villa Calma</span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 text-on-surface-var hover:text-primary transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex flex-col px-6 py-8 gap-2">
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`font-body text-lg py-3 border-b border-outline-var ${
                currentPath === '/' ? 'text-secondary font-semibold' : 'text-on-surface hover:text-secondary'
              } transition-colors`}
            >
              Home
            </a>
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-lg py-3 border-b border-outline-var ${
                  isActive(href) ? 'text-secondary font-semibold' : 'text-on-surface hover:text-secondary'
                } transition-colors`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="px-6 mt-auto pb-10">
            <a
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-8 py-4 bg-secondary text-on-secondary font-body font-bold text-sm tracking-widest uppercase border-2 border-secondary hover:opacity-90 transition-opacity rounded-sm"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
