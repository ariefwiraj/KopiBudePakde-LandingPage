import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('signature');

  const bestSellers = [
    {
      name: 'Kopi Susu Kasmaran',
      price: '20K',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Aren Bomb!',
      price: '25K',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67efcb?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Mochaccino',
      price: '28K',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Kentang Goreng',
      price: '22K',
      image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const fullMenu = {
    signature: [
      { name: 'Kopi Susu Kasmaran', price: '20K', desc: 'Espresso, Susu, Krimer & Gula Aren.' },
      { name: 'Kopi Susu Pandan', price: '23K', desc: 'Espresso, Susu, Krimer & Sirup Pandan.' },
      { name: 'Kopi Susu Pisang', price: '23K', desc: 'Espresso, Susu, Krimer & Sirup Pisang.' },
      { name: 'Kopi Susu Merona', price: '25K', desc: 'Espresso, Susu, Krimer & Es Krim Strawberry' },
      { name: 'Double Shaken Espresso', price: '24K', desc: 'Double Shot Espresso, Krimer & Gula Aren.' },
      { name: 'Manies Ireng', price: '24K', desc: 'Espresso & Sirup Leci' },
      { name: 'Aren Bomb!', price: '25K', desc: 'Espresso, Gula Aren, Lemon & Soda.' },
      { name: 'Kopi Greentea', price: '28K', desc: 'Espresso, Greentea & Susu.' },
    ],
    classic: [
      { name: 'Espresso', price: '8K', desc: '' },
      { name: 'Gagah Ireng', price: '20K', desc: 'Espresso & Air' },
      { name: 'Cappuccino', price: '25K', desc: 'Espresso & Susu' },
      { name: 'Latte', price: '25K', desc: 'Espresso & Susu' },
      { name: 'Mochaccino', price: '28K', desc: 'Espresso, Cokelat & Susu' },
    ],
    basic: [
      { name: 'Leci Yakult', price: '20K', desc: '' },
      { name: 'Manies jawa', price: '18K', desc: '' },
      { name: 'Es Teh Leci', price: '18K', desc: '' },
      { name: 'Teh Manies', price: '13K', desc: '' },
      { name: 'Teh Lemon', price: '15K', desc: '' },
      { name: 'Mineral Water', price: '10K', desc: '' },
    ],
    non_kopi: [
      { name: 'Cokelat', price: '24K', desc: 'Cokelat & Susu' },
      { name: 'Taro', price: '24K', desc: 'Taro & Susu' },
      { name: 'Greentea', price: '24K', desc: 'Greentea & Susu' },
      { name: 'Mager-Ya', price: '24K', desc: 'Mangga, Susu & Yakult' },
      { name: 'Lesu-Ya', price: '24K', desc: 'Leci, Susu & Yakult' },
      { name: 'Telang Jiwa', price: '25K', desc: 'Espresso, Soda & Sirup Leci' },
      { name: 'Dimadu', price: '25K', desc: 'Soda, Lemon & Madu' },
    ],
    camilan: [
      { name: 'Donat Kampung', price: '6K', desc: '' },
      { name: 'Cireng', price: '22K', desc: '' },
      { name: 'Kentang Goreng', price: '22K', desc: '' },
      { name: 'Singkong Goreng', price: '23K', desc: '' },
      { name: 'Kentang-Sosis', price: '28K', desc: '' },
      { name: 'Dimsum (4pcs)', price: '25K', desc: '' },
      { name: 'Risol Lumer (4pcs)', price: '25K', desc: '' },
      { name: 'Bakmie Tuna', price: '32K', desc: '' },
      { name: 'Bakmie Ayam Renyah', price: '30K', desc: '' },
    ]
  };

  const tabs = [
    { id: 'signature', label: '🍹 Signature' },
    { id: 'classic', label: '☕ Classic' },
    { id: 'basic', label: '💧 Basic' },
    { id: 'non_kopi', label: '🥤 Non Kopi' },
    { id: 'camilan', label: '🍟 Camilan' },
  ];

  return (
    <section id="menu" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Menu <span className="text-brand-primary">Andalan</span>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Sajian andalan untuk menemani waktu ngopi kamu. Mulai dari racikan khas hingga camilan pendamping.
          </p>
        </div>

        {/* --- Block 1: Best Seller --- */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
              🔥 Best Sellers
            </h3>
            <div className="md:hidden text-brand-muted text-sm flex items-center">
              Swipe <ChevronRight size={16} />
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
            {bestSellers.map((item, idx) => (
              <div 
                key={idx} 
                className="snap-start shrink-0 w-72 md:w-1/4 bg-brand-bgMain rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group cursor-pointer relative"
              >
                <div className="absolute top-4 left-4 z-10 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  ⭐ <span className="hidden sm:inline">Best Seller</span>
                </div>
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-xl text-brand-text mb-2 line-clamp-1">{item.name}</h4>
                  <p className="text-brand-primary text-xl font-extrabold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Block 2: Full Menu --- */}
        <div className="bg-brand-bgMain rounded-3xl p-6 md:p-12 shadow-sm border border-brand-primary/10">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-10 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
                    : 'bg-white text-brand-text border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {fullMenu[activeTab].map((item, idx) => (
              <div key={idx} className="flex flex-col group">
                <div className="flex items-end justify-between w-full">
                  <span className="font-medium text-brand-text tracking-wide text-base group-hover:text-brand-primary transition-colors bg-brand-bgMain pr-2 z-10">{item.name}</span>
                  <div className="flex-1 border-b-2 border-dotted border-gray-300 mx-2 mb-1.5 opacity-50 relative top-[-4px]"></div>
                  <span className="font-bold text-brand-text group-hover:text-brand-primary transition-colors bg-brand-bgMain pl-2 z-10">{item.price}</span>
                </div>
                {item.desc && (
                  <span className="text-brand-muted text-sm mt-1 w-11/12">{item.desc}</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Menu;
