import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CheckCircle, Clock, AlertCircle, TrendingUp 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

const MOCK_EMPLOYEE_TRAINING = [
  { id: 101, name: 'John Doe', assignedTraining: 'Safety Protocol 101', progress: '90%', status: 'Completed' },
  { id: 102, name: 'Jane Smith', assignedTraining: 'Customer Service Excellence', progress: '60%', status: 'In Progress' },
  { id: 103, name: 'Mike Johnson', assignedTraining: 'Emergency Response Training', progress: '40%', status: 'Pending' },
  { id: 104, name: 'Sarah Wilson', assignedTraining: 'Safety Protocol 101', progress: '40%', status: 'In Progress' },
];

export default function EmployeeTraining() {
  const navigate = useNavigate();

  const cards = [
    { title: 'Total Staff', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Training Completed', value: '85', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Training In Progress', value: '32', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Training Pending', value: '7', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6 px-1 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Staff Training</h1>
          <p className="text-slate-500 text-sm">Monitor staff training progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
                  <h3 className="text-2xl font-black text-slate-700">{card.value}</h3>
                </div>
                <div className={`p-3 ${card.bg} ${card.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader title="Training Progress" subtitle="Track completion levels for all staff." />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staff Name</th>
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
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                        {emp.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">{emp.assignedTraining}</span>
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
                      emp.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                      emp.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
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
