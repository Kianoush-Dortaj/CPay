FROM node:14.16.1
ENV NODE_ENV=production
WORKDIR /
COPY package.json .
COPY package-lock.json* .
RUN npm cache clean --force 
RUN npm install
COPY . .
EXPOSE 6000
CMD npm run start