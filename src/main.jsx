import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from "react";

export const server = `https://walkie-talkie-1049.onrender.com/api/v1`;

export const Context = createContext({ isAuthenticated: false });

const Appwraper = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setAuth,
        loader,
        setLoader,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwraper />
  </React.StrictMode>
);
