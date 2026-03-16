import React from 'react';
import { ClipboardCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

const MOCK_TASKS = [
  { id: 1, title: 'Ride Safety Check', status: 'Pending', time: '09:00 AM' },
  { id: 2, title: 'Equipment Setup', status: 'Pending', time: '10:30 AM' },
  { id: 3, title: 'Cleaning Area', status: 'Completed', time: '08:00 AM' },
];

export default function MyTasks() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 text-sm">View and manage your assigned tasks for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader 
            title="Daily Task List" 
            subtitle="Follow the checklist and update status as you complete tasks."
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Time</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_TASKS.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            <ClipboardCheck size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-800">{task.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {task.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === 'Completed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
