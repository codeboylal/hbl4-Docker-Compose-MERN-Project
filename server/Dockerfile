FROM node:14-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile --production

COPY . /usr/src/app/

EXPOSE 5000

# was: CMD [ "index.js" ]  -> not a runnable command, the container exited instantly
CMD ["node", "index.js"]
