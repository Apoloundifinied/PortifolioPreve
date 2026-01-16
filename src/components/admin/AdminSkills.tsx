import { useState } from 'react';
import { Skill } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { validateSkillData, sanitizeInput, logAdminAction } from '@/utils/securityUtils';

interface AdminSkillsProps {
  skills: Skill[];
  onSave: (skills: Skill[]) => void;
}

const AdminSkills = ({ skills, onSave }: AdminSkillsProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<Skill>({
    name: '',
    icon: '',
    category: 'frontend',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      category: 'frontend',
    });
    setEditingIndex(null);
    setIsAdding(false);
    setValidationErrors([]);
  };

  const startEdit = (index: number) => {
    setFormData(skills[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleSave = () => {
    // Sanitizar dados
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      icon: sanitizeInput(formData.icon),
      category: formData.category as 'frontend' | 'backend' | 'tools' | 'other',
    };

    // Validar dados
    const errors = validateSkillData(sanitizedData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    let updated: Skill[];

    if (editingIndex !== null) {
      updated = skills.map((s, i) => (i === editingIndex ? sanitizedData : s));
      logAdminAction('SKILL_UPDATED', { index: editingIndex, name: sanitizedData.name });
    } else {
      updated = [...skills, sanitizedData];
      logAdminAction('SKILL_CREATED', { name: sanitizedData.name });
    }

    onSave(updated);
    resetForm();
  };

  const handleDelete = (index: number) => {
    if (confirm('Tem certeza que deseja deletar esta skill?')) {
      onSave(skills.filter((_, i) => i !== index));
      logAdminAction('SKILL_DELETED', { index });
    }
  };

  const categories = ['frontend', 'backend', 'tools', 'other'];
  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Ferramentas',
    other: 'Outros',
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setIsAdding(true);
          setEditingIndex(null);
        }}
        className="bg-green-600 hover:bg-green-700"
        disabled={editingIndex !== null || isAdding}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nova Skill
      </Button>

      {/* Form */}
      {(isAdding || editingIndex !== null) && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingIndex !== null ? 'Editar Skill' : 'Nova Skill'}
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
                placeholder="Nome da Skill"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Ícone (emoji ou símbolo)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                maxLength={5}
                className="bg-slate-700 border-slate-600 text-white text-2xl text-center"
              />
            </div>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as 'frontend' | 'backend' | 'tools' | 'other',
                })
              }
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat as keyof typeof categoryLabels]}
                </option>
              ))}
            </select>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 flex-1">
                {editingIndex !== null ? 'Atualizar' : 'Criar'}
              </Button>
              <Button onClick={resetForm} variant="outline" className="border-slate-600 flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills List */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          if (categorySkills.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-3">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map((skill, idx) => {
                  const actualIndex = skills.indexOf(skill);
                  return (
                    <Card
                      key={idx}
                      className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <div>
                            <p className="text-white font-medium">{skill.name}</p>
                            <p className="text-slate-400 text-xs">
                              {categoryLabels[skill.category as keyof typeof categoryLabels]}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEdit(actualIndex)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={editingIndex !== null && editingIndex !== actualIndex}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(actualIndex)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            disabled={editingIndex !== null}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSkills;
