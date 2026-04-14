import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  MessageCircle, 
  ChevronRight,
  Star,
  Package,
  Users,
  Clock
} from 'lucide-react';
import { PRODUCTS } from '../data/dummyData';
import { generalCTALink, productInquiryLink } from '../utils/whatsapp';

const FEATURES = [
  {
    icon: <ShieldCheck size={32} className="text-primary" />,
    title: 'Kualitas Terjamin',
    desc: 'Bahan premium pilihan dengan jahitan rapi dan kontrol kualitas ketat di setiap produksi.',
  },
  {
    icon: <Truck size={32} className="text-primary" />,
    title: 'Pengiriman Nasional',
    desc: 'Melayani pengiriman ke seluruh Indonesia dengan packaging aman dan tepat waktu.',
  },
  {
    icon: <Award size={32} className="text-primary" />,
    title: 'Custom Branding',
    desc: 'Sablon, bordir, dan printing logo perusahaan Anda dengan hasil tajam dan tahan lama.',
  },
  {
    icon: <Clock size={32} className="text-primary" />,
    title: 'Produksi Cepat',
    desc: 'Tim produksi profesional siap mengerjakan pesanan besar dengan timeline yang efisien.',
  },
];

const STATS = [
  { value: '10+', label: 'Tahun Pengalaman', icon: <Star size={24} /> },
  { value: '5000+', label: 'Proyek Selesai', icon: <Package size={24} /> },
  { value: '500+', label: 'Klien Puas', icon: <Users size={24} /> },
];

export default function Home() {
  const productsList = JSON.parse(localStorage.getItem('products')) || PRODUCTS;
  const featuredProducts = productsList.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-dark overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Star size={14} fill="currentColor" />
                Pabrik Koper & Tas Terpercaya
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tas Promosi</span> untuk Bisnis Anda
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                Produksi tas custom berkualitas tinggi untuk seminar, promosi, corporate gift, dan merchandise perusahaan dengan harga kompetitif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href={generalCTALink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5"
                >
                  <MessageCircle size={22} />
                  Chat WhatsApp
                </a>
                <Link 
                  to="/catalog" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
                >
                  Lihat Katalog
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                <div className="relative h-64 md:h-96 w-full max-w-lg mx-auto md:mx-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <img src="/products/team-photo.jpeg" alt="Tim PT Selaras Serasa Sejalan" className="w-full h-full object-cover md:object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl py-3 px-5 shadow-2xl shadow-black/20">
                  <p className="text-gray-900 font-extrabold text-xl">500+</p>
                  <p className="text-gray-600 font-medium text-sm">Klien Corporate</p>
                </div>
                <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl py-3 px-5 shadow-2xl shadow-black/20">
                  <p className="text-gray-900 font-extrabold text-xl">10+ Tahun</p>
                  <p className="text-gray-600 font-medium text-sm">Pengalaman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="flex justify-center mb-2 opacity-80">{stat.icon}</div>
                <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm md:text-base opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Mengapa Memilih Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
              Keunggulan PT Selaras Serasa Sejalan
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Kami berkomitmen memberikan produk berkualitas terbaik dengan pelayanan yang memuaskan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feat, i) => (
              <div 
                key={i} 
                className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-5 group-hover:bg-primary/20 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-widest">Produk Unggulan</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Koleksi Tas Terpopuler
              </h2>
            </div>
            <Link to="/catalog" className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-primary font-bold hover:text-primary-dark transition-colors group">
              Lihat Semua Produk
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="relative h-56 bg-white overflow-hidden border-b border-gray-50">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package size={64} className="text-gray-300 group-hover:text-primary/30 transition-colors" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-end">
                    <a 
                      href={productInquiryLink(product.name, product.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full transition-colors"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Butuh Tas Custom untuk Perusahaan Anda?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Konsultasi GRATIS dengan tim kami! Dapatkan penawaran terbaik untuk kebutuhan tas promosi, seminar kit, dan corporate gift.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={generalCTALink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              <MessageCircle size={22} />
              Hubungi via WhatsApp
            </a>
            <Link 
              to="/custom-order" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Form Custom Order
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
