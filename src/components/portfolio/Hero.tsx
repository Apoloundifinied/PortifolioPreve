import { personalInfo } from '@/data/portfolio';
import { scrollToSection } from '@/hooks/useActiveSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Avatar */}
          <div
            className={cn(
              'relative opacity-0',
              isVisible && 'animate-scale-in'
            )}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow-lg">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" style={{ transform: 'scale(1.15)' }} />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <p
              className={cn(
                'text-primary font-medium mb-3 opacity-0',
                isVisible && 'animate-fade-up'
              )}
            >
              Olá, eu sou
            </p>
            
            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0',
                isVisible && 'animate-fade-up stagger-1'
              )}
            >
              {personalInfo.name}
            </h1>
            
            <h2
              className={cn(
                'text-xl md:text-2xl text-muted-foreground mb-6 opacity-0',
                isVisible && 'animate-fade-up stagger-2'
              )}
            >
              {personalInfo.role}
            </h2>
            
            <p
              className={cn(
                'text-muted-foreground leading-relaxed mb-8 opacity-0',
                isVisible && 'animate-fade-up stagger-3'
              )}
            >
              {personalInfo.bio}
            </p>

            {/* Info badges */}
            <div
              className={cn(
                'flex flex-wrap gap-4 justify-center lg:justify-start mb-8 opacity-0',
                isVisible && 'animate-fade-up stagger-4'
              )}
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                {personalInfo.email}
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              className={cn(
                'flex flex-wrap gap-4 justify-center lg:justify-start opacity-0',
                isVisible && 'animate-fade-up stagger-5'
              )}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="glow-hover"
              >
                Ver Projetos
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                Entrar em Contato
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll para baixo"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={20} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
