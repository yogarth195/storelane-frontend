import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { Navbar } from './components/Navbar';
// import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';
import { JumpToTop } from './components/JumpToTop';

// Pages
import { SignUpApp } from './pages/SignUp';
import { SignInApp } from './pages/SignIn';
import { LogoutPage } from './pages/Logout';
import { ProductPage } from './pages/ProductPage';
import { ProductsRenderPage } from './pages/ProductsRenderPage';
import { SearchResults } from './pages/SearchResult';
import { MyCart } from './pages/MyCart';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/Profile';
import { NotfoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/Home';
import { TestingPage } from './pages/TestingPage';
import { SellerPage } from './pages/Seller/StartSelling';
import { YourStore } from './pages/Seller/YourStore';
import { UploadProduct } from './pages/Seller/UploadProduct';

// Seller Layout with Sidebar
import { SellerSideBar } from './components/Seller Components/SideBar';
import { SellerSettingsPage } from './pages/Seller/SettingsPage';
import { SellerProductsPage } from './pages/Seller/SellerProducts';
import { MyOrders } from './pages/Orders';
import { SellerOrdersPage } from './pages/Seller/OrdersPage';
import { ComingSoonPage } from './pages/Seller/ComingSoonPage';
import { UpdateProduct } from './pages/Seller/UpdateProduct';


const SellerLayout = ({ children }) => {
  return (
        <div className="flex">
            <SellerSideBar />
            <main className="ml-64 p-6 w-full min-h-screen bg-gray-50">{children}</main>
        </div>
  );
};

function App() {
    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        const storedState = JSON.parse(localStorage.getItem('sidebarState'));
        if (storedState !== null) setShowSideBar(storedState);
    }, []);

    const toggleSideBar = () => {
        setShowSideBar((prev) => {
        const newState = !prev;
        localStorage.setItem('sidebarState', JSON.stringify(newState));
        return newState;
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <BrowserRouter>
                <Navbar />

                <div className="flex flex-1">

                    <main className="flex-1">
                        <Routes>
                        {/* General Routes */}
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/signup" element={<SignUpApp />} />
                            <Route path="/signin" element={<SignInApp />} />
                            <Route path="/logout" element={<LogoutPage />} />
                            <Route path="/products" element={<ProductPage/>} />
                            <Route path="/products/:productId/:productName" element={<ProductsRenderPage />} />
                            <Route path="/searchresults" element={<SearchResults/>} />
                            <Route path="/myCart" element={<MyCart />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path='/myOrders' element={<MyOrders/>} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/temp" element={<TestingPage />} />

                            {/* Seller Onboarding */}
                            <Route path="/seller" element={<SellerPage />} />

                            {/* Seller Dashboard Layout */}
                            <Route
                                path="/seller-dashboard"
                                element={
                                <SellerLayout>
                                    <YourStore />
                                </SellerLayout>
                                }
                            />
                            <Route
                                path="/seller/upload"
                                element={
                                <SellerLayout>
                                    <UploadProduct />
                                </SellerLayout>
                                }
                            />
                            <Route
                                path="/seller/settings"
                                element={
                                <SellerLayout>
                                    <SellerSettingsPage/>
                                </SellerLayout>
                                }
                            />
                            <Route
                                path="/seller/products"
                                element={
                                <SellerLayout>
                                    <SellerProductsPage/>
                                </SellerLayout>
                                }
                            />

                            <Route
                                path='/seller/orders'
                                element={
                                    <SellerLayout>
                                        <SellerOrdersPage/>
                                    </SellerLayout>
                                }
                            />
                            

                            <Route
                                path='/seller/messages'
                                element={
                                    <SellerLayout>
                                        <ComingSoonPage/>
                                    </SellerLayout>
                                }
                            />
                            <Route
                                path='/seller/notifications'
                                element={
                                    <SellerLayout>
                                        <ComingSoonPage/>
                                    </SellerLayout>
                                }
                            />
                            <Route
                                path='/seller/customers'
                                element={
                                    <SellerLayout>
                                        <ComingSoonPage/>
                                    </SellerLayout>
                                }
                            />

                            <Route
                                path='/seller/product/update/:id'
                                element={
                                    <SellerLayout>
                                        <UpdateProduct/>
                                    </SellerLayout>
                                }
                            />

                            {/* 404 */}
                            <Route path="*" element={<NotfoundPage />} />
                        </Routes>

                        <JumpToTop />
                    </main>
                </div>

                <Footer/>
            </BrowserRouter>
        </div>
      );
}

export default App;
