/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HealthVault from './components/HealthVault';
import Marketplace from './components/Marketplace';
import Forum from './components/Forum';
import VetSearch from './components/VetSearch';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onStart={() => setCurrentPage('health')} />
            <HealthVault />
            <VetSearch />
            <Marketplace />
            <Forum />
          </>
        );
      case 'health':
        return <HealthVault />;
      case 'marketplace':
        return <Marketplace />;
      case 'community':
        return <Forum />;
      case 'vets':
        return <VetSearch />;
      default:
        return <Hero onStart={() => setCurrentPage('health')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
