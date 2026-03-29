import React from 'react';
import { Coffee, Wifi, Wallet } from 'lucide-react';

const About = () => {
  const usps = [
    {
      icon: <Coffee size={32} className="text-brand-primary" />,
      title: 'Biji Kopi Pilihan',
      desc: 'Disangrai dengan metode pas untuk menghasilkan aroma dan rasa terbaik di kelasnya.',
    },
    {
      icon: <Wifi size={32} className="text-brand-primary" />,
      title: 'Nyaman & Gesit',
      desc: 'WiFi ngebut dan colokan di setiap sudut. Cocok untuk work from cafe atau tugas nugas.',
    },
    {
      icon: <Wallet size={32} className="text-brand-primary" />,
      title: 'Harga Bersahabat',
      desc: 'Nongkrong premium gak perlu bikin kantong jebol. Harga mulai dari 8K aja.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-brand-bgMain">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Lebih Dari Sekadar <span className="text-brand-primary">Tempat Ngopi</span>
          </h2>
          <p className="text-brand-muted text-lg">
            Kopi Bude Pakde hadir sebagai ruang singgah yang nyaman di tengah padatnya Jakarta. Kami menyajikan racikan klasik dan modern yang pas di lidah dan kantong.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {usps.map((usp, idx) => (
            <div 
              key={idx}
              className="bg-brand-bgCard p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6">
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">{usp.title}</h3>
              <p className="text-brand-muted leading-relaxed">
                {usp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
