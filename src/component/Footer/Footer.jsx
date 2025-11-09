import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
     
        <div>
          <Link to="/" className="text-2xl font-extrabold text-primary">
            HomeNest
          </Link>
          <p className="mt-3 text-sm opacity-80 leading-relaxed">
            Your trusted platform for buying, selling, and renting real estate.
            Discover properties by location, price, and category — all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/all-properties" className="hover:text-primary transition-colors">All Properties</Link></li>
            <li><Link to="/add-property" className="hover:text-primary transition-colors">Add Property</Link></li>
            <li><Link to="/my-properties" className="hover:text-primary transition-colors">My Properties</Link></li>
            <li><Link to="/my-ratings" className="hover:text-primary transition-colors">My Ratings</Link></li>
          </ul>
        </div>


        <div>
          <h4 className="text-lg font-semibold mb-3 text-primary">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@homenest.com" className="hover:text-primary">info@homenest.com</a></li>
            <li>Phone: <a href="tel:+880123456789" className="hover:text-primary">+880 123 456 789</a></li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

 
        <div>
          <h4 className="text-lg font-semibold mb-3 text-primary">Stay Connected</h4>
          <div className="flex gap-4 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482A13.953 13.953 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.524 6.573 4.897 4.897 0 0 1-2.229-.616c-.054 2.281 1.582 4.415 3.95 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.42A9.867 9.867 0 0 1 0 19.54a13.945 13.945 0 0 0 7.548 2.211c9.058 0 14.01-7.513 13.995-14.271.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.785 1.163 4.92 4.92 0 0 1 1.162 1.785c.17.46.355 1.26.41 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.935 4.935 0 0 1-1.162 1.785 4.935 4.935 0 0 1-1.785 1.162c-.46.17-1.26.355-2.43.41-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.935 4.935 0 0 1-1.785-1.162 4.935 4.935 0 0 1-1.162-1.785c-.17-.46-.355-1.26-.41-2.43C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43A4.92 4.92 0 0 1 3.805 2.935 4.92 4.92 0 0 1 5.59 1.773c.46-.17 1.26-.355 2.43-.41C8.284 1.304 8.664 1.292 11.868 1.292zM12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8.001 4 4 0 0 1 0 8.001zm6.406-11.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z"/>
              </svg>
            </a>
          </div>

          <div className="text-sm opacity-80">
            <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link> |{" "}
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>

    
      <div className="border-t border-base-300 text-center py-4 text-sm opacity-70">
        © {new Date().getFullYear()} HomeNest — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
