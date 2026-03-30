import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// ---- Data Bawaan (Fallback jika Supabase kosong) ----
const initialBestSellers = [
  { name: 'Kopi Susu Kasmaran', price: '20K', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400' },
  { name: 'Aren Bomb!', price: '25K', image: 'https://images.unsplash.com/photo-1572442388796-11668a67efcb?auto=format&fit=crop&q=80&w=400' },
  { name: 'Mochaccino', price: '28K', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kentang Goreng', price: '22K', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400' }
];

const initialFullMenu = {
  signature: [
    { name: 'Kopi Susu Kasmaran', price: '20K', desc: 'Espresso, Susu, Krimer & Gula Aren.' },
    { name: 'Kopi Susu Pandan', price: '23K', desc: 'Espresso, Susu, Krimer & Sirup Pandan.' },
    { name: 'Kopi Susu Pisang', price: '23K', desc: 'Espresso, Susu, Krimer & Sirup Pisang.' },
    { name: 'Kopi Susu Merona', price: '25K', desc: 'Espresso, Susu, Krimer & Es Krim Strawberry' },
    { name: 'Double Shaken Espresso', price: '24K', desc: 'Double Shot Espresso, Krimer & Gula Aren.' },
    { name: 'Manies Ireng', price: '24K', desc: 'Espresso & Sirup Leci' },
    { name: 'Aren Bomb!', price: '25K', desc: 'Espresso, Gula Aren, Lemon & Soda.' },
    { name: 'Kopi Greentea', price: '28K', desc: 'Espresso, Greentea & Susu.' }
  ],
  classic: [
    { name: 'Espresso', price: '8K', desc: '' },
    { name: 'Gagah Ireng', price: '20K', desc: 'Espresso & Air' },
    { name: 'Cappuccino', price: '25K', desc: 'Espresso & Susu' },
    { name: 'Latte', price: '25K', desc: 'Espresso & Susu' },
    { name: 'Mochaccino', price: '28K', desc: 'Espresso, Cokelat & Susu' }
  ],
  basic: [
    { name: 'Leci Yakult', price: '20K', desc: '' },
    { name: 'Manies jawa', price: '18K', desc: '' },
    { name: 'Es Teh Leci', price: '18K', desc: '' },
    { name: 'Teh Manies', price: '13K', desc: '' },
    { name: 'Teh Lemon', price: '15K', desc: '' },
    { name: 'Mineral Water', price: '10K', desc: '' }
  ],
  non_kopi: [
    { name: 'Cokelat', price: '24K', desc: 'Cokelat & Susu' },
    { name: 'Taro', price: '24K', desc: 'Taro & Susu' },
    { name: 'Greentea', price: '24K', desc: 'Greentea & Susu' },
    { name: 'Mager-Ya', price: '24K', desc: 'Mangga, Susu & Yakult' },
    { name: 'Lesu-Ya', price: '24K', desc: 'Leci, Susu & Yakult' },
    { name: 'Telang Jiwa', price: '25K', desc: 'Espresso, Soda & Sirup Leci' },
    { name: 'Dimadu', price: '25K', desc: 'Soda, Lemon & Madu' }
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
    { name: 'Bakmie Ayam Renyah', price: '30K', desc: '' }
  ]
};

const initialGallery = [
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1495474472204-51e443152d1b?auto=format&fit=crop&q=80&w=600"
];

const initialTabs = [
  { id: 'signature', label: '🍹 Signature' },
  { id: 'classic', label: '☕ Classic' },
  { id: 'basic', label: '💧 Basic' },
  { id: 'non_kopi', label: '🥤 Non Kopi' },
  { id: 'camilan', label: '🍟 Camilan' }
];

// ---- Helper: Upload gambar ke Supabase Storage ----
const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
};

// ---- Helper: Push semua data ke Supabase ----
const syncToSupabase = async (data) => {
  try {
    const { error } = await supabase
      .from('site_data')
      .update({
        best_sellers: data.bestSellers,
        full_menu: data.fullMenu,
        gallery: data.gallery,
        tabs: data.tabs
      })
      .eq('id', 1);
    if (error) console.error('Supabase sync error:', error);
  } catch (err) {
    console.error('Supabase sync failed:', err);
  }
};

