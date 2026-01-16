import { useState } from 'react';
import { Project } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { validateProjectData, sanitizeInput, logAdminAction } from '@/utils/securityUtils';

interface AdminProjectsProps {
  projects: Project[];
  onSave: (projects: Project[]) => void;
}

const AdminProjects = ({ projects, onSave }: AdminProjectsProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    category: 'fullstack',
    demoUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      category: 'fullstack',
      demoUrl: '',
      githubUrl: '',
      featured: false,
    });
    setTechInput('');
    setEditingId(null);
    setIsAdding(false);
    setValidationErrors([]);
  };

  const startEdit = (project: Project) => {
    setFormData(project);
    setTechInput('');
    setEditingId(project.id);
    setIsAdding(false);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const techs = Array.isArray(formData.technologies) ? formData.technologies : [];
      setFormData({
        ...formData,
        technologies: [...techs, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    const techs = Array.isArray(formData.technologies) ? formData.technologies : [];
    setFormData({
      ...formData,
      technologies: techs.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    // Sanitizar dados
    const sanitizedData = {
      ...formData,
      title: sanitizeInput(formData.title || ''),
      description: sanitizeInput(formData.description || ''),
      image: sanitizeInput(formData.image || ''),
      demoUrl: sanitizeInput(formData.demoUrl || ''),
      githubUrl: sanitizeInput(formData.githubUrl || ''),
      technologies: (formData.technologies || []).map(t => sanitizeInput(t)),
    };

    // Validar dados
    const errors = validateProjectData(sanitizedData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    let updated: Project[];

    if (editingId) {
      updated = projects.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...sanitizedData,
              id: p.id,
            }
          : p
      );
      logAdminAction('PROJECT_UPDATED', { id: editingId, title: sanitizedData.title });
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: sanitizedData.title || '',
        description: sanitizedData.description || '',
        image: sanitizedData.image || '',
        technologies: sanitizedData.technologies || [],
        category: sanitizedData.category || 'fullstack',
        demoUrl: sanitizedData.demoUrl || '',
        githubUrl: sanitizedData.githubUrl || '',
        featured: sanitizedData.featured || false,
      };
      updated = [...projects, newProject];
      logAdminAction('PROJECT_CREATED', { id: newProject.id, title: newProject.title });
    }

    onSave(updated);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      onSave(projects.filter((p) => p.id !== id));
      logAdminAction('PROJECT_DELETED', { id });
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setIsAdding(true);
          setEditingId(null);
        }}
        className="bg-green-600 hover:bg-green-700"
        disabled={editingId !== null || isAdding}
      >
        <Plus className="w-4 h-4 mr-2" />
        Novo Projeto
      </Button>

      {/* Form */}
      {(isAdding || editingId) && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? 'Editar Projeto' : 'Novo Projeto'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationErrors.length > 0 && (
              <Alert className="bg-red-900/30 border-red-700">
                <AlertDescription className="text-red-200">
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Título"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="URL da Imagem"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Textarea
              placeholder="Descrição"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="URL Demo"
                value={formData.demoUrl || ''}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="URL GitHub"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.category || 'fullstack'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
              </select>

              <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-white">Destaque</span>
              </label>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Tecnologias</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tecnologia"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
                <Button onClick={addTechnology} variant="outline" className="border-slate-600">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {Array.isArray(formData.technologies) &&
                  formData.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-blue-600/30 text-blue-200 cursor-pointer flex items-center gap-1"
                    >
                      {tech}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(idx)} />
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 flex-1">
                {editingId ? 'Atualizar' : 'Criar'}
              </Button>
              <Button onClick={resetForm} variant="outline" className="border-slate-600 flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </div>
                {project.featured && (
                  <Badge className="bg-yellow-600/30 text-yellow-200 ml-2">Destaque</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-md"
                />
              )}

              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-slate-700">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => startEdit(project)}
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600"
                  disabled={editingId !== null && editingId !== project.id}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  disabled={editingId !== null}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Deletar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
