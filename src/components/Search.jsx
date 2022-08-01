import { Links } from "./Links";
import { useEffect, useState } from "react";
import { useResultContext } from "../context/ResultContextProvider";
import { useDebounce } from "use-debounce/lib";
/*we don't want to do a api call after each search letter,
so we can set a timer such that after that time only there would be a API call 
for whatever search text is there,
this would stop the server from getting spammed by the api calls */

export const Search = () => {
  const [text, setText] = useState("Elon Musk");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 500); //we to debounce text after each 500ms
  // whenever "text" is changed, 500ms after that 'searchTerm' is set
  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
    // eslint-disable-next-line
  }, [debouncedValue]);
  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 dark:bg-gray-700 dark:text-white rounded-full shadow-sm outline-none px-6 py-2  text-black hover:shadow-lg"
        placeholder="Search Giggle..."
        onChange={e => setText(e.target.value)}
      />
      {text && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-xl text-gray-200"
          onClick={() => setText(" ")}
        >
          X
        </button>
      )}
      <Links />
    </div>
  );
};
