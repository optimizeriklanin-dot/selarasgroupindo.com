import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Users, 
  FileText,
  LogOut,
  Menu,
  X 
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MENU_ITEMS = [
  { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
  { path: '/admin/products', icon: <Package size={20} />, label: 'Produk & Stok' },
  { path: '/admin/payments', icon: <CreditCard size={20} />, label: 'Pembayaran' },
  { path: '/admin/shipping', icon: <Truck size={20} />, label: 'Pengiriman' },
  { path: '/admin/customers', icon: <Users size={20} />, label: 'Pelanggan' },
  { path: '/admin/articles', icon: <FileText size={20} />, label: 'Artikel' },
  { path: '/admin/reports', icon: <FileText size={20} />, label: 'Laporan' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-75 lg:hidden"
           onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-20 px-6 bg-gray-900 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <img src="/logo.png" alt="SSS Logo" className="h-10 w-auto bg-white rounded p-1" />
            </Link>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4 space-y-2">
              {MENU_ITEMS.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white font-medium shadow-md' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 bg-gray-900 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {MENU_ITEMS.find(i => location.pathname.startsWith(i.path))?.label || 'Panel Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-800">{user?.name || 'Admin'}</span>
              <span className="text-xs text-gray-500">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-grow">
            <Outlet />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500 pb-4">
            Copyright 2026 | Web Dev by: <a href="http://www.iklanin.my.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.iklanin.my.id</a>
          </div>
        </main>
      </div>
    </div>
  );
}
