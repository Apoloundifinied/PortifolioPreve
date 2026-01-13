import { personalInfo, navLinks } from '@/data/portfolio';
import { scrollToSection } from '@/hooks/useActiveSection';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg font-bold tracking-tight hover:text-primary transition-colors"
          >
            <span className="text-primary">&lt;</span>
            Dev
            <span className="text-primary">/&gt;</span>
          </button>

          {/* Quick links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span>{personalInfo.name}</span>
            <span className="mx-1">•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart size={14} className="text-primary fill-primary" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
