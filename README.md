# Overview of the Project
Building a travel application that obtains a desired trip location and date from the user, and displays weather and an image of the location using information obtained from external APIs. The external API's are Geonames, Weatherbit and Pixabay. The project was broken into smaller parts, and written considering the development strategy and the project requirements.

# Running the project
1. Run the express server - **npm start**, which goes on port 8081
2. To generate the distribution folder for production, use **npm run build-prod**
3. Run webpack dev server  - **npm run build-dev**, which opens the web page on port 8082

# Webpack configurations
We use to config files:
  - webpack.dev.js => this is for development mode
  - webpack.prod.js => this is for production mode

# Dependencies
All the installed dependencies, for example like can be found in the **package.json** file

# Testing
Testing is done with Jest. When running the test, you need to use this command line: **npm run test**

# Service Workers
Service workers are set up in webpack for offline functionality

# Extend Options
The following were used in the project:
 - Allow the user to remove the trip
 - Incorporate icons into forecast
 - Allow user to print their trip 