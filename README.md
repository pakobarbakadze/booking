<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

# booking

## Overview
The hotel management application, Built on a robust microservices architecture. It allows users to register their hotels, rooms and make reservations for customers. Payments for reservations are securely handled through Stripe, and notifications are sent using Node Mailer. It's a simple and efficient way to manage hotels and reservations.

## System design
<div style="width: 100%; overflow: hidden;">
  <img src="https://drive.google.com/uc?id=1mA8BZLMO9al2si8wEd9ws2iJCp8BTPQv" style="width: 100%; height: auto;" alt="System Design">
</div>

## Technologies
- [NestJS](http://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [Stripe](https://stripe.com/) - Payment processing platform.
- [Node Mailer](https://nodemailer.com/about/) - Module for sending emails from Node.js applications.
- [Docker](https://www.docker.com/) - Containerization platform.
- [Nginx](https://nginx.org/en/) - Web server and reverse proxy server.
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker for distributed systems.
- [Elasticsearch](https://www.elastic.co/elasticsearch/) - Distributed search and analytics engine.
- [TypeORM](https://typeorm.io/) - ORM (Object-Relational Mapping) for TypeScript and JavaScript.
- [PostgreSQL](https://www.postgresql.org/) - Open-source relational database.
- [MongoDB](https://www.mongodb.com/) - NoSQL document database.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- [Redis](https://redis.io/) - Key-value store for caching and data storage.
- [Nest Pino](https://github.com/pinojs/pino) - Logger for NestJS applications.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker compose
$ docker compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```