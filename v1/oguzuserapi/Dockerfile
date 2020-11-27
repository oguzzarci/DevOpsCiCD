FROM test.dkr.ecr.eu-west-1.amazonaws.com/nodealpine:latest
RUN mkdir app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm","start"]
EXPOSE 5000