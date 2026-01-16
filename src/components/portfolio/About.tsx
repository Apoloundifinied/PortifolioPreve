import { personalInfo, skills } from '@/data/portfolio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Code2, Palette, Server, Wrench } from 'lucide-react';

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
  other: Palette,
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Ferramentas',
  other: 'Outros',
};

const categoryColors = {
  frontend: 'from-blue-500/10 to-cyan-500/10',
  backend: 'from-green-500/10 to-emerald-500/10',
  tools: 'from-purple-500/10 to-pink-500/10',
  other: 'from-orange-500/10 to-yellow-500/10',
};

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section header */}
        <div
          className={cn(
            'text-center mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Conheça mais sobre minha jornada, habilidades e paixão por desenvolvimento
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-1'
            )}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">🚀 Minha História</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                Minha jornada como desenvolvedor começou cedo, movida pela curiosidade em entender como as coisas funcionam por trás das telas.<br /><br />
                Tenho 16 anos, moro no Rio Grande do Sul – Brasil, e sou autodidata, estudando programação e tecnologia de forma contínua há cerca de 3 anos.
              </p>

              <p>
                Ao longo desse período, adquiri experiência com Python, JavaScript e TypeScript,<br />
                além de frameworks como Vue, React e Next.js, dominando também HTML e CSS.<br /><br />
                Já atuei como freelancer em diferentes projetos, como automações, web scrapers, criação de sites e desenvolvimento de bots de Discord —<br />
                meu primeiro trabalho na área foi aos 14 anos.
              </p>

              <p>
                Atualmente, meu principal foco está na área de Cybersecurity,<br />
                onde estudo fundamentos como TCP/IP, protocolos de rede, Modelo OSI, Linux,<br />
                noções iniciais de kernel e criação de scripts.<br /><br />
                Também possuo experiência na criação de APIs com FastAPI e na implementação de soluções com IA,<br />
                que utilizo como apoio ao desenvolvimento, não como substituição.<br /><br />
                Acredito em código limpo, automação eficiente e aprendizado constante<br />
                como base para construir soluções escaláveis e bem estruturadas.
              </p>
            </div>

            {/* Stats with enhanced styling */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: '3+', label: 'Anos de Código' },
                { value: '20+', label: 'Projetos' },
                { value: '100%', label: 'Dedicação' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    'text-center p-4 rounded-lg bg-gradient-to-br from-card to-secondary border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group',
                    'transform hover:scale-105'
                  )}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient group-hover:animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills with enhanced styling */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-2'
            )}
          >
            <h3 className="text-2xl font-bold mb-8 text-primary">💻 Habilidades</h3>
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <div
                    key={category}
                    className={cn(
                      'opacity-0',
                      isVisible && 'animate-fade-up',
                      `stagger-${categoryIndex + 1}`
                    )}
                  >
                    <div className="flex items-center gap-2 mb-4 group cursor-default">
                      <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <span className="font-bold text-base text-foreground">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {categorySkills.length} skills
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className={cn(
                            'px-3 py-2 text-sm rounded-lg bg-card border border-border/50',
                            'hover:border-primary/70 hover:bg-primary/10 transition-all duration-300',
                            'cursor-default group hover:scale-105 transform',
                            'opacity-0 animate-fade-up',
                            isVisible && `stagger-${skillIndex % 3 + 1}`
                          )}
                        >
                          <span className="mr-2 text-base group-hover:scale-125 inline-block transition-transform">
                            {skill.icon}
                          </span>
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating gradient blur */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
