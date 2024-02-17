# ingrao.blog | Dashboard

This web app uses React.js and Apollo Client. It is written in TypeScript, and I use `styled-components` to style the web app. I use Figma to create the SVG icons.

## How to start the local front-end development

To start the development server properly, follow these instructions:

-   Run `yarn` to install all dependencies
-   Configure the [back-end](../server)
-   Create a `.env` file in the root of the `dashboard` folder
-   Copy the content of the existent `.env.example` file inside the `.env` file
-   Assign a value to the environment variables you find inside the `.env` file. It's usually done this way: `REACT_APP_ENV=development` and `REACT_APP_SERVER_ORIGIN=http://localhost:4000`
-   Run `yarn start`
