import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Darkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // Function to toggle between dark mode and light mode
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    const newIsDarkMode = body.classList.contains('dark-mode');
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('dark-mode', newIsDarkMode);
  };

  useEffect(() => {
    // Check if the user has a preference for dark mode in localStorage on component mount
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode) {
      document.body.classList.toggle('dark-mode', savedDarkMode === 'true');
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  return (
    <div>
      <button className="btn text-white" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>
    </div>
  );
};

export default Darkmode;
