import { Project } from '@/types/portfolio';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative bg-card rounded-xl border border-border overflow-hidden card-hover opacity-0 hover:border-primary/50 transition-all duration-300',
        isVisible && 'animate-fade-up',
        `stagger-${(index % 4) + 1}`
      )}
    >
      {/* Image with enhanced overlay */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
        />
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Featured badge with glow */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-md shadow-glow animate-pulse">
            ⭐ Destaque
          </div>
        )}

        {/* Links overlay with enhanced styling */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.demoUrl && project.demoUrl !== '#' && (
            <Button
              size="sm"
              asChild
              className="shadow-lg hover:shadow-glow font-semibold"
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-1.5" />
                Demo
              </a>
            </Button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="shadow-lg font-semibold hover:bg-primary/20"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-1.5" />
                Código
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content with better typography */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-200">
          {project.description}
        </p>
        
        {/* Technologies with better styling */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 group-hover:border-primary/50 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle bottom border highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  );
}
