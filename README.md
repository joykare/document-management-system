# Document-Management-System

[![Coverage Status](https://coveralls.io/repos/github/andela-jwarugu/Document-Management-System/badge.svg?branch=develop)](https://coveralls.io/github/andela-jwarugu/Document-Management-System?branch=develop)

[![Build Status](https://travis-ci.org/andela-jwarugu/Document-Management-System.svg?branch=develop)](https://travis-ci.org/andela-jwarugu/Document-Management-System)

## Description

The system manages documents, users and user roles. Each document defines access rights, the document defines which roles can access it.  Each document specifies the date it was published. Users are categorized by roles, each user has a role defined for them.

## Pre-requisites 

* MongoDB
* NodeJS
* Postman

## Installation

* Copy the project path from repo
* In your terminal run `git clone` _project path_
* `cd` into the project root 
* In the project root run `npm install` to install dependencies
* To start app `node index.js` OR `nodemon index.js`
* To run tests `npm test`

## Testing with Postman

* Create a user [POST] `http://localhost:8080/api/users`
* Login the said user [POST] `http://localhost:8080/api/users/login`
* Then play around with the availed routes
