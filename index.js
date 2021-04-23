#!/usr/bin/env node
const { exec } = require("child_process");
const { worker } = require("cluster");
const { default: consolaGlobalInstance } = require("consola");
const fs = require("fs");
const inquirer = require("inquirer");
const { inspect } = require("util");
const { setFlagsFromString } = require("v8");
const { ApiGoPage } = require("./generateFunctions");
const generate = require('./generateFunctions');
const CURR_DIR = process.cwd()
/////////////////////////////////////////////////////////
//  ****      Created by Kevin Mathews           ****  // 
//  ****      https://www.kevmathews.com/        ****  //
//  ****      and Joshua Miller                  ****  //
//  ****      https://joshuamiller.dev/          ****  //
/////////////////////////////////////////////////////////

// The goal of this project was to simplify dev process when starting work
// with a 3rd party Api.  As junior devs we learned the struggles that can 
// occur when working on setting up proper fetches and we attempt to simplify
// that process with examples and query parameter tables for easy reference

//  We are first taking time to cleanup and finalize the project we have
//  made so far by ensuring all the examples and fetches are working 100%.
//  After that, we have several features planned for upcoming releases:
    // * Interactive coding environment we will be building for use in your coding window
    //     -Without giving away to many details it will greatly expediate the dev process
    //     by allowing you to test endpoints and see objects returned live no other 
    //     windows or tabbing needed!
    // * ability to see state and props without having to open chrome browser and inspect
    // * Access the generateFunctions in a different way ;)
    // * More APIs!


    
//  Inquirer is a CLI for NodeJS that was utilized to ask questions and save
// those responses as variables(response) which are passed down during the 
// dynamic creation of the pages and examples depending on which API is chosen 
// to work with.
function promptUser(){
    return inquirer.prompt([
        {
            name: 'apiProjectChoice',
            type: 'list',
            message: 'Please pick what API you would like to implement into your project. If your not ready to decide, dont worry just press CTRL + C to stop',
            choices: ['Nasa', 'Movie', 'Youtube',  'News', 'Edamam', 'RAWG Video Games', 'LastFm Music']
        },
        {
            name: 'apiChoice',
            type: 'confirm',
            message: 'Do you have an Api Key yet?',
        },
        {
            name: 'apiKey',
            input: 'input',
            message: 'Enter your api-key, if you have one already:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                    return true;
                } else {
                    return 'API-KEY must contain letters, numbers, underscores and hashes only.';
                }
            },
            when: (response) => response.apiChoice === true
        },
        {
            name: 'appId',
            input: 'input',
            message: 'Enter your Edamam app-id, if you have one already',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                    return true;
                } else {
                    return 'APP-ID must contain letters, numbers, underscores and hashes only.';
                }
            },
            when: (response) => response.apiProjectChoice === 'Edamam'
        },
        {
            name: 'projectName',
            type: 'input',
            message: 'Name this Project:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                    return true;
                } else {
                    return 'Project name must contain letters, numbers, underscores and hashes only.';
                }
            }
        },
    ])
}

// below we set the response choice as variables as well as the
// path to which the files will be written, all dependant on responses

promptUser().then(function(response){
    const projectChoice = response.apiProjectChoice;
    const projectName =  response.projectName;
    const templatePath = `${__dirname}/templates/starter-kit`;

//  Heres where we create the directory for the project
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

//  Consola is used to display answers and messages directing the dev
//  towards what is going on behind the scenes as well as instructing them
//  as to the next step they need to do to start their project    
    consola.info(`Nice Choice!! Your project is now being bulit!`);
    consola.info(`Implenting ${projectChoice} API...`);
    consola.info(`Just imagine the possibilities with this AMAZING pre-written code!`);
    consola.info(`But seriously, thank you for choosing this package for this great project.`);
    consola.info(`We are truly grateful.`);
    consola.info('Be patient, this might take a few minutes...')
    exec(`cd ${projectName} && npm i`, (err, stdout, stderr) => {
        if (err){
            consola.error(`Hmmmm... We've come across an error, but don't worry: ${err}`);
            consola.warn(`These warning could help you with this error: ${stderr}`);
            return;
        } else {
            consola.warn(stdout);
            exec(`cd ${projectName} && npm audit`, (err, stdout, stderr) => {
                consola.warn(`These are some warnings but they\'re no big deal, trust me: ${stdout}`);
                consola.success(`Your project has been successfully built!!!`);
                consola.success(`Your project is inside of your ${CURR_DIR} directory, run this command to enter your project: /n
                > cd ${projectName} <`);
                consola.success('After that, all you have to do is run > npm start < to get it going.');
                consola.success(`In the generated project we have made a cheatsheet for the ${projectChoice} api for you to look at and reference.`);
                consola.success('The api related files are in the > components < folder');
                consola.success('If you did not provide an API-KEY, don\'t worry. There will be a config.js file within you project directory where you can add the key once you receive one');
                consola.success(`We hope this helps you kickstart your project! Have fun!`);
            })
        }
        return;
    })
    //  calling the functions to create the directory and choose which files will be created
    createDirectoryContents(templatePath, projectName);
    dynamicFiles(response, projectName);
})

//  defining the create directory function
function createDirectoryContents (templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
        let newFilePath
        if (file === '_gitignore') {
            newFilePath = '.gitignore';
            fs.renameSync(writePath, `${CURR_DIR}/${newProjectPath}/${newFilePath}`);
        } else if ( file === '_env'){
            newFilePath = '.env';
            fs.renameSync(writePath, `${CURR_DIR}/${newProjectPath}/${newFilePath}`);
        }
    } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
    });
}

//  Defining the function to write the files
function writeDynamicFiles (generateFunc, response, projectName) {
        let content = generateFunc
        fs.writeFileSync(`${CURR_DIR}/${projectName}/src/components/examples.js`, content);

        let apiGo = generate.ApiGoPage(response);
        fs.writeFileSync(`${CURR_DIR}/${projectName}/src/components/APIGo.js`, apiGo);

        let config = generate.ConfigJS(response);
        fs.writeFileSync(`${CURR_DIR}/${projectName}/src/config.js`, config)
}

//  Defining the function which chooses which files to write. 
function dynamicFiles (response, projectName) {
    switch (response.apiProjectChoice) {
        case 'Nasa':
            writeDynamicFiles(generate.NasaExample(response), response, projectName);
            break;
        case 'Movie':
            writeDynamicFiles(generate.MovieExample(response), response, projectName);
            break;
        case 'Youtube':
            writeDynamicFiles(generate.YoutubeExample(response), response, projectName);
            break;
        case 'News':
            writeDynamicFiles(generate.NewsExample(response), response, projectName);
            break;
        case 'Edamam':
            writeDynamicFiles(generate.EdamamExample(response), response, projectName);
            break;
        case 'RAWG Video Games':
            writeDynamicFiles(generate.RawgExample(response), response, projectName);
            break;
        case 'LastFm Music':
            writeDynamicFiles(generate.LastFmExample(response), response, projectName);
            break;
    }
};