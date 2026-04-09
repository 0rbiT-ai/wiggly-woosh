import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { CartItem, ToastMessage } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HealthVault from './components/HealthVault';
import Marketplace from './components/Marketplace';
import Forum from './components/Forum';
import VetSearch from './components/VetSearch';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import BackToTop from './components/BackToTop';

// Cart Context
interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem['product']) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  itemCount: number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  itemCount: 0,
});

export const useCart = () => useContext(CartContext);

// Toast Context
interface ToastContextType {
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wigglywoosh-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wigglywoosh-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Toast management
  const addToast = useCallback((type: ToastMessage['type'], title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Cart management
  const addToCart = useCallback((product: CartItem['product']) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast('success', 'Added to Cart', `${product.name} has been added to your cart.`);
  }, [addToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    <ToastContext.Provider value={{ addToast }}>
      <CartContext.Provider value={{ items: cartItems, addToCart, updateQuantity, removeFromCart, itemCount }}>
        <div className="min-h-screen flex flex-col">
          <Navbar
            onNavigate={setCurrentPage}
            currentPage={currentPage}
            onCartOpen={() => setCartOpen(true)}
            cartCount={itemCount}
          />
          <main className="flex-grow pt-16">
            {renderPage()}
          </main>
          <Footer onNavigate={setCurrentPage} />
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onShowToast={(title, message) => addToast('success', title, message)}
          />
          <Toast toasts={toasts} onDismiss={dismissToast} />
          <BackToTop />
        </div>
      </CartContext.Provider>
    </ToastContext.Provider>
  );
}
