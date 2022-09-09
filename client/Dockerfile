FROM node:14.20.0-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["yarn","start"]