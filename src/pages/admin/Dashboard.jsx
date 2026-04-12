import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Package, ShoppingCart, AlertTriangle, 
  Clock, CheckCircle, Loader, DollarSign 
} from 'lucide-react';
import { DASHBOARD_STATS, DUMMY_ORDERS, PRODUCTS } from '../../data/dummyData';

const formatRupiah = (val) => `Rp ${(val / 1000000).toFixed(1)}jt`;

const STATUS_BADGE = {
  PENDING: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700' },
  PROCESSING: { label: 'Diproses', cls: 'bg-blue-100 text-blue-700' },
  PRODUCTION: { label: 'Produksi', cls: 'bg-purple-100 text-purple-700' },
  COMPLETED: { label: 'Selesai', cls: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Dibatalkan', cls: 'bg-red-100 text-red-700' },
};

const lowStockProducts = PRODUCTS.filter(p => p.stock <= p.minStock);

export default function Dashboard() {
  const stats = DASHBOARD_STATS;

  const STAT_CARDS = [
    {
      label: 'Total Pendapatan',
      value: `Rp ${(stats.totalRevenue / 1000000).toFixed(1)}jt`,
      icon: <DollarSign size={24} />,
      color: 'from-emerald-500 to-green-600',
      change: '+12% bulan ini',
    },
    {
      label: 'Total Pesanan',
      value: stats.totalOrders,
      icon: <ShoppingCart size={24} />,
      color: 'from-blue-500 to-blue-600',
      change: '+8 pesanan baru',
    },
    {
      label: 'Total Produk',
      value: stats.totalProducts,
      icon: <Package size={24} />,
      color: 'from-violet-500 to-purple-600',
      change: '8 kategori aktif',
    },
    {
      label: 'Stok Menipis',
      value: stats.lowStockProducts,
      icon: <AlertTriangle size={24} />,
      color: 'from-orange-500 to-red-500',
      change: 'Perlu restock!',
      alert: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang kembali, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {STAT_CARDS.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`bg-gradient-to-r ${s.color} p-5 flex items-center justify-between`}>
              <div className="text-white opacity-90">{s.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.alert ? 'bg-white/30 text-white' : 'bg-white/20 text-white'}`}>
                {s.change}
              </span>
            </div>
            <div className="p-5">
              <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Grafik Pendapatan Bulanan</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tickFormatter={(v) => `${v / 1000000}jt`} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip formatter={(v) => [`Rp ${v.toLocaleString('id-ID')}`, 'Pendapatan']} />
              <Bar dataKey="revenue" fill="#e63946" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={20} className="text-orange-500" />
            <h2 className="text-lg font-bold text-gray-800">Stok Menipis</h2>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto text-green-400 mb-3" />
              <p className="text-gray-500">Semua stok aman</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-100 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600 font-bold">{p.stock}</p>
                    <p className="text-xs text-gray-400">min: {p.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Pesanan Terbaru</h2>
          <a href="/admin/orders" className="text-sm text-primary font-semibold hover:underline">Lihat Semua</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['No. Order', 'Pelanggan', 'Total', 'Status', 'Tanggal'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DUMMY_ORDERS.map((order) => {
                const badge = STATUS_BADGE[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">{order.orderNumber}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">Rp {order.total.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
