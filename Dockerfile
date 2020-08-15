FROM mhart/alpine-node:12
LABEL maintainer="freemens"
LABEL description="Tiny build of schema service"
# Set the working directory.
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN yarn 


# Second Stage
FROM mhart/alpine-node:12

# Copy from first stage
COPY --from=0 /usr/src/app /app
# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 7777/tcp

WORKDIR /app
# Run the specified command within the container.
CMD [ "yarn build && raw:core" ]
