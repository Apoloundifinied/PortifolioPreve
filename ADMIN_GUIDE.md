# 📊 Painel Administrativo - Crimson Canvas

Um painel de administração completo para gerenciar seu portfólio com estilo visual coeso e segurança robusta.

## 🚀 Funcionalidades

- ✅ **Gerenciador de Projetos**: Criar, editar e deletar projetos
- ✅ **Gerenciador de Skills**: Adicionar e gerenciar suas competências
- ✅ **Persistência**: Dados salvos em localStorage (não requer backend)
- ✅ **Interface Moderna**: Design responsivo com Tailwind CSS
- ✅ **Autenticação Segura**: Rate limiting, hash de senha, timeout de sessão
- ✅ **Validação e Sanitização**: Proteção contra XSS e injeção
- ✅ **Rota Oculta**: Endpoint dinâmico não óbvio
- ✅ **Auditoria**: Log de todas as ações realizadas

## 🔐 Acesso ao Admin

### Desenvolvimento
1. Configure a rota em `.env.local`:
   ```env
   VITE_ADMIN_PATH=dashboard-dev
   VITE_ADMIN_PASSWORD=admin123
   ```

2. Acesse: `http://localhost:5173/dashboard-dev`

3. Digite a senha padrão: `admin123`

### Produção
- Consulte [SECURITY.md](./SECURITY.md) para configuração segura

## ⚙️ Configuração Inicial

### 1. Criar arquivo `.env.local`

Copie o exemplo e customize:
```bash
cp .env.local.example .env.local
```

### 2. Gerar Valores Únicos

**Rota dinâmica:**
```env
VITE_ADMIN_PATH=dashboard-seu-valor-unico
```

**Chave secreta (32+ caracteres):**
```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[System.Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. Definir Senha Segura

```env
VITE_ADMIN_PASSWORD=SuaSenhaForteDe12+ caracteres
```

---

## 📝 Como Usar

### Gerenciar Projetos

1. **Novo Projeto**: Clique em "Novo Projeto"
2. **Preencha os dados**:
   - Título (obrigatório)
   - Descrição (obrigatório)
   - URL da Imagem
   - Tecnologias (use Enter ou botão Add)
   - URLs de Demo e GitHub
   - Marque como "Destaque" se necessário

3. **Editar/Deletar**: Use os botões no card do projeto

### Gerenciar Skills

1. **Nova Skill**: Clique em "Nova Skill"
2. **Preencha os dados**:
   - Nome (obrigatório)
   - Ícone/Emoji (obrigatório) - ex: ⚛️, 🐍, 📘
   - Categoria (Frontend, Backend, Ferramentas, Outros)

3. **Editar/Deletar**: Use os botões de ação

## 📦 Estrutura de Dados

### Projeto
```typescript
{
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack';
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}
```

### Skill
```typescript
{
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}
```

## 💾 Armazenamento

Os dados são salvos em **localStorage**:
- `portfolio_projects` - Lista de projetos
- `portfolio_skills` - Lista de skills
- `admin_authenticated` - Status de autenticação
- `admin_login_attempts` - Tentativas de login (rate limiting)
- `admin_audit_logs` - Log de auditoria

### Exportar Dados

Para fazer backup:
```javascript
// No console
const projects = localStorage.getItem('portfolio_projects');
const skills = localStorage.getItem('portfolio_skills');
const logs = localStorage.getItem('admin_audit_logs');

