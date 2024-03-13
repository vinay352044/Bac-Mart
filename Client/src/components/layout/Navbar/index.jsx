import { useState } from "react";
import Button from "../../common/Button";
import "./navbar.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { FaHeadphonesAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AdminLinks from "./Links/AdminLinks";
import UserLinks from "./Links/UserLinks";
import SellerLinks from "./Links/SellerLinks";
import logo from '/images/png/logo-no-background.png'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(true);
  const [seller, setSeller] = useState(false);

  return (
    <nav className="bg-[#0295db] sticky top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-8">
        <NavLink
          to={admin ? "/admin" : seller ? "/seller" : "/"}
          className="flex items-center space-x-3"
        >
          <div className="w-[110px]">
            <img
              src={logo}
              alt="logo"
              className="w-full"
            />
          </div>
        </NavLink>
        <Button
          handleClick={() => setShow(!show)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-black"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </Button>
        <div
          className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium text-lg flex flex-col items-center md:p-0 md:flex-row md:space-x-8">
            <li>
              <NavLink
                to={admin ? "/admin" : seller ? "/seller" : "/"}
                className={({ isActive }) =>
                  `${
                    isActive ? '' : "text-white"
                  } text-lg block py-1 hover:text-black`
                }
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <UserLinks />
            ) : seller ? (
              <SellerLinks />
            ) : admin ? (
              <AdminLinks />
            ) : (
              <>
                <li>
                  <NavLink
                    to="/buisness/register"
                    className={({ isActive }) =>
                    `${
                      isActive ? '' : "text-white"
                    } flex items-center gap-2 text-lg py-1 hover:text-black`
                  }
                  >
                    <HiHomeModern />
                    Become Seller
                  </NavLink>
                </li>
              </>
            )}
              <li>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  `${
                    isActive ? '' : "text-white"
                  } flex items-center gap-2 text-lg py-1 hover:text-black`
                }
              >
                <FaHeadphonesAlt/>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-black text-black bg-transparent"
                      : "border-transparent bg-white "
                  } px-6 py-1 my-1 flex items-center gap-2 text-lg  text-[#0295db] rounded border-[2px] transition-all duration-300 ease-in-out hover:border-[2px] hover:border-white hover:bg-transparent hover:text-white`
                }
              >
                <FaRegCircleUser />
                Log In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <li>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `${
        isActive
          ? "text-black md:text-black dark:text-black"
          : "text-white"
      } text-lg block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
    }
  >
    About
  </NavLink>
</li> */
}
