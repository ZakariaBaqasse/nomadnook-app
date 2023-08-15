import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HomeNavBarProps } from "../utils/types";

const HomeNavBar = ({ onSignUp, onLogin }: HomeNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="flex justify-between p-5 items-center flex-col lg:flex-row">
      <div className="flex justify-between w-screen items-center px-6">
        <div className="homepage-logo">
          <Link to="/">
            <img src="/logo-sm.png" />
          </Link>
        </div>
        <div onClick={toggleMenu} className="lg:hidden">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
      </div>
      <ul
        className={` transition-all ease-out duration-300 flex font-primary font-semibold lg:flex-row flex-col items-center ${
          !isNavOpen ? "hidden__nav" : ""
        }`}
      >
        <li className="lg:mr-6">
          <button className="nav__button--login mb-4 lg:mb-0" onClick={onLogin}>
            Login
          </button>
        </li>
        <li>
          <button className="nav__button--signup" onClick={onSignUp}>
            SignUp
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavBar;
