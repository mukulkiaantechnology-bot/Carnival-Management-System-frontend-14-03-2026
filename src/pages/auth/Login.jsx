import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-full h-24 mb-6 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain scale-[1.3]" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">Showmensinfo</h1>
          <p className="mt-1 text-[12px] font-black text-blue-600 uppercase tracking-[6px]">System Portal</p>
          <p className="mt-6 text-slate-500 text-sm font-medium border-t border-slate-200 pt-6 w-full">Sign in to your account</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="admin@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full py-2.5 text-base shadow-md shadow-blue-500/20">
                Sign In
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3 font-medium">Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">admin@demo.com</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">ops@demo.com</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">maint@demo.com</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">ticket@demo.com</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">hr@demo.com</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">emp@demo.com</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
