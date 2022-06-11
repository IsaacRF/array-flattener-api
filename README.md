# Array Flattener API
- **Author:** Isaac RF
- **License:** GPLv3 with attribution
- **Company:** Tangelo Games

Simple API developed in [nodejs](https://nodejs.org/es/) and [expressjs](https://expressjs.com/es/) to flatten nested arrays and send a response with the result. Part of the Tangelo Games coding challenge.

## Main Features
### Techs
- 🟩 [nodejs](https://nodejs.org/)
- 🏢 [expressjs](https://expressjs.com/es/)
- 💉 [TSyringe](https://github.com/microsoft/tsyringe)
- ☕ [Mocha](https://mochajs.org/)

## Architecture
### Patterns
This API architecture is Based on a **MVVM pattern** using **services + repositories** for all the business logic, and following **SOLID** and **Clean** principles, turning it into a highly scalable API.

Using repositories, not only we separate the business logic from the express router controller layers, but also API calls are agnostic of the data source, because the repository controls the data access calls and event triggering from behind express calls. This way, the API follows the single responsibility and separation of concerns principles.

### Dependency Inversion & Injection
All service layers are **abstracted** via interfaces, so the repository is at the same time agnostic of the technologies used in the services, and services are all easily replaceable by other technologies in the future.

**Dependency Injection** is handled via **TSyringe**, injecting services into the repository, and the repository itself into the express router controllers. This way, layer are accesible via single instances of these controllers or **singletons**, saving resources.

### Loaders
Following a similar pattern to **W3Tech Microframework**, the server startup process is split into isolated and testable modules, and moved away from the ***app.ts*** or main entry point.

Every module is initialized inside its own submodule, isolating them inside "loaders" folder / module, where its index.ts loads all the required submodules, and this is imported at the same time in ***app.ts***

**Separation of concerns** and **Single Responsability** compliant.

### Configuration and sensitive info
Configuration is handled via a central config/index.ts, where all variables are accesible via an exported class.

### Routing
API endpoints and routes are handled via express controllers (./api/routes). Every part of the API is contained into its own route file.

Express controllers also follow the single responsibility principle, only containing data parsing and repository calls.

## Usage
### Run
1. Install node. You can get the installer from [here](https://nodejs.org/es/)
2. Install dependencies:
```
npm install
```
3. Run server:
    - Dev
    ```
    npm run dev
    ```
    - Prod (Transpile and run)
    ```
    npm run prod
    ```

### Compile (Transpile ts into js)
Output is located in *./build*
```
npm run tsc
```

### Tests
Tests are handled via Mocha. To run tests:
```
npm test
```

### Endpoints
API default route is http://localhost:3000/api

- Get Flatten Array [POST] - http://localhost:3000/api
    - Pass Nested Array as body JSON
    - Sample call (Deep 5):
        ```
        curl --location --request POST 'http://localhost:3000/api' --header 'Content-Type: application/json' --data-raw '[[10,[[20, [30]]],[40]]]'
        ```