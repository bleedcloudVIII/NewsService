FROM node:17.0.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm","run","start"]