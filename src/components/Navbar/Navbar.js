import { Link } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import TotalItems from "../CartContent/TotalItems";

import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(dataContext);
  return (
    <div className="nav-Container">
        <nav className="navbar">
          <Link to={"/"}>
            <h1 className="navbarLogo">
              <img alt="logo" src="imgs/pansanoLogoNegro.png" />
            </h1>
          </Link>
          <Link className="seeCart" to={"/cart"}>
            🛒
            {cart.length > 0 ? <TotalItems /> : null}
          </Link>
        </nav>
    </div>
  )
}

export default Navbar;
