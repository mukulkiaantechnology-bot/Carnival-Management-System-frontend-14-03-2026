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
import PlaceholderPage from './pages/modules/PlaceholderPage';
import WorkOrders from './pages/modules/maintenance/WorkOrders';
import MaintenanceReports from './pages/modules/maintenance/MaintenanceReports';

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const dashboardRoutes = {
    admin: '/admin-dashboard',
    operations: '/operations-dashboard',
    maintenance: '/maintenance/dashboard',
    maintenance_manager: '/maintenance/dashboard',
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
            <Route path="/employees/*" element={<PlaceholderPage title="Employees Module" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/contracts/*" element={<PlaceholderPage title="Contracts Module" />} />
          </Route>

          {/* Operations Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'operations']} />}>
            <Route path="/operations-dashboard" element={<OperationsDashboard />} />
            <Route path="/inspections/*" element={<PlaceholderPage title="Inspections Module" />} />
            <Route path="/events/*" element={<PlaceholderPage title="Events Module" />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          </Route>

          {/* Maintenance Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'maintenance', 'maintenance_manager']} />}>
            <Route path="/maintenance/dashboard" element={<MaintenanceDashboard />} />
            <Route path="/maintenance-dashboard" element={<Navigate to="/maintenance/dashboard" replace />} />
            <Route path="/maintenance/work-orders" element={<WorkOrders />} />
            <Route path="/maintenance/reports" element={<MaintenanceReports />} />
            <Route path="/maintenance/*" element={<PlaceholderPage title="Maintenance Module" />} />
          </Route>

          {/* Ticket Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'ticket']} />}>
            <Route path="/ticket-dashboard" element={<TicketDashboard />} />
            <Route path="/tickets/*" element={<PlaceholderPage title="Tickets Module" />} />
          </Route>

          {/* HR Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/training/*" element={<PlaceholderPage title="Training Module" />} />
          </Route>

          {/* Employee Routes */}
          <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/timeclock" element={<PlaceholderPage title="Time Clock" />} />
          </Route>

          <Route path="*" element={<RootRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
