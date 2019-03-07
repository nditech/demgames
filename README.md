<h1 align="center">
    <a href="https://www.ndi.org/"><img src="https://www.ndi.org/sites/all/themes/ndi/images/NDI_logo_svg.svg" alt="NDI Logo" width="200"></a>
  </h1>
  
  <h1 align="center">
    DemGames - Debate
  </h1>
  
  <p align="center">
    <a href="https://github.com/nditech/demgames-debate/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-GPL-red.svg" alt="License"/>
    </a>
    <a href="https://docs.mongodb.com/">
      <img src="https://img.shields.io/badge/mongodb-v3.6.5-blue.svg" alt="mongodb"/>
    </a>
    <a href="https://www.npmjs.com/package/express">
      <img src="https://img.shields.io/badge/express-v4.16.3-blue.svg" alt="express"/>
    </a>
    <a href="https://www.npmjs.com/package/react">
      <img src="https://img.shields.io/badge/react-v14.4.0-blue.svg" alt="react"/>
    </a>
    <a href="https://nodejs.org/en/docs/">
      <img src="https://img.shields.io/badge/node-v10.3.0-blue.svg" alt="node"/>
    </a>
  </p>
  
  <p align="center">
    <a href="#documentation">Documentation</a> - 
    <a href="#license">License</a> - 
    <a href="#authors">Author(s)</a>
  </p>
  
  A full stack (MERN) app that helps users learn how to debate effectively.
  
  ## Documentation
  
  ### :warning: IN DEV. Currently three modules and its levels are available.
  
  ### Table of Contents
  
  1. [Intro](#intro)
  1. [Demo](#demo)
  1. [Installation](#installation)
  1. [Diagnosis](#diagnosis)
  1. [Test](#test)
  1. [Contribution](#contribution)
  
### Intro
  
  This app is built with React (frontend), Express.js (backend) and Node.js.
  
  The app connects to a mock api in express  and gets the complete game data and renders all modules.
  To add more modules , levels or questions you need to edit the moduleData.json file inside dist directory. 
    
### Installation
  
  Make sure you have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download/package-manager/) and [npm](https://www.npmjs.com/get-npm) on your machine. To download and install, use the commands below. 
  

  ```
  git clone https://github.com/nditech/demgames-debate
  cd demgames-debate
  npm install
  ```
  
  In order to run the project out of an S3 bucket, copy the contents of the directory `dist/` into your S3 bucket, and set `index.html` as the Index document. In order to edit the application, do not edit the dist directory directly, but rather edit the application code located in other directories, and then update the contents of the dist directory by running `npm run build`.

  In order to do local testing, edit the file `client/src/pages/LandingPage/LandingPage.js`. Comment out the line `fetch('./moduleData.json')` (by default line 23), and uncomment `fetch('localhost:9000/api/game')` (line 24). To run the app, first start the express server by running the following command in the main directory:

  ```
  nodemon server/server.js  
  ```

  In another window, start the application with the following command:

  ```
  npm start
  ```

  The application will then be visible in your browser at localhost:8080. (If it is not running there, check one of the first lines of output from npm start, which will look something like the following: `｢wds｣: Project is running at http://localhost:8080/`. This indicates the port at which the application is running.)

  By default, your browser will likely block the application from communicating with the express server. To avoid this, start chrome without security enabled by entering the following command in your terminal `google-chrome --disable-web-security --user-data-dir="/tmp/chrome_tmp"`, or download a CORS extension for your browser (such as https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

### Debugging and troubleshooting

  The following are some common issues you may run into.

First, remember to run `npm install` before running any part of the application. Commands such as `npm run build` will fail if this has not been run first.


  ```
  // Backend error:
  Error: listen EADDRINUSE: address already in use :::9000
  You need to kill port 9000
    
    $ sudo fuser -k 9000/tcp
  
  ```
   //Frontend Error:
    Error: Access to fetch at 'http://localhost:9000/api/game' from origin 'http://localhost:8083' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

    Fix: You need to install cors extension in google chrome to enable cross-origin resource sharing.

### Contribution
  
  * Please read our [Code Commits Guide](https://github.com/nditech/git-styleguide) and [Documentation Guide](https://github.com/nditech/standardized-README).
  * We also follow Google's [Javascript Style Guide](https://google.github.io/styleguide/jsguide.html) and Airbnb's [React Style Guide](https://github.com/airbnb/javascript/tree/master/react).
  * Do your own unit test before committing code.
  
  ## License
  
  [GNU General Public License v3.0](./LICENSE)
  
  ## Author(s)
  
  * <b>Jatin Narang</b>
      > jatin.narang@hashedin.com &nbsp;&middot;&nbsp;
      
  
  **[⬆ back to top](#documentation)**
