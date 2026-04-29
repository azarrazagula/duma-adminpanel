import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import { useProducts } from './hooks/useProducts';
import './styles/index.css';

function App() {
  const { searchTerm, setSearchTerm, filteredProducts, products, loading, error } = useProducts();

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-[260px] flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="p-8">
          <Dashboard 
            filteredProducts={filteredProducts} 
            products={products} 
            loading={loading} 
            error={error} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;
