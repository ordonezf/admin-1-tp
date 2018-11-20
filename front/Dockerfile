FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --only=production

# Static server to serve the app
RUN npm install -g serve

# Bundle app source
COPY . .

# Build app
RUN npm run build

EXPOSE 5000
CMD [ "npm", "start" ]
