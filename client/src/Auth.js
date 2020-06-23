/* eslint no-restricted-globals: */

import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import { alert } from "./components/Confirm/Confirm";

const LOGIN_SUCCESS_PAGE = "/landingpage";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "demgamestest.auth0.com",
    clientID: "GBdaITi8eaqrS4H4q4JY284ctpmataM2",
    redirectUri: "http://localhost:8080/callback",
    audience: "https://demgamestest.auth0.com/api/v2/",
    responseType: "token id_token",
    scope: "openid profile email address",
  });

  login = () => {
    this.auth0.authorize({
      prompt: "login",
    });
  }

  setCohort = (cohort) => {
    if (localStorage.getItem("cohort_address") !== "/landingpage") {
      localStorage.setItem("cohort_address", cohort);
    }
  }

  getCohort = () => {
    if (localStorage.getItem("cohort_address")) {
      return localStorage.getItem("cohort_address");
    }
    return null;
  }

  setStyle = (style) => {
    if (style !== null) {
      localStorage.setItem("style", style);
    }
  }

  getStyle = () => {
    if (localStorage.getItem("style")) {
      return localStorage.getItem("style");
    }
    return "orange";
  }

  logout = () => {
    // Remove tokens and expiry time
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    location.pathname = LOGIN_FAILURE_PAGE;
  }

  signup() {
    this.auth0.signup(
      {
        connection: "demgamesDB",
        email: null,
        password: null,
        username: null,
      },
      (err) => {
        if (err) return alert(`Something went wrong: ${err.message}`); // eslint-disable-line 
        return alert("success signup without login!"); // eslint-disable-line 
      },
    );
  }

  handleAuthentication() {
    this.auth0.parseHash((error, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        const expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime(),
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = localStorage.getItem("cohort_address") ? localStorage.getItem("cohort_address") : LOGIN_SUCCESS_PAGE;
      } else if (error) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(error); // eslint-disable-line
      }
    });
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  getProfile = () => {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    }
  }

  getAccessToken = () => {
    if (localStorage.getItem("access_token")) {
      return localStorage.getItem("access_token");
    }
  }
}
