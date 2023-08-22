<h1 align="center">
    <a href="https://www.ndi.org/"><img src="https://www.ndi.org/sites/all/themes/ndi/images/NDI_logo_svg.svg" alt="NDI Logo" width="200"></a>
  </h1>
  
  <h1 align="center">
    DemGames - Debate (Deprecated)
  </h1>
  
  <p align="center">
    <a href="https://github.com/nditech/demgames-debate/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-GPL-red.svg" alt="License"/>
    </a>
    <a href="https://www.npmjs.com/package/react">
      <img src="https://img.shields.io/badge/react-v14.4.0-blue.svg" alt="react"/>
    </a>
    <a href="https://nodejs.org/en/docs/">
      <img src="https://img.shields.io/badge/node-v10.15.3-blue.svg" alt="node"/>
    </a>
    <a href="https://dev.mysql.com/doc/">
      <img src="https://img.shields.io/badge/mysql-v5.7-blue.svg" alt="node"/>
    </a>
  </p>
  
  <p align="center">
    <a href="#documentation">Documentation</a> - 
    <a href="#license">License</a> - 
    <a href="#authors">Author(s)</a>
  </p>
    
  ## Documentation
    
  ### Table of Contents
  
  1. [Intro](#intro)
  1. [Dependencies](#dependencies)
  1. [Database Setup](#database-setup)
  1. [Installation and Configuration](#installation-and-configuration)
  1. [Create Database Schema](#create-database-schema)
  1. [Deploying the Application](#deploying-the-application)
  1. [Contribution](#contribution)
  
### Intro
  
  DemGames is a civic engagement platform that hosts simple games for engagement at scale for civic organizing, political inclusion, and other democratic concepts. Gamified learning platforms offer a unique opportunity to provide light touch, broad reach training for youth with a technology approach that meets them where they are. Games for good can provide basic instruction and reinforce the attitudes and concepts that help young citizens engage in social change. DemGames brings together NDI’s tested civic education best practices with an engaging, fun platform. DemGames makes it easy to set up your own game and gives program implementers an innovative way to reinforce absorption and retention of knowledge while tracking use and learning over time.

### Dependencies

In order to run demgames, the items listed below must be installed. The commands for installing each for Ubuntu are included.

1. Mysql CLI or Mysql Workbench  version - 14.14 Distrib 5.7.27

`sudo apt install mysql-client-5.7 mysql-server-5.7`

2. Node version - 10.15.3 / NPM (comes prepackaged with node) version - 6.4.1

`wget "https://nodejs.org/dist/10.15.3/node-v10.15.3-linux-x64.tar.xz"`

`sudo tar xf node-v10.15.3-linux-x64.tar.xz --directory /usr/local --strip-components 1`

3. Nodemon (required globally) version - 1.19.1

`npm install nodemon -g`

4. Nginx

`sudo apt install nginx`

5. Build-Essential

`sudo apt install build-essential`

6. Python

`sudo apt install python`

7. When installing on a Windows machine: Windows Build Tools

`npm install --global windows-build-tools`

### Database Setup
The database can either be set up locally or on a separate server. DemGames uses MySQL. Connect to MySQL using `mysql -u your-username -p` and then inputting your password. Initialize the database using:

`create schema DemGames;`


### Installation and Configuration
  
To download demgames, clone the code using `git clone https://github.com/nditech/demgames.git`

After downloading the code, edit demgames/server/config/config.json to input the database credentials. Replace the username, password, database, and host based on your database. If you followed these instructions and ran “create schema DemGames;”, the database should be DemGames. The username and password will be what you used for logging in to the database. The host will be 127.0.0.1 unless your database is located on a separate location from your application.

##### For running on a server:
If you are deploying the code on a server, the several additional changes to files will also be needed. If you are deploying the code locally, ignore these steps and move on to the next section.

1. In demgames-debate/client/src/settings.js, replace 'http://localhost:9000/api' with '/api'

1. In demgames-debate/client/src/Auth.js, go to the line that starts with redirectUri: (currently line 16), and replace "https://localhost:8080/callback" with "https://url-of-your-website/callback"

1. In demgames-debate/server/server.js, go to the last line of the file (currently line 1670), and replace 9000, with 9000,'private-ip-of-the-server',

Additionally, run the following command to set the environment variable to production. Note that this will only apply to the current user and be lost if you logout or start a session as a new user, such as root.

`export NODE_ENV=production`

#### Installation

In order to run the application, first run the following command in the demgames directory in order to install the necessary packages:

`npm install`

### Create Database Schema:
To create the database schema, use the following commands in the demgames directory:
```
cd server
npx sequelize-cli db:migrate
cd ..
```

### Deploying the Application:

The steps to install the server differ depending on whether you are running it on a server or a local computer. Follow only the section below corresponding to which one you are doing.

#### Running on Local Computer:
You should be able to start the application with the following command:

`npm run dev`

Alternatively if this does not work, it will also start by running the two commands below in the following order:

```
nodemon server/server.js
npm run start
```

Note that if you have already have the node server running, you may need to kill it and restart it. To do so, run the command below, and then run either set of commands above.

`fuser -k 9000/tcp`

Once the application is running, you can access it by navigating to https://localhost:8080 in your browser. Note that you may need to clear your browser cache to get an updated version of the site. To get content to load, you may also need to install a browser extension to allow CORS or else start a browser session to allow it by running:

`google-chrome --disable-web-security --user-data-dir="/tmp/chrome_tmp"`


#### Deploying the Application:

To build the application, run the following command in the demgames directory

`npm run build`

This should update the directory demgames/dist. Move this directory to /var/www/demgames/dist/ using the following command:

`sudo cp ./dist/. /var/www/demgames/dist/ -r`

Then, configure nginx. Below is an example of a sample nginx file. Replace the contents of /etc/nginx/sites-available/default.conf with the file below, then run `service nginx restart`. Then, in the demgames directory, run the node server using `npm run server`. If you navigate to the url of the server, the application should now be running.


```
server {
        listen 80 default_server;
        server_name staging.demgames.app;
        root /var/www/demgames/dist/;
        index index.html index.htm;
        error_page 500 /;
        location / {
                autoindex on;
                try_files $uri /index.html;
        }
        location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:9000/api;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
        }
}
```

### Contribution
  
  * Please read our [Code Commits Guide](https://github.com/nditech/git-styleguide) and [Documentation Guide](https://github.com/nditech/standardized-README).
  * We also follow Google's [Javascript Style Guide](https://google.github.io/styleguide/jsguide.html) and Airbnb's [React Style Guide](https://github.com/airbnb/javascript/tree/master/react).
  * Do your own unit test before committing code.
  
  ## License
  
  [GNU General Public License v3.0](./LICENSE)
  
  ## Author(s)
  
  * <b>Noble Ackerson</b>
      > nackerson@ndi.org &nbsp;&middot;&nbsp;
  * <b>Jatin Narang</b>
      > jatin.narang@hashedin.com &nbsp;&middot;&nbsp;
  
  **[⬆ back to top](#documentation)**
