FROM node:latest as build-stage
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY ./ /app
RUN npm run build -- --mode=prod

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
