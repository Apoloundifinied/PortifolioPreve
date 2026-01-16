# 🔒 Guia de Segurança - Painel Administrativo

## Medidas de Segurança Implementadas

### 1. ✅ Rota Dinâmica Oculta
```
❌ Antes:  /admin
✅ Agora:  /dashboard-{configurável}
```
A rota é carregada dinamicamente da variável de ambiente `VITE_ADMIN_PATH`.

**Configure em `.env`:**
```env
VITE_ADMIN_PATH=dashboard-settings  # Mude para algo único
```

### 2. ✅ Rate Limiting (Proteção contra Brute Force)
- Máximo de **5 tentativas** de login antes de bloquear
- Bloqueio dura **15 minutos**
- Contador reseta automaticamente após o tempo

**Dados armazenados em localStorage:**
```javascript
admin_login_attempts: {
  count: 5,
  lastAttempt: 1705432800000,
  blocked: true
}
```

### 3. ✅ Hash de Senha (SHA-256)
Senhas são hasheadas antes de serem comparadas:
```typescript
const passwordHash = await crypto.subtle.digest('SHA-256', data);
```

### 4. ✅ Timeout de Sessão
- Sessão expira após **30 minutos** de inatividade
- Usuário é deslogado automaticamente
- Requer nova autenticação

**Configure em `securityConfig.ts`:**
```typescript
SESSION_TIMEOUT: 30, // em minutos
```

### 5. ✅ Validação de Dados
Todos os inputs são validados:
- **Projetos**: título (3-100 chars), descrição (10-1000 chars)
- **Skills**: nome (2-50 chars), categoria válida
- **URLs**: validação de formato HTTP/HTTPS
- **Tecnologias**: minimo 1, máximo configurável

### 6. ✅ Sanitização de Entrada (XSS Protection)
```typescript
sanitizeInput() // Remove <, >, ", ' e limita a 500 caracteres
```

### 7. ✅ CSRF Protection
- Tokens únicos gerados por sessão
- Stored em sessionStorage (nunca localStorage)
- Validado em operações críticas

### 8. ✅ Auditoria de Ações
Todos os eventos são registrados:
```
LOGIN_SUCCESS / LOGIN_FAILED
PROJECT_CREATED / PROJECT_UPDATED / PROJECT_DELETED
SKILL_CREATED / SKILL_UPDATED / SKILL_DELETED
LOGOUT
```

**Acessar logs:**
```javascript
// No console
const logs = JSON.parse(localStorage.getItem('admin_audit_logs'));
console.log(logs);
```

---

## 🚀 Configuração para Produção

### 1. Mudar Senha
Edite ou configure via `.env`:
```env
VITE_ADMIN_PASSWORD=sua-senha-forte-aqui
```

**Requisitos:**
- Mínimo 12 caracteres
- Misture maiúsculas, minúsculas, números, símbolos

### 2. Gerar Chave Secreta
```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[System.Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Configure em `.env`:
```env
VITE_ADMIN_SECRET=sua-chave-de-32-caracteres-aqui
```

### 3. Mudar Rota Admin
Gere um valor único e aleatório:
```env
VITE_ADMIN_PATH=painel-xyz123abc
```

### 4. Implementar Autenticação Real (Recomendado)

#### Opção A: Supabase Auth
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});
```

#### Opção B: Backend Próprio
```typescript
const response = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: hashPassword(password) })
});
```

---

## 🛡️ Checklist de Segurança

### Antes de Deploy

- [ ] Senha alterada (não deixe 'admin123')
- [ ] `.env` configurado com valores únicos
- [ ] `VITE_ADMIN_SECRET` gerado e armazenado com segurança
- [ ] `VITE_ADMIN_PATH` alterado para algo obscuro
- [ ] `.env` adicionado ao `.gitignore`
- [ ] Banco de dados remoto configurado (Supabase)

### Monitoramento

- [ ] Revisar logs de auditoria regularmente
- [ ] Monitorar tentativas de login falhadas
- [ ] Atualizar senha periodicamente (a cada 90 dias)
- [ ] Revogar acesso se suspeitar de compromisso

### Headers de Segurança (Backend)

Se usar um backend:
```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

---

## 🚨 O Que NÃO Fazer

❌ **NÃO deixe a senha padrão**
```typescript
// ❌ ERRADO
if (password === 'admin123') { ... }

// ✅ CORRETO
if (passwordHash === hashPassword(import.meta.env.VITE_ADMIN_PASSWORD)) { ... }
```

❌ **NÃO armazene dados sensíveis em localStorage**
```typescript
// ❌ ERRADO
localStorage.setItem('admin_password', password);

// ✅ CORRETO (usar sessionStorage ou cookies HttpOnly)
```

❌ **NÃO exponha a rota admin**
```typescript
// ❌ ERRADO
<a href="/admin">Admin</a>

// ✅ CORRETO (não publique em lugar nenhum)
```

❌ **NÃO valide apenas no frontend**
```typescript
// ❌ INSEGURO
if (password === 'admin123') { ... }

// ✅ SEGURO (validar também no servidor)
const isValid = await validatePassword(password, serverHash);
```

---

## 📊 Fluxo de Segurança

```
1. Usuário acessa /dashboard-xyz123
   ↓
2. Login form é exibido
   ↓
3. Senha é hasheada (SHA-256)
   ↓
4. Comparada com hash esperado
   ↓
5. Se OK:
   - Gera CSRF token
   - Define timeout de sessão
   - Log de auditoria
   ↓
6. Se Falha:
   - Incrementa contador de tentativas
   - Log de auditoria
   - Se >= 5: bloqueia por 15 min
   ↓
7. Durante sessão:
   - Validação e sanitização em CADA ação
   - Timeout resetado a cada ação
   - Todas as mudanças são auditadas
```

---

## 🔍 Testando Segurança

### Teste Rate Limiting
```javascript
// Simule 5+ tentativas falhadas
for(let i = 0; i < 6; i++) {
  // Tente fazer login com senha errada
}
// Deve bloquear na 6ª tentativa
```

### Teste Sanitização
```javascript
// Tente injetar script
const malicious = "<script>alert('xss')</script>";
console.log(sanitizeInput(malicious));
// Deve remover caracteres perigosos
```

### Teste Validação
```javascript
// Tente criar projeto com dados inválidos
const invalid = { title: '', description: 'x', technologies: [] };
const errors = validateProjectData(invalid);
console.log(errors); // Deve retornar array de erros
```

---

## 📞 Suporte e Reportar Vulnerabilidades

Se encontrar uma vulnerabilidade:

1. **NÃO** publique em issues públicas
2. Contacte privadamente
3. Forneça detalhes:
   - Como reproduzir
   - Impacto
   - Sugestão de fix

---

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web.dev Security](https://web.dev/security/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)

---

**Última atualização:** 16 de Janeiro de 2026

**Desenvolvido com ❤️ e segurança em mente**
