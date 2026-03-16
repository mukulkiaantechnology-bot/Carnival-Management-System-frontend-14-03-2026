import { useState, useEffect } from 'react';
import { Clock, User, LogIn, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Initial mock data if no logs exist
const INITIAL_MOCK_LOGS = [
  { id: 1, date: '2026-03-14', employee: 'John Doe', clockIn: '08:00 AM', clockOut: '04:30 PM', totalHours: '8.5' },
  { id: 2, date: '2026-03-14', employee: 'Jane Smith', clockIn: '09:15 AM', clockOut: '05:45 PM', totalHours: '8.5' },
  { id: 3, date: '2026-03-13', employee: 'Mike Johnson', clockIn: '08:30 AM', clockOut: '05:00 PM', totalHours: '8.5' },
  { id: 4, date: '2026-03-13', employee: 'Sarah Wilson', clockIn: '07:45 AM', clockOut: '04:15 PM', totalHours: '8.5' },
  { id: 5, date: '2026-03-12', employee: 'Robert Brown', clockIn: '09:00 AM', clockOut: '06:00 PM', totalHours: '9.0' },
];

export default function TimeClock() {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('timeClockLogs');
    return savedLogs ? JSON.parse(savedLogs) : INITIAL_MOCK_LOGS;
  });

  const [isClockedIn, setIsClockedIn] = useState(() => {
    return localStorage.getItem('isClockedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('timeClockLogs', JSON.stringify(logs));
    localStorage.setItem('isClockedIn', isClockedIn.toString());
  }, [logs, isClockedIn]);

  const handleClockIn = () => {
    const now = new Date();
    const newLog = {
      id: Date.now(),
      date: now.toISOString().split('T')[0],
      employee: 'Current User', // In a real app, get from AuthContext
      clockIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clockOut: '--:--',
      totalHours: '0.0',
    };
    setLogs([newLog, ...logs]);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();
    const clockOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs];
      if (updatedLogs.length > 0) {
        const latestLog = { ...updatedLogs[0] };
        latestLog.clockOut = clockOutTime;
        
        // Calculate total hours (simplified)
        const inTime = new Date(`${latestLog.date} ${latestLog.clockIn}`);
        const outTime = now;
        const diffMs = outTime - inTime;
        const diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(1);
        latestLog.totalHours = diffHrs > 0 ? diffHrs : '0.1';
        
        updatedLogs[0] = latestLog;
      }
      return updatedLogs;
    });
    setIsClockedIn(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Time Clock</h1>
          <p className="text-slate-500 text-sm">Manage employee attendance and shifts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            className={`flex items-center gap-2 ${isClockedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClockIn}
            disabled={isClockedIn}
          >
            <LogIn size={18} />
            Clock In
          </Button>
          <Button 
            variant="secondary" 
            className={`flex items-center gap-2 ${!isClockedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClockOut}
            disabled={!isClockedIn}
          >
            <LogOut size={18} />
            Clock Out
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader 
          title="Recent Shift Logs" 
          subtitle="A track of all employee clock-in and clock-out times."
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clock In</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clock Out</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{log.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{log.employee}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {log.clockIn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {log.clockOut}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{log.totalHours} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
