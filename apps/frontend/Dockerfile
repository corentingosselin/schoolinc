FROM nginx:alpine 

ENV NODE_ENV production

COPY /apps/frontend/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY /dist/apps/frontend .
