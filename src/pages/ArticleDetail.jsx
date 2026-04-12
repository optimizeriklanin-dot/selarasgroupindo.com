import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DUMMY_ARTICLES } from '../data/dummyArticles';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export default function ArticleDetail() {
  const { slug } = useParams();
  const articlesList = JSON.parse(localStorage.getItem('articles')) || DUMMY_ARTICLES;
  const article = articlesList.find(a => a.slug === slug);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Tautan artikel disalin ke papan klip!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Artikel Tidak Ditemukan</h2>
        <Link to="/articles" className="text-primary font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={18}/> Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>{article.metaTitle || `${article.title} - Pabrik Tas Custom Bekasi`}</title>
        <meta name="description" content={article.metaDesc || article.excerpt} />
      </Helmet>

      {/* Header Info */}
      <div className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors font-medium">
            <ArrowLeft size={16}/> Kembali ke Berita
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <User size={16} />
              </div>
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {article.date}
            </div>
            <button onClick={handleShare} className="flex items-center gap-2 ml-auto text-primary hover:text-primary-dark transition-colors bg-primary/5 px-4 py-2 rounded-full">
              <Share2 size={16} /> Bagikan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-10">
        {article.imageUrl && (
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border-4 border-white bg-white">
            <img src={article.imageUrl} alt={article.title} className="w-full h-auto md:h-[500px] object-cover" />
          </div>
        )}
        
        {/* Content Body */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary hover:prose-a:text-primary-dark prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
}
