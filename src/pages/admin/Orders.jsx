import { useState } from 'react';
import { Plus, Search, Eye, Edit2, ChevronDown, X, Check } from 'lucide-react';
import { DUMMY_ORDERS, PRODUCTS } from '../../data/dummyData';

const STATUS_OPTIONS = ['PENDING', 'PROCESSING', 'PRODUCTION', 'COMPLETED', 'CANCELLED'];
const STATUS_BADGE = {
  PENDING: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
  PROCESSING: { label: 'Diproses', cls: 'bg-blue-100 text-blue-700 border border-blue-200' },
  PRODUCTION: { label: 'Produksi', cls: 'bg-purple-100 text-purple-700 border border-purple-200' },
  COMPLETED: { label: 'Selesai', cls: 'bg-green-100 text-green-700 border border-green-200' },
  CANCELLED: { label: 'Dibatalkan', cls: 'bg-red-100 text-red-700 border border-red-200' },
};

const INITIAL_ORDERS = DUMMY_ORDERS.map(o => ({
  ...o,
  items: [{ product: PRODUCTS[0]?.name, qty: 100, price: PRODUCTS[0]?.price }],
  phone: '08120000000' + o.id,
  notes: 'Sablon logo + warna custom',
}));

export default function Orders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewOrder, setViewOrder] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: '', company: '', address: '', phone: '', product: '', quantity: '', notes: '' });

  const filtered = orders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.phone) return;
    const prod = PRODUCTS.find(p => p.name === newOrder.product);
    const total = prod ? prod.price * parseInt(newOrder.quantity || 1) : 0;
    const order = {
      id: Date.now(),
      orderNumber: `ORD-2026-${String(orders.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      company: newOrder.company,
      address: newOrder.address,
      phone: newOrder.phone,
      status: 'PENDING',
      total,
      date: new Date().toISOString().split('T')[0],
      notes: newOrder.notes,
      items: prod ? [{ product: prod.name, qty: parseInt(newOrder.quantity || 1), price: prod.price }] : [],
    };
    setOrders(prev => [order, ...prev]);
    setShowAdd(false);
    setNewOrder({ customer: '', company: '', address: '', phone: '', product: '', quantity: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Pesanan</h1>
          <p className="text-gray-500 mt-1">{orders.length} total pesanan</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md"
        >
          <Plus size={18} />
          Input Order Manual
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nomor order atau pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium text-gray-700"
          >
            <option value="">Semua Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_BADGE[s].label}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-3">
        {STATUS_OPTIONS.map(s => {
          const count = orders.filter(o => o.status === s).length;
          const badge = STATUS_BADGE[s];
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                filterStatus === s ? badge.cls + ' ring-2 ring-offset-1' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {badge.label}
              <span className="bg-white/50 rounded-full px-1.5 text-xs font-bold">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['No. Order', 'Pelanggan', 'Status', 'Tanggal', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => {
                const badge = STATUS_BADGE[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-sm font-semibold text-primary">{order.orderNumber}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.phone}</p>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none ${badge.cls}`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{STATUS_BADGE[s].label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-sm">{order.date}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setViewOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Detail Order {viewOrder.orderNumber}</h3>
              <button onClick={() => setViewOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-400">Pelanggan</p><p className="font-bold">{viewOrder.customer}</p></div>
                <div><p className="text-xs text-gray-400">WhatsApp</p><p className="font-bold">{viewOrder.phone}</p></div>
                <div className="col-span-2"><p className="text-xs text-gray-400">Instansi/Alamat</p><p className="font-bold">{viewOrder.company ? `${viewOrder.company} - ` : ''} {viewOrder.address || '-'}</p></div>
                <div><p className="text-xs text-gray-400">Tanggal</p><p className="font-bold">{viewOrder.date}</p></div>
                <div><p className="text-xs text-gray-400">Status</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_BADGE[viewOrder.status].cls}`}>
                    {STATUS_BADGE[viewOrder.status].label}
                  </span>
                </div>
              </div>
              {viewOrder.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Catatan</p>
                  <p className="text-gray-700">{viewOrder.notes}</p>
                </div>
              )}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-2">Item Pesanan</p>
                {viewOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-800">{item.product} x{item.qty}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Input Order Manual</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pelanggan *</label>
                <input className="input-field" value={newOrder.customer} onChange={e => setNewOrder({...newOrder, customer: e.target.value})} placeholder="PT / CV / Nama" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instansi/Perusahaan</label>
                  <input className="input-field" value={newOrder.company} onChange={e => setNewOrder({...newOrder, company: e.target.value})} placeholder="PT / CV / Dll" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. WhatsApp *</label>
                  <input className="input-field" value={newOrder.phone} onChange={e => setNewOrder({...newOrder, phone: e.target.value})} placeholder="0812..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Pengiriman</label>
                <textarea className="input-field resize-none" rows={2} value={newOrder.address} onChange={e => setNewOrder({...newOrder, address: e.target.value})} placeholder="Alamat lengkap..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Produk</label>
                  <select className="input-field" value={newOrder.product} onChange={e => setNewOrder({...newOrder, product: e.target.value})}>
                    <option value="">Pilih Produk</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah (pcs)</label>
                  <input type="number" className="input-field" value={newOrder.quantity} onChange={e => setNewOrder({...newOrder, quantity: e.target.value})} placeholder="100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
                <textarea className="input-field resize-none" rows={2} value={newOrder.notes} onChange={e => setNewOrder({...newOrder, notes: e.target.value})} placeholder="Keterangan tambahan..." />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50">Batal</button>
              <button onClick={handleAddOrder} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors">
                <Check size={18} />
                Simpan Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
