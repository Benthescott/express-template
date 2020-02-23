FROM keymetrics/pm2:latest-alpine
RUN apk add --no-cache bash
RUN mkdir /log
WORKDIR /usr/src/express-template
COPY package*.json ./
COPY ./dist .
RUN npm install --production
EXPOSE 8080