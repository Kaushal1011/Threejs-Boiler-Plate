FROM node:current-buster-slim
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