export const DataProvider = ({ children }) => {
  const [bestSellers, setBestSellers] = useState(initialBestSellers);
  const [fullMenu, setFullMenu] = useState(initialFullMenu);
  const [gallery, setGallery] = useState(initialGallery);
  const [tabs, setTabs] = useState(initialTabs);
  const [loading, setLoading] = useState(true);

  // ---- Load data dari Supabase saat pertama kali ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('site_data')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) {
          console.warn('Supabase fetch error, menggunakan data bawaan:', error.message);
          setLoading(false);
          return;
        }

        if (data) {
          // Jika kolom berisi data valid, gunakan. Jika kosong/null, isi dengan data bawaan lalu push.
          const bs = (data.best_sellers && Array.isArray(data.best_sellers) && data.best_sellers.length > 0)
            ? data.best_sellers : initialBestSellers;
          const fm = (data.full_menu && typeof data.full_menu === 'object' && Object.keys(data.full_menu).length > 0)
            ? data.full_menu : initialFullMenu;
          const gl = (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0)
            ? data.gallery : initialGallery;
          const tb = (data.tabs && Array.isArray(data.tabs) && data.tabs.length > 0)
            ? data.tabs : initialTabs;

          setBestSellers(bs);
          setFullMenu(fm);
          setGallery(gl);
          setTabs(tb);

          // Jika Supabase kosong, inisialisasi data bawaan ke cloud
          const isCloudEmpty = !data.best_sellers || !data.full_menu || !data.gallery || !data.tabs;
          if (isCloudEmpty) {
            await syncToSupabase({ bestSellers: bs, fullMenu: fm, gallery: gl, tabs: tb });
            console.log('Data awal berhasil dikirim ke Supabase ☁️');
          }
        }
      } catch (err) {
        console.warn('Gagal terhubung ke Supabase, menggunakan data bawaan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---- Wrapper: Update state lokal + push ke Supabase ----
  const pushUpdate = useCallback((newBs, newFm, newGl, newTb) => {
    syncToSupabase({
      bestSellers: newBs ?? bestSellers,
      fullMenu: newFm ?? fullMenu,
      gallery: newGl ?? gallery,
      tabs: newTb ?? tabs
    });
  }, [bestSellers, fullMenu, gallery, tabs]);

  // ---- CRUD Functions ----
  const updateBestSeller = (index, newData) => {
    const updated = [...bestSellers];
    updated[index] = { ...updated[index], ...newData };
    setBestSellers(updated);
    pushUpdate(updated, null, null, null);
  };

  const updateFullMenuItem = (category, index, newData) => {
    const updatedCategory = [...fullMenu[category]];
    updatedCategory[index] = { ...updatedCategory[index], ...newData };
    const newMenu = { ...fullMenu, [category]: updatedCategory };
    setFullMenu(newMenu);
    pushUpdate(null, newMenu, null, null);
  };

  const addFullMenuItem = (category) => {
    const newItem = { name: 'Item Baru', price: '0K', desc: '' };
    const newMenu = { ...fullMenu, [category]: [...fullMenu[category], newItem] };
    setFullMenu(newMenu);
    pushUpdate(null, newMenu, null, null);
  };

  const deleteFullMenuItem = (category, index) => {
    const updatedCategory = fullMenu[category].filter((_, i) => i !== index);
    const newMenu = { ...fullMenu, [category]: updatedCategory };
    setFullMenu(newMenu);
    pushUpdate(null, newMenu, null, null);
  };

  const updateGalleryItem = (index, newUrl) => {
    const updated = [...gallery];
    updated[index] = newUrl;
    setGallery(updated);
    pushUpdate(null, null, updated, null);
  };

  const addGalleryItem = (url) => {
    if (!url) return;
    const updated = [...gallery, url];
    setGallery(updated);
    pushUpdate(null, null, updated, null);
  };

  const removeGalleryItem = (index) => {
    const updated = gallery.filter((_, i) => i !== index);
    setGallery(updated);
    pushUpdate(null, null, updated, null);
  };

  const resetToFactory = async () => {
    setBestSellers(initialBestSellers);
    setFullMenu(initialFullMenu);
    setGallery(initialGallery);
    setTabs(initialTabs);
    await syncToSupabase({
      bestSellers: initialBestSellers,
      fullMenu: initialFullMenu,
      gallery: initialGallery,
      tabs: initialTabs
    });
  };

  return (
    <DataContext.Provider value={{
      bestSellers, updateBestSeller,
      fullMenu, updateFullMenuItem, addFullMenuItem, deleteFullMenuItem,
      tabs, setTabs,
      gallery, updateGalleryItem, addGalleryItem, removeGalleryItem,
      resetToFactory,
      uploadImage,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};
