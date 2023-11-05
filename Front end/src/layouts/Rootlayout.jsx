import React, { useEffect } from 'react';


import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/footer";
import HeaderT from "../components/HeaderT";


function Rootlayout() {

  

  return (
    <>
    
    <div className="root-layout">
      <header>
        <nav>
          <HeaderT />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
    </>
  );
}

export default Rootlayout;
