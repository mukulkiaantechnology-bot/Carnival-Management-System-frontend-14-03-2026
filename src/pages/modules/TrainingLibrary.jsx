import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Video, Eye, Pencil, Trash2, Clock, FileText, BookOpen,
  Search, Filter, CheckCircle2, AlertCircle, X, ArrowLeft
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTraining } from '../../context/TrainingContext';

export default function TrainingLibrary() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEmployeeView = location.pathname.startsWith('/staff-training');
  
  const { trainings, deleteTraining } = useTraining();
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id, title) => {
    deleteTraining(id);
    showNotification(`"${title}" has been removed from the library.`);
  };

  const filteredTrainings = trainings.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 px-1 relative pb-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.25rem] shadow-2xl flex items-center gap-4 border border-slate-800">
            <div className="bg-rose-500/20 p-2 rounded-xl">
              <AlertCircle size={18} className="text-rose-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {isEmployeeView && (
            <button 
              onClick={() => navigate('/staff-training')}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {isEmployeeView ? 'Training Catalog' : 'Training Library'}
            </h1>
            <p className="text-slate-500 text-sm font-bold">
              {isEmployeeView ? 'Browse all available training modules.' : 'Manage and organize carnival training materials.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-bold w-64 shadow-sm"
            />
          </div>
          {!isEmployeeView && (
            <Button
              variant="primary"
              className="flex items-center justify-center gap-2 font-black shadow-xl shadow-blue-500/20 py-2.5 sm:py-3 px-6 sm:px-8"
              onClick={() => navigate('/hr/training/add')}
            >
              <Video size={18} />
              Upload Training
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-xl shadow-slate-100/50 overflow-hidden">
        <CardHeader 
          title="Available Materials" 
          subtitle={isEmployeeView ? "Explore assigned and optional learning resources." : "All training videos, PDFs, and courses."} 
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Training Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Type</th>
                {!isEmployeeView && <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Assigned</th>}
                {!isEmployeeView && <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Completion</th>}
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTrainings.map((module) => (
                <tr key={module.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-[1rem] transition-all shadow-sm group-hover:shadow-blue-200 group-hover:-rotate-6">
                        {module.type === 'Video' ? <Video size={18} /> : module.type === 'PDF' ? <FileText size={18} /> : <BookOpen size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 leading-tight">{module.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 italic">{module.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-100/50 text-slate-500 border border-slate-200/50">
                      {module.type}
                    </span>
                  </td>
                  {!isEmployeeView && (
                    <td className="px-8 py-5 text-center">
                      <span className="text-sm font-black text-slate-700">{module.assigned} Staff</span>
                    </td>
                  )}
                  {!isEmployeeView && (
                    <td className="px-8 py-5 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-xs font-black text-blue-600">{module.completion}</span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: module.completion }} />
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button
                        className="p-2.5 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-slate-100"
                        onClick={() => navigate(isEmployeeView ? `/staff-training/module/${module.id}` : `/hr/training/${module.id}`)}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      {!isEmployeeView && (
                        <>
                          <button
                            className="p-2.5 hover:text-brand-orange bg-slate-50 hover:bg-brand-orange/10 rounded-xl transition-all shadow-sm border border-slate-100"
                            onClick={() => showNotification("Edit functionality is coming soon.")}
                            title="Edit Module"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="p-2.5 hover:text-brand-red bg-slate-50 hover:bg-brand-red/10 rounded-xl transition-all shadow-sm border border-slate-100"
                            onClick={() => handleDelete(module.id, module.title)}
                            title="Delete Module"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTrainings.length === 0 && (
            <div className="p-20 text-center bg-slate-50/30">
              <Search size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                No training materials matching "{searchTerm}"
              </p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
