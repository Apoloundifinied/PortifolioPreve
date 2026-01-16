import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/data/portfolio';
import { useActiveSection, scrollToSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import { Menu, X, Moon, Sun } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((link) => link.id));
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass py-3 shadow-lg'
          : 'bg-transparent py-5'
      )}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          <span className="text-primary">&lt;</span>
          Dev
          <span className="text-primary">/&gt;</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-primary',
                activeSection === link.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 hover:text-primary transition-colors transition-theme rounded-lg hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 glass overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={cn(
                'text-left py-3 px-4 rounded-lg font-medium transition-colors',
                activeSection === link.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
