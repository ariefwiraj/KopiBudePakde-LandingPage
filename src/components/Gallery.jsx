import React, { useRef, useState } from 'react';
import { X, Edit2, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const Gallery = ({ isAdmin }) => {
  const { gallery, updateGalleryItem, addGalleryItem, removeGalleryItem, uploadImage } = useData();
  const [uploading, setUploading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'edit', index } or { type: 'add' }
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !pendingAction) return;

    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);

    if (url) {
      if (pendingAction.type === 'edit') {
        updateGalleryItem(pendingAction.index, url);
      } else if (pendingAction.type === 'add') {
        addGalleryItem(url);
      }
    } else {
      alert('Gagal mengupload gambar. Silakan coba lagi.');
    }

    setPendingAction(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerEditUpload = (index) => {
    if (!isAdmin) return;
    setPendingAction({ type: 'edit', index });
    fileInputRef.current?.click();
  };

  const triggerAddUpload = () => {
    if (!isAdmin) return;
    setPendingAction({ type: 'add' });
    fileInputRef.current?.click();
  };

  const handleDeletePhoto = (index) => {
    if (!isAdmin) return;
    if (window.confirm('Yakin hapus foto ini dari galeri?')) {
      removeGalleryItem(index);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-brand-bgMain">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Upload overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader2 size={40} className="animate-spin text-brand-primary" />
            <p className="font-bold text-brand-text">Mengupload gambar...</p>
          </div>
        </div>
      )}

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
          {gallery.map((src, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all group ${
                index === 0 || index === 3 ? 'row-span-2' : ''
              }`}
            >
              {isAdmin && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-4">
                   <button 
                     onClick={() => triggerEditUpload(index)} 
                     className="bg-white text-brand-text p-3 rounded-full hover:bg-brand-primary hover:text-white shadow-md transition-colors"
                     title="Upload Gambar Baru"
                   >
                     <Upload size={18} />
                   </button>
                   <button 
                     onClick={() => handleDeletePhoto(index)} 
                     className="bg-white text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-md transition-colors"
                     title="Hapus Gambar"
                   >
                     <X size={18} />
                   </button>
                </div>
              )}

              <img 
                src={src} 
                alt={`Kopi Bude Pakde Ambience ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square md:aspect-auto min-h-48 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          
          {isAdmin && (
             <button 
                onClick={triggerAddUpload}
                className="w-full aspect-square md:aspect-auto min-h-48 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl text-brand-muted hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all"
             >
                <Upload size={32} className="opacity-70" />
                <span className="font-bold opacity-70">Upload Foto</span>
             </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default Gallery;
