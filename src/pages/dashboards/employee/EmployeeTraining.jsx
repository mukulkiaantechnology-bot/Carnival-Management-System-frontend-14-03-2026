import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, PlayCircle, CheckCircle2, Clock, ShieldCheck, Star, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const ASSIGNED_MODULES = [
  { 
    id: 1, 
    title: 'Safety Protocol 101', 
    duration: '45 mins', 
    status: 'Completed', 
    score: '95', 
    icon: ShieldCheck, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50' 
  },
  { 
    id: 2, 
    title: 'Customer Service Excellence', 
    duration: '30 mins', 
    status: 'In Progress', 
    progress: 60, 
    icon: Star, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50' 
  },
  { 
    id: 3, 
    title: 'Emergency Response Training', 
    duration: '60 mins', 
    status: 'Pending', 
    icon: Clock, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50' 
  },
];

// Circular Progress Component
const CircularProgress = ({ percentage, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-emerald-500 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black text-slate-800">{percentage}%</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done</span>
      </div>
    </div>
  );
};

export default function EmployeeTraining() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pb-12">
      {/* Header & Compliance Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-stretch">
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Training</h1>
          <p className="text-slate-500 font-medium">Elevate your skills and stay compliant with carnival-wide safety standards.</p>
        </div>
        
        <Card className="w-full lg:w-auto border-none shadow-sm bg-white min-w-[300px]">
          <CardContent className="p-6 flex items-center gap-6">
            <CircularProgress percentage={85} />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Compliance</p>
              <h3 className="text-lg font-bold text-slate-800">Training Status</h3>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <CheckCircle2 size={14} />
                Ahead of schedule
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {ASSIGNED_MODULES.map((module) => (
          <Card key={module.id} className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col relative h-full">
            {/* Status Badge - Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border ${
                module.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                module.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                'bg-slate-50 text-slate-500 border-slate-100'
              }`}>
                {module.status}
              </span>
            </div>

            <CardContent className="p-8 flex flex-col h-full">
              <div className={`w-14 h-14 rounded-2xl ${module.bg} ${module.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <module.icon size={28} />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {module.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                  <Clock size={14} />
                  Est. Time: {module.duration}
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {module.status === 'Completed' ? (
                  <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Assessment Score</span>
                    <span className="text-xl font-black text-emerald-600">{module.score}%</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Current Progress</span>
                      <span className="text-[11px] font-black text-blue-600">{module.progress || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          module.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${module.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  variant={module.status === 'Completed' ? 'success' : 'primary'}
                  onClick={() => navigate(`/employee-training/module/${module.id}`)}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  {module.status === 'Completed' ? (
                    <>
                      <BookOpen size={18} />
                      Review Content
                    </>
                  ) : (
                    <>
                      <PlayCircle size={18} />
                      {module.status === 'In Progress' ? 'Continue' : 'Start Now'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Section - Modern SaaS Style */}
      <div className="pt-4">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Star className="text-amber-500 fill-amber-500" size={20} />
          Recommended for you
        </h2>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <CardContent className="p-10 relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[2px] backdrop-blur-sm">
                  Top Recommended
                </span>
                <h3 className="text-3xl font-black">Advanced Ride Safety & Mechanical Integrity</h3>
                <p className="text-indigo-50 text-lg max-w-2xl leading-relaxed">
                  Deep dive into hydraulic systems and safety redundancy protocols for high-capacity attractions. Essential for lead operators.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 font-bold text-sm text-indigo-100">
                  <Clock size={18} />
                  Duration: 1h 45m
                </div>
                <div className="flex items-center gap-2 font-bold text-sm text-indigo-100">
                  <ShieldCheck size={18} />
                  Certified Module
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border-none px-10 py-5 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                  onClick={() => navigate('/employee-training/module/1')}
                >
                  Start Training
                </Button>
                <Button 
                  className="bg-indigo-500/30 text-white hover:bg-indigo-500/50 border border-white/20 px-8 py-5 rounded-2xl font-bold transition-all backdrop-blur-sm"
                  onClick={() => navigate('/employee-training/catalog')}
                >
                  View Curriculum
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex w-48 h-48 bg-white/10 rounded-[40px] border border-white/20 rotate-12 items-center justify-center backdrop-blur-md shadow-2xl transition-transform hover:rotate-0 duration-500">
               <GraduationCap size={80} className="text-white drop-shadow-2xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
