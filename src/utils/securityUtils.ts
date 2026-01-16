// Funções de segurança e validação
import SECURITY_CONFIG from '@/config/securityConfig';

// ============================================
// HASH SIMPLES (não usar em produção real)
// ============================================
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SECURITY_CONFIG.SECRET_KEY);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// ============================================
// RATE LIMITING
// ============================================
interface LoginAttempt {
  count: number;
  lastAttempt: number;
  blocked: boolean;
}

export const checkRateLimit = (): boolean => {
  const attempts = localStorage.getItem('admin_login_attempts');
  const now = Date.now();

  if (!attempts) {
    return true;
  }

  const attempt: LoginAttempt = JSON.parse(attempts);

  // Se passou o tempo de reset, resete as tentativas
  if (now - attempt.lastAttempt > SECURITY_CONFIG.LOGIN_ATTEMPT_RESET_TIME * 1000) {
    localStorage.removeItem('admin_login_attempts');
    return true;
  }

  // Se bloqueado, continue bloqueado
  if (attempt.blocked) {
    return false;
  }

  return true;
};

export const recordLoginAttempt = (success: boolean) => {
  const now = Date.now();
  const attempts = localStorage.getItem('admin_login_attempts');

  let attempt: LoginAttempt = attempts ? JSON.parse(attempts) : { count: 0, lastAttempt: now, blocked: false };

  if (success) {
    localStorage.removeItem('admin_login_attempts');
    return;
  }

  // Registrar tentativa falha
  attempt.count++;
  attempt.lastAttempt = now;

  if (attempt.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    attempt.blocked = true;
  }

  localStorage.setItem('admin_login_attempts', JSON.stringify(attempt));
};

export const getLoginAttemptInfo = (): { remaining: number; blockedUntil?: Date } => {
  const attempts = localStorage.getItem('admin_login_attempts');

  if (!attempts) {
    return { remaining: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS };
  }

  const attempt: LoginAttempt = JSON.parse(attempts);
  const now = Date.now();
  const resetTime = attempt.lastAttempt + SECURITY_CONFIG.LOGIN_ATTEMPT_RESET_TIME * 1000;

  return {
    remaining: Math.max(0, SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempt.count),
    blockedUntil: new Date(resetTime),
  };
};

// ============================================
// VALIDAÇÃO E SANITIZAÇÃO
// ============================================
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove caracteres perigosos
    .substring(0, 500); // Limite de caracteres
};

export const validateProjectData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Título deve ter pelo menos 3 caracteres');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Descrição deve ter pelo menos 10 caracteres');
  }

  if (data.title && data.title.length > 100) {
    errors.push('Título não pode ter mais de 100 caracteres');
  }

  if (data.description && data.description.length > 1000) {
    errors.push('Descrição não pode ter mais de 1000 caracteres');
  }

  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    errors.push('Adicione pelo menos uma tecnologia');
  }

  if (data.image && !isValidUrl(data.image)) {
    errors.push('URL da imagem inválida');
  }

  if (data.demoUrl && data.demoUrl && !isValidUrl(data.demoUrl)) {
    errors.push('URL de demo inválida');
  }

  if (data.githubUrl && data.githubUrl && !isValidUrl(data.githubUrl)) {
    errors.push('URL do GitHub inválida');
  }

  return errors;
};

export const validateSkillData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!data.icon || data.icon.trim().length === 0) {
    errors.push('Ícone é obrigatório');
  }

  if (data.name && data.name.length > 50) {
    errors.push('Nome não pode ter mais de 50 caracteres');
  }

  if (!['frontend', 'backend', 'tools', 'other'].includes(data.category)) {
    errors.push('Categoria inválida');
  }

  return errors;
};

export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Campo opcional
  try {
    new URL(url);
    return url.startsWith('https://') || url.startsWith('http://');
  } catch {
    return false;
  }
};

// ============================================
// VERIFICAÇÃO DE SESSÃO
// ============================================
export const setSessionTimeout = () => {
  const timeout = setTimeout(() => {
    localStorage.removeItem('admin_authenticated');
    window.location.href = SECURITY_CONFIG.ADMIN_PATH;
  }, SECURITY_CONFIG.SESSION_TIMEOUT * 60 * 1000);

  sessionStorage.setItem('admin_timeout', timeout.toString());
};

export const resetSessionTimeout = () => {
  const timeout = sessionStorage.getItem('admin_timeout');
  if (timeout) {
    clearTimeout(parseInt(timeout));
    setSessionTimeout();
  }
};

// ============================================
// PROTEÇÃO CONTRA CSRF
// ============================================
export const generateCSRFToken = (): string => {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  sessionStorage.setItem('csrf_token', token);
  return token;
};

export const verifyCSRFToken = (token: string): boolean => {
  const stored = sessionStorage.getItem('csrf_token');
  return stored === token;
};

// ============================================
// LOG DE AUDITORIA (apenas em localStorage)
// ============================================
export const logAdminAction = (action: string, details: any = {}) => {
  const logs = localStorage.getItem('admin_audit_logs');
  const allLogs = logs ? JSON.parse(logs) : [];

  allLogs.push({
    timestamp: new Date().toISOString(),
    action,
    details: sanitizeInput(JSON.stringify(details)),
    userAgent: navigator.userAgent.substring(0, 200),
  });

  // Manter apenas os últimos 100 registros
  const recentLogs = allLogs.slice(-100);
  localStorage.setItem('admin_audit_logs', JSON.stringify(recentLogs));
};

export const getAuditLogs = () => {
  const logs = localStorage.getItem('admin_audit_logs');
  return logs ? JSON.parse(logs) : [];
};
