import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/", { replace: true });
  };

  const goProtected = (path) => {
    if (!user) {
      navigate("/login", { state: { from: path || location.pathname } });
      return;
    }
    navigate(path);
  };

  // Nav link style helper
  const navStyle = ({ isActive }) =>
    `transition-colors duration-200 px-3 py-1 rounded-md ${
      isActive
        ? "text-primary font-semibold border-b-2 border-primary"
        : "hover:text-primary"
    }`;

  return (
    <header className="w-full bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
            HomeNest
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>
          <NavLink to="/all-properties" className={navStyle}>
            All Properties
          </NavLink>

          {/* Protected routes */}
          <button onClick={() => goProtected("/add-property")} className="hover:text-primary transition-colors">
            Add Properties
          </button>
          <button onClick={() => goProtected("/my-properties")} className="hover:text-primary transition-colors">
            My Properties
          </button>
          <button onClick={() => goProtected("/my-ratings")} className="hover:text-primary transition-colors">
            My Ratings
          </button>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* If logged in */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full ring ring-primary ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/100?img=12"}
                    alt={user.displayName || user.email}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
              >
                <li>
                  <div className="px-2 py-1 border-b mb-1">
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-xs opacity-70 break-words">{user.email}</p>
                  </div>
                </li>
                <li>
                  <button onClick={() => goProtected("/my-properties")}>My Properties</button>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // If not logged in
            <div className="hidden lg:flex gap-2">
              <Link className="btn btn-outline btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm text-white" to="/register">
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-properties">All Properties</Link></li>
              <li><button onClick={() => goProtected("/add-property")}>Add Properties</button></li>
              <li><button onClick={() => goProtected("/my-properties")}>My Properties</button></li>
              <li><button onClick={() => goProtected("/my-ratings")}>My Ratings</button></li>

              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Signup</Link></li>
                </>
              ) : (
                <>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
