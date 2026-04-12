import { useState } from 'react';
import { Search, UserCircle2, Phone, Mail, ShoppingBag } from 'lucide-react';

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'PT Maju Bersama', email: 'maju@email.com', phone: '0812111000', address: 'Jakarta Selatan', totalOrders: 3, totalSpend: 12500000, lastOrder: '2026-04-01' },
  { id: 2, name: 'CV Sejahtera', email: 'sejahtera@email.com', phone: '0812222000', address: 'Bandung', totalOrders: 2, totalSpend: 4500000, lastOrder: '2026-04-03' },
  { id: 3, name: 'PT Global Tech', email: 'global@tech.com', phone: '0812333000', address: 'Surabaya', totalOrders: 5, totalSpend: 28500000, lastOrder: '2026-04-05' },
  { id: 4, name: 'Dinas Pendidikan Bekasi', email: 'dinas@bekasi.go.id', phone: '0812444000', address: 'Bekasi', totalOrders: 4, totalSpend: 18000000, lastOrder: '2026-04-08' },
  { id: 5, name: 'Bank Nasional', email: 'corp@banknasional.com', phone: '0812555000', address: 'Jakarta Pusat', totalOrders: 7, totalSpend: 42000000, lastOrder: '2026-04-09' },
  { id: 6, name: 'Universitas Nusantara', email: 'humas@unnusa.ac.id', phone: '0812666000', address: 'Depok', totalOrders: 2, totalSpend: 9000000, lastOrder: '2026-03-20' },
];

export default function Customers() {
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [view, setView] = useState(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Database Pelanggan</h1>
        <p className="text-gray-500 mt-1">{customers.length} pelanggan terdaftar</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-3xl font-extrabold text-gray-900">{customers.length}</p>
          <p className="text-gray-500 text-sm mt-1">Total Pelanggan</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-3xl font-extrabold text-gray-900">{customers.reduce((a, c) => a + c.totalOrders, 0)}</p>
          <p className="text-gray-500 text-sm mt-1">Total Transaksi</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-2xl font-extrabold text-gray-900">
            Rp {(customers.reduce((a, c) => a + c.totalSpend, 0) / 1000000).toFixed(1)}jt
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Belanja</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau nomor telepon..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <UserCircle2 size={28} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{c.name}</h3>
                <p className="text-gray-400 text-sm">{c.address}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <Phone size={14} className="text-gray-400" />
                {c.phone}
              </a>
              <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors truncate">
                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                <span className="truncate">{c.email}</span>
              </a>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-gray-900">{c.totalOrders}</p>
                <p className="text-xs text-gray-400 mt-0.5">Pesanan</p>
              </div>
              <div className="bg-primary/5 rounded-xl p-3 text-center">
                <p className="text-sm font-extrabold text-primary">Rp {(c.totalSpend / 1000000).toFixed(1)}jt</p>
                <p className="text-xs text-gray-400 mt-0.5">Total Belanja</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-right">Order terakhir: {c.lastOrder}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
