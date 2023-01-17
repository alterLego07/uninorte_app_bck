# specify the node base image with your desired version node:<version>
# FROM node:18

# WORKDIR /app

# COPY package*.json ./

# RUN npm i -g @adonisjs/cli && npm i @adonisjs/ignitor
# RUN npm i -g nodemon -D
# RUN npm install

# COPY . .


# replace this with your application's default port
# EXPOSE 3333

# CMD [ "npm", "start" ]

FROM node:18

RUN mkdir -p /home/node/app
WORKDIR /usr/src/app


COPY package*.json /usr/src/app/
RUN npm i -g @adonisjs/cli && npm i @adonisjs/ignitor
# RUN npm i -g nodemon -D
RUN npm install

# Bundle app source
COPY . /usr/src/app

# RUN apk add --no-cache git

RUN chown -R node:node /home/node/

RUN npm ci

USER node 

# ENTRYPOINT [ "node", "serve", "--watch" ]
# ENTRYPOINT [ "node", "npm", "start"]
CMD [ "npm", "start" ]