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
    
  ## Documentation
    
  ### Table of Contents
  
  1. [Intro](#intro)
  1. [Installation](#installation)
  1. [Local Testing](#local-testing)
  1. [Changing Content](#changing-content)
  1. [Deployment](#deployment-to-aws)
  1. [Troubleshooting](#debugging-and-troubleshooting)
  1. [Contribution](#contribution)
  
### Intro
  
  DemGames is a civic engagement platform that hosts simple games for engagement at scale for civic organizing, political inclusion, and other democratic concepts. Gamified learning platforms offer a unique opportunity to provide light touch, broad reach training for youth with a technology approach that meets them where they are. Games for good can provide basic instruction and reinforce the attitudes and concepts that help young citizens engage in social change. DemGames brings together NDI’s tested civic education best practices with an engaging, fun platform. DemGames makes it easy to set up your own game and gives program implementers an innovative way to reinforce absorption and retention of knowledge while tracking use and learning over time.
      
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

### Changing Content

All content related to levels or questions is stored in the file `data/Module/moduleData.json` in a [JSON format](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON). This file can be edited with any text or code editor. While the file is fairly large and contains many nested sections, new content can be created fairly easily by copying and pasting existing current levels and questions to capture the correct format. Examples of the format for the questions, levels, and overall format are shown below.

#### Question Format
```
                                        {
                                                "id": 1,

                                                "question": "Resolution",
                                                "options": [
                                                        "The topic or claim that is being debated. Example: The death penalty is a justified method of punishment.",
                                                        "They are laws, decisions of the supreme court and policies of the executive branch that would prevent a new policy from existing.",
                                                        "This is the Greek word for ethics or character and focuses on demonstrating the reliability, reliability or preparation of the debaters.",
                                                        "This is the Greek word for logic and focuses on the message and appeals to authority or credibility by offering experience, research or data to support the arguments."
                                                ],
                                                "correct_answer": [ 0 ]
                                        },
```

* *id* - the question order, where the questions for a level should have sequential id's starting at 1
* *question* - the question that will appear at the top
* *answer* - lists the possible answers that will appear below.
* *correct_answer* The number in brackets after correct_answer refers to which answer is the correct one. Note that here, the first answer is labeled 0, the second answer is labeled 1, and so on.

#### Level Format

                        {
                                "id": 1,
                                "current_score": 0,
                                "par_score": 0,
                                "total_score": 40,
                                "desc": "Match definitions in this level to learn debate vocabulary.",
                                "linked_level": 0,
                                "questions": [
                                ]
                        },
                                     
* *id* - the level order, where the levels for a module should have sequential id's starting at 1
* *current_score* - as of the current software version, should be left at 0 
* *par_score* - the number of points a player needs to get on the previous level to gain access to this level. Until the user scores that amount on the previous level, they will not be able to access this level (for the first level in a module, this should be 0)
* *total_score* - this is what will be displayed for each level as the total score. It should equal the number of questions times 10
* *desc* - the description that will appear on the level selection screen on the button for that level
* *linked_level* - specifies which level comes before it (and therefore needs to be beaten to unlock this level)
* *questions* - insert your questions in the bracket here
* Note that the game sets each right answer as being worth 10 points, and each wrong answer as costing 10 points.

#### Module Format

        {
                "id": 1,
                "name": "Designing an Argument",
                "style": "blue",
                "type": "single",

                "levels": [
                ]
        },

* *id* - the module order, where the modules should be order starting at 1.
* *name* - the name that will appear in the button for that module on the module selection page
* *style* - the color the module button will appear as. Can be 'blue', 'green', or 'orange'
* *type* - what type of levels will be in the module. Options are 'single' for questions in which there is only one right answer, 'multi' for levels where the player should select more than 1 answer per question (*under construction*), or 'scenario' for modules in which the player has multiple choices which puts them on different paths
* *levels* - insert the levels here

The format for the scenario questions is slightly different, and can be seen by looking at module 3. Also, note that there should be commas after each question, level, and module as seen in the format examples above, except for the last question/level/module, after which there should be no comma.

#### Loading content

After making changes to the data, to test it locally, re-run `nodemon server/server.js` while running `npm start` to load the new content. If the old content is not being replaced by the new content there is likely a caching issue - see [troubleshooting](#debugging-and-troubleshooting) below.

### Deployment to AWS

DemGames is designed to be run out of an object storage service such as Amazon Web Service's S3 Bucket. The instructions below indicate how to deploy the application to S3.

First, the code should be loaded on to your local machine using the installation instructions. Before deploying, if you have  made changes to the code, run `npm run build` (after having previously run `npm install`) in order to update the code in the directory `dist/`. If you have made changes to the game data in `data/Module/moduleData.json`, run `nodemon server/server.js`. In your browser, go to `http://localhost:9000/api/game` and select and copy the contents displayed. Clear the contents of the file `dist/moduleData.json` and paste in the copied content. (Note that for it to work, you sometimes may have to edit the generated policy by going to the line starting with the word Resource, and adding `/*` after the name of S3 bucket within the quotes, so that it looks something like `"Resource": "arn:aws:s3:::example-bucket-name/*",`)

To deploy to AWS, follow the steps below:

1. Create an S3 bucket for storing the contents of the site. You can proceed with the default settings.

2. In order to make the site publically available, go to https://awspolicygen.s3.amazonaws.com/policygen.html. For step 1, select S3 bucket policy. For step 2, select 'Allow' for Effect, enter `*` for Principal, select 'Amazon S3' for AWS Service, select 'GetObject' for Actions, and for Amazon Resource Name enter 'arn:aws:s3:::' followed by the name of your S3 bucket. Click Add Statement and then Generate Policy. Copy the resulting JSON Document. In your S3 bucket, go to the Permissions tab, and then Bucket Policy, and paste the copied text in the Bucket Policy Editor, and then click Save.

3. Copy the contents of the `dist/` directory into the S3 bucket. (This means do not copy the `dist/` directory itself - only the contents inside).

4. Under the properties tab for the S3 bucket, select 'Static website hosting'. Select the option 'Use this bucket to host a website'

5. Enter `index.html` for both 'Index document' and 'Error Document'.

6. The link following the words 'Endpoint :' is the link for the site.


### Debugging and Troubleshooting

  The following are some common issues you may run into.

#### `npm ____` does not work

Remember to run `npm install` before running any part of the application. Commands such as `npm run build` will fail if this has not been run first.

#### Port 9000 in use

In some cases, you will get the error below, meaning that you need to clear the processes currently running at port 9000.
  ```
  // Backend error:
  Error: listen EADDRINUSE: address already in use :::9000
  You need to kill port 9000
  ```

To clear port 9000, use the following command:
``` 
$ sudo fuser -k 9000/tcp
```
#### The app is not updating based on changes made

If content is not updating when you change the data file, it may be caching on the browser. To avoid this, close all incongito windows and try opening a new incognito session.

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
