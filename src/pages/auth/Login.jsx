import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import logo from '../../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard-home', { replace: true });
    } else {
      setError(result.error);
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password'); // Autofill mock password
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-start sm:justify-center p-4 py-8 sm:py-20 relative overflow-y-auto overflow-x-hidden">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-brand-red font-bold transition-all group z-20"
      >
        <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
          <ArrowLeft size={20} />
        </div>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Main Content Wrapper with extra bottom space for mobile browser bars */}
      <div className="max-w-md w-full relative z-10 pt-16 sm:pt-0 pb-32 sm:pb-0">
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-full h-28 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-black text-brand-red tracking-tight uppercase mt-[-1.5rem] italic">Showmensinfo</h1>
          <p className="mt-0.5 text-[10px] font-black text-brand-orange uppercase tracking-[4px]">System Portal</p>
          <p className="mt-4 text-slate-400 text-[8px] font-black uppercase tracking-widest border-t border-brand-gold/20 pt-4 w-full opacity-60">Sign in to your account</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50">
          <CardContent className="p-5 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {error && (
                <div className="p-2.5 text-[11px] text-red-600 bg-red-50 rounded-xl border border-red-100 font-bold">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-3.5 bg-brand-light border border-brand-gold/10 rounded-2xl focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold outline-none transition-all font-bold text-sm text-brand-text shadow-inner"
                  placeholder="admin@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-5 py-3.5 bg-brand-light border border-brand-gold/10 rounded-2xl focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold outline-none transition-all font-bold text-sm text-brand-text shadow-inner"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full h-12 md:h-16 text-[10px] md:text-xs font-black uppercase tracking-[2px] md:tracking-[3px] shadow-2xl shadow-brand-gold/30 rounded-xl md:rounded-2xl">
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 mb-2 font-black uppercase tracking-widest opacity-60">Quick Access (Click to Autofill):</p>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold text-slate-600">
                {[
                  'admin@demo.com', 'ops@demo.com', 
                  'maint@demo.com', 'ticket@demo.com', 
                  'hr@demo.com', 'emp@demo.com'
                ].map(demo => (
                  <button 
                    key={demo}
                    type="button"
                    onClick={() => handleQuickLogin(demo)}
                    className="px-3 py-2 bg-brand-light rounded-xl border border-brand-gold/10 truncate hover:bg-brand-gold/10 hover:border-brand-gold/30 hover:text-brand-red transition-all text-left active:scale-95"
                  >
                    {demo}
                  </button>
                ))}
                <button 
                  type="button"
                  onClick={() => handleQuickLogin('platform@demo.com')}
                  className="px-3 py-2 bg-brand-red/5 rounded-xl border border-brand-red/10 col-span-2 text-center font-black text-brand-red uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all active:scale-95"
                >
                  platform@demo.com (SaaS Admin)
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
