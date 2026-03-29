import React from 'react';

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1495474472204-51e443152d1b?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-bgMain">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Galeri <span className="text-brand-primary">Kedai</span>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Sudut-sudut nyaman yang selalu siap menyambut cerita dan canda tawamu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all group ${
                index === 0 || index === 3 ? 'row-span-2' : ''
              }`}
            >
              <img 
                src={src} 
                alt={`Kopi Bude Pakde Ambience ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square md:aspect-auto min-h-48 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
