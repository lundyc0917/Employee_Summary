const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];

// Manager Info question Array
const managerInfo = [
    {
        type: "input",
        name: "managerName",
        message: "Enter Manager's Name: "
    },
    {
        type: "input",
        name: "managerID",
        message: "Enter Manager's ID: "
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter Manager's Email: "
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "Enter Manager's Office Number: "
    }
];

// Engineer Info quesiton Array
const engineerInfo = [
    {
        type: "input",
        name: "engineerName",
        message: "Enter Engineer's Name: "
    },
    {
        type: "input",
        name: "engineerID",
        message: "Enter Engineer's ID: "
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Enter Engineer's Email: "
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Enter Engineer's GitHub User Name: "
    }
];

// Intern Info question Array
const internInfo = [
    {
        type: "input",
        name: "internName",
        message: "Enter Intern's Name: "
    },
    {
        type: "input",
        name: "internID",
        message: "Enter Intern's ID: "
    },
    {
        type: "input",
        name: "internEmail",
        message: "Enter Intern's Email: "
    },
    {
        type: "input",
        name: "internSchool",
        message: "Enter Intern's School Name: "
    }
];

// Message to add more team members and their types
const addMore = [
    {
        type: "list",
        name: "addList",
        choices: ["Engineer", "Intern", "I am done adding team members."],
        message: "Add Another?"
    }
];

inquirer.prompt(managerInfo).then(ans =>{
    console.log(ans);
    employeeArr.push(new Manager(ans.managerName, ans.managerID, ans.managerEmail, ans.managerOfficeNumber));
    promptAddMore();
});

const promptAddMore = () => {
    inquirer.prompt(addMore).then(data => {
        switch (data.addList){
            case "Intern":
                internQuestions();
                break;
            case "Engineer":
                engineerQuestions();
                break;
            default:
                produceHTML();
        }
    });
}

const internQuestions = () => {
    inquirer.prompt(internInfo).then(ans => {
        console.log(ans);
        employeeArr.push(new Intern(ans.internName, ans.internID, ans.internEmail, ans.internSchool));
        promptAddMore();
    });
}

const engineerQuestions = () => {

    inquirer.prompt(engineerInfo).then(ans => {
        console.log(ans);
        employeeArr.push(new Engineer(ans.engineerName, ans.engineerID, ans.engineerEmail, ans.engineerGithub));
        promptAddMore();
    });
}

const produceHTML = () => {
    render(employeeArr);
    fs.writeFile('output/team.html', render(employeeArr), function(err){
        if(err) throw err;
    });
}