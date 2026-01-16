// Configurações de Segurança do Admin Panel
// Mude estas variáveis em um arquivo .env em produção

const SECURITY_CONFIG = {
  // Rota admin - mude para algo único e aleatório
  ADMIN_PATH: '/' + (import.meta.env.VITE_ADMIN_PATH || 'dashboard'),

  // Tentativas de login antes de bloquear
  MAX_LOGIN_ATTEMPTS: 5,

  // Tempo em segundos para resete de tentativas
  LOGIN_ATTEMPT_RESET_TIME: 900, // 15 minutos

  // Timeout de sessão em minutos
  SESSION_TIMEOUT: 30,

  // Chave secreta para hash (use ambiente)
  SECRET_KEY: import.meta.env.VITE_ADMIN_SECRET || 'change-me-in-production',
};

export default SECURITY_CONFIG;
