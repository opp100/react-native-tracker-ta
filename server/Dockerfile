FROM amazonlinux

RUN yum update -y
RUN yum install gcc-c++ make -y
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install nodejs -y
RUN node -e "console.log('Running Node.js ' + process.version)"
RUN npm install -g nodemon

WORKDIR /usr/src/app
COPY . .

EXPOSE 8080