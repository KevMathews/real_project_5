const fs = require('fs');
const inquirer = require('inquirer');
const consola = require('consola');
const { config } = require('process');
// const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const cwd = process.cwd();
//npm install [-g] shelljs
//might use shelljs to make the directories
consola.info("Getting started using the api-starter-kit-package");

const configVars = [];


(async () => {
    await inquirer
    .prompt([
        {
            name: 'apiProjectChoice',
            type: 'list',
            message: 'Please pick what API you would like to implement into your project. If your not ready to decide, dont worry just press CTRL + C to stop',
            choices: ['nasa', 'marvel', 'movie', 'youtube',  'news']
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
                    return 'Project name must contain letters, numbers, underscores and hashes only.';
                }
            },
            when: (answers) => answers.apiChoice === true
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
        {
            name: 'nasaChoice',
            type: 'list',
            message: "Which NASA api would you like to use?",
            choices: ['Picture of the day', 'Rovers'],
            when: (answers) => answers.apiProjectChoice === 'nasa'
        },
        {
            name: 'roverChoice',
            type: 'list',
            message: "Please pick which rover you would like to implement?",
            choices: ['Spirit', 'Curiosity', 'Opportunity', 'Perseverance'],
            when: (answers) => answers.nasaChoice === 'Rovers'
        },
        
    ])
    
    .then((answers) => {
        // configVars.push(answers)
        fs.writeFileSync(`${cwd}/config.json`, JSON.stringify(answers))
        // return console.log(configVars)
    })



    .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
})
})();

function createDirectoryContents (templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

      // get stats about the current file
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