import React, { useState } from "react";
import { Routes } from "./components/Routes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    // dark mode wrapper div
    <div className={darkTheme ? "dark" : ""}>
      {/* container div */}
      <div className="bg-gray-200 dark:bg-gray-900 dark:text-gray-200 min-h-screen ">
        {/* passing props to NavBar */}
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Routes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
