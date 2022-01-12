<!-- badges -->
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

## About

Redmine Dashboard is a project to display Redmine issues in a kanban-style board. It uses the Redmine REST API to get data. Redmine Dashboard is a work-in-progress, it aims to feature issues in an agile manner and make issue progress more transparent among team members by featuring individual and group reports.

## Development

Ensure npm, node, express and scss are installed. In this project, nodemon is also installed to re-run the server-side code  when there are changes made.

1. ``npm i``
2. ``npm run scss``
3. ``npm run dev``

To enable live preview during development, install Ritwick Dey's Live Server browser and VS Code extension. By default, Express apps run on port 3000. When live preview is enabled, ensure that the live server address (e.g. localhost:5500) is set to point to the actual server's address (eg. localhost:3000).
