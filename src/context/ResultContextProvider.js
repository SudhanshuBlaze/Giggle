import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  // /images, /videos, /search
  // while calling "getResults()" function along with 'type' search term is also passed in the same string
  const getResults = async type => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-proxy-location": "US",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    });
    const data = await response.json();
    console.log(data);

    // we need to follow this procedure because the data we are getting from the "/news" api call
    // contains an object called "entries" and entries is a built-in function on a js object

    if (type.includes("/news")) setResults(data.entries);
    else if (type.includes("/images")) setResults(data.image_results);
    else setResults(data.results); //for 'videos' also this case is triggered

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

//with this, in each component we don't need to import useContext each time to grab the data from ReactContext
export const useResultContext = () => useContext(ResultContext); //custom hook
