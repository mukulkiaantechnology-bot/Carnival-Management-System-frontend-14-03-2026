import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { TrainingProvider } from './context/TrainingContext';
import { InspectionProvider } from './context/InspectionContext';
import { MaintenanceProvider } from './context/MaintenanceContext';
import { ProtectedRoute } from './app/routes/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import MaintenanceDashboard from './pages/dashboards/maintenance/MaintenanceDashboard';
import EmployeeDashboard from './pages/dashboards/employee/EmployeeDashboard';
import HRDashboard from './pages/dashboards/hr/HRDashboard';

// Shared/Admin Modules
import Employees from './pages/modules/Employees';
import TimeClock from './pages/modules/TimeClock';
import Inspections from './pages/modules/Inspections';
import Maintenance from './pages/modules/Maintenance';
import WorkOrderDetail from './pages/modules/WorkOrderDetail';
import Financial from './pages/modules/Financial';
import TicketSales from './pages/modules/TicketSales';
import Training from './pages/modules/Training';
import TrainingLibrary from './pages/modules/TrainingLibrary';
import EmployeeTraining from './pages/modules/EmployeeTraining';
import AddTraining from './pages/modules/AddTraining';
import TrainingDetail from './pages/modules/TrainingDetail';
import InspectionDetail from './pages/modules/InspectionDetail';
import TrainingProgressDetail from './pages/modules/TrainingProgressDetail';
import Contracts from './pages/modules/Contracts';
import Calendar from './pages/modules/Calendar';
import Reports from './pages/modules/Reports';
import Settings from './pages/modules/Settings';
import MyTasks from './pages/modules/MyTasks';
import EmployeeTimeClock from './pages/dashboards/employee/EmployeeTimeClock';
import EmployeeTasks from './pages/dashboards/employee/EmployeeTasks';
import EmployeeTrainingPersonal from './pages/dashboards/employee/EmployeeTraining';

// Specialized Modules (from Remote)
import PlaceholderPage from './pages/modules/PlaceholderPage';
import WorkOrders from './pages/modules/maintenance/WorkOrders';
import MaintenanceReports from './pages/modules/maintenance/MaintenanceReports';

// Operations Manager Module
import OpsManagerDashboard from './pages/operations/dashboard/OperationsDashboard';
import Events from './pages/operations/events/Events';
import EmployeesView from './pages/operations/employees/EmployeesView';
import OperationsReports from './pages/operations/reports/OperationsReports';

// Ticket Manager Module
import TicketManagerDashboard from './pages/tickets/dashboard/TicketDashboard';
import TicketBoxes from './pages/tickets/boxes/TicketBoxes';
import TicketTracking from './pages/tickets/tracking/TicketTracking';
import Settlement from './pages/tickets/settlement/Settlement';
import TicketBoxDetail from './pages/tickets/boxes/TicketBoxDetail';

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  const dashboardRoutes = {
    admin: '/admin-dashboard',
    operations: '/operations/dashboard',
    operations_manager: '/operations/dashboard',
    maintenance: '/maintenance/dashboard',
    maintenance_manager: '/maintenance/dashboard',
    ticket: '/tickets/dashboard',
    ticket_manager: '/tickets/dashboard',
    hr: '/hr-dashboard',
    employee: '/employee-dashboard',
  };
  
  return <Navigate to={dashboardRoutes[user.role] || '/login'} replace />;
}

export default function App() {
  return (
    <TrainingProvider>
      <InspectionProvider>
        <MaintenanceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<RootRedirect />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/employees/*" element={<Employees />} />
                <Route path="/contracts/*" element={<Contracts />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/time-clock" element={<TimeClock />} />
                <Route path="/inspections" element={<Inspections />} />
                <Route path="/inspections/:id" element={<InspectionDetail />} />
                <Route path="/inspections/*" element={<Inspections />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/maintenance/:id" element={<WorkOrderDetail />} />
                <Route path="/maintenance/*" element={<Maintenance />} />
                <Route path="/calendar/*" element={<Calendar />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/tickets/*" element={<TicketSales />} />
                <Route path="/training/*" element={<Training />} />
              </Route>

              {/* Shared Settings Route (All Roles) */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'operations', 'operations_manager', 'maintenance', 'maintenance_manager', 'ticket', 'ticket_manager', 'hr', 'employee']} />}>
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Operations & Operations Manager Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'operations', 'operations_manager']} />}>
                 <Route path="/operations-dashboard" element={<OpsManagerDashboard />} />
                 <Route path="/operations/dashboard" element={<OpsManagerDashboard />} />
                 <Route path="/operations-inspections" element={<Navigate to="/operations/inspections" replace />} />
                 <Route path="/operations/inspections" element={<Inspections />} />
                 <Route path="/operations/inspections/:id" element={<InspectionDetail />} />
                 <Route path="/operations/maintenance" element={<Maintenance />} />
                 <Route path="/operations/maintenance/:id" element={<WorkOrderDetail />} />
                 <Route path="/operations/events" element={<Events />} />
                 <Route path="/operations/employees" element={<EmployeesView />} />
                 <Route path="/operations/reports" element={<OperationsReports />} />
              </Route>

            {/* Maintenance Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'maintenance', 'maintenance_manager']} />}>
              <Route path="/maintenance/dashboard" element={<MaintenanceDashboard />} />
              <Route path="/maintenance-dashboard" element={<Navigate to="/maintenance/dashboard" replace />} />
              <Route path="/maintenance/work-orders" element={<WorkOrders />} />
              <Route path="/maintenance/reports" element={<MaintenanceReports />} />
              <Route path="/maintenance/special/*" element={<PlaceholderPage title="Maintenance Module" />} />
            </Route>

            {/* Ticket & Ticket Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'ticket', 'ticket_manager']} />}>
              <Route path="/tickets/dashboard" element={<TicketManagerDashboard />} />
              <Route path="/tickets/boxes" element={<TicketBoxes />} />
              <Route path="/tickets/boxes/:id" element={<TicketBoxDetail />} />
              <Route path="/tickets/tracking" element={<TicketTracking />} />
              <Route path="/tickets/settlement" element={<Settlement />} />
            </Route>

            {/* HR Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="/hr/employees/*" element={<Employees />} />
              <Route path="/hr/training-library" element={<TrainingLibrary />} />
              <Route path="/hr/employee-training" element={<EmployeeTraining />} />
              <Route path="/hr/training/add" element={<AddTraining />} />
              <Route path="/hr/training/:id" element={<TrainingDetail />} />
              <Route path="/hr/training-progress/:id" element={<TrainingProgressDetail />} />
              <Route path="/training/all/*" element={<Training />} />
            </Route>

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee-timeclock" element={<EmployeeTimeClock />} />
              <Route path="/employee-tasks" element={<EmployeeTasks />} />
              <Route path="/employee-training" element={<EmployeeTrainingPersonal />} />
              <Route path="/employee-training/module/:id" element={<TrainingDetail />} />
              <Route path="/employee-training/catalog" element={<TrainingLibrary />} />
              {/* Shared Time Clock Link from Remote logic if needed, but we have specific one */}
              <Route path="/time-clock-shared" element={<TimeClock />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<RootRedirect />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </MaintenanceProvider>
      </InspectionProvider>
    </TrainingProvider>
  );
}
