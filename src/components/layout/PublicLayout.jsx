import { Outlet, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Phone, MessageCircle } from 'lucide-react';
import { generalCTALink } from '../../utils/whatsapp';
import { useState } from 'react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Selaras Logo" className="h-12 w-auto" />
                <span className="font-bold text-xl text-primary-dark hidden sm:block">PT Selaras Serasa Sejalan</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Beranda</Link>
              <Link to="/catalog" className="text-gray-700 hover:text-primary transition-colors font-medium">Katalog Produk</Link>
              <Link to="/articles" className="text-gray-700 hover:text-primary transition-colors font-medium">Artikel</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">Tentang Kami</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">Kontak</Link>
              <Link to="/custom-order" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md flex items-center gap-2">
                <ShoppingBag size={18} />
                Pesan Custom
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary rounded-md" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
              <Link to="/catalog" className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary rounded-md" onClick={() => setIsMenuOpen(false)}>Katalog Produk</Link>
              <Link to="/articles" className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary rounded-md" onClick={() => setIsMenuOpen(false)}>Artikel</Link>
              <Link to="/about" className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary rounded-md" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link>
              <Link to="/contact" className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary rounded-md" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
              <Link to="/custom-order" className="mt-4 flex items-center gap-2 px-3 py-3 text-base font-medium text-white bg-primary rounded-md justify-center" onClick={() => setIsMenuOpen(false)}>
                <ShoppingBag size={18} />
                Pesan Custom
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="Selaras Logo" className="h-10 w-auto bg-white rounded p-1" />
                <span className="font-bold text-xl">PT Selaras Serasa Sejalan</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Pusat produksi dan penjualan tas promosi, koper, dan merchandise dengan kualitas terbaik untuk kebutuhan B2B dan B2C.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2">Kontak Kami</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-1 text-secondary" />
                  <div>
                    <p>WhatsApp</p>
                    <a href="https://wa.me/6281298974293" className="hover:text-white text-lg font-medium">0812 9897 4293</a>
                  </div>
                </li>
                <li>
                  <a href="mailto:selarasserasasejalan@gmail.com" className="hover:text-white">selarasserasasejalan@gmail.com</a>
                </li>
                <li className="leading-relaxed">
                  Jl. Kp. Bantar Gebang No.39, RT.1/RW.004, Padurenan, Mustika Jaya, Bekasi, Jawa Barat 16340
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2">Tautan Cepat</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/catalog" className="hover:text-white hover:underline">Katalog Produk</Link></li>
                <li><Link to="/articles" className="hover:text-white hover:underline">Artikel & Berita</Link></li>
                <li><Link to="/custom-order" className="hover:text-white hover:underline">Pemesanan Custom</Link></li>
                <li><Link to="/about" className="hover:text-white hover:underline">Tentang Perusahaan</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} | Web Design by: www.iklanin.my.id</p>
          </div>
        </div>
      </footer>
      {/* Enhanced Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 animate-bounce duration-1000">
          <p className="text-sm font-bold text-gray-800">
            Pabrik Tas Custom Bekasi 👋
          </p>
          <p className="text-xs text-gray-500">Tanya admin sekarang!</p>
        </div>
        <a 
          href={generalCTALink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center"
          title="Chat WhatsApp Sekarang"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30 group-hover:opacity-50"></div>
          <div className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-2xl hover:shadow-green-500/50 transition-all hover:-translate-y-1">
            <MessageCircle size={28} />
            <span className="font-extrabold pr-2">Hubungi Kami</span>
          </div>
        </a>
      </div>
    </div>
  );
}
