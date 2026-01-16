import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faShoppingCart,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/Cart-Context.jsx";
import { useCart } from "../store/Cart-Context.jsx";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    const savedTheme =
      localStorage.getItem("theme") === "dark" ? "dark" : "light";
    return savedTheme;
  });

  const { totalQuantity } = useCart();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

  const iconWrapper =
    "flex items-center justify-center h-10 w-10 rounded-full transition hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="mx-auto flex max-w-[1152px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-primary">
          <FontAwesomeIcon icon={faTags} className="h-8 w-8 dark:text-light" />
          <span className="text-xl font-primary font-extrabold text-center text-primary dark:text-light">
            StickyVibe
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center py-2 z-10">
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => {
                  return isActive ? `underline ${navLinkClass}` : navLinkClass;
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => {
                  return isActive ? `underline ${navLinkClass}` : navLinkClass;
                }}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => {
                  return isActive ? `underline ${navLinkClass}` : navLinkClass;
                }}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive ? `underline ${navLinkClass}` : navLinkClass;
                }}
              >
                Login
              </NavLink>
            </li>

            {/* Cart */}
            <li>
              <NavLink to="/cart" className="relative text-primary py-2">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="dark:text-light text-primary w-5"
                />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </NavLink>
            </li>

            {/* Theme Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? faSun : faMoon}
                  className="w-4 h-4 dark:text-light text-primary"
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
