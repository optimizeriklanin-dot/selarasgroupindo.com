import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { PRODUCTS } from './data/dummyData.js'

// --- SYNCHRONIZE LOCAL STORAGE (AUTO-UPDATE KATEGORI & PRODUK BARU) ---
const localProducts = JSON.parse(localStorage.getItem('products')) || [];

// Gunakan data dari dummyData.js sebagai dasar, tapi JANGAN timpa editan user di Admin
const mergedProducts = PRODUCTS.map(dp => {
  const lp = localProducts.find(p => p.id === dp.id);
  // Jika produk sudah ada di local storage (pernah diedit/disimpan), gunakan data lokal tersebut
  return lp ? lp : dp;
});

// Tambahkan produk yang dibuat manual melalui Admin (jika ada) yang tidak ada di dummyData
const adminOnlyProducts = localProducts.filter(lp => !PRODUCTS.some(dp => dp.id === lp.id));
const finalProducts = [...mergedProducts, ...adminOnlyProducts];

if (JSON.stringify(localProducts) !== JSON.stringify(finalProducts)) {
  localStorage.setItem('products', JSON.stringify(finalProducts));
}
// -------------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
