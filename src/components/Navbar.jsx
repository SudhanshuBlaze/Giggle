import { Link } from "react-router-dom";
import { Search } from "./Search";

export const Navbar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-300">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded-xl dark:bg-gray-700 dark:text-gray-300">
            Giggle ⚡
          </p>
        </Link>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-500 border rounded-full px-2 py-1 hover:shadow-lg dark:hover:shadow-2xl "
        >
          {darkTheme ? "Dark 🌙" : "Light 💡"}
        </button>
      </div>
      <Search />
    </div>
  );
};
