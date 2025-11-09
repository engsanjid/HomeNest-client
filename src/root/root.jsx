
import React from "react";
import Navbar from "../component/NavBar/Navbar";
import Footer from "../component/Footer/Footer";
import { Outlet } from "react-router-dom"; 

export default function Root() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
