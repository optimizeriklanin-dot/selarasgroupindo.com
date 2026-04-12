import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, AlertTriangle, Package, X, Check, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/dummyData';

const STATUS_BADGE = {
  safe: 'bg-green-100 text-green-700',
  low: 'bg-orange-100 text-orange-700',
};

export default function Products() {
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || PRODUCTS);
  
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  
  const [existingImages, setExistingImages] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const articlesSaved = localStorage.getItem('articles');
    const articlesList = articlesSaved ? JSON.parse(articlesSaved) : [];
    
    const allImages = new Set();
    products.forEach(p => { if (p.imageUrl) allImages.add(p.imageUrl); });
    articlesList.forEach(a => { if (a.imageUrl) allImages.add(a.imageUrl); });
    
    setExistingImages(Array.from(allImages));
  }, [products, showModal]);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', categoryId: '', stock: '', minStock: '', description: '', imageUrl: '', featured: false });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: '', categoryId: '', stock: '', minStock: '5', description: '', imageUrl: '', featured: false });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, categoryId: p.categoryId, stock: p.stock, minStock: p.minStock, description: p.description || '', imageUrl: p.imageUrl || '', featured: !!p.featured });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus produk ini?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.name) return;
    const cat = CATEGORIES.find(c => c.id === parseInt(form.categoryId));
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id
        ? { ...p, ...form, categoryId: parseInt(form.categoryId), stock: parseInt(form.stock), minStock: parseInt(form.minStock), category: cat?.name || '-', featured: form.featured }
        : p));
    } else {
      const newProd = {
        id: Date.now(),
        ...form,
        categoryId: parseInt(form.categoryId),

        stock: parseInt(form.stock),
        minStock: parseInt(form.minStock),
        category: cat?.name || '-',
        featured: form.featured,
        imageUrl: form.imageUrl,
      };
      setProducts(prev => [newProd, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Produk & Stok</h1>
          <p className="text-gray-500 mt-1">{products.length} produk terdaftar</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md"
        >
          <Plus size={18} />
          Tambah Produk
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Produk', 'Kategori', 'Stok', 'Min. Stok', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => {
                const isLow = p.stock <= p.minStock;
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1">{p.name}</p>
                          {p.featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-yellow-600 mt-0.5">
                              <Star size={10} fill="currentColor" /> Unggulan
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{p.category}</span>
                    </td>

                    <td className="px-5 py-4 font-bold text-gray-900">{p.stock}</td>
                    <td className="px-5 py-4 text-gray-500">{p.minStock}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${isLow ? STATUS_BADGE.low : STATUS_BADGE.safe}`}>
                        {isLow && <AlertTriangle size={12} />}
                        {isLow ? 'Stok Rendah' : 'Stok Aman'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{editProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk *</label>
                <input className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nama produk" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select className="input-field" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                  <option value="">Pilih Kategori</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                  <input type="number" className="input-field" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min. Stok</label>
                  <input type="number" className="input-field" value={form.minStock} onChange={e => setForm({...form, minStock: e.target.value})} placeholder="5" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Pilih / Upload Gambar Produk</label>
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                    <input 
                      type="checkbox" 
                      checked={form.featured} 
                      onChange={e => setForm({...form, featured: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" 
                    />
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                      <Star size={14} className={form.featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} />
                      Produk Unggulan
                    </span>
                  </label>
                </div>
                
                {form.imageUrl && (
                  <div className="mb-4 p-3 bg-white rounded-xl border border-gray-100 w-fit shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-2">Preview Gambar Saat Ini:</p>
                    <img src={form.imageUrl} alt="Preview" className="h-32 w-auto min-w-[128px] object-cover rounded-lg border border-gray-100" />
                    <div className="mt-3 flex items-center gap-3">
                      <p className="text-xs text-green-600 font-bold">✓ Aktif</p>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, imageUrl: ''})} 
                        className="text-xs text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 w-full">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Opsi 1: Upload Baru</p>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer bg-white border border-gray-200"
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setForm({...form, imageUrl: reader.result});
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-200 hidden md:block">ATAU</span>
                  <div className="flex-1 w-full">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Opsi 2: Masukkan Link</p>
                    <input 
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2" 
                      value={form.imageUrl} 
                      onChange={e => setForm({...form, imageUrl: e.target.value})} 
                      placeholder="https://..." 
                    />
                  </div>
                </div>

                {existingImages.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 font-semibold flex items-center justify-between">
                      <span>Opsi 3: Pilih Gambar yang Pernah Diupload</span>
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-1">
                      {existingImages.map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => setForm({...form, imageUrl: img})}
                          className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 h-16 w-16 ${form.imageUrl === img ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-gray-300'}`}
                        >
                          <img src={img} className="w-full h-full object-cover" alt="Galeri" />
                          {form.imageUrl === img && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Check size={20} className="text-white drop-shadow-md" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea className="input-field resize-none" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Deskripsi produk..." />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={handleSave} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors">
                <Check size={18} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
