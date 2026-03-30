import React, { useState, useRef } from 'react';
import { ChevronRight, Edit2, Plus, Trash2, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const Menu = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState('signature');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [pendingUpload, setPendingUpload] = useState(null); // { type: 'bestSeller', index: 0 }
  
  const { bestSellers, updateBestSeller, fullMenu, updateFullMenuItem, addFullMenuItem, deleteFullMenuItem, tabs, uploadImage } = useData();

  // File upload handler
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !pendingUpload) return;

    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);

    if (url) {
      if (pendingUpload.type === 'bestSeller') {
        updateBestSeller(pendingUpload.index, { image: url });
      }
    } else {
      alert('Gagal mengupload gambar. Silakan coba lagi.');
    }

    setPendingUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerImageUpload = (type, index) => {
    if (!isAdmin) return;
    setPendingUpload({ type, index });
    fileInputRef.current?.click();
  };

  // Handlers for Best Sellers text fields
  const handleEditBestSeller = (index, field, currentValue) => {
    if (!isAdmin) return;
    const newVal = prompt(`Ubah ${field}:`, currentValue);
    if (newVal !== null) updateBestSeller(index, { [field]: newVal });
  };

  // Handlers for Full Menu
  const handleEditMenu = (category, index, field, currentValue) => {
    if (!isAdmin) return;
    const newVal = prompt(`Ubah ${field}:`, currentValue);
    if (newVal !== null) updateFullMenuItem(category, index, { [field]: newVal });
  };

  const handleDeleteMenu = (category, index) => {
    if (!isAdmin) return;
    if (window.confirm("Yakin ingin menghapus menu ini?")) {
      deleteFullMenuItem(category, index);
    }
  };

  return (
    <section id="menu" className="py-24 bg-white scroll-mt-20">
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
                className="snap-start shrink-0 w-72 md:w-1/4 bg-brand-bgMain rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group relative"
              >
                <div className="absolute top-4 left-4 z-10 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  ⭐ <span className="hidden sm:inline">Best Seller</span>
                </div>
                
                {isAdmin && (
                  <button 
                    onClick={() => triggerImageUpload('bestSeller', idx)}
                    className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full text-brand-text hover:text-brand-primary shadow-sm hover:shadow-md transition-all"
                    title="Upload Gambar Baru"
                  >
                    <Upload size={16} />
                  </button>
                )}

                <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => isAdmin && triggerImageUpload('bestSeller', idx)}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-full flex items-center gap-2">
                        <Upload size={14} /> Upload gambar
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 
                    className={`font-bold text-xl text-brand-text mb-2 line-clamp-1 ${isAdmin ? 'cursor-pointer hover:text-brand-primary' : ''}`}
                    onClick={() => handleEditBestSeller(idx, 'name', item.name)}
                    title={isAdmin ? "Ubah nama" : ""}
                  >
                    {item.name} {isAdmin && <Edit2 size={12} className="inline ml-1 opacity-50" />}
                  </h4>
                  <p 
                    className={`text-brand-primary text-xl font-extrabold ${isAdmin ? 'cursor-pointer hover:text-brand-hover' : ''}`}
                    onClick={() => handleEditBestSeller(idx, 'price', item.price)}
                    title={isAdmin ? "Ubah harga" : ""}
                  >
                    {item.price} {isAdmin && <Edit2 size={12} className="inline ml-1 opacity-50" />}
                  </p>
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
            {fullMenu[activeTab]?.map((item, idx) => (
              <div key={idx} className="flex flex-col group relative">
                <div className="flex items-end justify-between w-full">
                  <span 
                    className={`font-medium text-brand-text tracking-wide text-base bg-brand-bgMain pr-2 z-10 ${isAdmin ? 'cursor-pointer hover:text-brand-primary' : ''}`}
                    onClick={() => handleEditMenu(activeTab, idx, 'name', item.name)}
                  >
                    {item.name} {isAdmin && <Edit2 size={12} className="inline ml-1 opacity-0 group-hover:opacity-60 transition-opacity" />}
                  </span>
                  <div className="flex-1 border-b-2 border-dotted border-gray-300 mx-2 mb-1.5 opacity-50 relative top-[-4px]"></div>
                  <span 
                    className={`font-bold text-brand-text bg-brand-bgMain pl-2 z-10 ${isAdmin ? 'cursor-pointer hover:text-brand-primary' : ''}`}
                    onClick={() => handleEditMenu(activeTab, idx, 'price', item.price)}
                  >
                    {item.price}
                  </span>
                  
                  {isAdmin && (
                    <button 
                      onClick={() => handleDeleteMenu(activeTab, idx)} 
                      className="absolute -right-8 md:-right-10 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-20 top-0.5 mt-0.5"
                      title="Hapus menu"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                {item.desc !== undefined && (
                  <span 
                    className={`text-brand-muted text-sm mt-1 w-11/12 ${isAdmin ? 'cursor-pointer hover:text-brand-text' : ''}`}
                    onClick={() => handleEditMenu(activeTab, idx, 'desc', item.desc)}
                  >
                    {item.desc || (isAdmin ? '+ tambah deskripsi' : '')}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {isAdmin && (
            <button 
              onClick={() => addFullMenuItem(activeTab)}
              className="mt-10 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-brand-muted hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 flex items-center justify-center gap-2 transition-colors font-bold"
            >
              <Plus size={20} /> Tambah Menu di Kategori {tabs.find(t=>t.id === activeTab)?.label}
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default Menu;
