import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { PRODUCTS } from './data/dummyData.js'

// --- SYNCHRONIZE LOCAL STORAGE JIKA ADA PENAMBAHAN DI DUMMY DATA ---
const localProducts = JSON.parse(localStorage.getItem('products')) || [];
if (localProducts.length < PRODUCTS.length) {
  // Hanya ambil produk yang ID-nya belum ada di local storage
  const newItems = PRODUCTS.filter(p => !localProducts.some(lp => lp.id === p.id));
  if (newItems.length > 0) {
    const updatedProducts = [...localProducts, ...newItems];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  }
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
