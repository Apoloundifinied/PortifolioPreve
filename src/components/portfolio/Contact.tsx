import { useState } from 'react';
import emailjs from '@emailjs/browser';

import { personalInfo, socialLinks } from '@/data/portfolio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, MapPin, Loader2, Github, Linkedin, Twitter } from 'lucide-react';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

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
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      toast({
        title: 'Mensagem enviada!',
        description: 'Obrigado pelo contato. Responderei em breve!',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
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
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
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
          {/* Info */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-1'
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">Vamos Conversar</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon =
                  socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div
            className={cn(
              'opacity-0',
              isVisible && 'animate-fade-up stagger-2'
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                rows={5}
                placeholder="Sua mensagem..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
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
