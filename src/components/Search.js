import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.length === 0) return;

    console.log(query);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      {/* Input */}
      <input
        type="text"
        className="search__input"
        placeholder="e.g. Avengers 2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search Button */}
      <div className="search__button" onClick={handleSubmit}>
        <SearchIcon className="search__icon" />
      </div>
    </form>
  );
};

export default Search;
