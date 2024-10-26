import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import './App.css';
import authService from "./appwrite/auth";
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return loading ? null : (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;