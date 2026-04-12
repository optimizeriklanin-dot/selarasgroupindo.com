import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { generalCTALink } from '../utils/whatsapp';

export default function Contact() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-dark to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Hubungi Kami</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Kami siap melayani kebutuhan tas promosi Anda. Hubungi kami kapan saja!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Jl. Kp. Bantar Gebang No.39, RT.1/RW.004, Padurenan, Mustika Jaya, Bekasi, Jawa Barat 16340
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/6281298974293" className="text-green-600 font-bold text-lg hover:underline">
                      0812 9897 4293
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:selarasserasasejalan@gmail.com" className="text-blue-600 hover:underline">
                      selarasserasasejalan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-secondary-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Sabtu: 08:00 - 17:00 WIB</p>
                    <p className="text-gray-400 text-sm">Minggu & Hari Libur: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={generalCTALink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-green-500/25 w-full"
            >
              <MessageCircle size={24} />
              Chat WhatsApp Sekarang
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900">Lokasi Kami</h2>
                <p className="text-gray-500 text-sm mt-1">Kunjungi workshop kami di Bekasi</p>
              </div>
              <div className="h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15862.697018643346!2d106.98619365692137!3d-6.306458231212526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993007ebd4781%3A0x2810ef3f8af9465a!2sPT%20SELARAS%20SERASA%20SEJALAN!5e0!3m2!1sid!2sid!4v1775833534204!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Selaras Serasa Sejalan"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
