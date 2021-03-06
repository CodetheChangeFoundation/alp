# Aunt Leah's Place Volunteer Management Web App
This application was built for [Aunt Leah's Place](https://auntleahs.org/) by the [Code The Change Foundation](http://codethechange.ca/). See more of CTC's work [here](https://github.com/CodetheChangeFoundation).

## About
This application will help Aunt Leah's Place to better manage their volunteers. The application enables volunteers to:
* create an account
* sign in for shifts at various events and locations
It also enables administrators to: 
* add and delete volunteer locations
* view and export volunteer data for integration with Salesforce
* clear volunteer data

## How it was made
This application was built using React, Redux, Material-UI, and Node.js. The application also uses Azure Functions, an MS SQL database, and Azure's Active Directory for authentication.

### Tech Stack
* React
* Redux
* Material-UI
* Node.js
* Azure Functions
* Azure Active Directory
* MS SQL

## Try the app locally

### Requirements
* NPM and [Node.js](https://nodejs.org/en/)
* Docker
* Azure Data Studio
* Azure Functions Extension for Visual Studio Code

### Initial configuration
1. Clone the repository and open the project in your IDE. We recommend [Visual Studio Code](https://code.visualstudio.com/) to make using Azure a whole lot easier.
2. If you do opt to use VSCode, install the [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension. [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) will also be handy, although it's not totally necessary.
3. In a terminal, navigate to the `aunt-leahs-app` directory and run `npm -i`. Then, open a second terminal window, navigate to  the `aunt-leahs-functions` directory, and do the same. 
4. In the `aunt-leahs-app` directory, run `npm start`. Your browser should open to the app and crash, because there's no server running yet! 

### Creating a local test server
1. Install [Docker](https://hub.docker.com/), if you don't have it already.
2. Increase the amount of memory allocated to Docker; we recommend at least 4GB.
3. Run `sudo docker pull mcr.microsoft.com/mssql/server:2019-latest` to install MS SQL.
4. Launch the Docker image with `docker run -d --name alp_sql_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YOURPASSWORD' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest`. Update the password to whatever you prefer.
5. Run `docker ps` to check that an instance is running.
6. Install [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15).
7. In Azure Data Studio, click 'New connection' and fill in the following details: 
  * Server: localhost
  * Authentication type: SQL Login
  * User name: sa
  * Password: YOURPASSWORD
8. Hit connect. You should now be connected to the database.
9. Select the option to create a new SQL query.
10. From the source code, navigate to the `scripts` folder. Copy the code from the file, paste it into Azure Data Studio, and run the query. You should receive a confirmation message of `0 rows affected`.
11. You may insert test values into the database.

### Running the server
1. Go back to the terminal open to the `aunt-leahs-functions` directory and run `func start` to begin the server.
2. Play around with the app! You won't be able to access the admin flow without ALP's login credentials, of course. However, you can remove the `<AzureAD>` tags in the front-end and grant yourself access, if you're so inclined.

## Contributing
This app is currently in use by ALP and is not being actively maintained. Want to help out nonprofits with code? Learn more about Code The Change [here](http://codethechange.ca/). If you're not a UBC student, you can likely find a similar club on campuses around the world.

## License
This project is licensed under the MIT License.
