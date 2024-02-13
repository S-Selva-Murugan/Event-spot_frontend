import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  useImperativeHandle(ref, () => ({
    show(message, type) {
      setSnackbarMessage(message);
      setSnackbarType(type);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));

  return (
    <div
      className="snackbar"
      id={showSnackbar ? "show" : "hide"}
      style={{
        backgroundColor: snackbarType === "success" ? "#00F593" : "#FF0033",
        color: snackbarType === "success" ? "black" : "white",
      }}
    >
      <div className="symbol">
        {snackbarType === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{snackbarMessage}</div>
    </div>
  );
});

export default Snackbar;
