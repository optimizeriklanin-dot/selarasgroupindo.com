import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DUMMY_ARTICLES } from '../data/dummyArticles';
import { ChevronRight, Calendar, User } from 'lucide-react';

export default function Articles() {
  const articlesList = JSON.parse(localStorage.getItem('articles')) || DUMMY_ARTICLES;
  const published = articlesList.filter(a => a.status === 'PUBLISHED').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Artikel & Berita - Pabrik Tas Custom Bekasi Terbaik</title>
        <meta name="description" content="Baca berbagai artikel dan informasi terbaru seputar pembuatan tas, tips desain, dan layanan dari pabrik tas custom Bekasi PT Selaras Serasa Sejalan." />
        <meta name="keywords" content="Pabrik tas custom bekasi, artikel tas, konveksi tas bekasi, tips tas promosi" />
      </Helmet>

      <div className="bg-gradient-to-r from-dark to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Kumpulan Artikel & Berita</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Insights pemasaran dan tips memilih tas promosi langsung dari ahlinya
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((article) => (
            <article key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col hover:-translate-y-1">
              <Link to={`/artikel/${article.slug}`} className="block overflow-hidden h-56 relative">
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Tak Ada Gambar</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                  <Calendar size={14} /> {article.date}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                  <User size={14}/> Oleh: {article.author}
                </div>
                <Link to={`/artikel/${article.slug}`}>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3 hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <Link to={`/artikel/${article.slug}`} className="inline-flex items-center font-bold text-primary hover:text-primary-dark group transition-colors">
                    Baca Selengkapnya
                    <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
