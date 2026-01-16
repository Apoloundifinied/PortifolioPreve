import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AdminProjects from '../components/admin/AdminProjects';
import AdminSkills from '../components/admin/AdminSkills';
import { projects as defaultProjects, skills as defaultSkills } from '@/data/portfolio';
import { Project, Skill } from '@/types/portfolio';
import SECURITY_CONFIG from '@/config/securityConfig';
import {
  hashPassword,
  checkRateLimit,
  recordLoginAttempt,
  getLoginAttemptInfo,
  resetSessionTimeout,
  logAdminAction,
  generateCSRFToken,
} from '@/utils/securityUtils';
import { AlertTriangle } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [loginError, setLoginError] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedSkills = localStorage.getItem('portfolio_skills');
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedSkills) setSkills(JSON.parse(savedSkills));

    // Verificar se deve reautenticar
    if (isAuth) {
      const lastAction = sessionStorage.getItem('admin_last_action');
      const now = Date.now();

      if (lastAction) {
        const timeDiff = (now - parseInt(lastAction)) / 1000 / 60; // em minutos
        if (timeDiff > SECURITY_CONFIG.SESSION_TIMEOUT) {
          handleLogout();
          return;
        }
      }

      setIsAuthenticated(true);
      generateCSRFToken();
    }

    // Verificar se está bloqueado
    const canLogin = checkRateLimit();
    if (!canLogin) {
      setIsBlocked(true);
      const info = getLoginAttemptInfo();
      setLoginError(`Muitas tentativas. Tente novamente em ${info.blockedUntil?.toLocaleTimeString()}`);
    }
  }, []);

  // Salvar projetos
  const handleSaveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    logAdminAction('PROJECTS_UPDATED', { count: updatedProjects.length });
    resetSessionTimeout();
  };

  // Salvar skills
  const handleSaveSkills = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
    localStorage.setItem('portfolio_skills', JSON.stringify(updatedSkills));
    logAdminAction('SKILLS_UPDATED', { count: updatedSkills.length });
    resetSessionTimeout();
  };

  const handleLogin = async () => {
    setLoginError('');

    // Verificar rate limit
    if (!checkRateLimit()) {
      setIsBlocked(true);
      const info = getLoginAttemptInfo();
      setLoginError(`Muitas tentativas. Tente novamente em ${info.blockedUntil?.toLocaleTimeString()}`);
      logAdminAction('LOGIN_BLOCKED');
      return;
    }

    if (!password.trim()) {
      setLoginError('Digite a senha');
      return;
    }

    try {
      // Hash da senha
      const passwordHash = await hashPassword(password);

      // Comparar com hash da senha padrão
      // Em produção, isso seria feito no servidor
      const defaultPasswordHash = await hashPassword(import.meta.env.VITE_ADMIN_PASSWORD || 'admin123');

      if (passwordHash === defaultPasswordHash) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_last_action', Date.now().toString());
        localStorage.removeItem('admin_login_attempts');
        generateCSRFToken();
        setPassword('');
        logAdminAction('LOGIN_SUCCESS');
        resetSessionTimeout();
      } else {
        recordLoginAttempt(false);
        const info = getLoginAttemptInfo();
        setRemainingAttempts(info.remaining);
        setLoginError(`Senha incorreta. Tentativas restantes: ${info.remaining}`);
        logAdminAction('LOGIN_FAILED', { remainingAttempts: info.remaining });

        if (info.remaining === 0) {
          setIsBlocked(true);
        }
      }
    } catch (error) {
      setLoginError('Erro ao processar login. Tente novamente.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('csrf_token');
    sessionStorage.removeItem('admin_last_action');
    const timeout = sessionStorage.getItem('admin_timeout');
    if (timeout) clearTimeout(parseInt(timeout));
    logAdminAction('LOGOUT');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white">Painel Administrativo</CardTitle>
            <CardDescription>Digite sua senha para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isBlocked && (
              <Alert className="bg-red-900/30 border-red-700">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-200">{loginError}</AlertDescription>
              </Alert>
            )}

            {loginError && !isBlocked && (
              <Alert className="bg-orange-900/30 border-orange-700">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <AlertDescription className="text-orange-200">{loginError}</AlertDescription>
              </Alert>
            )}

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && !isBlocked && handleLogin()}
              disabled={isBlocked}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isBlocked}>
              {isBlocked ? 'Bloqueado - Tente depois' : 'Entrar'}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full border-slate-600 hover:bg-slate-700"
            >
              Voltar ao Portfólio
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Tentativas restantes: {remainingAttempts} / {SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Painel Administrativo</h1>
            <p className="text-slate-400">Gerencie seus projetos e skills</p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <AdminProjects projects={projects} onSave={handleSaveProjects} />
          </TabsContent>

          <TabsContent value="skills">
            <AdminSkills skills={skills} onSave={handleSaveSkills} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
