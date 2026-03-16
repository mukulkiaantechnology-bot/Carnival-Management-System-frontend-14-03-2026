import React, { useState, useEffect, useCallback } from 'react';
import { Clock, LogIn, LogOut, Coffee, Timer, Calendar as CalendarIcon, ChevronRight, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

// Helper to format duration
const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)));
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function EmployeeTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shiftStatus, setShiftStatus] = useState('Clocked Out'); // 'Clocked In', 'On Break', 'Clocked Out'
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  
  const [logs, setLogs] = useState([
    { id: 1, date: 'Yesterday', clockIn: '08:30 AM', clockOut: '05:00 PM', totalHours: '8.5' },
    { id: 2, date: 'March 14, 2026', clockIn: '09:00 AM', clockOut: '04:30 PM', totalHours: '7.5' },
  ]);

  // Real-time clock and shift timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      if (shiftStatus === 'Clocked In' && clockInTime) {
        setElapsedMs(now.getTime() - clockInTime.getTime());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [shiftStatus, clockInTime]);

  const handleClockIn = () => {
    const now = new Date();
    setShiftStatus('Clocked In');
    setClockInTime(now);
    setElapsedMs(0);
  };

  const handleClockOut = () => {
    const now = new Date();
    const durationHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
    
    const newLog = {
      id: Date.now(),
      date: 'Today',
      clockIn: clockInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clockOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalHours: durationHours.toFixed(2)
    };

    setLogs([newLog, ...logs]);
    setShiftStatus('Clocked Out');
    setClockInTime(null);
    setElapsedMs(0);
  };

  const handleBreakStart = () => {
    setShiftStatus('On Break');
  };

  const handleBreakEnd = () => {
    setShiftStatus('Clocked In');
  };

  // Calculate Weekly Totals
  const weeklyTotal = logs.reduce((acc, log) => acc + parseFloat(log.totalHours), 0).toFixed(1);
  const remainingHours = (40 - parseFloat(weeklyTotal)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Time Clock</h1>
          <p className="text-slate-500 text-sm">Record your working hours and breaks.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Clock size={18} className="text-blue-600" />
          <span className="font-mono font-bold text-slate-700">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card (Left on Desktop) */}
        <Card className="lg:col-span-1 border-none shadow-sm overflow-hidden flex flex-col">
          <div className={`h-2 ${
            shiftStatus === 'Clocked In' ? 'bg-emerald-500' : 
            shiftStatus === 'On Break' ? 'bg-amber-500' : 'bg-slate-300'
          }`} />
          <CardContent className="p-8 text-center flex-1">
            <div className={`inline-flex p-4 rounded-3xl mb-4 ${
              shiftStatus === 'Clocked In' ? 'bg-emerald-50 text-emerald-600' : 
              shiftStatus === 'On Break' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
            }`}>
              <Timer size={48} />
            </div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-1">Current Status</h2>
            <p className={`text-3xl font-black mb-6 ${
              shiftStatus === 'Clocked In' ? 'text-emerald-600' : 
              shiftStatus === 'On Break' ? 'text-amber-600' : 'text-slate-700'
            }`}>
              {shiftStatus}
            </p>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl">
                 <span className="text-xs font-bold text-slate-500 uppercase">Clock In Time</span>
                 <span className="text-sm font-bold text-slate-700">{clockInTime ? clockInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
               </div>
               <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl">
                 <span className="text-xs font-bold text-slate-500 uppercase">Shift Duration</span>
                 <span className="text-sm font-mono font-bold text-blue-600">{formatDuration(elapsedMs)}</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {shiftStatus === 'Clocked Out' ? (
                <Button 
                  variant="primary" 
                  className="col-span-2 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  onClick={handleClockIn}
                >
                  <LogIn size={20} />
                  Clock In
                </Button>
              ) : (
                <>
                  {shiftStatus === 'On Break' ? (
                    <Button 
                      variant="primary" 
                      className="py-4 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl font-bold flex items-center justify-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-100"
                      onClick={handleBreakEnd}
                    >
                      <PlayCircle size={20} />
                      End Break
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      className="py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all"
                      onClick={handleBreakStart}
                    >
                      <Coffee size={20} />
                      Start Break
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    className="py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all font-bold"
                    onClick={handleClockOut}
                  >
                    <LogOut size={20} />
                    Clock Out
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Table & Summary (Right on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader 
              title="Recent Activity" 
              subtitle="Your attendance logs for the current pay period."
              action={
                <button className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tight flex items-center gap-1">
                  View Full History
                  <ChevronRight size={14} />
                </button>
              }
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clock In</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clock Out</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Total Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <CalendarIcon size={14} className="text-slate-400" />
                            {log.date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700">
                            {log.clockIn}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold ${
                            log.clockOut === '---' ? 'bg-slate-50 text-slate-400' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {log.clockOut}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-black text-slate-800">{log.totalHours}h</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Work Summary */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
             <CardHeader title="Weekly Work Summary" subtitle="Calculated based on your recent activity logs." />
             <CardContent className="p-6 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Total</p>
                  <p className="text-xl font-black text-slate-700">{weeklyTotal}h</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Overtime</p>
                  <p className="text-xl font-black text-emerald-600">0.0h</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Scheduled</p>
                  <p className="text-xl font-black text-blue-600">40h</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Remaining</p>
                  <p className="text-xl font-black text-slate-700">{remainingHours}h</p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
