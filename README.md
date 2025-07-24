# demo-cypress-ui

Demo project with Cypress for UI test automation.

## Intro

This small NodeJS project show-cases a test automation implementation based on Cypress testing framework, using Typescript and  multy-layer architecture. These examples include Page-Object Model as well as Stepper-Asserter approach.

## Description

This implementation encompases several test-cases testing the To-Do List functionality (like ToDo items CRUD or Filtering) of a small open online app at https://todomvc.com/.

## How to run
### Pre-requisites
- Node JS
- Git
- Browsers (like Chrome or Firefox)
- Docker - if you would like to run it in Docker

### Steps
1. Checkout this project from Git
2. Install dependancies with `npm install`
3. Run in the UI mode with `npm run cy:open`
4. Or run in the CLI mode with `npm run cy:run`
5. Or run it in Docker with `docker-compose up e2e`
