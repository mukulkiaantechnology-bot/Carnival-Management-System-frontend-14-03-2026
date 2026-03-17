import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ClipboardCheck, Calendar, GraduationCap, PlayCircle, LogIn, LogOut, CheckCircle2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [shiftStatus, setShiftStatus] = useState('Clocked Out');
  const [lastClockIn, setLastClockIn] = useState(null);

  const stats = [
    { 
      label: 'Current Shift Status', 
      value: shiftStatus, 
      icon: Clock, 
      color: shiftStatus === 'Clocked In' ? 'text-emerald-500' : 'text-brand-orange', 
      bg: shiftStatus === 'Clocked In' ? 'bg-emerald-50' : 'bg-brand-orange/10' 
    },
    { label: 'Hours This Week', value: '32h', icon: Clock, color: 'text-brand-red', bg: 'bg-brand-red/10' },
    { label: 'Upcoming Tasks', value: '3', icon: ClipboardCheck, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'Training Progress', value: '85%', icon: GraduationCap, color: 'text-brand-red', bg: 'bg-brand-light' },
  ];

  const todayTasks = [
    { id: 1, title: 'Ride Safety Check', completed: false },
    { id: 2, title: 'Equipment Setup', completed: false },
    { id: 3, title: 'Cleaning Area', completed: true },
  ];

  const handleClockIn = () => {
    setShiftStatus('Clocked In');
    setLastClockIn(new Date().toLocaleTimeString());
  };

  const handleClockOut = () => {
    setShiftStatus('Clocked Out');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">Staff Portal</h1>
          <p className="text-slate-500 text-sm font-bold mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            Welcome back! Operational Pulse is optimal.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant={shiftStatus === 'Clocked Out' ? 'primary' : 'secondary'}
            className="flex items-center gap-3 font-black py-4 px-8 rounded-2xl shadow-lg uppercase tracking-widest text-[10px]"
            onClick={handleClockIn}
            disabled={shiftStatus === 'Clocked In'}
          >
            <LogIn size={20} />
            Clock In
          </Button>
          <Button 
            variant={shiftStatus === 'Clocked In' ? 'primary' : 'secondary'}
            className="flex items-center gap-3 font-black py-4 px-8 rounded-2xl shadow-lg uppercase tracking-widest text-[10px] border-brand-red/10 text-brand-red hover:bg-brand-red/10 transition-all font-bold"
            onClick={handleClockOut}
            disabled={shiftStatus === 'Clocked Out'}
          >
            <LogOut size={20} />
            Clock Out
          </Button>
        </div>
      </div>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="group hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 border border-brand-gold/20 shadow-2xl shadow-brand-gold/10 rounded-[2.2rem] overflow-hidden bg-white">
            <CardContent className="p-8 flex items-center space-x-6 relative text-brand-text">
              <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-inner relative z-10`}>
                <stat.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-2xl font-black text-brand-text tracking-tight italic leading-none">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 flex flex-col border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader 
            title="Today's Task List" 
            subtitle="Follow the checklist and update status as you complete tasks."
          />
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-slate-50 py-2">
              {todayTasks.map((task) => (
                <div key={task.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${task.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-light text-slate-400'} group-hover:scale-110 transition-all`}>
                      {task.completed ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 border-2 border-slate-300 rounded-lg group-hover:border-brand-gold transition-colors" />}
                    </div>
                    <span className={`text-sm font-black tracking-tight ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </span>
                  </div>
                  {!task.completed && (
                    <button className="text-[10px] font-black text-brand-red hover:text-brand-red-dark uppercase tracking-widest bg-brand-light px-4 py-2 rounded-xl transition-all">
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Reminder & Shift Info */}
        <div className="space-y-8">
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <div className="p-8 pb-4">
              <h3 className="text-xl font-black tracking-tight uppercase italic text-brand-red flex items-center gap-3">
                <GraduationCap size={24} className="text-brand-gold" />
                Training Alert
              </h3>
              <p className="text-slate-400 text-[10px] font-black mt-1 uppercase tracking-widest">Incomplete required module</p>
            </div>
            <CardContent className="p-8 pt-0">
              <div className="flex items-center gap-4 bg-brand-light/50 p-5 rounded-2xl border border-brand-gold/5 mb-6 group cursor-pointer hover:bg-brand-light transition-all">
                <div className="p-3 bg-brand-gold rounded-xl shadow-lg shadow-brand-gold/20 group-hover:rotate-6 transition-all">
                  <PlayCircle size={24} className="text-brand-dark" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-brand-text">Safety Training v2.4</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">EST: 15 MINS</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full py-5 font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-brand-red/20 active:scale-95 transition-all"
                onClick={() => navigate('/staff-training')}
              >
                Launch Course
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader title="Shift Details" subtitle="Operational status of your current shift." />
            <CardContent className="p-8 pt-0 space-y-5">
              <div className="flex justify-between items-center bg-brand-light/30 p-4 rounded-2xl border border-brand-gold/5">
                <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Clock In</span>
                <span className="font-black text-brand-dark italic">{lastClockIn || '--:--'}</span>
              </div>
              <div className="flex justify-between items-center bg-brand-light/30 p-4 rounded-2xl border border-brand-gold/5">
                <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">EOD Target</span>
                <span className="font-black text-brand-dark italic">05:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-brand-light/30 p-4 rounded-2xl border border-brand-gold/5">
                <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Break Window</span>
                <span className="text-brand-orange font-black italic">UPCOMING</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
