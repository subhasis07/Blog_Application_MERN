import React from "react";
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogOutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService
            .logout()
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.error("Logout error:", error);
                // Optionally show a toast or alert to the user indicating an error
                alert("Logout failed. Please try again."); 
            });
    };

    return (
        <button
            className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white"
            onClick={logoutHandler}
            aria-label="Logout"
        >
            Logout
        </button>
    );
}

export default LogOutBtn;