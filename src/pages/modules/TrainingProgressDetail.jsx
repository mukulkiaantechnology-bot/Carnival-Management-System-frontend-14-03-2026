import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Award, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

const MOCK_EMPLOYEES = [
  { id: 101, name: 'John Doe', status: 'Completed' },
  { id: 102, name: 'Jane Smith', status: 'In Progress' },
  { id: 103, name: 'Mike Johnson', status: 'Pending' },
  { id: 104, name: 'Sarah Wilson', status: 'In Progress' },
];

export default function TrainingProgressDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = MOCK_EMPLOYEES.find(e => e.id === parseInt(id)) || MOCK_EMPLOYEES[0];

  return (
    <div className="space-y-6 px-1 pb-10">
      <button 
        onClick={() => navigate('/hr/employee-training')} 
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Staff Training
      </button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-200">
            {employee.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{employee.name}</h1>
            <p className="text-slate-500 font-medium">Staff ID: CMS-{id}</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold text-sm ${
          employee.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
          employee.status === 'In Progress' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-amber-50 border-amber-100 text-amber-700'
        }`}>
          {employee.status === 'Completed' ? <CheckCircle size={18} /> : <Clock size={18} />}
          {employee.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader title="Current Learning Path" subtitle="Assigned modules and their progress." />
            <div className="divide-y divide-slate-50">
              {[
                { title: 'Safety Protocol 101', progress: '100%', date: 'Mar 12, 2026' },
                { title: 'Customer Service Basics', progress: '85%', date: 'In Progress' },
                { title: 'Emergency Response', progress: '0%', date: 'Pending' },
              ].map((item) => (
                <div key={item.title} className="p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 rounded-lg transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{item.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: item.progress }}></div>
                    </div>
                    <span className="text-sm font-black text-slate-700 w-10 text-right">{item.progress}</span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader title="Training History" subtitle="Recently completed certifications." />
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50">
                     <tr>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certification</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 text-sm">
                     <tr>
                       <td className="px-6 py-4 font-bold text-slate-700">Sexual Harassment Prevention</td>
                       <td className="px-6 py-4 text-slate-500 font-medium">Jan 15, 2026</td>
                       <td className="px-6 py-4"><span className="font-bold text-emerald-600">PASSED</span> (98%)</td>
                     </tr>
                     <tr>
                       <td className="px-6 py-4 font-bold text-slate-700">Conflict Resolution</td>
                       <td className="px-6 py-4 text-slate-500 font-medium">Dec 20, 2025</td>
                       <td className="px-6 py-4"><span className="font-bold text-emerald-600">PASSED</span> (92%)</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader title="Overall Stats" />
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certifications</p>
                  <p className="text-xl font-black text-slate-700">12 Earned</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</p>
                  <p className="text-xl font-black text-slate-700">96.4%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hours Tracked</p>
                  <p className="text-xl font-black text-slate-700">42 Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-3">
                <Calendar size={18} />
                <span className="text-sm">Upcoming Deadline</span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-relaxed mb-4">
                "Safety Protocol 101" must be completed by Friday, March 20th.
              </p>
              <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline transition-all">
                Send Reminder Email
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
