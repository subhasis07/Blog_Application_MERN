import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="py-10 bg-gray-800 text-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Logo width="50px" />
                        <span className="ml-2 text-xl font-semibold">Blogs&Co.</span>
                    </div>
                    <p className="text-gray-400">Copyright © 2024. All rights reserved.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold uppercase">Company</h3>
                    <ul>
                        <li><Link to="/" className="hover:text-gray-200">Features</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Pricing</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Affiliate Program</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Press Kit</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold uppercase">Support</h3>
                    <ul>
                        <li><Link to="/" className="hover:text-gray-200">Account</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Help</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Contact Us</Link></li>
                        <li><Link to="/" className="hover:text-gray-200">Customer Support</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;