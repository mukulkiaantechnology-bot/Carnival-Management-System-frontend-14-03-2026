import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './app/routes/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import OperationsDashboard from './pages/dashboards/operations/OperationsDashboard';
import MaintenanceDashboard from './pages/dashboards/maintenance/MaintenanceDashboard';
import TicketDashboard from './pages/dashboards/ticket/TicketDashboard';
import HRDashboard from './pages/dashboards/hr/HRDashboard';
import EmployeeDashboard from './pages/dashboards/employee/EmployeeDashboard';
import Employees from './pages/modules/Employees';
import TimeClock from './pages/modules/TimeClock';
import Inspections from './pages/modules/Inspections';
import Maintenance from './pages/modules/Maintenance';
import Financial from './pages/modules/Financial';
import TicketSales from './pages/modules/TicketSales';
import Training from './pages/modules/Training';
import Contracts from './pages/modules/Contracts';
import Calendar from './pages/modules/Calendar';
import Reports from './pages/modules/Reports';
import Settings from './pages/modules/Settings';

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const dashboardRoutes = {
    admin: '/admin-dashboard',
    operations: '/operations-dashboard',
    maintenance: '/maintenance-dashboard',
    ticket: '/ticket-dashboard',
    hr: '/hr-dashboard',
    employee: '/employee-dashboard'
  };
  return <Navigate to={dashboardRoutes[user.role] || '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<RootRedirect />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/employees/*" element={<Employees />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contracts/*" element={<Contracts />} />
            <Route path="/financial" element={<Financial />} />
          </Route>

          {/* Operations Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'operations']} />}>
            <Route path="/operations-dashboard" element={<OperationsDashboard />} />
            <Route path="/inspections/*" element={<Inspections />} />
            <Route path="/calendar/*" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Maintenance Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'maintenance']} />}>
            <Route path="/maintenance-dashboard" element={<MaintenanceDashboard />} />
            <Route path="/maintenance/*" element={<Maintenance />} />
          </Route>

          {/* Ticket Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'ticket']} />}>
            <Route path="/ticket-dashboard" element={<TicketDashboard />} />
            <Route path="/tickets/*" element={<TicketSales />} />
          </Route>

          {/* HR Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/training/*" element={<Training />} />
          </Route>

          {/* Employee Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/time-clock" element={<TimeClock />} />
          </Route>

          <Route path="*" element={<RootRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
