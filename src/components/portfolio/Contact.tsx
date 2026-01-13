import { useState } from 'react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Mail, MapPin, Loader2, Github, Linkedin, Twitter } from 'lucide-react';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Mensagem enviada!',
        description: 'Obrigado pelo contato. Responderei em breve!',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section header */}
        <div
          className={cn(
            'text-center mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em <span className="text-primary">Contato</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente ou quer bater um papo? Adoraria ouvir de você!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-1'
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">Vamos Conversar</h3>
            <p className="text-muted-foreground mb-8">
              Estou sempre aberto a novas oportunidades, parcerias ou simplesmente 
              uma boa conversa sobre tecnologia e desenvolvimento.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground/70">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground/70">Localização</div>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-sm font-medium mb-4">Me encontre nas redes</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
                      aria-label={link.name}
                    >
                      {Icon && <Icon size={18} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-2'
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-me sobre seu projeto ou ideia..."
                  required
                  rows={5}
                  className="bg-secondary border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full glow-hover"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
