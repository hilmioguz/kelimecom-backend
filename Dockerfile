# build stage
FROM node:lts-alpine as build-stage
WORKDIR /usr/src/kelime-backend
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/kelime-backend/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 5002
CMD ["nginx", "-g", "daemon off;"]