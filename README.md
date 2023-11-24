# Northcoders News API

Link to hosted version - https://nc-news-cg4z.onrender.com/api

NC-NEWS is a backend API project built using node-postgres/express/PSQL. This API offers several endpoints listed in /api that allows the user to recieve specific information from the database. 

If you want to run the project locally you will have to clone the repo and install the dependencies with "npm i"

Once installed make sure to run the script "npm run setup-dbs" in order to setup the database.
You can also seed the database with "npm run seed" or you can run the tests I have written with "npm test app.js"

In order to connect to either database, follow instructions below

Create .env.development file in BE_NC_NEWS and add 
- PGDATABASE=nc_news

Create .env.test file in BE_NC_NEWS and add
- PGDATABASE=nc_news_test


NOTE - This project was built using Node.js v21.1.0 and Postgres version 14.9. Be aware that anything older may cause unknown issues.

