import React from "react";
import { Container, LogOutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md text-white">
            <Container>
                <nav className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <Logo width="60px" />
                        <span className="text-lg font-bold ml-2">Blogs&Co.</span>
                    </Link>
                    <ul className="flex space-x-4">
                        {navItems.map(item => (
                            item.active && (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-4 py-2 rounded-lg transition duration-200 hover:bg-white hover:text-blue-600"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            )
                        ))}
                        {authStatus && (
                            <li>
                                <LogOutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;