FROM node:17-alpine AS production

WORKDIR usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/main"]