console.log(JSON.parse(projects));
console.log(JSON.parse(skills));
console.log(JSON.parse(logs));
```

### Importar Dados

```javascript
localStorage.setItem('portfolio_projects', JSON.stringify(seusDados));
localStorage.setItem('portfolio_skills', JSON.stringify(seusDados));
```

---

## 🔒 Medidas de Segurança

### 1. Rate Limiting
- **5 tentativas máximas** de login
- Bloqueio de **15 minutos** após falhas
- Contador automático reseta após timeout

### 2. Hash de Senha
Senhas são hasheadas usando SHA-256 antes de serem comparadas.

### 3. Timeout de Sessão
- Sessão expira após **30 minutos** de inatividade
- Deslogamento automático
- Requer nova autenticação

### 4. Validação de Dados
Todos os inputs são validados:
- Caracteres mínimo/máximo
- Formato de URLs
- Categorias permitidas
- Sanitização de HTML/Scripts

### 5. Proteção XSS
Caracteres perigosos são removidos:
```
< > " ' → removidos
```

### 6. Auditoria
Todas as ações são registradas:
```
LOGIN_SUCCESS / LOGIN_FAILED
PROJECT_CREATED / UPDATED / DELETED
SKILL_CREATED / UPDATED / DELETED
LOGOUT
```

**Ver logs:**
```javascript
JSON.parse(localStorage.getItem('admin_audit_logs'))
```

---

## 🎨 Estilo

O painel usa:
- **Cores**: Mesma paleta do portfólio (Slate 800-900)
- **Componentes**: UI components do seu projeto
- **Responsivo**: Funciona em mobile, tablet e desktop
- **Tema Escuro**: Dark mode coeso

## 🔄 Fluxo de Dados

```
Admin Login (Rate Limited)
    ↓
Hash de Senha (SHA-256)
    ↓
Validação e Sanitização
    ↓
localStorage
    ↓
Portfolio Page (lê dados salvos)
```

## 🚨 IMPORTANTE - Segurança em Produção

⚠️ **Este painel com localStorage é adequado para desenvolvimento local, mas em produção você DEVE:**

1. ✅ Alterar a senha padrão
2. ✅ Usar variáveis de ambiente (`.env`)
3. ✅ Gerar rota oculta e única
4. ✅ Implementar autenticação real (Supabase/JWT)
5. ✅ Usar banco de dados remoto
6. ✅ HTTPS obrigatório
7. ✅ Headers de segurança

**Consulte [SECURITY.md](./SECURITY.md) para guia completo!**

## 💾 Armazenamento

Os dados são salvos em **localStorage**:
- `portfolio_projects` - Lista de projetos
- `portfolio_skills` - Lista de skills
- `admin_authenticated` - Status de autenticação
- `admin_login_attempts` - Tentativas de login (rate limiting)
- `admin_audit_logs` - Log de auditoria

### Exportar Dados

Para fazer backup:
```javascript
// No console
const projects = localStorage.getItem('portfolio_projects');
const skills = localStorage.getItem('portfolio_skills');
const logs = localStorage.getItem('admin_audit_logs');

console.log(JSON.parse(projects));
console.log(JSON.parse(skills));
console.log(JSON.parse(logs));
```

### Importar Dados

```javascript
localStorage.setItem('portfolio_projects', JSON.stringify(seusDados));
localStorage.setItem('portfolio_skills', JSON.stringify(seusDados));
```

## 📱 Responsividade

- ✅ Mobile: Stack vertical, botões em coluna
- ✅ Tablet: Grid 2x2
- ✅ Desktop: Grid full com sidebar

## 🐛 Troubleshooting

**Dados não persistem após refresh**
- Verifique se localStorage está ativado
- Limpe o cache do navegador

**Não consigo entrar no admin**
- Verifique a rota configurada em `.env.local`
- Senha padrão é: `admin123`
- Verifique se não está bloqueado por rate limiting

**Estou bloqueado (muitas tentativas)**
- Aguarde 15 minutos
- Ou limpe `localStorage.getItem('admin_login_attempts')`

**Componentes UI não aparecem**
- Verifique imports em `components/ui/*`
- Instale dependências: `npm install` ou `bun install`

## 📚 Próximas Melhorias

- [ ] Integrar com Supabase Database
- [ ] Autenticação com GitHub/Google
- [ ] Upload de imagens com Supabase Storage
- [ ] Dashboard com estatísticas
- [ ] Modo escuro/claro
- [ ] Exportar portfólio como PDF
- [ ] Integração com banco de dados remoto
- [ ] Two-Factor Authentication (2FA)
- [ ] Backup automático na nuvem

---

**Desenvolvido com ❤️ e segurança em mente para Crimson Canvas**
