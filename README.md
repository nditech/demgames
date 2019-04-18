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
  
A civic engagement platform that hosts simple games for engagement at scale for civic organizing, political inclusion, and other democratic concepts. 
  
  ## Documentation
    
  ### Table of Contents
  
  1. [Intro](#intro)
  1. [Installation](#installation)
  1. [Local Testing](#local-testing)
  1. [Deployment](#deployment-to-aws)
  1. [Troubleshooting](#debugging-and-troubleshooting)
  1. [Contribution](#contribution)
  
### Intro
  
  This app is built with React (frontend), Express.js (backend) and Node.js.
  
  The app connects to a mock api in express and gets the complete game data and renders all modules.
  To add more modules, levels, or questions, you need to edit the moduleData.json file inside dist directory. 
    
### Installation
  
  Make sure you have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download/package-manager/) and [npm](https://www.npmjs.com/get-npm) on your machine. To download and install, use the commands below. 
  

  ```
  git clone https://github.com/nditech/demgames-debate
  cd demgames-debate
  npm install
  ```

### Local Testing

 In order to do local testing or otherwise deploy to code locally on your own computer, edit the file `client/src/pages/LandingPage/LandingPage.js`. Comment out the line `fetch('./moduleData.json')` (by default line 23), and uncomment `fetch('http://localhost:9000/api/game')` (line 24). To run the app, first start the express server by running the following command in the main directory:

  ```
  nodemon server/server.js  
  ```

  In another window, start the application with the following command:

  ```
  npm start
  ```

  The application will then be visible in your browser at localhost:8080. (If it is not running there, check one of the first lines of output from npm start, which will look something like the following: `｢wds｣: Project is running at http://localhost:8080/`. This indicates the port at which the application is running.)

  By default, your browser will likely block the application from communicating with the express server. To avoid this, start chrome without security enabled by entering the following command in your terminal `google-chrome --disable-web-security --user-data-dir="/tmp/chrome_tmp"`, or download a CORS extension for your browser (such as https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

To edit data for the local deployment, edit the file `data/Module/moduleData.json`. Note that you will have to re-run `nodemon server/server.js` while running `npm start` to load the new content. (If the new content is not displaying, check [troubleshooting](#debugging-and-troubleshooting) below).

### Deployment to AWS

DemGames is designed to be run out of an object storage service such as Amazon Web Service's S3 Bucket. The instructions below indicate how to deploy the application to S3.

First, the code should be loaded on to your local machine using the installation instructions. Before deploying, if you have  made changes to the code, run `npm run build` (after having previously run `npm install`) in order to update the code in the directory `dist/`. If you have made changes to the game data in `data/Module/moduleData.json`, run `nodemon server/server.js`. In your browser, go to `http://localhost:9000/api/game` and select and copy the contents displayed. Clear the contents of the file `dist/moduleData.json` and paste in the copied content.

To deploy to AWS, follow the steps below:

1. Create an S3 bucket for storing the contents of the site. You can proceed with the default settings.

2. In order to make the site publically available, go to https://awspolicygen.s3.amazonaws.com/policygen.html. For step 1, select S3 bucket policy. For step 2, select 'Allow' for Effect, enter `*` for Principal, select 'Amazon S3' for AWS Service, select 'GetObject' for Actions, and for Amazon Resource Name enter 'arn:aws:s3:::' followed by the name of your S3 bucket. Click Add Statement and then Generate Policy. Copy the resulting JSON Document. In your S3 bucket, go to the Permissions tab, and then Bucket Policy, and paste the copied text in the Bucket Policy Editor, and then click Save.

3. Copy the contents of the `dist/` directory into the S3 bucket. (This means do not copy the `dist/` directory itself - only the contents inside).

4. Under the properties tab for the S3 bucket, select 'Static website hosting'. Select the option 'Use this bucket to host a website'

5. Enter `index.html` for both 'Index document' and 'Error Document'.

6. The link following the words 'Endpoint :' is the link for the site.


### Debugging and Troubleshooting

  The following are some common issues you may run into.

1. Remember to run `npm install` before running any part of the application. Commands such as `npm run build` will fail if this has not been run first.

2. In some cases, you will get the error below, meaning that you need to clear the processes currently running at port 9000.
  ```
  // Backend error:
  Error: listen EADDRINUSE: address already in use :::9000
  You need to kill port 9000
  ```

To clear port 9000, use the following command:
``` 
$ sudo fuser -k 9000/tcp
```

3. If content is not updating when you change the data file, it may be caching on the browser. To avoid this, close all incongito windows and try opening a new incognito session.

### Contribution
  
  * Please read our [Code Commits Guide](https://github.com/nditech/git-styleguide) and [Documentation Guide](https://github.com/nditech/standardized-README).
  * We also follow Google's [Javascript Style Guide](https://google.github.io/styleguide/jsguide.html) and Airbnb's [React Style Guide](https://github.com/airbnb/javascript/tree/master/react).
  * Do your own unit test before committing code.
  
  ## License
  
  [GNU General Public License v3.0](./LICENSE)
  
  ## Author(s)
  
  * <b>Viet Nguyen</b>
      > vnguyen@ndi.org &nbsp;&middot;&nbsp;
  * <b>Noble Ackerson</b>
      > nackerson@ndi.org &nbsp;&middot;&nbsp;
  * <b>Jatin Narang</b>
      > jatin.narang@hashedin.com &nbsp;&middot;&nbsp;
      
  
  **[⬆ back to top](#documentation)**
