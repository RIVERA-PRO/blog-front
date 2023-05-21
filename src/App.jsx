
import './App.css';
import { router, } from "./Pages/index";
import { RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import Alert from "./Components/Alert/Alert";

function App() {


  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false
  }
  const [theme, setTheme] = useState(getTheme())
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])
  return (

    <Provider store={store}>
      <div className={theme ? "theme-dark" : ""}>

        <RouterProvider router={router} />
        <div className='cometent-bg-color main-content'>

          <label className='label-style' htmlFor="darkmode">
            <FontAwesomeIcon icon={theme ? faSun : faMoon} className="darkmode-icon" />
            <input type="checkbox" className='darkmode checkbox-style' id="darkmode" onChange={() => setTheme(!theme)} />
          </label>

        </div>
      </div>
      <Alert />
    </Provider>
  );
}

export default App;
