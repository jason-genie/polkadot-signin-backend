# Sample Polkadot Wallet Backend API

This is a backend API for a sample Polkadot wallet sign-in frontend application. This uses polkadot.js to verify signatures in requests coming from the frontend. The API also returns a random secret message encrypted with Polkadot encrypt functions to only authorized users. The secret messages would be stored in a SQLite database currently.

## Prerequisites

Before you start, make sure you have the following:

- [Node.js](https://nodejs.org) installed
- [Yarn](https://yarnpkg.com/) package manager installed

## Installation

1. Clone this repository to your local machine
2. Navigate to the project directory and run `yarn install` to install the dependencies

## Usage

To start a development server, run:

```
yarn dev
```

The API endpoint can be accessed at `http://localhost:<PORT>`. (Check `.env.example`. Default is 3001.)

To run database migrations, run:

```
yarn migrations
```

You need at least one secret message in db.
To creat a new secret message and to save it db, run:

```
yarn create:secret message="super secret message"
```

To build and run the project, run:

```
yarn build

yarn start
```

## Technologies Used

This project has been developed using the following technologies:
- Node.js (Foal)
- TypeScript
- TypeORM (for database management)
- Polkadot.js

This project currently uses SQLite as its backend database, but any other database can also be used.
(Check the "database" field in `config/default.json`)

## Todo

- Complete test cases for APIs.
- ...

## Contributing

If you want to contribute to the project, please follow these steps:

1. Fork the repo
2. Create a new branch with a descriptive name (`feature/new-feature`, `bugfix/issue-description`, etc.)
3. Make your changes and commit them with a descriptive message
4. Push your changes to your fork
5. Create a pull request to merge your changes into the main repo

## License

This project is licensed under the [MIT license](LICENSE). Feel free to use it for any purpose.