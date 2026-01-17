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
      {/* Background gradient - More vibrant */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
      
      {/* Background GIF with low opacity */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <img
          src="https://i.pinimg.com/originals/8a/e1/04/8ae104a88d8fd8e5c4d1a9cbea4d4c96.gif"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Enhanced decorative elements with animations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" style={{ animation: 'float 4s ease-in-out infinite reverse' }} />

      <div ref={ref} className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Avatar with enhanced glow */}
          <div
            className={cn(
              'relative opacity-0',
              isVisible && 'animate-scale-in'
            )}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/40 shadow-glow-lg ring-4 ring-primary/20">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" style={{ transform: 'scale(1.15)' }} />
            <div className="absolute inset-0 rounded-full border border-primary/20" style={{ transform: 'scale(1.35)' }} />
            {/* Glow effect */}
            <div className="absolute -inset-8 rounded-full bg-primary/10 blur-2xl animate-pulse-glow opacity-0" />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <p
              className={cn(
                'text-primary font-semibold mb-3 opacity-0 tracking-wide',
                isVisible && 'animate-fade-up'
              )}
            >
              Olá, eu sou
            </p>
            
            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 leading-tight',
                isVisible && 'animate-fade-up stagger-1'
              )}
            >
              <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            
            <h2
              className={cn(
                'text-xl md:text-2xl font-semibold mb-6 opacity-0 text-primary',
                isVisible && 'animate-fade-up stagger-2'
              )}
            >
              {personalInfo.role}
            </h2>
            
            <p
              className={cn(
                'text-muted-foreground leading-relaxed mb-8 text-base md:text-lg opacity-0',
                isVisible && 'animate-fade-up stagger-3'
              )}
            >
              {personalInfo.bio}
            </p>

            {/* Info badges with better styling */}
            <div
              className={cn(
                'flex flex-wrap gap-6 justify-center lg:justify-start mb-8 opacity-0',
                isVisible && 'animate-fade-up stagger-4'
              )}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <MapPin size={18} className="text-primary group-hover:scale-125 transition-transform" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <Mail size={18} className="text-primary group-hover:scale-125 transition-transform" />
                <span>{personalInfo.email}</span>
              </div>
            </div>

            {/* CTA Buttons with enhanced styling */}
            <div
              className={cn(
                'flex flex-wrap gap-4 justify-center lg:justify-start opacity-0',
                isVisible && 'animate-fade-up stagger-5'
              )}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="glow-hover font-semibold hover:shadow-glow"
              >
                Ver Projetos
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="group"
              >
                Entrar em Contato
                <Mail size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator - positioned outside section-container */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in z-20" style={{ animationDelay: '0.8s' }}>
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
          aria-label="Scroll para baixo"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-current rounded-full flex items-start justify-center pt-2 group-hover:border-primary transition-colors">
            <ArrowDown size={16} className="animate-bounce text-primary" />
          </div>
        </button>
      </div>
    </section>
  );
}
