import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Eye, Pencil, Trash2, Clock, FileText, BookOpen 
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_TRAINING_MODULES = [
  { id: 1, title: 'Safety Protocol 101', type: 'Video', duration: '45 mins', status: 'Active' },
  { id: 2, title: 'Customer Service Excellence', type: 'Video', duration: '30 mins', status: 'Active' },
  { id: 3, title: 'Emergency Response Training', type: 'Course', duration: '2 hours', status: 'Active' },
  { id: 4, title: 'Ticket System Operation', type: 'PDF', duration: '20 mins', status: 'Active' },
];

export default function TrainingLibrary() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Training Library</h1>
          <p className="text-slate-500 text-sm">Manage and organize carnival training materials.</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate('/hr/training/add');
          }}
        >
          <Video size={18} />
          Upload Training Video
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader title="Available Materials" subtitle="All training videos, PDFs, and courses." />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Training Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Duration</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_TRAINING_MODULES.map((module) => (
                <tr key={module.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-lg transition-colors">
                        {module.type === 'Video' ? <Video size={18} /> : module.type === 'PDF' ? <FileText size={18} /> : <BookOpen size={18} />}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{module.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {module.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} />
                      {module.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" onClick={() => navigate(`/hr/training/${module.id}`)}>
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
