import React from 'react'
import "../Styles/navbar.css"

const Navbar = () => {

  return (
    <>
    <div className="navbar">
      <div className="logo">
        {/* <FaStore size={24} /> Replace with your Treeex store logo */}
        <span>TeeRex Store</span>
      </div>
      <div className="menu">
        <div className="menu-item ">
          <a href="#">
            {/* <FaShoppingCart className="icon" /> Cart icon */}
            Cart
          </a>
        </div>
        <div className="menu-item">
          <a href="#">
            <span className="icon">Products</span>
          </a>
        </div>
      </div>
    </div>  

    </>
  )
}

export default Navbar