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
  To add more modules , levels or questions you need to edit the moduleData.json file inside data directory. 
    
### Installation
  
  Make sure you have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download/package-manager/) and [npm](https://www.npmjs.com/get-npm) on your machine. 
  
  
  Clone this repository to your local machine (using SSH):

  ```
  $ Create a new directory and run follwing commands in it.
  $ git clone git@github.com:nditech/demgames-debate.git
  $ npm install
  $ npm start

  ```
  
  If the app is run for the first time, there won't be any modules. You need to run express server to fetch game data.
  Open a new terminal and move to main directory and run the below command.

   ```
   
   $ nodemon server/server.js
   
   ```
  ### Diagnosis
  
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
