import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { searchInTMDB } from "../fetch-data/searchResults";

import "./Search.css";
import SearchItem from "./SearchItem";

const Search = ({ header }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // console.log("Search Results >>> ", results);

  /**** Search Button is Clicked ****/
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (query.length === 0) return;

    // Call IMDB API and get search results
    searchInTMDB(query, setResults);

    // Open the dropdown
    setDropdown(true);
  };

  /**** Close Button is clicked ****/
  const handleClose = () => {
    // Clear the results
    setResults([]);

    // Clear the input field
    setQuery("");

    // Close the dropdown
    setDropdown(false);
  };

  /**** Close dropdown is input field becomes empty ****/
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setDropdown(false);
    }
  }, [query]);

  return (
    <div className="search">
      {/* Search Bar */}
      <form className="search__form" onSubmit={handleSubmit}>
        {/* Input */}
        <input
          type="text"
          className="search__input"
          placeholder="e.g. Spiderman"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={
            header && {
              padding: "9px 0 9px 20px",
              fontSize: "22px",
            }
          }
        />

        {/* Search Button */}
        <div className="search__button">
          {!dropdown && (
            <SearchIcon className="search__icon" onClick={handleSubmit} />
          )}

          {dropdown && (
            <CloseIcon className="search__icon" onClick={handleClose} />
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      {dropdown && (
        <div className="search__dropdown">
          {results?.map(({ id, title, titleExtension, image }) => (
            <SearchItem
              key={id}
              id={id}
              image={image}
              title={title}
              titleExtension={titleExtension}
              setQuery={setQuery}
              setDropdown={setDropdown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
