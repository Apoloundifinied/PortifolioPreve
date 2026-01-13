import { Project, Skill, SocialLink, PersonalInfo } from '@/types/portfolio';

// ============================================
// PERSONAL INFO - Edit your information here
// ============================================
export const personalInfo: PersonalInfo = {
  name: 'Seu Nome',
  role: 'Full Stack Developer',
  bio: 'Desenvolvedor apaixonado por criar soluções elegantes e eficientes. Especializado em React, TypeScript e Node.js, com foco em experiências de usuário excepcionais e código limpo.',
  email: 'seu@email.com',
  location: 'São Paulo, Brasil',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resumeUrl: '#',
};

// ============================================
// SKILLS - Add or modify your skills
// ============================================
export const skills: Skill[] = [
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'TypeScript', icon: '📘', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Figma', icon: '🎯', category: 'tools' },
];

// ============================================
// SOCIAL LINKS - Add your social profiles
// ============================================
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/seuusuario', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/seuusuario', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/seuusuario', icon: 'twitter' },
];

// ============================================
// PROJECTS - Add your projects here
// ============================================
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel admin. Construída com React, Node.js e Stripe.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Aplicativo de gerenciamento de tarefas com drag-and-drop, colaboração em tempo real e notificações.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    category: 'frontend',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'API REST Microservices',
    description: 'Arquitetura de microserviços escalável com autenticação JWT, rate limiting e documentação OpenAPI.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    technologies: ['Node.js', 'Docker', 'Redis', 'MongoDB'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '4',
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo com gráficos em tempo real, filtros avançados e exportação de relatórios.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['React', 'D3.js', 'TypeScript', 'REST API'],
    category: 'frontend',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: '5',
    title: 'Chat Real-time',
    description: 'Aplicação de chat em tempo real com WebSockets, suporte a mídia e criptografia end-to-end.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: '6',
    title: 'Portfolio Generator',
    description: 'Ferramenta para desenvolvedores criarem portfolios personalizados com temas e deploy automático.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'MDX', 'Vercel', 'Tailwind'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: '#',
  },
];

// ============================================
// PROJECT CATEGORIES - For filtering
// ============================================
export const projectCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full Stack' },
];

// ============================================
// NAVIGATION LINKS
// ============================================
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'contact', label: 'Contato' },
];
