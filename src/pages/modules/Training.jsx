import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { 
  GraduationCap, Video, BookOpen, CheckCircle, Users, Eye, Pencil, 
  Trash2, ArrowRight, FileText, Clock, ArrowLeft, Upload 
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_TRAINING_MODULES = [
  { id: 1, title: 'Safety Protocol 101', type: 'Video', duration: '45 mins', assigned: 120, completion: '95%', status: 'Active' },
  { id: 2, title: 'Customer Service Excellence', type: 'Video', duration: '30 mins', assigned: 45, completion: '80%', status: 'Active' },
  { id: 3, title: 'Emergency Response Training', type: 'Course', duration: '2 hours', assigned: 120, completion: '60%', status: 'Active' },
  { id: 4, title: 'Ticket System Operation', type: 'PDF', duration: '20 mins', assigned: 15, completion: '100%', status: 'Active' },
];

const MOCK_EMPLOYEE_TRAINING = [
  { id: 101, name: 'John Doe', department: 'Operations', assignedTraining: 'Safety Protocol 101', progress: '95%', status: 'Active' },
  { id: 102, name: 'Jane Smith', department: 'Ticketing', assignedTraining: 'Customer Service', progress: '80%', status: 'Active' },
  { id: 103, name: 'Mike Johnson', department: 'Security', assignedTraining: 'Emergency Response', progress: '60%', status: 'Active' },
  { id: 104, name: 'Sarah Wilson', department: 'Maintenance', assignedTraining: 'Safety Protocol 101', progress: '40%', status: 'Active' },
];

function TrainingUploadForm({ onBack }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </button>

      <Card className="max-w-2xl mx-auto border-none shadow-md">
        <CardHeader title="Upload Training Module" subtitle="Create new educational content for the staff." />
        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Training saved successfully!'); onBack(); }}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Training Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Advanced Crowd Management"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea
              required
              rows={4}
              placeholder="Provide a brief overview of what this training covers..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Upload Video</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-100 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <div className="flex text-sm text-slate-600">
                  <label className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept="video/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">MP4, WebM up to 100MB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="secondary" className="flex-1 font-bold" type="button" onClick={onBack}>Cancel</Button>
            <Button variant="primary" className="flex-1 font-bold shadow-lg shadow-blue-500/20" type="submit">Save Training</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function TrainingLibrary({ onUpload }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
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
            onUpload();
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
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
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

function EmployeeTraining() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Employee Training</h1>
          <p className="text-slate-500 text-sm">Monitor staff learning progress and certification status.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader title="Training Progress" subtitle="Track completion levels for all employees." />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Training</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_EMPLOYEE_TRAINING.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {emp.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{emp.department}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{emp.assignedTraining}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            parseInt(emp.progress) >= 90 ? 'bg-emerald-500' : 
                            parseInt(emp.progress) >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: emp.progress }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 w-8">{emp.progress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tight"
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
  return (
    <div className="px-1 pb-8">
      <Routes>
        <Route path="/training-library" element={<TrainingLibrary onUpload={() => navigate('/hr/training/add')} />} />
        <Route path="/employee-training" element={<EmployeeTraining />} />
        <Route path="/training/add" element={<TrainingUploadForm onBack={() => navigate('/hr/training-library')} />} />
        {/* Redirect for any sub-path not matched, although App.jsx handles the main ones */}
        <Route path="*" element={<TrainingLibrary onUpload={() => navigate('/hr/training/add')} />} />
      </Routes>
    </div>
  );
}
