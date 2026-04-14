import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageCircle, Package, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/dummyData';
import { productInquiryLink } from '../utils/whatsapp';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilter, setShowFilter] = useState(false);

  const productsList = JSON.parse(localStorage.getItem('products')) || PRODUCTS;

  const filtered = productsList
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory ? p.categoryId === parseInt(selectedCategory) : true;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Katalog Produk</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Temukan berbagai pilihan tas promosi berkualitas untuk kebutuhan bisnis Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer font-medium text-gray-700"
                >
                  <option value="">Semua Kategori</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer font-medium text-gray-700"
                >
                  <option value="name">Nama A-Z</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 mb-6 font-medium">
          Menampilkan <span className="text-primary font-bold">{filtered.length}</span> produk
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-400">Coba ubah kata kunci atau kategori pencarian</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-56 bg-white overflow-hidden border-b border-gray-50">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={64} className="text-gray-300 group-hover:text-primary/30 transition-colors duration-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {product.category}
                      </span>
                    </div>
                    {product.stock < product.minStock && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          Stok Terbatas
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-end">
                    <a
                      href={productInquiryLink(product.name, product.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full transition-colors shadow-md"
                      title="Pesan via WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
