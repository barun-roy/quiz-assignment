# quiz-assignment

## Entry Point

- server runs from server.js and app.js contains middlewares, error handlers and routing
- folder structure is divided into model, controllers and routes
- common folder contains common functions
- middleware folder for authentication
- sample env file provided
- can provide postman collection if required
- to start the server in development mode:
```  yarn install  ```
```  yarn run start:dev  ```

## Functionality

### User
- user create api to create users in the database
- user login api with jwt authentication, checks for existing user, password check and jwt verification
- user profile view api so user can view their details
- user profile update api so user can update their profile along with profile image update

### Category
- get all category api to fetch all the categories from the database
- get question based on respective categories, questions having multiple categories is handled=

### Question
- bulk upload questions api to import questions in bulk from csv file into the database
- sample csv file provided
