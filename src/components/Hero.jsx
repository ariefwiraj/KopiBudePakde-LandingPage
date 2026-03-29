import React from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import fotobg from 'E:/Coding/Kopibudepakde-LandingPage1/src/assets/bg-kopi2.jpg';

const order = () => {
  return (
    <section id="order" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fotobg})` }}
        // style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000")' }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1a110e]/90"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-20">
        {/* <span className="inline-block py-1.5 px-4 rounded-full bg-brand-primary/20 backdrop-blur-sm border border-brand-primary/30 text-white/90 text-sm font-medium mb-6 tracking-wide uppercase">
          Kopi Khas Jakarta Timur
        </span> */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Kopi Nikmat, <br className="md:hidden" />
          <span className="text-brand-primary">Rasa Kerabat</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
          Tempat nongkrong nyaman dengan sajian menu yang diracik sepenuh hati. Nikmati kehangatan di setiap tegukan.
        </p>

        {/* CTAs */}
        <div id="order" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-600/30 text-lg"
          >
            <ShoppingBag size={20} />
            Pesan GoFood
          </a>
          <a
            href="#"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-transparent border-2 border-white/80 hover:bg-white hover:text-brand-text transition-all transform hover:-translate-y-1 shadow-lg shadow-black/10 text-lg"
          >
            Pesan GrabFood
          </a>
        </div>
      </div>

      {/* Bouncer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#about" className="text-white/60 hover:text-white transition-colors p-2 flex flex-col items-center gap-2 text-sm font-medium">
          <span className="sr-only">Scroll down</span>
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default order;
