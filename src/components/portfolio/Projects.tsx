import { useState } from 'react';
import { projects, projectCategories } from '@/data/portfolio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/button';

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div ref={ref} className="section-container relative z-10">
        {/* Section header */}
        <div
          className={cn(
            'text-center mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Uma seleção dos projetos mais relevantes que desenvolvi ao longo da minha carreira
          </p>
        </div>

        {/* Category filters with enhanced styling */}
        <div
          className={cn(
            'flex flex-wrap justify-center gap-3 mb-16 opacity-0',
            isVisible && 'animate-fade-up stagger-1'
          )}
        >
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveCategory(category.id);
                setShowAll(false);
              }}
              className={cn(
                'transition-all duration-200 font-semibold',
                activeCategory === category.id && 'shadow-glow ring-2 ring-primary/50'
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects grid with animation */}
        <div 
          className={cn(
            'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12',
            isVisible && 'animate-fade-in'
          )}
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Show more button */}
        {filteredProjects.length > 6 && (
          <div
            className={cn(
              'flex justify-center opacity-0',
              isVisible && 'animate-fade-up stagger-4'
            )}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="font-semibold hover:shadow-glow"
            >
              {showAll ? '↑ Mostrar Menos' : `👁️ Ver Todos (${filteredProjects.length})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
