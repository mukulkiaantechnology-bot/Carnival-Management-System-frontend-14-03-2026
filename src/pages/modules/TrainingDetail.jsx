import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Play, Download, Clock, BookOpen, FileText, Video, GraduationCap 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTraining } from '../../context/TrainingContext';

export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { trainings } = useTraining();
  
  const module = trainings.find(m => m.id === parseInt(id)) || trainings[0];

  const backPath = location.pathname.startsWith('/employee-training') 
    ? '/employee-training' 
    : '/hr/training-library';

  if (!module) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-slate-800">Module not found</h2>
        <Button onClick={() => navigate(backPath)} className="mt-4">Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-1 pb-10">
      <button 
        onClick={() => navigate(backPath)} 
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to {location.pathname.startsWith('/employee-training') ? 'Training' : 'Library'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md overflow-hidden bg-slate-900 aspect-video flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="p-5 bg-blue-600 text-white rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300 z-10">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="absolute bottom-6 left-6 text-white z-10">
              <h3 className="text-xl font-bold">{module.title}</h3>
              <p className="text-sm text-slate-300">Module {id} • {module.duration}</p>
            </div>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader title="Description" />
            <CardContent className="p-6">
              <p className="text-slate-600 leading-relaxed">
                {module.description || "Essential training for maintaining carnival standards and safety."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="outline" className="flex items-center gap-2 font-bold border-slate-200">
                  <Download size={18} />
                  Download Notes (PDF)
                </Button>
                <Button variant="outline" className="flex items-center gap-2 font-bold border-slate-200">
                  <Clock size={18} />
                  Mark as Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader title="Module Details" />
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Format</span>
                  <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    {module.type === 'Video' ? <Video size={16} /> : module.type === 'PDF' ? <FileText size={16} /> : <BookOpen size={16} />}
                    {module.type}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                  <span className="text-sm font-bold text-slate-700">{module.duration}</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 tracking-wider">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="p-3 bg-white/20 w-fit rounded-xl">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-lg font-bold leading-tight">Need help with this module?</h3>
              <p className="text-sm text-blue-100 leading-relaxed">Contact your HR supervisor if you have questions about the material or assessment.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold border-none h-11">
                Message HR
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
