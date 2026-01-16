import { personalInfo, navLinks, socialLinks } from '@/data/portfolio';
import { scrollToSection } from '@/hooks/useActiveSection';
import { Heart, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold tracking-tight hover:text-primary transition-colors inline-block group"
            >
              <span className="text-primary">&lt;</span>
              <span className="group-hover:scale-110 inline-block transition-transform">Dev</span>
              <span className="text-primary">/&gt;</span>
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              Criando experiências web incríveis
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-foreground mb-2">Navegação Rápida</p>
            <div className="flex flex-wrap justify-center gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-all hover:scale-105 duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Social links - GitHub only */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-sm font-semibold text-foreground">Conectar</p>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hover:text-primary hover:border-primary group transition-all"
            >
              <a
                href={socialLinks.find(link => link.icon === 'github')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} className="group-hover:scale-125 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Copyright section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© {currentYear}</span>
            <span className="font-semibold text-foreground">{personalInfo.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart size={14} className="text-primary animate-pulse fill-primary" />
            <span>usando React + TypeScript</span>
          </div>

          <div className="text-xs text-muted-foreground/70">
            Todos os direitos reservados
          </div>
        </div>
      </div>

      {/* Floating gradient blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </footer>
  );
}
