# 🚀 Checklist de Deploy - Painel Admin

## ✅ Antes de Fazer Deploy em Produção

### Segurança - CRÍTICO ⚠️
- [ ] Senha alterada (não use `admin123`)
- [ ] Arquivo `.env.local` criado com valores únicos
- [ ] `VITE_ADMIN_PASSWORD` configurado
- [ ] `VITE_ADMIN_PATH` configurado com rota oculta
- [ ] `VITE_ADMIN_SECRET` gerado (mínimo 32 caracteres)
- [ ] `.env*` adicionado ao `.gitignore`
- [ ] Nenhum arquivo `.env` commited ao Git
- [ ] Secrets configurados em variáveis de ambiente do deploy

### Validação de Código
- [ ] Todos os imports resolvidos
- [ ] Sem console.log() em produção (remover debugging)
- [ ] Tipos TypeScript corretos
- [ ] Sem warnings de build

### Funcionalidade
- [ ] Login funciona corretamente
- [ ] Rate limiting está ativo
- [ ] CRUD de projetos funciona
- [ ] CRUD de skills funciona
- [ ] Validações funcionam
- [ ] Timeout de sessão funciona
- [ ] Logout funciona

### Banco de Dados
- [ ] Dados persistem após refresh (localStorage)
- [ ] Exportar/importar dados testado
- [ ] Backup dos dados executado

### Performance
- [ ] Sem memory leaks
- [ ] Sem loops infinitos
- [ ] Bundle size verificado
- [ ] Lazy loading configurado

### Compatibilidade
- [ ] Testado em Chrome
- [ ] Testado em Firefox
- [ ] Testado em Safari
- [ ] Testado em Mobile (iOS/Android)
- [ ] Testado em Tablet

### Deploy
- [ ] Certificado SSL/HTTPS configurado
- [ ] Domínio apontado corretamente
- [ ] Variáveis de ambiente definidas no host
- [ ] CI/CD pipeline funcionando
- [ ] Build passa sem erros
- [ ] Testes passam (se aplicável)

### Pós-Deploy
- [ ] Login funciona em produção
- [ ] Dados salvam corretamente
- [ ] Sem erros no console do navegador
- [ ] Sem erros no servidor
- [ ] HTTPS redirecionado de HTTP
- [ ] Cache limpo (se necessário)

---

## 🔧 Plataformas de Deploy Recomendadas

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel

# Configurar variáveis de ambiente:
# Dashboard > Settings > Environment Variables
# Adicione: VITE_ADMIN_PATH, VITE_ADMIN_PASSWORD, VITE_ADMIN_SECRET
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy

# Configurar em: Site settings > Build & deploy > Environment
```

### GitHub Pages
```bash
# Requer backend para segurança
# Não recomendado para painel admin
```

### Seu Servidor (VPS)
```bash
# Build
npm run build

# Deploy arquivo dist/ para servidor
# Usar Node.js + Express ou similar para servir

# Configurar variáveis de ambiente no servidor:
export VITE_ADMIN_PATH=dashboard-xyz123
export VITE_ADMIN_PASSWORD=sua-senha-forte
export VITE_ADMIN_SECRET=sua-chave-secreta
```

---

## 🔒 Checklist de Segurança Final

### Senhas & Secrets
- [ ] Senha forte (12+ caracteres, maiúscula, minúscula, número, símbolo)
- [ ] Secret key gerado aleatoriamente
- [ ] Nunca compartilhar secrets em público
- [ ] Secrets nunca em repositório Git

### Endpoints
- [ ] Rota admin não está documentada publicamente
- [ ] Rota não está em robots.txt
- [ ] Rota não está em sitemap.xml
- [ ] Rota não tem links públicos

### Headers de Segurança
Se usar backend, adicione:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### Monitoring
- [ ] Logs de auditoria sendo registrados
- [ ] Alertas configurados para múltiplas tentativas de login
- [ ] Backup automático dos dados
- [ ] Plano de disaster recovery

---

## 📋 Procedimento de Deploy Passo-a-Passo

### 1. Preparar Código
```bash
# Atualizar dependências
npm update

# Build de produção
npm run build

# Verificar erros
npm run lint
npm run type-check  # se houver
```

### 2. Configurar Variáveis
```bash
# Criar arquivo .env.production
VITE_ADMIN_PATH=painel-xyz123abc456
VITE_ADMIN_PASSWORD=SuaSenhaForteAqui
VITE_ADMIN_SECRET=sua-chave-aleatoria-de-32-caracteres
```

### 3. Testar Build
```bash
# Servir build localmente
npm run preview

# Testar login e funcionalidades
# Verificar console de erro
```

### 4. Deploy
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Seu servidor
scp -r dist/* user@host:/var/www/app/
```

### 5. Verificar Produção
```bash
# Acessar https://seu-dominio.com/painel-xyz123abc456
# Testar login
# Verificar dados sendo salvos
# Revisar console/logs
```

---

## 🚨 Em Caso de Emergência

### Resetar Senhas
```javascript
// No console do navegador (admin page)
localStorage.clear();
// Recarregar página
```

### Reverti Deploy
```bash
# Vercel
vercel rollback

# Netlify
# Dashboard > Deploys > Rollback

# Seu servidor
git revert HEAD
npm run build
deploy dist/
```

### Bloquear Acesso
Se suspeitar de comprometimento:
```bash
# Mude a rota
VITE_ADMIN_PATH=nova-rota-secreta

# Mude a senha
VITE_ADMIN_PASSWORD=nova-senha-forte

# Redeploy
```

---

## 📞 Suporte

- Consulte [SECURITY.md](./SECURITY.md) para segurança
- Consulte [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) para uso
- Revisar logs de auditoria: `admin_audit_logs` em localStorage

---

**Status de Deploy:** ⭕ Pronto para ir ao ar
**Data da Verificação:** [HOJE]
**Responsável:** [SEU NOME]

**Desenvolvido com ❤️ para Crimson Canvas**
