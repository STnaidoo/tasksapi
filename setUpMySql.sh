#!/bin/bash

# Pull the MySQL Docker image
docker pull mysql

# Run MySQL container with custom user and password
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_USER=touraxis -e MYSQL_PASSWORD=TourAxis! -e MYSQL_DATABASE=touraxis -p 3567:3306 -d mysql

# Check if the container is running
if [ "$(docker ps -q -f name=mysql-container)" ]; then
    echo "MySQL container is running"
    echo "Host: 127.0.0.1"
    echo "Port: 3567"
    echo "User: touraxis"
    echo "Password: TourAxis!"
    echo "Database: touraxis"
else
    echo "Failed to start MySQL container"
fi
