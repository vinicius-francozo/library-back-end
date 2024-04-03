#!/bin/bash

npm start &
npx sequelize-cli db:create 
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all 
wait -n
exit $?
