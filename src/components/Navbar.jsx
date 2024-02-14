import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "dark");
      document.body.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode);
      document.body.classList.toggle("dark", prefersDarkMode);
      localStorage.setItem("theme", prefersDarkMode ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark", newTheme);
  };

  return (
    <header
      className={`px-3 md:!px-16  dark:bg-dark-blue dark:text-light-white h-20 flex justify-between items-center`}
    >
      <Link
        to="/rest-countries-api-with-color-theme-switcher"
        className="text-sm font-extrabold sm:text-xl md:text-2xl "
      >
        Where in the world?
      </Link>
      <button
        className="text-sm text-gray-800 font-bold flex justify-center items-center gap-2"
        onClick={toggleTheme}
      >
        <FontAwesomeIcon icon={theme ? faSun : faMoon} />{" "}
        {theme ? "Light" : "Dark"} mode
      </button>
    </header>
  );
};

export default Navbar;
