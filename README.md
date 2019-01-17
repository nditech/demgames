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

### :warning: IN DEV. Only the first module and its first level of the game are available.

### Table of Contents

1. [Intro](#intro)
1. [Demo](#demo)
1. [Installation](#installation)
1. [Diagnosis](#diagnosis)
1. [Test](#test)
1. [Contribution](#contribution)

### Intro

This app is built with React (frontend), Express.js (backend), MongoDB (database) and Node.js.

The app connects to a collection (table) and gets the questions, by default, in Spanish and renders the questions.

### Demo

* [Working demo on Heroku](https://demgames-debate.herokuapp.com/)

### Installation

Make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/), [Node.js](https://nodejs.org/en/download/package-manager/) and [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) on your machine. 

Start MongoDB (using terminal):
```
$ mongod
```

Clone this repository to your local machine (using SSH):
```
$ git clone git@github.com:nditech/demgames-debate.git
$ cd demgames-debate
$ yarn install
$ cd client
$ yarn install
$ cd ..
$ yarn start
```

If the app is run for the first time, there won't be any question. Use `http://localhost:3000/admin` to add questions.

You can also use `./test/createdb.js` to add batches of questions to the database from `.json` files.

### Diagnosis

```
// Backend error:
(node:67023) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server...

// OR Frontend error:
GET http://localhost:3000/api/questions/es net::ERR_EMPTY_RESPONSE
Uncaught (in promise) Error: Network Error
```
* Cause: MongoDB is not running.
* Fix: Start mongoDB before starting the app:
    ```
    $ mongod
    ```

### Test

* Install `mocha` globally
    ```
    $ npm install -g mocha
    ```
* Quickly test all functions
    ```
    $ npm test
    ```
* Currently, all tests passed. No errors.
* Inside `./test`, use:
    * `text2json.js` to convert an `.xlsx` file to a `.json` file.
    * `createdb.js` to add questions in batches from `.json` files.

### Contribution

* Please read our [Code Commits Guide](https://github.com/nditech/git-styleguide) and [Documentation Guide](https://github.com/nditech/standardized-README).
* We also follow Google's [Javascript Style Guide](https://google.github.io/styleguide/jsguide.html) and Airbnb's [React Style Guide](https://github.com/airbnb/javascript/tree/master/react).
* Do your own unit test before committing code.

## License

[GNU General Public License v3.0](./LICENSE)

## Author(s)

* <b>Viet Nguyen</b>
    > vnguyen@ndi.org &nbsp;&middot;&nbsp;
    > [LinkedIn](https://www.linkedin.com/in/nguyendviet)

**[⬆ back to top](#documentation)**
