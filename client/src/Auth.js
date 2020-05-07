// src/Auth/Auth.js
/* eslint no-restricted-globals: */
import auth0 from "auth0-js";
//import jwtDecode from "jwt-decode";
import jwtDecode from "jwt-decode";

// jwtDecode =require(jwt-decode);

let LOGIN_SUCCESS_PAGE = "/landingpage";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "demgamestest.auth0.com",
    clientID: "GBdaITi8eaqrS4H4q4JY284ctpmataM2",
    redirectUri: "http://localhost:8080/callback",
    audience: "https://demgamestest.auth0.com/api/v2/",
    responseType: "token id_token",
    scope: "openid profile email address"
  });

  // auth0 = new auth0.WebAuth({
  //   domain: 'pankaj-hashedin.auth0.com',
  //  clientID: '8APzGywrBbRrfx5BEx5iHFV6Zq3GWQai',
  //  redirectUri: 'http://localhost:8080/callback',
  //  audience:'https://pankaj-hashedin.auth0.com/api/v2/',
  //  responseType: 'token id_token',
  //  scope: 'openid profile email address'
  // });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize({
      prompt: "login"
    });
  }

  getCohortSelected() {
    
    let cohort_name = (window.location.pathname.split("/landingpage")[0].split("/")[1]);
    console.log("Cohort Name from Auth" + cohort_name);
/*
    const url = config.baseUrl + "/listCohort/";
    fetch(url + cohort_name, {
            //fetch(config.baseUrl + "/user/findOne/" + authDetail.player_email,  {
            method: "get",
            headers: {
                // authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                Accept: "application/json"
            }
    })
    .then(res => res.json())
    .then(data => {
        if (data.length == 0) {
            console.log("Data Length is not 0");
            console.log(JSON.stringify(data));
        } else {
                cohortData.id = data[0].id,
                cohortData.name = data[0].name,
                cohortData.logo = data[0].logo,
                
                console.log("Data Returned Back" + this.props.getCohorts(cohortData));
        }
    })
    .catch(err => console.log(err));
  */
  }

  setCohort(cohort) {
    
    if(localStorage.getItem("cohort_address") !== "/landingpage") {
      //this.getCohortSelected();
      localStorage.setItem("cohort_address", cohort);
    }
  }

  getCohort(){
    if (localStorage.getItem("cohort_address")) {
      return localStorage.getItem("cohort_address");
    }
  }

  setStyle(style){
    if(style !== null) {
      localStorage.setItem("style", style);
    }
  }

  getStyle(){
    if (localStorage.getItem("style")) {
      return localStorage.getItem("style");
    } else {
      return "orange";
    }
  }

  logout() {
    // Remove tokens and expiry time
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("isLoggedIn");
    //location.pathname = LOGIN_FAILURE_PAGE;
  }

  signup() {
    this.auth0.signup(
      {
        connection: "demgamesDB",
        email: null,
        password: null,
        username: null
      },
      function(err) {
        if (err) return alert("Something went wrong: " + err.message);
        return alert("success signup without login!");
      }
    );
  }

  handleAuthentication() {
    this.auth0.parseHash((error, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname =localStorage.getItem("cohort_address") ? localStorage.getItem("cohort_address") : LOGIN_SUCCESS_PAGE;
      } else if (error) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(error);
      }
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    }
  }

  getAccessToken() {
    if (localStorage.getItem("access_token")) {
      return localStorage.getItem("access_token");
    }
  }
}
