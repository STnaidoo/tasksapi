Set up MySql in docker container

So you can run the setUpMySql.sh (makes a local instance of MySql run in a docker container on your machine)

1. Install Docker
2. chmod +x setUpMySql.sh
3. MySql docker container exposes port 3567 by default - change if necessary
4. docker container exec -it mysql-container bash
5. mysql -u root -p
   - root password is specified in setUpMySql.sh

Run DB Migrations

1. sequelize db:migrate

Run API

1. npm install
2. npm start

To Come

1. API tests
2. Scheduled job that does the task clean up (doesn't work yet)
3. SQL container command to be a dockerfile to include additional dependencies for the scheduled job
4. Controllers to separate logic from the routes for tasks and users
