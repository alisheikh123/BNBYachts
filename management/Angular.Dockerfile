FROM node:14.17.1 as Builder
LABEL MAINTAINER umar.draz@techverx.com

WORKDIR /app/

COPY package*.json ./

RUN npm cache clean --force

RUN npx npm-force-resolutions

RUN npm install

 COPY . .
 COPY ./docker-build/appconfig.preview2.production.json /app/src/assets/appconfig.production.json

RUN npm run build

######################################################################
FROM nginx:alpine

# COPY docker-setup/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html/

RUN date -u > /usr/share/nginx/html/v.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
