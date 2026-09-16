# ---- Stage 1: build the React app into static files ----
FROM node:14-slim AS build

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app/

# CRA bakes env vars in at BUILD time. "/api" keeps calls same-origin.
ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV CI=false

RUN yarn build

# ---- Stage 2: serve those static files with nginx ----
FROM nginx:1.27-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
