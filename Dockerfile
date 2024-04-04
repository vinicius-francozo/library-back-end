FROM node:latest

WORKDIR /usr/app

COPY package*.json /
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3001

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
