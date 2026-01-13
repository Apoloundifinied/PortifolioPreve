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
    <section id="about" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section header */}
        <div
          className={cn(
            'text-center mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="text-primary">Mim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
            <h3 className="text-2xl font-semibold mb-6">Minha História</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: '5+', label: 'Anos de Experiência' },
                { value: '50+', label: 'Projetos Entregues' },
                { value: '30+', label: 'Clientes Satisfeitos' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-2'
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">Habilidades</h3>
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={18} className="text-primary" />
                      <span className="font-medium text-sm">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-2 text-sm rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
                        >
                          <span className="mr-1.5">{skill.icon}</span>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
