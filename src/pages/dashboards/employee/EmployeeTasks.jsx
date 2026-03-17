import React from 'react';
import { ClipboardCheck, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

const MOCK_TASKS = [
  { id: 1, title: 'Ride Safety Check - Ferris Wheel', status: 'Pending', time: '09:00 AM', priority: 'High' },
  { id: 2, title: 'Equipment Setup - Ticket Booth 3', status: 'Pending', time: '10:30 AM', priority: 'Medium' },
  { id: 3, title: 'Cleaning Area - Food Court', status: 'Completed', time: '08:00 AM', priority: 'Low' },
  { id: 4, title: 'Inventory Check - Souvenir Shop', status: 'In Progress', time: '11:15 AM', priority: 'High' },
];

export default function EmployeeTasks() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Tasks</h1>
          <p className="text-slate-500 text-sm">Organize and track your daily assignments.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">
          <CheckCircle2 size={18} />
          <span className="text-sm font-bold">1 / 4 Tasks Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader 
            title="Daily Task List" 
            subtitle="Complete tasks and update their status in real-time."
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-16">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Task Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scheduled</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_TASKS.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {task.status === 'Completed' ? (
                            <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600">
                              <CheckCircle2 size={18} />
                            </div>
                          ) : task.status === 'In Progress' ? (
                            <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 animate-pulse">
                              <Clock size={18} />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-full bg-slate-100 text-slate-400">
                              <div className="w-[18px] h-[18px] border-2 border-slate-300 rounded-full" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className={`text-sm font-bold ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Carnival Grounds, Sector B</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          task.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Clock size={14} />
                          {task.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {task.status !== 'Completed' && (
                          <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Mark Done
                          </button>
                        )}
                        {task.status === 'Completed' && (
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                            Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 4 assigned tasks</p>
              <div className="flex gap-2">
                <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
                  <ChevronRight size={16} className="rotate-180" />
                </button>
                <button className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
