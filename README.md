# Vending Machine Server

This repository contains the serverside logic and APIs for the vending machine frontend application. You can find the frontend repo [here](https://github.com/aatbip/vending-machine-ui).

## How to run the project?

### Using Docker

- To run the project using docker, run `docker build -t vending-machine-server .`
- After the build is completed, run `docker run -p 3000:3000 vending-machine-server`

### Using nest cli

- To run the project in development watch mode, use command `yarn run start:dev`

## Project's structure

- The project is divided into two modules:
    
    1. core module
        - this module is responsible for handling the business logic. It implements `getCurrentState()`, `purchase()`, and `refund()` methods.
    2. fileSystemApi module
        - Since the application doesn't rely on any database systems, but stores all the essential states in the file ([details here](#application-state)), this module implements methods to write file and read file using node `fs` module.

## Application State

The application doesn't rely on any database systems. All the application state is defined in `state` folder. The initial app state looks like below:

```
{
  "coke_count": 10,
  "pepsi_count": 10,
  "dew_count": 10,
  "coins_count": 100,
  "cash_count": 200
}
```

`copy-files.js` file in the root directory has required scripts to copy the state files in the `dist` directory at the build time.
