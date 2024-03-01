# Introduction
**foma-commerce** is an e-commerce backend application written in javascript, with real-world features that power common e-commerce services today. It is built with express.js and uses a mongodb database.

## Features
* Sign-up and login
* Authentication
* Authorization
* Role-based resource access
* Protected routes
* Product creation
* Cart Feature
* Wishlist feature
* Vendor account creation
* Order creation
* Product reviews
* Admin account / Admin rights

## Database and Media Storage
* Firstly, [create a mongodb account here](https://www.mongodb.com/cloud/atlas/register) , then create a database and copy the connection string. Open the .env file in the project root folder, assign your connection string to the variable named "MONGO_URI". Remember to replace "password" with your database user password.