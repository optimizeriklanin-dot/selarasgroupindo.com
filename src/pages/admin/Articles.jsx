import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Globe, Eye, Check, X } from 'lucide-react';
import { DUMMY_ARTICLES } from '../../data/dummyArticles';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminArticles() {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('articles');
    return saved ? JSON.parse(saved) : DUMMY_ARTICLES;
  });

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [existingImages, setExistingImages] = useState([]);
  useEffect(() => {
    const productsSaved = localStorage.getItem('products');
    const productsList = productsSaved ? JSON.parse(productsSaved) : [];
    
    const allImages = new Set();
    articles.forEach(a => { if (a.imageUrl) allImages.add(a.imageUrl); });
    productsList.forEach(p => { if (p.imageUrl) allImages.add(p.imageUrl); });
    
    setExistingImages(Array.from(allImages));
  }, [articles, showModal]);
  
  const [form, setForm] = useState({ 
    title: '', slug: '', excerpt: '', content: '', imageUrl: '', 
    status: 'PUBLISHED', metaTitle: '', metaDesc: '' 
  });

  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', status: 'PUBLISHED', metaTitle: '', metaDesc: '' });
    setShowModal(true);
  };

  const openEdit = (a) => {
    setEditItem(a);
    setForm({ ...a });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus artikel ini?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase().trim()
      .replace(/\\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\\w\\-]+/g, '')
      .replace(/\\-\\-+/g, '-');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({ ...form, title, slug: generateSlug(title) });
  };

  const handleSave = () => {
    if (!form.title) return;
    const now = new Date().toISOString().split('T')[0];

    if (editItem) {
      setArticles(prev => prev.map(a => a.id === editItem.id ? { ...form, id: a.id, date: a.date } : a));
    } else {
      const newItem = {
        ...form,
        id: Date.now(),
        author: 'Admin',
        date: now
      };
      setArticles(prev => [newItem, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Artikel (SEO)</h1>
          <p className="text-gray-500 mt-1">Fokus keyword: <span className="font-bold text-primary">Pabrik tas custom bekasi</span></p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md">
          <Plus size={18} /> Tulis Artikel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Cari judul artikel..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Judul Artikel</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">SEO Info</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tanggal</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <p className="font-bold text-gray-900">{a.title}</p>
                  <a href={`/artikel/${a.slug}`} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"><Globe size={12}/> /{a.slug}</a>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-xs text-gray-500 max-w-[200px] truncate" title={a.metaTitle}>Title: {a.metaTitle || '-'}</p>
                  <p className="text-xs text-gray-500 max-w-[200px] truncate" title={a.metaDesc}>Desc: {a.metaDesc || '-'}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{a.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(a)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{editItem ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel *</label>
                <input className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2" value={form.title} onChange={handleTitleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-500" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Pilih / Upload Gambar Cover</label>
                
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
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Opsi 1: Upload Baru</p>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
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
                    <p className="text-xs text-gray-500 mb-2 font-semibold flexItems-center justify-between">
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
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-3 text-sm flex items-center gap-2"><Globe size={16}/> Pengaturan SEO (Penting!)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-blue-800 mb-1">Meta Title (Gunakan kata kunci: Pabrik tas custom bekasi)</label>
                    <input className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm" value={form.metaTitle} onChange={e => setForm({...form, metaTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-800 mb-1">Meta Description</label>
                    <textarea className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm resize-none" rows="2" value={form.metaDesc} onChange={e => setForm({...form, metaDesc: e.target.value})}></textarea>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan (Excerpt)</label>
                <textarea className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 resize-none" rows="2" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}></textarea>
              </div>
              <div className="pb-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel (Otomatis SEO Friendly)</label>
                <div className="bg-white rounded-lg">
                  <ReactQuill 
                    theme="snow" 
                    value={form.content} 
                    onChange={val => setForm({...form, content: val})} 
                    className="h-64 mb-10" 
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors"><Check size={18}/> Simpan Artikel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
