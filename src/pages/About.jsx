import { ShieldCheck, Truck, Award, Users, Target, Heart, Star, Factory } from 'lucide-react';

const VALUES = [
  { icon: <Target size={28} />, title: 'Visi', desc: 'Menjadi produsen tas promosi terdepan di Indonesia yang dikenal akan kualitas, inovasi, dan kepercayaan pelanggan.' },
  { icon: <Heart size={28} />, title: 'Misi', desc: 'Memberikan solusi produk tas custom dengan bahan berkualitas, harga bersaing, serta pelayanan terbaik untuk memenuhi kebutuhan branding perusahaan.' },
];

const MILESTONES = [
  { year: '2016', text: 'Berdiri sebagai workshop produksi tas kecil di Bekasi' },
  { year: '2018', text: 'Memperluas workshop dan mulai melayani klien corporate' },
  { year: '2020', text: 'Upgrade mesin produksi dan mulai produksi koper' },
  { year: '2022', text: 'Mencapai 300+ klien corporate di seluruh Indonesia' },
  { year: '2024', text: 'Ekspansi lini produk dan digitalisasi sistem penjualan' },
  { year: '2026', text: 'Meluncurkan platform digital untuk pemesanan online' },
];

const TEAM_STRENGTHS = [
  { icon: <Factory size={32} className="text-primary" />, title: 'Pabrik Sendiri', desc: 'Memiliki workshop produksi sendiri di Bekasi dengan kapasitas besar, memastikan kontrol kualitas langsung dari hulu ke hilir.' },
  { icon: <Users size={32} className="text-primary" />, title: 'Tim Berpengalaman', desc: '50+ tenaga ahli profesional di bidang penjahitan, sablon, bordir, dan quality control siap melayani pesanan Anda.' },
  { icon: <Award size={32} className="text-primary" />, title: 'Material Premium', desc: 'Hanya menggunakan bahan baku pilihan seperti D-600, 1680D, dan Canvas tebal untuk hasil produksi yang tahan lama.' },
  { icon: <Star size={32} className="text-primary" />, title: 'Harga Kompetitif', desc: 'Langsung dari pabrik tanpa perantara, sehingga kami dapat memberikan harga terbaik untuk setiap skala pesanan.' },
];

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-dark via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Tentang Kami</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            PT Selaras Serasa Sejalan (S3) adalah perusahaan manufaktur tas dan koper terpercaya yang telah melayani ribuan klien di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mb-6">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{v.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Keunggulan Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Mengapa Memilih S3?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_STRENGTHS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-5">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Perjalanan Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Milestone Perusahaan</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-px"></div>
            {MILESTONES.map((m, i) => (
              <div key={i} className={`relative flex items-center mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-white shadow z-10"></div>
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-primary font-extrabold text-lg">{m.year}</span>
                    <p className="text-gray-700 mt-2">{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Address */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Lokasi Pabrik Kami</h2>
          <p className="text-white/80 text-lg mb-2">
            Jl. Kp. Bantar Gebang No.39, RT.1/RW.004
          </p>
          <p className="text-white/80 text-lg mb-8">
            Padurenan, Mustika Jaya, Bekasi, Jawa Barat 16340
          </p>
          <a
            href="https://maps.app.goo.gl/iHPuxF7BiSD9GsGe8?g_st=iwb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-xl"
          >
            Lihat di Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
