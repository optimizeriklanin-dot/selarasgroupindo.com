import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { DASHBOARD_STATS, DUMMY_ORDERS } from '../../data/dummyData';

const MONTHLY = DASHBOARD_STATS.monthlyRevenue;
const DAILY = [
  { day: 'Sen', revenue: 1200000, orders: 2 },
  { day: 'Sel', revenue: 2800000, orders: 4 },
  { day: 'Rab', revenue: 1900000, orders: 3 },
  { day: 'Kam', revenue: 3200000, orders: 5 },
  { day: 'Jum', revenue: 2100000, orders: 3 },
  { day: 'Sab', revenue: 1500000, orders: 2 },
];

export default function Reports() {
  const [period, setPeriod] = useState('monthly');

  const totalMonthly = MONTHLY.reduce((a, m) => a + m.revenue, 0);
  const avgMonthly = Math.round(totalMonthly / MONTHLY.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Laporan Penjualan</h1>
          <p className="text-gray-500 mt-1">Analitik & ringkasan bisnis perusahaan</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm"
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            onClick={() => {
              const content = "Bulan,Pendapatan\n" + MONTHLY.map(m => `${m.month},${m.revenue}`).join('\n');
              const blob = new Blob([content], { type: 'text/csv' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = "Data_Pendapatan_SSS.csv";
              link.click();
            }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm"
          >
            <Download size={16} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendapatan Tahunan', value: `Rp ${(totalMonthly / 1000000).toFixed(1)}jt`, icon: <TrendingUp size={20} />, color: 'text-green-600 bg-green-50' },
          { label: 'Rata-rata/Bulan', value: `Rp ${(avgMonthly / 1000000).toFixed(1)}jt`, icon: <Calendar size={20} />, color: 'text-blue-600 bg-blue-50' },
          { label: 'Bulan Terbaik', value: 'November', icon: <TrendingUp size={20} />, color: 'text-purple-600 bg-purple-50' },
          { label: 'Bulan Terlemah', value: 'Januari', icon: <TrendingDown size={20} />, color: 'text-orange-600 bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Period Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800">Grafik Pendapatan</h2>
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            {['daily', 'monthly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  period === p ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {p === 'daily' ? 'Harian' : 'Bulanan'}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={period === 'monthly' ? MONTHLY : DAILY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={period === 'monthly' ? 'month' : 'day'} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip formatter={(v) => [`Rp ${v.toLocaleString('id-ID')}`, 'Pendapatan']} />
            <Bar dataKey="revenue" fill="#e63946" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Status Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Distribusi Status Order</h2>
          <div className="space-y-4">
            {[
              { label: 'Selesai', count: 12, color: 'bg-green-500' },
              { label: 'Produksi', count: 8, color: 'bg-purple-500' },
              { label: 'Diproses', count: 5, color: 'bg-blue-500' },
              { label: 'Pending', count: 3, color: 'bg-yellow-500' },
            ].map((s, i) => {
              const pct = Math.round((s.count / 28) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{s.label}</span>
                    <span className="text-gray-500">{s.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Produk Terlaris
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Tas Seminar Premium D-600', orders: 18, revenue: 6300000 },
              { name: 'Goodie Bag Spunbond Press', orders: 15, revenue: 750000 },
              { name: 'Ransel Corporate 1680D', orders: 10, revenue: 850000 },
              { name: 'Tas Promosi Eco Bag Canvas', orders: 8, revenue: 1200000 },
              { name: 'Tas Laptop Sleeve 14"', orders: 5, revenue: 2250000 },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                  i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-400' : 'bg-gray-300'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.orders} order</p>
                </div>
                <span className="text-sm font-bold text-primary whitespace-nowrap">
                  Rp {(p.revenue / 1000000).toFixed(1)}jt
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
