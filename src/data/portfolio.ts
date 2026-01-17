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
  avatar: 'https://i.imgur.com/FGFSOOA.jpeg',
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
    {
    id: '6',
    title: 'ValidCPF - lib de validação de CPF',
    description: 'Este é um simples e funcional validador de CPF feito em JavaScript, agora disponível como pacote npm para fácil integração em seus projetos.',
    image: 'https://i.pinimg.com/originals/ab/32/b2/ab32b287d5bc96d3dafe9c3ae2311d76.gif',
    technologies: ['javascript', 'npm'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: 'https://github.com/Apoloundifinied/ApoloCpf',
  },
      {
    id: '6',
    title: 'node-cache-lite',
    description: 'Uma biblioteca leve de cache em memória para Node.js, projetada para melhorar o desempenho de aplicações armazenando dados temporariamente.',
    image: 'https://i.pinimg.com/originals/9a/ba/e1/9abae1a4d0ea8d4ae2c7288eecf80fe2.gif',
    technologies: ['javascript', 'npm'],
    category: 'backend',
    demoUrl: '#',
    githubUrl: 'https://www.npmjs.com/package/node-cache-lite?activeTab=readme',
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
