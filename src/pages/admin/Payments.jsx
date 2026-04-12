import { useState, useEffect } from 'react';
import { Check, X, Upload, Eye, CreditCard } from 'lucide-react';
import { DUMMY_ORDERS } from '../../data/dummyData';

const PAYMENT_STATUS = {
  UNPAID: { label: 'Belum Bayar', cls: 'bg-red-100 text-red-700 border border-red-200' },
  DP: { label: 'DP', cls: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
  PAID: { label: 'Lunas', cls: 'bg-green-100 text-green-700 border border-green-200' },
};

const INITIAL_PAYMENTS = DUMMY_ORDERS.map((o, i) => ({
  id: o.id,
  orderNumber: o.orderNumber,
  customer: o.customer,
  total: o.total,
  paymentStatus: ['UNPAID', 'DP', 'PAID', 'UNPAID', 'DP'][i % 5],
  amount: i === 1 ? o.total * 0.5 : i === 4 ? o.total * 0.5 : i === 2 ? o.total : 0,
  verified: i === 2,
  proofUrl: i === 1 || i === 2 || i === 4 ? 'proof_uploaded.jpg' : null,
  date: o.date,
}));

export default function Payments() {
  const [payments, setPayments] = useState(() => JSON.parse(localStorage.getItem('payments')) || INITIAL_PAYMENTS);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);
  const [showProofModal, setShowProofModal] = useState(null);

  const handleInvoiceDownload = (p) => {
    // Mocking an invoice download
    const content = `INVOICE\n\nNomor Order: ${p.orderNumber}\nPelanggan: ${p.customer}\nTotal: Rp ${p.total.toLocaleString('id-ID')}\nStatus: ${PAYMENT_STATUS[p.paymentStatus].label}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${p.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateStatus = (id, status) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, paymentStatus: status } : p));
  };

  const toggleVerify = (id, isVerified) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, verified: isVerified } : p));
  };

  const handleProofSave = (url) => {
    if(!showProofModal) return;
    setPayments(prev => prev.map(p => p.id === showProofModal.id ? { ...p, proofUrl: url } : p));
    setShowProofModal(null);
  };

  const totalUnpaid = payments.filter(p => p.paymentStatus === 'UNPAID').length;
  const totalDP = payments.filter(p => p.paymentStatus === 'DP').length;
  const totalPaid = payments.filter(p => p.paymentStatus === 'PAID').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Pembayaran</h1>
        <p className="text-gray-500 mt-1">Monitor dan verifikasi pembayaran pelanggan</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Belum Bayar', count: totalUnpaid, cls: 'from-red-400 to-red-600' },
          { label: 'DP', count: totalDP, cls: 'from-yellow-400 to-orange-500' },
          { label: 'Lunas', count: totalPaid, cls: 'from-green-400 to-emerald-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`bg-gradient-to-r ${s.cls} h-2`}></div>
            <div className="p-5">
              <p className="text-3xl font-extrabold text-gray-900">{s.count}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CreditCard size={20} className="text-primary" />
            Daftar Pembayaran
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['No. Order', 'Pelanggan', 'Total', 'Dibayar', 'Status', 'Bukti', 'Verifikasi', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => {
                const badge = PAYMENT_STATUS[p.paymentStatus];
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-sm font-semibold text-primary">{p.orderNumber}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">{p.customer}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">Rp {p.total.toLocaleString('id-ID')}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">Rp {p.amount.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-gray-400">{p.amount > 0 ? `${Math.round((p.amount / p.total) * 100)}% terbayar` : 'Belum ada'}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={p.paymentStatus}
                        onChange={e => updateStatus(p.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none ${badge.cls}`}
                      >
                        {Object.entries(PAYMENT_STATUS).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => setShowProofModal(p)}
                        className={`inline-flex items-center gap-1 text-xs font-semibold hover:underline ${p.proofUrl ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        {p.proofUrl ? <><Eye size={14} /> Lihat</> : <><Upload size={14} /> Upload</>}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={p.verified ? 'yes' : 'no'}
                        onChange={(e) => toggleVerify(p.id, e.target.value === 'yes')}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none ${
                          p.verified 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        <option value="yes">Terverifikasi</option>
                        <option value="no">Belum Diverifikasi</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleInvoiceDownload(p)}
                        className="inline-flex items-center gap-1 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs font-semibold"
                        title="Download Invoice"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showProofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Bukti Pembayaran</h3>
              <button onClick={() => setShowProofModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              {showProofModal.proofUrl ? (
                <div className="bg-gray-100 rounded-xl aspect-[3/4] flex items-center justify-center overflow-hidden">
                  {/* Simulate image */}
                  <span className="text-gray-400 text-sm font-mono break-all px-4text-center">{showProofModal.proofUrl}</span>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm">
                  Belum ada bukti yang diupload
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Bukti Transfer</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => document.getElementById('proofUrlInput').value = reader.result;
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                />
                <input 
                  type="hidden" 
                  id="proofUrlInput"
                  defaultValue={showProofModal.proofUrl || ''} 
                />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowProofModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50">Tutup</button>
              <button 
                onClick={() => handleProofSave(document.getElementById('proofUrlInput').value)} 
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-bold transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
