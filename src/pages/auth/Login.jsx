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
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4 relative">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-brand-red font-bold transition-all group"
      >
        <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
          <ArrowLeft size={20} />
        </div>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <div className="max-w-md w-full">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-full h-36 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </div>
          <h1 className="text-4xl font-black text-brand-red tracking-tight uppercase mt-[-2rem] italic">Showmensinfo</h1>
          <p className="mt-1 text-[12px] font-black text-brand-orange uppercase tracking-[6px]">System Portal</p>
          <p className="mt-6 text-slate-400 text-[10px] font-black uppercase tracking-widest border-t border-brand-gold/20 pt-6 w-full opacity-60">Sign in to your account</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50">
          <CardContent className="p-5 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
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

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3 font-medium">Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">admin@demo.com</div>
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">ops@demo.com</div>
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">maint@demo.com</div>
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">ticket@demo.com</div>
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">hr@demo.com</div>
                <div className="p-2 bg-brand-light rounded border border-brand-gold/10">emp@demo.com</div>
                <div className="p-2 bg-brand-red/5 rounded border border-brand-red/10 col-span-2 text-center font-black text-brand-red uppercase tracking-wider">platform@demo.com (SaaS Admin)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
