FROM node:14-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3011
RUN npm install
RUN npm install -g nodemon

ENTRYPOINT ["nodemon", "/usr/src/app/index.js"]