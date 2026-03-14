import { useState } from 'react';
import { 
  Users, ClipboardCheck, Wrench, DollarSign, Clock, 
  CheckCircle, AlertCircle, ArrowUpRight, TrendingUp,
  Download, ExternalLink, RefreshCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const STATS = [
  { label: 'Total Employees', value: '142', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Open Inspections', value: '8', icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Maintenance Alerts', value: '3', icon: Wrench, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Weekly Sales', value: '$42,500', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const RECENT_ACTIVITIES = [
  { id: 1, type: 'inspection', text: 'Daily Ride Check completed by John Doe', time: '10 mins ago', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { id: 2, type: 'maintenance', text: 'New alert: Ferris Wheel squeaking sound', time: '25 mins ago', icon: AlertCircle, iconColor: 'text-rose-500', bgColor: 'bg-rose-50' },
  { id: 3, type: 'timeclock', text: 'Mike Johnson clocked in at South Gate', time: '45 mins ago', icon: Clock, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { id: 4, type: 'financial', text: 'Expense report for Supplies approved', time: '2 hours ago', icon: DollarSign, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { id: 5, type: 'contract', text: 'Drafted contract for Summer Gala 2026', time: '3 hours ago', icon: ArrowUpRight, iconColor: 'text-slate-500', bgColor: 'bg-slate-50' },
];

const CHART_DATA = [
  { day: 'Mon', value: 4500 },
  { day: 'Tue', value: 6000 },
  { day: 'Wed', value: 3500 },
  { day: 'Thu', value: 8000 },
  { day: 'Fri', value: 5500 },
  { day: 'Sat', value: 9500 },
  { day: 'Sun', value: 7500 },
];

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotification('Dashboard data refreshed!');
    }, 1000);
  };

  const handleDownload = () => {
    showNotification('Preparing system report for download...');
  };

  const handleViewAll = () => {
    showNotification('Loading full activity history...');
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            {notification}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <ExternalLink size={18} />
            Live Preview
          </Button>
        </div>
      </div>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="group hover:border-blue-200 transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={26} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 mb-0.5">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
        {/* Recent Activities Feed */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader 
            title="Recent Activity" 
            subtitle="Latest updates across all modules." 
          />
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-slate-50">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="p-4 flex gap-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <div className={`w-10 h-10 rounded-full ${activity.bgColor} ${activity.iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <activity.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-tight truncate">{activity.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t border-slate-50 text-center">
            <button 
              onClick={handleViewAll}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 mx-auto"
            >
              View All Activity <ArrowUpRight size={14} />
            </button>
          </div>
        </Card>

        {/* System Overview Visual Mock */}
        <Card className="lg:col-span-3">
          <CardHeader title="System Overview" subtitle="Revenue trends for the current week." />
          <CardContent className="pb-4">
            <div className="h-[280px] w-full flex flex-col justify-end pt-4">
              {/* Graph Container */}
              <div className="flex-1 flex items-end justify-between gap-3 px-2 mb-2">
                {CHART_DATA.map((data, i) => {
                  const maxVal = Math.max(...CHART_DATA.map(d => d.value));
                  const heightPercentage = (data.value / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${data.value.toLocaleString()}
                      </div>
                      
                      {/* Bar */}
                      <div className="w-full bg-blue-50 rounded-t-lg group-hover:bg-blue-100 transition-colors h-full flex flex-col justify-end overflow-hidden">
                        <div 
                          className="w-full bg-blue-500 rounded-t-lg group-hover:bg-blue-600 transition-all duration-700 ease-out"
                          style={{ height: `${heightPercentage}%` }}
                        />
                      </div>
                      
                      {/* Label */}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{data.day}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Stats Footer */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Revenue</p>
                    <p className="text-lg font-bold text-slate-800">$50,000</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Actual Sales</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-slate-800">$42,500</p>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <TrendingUp size={12} /> 12.5%
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className="px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2 border border-transparent hover:border-blue-100"
                >
                  <Download size={14} /> Download Report
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
