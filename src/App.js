import React, { Suspense, lazy, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import "./App.css"
import ClipLoader from 'react-spinners/ClipLoader';

const ProductList = lazy(() => import('./components/ProductList/ProductList'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedNav, setSelectedNav] = useState('home'); 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="App">
              {isAuthenticated && (
                <Navbar
                  setSelectedNav={setSelectedNav}
                  selectedNav={selectedNav}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
              <Suspense
  fallback={
    <div className="suspense-spinner">
      <ClipLoader color="#007bff" size={24} />
    </div>
  }
>
                <Routes>
                  {!isAuthenticated ? (
                    <>
                      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                      <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                      <Route path="*" element={<Navigate to="/" />} /> 
                    </>
                  ) : (
                    <>
                      <Route
                        path="/home"
                        element={selectedNav === 'home' ? <ProductList /> : <Navigate to="/cart" />}
                      />
                      <Route
                        path="/cart"
                        element={selectedNav === 'cart' ? <Cart /> : <Navigate to="/home" />}
                      />
                      <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect any unknown route to home */}
                    </>
                  )}
                </Routes>
              </Suspense>
            </div>
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
