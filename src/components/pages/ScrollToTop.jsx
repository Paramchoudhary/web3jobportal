import React, { useEffect } from 'react'
import setAuthToken from "./../../utils/setAuthToken";
import { useLocation } from "react-router-dom"
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.token) {
            setAuthToken(localStorage.token);
          }
    }, [pathname])
    return (null)
}

export default ScrollToTop; 