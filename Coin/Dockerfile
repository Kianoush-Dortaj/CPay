FROM node:latest
ENV NODE_ENV=production
WORKDIR /
COPY package.json .
RUN npm cache clean --force 
RUN npm install
COPY . .
EXPOSE 6000
CMD ["npm","start"]