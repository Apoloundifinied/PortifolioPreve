import { Project, Skill, SocialLink, PersonalInfo } from '@/types/portfolio';
import { url } from 'inspector';

// ============================================
// PERSONAL INFO - Edit your information here
// ============================================
export const personalInfo: PersonalInfo = {
  name: 'Apolo',
  role: 'Full Stack Developer',
  bio: 'Desenvolvedor • Automação • Inteligencia Artificial',
  email: 'emailpprofissionaldaqapoucokkkk',
  location: 'Rio Grande Do Sul, Brasil',
  avatar: 'https://i.pinimg.com/736x/05/17/f0/0517f0b64bd1506ba32fbf13cdd29dfc.jpg',
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
  { name: 'Express.js', icon: '🚂', category: 'backend' },
  { name: 'FastAPI', icon: '⚡', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' }, // folha
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'selenium', icon: '🔍', category: 'backend' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Figma', icon: '🎯', category: 'tools' },
];

// ============================================
// SOCIAL LINKS - Add your social profiles
// ============================================
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/Apoloundifinied', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/seuusuario', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/seuusuario', icon: 'twitter' },
];

// ============================================
// PROJECTS - Add your projects here
// ============================================
export const projects: Project[] = [
  {
    id: '1',
    title: 'Bot Discord + Gatway Pagamentos',
    description: 'Bot de Discord para gerenciamento de servidores com integração de gateway de pagamentos para pagarmentos dentro do servidor.',
    image: 'https://i.imgur.com/ZuSjexA.gif',
    technologies: ['node.js ', 'discord.js', 'pagamentos'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/GOPTRIX',
    featured: true,
  },
  {
    id: '2',
    title: 'Super Pomodoro Discord',
    description: 'Bot Discord com FastAPI para gerenciamento de tarefas usando a técnica Pomodoro.',
    image: 'https://i.imgur.com/WXA3FDf.gif',
    technologies: ['javascript', 'FastAPI'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/SUPER_POMODORO_DISCORD',
    featured: true,
  },
  {
    id: '3',
    title: 'autoGroupPy - cria grupo automático no facebook',
    description: 'Script em Python que automatiza a criação de grupos no Facebook usando Selenium.',
    image: 'https://i.imgur.com/O4eQrkM.gif',
    technologies: ['Node.js', 'selenium'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/AutoGroupPy',
    featured: true,
  },
  {
    id: '4',
    title: 'Veriatas - Assistente de lib',
    description: 'Aplicação de chat em tempo real com WebSockets, suporte a mídia e criptografia end-to-end.',
    image: 'https://i.imgur.com/p8ypvJo.gif',
    technologies: ['React'],
    category: 'frontend-end',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/veritas',
  },
  {
    id: '5',
    title: 'Devnews - Plataforma de notícias para desenvolvedores',
    description: 'Plataforma web que agrega notícias e artigos relevantes para desenvolvedores de software.',
    image: 'https://i.imgur.com/x8JDlWT.gif',
    technologies: ['FastAPI', 'html-css-js'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/DevNews',
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
