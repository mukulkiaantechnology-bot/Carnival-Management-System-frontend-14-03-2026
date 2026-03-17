import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, Calendar, 
  User, ClipboardCheck, Download, Image as ImageIcon,
  MessageSquare, FileText
} from 'lucide-react';
import { useInspections } from '../../context/InspectionContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export default function InspectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReportById } = useInspections();
  
  const report = getReportById(id);

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-6 bg-slate-100 rounded-full text-slate-400">
          <FileText size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">No report found</h2>
        <p className="text-slate-500 font-bold">The inspection report you are looking for does not exist.</p>
        <Button variant="secondary" onClick={() => navigate(-1)} className="mt-4 font-black px-8 py-3 rounded-2xl">
          Go Back
        </Button>
      </div>
    );
  }

  const isPass = report.finalResult === 'Pass';

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 px-4 md:px-0">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to list
        </button>
        <Button 
          variant="primary" 
          className="flex items-center gap-3 font-black h-12 px-8 rounded-2xl shadow-xl shadow-brand-gold/20 uppercase tracking-widest text-[10px]"
          onClick={() => window.print()}
        >
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Main Header Section */}
      <div className={`relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 text-white ${
        isPass ? 'bg-emerald-600 shadow-emerald-200/50' : 'bg-rose-600 shadow-rose-200/50'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md">
                <ClipboardCheck size={40} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Inspection Report</p>
                <h1 className="text-4xl font-black tracking-tight leading-none italic">{report.id}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
               <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-sm">
                 {report.type}
               </span>
               <span className="bg-white text-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                 {report.status}
               </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Final Evaluation</p>
             <div className="flex items-center gap-3">
               <span className="text-5xl font-black italic tracking-tighter uppercase">{report.finalResult}</span>
               {isPass ? <CheckCircle2 size={48} className="text-white" /> : <AlertCircle size={48} className="text-white" />}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Checklist Results */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
            <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Audit Checklist</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Detailed verification points</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <ClipboardCheck size={24} />
              </div>
            </div>
            <CardContent className="p-8 space-y-4">
              {Object.entries(report.results).length > 0 ? (
                Object.entries(report.results).map(([q, res], i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-blue-100 transition-all group">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 shadow-sm border border-slate-50">{i + 1}</span>
                      <span className="text-sm font-black text-slate-700 leading-tight">{q}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      res === 'Pass' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-rose-500 text-white shadow-rose-200'
                    }`}>
                      {res}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                  <p className="text-sm font-bold text-slate-400 capitalize">Detailed checklist items were not recorded.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photos Grid */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
             <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Inspection Media</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Visual compliance documentation</p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <ImageIcon size={24} />
                </div>
              </div>
              <CardContent className="p-8">
                {report.photos && report.photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {report.photos.map((photo, i) => (
                      <div key={i} className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
                        <img src={photo} alt={`Inspection point ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                           <p className="text-[10px] font-black text-white uppercase tracking-widest">Evidence Point {i + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center gap-4">
                     <div className="p-4 bg-white rounded-full text-slate-200 shadow-sm"><ImageIcon size={32} /></div>
                     <p className="text-sm font-bold text-slate-400 capitalize">No photographic evidence attached.</p>
                  </div>
                )}
              </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Inspector Details */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspector Name</p>
                    <p className="text-lg font-black text-slate-800 italic">{report.inspector}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Date</p>
                    <p className="text-lg font-black text-slate-800 italic">{report.date}</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
             <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Findings</h3>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <MessageSquare size={20} />
                </div>
              </div>
              <CardContent className="p-8">
                <div className="relative p-6 bg-slate-50 rounded-3xl border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed italic">
                  <div className={`absolute top-0 left-0 w-1 h-full rounded-l-3xl ${isPass ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  "{report.details}"
                </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
