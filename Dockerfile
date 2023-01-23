# build stage
FROM node:lts-alpine as build-stage
WORKDIR /usr/src/backend
COPY package*.json ./
# install git
RUN apk update && apk add --no-cache git
RUN rm -rf node_modules
RUN rm package-lock.json
RUN rm yarn.lock
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:lts-alpine as production-stage
COPY --from=build-stage /usr/src/backend/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
EXPOSE 5002
CMD ["nginx", "-g", "daemon off;"]