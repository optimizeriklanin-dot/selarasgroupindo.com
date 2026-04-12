import { useState } from 'react';
import { MessageCircle, Send, Package, Palette, Ruler, Hash } from 'lucide-react';
import { customOrderLink } from '../utils/whatsapp';

const BAG_TYPES = [
  'Tas Seminar', 'Tas Promosi', 'Tas Ransel', 'Goodie Bag',
  'Tas Travel', 'Tas Laptop', 'Koper', 'Pouch / Dompet', 'Lainnya'
];

const MATERIALS = [
  'D-300', 'D-600', '1680D', 'Canvas', 'Spunbond',
  'Polyester', 'Neoprene', 'PVC', 'ABS (Koper)', 'Sesuai Saran'
];

export default function CustomOrder() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    address: '',
    phone: '',
    bagType: '',
    material: '',
    quantity: '',
    color: '',
    size: '',
    printMethod: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const link = customOrderLink(form);
    window.open(link, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-dark to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pemesanan Custom</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Isi formulir di bawah untuk membuat tas custom sesuai kebutuhan Anda. Tim kami akan segera merespon via WhatsApp.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Form header */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Form Custom Order</h2>
                <p className="text-gray-500 text-sm">Data akan dikirim langsung ke WhatsApp kami</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Data Pemesan
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan / Instansi</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="PT / CV / Instansi"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Pengiriman Lengkap *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows="2"
                    placeholder="Masukkan alamat pengiriman lengkap..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none mb-5"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Detail Produk
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Tas *</label>
                  <select
                    name="bagType"
                    value={form.bagType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Pilih jenis tas</option>
                    {BAG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bahan</label>
                  <select
                    name="material"
                    value={form.material}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Pilih bahan</option>
                    {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Pesanan (pcs) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Minimum 50 pcs"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warna</label>
                  <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="Contoh: Merah, Hitam, Biru Navy"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ukuran</label>
                  <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    placeholder="Contoh: 30x40cm, A4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metode Cetak Logo</label>
                  <select
                    name="printMethod"
                    value={form.printMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Pilih metode</option>
                    <option value="Sablon">Sablon</option>
                    <option value="Bordir">Bordir</option>
                    <option value="Printing Full Color">Printing Full Color</option>
                    <option value="Tanpa Logo">Tanpa Logo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Keterangan Tambahan
              </h3>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Deskripsikan detail tambahan, spesifikasi khusus, atau lampirkan referensi desain yang diinginkan..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
              >
                <MessageCircle size={22} />
                Kirim via WhatsApp
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Data yang Anda kirim akan diteruskan langsung ke WhatsApp tim kami untuk diproses.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
