#!/bin/bash

npm start &
npx sequelize-cli db:migrate
wait -n
exit $?
