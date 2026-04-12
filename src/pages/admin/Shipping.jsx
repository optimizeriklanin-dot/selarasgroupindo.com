import { useState } from 'react';
import { Truck, Check, Package } from 'lucide-react';
import { DUMMY_ORDERS } from '../../data/dummyData';

const SHIP_STATUS = {
  PENDING: { label: 'Belum Dikirim', cls: 'bg-gray-100 text-gray-600' },
  ON_DELIVERY: { label: 'Dalam Pengiriman', cls: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Terkirim', cls: 'bg-green-100 text-green-700' },
};

const INITIAL_SHIPPING = DUMMY_ORDERS.map((o, i) => ({
  id: o.id,
  orderNumber: o.orderNumber,
  customer: o.customer,
  trackingNumber: i === 2 ? 'JNE001234567' : i === 0 ? 'SICEPAT9876543' : '',
  courier: i === 2 ? 'JNE' : i === 0 ? 'SiCepat' : '',
  status: i === 0 ? 'DELIVERED' : i === 2 ? 'ON_DELIVERY' : 'PENDING',
  date: o.date,
}));

export default function Shipping() {
  const [shippings, setShippings] = useState(INITIAL_SHIPPING);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ trackingNumber: '', courier: '', status: 'ON_DELIVERY' });

  const openEdit = (s) => {
    setEditing(s.id);
    setForm({ trackingNumber: s.trackingNumber, courier: s.courier, status: s.status });
  };

  const saveShipping = (id) => {
    setShippings(prev => prev.map(s => s.id === id ? { ...s, ...form } : s));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Pengiriman</h1>
        <p className="text-gray-500 mt-1">Input resi dan update status pengiriman</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(SHIP_STATUS).map(([k, v]) => (
          <div key={k} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-2xl font-extrabold text-gray-900">
              {shippings.filter(s => s.status === k).length}
            </p>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${v.cls}`}>{v.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Truck size={20} className="text-primary" />
          <h2 className="text-lg font-bold text-gray-800">Daftar Pengiriman</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['No. Order', 'Pelanggan', 'Kurir', 'No. Resi', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {shippings.map((s) => {
                const badge = SHIP_STATUS[s.status];
                const isEditing = editing === s.id;
                return (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-sm font-semibold text-primary">{s.orderNumber}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">{s.customer}</td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <input className="input-field text-sm py-1.5" value={form.courier} onChange={e => setForm({...form, courier: e.target.value})} placeholder="JNE, SiCepat..." />
                      ) : (
                        <span className="text-gray-700">{s.courier || '-'}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <input className="input-field text-sm py-1.5" value={form.trackingNumber} onChange={e => setForm({...form, trackingNumber: e.target.value})} placeholder="No. resi..." />
                      ) : (
                        <span className={`font-mono text-sm ${s.trackingNumber ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                          {s.trackingNumber || 'Belum diinput'}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <select className="input-field text-sm py-1.5" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                          {Object.entries(SHIP_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button onClick={() => saveShipping(s.id)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"><Check size={14} /></button>
                          <button onClick={() => setEditing(null)} className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><Package size={14} /></button>
                        </div>
                      ) : (
                        <button onClick={() => openEdit(s)} className="text-xs font-semibold text-primary hover:underline">
                          Input Resi
                        </button>
                      )}
                    </td>
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
