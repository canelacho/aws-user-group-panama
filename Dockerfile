FROM node:8
RUN mkdir -p /home/apps
WORKDIR /home/apps
COPY package*.json ./
RUN npm install --quiet
COPY . . 
EXPOSE 443 80
CMD [ "npm", "start" ]