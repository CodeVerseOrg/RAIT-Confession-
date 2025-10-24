import { useAdminStore } from './stores/adminStore';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

export function AdminRoute() {
  const { isAuthenticated } = useAdminStore();

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  return <AdminDashboard />;
}
