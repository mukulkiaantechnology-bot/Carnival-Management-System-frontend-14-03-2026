import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Layout, ArrowRight, CheckCircle2, Building2, User, Mail, Phone, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { PublicNavbar } from '../components/PublicNavbar';

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    email: '',
    phone: '',
    plan: location.state?.selectedPlan || 'Professional',
    duration: location.state?.duration || 'Monthly'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Save to mock storage for platform admin
      const requests = JSON.parse(localStorage.getItem('platform_requests') || '[]');
      const newRequest = {
        ...formData,
        id: `REQ-${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString(),
        status: 'Pending'
      };
      localStorage.setItem('platform_requests', JSON.stringify([newRequest, ...requests]));
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-[3rem] p-16 text-center shadow-2xl shadow-brand-red/10 border border-brand-gold/10 animate-in zoom-in duration-500 overflow-hidden relative">
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full" />
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-red/5 blur-[80px] rounded-full" />
           
           <div className="w-24 h-24 bg-brand-red rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-red/30 relative z-10 group animate-bounce">
              <CheckCircle2 className="text-white group-hover:scale-110 transition-transform" size={48} />
           </div>
           
           <h2 className="text-4xl font-black text-brand-red mb-4 tracking-tight uppercase italic leading-none relative z-10">Request Submitted!</h2>
           <p className="text-slate-500 font-bold mb-12 leading-relaxed italic relative z-10">
             Thank you for joining the <span className="text-brand-red">Showmensinfo</span> ecosystem. Our team is reviewing your application for <span className="text-brand-orange uppercase">{formData.companyName}</span>. Activation details will be sent to <strong className="text-brand-text">{formData.email}</strong> shortly.
           </p>
           
           <button 
             onClick={() => navigate('/')}
             className="w-full py-6 bg-brand-gold text-brand-text rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold-dark transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-gold/20 relative z-10"
           >
             Return to Landing <ArrowRight size={20} />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-20">
        {/* Left Side: Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
           <div className="w-full max-w-xl">
              <button 
                onClick={() => navigate('/pricing')}
                className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-brand-red transition-colors mb-8 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Investment Tiers
              </button>
              
              <h1 className="text-5xl font-black text-brand-red tracking-tight leading-none mb-4 uppercase italic">
                Partner with the <span className="text-brand-orange">Leader</span> in Modern Operations.
              </h1>
              <p className="text-slate-400 font-black mb-12 uppercase tracking-[0.2em] text-[10px] italic">
                Join our premium ecosystem today. Fill out the form below to initiate your company’s 14-day free trial.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Company Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="ABC Carnival Co."
                        className="w-full pl-12 pr-6 py-5 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text placeholder:text-slate-300 shadow-sm"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Selected Tier</label>
                    <div className="relative group">
                      <Check className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <select 
                        className="w-full pl-12 pr-6 py-5 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text appearance-none shadow-sm cursor-pointer"
                        value={formData.plan}
                        onChange={(e) => setFormData({...formData, plan: e.target.value})}
                      >
                        <option>Basic Plan</option>
                        <option>Professional</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Admin Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-12 pr-6 py-5 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text placeholder:text-slate-300 shadow-sm"
                      value={formData.adminName}
                      onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Professional Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <input 
                        required
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full pl-12 pr-6 py-5 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text placeholder:text-slate-300 shadow-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Contact Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-6 py-5 bg-white border border-brand-gold/10 rounded-2xl outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all font-bold text-brand-text placeholder:text-slate-300 shadow-sm"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] leading-relaxed italic">
                  By submitting this request, you agree to our <a href="#" className="underline hover:text-brand-red transition-colors">Service Terms</a> and <a href="#" className="underline hover:text-brand-red transition-colors">Privacy Policy</a>.
                </p>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full py-6 bg-brand-gold text-brand-text rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-brand-gold-dark hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-gold/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>Processing Request <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Submit Company Application <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
           </div>
        </div>

         {/* Right Side: Benefits */}
        <div className="hidden lg:flex w-1/3 bg-brand-dark p-20 flex-col justify-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-full h-full opacity-15">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold blur-[100px] rounded-full"></div>
           </div>
                      <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-10 tracking-tight leading-none uppercase italic border-l-4 border-brand-red pl-6">Join the next generation of carnival management.</h3>
              
              <div className="space-y-10">
                 {[
                   { t: 'Instant Setup', d: 'Your dedicated environment is ready in minutes after approval.' },
                   { t: 'Seamless Migration', d: 'Import your existing data from Excel or CSV easily.' },
                   { t: 'Advanced Security', d: 'Enterprise-grade encryption and automated backups.' },
                   { t: 'Multi-Role Access', d: 'Dashboards for Admin, Operations, Maintenance, and more.' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="bg-brand-red h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-2xl shadow-brand-red/20 group-hover:rotate-12 transition-transform">
                        <Check className="text-white" size={16} strokeWidth={4} />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-[10px] uppercase tracking-widest mb-1.5">{item.t}</h4>
                        <p className="text-white/40 text-xs font-bold leading-relaxed">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
