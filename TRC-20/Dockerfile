FROM node:latest
WORKDIR /
COPY package.json .
RUN npm cache clean --force 
RUN npm install
COPY . .
EXPOSE 1448
CMD ["npm","start"]