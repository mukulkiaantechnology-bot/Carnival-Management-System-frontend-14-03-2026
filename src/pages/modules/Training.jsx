import { GraduationCap, Video, BookOpen, CheckCircle, Users, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const MOCK_TRAINING = [
  { id: 1, module: 'Safety Protocol 101', assigned: 120, completion: '95%', status: 'Active' },
  { id: 2, module: 'Customer Service Excellence', assigned: 45, completion: '80%', status: 'Active' },
  { id: 3, module: 'Emergency Response Training', assigned: 120, completion: '60%', status: 'In Progress' },
  { id: 4, module: 'Ticket System Operation', assigned: 15, completion: '100%', status: 'Completed' },
  { id: 5, module: 'Ride Operation Certification', assigned: 30, completion: '40%', status: 'Active' },
];

export default function Training() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Training & Development</h1>
          <p className="text-slate-500 text-sm">Manage employee training modules and monitor progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <BookOpen size={18} />
            Training Library
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Video size={18} />
            Upload Training Video
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader title="Training Library" subtitle="Available courses and materials." />
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Standard Operating Procedures', type: 'PDF', duration: '20 mins' },
                { title: 'Safety Gear Guide', type: 'Video', duration: '15 mins' },
                { title: 'Conflict Resolution', type: 'Video', duration: '45 mins' },
                { title: 'First Aid Basics', type: 'Course', duration: '2 hours' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-lg transition-colors">
                        {item.type === 'Video' ? <Video size={20} /> : <BookOpen size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Employee Progress" subtitle="Tracking completion rates across modules." />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Training Module</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Employees</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Completion Rate</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_TRAINING.map((training) => (
                    <tr key={training.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{training.module}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-slate-400" />
                          {training.assigned}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[100px]">
                            <div 
                              className={`h-full rounded-full ${parseInt(training.completion) > 80 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                              style={{ width: training.completion }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{training.completion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          training.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                          training.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {training.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button variant="secondary" className="h-8 px-2 text-xs">View Stats</Button>
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
