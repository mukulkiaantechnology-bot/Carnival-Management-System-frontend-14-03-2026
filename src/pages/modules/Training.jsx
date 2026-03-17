import React, { useState } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { 
  GraduationCap, Video, BookOpen, Users, Eye, Pencil, 
  Trash2, FileText, Clock, ArrowLeft, Upload 
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

import { useTraining } from '../../context/TrainingContext';

const MOCK_STAFF_TRAINING = [
  { id: 101, name: 'John Doe', assignedTraining: 'Safety Protocol 101', progress: '95%', status: 'Active' },
  { id: 102, name: 'Jane Smith', assignedTraining: 'Customer Service', progress: '80%', status: 'Active' },
  { id: 103, name: 'Mike Johnson', assignedTraining: 'Emergency Response', progress: '60%', status: 'Active' },
  { id: 104, name: 'Sarah Wilson', assignedTraining: 'Safety Protocol 101', progress: '40%', status: 'Active' },
];

export function TrainingForm({ training, onSave, onCancel, title }) {
  const [formData, setFormData] = useState(training || {
    title: '', description: '', type: 'Video', duration: '30 mins'
  });

  return (
    <div className="space-y-6">
      <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-brand-red font-black text-[10px] uppercase tracking-widest transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </button>

      <Card className="max-w-2xl mx-auto border border-brand-gold/20 shadow-xl shadow-brand-gold/5 bg-white">
        <CardHeader title={title} subtitle="Provide all necessary training details." />
        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Training Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Advanced Crowd Management"
              className="w-full px-5 py-3 bg-brand-light border border-brand-gold/10 rounded-xl focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold outline-none transition-all font-bold text-sm text-brand-text shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a brief overview of what this training covers..."
              className="w-full px-5 py-3 bg-brand-light border border-brand-gold/10 rounded-xl focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold outline-none transition-all resize-none font-bold text-sm text-brand-text shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload Video</label>
            <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-brand-gold/10 border-dashed rounded-[2rem] bg-brand-light/50 hover:bg-brand-light transition-colors cursor-pointer group">
              <div className="space-y-1 text-center font-black">
                <Upload className="mx-auto h-12 w-12 text-brand-gold group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                <div className="flex text-xs text-brand-text uppercase tracking-tight">
                  <label className="relative cursor-pointer rounded-md font-black text-brand-red">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept="video/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">HD Video MP4, WebM (Max 250MB)</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="secondary" className="flex-1 font-bold h-12 text-sm rounded-xl" type="button" onClick={onCancel}>Cancel</Button>
            <Button variant="primary" className="flex-1 font-bold h-12 text-sm rounded-xl shadow-lg shadow-brand-red/20" type="submit">Save Training</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function TrainingLibrary({ onUpload }) {
  const { trainings, deleteTraining } = useTraining();
  const navigate = useNavigate();
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm border-none shadow-2xl animate-in zoom-in-95 duration-200 bg-white rounded-[2rem]">
            <div className="p-8 text-center font-black">
              <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-brand-text uppercase italic">Confirm Deletion</h3>
              <p className="text-slate-500 text-[10px] uppercase font-bold mt-2 tracking-widest">Are you sure you want to remove this training module? This action cannot be undone.</p>
              <div className="flex gap-3 mt-8">
                <Button variant="secondary" className="flex-1 font-bold h-12 rounded-xl" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 font-bold h-12 rounded-xl bg-brand-dark text-white hover:bg-black border-none" onClick={() => { deleteTraining(deleteConfirmId); setDeleteConfirmId(null); }}>Delete</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic">Training Library</h1>
          <p className="text-slate-500 text-sm font-bold">Manage and organize carnival training materials.</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center justify-center gap-2 font-black shadow-lg shadow-brand-red/20 py-4 px-8 rounded-2xl"
          onClick={onUpload}
        >
          <Video size={18} />
          Upload Training Video
        </Button>
      </div>

      <Card className="border border-brand-gold/20 shadow-sm overflow-hidden bg-white">
        <CardHeader title="Available Materials" subtitle="All training videos, PDFs, and courses." />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-brand-light">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest">Training Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest text-center">Duration</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {trainings.map((module) => (
                <tr key={module.id} className="hover:bg-brand-light transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-light text-slate-400 group-hover:bg-brand-red group-hover:text-white rounded-xl transition-all shadow-sm">
                        {module.type === 'Video' ? <Video size={18} /> : module.type === 'PDF' ? <FileText size={18} /> : <BookOpen size={18} />}
                      </div>
                      <span className="text-sm font-black text-brand-text uppercase italic">{module.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white text-slate-500 border border-brand-gold/10 shadow-sm">
                      {module.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-brand-orange font-bold uppercase tracking-tight">
                      <Clock size={14} />
                      {module.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="secondary"
                        className="h-9 w-9 !p-0 rounded-xl transition-all shadow-lg shadow-brand-red/20 bg-brand-red text-white border-none"
                        onClick={() => navigate(`/hr/training/${module.id}`)}
                        title="View Module"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="primary"
                        className="h-9 w-9 !p-0 rounded-xl transition-all shadow-lg shadow-brand-gold/20 bg-brand-gold text-brand-text border-none"
                        onClick={() => navigate(`/training/edit/${module.id}`)}
                        title="Edit Module"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        className="h-9 w-9 !p-0 rounded-xl transition-all shadow-lg shadow-black/10 bg-brand-dark text-white border-none hover:bg-black"
                        onClick={() => setDeleteConfirmId(module.id)}
                        title="Delete Module"
                      >
                        <Trash2 size={16} />
                      </Button>
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

function StaffTraining() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic">Staff Training</h1>
          <p className="text-slate-500 text-sm font-bold">Monitor staff learning progress and certification status.</p>
        </div>
      </div>

      <Card className="border border-brand-gold/20 shadow-sm overflow-hidden bg-white">
        <CardHeader title="Training Progress" subtitle="Track completion levels for all staff." />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-brand-light">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest">Staff Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest">Assigned Training</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest">Progress</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-brand-red uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_STAFF_TRAINING.map((emp) => (
                <tr key={emp.id} className="hover:bg-brand-light transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-red font-black text-xs border border-brand-gold/10">
                        {emp.name[0]}
                      </div>
                      <span className="text-sm font-black text-brand-text uppercase italic">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">{emp.assignedTraining}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            parseInt(emp.progress) >= 90 ? 'bg-emerald-500' : 
                            parseInt(emp.progress) >= 50 ? 'bg-blue-500' : 'bg-brand-orange'
                          }`}
                          style={{ width: emp.progress }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-brand-text w-8">{emp.progress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-brand-orange/10 text-brand-orange border border-brand-orange/10'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-[10px] font-black text-brand-red hover:text-brand-red-dark uppercase tracking-widest bg-brand-light px-4 py-2 rounded-xl transition-all"
                      onClick={() => navigate(`/hr/training-progress/${emp.id}`)}
                    >
                      View Progress
                    </button>
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

export default function Training() {
  const navigate = useNavigate();
  const { trainings, addTraining, updateTraining } = useTraining();

  return (
    <div className="px-1 pb-8">
      <Routes>
        <Route path="/training-library" element={<TrainingLibrary onUpload={() => navigate('/training/add')} />} />
        <Route path="/staff-training" element={<StaffTraining />} />
        <Route path="/add" element={
          <TrainingForm 
            title="Upload Training Module" 
            onSave={(data) => {
              addTraining(data);
              navigate('/training/training-library');
            }} 
            onCancel={() => navigate('/training/training-library')} 
          />
        } />
        <Route path="/edit/:id" element={
          <EditTrainingWrapper 
            trainings={trainings} 
            onSave={(id, data) => {
              updateTraining(id, data);
              navigate('/training/training-library');
            }}
            onCancel={() => navigate('/training/training-library')}
          />
        } />
        <Route path="*" element={<TrainingLibrary onUpload={() => navigate('/training/add')} />} />
      </Routes>
    </div>
  );
}

export function EditTrainingWrapper({ trainings, onSave, onCancel }) {
  const { id } = useParams();
  const training = trainings.find(t => t.id.toString() === id);
  if (!training) return <div className="p-8 text-center font-black text-brand-red uppercase italic">Training module not found</div>;
  return (
    <TrainingForm 
      title="Edit Training Module" 
      training={training} 
      onSave={(data) => onSave(training.id, data)} 
      onCancel={onCancel} 
    />
  );
}
