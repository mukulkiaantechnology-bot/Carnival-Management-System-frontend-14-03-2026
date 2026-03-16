import { useState } from 'react';
import { GraduationCap, Video, BookOpen, CheckCircle, Users, Upload, X, Play, Clock, FileText, CheckCircle2, BarChart3, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const INITIAL_TRAINING = [
  { id: 1, module: 'Safety Protocol 101', assigned: 120, completion: '95%', status: 'Active', category: 'Safety' },
  { id: 2, module: 'Customer Service Excellence', assigned: 45, completion: '80%', status: 'Active', category: 'Operations' },
  { id: 3, module: 'Emergency Response Training', assigned: 120, completion: '60%', status: 'In Progress', category: 'Safety' },
  { id: 4, module: 'Ticket System Operation', assigned: 15, completion: '100%', status: 'Completed', category: 'Technical' },
  { id: 5, module: 'Ride Operation Certification', assigned: 30, completion: '40%', status: 'Active', category: 'Technical' },
];

const LIBRARY_COURSES = [
  { title: 'Standard Operating Procedures', type: 'PDF', duration: '20 mins', category: 'Operations' },
  { title: 'Safety Gear Guide', type: 'Video', duration: '15 mins', category: 'Safety' },
  { title: 'Conflict Resolution', type: 'Video', duration: '45 mins', category: 'HR' },
  { title: 'First Aid Basics', type: 'Course', duration: '2 hours', category: 'Safety' },
  { title: 'Crowd Management', type: 'Video', duration: '30 mins', category: 'Safety' },
  { title: 'POS System Training', type: 'Course', duration: '1.5 hours', category: 'Technical' },
];

// Local Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Training() {
  const [trainingData, setTrainingData] = useState(INITIAL_TRAINING);
  const [activeModal, setActiveModal] = useState(null); // 'library', 'upload', 'stats'
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Upload form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Safety');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const newModule = {
      id: trainingData.length + 1,
      module: newTitle,
      assigned: 0,
      completion: '0%',
      status: 'Active',
      category: newCategory
    };
    setTrainingData([newModule, ...trainingData]);
    setNewTitle('');
    setActiveModal(null);
  };

  const openStats = (training) => {
    setSelectedTraining(training);
    setActiveModal('stats');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Training & Development</h1>
          <p className="text-slate-500 text-sm">Manage employee training modules and monitor progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setActiveModal('library')}>
            <BookOpen size={18} />
            Training Library
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => setActiveModal('upload')}>
            <Video size={18} />
            Upload Training Video
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-sm border-slate-100">
          <CardHeader title="Quick Library" subtitle="Recently updated materials." />
          <CardContent>
            <div className="space-y-3">
              {LIBRARY_COURSES.slice(0, 4).map((item) => (
                <div key={item.title} className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-50/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-lg shadow-sm transition-colors border border-slate-100">
                        {item.type === 'Video' ? <Video size={18} /> : <BookOpen size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                    <Play size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              ))}
              <Button variant="secondary" className="w-full text-xs font-bold mt-2" onClick={() => setActiveModal('library')}>View Full Library</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm border-slate-100">
          <CardHeader title="Employee Progress" subtitle="Tracking completion rates across modules." />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Training Module</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trainingData.map((training) => (
                    <tr key={training.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">{training.module}</p>
                        <p className="text-[10px] font-medium text-slate-400">{training.category}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-bold">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-slate-300" />
                          {training.assigned}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[80px]">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${parseInt(training.completion) === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                              style={{ width: training.completion }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-500">{training.completion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight ${
                          training.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          training.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {training.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-widest" onClick={() => openStats(training)}>View Stats</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Library Modal */}
      <Modal isOpen={activeModal === 'library'} onClose={() => setActiveModal(null)} title="Training Library" maxWidth="max-w-2xl">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIBRARY_COURSES.map((item) => (
              <div key={item.title} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group flex items-start gap-4 cursor-pointer">
                <div className="p-3 bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl shadow-sm border border-slate-100 transition-colors">
                  {item.type === 'Video' ? <Video size={24} /> : <BookOpen size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest">{item.category}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><Clock size={12} /> {item.duration}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-tight mb-2">{item.title}</p>
                  <Button variant="secondary" className="h-7 px-3 text-[10px] font-black uppercase tracking-widest">Start Module</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Upload Modal */}
      <Modal isOpen={activeModal === 'upload'} onClose={() => setActiveModal(null)} title="Upload Training Content">
        <form className="space-y-5" onSubmit={handleUpload}>
          <div className="p-8 border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/30 text-center group hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
              <Upload size={32} />
            </div>
            <p className="text-sm font-bold text-slate-800">Drop video here or click to browse</p>
            <p className="text-xs text-slate-500 mt-1">MP4, MKV up to 500MB</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Module Title</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
              placeholder="e.g. Guest Interaction Protocol"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 bg-white"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option>Safety</option>
              <option>Operations</option>
              <option>Technical</option>
              <option>HR</option>
            </select>
          </div>
          <Button variant="primary" className="w-full py-3 font-bold uppercase tracking-widest text-xs" type="submit">Publish Module</Button>
        </form>
      </Modal>

      {/* Stats Modal */}
      <Modal isOpen={activeModal === 'stats'} onClose={() => setActiveModal(null)} title="Module Statistics">
        {selectedTraining && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 border border-blue-50 rounded-2xl">
                <BarChart3 size={20} className="text-blue-500 mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion</p>
                <p className="text-2xl font-black text-slate-800">{selectedTraining.completion}</p>
              </div>
              <div className="p-4 bg-emerald-50/50 border border-emerald-50 rounded-2xl">
                <Users size={20} className="text-emerald-500 mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned</p>
                <p className="text-2xl font-black text-slate-800">{selectedTraining.assigned}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Engagement Breakdown</p>
              {[
                { label: 'Watched Full Video', count: Math.round(selectedTraining.assigned * 0.7), color: 'bg-emerald-500' },
                { label: 'Incomplete', count: Math.round(selectedTraining.assigned * 0.2), color: 'bg-blue-500' },
                { label: 'Not Started', count: Math.round(selectedTraining.assigned * 0.1), color: 'bg-slate-200' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 border border-slate-50 rounded-2xl bg-slate-50/30 group hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">{stat.label}</span>
                    <span className="text-xs font-black text-slate-500">{stat.count} Employees</span>
                  </div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={`h-full ${stat.color} transition-all duration-700`} 
                      style={{ width: `${(stat.count / selectedTraining.assigned) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" className="w-full font-bold py-3 uppercase tracking-widest text-xs flex items-center justify-center gap-2" onClick={() => setActiveModal(null)}>
              <FileText size={16} />
              Export Full Report
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
