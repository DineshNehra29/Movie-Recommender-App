import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios.get("http://127.0.0.1:8080/allmovies")
        .then((response) => {
            const results = response.data.all_movies.filter((movie) => {
                return (
                    value &&
                    movie &&
                    movie.toLowerCase().includes(value.toLowerCase())
                );
            });
            setResults(results);
        })
        .catch((error) => {
            console.error("There was an error fetching the data!", error);
        });
};


  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};