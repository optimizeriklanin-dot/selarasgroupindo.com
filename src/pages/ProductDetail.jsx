import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Package, ChevronRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/dummyData';
import { productInquiryLink } from '../utils/whatsapp';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Produk Tidak Ditemukan</h2>
          <Link to="/catalog" className="text-primary font-bold hover:underline">Kembali ke Katalog</Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Beranda</Link>
            <ChevronRight size={14} />
            <Link to="/catalog" className="hover:text-primary">Katalog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-80 md:h-[480px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package size={120} className="text-gray-300" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            


            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                product.stock > product.minStock 
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${product.stock > product.minStock ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                {product.stock > product.minStock ? `Stok Tersedia (${product.stock})` : 'Stok Terbatas'}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <ShieldCheck size={22} className="text-primary" />
                <span>Garansi kualitas produk</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Truck size={22} className="text-primary" />
                <span>Pengiriman ke seluruh Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Package size={22} className="text-primary" />
                <span>Custom branding (sablon/bordir) tersedia</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={productInquiryLink(product.name, product.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-500/25"
              >
                <MessageCircle size={22} />
                Pesan via WhatsApp
              </a>
              <Link to="/custom-order" className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                Custom Order
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Produk Serupa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} to={`/product/${rp.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {rp.imageUrl ? (
                      <img src={rp.imageUrl} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={48} className="text-gray-300 group-hover:text-primary/30 transition-colors" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">{rp.name}</h3>

                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
