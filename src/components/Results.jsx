import React, { useEffect } from "react";
import { useLocation } from "react-router";
import ReactPlayer from "react-player";
import { Loading } from "./Loading";
import { useResultContext } from "../context/ResultContextProvider";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); //news, images, videos -> current location
  // console.log(location.pathname);

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    } // eslint-disable-next-line
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.map(({ link, title, description }, index) => (
            <div key={index} className="md:w-2/5 w-full ">
              {/* if the screen size is >768px then width:40%, which means 2 columns of result */}
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>

                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>

                <p className="text-sm dark:text-gray-400 text-gray-600">
                  {description.length > 100
                    ? description.substring(0, 100) + "..."
                    : description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="sm:p-3 p-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6 items-center">
          {results?.map(({ links, id, source, title, published }, index) => (
            <div key={id} className="md:w-2/5 w-full ">
              {/* if the screen size is >768px then width:40%, which means 2 columns of result */}
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(published).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </a>

              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap ">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              {/* if there's link then only render video player */}
              {video.additional_links?.[0].href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "Error";
  }
};
