FROM node:17-alpine

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn install --silent

EXPOSE 3000

CMD ["yarn", "start"]