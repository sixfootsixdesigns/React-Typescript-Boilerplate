# React Typescipt Boilerplate

React library using the following
- Typescript
- Parcel
- Auth0
- Prettier

## Running Locally
* Create a root `.env` file locally by using the `.env.example` file in the root directory as an example. Fill in needed variables with real values.
* Run `yarn` and `yarn dev` to create a local instance, which should default to running on port `1234`.
* Verify that your local instance is ALIVE in a browser by accessing `localhost:1234`.

## Auth0
* Login to [https://auth0.com](https://auth0.com) and setup your Auth0 account. 
* Update the `.env` file with the values from your Auth0 app.

## Testing
* Run `yarn test` to run all tests.
* To update snapshots run `yarn test:update`

## Prettier
* To format the codebase run `yarn prettier`
* To check format for errors run `yarn prettier:check`

## Lint
* To lint the codebase run `yarn lint`

## Assets
* Place all public assets in the `src/assets` directory. Link to them using something like `/assets/thing.jpg`.
* The build steps will move them to the dist directory.

