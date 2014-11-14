#ng-simple-rest-app
Simple rest app written in Angular

## Pre-Requisites
Install [Node.js](http://nodejs.org)

Install these NPM packages globally:

`npm install -g bower karma karma-cli`

## Installing Packages
- Open terminal
- Type `npm install`
- Type `bower install`

## Test
Type `karma start karma.config.js`

## Running
Type `node server/serverjs` and browse to `http://localhost:3412`

## Client features
- default page not being shown by the router
- automatic conversion of Json strings into JavaScript dates (generic/aop approach)
- date control bound to model object from a data service
- select control databound to model from a data service
- confirmation dialog
- rest service calls for get, post, put, delete
- bootstrap layout for form
- form validation
- app navigation from controller using location and window services
- logging abstraction 
- promises for service calls including error handling
- generic application level error handling
- busy indicator 
- unit tests with mocks and promises
- material design for form entry

## Server features:
- simple rest endpoints
- compression
- request logging to console
- CORS enabled
- object retrieved from JS array based on key
- object removed from JS array based on key