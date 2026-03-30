import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // btoa('kopibudepakde') = a29waWJ1ZGVwYWtkZQ==
    // btoa('1234567') = MTIzNDU2Nw==
    
    // Obfuscated check
    const isUserValid = btoa(username) === 'a29waWJ1ZGVwYWtkZQ==';
    const isPassValid = btoa(password) === 'MTIzNDU2Nw==';

    if (isUserValid && isPassValid) {
      sessionStorage.setItem('kbp_admin_token', 'true');
      onLoginSuccess();
    } else {
      setError('Kredensial tidak valid!');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bgMain flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-brand-primary/10 overflow-hidden">
        <div className="bg-brand-primary text-white p-8 text-center">
          <h2 className="text-3xl font-bold font-serif tracking-widest leading-none mb-2">KOPI</h2>
          <h3 className="text-xl font-bold font-serif tracking-wide opacity-90">BUDE PAKDE</h3>
          <p className="mt-4 text-white/80 text-sm">Portal Administrator</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-brand-text font-bold mb-2 text-sm">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-medium text-brand-text"
              placeholder="Masukkan username"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-brand-text font-bold mb-2 text-sm">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-medium text-brand-text"
              placeholder="•••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-brand-primary/20 transform hover:-translate-y-0.5"
          >
            Masuk ke Panel Admin
          </button>
          
          <div className="mt-6 text-center">
             <a href="/" className="text-brand-muted hover:text-brand-primary text-sm font-medium transition-colors">
               ← Kembali ke Beraanda
             </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
