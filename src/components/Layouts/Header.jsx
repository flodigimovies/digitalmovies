import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/digital-movies-logo.png";
import { Search } from "../Sections/Search";
import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
import { useCart } from "../../context";

export const Header = () => {
  const { cartList } = useCart();
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) ?? true);
  const [searchSection, setSearchSection] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const dropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  useEffect(() => {
    const handleScroll = () => setDropdown(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md">
          <div className="border-b border-slate-200 dark:border-b-0 flex flex-row justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">

            {/* Logo + Brand */}
            <Link to="/" className="flex items-center gap-1 min-w-0 flex-shrink">
              <img src={Logo} className="h-8 sm:h-17 flex-shrink-0" alt="Digital Movies Logo" />

              <span
                className="text-sm sm:text-2xl font-bold truncate"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                <span className="text-red-600">Digi</span>
                <span className="text-gray-900 dark:text-gray-100">Hub</span>
                <span className="text-red-600">PH</span>
              </span>

            </Link>

            {/* Right Side Icons */}
            <div className="flex flex-row items-center gap-3 sm:gap-5 flex-shrink-0 relative">

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                className="cursor-pointer flex flex-col items-center justify-center gap-0.5 w-10 text-gray-700 dark:text-white bg-transparent border-none"
              >
                <span className={`text-xl flex items-center justify-center ${darkMode ? "bi bi-moon" : "bi bi-sun"}`}></span>
                <span className="text-[10px] leading-none text-center w-full">{darkMode ? "Dark" : "Light"}</span>
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchSection(!searchSection)}
                title="Search"
                className="cursor-pointer flex flex-col items-center justify-center gap-0.5 w-10 text-gray-700 dark:text-white bg-transparent border-none"
              >
                <span className="text-xl bi bi-search flex items-center justify-center"></span>
                <span className="text-[10px] leading-none text-center w-full">Search</span>
              </button>

              {/* Cart */}
              <Link to="/cart" title="Cart" className="flex flex-col items-center justify-center gap-0.5 w-10 text-gray-700 dark:text-white">
                <span className="relative inline-flex items-center justify-center w-6 h-6">
                  <span className="text-xl bi bi-cart-fill"></span>
                  {cartList.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartList.length}
                    </span>
                  )}
                </span>
                <span className="text-[10px] leading-none text-center w-full">Cart</span>
              </Link>

              {/* Account */}
              <div ref={dropdownRef} className="relative flex flex-col items-center justify-center">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  title="Account"
                  className="cursor-pointer flex flex-col items-center justify-center gap-0.5 w-10 text-gray-700 dark:text-white bg-transparent border-none"
                >
                  <span className="bi bi-person-circle text-xl flex items-center justify-center"></span>
                  <span className="text-[10px] leading-none text-center w-full">Account</span>
                </button>

                {dropdown && (token ?
                  <DropdownLoggedIn setDropdown={setDropdown} /> :
                  <DropdownLoggedOut setDropdown={setDropdown} />)}
              </div>

            </div>

          </div>
        </nav>
      </header>
      {searchSection && <Search setSearchSection={setSearchSection} />}
    </>
  );
};
