# Trollskogen project

## Installation

```
npm install

```

## Setup / Configuration

#### Create an .env file with the following content

```
PORT=5000
STEVE=supersecretpassword
MIKE=supersecretpassword
JOHNSSON=supersecretpassword
JWT_SECRET=supersecretpassword

```
Remember to change the "supersecretpassword" to your own password.

#### Run database and seed file.

```
node database/setup.js && node database/seed.js

```

## Run server

```
npm run dev

```

