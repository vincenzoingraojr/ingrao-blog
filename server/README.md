# ingrao.blog | API

This is the heart of the platform. It's an Express server that leverages the power of the Apollo Server technology. The entire back-end is written in TypeScript.

## How to start the local back-end development

To start the development server properly, follow these instructions:

-   Run `yarn` to install all of the dependencies
-   Create a `.env` file in the root of the `server` folder
-   Copy the content of the existent `.env.example` file inside the `.env` file
-   Assign a value to the environment variables you find inside the `.env` file. It's usually done this way:

    ```
    NODE_ENV=development
    PORT=4000
    CLIENT_ORIGIN=http://localhost:3000
    DASHBOARD_ORIGIN=http://localhost:3001
    DATABASE_URL=postgresql://username:password@host:port/dbname[?paramspec]
    ACCESS_TOKEN_SECRET=[your access token secret]
    REFRESH_TOKEN_SECRET=[your refresh token secret]
    ```

-   Run `yarn dev`

Now you can start the local front-end development. As for the email services, you can configure the back-end to work with other methods as well.
