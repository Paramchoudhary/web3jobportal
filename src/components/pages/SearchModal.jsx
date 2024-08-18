import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/searchModal.css";

function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Focus on the input when the modal opens
      document.getElementById("search-input").focus();
    }
  }, [isOpen]);

  const handleSearch = async () => {
    // Implement your search logic here
    // This could involve API calls to search for jobs and degens
    // Update searchResults with the fetched data
  };

  const handleResultClick = (result) => {
    // Navigate to the appropriate page based on the result type
    if (result.type === "job") {
      navigate(`/jobs/${result.id}`);
    } else if (result.type === "degen") {
      navigate(`/degen/${result.id}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal">
      <div className="search-modal-overlay" onClick={onClose}></div>
      <div className="search-modal-content">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs and degens..."
        />
        <button onClick={handleSearch}>Search</button>
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.id} onClick={() => handleResultClick(result)}>
              {result.title}
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SearchModal;
