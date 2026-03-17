import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ClipboardCheck, Calendar, GraduationCap, PlayCircle, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
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
      color: shiftStatus === 'Clocked In' ? 'text-emerald-600' : 'text-slate-400', 
      bg: shiftStatus === 'Clocked In' ? 'bg-emerald-50' : 'bg-slate-50' 
    },
    { label: 'Hours This Week', value: '32h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Upcoming Tasks', value: '3', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Training Progress', value: '85%', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Employee Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's your shift overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={shiftStatus === 'Clocked Out' ? 'primary' : 'secondary'}
            className="flex items-center gap-2 font-bold"
            onClick={handleClockIn}
            disabled={shiftStatus === 'Clocked In'}
          >
            <LogIn size={18} />
            Clock In
          </Button>
          <Button 
            variant={shiftStatus === 'Clocked In' ? 'primary' : 'secondary'}
            className="flex items-center gap-2 font-bold border-rose-100 hover:bg-rose-50 hover:text-rose-600"
            onClick={handleClockOut}
            disabled={shiftStatus === 'Clocked Out'}
          >
            <LogOut size={18} />
            Clock Out
          </Button>
        </div>
      </div>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader 
            title="Today's Task List" 
            subtitle="Follow the checklist and update status as you complete tasks."
          />
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3.5 md:p-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${task.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {task.completed ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />}
                    </div>
                    <span className={`text-sm font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {task.title}
                    </span>
                  </div>
                  {!task.completed && (
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tight">
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Reminder & Shift Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-indigo-600 text-white">
            <CardHeader 
              title={<span className="text-white">Training Reminder</span>}
              subtitle={<span className="text-indigo-100">Incomplete required module</span>}
            />
            <CardContent className="p-6 pt-0">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="p-2 bg-white/20 rounded-lg">
                  <PlayCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold">Complete Safety Training</p>
                  <p className="text-xs text-indigo-100 mt-0.5">Estimated time: 15 mins</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full mt-4 bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold"
                onClick={() => navigate('/employee-training')}
              >
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader title="Shift Details" subtitle="Your current shift information." />
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Clock In Time</span>
                <span className="font-bold text-slate-700">{lastClockIn || '--:--'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Scheduled End</span>
                <span className="font-bold text-slate-700">05:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Break Status</span>
                <span className="text-amber-600 font-bold">Upcoming</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
