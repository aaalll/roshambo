FROM node:alpine

# Create Directory for the Container
WORKDIR /app

# Copy files
COPY ./ /app/

# Install all Packages
RUN npm install serve -g --silent
RUN npm install && \
    npm run build

# start app
CMD ["serve", "-s", "-l", "3000", "build"]