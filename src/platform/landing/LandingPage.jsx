import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Star, Zap, Shield, BarChart3, Users, Clock, Globe } from 'lucide-react';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PricingSection } from './PricingSection';
import logo from '../../assets/logo.png';

export default function LandingPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-red blur-[120px] rounded-full animate-pulse transition-all duration-1000"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-brand-gold blur-[100px] rounded-full animate-pulse transition-all duration-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 flex justify-center">
            <div className="h-24 w-auto scale-110">
               <img src={logo} alt="Showmensinfo Logo" className="h-full w-auto object-contain" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light border border-brand-gold/20 mb-8 animate-bounce">
            <Star className="text-brand-orange" size={16} fill="currentColor" />
            <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Next-Gen Carnival Management</span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black text-brand-red tracking-tight leading-none mb-4 uppercase italic">
            Showmens<span className="text-brand-orange">info</span>
          </h1>
          
          <h2 className="text-2xl lg:text-4xl font-black text-brand-text tracking-tight mb-8 uppercase italic leading-none opacity-80">
            Manage Operations Like Never Before.
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-12 font-medium">
            The world's first comprehensive SaaS platform designed specifically for carnival owners, 
            operations managers, and maintenance teams. Real-time tracking, financial insights, and automated scheduling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link 
              to={user ? "/dashboard-home" : "/signup"} 
              className="w-full sm:w-auto px-10 py-6 bg-brand-gold text-brand-text rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold-dark hover:scale-105 transition-all shadow-2xl shadow-brand-gold/20 flex items-center justify-center gap-3"
            >
              {user ? "Go to Dashboard" : "Start Free Trial"} <ArrowRight size={22} />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto px-10 py-6 bg-brand-light text-brand-red border border-brand-gold/20 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              View Features
            </a>
          </div>

        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-12">Trusted by Global Operations</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-2xl font-black text-slate-900 italic">CARNIVALCO</div>
             <div className="text-2xl font-black text-slate-900 uppercase">Wonderland</div>
             <div className="text-2xl font-black text-slate-900 tracking-tighter">GLOBALRIDES</div>
             <div className="text-2xl font-black text-slate-900 lowercase">magic.parks</div>
             <div className="text-2xl font-black text-slate-900">SKYLINE EXPRESS</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mb-4">Core Ecosystem</h2>
            <h3 className="text-4xl lg:text-6xl font-black text-brand-red tracking-tight leading-none uppercase italic">
              Everything you need to <span className="text-brand-orange">scale</span> your carnival business.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-red hover:shadow-2xl hover:shadow-brand-red/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-red/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all shadow-inner relative z-10">
                  <BarChart3 className="text-brand-red group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Financial Intelligence</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  Deep insights into your revenue, expenses and gross profit with automated reporting and export.
               </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-orange/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-inner relative z-10">
                  <Shield className="text-brand-orange group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Safety & Inspections</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  Real-time safety checks and detailed inspection reports to ensure compliance and unit safety.
               </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-gold hover:shadow-2xl hover:shadow-brand-gold/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-gold/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all shadow-inner relative z-10">
                  <Users className="text-brand-gold group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Workforce Management</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  Track employee schedules, training progress, and time clock activity across all locations.
               </p>
            </div>
            
            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-orange/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-inner relative z-10">
                  <Zap className="text-brand-orange group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Predictive Maintenance</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  AI-driven alerts for ride repairs and parts management before breakdowns occur.
               </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-red hover:shadow-2xl hover:shadow-brand-red/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-red/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all shadow-inner relative z-10">
                  <Clock className="text-brand-red group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Timeline Scheduler</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  A unified calendar for managing multiple event locations and moving units simultaneously.
               </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-gold/10 hover:border-brand-gold hover:shadow-2xl hover:shadow-brand-gold/5 transition-all group overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-gold/5 transition-colors" />
               <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all shadow-inner relative z-10">
                  <Globe className="text-brand-gold group-hover:text-white" size={32} />
               </div>
               <h4 className="text-xl font-black text-brand-text mb-4 uppercase italic tracking-tight relative z-10">Global Operations</h4>
               <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  Centralize your entire multi-city carnival circuit into one high-performance dashboard.
               </p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      {/* CTA Section */}
      <section id="contact" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand-red rounded-[3rem] px-8 py-20 lg:p-24 overflow-hidden text-center shadow-2xl shadow-brand-red/20 border border-brand-red-dark/20">
             <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold/10 blur-[100px] rounded-full"></div>
             <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-orange/10 blur-[100px] rounded-full"></div>
             
             <div className="relative z-10">
                <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tight mb-8 uppercase italic leading-none">
                  Ready to modernize your <br className="hidden lg:block" /> carnival operations?
                </h2>
                <p className="mx-auto max-w-xl text-lg text-white/80 mb-12 font-bold italic uppercase tracking-widest text-sm">
                  Join 50+ carnival companies already using our platform to maximize efficiency and safety.
                </p>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center gap-3 px-12 py-6 bg-brand-gold text-brand-text rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold-dark hover:scale-105 transition-all shadow-2xl shadow-brand-dark/20"
                >
                  Create Your Company <ArrowRight size={24} />
                </Link>
             </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
