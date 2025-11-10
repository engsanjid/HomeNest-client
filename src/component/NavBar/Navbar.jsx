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


  const handleProtectedNav = (path) => {
  if (!user) {
    
    navigate("/login", { state: { from: path || location.pathname } });
  } else {
    navigate(path);
  }
};


  const navStyle = ({ isActive }) =>
    `transition duration-200 px-3 py-1 rounded-md ${
      isActive
        ? "text-primary font-semibold border-b-2 border-primary"
        : "hover:text-primary"
    }`;

  return (
    <header className="w-full bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
  
        <Link to="/" className="text-2xl font-extrabold text-primary">
          HomeNest
        </Link>

     
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>
          <NavLink to="/all-properties" className={navStyle}>
            All Properties
          </NavLink>
          <NavLink
  to="/add-property"
  className={navStyle}
  onClick={(e) => {
    e.preventDefault(); 
    handleProtectedNav("/add-property");
  }}
>
  Add Properties
</NavLink>

<NavLink
  to="/my-properties"
  className={navStyle}
  onClick={(e) => {
    e.preventDefault();
    handleProtectedNav("/my-properties");
  }}
>
  My Properties
</NavLink>

<NavLink
  to="/my-ratings"
  className={navStyle}
  onClick={(e) => {
    e.preventDefault();
    handleProtectedNav("/my-ratings");
  }}
>
  My Ratings
</NavLink>

         
        </nav>

        <div className="flex items-center gap-3">
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
                    <p className="text-xs opacity-70">{user.email}</p>
                  </div>
                </li>
                <li>
                  <NavLink to="/my-properties">My Properties</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link className="btn btn-outline btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm text-white" to="/register">
                Signup
              </Link>
            </div>
          )}

      
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
              <li><Link to="/add-property" onClick={() => handleProtectedNav("/add-property")} >Add Properties</Link></li>
              <li><Link to="/my-properties" onClick={() => handleProtectedNav("/my-properties")}>My Properties</Link></li>
              <li><Link to="/my-ratings" onClick={() => handleProtectedNav("/my-ratings")}>My Ratings</Link></li>
              
              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Signup</Link></li>
                </>
              ) : (
                <li><button onClick={handleLogout}>Logout</button></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
