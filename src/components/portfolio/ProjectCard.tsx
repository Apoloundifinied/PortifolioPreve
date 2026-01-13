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
        'group relative bg-card rounded-xl border border-border overflow-hidden card-hover opacity-0',
        isVisible && 'animate-fade-up',
        `stagger-${(index % 4) + 1}`
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md">
            Destaque
          </div>
        )}

        {/* Links overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.demoUrl && (
            <Button
              size="sm"
              asChild
              className="shadow-lg"
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-1.5" />
                Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="shadow-lg"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-1.5" />
                Código
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
