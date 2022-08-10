## books-app-node-api

Node js Api application to serve the book app front end UI for the iceandfire Api

Build Setup
App built with nodejs
```
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

## Work flow Diagram
click here to open the workflow architecture documentation and ERD

## API Documentation
Api documentation is on postman link to postman collection here  <a href="https://www.postman.com/lunar-crescent-756083/workspace/my-workspace/request/21024605-98348242-b79d-4993-ba48-f7fe9f2c23b1">
 The Api documentation
</a>

### All project repos are below
Front End UI https://github.com/kinyodan/book-of-ice-ui

Nodejs Back-end Api https://github.com/kinyodan/books-app-node-api

## Backend Service Api

Built a Back-end API applicatiion to serve the Nodejs Back-end Api.Some Data retrival and api calls from and the Iceand fire api took to long to query per request.

So need to take advantage of threading to increase perfomance and also background Jobs to retrive the data in the and ave to database.

Built a Rails API as an RPC service to the node to run the lengthy tasks and have data already saved and packaged for the front-end requests.

The repository for this service is at.

https://github.com/kinyodan/tpm-backend-service/tree/master

