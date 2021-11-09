FROM node:14-alpine as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# sate 2


FROM node:14-alpine

WORKDIR /publish


EXPOSE 3000

COPY --from=build-step /app/build /publish/build
COPY --from=build-step /app/server.js /publish
COPY --from=build-step /app/node_modules /publish/node_modules

CMD [ "node", "server.js" ]
