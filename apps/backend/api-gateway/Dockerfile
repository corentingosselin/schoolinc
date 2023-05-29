FROM node:18-alpine 

WORKDIR /usr/src/app

COPY /dist/apps/backend/api-gateway .

RUN npm install --omit=dev --legacy-peer-deps

ENV NODE_ENV production

CMD node ./main.js

