FROM node:18-alpine 

WORKDIR /usr/src/app

COPY /dist/apps/backend/auth-service .

RUN npm install --omit=dev

ENV NODE_ENV production

CMD node ./main.js

