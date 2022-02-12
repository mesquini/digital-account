FROM node:14.16.0-alpine
WORKDIR /src
ADD package.json .
RUN npm i --unsafe-perm
ADD . .
RUN npm run build
RUN npm prune --production
CMD npm run start:dist
EXPOSE 80
