import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Wrench, AlertTriangle, Clock, 
  User, Calendar, CheckCircle2, AlertCircle,
  Settings, MessageSquare, History, PenTool
} from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export default function WorkOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWorkOrderById, updateWorkOrder } = useMaintenance();
  
  const order = getWorkOrderById(id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-6 bg-slate-100 rounded-full text-slate-400 shadow-inner">
          <Settings size={48} className="animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Work Order Not Found</h2>
        <p className="text-slate-500 font-bold">The maintenance request you are looking for does not exist.</p>
        <Button variant="secondary" onClick={() => navigate(-1)} className="mt-4 font-black px-8 py-3 rounded-2xl shadow-sm">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-600 shadow-emerald-200/50';
      case 'In Progress': return 'bg-blue-600 shadow-blue-200/50';
      case 'Pending': return 'bg-amber-500 shadow-amber-200/50';
      case 'Critical': return 'bg-rose-600 shadow-rose-200/50';
      default: return 'bg-slate-600';
    }
  };

  const handleStatusUpdate = (status) => {
    updateWorkOrder(order.id, { status });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 px-4 md:px-0">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition-all border border-slate-100">
            <ArrowLeft size={16} />
          </div>
          Back to Work Orders
        </button>
        <div className="flex gap-3">
            <Button 
                variant="secondary" 
                className="flex items-center gap-3 font-black h-11 px-6 rounded-xl shadow-sm uppercase tracking-widest text-[10px] bg-white border-slate-100"
                onClick={() => window.print()}
            >
                Print WO
            </Button>
            <Button 
                variant="primary" 
                className="flex items-center gap-3 font-black h-11 px-6 rounded-xl shadow-lg shadow-brand-red/20 uppercase tracking-widest text-[10px]"
            >
                <PenTool size={16} />
                Edit Order
            </Button>
        </div>
      </div>

      {/* Main Header Section */}
      <div className={`relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 text-white ${getStatusColor(order.status)}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md border border-white/20">
                <Wrench size={40} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Maintenance Work Order</p>
                <h1 className="text-4xl font-black tracking-tight leading-none italic uppercase">{order.idStr}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
               <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-sm">
                 {order.equipment}
               </span>
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                   order.priority === 'Critical' ? 'bg-rose-900 text-white' : 
                   order.priority === 'High' ? 'bg-amber-800 text-white' : 'bg-white text-slate-800'
               }`}>
                 {order.priority} Priority
               </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-70 border-b border-white/20 pb-1 mb-1">Current Progress</p>
             <div className="flex items-center gap-4">
               <span className="text-4xl font-black italic tracking-tighter uppercase">{order.status}</span>
               <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20">
                    <Clock size={32} />
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Description */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Issue & Fault Details</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Detailed technical overview</p>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl shadow-sm">
                <AlertTriangle size={24} />
              </div>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="p-7 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Reported Fault</h4>
                 <p className="text-xl font-black text-slate-800 leading-tight mb-4 italic">"{order.issue}"</p>
                 <div className="p-5 bg-white/80 rounded-2xl border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed shadow-inner">
                    {order.details || order.description}
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <History size={14} /> Update Log
                 </h4>
                 <div className="space-y-3">
                    {order.updates && order.updates.length > 0 ? (
                        order.updates.map((update, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                                <div className="text-[10px] font-black text-blue-500 uppercase tracking-tighter shrink-0 pt-1 border-r border-slate-100 pr-4">{update.date}</div>
                                <p className="text-sm font-bold text-slate-600">{update.text}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No activity updates yet.</p>
                        </div>
                    )}
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Status Update */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Settings size={14} /> Mission Control Actions
             </h4>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Pending', 'In Progress', 'Completed'].map((status) => (
                    <button 
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${
                            order.status === status 
                            ? (status === 'Pending' ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-200' :
                               status === 'In Progress' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' :
                               'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200')
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                        {order.status === status && (
                            <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full">
                                <CheckCircle2 size={14} />
                            </div>
                        )}
                        <div className={`p-3 rounded-xl transition-all ${
                             order.status === status ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-white'
                        }`}>
                            {status === 'Pending' && <Clock size={24} />}
                            {status === 'In Progress' && <PenTool size={24} />}
                            {status === 'Completed' && <CheckCircle2 size={24} />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{status}</span>
                    </button>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Assignment Details */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
               <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-100 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all border border-slate-50">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technician</p>
                    <p className="text-xl font-black text-slate-800 italic uppercase tracking-tight">{order.assigned}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-slate-100 rounded-2xl text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all border border-slate-50">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Date</p>
                    <p className="text-xl font-black text-slate-800 italic uppercase tracking-tight">{order.lastService}</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Quick Info Box */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white group">
             <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:rotate-12 transition-transform">
                <Settings size={140} />
             </div>
             <div className="relative z-10">
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Support Note</h4>
                <p className="text-sm font-bold text-slate-300 leading-relaxed italic">
                  "Ensure all safety protocols are followed before initiating work on {order.equipment}. Log all replacement parts used in the maintenance portal."
                </p>
                <Button className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] backdrop-blur-md transition-all">
                  Request Assistance
                </Button>
             </div>
          </div>

          <div className="p-8 bg-brand-navy rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white border border-brand-navy text-center">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2 font-bold italic">Critical Safety Notice</p>
              <p className="text-xs font-black text-brand-red uppercase tracking-widest animate-pulse">LOTO REQUIRED BEFORE SERVICE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
